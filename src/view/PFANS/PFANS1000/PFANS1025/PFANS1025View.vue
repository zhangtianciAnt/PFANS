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
  import {getUserInfo, getOrgInfoByUserId} from '@/utils/customize';
  import {Message} from 'element-ui';
  import moment from "moment";

    export default {
        name: "PFANS1025View",
      components: {
        EasyNormalTable,
      },
      data(){
         return{
           loading: false,
           title: "title.PFANS1025VIEW",
           data: [],
           columns:[
             {
               code: 'contractnumber',
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
               code: 'entrust',
               label: 'label.PFANS1025VIEW_ENTRUST',
               width: 120,
               fix: false,
               filter: true
             },
             {
               code: 'enplace',
               label: 'label.PFANS1025VIEW_ENTRUSTPLACE',
               width: 150,
               fix: false,
               filter: true
             },
             {
               code: 'deployment',
               label: 'label.PFANS1024VIEW_DEPLOYMENT',
               width: 150,
               fix: false,
               filter: true
             },
             {
               code: 'pjname',
               label: 'label.PFANS1025VIEW_PJNAME',
               width: 120,
               fix: false,
               filter: true
             },
             {
               code: 'openingdate',
               label: 'label.PFANS1025VIEW_OPENINGDATE',
               width: 150,
               fix: false,
               filter: true
             },
             {
               code: 'enddate',
               label: 'label.PFANS1025VIEW_ENDDATE',
               width: 150,
               fix: false,
               filter: true
             },
             {
               code: 'deliverydate',
               label: 'label.PFANS1024VIEW_DELIVERYDATE',
               width: 150,
               fix: false,
               filter: true
             },
             {
               code: 'currencyformat',
               label: 'label.PFANS1025VIEW_CURRENCYFORMAT',
               width: 120,
               fix: false,
               filter: true
             },
             {
               code: 'claimamount',
               label: 'label.PFANS1024VIEW_CLAIMAMOUNT',
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
           row_id: 'award_id'
         }
      },
      mounted() {
        this.loading = true;
        this.$store
          .dispatch('PFANS1025Store/get', {})
          .then(response => {
            for (let j = 0; j < response.length; j++) {
              if (response[j].user_id !== null && response[j].user_id !== "") {
                let rst = getUserInfo(response[j].user_id);
                if (rst) {
                  response[j].user_id = rst.userinfo.customername;
                }
                // if (response[j].openingdate !== null && response[j].openingdate !== "") {
                //   response[j].openingdate = moment(response[j].openingdate).format("YYYY-MM-DD");
                // }
                // if (response[j].enddate !== null && response[j].enddate !== "") {
                //   response[j].enddate = moment(response[j].enddate).format("YYYY-MM-DD");
                // }
                if (response[j].deliverydate !== null && response[j].deliverydate !== "") {
                  response[j].deliverydate = moment(response[j].deliverydate).format("YYYY-MM-DD");
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
          this.rowid = row.award_id;
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
              name: 'PFANS1025FormView',
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
              name: 'PFANS1025FormView',
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
