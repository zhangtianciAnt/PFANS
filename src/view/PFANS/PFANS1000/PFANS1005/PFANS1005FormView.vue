<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" v-loading="loading" :title="title" @buttonClick="buttonClick"
                         @disabled="setdisabled" :workflowCode="workflowCode"
                         @end="end" @start="start" @workflowState="workflowState" ref="container">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="ruleForm"
                 style="padding: 3vw">
          <el-tabs type="border-card" v-model="activeName">
            <el-tab-pane :label="$t('label.PFANS2002FORMVIEW_ORGIN')" name="first">
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.center')">
                    <org :disabled="!disable"
                         :orglist="form.center_id"
                         @getOrgids="getCenterid"
                         orgtype="1"
                         style="width: 20vw"
                    ></org>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.group')">
                    <org :disabled="!disable"
                         :orglist="form.group_id"
                         @getOrgids="getGroupId1"
                         orgtype="2"
                         style="width: 20vw"
                    ></org>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.team')">
                    <org :disabled="true"
                         :orglist="form.team_id"
                         @getOrgids="getTeamid"
                         orgtype="3"
                         style="width: 20vw"
                    ></org>
                  </el-form-item>
                </el-col>
              </el-row>
              <!--              <el-row>-->
              <!--                <el-col :span="8">-->
              <!--                  <el-form-item :label="$t('label.center')" prop="centerid">-->
              <!--                    <el-input :disabled="true" style="width:20vw" v-model="centerid"></el-input>-->
              <!--                    <el-input v-show='false' :disabled="false" style="width:20vw" v-model="form.center_id"></el-input>-->
              <!--                  </el-form-item>-->
              <!--                </el-col>-->
              <!--                <el-col :span="8">-->
              <!--                  <el-form-item :label="$t('label.group')" prop="groupid">-->
              <!--                    <el-input :disabled="true" style="width:20vw" v-model="groupid"></el-input>-->
              <!--                    <el-input v-show='false' :disabled="false" style="width:20vw" v-model="form.group_id"></el-input>-->
              <!--                  </el-form-item>-->
              <!--                </el-col>-->
              <!--                <el-col :span="8">-->
              <!--                  <el-form-item :label="$t('label.team')" prop="teamid">-->
              <!--                    <el-input :disabled="true" style="width:20vw" v-model="teamid"></el-input>-->
              <!--                    <el-input v-show='false' :disabled="false" style="width:20vw" v-model="form.team_id"></el-input>-->
              <!--                  </el-form-item>-->
              <!--                </el-col>-->
              <!--              </el-row>-->
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
                  <el-form-item :error="errorgroup" :label="$t('label.PFANS1004VIEW_GROUPZW')" prop="group_name"
                                v-if="checkgroup">
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
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS3005FORMVIEW_LOANAPP_ACTU')" name="second">
              <el-row>
                <el-table :data="tableA" border
                          header-cell-class-name="sub_bg_color_blue"
                          stripe style="width: 952px">
                  <el-table-column :label="$t('label.PFANS1013FORMVIEW_LOAN')" align="center"
                                   prop="loanapno" width="200px">
                    <template slot-scope="scope">
                      <span>{{scope.row.loanapno}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1013VIEW_LOANAMOUNT')" align="center" prop="moneys"
                                   width="150px">
                    <template slot-scope="scope">
                      <span>{{scope.row.moneys}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.remarks')" align="center" prop="remarks"
                                   width="300px">
                    <template slot-scope="scope">
                      <span>{{scope.row.remarks}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS5005VIEW_STATUS')" align="center" prop="status"
                                   width="150px">
                    <template slot-scope="scope">
                      <span>{{scope.row.status}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.operation')" align="center" width="150">
                    <template slot-scope="scope">
                      <el-button
                        @click.native.prevent="rowClick(scope.row)"
                        plain
                        size="small"
                        type="primary"
                        :disabled="disableview === true ? true : false"
                      >{{$t('button.viewdetails')}}
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>
              <div></div>
              <el-row>
                <el-table :data="tableB" border
                          header-cell-class-name="sub_bg_color_blue"
                          stripe style="width: 952px;margin-top: 40px">
                  <el-table-column :label="$t('label.PFANS1013VIEW_REIMNUMBER')" align="center"
                                   prop="invoiceno" width="200px">
                    <template slot-scope="scope">
                      <span>{{scope.row.invoiceno}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS3005VIEW_ACTUARIALAMOUNT')" align="center" prop="moneys"
                                   width="150px">
                    <template slot-scope="scope">
                      <span>{{scope.row.moneys}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.remarks')" align="center" prop="remarks"
                                   width="300px">
                    <template slot-scope="scope">
                      <span>{{scope.row.remarks}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS5005VIEW_STATUS')" align="center" prop="status"
                                   width="150px">
                    <template slot-scope="scope">
                      <span>{{scope.row.status}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.operation')" align="center" width="150">
                    <template slot-scope="scope">
                      <el-button
                        @click.native.prevent="rowClick1(scope.row)"
                        plain
                        size="small"
                        type="primary"
                        :disabled="disableview === true ? true : false"
                      >{{$t('button.viewdetails')}}
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>

            </el-tab-pane>
          </el-tabs>
        </el-form>
      </div>
    </EasyNormalContainer>
    <!--    <PFANS1012Pop :params="urlparams" :url="url" ref="PFANS1012Pop"></PFANS1012Pop>-->
    <!--    <PFANS1006Pop :params="urlparams" :url="url" ref="PFANS1006Pop"></PFANS1006Pop>-->
  </div>
</template>

<script>
    import EasyNormalContainer from '@/components/EasyNormalContainer';
    import user from '../../../components/user';
    import {Message} from 'element-ui';
    import {getCurrentRole2, getOrgInfo, getOrgInfoByUserId, getStatus} from '@/utils/customize';
    import moment from 'moment';
    import org from '../../../components/org';

    export default {
    name: 'PFANS1005FormView',
    components: {
      EasyNormalContainer,
      user,
      org,
        // PFANS1012Pop,
        // PFANS1006Pop,
    },
    data() {
      var groupId = (rule, value, callback) => {
        if (!this.form.group_name || this.form.group_name === '') {
          callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS1004VIEW_GROUPZW')));
          this.errorgroup = this.$t('normal.error_08') + this.$t('label.PFANS1004VIEW_GROUPZW');
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
        // update gbb 20210316 NT_PFANS_20210227_BUG_033 pop画面传值类型修改 start
        //urlparams: '',
        urlparams: {},
        // update gbb 20210316 NT_PFANS_20210227_BUG_033 pop画面传值类型修改 end
          url: '',
        workflowCode: 'W0012',
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
        disableview: false,
          checkGro: false,
        baseInfo: {},
          activeName: 'first',
          tableA: [],
          tableB: [],
        form: {
          summoney: '',
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
        // this.$store.commit('global/SET_WORKFLOWURL', '/PFANS1005FormView');
        this.disableview = this.$route.params._disableview;
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
            if (this.form.group_name != '' && this.form.group_name != null) {
              this.orglist = this.form.group_name;
              this.getchangeGroup(this.form.group_name);
            }
            //add-ws-4/23-总务担当可用选择部门带出预算编码
            // let rst = getOrgInfoByUserId(response.purchaseApply.user_id);
            // if (rst) {
            //     //upd_fjl_0927
            //     if (rst.groupId !== null && rst.groupId !== '' && rst.groupId !== undefined) {
            //         this.checkGro = true;
            //     } else {
            //         this.checkGro = false;
            //     }
            //     // this.centerid = rst.centerNmae;
            //     // this.groupid = rst.groupNmae;
            //     // this.teamid = rst.teamNmae;
            //     //upd_fjl_0927
            // }
            if (response.shoppingDetailed.length > 0) {
              this.tableD = response.shoppingDetailed;
            }
            this.userlist = this.form.user_id;
            this.getBudt(this.form.center_id);
              //add_fjl_0806
              //有暂借款编号绑定暂借款信息
              if (this.form.loanapplication_id) {
                  this.$store
                      .dispatch('PFANS1006Store/getLoanapplicationOne2', {'loanapplication_id': this.form.loanapplication_id})
                      .then(response => {
                          if (response !== null && response !== '' && response !== undefined) {
                            for (var i = 0; i < response.length; i++)
                            {
                              let status = getStatus(response[i].status);
                              this.tableA.push({
                                loanapno: response[i].loanapno,
                                moneys: response[i].moneys,
                                remarks: response[i].remarks,
                                status: status,
                                loanapplication_id: response[i].loanapplication_id,
                              });
                            }
                          }
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
              }

              //有精算报销编号绑定精算信息
              if (this.form.publicexpense_id) {
                  this.$store
                      .dispatch('PFANS1012Store/selectByIdone2', {'publicexpenseid': this.form.publicexpense_id})
                      .then(response => {
                          if (response !== null && response !== '' && response !== undefined) {
                            for (var i = 0; i < response.length; i++)
                            {
                              let status = getStatus(response[i].status);
                              this.tableB.push({
                                invoiceno: response[i].invoiceno,
                                moneys: response[i].moneys,
                                remarks: response[i].preparefor,
                                status: status,
                                publicexpense_id: response[i].publicexpenseid,
                              });
                            }
                          }
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

              }
              //add_fjl_0806
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
            this.getBudt(this.form.center_id);
              //add_fjl_0927
              // if (rst.groupId !== null && rst.groupId !== '' && rst.groupId !== undefined) {
              //     this.form.group_id = rst.groupId;

              //     this.checkGro = true;
              // } else {
              //     this.checkGro = false;
              // }
              //add_fjl_0927
          }
          this.form.user_id = this.$store.getters.userinfo.userid;
        }
      }
      this.$store
        .dispatch('PFANS5009Store/getSiteList3')
        .then(response => {
          this.options = response;
        });
    },
    methods: {
        //add_fjl_0927
      getOrgInformation(id) {
        let org = {};
        let treeCom = this.$store.getters.orgs;
        if (id && treeCom.getNode(id)) {
          let node = id;
          let type = treeCom.getNode(id).data.type || 0;
          for (let index = parseInt(type); index >= 1; index--) {
            if (index === 2) {
              org.groupname = treeCom.getNode(node).data.departmentname;
              org.group_id = treeCom.getNode(node).data._id;
            }
            if (index === 1) {
              org.centername = treeCom.getNode(node).data.companyname;
              org.center_id = treeCom.getNode(node).data._id;
            }
            node = treeCom.getNode(node).parent.data._id;
          }
          ({
            centername: this.form.centername,
            groupname: this.form.groupname,
            center_id: this.form.center_id,
            group_id: this.form.group_id,
          } = org);
        }
      },
        getCenterid(val) {
          this.form.center_id = val;
          this.form.budgetunit = '';
          this.getBudt(val);
          if(val === ""){
            this.form.group_id = "";
          }
        },
        getGroupId1(val) {
          this.form.group_id = val;
          this.form.budgetunit = '';
          if(val != ""){
            this.getOrgInformation(val);
            this.getBudt(val);
          }else{
            this.getBudt(this.form.center_id);
          }
        },
        getTeamid(val) {
            this.form.team_id = val;
        },
        //add_fjl_0927
        //add_fjl_0806  查看详情
        rowClick(row) {
            this.$store.commit('global/SET_HISTORYURL', '');
            this.$store.commit('global/SET_WORKFLOWURL', '/FFFF1006FormView');
            this.$router.push({
                name: 'PFANS1006FormView',
                params: {
                    _id: row.loanapplication_id,
                    disabled: false,
                    _checkid: this.$route.params._id,
                    _check: true,
                    _fromname: 'PFANS1005FormView',
                },
            });
            // this.url = '';
            // this.urlparams = '';
            // this.url = 'PFANS1006FormView';
            // this.urlparams = {'_id': row.loanapplication_id, 'disabled': false};
            // this.$refs.PFANS1006Pop.open = true;
        },
        rowClick1(row) {
            this.$store.commit('global/SET_HISTORYURL', '');
            this.$store.commit('global/SET_WORKFLOWURL', '/FFFF1012FormView');
            this.$router.push({
                name: 'PFANS1012FormView',
                params: {
                    _id: row.publicexpense_id,
                    disabled: false,
                    _checkid: this.$route.params._id,
                    _check2: true,
                    _fromname: 'PFANS1005FormView',
                },
            });
            // this.url = '';
            // this.urlparams = '';
            // this.url = 'PFANS1012FormView';
            // this.urlparams = {'_id': row.publicexpense_id, 'disabled': false};
            // this.$refs.PFANS1012Pop.open = true;
        },
        //add_fjl_0806  查看详情
      //add-ws-4/23-总务蛋蛋高可用i选择部门带出预算编码
      getGroupId(orglist) {
        this.getchangeGroup(orglist);
        this.form.group_name = orglist;
        if (!this.form.group_name || this.form.group_name === '') {
          this.errorgroup = this.$t('normal.error_08') + this.$t('label.PFANS1004VIEW_GROUPZW');
        } else {
          this.errorgroup = '';
        }
      },
      getchangeGroup(val) {
        this.options1 = [];
        if (val) {
          if (getOrgInfo(val).encoding) {
            let butinfo = (getOrgInfo(val).encoding).substring(0, 3);
            let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'JY002');
            if (dic.length > 0) {
              for (let i = 0; i < dic.length; i++) {
                if (butinfo === (dic[i].value1).substring(0,3)) {
                  this.options1.push({
                    lable: dic[i].value2 + '_' + dic[i].value3,
                    value: dic[i].code,
                  });
                }
              }
            }
          }
        }
      },
      //add-ws-4/23-总务蛋蛋高可用i选择部门带出预算编码
      getBudt(val) {
        this.options1 = [];
          if (val === '' || val === null) {
              return;
          }
        //ADD_FJL  修改人员预算编码
          // if (getOrgInfo(getOrgInfoByUserId(val).groupId)) {
        if(getOrgInfo(val)) {
          let butinfo = (getOrgInfo(val).encoding).substring(0,3);
          let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'JY002');
          if (dic.length > 0) {
            for (let i = 0; i < dic.length; i++) {
              if (butinfo === (dic[i].value1).substring(0,3)) {
                this.options1.push({
                  lable: dic[i].value2 + '_' + dic[i].value3,
                  value: dic[i].code,
                });
              }
            }
          }
          if(this.options1.length === 0) {
            if (getOrgInfo(this.form.group_id).encoding) {
              let butinfo = (getOrgInfo(this.form.group_id).encoding).substring(0, 3);
              let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'JY002');
              if (dic.length > 0) {
                for (let i = 0; i < dic.length; i++) {
                  if (butinfo === (dic[i].value1).substring(0,3)) {
                    this.options1.push({
                      lable: dic[i].value2 + '_' + dic[i].value3,
                      value: dic[i].code,
                    });
                  }
                }
              }
            }
          }
        }
          // }
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
                //update gbb 20200807 合计值保留两位小数
                return this.setScale2(prev + curr);
              } else {
                // update gbb 20210311 PSDCD_PFANS_20210225_BUG_022 保留两位小数 start
                return Math.round(prev * 100) / 100;
                // update gbb 20210311 PSDCD_PFANS_20210225_BUG_022 保留两位小数 end
              }
            }, 0);
          }
        });
        this.sumTotal = sums;
        return sums;
      },
      //数值小数位数控制
      setScale2(val) {
          if (val) {
              return Math.round(val * 100) / 100;
          } else {
              return 0;
          }
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
      checkparams() {
        let id = this.$route.params._checkid;
        let disable = this.$route.params._checkdisable;
        this.$router.push({
          name: 'PFANS1006FormView',
          params: {
            disabled: disable,
            _id: id,
          },
        });
      },
      //add-ws-4/28-精算中，点击决裁，跳转画面
      checkparamsTitle() {
        let id = this.$route.params._checkid;
        let disable = this.$route.params._checkdisable;
        this.$router.push({
          name: 'PFANS1012FormView',
          params: {
            disabled: disable,
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
          if (this.$route.params._check != null && this.$route.params._check != '' && this.$route.params._check != undefined) {
            if (this.$route.params._check) {
              this.checkparamsTitle();
            }
          } else if (this.$route.params._check2 != null && this.$route.params._check2 != '' && this.$route.params._check2 != undefined) {
            if (this.$route.params._check2) {
              this.checkparams();
            }
          } else {
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
              this.form.summoney = amountsum;
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
                      this.$message.error({
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
                      this.$message.error({
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
