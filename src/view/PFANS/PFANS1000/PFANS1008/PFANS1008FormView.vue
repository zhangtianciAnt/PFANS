<template>
  <div style="min-height: 100%">
    <EasyNormalContainer ref="container" :title="title" @buttonClick="buttonClick" v-loading="loading" :buttonList="buttonList"
                         @workflowState="workflowState" :canStart="canStart" @start="start" @end="end">
      <div slot="customize">
        <el-form :model="form" label-width="8vw" label-position="top" style="padding: 2vw" :rules="rules"
                 ref="refform">
          <el-collapse>
            <el-collapse-item>
              <template slot="title">
                <span  class="collapse_Title">{{$t('title.PFANS1008VIEW')}}</span>
              </template>
          <el-row>
            <el-col :span="8">
              <el-form-item  :label="$t('label.center')">
                <el-input :disabled="true" style="width:20vw" v-model="centerid"></el-input>
                <el-input v-show='false'  v-model="form.center_id" :disabled="true" style="width:20vw" ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')">
                <el-input :disabled="true" style="width:20vw" v-model="groupid"></el-input>
                <el-input v-show='false'  v-model="form.group_id" :disabled="true" style="width:20vw"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')">
                <el-input :disabled="true" style="width:20vw" v-model="teamid"></el-input>
                <el-input v-show='false'  v-model="form.team_id" :disabled="true" style="width:20vw"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :error="erroruser"  :label="$t('label.applicant')" prop="user_id">
                <user :disabled="true" :error="erroruser" :selectType="selectType" :userlist="userlist"
                      @getUserids="getUserids" style="width: 20vw"></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1008FORMVIEW_INSIDENUMBER')" prop="insidenumber">
                <el-input v-model="form.insidenumber" :disabled="!disabled" style="width:20vw" maxlength='20'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1008FORMVIEW_MOBILEDAY')" prop="mobiledate" >
                <el-date-picker :disabled="!disabled" type="date" v-model="form.mobiledate" style="width:20vw" ></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
            </el-collapse-item>
          </el-collapse>
          <el-collapse>
            <el-collapse-item>
              <template slot="title">
                <span  class="collapse_Title">{{$t('label.PFANS1008FORMVIEW_CROSSINGDEPARTMENT')}}</span>
              </template>

          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')">
                <org  :orglist="form.ferryteam_id" orgtype="3" :disabled="!disabled" style="width:20vw" @getOrgids="getTeamId1"></org>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :error="errorferrygroup" :label="$t('label.group')" prop="ferrygroup_id" >
                <org  :orglist="form.ferrygroup_id" orgtype="2" :disabled="!disabled" :error="errorferrygroup" style="width:20vw" @getOrgids="getGroupId1"></org>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :error="errorferrycenter"  :label="$t('label.center')"  prop="ferrycenter_id">
                <org  :orglist="form.ferrycenter_id" :error="errorferrycenter" orgtype="1" :disabled="!disabled" style="width:20vw" @getOrgids="getCenterId1"></org>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1012FORMVIEW_BUDGET')">
                <el-input :disabled="true" style="width:20vw" v-model="form.ferrybudgetunit" maxlength='50'></el-input>
              </el-form-item>
            </el-col>
          </el-row>
            </el-collapse-item>
          </el-collapse>
          <el-collapse>
            <el-collapse-item>
              <template slot="title">
                <span  class="collapse_Title">{{$t('label.PFANS1008FORMVIEW_TRANSFERDEPARTMENT')}}</span>
              </template>

          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')">
                <org  :orglist="form.tubeteam_id" orgtype="3" :disabled="!disabled" style="width:20vw" @getOrgids="getTeamId2"></org>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :error="errortubegroup" :label="$t('label.group')" prop="tubegroup_id" >
                <org  :orglist="form.tubegroup_id" orgtype="2" :disabled="!disabled" :error="errortubegroup" style="width:20vw" @getOrgids="getGroupId2"></org>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :error="errortubecenter"  :label="$t('label.center')"  prop="tubecenter_id">
                <org  :orglist="form.tubecenter_id" :error="errortubecenter" orgtype="1" :disabled="!disabled" style="width:20vw" @getOrgids="getCenterId2"></org>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.budgetunit')" prop="tubebudgetunit" >
                <el-input :disabled="!disabled" style="width:20vw" v-model="form.tubebudgetunit" maxlength='50'></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-table :data="tableD" header-cell-class-name="sub_bg_color_blue" stripe border>
              <el-table-column :label="$t('label.PFANS2006VIEW_NO')" fixed type="index"></el-table-column>
              <el-table-column :label="$t('label.PFANS1008FORMVIEW_ASSETMANAGEMENTNUMBER')" align="center" width="200">
                <template slot-scope="scope">
                  <el-input :no="scope.row" :disabled="!disabled" maxlength="20" v-model="scope.row.management">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1008FORMVIEW_ASSETNAME')" align="center" width="200">
                <template slot-scope="scope">
                  <el-input :no="scope.row" :disabled="!disabled" maxlength="20" v-model="scope.row.assetname">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1008FORMVIEW_RESPONSIBLEPERSON')" align="center" width="200">
                <template slot-scope="scope">
                  <user :no="scope.row" :disabled="!disabled" :selectType="selectType" :userlist="scope.row.person" @getUserids="getUseridsperson"></user>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1008FORMVIEW_RESPONSIBLEAFTER')" align="center" width="200">
                <template slot-scope="scope">
                  <user :no="scope.row" :disabled="!disabled" :selectType="selectType" :userlist="scope.row.eafter" @getUserids="getUseridseafter"></user>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1008FORMVIEW_REASONFORMOVEMENT')" align="center" width="200">
                <template slot-scope="scope">
                  <el-input :no="scope.row" :disabled="!disabled" maxlength="50" v-model="scope.row.reason">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.operation')" align="center" width="200">
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
            </el-collapse-item>
          </el-collapse>
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
  import {getOrgInfoByUserId,getOrgInfo} from '@/utils/customize';
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
        // var checkferrycenter = (rule, value, callback) => {
        //     if(!value || value === ''){
        //         this.errorferrycenter = this.$t('normal.error_09') + this.$t('label.center');
        //         return callback(new Error(this.$t('normal.error_09') + this.$t('label.center')));
        //     }else{
        //         this.errorferrycenter = "";
        //         return callback();
        //     }
        //
        // };
        // var checkferrygroup = (rule, value, callback) => {
        //     if(!value || value === ''){
        //         this.errorferrygroup = this.$t('normal.error_09') + this.$t('label.group');
        //         return callback(new Error(this.$t('normal.error_09') + this.$t('label.group')));
        //     }else{
        //         this.errorferrygroup = "";
        //         return callback();
        //     }
        //
        // };
        // var checktubecenter = (rule, value, callback) => {
        //     if(!value || value === ''){
        //         this.errortubecenter = this.$t('normal.error_09') + this.$t('label.center');
        //         return callback(new Error(this.$t('normal.error_09') + this.$t('label.center')));
        //     }else{
        //         this.errortubecenter = "";
        //         return callback();
        //     }
        //
        // };
        // var checktubegroup = (rule, value, callback) => {
        //     if(!value || value === ''){
        //         this.errortubegroup = this.$t('normal.error_09') + this.$t('label.group');
        //         return callback(new Error(this.$t('normal.error_09') + this.$t('label.group')));
        //     }else{
        //         this.errortubegroup = "";
        //         return callback();
        //     }
        //
        // };
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
      var ferrycenterId = (rule, value, callback) => {
        if (!this.form.ferrycenter_id || this.form.ferrycenter_id === "") {
          callback(new Error(this.$t("normal.error_08") + "center"));
          this.errorferrycenter = this.$t("normal.error_08") + "center";
        } else {
          callback();
        }
      };
      var tubecenterId = (rule, value, callback) => {
        if (!this.form.tubecenter_id || this.form.tubecenter_id === "") {
          callback(new Error(this.$t("normal.error_08") + "center"));
          this.errortubecenter = this.$t("normal.error_08") + "center";
        } else {
          callback();
        }
      };
      return {
          centerid: '',
          groupid: '',
          teamid: '',
          baseInfo: {},
          // ferrycenterorglist: '',
          // ferrygrouporglist: '',
          // ferryteamorglist: '',
          // tubecenterorglist: '',
          // tubegrouporglist: '',
          // tubeteamorglist: '',
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
            ferrycentername: "",
            ferrygroupname: "",
            ferryteamname: "",
            ferrycenter_id: '',
            ferrygroup_id: '',
            ferryteam_id: '',
            tubecentername: "",
            tubegroupname: "",
            tubeteamname: "",
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
                  eafter:'',
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
                    validator: ferrycenterId,
                    trigger: 'change'
                },
            ],
            tubecenter_id: [
                {
                    required: true,
                    validator: tubecenterId,
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
            insidenumber: [
                {
                    required: true,
                    message: this.$t('normal.error_08') + this.$t('label.PFANS3001VIEW_EXTENSIONNUMBER'),
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
      if (this.$route.params._org) {
        ({
          ferrycentername: this.form.ferrycentername,
          ferrygroupname: this.form.ferrygroupname,
          ferryteamname: this.form.ferryteamname,
          ferrycenter_id: this.form.ferrycenter_id,
          ferrygroup_id: this.form.ferrygroup_id,
          ferryteam_id: this.form.ferryteam_id
        } = this.$route.params._org);
      }
      if (this.$route.params._org) {
        ({
          tubecentername: this.form.tubecentername,
          tubegroupname: this.form.tubegroupname,
          tubeteamname: this.form.tubeteamname,
          tubecenter_id: this.form.tubecenter_id,
          tubegroup_id: this.form.tubegroup_id,
          tubeteam_id: this.form.tubeteam_id
        } = this.$route.params._org);
      }
        this.loading = true;
      if (this.$route.params._id) {
        this.$store
          .dispatch('PFANS1008Store/selectById', {"softwaretransferid": this.$route.params._id})
          .then(response => {
              this.form = response.softwaretransfer;
              let rst = getOrgInfoByUserId(response.softwaretransfer.user_id);
              if(rst) {
                  this.centerid = rst.centerNmae;
                  this.groupid = rst.groupNmae;
                  this.teamid = rst.teamNmae;
              }
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
            if(getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId)){
                this.form.ferrybudgetunit = getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId).encoding;
            }
            let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
            if(rst) {
                this.centerid = rst.centerNmae;
                this.groupid = rst.groupNmae;
                this.teamid = rst.teamNmae;
                this.form.center_id = rst.centerId;
                this.form.group_id = rst.groupId;
                this.form.team_id = rst.teamId;
            }
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
          this.form.user_id = val;
          let rst = getOrgInfoByUserId(val);
          if(getOrgInfo(getOrgInfoByUserId(val).groupId)){
              this.form.ferrybudgetunit = getOrgInfo(getOrgInfoByUserId(val).groupId).encoding;
          }
          if(rst){
              this.centerid = rst.centerNmae;
              this.groupid = rst.groupNmae;
              this.teamid = rst.teamNmae;
              this.form.center_id = rst.centerId;
              this.form.group_id = rst.groupId;
              this.form.team_id = rst.teamId;
          }else{
              this.centerid =  '';
              this.groupid =  '';
              this.teamid =  '';
              this.form.center_id = '';
              this.form.group_id =  '';
              this.form.team_id =  '';
          }
        if (!this.form.user_id || this.form.user_id === '' || val === "undefined") {
          this.erroruser = this.$t('normal.error_09') + this.$t('label.applicant');
        } else {
          this.erroruser = "";
        }
      },
        getUseridsperson(val,row) {
            row.person = val;
        },
        getUseridseafter(val,row) {
            row.eafter = val;
        },
      getCenterId1(val) {
        this.getOrgInformation(val);
        if (!val || this.form.ferrycenter_id === "") {
          this.errorferrycenter = this.$t("normal.error_08") + "center";
        } else {
          this.errorferrycenter = "";
        }
      },
      getGroupId1(val) {
        this.getOrgInformation(val);
        if (this.form.ferrycenter_id === "") {
          this.errorferrygroup = this.$t("normal.error_08") + "center";
        } else {
          this.errorferrygroup = "";
        }
      },
        getTeamId1(val) {
          this.getOrgInformation(val);
          if (this.form.center_id === "") {
            this.errorgroup = this.$t("normal.error_08") + "center";
          } else {
            this.errorgroup = "";
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
              org.ferrycentername = treeCom.getNode(node).data.departmentname;


              org.ferryteam_id = treeCom.getNode(node).data._id;
            }
            if (index === 2) {
              org.ferrygroupname = treeCom.getNode(node).data.departmentname;
              org.ferrygroup_id = treeCom.getNode(node).data._id;
            }
            if (index === 1) {
              org.ferrycentername = treeCom.getNode(node).data.companyname;
              org.ferrycenter_id = treeCom.getNode(node).data._id;
            }
            node = treeCom.getNode(node).parent.data._id;
          }
          ({
            ferrycentername: this.form.ferrycentername,
            ferrygroupname: this.form.ferrygroupname,
            ferryteamname: this.form.ferryteamname,
            ferrycenter_id: this.form.ferrycenter_id,
            ferrygroup_id: this.form.ferrygroup_id,
            ferryteam_id: this.form.ferryteam_id,
          } = org);
        }
      },
        getCenterId2(val) {
          this.getOrgInformation1(val);
          if (!val || this.form.tubecenter_id === "") {
            this.errortubecenter = this.$t("normal.error_08") + "center";
          } else {
            this.errortubecenter = "";
          }
        },
        getGroupId2(val) {
          this.getOrgInformation1(val);
          if (this.form.tubecenter_id === "") {
            this.errortubegroup = this.$t("normal.error_08") + "center";
          } else {
            this.errortubegroup = "";
          }
        },
        getTeamId2(val) {
          this.getOrgInformation1(val);
          if (this.form.tubecenter_id === "") {
            this.errortubegroup = this.$t("normal.error_08") + "center";
          } else {
            this.errortubegroup = "";
          }
        },
      getOrgInformation1(id) {
        let org = {};
        let treeCom = this.$store.getters.orgs;

        if (id && treeCom.getNode(id)) {
          let node = id;
          let type = treeCom.getNode(id).data.type || 0;
          for (let index = parseInt(type); index >= 1; index--) {
            if (parseInt(type) === index && ![1, 2].includes(parseInt(type))) {
              org.tubecentername = treeCom.getNode(node).data.departmentname;


              org.tubeteam_id = treeCom.getNode(node).data._id;
            }
            if (index === 2) {
              org.tubegroupname = treeCom.getNode(node).data.departmentname;
              org.tubegroup_id = treeCom.getNode(node).data._id;
            }
            if (index === 1) {
              org.tubecentername = treeCom.getNode(node).data.companyname;
              org.tubecenter_id = treeCom.getNode(node).data._id;
            }
            node = treeCom.getNode(node).parent.data._id;
          }
          ({
            tubecentername: this.form.tubecentername,
            tubegroupname: this.form.tubegroupname,
            tubeteamname: this.form.tubeteamname,
            tubecenter_id: this.form.tubecenter_id,
            tubegroup_id: this.form.tubegroup_id,
            tubeteam_id: this.form.tubeteam_id,
          } = org);
        }
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
            }else{
                this.tableD = [
                    {
                        notificationid: '',
                        softwaretransferid: '',
                        management:'',
                        assetname:'',
                        person:null,
                        eafter:null,
                        reason:'',
                    },
                ]
            }
        },
        addRow() {
            this.tableD.push({
                notificationid: '',
                softwaretransferid: '',
                management:'',
                assetname:'',
                person:'',
                eafter:'',
                reason:'',
            });
        },
        paramsTitle(){
            this.$router.push({
                name: 'PFANS1037FormView',
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
    },
    // watch: {
    //   'form.ferrygroupname': {
    //     handler: function () {
    //       debugger
    //       if(this.form.ferrygroup_id){
    //        this.form.tubebudgetunit =  getOrgInfo(getOrgInfoByUserId(this.form.ferrygroup_id)).encoding;
    //       }
    //     },
    //   }
    // }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
