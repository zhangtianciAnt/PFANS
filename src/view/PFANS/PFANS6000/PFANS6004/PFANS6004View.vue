<template>
  <div>
    <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row" :title="title"
                     ref="roletable" :showSelection="isShow"
                     @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
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
  import {getToken} from '@/utils/auth';
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {Message} from 'element-ui';
  import {
    getUserInfo,
    getOrgInfo,
    getDictionaryInfo,
    getCooperinterviewList,
    getSupplierinfor,
  } from '@/utils/customize';
  import moment from 'moment';

  export default {
    name: 'PFANS6004View',
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
        postAction: process.env.BASE_API + '/expatriatesinfor/expimport',
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
        loading: false,
        title: 'title.PFANS6004VIEW',
        data: [],
        columns: [
          {
            //供应商名称
            code: 'suppliername',
            label: 'label.PFANS6001VIEW_SUPPLIERNAME',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            //姓名
            code: 'expname',
            label: 'label.user_name',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            //所属部门
            code: 'group_id',
            label: 'label.PFANS5001FORMVIEW_DEPARTMENTID',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            //性别
            code: 'sex',
            label: 'label.sex',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            //年龄
            code: 'age',
            label: 'label.PFANSUSERFORMVIEW_AGE',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            //学历
            code: 'education',
            label: 'label.PFANS2026VIEW_EDUCATIONALBACKGROUND',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            //毕业院校
            code: 'graduateschool',
            label: 'label.PFANS6001VIEW_GRADUATESCHOOL',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            //技术分类
            code: 'technology',
            label: 'label.PFANS2003VIEW_TECHNOLOGY',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            //RN
            code: 'rn',
            label: 'label.PFANS2003FORMVIEW_RN',
            width: 80,
            fix: false,
            filter: true,
          },
        ],
        buttonList: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          // {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
          {'key': 'import', 'name': 'button.import', 'disabled': false, icon: 'el-icon-upload2'},
          {'key': 'export', 'name': 'button.export', 'disabled': false, icon: 'el-icon-download'},
          {'key': 'crAccount', 'name': 'button.crAccount', 'disabled': false, icon: 'el-icon-user'},
          {'key': 'crAccount2', 'name': 'button.crAccount2', 'disabled': false, icon: 'el-icon-user'},
          // {'key': 'export2', 'name': 'button.download2', 'disabled': false, icon: 'el-icon-download'},
        ],
        rowid: '',
        row: 'expatriatesinfor_id',
        isShow: true,
        rowname: '',
      };
    },
    mounted() {
      this.getexpatriatesinfor();
    },
    methods: {
      getexpatriatesinfor() {
        this.loading = true;
        this.$store
          .dispatch('PFANS6004Store/getWithoutAuth')
          .then(response => {
            let tabledate = [];
            for (let j = 0; j < response.length; j++) {
              if (response[j].supplierinfor_id !== null && response[j].supplierinfor_id !== '') {
                let supplierInfor = getSupplierinfor(response[j].supplierinfor_id);
                if (supplierInfor) {
                  response[j].suppliername = supplierInfor.supchinese;
                }
              }
              if (response[j].expname !== null && response[j].expname !== '') {
                let expname = getCooperinterviewList(response[j].expname);
                if (expname) {
                  response[j].expname = expname.expname;
                }
              }
              if (response[j].group_id !== null && response[j].group_id !== '') {
                let group = getOrgInfo(response[j].group_id);
                if (group) {
                  response[j].group_id = group.companyname;
                }
              }
              if (response[j].sex !== null && response[j].sex !== '') {
                let sex = getDictionaryInfo(response[j].sex);
                if (sex != null) {
                  response[j].sex = sex.value1;
                }
              }
              if (response[j].age !== null && response[j].age !== '') {
                let age = getUserInfo(response[j].age);
                if (age) {
                  response[j].age = user.userinfo.customername;
                }
              }
              if (response[j].education !== null && response[j].education !== '') {
                let education = getDictionaryInfo(response[j].education);
                if (education != null) {
                  response[j].education = education.value1;
                }
              }
              if (response[j].graduateschool !== null && response[j].graduateschool !== '') {
                let graduateschool = getUserInfo(response[j].graduateschool);
                if (graduateschool) {
                  response[j].graduateschool = user.userinfo.customername;
                }
              }
              if (response[j].technology !== null && response[j].technology !== '') {
                let technology = getDictionaryInfo(response[j].technology);
                if (technology != null) {
                  response[j].technology = technology.value1;
                }
              }
              if (response[j].rn !== null && response[j].rn !== '') {
                let rn = getDictionaryInfo(response[j].rn);
                if (rn != null) {
                  response[j].rn = rn.value1;
                }
              }
              if (response[j].whetherentry == "BP006001") {
                tabledate.push({
                  expatriatesinfor_id: response[j].expatriatesinfor_id,
                  suppliername: response[j].suppliername,
                  expname: response[j].expname,
                  group_id: response[j].group_id,
                  sex: response[j].sex,
                  age: response[j].age,
                  education: response[j].education,
                  graduateschool: response[j].graduateschool,
                  technology: response[j].technology,
                  rn: response[j].rn,
                })
              }
            }
            this.data = tabledate;
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
        this.rowid = row.expatriatesinfor_id;
        this.rowname = row.expname;
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
            this.getexpatriatesinfor();
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
        if (val === 'import') {
          this.daoru = true;
        } else if (val === 'export') {
          if(this.$refs.roletable.selectedList.length === 0){
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000
            });
            return;
          }
          this.selectedlist = this.$refs.roletable.selectedList;
          import('@/vendor/Export2Excel').then(excel => {
            const tHeader = [
              this.$t('label.user_name'),
              this.$t('label.sex'),
              this.$t('label.PFANS6001VIEW_SUPPLIERNAME'),
              this.$t('label.PFANS6001VIEW_GRADUATESCHOOL'),
              this.$t('label.PFANS2026VIEW_EDUCATIONALBACKGROUND'),
              this.$t('label.PFANS2003VIEW_TECHNOLOGY'),
              this.$t('label.PFANS2003FORMVIEW_RN'),
              this.$t('label.PFANS6004FORMVIEW_OPERATIONFORM'),
              this.$t('label.PFANS6004FORMVIEW_JOBCLASSIFICATIONM'),

            ];
            const filterVal = [
              'expname',
              'sex',
              'suppliername',
              'graduateschool',
              'education',
              'technology',
              'rn',
              'operationform',
              'jobclassification',

            ];
            const list = this.selectedlist;
            for (let h = 0; h < list.length; h++) {
              list[h].admissiontime = moment(list[h].admissiontime).format('YYYY-MM-DD');
              let operationform = getDictionaryInfo(list[h].operationform);
              if (operationform) {
                list[h].operationform = operationform.value1;
              }
              let jobclassification = getDictionaryInfo(list[h].jobclassification);
              if (jobclassification) {
                list[h].jobclassification = jobclassification.value1;
              }
            }
            const data = this.formatJson(filterVal, list);
            excel.export_json_to_excel(tHeader, data, this.$t('menu.PFANS6004'));
          });
        } else if (val === 'export2') {
          this.loading = true;
          this.$store
            .dispatch('PFANS6004Store/download', {})
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
            });
        }
        this.$store.commit('global/SET_HISTORYURL', this.$route.path);
        if (val === 'update') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.$router.push({
            name: 'PFANS6004FormView',
            params: {
              _id: this.rowid,
              _name: this.rowname,
              disabled: true,
            },
          });
        }
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
            name: 'PFANS6004FormView',
            params: {
              _id: this.rowid,
              _name: this.rowname,
              disabled: false,
            },
          });
        }
        if (val === 'insert') {
          this.$router.push({
            name: 'PFANS6004FormView',
            params: {
              _id: '',
              disabled: true,
            },
          });
        }
        if(val === 'crAccount'){
          this.loading = true;
          this.$store
            .dispatch('PFANS6004Store/crAccount', this.$refs.roletable.selectedList)
            .then(response => {

              this.$refs.roletable.$refs.eltable.clearSelection();
              Message({
                message: this.$t('normal.success_02'),
                type: 'success',
                duration: 5 * 1000,
              });

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
        if(val === 'crAccount2'){
          this.loading = true;
          this.$store
            .dispatch('PFANS6004Store/crAccount2', this.$refs.roletable.selectedList)
            .then(response => {

              this.$refs.roletable.$refs.eltable.clearSelection();
              Message({
                message: this.$t('normal.success_02'),
                type: 'success',
                duration: 5 * 1000,
              });

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
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .el-icon-upload {
    font-size: 6rem;
    color: #ffffff;
    text-align: center;
  }
</style>
