<template>
  <div style="min-height: 100%">`
    <EasyNormalContainer :buttonList="buttonList" :title="title" @buttonClick="buttonClick" ref="container"
                         @workflowState="workflowState" v-loading="loading"
                         :canStart="canStart" @start="start" @end="end">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="refform"
                 style="padding:3vw">
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.center')">
                <el-input :disabled="true" style="width:20vw" v-model="centerid"></el-input>
                <el-input v-show='false' :disabled="true" style="width:20vw" v-model="form.center_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')">
                <el-input :disabled="true" style="width:20vw" v-model="groupid"></el-input>
                <el-input v-show='false' :disabled="true" style="width:20vw" v-model="form.group_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')">
                <el-input :disabled="true" style="width:20vw" v-model="teamid"></el-input>
                <el-input v-show='false' :disabled="true" style="width:20vw" v-model="form.team_id"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.applicant')" prop="user_id">
                <user :disabled="true" :error="error" :selectType="selectType" :userlist="userlist"
                      style="width:20vw" @getUserids="getUserids"></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.application_date')" prop="casedate">
                <el-date-picker
                  :disabled="!disable"
                  style="width:20vw"
                  type="date"
                  v-model="form.casedate">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1009FORMVIEW_ASSETTYPE')" prop="assettype">
                <dicselect
                  :code="code1"
                  :data="form.assettype"
                  :disabled="!disable"
                  :multiple="multiple"
                  style="width:20vw"
                  @change="getassettype">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1009FORMVIEW_INSTALLSOFTWARE')" v-show="show">
                <span style="margin-right: 1vw ">{{$t('label.no')}}</span>
                <el-switch :disabled="!disable"
                           v-model="installsoftware"
                           active-value="0"
                           inactive-value="1"
                ></el-switch>
                <span style="margin-left: 1vw ">{{$t('label.yes')}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1009FORMVIEW_SUITABLEBRINGOUT')" v-show="show">
                <span style="margin-right: 1vw ">{{$t('label.no')}}</span>
                <el-switch :disabled="!disable"
                           v-model="suitablebringout"
                           active-value="0"
                           inactive-value="1"
                ></el-switch>
                <span style="margin-left: 1vw ">{{$t('label.yes')}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :error="errorassetname" :label="$t('label.PFANS1009FORMVIEW_ASSETNAME')"  prop="assetname">
                <template slot-scope="scope">
                  <el-input :disabled="!disable" style="width:20vw" v-model="form.assetname">
                  </el-input>
                </template>
                <!--ztc 0420 修改-->
                <!--<div class="dpSupIndex" style="width: 20vw" prop="assetname">-->
                <!--<el-container>-->
                <!--<input class="content bg" v-model="form.assetname" :error="errorassetname" :disabled="true"></input>-->
                <!--<el-button :disabled="!disable" icon="el-icon-search" @click="dialogTableVisible = true"-->
                <!--size="small"></el-button>-->
                <!--<el-dialog :title="$t('title.ASSETS1001FORMVIEW')" :visible.sync="dialogTableVisible" center size="50%"-->
                <!--top="8vh" lock-scroll-->
                <!--append-to-body>-->
                <!--<div style="text-align: center">-->
                <!--<el-row style="text-align: center;height: 90%;overflow: hidden">-->
                <!--<el-table-->
                <!--:data="gridData.filter(data => !search || data.assetname.toLowerCase().includes(search.toLowerCase()))"-->
                <!--height="500px" highlight-current-row style="width: 100%" tooltip-effect="dark"-->
                <!--:span-method="arraySpanMethod" @row-click="handleClickChange">-->
                <!--<el-table-column property="assetname" :label="$t('label.ASSETS1001VIEW_FILENAME')"-->
                <!--width="200"></el-table-column>-->
                <!--<el-table-column property="usedepart" :label="$t('label.ASSETS1001VIEW_USEDEPARTMENT')"-->
                <!--width="250"></el-table-column>-->
                <!--<el-table-column-->
                <!--align="right" width="200">-->
                <!--<template slot="header" slot-scope="scope">-->
                <!--<el-input-->
                <!--v-model="search"-->
                <!--size="mini"-->
                <!--:placeholder="$t('label.PFANS1016FORMVIEW_IMPORT')" />-->
                <!--</template>-->
                <!--</el-table-column>-->
                <!--</el-table>-->
                <!--</el-row>-->
                <!--<span slot="footer" class="dialog-footer">-->
                <!--<el-button type="primary" @click="submit">{{$t("button.confirm")}}</el-button>-->
                <!--</span>-->
                <!--</div>-->
                <!--</el-dialog>-->
                <!--</el-container>-->
                <!--</div>-->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1009FORMVIEW_ANCILLARYEQUIPMENT')" prop="">
                <el-input :disabled="!disable" style="width:20vw" v-model="form.ancillaryequipment"
                          maxlength=""></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1009FORMVIEW_RFID')" prop="">
                <el-input :disabled="!disable" style="width:20vw" v-model="form.rfid"
                          maxlength=""></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1009FORMVIEW_DUTYFREEINPUT')" prop="dutyfreeinput">
                <span style="margin-right: 1vw ">{{$t('label.PFANSUSERFORMVIEW_NO')}}</span>
                <el-switch
                  :disabled="!disable"
                  v-model="form.dutyfreeinput"
                  active-value="1"
                  inactive-value="0"
                  @change="radiochange">
                </el-switch>
                <span style="margin-left: 1vw ">{{$t('label.PFANSUSERFORMVIEW_YES')}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1009FORMVIEW_INPUTDATE')" prop="inputdate" v-show="show1">
                <el-date-picker
                  :disabled="!disable"
                  style="width:20vw"
                  type="date"
                  v-model="form.inputdate">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1009FORMVIEW_RELEASEDATE')" v-show="show2">
                <el-date-picker
                  :disabled="!disable"
                  style="width:20vw"
                  type="date"
                  v-model="form.releasedate">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1009FORMVIEW_OBJECTIVE')" prop="objective">
                <el-input :disabled="!disable" type="textarea" :rows="4" style="width:72vw"
                          v-model="form.objective"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1009FORMVIEW_BORROWING')">
                <el-input :disabled="!disable" type="textarea" :rows="4" style="width:72vw"
                          v-model="form.borrowing"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1009FORMVIEW_REPAIR')">
                <el-date-picker
                  v-model="form.repair"
                  class="bigWidth"
                  :disabled="!disable"
                  type="daterange"
                  unlink-panels
                  :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                  :start-placeholder="$t('label.startdate')"
                  :end-placeholder="$t('label.enddate')"
                  style="width: 20vw">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1009FORMVIEW_REPAIRKITS')">
                <dicselect
                  :code="code2"
                  :data="form.repairkits"
                  :disabled="!disable"
                  :multiple="multiple"
                  style="width:20vw"
                  @change="changerepairkits">
                </dicselect>
              </el-form-item>
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
  import {getOrgInfoByUserId} from '@/utils/customize';
  import moment from 'moment';

  export default {
    name: 'PFANS1009FormView',
    components: {
      EasyNormalContainer,
      dicselect,
      user,
    },
    data() {
      var validateUserid = (rule, value, callback) => {
        if (!value || value === '' || value === 'undefined') {
          callback(new Error(this.$t('normal.error_08') + this.$t('label.applicant')));
          this.error = this.$t('normal.error_08') + this.$t('label.applicant');
        } else {
          callback();
          this.error = '';
        }
      };
      return {
          centerid: '',
          groupid: '',
          teamid: '',
        dialogTableVisible: false,
        errorassetname: '',
        gridData: [],
        search: '',
        show1: true,
        show2: true,
        repair: '',
        installsoftware: '1',
        installsoftwareflg: '',
        suitablebringout: '1',
        suitablebringoutflg: '',
        loading: false,
        error: '',
        selectType: 'Single',
        userlist: '',
        title: 'title.PFANS1009VIEW',
        buttonList: [],
        tabIndex: 0,
        multiple: false,
        form: {
          dutyfreeinput: '0',
          user_id: '',
          center_id: '',
          group_id: '',
          team_id: '',
          casedate: moment(new Date()).format('YYYY-MM-DD'),
          assettype: '',
          installsoftware: '',
          suitablebringout: '',
          assetname: '',
          ancillaryequipment: '',
          inputdate: moment(new Date()).format('YYYY-MM-DD'),
          releasedate: '',
          objective: '',
          rfid: '',
          borrowing: '',
          repair: [],
          repairkits: '',
          nodeList: [],
        },
        code1: 'PJ009',
        code2: 'PJ010',
        menuList: [],
        disabled: false,
        show: false,
        rules: {
          user_id: [{
            required: true,
            validator: validateUserid,
            trigger: 'change',
          }],
          casedate: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.application_date'),
            trigger: 'change',
          }],
          inputdate: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS1009FORMVIEW_INPUTDATE'),
            trigger: 'blur',
          }],
          assetname: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1009FORMVIEW_ASSETNAME'),
            trigger: 'blur',
          }],
          objective: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1009FORMVIEW_OBJECTIVE'),
            trigger: 'change',
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
      console.log(this.form.dutyfreeinput);
      if (this.form.dutyfreeinput === '1') {
        this.show1 = true;
        this.show2 = true;
      } else {
        this.show2 = false;
        this.show1 = false;
      }
    },
    mounted() {
      // this.getAssetsnameList();
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1009Store/getFixedassetsOne', {'fixedassets_id': this.$route.params._id})
          .then(response => {
            this.form = response;
              let rst = getOrgInfoByUserId(response.user_id);
              if(rst){
                  this.centerid = rst.centerNmae;
                  this.groupid= rst.groupNmae;
                  this.teamid= rst.teamNmae;
              }
            this.userlist = this.form.user_id;
            this.installsoftware = this.form.installsoftware;
            this.installsoftwareflg = this.form.installsoftware;
            this.suitablebringout = this.form.suitablebringout;
            this.suitablebringoutflg = this.form.suitablebringout;
            if (this.form.dutyfreeinput === '1') {
              this.show1 = true;
              this.show2 = true;
              this.rules.inputdate[0].required = true;
            } else {
              this.show2 = false;
              this.show1 = false;
              this.rules.inputdate[0].required = false;
            }
            let repair = response.repair;
            let serdate = repair.slice(0, 10);
            let serdate1 = repair.slice(repair.length - 10);
            this.form.repair = [serdate, serdate1];
            if (this.form.assettype === 'PJ009002') {
              this.show = true;
            } else {
              this.show = false;
            }
            this.loading = false;
          })
          .catch(error => {
            Message({
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
            if(rst) {
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
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      getAssetname(val) {
        this.form.assetname = val;
        if (!this.form.assetname || this.form.assetname === '' || val === 'undefined') {
          this.assetname = this.$t('normal.error_09') + this.$t('label.PFANS1009FORMVIEW_ASSETNAME');
        } else {
          this.errorassetname = '';
        }
      },
      // submit() {
      //   let val = this.currentRow;
      //   this.dialogTableVisible = false;
      //   this.form.assetname = val;
      // },
      // arraySpanMethod({row, column, rowIndex, columnIndex}) {
      //   if (columnIndex === 3) {
      //     return [1, 2];
      //   }
      // },
      // handleClickChange(val) {
      //   this.currentRow = val.assetname
      // },
      // getAssetsnameList() {
      //   this.loading = true;
      //   this.$store
      //     .dispatch('PFANS1009Store/getAssetsnameList', {})
      //     .then(response => {
      //       this.gridData = [];
      //       for (let i = 0; i < response.length; i++) {
      //         var vote = {};
      //         vote.assetname = response[i].filename;
      //         vote.usedepart = response[i].usedepartment;
      //         this.gridData.push(vote)
      //       }
      //       this.loading = false;
      //     })
      //     .catch(error => {
      //       Message({
      //         message: error,
      //         type: 'error',
      //         duration: 5 * 1000
      //       });
      //       this.loading = false;
      //     })
      // },
      getUserids(val) {
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
        if (!this.form.user_id || this.form.user_id === '' || val === 'undefined') {
          this.error = this.$t('normal.error_08') + this.$t('label.applicant');
        } else {
          this.error = '';
        }
      },
      getassettype(val) {
        this.form.assettype = val;
        if (val === 'PJ009002') {
          this.show = true;
        } else {
          this.show = false;
        }
      },
      changerepairkits(val) {
        this.form.repairkits = val;
      },
      radiochange(val) {
        this.form.dutyfreeinput = val;
        if (val === '1') {
          this.show1 = true;
          this.show2 = true;
          this.rules.inputdate[0].required = true;
        } else {
          this.show1 = false;
          this.show2 = false;
          this.rules.inputdate[0].required = false;
        }
      },
      workflowState(val) {
        if (val.state === '1') {
          this.form.status = '3';
        } else if (val.state === '2') {
          this.form.status = '4';
        }
        this.buttonClick('update');
      },
      start() {
        this.form.status = '2';
        this.buttonClick('update');
      },
      end() {
        this.form.status = '0';
        this.buttonClick('update');
      },
      paramsTitle() {
        this.$router.push({
          name: 'PFANS1037FormView',
          params: {
            title: 9,
          },
        });
      },
      buttonClick(val) {
        if (val === 'back') {
          this.paramsTitle();
        } else {
          this.$refs['refform'].validate(valid => {
            if (valid) {
              this.loading = true;
              this.form.repair = moment(this.form.repair[0]).format('YYYY-MM-DD') + ' ~ ' + moment(this.form.repair[1]).format('YYYY-MM-DD');
              this.form.installsoftware = this.installsoftware;
              this.form.suitablebringout = this.suitablebringout;
              if (this.form.assettype !== 'PJ009002') {
                this.form.installsoftware = '1';
                this.form.suitablebringout = '1';
              }
              if (this.form.dutyfreeinput === '0') {
                this.form.inputdate = '';
                this.form.releasedate = '';
              }
              if (this.$route.params._id) {
                this.form.fixedassets_id = this.$route.params._id;
                this.$store
                  .dispatch('PFANS1009Store/updateFixedassets', this.form)
                  .then(response => {
                    this.data = response;
                    this.loading = false;
                    if (val !== 'update') {
                      Message({
                        message: this.$t('normal.success_02'),
                        type: 'success',
                        duration: 5 * 1000,
                      });
                      this.paramsTitle();
                    }
                  })
                  .catch(error => {
                    Message({
                      message: error,
                      type: 'error',
                      duration: 5 * 1000,
                    });
                    this.loading = false;
                  });
              } else {
                this.loading = true;
                this.$store
                  .dispatch('PFANS1009Store/createFixedassets', this.form)
                  .then(response => {
                    this.data = response;
                    this.loading = false;
                    Message({
                      message: this.$t('normal.success_01'),
                      type: 'success',
                      duration: 5 * 1000,
                    });
                    this.paramsTitle();
                  })
                  .catch(error => {
                    Message({
                      message: error,
                      type: 'error',
                      duration: 5 * 1000,
                    });
                    this.loading = false;
                  });
              }
            }
          });
        }
      },
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .dpSupIndex {
    .content {
      height: 34px;
      min-width: 80%;
      border: 0.1rem solid #ebeef5;
      overflow-y: scroll;
      overflow-x: hidden;
      line-height: 34px;
      padding: 0.1rem 0.5rem 0.2rem 0.5rem;
    }

    .bg {
      background: white;
      border-width: 1px;
    }
  }

</style>
