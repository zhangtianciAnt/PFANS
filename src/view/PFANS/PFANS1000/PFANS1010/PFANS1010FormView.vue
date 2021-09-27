<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :title="title" @buttonClick="buttonClick" ref="container"
                         @workflowState="workflowState" v-loading="loading" :workflowCode="workflowCode"
                         :canStart="canStart" @start="start" @end="end">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="refform"
                 style="padding:2vw">
          <!--          <el-collapse>-->
          <!--            <el-collapse-item>-->
          <template slot="title">
            <span class="collapse_Title">{{$t('title.PFANS1010VIEW')}}</span>
          </template>
          <el-tabs type="border-card" v-model="activeName">
            <el-tab-pane :label="$t('label.PFANS2002FORMVIEW_ORGIN')" name="first">
              <el-row>
                <!--update center取预算单位横展 start 0404-->
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
                         @getOrgids="getGroupId"
                         orgtype="2"
                         style="width: 20vw"
                    ></org>
                  </el-form-item>
                </el-col>
                <!--update center取预算单位横展 end 0404-->
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
              <el-row>
                <el-col :span="8">
                  <el-form-item :error="error" :label="$t('label.applicant')" prop="user_id">
                    <user :disabled="true" :error="error" :selectType="selectType" :userlist="userlist"
                          style="width:20vw" @getUserids="getUserids"></user>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1010FORMVIEW_DATEOFUSE')" prop="usedate">
                    <el-date-picker
                      :disabled="!disable"
                      style="width:20vw"
                      type="date"
                      v-model="form.usedate">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="30">
                  <div class="sub_color_blue">{{$t('label.PFANS1010FORMVIEW_USERNAME')}}</div>
                </el-col>
              </el-row>
              <el-row style="padding-top:1.5rem">
                <el-col :span="24">
                  <el-table :data="tableT" header-cell-class-name="sub_bg_color_blue" style="width: 72vw" border stripe>
                    <el-table-column :label="$t('label.user_name')" align="center">
                      <template slot-scope="scope">
                        <user
                          :no="scope.row"
                          :disabled="!disable"
                          @getUserids="getuserid"
                          :userlist="scope.row.user"
                          selectType="Single"
                          style="width: 90%"
                        ></user>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1010FORMVIEW_JOINREASON')" align="center">
                      <template slot-scope="scope">
                        <el-input :no="scope.row" :disabled="!disable" v-model="scope.row.reason">
                        </el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.operation')" width="200" align="center">
                      <template slot-scope="scope">
                        <el-button
                          @click.native.prevent="deleteRow1(scope.$index, tableT)"
                          type="danger"
                          size="small"
                          plain
                          :disabled="!disable"
                        >{{$t('button.delete')}}
                        </el-button>
                        <el-button
                          @click="addRow1()"
                          type="primary"
                          size="small"
                          plain
                          :disabled="!disable"
                        >{{$t('button.insert')}}
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-col>
              </el-row>
              <el-row style="padding-top:1.5rem">
                <el-col :span="8">
                  <el-form-item :label="$t('label.remarks')">
                    <el-input :disabled="!disable" type="textarea" style="width:72vw" v-model="form.remarks"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!--            </el-collapse-item>-->
              <!--          </el-collapse>-->
              <el-collapse>
                <el-collapse-item>
                  <template slot="title">
                    <span class="collapse_Title">{{$t('label.PFANS1010FORMVIEW_OPPOSITEUNIT')}}</span>
                  </template>

                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS1010FORMVIEW_COMPANYNAME')" prop="company">
                        <el-input :disabled="!disable" style="width:20vw" v-model="form.company" maxlength='50'></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row style="width: 800px" align="right">
                    <el-col :span="24">
                      <el-table :data="tableP" header-cell-class-name="sub_bg_color_blue" style="width: 46vw" border stripe>
                        <el-table-column :label="$t('label.PFANS1010FORMVIEW_PARTICIPANTS')" align="center">
                          <template slot-scope="scope">
                            <el-input :no="scope.row" :disabled="!disable" v-model="scope.row.participants">
                            </el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.operation')" width="200" align="center">
                          <template slot-scope="scope">
                            <el-button
                              @click.native.prevent="deleteRow2(scope.$index, tableP)"
                              type="danger"
                              size="small"
                              plain
                              :disabled="!disable"
                            >{{$t('button.delete')}}
                            </el-button>
                            <el-button
                              @click="addRow2()"
                              type="primary"
                              size="small"
                              plain
                              :disabled="!disable"
                            >{{$t('button.insert')}}
                            </el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-col>
                  </el-row>
                </el-collapse-item>
              </el-collapse>
              <el-collapse>
                <el-collapse-item>
                  <template slot="title">
                    <span class="collapse_Title">{{$t('label.PFANS1010FORMVIEW_AMOUNTUSED')}}</span>
                  </template>

                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS1010FORMVIEW_SCHEDULEDAMOUNT')" prop="moneys">
                        <el-input-number v-model="form.moneys"
                                         controls-position="right"
                                         :disabled="!disable"
                                         :min="0"
                                         :max="1000000000"
                                         :precision="2"
                                         style="width:20vw"
                        ></el-input-number>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS1010FORMVIEW_PERCAPITA')" prop="percapita">
                        <el-input-number v-model="form.percapita"
                                         controls-position="right"
                                         :disabled="!disable"
                                         :min="0"
                                         :max="1000000000"
                                         :precision="2"
                                         style="width:20vw"
                        ></el-input-number>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS1012FORMVIEW_BUDGET')">
                        <!--                <el-input :disabled="true" style="width:20vw" v-model="form.budgetunit" maxlength='50'></el-input>-->
                        <el-select clearable style="width: 20vw" v-model="form.budgetunit" :disabled="!disable"
                                   :placeholder="$t('normal.error_09')">
                          <el-option
                            v-for="item in options"
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
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS1010FORMVIEW_PURPOSEOFUSE')">
                        <el-input :disabled="!disable" type="textarea" style="width:72vw"
                                  v-model="form.objective"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS1010FORMVIEW_RECEPTIONPLACE')">
                        <el-input :disabled="!disable" type="textarea" style="width:72vw" v-model="form.place"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-collapse-item>
              </el-collapse>
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
    <!--    <PFANS1012Pop :params="urlparams" ref="PFANS1012Pop" :url="url"></PFANS1012Pop>-->
    <!--    <PFANS1006Pop :params="urlparams" ref="PFANS1006Pop" :url="url"></PFANS1006Pop>-->
  </div>
