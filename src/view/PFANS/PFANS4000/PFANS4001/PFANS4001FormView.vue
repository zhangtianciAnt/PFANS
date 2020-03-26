<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" v-loading="loading" :title="title" @buttonClick="buttonClick"
                         @end="end" @start="start" @workflowState="workflowState" ref="container">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="ruleForm"
                 style="padding: 2vw">
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.center')" prop="centerid">
                <el-input :disabled="true" style="width:20vw" v-model="centerid"></el-input>
                <el-input v-show='false' :disabled="true" style="width:20vw" v-model="form.centerid"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')" prop="groupid">
                <el-input :disabled="true" style="width:20vw" v-model="groupid"></el-input>
                <el-input v-show='false' :disabled="true" style="width:20vw" v-model="form.groupid"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')" prop="teamid">
                <el-input :disabled="true" style="width:20vw" v-model="teamid"></el-input>
                <el-input v-show='false' :disabled="true" style="width:20vw" v-model="form.teamid"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.applicant')" prop="userid">
                <user :disabled="!disable" :error="error" :selectType="selectType" :userlist="userlist"
                      @getUserids="getUserids" style="width:20vw"></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.application_date')" prop="application_date">
                <el-date-picker
                  v-model="form.application_date"
                  :disabled="true"
                  type="date"
                  style="width:20vw"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS4001FORMVIEW_YYRQ')" prop="usedate">
                <el-date-picker
                  v-model="form.usedate"
                  :disabled="!disable"
                  type="date"
                  style="width:20vw"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS4001FORMVIRW_WJLX')" prop="filetype">
                <dicselect
                  :disabled="!disable"
                  :code="code"
                  :multiple="multiple"
                  :data="form.filetype"
                  style="width:20vw"
                  @change="wjlx">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS4001FORMVIRW_YYLX')" prop="sealtype">
                <dicselect
                  :disabled="!disable"
                  :code="code2"
                  :multiple="multiple2"
                  :data="form.sealtype"
                  style="width:20vw"
                  @change="yilx">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS4001FORMVIRW_KH')" prop="client">
                <dicselect
                  :disabled="!disable"
                  :code="code3"
                  :multiple="multiple3"
                  :data="form.client"
                  style="width:20vw"
                  @change="kh">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS4001FORMVIRW_YYFS')" prop="printscore">
                <el-input-number :disabled="!disable" :min="0" :step="1" :max="9999999999" :precision="0" style="width:20vw"
                                 v-model="form.printscore"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1034VIEW_FILENAME')" prop="filename">
                <el-input v-model="form.filename" :disabled="!disable" style="width:20vw" maxlength='20'></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item :label="$t('label.remarks')" prop="remarks">
              <el-input
                :disabled="!disable"
                type="textarea"
                :rows="7"
                v-model="form.remarks"
                style="width: 72vw" >
              </el-input>
            </el-form-item>
          </el-row>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>
