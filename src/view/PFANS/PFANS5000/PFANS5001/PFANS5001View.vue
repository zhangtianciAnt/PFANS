<template>
  <div>
    <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row"
                     :title="title" @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading"
                     :showSelectBySearch="false">
<!--      检索画面样式调整并取消共通检索 ztc-->
      <!--    添加筛选条件 ztc fr-->
      <el-form slot="search" label-position="top" label-width="8vw">
        <el-row>
          <el-col :span="5">
            <el-form-item :label="$t('label.PFANS5009VIEW_PROJECTNO')">
              <el-input v-model="retral.numbers" clearable style="width: 80%"/>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item :label="$t('label.PFANS5001FORMVIEW_PROJECT_NAME')">
              <el-input v-model="retral.project_name" clearable style="width: 80%"/>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item :label="$t('label.PFANS5001FORMVIEW_PROJECTTYPE')">
              <dicselect
                :data="retral.projecttype"
                code="PP001"
                style="width: 14vw"
                @change="changeType"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item :label="$t('label.PFANS5001FORMVIEW_LEADERID')">
              <user :disabled="false" :selectType="selectType" :userlist="userlist"
                    style="width: 67%" @getUserids="getUserids"></user>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item :label="$t('label.PFANS5001FORMVIEW_TIMEBETWEEN')">
              <el-date-picker
                v-model="workinghours"
                :end-placeholder="$t('label.enddate')"
                :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                :start-placeholder="$t('label.startdate')"
                style="width: 250px"
                type="daterange"
                unlink-panels
                @change="filterInfo"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!--    添加筛选条件 ztc to-->
    </EasyNormalTable>
    <el-container>
      <el-dialog :visible.sync="dialogTableVisible_h" center
                 size="50%"
                 top="8vh" lock-scroll
                 append-to-body>
        <div style="text-align: center">
          <el-row>
            <el-col :span="24">
              <el-date-picker
                v-model="perioDate"
                class="bigWidth"
                :disabled="false"
                type="daterange"
                unlink-panels
                style="width:20vw"
                :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                :start-placeholder="$t('label.startdate')"
                :end-placeholder="$t('label.enddate')"
              >
              </el-date-picker>
            </el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button style="width:20vw" type="primary" @click="submitTime()">{{$t('button.confirm')}}</el-button>
            </span>
        </div>
      </el-dialog>
    </el-container>
    <el-container>
      <el-dialog center
                 :visible.sync="dialogVisible"
                 :title="$t('button.carryforward')"
                 width="50%">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="form" style="padding: 0.1vw;margin-top: -2vw">
          <el-row>
            <div style=
                   "font-family: Helvetica Neue;color: #005BAA;font-size: 0.8rem;font-weight: bold;margin-left: -1vw">{{$t('label.PFANS3005VIEW_OLDORGANIZATION')}}</div>
          </el-row>
          <el-row>
            <el-col :span="8" style="margin-left: 0.5vw">
              <el-form-item :label="$t('label.center')">
                <el-input :disabled="true" style="width:15vw" v-model="form.last_center_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')">
                <el-input :disabled="true" style="width:15vw" v-model="form.last_group_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item :label="$t('label.team')">
                <el-input :disabled="true" style="width:15vw" v-model="form.last_team_id"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <div style=
                   "font-family: Helvetica Neue;color: #005BAA;font-size: 0.8rem;font-weight: bold;margin-left: -1vw">{{$t('label.PFANS3005VIEW_NEWORGANIZATION')}}</div>
          </el-row>
          <el-row>
            <el-col :span="8"style="margin-left: 0.5vw; margin-bottom: -1vw;">
              <el-form-item :label="$t('label.center')" prop="new_center_id"
                                      :error="error_center">
                <org :orglist="form.new_center_id"
                     orgtype="1"
                     style="width: 14vw"
                     @getOrgids="getCenterid"
                     :error="error_center"
                ></org>
              </el-form-item>
            </el-col>
            <el-col :span="8" style="margin-bottom: -1vw;">
              <el-form-item :label="$t('label.group')" prop="new_group_id"
                                      :error="error_group">
                <org :orglist="form.new_group_id"
                     orgtype="2"
                     style="width: 14vw"
                     @getOrgids="getGroupid"
                     :error="error_group"
                ></org>
              </el-form-item>
            </el-col>
            <el-col :span="7" style="margin-bottom: -1vw;">
              <el-form-item :label="$t('label.team')">
                <org :orglist="form.new_team_id"
                     orgtype="3"
                     style="width: 14vw"
                     @getOrgids="getTeamid"
                ></org>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
                <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submit">{{$t('button.confirm')}}</el-button>
          </span>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