</template>
<script>
    import EasyNormalContainer from '@/components/EasyNormalContainer';
    import dicselect from '../../../components/dicselect.vue';
    import {Message} from 'element-ui';
    import user from '../../../components/user.vue';
    import {getOrgInfo, getOrgInfoByUserId, getStatus} from '@/utils/customize';
    import moment from 'moment';
    import org from '../../../components/org';

    export default {
    name: 'PFANS1010FormView',
    components: {
      EasyNormalContainer,
      dicselect,
      user,
        org
        // PFANS1012Pop,
        // PFANS1006Pop
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
          // update gbb 20210316 NT_PFANS_20210227_BUG_033 pop画面传值类型修改 start
          //urlparams: '',
          urlparams: {},
          // update gbb 20210316 NT_PFANS_20210227_BUG_033 pop画面传值类型修改 end
          url: '',
          activeName: 'first',
          tableA: [],
          tableB: [],
        options: [],
        workflowCode: 'W0047',
        centerid: '',
        groupid: '',
        teamid: '',
        total: 0,
        total2: 0,
        tableT: [{
          user: '',
          reason: '',
        }],
        tableP: [{
          participants: '',
        }],
        error: '',
        loading: false,
        disableview: false,
        selectType: 'Single',
        title: 'title.PFANS1010VIEW',
        buttonList: [],
        editableTabsValue: '0',
        editableTabs: [],
        tabIndex: 0,
        multiple: false,
          checkGro: false,
        userlist: '',
        form: {
          center_id: '',
          group_id: '',
          team_id: '',
          user_id: '',
          reason: '',
          participants: '',
          remarks: '',
          usedate: moment(new Date()).format('YYYY-MM-DD'),
          company: '',
          moneys: '',
          percapita: '',
          budgetunit: '',
          objective: '',
          place: '',
          nodeList: [],
        },
        code1: 'PG001',
        menuList: [],
        disabled: false,
        rules: {
          user_id: [{
            required: true,
            validator: validateUserid,
            trigger: 'change',
          }],
          usedate: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS1010FORMVIEW_DATEOFUSE'),
            trigger: 'change',
          }],
          company: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1010FORMVIEW_COMPANYNAME'),
            trigger: 'change',
          }],
          moneys: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1010FORMVIEW_SCHEDULEDAMOUNT'),
            trigger: 'change',
          }],
          percapita: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1010FORMVIEW_PERCAPITA'),
            trigger: 'change',
          }],
        },
        canStart: false,
      };
    },
    created() {
        // this.$store.commit('global/SET_WORKFLOWURL', '/PFANS1010FormView');
      this.disable = this.$route.params.disabled;
      this.disableview = this.$route.params._disableview;
      if (this.disable) {
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
    mounted() {
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1010Store/getCommunicationOne', {'communication_id': this.$route.params._id})
          .then(response => {
            if (response != undefined) {
              this.form = response;
              // update center取预算单位横展 start
              // let rst = getOrgInfoByUserId(response.user_id);
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
              this.userlist = this.form.user_id;
              this.getBudt(this.form.center_id);
              // update center取预算单位横展 end
              let lettableT = [];
              let letreason = response.reason.split(';');
              if (letreason.length > 0) {
                for (var i = 0; i <= letreason.length - 1; i++) {
                  let letuser = letreason[i].split(',');
                  lettableT.push({
                    user: letuser[0],
                    reason: letuser[1],
                  });
                }
              }
              let lettableP = [];
              let letresponse = response.participants.split(';');
              if (letresponse.length > 0) {
                for (var i = 0; i <= letresponse.length - 1; i++) {
                  lettableP.push({
                    participants: letresponse[i],
                  });
                }
              }
              this.tableT = lettableT;
              this.tableP = lettableP;
              this.form = response;
            }
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
          this.form.user_id = this.$store.getters.userinfo.userid;
          let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
          if (rst) {
            this.centerid = rst.centerNmae;
            this.groupid = rst.groupNmae;
            this.teamid = rst.teamNmae;
            this.form.center_id = rst.centerId;
            // update center取预算单位横展 start
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
            // update center取预算单位横展 end
          }
          // if(getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId)){
          //     this.form.budgetunit = getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId).encoding;
          // }
        }
      }
    },
    methods: {
      // update center取预算单位横展 start 0404
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
      //add_fjl_0927
      getCenterid(val) {
        this.form.center_id = val;
        this.form.budgetnumber = '';
        this.getBudt(val);
        if(val === ""){
          this.form.group_id = "";
        }
      },
      getGroupId(val) {
        this.form.group_id = val;
        this.form.budgetnumber = '';
        if(val != ""){
          this.getOrgInformation(val);
          this.getBudt(val);
        }else{
          this.getBudt(this.form.center_id);
        }
      },
      // update center取预算单位横展 end 0404
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
                    _fromname: 'PFANS1010FormView',
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
                    _fromname: 'PFANS1010FormView',
                },
            });
            // this.url = '';
            // this.urlparams = '';
            // this.url = 'PFANS1012FormView';
            // this.urlparams = {'_id': row.publicexpense_id, 'disabled': false};
            // this.$refs.PFANS1012Pop.open = true;
        },
        //add_fjl_0806  查看详情
      // update center取预算单位横展 end start
      getBudt(val) {
          this.options = [];
          if (val === '' || val === null) {
              return;
          }
        //ADD_FJL  修改人员预算编码
          // if (getOrgInfo(getOrgInfoByUserId(val).groupId)) {
          if(getOrgInfo(val)){
              let butinfo = (getOrgInfo(val).encoding).substring(0,3);
              let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'JY002');
              if (dic.length > 0) {
                  for (let i = 0; i < dic.length; i++) {
                      if (butinfo === (dic[i].value1).substring(0,3)) {
                          this.options.push({
                              lable: dic[i].value2 + '_' + dic[i].value3,
                              value: dic[i].code,
                          });
                      }
                  }
              }
            if(this.options.length === 0) {
              if (getOrgInfo(this.form.group_id)) {
                let butinfo = (getOrgInfo(this.form.group_id).encoding).substring(0, 3);
                let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'JY002');
                if (dic.length > 0) {
                  for (let i = 0; i < dic.length; i++) {
                    if (butinfo === (dic[i].value1).substring(0,3)) {
                      this.options.push({
                        lable: dic[i].value2 + '_' + dic[i].value3,
                        value: dic[i].code,
                      });
                    }
                  }
                }
              }
            }
          }
        // update center取预算单位横展 end 0404
          // }
        //ADD_FJL  修改人员预算编码
      },
      changeBut(val) {
        this.form.budgetunit = val;
      },
      deleteRow1(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        } else {
          this.tableT = [{
            user: '',
            reason: '',
          }];
        }
      },
      deleteRow2(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        } else {
          this.tableP = [{
            participants: '',
          }];
        }
      },
      addRow1() {
        this.tableT.push({
          user: '',
          reason: '',
        });
      },
      addRow2() {
        this.tableP.push({
          participants: '',
        });
      },
      getuserid(userlist, row) {
        row.user = userlist;
      },
      getUserids(val) {
        this.form.user_id = val;
        this.userlist = val;
        let rst = getOrgInfoByUserId(val);
        // if(getOrgInfo(getOrgInfoByUserId(val).groupId)){
        //     this.form.budgetunit = getOrgInfo(getOrgInfoByUserId(val).groupId).encoding;
        // }
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
      //add-ws-5-20-流程恒展开
      start(val) {
        if (val.state === '0') {
          this.form.status = '2';
        } else if (val.state === '2') {
          this.form.status = '4';
        }
        this.buttonClick('update');
      },
      //add-ws-5-20-流程恒展开
      end() {
        this.form.status = '0';
        this.buttonClick('update');
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
            title: 10,
          },
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
      buttonClick(val) {
        if (val === 'back') {
          //add-ws-4/28-精算中，点击决裁，跳转画面
          if (this.$route.params._check != null && this.$route.params._check != '' && this.$route.params._check != undefined) {
            if (this.$route.params._check) {
              this.checkparamsTitle();
            }
          } else if (this.$route.params._check3 != null && this.$route.params._check3 != '' && this.$route.params._check3 != undefined) {
            if (this.$route.params._check3) {
              this.checkparams();
            }
          } else {
            this.paramsTitle();
          }
          //add-ws-4/28-精算中，点击决裁，跳转画面
        } else {
          this.$refs['refform'].validate(valid => {
            if (valid) {
              this.loading = true;
              let letreason = '';
              for (let i = 0; i <= this.tableT.length - 1; i++) {
                if (this.tableT[i].user.trim() === '' && this.tableT[i].reason === '') {
                  letreason = '';
                } else {
                  letreason = letreason + this.tableT[i].user + ',' + this.tableT[i].reason + ';';
                }
              }
              if (letreason) {
                letreason = letreason.substring(0, letreason.length - 1).replace('undefined', '').trim();
                if (letreason.replace(';', '').replace('undefined', '').replace(',', '').trim() === '') {
                  letreason = '';
                }
                this.form.reason = letreason;
              }
              let letparticipants = '';
              for (var j = 0; j <= this.tableP.length - 1; j++) {
                if (this.tableP[j].participants.trim() != '') {
                  letparticipants = letparticipants + this.tableP[j].participants + ';';
                }
              }
              letparticipants = letparticipants.substring(0, letparticipants.length - 1);
              if (this.form.participants.replace(';', '').trim() === '') {
                this.form.participants = '';
              }
              this.form.participants = letparticipants;
              let error = 0;
              if (this.form.moneys === 0) {
                error = error + 1;
                Message({
                  message: this.$t('label.PFANS1010FORMVIEW_SCHEDULEDAMOUNT') + this.$t('label.PFANS1004FORMVIEW_ERROR'),
                  type: 'error',
                  duration: 5 * 1000,
                });
                this.loading = false;
              }
              if (error === 0) {
                if (this.$route.params._id) {
                  this.form.communication_id = this.$route.params._id;
                  this.$store
                    .dispatch('PFANS1010Store/updateCommunication', this.form)
                    .then(response => {
                      this.data = response;
                      this.loading = false;
                      if (val !== 'update') {
                        Message({
                          message: this.$t('normal.success_02'),
                          type: 'success',
                          duration: 5 * 1000,
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
                  this.loading = true;
                  this.$store
                    .dispatch('PFANS1010Store/createCommunication', this.form)
                    .then(response => {
                      this.data = response;
                      this.loading = false;
                      Message({
                        message: this.$t('normal.success_01'),
                        type: 'success',
                        duration: 5 * 1000,
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

<style lang="scss" rel="stylesheet/scss">

</style>
