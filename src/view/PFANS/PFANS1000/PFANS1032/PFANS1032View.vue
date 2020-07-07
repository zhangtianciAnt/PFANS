<template>
  <EasyNormalTable
    :buttonList="buttonList"
    :columns="columns"
    :data="data"
    :rowid="row_id"
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
  import {getDictionaryInfo, getOrgInfoByUserId, getStatus, getUserInfo} from '@/utils/customize';

  export default {
    name: 'PFANS1032View',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
          handleShow: true,
        checkdata: [],
        loading: false,
          isShow: true,
        title: 'title.PFANS1032VIEW',
        data: [],
        columns: [
          {
            code: 'contractnumber',
            label: 'label.PFANS1032FORMVIEW_CONTRACTNUMBER',
            width: 120,
            fix: false,
            filter: false,
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
            filter: false,
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
              code: 'claimdate',
              label: 'label.PFANS1024VIEW_CLAIMDATE',
              width: 150,
              fix: false,
              filter: true,
          },
            {
                code: 'sealstatus',
                label: 'label.PFANS1024VIEW_SEALSTATUS',
            width: 150,
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
        row_id: 'petition_id',
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
                      if (response[j].claimdate !== null && response[j].claimdate !== '') {
                          response[j].claimdate = moment(response[j].claimdate).format('YYYY-MM-DD');
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
                      contracttype: response[j].contracttype,
                      custochinese: response[j].custochinese,
                      businesscode: response[j].businesscode,
                      pjnamejapanese: response[j].pjnamejapanese,
                      claimnumber: response[j].claimnumber,
                        claimdate: response[j].claimdate,
                      contractnumber: response[j].contractnumber,
                        sealstatus: response[j].sealstatus,
                        sealid: response[j].sealid,
                      petition_id: response[j].petition_id,
                    });
                  }
                }
              }
              // const datatade = [];
              // for (let m = 0; m < response.length; m++) {
              //   for (let n = 0; n < datated.length; n++) {
              //     if (datated[n].contractnumber === response[m].contractnumber) {
              //       datatade.push({
              //         contracttype: response[m].contracttype,
              //         custochinese: response[m].custochinese,
              //         businesscode: response[m].businesscode,
              //         pjnamejapanese: response[m].pjnamejapanese,
              //         claimnumber: response[m].claimnumber,
              //         deliveryfinshdate: response[m].deliveryfinshdate,
              //         contractnumber: response[m].contractnumber,
              //         petition_id: response[m].petition_id,
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
                return (moment(row.claimdate).format("YYYY-MM") <= new moment().format("YYYY-MM") && row.sealstatus === '');
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
        } else if (val === "sealapp") {
            //add_fjl_添加合同回款相关  start
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
                    ppid += this.selectedlist[i].petition_id + ",";
                }
                if (ppid && ppid.length > 0) {
                    bookid = "6," + ppid.substr(0, ppid.length - 1);
                }
            }
            let crePe = {};
            let centerid = "";
            let groupid = "";
            let teamid = "";
            let userid = "";
            let filetype = 'PC002004';//请求书
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
            //add_fjl_添加合同回款相关  end
        }
      },
    },
  };
</script>

<style scoped>

</style>
