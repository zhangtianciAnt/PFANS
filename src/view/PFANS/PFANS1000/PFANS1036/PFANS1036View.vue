<template>
  <div>
    <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row_id" :title="title"
                     @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
    </EasyNormalTable>
    <el-dialog width="50%"
               :visible.sync="daoru">
      <div>
        <div>
          <el-row>
            <el-radio v-model="radio" label="1">{{$t('label.PFANS1036FORMVIEW_EQUIPMENTINVESTMENT')}}</el-radio>
            <el-radio v-model="radio" label="2">{{$t('label.PFANS1036FORMVIEW_SOFTWAREINVESTMENT')}}</el-radio>
          </el-row>
        </div>
        <div style="margin-top: 1rem;margin-left: 14.5rem">
          <el-button @click="checkliste" type="primary">
            {{$t('button.confirm')}}
          </el-button>
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
  import {getDictionaryInfo, getStatus, getUserInfo, getCurrentRole3} from '@/utils/customize';
  import {getOrgInfo} from '../../../../utils/customize';
  import {getToken} from '@/utils/auth';
  import {Decrypt} from '@/utils/customize';

  export default {
    name: 'PFANS1036View',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        show: false,
        radio: '1',
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
        checkTableData: [],
        authHeader: {'x-auth-token': getToken()},
        resultShow: false,
        file: null,
        loading: false,
        title: 'title.PFANS1036VIEW',
        // 表格数据源
        data: [],
        // 列属性
        columns: [
          {
            code: 'year',
            label: 'label.PFANS1036FORMVIEW_BUSINESSYEAR',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'user_id',
            label: 'label.applicant',
            width: 100,
            fix: false,
            filter: true,
          },
          // {
          //   code: 'center',
          //   label: 'label.center',
          //   width: 150,
          //   fix: false,
          //   filter: true,
          // },
          // {
          //   code: 'group',
          //   label: 'label.group',
          //   width: 150,
          //   fix: false,
          //   filter: true,
          // },
          {
            code: "department",
            label: "label.ASSETS1001VIEW_USEDEPARTMENT",
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
          {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
          {'key': 'import', 'name': 'button.import', 'disabled': true, icon: 'el-icon-download'},
        ],
        rowid: '',
        row_id: 'businessplanid',
      };
    },
    mounted() {
      let role3 = getCurrentRole3();
      if (role3 === '0') {
        this.buttonList[3].disabled = false;
        // this.buttonList[1].disabled = true;
      }
      // if (this.$store.getters.userinfo.userid) {
      //   let group = getUserInfo(this.$store.getters.userinfo.userid);
      //   if (group.userinfo.groupid === '' || group.userinfo.groupid === null) {
      //     this.buttonList[1].disabled = true;
      //     this.buttonList[2].disabled = true;
      //   } else {
      //     this.buttonList[1].disabled = false;
      //     this.buttonList[2].disabled = false;
      //   }
      // }
      this.loading = true;
      this.$store
        .dispatch('PFANS1036Store/get')
        .then(response => {
          for (let j = 0; j < response.length; j++) {
            if (response[j].user_id !== null && response[j].user_id !== '') {
              let rst = getUserInfo(response[j].user_id);
              if (rst) {
                response[j].user_id = rst.userinfo.customername;
                // response[j].center = rst.userinfo.centername;
                // response[j].group = rst.userinfo.groupname;
              }
              if (response[j].center)
              {
                let orgInfo_cnt = getOrgInfo(response[j].center_id);
                if (orgInfo_cnt) {
                  response[j].department = orgInfo_cnt.companyname;
                }
              }
              if (response[j].status !== null && response[j].status !== '') {
                response[j].status = getStatus(response[j].status);
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
    methods: {
      UploadUrl: function() {
        return process.env.BASE_API + '/businessplan/importUser?radio=' + this.radio;
      },
      checkliste() {
        this.daoru = false;
        this.show = true;
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
        this.rowid = row.businessplanid;
        this.year = row.year;
        this.groupid = row.group_id;
        this.centerid = row.center_id;
      },
      buttonClick(val) {
        [];
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
            name: 'PFANS1036FormView',
            params: {
              _id: this.rowid,
              year: this.year,
              groupid: this.groupid,
              disabled: false,
            },
          });
        } else if (val === 'insert') {
          this.loading = true;
          this.$router.push({
            name: 'PFANS1036FormView',
            params: {
              _id: '',
              disabled: true,
            },
          });
        } else if (val === 'update') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.$router.push({
            name: 'PFANS1036FormView',
            params: {
              _id: this.rowid,
              year: this.year,
              centerid: this.centerid,
              disabled: true,
            },
          });
        } else if (val === 'import') {
          this.daoru = true;
        }
      },
    },
  };
</script>

<style scoped>

</style>


