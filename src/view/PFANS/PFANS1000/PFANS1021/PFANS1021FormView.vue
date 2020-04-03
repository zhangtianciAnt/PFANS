<template>
  <div style="min-height: 100%">
    <EasyNormalContainer ref="container" :title="title" @buttonClick="buttonClick" v-loading="loading" :buttonList="buttonList"
                         @workflowState="workflowState" :canStart="canStart" @start="start" @end="end">
      <div slot="customize">
        <el-form :model="form" label-width="8vw" label-position="top" style="padding: 3vw" :rules="rules"
                 ref="refform">
          <el-row>
            <el-col :span="8">
              <el-form-item  :label="$t('label.center')">
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
              <el-form-item :error="erroruser"  :label="$t('label.applicant')" prop="user_id">
                <user :disabled="true" :error="erroruser" :selectType="selectType" :userlist="userlist"
                      @getUserids="getUserids" style="width: 20vw"></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.pfanstype')" prop="type">
                <el-input v-model="form.type" :disabled="!disabled1" style="width: 20vw" maxlength='36'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.subtype')" prop="subtype">
                <dicselect
                  :code="code"
                  :data="form.subtype"
                  :multiple="multiple"
                  @change="getSubtype"
                  style="width: 20vw"
                  :disabled="!disabled">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
            <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.application_date')" prop="application" >
                <el-date-picker :disabled="true" type="date" v-model="form.application" style="width: 20vw" ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1017FORMVIEW_EXTENSION')" prop="extension">
                <el-input v-model="form.extension" :disabled="!disabled" style="width: 20vw" maxlength='20'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.email')" prop="email">
                <el-input v-model="form.email" :disabled="!disabled" style="width: 20vw" maxlength='50'></el-input>
              </el-form-item>
            </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS1021FORMVIEW_REASON')" prop="reason">
                  <el-input v-model="form.reason" type="textarea" :disabled="!disabled" style="width: 71.4vw"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          <el-row>
            <el-col :span="8">
              <div class="sub_color_blue" >{{$t('label.PFANS1021FORMVIEW_DETAIL')}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-table :data="form.tableD" stripe border header-cell-class-name="sub_bg_color_blue">
              <el-table-column :label="$t('label.PFANS2006VIEW_NO')" align="center" fixed prop="content"
                               type="index"></el-table-column>
              <el-table-column :label="$t('label.applicant')" align="center" prop="title" width="200" :error="errortitle">
                <template slot-scope="scope">
                  <el-form-item :prop="'tableD.' + scope.$index + '.title'" :rules='rules1.title'>
                  <user :disabled="!disabled" :no="scope.row" :error="errortitle" :selectType="selectType" :userlist="scope.row.title"
                        @getUserids="getUserids1" style="width: 10.15rem"></user>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.center')" align="center" prop="detailcenter" width="200">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.detailcenter_id" :no="scope.row" :disabled="true" style="width: 11rem" maxlength='36'></el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.group')" align="center" prop="detailgroup" width="200">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.detailgroup_id" :no="scope.row" :disabled="true" style="width: 11rem" maxlength='36'></el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.team')" align="center" prop="detailteam" width="200">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.detailteam_id" :no="scope.row" :disabled="true" style="width: 11rem" maxlength='36'></el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1021FORMVIEW_PHONENUMBER')" align="center" prop="phonenumber"  width="200">
                <template slot-scope="scope">
                  <el-input :disabled="true" :no="scope.row" maxlength="20" v-model="scope.row.phonenumber">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.email')" align="center" prop="emaildetail"  width="200">
                <template slot-scope="scope">
                  <el-input :disabled="true" :no="scope.row" maxlength="20" v-model="scope.row.emaildetail">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1021FORMVIEW_STARTDATE')" align="center" prop="startdate"  width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tableD.' + scope.$index + '.startdate'" :rules='rules1.startdate'>
                  <el-date-picker :disabled="!disabled" :no="scope.row" type="date" v-model="scope.row.startdate" style="width: 11rem"></el-date-picker>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1021FORMVIEW_FABUILDING')" align="center" prop="fabuilding"  width="200" :error="errorFabuilding">
                <template slot-scope="scope">
                  <el-form-item :prop="'tableD.' + scope.$index + '.fabuilding'" :rules='rules1.fabuilding'>
                  <dicselect
                    :error="errorFabuilding"
                    :no="scope.row"
                    :code="code1"
                    :data="scope.row.fabuilding"
                    :multiple="multiple"
                    @change="getFabuilding"
                    style="width: 11rem"
                    :disabled="!disabled">
                  </dicselect>
                  </el-form-item>
                </template>
              </el-table-column>
