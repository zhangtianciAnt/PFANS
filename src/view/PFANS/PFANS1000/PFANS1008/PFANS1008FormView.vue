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
                <el-input v-model="form.center_id" :disabled="true" style="width: 11rem" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')">
                <el-input v-model="form.group_id" :disabled="true" style="width: 11rem"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')">
                <el-input v-model="form.team_id" :disabled="true" style="width: 11rem"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :error="erroruser"  :label="$t('label.applicant')" prop="user_id">
                <user :disabled="!disabled" :error="erroruser" :selectType="selectType" :userlist="userlist"
                      @getUserids="getUserids" style="width: 10.2rem"></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1008FORMVIEW_INSIDENUMBER')" prop="insidenumber">
                <el-input v-model="form.insidenumber" :disabled="!disabled" style="width: 11rem" maxlength='20'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1008FORMVIEW_MOBILEDAY')" prop="mobiledate" >
                <el-date-picker :disabled="!disabled" type="date" v-model="form.mobiledate" style="width: 11rem" ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div class="sub_color_blue" >{{$t('label.PFANS1008FORMVIEW_CROSSINGDEPARTMENT')}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :error="errorferrycenter"  :label="$t('label.center')"  prop="ferrycenter_id">
                <org  :orglist="ferrycenterorglist" :error="errorferrycenter" orgtype="1" :disabled="!disabled" style="width: 9rem" @getOrgids="getCenterId1"></org>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :error="errorferrygroup" :label="$t('label.group')" prop="ferrygroup_id" >
                <org  :orglist="ferrygrouporglist" orgtype="2" :disabled="!disabled" :error="errorferrygroup" style="width: 9rem" @getOrgids="getGroupId1"></org>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')">
                <org  :orglist="ferryteamorglist" orgtype="3" :disabled="!disabled" style="width: 9rem" @getOrgids="getTeamId1"></org>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.budgetunit')" prop="ferrybudgetunit" >
                <dicselect
                  :code="code"
                  :data="form.ferrybudgetunit"
                  :multiple="multiple"
                  @change="getFerrybudgetunit"
                  style="width: 11rem"
                  :disabled="!disabled">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div class="sub_color_blue" >{{$t('label.PFANS1008FORMVIEW_TRANSFERDEPARTMENT')}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :error="errortubecenter"  :label="$t('label.center')"  prop="tubecenter_id">
                <org  :orglist="tubecenterorglist" :error="errortubecenter" orgtype="1" :disabled="!disabled" style="width: 9rem" @getOrgids="getCenterId2"></org>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :error="errortubegroup" :label="$t('label.group')" prop="tubegroup_id" >
                <org  :orglist="tubegrouporglist" orgtype="2" :disabled="!disabled" :error="errortubegroup" style="width: 9rem" @getOrgids="getGroupId2"></org>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')">
                <org  :orglist="tubeteamorglist" orgtype="3" :disabled="!disabled" style="width: 9rem" @getOrgids="getTeamId2"></org>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.budgetunit')" prop="tubebudgetunit" >
                <dicselect
                  :code="code1"
                  :data="form.tubebudgetunit"
                  :multiple="multiple"
                  @change="getTubebudgetunit"
                  style="width: 11rem"
                  :disabled="!disabled">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-table :data="tableD" header-cell-class-name="sub_bg_color_grey height">
              <el-table-column :label="$t('label.PFANS2006VIEW_NO')" align="center" fixed prop="content"
                               type="index"></el-table-column>
              <el-table-column :label="$t('label.PFANS1008FORMVIEW_ASSETMANAGEMENTNUMBER')" align="center" prop="management" width="165">
                <template slot-scope="scope">
                  <el-input :no="scope.row" :disabled="!disabled" maxlength="20" v-model="scope.row.management">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1008FORMVIEW_ASSETNAME')" align="center" prop="assetname"  width="165">
                <template slot-scope="scope">
                  <el-input :no="scope.row" :disabled="!disabled" maxlength="20" v-model="scope.row.assetname">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1008FORMVIEW_RESPONSIBLEPERSON')" align="center" prop="person" width="160" :error="errorperson">
                <template slot-scope="scope">
                  <user :no="scope.row" :disabled="!disabled" :selectType="selectType" :userlist="scope.row.person" @getUserids="getUseridsperson" :error="errorperson"></user>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1008FORMVIEW_RESPONSIBLEAFTER')" align="center" prop="eafter" width="165" :error="erroreafter">
                <template slot-scope="scope">
                  <user :no="scope.row" :disabled="!disabled" :selectType="selectType" :userlist="scope.row.eafter" @getUserids="getUseridseafter" :error="erroreafter"></user>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1008FORMVIEW_REASONFORMOVEMENT')" align="center" prop="reason"  width="165">
                <template slot-scope="scope">
                  <el-input :no="scope.row" :disabled="!disabled" maxlength="50" v-model="scope.row.reason">
                  </el-input>
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
    name: 'PFANS1008FormView',
    components: {
        EasyNormalContainer,
        dicselect,
        user,
        org
    },
    data() {
      var checkuser = (rule, value, callback) => {
        if(!value || value === ''){
          this.erroruser = this.$t('normal.error_09') + this.$t('label.applicant');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.applicant')));
        }else{
          this.erroruser = "";
          return callback();
        }

      };
        var checkferrycenter = (rule, value, callback) => {
            if(!value || value === ''){
                this.errorferrycenter = this.$t('normal.error_09') + this.$t('label.center');
                return callback(new Error(this.$t('normal.error_09') + this.$t('label.center')));
            }else{
                this.errorferrycenter = "";
                return callback();
            }

        };
        var checkferrygroup = (rule, value, callback) => {
            if(!value || value === ''){
                this.errorferrygroup = this.$t('normal.error_09') + this.$t('label.group');
                return callback(new Error(this.$t('normal.error_09') + this.$t('label.group')));
            }else{
                this.errorferrygroup = "";
                return callback();
            }

        };
        var checktubecenter = (rule, value, callback) => {
            if(!value || value === ''){
                this.errortubecenter = this.$t('normal.error_09') + this.$t('label.center');
                return callback(new Error(this.$t('normal.error_09') + this.$t('label.center')));
            }else{
                this.errortubecenter = "";
                return callback();
            }

        };
        var checktubegroup = (rule, value, callback) => {
            if(!value || value === ''){
                this.errortubegroup = this.$t('normal.error_09') + this.$t('label.group');
                return callback(new Error(this.$t('normal.error_09') + this.$t('label.group')));
            }else{
                this.errortubegroup = "";
                return callback();
            }

        };
        var checkperson = (rule, value, callback) => {
            if(!value || value === ''){
                this.errorperson = this.$t('normal.error_09') + this.$t('label.person');
                return callback(new Error(this.$t('normal.error_09') + this.$t('label.person')));
            }else{
                this.errorperson = "";
                return callback();
            }

        };
        var checkeafter = (rule, value, callback) => {
            if(!value || value === ''){
                this.erroreafter = this.$t('normal.error_09') + this.$t('label.eafter');
                return callback(new Error(this.$t('normal.error_09') + this.$t('label.eafter')));
            }else{
                this.erroreafter = "";
                return callback();
            }

        };
      return {
          baseInfo: {},
          ferrycenterorglist: '',
          ferrygrouporglist: '',
          ferryteamorglist: '',
          tubecenterorglist: '',
          tubegrouporglist: '',
          tubeteamorglist: '',
          userlist: '',
          loading: false,
          erroruser: '',
          errorferrycenter: '',
          errorferrygroup: '',
          errortubecenter: '',
          errortubegroup: '',
          errorperson: '',
          erroreafter: '',
          checked: true,
          selectType: "Single",
          title: "title.PFANS1008VIEW",
          buttonList: [],
          tabIndex: 0,
          multiple: false,
        form: {
            department: '',
            center_id: '',
            group_id: '',
            team_id: '',
            user_id: '',
            insidenumber: '',
            filename: '',
            mobiledate: moment(new Date()).format("YYYY-MM-DD"),
            ferrycenter_id: '',
            ferrygroup_id: '',
            ferryteam_id: '',
            tubecenter_id: '',
            tubegroup_id: '',
            tubeteam_id: '',
            ferrybudgetunit: '',
            tubebudgetunit: '',
          },
          tableD: [
              {
                  notificationid: '',
                  softwaretransferid: '',
                  management:'',
                  assetname:'',
                  person:'',
                  errorperson:'',
                  eafter:'',
                  erroreafter:'',
                  reason:'',
              },
          ],
          code: 'PG002',
          code1: 'PG001',
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
            ferrycenter_id: [
                {
                    required: true,
                    validator: checkferrycenter,
                    trigger: 'change'
                },
            ],
            ferrygroup_id: [
                {
                    required: true,
                    validator: checkferrygroup,
                    trigger: 'change'
                },
            ],
            tubecenter_id: [
                {
                    required: true,
                    validator: checktubecenter,
                    trigger: 'change'
                },
            ],
            tubegroup_id: [
                {
                    required: true,
                    validator: checktubegroup,
                    trigger: 'change'
                },
            ],
            person: [
                {
                    required: true,
                    validator: checkperson,
                    trigger: 'change'
                },
            ],
            eafter: [
                {
                    required: true,
                    validator: checkeafter,
                    trigger: 'change'
                },
            ],
            mobiledate: [
                {
                    required: true,
                    message: this.$t('normal.error_09') + this.$t('label.PFANS1008FORMVIEW_MOBILEDAY'),
                    trigger: 'change'
                },
            ],
            ferrybudgetunit: [
                {
                    required: true,
                    message: this.$t('normal.error_09') + this.$t('label.budgetunit'),
                    trigger: 'change'
                },
            ],
            tubebudgetunit: [
                {
                    required: true,
                    message: this.$t('normal.error_09') + this.$t('label.budgetunit'),
                    trigger: 'change'
                },
             ],
            management: [
                {
                    required: true,
                    message: this.$t('normal.error_08') + this.$t('label.PFANS1008FORMVIEW_ASSETMANAGEMENTNUMBER'),
                    trigger: 'blue'
                },
            ],
            assetname: [
                {
                    required: true,
                    message: this.$t('normal.error_08') + this.$t('label.PFANS1008FORMVIEW_ASSETNAME'),
                    trigger: 'blue'
                },
            ],
            reason: [
                {
                    required: true,
                    message: this.$t('normal.error_09') + this.$t('label.PFANS1008FORMVIEW_REASONFORMOVEMENT'),
                    trigger: 'blue'
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
          .dispatch('PFANS1008Store/selectById', {"softwaretransferid": this.$route.params._id})
          .then(response => {
              this.form = response.softwaretransfer;
              this.ferrycenterorglist = this.form.ferrycenter_id;
              this.ferrygrouporglist = this.form.ferrygroup_id;
              this.ferryteamorglist = this.form.ferryteam_id;
              this.tubecenterorglist = this.form.tubecenter_id;
              this.tubegrouporglist = this.form.tubegroup_id;
              this.tubeteamorglist = this.form.tubeteam_id;
              if (response.notification.length > 0) {
                  this.tableD = response.notification;
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
            this.form.user_id = this.$store.getters.userinfo.userid;
            let lst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
            this.form.center_id = lst.centerNmae;
            this.form.group_id = lst.groupNmae;
            this.form.team_id = lst.teamNmae;
        }
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
        getUseridsperson(val,row) {
            row.person = val;
            if (!row.person || row.person === '' || val === "undefined") {
                row.errorperson = this.$t('normal.error_09') + this.$t('label.applicant');
            } else {
                row.errorperson = "";
            }
        },
        getUseridseafter(val,row) {
            row.eafter = val;
            if (!row.eafter || row.eafter === '' || val === "undefined") {
                row.erroreafter = this.$t('normal.error_09') + this.$t('label.applicant');
            } else {
                row.erroreafter = "";
            }
        },
      getCenterId1(val) {
        this.form.ferrycenter_id = val;
        if (!this.form.ferrycenter_id || this.form.ferrycenter_id === '' || val === "undefined") {
          this.errorferrycenter = this.$t('normal.error_09') + this.$t('label.center');
        } else {
          this.errorferrycenter = "";
        }
      },
      getGroupId1(val) {
        this.form.ferrygroup_id = val;
        this.ferrygrouporglist = val;
        if (!this.form.ferrygroup_id || this.form.ferrygroup_id === '' || val === "undefined") {
          this.errorferrygroup = this.$t('normal.error_09') + this.$t('label.group');
        } else {
          this.errorferrygroup = "";
        }
      },
        getTeamId1(val) {
            this.form.ferryteam_id = val;
            this.ferryteamorglist = val;
        },
        getCenterId2(val) {
            this.form.tubecenter_id = val;
            this.tubecenterorglist = val;
            if (!this.form.tubecenter_id || this.form.tubecenter_id === '' || val === "undefined") {
                this.errortubecenter = this.$t('normal.error_09') + this.$t('label.center');
            } else {
                this.errortubecenter = "";
            }
        },
        getGroupId2(val) {
            this.form.tubegroup_id = val;
            this.tubegrouporglist = val;
            if (!this.form.tubegroup_id || this.form.tubegroup_id === '' || val === "undefined") {
                this.errortubegroup = this.$t('normal.error_09') + this.$t('label.group');
            } else {
                this.errortubegroup = "";
            }
        },
        getTeamId2(val) {
            this.form.tubeteam_id = val;
            this.tubeteamorglist = val;
        },
        getFerrybudgetunit(val) {
        this.form.ferrybudgetunit = val;
        },
        getTubebudgetunit(val) {
            this.form.tubebudgetunit = val;
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
                notificationid: '',
                softwaretransferid: '',
                management:'',
                assetname:'',
                person:'',
                errorperson:'',
                eafter:'',
                erroreafter:'',
                reason:'',
            });
        },
        paramsTitle(){
            this.$router.push({
                name: 'PFANS1001FormView',
                params: {
                    title: 8,
                },
            });
        },
      buttonClick(val) {
          if (val === 'back') {
              this.paramsTitle();
          } else {
              this.$refs["refform"].validate(valid => {
                  if (valid) {
                      this.loading = true;
                      this.baseInfo = {};
                      this.form.mobiledate = moment(this.form.mobiledate).format('YYYY-MM-DD');
                      this.baseInfo.softwaretransfer = JSON.parse(JSON.stringify(this.form));
                      this.baseInfo.notification = [];
                      for (let i = 0; i < this.tableD.length; i++) {
                          if (this.tableD[i].management !== '' || this.tableD[i].assetname !== '' || this.tableD[i].person !== '' ||
                              this.tableD[i].eafter !== '' || this.tableD[i].reason !== '') {
                              this.baseInfo.notification.push(
                                  {
                                      notificationid: this.tableD[i].notificationid,
                                      softwaretransferid: this.tableD[i].softwaretransferid,
                                      management: this.tableD[i].management,
                                      assetname: this.tableD[i].assetname,
                                      person: this.tableD[i].person,
                                      eafter: this.tableD[i].eafter,
                                      reason: this.tableD[i].reason,
                                  },
                              );
                          }
                      }
                      if (this.$route.params._id) {
                          this.baseInfo.softwaretransferid = this.$route.params._id;
                          this.form.ferrycenter_id = this.ferrycenterorglist;
                          this.form.ferrygroup_id = this.ferrygrouporglist;
                          this.form.ferryteam_id = this.ferryteamorglist;
                          this.form.tubecenter_id = this.tubecenterorglist;
                          this.form.tubegroup_id = this.tubegrouporglist;
                          this.form.tubeteam_id = this.tubeteamorglist;
                          this.$store
                              .dispatch('PFANS1008Store/updateSoftwaretransfer', this.baseInfo)
                              .then(response => {
                                  this.data = response;
                                  this.loading = false;
                                  if(val !== "update") {
                                      Message({
                                          message: this.$t("normal.success_02"),
                                          type: 'success',
                                          duration: 5 * 1000
                                      });
                                      this.paramsTitle();
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

                      } else{
                          this.$store
                              .dispatch('PFANS1008Store/insert', this.baseInfo)
                              .then(response => {
                                  this.data = response;
                                  this.loading = false;
                                  Message({
                                      message: this.$t("normal.success_01"),
                                      type: 'success',
                                      duration: 5 * 1000
                                  });
                                  this.paramsTitle();
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
  }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
