<template>
  <div>
  <EasyNormalTable  @buttonClick="buttonClick" :buttonList="buttonList" :showSelection="showSelection" @rowClick="rowClick" :columns="columns" :data="data" :title="title"  v-loading="loading">
  </EasyNormalTable>
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
            :limit=1
            :on-remove="this.clear"
            multiple
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
            <el-table-column :label="$t('label.PFANS2017VIEW_CUHS')" align="center" width="120%" prop="hang">
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
  import {getToken} from '@/utils/auth'
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {Message} from 'element-ui';
  import {getUserInfo} from '@/utils/customize';

  export default {
    name: 'PFANS2007View',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        listQuery: {
          page: 1,
          limit: 5
        },
        user_id: '',
        loading: false,
        daoru: false,
        title: 'title.PFANS2007VIEW',
        authHeader: {'x-auth-token': getToken()},
        postAction: process.env.BASE_API + '/bonussend/importUser',
        addActionUrl: '',
        resultShow: false,
        Message: false,
        result: false,
        file: null,
        successCount: 0,
        errorCount: 0,
        cuowu: '',
        // selectedlist: [],
        data: [],
        showSelection:true,
        columns: [
          {
            code: 'years',
            label: 'label.PFANS2007VIEW_YEAR',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'jobnumber',
            label: 'label.PFANS2020VIEW_JOBNUMBER',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'totalbonus1',
            label: 'label.PFANS2007VIEW_GOLDLEAF',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'method',
            label: 'label.PFANS2007VIEW_TAXMETHOD',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'taxable',
            label: 'label.PFANS2007VIEW_COMBINEDTAX',
            width: 250,
            fix: false,
            filter: true,
          },
          {
            code: 'amount',
            label: 'label.PFANS2007VIEW_KOZO',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'payable',
            label: 'label.PFANS2007VIEW_TAX',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'income ',
            label: 'label.PFANS2007VIEW_THEFIRST',
            width: 350,
            fix: false,
            filter: true,
          },
          {
            code: 'taxrate',
            label: 'label.PFANS2007VIEW_CASH',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'deductions',
            label: 'label.PFANS2007VIEW_ARITHMETIC',
            width: 260,
            fix: false,
            filter: true,
          },
          {
            code: 'bonustax',
            label: 'label.PFANS2007VIEW_GOLD',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'received',
            label: 'label.PFANS2007VIEW_IEMIKANE',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'remarks',
            label: 'label.remarks',
            width: 200,
            fix: false,
            filter: true,
          },
          {
            code: 'send',
            label: 'label.PFANS2007VIEW_SEND',
            width: 200,
            fix: false,
            filter: true,
          },
        ],
        // form: {
        //   bonussend_id: '',
        //   jobnumber: '',
        //   user_id: '',
        //   username: '',
        //   totalbonus1: '',
        //   method: '',
        //   taxable: '',
        //   amount: '',
        //   payable: '',
        //   income: '',
        //   taxrate: '',
        //   deductions: '',
        //   bonustax: '',
        //   received: '',
        //   remarks: '',
        //   sent: '',
        // },
        buttonList: [
          {'key': 'import', 'name': 'button.import', 'disabled': false, icon: 'el-icon-upload2'},
          {'key': 'deliver', 'name': 'button.deliver', 'disabled': false},
        ],
        rowid: '',
        row : 'bonussend_id'
      };
    },
    mounted() {
      // this.getList();
      this.loading = true;
      this.$store
        .dispatch('PFANS2007Store/get')
        .then(response => {
          this.data = response;
          this.loading = false;
        })
        .catch(error => {
          Message({
            message: error,
            type: 'error',
            duration: 5 * 1000
          });
          this.loading = false
        })
    },
    methods: {
      rowClick(row) {
        this.rowid = row.bonussend_id;
        this.user_id = row.user_id;
      },
      getList() {
        this.loading = true;
        this.$store
          .dispatch('PFANS2007Store/getList', {})
          .then(response => {
            // for (let j = 0; j < response.length; j++) {
            //   let user = getUserInfo(response[j].user_id);
            //   if (user) {
            //     response[j].user_id = user.userinfo.customername;
            //   }
            // }
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
      handleChange(file, fileList) {
        this.clear(true);
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
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
            if (error === this.$t("label.PFANS2005FORMVIEW_SB")) {
              this.errorCount = response.data[c].substring(4)
              this.resultShow = true;
            }
            if (error === this.$t("label.PFANS2005FORMVIEW_CG")) {
              this.successCount = response.data[c].substring(4)
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
            this.message = datalist;
            this.totaldata = this.message;
            if (this.errorCount === "0") {
              this.result = false;
            } else {
              this.result = true;
            }
            this.getList();
            this.getFpans2007List();
          }
        }
      },
      clear(safe) {
        this.file = null;
        this.resultShow = false;
        this.Message = false;
        this.result = false;
        if (!safe) {
          if(this.$refs.uploader != undefined){
            this.$refs.uploader.clearFiles();
          }
        }
      },
      buttonClick(val){
        if (val === 'deliver') {
          // this.selectedlist = this.$refs.roletable.selectedList;
          let toDoNotice = {};
          toDoNotice.type = '2';
          toDoNotice.title =  this.$t('normal.error_bonus');
          toDoNotice.dataid = this.rowid;
          toDoNotice.url = this.$route.path;
          toDoNotice.initiator = this.$store.getters.userinfo.userid;
          toDoNotice.owner = this.user_id;
          this.$store
            .dispatch('PFANS2007Store/getListType', toDoNotice)
            .then(response => {
              this.loading = false;
            })
            .catch(error => {
              Message({
                message: error,
                type: 'error',
                duration: 5 * 1000,
              });
              this.loading = false;
            })
        }
        if (val === 'import') {
          this.daoru = true;
          this.clear(false);
        }
      }
    }
  };
</script>

<style scoped>

</style>
