<template>
  <div style="min-height: 100%">
    <EasyNormalContainer ref="container" v-loading="loading" :buttonList="buttonList" :canStart="canStart"
                         :enableSave="enableSave" :title="title" :workflowCode="workflowCode"
                         @buttonClick="buttonClick" @end="end" @start="start" @workflowState="workflowState">
      <div slot="customize">
        <el-form ref="refform" :model="form" :rules="rules" label-position="top" label-width="8vw"
                 style="padding:3vw">
          <!--//start(添加角色权限，只有IT担当的人才可以进行受理)  ztc 2020/05/09-->
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1016FORMVIEW_CORRESPONDING')" prop='corresponding'>
                <span style="margin-right: 1vw ">{{ $t('label.PFANS1016FORMVIEW_INCOMPLETE') }}</span>
                <el-switch
                  v-model="form.corresponding"
                  :disabled="acceptShow"
                  active-value="1"
                  inactive-value="0"
                  @change="getcorresponding"
                ></el-switch>
                <span style="margin-left: 1vw ">{{ $t('label.PFANS1016FORMVIEW_COMPLETE') }}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <!--//end(添加角色权限，只有IT担当的人才可以进行受理)  ztc 2020/05/09-->
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.center')">
                <el-input v-model="centerid" :disabled="true" style="width:20vw"></el-input>
                <el-input v-show='false' v-model="form.center_id" :disabled="false" style="width:20vw"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')">
                <el-input v-model="groupid" :disabled="true" style="width:20vw"></el-input>
                <el-input v-show='false' v-model="form.group_id" :disabled="false" style="width:20vw"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')">
                <el-input v-model="teamid" :disabled="true" style="width:20vw"></el-input>
                <el-input v-show='false' v-model="form.team_id" :disabled="false" style="width:20vw"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.applicant')" prop="user_id">
                <user v-model="form.user_id"
                      :disabled="true"
                      :error="error"
                      :selectType="selectType"
                      :userlist="userlist"
                      style="width:20vw"
                      @getUserids="getUserids"
                ></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.pfanstype')">
                <el-input v-model="form.type"
                          :disabled="true"
                          maxlength='36'
                          style="width:20vw"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1016FORMVIEW_TYPESOF')" prop="typesof">
                <dicselect :code="code1"
                           :data="form.typesof"
                           :disabled="!disable"
                           :multiple="multiple"
                           style="width:20vw"
                           @change="changetypesof">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1016FORMVIEW_OPERATIONTYPE')" prop="operationtype">
                <dicselect :code="code2"
                           :data="form.operationtype"
                           :disabled="!disable"
                           :multiple="multiple"
                           style="width:20vw"
                           @change="changeoperationtype">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.application')" prop="payment">
                <el-date-picker v-model="form.payment"
                                :disabled="true"
                                style="width:20vw"
                                type="date"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.email')" prop="email">
                <el-input v-model="form.email"
                          :disabled="!disable"
                          maxlength="100"
                          style="width:20vw"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3001VIEW_EXTENSIONNUMBER')" prop="extension">
                <el-input v-model="form.extension"
                          :disabled="!disable"
                          maxlength="20"
                          style="width:20vw"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1016FORMVIEW_MANAGER')">
                <user v-model="form.manager"
                      :disabled="!disable"
                      :selectType="selectType"
                      :userlist="managerlist"
                      style="width:20vw"
                      @getUserids="getManager"
                ></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANSUSERFORMVIEW_PERIOD')" prop="duringdate">
                <el-date-picker
                  v-model="form.duringdate"
                  :disabled="!disable"
                  :end-placeholder="$t('label.enddate')"
                  :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                  :start-placeholder="$t('label.startdate')"
                  class="bigWidth"
                  style="width:20vw"
                  type="daterange"
                  unlink-panels>
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1016FORMVIEW_REASON')" prop="reason">
                <el-input v-model="form.reason" :disabled="!disable" :rows="2" style="width:71.4vw" type="textarea">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="padding-top:1.5rem">
            <el-col :span="24">
              <el-table :data="tableT" border header-cell-class-name="sub_bg_color_blue" stripe style="width: 72vw">
                <el-table-column :label="$t('label.PFANS1016FORMVIEW_sourceipgroup')" align="center" width="200">
                  <template slot-scope="scope">
                    <!--                  <dicselect-->
                    <!--                    :no="scope.row"-->
                    <!--                    :code="code3"-->
                    <!--                    :data="scope.row.sourceipgroup"-->
                    <!--                    :disabled="!disable"-->
                    <!--                    :multiple="multiple"-->
                    <!--                    @change="changesourceipgroup"-->
                    <!--                    style="width: 100%"-->
                    <!--                  ></dicselect>-->
                    <org :disabled="false" :no="scope.row" :orglist="scope.row.sourceipgroup" orgtype="2"
                         style="width:90%" @getOrgids="getTgroup"></org>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1016FORMVIEW_SOURCEIPADDRESS')" align="center" width="300">
                  <template slot-scope="scope">
                    <div style="width: 100%;float:left">
                      <div style="width: 70%;float: left">
                        <el-input v-model="scope.row.sourceipaddresstest" :disabled="!disable" :no="scope.row">
                        </el-input>
                      </div>
                      <div style="width: 30%;float: right;margin-top:0.25rem">
                        <el-button
                          :disabled="!disable"
                          :no="scope.row"
                          plain
                          size="small"
                          type="primary"
                          @click="addSourceipaddress(scope.$index,tableT)"
                        >{{ $t('button.appends') }}
                        </el-button>
                      </div>
                    </div>
                    <el-input v-model="scope.row.sourceipaddress" :disabled="!disable" style="width: 100%; padding-top:1rem"
                              type="textarea">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1016FORMVIEW_COMMUNICATION')" align="center" width="130">
                  <template slot-scope="scope">
                    <dicselect
                      :code="code4"
                      :data="scope.row.communication"
                      :disabled="!disable"
                      :multiple="multiple"
                      :no="scope.row"
                      style="width: 100%"
                      @change="changecommunication"
                    ></dicselect>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1016FORMVIEW_DESTINATIONIPGROUP')" align="center" width="200">
                  <template slot-scope="scope">
                    <!--                  <dicselect-->
                    <!--                    :no="scope.row"-->
                    <!--                    :code="code3"-->
                    <!--                    :data="scope.row.destinationipgroup"-->
                    <!--                    :disabled="!disable"-->
                    <!--                    :multiple="multiple"-->
                    <!--                    @change="changedestinationipgroup"-->
                    <!--                    style="width: 100%"-->
                    <!--                  ></dicselect>-->
                    <org :disabled="false" :no="scope.row" :orglist="scope.row.destinationipgroup"
                         orgtype="2"
                         style="width:90%" @getOrgids="getWTgroup"></org>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1016FORMVIEW_DESTINATIONIPADDRESS')" align="center" width="300">
                  <template slot-scope="scope">
                    <div style="width: 100%;float:left">
                      <div style="width: 70%;float: left">
                        <el-input v-model="scope.row.destinationipaddresstest" :disabled="!disable" :no="scope.row">
                        </el-input>
                      </div>
                      <div style="width: 30%;float: right;margin-top:0.25rem">
                        <el-button
                          :disabled="!disable"
                          :no="scope.row"
                          plain
                          size="small"
                          type="primary"
                          @click="addDestinationipaddress(scope.$index,tableT)"
                        >{{ $t('button.appends') }}
                        </el-button>
                      </div>
                    </div>
                    <el-input v-model="scope.row.destinationipaddress" :disabled="!disable" style="width: 100%; padding-top:1rem"
                              type="textarea">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1016FORMVIEW_PROTOCOL')" align="center" width="300">
                  <template slot-scope="scope">
                    <div style="width: 100%;float:left">
                      <div style="width: 70%;float: left">
                        <el-input v-model="scope.row.protocoltest" :disabled="!disable" :no="scope.row">
                        </el-input>
                      </div>
                      <div style="width: 30%;float: right;margin-top:0.25rem">
                        <el-button
                          :disabled="!disable"
                          :no="scope.row"
                          plain
                          size="small"
                          type="primary"
                          @click="addProtocol(scope.$index,tableT)"
                        >{{ $t('button.appends') }}
                        </el-button>
                      </div>
                    </div>
                    <el-input v-model="scope.row.protocol" :disabled="!disable" style="width: 100%; padding-top:1rem"
                              type="textarea">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.operation')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-button
                      :disabled="!disable"
                      plain
                      size="small"
                      type="danger"
                      @click.native.prevent="deleteRow(scope.$index, tableT)"
                    >{{ $t('button.delete') }}
                    </el-button>
                    <el-button
                      :disabled="!disable"
                      plain
                      size="small"
                      type="primary"
                      @click="addRow()"
                    >{{ $t('button.insert') }}
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
import dicselect from '../../../components/dicselect.vue';
import {Message} from 'element-ui';
import user from '../../../components/user.vue';
import org from '../../../components/org';
import {getCurrentRole, getCurrentRole4, getOrgInfoByUserId} from '@/utils/customize';
import {validateEmail} from '@/utils/validate';
import moment from 'moment';

