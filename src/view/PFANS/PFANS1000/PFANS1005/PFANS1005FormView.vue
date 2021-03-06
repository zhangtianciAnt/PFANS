<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" v-loading="loading" :title="title" @buttonClick="buttonClick"
                         @end="end" @start="start" @workflowState="workflowState" ref="container">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="left" label-width="8rem" ref="ruleForm"
                 style="padding: 2rem">
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.center')" prop="centerid">
                <el-input :disabled="true" style="width: 11rem" v-model="form.center_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')" prop="groupid">
                <el-input :disabled="true" style="width: 11rem" v-model="form.group_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')" prop="teamid">
                <el-input :disabled="true" style="width: 11rem" v-model="form.team_id"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.applicant')" prop="user_id">
                <user :disabled="!disable" :error="error" :selectType="selectType"
                      :userlist="userlist" @getUserids="getUserids" style="width: 10.1rem"></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.application_date')" prop="application_date">
                <el-date-picker :disabled="!disable" style="width: 11rem"
                                type="date" v-model="form.application_date"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-table :data="tableD" header-cell-class-name="sub_bg_color_grey height">
              <el-table-column :label="$t('label.PFANS2006VIEW_NO')" align="center" fixed type="index">
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1005VIEW_ITEM')" align="center" prop="projects">
                <template slot-scope="scope">
                  <el-input :disabled="!disable" maxlength="50" v-model="scope.row.projects">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1005VIEW_UNITPRICE')" align="center" prop="unitprice">
                <template slot-scope="scope">
                  <el-input-number @change="changeSum" :disabled="!disable" :min="0" :precision="2" :max="9999999" controls-position="right"
                                   :step="1" v-model="scope.row.unitprice">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS3005VIEW_QUANTITY')" align="center" prop="numbers">
                <template slot-scope="scope">
                  <el-input-number @change="changeSum" :disabled="!disable" :min="0" :precision="0" :max="99999" controls-position="right"
                                   :step="1" v-model="scope.row.numbers">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1005VIEW_AMOUNT')" align="center" prop="amount">
                <template slot-scope="scope">
                  <el-input-number :disabled="true" :precision="2" controls-position="right" v-model="scope.row.amount">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS2026FORMVIEW_REMARKS')" align="center" prop="remarks">
                <template slot-scope="scope">
                  <el-input :disabled="!disable" v-model="scope.row.remarks">
                  </el-input>
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
  import {getOrgInfoByUserId} from '@/utils/customize';
  import moment from 'moment';

  export default {
    name: 'PFANS1005FormView',
    components: {
      EasyNormalContainer,
      user,
    },
    data() {
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
        error: '',
        selectType: 'Single',
        userlist: '',
        code: 'PK004',
        multiple: false,
        title: 'title.PFANS1005VIEW',
        loading: false,
        baseInfo: {},
        form: {
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
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1005Store/selectById', {'purchaseApplyid': this.$route.params._id})
          .then(response => {
            this.form = response.purchaseApply;
            if (response.shoppingDetailed.length > 0) {
              this.tableD = response.shoppingDetailed;
            }
            if (this.form.status === '2') {
              this.disable = false;
            }
            this.userlist = this.form.user_id;
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
          let lst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
          this.form.center_id = lst.centerNmae;
          this.form.group_id = lst.groupNmae;
          this.form.team_id = lst.teamNmae;
          this.form.user_id = this.$store.getters.userinfo.userid;
        }
      }
    },
    methods: {
      changeSum(){
        this.tableD[0].amount = this.tableD[0].unitprice * this.tableD[0].numbers
      },
      getUserids(val) {
        this.form.user_id = val;
        let lst = getOrgInfoByUserId(val);
        this.form.center_id = lst.centerNmae;
        this.form.group_id = lst.groupNmae;
        this.form.team_id = lst.teamNmae;
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
      start() {
        this.form.status = '2';
        this.buttonClick('update');
      },
      end() {
        this.form.status = '0';
        this.buttonClick('update');
      },
      deleteRow(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
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
        });
      },
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
          this.paramsTitle();
        } else {
          this.$refs['ruleForm'].validate(valid => {
            if (valid) {
              this.loading = true;
              this.baseInfo = {};
              this.form.application_date = moment(this.form.application_date).format('YYYY-MM-DD');
              this.baseInfo.purchaseApply = JSON.parse(JSON.stringify(this.form));
              this.baseInfo.shoppingDetailed = [];
              for (let i = 0; i < this.tableD.length; i++) {
                if (this.tableD[i].unitprice !== '' || this.tableD[i].projects !== '' || this.tableD[i].numbers !== '' ||
                  this.tableD[i].amount !== '' || this.tableD[i].remarks !== '') {
                  this.baseInfo.shoppingDetailed.push(
                    {
                      shoppingdetailed_id: this.tableD[i].shoppingdetailed_id,
                      purchaseApply_id: this.tableD[i].purchaseApply_id,
                      unitprice: this.tableD[i].unitprice,
                      projects: this.tableD[i].projects,
                      numbers: this.tableD[i].numbers,
                      amount: this.tableD[i].amount,
                      remarks: this.tableD[i].remarks,
                    },
                  );
                }
              }
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
          });
        }
      },
    },
  };
</script>

<style scoped>

</style>
