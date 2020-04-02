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
                <el-input :disabled="true" style="width:20vw" v-model="centerid"></el-input>
                <el-input v-show='false' v-model="form.center_id" :disabled="true" style="width: 20vw" maxlength='36'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')">
                <el-input :disabled="true" style="width:20vw" v-model="groupid"></el-input>
                <el-input v-show='false' v-model="form.group_id" :disabled="true" style="width: 20vw" maxlength='36'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')">
                <el-input :disabled="true" style="width:20vw" v-model="teamid"></el-input>
                <el-input v-show='false' v-model="form.team_id" :disabled="true" style="width: 20vw" maxlength='36'></el-input>
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
                <el-input v-model="form.type" :disabled="!disabled1" style="width: 20vw" maxlength='20'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.application_date')" prop="dailypayment" >
                <el-date-picker :disabled="!disabled" type="date" v-model="form.dailypayment" style="width: 20vw" ></el-date-picker>
              </el-form-item>
            </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                  <div class="sub_color_blue" >{{$t('label.PFANS1021FORMVIEW_DETAIL')}}</div>
              </el-col>
            </el-row>
          <el-row>
            <el-table :data="tableD" border stripe header-cell-class-name="sub_bg_color_blue">
              <el-table-column :label="$t('label.PFANS2006VIEW_NO')" align="center" fixed prop="content"
                               type="index"></el-table-column>
              <el-table-column :label="$t('label.PFANS1020FORMVIEW_USERNAME')" align="center" prop="username" :error="errorusername">
                <template slot-scope="scope">
                  <user :disabled="!disabled" :error="errorusername" :no="scope.row" :selectType="selectType" :userlist="scope.row.username"
                        @getUserids="getUserids1" style="width: 10.15rem"></user>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1020FORMVIEW_RANK')" align="center" prop="rank">
                <template slot-scope="scope">
                  <dicselect
                    :no="scope.row"
                    :code="code"
                    :data="scope.row.rank"
                    :multiple="multiple"
                    @change="getRank"
                    style="width: 11rem"
                    :disabled="!disabled">
                  </dicselect>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1020FORMVIEW_MAILADDRESS')" align="center" prop="mailaddress">
                <template slot-scope="scope">
                  <el-input :disabled="!disabled" maxlength="20" :no="scope.row" v-model="scope.row.mailaddress">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1021FORMVIEW_REASON')" align="center" prop="reason">
                <template slot-scope="scope">
                  <el-input :disabled="!disabled" maxlength="20" :no="scope.row" v-model="scope.row.reason">
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
    name: 'PFANS1020FormView',
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
        var checkusername = (rule, value, callback) => {
            if(!value || value === '' || value ==="undefined"){
                this.errorusername = this.$t('normal.error_09') + this.$t('label.applicant');
                return callback(new Error(this.$t('normal.error_09') + this.$t('label.applicant')));
            }else{
                this.errorusername = "";
                return callback();
            }

        };
      return {
          centerid: '',
          groupid: '',
          teamid: '',
          baseInfo: {},
          userlist: "",
          loading: false,
          erroruser: '',
          errorusername: '',
          selectType: "Single",
          title: 'title.PFANS1020VIEW',
          buttonList: [],
          multiple: false,
        form: {
            center_id: '',
            group_id: '',
            team_id: '',
            user_id: '',
            type: this.$t('menu.PFANS1020'),
            dailypayment: moment(new Date()).format("YYYY-MM-DD"),
        },
          tableD: [
              {
                  outsidedetailid: '',
                  outsideid: '',
                  username:'',
                  rank:'',
                  mailaddress:'',
                  reason:'',
              },
          ],
          code: 'PJ028',
          disabled: false,
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
            username: [
                {
                    required: true,
                    validator: checkusername,
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
        },
          canStart: false,
      };
    },

    mounted() {
        this.loading = true;
      if (this.$route.params._id) {
        this.$store
          .dispatch('PFANS1020Store/selectById', {"outsideid": this.$route.params._id})
          .then(response => {
              this.form = response.outside;
              let rst = getOrgInfoByUserId(response.outside.user_id);
              if(rst){
                  this.centerid = rst.centerNmae;
                  this.groupid= rst.groupNmae;
                  this.teamid= rst.teamNmae;
              }
              if (response.outsidedetail.length > 0) {
              this.tableD = response.outsidedetail;
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
        this.userlist = val;
        this.form.user_id = val;
        let rst = getOrgInfoByUserId(val);
          if(rst) {
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
        getUserids1(val,row) {
            row.username = val;
            if (!row.username || row.username === '' || val === "undefined") {
                row.errorusername = this.$t('normal.error_09') + this.$t('label.applicant');
            } else {
                row.errorusername = "";
            }
        },
        getRank(val,row){
          row.rank = val;
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
                        outsidedetailid: '',
                        outsideid: '',
                        username:'',
                        rank:'',
                        mailaddress:'',
                        reason:'',
                    },
                ]
            }
        },
        addRow() {
            this.tableD.push({
                outsidedetailid: '',
                outsideid: '',
                username:'',
                rank:'',
                mailaddress:'',
                reason:'',
            });
        },
      buttonClick(val) {
          this.$refs["refform"].validate(valid => {
            if (valid) {
              this.loading = true;
              this.baseInfo = {};
              this.baseInfo.outside = JSON.parse(JSON.stringify(this.form));
              this.baseInfo.outsidedetail = [];
                for (let i = 0; i < this.tableD.length; i++) {
                    if (this.tableD[i].username !== '' || this.tableD[i].rank !== '' || this.tableD[i].mailaddress !== '' ||
                        this.tableD[i].reason !== '') {
                        this.baseInfo.outsidedetail.push(
                            {
                                outsidedetailid: this.tableD[i].outsidedetailid,
                                outsideid: this.tableD[i].outsideid,
                                username: this.tableD[i].username,
                                rank: this.tableD[i].rank,
                                mailaddress: this.tableD[i].mailaddress,
                                reason: this.tableD[i].reason,
                            },
                        );
                    }
                }
              if (this.$route.params._id) {
                this.baseInfo.outsideid = this.$route.params._id;
                this.$store
                  .dispatch('PFANS1020Store/update', this.baseInfo)
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

              } else {
                this.$store
                  .dispatch('PFANS1020Store/insert', this.baseInfo)
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
