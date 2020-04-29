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
  import {getDepartmentById} from '../../../../utils/customize';

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
        age:'',
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
            //卡号
            code: 'number',
            label: 'label.PFANSUSERFORMVIEW_JOBNUMBER',
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
            //登录账号
            code: 'accountname',
            label: 'label.PFANS6004FORMVIEW_ACCOUNT',
            width: 120,
            fix: false,
            filter: true,
          },
          // {
          //   //技术分类
          //   code: 'technology',
          //   label: 'label.PFANS2003VIEW_TECHNOLOGY',
          //   width: 120,
          //   fix: false,
          //   filter: true,
          // },
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
          // {'key': 'crAccount', 'name': 'button.crAccount', 'disabled': false, icon: 'el-icon-user'},
          {'key': 'crAccount2', 'name': 'button.crAccount2', 'disabled': false, icon: 'el-icon-user'},
          // {'key': 'export2', 'name': 'button.download2', 'disabled': false, icon: 'el-icon-download'},
        ],
        rowid: '',
        row: 'expatriatesinfor_id',
        account: '',
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
          .dispatch('PFANS6004Store/getexpatriatesinfor')
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
              //add-ws-年龄计算添加
              if(response[j].birth!='') {
                let birthdays = new Date(response[j].birth);
                let d = new Date();
                let age = 0;
                let agenew = 0;
                age = d.getFullYear() - birthdays.getFullYear();
                agenew = d.getFullYear() - birthdays.getFullYear();
                if (d.getMonth() > birthdays.getMonth() || (d.getMonth() == birthdays.getMonth() && d.getDate() > birthdays.getDate())) {
                  agenew = age;
                } else {
                  agenew = age - 1;
                }
                this.age = agenew;
              }else{
                this.age = 0;
              }
              //add-ws-年龄计算添加
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
              // if (response[j].technology !== null && response[j].technology !== '') {
              //   let technology = getDictionaryInfo(response[j].technology);
              //   if (technology != null) {
              //     response[j].technology = technology.value1;
              //   }
              // }
              if (response[j].rn !== null && response[j].rn !== '') {
                let rn = getDictionaryInfo(response[j].rn);
                if (rn != null) {
                  response[j].rn = rn.value1;
                }
              }

              if (response[j].graduation_year !== null && response[j].graduation_year !== '') {
                  response[j].graduation_year = moment(response[j].graduation_year).format('YYYY');
              }
              if (response[j].operationform !== null && response[j].operationform !== '') {
                let operationform = getDictionaryInfo(response[j].operationform);
                if (operationform != null) {
                  response[j].operationform = operationform.value1;
                }
              }
              if (response[j].jobclassification !== null && response[j].jobclassification !== '') {
                let jobclassification = getDictionaryInfo(response[j].jobclassification);
                if (jobclassification != null) {
                  response[j].jobclassification = jobclassification.value1;
                }
              }
              if (response[j].admissiontime !== null && response[j].admissiontime !== '') {
                response[j].admissiontime = moment(response[j].admissiontime).format('YYYY-MM-DD');
              }
              else
              {
                response[j].admissiontime = moment(new Date()).format('YYYY-MM-DD');
              }
              if (response[j].birth !== null && response[j].birth !== '') {
                response[j].birth = moment(response[j].birth).format('YYYY-MM-DD');
              }
              if (response[j].interviewdep !== null && response[j].interviewdep !== '') {
                let interviewdep = getDepartmentById(response[j].interviewdep);
                if (interviewdep) {
                  response[j].interviewdep = getDepartmentById(response[j].interviewdep);
                }
              }
              if (response[j].interview_date !== null && response[j].interview_date !== '') {
                response[j].interview_date = moment(response[j].interview_date).format('YYYY-MM-DD');
              }
              if (response[j].result !== null && response[j].result !== '') {
                let result = getDictionaryInfo(response[j].result);
                if (result != null) {
                  response[j].result = result.value1;
                }
              }

              if (response[j].exits !== null && response[j].exits !== '') {
                if (response[j].exits =='0')
                {
                  response[j].exits ='是';
                  if (response[j].exitime !== null && response[j].exitime !== '') {
                    response[j].exitime = moment(response[j].exitime).format('YYYY-MM-DD');
                  }
                  if (response[j].exitreason !== null && response[j].exitreason !== '') {
                    let exitreason = getDictionaryInfo(response[j].exitreason);
                    if (exitreason != null) {
                      response[j].exitreason = exitreason.value1;
                    }
                  }
                  //所有技术
                  // if (response[j].alltechnology !== null && response[j].alltechnology !== '') {
                  //   let alltechnology = getDictionaryInfo(response[j].alltechnology);
                  //   if (alltechnology != null) {
                  //     response[j].alltechnology = alltechnology.value1;
                  //   }
                  // }
                  if (response[j].sitevaluation !== null && response[j].sitevaluation !== '') {
                    let sitevaluation = getDictionaryInfo(response[j].sitevaluation);
                    if (sitevaluation != null) {
                      response[j].sitevaluation = sitevaluation.value1;
                    }
                  }
                  if (response[j].businessimpact !== null && response[j].businessimpact !== '') {
                    let businessimpact = getDictionaryInfo(response[j].businessimpact);
                    if (businessimpact != null) {
                      response[j].businessimpact = businessimpact.value1;
                    }
                  }
                  //对策
                  // if (response[j].countermeasure !== null && response[j].countermeasure !== '') {
                  //   let countermeasure = getDictionaryInfo(response[j].countermeasure);
                  //   if (countermeasure != null) {
                  //     response[j].countermeasure = countermeasure.value1;
                  //   }
                  // }
                }
                else
                {
                  response[j].exits ='否';
                  response[j].exitime ='';
                  response[j].exitreason ='';
                  response[j].alltechnology='';
                  response[j].sitevaluation ='';
                  response[j].businessimpact ='';
                  response[j].countermeasure ='';
                }
              }


              if (response[j].whetherentry == "BP006001") {
                if (response[j].whetherentry !== null && response[j].whetherentry !== '') {
                  let whetherentry = getDictionaryInfo(response[j].whetherentry);
                  if (whetherentry != null) {
                    response[j].whetherentry = whetherentry.value1;
                  }
                }
                tabledate.push({
                  expatriatesinfor_id: response[j].expatriatesinfor_id,
                  suppliername: response[j].suppliername,
                  expname: response[j].expname,
                  group_id: response[j].group_id,
                  sex: response[j].sex,
                  birth:response[j].birth,
                  contactinformation:response[j].contactinformation,
                  interviewdep:response[j].interviewdep,
                  interview_date:response[j].interview_date,
                  result:response[j].result,
                  whetherentry:response[j].whetherentry,
                  age: this.age,
                  education: response[j].education,
                  graduateschool: response[j].graduateschool,
                  // technology: response[j].technology,
                  rn: response[j].rn,
                  account: response[j].account,
                  remarks:response[j].remarks,
                  graduation_year:response[j].graduation_year,
                  email:response[j].email,
                  operationform:response[j].operationform,
                  number:response[j].number,
                  jobclassification:response[j].jobclassification,
                  admissiontime:response[j].admissiontime,
                  speciality:response[j].speciality,
                  exits:response[j].exits,
                  exitime:response[j].exitime,
                  exitreason:response[j].exitreason,
                  alltechnology:response[j].alltechnology,
                  sitevaluation:response[j].sitevaluation,
                  businessimpact:response[j].businessimpact,
                  countermeasure:response[j].countermeasure,
                  accountname:response[j].accountname,
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
      //getBpAc
      rowClick(row) {
        //add-ws-根据外协account匹配数据
        this.account = row.account;
        //add-ws-根据外协account匹配数据
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
          this.clear(false);
        }
        else if (val === 'export') {
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

              this.$t('label.PFANS6001VIEW_BIRTH'),
              this.$t('label.PFANS6001VIEW_GRADUATESCHOOL'),
              this.$t('label.PFANS2026VIEW_EDUCATIONALBACKGROUND'),
              this.$t('label.PFANS6001VIEW_CONTACTINFORMATION'),
              this.$t('label.PFANS2024VIEW_GRADUATIONYEAR'),
              this.$t('label.PFANS6001VIEW_SUPPLIERNAME'),
              this.$t('label.PFANS2003FORMVIEW_RN'),
              this.$t('label.PFANSUSERFORMVIEW_EMAILADDRESS'),
              this.$t('label.group'),
              this.$t('label.PFANS6004FORMVIEW_OPERATIONFORM'),
              this.$t('label.PFANSUSERFORMVIEW_JOBNUMBER'),
              this.$t('label.PFANS6004FORMVIEW_JOBCLASSIFICATIONM'),
              this.$t('label.PFANS2003FORMVIEW_SPECIALITY'),
              this.$t('label.PFANS2003FORMVIEW_INTERVIEWDEP'),
              this.$t('label.PFANS2003FORMVIEW_INTERVIEWDATE'),
              this.$t('label.PFANS6001VIEW_RESULT'),
              this.$t('label.PFANS6004FORMVIEW_WHETHERENTRY'),
              this.$t('label.PFANS6004FORMVIEW_ADMISSIONTIME'),

              this.$t('label.PFANS6004FORMVIEW_EXITS'),
              this.$t('label.PFANS6004FORMVIEW_EXITIME'),
              this.$t('label.PFANS6004FORMVIEW_EXITREASON'),
              this.$t('label.PFANS6004FORMVIEW_ALLTECHNOLOGY'),
              this.$t('label.PFANS6004FORMVIEW_SITEVALUATION'),
              this.$t('label.PFANS6004FORMVIEW_BUSINESSIMPACT'),
              this.$t('label.PFANS6004FORMVIEW_COUNTERMEASURE'),
              this.$t('label.remarks'),
            ];
            const filterVal = [
              'expname',
              'sex',
              'birth',
              'graduateschool',
              'education',
              'contactinformation',
              'graduation_year',
              'suppliername',
              'rn',
              'email',
              'group_id',
              'operationform',
              'number',
              'jobclassification',
              'speciality',
              'interviewdep',
              'interview_date',
              'result',
              'whetherentry',
              'admissiontime',
              'exits',
              'exitime',
              'exitreason',
              'alltechnology',
              'sitevaluation',
              'businessimpact',
              'countermeasure',
              'remarks',
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
        }
        else if (val === 'export2') {
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
              //add-ws-根据外协account匹配数据
              _account: this.account,
              //add-ws-根据外协account匹配数据
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
              //add-ws-根据外协account匹配数据
              _account: this.account,
              //add-ws-根据外协account匹配数据
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
              this.getexpatriatesinfor();
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
