<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :title="title" @buttonClick="buttonClick" ref="container"
                         v-loading="loading" :defaultStart="defaultStart"
                         @workflowState="workflowState" @StartWorkflow="checkWorkFlow" :workflowCode="workflowCode">
      <div slot="customize">
        <el-row>
          <el-col :span="24">
            <el-table
              :data="tableData" :summary-method="getSummaries" border header-cell-class-name="sub_bg_color_blue"
              show-summary
              stripe style="width: 85vw">
              <el-table-column :label="$t('NO')"
                               type="index"
                               width="50" fixed="left"></el-table-column>
              <el-table-column property="suppliername" :label="$t('label.PFANS6007VIEW_BPCLUBNAME')"
                               width="250" fixed="left"></el-table-column>
              <el-table-column :label="$t(item)"
                               v-for="(item, index) in this.groupnamelist" :key="index">
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
                  <el-table-column :property="`costcount${index}`" v-if="false"></el-table-column>
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
                                   property="jobnumber1"
                                   width="100"></el-table-column>
                  <el-table-column :label="$t('label.PFANS6008VIEW_COST')"
                                   property="cost1"
                                   width="100"></el-table-column>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS6010VIEW_FREESUM')"
                               width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_PROSPECTS')"
                                 property="prospects"
                                 width="150"></el-table-column>
                <el-table-column :label="$t('label.PFANS2006VIEW_ACTUAL')"
                                 property="bpcostcount"
                                 width="150"></el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.operation')" align="center" width="200">
                <template slot-scope="scope">
                  <el-button
                    :disabled="disable"
                    @click="createprobook(scope.row)"
                    plain
                    size="small"
                    type="primary"
                  >{{$t('label.PFANS6010VIEW_CREAPROBOOK')}}
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
    import {getSupplierinfor,getorgGroupList} from '@/utils/customize';
    import moment from "moment";
    export default {
        name: 'PFANS6010FormView',
        components: {
            EasyNormalContainer,
        },
        data() {
            return {
                title: 'title.PFANS6010FORMVIEW',
                defaultStart:false,
                loading: false,
                disable: true,
                buttonList: [],
                tableData: [],
                letparams:{},
                groupnamelist:[],
                coststatistics:[],
                canStart: false,
                workflowCode: 'W0094',
                letstatus:''
            };
        },
        mounted() {
            this.loading = true;
            this.$store
                .dispatch('PFANS6008Store/getcostMonth', this.letparams)
                .then(response => {
                    this.coststatistics = response;
                    for (let i = 0; i < response.length; i++) {
                        let supplierInfor = getSupplierinfor(response[i].bpcompany);
                        if (supplierInfor) {
                            response[i].suppliername = supplierInfor.supchinese;
                        }
                    }
                    let groupidlist = response[0].strgroupid.substring(0,response[0].strgroupid.length - 1)
                    let groupnamelist = [];
                    groupnamelist = groupidlist.split(",");
                    for (let j = 0; j < groupnamelist.length; j++) {
                        let group = getorgGroupList(groupnamelist[j]);
                        if (group) {
                            this.groupnamelist.push(group.groupname);
                        }
                    }
                    let a = this.groupnamelist;
                    this.tableData = response;
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
        created() {
            if(this.$route.params.letparams != undefined){
                this.letparams = this.$route.params.letparams;
                //外驻管理担当
                if(this.letparams.role === '4'){
                    this.disable = false;
                }
            }
            else{
                var tempDate = new Date();
                var list = moment(new Date()).format("YYYY-MM").split('-');
                tempDate.setFullYear(this.$route.params._id.split(",")[1]);
                tempDate.setMonth(Number(this.$route.params._id.split(",")[2]) - 1);
                tempDate.setDate(1);
                this.letparams = {
                    dates: moment(tempDate).format('YYYY-MM'),
                    role: '1',
                    groupid: this.$route.params._id.split(",")[0]
                }
            }
            if(this.$route.params.letparams != undefined){
                this.letstatus = this.$route.params.letstatus;
                if(this.letstatus === '0'){
                    //自己部门才可以发起审批
                    if(this.$store.getters.userinfo.userinfo.groupid === this.$route.params._id.split(",")[0]){
                        this.$store.commit('global/SET_OPERATEOWNER', this.$store.getters.userinfo.userid);
                    }
                }
            }
        },
        methods: {
            //生成个别合同
            createprobook(row) {
                this.$store.commit('global/SET_HISTORYURL', this.$route.path);
                if (val === 'view') {
                    this.$router.push({
                        name: 'PFANS1024FormView',
                        params: {
                            _checkindivdual: "1",
                            supplierinfor_id:row.bpcompany,
                            dates:this.letparams.dates,
                            projectname:"测试项目",
                        }
                    })
                }
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
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0);
                        sums[index] = Math.round((sums[index]) * 100) / 100;
                    } else {
                        sums[index] = '--';
                    }
                });
                return sums;
            },
            buttonClick(val) {
                this.$refs['refform'].validate(valid => {
                    if (valid) {

                    } else {
                        Message({
                            message: this.$t("normal.error_12"),
                            type: 'error',
                            duration: 5 * 1000
                        });
                    }
                });
            },
            workflowState(val) {
                if (val.state === '2') {
                    this.updateSta();
                }
            },
            checkWorkFlow() {
                this.$refs.container.$refs.workflow.startWorkflow();
            },
            updateSta() {
                this.loading = true;
                this.$store
                    .dispatch('PFANS6008Store/insertcoststatisticsdetail', this.letparams)
                    .then(response => {
                        debugger;
                        Message({
                            message: this.$t('normal.success_01'),
                            type: 'success',
                            duration: 5 * 1000,
                        });
                        this.loading = false;
                    })
                    .catch(err => {
                        this.loading = false;
                        this.$message({
                            message: this.$t("normal.error_04"),
                            type: "error"
                        });
                    });
            }
        }
    };
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
