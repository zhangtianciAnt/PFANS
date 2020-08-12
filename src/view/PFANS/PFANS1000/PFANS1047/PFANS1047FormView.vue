<template>
  <div>
    <EasyNormalContainer :buttonList="buttonList"
                         :title="title"
                         :enableSave="enableSave"
                         :canStart="canStart"
                         @StartWorkflow="buttonClick"
                         :defaultStart="defaultStart"
                         @buttonClick="buttonClick"
                         @end="end" @start="start"
                         @workflowState="workflowState"
                         @disabled="setdisabled"
                         ref="container"
                         v-loading="loading">
      <div slot="customize">
        <el-form :model="form" label-position="top" label-width="8vm" ref="reff" style="padding: 2vw;height: auto">
              <div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1024VIEW_CONTRACTNUMBER')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.contractnumber"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1024VIEW_CONTRACTTYPE')">
                      <dicselect :code="code1"
                                 :data="form.contracttype"
                                 :disabled="true"
                                 :multiple="multiple"
                                 style="width:20vw">
                      </dicselect>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1024VIEW_DEPLOYMENT')"
                                  prop="deployment">
                      <el-input :disabled="true" style="width:20vw" v-model="form.deployment"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')"
                                  prop="claimamount">
                      <el-input :disabled="true" style="width:20vw" v-model="form.claimamount"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_CURRENCYFORMAT')"
                                  prop="currencyposition">
                      <dicselect :code="code3"
                                 :data="form.currencyposition"
                                 :disabled="true"
                                 :multiple="multiple"
                                 @change="getcurrencyformat"
                                 style="width:20vw">
                      </dicselect>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <el-row>
                <el-col :span="24">
                  <el-table :data="tableS" header-cell-class-name="sub_bg_color_blue" stripe border style="width: 70vw">
                    <el-table-column
                      prop="claimtype"
                      :label="$t('label.PFANS1024VIEW_NUMBER')" align="center" width="150"/>
                    <el-table-column
                      prop="deliverydate"
                      :label="$t('label.PFANS1024VIEW_DELIVERYDATE')" align="center" width="170"/>
                    <el-table-column
                      prop="completiondate"
                      :label="$t('label.PFANS1024VIEW_COMPLETIONDATE')" align="center" width="150"/>
                    <el-table-column
                      prop="claimdate" :label="$t('label.PFANS1024VIEW_CLAIMDATE')" align="center" width="150"/>
                    <el-table-column
                      prop="supportdate" :label="$t('label.PFANS1024VIEW_SUPPORTDATE')" align="center" width="150"/>
                    <el-table-column
                      prop="claimamount" :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')" align="center" width="150"/>
                    <el-table-column
                      prop="purnumbers" :label="$t('label.PFANS3005VIEW_NUMBERS')" align="center" width="150"/>

                  </el-table>
                </el-col>
              </el-row>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import user from '../../../components/user.vue';
  import {Message} from 'element-ui';
  import dicselect from '../../../components/dicselect';
  import moment from 'moment';
  import org from '../../../components/org';
  import {getDictionaryInfo, getUserInfo, getOrgInfo} from '@/utils/customize';

  import project from '../../../components/project';

  export default {
    name: 'PFANS1025FormView',
    components: {
      EasyNormalContainer,
      user,
      org,
      dicselect,
      project,
    },
    data() {
      return {
        defaultStart: false,
        enableSave: false,
        canStart:true,
        moneysum: '',
        disable: false,
        error: '',
        userlist: '',
        code1: 'HT015',
        code3: 'PG019',
        sumAwardmoney: '',
        errorgroup: '',
        selectType: 'Single',
        loading: false,
        title: 'title.PFANS1030VIEW',
        multiple: false,
        orglist: '',
        baseInfo: {},
        groupN: '',
        form: {
          group_id: '',
          draftingdate: '',
          scheduleddate: '',
          number: '',
          sarmb: '',
          exchangerate: '',
          contractnumber: '',
          contracttype: '',
          deployment: '',
          deliverydate: '',
          currencyposition: 'PG019003',
          claimamount: '',
          user_id: '',
          maketype: '',
        },
        tableS: [],
        tableD: [],
        buttonList: [],
        flowData:[],
      };
    },
    mounted() {
      this.loading = true;
      if (this.$route.params._id) {
        this.$store
          .dispatch('PFANS1025Store/selectById', {'award_id': this.$route.params._id})
          .then(response => {
            if (response.award != null) {
              this.form = response.award;
              if (this.form.status === '4' || this.form.status === '2') {
                this.enableSave = false;
              } else {
                this.enableSave = true;
              }
              let aa = 0;

              if (response.numbercounts.length > 0) {
                for (let i = 0; i < response.numbercounts.length; i++) {

                  let deliverydate = response.numbercounts[i].deliverydate;
                  let completiondate = response.numbercounts[i].completiondate;
                  let claimdate = response.numbercounts[i].claimdate;
                  let supportdate = response.numbercounts[i].supportdate;

                  if (deliverydate !== '' && deliverydate != null) {
                    response.numbercounts[i].deliverydate = moment(deliverydate).format('YYYY-MM-DD');
                  }
                  if (completiondate !== '' && completiondate != null) {
                    response.numbercounts[i].completiondate = moment(completiondate).format('YYYY-MM-DD');
                  }
                  if (claimdate !== '' && claimdate != null) {
                    response.numbercounts[i].claimdate = moment(claimdate).format('YYYY-MM-DD');
                  }
                  if (supportdate !== '' && supportdate != null) {
                    response.numbercounts[i].supportdate = moment(supportdate).format('YYYY-MM-DD');
                  }
                  if (response.numbercounts[i].claimamount) {
                    let claimamount = response.numbercounts[i].claimamount;
                    aa = Number(claimamount) + aa;
                  }
                }
              }
              this.form.claimamount = aa;
              this.tableS = response.numbercounts;
              this.userlist = this.form.user_id;
              this.baseInfo.award = JSON.parse(JSON.stringify(this.form));
            }
            //采购业务数据流程查看详情
            this.$store
              .dispatch('PFANS1026Store/getworkfolwPurchaseData', {'award_id': this.$route.params._id})
              .then(response3 => {
                if (response3 !== null && response3 !== '' && response3 !== undefined) {
                  if (response3["purchase"]!=undefined)
                  {
                    let pur = response3["purchase"].split(',');
                    let statu = pur[1] === '4' ? 'normal.done' : (pur[1] === '2' ? 'normal.doing' : 'normal.todo')
                    this.flowData.push(
                      {
                        No:this.flowData.length + 1,
                        Name: '采购决裁',
                        Status: statu,
                        url: 'PFANS3005FormView',
                        params: {'_id':pur[0]}
                      })
                  }
                  if (response3["award"]!=undefined)
                  {
                    let aw = response3["award"].split(',');
                    let statu = aw[1] === '4' ? 'normal.done' : (aw[1] === '2' ? 'normal.doing' : 'normal.todo')
                    this.flowData.push(
                      {
                        No:this.flowData.length + 1,
                        Name: '合同决裁',
                        Status: statu,
                        url: 'PFANS1047FormView',
                        params: {'_id':aw[0]}
                      })
                  }
                  if (response3["seal"]!=undefined)
                  {
                    let seal = response3["seal"].split(',');
                    let statu = seal[1] === '3' ? 'normal.done' : (seal[1] === '2' ? 'normal.doing' : 'normal.todo')
                    this.flowData.push(
                      {
                        No:this.flowData.length + 1,
                        Name: '印章申请',
                        Status: statu,
                        url: 'PFANS1047FormView',
                        params: {'_id':seal[0]}
                      })
                  }
                  if (response3["loanApplication"]!=undefined)
                  {
                    let loanapp = response3["loanApplication"].split(',');
                    let statu = loanapp[1] === '4' ? 'normal.done' : (loanapp[1] === '2' ? 'normal.doing' : 'normal.todo')
                    this.flowData.push(
                      {
                        No:this.flowData.length + 1,
                        Name: '暂借款申请',
                        Status: statu,
                        url: 'PFANS1006FormView',
                        params: {'_id':loanapp[0]}
                      })
                  }
                  if (response3["publicExpense"]!=undefined)
                  {
                    let pub = response3["publicExpense"].split(',');
                    let statu = pub[1] === '4' ? 'normal.done' : (pub[1] === '2' ? 'normal.doing' : 'normal.todo')
                    this.flowData.push(
                      {
                        No:this.flowData.length + 1,
                        Name: '公共费用精算',
                        Status: statu,
                        url: 'PFANS1012FormView',
                        params: {'_id':pub[0]}
                      })
                  }
                  this.$emit('showPop',this.flowData);
                }
              })
            //采购业务数据流程查看详情
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
    created() {
      this.$store.commit('global/SET_WORKFLOWURL', '/PFANS1047View');
      this.disable = this.$route.params.disabled;
      if (this.$route.params.disabled) {
        this.buttonList = [
          {
            key: 'save',
            name: 'button.save',
            disabled: false,
            icon: 'el-icon-check',
          },
        ];
      }
    },
    methods: {
      setdisabled(val) {
        if (this.$route.params.disabled) {
          this.disabled = val;
        }
      },
      getcurrencyformat(val) {
        this.form.currencyposition = val;
      },
      workflowState(val) {
        if (val.state === '1') {
          this.form.status = '3';
          this.enableSave = true;
        } else if (val.state === '2') {
          this.form.status = '4';
          this.enableSave = false;
        }
        this.buttonClick2();
      },
      start(val) {
        if (val.state === '0') {
          this.form.status = '2';
        } else if (val.state === '2') {
          this.form.status = '4';
        }
        this.enableSave = false;
        this.buttonClick2();
      },
      end() {
        this.form.status = '0';
        this.enableSave = true;
        this.buttonClick2();
      },
      buttonClick2() {
        this.form.maketype = '9',
          this.baseInfo = {};
        this.form.user_id = this.userlist;
        this.baseInfo.groupN = this.$store.getters.orgGroupList;
        this.loading = true;
        this.baseInfo.award = JSON.parse(JSON.stringify(this.form));
        this.$store
          .dispatch('PFANS1025Store/update', this.baseInfo)
          .then(response => {
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
      checkparamsTitle() {
        let id = this.$route.params._checkid;
        let disable = this.$route.params._checkdisable;
        this.$router.push({
          name: 'PFANS1033FormView',
          params: {
            _id: id,
            disabled: disable,
          },
        });
      },
      paramsTitle() {
        this.$router.push({
          name: 'PFANS1047View',
        });
      },
      buttonClick(val) {
        this.form.maketype = '9',
          this.baseInfo = {};
        this.form.user_id = this.userlist;
        this.baseInfo.groupN = this.$store.getters.orgGroupList;
        if (val === 'back') {
          if (this.$route.params._check != null && this.$route.params._check != '' && this.$route.params._check != undefined) {
            if (this.$route.params._check) {
              this.checkparamsTitle();
            }
          } else {
            this.paramsTitle();
          }
        } else if (val === 'save' || val === 'StartWorkflow') {
          this.$refs['reff'].validate(valid => {
            if (valid) {
              this.loading = true;
              this.baseInfo.award = JSON.parse(JSON.stringify(this.form));
              if (this.$route.params._id) {     //编辑
                this.baseInfo.award.award_id = this.$route.params._id;
                this.$store
                  .dispatch('PFANS1025Store/update', this.baseInfo)
                  .then(response => {
                    this.data = response;
                    this.loading = false;
                    Message({
                      message: this.$t('normal.success_02'),
                      type: 'success',
                      duration: 5 * 1000,
                    });
                    if (val !== 'save' && val !== 'StartWorkflow') {
                      if (this.$store.getters.historyUrl) {
                        this.$router.push(this.$store.getters.historyUrl);
                      }
                    }
                    if (val === 'StartWorkflow') {
                      this.$refs.container.$refs.workflow.startWorkflow();
                    }
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
            } else {
              Message({
                message: this.$t('normal.error_12'),
                type: 'error',
                duration: 5 * 1000,
              });
            }
          });
        }
      },
    },
  };
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .el-table {
    overflow-x: auto;
  }

  .el-table__header-wrapper,
  .el-table__body-wrapper,
  .el-table__footer-wrapper {
    overflow: visible;
  }

  .el-table::after {
    position: relative;
  }

  .el-table--scrollable-x .el-table__body-wrapper {
    overflow: visible;
  }
</style>
