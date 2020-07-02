<template>
  <EasyNormalTable
    :buttonList="buttonList"
    :columns="columns"
    :data="data"
    :rowid="row"
    :title="title"
    :selectable="selectInit"
    @buttonClick="buttonClick"
    @rowClick="rowClick"
    :handleShow="handleShow"
    @handleEdit="handleEdit"
    :showSelection="isShow"
    ref="roletable"
    v-loading="loading">
  </EasyNormalTable>
</template>
<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {Message} from 'element-ui';
  import moment from 'moment';
  import {getDictionaryInfo, getUserInfo, getOrgInfoByUserId} from '@/utils/customize';

  export default {
    name: 'PFANS1031View',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        checkdata: [],
        loading: false,
          isShow: true,
          handleShow: true,
        title: 'title.PFANS1031VIEW',
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
            code: 'depositjapanese',
            label: 'label.PFANS1032FORMVIEW_DEPOSITARY',
            width: 130,
            fix: false,
            filter: true,
          },
          {
            code: 'entrustment',
            label: 'label.PFANS1031FORMVIEW_ENTRUSTMENT',
            width: 140,
            fix: false,
            filter: true,
          },
          {
            code: 'deployment',
            label: 'label.PFANS1024VIEW_DEPLOYMENT',
            width: 140,
            fix: false,
            filter: true,
          },
          {
            code: 'pjnamejapanese',
            label: 'label.PFANS1025VIEW_PJNAME',
            width: 140,
            fix: false,
            filter: true,
          },
          {
            code: 'openingdate',
            label: 'label.PFANS1025VIEW_OPENINGDATE',
            width: 140,
            fix: false,
            filter: true,
          },
          {
            code: 'enddate',
            label: 'label.PFANS1025VIEW_ENDDATE',
            width: 140,
            fix: false,
            filter: true,
          },
          {
            code: 'deliveryfinshdate',
            label: 'label.PFANS1024VIEW_DELIVERYFINSHDATE',
            width: 140,
            fix: false,
            filter: true,
          },
          {
            code: 'deliverydate',
            label: 'label.PFANS1024VIEW_DELIVERYDATE',
            width: 140,
            fix: false,
            filter: true,
          },
          {
            code: 'claimamount',
            label: 'label.PFANS1024VIEW_CLAIMAMOUNT',
            width: 140,
            fix: false,
            filter: true,
          },
          {
            code: 'claimnumber',
            label: 'label.PFANS1032FORMVIEW_CLAIMNUMBER',
            width: 140,
            fix: false,
            filter: true,
          },
          {
            code: 'claimtype',
            label: 'label.PFANS1032FORMVIEW_CLAIMTYPE',
            width: 140,
            fix: false,
            filter: true,
          },
          {
            code: 'toto',
            label: 'label.PFANS1031FORMVIEW_TOTO',
            width: 120,
            fix: false,
            filter: true,
          },
            {
                code: 'sealstatus',
                label: 'label.PFANS1024VIEW_SEALSTATUS',
                width: 120,
                fix: false,
                filter: true,
            },
        ],
        buttonList: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
            {'key': 'sealapp', 'name': 'button.sealapp', 'disabled': false, 'icon': 'el-icon-view'},
        ],
          selectedlist: [],
        rowid: '',
        row: 'napalm_id',
      };
    },
    mounted() {
      this.loading = true;
      this.$store
        .dispatch('PFANS1026Store/get', {'type': '1'})
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
            .dispatch('PFANS1031Store/get', {})
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

                    if (response[j].claimtype !== null && response[j].claimtype !== '') {

                      let letContracttype = getDictionaryInfo(response[j].claimtype);

                      if (letContracttype != null) {
                        response[j].claimtype = letContracttype.value1;
                      }
                    }

                    if (response[j].currencyformat !== null && response[j].currencyformat !== '') {
                      let letContracttype = getDictionaryInfo(response[j].currencyformat);
                      if (letContracttype != null) {
                        response[j].currencyformat = letContracttype.value1;
                      }
                    }

                    if (response[j].toto !== null && response[j].toto !== '') {
                      let letContracttype = getDictionaryInfo(response[j].toto);
                      if (letContracttype != null) {
                        response[j].toto = letContracttype.value1;
                      }
                    }

                    if (response[j].judgment !== null && response[j].judgment !== '') {
                      let letContracttype = getDictionaryInfo(response[j].judgment);
                      if (letContracttype != null) {
                        response[j].judgment = letContracttype.value1;
                      }
                    }

                    if (response[j].determination !== null && response[j].determination !== '') {
                      let letContracttype = getDictionaryInfo(response[j].determination);
                      if (letContracttype != null) {
                        response[j].determination = letContracttype.value1;
                      }
                    }
                    if (response[j].enddate !== null && response[j].enddate !== '') {
                      response[j].enddate = moment(response[j].enddate).format('YYYY-MM-DD');
                    }
                    if (response[j].deliveryfinshdate !== null && response[j].deliveryfinshdate !== '') {
                      response[j].deliveryfinshdate = moment(response[j].deliveryfinshdate).format('YYYY-MM-DD');
                    }
                    if (response[j].deliverydate !== null && response[j].deliverydate !== '') {
                      response[j].deliverydate = moment(response[j].deliverydate).format('YYYY-MM-DD');
                    }
                    if (response[j].openingdate !== null && response[j].openingdate !== '') {
                      response[j].openingdate = moment(response[j].openingdate).format('YYYY-MM-DD');
                    }
                    if (response[j].depositjapanese !== null && response[j].depositjapanese !== '') {
                      let letUser = getUserInfo(response[j].depositjapanese);
                      if (letUser != null) {
                        response[j].depositjapanese = letUser.userinfo.customername;
                      }
                    }
                      if (this.$i18n) {
                          if (response[j].sealstatus === null || response[j].sealstatus === '') {
                              response[j].sealstatus = '';
                          } else if (response[j].sealstatus === '1') {
                              response[j].sealstatus = this.$t('label.PFANS1032FORMVIEW_NOTSTARTSEAL');
                          } else if (response[j].sealstatus === '2') {
                              response[j].sealstatus = this.$t('label.PFANS1032FORMVIEW_LOADINGSEAL');
                          } else if (response[j].sealstatus === '3') {
                              response[j].sealstatus = this.$t('label.PFANS1032FORMVIEW_ENDSEAL');
                          }
                      }
                    datated.push({
                      contractnumber: response[j].contractnumber,
                      contracttype: response[j].contracttype,
                      depositjapanese: response[j].depositjapanese,
                      entrustment: response[j].entrustment,
                      deployment: response[j].deployment,
                      pjnamejapanese: response[j].pjnamejapanese,
                      openingdate: response[j].openingdate,
                      enddate: response[j].enddate,
                      deliveryfinshdate: response[j].deliveryfinshdate,
                      deliverydate: response[j].deliverydate,
                      claimamount: response[j].claimamount,
                      claimnumber: response[j].claimnumber,
                      claimtype: response[j].claimtype,
                      toto: response[j].toto,
                        sealstatus: response[j].sealstatus,
                        sealid: response[j].sealid,
                      napalm_id: response[j].napalm_id,
                    });
                  }
                }
              }
              // const datatade = [];
              // for (let m = 0; m < response.length; m++) {
              //   for (let n = 0; n < datated.length; n++) {
              //     if (datated[n].contractnumber === response[m].contractnumber) {
              //       datatade.push({
              //         contractnumber: response[m].contractnumber,
              //         contracttype: response[m].contracttype,
              //         depositjapanese: response[m].depositjapanese,
              //         entrustment: response[m].entrustment,
              //         deployment: response[m].deployment,
              //         pjnamejapanese: response[m].pjnamejapanese,
              //         openingdate: response[m].openingdate,
              //         enddate: response[m].enddate,
              //         deliveryfinshdate: response[m].deliveryfinshdate,
              //         claimamount: response[m].claimamount,
              //         claimnumber: response[m].claimnumber,
              //         claimtype: response[m].claimtype,
              //         toto: response[m].toto,
              //         napalm_id: response[m].napalm_id,
              //       });
              //     }
              //   }
              // }
              this.data = datated;
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
        //add_fjl_添加合同回款相关  start
        selectInit(row, index) {
            if (this.$i18n) {
                return (moment(row.deliverydate).format("YYYY-MM") <= new moment().format("YYYY-MM") && row.sealstatus === '');
            }
        },
        handleEdit(row) {
            // if (row.sealid === '' || row.sealid === null) {
            //     Message({
            //         message: this.$t('label.PFANS1032FORMVIEW_SEALVIEW'),
            //         type: 'info',
            //         duration: 2 * 1000,
            //     });
            //     return;
            // }
            this.$router.push({
                name: 'PFANS4001FormView',
                params: {
                    _id: row.sealid,
                    disabled: true,
                },
            });
        },
        //add_fjl_添加合同回款相关  end
      rowClick(row) {
        this.rowid = row.napalm_id;
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
            name: 'PFANS1031FormView',
            params: {
              _id: this.rowid,
              disabled: false,
            },
          });
        }
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
            name: 'PFANS1031FormView',
            params: {
              _id: this.rowid,
              disabled: true,
            },
          });
        }
          //add_fjl_添加合同回款相关  start
          if (val === "sealapp") {
              this.selectedlist = this.$refs.roletable.selectedList;
              if (this.$refs.roletable.selectedList.length === 0) {
                  Message({
                      message: this.$t('normal.info_01'),
                      type: 'info',
                      duration: 2 * 1000,
                  });
                  return;
              }
              let ppid = "";
              let bookid = "";
              if (this.selectedlist.length > 0) {
                  for (let i = 0; i < this.selectedlist.length; i++) {
                      ppid += this.selectedlist[i].napalm_id + ",";
                  }
                  if (ppid && ppid.length > 0) {
                      bookid = "5," + ppid.substr(0, ppid.length - 1);
                  }
              }
              let crePe = {};
              let centerid = "";
              let groupid = "";
              let teamid = "";
              let userid = "";
              let filetype = 'PC002005';//纳品书
              if (this.$store.getters.userinfo.userid !== null && this.$store.getters.userinfo.userid !== '') {
                  let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
                  if (rst) {
                      centerid = rst.centerId;
                      groupid = rst.groupId;
                      teamid = rst.teamId;
                  }
                  userid = this.$store.getters.userinfo.userid;
              }
              crePe.userid = userid;
              crePe.centerid = centerid;
              crePe.groupid = groupid;
              crePe.teamid = teamid;
              crePe.filetype = filetype;
              crePe.bookid = bookid;
              crePe.application_date = moment(new Date()).format("YYYY-MM-DD");
              this.loading = true;
              this.$store
                  .dispatch('PFANS4001Store/createbook', crePe)
                  .then(response => {
                      let peid = response.sealid;
                      this.$store.commit('global/SET_OPERATEID', peid);
                      this.$router.push({
                          name: 'PFANS4001FormView',
                          params: {
                              _id: peid,
                              disabled: true,
                              // petdata: this.selectedlist,
                          },
                      });
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
          //add_fjl_添加合同回款相关  end
      },
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
