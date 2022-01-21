<template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row" :title="title" @reget="getdata"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading" :showSelectBySearch="false">
    <!--  region  add   ml   220112  添加筛选条件   from    -->
    <el-form label-position="top" label-width="8vw" slot="search">
      <el-row>
        <el-col :span="5">
          <el-form-item :label="$t('label.user_name')">
            <el-input style="width: 90%" v-model="form1.expname" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :label="$t('label.PFANS6001VIEW_SUPPLIERNAME')">
            <el-input style="width: 90%" v-model="form1.suppliername" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :label="$t('label.PFANS2003FORMVIEW_INTERVIEWDEP')">
            <org :orglist="form1.interviewdep"
                 orgtype="1"
                 style="width: 80%"
                 @getOrgids="getInterviewDep"
            ></org>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :label="$t('label.PFANS6004FORMVIEW_WHETHERENTRY')">
            <dicselect :code="code"
                       :data="form1.whetherentry"
                       :multiple="multiple"
                       @change="getResult"
                       style="width: 90%"
            >
            </dicselect>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!--  endregion  add   ml   220112  添加筛选条件   to    -->
  </EasyNormalTable>
</template>

<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {Message} from 'element-ui';
  import moment from 'moment';
  import dicselect from '../../../components/dicselect.vue';
  import org from '@/view/components/org';
  import {getUserInfo, getDictionaryInfo, getDepartmentById, getSupplierinfor} from '../../../../utils/customize';

  export default {
    name: 'PFANS6001View',
    components: {
      EasyNormalTable,
      org,
      dicselect,
    },
    data() {
      return {
        loading: false,
        title: 'title.PFANS6001VIEW',
        data: [],
        //region  add  ml  220112   筛选条件   from
        form1 : {
          expname: '',
          suppliername: '',
          interviewdep: '',
          whetherentry: '',
        },
        multiple: false,
        code: 'BP006',
        //endregion  add  ml  220112   筛选条件   to
        columns: [
          {
            //姓名
            code: 'expname',
            label: 'label.user_name',
            width: 120,
            fix: false,
            filter: false,
          },
          {
            code: 'graduateschool',
            label: 'label.PFANS6001VIEW_GRADUATESCHOOL',
            width: 120,
            fix: false,
            filter: false,
          },
          {
            code: 'suppliername',
            label: 'label.PFANS6001VIEW_SUPPLIERNAME',
            width: 140,
            fix: false,
            filter: false,
          },
          {
            code: 'interviewdep',
            label: 'label.PFANS2003FORMVIEW_INTERVIEWDEP',
            width: 120,
            fix: false,
            filter: false,
          },
          {
            //面试结果
            code: 'result',
            label: 'label.PFANS6001VIEW_RESULT',
            width: 120,
            fix: false,
            filter: false,
          },
          {
            //入职与否
            code: 'whetherentry',
            label: 'label.PFANS2003FORMVIEW_WHETHERENTRY',
            width: 120,
            fix: false,
            filter: false,
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
            //面试时间
            code: 'interview_date',
            label: 'label.PFANS2003FORMVIEW_INTERVIEWDATE',
            width: 120,
            fix: false,
            filter: false,
          },
        ],
        buttonList: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
          //region   add    ml   220112   筛选条件   from
          {'key': 'search', 'name': 'button.search', 'disabled': false, icon: 'el-icon-search'},
          //endregion   add    ml   220112   筛选条件   to
        ],
        rowid: '',
        row: 'expatriatesinfor_id',
      };
    },
    mounted() {
      this.getdata()
    },
    methods: {
      getdata(){
        this.loading = true;
        this.$store
          //  region  update  ml  220117   检索   from
          .dispatch('PFANS6004Store/getSearch', this.form1)
          // .dispatch('PFANS6004Store/getexpatriatesinfor')
          //  endregion  update  ml  220117   检索   to
          .then(response => {
            for (let j = 0; j < response.length; j++) {
              if (response[j].graduateschool !== null && response[j].graduateschool !== '') {
                let graduateschool = getUserInfo(response[j].graduateschool);
                if (graduateschool) {
                  response[j].graduateschool = user.userinfo.customername;
                }
              }
              if (response[j].supplierinfor_id !== null && response[j].supplierinfor_id !== '') {
                let supplierInfor = getSupplierinfor(response[j].supplierinfor_id);
                if (supplierInfor) {
                  response[j].suppliername = supplierInfor.supchinese;
                }
              }
              if (response[j].result !== null && response[j].result !== '') {
                let letStage = getDictionaryInfo(response[j].result);
                if (letStage != null) {
                  response[j].result = letStage.value1;
                }
              }
              if (response[j].whetherentry !== null && response[j].whetherentry !== '') {
                let letStage = getDictionaryInfo(response[j].whetherentry);
                if (letStage != null) {
                  response[j].whetherentry = letStage.value1;
                }
              }
              // if (response[j].technology !== null && response[j].technology !== '') {
              //   let letStage = getDictionaryInfo(response[j].technology);
              //   if (letStage != null) {
              //     response[j].technology = letStage.value1;
              //   }
              // }
              if (response[j].interview_date !== null && response[j].interview_date !== '') {
                response[j].interview_date = moment(response[j].interview_date).format('YYYY-MM-DD');
              }
            }
            for (let i = 0; i < response.length; i++) {
              response[i].groupNmae = getUserInfo(response[i].interviewdep);
            }
            for (let i = 0; i < response.length; i++) {
              response[i].interviewdep = getDepartmentById(response[i].interviewdep);
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
      rowClick(row) {
        this.rowid = row.expatriatesinfor_id;
      },
      buttonClick(val) {
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
            name: 'PFANS6001FormView',
            params: {
              _id: this.rowid,
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
            name: 'PFANS6001FormView',
            params: {
              _id: this.rowid,
              disabled: false,
            },
          });
        }
        if (val === 'insert') {
          this.$router.push({
            name: 'PFANS6001FormView',
            params: {
              _id: '',
              disabled: true,
            },
          });
        }
        //  region  update  ml  220117   检索   from
        if (val === 'search') {
          this.getdata();
        }
        //  endregion  update  ml  220117   检索   to
      },
      //  region  update  ml  220117   检索   from
      getInterviewDep(val) {
        this.form1.interviewdep = val;
      },
      getResult(val) {
        this.form1.whetherentry = val;
      },
      //  endregion  update  ml  220117   检索   to
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