import EasyNormalTable from "@/components/EasyNormalTable";
import {getDictionaryInfo, getStatus, getUserInfo, getCurrentRole21, getOrgInfo} from '@/utils/customize';
import {Message} from 'element-ui';
import moment from "moment";
import org from '@/view/components/org';
import dicselect from '../../../components/dicselect.vue';
import user from '../../../components/user.vue';

export default {
  name: 'PFANS5001View',
  components: {
    EasyNormalTable,
    dicselect,
    org,
    user,
  },
  data() {
          var centerId = (rule, value, callback) => {
            if (!this.form.new_center_id || this.form.new_center_id === '') {
              callback(new Error(this.$t('normal.error_08') + this.$t('label.center')));
              this.error_center = this.$t('normal.error_08') + this.$t('label.center');
            } else {
              callback();
            }
          };
            return {
                loading: false,
                title: "title.PFANS5001VIEW",
                // 表格数据源
                data: [],
              error_group: '',
              error_center: '',
              rows: {},
              centername: '',
              groupname: '',
              teamname: '',
              rules: {
                new_center_id: [
                  {
                    required: true,
                    validator: centerId,
                    trigger: 'blur',
                  }
                ],
              },
              form: {
                last_center_id: '',
                last_group_id: '',
                last_team_id: '',
                new_center_id: '',
                new_group_id: '',
                new_team_id: '',
                org: '',
              },
              // 添加筛选条件 ztc fr
              retral: {
                numbers: '',
                project_name: '',
                projecttype: '',
                leaderid: '',
                startdate: '',
                enddate: '',
              },
              workinghours: [moment(moment().month(moment().month() - 1).startOf('month').valueOf()).format("YYYY-MM-DD"), moment(new Date()).endOf('month').format("YYYY-MM-DD")],
              working: '',
              starttime: moment(moment().month(moment().month() - 1).startOf('month').valueOf()).format("YYYY-MM-DD"),
              endTime: moment(new Date()).endOf('month').format("YYYY-MM-DD"),
              // 添加筛选条件 ztc to
              // 列属性
              columns: [
                {
                  code: 'numbers',
                  label: 'label.PFANS5009VIEW_PROJECTNO',
                  width: 110,
                  fix: false,
                  filter: false,
                },
                {
                        code: 'project_name',
                        label: 'label.PFANS5001FORMVIEW_PROJECT_NAME',
                        width: 150,
                        fix: false,
                        filter: false
                    },
                    {
                        code: 'createby',
                        label: 'label.applicant',
                        width: 150,
                        fix: false,
                        filter: false
                    },
                    {
                        code: 'projecttype',
                        label: 'label.PFANS5001FORMVIEW_PROJECTTYPE',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'leaderid',
                        label: 'label.PFANS5001FORMVIEW_LEADERID',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'startdate',
                        label: 'label.PFANS5001FORMVIEW_STARTDATE',
                        width: 150,
                        fix: false,
                        filter: false
                    },
                    {
                        code: 'enddate',
                        label: 'label.PFANS5001FORMVIEW_ENDDATE',
                        width: 150,
                        fix: false,
                        filter: false
                    },
                    {
                        code: 'createon',
                        label: 'label.PFANS2001VIEW_APPLICATIONTIME',
                        width: 150,
                        fix: false,
                        filter: false
                    },
                    {
                        code: 'status',
                        label: 'label.PFANS5005VIEW_STATUS',
                        width: 150,
                        fix: false,
                        filter: true
                    }
                ],
                buttonList: [
                  {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
                  {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
                  {'key': 'edit', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
                  {'key': 'report', 'name': 'button.report', 'disabled': true, 'icon': 'el-icon-download'},
                  // 添加筛选条件 ztc fr
                  {
                    key: 'search',
                    name: 'button.search',
                    disabled: false,
                    icon: 'el-icon-search'
                  },
                  // 添加筛选条件 ztc to
                ],
                rowid: '',
                row:'companyprojects_id',
                dialogTableVisible_h: false,
               dialogVisible: false,
                perioDate: '',
              mounth: '',
              date: '',
              selectType: 'Single',
              userlist: '',
                reportList: [],
            };
        },
        mounted() {
         this.load();
         this.getdate();
    },
        methods: {
          getdate(){
            this.mounth = new Date().getMonth() + 1;
            this.date = new Date().getDate();
            if(this.mounth === 4 && this.date >= 10 && this.date <= 30){
              this.buttonList = [
                {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
                {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
                {'key': 'edit', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
                {'key': 'report', 'name': 'button.report', 'disabled': true, 'icon': 'el-icon-download'},
                // 添加筛选条件 ztc fr
                {
                  key: 'search',
                  name: 'button.search',
                  disabled: false,
                  icon: 'el-icon-search'
                },
                // 添加筛选条件 ztc to
                {'key': 'carryforward', 'name': 'button.carryforward', 'disabled': false, 'icon': 'el-icon-edit'}
              ]
            } else {
              this.buttonList = [
                {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
                {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
                {'key': 'edit', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
                {'key': 'report', 'name': 'button.report', 'disabled': true, 'icon': 'el-icon-download'},
                // 添加筛选条件 ztc fr
                {
                  key: 'search',
                  name: 'button.search',
                  disabled: false,
                  icon: 'el-icon-search'
                },
                // 添加筛选条件 ztc to
              ]
            }
          },
          rowClick(row) {
            this.rowid = row.companyprojects_id;
            this.rows = row;
          },
          getCenterid(val){
            this.form.new_center_id = val;
            this.getOrgInformation(val);
            if (!val || this.form.new_center_id === '') {
              this.error_center = this.$t('normal.error_08') + 'center';
            } else {
              this.error_center = '';
            }
          },
          getGroupid(val){
            this.form.new_group_id = val
            this.getOrgInformation(val);
          },
          getTeamid(val){
            this.form.new_team_id = val
            this.getOrgInformation(val);
          },
          setOrg(val) {
            this.form.org = val;
          },
          getOrgInformation(id) {
            let org = {};
            let treeCom = this.$store.getters.orgs;
            if (id && treeCom.getNode(id)) {
              let node = id;
              let type = treeCom.getNode(id).data.type || 0;
              for (let index = parseInt(type); index >= 1; index--) {
                if (parseInt(type) === index && ![1, 2].includes(parseInt(type))) {
                  org.teamname = treeCom.getNode(node).data.departmentname;
                  org.team_id = treeCom.getNode(node).data._id;
                }
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
                teamname: this.form.teamname,
                center_id: this.form.new_center_id,
                group_id: this.form.new_group_id,
                team_id: this.form.new_team_id,
              } = org);
            }
          },
          load() {
            let role = getCurrentRole21();
            if (role === '0') {
              this.buttonList[3].disabled = false
            } else {
              this.buttonList[3].disabled = true
            }
            // 添加筛选条件 ztc fr
            this.retral.startdate = this.starttime;
            this.retral.enddate = this.endTime;
            this.loading = true;
            this.$store
              .dispatch('PFANS5001Store/getFpans5001List', this.retral)
              //根据user_id取组织架构和user_name
              .then(response => {
                this.data = response.filter(val => Number(val.status) !== 7 && Number(val.status) !== 9);
                for (let j = 0; j < response.length; j++) {
                  if (response[j].createby !== null && response[j].createby !== "") {
                    let user = getUserInfo(response[j].createby);
                    if (user) {
                      response[j].createby = user.userinfo.customername;
                    }
                  }
                  //项目负责人
                  if(response[j].leaderid !== null && response[j].leaderid !== "") {
                    let user = getUserInfo(response[j].leaderid);
                    if (user) {
                      response[j].leaderid = user.userinfo.customername;
                    }
                  }
                  //项目类型
                  if (response[j].projecttype !== null && response[j].projecttype !== "") {
                    let letStage = getDictionaryInfo(response[j].projecttype);
                    if (letStage != null) {
                      response[j].projecttype = letStage.value1;
                    }
                  }
                  //状态
                  response[j] .status = getStatus(response[j] .status);
                  // if(response[j].status === "7" || response[j].status === "8" || response[j].status === "9"){
                  //
                  // }
                  // 开始时间
                  if (response[j].startdate !== null && response[j].startdate !== "") {
                    response[j].startdate = moment(response[j].startdate).format("YYYY-MM-DD");
                  }
                  //预计完成时间
                  if (response[j].enddate !== null && response[j].enddate !== "") {
                    response[j].enddate = moment(response[j].enddate).format("YYYY-MM-DD");
                  }
                  //申请时间
                  if (response[j].createon !== null && response[j].createon !== "") {
                    response[j].createon = moment(response[j].createon).format("YYYY-MM-DD");
                  }
                }
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
          submit(){
            this.loading = true;
            this.$refs['form'].validate(valid =>{
              if(valid){
                let parameter = {
                  center_id: this.form.new_center_id,
                  group_id: this.form.new_group_id,
                  team_id:this.form.new_team_id,
                  companyprojects_id:this.rowid,
                };
                console.log(parameter)
                this.$store
                  .dispatch('PFANS5001Store/update1', parameter)
                  .then(response => {
                      this.load();
                    Message({
                      message: this.$t('normal.success_07'),
                      type: 'success',
                      duration: 5 * 1000,
                    });
                    this.dialogVisible = false;
                    this.form.new_center_id= '';
                    this.form.new_group_id='';
                    this.form.new_team_id= '';
                  })
              }else{
                Message({
                  message: this.$t('normal.error_12'),
                  type: 'error',
                  duration: 5 * 1000,
                });
              }
            });
            this.loading = false;
          },
            buttonClick(val) {
                this.$store.commit('global/SET_HISTORYURL', this.$route.path);
                if (val === 'view') {
                    if (this.rowid === '') {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000
                        });
                        return;
                    }
                    this.$router.push({
                        name: 'PFANS5001FormView',
                        params: {
                            _id: this.rowid,
                            disabled: false
                        }
                    })
                }
                if (val === 'insert') {
                    this.$router.push({
                        name: 'PFANS5001FormView',
                        params: {
                            _id: "",
                            disabled: true
                        }
                    })
                }
              if(val === 'carryforward'){
                if (this.rowid === '') {
                  Message({
                    message: this.$t('normal.info_01'),
                    type: 'info',
                    duration: 2 * 1000,
                  });
                  return;
                }
                this.dialogVisible = true;
                this.form.new_center_id= '';
                this.form.new_group_id='';
                this.form.new_team_id= '';
                let center = getOrgInfo(this.rows.center_id);
                if(center){
                  this.form.last_center_id = center.companyname;
                }
                let group = getOrgInfo(this.rows.group_id);
                if(group){
                  this.form.last_group_id = group.companyname;
                }
                let team = getOrgInfo(this.rows.team_id);
                if(team){
                  this.form.last_team_id = team.companyname;
                }
              }
                if (val === 'edit') {
                    if (this.rowid === '') {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000
                        });
                        return;
                    }
                    this.$router.push({
                      name: 'PFANS5001FormView',
                      params: {
                        _id: this.rowid,
                        disabled: true
                      }
                    })
                }
              if (val === 'report') {
                this.dialogTableVisible_h = true;
              }
              // 添加筛选条件 ztc fr
              if (val === 'search') {
                this.load();
              }
              // 添加筛选条件 ztc to
            },
          formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => {
              if (j === 'timestamp') {
                return parseTime(v[j]);
              } else {
                return v[j];
              }
            }));
          },
          submitTime() {
            if (this.perioDate === '' || this.perioDate === null || this.perioDate === undefined) {
              Message({
                message: this.$t('label.PFANS5001VIEW_WARNING'),
                type: 'warning',
                duration: 5 * 1000,
              });
            }else{
              let params = {
                start: moment(this.perioDate[0]).format('YYYY-MM-DD'),
                end: moment(this.perioDate[1]).format('YYYY-MM-DD'),
              };
              this.loading = true;
              this.$store
                .dispatch('PFANS5001Store/report', params)
                .then(response => {
                  this.reportList = response;
                  import('@/vendor/Export2Excel').then(excel => {
                    const tHeader = [
                      this.$t('label.PFANS5001VIEW_REPORT_GROUP'),//部门
                      this.$t('label.PFANS5001VIEW_REPORT_PJNAME'),//PJ名
                      this.$t('label.PFANS5001VIEW_REPORT_CONT'),//合同名
                      this.$t('label.PFANS5001VIEW_REPORT_AMOUNT'),//分配金额
                      this.$t('label.PFANS5001VIEW_REPORT_MONTH'),//月份
                      this.$t('label.PFANS5001VIEW_REPORT_INNUMBER'),//工数（员工）
                      this.$t('label.PFANS5001VIEW_REPORT_OUTNUMBER'),//工数（外注）
                      this.$t('label.PFANS5001VIEW_REPORT_FUNDS'),//经费
                      this.$t('label.PFANS5001VIEW_REPORT_REMARK'),//经费
                    ];
                    const filterVal = [
                      'orgname',
                      'name',
                      'contract',
                      'contractamount',
                      'month',
                      'personType0',
                      'personType1',
                      'moneys',
                    ];
                    const list = this.reportList;
                    const data = this.formatJson(filterVal, list);
                    excel.export_json_to_excel(tHeader, data, this.$t('label.PFANS5001VIEW_PROCONREPORT'));
                  });
                  this.loading = false;
                }).catch(error => {
                this.$message.error({
                  message: error,
                  type: 'error',
                  duration: 5 * 1000,
                });
                this.loading = false;
              });
              this.dialogTableVisible_h = false;
            }
          },
          // 添加筛选条件 ztc fr
          getUserids(val) {
            this.userlist = val;
            this.retral.leaderid = val;
          },
          changeType(val) {
            this.retral.projecttype = val;
          },
          filterInfo() {
            this.working = this.getworkinghours(this.workinghours);
            if (this.working === "") {
              // 添加筛选条件 ztc fr
              // this.starttime =  moment(new Date()).startOf('month').format("YYYY-MM-DD");
              // this.endTime =  moment(new Date()).endOf('month').format("YYYY-MM-DD");
              this.starttime = null;
              this.endTime = null;
              //this.getAbnormalList();
              // 添加筛选条件 ztc to
            } else {
              this.starttime = this.working.substring(0, 10);
              this.endTime = this.working.substring(13, 23);
              // 添加筛选条件 ztc fr
              //this.getAbnormalList();
              // 添加筛选条件 ztc to
            }
          },
          getworkinghours(workinghours) {
            if (workinghours != null) {
              if (workinghours.length > 0) {
                return (
                  moment(workinghours[0]).format('YYYY-MM-DD') +
                  ' ~ ' +
                  moment(workinghours[1]).format('YYYY-MM-DD')
                );
              } else {
                return '';
              }
            } else {
              return '';
            }
          },
          // 添加筛选条件 ztc to
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
