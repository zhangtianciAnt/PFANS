<template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row_id" :title="title"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
  </EasyNormalTable>

</template>

<script>
  import EasyNormalTable from '@/components/EasyNormalTable'
  import {Message} from 'element-ui'
  import {getDictionaryInfo, getStatus, getUserInfo} from '@/utils/customize'

  export default {
    name: "PFANS1012View",
    components: {
      EasyNormalTable
    },
    data() {
      return {
        loading: false,
        title: "title.PFANS1012VIEW",
        // 表格数据源
        data: [],
        // 列属性
        columns: [
          {
            code: 'user_id',
            label: 'label.applicant',
            width: 100,
            fix: false,
            filter: true
          },
          {
            code: 'center_name',
            label: 'label.center',
            width: 150,
            fix: false,
            filter: true
          },
          {
            code: 'group_name',
            label: 'label.group',
            width: 150,
            fix: false,
            filter: true
          },
          {
            code: 'team_name',
            label: 'label.team',
            width: 150,
            fix: false,
            filter: true
          },
          {
            code: 'budgetunit',
            label: 'label.budgetunit',
            width: 170,
            fix: false,
            filter: true
          },
          {
            code: 'moneys',
            label: 'label.PFANS1012VIEW_MONEY',
            width: 110,
            fix: false,
            filter: true
          },
          {
            code: 'status',
            label: 'label.approval_status',
            width: 120,
            fix: false,
            filter: true
          }
        ],
        buttonList: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'insert', 'name': 'button.insert', 'disabled': false, "icon": "el-icon-plus"},
          {'key': 'update', 'name': 'button.update', 'disabled': false, "icon": 'el-icon-edit'},
          {'key': 'export', 'name': 'button.export', 'disabled': false, icon: 'el-icon-upload2'}
        ],
        rowid: '',
        row_id: 'publicexpenseid'
      };
    },
    mounted() {
      this.loading = true;
      this.$store
        .dispatch('PFANS1012Store/get', {})
        .then(response => {
          for (let j = 0; j < response.length; j++) {
            if (response[j].user_id !== null && response[j].user_id !== "") {
              let rst = getUserInfo(response[j].user_id);
              if (rst) {
                response[j].user_id = rst.userinfo.customername;
              }
              response[j].center_name = response[j].centerid;
              response[j].group_name = response[j].centerid;
              response[j].team_name = response[j].centerid;


              if (response[j].status !== null && response[j].status !== "") {
                response[j].status = getStatus(response[j].status);
              }
              if (response[j].budgetunit!== null && response[j].budgetunit !== "") {
                let letbudge = getDictionaryInfo(response[j].budgetunit);
                if (letbudge) {
                  response[j].budgetunit = letbudge.value1;
                }
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
            duration: 5 * 1000
          });
          this.loading = false;
        })
    },
    methods: {
      rowClick(row) {
        this.rowid = row.publicexpenseid;
      },
        MyBrowserIsIE() {
            let isIE = false;
            if (
                navigator.userAgent.indexOf("compatible") > -1 &&
                navigator.userAgent.indexOf("MSIE") > -1
            ) {
                // ie浏览器
                isIE = true;
            }
            if (navigator.userAgent.indexOf("Trident") > -1) {
                // edge 浏览器
                isIE = true;
            }
            return isIE;
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
        this.$store.commit('global/SET_HISTORYURL', '');
        if (val === "view") {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000
            });
            return;
          }
          this.$router.push({
            name: 'PFANS1012FormView',
            params: {
              _id: this.rowid,
              disabled: false
            }
          })
        } else if (val === "insert") {
          this.$router.push({
            name: 'PFANS1012PointFormView',
            params: {
              _id: '',
              disabled: true
            }
          })
        } else if (val === 'export') {
            let heads = [this.$t('label.date'), this.$t('label.PFANS1012FORMVIEW_INVOICEN'), this.$t('label.PFANS1012VIEW_COSTITEM'), this.$t('label.PFANS1012FORMVIEW_DEPARTMENT'), this.$t('label.PFANS1012VIEW_REGION'), this.$t('label.PFANS1012VIEW_VEHICLE'),
                this.$t('label.PFANS1012VIEW_STARTINGPOINT'), this.$t('label.PFANS1012VIEW_RMB'),
                this.$t('label.PFANS1012VIEW_FOREIGNCURRENCY'), this.$t('label.PFANS1012VIEW_ANNEXNO')];
            let filterVal = ['trafficdate', 'invoicenumber', 'costitem', 'departmentname', 'region', 'vehicle', 'startingpoint', 'rmb', 'foreigncurrency', 'annexno'];
            let csvData = [];
            var tableTdata = this.tableT;
            for (let i = 0; i < tableTdata.length; i++) {
                if (tableTdata[i].costitem !== null && tableTdata[i].costitem !== "") {
                    let letErrortype = getDictionaryInfo(tableTdata[i].costitem);
                    if (letErrortype != null) {
                        tableTdata[i].costitem = letErrortype.value1;
                    }
                }
                if (tableTdata[i].departmentname !== null && tableTdata[i].departmentname !== "") {
                    let lettype = getOrgInfo(tableTdata[i].departmentname);
                    if (lettype != null) {
                        tableTdata[i].departmentname = lettype.departmentname;
                    }
                }
                let obj = tableTdata[i];
                csvData.push({
                    [heads[0]]: obj.trafficdate,
                    [heads[1]]: obj.invoicenumber,
                    [heads[2]]: obj.costitem,
                    [heads[3]]: obj.departmentname,
                    [heads[4]]: obj.region,
                    [heads[5]]: obj.vehicle,
                    [heads[6]]: obj.startingpoint,
                    [heads[7]]: obj.rmb,
                    [heads[8]]: obj.foreigncurrency,
                    [heads[9]]: obj.annexno,
                })
            }
            const result = json2csv.parse(csvData, {
                excelStrings: true
            });
            let csvContent = "data:text/csv;charset=utf-8,\uFEFF" + result;
            const link = document.createElement("a");
            link.href = csvContent;
            link.download = this.$t('label.PFANS1012VIEW_TRAFFIC') + '.csv';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        }else if (val === "update") {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000
            });
            return;
          }
          this.$router.push({
            name: 'PFANS1012FormView',
            params: {
              _id: this.rowid,
              disabled: true
            }
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>


