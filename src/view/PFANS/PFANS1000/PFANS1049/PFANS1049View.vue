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
                     ref="roletable"
    >
    </EasyNormalTable>
    <el-dialog width="50%"
               :visible.sync="show">
      <div>
        <div>
          <el-row>
            <el-radio v-model="radiox" label="1">月</el-radio>
            <el-radio v-model="radiox" label="2">年</el-radio>
            <el-radio v-model="radiox" label="3">季</el-radio>
          </el-row>
          <el-row>
            <el-radio v-model="radioy" label="4">theme</el-radio>
            <el-radio v-model="radioy" label="5">项目</el-radio>
          </el-row>
        </div>
        <div style="margin-top: 1rem;margin-left: 14.5rem">
          <el-button @click="checklist" type="primary">
            {{$t('button.confirm')}}
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {getDictionaryInfo, getStatus, getOrgInfoByUserId, getOrgInfo, getUserInfo} from '@/utils/customize';
  import {Message} from 'element-ui';

  let moment = require('moment');
  export default {
    name: 'PFANS1049View',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        radiox: '1',
        radioy: '4',
        show: false,
        loading: false,
        title: 'title.PFANS1049VIEW',
        data: [],
        columns: [
          {
            code: 'year',
            label: 'label.fiscal_year',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'type',
            label: 'label.group',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'plancount',
            label: 'label.center',
            width: 120,
            fix: false,
            filter: true,
          },
        ],
        buttonList: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
          {'key': 'export', 'name': 'button.export', 'disabled': false, icon: 'el-icon-upload2'},
        ],
        row_id: 'incomeexpenditure_id',
        row_info: '',
      };
    },
    mounted() {
      this.loading = true;
      this.$store
        .dispatch('PFANS1049Store/list')
        .then(response => {
          if (response.length > 0) {
            for (let i = 0; i < response.length; i++) {
              let orgInfo_cnt = getOrgInfo(response[i].center_id);
              if (orgInfo_cnt) {
                response[i].plancount = orgInfo_cnt.companyname;
              }
              let orgInfo_grp = getOrgInfo(response[i].group_id);
              if (orgInfo_grp) {
                response[i].type = orgInfo_grp.companyname;
              }
              let userInfo = getUserInfo(response[i].createby);
              if (userInfo) {
                response[i].user_id = userInfo.userinfo.customername;
              }
              if (response[i].status !== null && response[i].status !== '') {
                response[i].status = getStatus(response[i].status);
              }
            }
          }
          this.data = response;
          this.loading = false;
        })
        .catch(error => {
          this.$message.error({
            message: error,
            type: 'error',
            duration: 5 * 1000,
          });
          this.loading = false;
        });
    },
    methods: {
      download(data, filename) {
        if ('msSaveOrOpenBlob' in navigator) {
          window.navigator.msSaveOrOpenBlob(
            new Blob([data], {type: 'application/vnd.ms-excel;charset=utf-8'}),
            decodeURI(filename) + '.xlsx',
          );
        } else {
          var blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'}); //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
          var downloadElement = document.createElement('a');
          var href = window.URL.createObjectURL(blob); //创建下载的链接
          downloadElement.href = href;
          downloadElement.download = decodeURI(filename) + '.xlsx'; //下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
          window.URL.revokeObjectURL(href); //释放掉blob对象
        }
      },
      checklist() {
        this.loading = true;
        let parameters = {
          radiox: this.radiox,
          radioy: this.radioy,
        };
        this.$store
          .dispatch('PFANS1049Store/getradio', parameters)
          .then(response => {
            this.download(response, '收支データ');
            this.show = false;
            this.loading = false;
          })
          .catch(error => {
            this.$message.error({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
            this.loading = false;
          });
      },
      rowClick(row) {
        this.row_info = row;
      },
      buttonClick(val) {
        this.$store.commit('global/SET_HISTORYURL', this.$route.path);
        if (val === 'update') {
          if (this.themeplan_id === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.$router.push({
            name: 'PFANS1049FormView',
            params: {
              id: this.row_info.incomeexpenditure_id,
              year: this.row_info.year,
              group_id: this.row_info.group_id,
              center_id: this.row_info.center_id,
              disabled: false,
            },
          });
        }
        if (val === 'view') {
          if (this.themeplan_id === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.$router.push({
            name: 'PFANS1049FormView',
            params: {
              id: this.row_info.incomeexpenditure_id,
              year: this.row_info.year,
              group_id: this.row_info.group_id,
              center_id: this.row_info.center_id,
              disabled: true,
            },
          });
        }
        if (val === 'export') {
          this.show = true;
        }
      },
    },
  };
</script>

<style lang='scss'>
  .custimize_drawer {
    -webkit-box-sizing: border-box;
    overflow: auto !important;
  }
</style>
