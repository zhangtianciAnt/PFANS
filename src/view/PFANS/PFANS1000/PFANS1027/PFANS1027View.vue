<template>
  <EasyNormalTable :title="title" :columns="columns" :data="data" :rowid="row" :buttonList="buttonList"
                   @buttonClick="buttonClick" @handleSelectionChange="handleSelectionChange" @rowClick="rowClick"
                   v-loading="loading" :showSelection="isShow" :showIndex="isShow">
  </EasyNormalTable>
</template>

<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {Message} from 'element-ui';
  import moment from 'moment';
  import {getOrgInfoByUserId, getUserInfo, getDictionaryInfo} from '@/utils/customize';

  export default {
    name: 'PFANS1027View',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        loading: false,
        title: 'title.PFANS1027VIEW',
        data: [],
        checkdata: [],
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
            width: 140,
            fix: false,
            filter: true,
          },
          {
            code: 'deployment',
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
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'enddate',
            label: 'label.PFANS1025VIEW_ENDDATE',
            width: 150,
            fix: false,
            filter: true,
          },
        ],
        buttonList: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
        ],
        rowid: '',
        row: 'quotationid',
        isShow: false,
        selectedlist: [],
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
            .dispatch('PFANS1027Store/get')
            .then(response => {
              const datated = [];
              for (let d = 0; d < this.checkdata.length; d++) {
                for (let j = 0; j < response.length; j++) {
                  if (this.checkdata[d].contractnumber === response[j].contractnumber) {
                    if (response[j].startdate !== null && response[j].startdate !== '') {
                      response[j].startdate = moment(response[j].startdate).format('YYYY-MM-DD');
                    }
                    if (response[j].enddate !== null && response[j].enddate !== '') {
                      response[j].enddate = moment(response[j].enddate).format('YYYY-MM-DD');
                    }
                    if (response[j].contracttype !== null && response[j].contracttype !== '') {
                      let letContracttype = getDictionaryInfo(response[j].contracttype);
                      if (letContracttype != null) {
                        response[j].contracttype = letContracttype.value1;
                      }
                    }
                    if (response[j].trusteejapanese !== null && response[j].trusteejapanese !== '') {
                      let user = getUserInfo(response[j].trusteejapanese);
                      if (user) {
                        response[j].trusteejapanese = user.userinfo.customername;
                      }
                    }
                    datated.push({
                      contracttype: response[j].contracttype,
                      trusteejapanese: response[j].trusteejapanese,
                      entrustedjapanese: response[j].entrustedjapanese,
                      deployment: response[j].deployment,
                      pjjapanese: response[j].pjjapanese,
                      startdate: response[j].startdate,
                      enddate: response[j].enddate,
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
                      trusteejapanese: response[m].trusteejapanese,
                      entrustedjapanese: response[m].entrustedjapanese,
                      deployment: response[m].deployment,
                      pjjapanese: response[m].pjjapanese,
                      startdate: response[m].startdate,
                      enddate: response[m].enddate,
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
      handleSelectionChange(val) {
        this.selectedlist = val;
      },
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
              duration: 2 * 1000,
            });
            return;
          }
          this.$router.push({
            name: 'PFANS1027FormView',
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
            name: 'PFANS1027FormView',
            params: {
              _id: this.rowid,
              disabled: false,
            },
          });
        }
        if (val === 'export') {
          this.loading = true;
          this.$store
            .dispatch('PFANS1027Store/downLoad', this.selectedlist[0])
            .then(response => {
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
        }
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
