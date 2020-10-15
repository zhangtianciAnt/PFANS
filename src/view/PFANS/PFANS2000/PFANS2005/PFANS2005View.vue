<template>
  <div>
    <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row_id" :title="title"
                     @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
      <el-dialog :visible.sync="pop_download" width="50%" destroy-on-close>
        <el-table :data="downtypes" style="width: 100%">
          <el-table-column prop="name" :label="$t('label.ASSETS1001VIEW_FILENAME')"></el-table-column>

          <el-table-column :label="$t('label.operation')">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleDownload(scope.row)">{{$t('button.download2')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
      <el-dialog :visible.sync="daoru" width="50%">
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
  </div>
</template>
<script>
  import { getToken } from "@/utils/auth";
  import EasyNormalTable from '@/components/EasyNormalTable';
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import {Message} from 'element-ui';
  import moment from 'moment';
  import {getStatus, getUserInfo,Decrypt} from '@/utils/customize';

  export default {
    name: 'PFANS2005View',
    components: {
      EasyNormalContainer,
      EasyNormalTable,
    },
    data() {
      return {
        loading: false,
        title: 'title.PFANS2005VIEW',
        data: [],
        pop_download: false,
        daoru: false,
        successCount: 0,
        errorCount: 0,
        authHeader: { "x-auth-token": getToken() },
        postAction: process.env.BASE_API + "/wages/importWages",
        resultShow: false,
        message: [{ hang: "", error: "" }],
        Message: false,
        addActionUrl: "",
        result: false,
        Givingid:'',
        generationdate:'',
        form: {
          generationdate: '',
          generation: '',
        },
        columns: [
          {
            code: 'generationdate',
            label: 'label.date',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'generation',
            label: 'label.PFANS2005VIEW_SCFS',
            width: 120,
            fix: false,
            filter: true,
          },
          {
              code: 'grantstatus',
              label: 'label.PFANS2005VIEW_GRANTSTATUS',
              width: 120,
              fix: false,
              filter: true,
          },
          {
            code: 'user_id',
            label: 'label.PFANS2005VIEW_CJZ',
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
            code: 'statuswhow',
            label: 'label.approval_status',
            width: 120,
            fix: false,
            filter: true,
          },
        ],
        buttonList: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'generatethismonth', 'name': 'button.generatethismonth', 'disabled': false},
          {'key': 'grantthismonth', 'name': 'button.grantthismonth', 'disabled': true},
          {'key': 'export2', 'name': 'button.download2', 'disabled': false,icon: "el-icon-download"},
          {'key': 'importwages', 'name': 'button.importwages', 'disabled': false,icon: "el-icon-upload2"},
        ],
        rowid: '',
        row_id: 'giving_id',
      };
    },
    mounted() {
      this.getGivingList();
    },
    methods: {
      getGivingList() {
        this.loading = true;
        this.$store
          .dispatch('PFANS2005Store/getDataList', {})
          .then(response => {
            for (let j = 0; j < response.length; j++) {
                if(moment(response[0].generationdate).format('YYYY-MM') === moment(new Date()).format('YYYY-MM')){
                    this.Givingid = response[0].giving_id;
                    this.generationdate = response[0].generationdate;
                    if(response[0].status === "2" || response[0].status === "4"){
                        this.buttonList[1].disabled = true;
                    }
                    //审批结束
                    if(response[0].status === "4" && response[0].grantstatus != '1'){
                        this.buttonList[2].disabled = false;
                    }
                }
              if (this.$i18n) {
                if (response[j].grantstatus === '1') {
                    response[j].grantstatus = this.$t('label.PFANS2005VIEW_GRANTSTATUSOK');
                }
                else{
                    response[j].grantstatus = this.$t('label.PFANS2005VIEW_GRANTSTATUSNO');
                }
              }
              if (response[j].generation === '0') {
                if (this.$i18n) {

                  response[j].generation = this.$t('label.PFANS2005VIEW_SG');
                }
              } else if (response[j].generation === '1') {
                if (this.$i18n) {

                  response[j].generation = this.$t('label.PFANS2005VIEW_XTFW');
                }
              } else if (response[j].generation === '2') {
                  if (this.$i18n) {

                      response[j].generation = this.$t('label.PFANS2005VIEW_IMPORT');
                  }
              }
              if (response[j].createby !== null && response[j].createby !== '') {
                let rst = getUserInfo(response[j].createby);
                if (rst) {
                  response[j].user_id = rst.userinfo.customername;
                }
              }
              else{
                  if (this.$i18n) {
                      response[j].user_id = this.$t('label.PFANS2005VIEW_XTFW');
                  }
              }
              if (response[j].generationdate !== null && response[j].generationdate !== '') {
                response[j].generationdate = moment(response[j].generationdate).format('YYYY-MM');
              }
              if (response[j].status !== null && response[j].status !== '') {
                response[j].statuswhow = getStatus(response[j].status);
              }
              if (response[j].createon !== null && response[j].createon !== '') {

                response[j].createon = moment(response[j].createon).format('YYYY-MM-DD HH:mm:ss');
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
      },
      rowClick(row) {
        this.rowid = row.giving_id;
        this.status = row.status;
      },
      buttonClick(val) {
        this.$store.commit('global/SET_HISTORYURL', this.$route.path);
        if (val === 'view') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000
            });
            return;
          }
          if(this.status === '2' || this.status === '4'){
              this.status = '2'
          }
          else{
              this.status = '0'
          }
          this.$router.push({
            name: 'PFANS2005FormView',
            params: {
              status:this.status,
              _id: this.rowid,
              disabled: false,
            },
          });
        }
        if (val === 'generatethismonth') {//生成当月
          this.loading = true;
          this.$store
            .dispatch('PFANS2005Store/creategiving', {"generation": "0"})
            .then(response => {
              this.getGivingList();
              Message({
                  message: this.$t("normal.success_05"),
                  type: 'success',
                  duration: 5 * 1000
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
        }
        if (val === 'grantthismonth') {//发放当月
              this.loading = true;
              this.$store
                  .dispatch('PFANS2005Store/updatestate',{givingid: this.Givingid,generationdate:this.generationdate})
                  .then(response => {
                      this.buttonList[2].disabled = true;
                      this.getGivingList();
                      Message({
                          message: this.$t("normal.success_06"),
                          type: 'success',
                          duration: 5 * 1000
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
          }
          if (val === 'export2') {
              this.pop_download = true;
          }
          if (val === 'importwages') {//发放当月importwages
              this.daoru = true;
              this.clear(false);
          }
      },
      //add gbb 0723 下载模板
      handleDownload(row) {
            this.loading = true;
            this.$store
                .dispatch("PFANS2005Store/download", { type: row.type })
                .then(response => {
                    this.loading = false;
                })
                .catch(error => {
                    Message({
                        message: error,
                        type: "error",
                        duration: 5 * 1000
                    });
                    this.loading = false;
                });
        },
        handleChange(file, fileList) {
            this.clear(true);
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
        handleSuccess(response, file, fileList) {
            if (response.code !== 0) {
                this.cuowu = response.message;
                this.Message = true;
            } else {
                //response.data = JSON.parse(Decrypt(response.data));
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
    },
    computed: {
        downtypes() {
            return [
                { name: this.$t("label.PFANS2005FORMVIEW_QT2"), type: 0 },
                { name: this.$t("label.PFANS2005FORMVIEW_QT4"), type: 1 },
                { name: this.$t("label.PFANS2005FORMVIEW_QT5"), type: 2 },
                { name: this.$t("label.PFANS2005FORMVIEW_YDSY"), type: 3 },
                { name: this.$t("label.PFANS2005FORMVIEW_FJKC"), type: 4 },
                { name: this.$t("label.PFANS2005FORMVIEW_WAGES"), type: 5 }
            ];
        }
    },
  };
</script>
<style lang="scss" rel="stylesheet/scss">
</style>
