<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" v-loading="loading" :title="title" @buttonClick="buttonClick"
                         @disabled="setdisabled"
                         @end="end" @start="start" @workflowState="workflowState" ref="container">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="ruleForm"
                 style="padding: 3vw">
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.center')" prop="centerid">
                <el-input :disabled="true" style="width:20vw" v-model="centerid"></el-input>
                <el-input v-show='false' :disabled="false" style="width:20vw" v-model="form.center_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')" prop="groupid">
                <el-input :disabled="true" style="width:20vw" v-model="groupid"></el-input>
                <el-input v-show='false' :disabled="false" style="width:20vw" v-model="form.group_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')" prop="teamid">
                <el-input :disabled="true" style="width:20vw" v-model="teamid"></el-input>
                <el-input v-show='false' :disabled="false" style="width:20vw" v-model="form.team_id"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.applicant')" prop="user_id">
                <user :disabled="true" :error="error" :selectType="selectType"
                      :userlist="userlist" @getUserids="getUserids" style="width: 20vw"></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.application_date')" prop="application_date">
                <el-date-picker :disabled="true" style="width:20vw"
                                type="date" v-model="form.application_date"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :error="errorgroup" :label="$t('label.PFANS1004VIEW_GROUPZW')" prop="group_name" v-if="checkgroup">
                <org :disabled="!disable" :error="errorgroup" :orglist="form.group_name" @getOrgids="getGroupId"
                     orgtype="2" style="width:20vw"></org>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1012FORMVIEW_BUDGET')">
                <el-select clearable style="width: 20vw" v-model="form.budgetunit" :disabled="!disable"
                           :placeholder="$t('normal.error_09')">
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.lable"
                    :value="item.value"
                    @change="changeBut">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-table :data="tableD" header-cell-class-name="sub_bg_color_blue" border stripe style="width: 73vw"
                        :summary-method="getSummaries" show-summary>
                <el-table-column :label="$t('label.PFANS2006VIEW_NO')" align="center" type="index" width="80">
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1005FORMVIEW_ERROR')" align="center" prop="remarks" width="180">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" maxlength="200" v-model="scope.row.remarks">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1019FORMVIEW_EMPLOY')" align="center" prop="employ" width="180">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" maxlength="200" v-model="scope.row.employ">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1005VIEW_UNITPRICE')" align="center" prop="unitprice"
                                 width="200">
                  <template slot-scope="scope">
                    <el-input-number :disabled="!disable" :min="0" :precision="2" :max="9999999"
                                     controls-position="right" :no="scope.row" @change="changeSum(scope.row)"
                                     :step="1" v-model="scope.row.unitprice">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS3005VIEW_QUANTITY')" align="center" prop="numbers" width="200">
                  <template slot-scope="scope">
                    <el-input-number @change="changeSum(scope.row)" :disabled="!disable" :min="0" :precision="0"
                                     :max="99999"
                                     controls-position="right" :no="scope.row"
                                     :step="1" v-model="scope.row.numbers">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1005VIEW_AMOUNT')" align="center" prop="amount" width="200">
                  <template slot-scope="scope">
                    <el-input-number @change="changeSum(scope.row)" :disabled="true" :precision="2"
                                     controls-position="right" :no="scope.row" v-model="scope.row.amount">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1005FORMVIEW_PJPROJECT')" align="center" prop="projects"
                                 width="180">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.projects" clearable :placeholder="$t('normal.error_09')"
                               :disabled="!disable">
                      <el-option
                        v-for="item in options"
                        :key="item.companyprojects_id"
                        :label="item.project_name"
                        :value="item.companyprojects_id">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.operation')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-button
                      :disabled="!disable"
                      @click.native.prevent="deleteRow(scope.$index, tableD)"
                      plain
                      size="small"
                      type="danger"
                    >{{$t('button.delete')}}
                    </el-button>
                    <el-button
                      :disabled="!disable"
                      @click="addRow()"
                      plain
                      size="small"
                      type="primary"
                    >{{$t('button.insert')}}
                    </el-button>
                  </template>
                </el-table-column>
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
  import user from '../../../components/user';
  import {Message} from 'element-ui';
  import {getOrgInfoByUserId, getOrgInfo,getCurrentRole2} from '@/utils/customize';
  import moment from 'moment';
  import org from '../../../components/org';
  export default {
    name: 'PFANS1005FormView',
    components: {
      EasyNormalContainer,
      user,
      org,
    },
    data() {
      var groupId = (rule, value, callback) => {
        if (!this.form.group_name || this.form.group_name === '') {
          callback(new Error( this.$t('normal.error_08') + this.$t('label.PFANS1004VIEW_GROUPZW')));
          this.errorgroup =  this.$t('normal.error_08') + this.$t('label.PFANS1004VIEW_GROUPZW');
        } else {
          this.errorgroup = '';
          callback();
        }
      };
      var validateUserid = (rule, value, callback) => {
        if (!value || value === '' || value === 'undefined') {
          callback(new Error(this.$t('normal.error_08') + this.$t('label.applicant')));
          this.error = this.$t('normal.error_08') + this.$t('label.applicant');
        } else {
          callback();
          this.error = '';
        }
      };
      return {
        errorgroup: '',
        checkgroup: false,
        optionsdata: [],
        options1: [],
        options: [],
        sumTotal: [],
        centerid: '',
        groupid: '',
        teamid: '',
        error: '',
        budgetunit: '',
        selectType: 'Single',
        userlist: '',
        code: 'PK004',
        multiple: false,
        title: 'title.PFANS1005VIEW',
        loading: false,
        baseInfo: {},
        form: {
          remarks: '',
          center_id: '',
          group_id: '',
          team_id: '',
          user_id: '',
          status: '',
          application_date: moment(new Date()).format('YYYY-MM-DD'),
        },
        tableD: [
          {
            shoppingdetailed_id: '',
            purchaseapply_id: '',
            projects: '',
            unitprice: '',
            numbers: '',
            amount: '',
            remarks: '',
            employ: '',
          },
        ],
        buttonList: [
          {
            key: 'save',
            name: 'button.save',
            disabled: false,
            icon: 'el-icon-check',
          },
        ],
        rules: {
          group_name: [
            {
              required: true,
              validator: groupId,
              trigger: 'change',
            },
          ],
          user_id: [{
            required: true,
            validator: validateUserid,
            trigger: 'change',
          }],
          application_date: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.application_date'),
            trigger: 'change',
          }],
        },
      };
    },
    created() {
      if (!this.$route.params.disabled) {
        this.buttonList = [];
      }
      this.disable = this.$route.params.disabled;
    },
    mounted() {
      //add-ws-4/23-总务担当可用选择部门带出预算编码
      let role = getCurrentRole2();
      if (role === '0') {
        this.checkgroup = true;
      } else {
        this.checkgroup = false;
      }
      //add-ws-4/23-总务担当可用选择部门带出预算编码
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1005Store/selectById', {'purchaseApplyid': this.$route.params._id})
          .then(response => {
            this.form = response.purchaseApply;
            //add-ws-4/23-总务担当可用选择部门带出预算编码
            if(this.form.group_name!='' && this.form.group_name!=null){
              this.orglist = this.form.group_name;
              this.getchangeGroup(this.form.group_name)
            }
            //add-ws-4/23-总务担当可用选择部门带出预算编码
            let rst = getOrgInfoByUserId(response.purchaseApply.user_id);
            if (rst) {
              this.centerid = rst.centerNmae;
              this.groupid = rst.groupNmae;
              this.teamid = rst.teamNmae;
            }
            if (response.shoppingDetailed.length > 0) {
              this.tableD = response.shoppingDetailed;
            }
            this.userlist = this.form.user_id;
            if(this.form.group_name=='' || this.form.group_name==null){
              this.getBudt(this.userlist);
            }

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
      } else {
        this.userlist = this.$store.getters.userinfo.userid;
        if (this.userlist !== null && this.userlist !== '') {
          let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
          if (rst) {
            this.centerid = rst.centerNmae;
            this.groupid = rst.groupNmae;
            this.teamid = rst.teamNmae;
            this.form.center_id = rst.centerId;
            this.form.group_id = rst.groupId;
            this.form.team_id = rst.teamId;
          }
          this.form.user_id = this.$store.getters.userinfo.userid;
          this.getBudt(this.form.user_id);
        }
      }
      this.$store
        .dispatch('PFANS5009Store/getSiteList3')
        .then(response => {
          this.options = response;
        });
    },
    methods: {
      //add-ws-4/23-总务蛋蛋高可用i选择部门带出预算编码
      getGroupId(orglist) {
        debugger
        this.getchangeGroup(orglist)
        this.form.group_name =orglist
        if (!this.form.group_name || this.form.group_name === '') {
          this.errorgroup = this.$t('normal.error_08') + this.$t('label.PFANS1004VIEW_GROUPZW');
        } else {
          this.errorgroup = '';
        }
      },
      getchangeGroup(val){
        this.options1 = [];
        if (val) {
          let butinfo = getOrgInfo(val).encoding;
          let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'JY002');
          if (dic.length > 0) {
            for (let i = 0; i < dic.length; i++) {
              if (butinfo === dic[i].value1) {
                this.options1.push({
                  lable: dic[i].value2 + '_' + dic[i].value3,
                  value: dic[i].code,
                });
              }
            }
          }
        }
      },
      //add-ws-4/23-总务蛋蛋高可用i选择部门带出预算编码
      getBudt(val) {
        this.options1 = [];
        //ADD_FJL  修改人员预算编码
        if (getOrgInfo(getOrgInfoByUserId(val).groupId)) {
          let butinfo = getOrgInfo(getOrgInfoByUserId(val).groupId).encoding;
          let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'JY002');
          if (dic.length > 0) {
            for (let i = 0; i < dic.length; i++) {
              if (butinfo === dic[i].value1) {
                this.options1.push({
                  lable: dic[i].value2 + '_' + dic[i].value3,
                  value: dic[i].code,
                });
              }
            }
          }
        }
        //ADD_FJL  修改人员预算编码
      },
      changeBut(val) {
        this.form.budgetunit = val;
      },
      setdisabled(val) {
        if (this.$route.params.disabled) {
          this.disable = val;
        }
      },
      getSummaries(param) {
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = this.$t('label.PFANS1012VIEW_ACCOUNT');
            return;
          } else if ([1, 2, 6].includes(index)) {
            sums[index] = '--';
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
          }
        });
        this.sumTotal = sums;
        return sums;
      },
      changeSum(row) {
        row.amount = row.unitprice * row.numbers;
      },
      getUserids(val) {
        this.form.user_id = val;
        let rst = getOrgInfoByUserId(val);
        if (rst) {
          this.centerid = rst.centerNmae;
          this.groupid = rst.groupNmae;
          this.teamid = rst.teamNmae;
          this.form.center_id = rst.centerId;
          this.form.group_id = rst.groupId;
          this.form.team_id = rst.teamId;
        } else {
          this.centerid = '';
          this.groupid = '';
          this.teamid = '';
          this.form.center_id = '';
          this.form.group_id = '';
          this.form.team_id = '';
        }

        if (!this.form.user_id || this.form.user_id === '' || val === 'undefined') {
          this.error = this.$t('normal.error_08') + this.$t('label.applicant');
        } else {
          this.error = '';
        }
      },
      workflowState(val) {
        if (val.state === '1') {
          this.form.status = '3';
        } else if (val.state === '2') {
          this.form.status = '4';
        }
        this.buttonClick('update');
      },
      start(val) {
        if (val.state === '0') {
          this.form.status = '2';
        } else if (val.state === '2') {
          this.form.status = '4';
        }
        this.buttonClick('update');
      },
      end() {
        this.form.status = '0';
        this.buttonClick('update');
      },
      deleteRow(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        } else {
          this.tableD = [{
            shoppingdetailed_id: '',
            purchaseapply_id: '',
            projects: '',
            unitprice: '',
            numbers: '',
            amount: '',
            remarks: '',
            employ: '',
          }];
        }
      },
      addRow() {
        this.tableD.push({
          shoppingdetailed_id: '',
          purchaseapply_id: '',
          projects: '',
          unitprice: '',
          numbers: '',
          amount: '',
          remarks: '',
          employ: '',
        });
      },
      //add-ws-4/28-精算中，点击决裁，跳转画面
      checkparamsTitle() {
        let id = this.$route.params._checkid
        this.$router.push({
          name: 'PFANS1012FormView',
          params: {
            _id: id,
          },
        });
      },
      //add-ws-4/28-精算中，点击决裁，跳转画面
      paramsTitle() {
        this.$router.push({
          name: 'PFANS1001FormView',
          params: {
            title: 5,
          },
        });
      },
      buttonClick(val) {
        if (val === 'back') {
          //add-ws-4/28-精算中，点击决裁，跳转画面
          if(this.$route.params._check!=null&&this.$route.params._check!=''&&this.$route.params._check!=undefined){
            if(this.$route.params._check){
              this.checkparamsTitle();
            }
          }else{
            this.paramsTitle();
          }
          //add-ws-4/28-精算中，点击决裁，跳转画面
        } else {
          if (Number(this.sumTotal[4]) > 1000) {
            this.$message.error(this.$t('label.PFANS1005FORMVIEW_ERRORCHECK'));
            return;
          }
          this.$refs['ruleForm'].validate(valid => {
            if (valid) {
              this.loading = true;
              this.baseInfo = {};
              this.form.application_date = moment(this.form.application_date).format('YYYY-MM-DD');
              this.baseInfo.shoppingDetailed = [];
              let amountsum = 0;
              for (let i = 0; i < this.tableD.length; i++) {
                //add-ws-4/17-摘要字段处理
                this.optionsdata.push({
                  remarks: this.tableD[i].remarks,
                });
                //add-ws-4/17-摘要字段处理
                if (this.tableD[i].projects !== '' || this.tableD[i].unitprice > 0 || this.tableD[i].numbers > 0 ||
                  this.tableD[i].amount > 0 || this.tableD[i].remarks !== '' || this.tableD[i].employ !== '') {
                  amountsum += parseFloat(this.tableD[i].amount);
                  this.baseInfo.shoppingDetailed.push(
                    {
                      shoppingdetailed_id: this.tableD[i].shoppingdetailed_id,
                      purchaseApply_id: this.tableD[i].purchaseApply_id,
                      projects: this.tableD[i].projects,
                      unitprice: this.tableD[i].unitprice,
                      numbers: this.tableD[i].numbers,
                      amount: this.tableD[i].amount,
                      remarks: this.tableD[i].remarks,
                      employ: this.tableD[i].employ,
                    },
                  );
                }
              }
              //add-ws-4/17-摘要字段处理
              let checktableD = '';
              if (this.optionsdata.remarks != '') {
                for (var m = 0; m < this.optionsdata.length; m++) {
                  checktableD = checktableD + this.optionsdata[m].remarks + ',';
                }
              }
              this.optionsdata.remarks = checktableD.substring(0, checktableD.length - 1);
              this.form.remarks = this.optionsdata.remarks;
              //add-ws-4/17-摘要字段处理
              this.baseInfo.purchaseApply = JSON.parse(JSON.stringify(this.form));
              let error = 0;
              if (amountsum === 0) {
                error = error + 1;
                Message({
                  message: this.$t('label.PFANS1017VIEW_MINGXI') + this.$t('label.PFANS1025VIEW_AWARDMONEY') + this.$t('label.PFANS1004FORMVIEW_ERROR'),
                  type: 'error',
                  duration: 5 * 1000,
                });
                this.loading = false;
              }
              if (error === 0) {
                if (this.$route.params._id) {
                  this.baseInfo.purchaseApply.purchaseApply_id = this.$route.params._id;
                  this.$store
                    .dispatch('PFANS1005Store/update', this.baseInfo)
                    .then(response => {
                      this.data = response;
                      this.loading = false;
                      if (val !== 'update') {
                        this.$message({
                          message: this.$t('normal.success_02'),
                          type: 'success',
                        });
                        this.paramsTitle();
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
                } else {
                  this.$store
                    .dispatch('PFANS1005Store/insert', this.baseInfo)
                    .then(response => {
                      this.data = response;
                      this.loading = false;
                      this.$message({
                        message: this.$t('normal.success_01'),
                        type: 'success',
                      });
                      this.paramsTitle();
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

<style scoped>

</style>
