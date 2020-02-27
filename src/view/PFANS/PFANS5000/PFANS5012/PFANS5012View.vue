<template>
  <div>
    <EasyNormalTable :title="title" :columns="columns" :data="data" :buttonList="buttonList" ref="roletable"
                     @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading" :rowid="rowid" >
    </EasyNormalTable>
  </div>
</template>
<script>
  import {getToken} from '@/utils/auth'
  import EasyNormalTable from "@/components/EasyNormalTable";
  import {Message} from 'element-ui';
  import {getOrgInfoByUserId, getUserInfo} from "../../../../utils/customize";
  let moment = require("moment");
  export default {
    name: 'PFANS5012View',
    components: {
      EasyNormalTable
    },
    data() {
      return {
        totaldata: [],
        total: 0,
        message: [{hang: '', error: '',}],
        Message1: true,
        result: false,
        cuowu: '',
        daoru: false,
        checkTableData: [],
        addActionUrl: '',
        resultShow: false,
        file: null,
        successCount: 0,
        errorCount: 0,
        errorList: [],
        downloadLoading: false,
        loading: false,
        title: "title.PFANS5012View",
        data: [],
        transferData: [],
        selectedlist: [],
        columns: [
          {
            code: 'center_name',
            label: 'label.center',
            width: 140,
            fix: false,
            filter: true
          },
          {
            code: 'group_name',
            label: 'label.group',
            width: 140,
            fix: false,
            filter: true
          },
          // {
          //   code: 'project_id',
          //   label: 'label.PFANS5008VIEW_PROGRAM',
          //   width: 120,
          //   fix: false,
          //   filter: true
          // },
          {
            code: 'log_date',
            label: 'label.PFANS5008VIEW_RIQI',
            width: 140,
            fix: false,
            filter: true
          },
          {
            code: 'time_start',
            label: 'label.PFANS5008FORMVIEW_SC',
            width: 140,
            fix: false,
            filter: true
          },
        ],
        buttonList: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
        ],
        row: '',
        rowid: 'logmanagement_id',
      };
    },
    mounted() {
      this.getProjectList();
      this.$store.commit('global/SET_OPERATEID', '');
    },
    methods: {
      // handleSizeChange(val) {
      //   this.listQuery.limit = val
      //   this.getList()
      // },
      // handleCurrentChange(val) {
      //   this.listQuery.page = val
      //   this.getList()
      // },
      getList() {
        this.loading = true
        let start = (this.listQuery.page - 1) * this.listQuery.limit
        let end = this.listQuery.page * this.listQuery.limit
        if (this.totaldata) {
          let pList = this.totaldata.slice(start, end)
          this.message = pList
          this.total = this.totaldata.length
        }
        this.loading = false
      },
      // handleChange(file, fileList) {
      //   this.clear(true);
      // },
      // handleSuccess(response, file, fileList) {
      //   if (response.code !== 0) {
      //     this.cuowu = response.message;
      //     this.Message1 = true;
      //   } else {
      //     let datalist = [];
      //     for (let c = 0; c < response.data.length; c++) {
      //       let error = response.data[c];
      //       error = error.substring(0, 3);
      //       if (error === this.$t("label.PFANS2005FORMVIEW_SB")) {
      //         this.errorCount = response.data[c].substring(4)
      //         this.resultShow = true;
      //       }
      //       if (error === this.$t("label.PFANS2005FORMVIEW_CG")) {
      //         this.successCount = response.data[c].substring(4)
      //         this.resultShow = true;
      //       }
      //       if (error === this.$t("label.PFANS2017VIEW_D")) {
      //         let obj = {};
      //         var str = response.data[c];
      //         var aPos = str.indexOf(this.$t("label.PFANS2017VIEW_BAN"));
      //         var bPos = str.indexOf(this.$t("label.PFANS2017VIEW_DE"));
      //         var r = str.substr(aPos + 1, bPos - aPos - 1);
      //         obj.hang = r;
      //         obj.error = response.data[c].substring(6);
      //         datalist[c] = obj;
      //       }
      //       this.message = datalist;
      //       this.totaldata = this.message;
      //       if (this.errorCount === "0") {
      //         this.result = false;
      //       } else {
      //         this.result = true;
      //       }
      //       this.getList();
      //       this.getProjectList();
      //     }
      //   }
      // },
      // clear(safe) {
      //   this.file = null;
      //   this.resultShow = false;
      //   this.Message1 = false;
      //   this.result = false;
      //   if (!safe) {
      //     this.$refs.uploader.clearFiles();
      //   }
      // },
      rowClick(row) {
        this.row = row.logmanagement_id;
      },
      getProjectList() {
        this.loading = true;
        this.$store
          .dispatch('PFANS5008Store/getProjectList', {})
          .then(response => {
            const data = [];
            for (let i = 0; i < response.length; i++) {
              data.push({
                key: response[i].project_id,
                label: response[i].project_name,
              });
            }
            this.transferData = data;
            this.$store
              .dispatch('PFANS5008Store/getDataList', {})
              .then(response => {
                  let datalist = [];
                  for (let j = 0; j < response.length; j++) {
                    for (let i = 0; i < this.transferData.length; i++) {
                      if (this.transferData[i].key === response[j].project_id) {
                        response[j].project_id = this.transferData[i].label;
                        console.log("asdasd   " + response[j].project_id);
                      }
                    }
                    let lst = getOrgInfoByUserId(response[j].createby);
                    let user = getUserInfo(response[j].createby)
                    if (user) {
                      response[j].username = user.userinfo.customername;
                    }
                    response[j].center_name = lst.centerNmae;
                    response[j].group_name = lst.groupNmae;
                    response[j].team_name = lst.teamNmae;
                    response[j].log_date = moment(response[j].log_date).format("YYYY-MM-DD");
                    if (response[j].time_end !== null && response[j].time_end !== "") {
                      response[j].time_end = moment(response[j].time_end).format("HH:mm");
                    }
                  }
                  this.data = response;
                  this.loading = false;
                }
              )
              .catch(error => {
                Message({
                  message: error,
                  type: 'error',
                  duration: 5 * 1000
                });
                this.loading = false;
              })
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000
            })
          })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      },
      buttonClick(val) {
        this.$store.commit('global/SET_HISTORYURL', this.$route.path)
        if (val === 'update') {
          if (this.row === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000
            })
            return;
          }
          this.$router.push({
            name: 'PFANS5012FormView',
            params: {
              _id: this.row,
              disabled: true
            }
          });
        } else if (val === 'view') {
          if (this.row === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000
            })
            return;
          }
          this.$router.push({
            name: "PFANS5012FormView",
            params: {
              _id: this.row,
              disabled: false
            }
          });
        } else if (val === 'insert') {
          this.$router.push({
            name: "PFANS5012FormView",
            params: {
              _id: "",
              disabled: true
            }
          });
        }
      },
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
</style>
