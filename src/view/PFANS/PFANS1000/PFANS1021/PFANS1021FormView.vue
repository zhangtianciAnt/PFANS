<template>
  <div style="min-height: 100%">
    <EasyNormalContainer ref="container" :title="title" @buttonClick="buttonClick" v-loading="loading" :buttonList="buttonList"
                         @workflowState="workflowState" :canStart="canStart" @start="start" @end="end">
      <div slot="customize">
        <el-form :model="form" label-width="8rem" label-position="left" style="padding: 2rem" :rules="rules"
                 ref="refform">
          <el-row>
            <el-col :span="8">
              <el-form-item  :label="$t('label.center')">
                <el-input v-model="form.center_id" :disabled="true" style="width: 11rem" maxlength='36'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')">
                <el-input v-model="form.group_id" :disabled="true" style="width: 11rem" maxlength='36'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')" prop="team_id">
                <el-input v-model="form.team_id" :disabled="true" style="width: 11rem" maxlength='36'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :error="erroruser"  :label="$t('label.applicant')" prop="user_id">
                <user :disabled="!disabled" :error="erroruser" :selectType="selectType" :userlist="userlist"
                      @getUserids="getUserids" style="width: 10.15rem"></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.pfanstype')" prop="type">
                <dicselect
                  :code="code"
                  :data="form.type"
                  :multiple="multiple"
                  @change="getType"
                  style="width: 11rem"
                  :disabled="!disabled">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.subtype')" prop="subtype">
                <dicselect
                  :code="code1"
                  :data="form.subtype"
                  :multiple="multiple"
                  @change="getSubtype"
                  style="width: 11rem"
                  :disabled="!disabled">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.application_date')" prop="application" >
                <el-date-picker :disabled="!disabled" type="date" v-model="form.application" style="width: 11rem" ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1017FORMVIEW_EXTENSION')" prop="extension">
                <el-input v-model="form.extension" :disabled="!disabled" style="width: 11rem" maxlength='20'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item :label="$t('label.email')" prop="email">
                <el-input v-model="form.email" type="textarea" :disabled="!disabled" style="width: 34rem" maxlength='50'></el-input>
              </el-form-item>
            </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS1021FORMVIEW_REASON')" prop="reason">
                  <el-input v-model="form.reason" type="textarea" :disabled="!disabled" style="width: 57rem"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          <el-row>
            <el-table :data="tableD" header-cell-class-name="sub_bg_color_grey height">
              <el-table-column :label="$t('label.PFANS2006VIEW_NO')" align="center" fixed prop="content"
                               type="index"></el-table-column>
              <el-table-column :label="$t('label.applicant')" align="center" prop="title" width="165" :error="errortitle">
                <template slot-scope="scope">
                  <user :disabled="!disabled" :error="errortitle" :selectType="selectType" :userlist="userlist1"
                        @getUserids="getUserids1" style="width: 10.15rem"></user>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.center')" align="center" prop="detailcenter" width="165">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.detailcenter_id" :disabled="true" style="width: 11rem" maxlength='36'></el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.group')" align="center" prop="detailgroup" width="165">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.detailgroup_id" :disabled="true" style="width: 11rem" maxlength='36'></el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.team')" align="center" prop="detailteam" width="165">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.detailteam_id" :disabled="true" style="width: 11rem" maxlength='36'></el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1021FORMVIEW_PHONENUMBER')" align="center" prop="phonenumber"  width="165">
                <template slot-scope="scope">
                  <el-input :disabled="!disabled" maxlength="20" v-model="scope.row.phonenumber">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.email')" align="center" prop="emaildetail"  width="165">
                <template slot-scope="scope">
                  <el-input :disabled="!disabled" maxlength="20" v-model="scope.row.emaildetail">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1021FORMVIEW_STARTDATE')" align="center" prop="startdate"  width="165">
                <template slot-scope="scope">
                  <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.startdate" style="width: 11rem" ></el-date-picker>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1021FORMVIEW_FABUILDING')" align="center" prop="fabuilding"  width="165">
                <template slot-scope="scope">
                  <dicselect
                    :code="code2"
                    :data="form.fabuilding"
                    :multiple="multiple"
                    @change="getFabuilding"
                    style="width: 11rem"
                    :disabled="!disabled">
                  </dicselect>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1021FORMVIEW_FBBUILDING')" align="center" prop="fbbuilding"  width="165">
                <template slot-scope="scope">
                  <dicselect
                    :code="code3"
                    :data="form.fbbuilding"
                    :multiple="multiple"
                    @change="getFbbuilding"
                    style="width: 11rem"
                    :disabled="!disabled">
                  </dicselect>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1021FORMVIEW_ENTRYMANAGER')" align="center" prop="entrymanager" :error="errorentrymanager" width="165">
                <template slot-scope="scope">
                  <user :disabled="!disabled" :error="errorentrymanager" :selectType="selectType" :userlist="userlist2"
                        @getUserids="getUserids2" style="width: 10.15rem"></user>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.operation')" align="center" width="180">
                <template slot-scope="scope">
                  <el-button
                    :disabled="!disabled"
                    @click.native.prevent="deleteRow(scope.$index, tableD)"
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
  import {getOrgInfoByUserId} from '@/utils/customize';
  import org from "../../../components/org";
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
      return {
          baseInfo: {},
          userlist: "",
          userlist1: "",
          userlist2: "",
          loading: false,
          erroruser: '',
          errortitle: '',
          errorentrymanager: '',
          selectType: "Single",
          title: 'title.PFANS1021VIEW',
          buttonList: [],
          multiple: false,
        form: {
            center_id: '',
            group_id: '',
            team_id: '',
            user_id: '',
            type: '',
            subtype: '',
            application: moment(new Date()).format("YYYY-MM-DD"),
            extension: '',
            email: '',
            reason: '',
        },
          tableD: [
              {
                  securitydetailid: '',
                  securityid: '',
                  title:'',
                  detailcenter_id:'',
                  detailgroup_id:'',
                  detailteam_id:'',
                  phonenumber:'',
                  emaildetail:'',
                  startdate:'',
                  fabuilding:'',
                  fbbuilding:'',
                  entrymanager:'',
              },
          ],
          code: 'PR002',
          code1: 'PR003',
          code2: 'PR003',
          code3: 'PR003',
          disabled: true,
          menuList: [],
        rules: {
          user_id: [
            {
              required: true,
              validator: checkuser,
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
        },
          canStart:false,
      };
    },

    mounted() {
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1021Store/getSecurityOne', {"securityid": this.$route.params._id})
          .then(response => {
            this.form = response;
            this.userlist = this.form.user_id;
            this.userlist1 = this.form.title;
            this.userlist2 = this.form.entrymanager;
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
          if (this.userlist1 !== null && this.userlist1 !== '') {
              let lst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
              this.form.detailcenter_id = lst.centerNmae;
              this.form.detailgroup_id = lst.groupNmae;
              this.form.detailteam_id = lst.teamNmae;
              this.form.title = this.$store.getters.userinfo.userid;
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
        getUserids1(val) {
            this.userlist1 = val;
            this.form.title = val;
            let lst = getOrgInfoByUserId(val);
            this.form.detailcenter_id = lst.centerNmae;
            this.form.detailgroup_id = lst.groupNmae;
            this.form.detailteam_id = lst.teamNmae;
            if (!this.form.title || this.form.title === '' || val === "undefined") {
                this.errortitle = this.$t('normal.error_09') + this.$t('label.applicant');
            } else {
                this.errortitle = "";
            }
        },
        getUserids2(val) {
            this.userlist2 = val;
            this.form.entrymanager = val;
            if (!this.form.title || this.form.title === '' || val === "undefined") {
                this.errorentrymanager = this.$t('normal.error_09') + this.$t('label.entrymanager');
            } else {
                this.errorentrymanager = "";
            }
        },
      getType(val) {
        this.form.type = val;
      },
        getFabuilding(val) {
        this.form.fabuilding = val;
      },
        getSubtype(val) {
            this.form.subtype = val;
        },
        getFbbuilding(val) {
            this.form.fbbuilding = val;
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
            }
        },
        addRow() {
            this.tableD.push({
                securitydetailid: '',
                securityid: '',
                title:'',
                detailcenter_id:'',
                detailgroup_id:'',
                detailteam_id:'',
                phonenumber:'',
                emaildetail:'',
                startdate:'',
                fabuilding:'',
                fbbuilding:'',
                entrymanager:'',
            });
        },
      buttonClick(val) {
          this.$refs["refform"].validate(valid => {
            if (valid) {
              this.loading = true;
              this.baseInfo = {};
              this.form.scheduleddate = moment(this.form.scheduleddate).format('YYYY-MM-DD');
              this.baseInfo.softwaretransfer = JSON.parse(JSON.stringify(this.form));
              this.baseInfo.notification = [];
              for (let i = 0; i < this.tableD.length; i++) {
                    if (this.tableD[i].title !== '' || this.tableD[i].detailcenter_id !== '' || this.tableD[i].detailgroup_id !== '' ||
                        this.tableD[i].detailteam_id !== '' || this.tableD[i].phonenumber !== '' || this.tableD[i].emaildetail !== ''
                        || this.tableD[i].startdate !== '' || this.tableD[i].fabuilding !== '' || this.tableD[i].fbbuilding !== '' || this.tableD[i].entrymanager !== '') {
                        this.baseInfo.notification.push(
                            {
                                securitydetailid: this.tableD[i].securitydetailid,
                                securityid: this.tableD[i].securityid,
                                title: this.tableD[i].title,
                                detailcenter_id: this.tableD[i].detailcenter_id,
                                detailgroup_id: this.tableD[i].detailgroup_id,
                                detailteam_id: this.tableD[i].detailteam_id,
                                phonenumber: this.tableD[i].phonenumber,
                                emaildetail: this.tableD[i].emaildetail,
                                startdate: this.tableD[i].startdate,
                                fabuilding: this.tableD[i].fabuilding,
                                fbbuilding: this.tableD[i].fbbuilding,
                                entrymanager: this.tableD[i].entrymanager,
                            },
                        );
                    }
                }
              if (this.$route.params._id) {
                this.form.judgementid = this.$route.params._id;
                this.$store
                  .dispatch('PFANS1021Store/updateSecurity', this.baseInfo)
                  .then(response => {
                    this.data = response;
                    this.loading = false;
                      if(val !== "update") {
                          Message({
                              message: this.$t("normal.success_02"),
                              type: 'success',
                              duration: 5 * 1000
                          });
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
                  .dispatch('PFANS1021Store/createSecurity', this.baseInfo)
                  .then(response => {
                    this.data = response;
                    this.loading = false;
                    Message({
                      message: this.$t("normal.success_01"),
                      type: 'success',
                      duration: 5 * 1000
                    });
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
