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
  import {getDictionaryInfo, getStatus} from '@/utils/customize';
  import {Message} from 'element-ui';
  import moment from 'moment';

  export default {
    name: 'PFANS1025View',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        loading: false,
        title: 'title.PFANS1025VIEW',
        data: [],
        checkdata: [],
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
            code: 'custochinese',
            label: 'label.PFANS1025VIEW_ENTRUST',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'deployment',
            label: 'label.PFANS1024VIEW_DEPLOYMENT',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'pjnamechinese',
            label: 'label.PFANS1025VIEW_PJNAME',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'claimdatetime',
            label: 'label.PFANS1025VIEW_DEVELOPDATE',
            width: 200,
            fix: false,
            filter: true,
          },

          /* {
             code: 'deliverydate',
             label: 'label.PFANS1024VIEW_DELIVERYDATE',
             width: 150,
             fix: false,
             filter: true
           },*/
          {
            code: 'currencyposition',
            label: 'label.PFANS1025VIEW_CURRENCYFORMAT',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'claimamount',
            label: 'label.PFANS1024VIEW_CLAIMAMOUNT',
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
          //add-ws-4/17-添加审批时间
          {
            code: 'modifyon',
            label: 'label.PFANS1030FORMVIEW_TIEEEND',
            width: 150,
            fix: false,
            filter: true,
          },
          //add-ws-4/17-添加审批时间
        ],
        buttonList: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
        ],
        rowid: '',
        row_id: 'award_id',
        pjnameflg: [],
      };
    },
    mounted() {
      this.getPjanme();
    },
    methods: {
      getPjanme() {
        this.loading = true;
        this.$store
          .dispatch('PFANS1026Store/get', {'type': '0'})
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
              .dispatch('PFANS5001Store/getFpans5001List', {})
              .then(response => {
                for (let j = 0; j < response.length; j++) {
                  this.pjnameflg.push({
                    pjcode: response[j].companyprojects_id,
                    pjname: response[j].project_name,
                  });
                }
                this.$store
                  .dispatch('PFANS1025Store/get', {'maketype': '7'})
                  .then(response => {
                    const datated = [];
                    for (let d = 0; d < this.checkdata.length; d++) {
                      for (let j = 0; j < response.length; j++) {
                        if (this.checkdata[d].contractnumber === response[j].contractnumber) {
                          if (response[j].award_id !== null && response[j].award_id !== '') {

                            if (response[j].deliverydate !== null && response[j].deliverydate !== '') {
                              response[j].deliverydate = moment(response[j].deliverydate).format('YYYY-MM-DD');
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
                            //add-ws-4/17-添加审批时间
                            if(response[j].status!='0'){
                              if (response[j].modifyon !== null && response[j].modifyon !== '') {
                                response[j].modifyon = moment(response[j].modifyon).format('YYYY-MM-DD');
                              }
                            }else{
                              response[j].modifyon = null;
                            }
                            //add-ws-4/17-添加审批时间
                            if (response[j].status !== null && response[j].status !== '') {
                              response[j].status = getStatus(response[j].status);
                            }
                            if (response[j].pjnamechinese !== null && response[j].pjnamechinese !== '') {
                              if (response[j].pjnamechinese.split(',').length > 1) {
                                let aa = [];
                                let bb = '';
                                aa = response[j].pjnamechinese.split(',');
                                for (let i = 1; i < aa.length; i++) {
                                  for (let j = 1; j < this.pjnameflg.length; j++) {
                                    if (aa[i] === this.pjnameflg[j].pjcode) {
                                      bb = bb + this.pjnameflg[j].pjname + ',';
                                    }
                                  }
                                }
                                if (bb !== '' && bb !== undefined) {
                                  response[j].pjnamechinese = bb.substring(0, bb.length - 1);
                                }
                              } else {
                                for (let i = 1; i < this.pjnameflg.length; i++) {
                                  if (this.pjnameflg[i].pjcode === response[j].pjnamechinese) {
                                    response[j].pjnamechinese = this.pjnameflg[i].pjname;
                                  }
                                }
                              }
                            }
                            datated.push({
                              contractnumber: response[j].contractnumber,
                              contracttype: response[j].contracttype,
                              custochinese: response[j].custochinese,
                              modifyon: response[j].modifyon,
                              deployment: response[j].deployment,
                              pjnamechinese: response[j].pjnamechinese,
                              claimdatetime: response[j].claimdatetime,
                              deliverydate: response[j].deliverydate,
                              currencyposition: response[j].currencyposition,
                              claimamount: response[j].claimamount,
                              status: response[j].status,
                              award_id: response[j].award_id,
                              owner: response[j].owner,
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
                            contractnumber: response[m].contractnumber,
                            contracttype: response[m].contracttype,
                            custochinese: response[m].custochinese,
                            modifyon: response[m].modifyon,
                            deployment: response[m].deployment,
                            pjnamechinese: response[m].pjnamechinese,
                            claimdatetime: response[m].claimdatetime,
                            deliverydate: response[m].deliverydate,
                            currencyposition: response[m].currencyposition,
                            claimamount: response[m].claimamount,
                            status: response[m].status,
                            award_id: response[m].award_id,
                            owner: response[m].owner,
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
      rowClick(row) {
        this.rowid = row.award_id;
      }
      ,
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
            name: 'PFANS1025FormView',
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
            name: 'PFANS1025FormView',
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
