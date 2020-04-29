<template>
  <div>
    <EasyNormalTable :title="title" :columns="columns" :data="data" :rowid="row" :buttonList="buttonList"
                     @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading" v-show="this.showTable===1">
    </EasyNormalTable>
    <!--    ADD-WS-决裁编号添加-->
    <EasyNormalTable :buttonList="buttonList" :columns="columns2" :data="data" :title="title" v-loading="loading"
                     v-show="this.showTable===2" @buttonClick="buttonClick" @rowClick="rowClick" :rowid="row">
    </EasyNormalTable>
    <!--    ADD-WS-决裁编号添加-->
    <!--    ADD-WS-费用编号添加-->
    <EasyNormalTable :buttonList="buttonList" :columns="columns3" :data="data" :title="title" v-loading="loading"
                     v-show="this.showTable===3" @buttonClick="buttonClick" @rowClick="rowClick" :rowid="row">
    </EasyNormalTable>
    <!--    ADD-WS-费用编号添加-->
  </div>
</template>

<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {Message} from 'element-ui';
  import {getOrgInfoByUserId, getStatus, getUserInfo} from '@/utils/customize';

  export default {
    name: 'PFANS1001FormView',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        options: [],
        showTable: '',
        loading: false,
        title: '',
        // 表格数据源
        data: [],
        //ADD-WS-费用编号添加
        columns3: [
          {
            code: 'purchasenumbers',
            label: 'label.PFANS1005VIEW_NUMBERS',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'remarks',
            label: 'label.PFANS1012VIEW_ABSTRACT',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'user_id',
            label: 'label.applicant',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'center_id',
            label: 'label.center',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'group_id',
            label: 'label.group',
            width: 130,
            fix: false,
            filter: true,
          },
          {
            code: 'team_id',
            label: 'label.team',
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
        ],
        //ADD-WS-费用编号添加
        //ADD-WS-决裁编号添加
        columns2: [
          {
            code: 'judgnumbers',
            label: 'label.PFANS1001FORMVIEW_NUMBERS',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'filename',
            label: 'label.PFANS1012VIEW_ABSTRACT',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'user_id',
            label: 'label.applicant',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'center_id',
            label: 'label.center',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'group_id',
            label: 'label.group',
            width: 130,
            fix: false,
            filter: true,
          },
          {
            code: 'team_id',
            label: 'label.team',
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
        ],
        //ADD-WS-决裁编号添加
        // 列属性
        columns: [
          {
            code: 'user_id',
            label: 'label.applicant',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'center_id',
            label: 'label.center',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'group_id',
            label: 'label.group',
            width: 130,
            fix: false,
            filter: true,
          },
          {
            code: 'team_id',
            label: 'label.team',
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
        ],
        buttonList: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
        ],
        rowid: '',
        row: '',
        url: '',
      };
    },
    mounted() {
      this.getCompanyProjectList(this.$route.params.title);
    },
    methods: {
      getCompanyProjectList(val) {
        if (val === 1) {
          //ADD-WS-决裁编号添加
          this.showTable = 1;
          //ADD-WS-决裁编号添加
          this.row = 'business_id';
          this.title = 'title.PFANS1002VIEW';
          let businesstype = {'businesstype': '0'};
          this.dispatchparameter('PFANS1001Store/getBusiness', businesstype);
        } else if (val === 2) {
          //ADD-WS-决裁编号添加
          this.showTable = 1;
          //ADD-WS-决裁编号添加
          this.row = 'business_id';
          this.title = 'title.PFANS1035VIEW';
          let businesstype = {'businesstype': '1'};
          this.dispatchparameter('PFANS1001Store/getBusiness', businesstype);
        } else if (val === 3) {

          //ADD-WS-决裁编号添加
          this.showTable = 2;
          //ADD-WS-决裁编号添加
          this.row = 'judgementid';
          this.title = 'title.PFANS1003VIEW';
          let letequipment = {'equipment': '1'};
          this.dispatchparameter('PFANS1001Store/getJudgement', letequipment);
        } else if (val === 4) {
          //ADD-WS-决裁编号添加
          this.showTable = 2;
          //ADD-WS-决裁编号添加
          this.row = 'judgementid';
          this.title = 'title.PFANS1004VIEW';
          let letequipment = {'equipment': '0'};
          this.dispatchparameter('PFANS1001Store/getJudgement', letequipment);
        } else if (val === 5) {
          //ADD-WS-费用编号添加
          this.showTable = 3;
          //ADD-WS-费用编号添加
          this.row = 'purchaseapply_id';
          this.title = 'title.PFANS1005VIEW';
          this.dispatch('PFANS1001Store/getpurchaseApply');
        } else if (val === 6) {
          //ADD-WS-决裁编号添加
          this.showTable = 1;
          //ADD-WS-决裁编号添加
          this.row = 'loanapplication_id';
          this.title = 'title.PFANS1006VIEW';
          this.dispatch('PFANS1001Store/getLoanapplication');
        } else if (val === 10) {
          //ADD-WS-决裁编号添加
          this.showTable = 1;
          //ADD-WS-决裁编号添加
          this.row = 'communication_id';
          this.title = 'title.PFANS1010VIEW';
          this.dispatch('PFANS1001Store/getCommunication');
        } else if (val === 11) {
          //ADD-WS-决裁编号添加
          this.showTable = 1;
          //ADD-WS-决裁编号添加
          this.row = 'offshore_id';
          this.title = 'title.PFANS1011VIEW';
          this.dispatch('PFANS1001Store/getOffshore');
        }
      },
      dispatch(val) {
        this.data = [];
        this.loading = true;
        this.$store
          .dispatch(val)
          .then(response => {
            this.data = this.setuser(response);
            this.loading = false;
          });
      },
      dispatchparameter(val, letequipment) {
        this.data = [];
        this.loading = true;
        this.$store
          .dispatch(val, letequipment)
          .then(response => {
            this.data = this.setuser(response);
            this.loading = false;
          });
      },
      setuser(response) {
        for (let j = 0; j < response.length; j++) {
          let nameflg = getOrgInfoByUserId(response[j].user_id);
          if (nameflg) {
            response[j].center_id = nameflg.centerNmae;
            response[j].group_id = nameflg.groupNmae;
            response[j].team_id = nameflg.teamNmae;
          }
          let user = getUserInfo(response[j].user_id);
          if (user) {
            response[j].user_id = getUserInfo(response[j].user_id).userinfo.customername;
          }
          if (response[j].status !== null && response[j].status !== '') {
            response[j].status = getStatus(response[j].status);
          }
        }
        return response;
        this.loading = false;
      },
      rowClick(row) {
        if (this.$route.params.title === 1) {
          this.rowid = row.business_id;
        } else if (this.$route.params.title === 2) {
          this.rowid = row.business_id;
        } else if (this.$route.params.title === 3) {
          this.rowid = row.judgementid;
        } else if (this.$route.params.title === 4) {
          this.rowid = row.judgementid;
        } else if (this.$route.params.title === 5) {
          this.rowid = row.purchaseapply_id;
        } else if (this.$route.params.title === 6) {
          this.rowid = row.loanapplication_id;
        } else if (this.$route.params.title === 10) {
          this.rowid = row.communication_id;
        } else if (this.$route.params.title === 11) {
          this.rowid = row.offshore_id;
        }
      },
      buttonClick(val) {
        let letname;
        if (this.$route.params.title === 1) {
          letname = 'PFANS1002FormView';
        } else if (this.$route.params.title === 2) {
          letname = 'PFANS1035FormView';
        } else if (this.$route.params.title === 3) {
          letname = 'PFANS1003FormView';
        } else if (this.$route.params.title === 4) {
          letname = 'PFANS1004FormView';
        } else if (this.$route.params.title === 5) {
          letname = 'PFANS1005FormView';
        } else if (this.$route.params.title === 6) {
          letname = 'PFANS1006FormView';
        } else if (this.$route.params.title === 10) {
          letname = 'PFANS1010FormView';
        } else if (this.$route.params.title === 11) {
          letname = 'PFANS1011FormView';
        }
        this.$store.commit('global/SET_HISTORYURL', '');
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
            name: letname,
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
            });
            return;
          }
          this.$router.push({
            name: letname,
            params: {
              _id: this.rowid,
              disabled: false,
            },
          });
        }
        if (val === 'insert') {
          this.$router.push({
            name: letname,
            params: {
              _id: '',
              disabled: true,
            },
          });
        }
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
