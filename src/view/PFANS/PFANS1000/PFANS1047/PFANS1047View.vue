<template>
  <div>
    <EasyNormalTable :buttonList="buttonList"
                     :columns="columns"
                     :data="data"
                     :title="title"
                     :rowid="row_id"
                     @buttonClick="buttonClick"
                     @rowClick="rowClick"
                     v-loading="loading"
                     :selectable="selectInit"
                     :handleShow="handleShow"
                     @handleEdit="handleEdit"
                     ref="roletable"
                     :showSelection="isShow">
    </EasyNormalTable>
  </div>
</template>

<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {getDictionaryInfo, getStatus,getOrgInfoByUserId} from '@/utils/customize';
  import {Message} from 'element-ui';
  let moment = require('moment');

  export default {
    name: 'PFANS1047View',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        loading: false,
        title: 'title.PFANS1047VIEW',
        data: [],
        checkdata: [],
        columns: [
          {
            code: 'contractnumber',
            label: 'label.PFANS1024VIEW_CONTRACTNUMBER',
            width: 150,
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
            code: 'deployment',
            label: 'label.PFANS1024VIEW_DEPLOYMENT',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'currencyposition',
            label: 'label.PFANS1025VIEW_CURRENCYFORMAT',
            width: 120,
            fix: false,
            filter: false,
          },
          {
            code: 'claimamount',
            label: 'label.PFANS1024VIEW_CLAIMAMOUNT',
            width: 120,
            fix: false,
            filter: false,
          },
          {
            code: 'status',
            label: 'label.approval_status',
            width: 120,
            fix: false,
            filter: true
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
          {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
          {'key': 'sealapp', 'name': 'button.sealapp', 'disabled': false, 'icon': 'el-icon-view'},
        ],
        selectedlist: [],
        rowid: '',
        row_id: 'award_id',
        pjnameflg: [],
        handleShow: true,
        isShow: true,
      };
    },
    mounted() {
      this.getPjanme();
    },
    methods: {
      handleEdit(row) {
        this.$router.push({
          name: 'PFANS4001FormView',
          params: {
            _id: row.sealid,
            disabled: true,
          },
        });
      },
      selectInit(row, index) {
        if (this.$i18n) {
          return (row.status === this.$t("label.PFANS5004VIEW_OVERTIME") && row.sealstatus === '');
        }
      },
      getPjanme() {
        this.loading = true;
        this.$store
          .dispatch('PFANS1025Store/getList', {'maketype': '8'})
          .then(response => {
            for (let i = 0; i < response.length; i++)
            {
              //契约种类
              if (response[i].contracttype !== null && response[i].contracttype !== '') {
                let letContracttype = getDictionaryInfo(response[i].contracttype);
                if (letContracttype != null) {
                  response[i].contracttype = letContracttype.value1;
                }
              }
              //审批状态
              if (response[i].status !== null && response[i].status !== '') {
                response[i].status = getStatus(response[i].status);
              }
              //通货形式
              if (response[i].currencyposition !== null && response[i].currencyposition !== '') {
                let letCurrencyposition = getDictionaryInfo(response[i].currencyposition);
                if (letCurrencyposition != null) {
                  response[i].currencyposition = letCurrencyposition.value1;
                }
              }
              //印章状态
              if (this.$i18n) {
                if (response[i].sealstatus === null || response[i].sealstatus === '') {
                  response[i].sealstatus = '';
                } else if (response[i].sealstatus === '1') {
                  response[i].sealstatus = this.$t('label.PFANS1032FORMVIEW_NOTSTARTSEAL');
                } else if (response[i].sealstatus === '2') {
                  response[i].sealstatus = this.$t('label.PFANS1032FORMVIEW_LOADINGSEAL');
                } else if (response[i].sealstatus === '3') {
                  response[i].sealstatus = this.$t('label.PFANS1032FORMVIEW_ENDSEAL');
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

          });
      },
      rowClick(row) {
        this.rowid = row.award_id;
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
            name: 'PFANS1047FormView',
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
            name: 'PFANS1047FormView',
            params: {
              _id: this.rowid,
              disabled: false,
            },
          });
        }
        if (val === "sealapp") {
          debugger;
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
              ppid += this.selectedlist[i].award_id + ",";
            }
            if (ppid && ppid.length > 0) {
              bookid = "8," + ppid.substr(0, ppid.length - 1);
            }
          }
          let crePe = {};
          let centerid = "";
          let groupid = "";
          let teamid = "";
          let userid = "";
          let filetype = 'PC002001';//合同
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
      },
    },
  };
</script>

<style scoped>

</style>
