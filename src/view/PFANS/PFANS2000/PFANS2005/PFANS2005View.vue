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
    </EasyNormalTable>
  </div>
</template>
<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import {Message} from 'element-ui';
  import moment from 'moment';
  import {getStatus, getUserInfo} from '@/utils/customize';

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
        Givingid:'',
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
            code: 'status',
            label: 'label.approval_status',
            width: 120,
            fix: false,
            filter: true,
          },
        ],
        buttonList: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'generatethismonth', 'name': 'button.generatethismonth', 'disabled': true},
          {'key': 'grantthismonth', 'name': 'button.grantthismonth', 'disabled': true},
          {'key': 'export2', 'name': 'button.download2', 'disabled': false,icon: "el-icon-download"},
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
              if(j === 0){
                  if(moment(response[j].generationdate).format('YYYY-MM') === moment(new Date()).format('YYYY-MM')){
                      this.Givingid = response[j].giving_id;
                  }
                  //审批结束
                  if(response[j].status === "4" && response[j].grantstatus != '1'){
                      this.buttonList[2].disabled = false;
                  }
                  if(response[j].status === "0"){
                      this.buttonList[1].disabled = false;
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
                response[j].status = getStatus(response[j].status);
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
          this.$router.push({
            name: 'PFANS2005FormView',
            params: {
              _id: this.rowid,
              disabled: false,
            },
          });
        }
        if (val === 'generatethismonth') {
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
        if (val === 'grantthismonth') {
              this.loading = true;
              this.$store
                  .dispatch('PFANS2005Store/updatestate',{givingid: this.Givingid})
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
    },
    computed: {
        downtypes() {
            return [
                { name: this.$t("label.PFANS2005FORMVIEW_QT2"), type: 0 },
                { name: this.$t("label.PFANS2005FORMVIEW_QT4"), type: 1 },
                { name: this.$t("label.PFANS2005FORMVIEW_QT5"), type: 2 },
                { name: this.$t("label.PFANS2005FORMVIEW_YDSY"), type: 3 },
                { name: this.$t("label.PFANS2005FORMVIEW_FJKC"), type: 4 }
            ];
        }
    },
  };
</script>
<style lang="scss" rel="stylesheet/scss">
</style>
