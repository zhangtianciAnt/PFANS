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


  export default {
    name: 'PFANS1028View',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        loading: false,
        title: 'title.PFANS1028VIEW',
        data: [],
        checkdata: [],
        columns: [
          {
            code: 'gfjudgeno',
            label: 'label.PFANS1028VIEW_NO',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'career',
            label: 'label.PFANS1028VIEW_CAREER',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'deployment',
            label: 'label.PFANS1028VIEW_ORGANIZATION',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'janame',
            label: 'label.PFANS1028VIEW_NAME',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'custoenglish',
            label: 'label.PFANS1032FORMVIEW_DEPOSITARY',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'varto',
            label: 'label.PFANS1028VIEW_COUNTRY',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'review',
            label: 'label.PFANS1028VIEW_REVIEW',
            width: 200,
            fix: false,
            filter: true,
          },

          {
            code: 'requirements',
            label: 'label.PFANS1028VIEW_REQUIREMENTS',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'claimdatetime',
            label: 'label.PFANS1028VIEW_PERIOD',
            width: 170,
            fix: false,
            filter: true,
          },
          {
            code: 'technical',
            label: 'label.PFANS1028VIEW_TECHNICAL',
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
        row_id: 'nonjudgment_id',
        janameflg: [],
      };
    },
    mounted() {
      this.getJaname();
    },
    methods: {
      getJaname() {
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
              .dispatch('PFANS5001Store/getFpans5001List', {})
              .then(response => {
                for (let j = 0; j < response.length; j++) {
                  this.janameflg.push({
                    pjcode: response[j].companyprojects_id,
                    pjname: response[j].project_name,
                  });
                }
                this.$store
                  .dispatch('PFANS1028Store/get', {})
                  .then(response => {
                    const datated = [];
                    for (let d = 0; d < this.checkdata.length; d++) {
                      for (let j = 0; j < response.length; j++) {
                        if (this.checkdata[d].contractnumber === response[j].contractnumber) {
                          if (response[j].requirements !== null && response[j].requirements !== '') {
                            if (this.$i18n) {
                              if (response[j].requirements === '0') {
                                response[j].requirements = this.$t('label.PFANS1028VIEW_NOT');
                              } else {
                                response[j].requirements = this.$t('label.PFANS1028VIEW_YES');
                              }
                            }

                          }
                          if (response[j].review !== null && response[j].review !== '') {
                            if (this.$i18n) {
                              if (response[j].review === '2') {
                                response[j].review = this.$t('label.PFANS1028VIEW_NOPANASG');
                              } else {
                                response[j].review = this.$t('label.PFANS1028VIEW_PANASG');
                              }
                            }

                          }
                          if (response[j].varto !== null && response[j].varto !== '') {
                            let letContracttype = getDictionaryInfo(response[j].varto);
                            if (letContracttype != null) {
                              response[j].varto = letContracttype.value1;
                            }
                          }
                          if (response[j].contractnumber !== null && response[j].contractnumber !== '') {
                            response[j].gfjudgeno = 'GF-' + response[j].contractnumber;
                          }
                          if (response[j].status !== null && response[j].status !== '') {
                            response[j].status = getStatus(response[j].status);
                          }
                          if (response[j].janame !== null && response[j].janame !== '') {
                            if (response[j].janame.split(',').length > 1) {
                              let aa = [];
                              let bb = '';
                              aa = response[j].janame.split(',');
                              for (let i = 0; i < aa.length; i++) {
                                for (let j = 0; j < this.janameflg.length; j++) {
                                  if (aa[i] === this.janameflg[j].pjcode) {
                                    bb = bb + this.janameflg[j].pjname + ',';
                                  }
                                }
                              }
                              if (bb !== '' && bb !== undefined) {
                                response[j].janame = bb.substring(0, bb.length - 1);
                              }
                            } else {
                              for (let i = 1; i < this.janameflg.length; i++) {
                                if (this.janameflg[i].pjcode === response[j].janame) {
                                  response[j].janame = this.janameflg[i].pjname;
                                }
                              }
                            }
                          }
                          datated.push({
                            gfjudgeno: response[j].gfjudgeno,
                            career: response[j].career,
                            deployment: response[j].deployment,
                            janame: response[j].janame,
                            custoenglish: response[j].custoenglish,
                            varto: response[j].varto,
                            review: response[j].review,
                            requirements: response[j].requirements,
                            claimdatetime: response[j].claimdatetime,
                            technical: response[j].technical,
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
                            gfjudgeno: response[m].gfjudgeno,
                            career: response[m].career,
                            deployment: response[m].deployment,
                            janame: response[m].janame,
                            custoenglish: response[m].custoenglish,
                            varto: response[m].varto,
                            review: response[m].review,
                            requirements: response[m].requirements,
                            claimdatetime: response[m].claimdatetime,
                            technical: response[m].technical,
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
        this.rowid = row.nonjudgment_id;
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
            name: 'PFANS1028FormView',
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
            name: 'PFANS1028FormView',
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