<!--              <el-table-column :label="$t('label.PFANS1021FORMVIEW_FBBUILDING')" align="center" prop="fbbuilding"  width="200">-->
<!--                <template slot-scope="scope">-->
<!--                  <dicselect-->
<!--                    :no="scope.row"-->
<!--                    :code="code2"-->
<!--                    :data="scope.row.fbbuilding"-->
<!--                    :multiple="multiple"-->
<!--                    @change="getFbbuilding"-->
<!--                    style="width: 11rem"-->
<!--                    :disabled="!disabled">-->
<!--                  </dicselect>-->
<!--                </template>-->
<!--              </el-table-column>-->
<!--              <el-table-column :label="$t('label.PFANS1021FORMVIEW_SHOWROOM')" align="center" prop="fbbuilding"  width="200">-->
<!--                <template slot-scope="scope">-->
<!--                  <dicselect-->
<!--                    :no="scope.row"-->
<!--                    :code="code2"-->
<!--                    :data="scope.row.showroom"-->
<!--                    :multiple="multiple"-->
<!--                    @change="getshowroom"-->
<!--                    style="width: 11rem"-->
<!--                    :disabled="!disabled">-->
<!--                  </dicselect>-->
<!--                </template>-->
<!--              </el-table-column>-->
              <el-table-column :label="$t('label.PFANS1021FORMVIEW_ENTRYMANAGER')" align="center" prop="entrymanager" :error="errorNtrymanager" width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tableD.' + scope.$index + '.entrymanager'" :rules='rules1.entrymanager'>
                  <user :disabled="!disabled" :error="errorNtrymanager" :no="scope.row" :selectType="selectType" :userlist="scope.row.entrymanager"
                        @getUserids="getUserids2" style="width: 10.15rem"></user>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.operation')" align="center" width="200">
                <template slot-scope="scope">
                  <el-button
                    :disabled="!disabled"
                    @click.native.prevent="deleteRow(scope.$index, form.tableD)"
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
  import { Message } from 'element-ui'
  import {getOrgInfoByUserId,getUserInfo} from '@/utils/customize';
  import org from "../../../components/org";
  import {validateEmail} from '@/utils/validate';
  import moment from "moment";

  export default {
    name: 'PFANS1021FormView',
    components: {
        EasyNormalContainer,
        getOrgInfoByUserId,
        dicselect,
        user,
        org
    },
    data() {
      var checkuser = (rule, value, callback) => {
        if(!value || value === '' || value ==="undefined"){
          this.erroruser = this.$t('normal.error_09') + this.$t('label.applicant');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.applicant')));
        }else{
          this.erroruser = "";
          return callback();
        }

      };
        var checktitle = (rule, value, callback) => {
            if(!value || value === ''){
                this.errortitle = this.$t('normal.error_09') + this.$t('label.applicant');
                return callback(new Error(this.$t('normal.error_09') + this.$t('label.applicant')));
            }else{
                this.errortitle = "";
                return callback();
            }

        };
        var checkeFabuilding = (rule, value, callback) => {
            if(!value || value === ''){
                this.errorFabuilding = this.$t('normal.error_09') + this.$t('label.PFANS1021FORMVIEW_FABUILDING');
                return callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS1021FORMVIEW_FABUILDING')));
            }else{
                this.errorFabuilding = "";
                return callback();
            }

        };
        var checkeNtrymanager = (rule, value, callback) => {
            if(!value || value === ''){
                this.errorNtrymanager = this.$t('normal.error_09') + this.$t('label.PFANS1021FORMVIEW_ENTRYMANAGER');
                return callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS1021FORMVIEW_ENTRYMANAGER')));
            }else{
                this.errorNtrymanager = "";
                return callback();
            }

        };
        // var checkentrymanager = (rule, value, callback) => {
        //     if(!value || value === ''){
        //         this.errorentrymanager = this.$t('normal.error_09') + this.$t('label.PFANS1021FORMVIEW_ENTRYMANAGER');
        //         return callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS1021FORMVIEW_ENTRYMANAGER')));
        //     }else{
        //         this.errorentrymanager = "";
        //         return callback();
        //     }
        //
        // };
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
          baseInfo: {},
          userlist: "",
          loading: false,
          erroruser: '',
          errortitle: '',
          errorFabuilding: '',
          errorNtrymanager: '',
          selectType: "Single",
          title: 'title.PFANS1021VIEW',
          buttonList: [],
          multiple: false,
        form: {
            center_id: '',
            group_id: '',
            team_id: '',
            user_id: '',
            type: this.$t('menu.PFANS1021'),
            subtype: '',
            application: moment(new Date()).format("YYYY-MM-DD"),
            extension: '',
            email: '',
            reason: '',
          tableD: [
            {
              securitydetailid: '',
              securityid: '',
              title: '',
              detailcenter_id: '',
              detailgroup_id: '',
              detailteam_id: '',
              phonenumber: '',
              emaildetail: '',
              startdate: '',
              fabuilding: '',
              // fbbuilding: ' ',
              // showroom: ' ',
              entrymanager: '',
            },
          ],
        },
          code: 'PJ029',
          code1: 'PJ030',
          disabled: false,
          disabled1: false,
          menuList: [],
        rules1:{
          title:[{
            required: true,
            // message: this.$t('normal.error_09') + this.$t('label.applicant'),
            validator: checktitle,
            trigger: 'change'
          }],
          entrymanager:[{
            required: true,
            // message: this.$t('normal.error_09') + this.$t('label.PFANS1021FORMVIEW_ENTRYMANAGER'),
            validator: checkeNtrymanager,
            trigger: 'change'
          }],
          fabuilding:[{
            required: true,
            // message: this.$t('normal.error_09') + this.$t('label.PFANS1021FORMVIEW_FABUILDING'),
            validator: checkeFabuilding,
            trigger: 'change'
          }],
          startdate:[{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS1021FORMVIEW_STARTDATE'),
            trigger: 'change'
          }],
        },
        rules: {
          user_id: [
            {
              required: true,
              validator: checkuser,
              trigger: 'change'
            },
          ],
            title: [
                {
                    required: true,
                    validator: checktitle,
                    trigger: 'change'
                },
            ],
            // entrymanager: [
            //     {
            //         required: true,
            //         validator: checkentrymanager,
            //         trigger: 'change'
            //     },
            // ],
            extension: [
                {
                    required: true,
                    message: this.$t('normal.error_08') + this.$t('label.PFANS3001VIEW_EXTENSIONNUMBER'),
                    trigger: 'change'
                },
            ],
            reason: [
                {
                    required: true,
                    message: this.$t('normal.error_08') + this.$t('label.PFANS1021FORMVIEW_REASON'),
                    trigger: 'change'
                },
            ],
            application: [
                {
                    required: true,
                    message: this.$t('normal.error_09') + this.$t('label.application_date'),
                    trigger: 'change'
                },
            ],
            type: [
                {
                    required: true,
                    message: this.$t('normal.error_09') + this.$t('label.pfanstype'),
                    trigger: 'change'
                },
            ],
            subtype: [
                {
                    required: true,
                    message: this.$t('normal.error_09') + this.$t('label.subtype'),
                    trigger: 'change'
                },
            ],
            email: [
                {
                    validator: checkemail,
                    trigger: 'change'
                },
            ],
        },
          canStart:false,
      };
    },

    mounted() {
      this.loading = true;
      if (this.$route.params._id) {
        this.$store
          .dispatch('PFANS1021Store/selectById', {"securityid": this.$route.params._id})
          .then(response => {
              this.form = response.security;
              let rst = getOrgInfoByUserId(response.security.user_id);
              if(rst){
                  this.center_id = rst.centerNmae;
                  this.group_id= rst.groupNmae;
                  this.team_id= rst.teamNmae;
              }
              if (response.securitydetail.length > 0) {
                  this.form.tableD = response.securitydetail;
              }
              this.userlist = this.form.user_id;
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
        if (this.userlist !== null && this.userlist !== '') {
          let lst1 = getUserInfo(this.$store.getters.userinfo.userid);
          this.form.phonenumber = lst1.userinfo.mobilenumber;
          this.form.emaildetail = lst1.userinfo.email;
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
        getUserids1(val,row) {
            row.title = val;
            let lst = getOrgInfoByUserId(val);
            let lst1 = getUserInfo(val);
            row.detailcenter_id = lst.centerNmae;
            row.detailgroup_id = lst.groupNmae;
            row.detailteam_id = lst.teamNmae;
            row.phonenumber = lst1.userinfo.mobilenumber;
            row.emaildetail = lst1.userinfo.email;
            if (!row.title || row.title === '' || val === "undefined") {
                row.errortitle = this.$t('normal.error_09') + this.$t('label.applicant');
            } else {
                row.errortitle = "";
            }
        },
        getUserids2(val,row) {
            this.userlist2 = val;
            row.entrymanager = val;
            if (!row.title || row.title === '' || val === "undefined") {
                row.errorentrymanager = this.$t('normal.error_09') + this.$t('label.PFANS1021FORMVIEW_ENTRYMANAGER');
            } else {
                row.errorentrymanager = "";
            }
        },
        getFabuilding(val,row) {
            row.fabuilding = val;
        },
        getSubtype(val) {
            this.form.subtype = val;
        },
        // getFbbuilding(val,row) {
        //     row.fbbuilding = val;
        // },
        // getshowroom(val,row) {
        //     row.showroom = val;
        // },
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
                this.form.tableD = [
                    {
                        securitydetailid: '',
                        securityid: '',
                        title: '',
                        detailcenter_id: '',
                        detailgroup_id: '',
                        detailteam_id: '',
                        phonenumber: '',
                        emaildetail: '',
                        startdate: '',
                        fabuilding: '',
                        // fbbuilding: ' ',
                        // showroom: ' ',
                        entrymanager: '',
                    },
                ]
            }
        },
        addRow() {
            this.form.tableD.push({
                securitydetailid: '',
                securityid: '',
                title:'',
                detailcenter_id:'',
                detailgroup_id:'',
                detailteam_id:'',
                phonenumber:'',
                emaildetail:'',
                startdate: '',
                fabuilding:'',
                // fbbuilding:' ',
                // showroom: ' ',
                entrymanager:'',
            });
        },
      buttonClick(val) {
          this.$refs["refform"].validate(valid => {
            if (valid) {
              this.baseInfo = {};
              this.form.application = moment(this.form.application).format('YYYY-MM-DD');
              this.baseInfo.security = JSON.parse(JSON.stringify(this.form));
              this.baseInfo.securitydetail = [];
              for (let i = 0; i < this.form.tableD.length; i++) {
                    if (this.form.tableD[i].title.trim() === '' || this.form.tableD[i].detailcenter_id !== '' || this.form.tableD[i].detailgroup_id !== '' ||
                        this.form.tableD[i].detailteam_id !== '' || this.form.tableD[i].phonenumber !== '' || this.form.tableD[i].emaildetail !== ''
                        || this.form.tableD[i].startdate !== '' || this.form.tableD[i].fabuilding !== ''|| this.form.tableD[i].entrymanager !== '') {
                        this.baseInfo.securitydetail.push(
                            {
                                securitydetailid: this.form.tableD[i].securitydetailid,
                                securityid: this.form.tableD[i].securityid,
                                title: this.form.tableD[i].title,
                                detailcenter_id: this.form.tableD[i].detailcenter_id,
                                detailgroup_id: this.form.tableD[i].detailgroup_id,
                                detailteam_id: this.form.tableD[i].detailteam_id,
                                phonenumber: this.form.tableD[i].phonenumber,
                                emaildetail: this.form.tableD[i].emaildetail,
                                startdate: this.form.tableD[i].startdate,
                                fabuilding: this.form.tableD[i].fabuilding,
                                // fbbuilding: this.form.tableD[i].fbbuilding,
                                // showroom: this.form.tableD[i].showroom,
                                entrymanager: this.form.tableD[i].entrymanager,
                            },
                        );
                    }
                }
              let error = 0;
              let error1 = 0;
              let error2 = 0;
              let error3 = 0;
              for (let i = 0; i < this.form.tableD.length; i++) {
                if (this.form.tableD[i].title == "") {
                  error = error + 1;
                }
              }
              for (let i = 0; i < this.form.tableD.length; i++) {
                if (this.form.tableD[i].fabuilding == "") {
                  error1 = error1 + 1;
                }
              }
              for (let i = 0; i < this.form.tableD.length; i++) {
                if (this.form.tableD[i].entrymanager == "") {
                  error2 = error2 + 1;
                }
              }
              for (let i = 0; i < this.form.tableD.length; i++) {
                if (this.form.tableD[i].startdate == "") {
                  error3 = error3 + 1;
                }
              }
              if (error != 0) {
                Message({
                  message: this.$t('normal.error_08') +
                    this.$t('label.applicant'),
                  type: 'error',
                  duration: 5 * 1000,
                });
              } else if (error3 != 0) {
                Message({
                  message: this.$t('normal.error_08') +
                    this.$t('label.PFANS1021FORMVIEW_STARTDATE'),
                  type: 'error',
                  duration: 5 * 1000,
                });
              } else if (error1 != 0) {
                Message({
                  message: this.$t('normal.error_08') +
                    this.$t('label.PFANS1021FORMVIEW_FABUILDING'),
                  type: 'error',
                  duration: 5 * 1000,
                });
              } else if (error2 != 0) {
                Message({
                  message: this.$t('normal.error_08') +
                    this.$t('label.PFANS1021FORMVIEW_ENTRYMANAGER'),
                  type: 'error',
                  duration: 5 * 1000,
                });
              } else if (!this.$route.params._id){
                this.loading = true;
                this.$store
                  .dispatch('PFANS1021Store/insert', this.baseInfo)
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
              } else {
                this.baseInfo.securityid = this.$route.params._id;
                this.$store
                  .dispatch('PFANS1021Store/update', this.baseInfo)
                  .then(response => {
                    this.data = response;
                    this.loading = false;
                    if(val !== "update") {
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

              }

            }
            else{
                Message({
                    message: this.$t("normal.error_12"),
                    type: 'error',
                    duration: 5 * 1000
                });
            }
          });
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
