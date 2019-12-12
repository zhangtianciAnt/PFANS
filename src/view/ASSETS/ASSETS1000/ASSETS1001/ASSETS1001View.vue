<template>
  <div>
    <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row_id"
                     :showSelection="showSelection" :title="title" @buttonClick="buttonClick" @rowClick="rowClick" ref="roletable"
                     v-loading="loading">
      <div id="qrcode"></div>
    </EasyNormalTable>
    <el-dialog :visible.sync="daoru" width="50%">
      <div>
        <div style="margin-top: 1rem;margin-left: 28%">
          <el-upload
            :action="postAction"
            :before-upload="handleChange"
            :headers="authHeader"
            :limit=1
            :on-remove="this.clear"
            :on-success="handleSuccess"
            drag
            multiple
            ref="uploader"
          >
            <i class="el-icon-upload"></i>
            <div>{{$t('label.PFANS2005FORMVIEW_MBYQ')}}</div>
          </el-upload>
        </div>
        <el-row>
          <span v-if="this.resultShow">{{$t('label.PFANS2005FORMVIEW_CG')}}{{this.successCount}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
          <span v-if="this.resultShow"
          >{{$t('label.PFANS2005FORMVIEW_SB')}}{{this.errorCount}}</span>
        </el-row>
        <span v-if="this.Message">{{this.cuowu}}</span>
        <div v-if="this.result">
          <el-table :data="message">
            <el-table-column :label="$t('label.PFANS2017VIEW_CUHS')" align="center" prop="hang" width="120%">
            </el-table-column>
            <el-table-column :label="$t('label.PFANS2017VIEW_ERROR')" align="center" prop="error">
            </el-table-column>
          </el-table>
          <div class="pagination-container" style="padding-top: 2rem">
            <el-pagination :current-page.sync="listQuery.page" :page-size="listQuery.limit"
                           :page-sizes="[5,10,20,30,50]" :total="total" @current-change="handleCurrentChange"
                           @size-change="handleSizeChange" layout="slot,sizes, ->,prev, pager, next, jumper">
              <slot><span class="front Content_front"
                          style="padding-right: 0.5rem;font-weight: 400">{{$t('table.pagesize')}}</span></slot>
            </el-pagination>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {getToken} from '@/utils/auth';
  import {Message} from 'element-ui';
  import moment from 'moment';
  import {getDictionaryInfo, getUserInfo} from '@/utils/customize';
  import QRCode from 'qrcodejs2';

  export default {
    name: 'ASSETS1001View',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        totaldata: [],
        listQuery: {
          page: 1,
          limit: 5,
        },
        total: 0,
        message: [{hang: '', error: ''}],
        daoru: false,
        authHeader: {'x-auth-token': getToken()},
        postAction: process.env.BASE_API + '/assets/importUser',
        addActionUrl: '',
        resultShow: false,
        result: false,
        file: null,
        successCount: 0,
        errorCount: 0,
        selectedlist: [],
        Message: false,
        cuowu: '',
        downloadLoading: false,
        showSelection: true,
        loading: false,
        title: 'title.ASSETS1001VIEW',
        data: [],
        columns: [
          {
            code: 'filename',
            label: 'label.ASSETS1001VIEW_FILENAME',
            width: 100,
            fix: false,
            filter: true,
          },
          {
            code: 'typeassets',
            label: 'label.ASSETS1001VIEW_TYPEASSETS',
            width: 100,
            fix: false,
            filter: true,
          },
          {
            code: 'price',
            label: 'label.ASSETS1001VIEW_PRICE',
            width: 100,
            fix: false,
            filter: true,
          },
          {
            code: 'purchasetime',
            label: 'label.ASSETS1001VIEW_PURCHASETIME',
            width: 100,
            fix: false,
            filter: true,
          },
          {
            code: 'usedepartment',
            label: 'label.ASSETS1001VIEW_USEDEPARTMENT',
            width: 100,
            fix: false,
            filter: true,
          },
          {
            code: 'principal',
            label: 'label.ASSETS1001VIEW_PRINCIPAL',
            width: 100,
            fix: false,
            filter: true,
          },
          {
            code: 'assetstatus',
            label: 'label.ASSETS1001VIEW_ASSETSTATUS',
            width: 100,
            fix: false,
            filter: true,
          },
        ],
        buttonList: [
          {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'edit', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
          {'key': 'import', 'name': 'button.import', 'disabled': false, 'icon': 'el-icon-download'},
          {'key': 'prtQrcode', 'name': 'button.prtQrcode', 'disabled': false, 'icon': 'el-icon-printer'},
          {'key': 'export', 'name': 'button.export', 'disabled': false, 'icon': 'el-icon-upload2'},
        ],
        rowid: '',
        row_id: 'assets_id',
        selectedlist: [],
      };
    },
    mounted() {
      this.getListData();
    },
    methods: {
      getListData() {
        this.loading = true;
        this.$store
          .dispatch('ASSETS1001Store/getList', {})
          .then(response => {
            for (let j = 0; j < response.length; j++) {
              let user = getUserInfo(response[j].principal);
              if (user) {
                response[j].principal = user.userinfo.customername;
                response[j].usedepartment = user.userinfo.centername;
              }
              if (response[j].purchasetime !== null && response[j].purchasetime !== '') {
                response[j].purchasetime = moment(response[j].purchasetime).format('YYYY-MM-DD');
              }
              if (response[j].typeassets !== null && response[j].typeassets !== '') {
                let letErrortype = getDictionaryInfo(response[j].typeassets);
                if (letErrortype != null) {
                  response[j].typeassets = letErrortype.value1;
                }
              }
              if (response[j].assetstatus !== null && response[j].assetstatus !== '') {
                let letErrortype1 = getDictionaryInfo(response[j].assetstatus);
                if (letErrortype1 != null) {
                  response[j].assetstatus = letErrortype1.value1;
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
            this.loading = false;
          });
      },
      rowClick(row) {
        this.rowid = row.assets_id;
      },
      handleSizeChange(val) {
        this.listQuery.limit = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList();
        this.getListData();
      },
      getList() {
        this.loading = true;
        let start = (this.listQuery.page - 1) * this.listQuery.limit;
        let end = this.listQuery.page * this.listQuery.limit;
        if (this.totaldata) {
          let pList = this.totaldata.slice(start, end);
          this.message = pList;
          this.total = this.totaldata.length;
        }
        this.loading = false;
      },
      handleChange(file, fileList) {
        this.clear(true);
      },
      handleSuccess(response, file, fileList) {
        if (response.code !== 0) {
          this.cuowu = response.message;
          this.Message = true;
        } else {
          let datalist = [];
          for (let c = 0; c < response.data.length; c++) {
            let error = response.data[c];
            error = error.substring(0, 3);
            if (error === this.$t('label.PFANS2005FORMVIEW_SB')) {
              this.errorCount = response.data[c].substring(4);
              this.resultShow = true;
            }
            if (error === this.$t('label.PFANS2005FORMVIEW_CG')) {
              this.successCount = response.data[c].substring(4);
              this.resultShow = true;
            }
            if (error === this.$t('label.PFANS2017VIEW_D')) {
              let obj = {};
              var str = response.data[c];
              var aPos = str.indexOf(this.$t('label.PFANS2017VIEW_BAN'));
              var bPos = str.indexOf(this.$t('label.PFANS2017VIEW_DE'));
              var r = str.substr(aPos + 1, bPos - aPos - 1);
              obj.hang = r;
              obj.error = response.data[c].substring(6);
              datalist[c] = obj;
            }
            this.message = datalist;
            this.totaldata = this.message;
            if (this.errorCount === '0') {
              this.result = false;
            } else {
              this.result = true;
            }
            this.getList();
          }
        }
      },
      clear(safe) {
        this.file = null;
        this.resultShow = false;
        this.Message = false;
        this.result = false;
        if (!safe) {
          this.$refs.uploader.clearFiles();
        }
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        }));
      },
      buttonClick(val) {
        this.$store.commit('global/SET_HISTORYURL', this.$route.path);
        if (val === 'insert') {
          this.$router.push({
            name: 'ASSETS1001FormView',
            params: {
              _id: '',
              disabled: true,
            },
          });
        }
        if (val === 'edit') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'error',
              duration: 2 * 1000,
            });
            return;
          }
          this.$router.push({
            name: 'ASSETS1001FormView',
            params: {
              _id: this.rowid,
              disabled: true,
            },
          });
        }
        if (val === 'import') {
          this.daoru = true;
        }
        if (val === 'prtQrcode') {
          this.selectedlist = this.$refs.roletable.selectedList;
          for(let i = 0; i <this.selectedlist.length; i++ ){
            let qrcode = new QRCode('qrcode', {
              width: 132,
              height: 132,
              text: 'P' + moment(new Date()).format('YYYYMMDDhhmmss'), // 二维码地址
              colorDark : "#000",
              colorLight : "#fff",
            })
          }
        }
        if (val === 'export') {
          this.selectedlist = this.$refs.roletable.selectedList;
          import('@/vendor/Export2Excel').then(excel => {
            const tHeader = [this.$t('label.ASSETS1001VIEW_FILENAME'), this.$t('label.ASSETS1001VIEW_TYPEASSETS'), this.$t('label.ASSETS1001VIEW_PRICE'), this.$t('label.ASSETS1001VIEW_PURCHASETIME'), this.$t('label.ASSETS1001VIEW_USEDEPARTMENT'), this.$t('label.ASSETS1001VIEW_PRINCIPAL'), this.$t('label.ASSETS1001VIEW_ASSETSTATUS')];
            const filterVal = ['filename', 'typeassets', 'price', 'purchasetime', 'usedepartment', 'principal', 'assetstatus'];
            const list = this.selectedlist;
            const data = this.formatJson(filterVal, list);
            excel.export_json_to_excel(tHeader, data, this.$t('menu.ASSETS1001'));
          });
        }
      },
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
