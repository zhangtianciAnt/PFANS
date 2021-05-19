<template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row" :title="title"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading"
                   ref="roletable" :showSelection="isShow">
    <el-dialog :visible.sync="daoru"  @close="refresh"  width="50%">
      <div>
        <div style="margin-top: 1rem;margin-left: 28%">
          <el-upload
            drag
            ref="uploader"
            :action="postAction"
            :on-success="handleSuccess"
            :before-upload="handleChange"
            :headers="authHeader"
            :limit="1"
            :on-remove="this.clear"
            multiple
          >
            <i class="el-icon-upload"></i>
            <div>{{$t('label.PFANS2005FORMVIEW_MBYQ')}}</div>
          </el-upload>
        </div>
        <el-row>
          <span v-if="this.resultShow">{{$t('label.PFANS2005FORMVIEW_CG')}}{{this.successCount}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
          <span
            v-if="this.resultShow"
          >{{$t('label.PFANS2005FORMVIEW_SB')}}{{this.errorCount}}</span>
        </el-row>
        <span v-if="this.Message">{{this.cuowu}}</span>
        <div v-if="this.result">
          <el-table :data="message">
            <el-table-column
              :label="$t('label.PFANS2017VIEW_CUHS')"
              align="center"
              width="120%"
              prop="hang"
            ></el-table-column>
            <el-table-column
              :label="$t('label.PFANS2017VIEW_ERROR')"
              align="center"
              prop="error"
            ></el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
  </EasyNormalTable>

</template>
<script>
  import { getToken } from "@/utils/auth";
  import EasyNormalTable from '@/components/EasyNormalTable';
  import { Decrypt } from "@/utils/customize";
  let moment = require('moment')
  import {Message} from 'element-ui';
  import {getDepartmentById, getOrgInfoByUserId, getStatus, getUserInfo} from '@/utils/customize';

  export default {
    name: 'PFANS2036View',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        loading: false,
        title: 'title.PFANS2036View',
        data: [],
        selectedlist: [],
        daoru: false,
        successCount: 0,
        errorCount: 0,
        pop_download: false,
        authHeader: { "x-auth-token": getToken() },
        postAction: process.env.BASE_API + "/personalcost/importPersInfo",
        resultShow: false,
        message: [{ hang: "", error: "" }],
        Message: false,
        addActionUrl: "",
        result: false,
        columns: [
          {
            code: 'years',
            label: 'label.PFANS2036VIEW_YEARS',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'updatetime',
            label: 'label.PFANS2036VIEW_UPDATETIME',
            width: 150,
            fix: false,
            filter: true,
          },
        ],
        buttonList: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          //{'key': 'generate', 'name': 'button.generate', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
          {'key': 'import', 'name': 'button.import', 'disabled': false, 'icon': 'el-icon-upload2'},
          {'key': 'export', 'name': 'button.export', 'disabled': false, 'icon': 'el-icon-download'},
        ],
        rowid: '',
        row: 'yearsantid',
        years: '',
        isShow: true,
        //year: '2020',
      };
    },
    mounted() {
      this.getYears();
    },
    methods: {
      refresh() {
        this.getYears();
      },
      clear(safe) {
        this.file = null;
        this.resultShow = false;
        this.Message = false;
        this.result = false;
        if (!safe) {
          if (this.$refs.uploader != undefined) {
            this.$refs.uploader.clearFiles();
          }
        }
      },
      handleChange(file, fileList) {
        this.clear(true);
      },
      handleSuccess(response, file, fileList) {
        if (response.code !== 0) {
          this.cuowu = response.message;
          this.Message = true;
        } else {
          response.data = JSON.parse(Decrypt(response.data));
          let datalist = [];
          for (let c = 0; c < response.data.length; c++) {
            let error = response.data[c];
            error = error.substring(0, 3);
            if (this.$i18n) {
              if (error === this.$t("label.PFANS2005FORMVIEW_SB")) {
                this.errorCount = response.data[c].substring(4);
                this.resultShow = true;
              }
              if (error === this.$t("label.PFANS2005FORMVIEW_CG")) {
                this.successCount = response.data[c].substring(4);
                this.resultShow = true;
              }
              if (error === this.$t("label.PFANS2017VIEW_D")) {
                let obj = {};
                var str = response.data[c];
                var aPos = str.indexOf(this.$t("label.PFANS2017VIEW_BAN"));
                var bPos = str.indexOf(this.$t("label.PFANS2017VIEW_DE"));
                var r = str.substr(aPos + 1, bPos - aPos - 1);
                obj.hang = r;
                obj.error = response.data[c].substring(6);
                datalist[c] = obj;
              }
            }
            this.message = datalist;
            this.totaldata = this.message;
            if (this.errorCount === "0") {
              this.result = false;
            } else {
              this.result = true;
            }
          }
        }
      },
      rowClick(row) {
        this.rowid = row.yearsantid,
        this.years = row.years
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
            name: 'PFANS2036FormView',
            params: {
              _id: this.rowid,
              disabled: false,
              years:this.years,
            },
          });
        }else if (val === 'update') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.$router.push({
            name: 'PFANS2036FormView',
            params: {
              _id: this.rowid,
              disabled: true,
              years:this.years,
            },
          });
        }else if(val === 'export'){
          if (this.$refs.roletable.selectedList.length === 0) {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000
            });
            return;
          }else if(this.$refs.roletable.selectedList.length > 1){
            Message({
              message: this.$t('normal.info_26'),
              type: 'info',
              duration: 2 * 1000
            });
            return;
          }else{
            this.selectedlist = this.$refs.roletable.selectedList;
            this.loading = true;
            this.$store
              .dispatch('PFANS2036Store/exportinfo',{'yearsantid': this.selectedlist[0].yearsantid})
              .then(response => {
                debugger;
                this.download(response)
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
        }else if(val === 'import'){
            this.daoru = true;
            this.clear(false);
        }
      },
      download (data) {
        if (!data) {
          return
        }
        let url = window.URL.createObjectURL(new Blob([data]))
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', '人件费.xlsx')
        document.body.appendChild(link)
        link.click()
      },
      getYears(){
        this.loading = true;
        this.$store
          .dispatch('PFANS2036Store/getYears')
          .then(response => {
            for (let j = 0; j < response.length; j++) {
              if (response[j].updatetime !== null && response[j].updatetime !== '') {
                response[j].updatetime = moment(response[j].updatetime).format('YYYY-MM-DD');
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
            this.loading = false;
          });
      }
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
