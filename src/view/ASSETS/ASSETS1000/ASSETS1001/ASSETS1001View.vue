<template>
  <div>
    <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row_id"
                     :showSelection="showSelection" :title="title" @buttonClick="buttonClick" @rowClick="rowClick"
                     ref="roletable"
                     v-loading="loading">
    </EasyNormalTable>
    <el-dialog :visible.sync="daoru" @close="closed" width="50%" destroy-on-close>
      <div>
        <div style="margin-top: 1rem;margin-left: 28%">
          <el-upload
            :action="postAction"
            :before-upload="handleChange"
            :headers="authHeader"
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
    <el-dialog :visible.sync="piliang" @close="closed" width="50%" destroy-on-close>
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

    <el-dialog :visible.sync="pop_download" width="50%" destroy-on-close>
      <el-table
        :data="downtypes"
        style="width: 100%">
        <el-table-column
          prop="name"
          :label="$t('label.ASSETS1001VIEW_FILENAME')"
        >
        </el-table-column>

        <el-table-column :label="$t('label.operation')">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleDownload(scope.row)"
            >{{$t('button.download2')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
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
        pop_download: false,
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
            width: 120,
            fix: false,
            filter: false,
          },
          {
            code: 'typeassets',
            label: 'label.ASSETS1001VIEW_TYPEASSETS',
            width: 120,
            fix: false,
            filter: false,
          },
          {
            code: 'principal',
            label: 'label.ASSETS1001VIEW_PRINCIPAL',
            width: 120,
            fix: false,
            filter: false,
          },
          {
            code: 'barcode',
            label: 'label.ASSETS1001VIEW_BARCODE',
            width: 120,
            fix: false,
            filter: false,
          },
          {
            code: 'bartypeName',
            label: 'label.ASSETS1001VIEW_BARTYPE',
            width: 120,
            fix: false,
            filter: false,
          },
          {
            code: 'assetstatus',
            label: 'label.ASSETS1001VIEW_ASSETSTATUS',
            width: 120,
            fix: false,
            filter: false,
          },
          {
            code: 'stockstatus',
            label: 'label.ASSETS1001VIEW_STOCKSTATUS',
            width: 120,
            fix: false,
            filter: false,
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
        selectedlist: []
      };
    },
    computed: {
      downtypes(){
        return [
          {name: this.$t('label.ASSETS1001VIEW_TEMPLAET_GUDING'), type: 2},
          {name: this.$t('label.ASSETS1001VIEW_TEMPLAET_BUWAI'), type: 1},
          {name: this.$t('label.ASSETS1001VIEW_TEMPLAET_QITA'), type: 0}
        ]
      }
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
        // this.initWebSocket();
      },
      websocketonmessage(e){ //数据接收
        this.loading = false;
        const redata = JSON.parse(e.data);
        if(redata.code === 200){
          Message({
            message: this.$t('normal.success_03'),
            type: 'success',
            duration: 5 * 1000,
          });
        }else{
          Message({
            message: error,
            type: 'error',
            duration: 5 * 1000,
          });
        }
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
        this.$refs.form.resetFields();
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
              debugger
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
                  response[j].typeassets1 = response[j].typeassets;
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
              if (response[j].stockstatus !== null && response[j].stockstatus !== '') {
                let letErrortype1 = getDictionaryInfo(response[j].stockstatus);
                if (letErrortype1 != null) {
                  response[j].stockstatus = letErrortype1.value1;
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
          debugger
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
              obj.error = response.data[c].substring(6 + r.length -3);
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
            debugger
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
            debugger
          this.selectedlist = this.$refs.roletable.selectedList;
            if(this.selectedlist.length === 0){
                Message({
                    message: this.$t("normal.info_01"),
                    type: 'info',
                    duration: 2 * 1000
                });
            }else{
                let selectedList = this.selectedlist;
                this.export(selectedList);
            }
        }
        if (val === 'export2') {
          this.pop_download = true;
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
          this.loading = true;
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
      },
      export(selectedList){
          debugger;
          let tHeader = "";
          let filterVal = "";
          let arr1 = ["PA001001"];
          let arr2 = ["PA001002","PA001003","PA001004"];
          let arr3 = ["PA001005","PA001006","PA001007","PA001008"];
          if(selectedList.every(list => {
              return arr1.includes(list.typeassets1)
          })){
              selectedList.forEach(
                  list => {
                      if(list.purchasetime){
                          list.purchasetime = moment(list.purchasetime).format("YYYY/MM/DD");
                      }
                      });
               tHeader = [this.$t('label.ASSETS1001VIEW_FILENAME'),
                  this.$t('label.ASSETS1001VIEW_TYPEASSETS'),
                  this.$t('label.PFANS2020VIEW_JOBNUMBER'),
                  this.$t('label.ASSETS1001VIEW_BARCODE'),
                  this.$t('label.ASSETS1001VIEW_BARTYPE'),
                  this.$t('label.ASSETS1001VIEW_ASSETSTATUS'),
                  this.$t('label.ASSETS1001VIEW_STOCKSTATUS'),
                 this.$t('label.ASSETS1001VIEW_PCNO'),
                 this.$t('label.ASSETS1001VIEW_USEDEPARTMENT'),
                 this.$t('label.ASSETS1001VIEW_DEPARTMENTCODE'),
                 this.$t('label.ASSETS1001VIEW_PURCHASETIME'),
                 this.$t('label.ASSETS1001VIEW_PRICE'),
                 this.$t('label.ASSETS1001VIEW_REALPRICE'),
                 this.$t('label.ASSETS1001VIEW_MODEL'),
                 this.$t('label.ASSETS1001VIEW_REMARKS')
              ];
               filterVal = ['filename', 'typeassets', 'jobnumber', 'barcode', 'bartypeName', 'assetstatus','stockstatus','pcno','usedepartment','departmentcode','purchasetime','price','realprice','model','remarks'];
          }else if(selectedList.every(list => {
              return arr2.includes(list.typeassets1)
          })){
              selectedList.forEach(
                  list => {
                      if(list.activitiondate){
                          list.activitiondate = moment(list.activitiondate).format("YYYY/MM/DD");
                      }if(list.psdcdperiod){
                          list.psdcdperiod = moment(list.psdcdperiod).format("YYYY/MM/DD");
                      }if(list.psdcdreturndate){
                          list.psdcdreturndate = moment(list.psdcdreturndate).format("YYYY/MM/DD");
                      }
                  });
               tHeader = [this.$t('label.ASSETS1001VIEW_FILENAME'),
                  this.$t('label.ASSETS1001VIEW_TYPEASSETS'),
                  this.$t('label.PFANS2020VIEW_JOBNUMBER'),
                  this.$t('label.ASSETS1001VIEW_BARCODE'),
                  this.$t('label.ASSETS1001VIEW_BARTYPE'),
                  this.$t('label.ASSETS1001VIEW_ASSETSTATUS'),
                  this.$t('label.ASSETS1001VIEW_STOCKSTATUS'),
                  this.$t('label.ASSETS1001VIEW_REMARKS1'),
                  this.$t('label.ASSETS1001VIEW_NO'),
                  this.$t('label.ASSETS1001VIEW_ACTIVITIONDATE'),
                  this.$t('label.ASSETS1001VIEW_ORIPRICE'),
                  this.$t('label.ASSETS1001VIEW_LABELNUMBER'),
                  this.$t('label.ASSETS1001VIEW_MODEL'),
                  this.$t('label.ASSETS1001VIEW_ADDRESS'),
                  this.$t('label.ASSETS1001VIEW_USEDEPARTMENT'),
                  this.$t('label.ASSETS1001VIEW_DEPARTMENTCODE'),
                  this.$t('label.ASSETS1001VIEW_PSDCDDEBITSITUATION'),
                  this.$t('label.ASSETS1001VIEW_PSDCDBRINGOUTREASON'),
                  this.$t('label.ASSETS1001VIEW_PSDCDPERIOD'),
                  this.$t('label.ASSETS1001VIEW_PSDCDRETURNDATE'),
                  this.$t('label.ASSETS1001VIEW_PSDCDISOVERDUE'),
                  this.$t('label.ASSETS1001VIEW_PSDCDCOUNTERPARTY'),
                  this.$t('label.ASSETS1001VIEW_PSDCDRESPONSIBLE'),
                  this.$t('label.ASSETS1001VIEW_PSDCDRETURNCONFIRMATION')
              ];
               filterVal = ['filename', 'typeassets', 'jobnumber', 'barcode', 'bartypeName', 'assetstatus','stockstatus',
                  'remarks','no','activitiondate','price','assetnumber','model','address','usedepartment','departmentcode','psdcddebitsituation','psdcdbringoutreason'
                  ,'psdcdperiod','psdcdreturndate','psdcdisoverdue','psdcdcounterparty','psdcdresponsible','psdcdreturnconfirmation'];

          }else if(selectedList.every(list => {
              return arr3.includes(list.typeassets1)
          })){
              selectedList.forEach(
                  list => {
                      debugger
                      if(list.outparams12 && getUserInfo(list.outparams12)){
                          list.outparams12 = getUserInfo(list.outparams12).userinfo.customername;
                      }if(list.outparams11 && getUserInfo(list.outparams11)){
                          list.outparams11 = getUserInfo(list.outparams11).userinfo.customername;
                      }if(list.inparams3 && getUserInfo(list.inparams3)){
                          list.inparams3 = getUserInfo(list.inparams3).userinfo.customername;
                      }if(list.inparams6 && getUserInfo(list.outparams6)){
                          list.inparams6 = getUserInfo(list.inparams6).userinfo.customername;
                      }if(list.outparams2 && getUserInfo(list.outparams2)){
                          list.outparams2 = getUserInfo(list.outparams2).userinfo.customername;
                      }if(list.outparams7 && getUserInfo(list.outparams7)){
                          list.outparams7 = getUserInfo(list.outparams7).userinfo.customername;
                      }if(list.outparams8 && getUserInfo(list.outparams8)){
                          list.outparams8 = getUserInfo(list.outparams8).userinfo.customername;
                      }if(list.purchasetime){
                          list.purchasetime = moment(list.purchasetime).format("YYYY/MM/DD");
                      }if(list.activitiondate){
                          list.activitiondate = moment(list.activitiondate).format("YYYY/MM/DD");
                      }if(list.inparams4){
                          list.inparams4 = moment(list.inparams4).format("YYYY/MM/DD");
                      }if(list.inparams7){
                          list.inparams7 = moment(list.inparams7).format("YYYY/MM/DD");
                      }if(list.outparams3){
                          list.outparams3 = moment(list.outparams3).format("YYYY/MM/DD");
                      }if(list.outparams13){
                          list.outparams13 = moment(list.outparams13).format("YYYY/MM/DD");
                      }if(list.outparams9){
                          list.outparams9 = moment(list.outparams9).format("YYYY/MM/DD");
                      }

                      list.inparams1 = list.inparams1 === "1" ? this.$t("label.yes") : this.$t("label.no");
                      list.inparams2 = list.inparams2 === "1" ? this.$t("label.yes") : this.$t("label.no");
                      list.inparams5 = list.inparams5 === "1" ? this.$t("label.yes") : this.$t("label.no");
                      list.outparams4 = list.outparams4 === "1" ? this.$t("label.yes") : this.$t("label.no");
                      list.outparams5 = list.outparams5 === "1" ? this.$t("label.yes") : this.$t("label.no");
                      list.outparams6 = list.outparams6 === "1" ? this.$t("label.yes") : this.$t("label.no");
                      list.outparams10 = list.outparams10 === "1" ? this.$t("label.yes") : this.$t("label.no");
                  }
              )
               tHeader = [this.$t('label.ASSETS1001VIEW_FILENAME'),
                  this.$t('label.ASSETS1001VIEW_TYPEASSETS'),
                  this.$t('label.PFANS2020VIEW_JOBNUMBER'),
                  this.$t('label.ASSETS1001VIEW_BARCODE'),
                  this.$t('label.ASSETS1001VIEW_BARTYPE'),
                  this.$t('label.ASSETS1001VIEW_ASSETSTATUS'),
                  this.$t('label.ASSETS1001VIEW_STOCKSTATUS'),
                  this.$t('label.ASSETS1001VIEW_TONGGUANNO'),
                  this.$t('label.ASSETS1001VIEW_MODEL'),
                  this.$t('label.ASSETS1001VIEW_PRICE'),
                  this.$t('label.ASSETS1001VIEW_HSCODE'),
                  this.$t('label.ASSETS1001VIEW_INTIME'),
                  this.$t('label.ASSETS1001VIEW_YANQIDATE'),
                  this.$t('label.ASSETS1001VIEW_REMARKS'),
                  this.$t('label.ASSETS1001VIEW_CUSTOMER'),
                  this.$t('label.ASSETS1001VIEW_CONTROLNO'),
                  this.$t('label.ASSETS1001VIEW_MACHINENAME'),
                  this.$t('label.ASSETS1001VIEW_PARAM1'),
                  this.$t('label.ASSETS1001VIEW_PARAM2'),
                  this.$t('label.ASSETS1001VIEW_PARAM3'),
                  this.$t('label.ASSETS1001VIEW_PARAM4'),
                  this.$t('label.ASSETS1001VIEW_PARAM5'),
                  this.$t('label.ASSETS1001VIEW_PARAM6'),
                  this.$t('label.ASSETS1001VIEW_PARAM4'),
                  this.$t('label.ASSETS1001VIEW_PARAM7'),
                  this.$t('label.ASSETS1001VIEW_PARAM5'),
                  this.$t('label.ASSETS1001VIEW_PARAM8'),
                  this.$t('label.ASSETS1001VIEW_PARAM4'),
                  this.$t('label.ASSETS1001VIEW_PARAM9'),
                  this.$t('label.ASSETS1001VIEW_PARAM10'),
                  this.$t('label.ASSETS1001VIEW_PARAM11'),
                  this.$t('label.ASSETS1001VIEW_PARAM6'),
                  this.$t('label.ASSETS1001VIEW_PARAM3'),
                  this.$t('label.ASSETS1001VIEW_PARAM4'),
                  this.$t('label.ASSETS1001VIEW_PARAM12'),
                  this.$t('label.ASSETS1001VIEW_PARAM13'),
                  this.$t('label.ASSETS1001VIEW_PARAM14'),
                  this.$t('label.ASSETS1001VIEW_PARAM4'),
                  this.$t('label.ASSETS1001VIEW_PARAM7')
              ];
               filterVal = ['filename', 'typeassets', 'jobnumber', 'barcode', 'bartypeName', 'assetstatus','stockstatus',
                  'pcno','model','price','no','purchasetime','activitiondate','remarks','customer','controlno','machinename',
                  'inparams1','inparams2',
                   'inparams3','inparams4','inparams5','inparams6',
                   'inparams7','inparams8','outparams1',
                  'outparams2', 'outparams3','outparams4','outparams5','outparams6','outparams7','outparams8','outparams9',
                  'outparams10','outparams11','outparams12','outparams13','outparams14'];
          }else{
              Message({
                  message: this.$t("label.ASSETS1001VIEW_ERROR"),
                  type: 'error',
                  duration: 2 * 1000
              });
          }
          if(tHeader&&filterVal){
              import('@/vendor/Export2Excel').then(excel => {
                  const list = selectedList;
                  const data = this.formatJson(filterVal, list);
                  excel.export_json_to_excel(tHeader, data, this.$t('menu.ASSETS1001'));
              });
          }
      },
      handleDownload(row) {
        this.loading = true;
        this.$store
            .dispatch('ASSETS1001Store/download', {'type': row.type})
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
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
