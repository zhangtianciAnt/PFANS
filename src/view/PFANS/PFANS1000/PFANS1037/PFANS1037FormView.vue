<template>
  <div>
    <EasyNormalTable
      ref="dataTable"
      :buttonList="buttonList"
      :columns="columns"
      v-show="this.showTable===1"
      :data="data"
      :title="title"
      :rowid="row"
      @buttonClick="buttonClick"
      @rowClick="rowClick"
      v-loading="loading"
      :showSelection="true"
      :selectable="selectInit"
    ></EasyNormalTable>
    <EasyNormalTable
      ref="dataTable"
      :buttonList="buttonList"
      :columns="columns1"
      v-show="this.showTable===2"
      :data="data"
      :title="title"
      :rowid="row"
      @buttonClick="buttonClick"
      @rowClick="rowClick"
      v-loading="loading"
      :showSelection="true"
      :selectable="selectInit"
    ></EasyNormalTable>
    <EasyNormalTable
      ref="dataTable"
      :buttonList="buttonList"
      :columns="columns2"
      v-show="this.showTable===3"
      :data="data"
      :title="title"
      :rowid="row"
      @buttonClick="buttonClick"
      @rowClick="rowClick"
      v-loading="loading"
      :showSelection="true"
      :selectable="selectInit"
    ></EasyNormalTable>
  </div>
</template>