export default {
  name: 'PFANS1016FormView',
  components: {
    EasyNormalContainer,
    dicselect,
    org,
    user,
  },
  data() {
    var validateUserid = (rule, value, callback) => {
      if (!value || value === '' || value === 'undefined') {
        callback(new Error(this.$t('normal.error_09') + this.$t('label.applicant')));
        this.error = this.$t('normal.error_09') + this.$t('label.applicant');
      } else {
        callback();
        this.error = '';
      }
    };
    var checkemail = (rule, value, callback) => {
      if (this.form.email !== null && this.form.email !== '') {
        if (!validateEmail(value)) {
          callback(new Error(this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.email')));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    return {
      errorgroup: '',
      centerid: '',
      groupid: '',
      teamid: '',
      workflowCode: '',
      buttonList: [],
      baseInfo: {},
      loading: false,
      userlist: '',
      managerlist: '',
      duringdate: '',
      //start(添加角色权限，只有IT担当的人才可以进行受理)  ztc 2020/05/09
      acceptShow: 'true',
      enableSave: false,
      //end(添加角色权限，只有IT担当的人才可以进行受理)  ztc 2020/05/09
      multiple: false,
      selectType: 'Single',
      error: '',
      title: 'title.PFANS1016VIEW',
      form: {
        center_id: '',
        group_id: '',
        team_id: '',
        user_id: '',
        type: this.$t('menu.PFANS1016'),
        typesof: '',
        operationtype: '',
        //start(添加角色权限，只有IT担当的人才可以进行受理)  ztc 2020/05/09
        corresponding: '',
        //end(添加角色权限，只有IT担当的人才可以进行受理)  ztc 2020/05/09
        payment: moment(new Date()).format('YYYY-MM-DD'),
        email: '',
        extension: '',
        manager: '',
        reason: '',
        duringdate: [],
      },
      tableT: [{
        routingdetail_id: '',
        sourceipgroup: '',
        tgroup: '',
        sourceipaddresstest: '',
        sourceipaddress: '',
        communication: '',
        destinationipgroup: '',
        destinationipaddress: '',
        destinationipaddresstest: '',
        protocol: '',
        protocoltest: '',
      }],
      code1: 'PJ042',
      code2: 'PJ043',
      code3: 'PJ048',
      code4: 'PJ047',
      disabled: false,
      rules: {
        user_id: [{
          required: true,
          validator: validateUserid,
          trigger: 'change',
        }],
        typesof: [{
          required: true,
          message: this.$t('normal.error_09') + this.$t('label.PFANS1016FORMVIEW_TYPESOF'),
          trigger: 'change',
        }],
        operationtype: [{
          required: true,
          message: this.$t('normal.error_09') + this.$t('label.PFANS1016FORMVIEW_OPERATIONTYPE'),
          trigger: 'change',
        }],
        payment: [{
          required: true,
          message: this.$t('normal.error_09') + this.$t('label.application'),
          trigger: 'blur',
        }],
        email: [
          {validator: checkemail, trigger: 'blur'}],
        extension: [
          {
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS3001VIEW_EXTENSIONNUMBER'), trigger: 'blur',
          }],
        reason: [{
          required: true,
          message: this.$t('normal.error_08') + this.$t('label.PFANS1016FORMVIEW_REASON'),
          trigger: 'blur',
        }],
        duringdate: [{
          required: true,
          message: this.$t('normal.error_09') + this.$t('label.PFANSUSERFORMVIEW_PERIOD'),
          trigger: 'blur',
        }],
      },
      canStart: false,
    };
  },
  created() {
    this.disable = this.$route.params.disabled;
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
        .dispatch('PFANS1016Store/selectById', {'routing_id': this.$route.params._id})
        .then(response => {
          if (this.form.status === '2') {
            this.disable = false;
          }
          this.userlist = response.user_id;
          let rst = getOrgInfoByUserId(response.routing.user_id);
          if (rst) {
            this.centerid = rst.centerNmae;
            this.groupid = rst.groupNmae;
            this.teamid = rst.teamNmae;
          }
          this.form = response.routing;
          let roleLC = getCurrentRole();
          if (roleLC == '1') {
            this.workflowCode = 'W0102';//总经理流程
            // } else if(roleLC == '2' || roleLC == '3') { //GM Center
            //   this.workflowCode = 'W0119'//新流程
          } else { //TL 正式员工
            this.workflowCode = 'W0023';
          }
          let duringdate = response.routing.duringdate;
          let serdate = duringdate.slice(0, 10);
          let serdate1 = duringdate.slice(duringdate.length - 10);
          this.form.duringdate = [serdate, serdate1];
          if (response.routingdetail.length > 0) {
            this.tableT = response.routingdetail;
          }
          //start(添加角色权限，只有IT担当的人才可以进行受理)  ztc 2020/05/09
          let role = getCurrentRole4();
          if (role === '0') {
            if (this.form.status === '4') {
              this.enableSave = true;
              if (this.disable) {
                this.acceptShow = false;
              } else {
                this.acceptShow = true;
              }
            } else {
              this.acceptShow = true;
              this.enableSave = false;
            }
          }
          //end(添加角色权限，只有IT担当的人才可以进行受理)  ztc 2020/05/09
          this.managerlist = this.form.manager;
          this.userlist = this.form.user_id;
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
          this.form.group_id = rst.groupId;
          this.form.team_id = rst.teamId;
        }
      }
    }
  },
  methods: {

    getTgroup(val, row) {
      row.sourceipgroup = val;

    },
    // <!--//start(添加角色权限，只有IT担当的人才可以进行受理)  ztc 2020/05/09-->
    getcorresponding(val) {
      this.form.corresponding = val;
    },
    //<!--//start(添加角色权限，只有IT担当的人才可以进行受理)  ztc 2020/05/09-->
    getWTgroup(val, row) {
      row.destinationipgroup = val;
    },
    addSourceipaddress(index, rows) {
      if (rows[index].sourceipaddress === '') {
        rows[index].sourceipaddress = rows[index].sourceipaddresstest;
      } else {
        rows[index].sourceipaddress = rows[index].sourceipaddress + ';' + rows[index].sourceipaddresstest;
      }
    },
    addDestinationipaddress(index, rows) {
      if (rows[index].destinationipaddress === '') {
        rows[index].destinationipaddress = rows[index].destinationipaddresstest;
      } else {
        rows[index].destinationipaddress = rows[index].destinationipaddress + ';' + rows[index].destinationipaddresstest;
      }
    },
    addProtocol(index, rows) {
      if (rows[index].protocol === '') {
        rows[index].protocol = rows[index].protocoltest;
      } else {
        rows[index].protocol = rows[index].protocol + ';' + rows[index].protocoltest;
      }
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
    getManager(val) {
      this.form.manager = val;
      this.managerlist = val;
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
      // this.form.status = '2';
      this.buttonClick('update');
    },
    end() {
      this.form.status = '0';
      this.buttonClick('update');
    },
    changetypesof(val) {
      this.form.typesof = val;
    },
    changeoperationtype(val) {
      this.form.operationtype = val;
    },
    changesourceipgroup(val, row) {
      row.sourceipgroup = val;
    },
    changecommunication(val, row) {
      row.communication = val;
    },
    changedestinationipgroup(val, row) {
      row.destinationipgroup = val;
    },
    deleteRow(index, rows) {
      if (rows.length > 1) {
        rows.splice(index, 1);
      } else {
        this.tableT = [{
          routing_id: '',
          routingdetail_id: '',
          sourceipgroup: ' ',
          sourceipaddresstest: '',
          sourceipaddress: '',
          communication: ' ',
          destinationipgroup: ' ',
          destinationipaddress: '',
          destinationipaddresstest: '',
          protocol: '',
          Protocoltest: '',
        }];
      }
    },
    addRow() {
      this.tableT.push({
        routing_id: '',
        routingdetail_id: '',
        sourceipgroup: '',
        sourceipaddresstest: '',
        sourceipaddress: '',
        communication: '',
        destinationipgroup: '',
        destinationipaddress: '',
        destinationipaddresstest: '',
        protocol: '',
        Protocoltest: '',
      });
    },
    buttonClick(val) {
      this.$refs['refform'].validate(valid => {
        if (valid) {
          this.loading = true;
          this.form.duringdate = moment(this.form.duringdate[0]).format('YYYY-MM-DD') + ' ~ ' + moment(this.form.duringdate[1]).format('YYYY-MM-DD');
          this.baseInfo = {};
          this.form.payment = moment(this.form.payment).format('YYYY-MM-DD');
          this.baseInfo.routing = JSON.parse(JSON.stringify(this.form));
          this.baseInfo.routingdetail = [];
          for (let i = 0; i < this.tableT.length; i++) {
            if (this.tableT[i].sourceipgroup !== '' || this.tableT[i].sourceipaddress !== '' || this.tableT[i].communication !== '' ||
              this.tableT[i].destinationipgroup !== '' || this.tableT[i].destinationipaddress !== '' || this.tableT[i].protocol !== '') {
              this.baseInfo.routingdetail.push(
                {
                  routingdetail_id: this.tableT[i].routingdetail_id,
                  routing_id: this.tableT[i].routing_id,
                  sourceipgroup: this.tableT[i].sourceipgroup,
                  sourceipaddress: this.tableT[i].sourceipaddress,
                  communication: this.tableT[i].communication,
                  destinationipgroup: this.tableT[i].destinationipgroup,
                  destinationipaddress: this.tableT[i].destinationipaddress,
                  protocol: this.tableT[i].protocol,
                },
              );
            }
          }
          if (this.$route.params._id) {
            this.form.routing_id = this.$route.params._id;
            this.$store
              .dispatch('PFANS1016Store/update', this.baseInfo)
              .then(response => {
                this.data = response;
                this.loading = false;
                if (val !== 'update') {
                  Message({
                    message: this.$t('normal.success_02'),
                    type: 'success',
                    duration: 5 * 1000,
                  });
                  if (this.$store.getters.historyUrl) {
                    this.$router.push(this.$store.getters.historyUrl);
                  }
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
              .dispatch('PFANS1016Store/insert', this.baseInfo)
              .then(response => {
                this.data = response;
                this.loading = false;
                Message({
                  message: this.$t('normal.success_01'),
                  type: 'success',
                  duration: 5 * 1000,
                });
                if (this.$store.getters.historyUrl) {
                  this.$router.push(this.$store.getters.historyUrl);
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
          }
        } else {
          Message({
            message: this.$t('normal.error_12'),
            type: 'error',
            duration: 5 * 1000,
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
