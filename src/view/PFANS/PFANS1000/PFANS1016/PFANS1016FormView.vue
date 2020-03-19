<template>
  <div style="min-height: 100%">`
    <EasyNormalContainer :buttonList="buttonList" :title="title" @buttonClick="buttonClick" ref="container"
                         @workflowState="workflowState"  v-loading="loading"
                         :canStart="canStart" @start="start" @end="end">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="refform"
                 style="padding:2vw">
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.center')">
                <el-input :disabled="true" style="width:20vw" v-model="form.center_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')">
                <el-input :disabled="true" style="width:20vw" v-model="form.group_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')">
                <el-input :disabled="true" style="width:20vw" v-model="form.team_id"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.applicant')" prop="user_id">
                <user :disabled="!disable"
                      :error="error"
                      :selectType="selectType"
                      :userlist="userlist"
                      @getUserids="getUserids"
                      style="width:20vw"
                      v-model="form.user_id"
                ></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.pfanstype')">
                <el-input :disabled="true"
                          style="width:20vw"
                          v-model="form.type"
                          maxlength='36'
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1016FORMVIEW_TYPESOF')" prop="typesof">
                <dicselect :code="code1"
                           :data="form.typesof"
                           :disabled="!disable"
                           :multiple="multiple"
                           @change="changetypesof"
                           style="width:20vw">
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
                           @change="changeoperationtype"
                           style="width:20vw">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.application')" prop="payment">
                <el-date-picker :disabled="!disable"
                                style="width:20vw"
                                type="date"
                                v-model="form.payment"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.email')" prop="email">
                <el-input :disabled="!disable"
                          maxlength="20"
                          style="width:20vw"
                          v-model="form.email"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3001VIEW_EXTENSIONNUMBER')" prop="extension">
                <el-input :disabled="!disable"
                          style="width:20vw"
                          v-model="form.extension"
                          maxlength="20"
                ></el-input></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1016FORMVIEW_MANAGER')" >
                <user :disabled="!disable"
                      :selectType="selectType"
                      :userlist="managerlist"
                      @getUserids="getManager"
                      style="width:20vw"
                      v-model="form.manager"
                ></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANSUSERFORMVIEW_PERIOD')" prop="duringdate">
                <el-date-picker
                  v-model="form.duringdate"
                  class="bigWidth"
                  :disabled="!disable"
                  type="daterange"
                  unlink-panels
                  style="width:20vw"
                  :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                  :start-placeholder="$t('label.startdate')"
                  :end-placeholder="$t('label.enddate')"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
                <el-form-item :label="$t('label.PFANS1016FORMVIEW_REASON')" prop="reason">
                  <el-input :disabled="!disable" :rows="2" type="textarea" style="width:71.4vw" v-model="form.reason">
                  </el-input>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row style="padding-top:1.5rem" >
            <el-col :span="24">
            <el-table :data="tableT" stripe border header-cell-class-name="sub_bg_color_blue" style="width: 72vw">
              <el-table-column :label="$t('label.PFANS1016FORMVIEW_sourceipgroup')" align="center"  width="150">
                <template slot-scope="scope">
                  <dicselect
                    :no="scope.row"
                    :code="code3"
                    :data="scope.row.sourceipgroup"
                    :disabled="!disable"
                    :multiple="multiple"
                    @change="changesourceipgroup"
                    style="width: 100%"
                  ></dicselect>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1016FORMVIEW_SOURCEIPADDRESS')" align="center"  width="300">
                <template slot-scope="scope">
                  <div style="width: 100%;float:left">
                    <div style="width: 70%;float: left">
                      <el-input :disabled="!disable" :no="scope.row" v-model="scope.row.sourceipaddresstest" >
                      </el-input>
                    </div>
                    <div style="width: 30%;float: right;margin-top:0.25rem">
                      <el-button
                        :no="scope.row"
                        @click="addSourceipaddress(scope.$index,tableT)"
                        plain
                        size="small"
                        type="primary"
                        :disabled="!disable"
                      >{{$t('button.appends')}}
                      </el-button>
                    </div>
                  </div>
                  <el-input :disabled="!disable" type="textarea" v-model="scope.row.sourceipaddress" style="width: 100%; padding-top:1rem">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1016FORMVIEW_COMMUNICATION')" align="center"  width="130">
                <template slot-scope="scope">
                  <dicselect
                    :no="scope.row"
                    :code="code4"
                    :data="scope.row.communication"
                    :disabled="!disable"
                    :multiple="multiple"
                    @change="changecommunication"
                    style="width: 100%"
                  ></dicselect>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1016FORMVIEW_DESTINATIONIPGROUP')" align="center"  width="150">
                <template slot-scope="scope">
                  <dicselect
                    :no="scope.row"
                    :code="code3"
                    :data="scope.row.destinationipgroup"
                    :disabled="!disable"
                    :multiple="multiple"
                    @change="changedestinationipgroup"
                    style="width: 100%"
                  ></dicselect>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1016FORMVIEW_DESTINATIONIPADDRESS')" align="center"  width="300">
                <template slot-scope="scope">
                  <div style="width: 100%;float:left">
                    <div style="width: 70%;float: left">
                      <el-input :disabled="!disable" :no="scope.row" v-model="scope.row.destinationipaddresstest" >
                      </el-input>
                    </div>
                    <div style="width: 30%;float: right;margin-top:0.25rem">
                      <el-button
                        :no="scope.row"
                        @click="addDestinationipaddress(scope.$index,tableT)"
                        plain
                        :disabled="!disable"
                        size="small"
                        type="primary"
                      >{{$t('button.appends')}}
                      </el-button>
                    </div>
                  </div>
                  <el-input :disabled="!disable" type="textarea" v-model="scope.row.destinationipaddress" style="width: 100%; padding-top:1rem">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1016FORMVIEW_PROTOCOL')" align="center"  width="300">
                <template slot-scope="scope">
                  <div style="width: 100%;float:left">
                    <div style="width: 70%;float: left">
                      <el-input :disabled="!disable" :no="scope.row" v-model="scope.row.protocoltest" >
                      </el-input>
                    </div>
                    <div style="width: 30%;float: right;margin-top:0.25rem">
                      <el-button
                        :no="scope.row"
                        @click="addProtocol(scope.$index,tableT)"
                        plain
                        size="small"
                        type="primary"
                        :disabled="!disable"
                      >{{$t('button.appends')}}
                      </el-button>
                    </div>
                  </div>
                  <el-input :disabled="!disable" type="textarea" v-model="scope.row.protocol" style="width: 100%; padding-top:1rem">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.operation')" align="center" width="200">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="deleteRow(scope.$index, tableT)"
                    type="danger"
                    size="small"
                    plain
                    :disabled="!disable"
                  >{{$t('button.delete')}}
                  </el-button>
                  <el-button
                    @click="addRow()"
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
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>
<script>
  import EasyNormalContainer from "@/components/EasyNormalContainer";
  import dicselect from "../../../components/dicselect.vue";
  import {Message} from 'element-ui'
  import user from "../../../components/user.vue";
  import {getOrgInfoByUserId} from '@/utils/customize'
  import {telephoneNumber,validateEmail} from '@/utils/validate';
  import moment from "moment";

  export default {
    name: 'PFANS1016FormView',
    components: {
      EasyNormalContainer,
      dicselect,
      user
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
        pickerOptions: {
          shortcuts: [{
            text: this.$t('label.PFANS1016FORMVIEW_WEEKEND'),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text:this.$t('label.PFANS1016FORMVIEW_MONTH'),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text:this.$t('label.PFANS1016FORMVIEW_THREEMONTH'),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        buttonList: [],
        baseInfo: {},
        loading: false,
        userlist: "",
        managerlist: "",
        duringdate: '',
        multiple: false,
        selectType: "Single",
        error: '',
        title: "title.PFANS1016VIEW",
        form: {
          center_id: '',
          group_id: '',
          team_id: '',
          user_id: '',
          type: this.$t('menu.PFANS1016'),
          typesof: '',
          operationtype: '',
          payment: moment(new Date()).format("YYYY-MM-DD"),
          email: '',
          extension: '',
          manager: '',
          reason: '',
          duringdate: [],
        },
        tableT: [{
          routingdetail_id: '',
          sourceipgroup: '',
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
            trigger: "change"
          }],
          operationtype: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS1016FORMVIEW_OPERATIONTYPE'),
            trigger: "change"
          }],
          payment: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.application'),
            trigger: "blur"
          }],
          email: [
            {validator: checkemail, trigger: 'blur'}],
          extension: [
            {   required: true,
                message: this.$t('normal.error_08') + this.$t('label.PFANS3001VIEW_EXTENSIONNUMBER'), trigger: 'blur'}],
          reason: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1016FORMVIEW_REASON'),
            trigger: "blur"
          }],
          duringdate: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANSUSERFORMVIEW_PERIOD'),
            trigger: "blur"
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
            key: "save",
            name: "button.save",
            disabled: false,
            icon: "el-icon-check"
          }
        ];
      }
    },
    mounted() {
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1016Store/selectById', {"routing_id": this.$route.params._id})
          .then(response => {
            if (this.form.status === '2') {
              this.disable = false;
            }
            this.userlist = response.user_id;
            this.form = response.routing;
            let duringdate = response.routing.duringdate;
            let serdate = duringdate.slice(0, 10);
            let serdate1 = duringdate.slice(duringdate.length - 10);
            this.form.duringdate = [serdate, serdate1];
            if (response.routingdetail.length > 0) {
              this.tableT = response.routingdetail;
            }
            this.managerlist = this.form.manager;
            this.userlist = this.form.user_id;
            this.loading = false;
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000
            });
            this.loading = false
          })
      } else {
        this.userlist = this.$store.getters.userinfo.userid;
        if (this.userlist !== null && this.userlist !== '') {
          this.form.user_id = this.$store.getters.userinfo.userid;
          let lst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
          this.form.center_id = lst.centerNmae;
          this.form.group_id = lst.groupNmae;
          this.form.team_id = lst.teamNmae;
        }
      }
    },
    methods: {
      addSourceipaddress(index, rows){
        if(rows[index].sourceipaddress === ""){
          rows[index].sourceipaddress = rows[index].sourceipaddresstest;
        }
        else{
          rows[index].sourceipaddress = rows[index].sourceipaddress + ";" + rows[index].sourceipaddresstest;
        }
      },
      addDestinationipaddress(index, rows){
        if(rows[index].destinationipaddress === ""){
          rows[index].destinationipaddress = rows[index].destinationipaddresstest;
        }
        else{
          rows[index].destinationipaddress = rows[index].destinationipaddress + ";" + rows[index].destinationipaddresstest;
        }
      },
      addProtocol(index, rows){
        if(rows[index].protocol === ""){
          rows[index].protocol = rows[index].protocoltest;
        }
        else{
          rows[index].protocol = rows[index].protocol + ";" + rows[index].protocoltest;
        }
      },
      getUserids(val) {
        this.form.user_id = val;
        let lst = getOrgInfoByUserId(val);
        this.form.center_id = lst.centerNmae;
        this.form.group_id = lst.groupNmae;
        this.form.team_id = lst.teamNmae;
        if (!this.form.user_id || this.form.user_id === '' || val === "undefined") {
          this.error = this.$t('normal.error_08') + this.$t('label.applicant');
        } else {
          this.error = "";
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
        this.buttonClick("update");
      },
      start() {
        this.form.status = '2';
        this.buttonClick("update");
      },
      end() {
        this.form.status = '0';
        this.buttonClick("update");
      },
      changetypesof(val) {
        this.form.typesof = val;
      },
      changeoperationtype(val) {
        this.form.operationtype = val;
      },
      changesourceipgroup(val,row) {
        row.sourceipgroup = val;
      },
      changecommunication(val,row) {
        row.communication = val;
      },
      changedestinationipgroup(val,row) {
        row.destinationipgroup = val;
      },
      deleteRow(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        }
        else{
          this.tableT=[{
            routing_id: '',
            routingdetail_id: '',
            sourceipgroup:' ',
            sourceipaddresstest: '',
            sourceipaddress: '',
            communication: ' ',
            destinationipgroup: ' ',
            destinationipaddress: '',
            destinationipaddresstest: '',
            protocol: '',
            Protocoltest: '',
          }]
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
          this.$refs["refform"].validate(valid => {
            if (valid) {
              this.loading = true
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
                  this.loading = false
                  if(val !== "update"){
                    Message({
                      message: this.$t("normal.success_02"),
                      type: 'success',
                      duration: 5 * 1000
                    });
                    if (this.$store.getters.historyUrl) {
                      this.$router.push(this.$store.getters.historyUrl);
                    }
                  }
                })
                  .catch(error => {
                    Message({
                      message: error,
                      type: 'error',
                      duration: 5 * 1000
                    });
                    this.loading = false
                  })
              } else {
                this.loading = true
                this.$store
                  .dispatch('PFANS1016Store/insert', this.baseInfo)
                  .then(response => {
                    this.data = response;
                    this.loading = false
                    Message({
                      message: this.$t("normal.success_01"),
                      type: 'success',
                      duration: 5 * 1000
                    });
                    if (this.$store.getters.historyUrl) {
                      this.$router.push(this.$store.getters.historyUrl);
                    }
                  })
                  .catch(error => {
                    Message({
                      message: error,
                      type: 'error',
                      duration: 5 * 1000
                    });
                    this.loading = false
                  })
              }
            }
          });
        }
      }
  }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
