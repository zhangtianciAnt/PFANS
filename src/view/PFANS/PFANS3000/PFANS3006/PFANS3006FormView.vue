<template>
  <div style="min-height: 100%">
    <EasyNormalContainer
      :buttonList="buttonList"
      :canStart="canStart"
      v-loading="loading"
      :title="title"
      @buttonClick="buttonClick" @disabled="setdisabled"
      @end="end"
      @start="start"
      @workflowState="workflowState"
      ref="container"
    >
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw"
                 ref="refform" style="padding: 3vw">
          <el-row >
            <!--1-->
            <el-col :span="8">
              <el-form-item :label="$t('label.center')">
                <el-input :disabled="true" style="width:20vw" v-model="centerid"></el-input>
                <el-input   v-show='false' :disabled="false" style="width:20vw" v-model="form.centerid"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')">
                <el-input :disabled="true" style="width:20vw" v-model="groupid"></el-input>
                <el-input   v-show='false' :disabled="false" style="width:20vw" v-model="form.groupid"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')">
                <el-input :disabled="true" style="width:20vw" v-model="teamid"></el-input>
                <el-input v-show='false'  :disabled="false" style="width:20vw" v-model="form.teamid"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row >
            <!--2-->
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.applicant')" prop="userid">
                <user :disabled="true" :error="error" :selectType="selectType" :userlist="userlist"
                      @getUserids="getUserids" style="width:20vw"></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <template>
                <el-form-item
                  :label="$t('label.PFANS3006VIEW_USETYPE')" prop="usetype">
                  <dicselect
                    :code="code"
                    :data="form.usetype"
                    :disabled="!disable"
                    :multiple="multiple"
                    @change="change"
                    style="width:20vw"
                  >
                  </dicselect>
                </el-form-item>
              </template>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3006VIEW_MOBILEPHONE')" prop="mobilephone">
                <el-input :disabled="!disable" maxlength="11" style="width:20vw"
                          v-model="form.mobilephone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row >
           <!--3-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3006VIEW_STARTTIME')" prop="starttime">
                <el-date-picker
                  style="width:20vw"
                  :disabled="!disable"
                  v-model="form.starttime"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3006VIEW_ENDTIME')" prop="endtime">
                <el-date-picker
                  style="width:20vw"
                  :disabled="!disable"
                  v-model="form.endtime"
                  type="datetime"
                  placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3006VIEW_DIFFDATE')" prop="diffdata">
                <el-input :disabled="false"
                style="width:20vw"
                v-model="form.diffdata"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row >
            <!--4-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3006VIEW_ORIGIN')" prop="origin">
                <el-input :disabled="!disable" maxlength='20' style="width:20vw"
                          v-model="form.origin"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3006VIEW_TRANSFERSTATION')" prop="transferstation">
                <el-input :disabled="!disable" maxlength='20' style="width:20vw"
                          v-model="form.transferstation"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3006VIEW_DESTINATION')" prop="destination">
                <el-input :disabled="!disable" maxlength='20' style="width:20vw"
                          v-model="form.destination"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row >
            <el-col :span="8">
              <template>
                <el-form-item :label="$t('label.PFANS3006VIEW_FLIGHTNUMBER')" prop="flightnumber" v-show="show2">
                  <el-input :disabled="!disable" maxlength='20' style="width:20vw"
                            v-model="form.flightnumber"></el-input>
                </el-form-item>
              </template>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3006VIEW_DISTINGUISH')" prop="distinguish" v-show="show2">
                <dicselect
                  :code="code2"
                  :data="form.distinguish"
                  :disabled="!disable"
                  :multiple="multiple"
                  @change="change2"
                  style="width: 11rem"
                >
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3006VIEW_DEPARTURECITY')" prop="departurecity" v-show="show2">
                <el-input :disabled="!disable" maxlength='20' style="width:20vw"
                          v-model="form.departurecity"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--6-->
          <el-row >
            <el-col :span="8">
              <template>
                <el-form-item :label="$t('label.PFANS3006VIEW_WELCOMEBOARD')" prop="welcomeboard" v-show="show2">
                  <span style="margin-right: 1vw ">{{$t('label.PFANSUSERFORMVIEW_NO')}}</span>`
                  <el-switch
                    :disabled="!disable"
                    @change="downLoad"
                    active-value="1"
                    inactive-value="0"
                    v-model="form.welcomeboard"
                  >
                  </el-switch>
                  <span style="margin-left: 1vw ">{{$t('label.PFANSUSERFORMVIEW_YES')}}</span>
                </el-form-item>
              </template>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3006VIEW_FELLOWMEMBERS')" prop="fellowmembers">
                <span style="margin-right: 1vw ">{{$t('label.PFANSUSERFORMVIEW_NO')}}</span>`
                <el-switch
                  :disabled="!disable"
                  v-model="form.fellowmembers"
                  @change="toshow"
                  active-value="0"
                  inactive-value="1"
                >
                </el-switch>
                <span style="margin-left: 1vw ">{{$t('label.PFANSUSERFORMVIEW_YES')}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3006VIEW_FELLOWMEMBERSNAME')" v-show="show" prop="fellowmembersname">
                <el-input :disabled="!disable" maxlength='36' style="width:20vw"
                          v-model="form.fellowmembersname" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row >
            <el-col :span="8">
              <template>
                <el-form-item :label="$t('label.PFANS3002VIEW_GUESTNAME')" prop="guestname" v-show="show2">
                  <el-input :disabled="!disable" maxlength='20' style="width:20vw"
                            v-model="form.guestname"></el-input>
                </el-form-item>
              </template>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3006VIEW_USENUMBER')" prop="usenumber">
                <el-input-number :disabled="!disable" controls-position="right" :precision="0" :step="1" :min="0"
                                 :max="999" style="width:20vw"
                                 v-model="form.usenumber"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row >
            <el-col :span="24">
              <el-form-item :label="$t('label.remarks')" prop="remarks">
                <el-input :disabled="!disable" style="width:72vw" type="textarea" v-model="form.remarks"></el-input>
              </el-form-item>
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
  import moment from "moment";
  import {Message} from 'element-ui';
  import user from "../../../components/user.vue";
  import {getOrgInfoByUserId} from '@/utils/customize'
  import {telephoneNumber, validateNumber} from '@/utils/validate';

  export default {
    name: "PFANS3006FormView",
    components: {
      EasyNormalContainer,
      dicselect,
      user
    },

    data() {
      var validateUserid = (rule, value, callback) => {
        if (!value || value === '' || value === "undefined") {
          callback(new Error(this.$t('normal.error_09') + this.$t('label.applicant')));
          this.error = this.$t('normal.error_09') + this.$t('label.applicant');
        } else {
          callback();
          this.error = '';
        }
      };
      var checknumber = (rule, value, callback) => {
        if (this.form.usenumber !== null && this.form.usenumber !== '') {
          if (!validateNumber(value)) {
            callback(new Error(this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS3006VIEW_USENUMBER')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var validateTel = (rule, value, callback) => {
        if (this.form.mobilephone !== null && this.form.mobilephone !== '') {
          if (telephoneNumber(value)) {
            callback(new Error(this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS3006VIEW_MOBILEPHONE')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var validatestarttime = (rule, value, callback) => {
        if (this.form.starttime !== '' && this.form.starttime !== null && this.form.endtime !== '' && this.form.endtime !== null) {
          if (moment(this.form.endtime).format("YYYY-MM-DD HH:mm:ss") <= moment(this.form.starttime).format("YYYY-MM-DD HH:mm:ss")) {
            callback(new Error(this.$t("label.PFANS5008FORMVIEW_ERROR")))
          }else{
              this.form.diffdata = moment(this.form.endtime).diff(moment(this.form.starttime), 'hour');
              this.form.usedate = moment(this.form.starttime).format("YYYY-MM-DD");
              callback()
          }
        }else{
            this.form.diffdata = 0
            callback()
        }
      };
      var validateendtime = (rule, value, callback) => {
        if (this.form.starttime !== '' && this.form.starttime !== null && this.form.endtime !== '' && this.form.endtime !== null) {
          if (moment(this.form.endtime).format("YYYY-MM-DD HH:mm:ss") <= moment(this.form.starttime).format("YYYY-MM-DD HH:mm:ss")) {
            callback(new Error(this.$t("label.PFANS5008FORMVIEW_ERROR")))
          }else{
              this.form.diffdata = moment(this.form.endtime).diff(moment(this.form.starttime), 'hour');
              callback()
          }
        }else{
            this.form.diffdata = 0
            callback()
        }
      };
      return {
        error: "",
        loading: false,
        canStart: false,
        selectType: "Single",
        userlist: "",
        title: "title.PFANS3006VIEW",
        buttonList: [],
        show: false,
        centerid: '',
        groupid: '',
        teamid: '',
        show2: false,
        form: {
          centerid: '',
          groupid: '',
          teamid: '',
          userid: '',
          usedate: moment(new Date()).format("YYYY-MM-DD"),
          mobilephone: '',
          usetype: '',
          origin: '',
          transferstation: '',
          destination: '',
          starttime: new Date(moment().format("YYYY-MM-DD HH:mm:ss")),
          endtime: '',
          diffdata: 0,
          flightnumber: '',
          distinguish: '',
          departurecity: '',
          fellowmembersname: '',
          guestname: '',
          usenumber: '',
          remarks: '',
          welcomeboard: true,
          fellowmembers: false,
        },
        rules: {
          fellowmembersname:[{
            required: false,
            message: this.$t('normal.error_08') + this.$t('label.PFANS3006VIEW_FELLOWMEMBERS'),
            trigger: 'blur'
          }],
          userid: [{
            required: true,
            validator: validateUserid,
            trigger: 'change'
          }],
          usedate: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS3006VIEW_USEDATE'),
            trigger: 'change'
          }],
          mobilephone: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS3006VIEW_MOBILEPHONE'),
            trigger: 'blur',
          },
            {validator: validateTel, trigger: 'blur'}],
          usetype: [{
            required: true,
            message: this.$t("normal.error_09") + this.$t("label.PFANS3006VIEW_USETYPE"),
            trigger: "change"
          }],
          origin: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS3006VIEW_ORIGIN'),
            trigger: 'blur'
          }],
          destination: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS3006VIEW_DESTINATION'),
            trigger: 'blur'
          }],
          starttime: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS3006VIEW_STARTTIME'),
            trigger: 'change'
          },
            {validator: validatestarttime, trigger: 'change'}
          ],
          endtime: [{
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS3006VIEW_ENDTIME'),
              trigger: 'change'
          },
              {validator: validateendtime, trigger: 'change'}
          ],
          guestname: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS3002VIEW_GUESTNAME'),
            trigger: 'blur'
          }],
          usenumber: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS3006VIEW_USENUMBER'),
            trigger: 'blur'
          },
            {validator: checknumber, trigger: 'blur'},
          ],
        },
        code: 'PR005',
        code2: 'PR006',
        multiple: false,
        disable: false,
        disable2: false,
        erroruser: '',
      };
    },
    mounted() {
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS3006Store/getAppointmentCarOne', {"appointmentcarid": this.$route.params._id})
          .then(response => {
            this.form = response;
              let rst = getOrgInfoByUserId(response.userid);
              if(rst){
                  this.centerid = rst.centerNmae;
                  this.groupid= rst.groupNmae;
                  this.teamid= rst.teamNmae;
              }
            this.loading = false;
            this.userlist = this.form.userid;
            if (this.form.status === '2') {
              this.disable2 = false;
            }else if(this.form.status === '4'){
              this.disable2 = true;
            }
            if(this.form.fellowmembers == 1){
                this.show=false;
            }else{
                this.show=true;
            }

            if(this.form.usetype === 'PR005002' || this.form.usetype === 'PR005003'){
                this.show2 = true;
            }else{
                this.show2 = false;
            }

            this.loading = false;
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000
            })
            if (this.$store.getters.historyUrl) {
              this.$router.push(this.$store.getters.historyUrl);
            }
          })
      } else {
        this.userlist = this.$store.getters.userinfo.userid;
        if (this.userlist !== null && this.userlist !== '') {
          let lst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
            if(lst) {
                this.centerid = lst.centerNmae;
                this.groupid = lst.groupNmae;
                this.teamid = lst.teamNmae;
                this.form.centerid = lst.centerId;
                this.form.groupid = lst.groupId;
                this.form.teamid = lst.teamId;
            }
          this.form.userid = this.$store.getters.userinfo.userid;
        }
      }
    },
    created() {
      this.disable = this.$route.params.disable;
      if (this.disable) {
        this.buttonList = [
          {
            key: "save",
            name: "button.save",
            icon: "el-icon-check",
            disabled: this.disable2
          }
        ];
      }
    },
    methods: {
      setdisabled(val){
        if(this.$route.params.disabled){
          this.disabled = val;
        }
      },
      downLoad(val){
        if(val === '1'){
            this.$confirm('是否立即下载接机提示牌?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
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
                    });
                this.$message({
                    type: 'success',
                    message: '下载成功!'
                });

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        }
      },
      toshow(val){
        if(val === '1'){
          this.show = false;
          this.rules.fellowmembersname[0].required = false;
        }else{
          this.show = true;
          this.rules.fellowmembersname[0].required = true;
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
      start(val) {
        this.form.status = '2';
        this.buttonClick("update");
      },
      end(val) {
        this.form.status = '0';
        this.buttonClick("update");
      },
      getUserids(val) {
        this.form.userid = val;
        this.userlist = val;
        let lst = getOrgInfoByUserId(val);
          if(lst) {
              this.centerid = lst.centerNmae;
              this.groupid = lst.groupNmae;
              this.teamid = lst.teamNmae;
              this.form.centerid = lst.centerId;
              this.form.groupid = lst.groupId;
              this.form.teamid = lst.teamId;
          }
          else{
              this.centerid =  '';
              this.groupid =  '';
              this.teamid =  '';
              this.form.centerid = '';
              this.form.teamid =  '';
              this.form.groupid =  '';
          }
        if (!this.form.userid || this.form.userid === '' || val === "undefined") {
          this.error = this.$t('normal.error_09') + this.$t('label.applicant');
        } else {
          this.error = "";
        }
      },
      change(val) {
        this.form.usetype = val;
        if(val === 'PR005002' || val === 'PR005003'){
            this.show2 = true;
            this.rules.guestname[0].required = true;
        }else{
            this.show2 = false;
            this.rules.guestname[0].required = false;
        }
      },
      change2(val) {
        this.form.distinguish = val;
      },
      buttonClick(val) {
        this.$refs["refform"].validate(valid => {
          if (valid) {
            this.loading = true;
            this.form.userid = this.userlist;
            if (this.$route.params._id) {
              this.$store
                .dispatch('PFANS3006Store/updateAppointmentCar', this.form)
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
                  })
                  this.loading = false;
                })
            } else {
              this.$store
                .dispatch('PFANS3006Store/createAppointmentCar', this.form)
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


<style scoped>

</style>
