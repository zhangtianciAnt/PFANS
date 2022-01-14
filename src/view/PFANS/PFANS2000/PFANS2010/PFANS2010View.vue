<template>
  <div>
    <EasyNormalTable
      :buttonList="buttonList"
      :columns="columns"
      :data="data"
      :title="title"
      :rowid="row_id"
      @rowClick="rowClick" @reget="getlist"
      @buttonClick="buttonClick"
      v-loading="loading">
      <el-date-picker
        v-model="montvalue"
        type="month"
        @change="changed"
        slot="customize"
        placeholder="选择月">
      </el-date-picker>
    </EasyNormalTable>
<!--      region  add  ml  220105  考勤导出   from-->
    <el-dialog width="50%"
               :visible.sync="daochu">
      <div>
        <div>
          <el-form>
            <el-row>
              <el-col :span="14">
                <el-form-item :label="$t('label.PFANS1006FORMVIEW_DISTINGUISH')">
                  <el-radio style="margin-left: 50px" v-model="radio" label="1">{{ $t('label.PFANS2010VIEW_work') }}
                  </el-radio>
                  <el-radio v-model="radio" label="2">{{ $t('label.PFANS2010VIEW_resign') }}</el-radio>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-button @click="checkliste" type="primary">
                  {{ $t('button.confirm') }}
                </el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </el-dialog>
<!--      endregion  add  ml  220105  考勤导出   to-->
  </div>
</template>

<script>
import EasyNormalTable from '@/components/EasyNormalTable';
import {Message} from 'element-ui'
import {getCurrentRole16, getCurrentRoleNew, getStatus, getUserInfo} from "@/utils/customize";
import moment from "moment";

