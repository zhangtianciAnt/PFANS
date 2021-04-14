<template>
  <div>
  <EasyNormalTable
    :buttonList="buttonList"
    :columns="columns"
    :data="data"
    :rowid="row_id"
    :title="title"
    @buttonClick="buttonClick"
    @rowClick="rowClick"
    v-loading="loading"
    :rowClassName="rowClassName"
  >
    <!--ADD-ZTC-增加列表日历筛选 start-->
    <el-date-picker
      unlink-panels
      class="bigWidth"
      v-model="workinghours"
      style="margin-right:1vw"
      slot="customize"
      type="daterange"
      :end-placeholder="$t('label.enddate')"
      :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
      :start-placeholder="$t('label.startdate')"
      @change="filterInfo"
    ></el-date-picker>
    <!--ADD-ZTC-增加列表日历筛选 end-->

  </EasyNormalTable>
    <el-dialog center
               :visible.sync="dialogVisible"
               :title="$t('button.carryforward')"
               width="50%">
      <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="form" style="padding: 0.1vw">
        <el-row>
          <div style=
                 "font-family: Helvetica Neue;color: #005BAA;font-size: 0.8rem;font-weight: bold">{{$t('label.PFANS3005VIEW_OLDORGANIZATION')}}</div>
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
                 "font-family: Helvetica Neue;color: #005BAA;font-size: 0.8rem;font-weight: bold">{{$t('label.PFANS3005VIEW_NEWORGANIZATION')}}</div>
        </el-row>
        <el-row>
          <el-col :span="8" style="margin-left: 0.5vw; margin-bottom: -1vw;">
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
  </div>
</template>

