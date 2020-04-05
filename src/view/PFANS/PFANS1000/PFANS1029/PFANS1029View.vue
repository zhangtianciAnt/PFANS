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
  import {getUserInfo, getOrgInfoByUserId, getStatus} from '@/utils/customize';
  import {getDictionaryInfo} from '@/utils/customize';
  import {Message} from 'element-ui';
  import moment from 'moment';

  export default {
    name: 'PFANS1029View',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        checkdata: [],
        loading: false,
        title: 'title.PFANS1029VIEW',
        data: [],
        columns: [
          {
            code: 'contractnumber',
            label: 'label.PFANS1024VIEW_CONTRACTNUMBER',
            width: 150,
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
            code: 'depositjapanese',
            label: 'label.PFANS1029VIEW_DEPOSITJAPANESE',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'prplacejapanese',
            label: 'label.PFANS1029VIEW_PRPLACEJAPANESE',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'deployment',
            label: 'label.PFANS1029VIEW_DEPLOYMENT',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'pjnamejapanese',
            label: 'label.PFANS1029VIEW_PJNAMEJAPANESE',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'openingdate',
            label: 'label.PFANS1029VIEW_OPENINGDATE',
            width: 150,
            fix: false,
            filter: true,
          },

          {
            code: 'enddate',
            label: 'label.PFANS1029VIEW_ENDDATE',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'currencyposition',
            label: 'label.PFANS1029VIEW_CURRENCYFORMAT',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'claimamount',
            label: 'label.PFANS1029VIEW_CLAIMAMOUNT',
            width: 120,
            fix: false,
            filter: true,
          },
        ],
        buttonList: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
        ],
        rowid: '',
        row_id: 'contract_id',
      };
    },
    mounted() {
      this.loading = true;
      this.$store
        .dispatch('PFANS1026Store/get', {})
        .then(response => {
          let data = [];
          for (let i = 0; i < response.contractapplication.length; i++) {
            if (response.contractapplication[i].state === '1' || response.contractapplication[i].state === this.$t('label.PFANS8008FORMVIEW_EFFECTIVE')) {
              data.push({
                contractnumber: response.contractapplication[i].contractnumber,
              });
              this.checkdata = data;
            }
          }
          this.$store
            .dispatch('PFANS1029Store/get', {})
            .then(response => {
              const datated = [];
              for (let d = 0; d < this.checkdata.length; d++) {
                for (let j = 0; j < response.length; j++) {
                  if (this.checkdata[d].contractnumber === response[j].contractnumber) {
                    if (response[j].user_id !== null && response[j].user_id !== '') {

                      if (response[j].openingdate !== null && response[j].openingdate !== '') {
                        response[j].openingdate = moment(response[j].openingdate).format('YYYY-MM-DD');
                      }
                      if (response[j].enddate !== null && response[j].enddate !== '') {
                        response[j].enddate = moment(response[j].enddate).format('YYYY-MM-DD');
                      }
                      if (response[j].signingdate !== null && response[j].signingdate !== '') {
                        response[j].signingdate = moment(response[j].signingdate).format('YYYY-MM-DD');
                      }
                      if (response[j].contracttype !== null && response[j].contracttype !== '') {
                        let letContracttype = getDictionaryInfo(response[j].contracttype);
                        if (letContracttype != null) {
                          response[j].contracttype = letContracttype.value1;
                        }
                      }
                      if (response[j].currencyposition !== null && response[j].currencyposition !== '') {
                        let letCurrencyposition = getDictionaryInfo(response[j].currencyposition);
                        if (letCurrencyposition != null) {
                          response[j].currencyposition = letCurrencyposition.value1;
                        }
                      }
                      if (response[j].depositjapanese !== null && response[j].depositjapanese !== '') {
                        let letUser = getUserInfo(response[j].depositjapanese);
                        if (letUser != null) {
                          response[j].depositjapanese = letUser.userinfo.customername;
                        }

                      }
                      datated.push({
                        contracttype: response[j].contracttype,
                        depositjapanese: response[j].depositjapanese,
                        prplacejapanese: response[j].prplacejapanese,
                        deployment: response[j].deployment,
                        pjnamejapanese: response[j].pjnamejapanese,
                        openingdate: response[j].openingdate,
                        contractnumber: response[j].contractnumber,
                        enddate: response[j].enddate,
                        currencyposition: response[j].currencyposition,
                        claimamount: response[j].claimamount,
                      });
                    }
                  }
                }
              }
              const datatade = [];
              for (let m = 0; m < response.length; m++) {
                for (let n = 0; n < datated.length; n++) {
                  if (datated[n].contractnumber === response[m].contractnumber) {
                    datatade.push({
                      contracttype: response[m].contracttype,
                      depositjapanese: response[m].depositjapanese,
                      prplacejapanese: response[m].prplacejapanese,
                      deployment: response[m].deployment,
                      pjnamejapanese: response[m].pjnamejapanese,
                      openingdate: response[m].openingdate,
                      contractnumber: response[m].contractnumber,
                      enddate: response[m].enddate,
                      currencyposition: response[m].currencyposition,
                      claimamount: response[m].claimamount,
                    });
                  }
                }
              }
              this.data = datatade;
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
        });
    },
    methods: {
      rowClick(row) {
        this.rowid = row.contract_id;
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
            name: 'PFANS1029FormView',
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
            name: 'PFANS1029FormView',
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
