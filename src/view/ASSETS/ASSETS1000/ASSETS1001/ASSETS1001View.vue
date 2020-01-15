<template>
  <div>
    <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row_id"
                     :showSelection="showSelection" :title="title" @buttonClick="buttonClick" @rowClick="rowClick"
                     ref="roletable"
                     v-loading="loading">
    </EasyNormalTable>
    <el-dialog :visible.sync="daoru" @close="closed" width="50%">
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
    <el-dialog :visible.sync="piliang" @close="closed" width="50%">
      <el-form :model="form" :rules="rules" label-width="80px" ref="form">
        <el-form-item :label="$t('label.ASSETS1001VIEW_BARTYPE')" prop="bartype">
          <dicselect
            :code="code4"
            :data="form.bartype"
            @change="getBartype"
            style="width: 20vw">
          </dicselect>
        </el-form-item>
        <el-form-item :label="$t('label.ASSETS1001VIEW_TYPEASSETS')" prop="typeassets">
          <dicselect
            :code="code1"
            :data="form.typeassets"
            @change="getTypeassets"
            style="width:20vw">
          </dicselect>
        </el-form-item>
        <el-form-item :label="$t('label.ASSETS1001VIEW_SUM')" prop="sum">
          <el-input-number :max="999" :min="1" controls-position="right" v-model="form.sum" style="width:20vw"></el-input-number>
        </el-form-item>
      </el-form>
      <span class="dialog-footer" slot="footer">
        <el-button @click="onSubmit" type="primary">{{$t('button.insert')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {getToken} from '@/utils/auth';
  import {Message} from 'element-ui';
  import moment from 'moment';
  import {getDictionaryInfo, getUserInfo} from '@/utils/customize';
  import dicselect from '../../../components/dicselect.vue';
  import Stomp from "stompjs";

  export default {
    name: 'ASSETS1001View',
    components: {
      EasyNormalTable,
      dicselect
    },
    data() {
      return {
        totaldata: [],
        listQuery: {
          page: 1,
          limit: 5,
        },
        piliang: false,
        form: {
          bartype: '',
          typeassets:'',
          sum: 1
        },
        code4: 'PA004',
        code1: 'PA001',
        total: 0,
        message: [{hang: '', error: ''}],
        daoru: false,
        authHeader: {'x-auth-token': getToken()},
        postAction: process.env.BASE_API + '/assets/import',
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
        rules: {
          bartype: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.ASSETS1001VIEW_BARTYPE'),
            trigger: 'change',
          }],
          typeassets:[{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.ASSETS1001VIEW_TYPEASSETS'),
            trigger: 'change',
          }],
          sum: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.ASSETS1001VIEW_SUM'),
              trigger: 'change',
            }
          ]
        },
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
            code: 'barcode',
            label: 'label.ASSETS1001VIEW_BARCODE',
            width: 100,
            fix: false,
            filter: true,
          },
          {
            code: 'bartypeName',
            label: 'label.ASSETS1001VIEW_BARTYPE',
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
          {'key': 'insertLots', 'name': 'button.insertLots', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'edit', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
          {'key': 'prtQrcode', 'name': 'button.printing', 'disabled': false, 'icon': 'el-icon-printer'},
          {'key': 'import', 'name': 'button.import', 'disabled': false, 'icon': 'el-icon-upload2'},
          {'key': 'export', 'name': 'button.export', 'disabled': false, 'icon': 'el-icon-download'},
          {'key': 'export2', 'name': 'button.download2', 'disabled': false, 'icon': 'el-icon-download'},
        ],
        rowid: '',
        row_id: 'assets_id',
        selectedlist: [],
      };
    },
    mounted() {
      this.getListData();
    },
    created() {
      this.initWebSocket();
    },
    destroyed() {
      this.websock.close() //离开路由之后断开websocket连接
    },
    methods: {
      initWebSocket(){ //初始化weosocket
        const wsuri = "ws://127.0.0.1:6690/add";
        this.websock = new WebSocket(wsuri);
        this.websock.onmessage = this.websocketonmessage;
        this.websock.onopen = this.websocketonopen;
        this.websock.onerror = this.websocketonerror;
        this.websock.onclose = this.websocketclose;
      },
      websocketonopen(e){ //连接建立之后执行send方法发送数据
        console.log('连接',e);
      },
      websocketonerror(){//连接建立失败重连
        this.initWebSocket();
      },
      websocketonmessage(e){ //数据接收
        const redata = JSON.parse(e.data);
      },
      websocketsend(Data){//数据发送
        this.websock.send(Data);
      },
      websocketclose(e){  //关闭
        console.log('断开连接',e);
      },
      onSubmit() {
        this.$store
          .dispatch('ASSETS1001Store/insertlots', this.form)
          .then(response => {
            Message({
              message: this.$t('normal.success_02'),
              type: 'success',
              duration: 5 * 1000,
            });

            this.piliang = false;

          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
          });
      },
      closed() {
        this.getListData();
      },
      getBartype(val) {
        this.form.bartype = val;
      },
      getTypeassets(val) {
        this.form.typeassets = val;
      },
      getListData() {
        this.loading = true;
        this.$store
          .dispatch('ASSETS1001Store/getList', {})
          .then(response => {
            for (let j = 0; j < response.length; j++) {
              let user = getUserInfo(response[j].principal);
              if (user) {
                response[j].principal = user.userinfo.customername;
                response[j].jobnumber = user.userinfo.jobnumber;
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
              if (response[j].bartype !== null && response[j].bartype !== '') {
                let letbartype1 = getDictionaryInfo(response[j].bartype);
                if (letbartype1 != null) {
                  response[j].bartypeName = letbartype1.value1;
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
              type: 'info',
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
        if (val === 'export') {
          this.selectedlist = this.$refs.roletable.selectedList;
          import('@/vendor/Export2Excel').then(excel => {
            const tHeader = [this.$t('label.ASSETS1001VIEW_FILENAME'), this.$t('label.ASSETS1001VIEW_TYPEASSETS'), this.$t('label.ASSETS1001VIEW_PRICE'), this.$t('label.ASSETS1001VIEW_PURCHASETIME'), this.$t('label.ASSETS1001VIEW_USEDEPARTMENT'), this.$t('label.PFANS2020VIEW_JOBNUMBER'), this.$t('label.ASSETS1001VIEW_BARCODE'), this.$t('label.ASSETS1001VIEW_BARTYPE'), this.$t('label.ASSETS1001VIEW_ASSETSTATUS')];
            const filterVal = ['filename', 'typeassets', 'price', 'purchasetime', 'usedepartment', 'jobnumber', 'barcode', 'bartypeName', 'assetstatus'];
            const list = this.selectedlist;
            const data = this.formatJson(filterVal, list);
            excel.export_json_to_excel(tHeader, data, this.$t('menu.ASSETS1001'));
          });
        }
        if (val === 'export2') {
          this.loading = true;
          this.$store
            .dispatch('ASSETS1001Store/download', {})
            .then(response => {
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
        }
        if (val === 'insertLots') {
          this.piliang = true;
        }
        if(val === 'prtQrcode'){
          this.selectedlist = this.$refs.roletable.selectedList;
          if (this.selectedlist.length === 0) {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          let list = [];
          for(let i of this.selectedlist){
            var item = {};
            item.type = i.bartype;
            item.rfid = i.rfidcd;
            item.text = i.barcode;
            list.push(item);
          }

          this.websocketsend(JSON.stringify(list));
        }
      }
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
