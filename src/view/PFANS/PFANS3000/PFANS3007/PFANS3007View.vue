<template>
  <EasyNormalTable
    :buttonList="buttonList"
    :columns="columns"
    :data="data"
    :rowid="row_id"
    :title="title"
    @buttonClick="buttonClick"
    @rowClick="rowClick"
    v-loading="loading"
  >
  </EasyNormalTable>
</template>

<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {Message} from 'element-ui';
  import {getDictionaryInfo, getStatus, getUserInfo,getOrgInfoByUserId} from '../../../../utils/customize';

  let moment = require('moment');

  export default {
    name: 'PFANS3007View',
    components: {
      moment,
      EasyNormalTable,
    },
    data() {
      return {
        loading: false,
        title: 'title.PFANS3007VIEW',
        // 表格数据源
        data: [],
        // 列属性
        columns: [
          {
            code: 'budgetunit',
            label: 'label.budgetunit',
            width: 140,
            fix: false,
            filter: true,
          },
          {
            code: 'applicant',
            label: 'label.applicant',
            width: 140,
            fix: false,
            filter: true,
          },
          {
            code: 'centername',
            label: 'label.center',
            width: 140,
            fix: false,
            filter: true,
          },
          {
            code: 'groupname',
            label: 'label.group',
            width: 140,
            fix: false,
            filter: true,
          },
          {
            code: 'teamname',
            label: 'label.team',
            width: 140,
            fix: false,
            filter: true,
          },
          {
            code: 'businesscity',
            label: 'label.PFANS3007VIEW_BUSINESSCITY',
            width: 140,
            fix: false,
            filter: true,
          },
          {
            code: 'travelclubplace',
            label: 'label.PFANS3007VIEW_TRAVELCLUBPLACE',
            width: 150,
            fix: false,
            filter: true,

          },
          {
            code: 'condominiumcompany',
            label: 'label.PFANS3007VIEW_CONDOMINIUMCOMPANY',
            width: 170,
            fix: false,
            filter: true,

          },
          {
            code: 'apartmentplace',
            label: 'label.PFANS3007VIEW_APARTMENTPLACE',
            width: 170,
            fix: false,
            filter: true,

          },
          {
            code: 'housenumber',
            label: 'label.PFANS3007VIEW_HOUSENUMBER',
            width: 150,
            fix: false,
            filter: true,

          },
          {
            code: 'contractstartdate',
            label: 'label.PFANS3007VIEW_CONTRACTSTARTDATE',
            width: 140,
            fix: false,
            filter: true,
          },
          {
            code: 'contractenddate',
            label: 'label.PFANS3007VIEW_CONTRACTENDDATE',
            width: 140,
            fix: false,
            filter: true,
          },
          {
            code: 'contractdatenumber',
            label: 'label.PFANS3007VIEW_CONTRACTDATENUMBER',
            width: 140,
            fix: false,
            filter: true,
          },
          {
            code: 'businessstartdate',
            label: 'label.PFANS3007VIEW_BUSINESSSTARTDATE',
            width: 160,
            fix: false,
            filter: true,
          },
          {
            code: 'businessenddate',
            label: 'label.PFANS3007VIEW_BUSINESSENDDATE',
            width: 160,
            fix: false,
            filter: true,
          },
          {
            code: 'businessdatenumber',
            label: 'label.PFANS3007VIEW_BUSINESSDATENUMBER',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'totalcost',
            label: 'label.PFANS3007VIEW_TOTALCOST',
            width: 140,
            fix: false,
            filter: true,
          },
          {
            code: 'dailycost',
            label: 'label.PFANS3007VIEW_DAILYCOST',
            width: 140,
            fix: false,
            filter: true,
          },
          {
            code: 'contracttime',
            label: 'label.PFANS3007VIEW_CONTRACTTIME',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'remarks',
            label: 'label.PFANS3007VIEW_REMARKS',
            width: 140,
            fix: false,
            filter: true,
          },
          {
            code: 'status',
            label: 'label.approval_status',
            width: 140,
            fix: false,
            filter: true,
          },
            {
                code: 'acceptstatus',
                label: 'label.PFANS3001FORMVIEW_ACCEPTSTATUS',
                width: 150,
                fix: false,
                filter: true,
            },
            {
                code: 'findate',
                label: 'label.PFANS3006VIEW_ACCEPTTIME',
                width: 150,
                fix: false,
                filter: true,
            },
            {
                code: 'refusereason',
                label: 'label.PFANS3007FORMVIEW_REFUSEREASON',
                width: 150,
                fix: false,
                filter: true,
            },
        ],
        buttonList: [
          {
            key: 'view',
            name: 'button.view',
            disabled: false,
            icon: 'el-icon-view',
          },
          {
            key: 'insert',
            name: 'button.insert',
            disabled: false,
            icon: 'el-icon-plus',
          },
          {
            key: 'update',
            name: 'button.update',
            disabled: false,
            icon: 'el-icon-edit',
          },
        ],
        rowid: '',
        row_id: 'japancondominiumid',
      };
    },
    mounted() {
      this.loading = true;
      this.$store
        .dispatch('PFANS3007Store/getJapanCondominium', {})
        .then(response => {
          for (let j = 0; j < response.length; j++) {
            if (response[j].status !== null && response[j].status !== '') {
              response[j].status = getStatus(response[j].status);
            }
            if (response[j].budgetunit !== null && response[j].budgetunit !== '') {
              let letBudgetunit = getDictionaryInfo(response[j].budgetunit);
              if (letBudgetunit != null) {
                response[j].budgetunit = letBudgetunit.value2 +'_'+ letBudgetunit.value3;
              }
            }
            if (response[j].condominiumcompany !== null && response[j].condominiumcompany !== '') {
              let letCondominiumcompany = getDictionaryInfo(response[j].condominiumcompany);
              if (letCondominiumcompany != null) {
                response[j].condominiumcompany = letCondominiumcompany.value1;
              }
            }
            if (response[j].apartmentplace !== null && response[j].apartmentplace !== '') {
              let letApartmentplace = getDictionaryInfo(response[j].apartmentplace);
              if (letApartmentplace != null) {
                response[j].apartmentplace = letApartmentplace.value1;
              }
            }
            if (response[j].user_id !== null && response[j].user_id !== '') {
              let user = getUserInfo(response[j].userid);
                let nameflg = getOrgInfoByUserId(response[j].userid);
                if (nameflg) {
                    response[j].centername = nameflg.centerNmae;
                    response[j].groupname = nameflg.groupNmae;
                    response[j].teamname = nameflg.teamNmae;
                }
              if (user) {
                response[j].applicant = user.userinfo.customername;
              }
            }
            if (response[j].contractstartdate !== null && response[j].contractstartdate !== '') {
              response[j].contractstartdate = moment(response[j].contractstartdate).format('YYYY-MM-DD');
            }
            if (response[j].contractenddate !== null && response[j].contractenddate !== '') {
              response[j].contractenddate = moment(response[j].contractenddate).format('YYYY-MM-DD');
            }
            if (response[j].businessstartdate !== null && response[j].businessstartdate !== '') {
              response[j].businessstartdate = moment(response[j].businessstartdate).format('YYYY-MM-DD');
            }
            if (response[j].businessenddate !== null && response[j].businessenddate !== '') {
              response[j].businessenddate = moment(response[j].businessenddate).format('YYYY-MM-DD');
            }
            if (response[j].contracttime !== null && response[j].contracttime !== '') {
              response[j].contracttime = moment(response[j].contracttime).format('YYYY-MM-DD');
            }
              // ADD_FJL   (受理状态)
              if (response[j].acceptstatus !== null && response[j].acceptstatus !== "") {
                  if (this.$i18n) {
                      if (response[j].acceptstatus === '0') {
                          response[j].acceptstatus = this.$t('label.PFANS3006VIEW_ACCEPT');
                      } else if (response[j].acceptstatus === '1') {
                          response[j].acceptstatus = this.$t('label.PFANS3006VIEW_REFUSE');
                      } else if (response[j].acceptstatus === '2') {
                          response[j].acceptstatus = this.$t('label.PFANS3006VIEW_CARRYOUT');
                      }
                  }
              }
              // ADD_FJL   (受理时间)
              if (response[j].findate !== null && response[j].findate !== "") {
                  response[j].findate = moment(response[j].findate).format('YYYY-MM-DD');
              }
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
        this.rowid = row.japancondominiumid;
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
            name: 'PFANS3007FormView',
            params: {
              _id: this.rowid,
              disabled: true,
            },
          });
        }
        if (val === 'insert') {
          this.$router.push({
            name: 'PFANS3007FormView',
            params: {
              _id: '',
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
            name: 'PFANS3007FormView',
            params: {
              _id: this.rowid,
              disabled: false,
            },
          });
        }
      },
    },
  };
</script>

<style scoped>

</style>