export default {
  name: 'PFANS2010View',
  components: {
    EasyNormalTable,
  },
  data() {
    return {
      roles: '',
      workflow: [],
      //  region  add  ml  220105  考勤导出   from
      radio: '1',
      //  endregion  add  ml  220105  考勤导出   to
      montvalue: moment(new Date()).format("YYYY-MM"),
      region: '1',
      loading: false,
      title: 'title.PFANS2010VIEW',
      data: [],
      user_id: '',
      years: '',
      months: '',
      daochu: false,
      buttonList: [
        {
          key: 'view',
          name: 'button.view',
          disabled: false,
          icon: 'el-icon-view'
        },
        //考勤导出 1125 ztc fr
        {
          key: 'export',
          name: 'button.export',
          disabled: true,
          icon: 'el-icon-download'
        },
        //考勤导出 1125 ztc to
      ],
      columns: [
        {
          code: 'user_name',
          label: 'label.user_name',
          width: 100,
          fix: false,
          filter: true
        },
        {
          code: 'center_id',
          label: 'label.center',
          width: 120,
          fix: false,
          filter: true
        },
        {
          code: 'group_id',
          label: 'label.group',
          width: 120,
          fix: false,
          filter: true
        },
        {
          code: 'team_id',
          label: 'label.team',
          width: 100,
          fix: false,
          filter: true
        },
        {
          code: 'years',
          label: 'label.year',
          width: 70,
          fix: false,
          filter: true
        },
        {
          code: 'months',
          label: 'label.month',
          width: 70,
          fix: false,
          filter: true
        },
        {
          code: 'recognitionstate',
          label: 'label.PFANS2010VIEW_RECOGNITION',
          width: 120,
          fix: false,
          filter: true
        },

        {
          code: 'workflowstates',
          label: 'label.approval_status',
          width: 120,
          fix: false,
          filter: true
        },
      ],
      row_id: 'rowid',
    };
  },
  mounted() {
    this.roles = getCurrentRoleNew();
    this.roleBility = getCurrentRole16();
    if (this.roleBility === '0') {
      this.buttonList[1].disabled = false;
    }
    this.getWorkflow();
    //await this.getlist();
  },
  methods: {
    // async init(){
    //   await this.getlist();
    // },
    getWorkflow() {
      this.loading = true;
      this.$store
        .dispatch('workflowStore/allWorkFlowIns', {menuUrl: '/PFANS2010View'})
        .then(response => {
          this.workflow = response;
          this.getlist();
          this.loading = false;
        })
        .catch(error => {
          this.$message.error({
            message: error,
            type: 'error',
            duration: 5 * 1000
          });
          this.loading = false;
        })
    },
    getlist() {
      this.loading = true;
      var parameter = {};
      var varmontvalue = this.montvalue.split("-");
      if (varmontvalue.length > 0) {
        parameter = {
          years: varmontvalue[0],
          months: varmontvalue[1],
        }
      }
      this.$store
        .dispatch('PFANS2010Store/getlist', parameter)
        .then(response => {
          for (let j = 0; j < response.length; j++) {

            let user = getUserInfo(response[j].user_id);
            if (user) {
              response[j].user_name = getUserInfo(response[j].user_id).userinfo.customername;
            }
            if (response[j].recognitionstate === "0") {
              if (this.$i18n) {
                response[j].recognitionstate = this.$t('label.PFANS2010VIEW_RECOGNITION0');
              }
            } else {
              if (this.$i18n) {
                response[j].recognitionstate = this.$t('label.PFANS2010VIEW_RECOGNITION1');
              }
            }

            response[j].owner = response[j].user_id;
            response[j].rowid = response[j].user_id + "," + response[j].years + "," + response[j].months;

            let jh = this.workflow.filter(item => item.dataid === response[j].rowid);
            if (jh.length > 0) {
              response[j].workflowstates = jh[0].status;
            } else {
              response[j].workflowstates = getStatus('0');
            }
            // //总经理承认不需要审批
            // if (response[j].recognitionstate === this.$t('label.PFANS2010VIEW_RECOGNITION0'))
            // {
            //   if (response[j].user_id==='5e78fefff1560b363cdd6db7')//失效
            //    if(this.roles === '1')//变更
            //   {
            //     response[j].workflowstates = '进行中';
            //   }
            // }
            // else
            // {
            //   if (response[j].user_id==='5e78fefff1560b363cdd6db7')//失效
            //    if(this.roles  === '1')//变更
            //   {
            //     response[j].workflowstates = '通过';
            //   }
            // }
          }
          this.data = response;
          this.loading = false;
        })
        .catch(error => {
          this.$message.error({
            message: error,
            type: 'error',
            duration: 5 * 1000
          });
          this.loading = false;
        })
    },
    rowClick(row) {
      this.user_id = row.rowid;
    },
    download(data, filename) {
      if ('msSaveOrOpenBlob' in navigator) {
        window.navigator.msSaveOrOpenBlob(
          new Blob([data], {type: 'application/vnd.ms-excel;charset=utf-8'}),
          decodeURI(filename) + '.xlsx',
        );
      } else {
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
    buttonClick(val) {
      this.$store.commit('global/SET_HISTORYURL', this.$route.path);
      if (val === 'view') {
        if (this.user_id === '') {
          Message({
            message: this.$t('normal.info_01'),
            type: 'info',
            duration: 2 * 1000
          });
          return;
        }
        this.$router.push({
          name: 'PFANS2010FormView',
          params: {
            _id: this.user_id,
            // userid: this.user_id,
            // years: this.years,
            // months: this.months,
            disabled: false
          }
        })
      }
      //考勤导出 1125 ztc fr
      else if (val === 'export') {
        //  region  update  ml  220105  考勤导出   from
        this.radio = '1';
        this.daochu = true;
        // let params = {
        //   year: this.montvalue.substring(0, 4),
        //   month: this.montvalue.substring(5, 7)
        // }
        // this.$store
        //   .dispatch('PFANS2010Store/exportReported', params)
        //   .then(response => {
        //     this.download(response, '考勤管理');
        //   }).catch(error => {
        //   this.$message.error({
        //     message: error,
        //     type: 'error',
        //     duration: 5 * 1000,
        //   });
        //   this.loading = false;
        // });
        //  endregion  update  ml  220105  考勤导出   to
      }
      //考勤导出 1125 ztc to
    },
    //  region  add  ml  220105  考勤导出   from
    checkliste() {
      this.daochu = false;
      this.loading = true;
      let params = {
        status: this.radio,
        year: this.montvalue.substring(0, 4),
        month: this.montvalue.substring(5, 7)
      }
      this.$store
        .dispatch('PFANS2010Store/exportReported', params)
        .then(response => {
          //  region   update   ml  220114  考勤导出文件名修改   from
          let title = '';
          if (this.radio === '1') {
             title = this.montvalue.substring(0, 4) + "年" + this.montvalue.substring(5, 7) + "月考勤—在职";
          } else if (this.radio === '2') {
             title = this.montvalue.substring(0, 4) + "年" + this.montvalue.substring(5, 7) + "月考勤—离职";
          }
          this.download(response, title);
          this.loading = false;
          // this.download(response, '考勤管理');
          //  endregion   update   ml  220114  考勤导出文件名修改   to
        }).catch(error => {
        this.$message.error({
          message: error,
          type: 'error',
          duration: 5 * 1000,
        });
        this.loading = false;
      });
    },
    //  endregion  add  ml  220105  考勤导出   to
    changed(val) {
      this.montvalue = moment(val).format("YYYY-MM");
      this.getlist();
    },
  },
};
</script>

<style scoped>

</style>
