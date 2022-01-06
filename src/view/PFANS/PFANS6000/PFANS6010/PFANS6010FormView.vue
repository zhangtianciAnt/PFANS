<template>
  <div style="min-height: 100%">
    <EasyNormalContainer ref="container" v-loading="loading" :buttonList="buttonList" :defaultStart="defaultStart"
                         :title="title" :workflowCode="workflowCode"
                         @StartWorkflow="checkWorkFlow" @buttonClick="buttonClick" @workflowState="workflowState">
      <div slot="customize">
        <el-row>
          <el-col :span="24">
            <el-table
              :data="tableData" :height="letheight" :style="{width: '85vw'}" :summary-method="getSummaries"
              border header-cell-class-name="sub_bg_color_blue"
              show-summary stripe>
              <el-table-column :label="$t('NO')"
                               fixed="left"
                               type="index" width="50"></el-table-column>
              <el-table-column :label="$t('label.PFANS6007VIEW_BPCLUBNAME')" fixed="left"
                               property="suppliername" width="250"></el-table-column>

              <el-table-column v-for="(item, index) in this.groupnamelist"
                               :key="index" :label="$t(item)">
                <el-table-column :label="$t('label.PFANS1027FORMVIEW_APPOINT')"
                                 width="150">
                  <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')"
                                   :property="`ex1manhour${index}`"
                                   width="120"></el-table-column>
                  <el-table-column :label="$t('label.PFANS6008VIEW_COST')"
                                   :property="`ex1cost${index}`"
                                   width="120"></el-table-column>
                  <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')"
                                   :property="`ex1usercount${index}`"
                                   width="100"></el-table-column>
                  <el-table-column v-if="false" :property="`costcount${index}`"></el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1027FORMVIEW_CONTRACT')"
                                 width="150">
                  <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')"
                                   :property="`ex2manhour${index}`"
                                   width="120"></el-table-column>
                  <el-table-column :label="$t('label.PFANS6008VIEW_COST')"
                                   :property="`ex2cost${index}`"
                                   width="120"></el-table-column>
                  <el-table-column :label="$t('label.PFANS6010VIEW_PERNUMBER')"
                                   :property="`ex2usercount${index}`"
                                   width="100"></el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_PROSPECTS')"
                                 width="150">
                  <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')"
                                   :property="`ex3manhour${index}`"
                                   width="100"></el-table-column>
                  <el-table-column :label="$t('label.PFANS6008VIEW_COST')"
                                   :property="`ex3cost${index}`"
                                   width="100"></el-table-column>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS6010VIEW_FREESUM')"
                               width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_PROSPECTS')"
                                 property="ex3costcount"
                                 width="150"></el-table-column>
                <el-table-column :label="$t('label.PFANS2006VIEW_ACTUAL')"
                                 property="bpcostcount"
                                 width="150"></el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.operation')" align="center" width="200">
                <template slot-scope="scope">
                  <el-button
                    :disabled="disable"
                    plain
                    size="small"
                    type="primary"
                    @click="createprobook(scope.row)"
                  >{{ $t('label.PFANS6010VIEW_CREAPROBOOK') }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
import EasyNormalContainer from '@/components/EasyNormalContainer';
import {Message} from 'element-ui';
import {getOrgInfo, getOrgInformation, getSupplierinfor} from '@/utils/customize';
import moment from 'moment';

export default {
  name: 'PFANS6010FormView',
  components: {
    EasyNormalContainer,
  },
  data() {
    return {
      title: 'title.PFANS6010FORMVIEW',
      defaultStart: false,
      loading: false,
      disable: true,
      buttonList: [
        //{'key': 'save', 'name': 'button.save', 'disabled': false, 'icon': 'el-icon-view'},
      ],
      tableData: [],
      letparams: {},
      groupnamelist: [],
      coststatistics: [],
      canStart: false,
      workflowCode: 'W0094',
      letstatus: '',
      letheight: 'calc(100vh - 60px -  10rem)',
    };
  },
  mounted() {
    this.loading = true;
    this.$store
      .dispatch('PFANS6008Store/getcostMonth', this.letparams)
      .then(response => {
        if (response.length > 0) {
          this.coststatistics = response;
          for (let i = 0; i < response.length; i++) {
            let supplierInfor = getSupplierinfor(response[i].bpcompany);
            if (supplierInfor) {
              response[i].suppliername = supplierInfor.supchinese;
            }
          }
          let groupidlist = response[0].strgroupid.substring(0, response[0].strgroupid.length - 1);
          let groupnamelist = [];
          groupnamelist = groupidlist.split(',');
          for (let j = 0; j < groupnamelist.length; j++) {
            let group = getOrgInformation(groupnamelist[j]);
            if (group) {
              this.groupnamelist.push(group.data.companyen);
            }
          }
          this.tableData = response;
        }
        this.loading = false;
        this.letheight = 'calc(100vh - 230px - 2rem)';
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
  created() {
    if (this.$route.params.letparams != undefined) {
      this.letparams = this.$route.params.letparams;
      if (this.$route.params.letparams != undefined) {
        this.letstatus = this.$route.params.letstatus;
      }
      //外驻管理担当
      if (this.letparams.role === '4' && this.$route.params._contr === '0' && this.letstatus === '0') {
        this.disable = false;
      }
    } else {
      var tempDate = new Date();
      var list = moment(new Date()).format('YYYY-MM').split('-');
      tempDate.setFullYear(this.$route.params._id.split(',')[1]);
      tempDate.setMonth(Number(this.$route.params._id.split(',')[2]) - 1);
      tempDate.setDate(1);
      this.letparams = {
        dates: moment(tempDate).format('YYYY-MM'),
        role: '1',
        groupid: this.$route.params._id.split(',')[0],
      };
    }
    if (this.$route.params.letparams != undefined) {
      this.letstatus = this.$route.params.letstatus;
    }
  },
  methods: {
    //生成个别合同
    createprobook(row) {
      this.$store.commit('global/SET_HISTORYURL', '');
      this.loading = true;
      this.$store
        .dispatch('PFANS6008Store/checkcontract', {
          'dates': this.letparams.dates,
          'checkindivdual': '1',
          'custochinese': row.suppliername,
        })
        .then(response => {
          this.data = response;
          if (this.data === 1) {
            Message({
              message: this.$t('label.PFANS6010VIEW_CONTRACT'),
              type: 'info',
              duration: 5 * 1000,
            });
            this.loading = false;
          } else {
            this.loading = false;
            this.$router.push({
              name: 'PFANS1024FormView',
              params: {
                letparams: this.letparams,
                _checkindivdual: '1',
                supplierinfor_id: row.bpcompany,
                bpcostcount: row.bpcostcount,
                dates: this.letparams.dates,
                projectname: '项目名称',
                disabled: true,
                _id: '',
              },
            });
          }
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
    getSummaries(param) {
      const {columns, data} = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = this.$t('label.PFANS1036FORMVIEW_TOTAL');
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            // update gbb 20210311 PSDCD_PFANS_20210225_BUG_022 保留两位小数 start
            if (!isNaN(value)) {
              return Math.round((prev + curr) * 100) / 100;
            } else {
              return Math.round(prev * 100) / 100;
            }
            // update gbb 20210311 PSDCD_PFANS_20210225_BUG_022 保留两位小数 end
          }, 0);
          sums[index] = Math.round((sums[index]) * 100) / 100;
        } else {
          sums[index] = '--';
        }
      });
      return sums;
    },
    buttonClick(val) {
      if (val === 'save') {
        this.updateSta();
      }
    },
    workflowState(val) {
      if (val.state === '2') {
        this.updateSta();
      }
    },
    //发起审批按钮
    checkWorkFlow() {
      this.$refs.container.$refs.workflow.startWorkflow();
    },
    updateSta() {
      var tempDate = new Date();
      var list = moment(new Date()).format('YYYY-MM').split('-');
      tempDate.setFullYear(this.$route.params._id.split(',')[1]);
      tempDate.setMonth(Number(this.$route.params._id.split(',')[2]) - 1);
      tempDate.setDate(1);
      let strData = [];
      for (let i = 0; i < this.coststatistics.length; i++) {
        strData.push(
          {
            bpcompany: this.coststatistics[i].bpcompany,
            bpcostcount: this.coststatistics[i].bpcostcount,
            groupid: this.$route.params._id.split(',')[0],
            groupname: getOrgInfo(this.$route.params._id.split(',')[0]).companyen,
            //region  add_qhr_20210616 月度总览存入工数字段
            dates: moment(tempDate).format('YYYY-MM'),
            manhour: (Number(this.coststatistics[i].ex1manhour0) + Number(this.coststatistics[i].ex2manhour0)).toFixed(2),
            //endregion  add_qhr_20210616 月度总览存入工数字段
          },
        );
      }
      let baseInfo = [strData];
      this.loading = true;
      this.$store
        .dispatch('PFANS6008Store/insertcoststatisticsdetail', baseInfo)
        .then(response => {
          Message({
            message: this.$t('normal.success_01'),
            type: 'success',
            duration: 5 * 1000,
          });
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.$message.error({
            message: this.$t('normal.error_04'),
            type: 'error',
          });
        });
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss">
/*列锁定之后滚动条拖不动问题处理*/
.el-table--scrollable-y .el-table__body-wrapper {
  z-index: 1;
}
</style>
