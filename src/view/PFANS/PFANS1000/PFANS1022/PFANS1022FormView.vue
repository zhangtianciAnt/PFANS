<template>
  <div style="min-height: 100%">
    <EasyNormalContainer ref="container" :title="title" @buttonClick="buttonClick" v-loading="loading"
                         :buttonList="buttonList"
                         @workflowState="workflowState" :canStart="canStart" @start="start" @end="end">
      <div slot="customize">
        <el-form :model="form" label-width="8vw" label-position="top" style="padding: 2vw" :rules="rules"
                 ref="refform">
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.center')">
                <el-input v-model="form.center_id" :disabled="true" style="width: 20vw" maxlength='36'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')">
                <el-input v-model="form.group_id" :disabled="true" style="width: 20vw" maxlength='36'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')">
                <el-input v-model="form.team_id" :disabled="true" style="width: 20vw" maxlength='36'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :error="erroruser" :label="$t('label.applicant')" prop="user_id">
                <user :disabled="!disabled" :error="erroruser" :selectType="selectType" :userlist="userlist"
                      @getUserids="getUserids" style="width: 20vw"></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.pfanstype')" prop="type">
                <el-input v-model="form.type" :disabled="!disabled1" style="width: 20vw" maxlength='20'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.application_date')" prop="dailypayment">
                <el-date-picker :disabled="true" type="date" v-model="form.dailypayment"
                                style="width: 20vw"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col >
              <el-form-item :label="$t('label.PFANS1018FORMVIEW_INSIDENUMBER')" prop="extension">
                <el-input :disabled="!disabled" style="width: 71.4vw"
                          v-model="form.extension"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div class="sub_color_blue">{{$t('label.PFASN1023FORMVIEW_STOREDDATA')}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-table :data="tableD" border stripe header-cell-class-name="sub_bg_color_blue">
              <el-table-column :label="$t('label.PFANS2006VIEW_NO')" align="center" fixed prop="content"
                               type="index"></el-table-column>
              <el-table-column :label="$t('label.applicant')" align="center" prop="application" width="190"
                               :error="errorapplication">
                <template slot-scope="scope">
                  <user :disabled="!disabled" :error="errorapplication" :no="scope.row" :selectType="selectType"
                        :userlist="scope.row.application"
                        @getUserids="getUserids1" style="width: 10.15rem"></user>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1022FORMVIEW_KIND')" align="center" prop="kind" width="190">
                <template slot-scope="scope">
                  <dicselect
                    :no="scope.row"
                    :code="code"
                    :data="scope.row.kind"
                    :multiple="multiple"
                    @change="getKind"
                    style="width: 11rem"
                    :disabled="!disabled">
                  </dicselect>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1022FORMVIEW_CARDNUMBER')" align="center" prop="cardnumber"
                               width="140">
                <template slot-scope="scope">
                  <el-input :disabled="!disabled" maxlength="20" :no="scope.row" v-model="scope.row.cardnumber">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column align="center" width="90">
                <template slot-scope="scope">
                <el-checkbox
                  v-model="scope.row.dis"
                  :disabled="!disabled"
                  :key="index"
                  @change="getChecked(scope.row.dis,scope.$index)"
                  active-value="1"
                  inactive-value="0"
                >{{$t('label.PFANS1022FORMVIEW_CONTINUOUS')}}</el-checkbox>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1022FORMVIEW_ATTENDANCEDATE')" align="center"
                               prop="attendancedate" width="190">
                <template slot-scope="scope">
                  <el-date-picker :disabled="!disabled" :key="index" :readonly="scope.row.dis" type="date" :no="scope.row" v-model="scope.row.attendancedate"
                                  style="width: 11rem"></el-date-picker>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1022FORMVIEW_PERIOD')" align="center" prop="startdate"
                               width="370">
                <template slot-scope="scope">
                  <el-date-picker unlink-panels
                                  class="bigWidth"
                                  :disabled="!disabled"
                                  :readonly="!scope.row.dis"
                                  v-model="scope.row.startdate"
                                  type="daterange"
                                  :end-placeholder="$t('label.enddate')"
                                  :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                                  :start-placeholder="$t('label.startdate')"
                  ></el-date-picker>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1022FORMVIEW_REASONSWORK')" align="center" prop="workreasons"
                               width="140">
                <template slot-scope="scope">
                  <el-input :disabled="!disabled" maxlength="20" :no="scope.row" v-model="scope.row.workreasons">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.operation')" align="center" width="180">
                <template slot-scope="scope">
                  <el-button
                    :disabled="!disabled"
                    @click.native.prevent="deleteRow(scope.$index, tableD)"
                    @change="getContinuity"
                    plain
                    size="small"
                    type="danger"
                  >{{$t('button.delete')}}
                  </el-button>
                  <el-button
                    :disabled="!disabled"
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
    import EasyNormalContainer from "@/components/EasyNormalContainer";
    import dicselect from "../../../components/dicselect.vue";
    import user from "../../../components/user.vue";
    import {Message} from 'element-ui'
    import {getOrgInfoByUserId} from '@/utils/customize';
    import moment from "moment";

    export default {
        name: 'PFANS1022FormView',
        components: {
            EasyNormalContainer,
            getOrgInfoByUserId,
            dicselect,
            user,
        },
        data() {
            var checkuser = (rule, value, callback) => {
                if (!value || value === '' || value === "undefined") {
                    this.erroruser = this.$t('normal.error_09') + this.$t('label.applicant');
                    return callback(new Error(this.$t('normal.error_09') + this.$t('label.applicant')));
                } else {
                    this.erroruser = "";
                    return callback();
                }

            };
            var checkapplication = (rule, value, callback) => {
                if (!value || value === '' || value === "undefined") {
                    this.errorapplication = this.$t('normal.error_09') + this.$t('label.applicant');
                    return callback(new Error(this.$t('normal.error_09') + this.$t('label.applicant')));
                } else {
                    this.errorapplication = "";
                    return callback();
                }
            };
            return {
                index: "",
                baseInfo: {},
                userlist: "",
                loading: false,
                erroruser: '',
                errorapplication: '',
                selectType: "Single",
                title: 'title.PFANS1022VIEW',
                buttonList: [],
                multiple: false,
                form: {
                    center_id: '',
                    group_id: '',
                    team_id: '',
                    user_id: '',
                    type: this.$t('menu.PFANS1022'),
                    dailypayment: moment(new Date()).format("YYYY-MM-DD"),
                    extension: '',
                },
                tableD: [
                    {
                        holidaydetailid: '',
                        holidayid: '',
                        application: '',
                        kind: ' ',
                        cardnumber: '',
                        attendancedate: '',
                        workreasons: '',
                        startdate: [],
                        dis: false,
                    },
                ],
                code: 'PJ028',
                disabled: false,
                disabled2: true,
                disabled1: false,
                menuList: [],
                rules: {
                    user_id: [
                        {
                            required: true,
                            validator: checkuser,
                            trigger: 'change'
                        },
                    ],
                    application: [
                        {
                            required: true,
                            validator: checkapplication,
                            trigger: 'change'
                        },
                    ],
                    dailypayment: [
                        {
                            required: true,
                            message: this.$t('normal.error_09') + this.$t('label.application_date'),
                            trigger: 'change'
                        },
                    ],
                    extension: [{
                         required: true,
                         message:  this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS1018FORMVIEW_INSIDENUMBER'),
                         trigger: 'blur',
                     }],
                },
                canStart: false,
            };
        },

        mounted() {
            this.loading = true;
            if (this.$route.params._id) {
                this.$store
                    .dispatch('PFANS1022Store/selectById', {"holidayid": this.$route.params._id})
                    .then(response => {
                        this.form = response.holiday;
                        if (response.holidaydetail.length > 0) {
                            for (let j = 0; j < response.holidaydetail.length; j++) {
                                if (response.holidaydetail[j].startdate !== '' && response.holidaydetail[j].startdate !== null) {
                                    let startdate = response.holidaydetail[j].startdate;
                                    let serdate = startdate.slice(0, 10);
                                    let serdate1 = startdate.slice(startdate.length - 10);
                                    response.holidaydetail[j].startdate = [serdate, serdate1];

                                }
                            }
                            this.tableD = response.holidaydetail;
                            for (let i = 0; i < this.tableD.length; i++) {
                                if (this.tableD[i].attendancedate !== null) {
                                    this.tableD[i].dis = false;
                                } else {
                                    this.tableD[i].dis = true;
                                }
                            }
                        }
                        this.userlist = this.form.user_id;
                        if (this.form.status === '2') {
                            this.disable = false;
                        }
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
            } else {
                this.userlist = this.$store.getters.userinfo.userid;
                if (this.userlist !== null && this.userlist !== '') {
                    let lst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
                    this.form.center_id = lst.centerNmae;
                    this.form.group_id = lst.groupNmae;
                    this.form.team_id = lst.teamNmae;
                    this.form.user_id = this.$store.getters.userinfo.userid;
                }
                this.loading = false;
            }
        },
        created() {
            this.disabled = this.$route.params.disabled;
            if (this.disabled) {
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
        methods: {
            getUserids(val) {
                this.userlist = val;
                this.form.user_id = val;
                let lst = getOrgInfoByUserId(val);
                this.form.center_id = lst.centerNmae;
                this.form.group_id = lst.groupNmae;
                this.form.team_id = lst.teamNmae;
                if (!this.form.user_id || this.form.user_id === '' || val === "undefined") {
                    this.erroruser = this.$t('normal.error_09') + this.$t('label.applicant');
                } else {
                    this.erroruser = "";
                }
            },
            getUserids1(val, row) {
                row.application = val;
                if (!row.application || row.application === '' || val === "undefined") {
                    row.errorapplication = this.$t('normal.error_09') + this.$t('label.applicant');
                } else {
                    row.errorapplication = "";
                }
            },
            getChecked(val,index) {
                for (let i = 0; i < this.tableD.length; i++) {
                    if (val === true && index === i) {
                        this.tableD[index].attendancedate = '';
                    }else{
                        this.tableD[index].startdate = [];
                    }
                }
            },
            getKind(val, row) {
                row.kind = val;
            },
            getContinuity(){
                if(this.rows.tableD.attendancedate == ''){
                    this.rows.tableD.dis = true;
                }else{
                    this.rows.tableD.dis = false;
                }
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
            deleteRow(index, rows) {
                if (rows.length > 1) {
                    rows.splice(index, 1);
                }else{
                    this.tableD = [{
                        application: '',
                        kind: ' ',
                        cardnumber: '',
                        attendancedate: '',
                        workreasons: '',
                        startdate: [],
                        dis:''
                    }]
                }
            },
            addRow() {
                this.tableD.push({
                    holidaydetailid: '',
                    holidayid: '',
                    application: '',
                    kind: ' ',
                    cardnumber: '',
                    attendancedate: '',
                    workreasons: '',
                    startdate: [],
                });
            },
            buttonClick(val) {
                this.$refs["refform"].validate(valid => {
                    if (valid) {
                        this.loading = true;
                        this.baseInfo = {};
                        this.baseInfo.holiday = JSON.parse(JSON.stringify(this.form));
                        this.baseInfo.holidaydetail = [];
                        for (let i = 0; i < this.tableD.length; i++) {
                            if(this.tableD[i].dis){
                                this.tableD[i].attendancedate = "";
                            }
                            else{
                                this.tableD[i].startdate = [];
                            }
                            if (this.tableD[i].application !== '' || this.tableD[i].kind !== '' || this.tableD[i].cardnumber !== '' ||
                                this.tableD[i].attendancedate !== '' || this.tableD[i].workreasons !== '' || this.tableD[i].startdate.length !== 0
                               ) {
                                let varstartdate;
                                if(this.tableD[i].startdate.length > 0){
                                    varstartdate = moment(this.tableD[i].startdate[0]).format('YYYY-MM-DD') + " ~ " + moment(this.tableD[i].startdate[1]).format('YYYY-MM-DD');
                                }
                                this.baseInfo.holidaydetail.push(
                                    {
                                        holidaydetailid: this.tableD[i].holidaydetailid,
                                        holidayid: this.tableD[i].holidayid,
                                        application: this.tableD[i].application,
                                        kind: this.tableD[i].kind,
                                        cardnumber: this.tableD[i].cardnumber,
                                        attendancedate: this.tableD[i].attendancedate,
                                        workreasons: this.tableD[i].workreasons,
                                        startdate: varstartdate,
                                    },
                                );
                            }
                        }
                        if (this.$route.params._id) {
                            this.form.holidayid = this.$route.params._id;
                            this.$store
                                .dispatch('PFANS1022Store/update', this.baseInfo)
                                .then(response => {
                                    this.data = response;
                                    this.loading = false;
                                    if (val !== "update") {
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
                                    this.loading = false;
                                })
                        } else {
                            this.$store
                                .dispatch('PFANS1022Store/insert', this.baseInfo)
                                .then(response => {
                                    this.data = response;
                                    this.loading = false;
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
                                    this.loading = false;
                                })
                        }
                    }
                });
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