<script>
    import EasyNormalTable from "@/components/EasyNormalTable";
    import {Message} from 'element-ui';
    import org from '@/view/components/org';
    import {getDictionaryInfo, getStatus, getUserInfo,getOrgInfoByUserId,getDepartmentById} from "../../../../utils/customize";
    let moment = require("moment");


    export default {
        name: "PFANS3006View",
        components: {
            moment,
            EasyNormalTable,
          org,
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
                centername: '',
                groupname: '',
                teamname: '',
                last_center_id: '',
                last_group_id: '',
                last_team_id: '',
                new_center_id: '',
                new_group_id: '',
                new_team_id: '',
                org: '',
              },
              dialogVisible: false,
              totaldata: [],
              loading: false,
              // ADD-ZTC-增加列表日历筛选 start
              working: "",
              workinghours: "",
              tabledata: [],
              // ADD-ZTC-增加列表日历筛选 end
              starttiem: "",
              endTime: "",
              title: "title.PFANS3006VIEW",
              data: [],
              rowInfo: [],
              error_group: '',
              error_center: '',
              columns: [
                  //NT_PFANS_20210308_BUG_174 搜索BUG ztc start
                  // {
                  //     //code: 'basicsituation',
                  //     label: 'label.PFANS3006VIEW_BASICSITUATION',
                  //     child: [
                  //NT_PFANS_20210308_BUG_174 搜索BUG ztc end
                            {
                                code: 'applicant',
                                label: 'label.applicant',
                                labelClass: 'pfans3006view_column_1',
                                width: 140,
                                fix: false,
                                filter: true
                            },
                            {
                                code: 'centername',
                                label: 'label.center',
                                labelClass: 'pfans3006view_column_1',
                                width: 140,
                                fix: false,
                                filter: true
                            },
                            {
                                code: 'groupname',
                                label: 'label.group',
                                labelClass: 'pfans3006view_column_1',
                                width: 140,
                                fix: false,
                                filter: true
                            },
                            {
                                code: 'teamname',
                                label: 'label.team',
                                labelClass: 'pfans3006view_column_1',
                                width: 140,
                                fix: false,
                                filter: true
                            },
                            {
                                code: 'usedate',
                                label: 'label.PFANS3006VIEW_USEDATE',
                                labelClass: 'pfans3006view_column_1',
                                width: 140,
                                fix: false,
                                filter: true,
                            },
                            {
                                code: 'usetype',
                                label: 'label.PFANS3006VIEW_USETYPE',
                                labelClass: 'pfans3006view_column_1',
                                width: 140,
                                fix: false,
                                filter: false
                            },
                            {
                                code: 'mobilephone',
                                label: 'label.PFANS3006VIEW_MOBILEPHONE',
                                labelClass: 'pfans3006view_column_1',
                                width: 150,
                                fix: false,
                                filter: false
                            },
                  //NT_PFANS_20210308_BUG_174 搜索BUG ztc start
                  // ],
                  // width: 990,
                  // fix: false,
                  // filter: true,
                  // },
                  // {
                  //code: 'set',
                  // label: 'label.PFANS3006VIEW_SET',
                  // child: [
                  //NT_PFANS_20210308_BUG_174 搜索BUG ztc end
                            {
                                code: 'starttime',
                                label: 'label.PFANS3006VIEW_STARTTIME',
                                labelClass: 'pfans3006view_column_8',
                                width: 150,
                                fix: false,
                                filter: true
                            },
                            {
                                code: 'origin',
                                label: 'label.PFANS3006VIEW_ORIGIN',
                                labelClass: 'pfans3006view_column_8',
                                width: 140,
                                fix: false,
                                filter: true
                            },
                  //NT_PFANS_20210308_BUG_174 搜索BUG ztc start
                  // ],
                  // width: 290,
                  // fix: false,
                  // filter: true,
                  // },
                  // {
                  //code: 'arrive',
                  // label: 'label.PFANS3006VIEW_ARRIVE',
                  // child: [
                  //NT_PFANS_20210308_BUG_174 搜索BUG ztc end
                            {
                                code: 'transferstation',
                                label: 'label.PFANS3006VIEW_TRANSFERSTATION',
                                labelClass: 'pfans3006view_column_10',
                                width: 160,
                                fix: false,
                                filter: true
                            },
                            {
                                code: 'destination',
                                label: 'label.PFANS3006VIEW_DESTINATION',
                                labelClass: 'pfans3006view_column_10',
                                width: 160,
                                fix: false,
                                filter: true
                            },
                            {
                                code: 'endtime',
                                label: 'label.PFANS3006VIEW_ENDTIME',
                                labelClass: 'pfans3006view_column_10',
                                width: 200,
                                fix: false,
                                filter: true
                            },
                  //NT_PFANS_20210308_BUG_174 搜索BUG ztc start
                  // ],
                  // width: 520,
                  // fix: false,
                  // filter: true
                  // },
                  // {
                  //code: 'arrive1',
                  // label: 'label.PFANS3006VIEW_ARRIVE',
                  // child: [
                  //NT_PFANS_20210308_BUG_174 搜索BUG ztc end
                            {
                                code: 'flightnumber',
                                label: 'label.PFANS3006VIEW_FLIGHTNUMBER',
                                labelClass: 'pfans3006view_column_13',
                                width: 140,
                                fix: false,
                                filter: false
                            },
                            {
                                code: 'distinguish',
                                label: 'label.PFANS3006VIEW_DISTINGUISH',
                                labelClass: 'pfans3006view_column_13',
                                width: 140,
                                fix: false,
                                filter: false
                            },
                            {
                                code: 'departurecity',
                                label: 'label.PFANS3006VIEW_DEPARTURECITY',
                                labelClass: 'pfans3006view_column_13',
                                width: 150,
                                fix: false,
                                filter: false
                            },
                            {
                                code: 'welcomeboard',
                                label: 'label.PFANS3006VIEW_WELCOMEBOARD',
                                labelClass: 'pfans3006view_column_13',
                                width: 140,
                                fix: false,
                                filter: false
                            },
                            {
                                code: 'fellowmembers',
                                label: 'label.PFANS3006VIEW_FELLOWMEMBERS',
                                labelClass: 'pfans3006view_column_13',
                                width: 140,
                                fix: false,
                                filter: false
                            },
                            {
                                code: 'fellowmembersname',
                                label: 'label.PFANS3006VIEW_FELLOWMEMBERSNAME',
                                labelClass: 'pfans3006view_column_13',
                                width: 140,
                                fix: false,
                                filter: false
                            },
                  //NT_PFANS_20210308_BUG_174 搜索BUG ztc start
                  // ],
                  // width: 850,
                  // fix: false,
                  // filter: true
                  // }, {
                  //code: 'guestinformation',
                  // label: 'label.PFANS3006VIEW_GUESTINFORMATION',
                  // child: [
                  //NT_PFANS_20210308_BUG_174 搜索BUG ztc end
                            {
                                code: 'guestname',
                                label: 'label.PFANS3002VIEW_GUESTNAME',
                                labelClass: 'pfans3006view_column_19',
                                width: 140,
                                fix: false,
                                filter: false
                            },
                  //NT_PFANS_20210308_BUG_174 搜索BUG ztc start
                  // ],
                  // width: 140,
                  // fix: false,
                  // filter: true
                  // },
                  // {
                  //code: 'other',
                  // label: 'label.PFANS3006VIEW_OTHER',
                  // child: [
                  //NT_PFANS_20210308_BUG_174 搜索BUG ztc end
                            {
                                code: 'usenumber',
                                label: 'label.PFANS3006VIEW_USENUMBER',
                                labelClass: 'pfans3006view_column_20',
                                width: 140,
                                fix: false,
                                filter: false
                            },
                            {
                                code: 'remarks',
                                label: 'label.remarks',
                                labelClass: 'pfans3006view_column_20',
                                width: 140,
                                fix: false,
                                filter: false
                            },
                  //NT_PFANS_20210308_BUG_174 搜索BUG ztc start
                  // ],
                  // width: 280,
                  // fix: false,
                  // filter: true
                  // },
                    // {
                    //     code: 'status',
                    //     label: 'label.status',
                    //     child: [
                    //         {
                    //             code: 'status',
                    //             label: 'label.approval_status',
                    //             labelClass: 'pfans3006view_column_22',
                    //             width: 140,
                    //             fix: false,
                    //             filter: true
                    //         },
                    //         {
                    //             code: 'operation',
                    //             label: 'label.operation',
                    //             labelClass: 'pfans3006view_column_22',
                    //             width: 140,
                    //             fix: false,
                    //             filter: true
                    //         },
                    //     ],
                    //     width: 280,
                    //     fix: false,
                    //     filter: true
                    // },
                  //NT_PFANS_20210308_BUG_174 搜索BUG ztc end
                    {
                        code: 'acceptstatus',
                        label: 'label.PFANS3001FORMVIEW_ACCEPTSTATUS',
                        width: 150,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'findate',
                        label: 'label.PFANS3006VIEW_ACCEPTTIME',
                        width: 150,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'refusereason',
                        label: 'label.PFANS3007FORMVIEW_REFUSEREASON',
                        width: 150,
                        fix: false,
                        filter: true,
                    },
                  {
                    code: 'trip',
                    label: 'label.PFANS3006VIEW_TRIP',
                    width: 150,
                    fix: false,
                    filter: true,
                  },
                  {
                    code: 'tripreason',
                    label: 'label.PFANS3006VIEW_TRIPREASON',
                    width: 200,
                    fix: false,
                    filter: true,
                  },
                ],
              buttonList:[ ],
              buttonListAll: [
                    {
                        key: 'view',
                        name: 'button.view',
                        disabled: false,
                        icon: 'el-icon-view'
                    },
                    {
                        key: 'insert',
                        name: 'button.insert',
                        disabled: false,
                        icon: 'el-icon-plus'
                    },
                    {
                        key: 'update',
                        name: 'button.update',
                        disabled: false,
                        icon: 'el-icon-edit'
                    },
                    {
                        key: 'download',
                        name: 'button.downloadjjp',
                        disabled: false,
                        icon: 'el-icon-download'
                    },
                  // add-ccm  数据转结 fr
                  {'key': 'carryforward', 'name': 'button.carryforward', 'disabled': false, 'icon': 'el-icon-edit'}
                  // add-ccm  数据转结 to
                ],
              buttonListial: [
                {
                  key: 'view',
                  name: 'button.view',
                  disabled: false,
                  icon: 'el-icon-view'
                },
                {
                  key: 'insert',
                  name: 'button.insert',
                  disabled: false,
                  icon: 'el-icon-plus'
                },
                {
                  key: 'update',
                  name: 'button.update',
                  disabled: false,
                  icon: 'el-icon-edit'
                },
                {
                  key: 'download',
                  name: 'button.downloadjjp',
                  disabled: false,
                  icon: 'el-icon-download'
                },
              ],
              rowid: '',
              row_id: 'appointmentcarid',
            };
        },
        mounted() {
            this.getList();
            this.getdate();
        },
        methods: {
          // getCenterid(val){
          //   this.form.new_center_id = val
          // },
          // getGroupid(val){
          //   this.form.new_group_id = val
          // },
          // getTeamid(val){
          //   this.form.new_team_id = val
          // },
          getCenterid(val) {
            this.getOrgInformation(val);
            if (!val || this.form.new_center_id === '') {
              this.error_center = this.$t('normal.error_08') + 'center';
            } else {
              this.error_center = '';
            }
          },
          getGroupid(val) {
            this.getOrgInformation(val);
            if (this.form.new_center_id === '') {
              this.error_group = this.$t('normal.error_08') + 'center';
            } else {
              this.error_group = '';
            }
          },
          getTeamid(val) {
            this.getOrgInformation(val);
            if (this.form.center_id === '') {
              this.error_group = this.$t('normal.error_08') + 'center';
            } else {
              this.error_group = '';
            }
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
          setOrg(val) {
            this.form.org = val;
          },
          // ADD-ZTC-增加列表日历筛选 start
          filterInfo() {
            this.data = this.tabledata.slice(0);
            if (this.tabledata.length > 0) {
              //进行时间筛选
              this.working = this.getworkinghours(this.workinghours);
              (this.starttiem = this.working.substring(0, 10)),
                (this.endTiem = this.working.substring(13, 23));
              if (this.starttiem != "" || this.endTiem != "") {
                this.data = this.data.filter(item => {
                  return this.starttiem <= item.usedate && item.usedate <= this.endTiem
                });
              }
            }
          },
          getworkinghours(workinghours) {
            if (workinghours != null) {
              if (workinghours.length > 0) {
                return (
                  moment(workinghours[0]).format("YYYY-MM-DD") +
                  " ~ " +
                  moment(workinghours[1]).format("YYYY-MM-DD")
                );
              } else {
                return "";
              }
            } else {
              return "";
            }
          },
          clickdata() {
            this.working = this.getworkinghours(this.workinghours);
            (this.starttiem = this.working.substring(0, 10)),
              (this.endTiem = this.working.substring(13, 23));
            let tabledate = [];
            let tabledata = [];
            if (this.tabledata != "") {
              if (this.starttiem == "" && this.endTiem == "") {
                for (let i = 0; i < this.tabledata.length; i++) {
                  tabledata.push({
                    applicant: this.tabledata[i].applicant,
                    centername: this.tabledata[i].centername,
                    groupname: this.tabledata[i].groupname,
                    teamname: this.tabledata[i].teamname,
                    usedate: this.tabledata[i].usedate,
                    usetype: this.tabledata[i].usetype,
                    mobilephone: this.tabledata[i].mobilephone,
                    starttime: this.tabledata[i].starttime,
                    origin: this.tabledata[i].origin,
                    transferstation: this.tabledata[i].transferstation,
                    destination: this.tabledata[i].destination,
                    endtime: this.tabledata[i].endtime,
                    flightnumber: this.tabledata[i].flightnumber,
                    departurecity: this.tabledata[i].departurecity,
                    welcomeboard: this.tabledata[i].welcomeboard,
                    fellowmembers: this.tabledata[i].fellowmembers,
                    guestname: this.tabledata[i].guestname,
                    usenumber: this.tabledata[i].usenumber,
                    remarks: this.tabledata[i].remarks,
                    status: this.tabledata[i].status,
                    operation: this.tabledata[i].operation,
                    acceptstatus: this.tabledata[i].acceptstatus,
                    findate: this.tabledata[i].findate,
                  });
                }
                this.data = tabledata;
              } else {
                for (let i = 0; i < this.tabledata.length; i++) {
                  if (
                    this.starttiem <= this.tabledata[i].usedate &&
                    this.tabledata[i].usedate <= this.endTiem
                  ) {
                    tabledate.push({
                      applicant: this.tabledata[i].applicant,
                      centername: this.tabledata[i].centername,
                      groupname: this.tabledata[i].groupname,
                      teamname: this.tabledata[i].teamname,
                      usedate: this.tabledata[i].usedate,
                      usetype: this.tabledata[i].usetype,
                      mobilephone: this.tabledata[i].mobilephone,
                      starttime: this.tabledata[i].starttime,
                      origin: this.tabledata[i].origin,
                      transferstation: this.tabledata[i].transferstation,
                      destination: this.tabledata[i].destination,
                      endtime: this.tabledata[i].endtime,
                      flightnumber: this.tabledata[i].flightnumber,
                      departurecity: this.tabledata[i].departurecity,
                      welcomeboard: this.tabledata[i].welcomeboard,
                      fellowmembers: this.tabledata[i].fellowmembers,
                      guestname: this.tabledata[i].guestname,
                      usenumber: this.tabledata[i].usenumber,
                      remarks: this.tabledata[i].remarks,
                      status: this.tabledata[i].status,
                      operation: this.tabledata[i].operation,
                      acceptstatus: this.tabledata[i].acceptstatus,
                      findate: this.tabledata[i].findate,
                    });
                  }
                }
                this.data = tabledate;
              }
            }
          },
          // ADD-ZTC-增加列表日历筛选 end
          rowClassName({row, rowIndex}) {
            if (row.trip === '取消') {
              return 'sub_bg_color_lightgray';
            }
            if (row.acceptstatus === this.$t('label.PFANS3006VIEW_CARRYOUT')) {
              return 'sub_bg_color_lightblue';
            }
          },
          getList(){
            this.loading = true;
            this.$store
              .dispatch('PFANS3006Store/getAppointmentCar', {})
              .then(response => {
                for (let j = 0; j < response.length; j++) {
                  response[j].status = getStatus(response[j].status);
                  if (response[j].usetype !== null && response[j].usetype !== "") {
                    let letUsetype = getDictionaryInfo(response[j].usetype);
                    if (letUsetype != null) {
                      response[j].usetype = letUsetype.value1;
                    }
                  }
                  if (response[j].distinguish !== null && response[j].distinguish !== "") {
                    let letDistinguish = getDictionaryInfo(response[j].distinguish);
                    if (letDistinguish != null) {
                      response[j].distinguish = letDistinguish.value1;
                    }
                  }
                  response[j].centername = getDepartmentById(response[j].centerid);
                  response[j].groupname = getDepartmentById(response[j].groupid);
                  response[j].teamname = getDepartmentById(response[j].teamid);
                  let user = getUserInfo(response[j].userid)
                  if (user) {
                    response[j].applicant = user.userinfo.customername;
                  }
                  if (response[j].welcomeboard !== null && response[j].welcomeboard !== "") {
                    if (this.$i18n) {
                      response[j].welcomeboard = response[j].welcomeboard === "1" ? this.$t('label.yes') : this.$t('label.no');
                    }
                  }
                  if (response[j].fellowmembers !== null && response[j].fellowmembers !== "") {
                    if (this.$i18n) {
                      response[j].fellowmembers = response[j].fellowmembers === "0" ? this.$t('label.yes') : this.$t('label.no');
                    }
                  }
                  if (response[j].usedate !== null && response[j].usedate !== "") {
                    response[j].usedate = moment(response[j].usedate).format("YYYY-MM-DD");
                  }
                  if (response[j].starttime !== null && response[j].starttime !== "") {
                    response[j].starttime = moment(response[j].starttime).format("HH:mm");
                  }
                  if (response[j].endtime !== null && response[j].endtime !== "") {
                    response[j].endtime = moment(response[j].endtime).format("HH:mm");
                  }
                  if (response[j].trip !== null && response[j].trip !== "") {
                    if (response[j].trip == '0') {
                      response[j].trip = '取消';
                    } else {
                      response[j].trip = '';
                    }
                  }
                  // ADD_FJL   (受理状态)
                  if (response[j].acceptstatus !== null && response[j].acceptstatus !== "") {
                    if (this.$i18n) {
                      if (response[j].acceptstatus === '0') {
                        response[j].acceptstatus = this.$t('label.PFANS3006VIEW_ACCEPT');
                      } else if (response[j].acceptstatus === '1') {
                        response[j].acceptstatus = this.$t('label.PFANS3006VIEW_REFUSE');
                      } else if (response[j].acceptstatus === '2') {
                        response[j].acceptstatus = this.$t('label.PFANS3006VIEW_CARRYOUT');
                      }
                    }
                  }
                  // ADD_FJL   (受理时间)
                  if (response[j].findate !== null && response[j].findate !== "") {
                    response[j].findate = moment(response[j].findate).format('YYYY-MM-DD');
                  }
                }
                this.data = response;
                // ADD-ZTC-增加列表日历筛选 start
                this.tabledata = response;
                // ADD-ZTC-增加列表日历筛选 end
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
          //add    数据转结按钮显示  from
          getdate(){
            this.mounth = new Date().getMonth() + 1;
            this.date = new Date().getDate();
            if(this.mounth === 4 && this.date >= 10 && this.date <= 30){
              this.buttonList = this.buttonListAll;
            } else {
              this.buttonList = this.buttonListial;
            }
          },
          //add    数据转结按钮显示  to
          submit(){
            this.loading = true;
            this.$refs['form'].validate(valid =>{
              if(valid){
                let parameter = {
                  centerid: this.form.new_center_id,
                  groupid: this.form.new_group_id,
                  teamid:this.form.new_team_id,
                  appointmentcarid:this.rowid,
                };
                this.$store
                  .dispatch('PFANS3006Store/change', parameter)
                  .then(response => {
                    // this.data = response;
                    this.getList();
                    Message({
                      message: this.$t('normal.success_07'),
                      type: 'success',
                      duration: 5 * 1000,
                    });
                    this.dialogVisible = false;
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
          rowClick(row) {
                this.rowid = row.appointmentcarid;
              this.rowInfo = row;
            },
          buttonClick(val) {
                this.$store.commit('global/SET_HISTORYURL', this.$route.path)
                if (val === 'update') {
                    if (this.rowid === '') {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000
                        })
                        return;
                    }
                    this.$router.push({
                        name: 'PFANS3006FormView',
                        params: {
                            _id: this.rowid,
                            disable: true
                        }
                    })
                }
                if (val === 'insert') {
                    this.$router.push({
                        name: 'PFANS3006FormView',
                        params: {
                            _id: '',
                            disable: true
                        }
                    })
                }
                if (val === 'carryforward'){
                  if (this.rowid === '') {
                    Message({
                      message: this.$t('normal.info_01'),
                      type: 'info',
                      duration: 2 * 1000,
                    });
                    return;
                  }else{
                    this.form.last_center_id = this.rowInfo.centername;
                    this.form.last_group_id = this.rowInfo.groupname;
                    this.form.last_team_id = this.rowInfo.teamname;
                  }
                  this.dialogVisible = true;
                }
                if (val === 'view') {
                    if (this.rowid === '') {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000
                        })
                        return;
                    }
                    this.$router.push({
                        name: 'PFANS3006FormView',
                        params: {
                            _id: this.rowid,
                            disable: false
                        }
                    })
                }
                if (val === 'download') {
                  this.loading = true;
                  this.$store
                    .dispatch('PFANS3006Store/download', {})
                    .then(response => {
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
                }
            },
        }
    }
</script>

<style scoped>

</style>