<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {Message} from 'element-ui';
  import {getDictionaryInfo, getOrgInfoByUserId, getStatus, getUserInfo, getOrgInfo} from '@/utils/customize';
  import moment from 'moment';

  export default {
    name: 'PFANS1037FormView',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        loading: false,
        showTable: '',
        selectedlist: [],
        comIdList: [],
        title: '',
        // 表格数据源
        data: [],
        // 列属性
        //软件处理决裁
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
            code: 'processingmethod',
            label: 'label.PFANS1039FORMVIEW_KIND',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'createon',
            label: 'label.information_start',
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
        //软件移转申请
        columns1: [
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
            code: 'ferrygroup_id',
            label: 'label.PFANS1008FORMVIEW_CROSSINGDEPARTMENT',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'tubegroup_id',
            label: 'label.PFANS1008FORMVIEW_TRANSFERDEPARTMENT',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'management',
            label: 'label.PFASN1023FORMVIEW_MANAGEMENT',
            width: 240,
            fix: false,
            filter: false,
          },
          {
            code: 'assetname',
            label: 'label.PFANS1036FORMVIEW_ASSETNAME',
            width: 200,
            fix: false,
            filter: false,
          },
          {
            code: 'createon',
            label: 'label.information_start',
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
        //固定资产借出修理持出决裁
        columns2: [
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
          // 禅道67 start
          {
            code: 'createon',
            label: 'label.information_start',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'rfid',
            label: 'label.PFANS1008FORMVIEW_ASSETMANAGEMENTNUMBER',
            width: 140,
            fix: false,
            filter: false,
          },
          {
            code: 'assetname',
            label: 'label.PFANS1008FORMVIEW_ASSETNAME',
            width: 140,
            fix: false,
            filter: false,
          },
          {
            code: 'repair',
            label: 'label.PFANS1009FORMVIEW_REPAIR1',
            width: 200,
            fix: false,
            filter: true,
          },
          // 禅道67 end
          {
            code: 'status',
            label: 'label.approval_status',
            width: 120,
            fix: false,
            filter: true,
          },
        ],
        buttonList: [
          {
            key: 'view',
            name: 'button.view',
            disabled: false,
            icon: 'el-icon-view'
          },
          // {
          //   key: 'insert',
          //   name: 'button.insert',
          //   disabled: false,
          //   icon: 'el-icon-plus'
          // },
          {
            key: 'update',
            name: 'button.update',
            disabled: false,
            icon: 'el-icon-edit'
          },
          {
            key: "export",
            name: "button.printing",
            disabled: false,
            icon: "el-icon-download"
          }
        ],
        rowid: '',
        row: '',
        url: '',
        // row_id: ""
      };
    },
    mounted() {
      this.getCompanyProjectList(this.$route.params.title);
    },
    created(){
      if (this.$route.params.title === 7) {
        this.showTable = 1;
        this.row = 'assetinformationid';
        this.title = 'title.PFANS1007VIEW';
      } else if (this.$route.params.title === 8) {
        this.showTable = 2;
        this.row = 'softwaretransfer_id';
        this.title = 'title.PFANS1008VIEW';
      } else if (this.$route.params.title === 9) {
        this.showTable = 3;
        this.row = 'fixedassets_id';
        this.title = 'title.PFANS1009VIEW';
      }
    },
    methods: {
      getCompanyProjectList(val) {
        if (val === 7) {
          this.row = 'assetinformationid';
          this.title = 'title.PFANS1007VIEW';
          this.dispatch('PFANS1037Store/getAssetinformation');
        } else if (val === 8) {
          this.row = 'softwaretransfer_id';
          this.title = 'title.PFANS1008VIEW';
          this.dispatch('PFANS1037Store/getSoftwaretransfer');
        } else if (val === 9) {
          this.row = 'fixedassets_id';
          this.title = 'title.PFANS1009VIEW';
          this.dispatch('PFANS1037Store/getFixedassets');
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
          //1
          if (response[j].processingmethod !== null && response[j].processingmethod !== '') {
            let letprocessingmethod = getDictionaryInfo(response[j].processingmethod);
            if (letprocessingmethod != null) {
              response[j].processingmethod = letprocessingmethod.value1;
            }
          }
          if (response[j].createon != null && response[j].createon != "") {
            response[j].createon = moment(response[j].createon).format('YYYY-MM-DD')
          }
          //2
          if (response[j].ferrygroup_id !== null && response[j].ferrygroup_id !== '') {
            let group = getOrgInfo(response[j].ferrygroup_id);
            if (group) {
              response[j].ferrygroup_id = group.companyname;
            }
          }
          if (response[j].tubegroup_id !== null && response[j].tubegroup_id !== '') {
            let group = getOrgInfo(response[j].tubegroup_id);
            if (group) {
              response[j].tubegroup_id = group.companyname;
            }
          }
        }
        return response;
        this.loading = false;
      },
      selectInit(row, index) {
        return row.status === "正常结束";
      },
      rowClick(row) {
        if (this.$route.params.title === 7) {
          this.rowid = row.assetinformationid;
        } else if (this.$route.params.title === 8) {
          this.rowid = row.softwaretransfer_id;
        } else if (this.$route.params.title === 9) {
          this.rowid = row.fixedassets_id;
        }
      },
      buttonClick(val) {
        let letname;
        if (this.$route.params.title === 7) {
          letname = 'PFANS1007FormView';
        } else if (this.$route.params.title === 8) {
          letname = 'PFANS1008FormView';
        } else if (this.$route.params.title === 9) {
          letname = 'PFANS1009FormView';
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
        if (val === "export") {
          this.comIdList = [];
          if (this.$refs.dataTable.selectedList.length === 0) {
            Message({
              message: this.$t("normal.info_01"),
              type: "info",
              duration: 2 * 1000
            });
            return;
          }
          this.loading = true;
          this.selectedlist = this.$refs.dataTable.selectedList;

          if (this.$route.params.title === 7) {
            this.export1(0);
          } else if (this.$route.params.title === 8) {
            this.export2(0);
          } else if (this.$route.params.title === 9) {
            this.export3(0);
          }
        }
      },
      export1(val) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1007Store/downLoad', {assetinformationId: this.$refs.dataTable.selectedList[val].assetinformationid})
          .then(response => {
            this.loading = false;
            if (val < this.$refs.dataTable.selectedList.length - 1) {
              val = val + 1;
              this.export1(val);
            }
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
            this.loading = false;
          })
      },
      export2(val) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1008Store/downLoad', {softwaretransfer_id: this.$refs.dataTable.selectedList[val].softwaretransfer_id})
          .then(response => {
            this.loading = false;
            if (val < this.$refs.dataTable.selectedList.length - 1) {
              val = val + 1;
              this.export2(val);
            }
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
            this.loading = false;
          })
      },
      export3(val) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1009Store/downLoad', {fixedassetsId: this.$refs.dataTable.selectedList[val].fixedassets_id})
          .then(response => {
            this.loading = false;
            if (val < this.$refs.dataTable.selectedList.length - 1) {
              val = val + 1;
              this.export3(val);
            }
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
            this.loading = false;
          })
      }
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
