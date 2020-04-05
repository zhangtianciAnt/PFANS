<template>
  <EasyNormalTable
    :buttonList="buttonList"
    :columns="columns"
    :data="data"
    :rowid="row_id"
    :title="title"
    @buttonClick="buttonClick"
    @rowClick="rowClick"
    v-loading="loading">
  </EasyNormalTable>
</template>

<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {Message} from 'element-ui';
  import moment from 'moment';
  import {getDictionaryInfo, getStatus, getUserInfo} from '@/utils/customize';

  export default {
    name: 'PFANS1032View',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        checkdata: [],
        loading: false,
        title: 'title.PFANS1032VIEW',
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
            code: 'custochinese',
            label: 'label.PFANS1032FORMVIEW_DEPOSITARY',
            width: 130,
            fix: false,
            filter: true,
          },
          {
            code: 'businesscode',
            label: 'label.PFANS1024VIEW_BUSINESSCODE',
            width: 140,
            fix: false,
            filter: true,
          },
          {
            code: 'pjnamejapanese',
            label: 'label.PFANS1032FORMVIEW_PJNAME',
            width: 100,
            fix: false,
            filter: true,
          },
          {
            code: 'claimnumber',
            label: 'label.PFANS1032FORMVIEW_CLAIMNUMBER',
            width: 130,
            fix: false,
            filter: true,
          },
          // {
          //   code: 'openingdate',
          //   label: 'label.PFANS1025VIEW_OPENINGDATE',
          //   width: 140,
          //   fix: false,
          //   filter: true
          // },
          // {
          //   code: 'enddate',
          //   label: 'label.PFANS1025VIEW_ENDDATE',
          //   width: 140,
          //   fix: false,
          //   filter: true
          // },
          {
            code: 'deliveryfinshdate',
            label: 'label.PFANS1024VIEW_DELIVERYFINSHDATE',
            width: 150,
            fix: false,
            filter: true,
          },
        ],
        buttonList: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
        ],
        rowid: '',
        row_id: 'petition_id',
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
            .dispatch('PFANS1032Store/get', {})
            .then(response => {
              const datated = [];
              for (let d = 0; d < this.checkdata.length; d++) {
                for (let j = 0; j < response.length; j++) {
                  if (this.checkdata[d].contractnumber === response[j].contractnumber) {
                    if (response[j].contracttype !== null && response[j].contracttype !== '') {
                      let letContracttype = getDictionaryInfo(response[j].contracttype);
                      if (letContracttype != null) {
                        response[j].contracttype = letContracttype.value1;
                      }
                    }
                    if (response[j].deliveryfinshdate !== null && response[j].deliveryfinshdate !== '') {
                      response[j].deliveryfinshdate = moment(response[j].deliveryfinshdate).format('YYYY-MM-DD');
                    }
                    datated.push({
                      contracttype: response[j].contracttype,
                      custochinese: response[j].custochinese,
                      businesscode: response[j].businesscode,
                      pjnamejapanese: response[j].pjnamejapanese,
                      claimnumber: response[j].claimnumber,
                      deliveryfinshdate: response[j].deliveryfinshdate,
                      contractnumber: response[j].contractnumber,
                    });
                  }
                }
              }
              const datatade = [];
              for (let m = 0; m < response.length; m++) {
                for (let n = 0; n < datated.length; n++) {
                  if (datated[n].contractnumber === response[m].contractnumber) {
                    datatade.push({
                      contracttype: response[m].contracttype,
                      custochinese: response[m].custochinese,
                      businesscode: response[m].businesscode,
                      pjnamejapanese: response[m].pjnamejapanese,
                      claimnumber: response[m].claimnumber,
                      deliveryfinshdate: response[m].deliveryfinshdate,
                      contractnumber: response[m].contractnumber,
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
        this.rowid = row.petition_id;
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
            name: 'PFANS1032FormView',
            params: {
              _id: this.rowid,
              disabled: false,
            },
          });
        } else if (val === 'update') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.$router.push({
            name: 'PFANS1032FormView',
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
