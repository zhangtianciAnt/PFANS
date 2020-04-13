<template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row_id"
                   :title="title" @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
  </EasyNormalTable>
</template>

<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {Message} from 'element-ui';
  import moment from 'moment';
  import {getDictionaryInfo, getStatus, getUserInfo,getOrgInfoByUserId} from '@/utils/customize';

  export default {
    name: 'PFANS3001View',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        loading: false,
        title: 'title.PFANS3001VIEW',
        data: [],
        columns: [
          {
            code: 'center_id',
            label: 'label.center',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'group_id',
            label: 'label.group',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'team_id',
            label: 'label.team',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'ticketstype',
            label: 'label.type',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'idcard',
            label: 'label.PFANS3001VIEW_IDCARD',
            width: 270,
            fix: false,
            filter: true,
          },
          {
            code: 'user_id',
            label: 'label.PFANS3001VIEW_USERID',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'romanid',
            label: 'label.PFANS3001VIEW_ROMANID',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'extensionnumber',
            label: 'label.PFANS3001VIEW_EXTENSIONNUMBER',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'budgetnumber',
            label: 'label.budgetunit',
            width: 180,
            fix: false,
            filter: true,
          },
          {
            code: 'mobilephone',
            label: 'label.PFANS3001VIEW_MOBILEPHONE',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'trip',
            label: 'label.PFANS3001VIEW_TRIP',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'trippoint',
            label: 'label.PFANS3001VIEW_TRIPPOINT',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'go',
            label: 'label.PFANS3001VIEW_GO',
            child: [
              {
                code: 'going',
                label: 'label.PFANS3001VIEW_GOING',
                width: 130,
                fix: false,
                filter: true,
              },
              {
                code: 'goairlinenumber',
                label: 'label.PFANS3001VIEW_GOAIRLINENUMBER',
                width: 150,
                fix: false,
                filter: true,
              },
              {
                code: 'godeparturedate',
                label: 'label.PFANS3001VIEW_GODEPARTUREDATE',
                width: 150,
                fix: false,
                filter: true,
              },
              {
                code: 'goarrivaldate',
                label: 'label.PFANS3001VIEW_GOARRIVALDATE',
                width: 150,
                fix: false,
                filter: true,
              },
            ],
            width: 580,
          },
          {
            code: 'return',
            label: 'label.PFANS3001VIEW_RETURN',
            child: [
              {
                code: 'back',
                label: 'label.PFANS3001VIEW_BACK',
                width: 150,
                fix: false,
                filter: true,
              },
              {
                code: 'reairlinenumber',
                label: 'label.PFANS3001VIEW_GOAIRLINENUMBER',
                width: 150,
                fix: false,
                filter: true,
              },
              {
                code: 'redeparturedate',
                label: 'label.PFANS3001VIEW_GODEPARTUREDATE',
                width: 150,
                fix: false,
                filter: true,
              },
              {
                code: 'rearrivaldate',
                label: 'label.PFANS3001VIEW_GOARRIVALDATE',
                width: 150,
                fix: false,
                filter: true,
              },
              {
                code: 'ticketingdate',
                label: 'label.PFANS3001VIEW_TICKETINGDATE',
                width: 150,
                fix: false,
                filter: true,
              },
            ],
            width: 700,
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
        ],
        buttonList: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'edit', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
        ],
        rowid: '',
        row_id: 'tickets_id',
      };
    },
    mounted() {
      this.loading = true;
      this.$store
        .dispatch('PFANS3001Store/getFpans3001List', {})
        .then(response => {
          for (let j = 0; j < response.length; j++) {
            let user = getUserInfo(response[j].user_id);
              let nameflg = getOrgInfoByUserId(response[j].user_id);
              if (nameflg) {
                  response[j].center_id = nameflg.centerNmae;
                  response[j].group_id = nameflg.groupNmae;
                  response[j].team_id = nameflg.teamNmae;
              }
            if (user) {
              response[j].user_id = user.userinfo.customername;
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
            if (response[j].status !== null && response[j].status !== "") {
              response[j].status = getStatus(response[j].status);
            }
            if (response[j].ticketstype === 'first') {
              if (this.$i18n){
                response[j].ticketstype = this.$t('label.PFANS3001FORMVIEW_DOMESTIC');
              }

              response[j].idcard = response[j].idcard;
            } else {
              if (this.$i18n){
                response[j].ticketstype = this.$t('label.PFANS3001FORMVIEW_FOREIGN');
              }

              response[j].idcard = response[j].passport + '、' + moment(response[j].effectivedate).format('YYYY-MM-DD');
            }
            if (response[j].tripstart !== null && response[j].tripstart !== '' && response[j].tripend !== null && response[j].tripend !== '') {
              response[j].trip = moment(response[j].tripstart).format('YYYY-MM-DD') + ' - ' + moment(response[j].tripend).format('YYYY-MM-DD');
            }
            if (response[j].godeparturedate !== null && response[j].godeparturedate !== '') {
              response[j].godeparturedate = moment(response[j].godeparturedate).format('YYYY-MM-DD hh:mm');
            }
            if (response[j].goarrivaldate !== null && response[j].goarrivaldate !== '') {
              response[j].goarrivaldate = moment(response[j].goarrivaldate).format('YYYY-MM-DD hh:mm');
            }
            if (response[j].redeparturedate !== null && response[j].redeparturedate !== '') {
              response[j].redeparturedate = moment(response[j].redeparturedate).format('YYYY-MM-DD hh:mm');
            }
            if (response[j].rearrivaldate !== null && response[j].rearrivaldate !== '') {
              response[j].rearrivaldate = moment(response[j].rearrivaldate).format('YYYY-MM-DD hh:mm');
            }
            if (response[j].ticketingdate !== null && response[j].ticketingdate !== '') {
              response[j].ticketingdate = moment(response[j].ticketingdate).format('YYYY-MM-DD');
            }
            if (response[j].budgetnumber !== null && response[j].budgetnumber !== '') {
              let letBudgetnumber = getDictionaryInfo(response[j].budgetnumber);
              if (letBudgetnumber != null) {
                response[j].budgetnumber = letBudgetnumber.value1;
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
            duration: 5 * 1000,
          });
          this.loading = false;
        });
    },
    methods: {
      rowClick(row) {
        this.rowid = row.tickets_id;
      },
      buttonClick(val) {
        this.$store.commit('global/SET_HISTORYURL', this.$route.path);
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
            name: 'PFANS3001FormView',
            params: {
              _id: this.rowid,
              disabled: false,
            },
          });
        }
        if (val === 'insert') {
          this.$router.push({
            name: 'PFANS3001FormView',
            params: {
              _id: '',
              disabled: true,
            },
          });
        }
        if (val === 'edit') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.$router.push({
            name: 'PFANS3001FormView',
            params: {
              _id: this.rowid,
              disabled: true,
            },
          });
        }
      },
    },
  };
</script>

<style scoped>

</style>
