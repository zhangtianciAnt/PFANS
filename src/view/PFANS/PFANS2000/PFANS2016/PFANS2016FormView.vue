<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" v-loading="loading" :title="title" @buttonClick="buttonClick"
                         @end="end" @start="start" @workflowState="workflowState" ref="container">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="left" label-width="8rem" ref="ruleForm"
                 style="padding: 2rem">
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.center')" prop="centerid">
                <el-input :disabled="true" style="width: 11rem" v-model="form.centerid"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')" prop="groupid">
                <el-input :disabled="true" style="width: 11rem" v-model="form.groupid"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')" prop="teamid">
                <el-input :disabled="true" style="width: 11rem" v-model="form.teamid"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.applicant')" prop="user_id">
                <user :disabled="!disable" :error="error" :selectType="selectType" :userlist="userlist"
                      @getUserids="getUserids" style="width: 10.1rem"></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.application_date')" prop="applicationdate">
                <el-date-picker :disabled="!disable" style="width: 11rem" type="date"
                                v-model="form.applicationdate"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2016FORMVIEW_ERRORTYPE')" prop="errortype">
                <dicselect
                  :code="code"
                  :data="form.errortype"
                  :disabled="!disable"
                  :multiple="multiple"
                  @change="getErrorType"
                  style="width: 11rem">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2016FORMVIEW_LENGTHTIME')" label-width="9rem" prop="lengthtime">
                <el-input :disabled="true"
                          style="width:11rem;margin-left:-1rem" v-model="form.lengthtime"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.startdate')" prop="occurrencedate">
                <el-date-picker :disabled="!disable" @change="change"
                                style="width: 11rem" type="date" v-model="form.occurrencedate"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :error="errorstarttime" :label="$t('label.start')" prop="periodstart">
                <el-time-picker
                  :disabled="!disable"
                  @change="change"
                  format='HH:mm'
                  style="width: 11rem"
                  v-model="form.periodstart">
                </el-time-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-show="showWeekend">
              <el-form-item :label="$t('label.PFANS2016FORMVIEW_RELATION')" prop="relation">
                <el-select
                  allow-create
                  default-first-option
                  filterable
                  multiple
                  v-model="form.relation">
                  <el-option
                    :key="item.overtimeid"
                    :label="item.reserveovertimedate+'-'+item.overtimetype"
                    :value="item.overtimeid"
                    v-for="item in options">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.enddate')" prop="finisheddate">
                <el-date-picker :disabled="!disable" @change="change"
                                style="width: 11rem" type="date" v-model="form.finisheddate"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :error="errorendtime" :label="$t('label.end')" prop="periodend">
                <el-time-picker
                  :disabled="!disable"
                  @change="change"
                  format='HH:mm'
                  style="width: 11rem" v-model="form.periodend">
                </el-time-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-show="showFemale">
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2016FORMVIEW_HOSPITAL')" prop="hospital">
                <el-input maxlength="50" style="width: 11rem" v-model="form.hospital"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2016FORMVIEW_EDATE')" prop="edate">
                <el-date-picker :disabled="!disable" style="width: 11rem"
                                type="date" v-model="form.edate"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-show="showVacation">
            <el-col>
              <el-form-item :label="$t('label.PFANS2016FORMVIEW_ENCLOSUREEXPLAIN')" prop="enclosureexplain">
                <div class="sub_color_red">
                  {{form.enclosureexplain}}
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.enclosure')" prop="enclosurecontent">
                <el-upload
                  :disabled="!disable"
                  :action="upload"
                  :file-list="fileList"
                  :on-remove="fileRemove"
                  :on-preview="fileDownload"
                  :on-success="fileSuccess"
                  :on-error="fileError"
                  class="upload-demo"
                  drag
                  ref="upload">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">{{$t('label.enclosurecontent')}}<em>{{$t('normal.info_09')}}</em></div>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-form-item :label="$t('label.cause')" prop="cause">
                <el-input :disabled="!disable" :rows="6" style="width: 95%" type="textarea"
                          v-model="form.cause"></el-input>
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
    import PFANS2016View from '../PFANS2016/PFANS2016View.vue';
    import {Message} from 'element-ui';
    import dicselect from '../../../components/dicselect.vue';
    import user from '../../../components/user.vue';
    import {getOrgInfoByUserId} from '@/utils/customize';
    import moment from 'moment';
    import {getDictionaryInfo,uploadUrl} from '../../../../utils/customize';

    export default {
    name: 'PFANS2016FormView',
    components: {
      EasyNormalContainer,
      PFANS2016View,
      dicselect,
      user,
    },
    data() {
      var validateUserid = (rule, value, callback) => {
        if (!value || value === '' || value ==="undefined") {
          callback(new Error(this.$t('normal.error_08') + this.$t('label.applicant')));
          this.error = this.$t('normal.error_08') + this.$t('label.applicant');
        } else {
          callback();
          this.error = '';
        }
      };
      var validatePass = (rule, value, callback) => {
        if (this.showFemale) {
          if (value) {
            callback();
          } else {
            callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS2016FORMVIEW_HOSPITAL')));
          }
        } else {
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (this.showFemale) {
          if (value) {
            callback();
          } else {
            callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS2016FORMVIEW_EDATE')));
          }
        } else {
          callback();
        }
      };
      var validateStartdate = (rule, value, callback) => {
        if (this.form.occurrencedate !== null && this.form.occurrencedate !== '') {
          if (moment(value).format('YYYY-MM-DD') > moment(this.form.finisheddate).format('YYYY-MM-DD')) {
            callback(new Error(this.$t('label.startdate') + this.$t('normal.error_checkTime2') + this.$t('label.enddate')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var validateEnddate = (rule, value, callback) => {
        if (this.form.finisheddate !== null && this.form.finisheddate !== '') {
          if (moment(value).format('YYYY-MM-DD') < moment(this.form.occurrencedate).format('YYYY-MM-DD')) {
            callback(new Error(this.$t('label.enddate') + this.$t('normal.error_checkTime1') + this.$t('label.startdate')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var validateStarttime = (rule, value, callback) => {
        if (this.form.periodstart !== null && this.form.periodstart !== '') {
          if ((moment(this.form.finisheddate).format('YYYY-MM-DD') === moment(this.form.occurrencedate).format('YYYY-MM-DD'))
            && (moment(value).format('HH:mm') > moment(this.form.periodend).format('HH:mm'))) {
            callback(new Error(this.$t('label.start') + this.$t('normal.error_checkTime2') + this.$t('label.end')));
            this.errorstarttime = this.$t('label.start') + this.$t('normal.error_checkTime2') + this.$t('label.end');
          } else {
            callback();
            this.errorstarttime = '';
          }
        } else {
          callback();
          this.errorstarttime = '';
        }
      };
      var validateEndtime = (rule, value, callback) => {
        if (this.form.periodend !== null && this.form.periodend !== '') {
          if ((moment(this.form.finisheddate).format('YYYY-MM-DD') === moment(this.form.occurrencedate).format('YYYY-MM-DD'))
            && (moment(value).format('HH:mm') < moment(this.form.periodstart).format('HH:mm'))) {
            callback(new Error(this.$t('label.end') + this.$t('normal.error_checkTime1') + this.$t('label.start')));
            this.errorendtime = this.$t('label.end') + this.$t('normal.error_checkTime1') + this.$t('label.start');
          } else {
            callback();
            this.errorendtime = '';
          }
        } else {
          callback();
          this.errorendtime = '';
        }
      };
      return {
        loading: false,
        errorendtime: '',
        errorstarttime: '',
        options: [],
        value: [],
        showVacation: false,
        showFemale: false,
        showWeekend: false,
        error: '',
        selectType: 'Single',
        userlist: '',
        title: 'title.exception_application',
        buttonList: [],
        form: {
          centerid: '',
          groupid: '',
          teamid: '',
          user_id: '',
          applicationdate: moment(new Date()).format('YYYY-MM-DD'),
          errortype: '',
          lengthtime: '',
          occurrencedate: '',
          finisheddate: '',
          relation: '',
          hospital: '',
          edate: '',
          enclosureexplain: '',
          periodstart: '',
          periodend: '',
          uploadfile: '',
          cause: '',
          status: '',
        },
        code: 'PR013',
        multiple: false,
        disable: true,
        relation: '',
        rules: {
          user_id: [{
              required: true,
              validator: validateUserid,
              trigger: 'change',
            }],
          occurrencedate: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.startdate'),
            trigger: 'change',
          },
            {validator: validateStartdate, trigger: 'change'}],
          finisheddate: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.enddate'),
            trigger: 'change',
          },
            {validator: validateEnddate, trigger: 'change'}],
          periodstart: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.start'),
            trigger: 'change',
          },
            {validator: validateStarttime, trigger: 'change'}],
          periodend: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.end'),
            trigger: 'change',
          },
            {validator: validateEndtime, trigger: 'change'}],
          applicationdate: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.application_date'),
            trigger: 'change',
          }],
          errortype: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS2016FORMVIEW_ERRORTYPE'),
            trigger: 'change',
          }],
          hospital: [{required: true, validator: validatePass, trigger: 'blur'}],
          edate: [{required: true, validator: validatePass2, trigger: 'change'}],
        },
        fileList: [],
        upload: uploadUrl(),
      };
    },
    mounted() {
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS2016Store/getPfans2016One', {'abnormalid': this.$route.params._id})
          .then(response => {
            this.form = response;
            this.userlist = this.form.user_id;
            this.relation = this.form.relation;
              if (this.form.status === '2') {
                  this.disable = false;
              }
            this.getOvertimelist();
            if (this.form.uploadfile != "") {
              let uploadfile = this.form.uploadfile.split(";");
              for (var i = 0; i < uploadfile.length; i++) {
                if (uploadfile[i].split(",")[0] != "") {
                  let o = {};
                  o.name = uploadfile[i].split(",")[0];
                  o.url = uploadfile[i].split(",")[1];
                  this.fileList.push(o)
                }
              }
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
          let lst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
          this.form.centerid = lst.centerNmae;
          this.form.groupid = lst.groupNmae;
          this.form.teamid = lst.teamNmae;
          this.form.user_id = this.$store.getters.userinfo.userid;
        }
        this.getOvertimelist();
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
      getOvertimelist() {
        this.loading = true;
        this.$store
          .dispatch('PFANS2016Store/getOvertimelist', {userid: this.userlist, actualsubstitutiondate: null})
          .then(response => {
            let letrelation = [];
            for (let j = 0; j < response.length; j++) {
              response[j].reserveovertimedate = moment(response[j].reserveovertimedate).format('YYYY-MM-DD');
              let getOvertimetype = getDictionaryInfo(response[j].overtimetype);
              if (getOvertimetype !== null && getOvertimetype.code === 'PR013002') {
                response[j].overtimetype = getOvertimetype.value1;
              }
              if (this.relation) {
                this.showWeekend = true;
                let a = this.relation.split(',');
                for (let i = 0; i < a.length; i++) {
                  if (a[i] === response[j].overtimeid) {
                    letrelation.push(response[j]);
                  }
                }
              }
            }
            if (letrelation.length > 0) {
              this.options = letrelation;
              this.form.relation = this.options;
            } else {
              this.options = response;
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
      },
      change() {
        if (this.form.occurrencedate !== '' && this.form.finisheddate !== '') {
          if (moment(this.form.occurrencedate).format('YYYY-MM-DD') < moment(this.form.finisheddate).format('YYYY-MM-DD')) {
            var beginDay = moment(this.form.occurrencedate).format('YYYY-MM-DD');
            var endDay = moment(this.form.finisheddate).format('YYYY-MM-DD');
            var dayBegin = new Date(beginDay);
            var dayEnd = new Date(endDay);
            var daysDiff = dayEnd.getTime() - dayBegin.getTime();
            var dayDiff = Math.floor(daysDiff / (24 * 3600 * 1000));
            if (dayDiff - 1 > 0) {
              dayDiff = (dayDiff - 1) * 8;
              var dayBegin = new Date(this.form.periodstart);
              var dayEnd = new Date(this.form.periodend);
              var timeUp = '8.5';
              var timeDown = '17.5';
              var beginTime = dayBegin.getHours() + dayBegin.getMinutes() / 60;
              if (beginTime <= '13') {
                beginTime = (12 - beginTime) + (timeDown - 13);
              } else {
                beginTime = timeDown - beginTime;
              }
              var endTime = dayEnd.getHours() + dayEnd.getMinutes() / 60;
              if (endTime >= '12') {
                endTime = (endTime - 13) + (12 - timeUp);
              } else {
                endTime = endTime - timeUp;
              }
              var time = beginTime + endTime;
              if (this.$i18n) {
                this.form.lengthtime = parseFloat(dayDiff + time).toFixed(1);
              }
            } else {
              var dayBegin = new Date(this.form.periodstart);
              var dayEnd = new Date(this.form.periodend);
              var timeUp = '8.5';
              var timeDown = '17.5';
              var beginTime = dayBegin.getHours() + dayBegin.getMinutes() / 60;
              if (beginTime <= '13') {
                beginTime = (12 - beginTime) + (timeDown - 13);
              } else {
                beginTime = timeDown - beginTime;
              }
              var endTime = dayEnd.getHours() + dayEnd.getMinutes() / 60;
              if (endTime >= '12') {
                endTime = (endTime - 13) + (12 - timeUp);
              } else {
                endTime = endTime - timeUp;
              }
              var time = beginTime + endTime;
              if (this.$i18n) {
                this.form.lengthtime = parseFloat(time).toFixed(1);
              }
            }
          } else if (moment(this.form.occurrencedate).format('YYYY-MM-DD') === moment(this.form.finisheddate).format('YYYY-MM-DD')) {
            var dayBegin = new Date(this.form.periodstart);
            var dayEnd = new Date(this.form.periodend);
            var timeUp = '8.5';
            var timeDown = '17.5';
            var beginTime = dayBegin.getHours() + dayBegin.getMinutes() / 60;
            var endTime = dayEnd.getHours() + dayEnd.getMinutes() / 60;
            if (endTime <= '12') {
              var time = endTime - beginTime;
            } else {
              var time = (timeDown - 13) + (12 - timeUp);
            }
            if (this.$i18n) {
              this.form.lengthtime = parseFloat(time).toFixed(1);
            }
          } else {
            this.form.lengthtime = '';
          }
        }
      },
      getUserids(val) {
        this.form.user_id = val;
        let lst = getOrgInfoByUserId(val);
        this.form.centerid = lst.centerNmae;
        this.form.groupid = lst.groupNmae;
        this.form.teamid = lst.teamNmae;
        if (!this.form.user_id || this.form.user_id === '' || val ==="undefined") {
          this.error = this.$t('normal.error_08') + this.$t('label.applicant');
        } else {
          this.error = '';
        }
      },
      getErrorType(val) {
        let dictionaryInfo = getDictionaryInfo(val);
        if (dictionaryInfo) {
          this.form.enclosureexplain = dictionaryInfo.value2;
        }
        this.form.errortype = val;
        if (val === 'PR013004') {
          this.showFemale = true;
        } else if (val === 'PR013007') {
          this.showWeekend = true;
        } else if (val === 'PR013009') {
          this.showVacation = true;
        } else if (val === 'PR013010') {
          this.showVacation = true;
        } else if (val === 'PR013011') {
          this.showVacation = true;
        } else if (val === 'PR013012') {
          this.showVacation = true;
        } else if (val === 'PR013013') {
          this.showVacation = true;
        } else if (val === 'PR013015') {
          this.showVacation = true;
        } else if (val === 'PR013016') {
          this.showVacation = true;
        } else if (val === 'PR013017') {
          this.showVacation = true;
        } else {
          this.showFemale = false;
          this.showWeekend = false;
          this.showVacation = false;
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
      fileError(err, file, fileList){
        Message({
          message: this.$t("normal.error_04"),
          type: 'error',
          duration: 5 * 1000
        });
      },
      fileRemove(file, fileList){
        this.fileList = [];
        this.form.uploadfile = "";
        for (var item of fileList) {
          let o = {};
          o.name = item.name;
          o.url = item.url;
          this.fileList.push(o);
          this.form.uploadfile += item.name + "," + item.url + ";"
        }
      },
      fileDownload(file) {
        if (file.url) {
          var url = downLoadUrl(file.url);
          window.open(url);
        }

      },
      fileSuccess(response, file, fileList) {
        this.fileList = [];
        this.form.uploadfile = "";
        for (var item of fileList) {
          let o = {};
          o.name = item.name;
          if (!item.url) {
            o.url = item.response.info;
          } else {
            o.url = item.url;
          }
          this.fileList.push(o);
          this.form.uploadfile += o.name + "," + o.url + ";"
        }
      },
      buttonClick(val) {
        this.$refs['ruleForm'].validate(valid => {
          if (valid) {
            let letrelation = '';
            for (let j = 0; j < this.form.relation.length; j++) {
              letrelation = letrelation + ',' + this.form.relation[j];
            }
            this.form.relation = letrelation.substring(1, letrelation.length);
            if (this.$route.params._id) {
              this.form.abnormalid = this.$route.params._id;
              this.loading = true;
              this.$store
                .dispatch('PFANS2016Store/updatePfans2016', this.form)
                .then(response => {
                  this.data = response;
                  this.loading = false;
                  if(val !== "update"){
                    Message({
                      message: this.$t('normal.success_02'),
                      type: 'success',
                      duration: 5 * 1000,
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
                    duration: 5 * 1000,
                  });
                  this.loading = false;
                });
            } else {
              this.loading = true;
              this.$store
                .dispatch('PFANS2016Store/createPfans2016', this.form)
                .then(response => {
                  this.data = response;
                  this.loading = false;
                  Message({
                    message: this.$t('normal.success_01'),
                    type: 'success',
                    duration: 5 * 1000,
                  });
                  if (this.$store.getters.historyUrl) {
                    this.$router.push(this.$store.getters.historyUrl);
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
            }
          }
        });
      },
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
