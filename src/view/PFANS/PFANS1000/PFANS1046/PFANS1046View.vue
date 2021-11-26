<template>
  <div>
    <EasyNormalTable :buttonList="buttonList"
                     :columns="columns"
                     :data="data"
                     :title="title"
                     :rowid="row_id" @reget="getPjanme"
                     @buttonClick="buttonClick"
                     @rowClick="rowClick"
                     v-loading="loading"
                     :psearchValue="search">
    </EasyNormalTable>
  </div>
</template>

<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {getDictionaryInfo, getStatus, getOrgInfoByUserId} from '@/utils/customize';
  import {Message} from 'element-ui';
  import moment from 'moment';

  export default {
    name: 'PFANS1046View',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        checkdata: [],
        search: '',
        loading: false,
        title: 'title.PFANS1046VIEW',
        data: [],
        columns: [
          {
            //供应商名称
            code: 'custojapanese',
            label: 'label.PFANS6001VIEW_SUPPLIERNAME',
            width: 140,
            fix: false,
            filter: false,
          },
          {
            //负责人
            code: 'liableperson',
            label: 'label.ASSETS1002VIEW_USERID',
            width: 120,
            fix: false,
            filter: false,
          },
          {
            //地址
            code: 'address',
            label: 'label.PFANS6002VIEW_ADDRESS',
            width: 120,
            fix: false,
            filter: false,
          },
          {
            code: 'contractnumber',
            label: 'label.PFANS1024VIEW_CONTRACTNUMBER',
            width: 150,
            fix: false,
            filter: false,
          },
          {
            code: 'deliverydate',
            label: 'label.PFANS1024VIEW_DELIVERYDATE',
            width: 150,
            fix: false,
            filter: false,
          },
          {
            code: 'completiondate',
            label: 'label.PFANS1024VIEW_COMPLETIONDATE',
            width: 150,
            fix: false,
            filter: false,
          },
          {
            code: 'claimdate',
            label: 'label.PFANS1024VIEW_CLAIMDATE',
            width: 150,
            fix: false,
            filter: false,
          },
          {
            code: 'supportdate',
            label: 'label.PFANS1024VIEW_SUPPORTDATE',
            width: 150,
            fix: false,
            filter: false,
          },
          {
            code: 'claimamount',
            label: 'label.PFANS1025VIEW_AWARDMONEY',
            width: 150,
            fix: false,
            filter: false,
          },
        ],
        buttonList: [
          {'key': 'generate', 'name': 'button.generate', 'disabled': false, 'icon': 'el-icon-view'},
        ],
        rowid: '',
        row_id: 'individual_id',

      };
    },
    mounted() {
      this.check();
      this.getPjanme();
    },
    methods: {
      buttonClick(val) {
        if (val === 'generate') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.loading = true;
          this.$store
            .dispatch('PFANS1026Store/generatesta', {individual_id: this.rowid})
            .then(response => {
              this.loading = false;
            })
            .catch(error => {
              this.$message.error({
                message: error,
                type: 'error',
                duration: 5 * 1000,
              });
              this.loading = false;
            });
        }
      },
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
              .dispatch('PFANS1026Store/getindividual', {})
              .then(response => {
                const datated = [];
                for (let d = 0; d < this.checkdata.length; d++) {
                  for (let j = 0; j < response.length; j++) {
                    if (this.checkdata[d].contractnumber === response[j].contractnumber) {
                      if (response[j].deliverydate !== null && response[j].deliverydate !== '') {
                        response[j].deliverydate = moment(response[j].deliverydate).format('YYYY-MM-DD');
                      }
                      if (response[j].completiondate !== null && response[j].completiondate !== '') {
                        response[j].completiondate = moment(response[j].completiondate).format('YYYY-MM-DD');
                      }
                      if (response[j].claimdate !== null && response[j].claimdate !== '') {
                        response[j].claimdate = moment(response[j].claimdate).format('YYYY-MM-DD');
                      }
                      if (response[j].supportdate !== null && response[j].supportdate !== '') {
                        response[j].supportdate = moment(response[j].supportdate).format('YYYY-MM-DD');
                      }
                      datated.push({
                        supportdate: response[j].supportdate,
                        claimdate: response[j].claimdate,
                        completiondate: response[j].completiondate,
                        deliverydate: response[j].deliverydate,
                        custojapanese: response[j].custojapanese,
                        liableperson: response[j].liableperson,
                        address: response[j].address,
                        contractnumber: response[j].contractnumber,
                        individual_id: response[j].individual_id,
                        claimamount: response[j].claimamount,
                      });
                    }
                  }
                }
                const datatade = [];
                for (let m = 0; m < response.length; m++) {
                  for (let n = 0; n < datated.length; n++) {
                    if (datated[n].contractnumber === response[m].contractnumber) {
                      datatade.push({
                        supportdate: response[m].supportdate,
                        claimdate: response[m].claimdate,
                        completiondate: response[m].completiondate,
                        deliverydate: response[m].deliverydate,
                        custojapanese: response[m].custojapanese,
                        liableperson: response[m].liableperson,
                        address: response[m].address,
                        contractnumber: response[m].contractnumber,
                        individual_id: response[m].individual_id,
                        claimamount: response[m].claimamount,
                      });
                    }
                  }
                }
                this.data = datatade;
                this.loading = false;
              })
              .catch(error => {
                this.$message.error({
                  message: error,
                  type: 'error',
                  duration: 5 * 1000,
                });
                this.loading = false;
              });
          });
      },
      check() {
        if (this.$route.params._id) {
          this.search = this.$route.params._id;
        }
      },
      rowClick(row) {
        this.rowid = row.individual_id;
      },
    },
  };
</script>

<style scoped>

</style>