<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import PFANS4001View from '../PFANS4001/PFANS4001View.vue';
  import {Message} from 'element-ui';
  import dicselect from '../../../components/dicselect.vue';
  import user from '../../../components/user.vue';
  import {getOrgInfoByUserId} from '@/utils/customize';

  export default {
    name: 'PFANS4001FormView',
    components: {
      EasyNormalContainer,
      PFANS4001View,
      dicselect,
      user,
    },
    data() {
      var checkuser = (rule, value, callback) => {
        if (!value || value === '' || value === "undefined") {
          this.error = this.$t('normal.error_09') + this.$t('label.applicant');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.applicant')));
        } else {
          this.error = "";
          return callback();
        }
      };
      return {
          centerid: '',
          groupid: '',
          teamid: '',
        error: '',
        loading: false,
        disable: false,
        selectType: 'Single',
        userlist: "",
        title: 'title.PFANS4001FORMVIEW',
        buttonList: [],
        form: {
          usedate: '',
          application_date: new Date(),
          remarks: '',
          client: '',
          sealtype: '',
          filetype: '',
          printscore: '',
          filename: '',
          centerid: '',
          groupid: '',
          teamid: '',
          userid: '',

        },
        code: 'PC002',
        multiple: false,
        code2: 'PC001',
        multiple2: false,
        code3: 'PG017',
        multiple3: false,
        rules: {
          userid: [
            {
              required: true,
              validator: checkuser,
              trigger: 'change'
            },
          ],
          application_date: [{
            required: true,
          }
          ],
          usedate: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS4001FORMVIEW_YYRQ'),
            trigger: 'change',
          }
          ],
          filename: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1034VIEW_FILENAME'),
              trigger: 'blur',
            },
          ],
          printscore: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS4001FORMVIRW_YYFS'),
              trigger: 'blur',
            },
          ],
          filetype: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS4001FORMVIRW_WJLX'),
              trigger: 'change',
            },
          ],
          sealtype: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS4001FORMVIRW_YYLX'),
              trigger: 'change',
            },
          ],
          client: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS4001FORMVIRW_KH'),
              trigger: 'change',
            },
          ],
        },
      };
    },
    mounted() {
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS4001Store/getPfans4001One', {'sealid': this.$route.params._id})
          .then(response => {
            this.form = response;
              let rst = getOrgInfoByUserId(response.userid);
              if(rst){
                  this.centerid = rst.centerNmae;
                  this.groupid= rst.groupNmae;
                  this.teamid= rst.teamNmae;
              }
            this.userlist = this.form.userid;
            if (this.form.status === '2') {
              this.disable = false;
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
          let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
            if(rst) {
                this.centerid = rst.centerNmae;
                this.groupid= rst.groupNmae;
                this.teamid= rst.teamNmae;
                this.form.centerid = rst.centerId;
                this.form.groupid = rst.groupId;
                this.form.teamid = rst.teamId;
            }
          this.form.userid = this.$store.getters.userinfo.userid;
        }
      }
    },
    created() {
      this.disable = this.$route.params.disabled;
      if (this.disable) {
        this.buttonList = [
          {
            key: 'save',
            name: 'button.save',
            icon: 'el-icon-check',
          },
        ];
      }
    },
    methods: {
      wjlx(value1) {
        this.form.filetype = value1;
      },
      yilx(value2) {
        this.form.sealtype = value2;
      },
      kh(value3) {
        this.form.client = value3;
      },
      getUserids(val) {
        this.form.userid = val;
        this.userlist = val;
        let rst = getOrgInfoByUserId(val);
          if(rst){
              this.centerid = rst.centerNmae;
              this.groupid = rst.groupNmae;
              this.teamid = rst.teamNmae;
              this.form.centerid = rst.centerId;
              this.form.groupid = rst.groupId;
              this.form.teamid = rst.teamId;
          }else{
              this.centerid =  '';
              this.groupid =  '';
              this.teamid =  '';
              this.form.centerid = '';
              this.form.groupid =  '';
              this.form.teamid =  '';
          }
        if (!this.form.userid || this.form.userid === '' || val === "undefined") {
          this.error = this.$t('normal.error_08') + this.$t('label.applicant');
        } else {
          this.error = '';
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
      buttonClick(val) {
        this.$refs['ruleForm'].validate(valid => {
          if (valid) {
            if (this.$route.params._id) {
              this.loading = true;
              this.form.userid = this.userlist;
              this.form.sealid = this.$route.params._id;
              this.$store
                .dispatch('PFANS4001Store/updatePfans4001', this.form)
                .then(response => {
                  this.data = response;
                  this.loading = false;
                  if(val !== "update"){
                    Message({
                      message: this.$t("normal.success_02"),
                      type: 'success',
                      duration: 5 * 1000
                    });
                    if (this.$store.getters.historyUrl) {
                      this.$router.push(this.$store.getters.historyUrl);
                    }}
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
              this.loading = true;
              this.form.userid = this.userlist;
              this.$store
                .dispatch('PFANS4001Store/createPfans4001', this.form)
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
      },
    },
  }
</script>
<style lang="scss">
  .el-form-item__error {
    width: 15rem;
  }
</style>
