<template>
  <div>
    <EasyNormalTable :title="title" :columns="columns" :data="data" :rowid="row_id" :buttonList="buttonList" @reget="getdata"
                     @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading" >
    </EasyNormalTable>
    <el-dialog width="40%"
               :visible.sync="daoru">
      <div>
        <div>
          <el-form>
            <el-row>
              <el-col :span="16">
              <el-form-item :label="$t('label.PFANS2009VIEW_JUNE')">
                <el-date-picker
                  type="month"
                  :disabled="false"
                  @change="monthChange"
                  style="width: 15vw"
                  v-model="yearmonth">
                </el-date-picker>
              </el-form-item>
              </el-col>
              <el-col :span="4">
              <el-form-item>
                <el-button @click="checkliste" type="primary">
                  {{$t('button.confirm')}}
                </el-button>
              </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="show" width="50%">
      <div>
        <div style="margin-top: 1rem;margin-left: 28%">
          <el-upload
            drag
            ref="uploader"
            :action="UploadUrl()"
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
        <span v-if="this.Message1">{{this.cuowu}}</span>
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
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {Message} from 'element-ui';
  import {Decrypt} from '@/utils/customize';
  import {getToken} from '@/utils/auth';
  import moment from "moment";
  import {getCurrentRole3, getOrgInfo} from "../../../../utils/customize";

  export default {
    name: 'PFANS1048View',
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
        Message1: true,
        result: false,
        cuowu: '',
        createy: '',
        daoru: false,
        show:false,
        yearmonth:moment(new Date().setMonth(new Date().getMonth() - 1)).format('YYYY-MM'),
        checkTableData: [],
        authHeader: {'x-auth-token': getToken()},
        postAction: process.env.BASE_API + '/projectincome/importUser',
        resultShow: false,
        file: null,
        loading: false,
        title: 'title.PFANS1048VIEW',
        projectincomeid: '',
        data: [],
        columns: [
          {
            code: 'year',
            label: 'label.PFANS1036FORMVIEW_BUSINESSYEAR',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'month',
            label: 'label.PFANS2009VIEW_JUNE',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'groupid',
            label: 'label.department',
            width: 120,
            fix: false,
            filter: true,
          },
        ],
        buttonList: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
          {'key': 'import', 'name': 'button.import', 'disabled': false, icon: 'el-icon-download'},
          {'key': 'export', 'name': 'button.export', 'disabled': false, 'icon': 'el-icon-download'},
        ],
        state: '',
        row_info: [],
        row_id: 'projectincomeid',
      };
    },
    mounted() {
     this.getdata();
    },
    methods: {
      getdata(){
        this.loading = true;
        this.$store
          .dispatch('PFANS1048Store/get')
          .then(response => {
            for (let j = 0; j < response.length; j++)
            {
              if (response[j].group_id)
              {
                let orgInfo_cnt = getOrgInfo(response[j].group_id);
                if (orgInfo_cnt) {
                  response[j].groupid = orgInfo_cnt.companyname;
                }
              }
            }
            let role3 = getCurrentRole3();
            if (role3 === '0') //财务部长
            {
              this.buttonList[3].disabled = false;
              this.buttonList[4].disabled = false;
            }
            else
            {
              this.buttonList[3].disabled = true;
              this.buttonList[4].disabled = true;
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
      UploadUrl: function() {
        return process.env.BASE_API + '/projectincome/importUser?yearmonth=' + this.yearmonth;
      },
      checkliste() {
        this.daoru = false;
        this.show = true;
        this.clear(false);
      },
      monthChange(value) {
        let val = value;
        if (value) {
          val = moment(value).format('YYYY-MM');
        }
        this.yearmonth = val;
      },
      handleSizeChange(val) {
        this.listQuery.limit = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList();
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
          this.Message1 = true;
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
        this.Message1 = false;
        this.result = false;
        if (!safe) {
          this.$refs.uploader.clearFiles();
        }
      },
      rowClick(row) {
        this.projectincomeid = row.projectincomeid;
      },
      download(data, filename) {
        if("msSaveOrOpenBlob" in navigator){
          window.navigator.msSaveOrOpenBlob(
            new Blob([data],{type: 'application/vnd.ms-excel;charset=utf-8'}),
            decodeURI(filename) + ".xlsx"
          );
        }else {
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
      export(selectedList) {
        this.$store
          .dispatch('PFANS1048Store/downloadExcel', {'projectincomeid': selectedList})
          .then(response => {
            this.download(response, '项目结转表一览');
          })
          .catch(() => {
            console.log('no');
          });
      },
      buttonClick(val) {
        this.$store.commit('global/SET_HISTORYURL', this.$route.path);
        if (val === 'update') {
          if (this.projectincomeid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.$router.push({
            name: 'PFANS1048FormView',
            params: {
              _id: this.projectincomeid,
              disabled: true,
            },
          });
        } else if (val === 'view') {
          if (this.projectincomeid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.$router.push({
            name: 'PFANS1048FormView',
            params: {
              _id: this.projectincomeid,
              disabled: false,
            },
          });
        } else if (val === 'insert') {
          this.$router.push({
            name: 'PFANS1048FormView',
            params: {
              _id: '',
              disabled: true,
            },
          });
        } else if (val === 'import') {
          this.daoru = true;
        } else if (val === 'export') {
          if (this.projectincomeid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
          } else {
            this.export(this.projectincomeid);
          }
        }
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
