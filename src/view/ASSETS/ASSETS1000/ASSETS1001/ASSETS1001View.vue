<template>
  <div>
    <EasyNormalTable ref="roletable" v-loading="loading" :buttonList="buttonList" :columns="columns"
                     :data="data" :rowid="row_id"
                     :selectable="selectInit" :showSelection="showSelection" :title="title" @buttonClick="buttonClick"
                     @reget="getListData"
                     @rowClick="rowClick">
      <el-select slot="customize" v-model="department" @change="changed">
        <el-option
          v-for="item in options"
          :key="item.code"
          :label="item.code"
          :value="item.code">
        </el-option>
      </el-select>
    </EasyNormalTable>
    <el-dialog :visible.sync="daoru" destroy-on-close width="50%" @close="closed">
      <div>
        <div style="margin-top: 1rem;margin-left: 28%">
          <el-upload
            ref="uploader"
            :action="postAction"
            :before-upload="handleChange"
            :headers="authHeader"
            :on-remove="this.clear"
            :on-success="handleSuccess"
            drag
            multiple
          >
            <i class="el-icon-upload"></i>
            <div>{{ $t('label.PFANS2005FORMVIEW_MBYQ') }}</div>
          </el-upload>
        </div>
        <el-row>
          <span v-if="this.resultShow">{{ $t('label.PFANS2005FORMVIEW_CG') }}{{ this.successCount }}</span>&nbsp;&nbsp;&nbsp;&nbsp;
          <span v-if="this.resultShow"
          >{{ $t('label.PFANS2005FORMVIEW_SB') }}{{ this.errorCount }}</span>
        </el-row>
        <span v-if="this.Message">{{ this.cuowu }}</span>
        <div v-if="this.result">
          <el-table :data="message">
            <el-table-column :label="$t('label.PFANS2017VIEW_CUHS')" align="center" prop="hang" width="120%">
            </el-table-column>
            <el-table-column :label="$t('label.PFANS2017VIEW_ERROR')" align="center" prop="error">
            </el-table-column>
          </el-table>
          <div class="pagination-container" style="padding-top: 2rem">
            <el-pagination :current-page.sync="listQuery.page" :page-size="listQuery.limit"
                           :page-sizes="[5,10,20,30,50]" :total="total" layout="slot,sizes, ->,prev, pager, next, jumper"
                           @current-change="handleCurrentChange" @size-change="handleSizeChange">
              <slot><span class="front Content_front"
                          style="padding-right: 0.5rem;font-weight: 400">{{ $t('table.pagesize') }}</span></slot>
            </el-pagination>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="piliang" destroy-on-close width="50%" @close="closed">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item :label="$t('label.ASSETS1001VIEW_BARTYPE')" prop="bartype">
          <dicselect
            :code="code4"
            :data="form.bartype"
            style="width: 20vw"
            @change="getBartype">
          </dicselect>
        </el-form-item>
        <el-form-item :label="$t('label.ASSETS1001VIEW_TYPEASSETS')" prop="typeassets">
          <dicselect
            :code="code1"
            :data="form.typeassets"
            style="width:20vw"
            @change="getTypeassets">
          </dicselect>
        </el-form-item>
        <el-form-item :label="$t('label.ASSETS1001VIEW_SUM')" prop="sum">
          <el-input-number v-model="form.sum" :max="999" :min="1" controls-position="right"
                           style="width:20vw"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit">{{ $t('button.insert') }}</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="pop_download" destroy-on-close width="50%">
      <el-table
        :data="downtypes"
        style="width: 100%">
        <el-table-column
          :label="$t('label.ASSETS1001VIEW_FILENAME')"
          prop="name"
        >
        </el-table-column>
        <el-table-column :label="$t('label.operation')">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleDownload(scope.row)"
            >{{ $t('button.download2') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog :visible.sync="pop_assettransfer" destroy-on-close width="50%">
      <el-row>
        <!--资产报废-->
        <el-col :span="8" style="margin-left: 3vw">
          <el-button
            prop="name"
            size="mini"
            @click="assetoperation(0)"
          >{{ $t('label.PFANS1002VIEW_ASSETRETIREMENT') }}
          </el-button>
        </el-col>
        <!--资产转移-->
        <el-col :span="8">
          <el-button
            prop="name"
            size="mini"
            @click="assetoperation(1)"
          >{{ $t('label.PFANS1002VIEW_ASSETTRANSFER') }}
          </el-button>
        </el-col>
        <!--资产借出/带出-->
        <el-col :span="6">
          <el-button
            prop="name"
            size="mini"
            @click="assetoperation(2)"
          >{{ $t('label.PFANS1002VIEW_ASSETLENDINGC') }}
          </el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import EasyNormalTable from '@/components/EasyBigDataTable';
import {getToken} from '@/utils/auth';
import {Message} from 'element-ui';
import moment from 'moment';
import {
  Decrypt,
  getCurrentRole20,
  getCurrentRoleGiving,
  getDictionaryInfo,
  getUserInfo,
  getUserInfoName,
} from '@/utils/customize';
import dicselect from '../../../components/dicselect.vue';

export default {
  name: 'ASSETS1001View',
  components: {
    EasyNormalTable,
    dicselect,
  },
  data() {
    return {
      userids: '',
      department: '',
      options: [],
      totaldata: [],
      listQuery: {
        page: 1,
        limit: 5,
      },
      piliang: false,
      form: {
        bartype: '',
        typeassets: '',
        sum: 1,
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
      tableData: [{}],
      Message: false,
      cuowu: '',
      downloadLoading: false,
      showSelection: true,
      loading: false,
      pop_download: false,
      pop_assettransfer: false,
      title: 'title.ASSETS1001VIEW',
      data: [],
      rules: {
        bartype: [{
          required: true,
          message: this.$t('normal.error_09') + this.$t('label.ASSETS1001VIEW_BARTYPE'),
          trigger: 'change',
        }],
        typeassets: [{
          required: true,
          message: this.$t('normal.error_09') + this.$t('label.ASSETS1001VIEW_TYPEASSETS'),
          trigger: 'change',
        }],
        sum: [
          {
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.ASSETS1001VIEW_SUM'),
            trigger: 'change',
          },
        ],
      },
      columns: [
        {
          code: 'typeassets',
          label: 'label.ASSETS1001VIEW_TYPEASSETS',
          width: 120,
          fix: false,
          filter: true,
          //update_qhr_20210908 更改资产类型可删选属性
        }, {
          code: 'filename',
          label: 'label.ASSETS1001VIEW_FILENAME',
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
        //add ccm 20201102 需求对应
        {
          code: 'pcno',
          label: 'label.ASSETS1001VIEW_PCNO',
          width: 120,
          fix: false,
          filter: false,
        },
        //add ccm 20201102 需求对应
        {
          code: 'usedepartment',
          label: 'label.ASSETS1001VIEW_USEDEPARTMENT',
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
        //add-ztc-No.664-存放地点
        {
          code: 'storagelocation',
          label: 'label.ASSETS1001VIEW_STORAGELOCATION',
          width: 120,
          fix: false,
          filter: false,
        },
        //add-ztc-No.664-存放地点
        //add-ws-No.58-启用日期画面添加
        {
          code: 'activitiondate',
          label: 'label.ASSETS1001VIEW_ACTIVITIONDATE',
          width: 120,
          fix: false,
          filter: false,
        },
        //add-ws-No.58-启用日期画面添加
        //add ccm 20201102 需求对应
        {
          code: 'price',
          label: 'label.ASSETS1001VIEW_PRICE',
          width: 120,
          fix: false,
          filter: false,
        },
        {
          code: 'realprice',
          label: 'label.ASSETS1001VIEW_REALPRICE',
          width: 120,
          fix: false,
          filter: false,
        },
        //add ccm 20201102 需求对应
      ],
      buttonList: [
        {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
        {'key': 'insertLots', 'name': 'button.insertLots', 'disabled': false, 'icon': 'el-icon-plus'},
        {'key': 'edit', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
        {'key': 'prtQrcode', 'name': 'button.printing', 'disabled': false, 'icon': 'el-icon-printer'},
        {'key': 'import', 'name': 'button.import', 'disabled': false, 'icon': 'el-icon-upload2'},
        {'key': 'export', 'name': 'button.export', 'disabled': false, 'icon': 'el-icon-download'},
        {'key': 'export2', 'name': 'button.download2', 'disabled': false, 'icon': 'el-icon-download'},
        //UPD-ws-02/22-PSDCD_PFANS_20201124_XQ_031/PSDCD_PFANS_20201122_XQ_014-from
        // {'key': 'assettransfer', 'name': 'button.assettransfer', 'disabled': true, 'icon': 'el-icon-plus'},
        {'key': 'assettransfer', 'name': 'button.assettransfer', 'disabled': false, 'icon': 'el-icon-plus'},
        //UPD-ws-02/22-PSDCD_PFANS_20201124_XQ_031/PSDCD_PFANS_20201122_XQ_014-to
      ],
      rowid: '',
      row_id: 'assets_id',
      //add zy 1.是离职人员 2.请选择自己名下的所有资产做异动 start
      _count: 0,
      //add zy 1.是离职人员 2.请选择自己名下的所有资产做异动 end
    };
  },
  computed: {
    downtypes() {
      return [
        {name: this.$t('label.ASSETS1001VIEW_TEMPLAET_GUDING'), type: 2},
        {name: this.$t('label.ASSETS1001VIEW_TEMPLAET_WUXING'), type: 3},
        {name: this.$t('label.ASSETS1001VIEW_TEMPLAET_BUWAI1'), type: 4},
        {name: this.$t('label.ASSETS1001VIEW_TEMPLAET_BUWAI'), type: 1},
        {name: this.$t('label.ASSETS1001VIEW_TEMPLAET_QITA'), type: 0},
      ];
    },
  },
  mounted() {
    // this.getListData();
    this.getDepartmentData();
  },
  created() {
    //add ccm 20210524 fr
    let roleGiving = getCurrentRoleGiving();
    if (roleGiving === '0') {
      this.buttonList[0].disabled = false;
      this.buttonList[1].disabled = false;
      this.buttonList[2].disabled = false;
      this.buttonList[4].disabled = false;
    } else {
      this.buttonList[0].disabled = true;
      this.buttonList[1].disabled = true;
      this.buttonList[2].disabled = true;
      this.buttonList[4].disabled = true;
    }
    //add ccm 20210524 to

    this.initWebSocket();
  },
  destroyed() {
    this.websock.close(); //离开路由之后断开websocket连接
  },
  methods: {
    initWebSocket() { //初始化weosocket
      const wsuri = 'ws://127.0.0.1:6690/add';
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen(e) { //连接建立之后执行send方法发送数据
      console.log('连接', e);
    },
    websocketonerror() {//连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage(e) { //数据接收
      this.loading = false;
      const redata = JSON.parse(e.data);
      if (redata.code === 200) {
        Message({
          message: this.$t('normal.success_03'),
          type: 'success',
          duration: 5 * 1000,
        });
      } else {
        Message({
          message: error,
          type: 'error',
          duration: 5 * 1000,
        });
      }

      this.$refs.roletable.$refs.eltable.clearSelection();
    },
    websocketsend(Data) {//数据发送
      this.websock.send(Data);
    },
    websocketclose(e) {  //关闭
      console.log('断开连接', e);
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
          this.$message.error({
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
    getDepartmentData() {
      this.loading = true;
      this.$store
        .dispatch('ASSETS1001Store/getDepartment')
        .then(response => {
            this.loading = false;
            let filters = new Set();
            for (let item of response) {
              let i = {};
              if (item) {
                i.code = item;
              }
              filters.add(i);
            }
            let filtersrst = [...new Set(filters)];
            var hash = {};
            filtersrst = filtersrst.reduce(function(item, next) {
              if (hash[next.code]) {
                '';
              } else {
                hash[next.code] = true && item.push(next);
              }
              return item;
            }, []);
            for (let i = 0; i < filtersrst.length; i++) {
              if (filtersrst[i].code == '' || filtersrst[i].code == null || filtersrst[i].code == undefined) {
                // filtersrst[i].code = '全部';
                //设备管理页面，部门下拉框'全部'为首选  add scc
                filtersrst[i].code = filtersrst[i - 1].code;
                filtersrst[i - 1].code = '全部';
              }
            }
            this.options = filtersrst;

            // for (let item of response) {
            //   let i = {};
            //   if (item) {
            //     i.code = item;
            //   }
            //   this.options.push(i);
            // }
          },
        ).catch(error => {
        this.$message.error({
          message: error,
          type: 'error',
          duration: 5 * 1000,
        });
        this.loading = false;
      });
    },
    // 资产报废不可以异动操作 ztc fr
    selectInit(row, index) {
      if (row !== undefined) {
        if (row.assetstatus !== undefined && row.assetstatus != this.$t('label.PFANS1002VIEW_ASSETREBF')) {
          return row;
        }
      }
    },
    // 资产报废不可以异动操作 ztc to
    changed() {
      this.getListData();
    },
    getListData() {
      this.loading = true;
      let getDep = '';
      if (this.department == '全部') {
        getDep = undefined;
      } else {
        getDep = this.department;
      }
      this.$store
        .dispatch('ASSETS1001Store/getList', {usedepartment: getDep})
        .then(response => {
          //add zy 1.是离职人员 2.请选择自己名下的所有资产做异动 start
          this._count = 0;
          let p = 0;
          response.filter((item) => {
            if (item.principal === this.$store.getters.userinfo.userid) {
              p++;
            }
          });
          this._count = p;
          //add zy 1.是离职人员 2.请选择自己名下的所有资产做异动 end

          for (let j = 0; j < response.length; j++) {
            // response[j].principal1 = response[j].principal;
            response[j].psdcdreturnconfirmation1 = response[j].psdcdreturnconfirmation;
            let user = getUserInfo(response[j].principal);
            //PSDCD_PFANS_20210408_XQ_024 新组织变更 ztc start
            // if (response[j].usedepartment !== null && response[j].usedepartment !== '') {
            //   let group = getOrgInfo(response[j].usedepartment);
            //   if (group) {
            //     response[j].usedepartment = group.companyname;
            //   }
            // }
            //PSDCD_PFANS_20210408_XQ_024 新组织变更 ztc end
            if (user) {
              response[j].principal = user.userinfo.customername;
              response[j].jobnumber = user.userinfo.jobnumber;
              response[j].caiwupersonalcode = user.userinfo.caiwupersonalcode;
            }
            if (response[j].purchasetime !== null && response[j].purchasetime !== '') {
              response[j].purchasetime = moment(response[j].purchasetime).format('YYYY-MM-DD');
            }
            //add-ws-No.58-启用日期画面添加
            if (response[j].activitiondate !== null && response[j].activitiondate !== '') {
              response[j].activitiondate = moment(response[j].activitiondate).format('YYYY-MM-DD');
            }
            //add-ws-No.58-启用日期画面添加
            if (response[j].typeassets !== null && response[j].typeassets !== '') {
              response[j].typeassets1 = response[j].typeassets;
              let letErrortype = getDictionaryInfo(response[j].typeassets);
              if (letErrortype != null) {
                response[j].typeassets = letErrortype.value1;
              }
            }
            if (response[j].assetstatus !== null && response[j].assetstatus !== '') {
              response[j].assetstatuscode = response[j].assetstatus;
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
          this.selectInit();
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
      // add 210906 gbb PSDCD_PFANS_20210823_XQ_111 【报废】资产不能做异动与设备盘点 start
      //region scc del 10/9 行点击报废资产，按钮状态不变，因为只有选中才可以转移 from
      // if(row.assetstatuscode === 'PA003002'){
      //   this.buttonList[7].disabled = true;
      // }
      //endregion scc del 10/9 行点击报废资产，按钮状态不变，因为只有选中才可以转移 to
      // add 210906 gbb PSDCD_PFANS_20210823_XQ_111 【报废】资产不能做异动与设备盘点 end
      //DEL-ws-02/22-PSDCD_PFANS_20201124_XQ_031/PSDCD_PFANS_20201122_XQ_014-from
      //add-ws-9/30-禅道任务564
      // this.buttonList[7].disabled = true;
      // if (getUserInfoName(row.principal) !== '-1') {
      //   this.userids = getUserInfoName(row.principal).userid;
      //   this.usedepartment1 = getUserInfoName(row.principal).userinfo.budgetunit;
      // }
      // let role = getCurrentRole18();
      // if (role === '0' && this.usedepartment1 === this.$store.getters.userinfo.userinfo.budgetunit) {
      //   this.buttonList[7].disabled = false;
      // } else if (this.userids === this.$store.getters.userinfo.userid) {
      //   this.buttonList[7].disabled = false;
      // }
//add-ws-9/30-禅道任务564
      //DEL-ws-02/22-PSDCD_PFANS_20201124_XQ_031/PSDCD_PFANS_20201122_XQ_014-to
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
        response.data = JSON.parse(Decrypt(response.data));
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
            obj.error = response.data[c].substring(6 + r.length - 3);
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
        if (this.selectedlist.length === 0) {
          Message({
            message: this.$t('normal.info_01'),
            type: 'info',
            duration: 2 * 1000,
          });
        } else {
          //region scc upd 9/7 避免导出页面启用时间的变化 from
          let selectedList = JSON.parse(JSON.stringify(this.selectedlist));
          //endregion scc upd 9/7 避免导出页面启用时间的变化 to
          this.export(selectedList);
        }
      }
      if (val === 'export2') {
        this.pop_download = true;
      }
      if (val === 'insertLots') {
        this.piliang = true;
      }
      if (val === 'prtQrcode') {
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
        for (let i of this.selectedlist) {
          var item = {};
          item.type = i.bartype;
          item.rfid = i.rfidcd;
          item.text = i.barcode;
          list.push(item);
        }

        this.websocketsend(JSON.stringify(list));
      }


//UPD-ws-02/22-PSDCD_PFANS_20201124_XQ_031/PSDCD_PFANS_20201122_XQ_014-from
//         if (val === 'assettransfer') {
//           let R = 1;
//           for (let i = 0; i < this.$refs.roletable.selectedList.length; i++) {
//             if (getUserInfoName(this.$refs.roletable.selectedList[i].principal) !== '-1') {
//               this.userids = getUserInfoName(this.$refs.roletable.selectedList[i].principal).userid;
//               this.usedepartment1 = getUserInfoName(this.$refs.roletable.selectedList[i].principal).userinfo.budgetunit;
//             }
//             let role = getCurrentRole18();
//             if (role === '0' && this.usedepartment1 !== this.$store.getters.userinfo.userinfo.budgetunit) {
//               R *= 0;
//             } else if (role !== '0' && this.userids !== this.$store.getters.userinfo.userid) {
//               R *= 0;
//             } else {
//               R *= 1;
//             }
//           }
//           if (R === 0) {
//             Message({
//               message: this.$t('normal.error_23'),
//               type: 'error',
//               duration: 3 * 1000,
//             });
//           } else {
//             this.pop_assettransfer = true;
//           }
//         }
      if (val === 'assettransfer') {
        let roles = getCurrentRole20();
        if (roles === '0') {
          this.pop_assettransfer = true;
        } else {
          let R = 1;
          for (let i = 0; i < this.$refs.roletable.selectedList.length; i++) {
            if (getUserInfoName(this.$refs.roletable.selectedList[i].principal) !== '-1') {
              this.userids = getUserInfoName(this.$refs.roletable.selectedList[i].principal).userid;
              this.usedepartment1 = getUserInfoName(this.$refs.roletable.selectedList[i].principal).userinfo.budgetunit;
            }
            // update gbb 20210312 NT_PFANS_20210304_BUG_063 获取登录人权限 start
            //let role = getCurrentRole18();
            //if (role === '0' && this.usedepartment1 !== this.$store.getters.userinfo.userinfo.budgetunit) {
            //GM权限
            if (this.$store.getters.roles.indexOf('13') != -1 && this.usedepartment1 !== this.$store.getters.userinfo.userinfo.budgetunit) {
              R *= 0;
              //} else if (role !== '0' && this.userids !== this.$store.getters.userinfo.userid) {
            } else if (this.$store.getters.roles.indexOf('13') == -1 && this.userids !== this.$store.getters.userinfo.userid) {
              // update gbb 20210312 NT_PFANS_20210304_BUG_063 获取登录人权限 end
              R *= 0;
            } else {
              R *= 1;
            }
            //PSDCD_PFANS_20201124_XQ_031 ztc start 需求未实现重新对应
            if (this.$store.getters.roles.indexOf('47') != -1) {
              R = 1;
            }
            //PSDCD_PFANS_20201124_XQ_031 ztc end 需求未实现重新对应
          }
          //add zy 1.是离职人员 2.请选择自己名下的所有资产做异动 start
          let _p = 0;
          let _flag = false;
          if (this.$store.getters.userinfo.userinfo.resignation_date) {
            _flag = true;
            this.$refs.roletable.selectedList.filter((item) => {
              // 资产报废不可以异动操作 ztc fr
              if (getUserInfoName(item.principal).userid === this.$store.getters.userinfo.userid && item.assetstatus !== this.$t('label.PFANS1002VIEW_ASSETREBF')) {
                // 资产报废不可以异动操作 ztc to
                _p++;
              }
            });
          }
          //add zy 1.是离职人员 2.请选择自己名下的所有资产做异动 end
          if (R === 0) {
            Message({
              message: this.$t('normal.error_23'),
              type: 'error',
              duration: 3 * 1000,
            });
          }
          //add zy 1.是离职人员 2.请选择自己名下的所有资产做异动 start
          else if (_flag && this._count !== _p) {
            Message({
              message: this.$t('normal.error_27'),
              type: 'error',
              duration: 3 * 1000,
            });
          }
          //add zy 1.是离职人员 2.请选择自己名下的所有资产做异动 end
          else {
            this.pop_assettransfer = true;
          }
        }
      }
//UPD-ws-02/22-PSDCD_PFANS_20201124_XQ_031/PSDCD_PFANS_20201122_XQ_014-to
    },
    export(selectedList) {
      let tHeader = '';
      let filterVal = '';
      //固定资产 //簿外资产 //无形资产
      let arr1 = ['PA001001', 'PA001002', 'PA001003', 'PA001004', 'PA001009'];
      //借入资产
      let arr2 = ['PA001008'];
      //对外资产
      let arr3 = ['PA001005', 'PA001006'];

      if (selectedList.every(list => {
        return arr1.includes(list.typeassets1);
      })) {
        selectedList.forEach(
          list => {
            if (list.purchasetime) {
              list.purchasetime = moment(list.purchasetime).format('YYYY/MM/DD');
            }
            if (list.activitiondate) {
              //region scc upd 9/7 启用日期导出格式变换 from
              // list.activitiondate = moment(list.activitiondate).format('YYYY/MM/DD');
              list.activitiondate = moment(list.activitiondate).format('DD-MM-YYYY');
              //endregion scc upd 9/7 启用日期导出格式变换 to
            }
            if (list.psdcdperiod) {
              list.psdcdperiod = moment(list.psdcdperiod).format('YYYY/MM/DD');
            }
            if (list.psdcdreturndate) {
              list.psdcdreturndate = moment(list.psdcdreturndate).format('YYYY/MM/DD');
            }
            if (list.psdcdshijidate) {
              list.psdcdshijidate = moment(list.psdcdshijidate).format('YYYY/MM/DD');
            }
          });
        tHeader = [
          this.$t('label.ASSETS1001VIEW_TYPEASSETS'),//资产类型
          this.$t('label.ASSETS1001VIEW_FILENAME'),//名称
          this.$t('label.ASSETS1001VIEW_BARCODE'),//资产编号
          this.$t('label.ASSETS1001VIEW_USEDEPARTMENT'),//使用部门
          this.$t('label.ASSETS1001VIEW_DEPARTMENTCODE'),//部门代码
          this.$t('label.ASSETS1001VIEW_PRINCIPAL'),//管理者
          this.$t('label.ASSETS1001VIEW_BARTYPE'),//条码类型
          this.$t('label.ASSETS1001VIEW_ASSETSTATUS'),//资产状态
          this.$t('label.ASSETS1001VIEW_STOCKSTATUS'),//在库状态
          this.$t('label.ASSETS1001VIEW_PCNO'),//PC管理号
          this.$t('label.ASSETS1001VIEW_STORAGELOCATION'),//存放地点
          this.$t('label.ASSETS1001VIEW_ACTIVITIONDATE'),//启用日期
          this.$t('label.ASSETS1001VIEW_PRICE'),//原值
          this.$t('label.ASSETS1001VIEW_REALPRICE'),//帐面净值
          this.$t('label.ASSETS1001VIEW_MODEL'),//型号
          this.$t('label.ASSETS1001VIEW_PSDCDDEBITSITUATION'),//借还情况
          this.$t('label.ASSETS1001VIEW_PSDCDBRINGOUTREASON'),//带出理由
          this.$t('label.ASSETS1001VIEW_ADDRESS'),//带出地点
          this.$t('label.ASSETS1001VIEW_PSDCDRESPONSIBLE'),//带出地点联系人
          this.$t('label.ASSETS1001VIEW_PSDCDPHONE'),//联系电话
          this.$t('label.ASSETS1001VIEW_PSDCDPERIOD'),//带出开始日
          this.$t('label.ASSETS1001VIEW_PSDCDRETURNDATE'),//预计归还日
          this.$t('label.ASSETS1001VIEW_PSDCDSHIJIDATE'),//实际归还日
          this.$t('label.ASSETS1001VIEW_REMARKS'),//备注
          this.$t('label.ASSETS1001VIEW_REMARKS1'),//资产说明

        ];
        filterVal = ['typeassets', 'filename', 'barcode', 'usedepartment', 'departmentcode', 'caiwupersonalcode'
          , 'bartypeName', 'assetstatus', 'stockstatus', 'pcno', 'storagelocation', 'activitiondate', 'price', 'realprice', 'model'
          , 'psdcddebitsituation', 'psdcdbringoutreason', 'address', 'psdcdresponsible', 'psdcdphone'
          , 'psdcdperiod', 'psdcdreturndate', 'psdcdshijidate', 'remarks', 'remarks1'];

      } else if (selectedList.every(list => {
        return arr2.includes(list.typeassets1);
      })) {
        selectedList.forEach(
          list => {
            if (list.activitiondate) {
              list.activitiondate = moment(list.activitiondate).format('YYYY/MM/DD');
            }
            if (list.psdcdperiod) {
              list.psdcdperiod = moment(list.psdcdperiod).format('YYYY/MM/DD');
            }
            if (list.psdcdreturndate) {
              list.psdcdreturndate = moment(list.psdcdreturndate).format('YYYY/MM/DD');
            }
          });
        tHeader = [
          this.$t('label.ASSETS1001VIEW_TYPEASSETS'),//资产类型
          this.$t('label.ASSETS1001VIEW_FILENAME'),//名称
          this.$t('label.ASSETS1001VIEW_BARCODE'),//资产编号
          this.$t('label.ASSETS1001VIEW_USEDEPARTMENT'),//使用部门
          this.$t('label.ASSETS1001VIEW_DEPARTMENTCODE'),//部门代码
          this.$t('label.ASSETS1001VIEW_PRINCIPAL'),//管理者
          this.$t('label.ASSETS1001VIEW_BARTYPE'),//条码类型
          this.$t('label.ASSETS1001VIEW_MODEL'),//型号
          this.$t('label.ASSETS1001VIEW_JIECHUDANWEI'),//借出单位
          this.$t('label.ASSETS1001VIEW_JIECHUDANWEIREN'),//借出单位联系人
          this.$t('label.ASSETS1001VIEW_PSDCDPHONE'),//联系电话
          this.$t('label.ASSETS1001VIEW_LOANCONTRACT'),//借用合同
          this.$t('label.ASSETS1001VIEW_LOANCONTRACTNO'),//借用合同编号
          this.$t('label.ASSETS1001VIEW_LOANCONTRACTDATE'),//借用开始日
          this.$t('label.ASSETS1001VIEW_PSDCDRETURNDATE'),//预计归还日
          this.$t('label.ASSETS1001VIEW_PSDCDSHIJIDATE'),//实际归还日
          this.$t('label.ASSETS1001VIEW_REMARKS1'),//资产说明
          this.$t('label.ASSETS1001VIEW_REMARKS'),//备注
          this.$t('label.ASSETS1001VIEW_REMARKS2'),//备注1
        ];
        filterVal = ['typeassets', 'filename', 'barcode', 'usedepartment', 'departmentcode', 'caiwupersonalcode'
          , 'bartypeName', 'model', 'address', 'psdcdresponsible', 'psdcdphone', 'loancontract', 'loancontractno'
          , 'activitiondate', 'psdcdreturndate', 'psdcdshijidate', 'remarks1', 'remarks', 'remarks2'];

      } else if (selectedList.every(list => {
        return arr3.includes(list.typeassets1);
      })) {
        selectedList.forEach(
          list => {
            if (list.outparams12 && getUserInfo(list.outparams12)) {
              list.outparams12 = getUserInfo(list.outparams12).userinfo.customername;
            }
            if (list.outparams11 && getUserInfo(list.outparams11)) {
              list.outparams11 = getUserInfo(list.outparams11).userinfo.customername;
            }
            if (list.inparams3 && getUserInfo(list.inparams3)) {
              list.inparams3 = getUserInfo(list.inparams3).userinfo.customername;
            }
            if (list.owner && getUserInfo(list.owner)) {
              list.owner = getUserInfo(list.owner).userinfo.customername;
            }
            if (list.outparams2 && getUserInfo(list.outparams2)) {
              list.outparams2 = getUserInfo(list.outparams2).userinfo.customername;
            }
            if (list.outparams7 && getUserInfo(list.outparams7)) {
              list.outparams7 = getUserInfo(list.outparams7).userinfo.customername;
            }
            if (list.outparams8 && getUserInfo(list.outparams8)) {
              list.outparams8 = getUserInfo(list.outparams8).userinfo.customername;
            }
            if (list.purchasetime) {
              list.purchasetime = moment(list.purchasetime).format('YYYY/MM/DD');
            }
            if (list.activitiondate) {
              list.activitiondate = moment(list.activitiondate).format('YYYY/MM/DD');
            }
            if (list.inparams4) {
              list.inparams4 = moment(list.inparams4).format('YYYY/MM/DD');
            }
            if (list.inparams7) {
              list.inparams7 = moment(list.inparams7).format('YYYY/MM/DD');
            }
            if (list.outparams3) {
              list.outparams3 = moment(list.outparams3).format('YYYY/MM/DD');
            }
            if (list.outparams13) {
              list.outparams13 = moment(list.outparams13).format('YYYY/MM/DD');
            }
            if (list.outparams9) {
              list.outparams9 = moment(list.outparams9).format('YYYY/MM/DD');
            }

            list.inparams1 = list.inparams1 === '1' ? this.$t('label.yes') : this.$t('label.no');
            list.inparams2 = list.inparams2 === '1' ? this.$t('label.yes') : this.$t('label.no');
            list.inparams5 = list.inparams5 === '1' ? this.$t('label.yes') : this.$t('label.no');
            list.outparams4 = list.outparams4 === '1' ? this.$t('label.yes') : this.$t('label.no');
            list.outparams5 = list.outparams5 === '1' ? this.$t('label.yes') : this.$t('label.no');
            list.outparams6 = list.outparams6 === '1' ? this.$t('label.yes') : this.$t('label.no');
            list.outparams10 = list.outparams10 === '1' ? this.$t('label.yes') : this.$t('label.no');
          },
        );
        tHeader = [this.$t('label.ASSETS1001VIEW_FILENAME'),
          this.$t('label.ASSETS1001VIEW_TYPEASSETS'),
          this.$t('label.ASSETS1001VIEW_BARCODE'),
          this.$t('label.user_name'),
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
          this.$t('label.ASSETS1001VIEW_PARAM7'),
          this.$t('label.department'),

        ];
        filterVal = ['filename', 'typeassets', 'barcode', 'principal', 'bartypeName', 'assetstatus', 'stockstatus',
          'pcno', 'model', 'price', 'no', 'purchasetime', 'activitiondate', 'remarks', 'customer', 'controlno', 'machinename',
          'inparams1', 'inparams2',
          'inparams3', 'inparams4', 'inparams5', 'owner',
          'inparams7', 'inparams8', 'outparams1',
          'outparams2', 'outparams3', 'outparams4', 'outparams5', 'outparams6', 'outparams7', 'outparams8', 'outparams9',
          'outparams10', 'outparams11', 'outparams12', 'outparams13', 'outparams14', 'usedepartment'];
      } else {
        Message({
          message: this.$t('label.ASSETS1001VIEW_ERROR'),
          type: 'error',
          duration: 2 * 1000,
        });
      }
      if (tHeader && filterVal) {
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
          this.$message.error({
            message: error,
            type: 'error',
            duration: 5 * 1000,
          });
          this.loading = false;
        });
    },
    assetoperation(val) {
      this.selectedlist = this.$refs.roletable.selectedList;
      if (this.selectedlist.length === 0) {
        Message({
          message: this.$t('normal.info_01'),
          type: 'info',
          duration: 2 * 1000,
        });
      } else {
        let error_BF = 0;
        for (let i = 0; i < this.selectedlist.length; i++) {
          // 资产报废不可以异动操作 ztc fr
          if (this.selectedlist[i].assetstatus === this.$t('label.PFANS1002VIEW_ASSETREBF')) {
            // 资产报废不可以异动操作 ztc to
            error_BF += 1;
          }
        }
        if (val == '0') {
          // 报废
          if (error_BF != 0) {
            Message({
              message: this.$t('normal.error_18'),
              type: 'info',
              duration: 2 * 1000,
            });
          } else {
            this.$store.commit('global/SET_WORKFLOWURL', '/PFANS1007FormView');
            this.$router.push({
              name: 'PFANS1007FormView',
              params: {
                _selectedList: JSON.stringify(this.selectedlist),
                disabled: true,
              },
            });
          }
        } else if (val == '1') {
          // 转移
          this.$store.commit('global/SET_WORKFLOWURL', '/PFANS1008FormView');
          this.$router.push({
            name: 'PFANS1008FormView',
            params: {
              _selectedList: JSON.stringify(this.selectedlist),
              disabled: true,
            },
          });
        } else {
          if (this.selectedlist.length == 1) {
            // 借出/带出
            this.$store.commit('global/SET_WORKFLOWURL', '/PFANS1009FormView');
            this.$router.push({
              name: 'PFANS1009FormView',
              params: {
                _selectedList: JSON.stringify(this.selectedlist),
                disabled: true,
              },
            });
          } else {
            Message({
              message: this.$t('label.ASSETS1001VIEW_SELECTEDONLY'),
              type: 'info',
              duration: 2 * 1000,
            });
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
