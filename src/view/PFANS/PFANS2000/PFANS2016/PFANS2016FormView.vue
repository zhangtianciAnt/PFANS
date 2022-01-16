<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :title="title" @buttonClick="buttonClick" @end="end"
                         :canStart="canStart" @disabled="setdisabled" :defaultStart="defaultStart"
                         @StartWorkflow="buttonClick" :noback="true"
                         @start="start" @workflowState="workflowState" ref="container" v-loading="loading"
                         :workflowCode="workflowCode">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="ruleForm"
                 style="padding: 3vw">
          <el-row style="margin-bottom: 1vw" v-if="form.errortype == 'PR013023' || form.errortype == 'PR013024'">
            <el-col>
              <el-alert
                type="error"
                v-html="form.errortype == 'PR013023' ? this.$t('label.PFANS2016FORMVIEW_REMIND1') : this.$t('label.PFANS2016FORMVIEW_REMIND2')"
                show-icon
                style="text-align: left;font-size:smaller;font-weight: bold;">
              </el-alert>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.center')" prop="centerid">
                <el-input :disabled="true" style="width:20vw" v-model="centerid"></el-input>
                <el-input v-show='false' :disabled="false" style="width:20vw" v-model="form.centerid"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')" prop="groupid">
                <el-input :disabled="true" style="width:20vw" v-model="groupid"></el-input>
                <el-input v-show='false' :disabled="false" style="width:20vw" v-model="form.groupid"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')" prop="teamid">
                <el-input :disabled="true" style="width:20vw" v-model="teamid"></el-input>
                <el-input v-show='false' :disabled="false" style="width:20vw" v-model="form.teamid"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :error="erroruser" :label="$t('label.applicant')" prop="user_id">
                <user :disabled="true" :error="erroruser" :selectType="selectType" :userlist="userlist"
                      @getUserids="getUserids" style="width: 20vw"></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.application_date')" prop="applicationdate">
                <el-date-picker :disabled="true" style="width:20vw" type="date"
                                v-model="form.applicationdate"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2017VIEW_COUNTTIME')" prop="worktime">
                <el-input :disabled="true" style="width:20vw" v-model="form.worktime"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :error="errort" :label="$t('label.PFANS2016FORMVIEW_ERRORTYPE')" prop="errortype">
                <dicselect
                  :code="code"
                  :data="form.errortype"
                  :disabled="!disable"
                  :error="errort"
                  :multiple="multiple"
                  @change="getErrorType"
                  style="width:20vw">
                </dicselect>
              </el-form-item>
            </el-col>
            <!--不为  年休 代休-特别休日-->
            <el-col :span="8"
                    v-show="(form.errortype != 'PR013005' && form.errortype != 'PR013007') && (form.status === '4' || form.status === '5' || form.status === '6' || form.status === '7')">
              <el-form-item :label="$t('label.PFANS2016FORMVIEW_RELENGTHTIMETO')" label-width="9rem"
                            prop="relengthtime">
                <el-input-number
                  v-if="form.errortype === 'PR013001'"
                  :disabled="checkrelengthtime"
                  step-strictly
                  :max="1000000000"
                  :min="0"
                  :precision="2"
                  :step="0.01"
                  controls-position="right"
                  style="width:20vw"
                  v-model="form.relengthtime"
                ></el-input-number>
                <el-input-number
                  v-else-if="form.errortype === 'PR013006' && form.reoccurrencedate === form.refinisheddate"
                  :disabled="checkrelengthtime"
                  step-strictly
                  :max="7.75"
                  :min="0"
                  :precision="2"
                  :step="0.25"
                  controls-position="right"
                  style="width:20vw"
                  v-model="form.relengthtime"
                ></el-input-number>
                <el-input-number
                  v-else
                  :disabled="checkrelengthtime"
                  step-strictly
                  :max="1000000000"
                  :min="0"
                  :precision="2"
                  :step="0.25"
                  controls-position="right"
                  style="width:20vw"
                  v-model="form.relengthtime"
                ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8"
                    v-show="(form.errortype == 'PR013005'|| form.errortype == 'PR013007') && form.status != '4' && form.status != '5' && form.status != '6' && form.status != '7'&& form.status != '8'">
              <el-form-item :label="$t('label.PFANS2016FORMVIEW_XJTYPE')" label-width="9rem" prop="vacationtype">
                <el-select v-model="form.vacationtype" style="width: 20vw"
                           :disabled="!disable" @change="handleClick">
                  <el-option
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    v-for="item in options1"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8"
                    v-show="(form.errortype == 'PR013005' || form.errortype == 'PR013007') && (form.status === '4' || form.status === '5' || form.status === '6' || form.status === '7')">
              <el-form-item :label="$t('label.PFANS2016FORMVIEW_RELENGTHTIME')" label-width="9rem"
                            prop="revacationtype">
                <el-select @change="rehandleClick" v-model="form.revacationtype" style="width: 20vw"
                           :disabled="disrevacationtype">
                  <el-option
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    v-for="item in options"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <!--           add_fjl_05/26 &#45;&#45;添加代休剩余-->
            <el-col :span="4" v-if="form.errortype == 'PR013006'|| form.errortype == 'PR013007'">
              <el-form-item :label="$t('label.PFANS2016FORMVIEW_RESTDIFF1')">
                <el-input v-model="form.restdiff" style="width: 8vw" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4" v-if="form.errortype == 'PR013006'|| form.errortype == 'PR013007'">
              <el-form-item :label="$t('label.PFANS2016FORMVIEW_RESTDIFF2')">
                <el-input v-model="form.restdiff2" style="width: 8vw" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <!--           add_fjl_05/26 &#45;&#45;添加代休剩余-->
            <!--           add_scc_22/1/6 添加结婚日期-->
            <el-col :span="8" v-if="form.errortype == 'PR013011'">
              <el-form-item :label="$t('label.PFANS2016FORMVIEW_WEDDINGDATE')" prop="weddingdate">
                <el-date-picker :disabled="!disable" style="width:20vw" type="date" v-model="form.weddingdate"></el-date-picker>
              </el-form-item>
            </el-col>
            <!--           add_scc_22/1/6 添加结婚日期-->
          </el-row>
          <el-row>
            <!-- 子女出生日期-->
            <el-col :span="8" v-if="form.errortype == 'PR013023'">
              <el-form-item :label="$t('label.PFANS2016FORMVIEW_DATEOFBIRTH')" prop="dateofbirth">
                <el-date-picker :disabled="!disable" style="width:20vw" type="date" v-model="form.dateofbirth" @change="changeBirth()"></el-date-picker>
              </el-form-item>
            </el-col>
            <!-- 孩子年龄 -->
            <el-col :span="4" v-if="form.errortype == 'PR013023'">
              <el-form-item :label="$t('label.PFANS2016FORMVIEW_CHILDRENAGE')">
                <el-input :disabled="true" style="width:8vw" v-model="childrenage"></el-input>
              </el-form-item>
            </el-col>
            <!--父母出生日期-->
            <el-col :span="4" v-if="form.errortype == 'PR013024'">
              <el-form-item :label="$t('label.PFANS2016FORMVIEW_PARENTSDATE')" prop="parentsdate">
                <el-date-picker :disabled="!disable" style="width:8vw" type="date" v-model="form.parentsdate" @change="changeParent()"></el-date-picker>
              </el-form-item>
            </el-col>
            <!-- 父母名字 -->
            <el-col :span="4" v-if="form.errortype == 'PR013024'">
              <el-form-item :label="$t('label.PFANS2016FORMVIEW_PARENTSNAME')" prop="parentsname">
                <el-input :disabled="!disable" style="width:8vw" v-model="form.parentsname"></el-input>
              </el-form-item>
            </el-col>
            <!--父母住院开始日期-->
            <el-col :span="4" v-if="form.errortype == 'PR013024'">
              <el-form-item :label="$t('label.PFANS2016FORMVIEW_SUCHCONFINEMENT')" prop="suchconfinement">
                <el-date-picker :disabled="!disable" style="width:8vw" type="date" v-model="form.suchconfinement"></el-date-picker>
              </el-form-item>
            </el-col>
            <!-- 父母年龄 -->
            <el-col :span="4" v-if="form.errortype == 'PR013024'">
              <el-form-item :label="$t('label.PFANS2016FORMVIEW_PARENTSAGE')">
                <el-input :disabled="true" style="width:8vw" v-model="parentsage"></el-input>
              </el-form-item>
            </el-col>
            <!-- 累计天数 -->
            <el-col :span="4" v-if="form.errortype == 'PR013023' || form.errortype == 'PR013024'">
              <el-form-item :label="$t('label.PFANS2016FORMVIEW_CUMULATIVE')">
                <el-input-number :disabled="true" controls-position="right"
                                 style="width:8vw" v-model="cumulative"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="sub_color_red" v-if="checkerrortishi">
            {{$t('label.PFANS2016FORMVIEW_TISHICHECKERROR')}}
          </div>
          <div class="sub_color_red" v-if="form.errortype == 'PR013007'">
            {{$t('label.PFANS2016FORMVIEW_CHECKDAIXIUBANRI')}}
          </div>
          <div class="sub_color_red" v-if="form.errortype == 'PR013005' ">
            {{$t('label.PFANS2016FORMVIEW_CHECKYEAR')}}
          </div>
          <el-row>
            <el-col :span="8"
                    v-if="form.status != '4' && form.status != '5' && form.status != '6' && form.status != '7'">
              <el-form-item :label="$t('label.startdate')" prop="occurrencedate">
                <el-date-picker :disabled="!disable" @change="change"
                                style="width:20vw" type="date" v-model="form.occurrencedate"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8"
                    v-if="form.status != '4' && form.status != '5' && form.status != '6' && form.status != '7'">
              <el-form-item :label="$t('label.enddate')" prop="finisheddate">
                <el-date-picker :disabled="!disable" @change="change"
                                style="width:20vw" type="date" v-model="form.finisheddate"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :span="24"
                    v-show="(form.errortype != 'PR013005' && form.errortype != 'PR013007') && form.status != '4' && form.status != '5' && form.status != '6' && form.status != '7'&& form.status != '8'">
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2016FORMVIEW_LENGTHTIME')" label-width="9rem" prop="lengthtime">
                <el-input-number
                  v-if="form.errortype === 'PR013001'"
                  :disabled="dislengthtime"
                  step-strictly
                  :max="1000000000"
                  :min="0"
                  :precision="2"
                  :step="0.01"
                  controls-position="right"
                  style="width:20vw"
                  v-model="form.lengthtime"
                ></el-input-number>
                <el-input-number
                  v-else-if="form.errortype === 'PR013006' && form.occurrencedate === form.finisheddate"
                  :disabled="dislengthtime"
                  step-strictly
                  :max="7.75"
                  :min="0"
                  :precision="2"
                  :step="0.25"
                  controls-position="right"
                  style="width:20vw"
                  v-model="form.lengthtime"
                ></el-input-number>
                <el-input-number
                  v-else
                  :disabled="dislengthtime"
                  step-strictly
                  :max="1000000000"
                  :min="0"
                  :precision="2"
                  :step="0.25"
                  controls-position="right"
                  style="width:20vw"
                  v-model="form.lengthtime"
                ></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row
            v-if="form.status === '4' || form.status === '5' || form.status === '6' || form.status === '7' ">
            <el-col :span="8">
              <el-form-item :label="$t('label.restartdate')" prop="reoccurrencedate">
                <el-date-picker @change="rechange"
                                :disabled="((form.errortype == 'PR013007' || form.errortype == 'PR013005') && form.status >= 4) ? true: disrevacationtype"
                                style="width:20vw" type="date" v-model="form.reoccurrencedate"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.reenddate')" prop="refinisheddate">
                <el-date-picker @change="rechange"
                                :disabled="((form.errortype == 'PR013007' || form.errortype == 'PR013005') && form.status >= 4) ? true: disrevacationtype"
                                style="width:20vw" type="date" v-model="form.refinisheddate"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <!--    显示育儿假申请时长，或履历按钮      -->
          <el-row>
            <!-- 申请天数,只有育儿假显示 -->
            <el-col  :span="4" v-if="form.errortype == 'PR013023'">
              <el-form-item :label="$t('label.PFANS2016FORMVIEW_APPLYFORDAYS')">
                <el-input-number :disabled="true" controls-position="right"
                                  v-model="form.relengthtime ? form.relengthtime / 8 : form.lengthtime / 8"></el-input-number>
              </el-form-item>
            </el-col>
            <!-- 履历按钮 -->
            <el-col :span="4" v-if="form.errortype == 'PR013023' || form.errortype == 'PR013024'">
              <el-form-item :label="$t('label.PFANS2016FORMVIEW_CV')">
                <el-button type="info" :disabled="false"  plain @click="handleView">显示履历</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-show="form.errortype == 'PR013016' ? true : false">
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2016FORMVIEW_HOSPITAL')" prop="hospital">
                <el-input maxlength="50" style="width:20vw" v-model="form.hospital"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2016FORMVIEW_EDATE')" prop="edate">
                <el-date-picker :disabled="!disable" style="width:20vw"
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
                  :action="upload"
                  :disabled="disableupload"
                  :file-list="fileList"
                  :on-error="fileError"
                  :on-preview="fileDownload"
                  :on-remove="fileRemove"
                  :on-success="fileSuccess"
                  :on-change="filechange"
                  class="upload-demo"
                  drag
                  ref="upload">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">{{$t('label.enclosurecontent')}}<em>{{$t('normal.info_09')}}</em></div>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 页面育儿假和父母照料假提示 -->
          <div v-html="form.parentmsg" class="sub_color_red" style="margin-bottom: 1vw" v-if="form.errortype == 'PR013023' || form.errortype == 'PR013024'">
          </div>
          <el-row>
            <el-col>
              <el-form-item :label="$t('label.cause')" prop="cause">
                <el-input :disabled="!disable" :rows="6" style="width: 72vw;font-size: x-large" type="textarea" :placeholder="this.form.parentmsg ? $t('label.PFANS2016FORMVIEW_REASON') : ''"
                          v-model="form.cause"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </EasyNormalContainer>
    <PFANS2033Pop :params="urlparams" :url="url" ref="PFANS2033Pop"></PFANS2033Pop>
  </div>
</template>

<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import PFANS2016View from '../PFANS2016/PFANS2016View.vue';
  import {Message} from 'element-ui';
  import dicselect from '../../../components/dicselect.vue';
  import user from '../../../components/user.vue';
  import {getOrgInfoByUserId, getCurrentRole, getUserInfo} from '@/utils/customize';
  import moment from 'moment';
  import {downLoadUrl, getDictionaryInfo, uploadUrl,getCurrentRoleNew} from '../../../../utils/customize';
  import PFANS2033Pop from '@/components/EasyPop/PFANS2033Pop';

  export default {
    name: 'PFANS2016FormView',
    components: {
      EasyNormalContainer,
      PFANS2016View,
      dicselect,
      user,
      PFANS2033Pop,
    },
    data() {
      var validateUserid = (rule, value, callback) => {
        if (!value || value === '' || value === 'undefined') {
          callback(new Error(this.$t('normal.error_08') + this.$t('label.applicant')));
          this.erroruser = this.$t('normal.error_08') + this.$t('label.applicant');
        } else {
          callback();
          this.erroruser = '';
        }
      };
      var validatePass = (rule, value, callback) => {
        if (this.form.errortype == 'PR013016') {
          if (value) {
            callback();
          } else {
            callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS2016FORMVIEW_HOSPITAL')));
          }
        } else {
          callback();
        }
      };
      //预产期   04/11
      // var validatePass2 = (rule, value, callback) => {
      //   if (this.form.errortype == 'PR013016') {
      //     if (value) {
      //       callback();
      //     } else {
      //       callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS2016FORMVIEW_EDATE')));
      //     }
      //   } else {
      //     callback();
      //   }
      // };

      var validateEnddate = (rule, value, callback) => {
        if (this.form.finisheddate !== null && this.form.finisheddate !== '') {
          if (moment(value).format('YYYY-MM-DD') < moment(this.form.occurrencedate).format('YYYY-MM-DD')) {
            callback(new Error(this.$t('label.enddate') + this.$t('normal.error_checkTime1') + this.$t('label.startdate')));
          } else {
            if (moment(value).format('YYYY-MM-DD') === moment(this.form.occurrencedate).format('YYYY-MM-DD')) {
            }
            callback();
            this.clearValidate(['occurrencedate', 'periodend', 'periodstart']);
          }
        } else {
          callback();
          this.clearValidate(['occurrencedate', 'periodend', 'periodstart']);
        }
      };
      //add_fjl
      var revalidateVacationtype = (rule, value, callback) => {
        if ((this.form.errortype == 'PR013005' || this.form.errortype == 'PR013007') && this.form.status != '4' && this.form.status != '5' && this.form.status != '6' && this.form.status != '7' && this.form.status != '8') {
          if (this.form.vacationtype === null || this.form.vacationtype === '') {
            callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS2016FORMVIEW_XJTYPE')));
          } else if (this.form.errortype == 'PR013005' || this.form.errortype == 'PR013007') {
            this.$store
              .dispatch('PFANS2016Store/cklength', {
                'user_id': this.form.user_id,
                errortype: this.form.errortype,
                lengthtime: this.form.lengthtime,
                abnormalid: this.$route.params._id,
                status: this.form.status,
              })
              .then(response => {
                if (response.error != '') {
                  if (response.error == 'PR013005' || response.error == 'PR013006') {
                    this.checkDate = response.dat;
                  }
                }
                if (response.can === 'no') {
                  callback(this.$t('normal.error_norestdays'));
                } else {
                  if (response.error == 'PR013005' || response.error == 'PR013006') {
                    this.form.restdate = response.dat;
                    let valflg;
                    if (value === '0') {
                      valflg = 1;
                    } else {
                      valflg = 0.5;
                    }
                    if (Number(valflg) > Number(response.checkdat)) {
                      callback(this.$t('normal.error_norestdays'));
                    } else {
                      callback();
                    }
                  } else {
                    callback();
                  }
                }
              })
              .catch(error => {
                callback(error);
              });
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var revalidateRevacationtype = (rule, value, callback) => {
        if ((this.form.errortype == 'PR013005' || this.form.errortype == 'PR013007') && (this.form.status === '4' || this.form.status === '5' || this.form.status === '6' || this.form.status === '7')) {
          if (this.form.revacationtype === null || this.form.revacationtype === '') {
            callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS2016FORMVIEW_RELENGTHTIME')));
          } else if (this.form.errortype == 'PR013005' || this.form.errortype == 'PR013007') {
            this.$store
              .dispatch('PFANS2016Store/cklength', {
                'user_id': this.form.user_id,
                errortype: this.form.errortype,
                relengthtime: this.form.relengthtime,
                lengthtime: this.form.lengthtime,
                abnormalid: this.$route.params._id,
                status: this.form.status,
              })
              .then(response => {
                if (response.error != '') {
                  if (response.error == 'PR013005') {
                    this.checkDate = response.dat;
                  } else if (response.error == 'PR013007') {
                    this.checkDate = response.dat;
                  }
                }
                if (response.can === 'no') {
                  callback(this.$t('normal.error_norestdays'));
                } else {
                  this.form.restdate = response.dat;
                  let valflg;
                  if (value === '0') {
                    valflg = 1;
                  } else {
                    valflg = 0.5;
                  }
                  //upd ccm 0928 客户提出的bug代休填写实际被check，
                  if (this.form.status === '4' || this.form.status === '6') {
                    if (Number(valflg) > Number(response.checkdat) + Number(this.form.lengthtime)) {
                      callback(this.$t('normal.error_norestdays'));
                    } else {
                      callback();
                    }
                  }
                  //upd ccm 0928 客户提出的bug代休填写实际被check，

                }
              })
              .catch(error => {
                callback(error);
              });
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var revalidateEnddate = (rule, value, callback) => {
        if (this.form.refinisheddate !== null && this.form.refinisheddate !== '') {
          if (moment(value).format('YYYY-MM-DD') < moment(this.form.reoccurrencedate).format('YYYY-MM-DD')) {
            callback(new Error(this.$t('label.reenddate') + this.$t('normal.error_checkTime1') + this.$t('label.restartdate')));
          } else {
            callback();
            this.clearValidate(['reoccurrencedate', 'reperiodend', 'reperiodstart']);
          }
        } else {
          callback();
          this.clearValidate(['reoccurrencedate', 'reperiodend', 'reperiodstart']);
        }
      };
      var validateStartdate = (rule, value, callback) => {
        if (this.form.occurrencedate !== null && this.form.occurrencedate !== '') {
          if (moment(value).format('YYYY-MM-DD') > moment(this.form.finisheddate).format('YYYY-MM-DD')) {
            callback(new Error(this.$t('label.startdate') + this.$t('normal.error_checkTime2') + this.$t('label.enddate')));
          } else {
            callback();
            this.clearValidate(['finisheddate', 'periodend', 'periodstart']);
          }
        } else {
          callback();
          this.clearValidate(['finisheddate', 'periodend', 'periodstart']);
        }
      };
      var revalidateStartdate = (rule, value, callback) => {
        if (this.form.reoccurrencedate !== null && this.form.reoccurrencedate !== '') {
          if (moment(value).format('YYYY-MM-DD') > moment(this.form.refinisheddate).format('YYYY-MM-DD')) {
            callback(new Error(this.$t('label.restartdate') + this.$t('normal.error_checkTime2') + this.$t('label.reenddate')));
          } else {
            callback();
            this.clearValidate(['refinisheddate', 'reperiodend', 'reperiodstart']);
          }
        } else {
          callback();
          this.clearValidate(['refinisheddate', 'reperiodend', 'reperiodstart']);
        }
      };
      var validateLength = (rule, value, callback) => {
        if (this.form.errortype == 'PR013006') {
          this.$store
            .dispatch('PFANS2016Store/cklength', this.form)
            .then(response => {
              if (response.error != '' && response.error == 'PR013006') {
                this.checkDate = response.dat;
              }
              // if (response.error != '') {
              //   if (response.error == 'PR013005') {
              //     this.checkDate = response.dat;
              //   } else if (response.error == 'PR013006') {
              //     this.checkDate = response.checkdat;
              //   } else if (response.error == 'PR013007') {
              //     this.checkDate = response.checkdat;
              //   }
              // }
              if (response.can === 'no') {
                callback(this.$t('normal.error_norestdays'));
              } else {
                this.form.restdate = response.dat;
                // if (response.error == 'PR013006') {
                //   if (value / 8 > Number(response.checkdat)) {
                //     callback(this.$t('normal.error_norestdays'));
                //   } else {
                //     callback();
                //   }
                // }
                callback();
              }
            })
            .catch(error => {
              callback(error);
            });
        } else {
          callback();
        }
      };
      var revalidateLength = (rule, value, callback) => {
        if ((this.form.errortype == 'PR013005' || this.form.errortype == 'PR013006' || this.form.errortype == 'PR013007') && this.form.status === '4') {
          this.form.abnormalid = this.$route.params._id;
          this.form.status = this.form.status;
          this.$store
            .dispatch('PFANS2016Store/cklength', this.form)
            .then(response => {
              if (response.error != '' && response.error == 'PR013006') {
                this.checkDate = response.dat;
              }
              // if (response.error != '') {
              //   if (response.error == 'PR013005') {
              //     this.checkDate = response.dat;
              //   } else if (response.error == 'PR013006') {
              //     this.checkDate = response.checkdat;
              //   } else if (response.error == 'PR013007') {
              //     this.checkDate = response.checkdat;
              //   }
              // }
              if (response.can === 'no') {
                callback(this.$t('normal.error_norestdays'));
              } else {
                this.form.restdate = response.dat;
                // if (response.error == 'PR013006') {
                //   if (value / 8 > Number(response.checkdat)) {
                //     callback(this.$t('normal.error_norestdays'));
                //   } else {
                //     callback();
                //   }
                // }
                callback();
              }
            })
            .catch(error => {
              callback(error);
            });
        } else {
          callback();
        }
      };
      //add ccm 0720
      var checkenclosurecontent = (rule, value, callback) => {
        if (this.form.errortype != null && this.form.errortype != '') {
          if (this.form.errortype == 'PR013009' || this.form.errortype == 'PR013010' || this.form.errortype == 'PR013011'
            || this.form.errortype == 'PR013012' || this.form.errortype == 'PR013013' || this.form.errortype == 'PR013015'
            || this.form.errortype == 'PR013016' || this.form.errortype == 'PR013017' || this.form.errortype == 'PR013020'
            || this.form.errortype == 'PR013021' || this.form.errortype == 'PR013022' || this.form.errortype == 'PR013023' || this.form.errortype == 'PR013024') {
            if (!this.form.uploadfile || this.form.uploadfile === '' || this.form.uploadfile === undefined) {
              return callback(new Error(this.$t('normal.error_16') + this.$t('label.enclosure')));
            } else {
              callback();
              this.clearValidate(['enclosurecontent']);
            }
          } else {
            callback();
            this.clearValidate(['enclosurecontent']);
          }
        } else {
          callback();
          this.clearValidate(['enclosurecontent']);
        }
      };
      //add ccm 0720
      //region scc_add_21/1/6 结婚日期必填必填 from
      var validateWeddingdate = (rule, value, callback) => {
        if (!this.form.weddingdate || this.form.weddingdate === '' || this.form.weddingdate === 'undefined') {
          callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS2016FORMVIEW_WEDDINGDATE')));
        } else {
          callback();
        }
      };
      //endregion scc_add_21/1/6 结婚日期必填必填 to
      //region scc_add_21/1/6 子女出生日期必填必填 from
      var validateDateofbirth = (rule, value, callback) => {
        if (!this.form.dateofbirth || this.form.dateofbirth === '' || this.form.dateofbirth === 'undefined') {
          callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS2016FORMVIEW_DATEOFBIRTH')));
        } else {
          callback();
        }
      };
      //endregion scc_add_21/1/6 子女出生日期必填必填 to
      //region scc_add_21/1/6 父母出生日期必填 from
      var validateParentsdate = (rule, value, callback) => {
        if (!this.form.parentsdate || this.form.parentsdate === '' || this.form.parentsdate === 'undefined') {
          callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS2016FORMVIEW_PARENTSDATE')));
        } else {
          callback();
        }
      };
      //endregion scc_add_21/1/6 父母出生日期必填 to
      //region scc_add_21/1/6 父母住院开始日期必填 from
      var validateSuchconfinement = (rule, value, callback) => {
        if (!this.form.suchconfinement || this.form.suchconfinement === '' || this.form.suchconfinement === 'undefined') {
          callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS2016FORMVIEW_SUCHCONFINEMENT')));
        } else {
          callback();
        }
      };
      //endregion scc_add_21/1/6 父母住院开始日期必填 to
      // region scc_add_21/1/6 住院父母名字必填 from
      var validateParentsname = (rule, value, callback) => {
        if (!this.form.parentsname || this.form.parentsname === '' || this.form.parentsname === 'undefined') {
          callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS2016FORMVIEW_PARENTSNAME')));
        } else {
          callback();
        }
      };
      //endregion scc_add_21/1/6 住院父母名字必填 to
      return {
        roles: '',
        //add ccm 0806 剩余年休
        remaningAnnual: [],
        //add ccm 0806 剩余年休
        appUserid: '',
        defaultStart: false,
        checkerrortishi: false,
        dislengthtime: false,
        checkrelengthtime: false,
        disableupload: false,
        centerid: '',
        groupid: '',
        teamid: '',
        checkBox: '',
        errorcheck: 1,
        // checkfinisheddate: true,
        relistTwo: '',
        workflowCode: '',
        canStart: true,
        loading: false,
        leaveNum: 0,
        optionRest: [],
        errort: '',
        checkDate: '',
        errorendtime: '',
        reerrorendtime: '',
        errorstarttime: '',
        reerrorstarttime: '',
        childrenage: '',//育儿假孩子年龄显示
        parentsage: '',//父母照料加父母年龄
        cumulative: '',//年累计天数
        url: '',
        urlparams: {},
        options: [{
          value: '0',
          label: this.$t('label.PFANS2016FORMVIEW_QUANTIAN'),
        },
          {
          value: '1',
          label: this.$t('label.PFANS2011FROMVIEW_HALFDATE'),
        },
          {
          value: '2',
          label: this.$t('label.PFANS2016FORMVIEW_UNREST'),
        }],
        value: [],
        options1: [{
          value: '0',
          label: this.$t('label.PFANS2016FORMVIEW_QUANTIAN'),
        }, {
          value: '1',
          label: this.$t('label.PFANS2011FROMVIEW_HALFDATE'),
          // }, {
          //   value: '2',
          //   label: this.$t('label.PFANS2016FORMVIEW_XIAWU'),
        }],
        showVacation: false,
        disrevacationtype: false,
        erroruser: '',
        selectType: 'Single',
        userlist: '',
        title: 'title.exception_application',
        buttonList: [
          {'key': 'back', 'name': 'button.back', 'disabled': false, 'icon': 'el-icon-back'},
        ],
        restdiff3: '0',
        form: {
          restdiff: '',
          restdiff2: '',
          vacationtype: '',
          revacationtype: '',
          centerid: '',
          groupid: '',
          teamid: '',
          user_id: '',
          worktime: '0.00',
          applicationdate: moment(new Date()).format('YYYY-MM-DD'),
          errortype: '',
          lengthtime: '0',
          relengthtime: '0',
          occurrencedate: moment(new Date()).format('YYYY-MM-DD'),
          finisheddate: moment(new Date()).format('YYYY-MM-DD'),
          reoccurrencedate: '',
          refinisheddate: '',
          // relation: '',
          hospital: '',
          edate: '',
          enclosureexplain: '',
          // periodstart: '',
          // periodend: '',
          uploadfile: '',
          cause: '',
          status: '',
          weddingdate: '',
          dateofbirth: '',
          parentsdate: '',
          suchconfinement: '',
          parentmsg: '',
          parentsname: '',
        },
        code: 'PR013',
        multiple: false,
        disable: true,
        // relation: '',
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
          finisheddate: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.enddate'),
              trigger: 'change',
            },
            {validator: validateEnddate, trigger: 'change'}],
          reoccurrencedate: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.restartdate'),
              trigger: 'change',
            },
            {validator: revalidateStartdate, trigger: 'change'}],
          refinisheddate: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.reenddate'),
              trigger: 'change',
            },
            {validator: revalidateEnddate, trigger: 'change'}],
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
          vacationtype: [{
            required: true,
            validator: revalidateVacationtype,
            // message: this.$t('normal.error_09') + this.$t('label.PFANS2016FORMVIEW_XJTYPE'),
            trigger: 'change',
          }],
          revacationtype: [{
            required: true,
            validator: revalidateRevacationtype,
            // message: this.$t('normal.error_09') + this.$t('label.PFANS2016FORMVIEW_RELENGTHTIME'),
            trigger: 'change',
          }],
          //add ccm 0720
          enclosurecontent: [{
            required: true,
            validator: checkenclosurecontent,
            trigger: 'change',
          }],
          //add ccm 0720
          cause: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.cause'),
              trigger: 'change',
            },
          ],
          lengthtime: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS2016FORMVIEW_LENGTHTIME'),
              trigger: 'change',
            },
            {validator: validateLength, trigger: 'change'}],
          relengthtime: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS2016FORMVIEW_RELENGTHTIMETO'),
            trigger: 'change',
          },
            {validator: revalidateLength, trigger: 'change'}],
          hospital: [{required: true, validator: validatePass, trigger: 'blur'}],
          // edate: [{required: true, validator: validatePass2, trigger: 'change'}],
          //region scc_add_21/1/6 结婚日期必填 from
          weddingdate: [{
            required: true,
            validator: validateWeddingdate,
            trigger: 'change',
          }],
          //endregion scc_add_21/1/6 结婚日期必填 to
          // region scc_add_21/1/6 子女出生日期必填 from
          dateofbirth: [{
            required: true,
            validator: validateDateofbirth,
            trigger: 'change',
          }],
          //endregion scc_add_21/1/6 子女出生日期必填 to
          // region scc_add_21/1/6 父母出生日期 from
          parentsdate: [{
            required: true,
            validator: validateParentsdate,
            trigger: 'change',
          }],
          //endregion scc_add_21/1/6 父母出生日期 to
          // region scc_add_21/1/6 父母住院开始日期 from
          suchconfinement: [{
            required: true,
            validator: validateSuchconfinement,
            trigger: 'change',
          }],
          //endregion scc_add_21/1/6 父母住院开始日期 to
          // region scc_add_21/1/6 父母住院开始日期 from
          parentsname: [{
            required: true,
            validator: validateParentsname,
            trigger: 'change',
          }],
          //endregion scc_add_21/1/6 父母住院开始日期 to
        },
        fileList: [],
        upload: uploadUrl(),
        workshift: '',
        typecheck: '',
        checklength3: '',
        retypecheck: '',
        timeSum: '',
        closingtime: '',
        lunchbreakS: '',
        lunchbreakE: '',
        dateInfo: [],
        Todaysum: [],
        reList: [],
        relist: [],
        sickleave: '',
        parent: '',
        checkTimelenght: '',
        checkTimeLenght: '',
        // enterday: '',
        marryday: '',
        enclosurecontent: '',
      };
    },
    mounted() {
      this.roles = getCurrentRoleNew();
      this.getAbNormalParent();
      this.getSickleave();
      // this.getAttendance();
      this.getDay();
      //add ccm 0804
      if (this.$route.params._lengthtime && this.$route.params._day) {
        this.form.lengthtime = this.$route.params._lengthtime;
        this.form.occurrencedate = this.$route.params._day;
        this.form.finisheddate = this.$route.params._day;
        this.appUserid = this.$route.params._user;
        this.userlist = this.$route.params._user;
        this.form.user_id = this.$route.params._user;
        this.getUserids(this.appUserid);
      }
      //add ccm 0804
      if (this.$route.params._id) {
        // this.$store.commit('global/SET_WORKFLOWURL', '/PFANS2016View');
        this.loading = true;
        this.$store
          .dispatch('PFANS2016Store/getPfans2016One', {'abnormalid': this.$route.params._id})
          .then(response => {
            this.form = response;
            //存在附件提醒予以提醒
            if(response.enclosureexplain){
              this.showVacation = true;
            }
            //计算年龄和取年累计
            if(this.form.errortype === 'PR013023'){
              this.changeBirth();
            }
            if(this.form.errortype === 'PR013024'){
              this.changeParent();
            }
            this.userlist = this.form.user_id;
            // this.getRestday(this.userlist);
            if (parseInt(this.form.status) <= 4) {
              this.checklength3 = response.lengthtime;
            } else {
              this.checklength3 = response.relengthtime;
            }
            this.typecheck = this.form.vacationtype;
            this.retypecheck = this.form.revacationtype;
            if (this.form.refinisheddate == null || this.form.reoccurrencedate == null) {
              if (this.form.status === '4') {
                this.form.revacationtype = this.form.vacationtype;
                this.form.reoccurrencedate = response.occurrencedate;
                this.form.refinisheddate = response.finisheddate;
                this.form.relengthtime = response.lengthtime;
                // // 因公外出或打卡异常 家长会假
                // if (this.form.errortype === 'PR013001') {
                //   this.checkrelengthtime = true;
                // }
              }
            }
            //add  ml   20210702  年休或特别休日   from
            if((this.form.errortype === 'PR013005' || this.form.errortype === 'PR013007') && this.form.status >= 4 ){
              if(moment(this.form.reoccurrencedate).format('YYYY-MM-DD') !== moment(this.form.refinisheddate).format('YYYY-MM-DD')){
                this.options = [{
                  value: '0',
                  label: this.$t('label.PFANS2016FORMVIEW_QUANTIAN'),
                },
                  {
                    value: '2',
                    label: this.$t('label.PFANS2016FORMVIEW_UNREST'),
                  }]
              }
            }
            //add  ml   20210702  年休或特别休日   to
            if (this.form.errortype === 'PR013011' || this.form.errortype === 'PR013012' || this.form.errortype === 'PR013013'
              || this.form.errortype === 'PR013015' || this.form.errortype === 'PR013017' || this.form.errortype === 'PR013020'
              || this.form.errortype === 'PR013021' || this.form.errortype === 'PR013022') {
              this.dislengthtime = true;
            } else if (this.form.errortype === 'PR013009' || this.form.errortype === 'PR013008' || this.form.errortype === 'PR013006') {
              if (moment(this.form.occurrencedate).format('YYYY-MM-DD') !== moment(this.form.finisheddate).format('YYYY-MM-DD')) {
                this.dislengthtime = true;
              } else {
                this.dislengthtime = false;
              }
            } else {
              this.dislengthtime = false;
            }
            if (this.form.errortype === 'PR013001') {
              this.checkrelengthtime = false;
            } else if (moment(this.form.refinisheddate).format('YYYY-MM-DD') != moment(this.form.reoccurrencedate).format('YYYY-MM-DD')) {
              this.checkrelengthtime = true;
            }
            let rst = getOrgInfoByUserId(response.user_id);
            if (rst) {
              this.centerid = rst.centerNmae;
              this.groupid = rst.groupNmae;
              this.teamid = rst.teamNmae;
            }
            this.getonRest(this.form.errortype);
            // this.relation = this.form.relation;
            // if (this.form.status == '4' || this.form.status == '5' || this.form.status == '6' || this.form.status == '7') {
            //   this.checkfinisheddate = false;
            // }
            // if (this.form.status === '2' || this.form.status === '4'
            //   || this.form.status === '6'|| this.form.status === '7') {
            //   this.disable = false;
            // }
            this.getOvertimelist();
            if (this.form.uploadfile != '') {
              let uploadfile = this.form.uploadfile.split(';');
              for (var i = 0; i < uploadfile.length; i++) {
                if (uploadfile[i].split(',')[0] != '') {
                  let o = {};
                  o.name = uploadfile[i].split(',')[0];
                  o.url = uploadfile[i].split(',')[1];
                  this.fileList.push(o);
                }
              }
            }
            if (this.form.status === '0' || this.form.status === '3') {
              // if (this.form.user_id === '5e78fefff1560b363cdd6db7') {
              if(this.roles === '1'){
                if (this.form.errortype === 'PR013009' || this.form.errortype === 'PR013010'
                  || this.form.errortype === 'PR013011' || this.form.errortype === 'PR013012'
                  || this.form.errortype === 'PR013013' || this.form.errortype === 'PR013015'
                  || this.form.errortype === 'PR013016' || this.form.errortype === 'PR013017'
                  || this.form.errortype === 'PR013020' || this.form.errortype === 'PR013021'
                  || this.form.errortype === 'PR013022' || this.form.errortype === 'PR013023' || this.form.errortype === 'PR013024') {
                  this.workflowCode = 'W0087';
                } else {
                  this.workflowCode = 'W0070';
                }
              } else if (this.form.errortype === 'PR013009' || this.form.errortype === 'PR013010'
                || this.form.errortype === 'PR013011' || this.form.errortype === 'PR013012'
                || this.form.errortype === 'PR013013' || this.form.errortype === 'PR013015'
                || this.form.errortype === 'PR013016' || this.form.errortype === 'PR013017'
                || this.form.errortype === 'PR013020' || this.form.errortype === 'PR013021'
                || this.form.errortype === 'PR013022' || this.form.errortype === 'PR013023' || this.form.errortype === 'PR013024') {
                this.workflowCode = 'W0085';
              } else {
                this.workflowCode = 'W0003';
              }

              this.canStart = true;
              if (!this.disable) {
                this.dislengthtime = true;
                this.disableupload = true;
              }
            } else if (this.form.status === '4' || this.form.status === '6') {
              // if (this.form.user_id === '5e78fefff1560b363cdd6db7') {
              if(this.roles === '1'){
                if (this.form.errortype === 'PR013009' || this.form.errortype === 'PR013010'
                  || this.form.errortype === 'PR013011' || this.form.errortype === 'PR013012'
                  || this.form.errortype === 'PR013013' || this.form.errortype === 'PR013015'
                  || this.form.errortype === 'PR013016' || this.form.errortype === 'PR013017'
                  || this.form.errortype === 'PR013020' || this.form.errortype === 'PR013021'
                  || this.form.errortype === 'PR013022' || this.form.errortype === 'PR013023' || this.form.errortype === 'PR013024') {
                  this.workflowCode = 'W0088';
                } else {
                  this.workflowCode = 'W0071';
                }

              } else if (this.form.errortype === 'PR013009' || this.form.errortype === 'PR013010'
                || this.form.errortype === 'PR013011' || this.form.errortype === 'PR013012'
                || this.form.errortype === 'PR013013' || this.form.errortype === 'PR013015'
                || this.form.errortype === 'PR013016' || this.form.errortype === 'PR013017'
                || this.form.errortype === 'PR013020' || this.form.errortype === 'PR013021'
                || this.form.errortype === 'PR013022' || this.form.errortype === 'PR013023' || this.form.errortype === 'PR013024') {
                this.workflowCode = 'W0086';
              } else {
                this.workflowCode = 'W0059';
              }
              this.canStart = true;
              //查看时，不可编辑
              if (!this.disable) {
                this.disrevacationtype = true;
                this.disableupload = true;
              } else {
                this.disrevacationtype = false;
                this.disableupload = false;
              }
              this.disable = false;
              this.dislengthtime = true;
            } else if (this.form.status === '5') {
              this.canStart = false;
              this.disable = false;
              this.disrevacationtype = true;
              this.dislengthtime = true;
              this.checkrelengthtime = true;
              this.disableupload = true;
            } else if (this.form.status === '7') {
              this.disrevacationtype = true;
              // if (this.form.user_id === '5e78fefff1560b363cdd6db7') {
              if(this.roles === '1'){
                if (this.form.errortype === 'PR013009' || this.form.errortype === 'PR013010'
                  || this.form.errortype === 'PR013011' || this.form.errortype === 'PR013012'
                  || this.form.errortype === 'PR013013' || this.form.errortype === 'PR013015'
                  || this.form.errortype === 'PR013016' || this.form.errortype === 'PR013017'
                  || this.form.errortype === 'PR013020' || this.form.errortype === 'PR013021'
                  || this.form.errortype === 'PR013022' || this.form.errortype === 'PR013023' || this.form.errortype === 'PR013024') {
                  this.workflowCode = 'W0088';
                } else {
                  this.workflowCode = 'W0071';
                }

              } else if (this.form.errortype === 'PR013009' || this.form.errortype === 'PR013010'
                || this.form.errortype === 'PR013011' || this.form.errortype === 'PR013012'
                || this.form.errortype === 'PR013013' || this.form.errortype === 'PR013015'
                || this.form.errortype === 'PR013016' || this.form.errortype === 'PR013017'
                || this.form.errortype === 'PR013020' || this.form.errortype === 'PR013021'
                || this.form.errortype === 'PR013022' || this.form.errortype === 'PR013023' || this.form.errortype === 'PR013024') {
                this.workflowCode = 'W0086';
              } else {
                this.workflowCode = 'W0059';
              }
              this.canStart = false;
              this.disable = false;
              this.dislengthtime = true;
              this.checkrelengthtime = true;
              this.disableupload = true;
            } else if (this.form.status === '2') {
              this.disable = false;
              this.dislengthtime = true;
              this.disableupload = true;
            }
            this.loading = false;

          })
          .catch(error => {
            this.$message.error({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
            this.loading = false;
          });
        // let dictionaryInfo = getDictionaryInfo(this.form.errortype);
        // if (dictionaryInfo) {
        //   this.form.enclosureexplain = dictionaryInfo.value2;
        // }
      } else {
        this.$store.commit('global/SET_WORKFLOWURL', '/PFANS2016FormView');
        this.userlist = this.$store.getters.userinfo.userid;
        // this.getRestday(this.userlist);
        // this.enterday = moment(this.$store.getters.userinfo.userinfo.enterday).format('YYYY-MM-DD');
        this.marryday = moment(this.$store.getters.userinfo.userinfo.marryday).format('YYYY-MM-DD');
        if (this.userlist !== null && this.userlist !== '') {
          let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
          if (rst) {
            this.centerid = rst.centerNmae;
            this.groupid = rst.groupNmae;
            this.teamid = rst.teamNmae;
            this.form.centerid = rst.centerId;
            this.form.groupid = rst.groupId;
            this.form.teamid = rst.teamId;
          }
          this.form.user_id = this.$store.getters.userinfo.userid;
        }
        this.getOvertimelist();
        // this.getWorktime();
        // if (this.$store.getters.userinfo.userid === '5e78fefff1560b363cdd6db7') {
        if(this.roles === '1'){
          if (this.form.errortype === 'PR013009' || this.form.errortype === 'PR013010'
            || this.form.errortype === 'PR013011' || this.form.errortype === 'PR013012'
            || this.form.errortype === 'PR013013' || this.form.errortype === 'PR013015'
            || this.form.errortype === 'PR013016' || this.form.errortype === 'PR013017'
            || this.form.errortype === 'PR013020' || this.form.errortype === 'PR013021'
            || this.form.errortype === 'PR013022' || this.form.errortype === 'PR013023' || this.form.errortype === 'PR013024') {
            this.workflowCode = 'W0087';
          } else {
            this.workflowCode = 'W0070';
          }

        } else if (this.form.errortype === 'PR013009' || this.form.errortype === 'PR013010'
          || this.form.errortype === 'PR013011' || this.form.errortype === 'PR013012'
          || this.form.errortype === 'PR013013' || this.form.errortype === 'PR013015'
          || this.form.errortype === 'PR013016' || this.form.errortype === 'PR013017'
          || this.form.errortype === 'PR013020' || this.form.errortype === 'PR013021'
          || this.form.errortype === 'PR013022' || this.form.errortype === 'PR013023' || this.form.errortype === 'PR013024') {
          this.workflowCode = 'W0085';
        } else {
          this.workflowCode = 'W0003';
        }

        //add ccm 0804
        if (this.$route.params._lengthtime && this.$route.params._day) {
          this.form.lengthtime = this.$route.params._lengthtime;
          this.form.occurrencedate = this.$route.params._day;
          this.form.finisheddate = this.$route.params._day;
          this.appUserid = this.$route.params._user;
          this.userlist = this.$route.params._user;
          this.getUserids(this.appUserid);
        }
        //add ccm 0804
      }

      //add ccm 0806 查询申请人的剩余年休，
      this.getremainingByuserid();
      //add ccm 0806 查询申请人的剩余年休，

    },
    created() {
      this.$store.commit('global/SET_HISTORYURL', '');
      this.disable = this.$route.params.disabled;
      if (this.disable) {
        this.buttonList = [
          {key: 'back', name: 'button.back', disabled: false, icon: 'el-icon-back'},
          {
            key: 'save',
            name: 'button.save',
            disabled: false,
            icon: 'el-icon-check',
          },

        ];
      }

    },
    methods: {
      //add ccm 0806 查询申请人的剩余年休，
      getremainingByuserid() {
        this.loading = true;
        this.$store
          .dispatch('PFANS2016Store/getremainingByuserid', {'userid': this.form.user_id})
          .then(response => {
            this.remaningAnnual = [];
            if (response && response.length > 0) {
              this.remaningAnnual = response;
            }
            this.loading = false;
          })
          .catch(error => {
            this.$message.error({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
            this.loading = false;
          });
      },
      //add ccm 0806 查询申请人的剩余年休，

      getWorktime() {
        this.loading = true;
        this.$store
          .dispatch('PFANS2017Store/getFpans2017Listowner', {})
          .then(response => {
            for (let j = 0; j < response.length; j++) {
              if (moment(this.form.occurrencedate).format('YYYY-MM-DD') === moment(response[j].punchcardrecord_date).format('YYYY-MM-DD') && this.$store.getters.userinfo.userid === response[j].user_id) {
                if (response[j].worktime > 0) {
                  this.form.worktime = Number((response[j].worktime)).toFixed(2);
                } else {
                  this.form.worktime = 0.00;
                }
              }
            }
            this.loading = false;
          })
          .catch(error => {
            this.$message.error({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
            this.loading = false;
          });
      },
      setdisabled(val) {
        if (this.$route.params.disabled) {
          this.disabled = val;
        }
      },
      filechange(file, fileList) {
        this.$refs.ruleForm.validateField('enclosurecontent');
      },
      handleClick(val) {
        this.form.vacationtype = val;
        this.form.revacationtype = val;
        this.typecheck = val;
        // this.retypecheck = val;
        this.form.finisheddate = this.form.occurrencedate;
        if (val == '1') {
          // Message({
          //     message: this.$t('label.PFANS2016FORMVIEW_CHECKDAIXIUBANRI'),
          //     type: 'success',
          //     duration: 5 * 1000,
          // });
          // this.checkfinisheddate = false;
          this.form.lengthtime = 4;
          // this.form.occurrencedate = moment(new Date()).format('YYYY-MM-DD');
        } else if (val == '0') {
          this.form.lengthtime = 8;
          // this.checkfinisheddate = true;
          // this.form.finisheddate = moment(new Date()).format('YYYY-MM-DD');
        }
      },
      rehandleClick(val) {
        this.form.revacationtype = val;
        this.retypecheck = val;
        //del   ml  20210702  未休时间显示  from
        // this.form.refinisheddate = this.form.reoccurrencedate;
        //del   ml  20210702  未休时间显示  to
        if (val == '0') {
          this.form.relengthtime = 8;
        } else if (val == '1') {
          this.form.relengthtime = 4;
        } else if (val == '2') {
          this.form.relengthtime = 0;
        }
      },
      //时间长度总计
      // getTime(val) {
      //   let sum = 0;
      //   if (moment(this.form.finisheddate).format('YYYY-MM-DD') === moment(this.form.occurrencedate).format('YYYY-MM-DD')) {
      //     sum = 1;
      //   } else {
      //     for (let i = 0; i < this.relist.length; i++) {
      //       sum = sum + 1;
      //     }
      //   }
      //   if (this.form.errortype === 'PR013001' || this.form.errortype === 'PR013016' ||
      //     this.form.errortype === 'PR013018' || this.form.errortype === 'PR013019' || this.form.errortype === 'PR013014') {
      //     this.form.finisheddate = this.form.occurrencedate;
      //   }
      //   if (this.form.errortype === 'PR013001' || this.form.errortype === 'PR013008' || this.form.errortype === 'PR013016'
      //     || this.form.errortype === 'PR013018' || this.form.errortype === 'PR013019' || this.form.errortype === 'PR013014') {
      //     for (let i = 0; i < this.relist.length; i++) {
      //       sum = sum + 1;
      //     }
      //     if (moment(this.form.finisheddate).format('YYYY-MM-DD') === moment(this.form.occurrencedate).format('YYYY-MM-DD')) {
      //       sum = 1;
      //     }
      //     if (this.form.errortype === 'PR013014') {
      //       if (2 - this.parent <= 0) {
      //         this.errorcheck = 2;
      //         Message({
      //           message: this.$t('label.PFANS2016FORMVIEW_BJDJZHCHECK'),
      //           type: 'error',
      //           duration: 5 * 1000,
      //         });
      //         return;
      //       } else {
      //         this.errorcheck = 1;
      //       }
      //       if (val > 4) {
      //         this.errorcheck = 2;
      //         Message({
      //           message: this.$t('label.PFANS2016FORMVIEW_BJDJZCHECK'),
      //           type: 'error',
      //           duration: 5 * 1000,
      //         });
      //         return;
      //       } else {
      //         this.errorcheck = 1;
      //       }
      //     } else if (this.form.errortype === 'PR013016' && this.$store.getters.userinfo.userinfo.sex !== 'PR019002') {
      //       if (this.$store.getters.userinfo.userinfo.sex !== 'PR019002') {
      //         this.errorcheck = 2;
      //         Message({
      //           message: this.$t('label.PFANS2016FORMVIEW_WOMENCHECK'),
      //           type: 'error',
      //           duration: 5 * 1000,
      //         });
      //         return;
      //       } else {
      //         this.errorcheck = 1;
      //       }
      //     }
      //     if (this.form.errortype === 'PR013001') {
      //       if (8 < val) {
      //         this.errorcheck = 2;
      //         Message({
      //           message: this.$t('label.PFANS2016FORMVIEW_WAICHUTIMENOCHECK'),
      //           type: 'error',
      //           duration: 5 * 1000,
      //         });
      //         return;
      //       } else {
      //         this.errorcheck = 1;
      //       }
      //     }
      //     if (this.form.errortype === 'PR013008' || this.form.errortype === 'PR013014' || this.form.errortype === 'PR013016'
      //       || this.form.errortype === 'PR013018' || this.form.errortype === 'PR013019') {
      //       if (sum * 8 < val) {
      //         this.errorcheck = 2;
      //         Message({
      //           message: this.$t('label.PFANS2016FORMVIEW_WAICHUTIMENOCHECK'),
      //           type: 'error',
      //           duration: 5 * 1000,
      //         });
      //         return;
      //       } else {
      //         this.errorcheck = 1;
      //       }
      //     }
      //   } else if (this.form.errortype === 'PR013009') {
      //     let diffDate = moment(this.form.finisheddate).diff(moment(this.form.occurrencedate), 'days') + 1;
      //     if (diffDate > 30 - this.sickleave || val / 8 > 30 - this.sickleave) {
      //       this.errorcheck = 2;
      //       Message({
      //         message: this.$t('label.PFANS2016FORMVIEW_SHORTCHECK'),
      //         type: 'error',
      //         duration: 5 * 1000,
      //       });
      //       return;
      //     } else {
      //       this.errorcheck = 1;
      //     }
      //     for (let i = 0; i < diffDate; i++) {
      //       sum = sum + 1;
      //     }
      //     if (sum * 8 < val) {
      //       this.errorcheck = 2;
      //       Message({
      //         message: this.$t('label.PFANS2016FORMVIEW_WAICHUTIMENOCHECK'),
      //         type: 'error',
      //         duration: 5 * 1000,
      //       });
      //       return;
      //     } else {
      //       this.errorcheck = 1;
      //     }
      //   }
      // },
      getDay() {
        this.$store
          .dispatch('PFANS8007Store/getList', {})
          .then(response => {
            for (let i = 0; i < response.length; i++) {
              this.dateInfo.push({
                dateflg: moment(response[i].workingdate).format('YYYY-MM-DD'),
                type: response[i].type,
              });
            }
          });
      },
      // getAttendance() {
      //   this.loading = true;
      //   this.$store
      //     .dispatch('PFANS2018Store/getFpans2018List', {})
      //     .then(response => {
      //       this.workshift = response[0].workshift_end;
      //       this.closingtime = response[0].closingtime_end;
      //       this.lunchbreakS = response[0].lunchbreak_start;
      //       this.lunchbreakE = response[0].lunchbreak_end;
      //       this.loading = false;
      //     })
      //     .catch(error => {
      //       this.$message.error({
      //         message: error,
      //         type: 'error',
      //         duration: 5 * 1000,
      //       });
      //       this.loading = false;
      //     });
      // },
      getSickleave() {
        this.loading = true;
        this.$store
          .dispatch('PFANS2016Store/getSickleave', {'userid': this.$store.getters.userinfo.userid})
          .then(response => {
            this.sickleave = response;
            this.loading = false;
          })
          .catch(error => {
            this.$message.error({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
            this.loading = false;
          });
      },
      //add_fjl_05/26 --添加代休剩余
      // getRestday(val) {
      //   this.loading = true;
      //   this.$store
      //     .dispatch('PFANS2016Store/getRestday', {'userid': val})
      //     .then(response => {
      //       this.optionRest = [];
      //       for (let i = 0; i < response.length; i++) {
      //         var ro = {};
      //         ro.typecode = response[i].codetype,
      //           ro.sumday = response[i].sumDay,
      //           this.optionRest.push(ro);
      //       }
      //       this.loading = false;
      //     })
      //     .catch(error => {
      //       this.$message.error({
      //         message: error,
      //         type: 'error',
      //         duration: 5 * 1000,
      //       });
      //       this.loading = false;
      //     });
      // },
      //add_fjl_05/26 --添加代休剩余
      getAbNormalParent() {
        this.loading = true;
        this.$store
          .dispatch('PFANS2016Store/selectAbNormalParent', {'userid': this.$store.getters.userinfo.userid})
          .then(response => {
            this.parent = response.length;
            this.loading = false;
          })
          .catch(error => {
            this.$message.error({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
            this.loading = false;
          });
      },
      clearValidate(prop) {
        this.$refs['ruleForm'].fields.forEach((e) => {
          if (prop.includes(e.prop)) {
            e.clearValidate();
          }
        });
      },
      getOvertimelist() {
        this.loading = true;
        this.$store
          .dispatch('PFANS2016Store/getOvertimelist', {userid: this.userlist, actualsubstitutiondate: null})
          .then(response => {
            for (let j = 0; j < response.length; j++) {
              response[j].reserveovertimedate = moment(response[j].reserveovertimedate).format('YYYY-MM-DD');
              let getOvertimetype = getDictionaryInfo(response[j].overtimetype);
              if (getOvertimetype !== null && getOvertimetype.code === 'PR013002') {
                response[j].overtimetype = getOvertimetype.value1;
              }
              // if (this.relation) {
              //     this.showWeekend = true;
              //     let a = this.relation.split(',');
              //     for (let i = 0; i < a.length; i++) {
              //         if (a[i] === response[j].overtimeid) {
              //             letrelation.push(response[j]);
              //         }
              //     }
              // }
            }
            // if (letrelation.length > 0) {
            //     this.options = letrelation;
            //     this.form.relation = this.options;
            // } else {
            //     this.options = response;
            // }
            this.loading = false;
          })
          .catch(error => {
            this.$message.error({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
            this.loading = false;
          });
      },
      diffNoDays() {
        // if (moment(this.form.occurrencedate).format('YYYY-MM-DD') != moment(this.form.finisheddate).format('YYYY-MM-DD')) {
        var getDate = function(str) {
          var tempDate = new Date();
          var list = str.split('-');
          tempDate.setFullYear(list[0]);
          tempDate.setMonth(list[1] - 1);
          tempDate.setDate(list[2]);
          return tempDate;
        };
        if (this.form.occurrencedate != '' && this.form.finisheddate != '') {
          var date1 = getDate(moment(this.form.occurrencedate).format('YYYY-MM-DD'));
          var date2 = getDate(moment(this.form.finisheddate).format('YYYY-MM-DD'));
          if (date1 > date2) {
            var tempDate = date1;
            date1 = date2;
            date2 = tempDate;
          }
          date1.setDate(date1.getDate() + 1);
          var dateArr = [];
          var i = 0;
          this.Todaysum = [];
          if (moment(this.form.occurrencedate).format('YYYY-MM-DD') === moment(this.form.finisheddate).format('YYYY-MM-DD')) {
            this.Todaysum.push(moment(this.form.occurrencedate).format('YYYY-MM-DD'));
          } else {
            while (!(date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2
              .getDate())) {
              var dayStr = date1.getDate().toString();
              if (dayStr.length == 1) {
                dayStr = '0' + dayStr;
              }
              var monthStr = (date1.getMonth() + 1).toString();
              if (monthStr.length == 1) {
                monthStr = '0' + monthStr;
              }
              dateArr[i] = date1.getFullYear() + '-' + monthStr + '-'
                + dayStr;
              i++;
              date1.setDate(date1.getDate() + 1);
            }
            dateArr.splice(0, 0, moment(this.form.occurrencedate).format('YYYY-MM-DD'));
            dateArr.push(moment(this.form.finisheddate).format('YYYY-MM-DD'));
            this.Todaysum = dateArr;
          }
        }
        //去掉工作日设定里面的节假日
        for (let a = 0; a < this.Todaysum.length; a++) {
          for (let b = 0; b < this.dateInfo.length; b++) {
            if (this.dateInfo[b].dateflg == this.Todaysum[a]) {
              this.Todaysum.splice(a, 1);
            }
          }
        }
        this.reList = this.Todaysum;
        //去除周六
        for (let i = 0; i < this.reList.length; i++) {
          var date = getDate(this.reList[i]);
          if (date.getDay() == 6) {
            this.reList.splice(i, 1);
          }
        }
        this.relist = this.reList;
        //去除周日
        for (let j = 0; j < this.relist.length; j++) {
          var data = getDate(this.relist[j]);
          if (data.getDay() == 0) {
            this.relist.splice(j, 1);
          }
        }
        //添加振替出勤日
        for (let b = 0; b < this.dateInfo.length; b++) {
          if (moment(this.form.occurrencedate).format('YYYY-MM-DD') <= moment(this.dateInfo[b].dateflg).format('YYYY-MM-DD') && moment(this.form.finisheddate).format('YYYY-MM-DD') >= moment(this.dateInfo[b].dateflg).format('YYYY-MM-DD')) {
            if (this.dateInfo[b].type === '4') {
              this.relist.push({
                tdfo: this.dateInfo[b].dateflg,
              });
            }
          }
        }
        // }
      },
      rediffNoDays() {
        // if (moment(this.form.reoccurrencedate).format('YYYY-MM-DD') !== moment(this.form.refinisheddate).format('YYYY-MM-DD')) {
        var getDate = function(str) {
          var tempDate = new Date();
          var list = str.split('-');
          tempDate.setFullYear(list[0]);
          tempDate.setMonth(list[1] - 1);
          tempDate.setDate(list[2]);
          return tempDate;
        };
        if (this.form.reoccurrencedate != '' && this.form.refinisheddate != '') {
          var date1 = getDate(moment(this.form.reoccurrencedate).format('YYYY-MM-DD'));
          var date2 = getDate(moment(this.form.refinisheddate).format('YYYY-MM-DD'));
          if (date1 > date2) {
            var tempDate = date1;
            date1 = date2;
            date2 = tempDate;
          }
          date1.setDate(date1.getDate() + 1);
          var dateArr = [];
          var i = 0;
          this.Todaysum = [];
          if (moment(this.form.reoccurrencedate).format('YYYY-MM-DD') === moment(this.form.refinisheddate).format('YYYY-MM-DD')) {
            this.Todaysum.push(moment(this.form.reoccurrencedate).format('YYYY-MM-DD'));
          } else {
            while (!(date1.getFullYear() == date2.getFullYear()
              && date1.getMonth() == date2.getMonth() && date1.getDate() == date2
                .getDate())) {
              var dayStr = date1.getDate().toString();
              if (dayStr.length == 1) {
                dayStr = '0' + dayStr;
              }
              var monthStr = (date1.getMonth() + 1).toString();
              if (monthStr.length == 1) {
                monthStr = '0' + monthStr;
              }
              dateArr[i] = date1.getFullYear() + '-' + monthStr + '-'
                + dayStr;
              i++;
              date1.setDate(date1.getDate() + 1);
            }
            dateArr.splice(0, 0, moment(this.form.reoccurrencedate).format('YYYY-MM-DD'));
            dateArr.push(moment(this.form.refinisheddate).format('YYYY-MM-DD'));
            this.Todaysum = dateArr;
          }
        }
        //去掉工作日设定里面的节假日
        for (let a = 0; a < this.Todaysum.length; a++) {
          for (let b = 0; b < this.dateInfo.length; b++) {
            if (this.dateInfo[b].dateflg == this.Todaysum[a]) {
              this.Todaysum.splice(a, 1);
            }
          }
        }
        this.reList = this.Todaysum;
        //去除周六
        for (let i = 0; i < this.reList.length; i++) {
          var date = getDate(this.reList[i]);
          if (date.getDay() == 6) {
            this.reList.splice(i, 1);
          }
        }
        this.relistTwo = this.reList;
        //去除周末
        for (let j = 0; j < this.relistTwo.length; j++) {
          var data = getDate(this.relistTwo[j]);
          if (data.getDay() == 0) {
            this.relistTwo.splice(j, 1);
          }
        }
        //添加振替出勤日
        for (let b = 0; b < this.dateInfo.length; b++) {
          if (moment(this.form.reoccurrencedate).format('YYYY-MM-DD') <= moment(this.dateInfo[b].dateflg).format('YYYY-MM-DD') && moment(this.form.refinisheddate).format('YYYY-MM-DD') >= moment(this.dateInfo[b].dateflg).format('YYYY-MM-DD')) {
            if (this.dateInfo[b].type === '4') {
              this.relistTwo.push({
                tdfo: this.dateInfo[b].dateflg,
              });
            }
          }
        }
        // }
      },
      change() {
        if (!this.form.finisheddate || !this.form.occurrencedate) {
          return;
        }
        //加餐，哺乳（女）时，不清空，时间长度为1  add_fjl_06/16  start
        if (this.form.errortype === 'PR013022') {
          this.form.lengthtime = '1';
        } else {
          this.form.lengthtime = '0';
        }
        //加餐，哺乳（女）时，不清空，时间长度为1  add_fjl_06/16  end
        this.diffNoDays();
        let diffDate = moment(this.form.finisheddate).diff(moment(this.form.occurrencedate), 'days') + 1;
        //当天时间    （外出，家长会，妊娠检查，劳灾，其他福利）
        if (this.form.errortype === 'PR013001' || this.form.errortype === 'PR013014' || this.form.errortype === 'PR013016'
          || this.form.errortype === 'PR013018' || this.form.errortype === 'PR013019') {
          if (this.form.errortype === 'PR013001') {
            this.getWorktime();
          }
          this.form.finisheddate = this.form.occurrencedate;
        }
        //请假单位为8小时    （结婚，产休，男护理，丧假，计划生育，工伤，流产,育儿假,父母照料假） 包含公休日
        if (this.form.errortype === 'PR013011' || this.form.errortype === 'PR013012' || this.form.errortype === 'PR013013' || this.form.errortype === 'PR013015' ||
          this.form.errortype === 'PR013017' || this.form.errortype === 'PR013020' || this.form.errortype === 'PR013021' || this.form.errortype === 'PR013023' || this.form.errortype === 'PR013024') {
          if (diffDate > 0) {
            this.form.lengthtime = 8 * diffDate;
          }
          //获取check提醒
          if(this.form.errortype === 'PR013023' || this.form.errortype === 'PR013024'){
            this.$store
              .dispatch('PFANS2016Store/getParentmsg', this.form)
              .then(res => {
                this.form.parentmsg = res.parentmsg.replace(/\n/g,"<br/>");
              })
          }
          this.getAge();//计算孩子或父母年龄
        }
        //代休_周末，事休
        if (this.form.errortype === 'PR013006' || this.form.errortype === 'PR013008') {
          if (moment(this.form.finisheddate).format('YYYY-MM-DD') === moment(this.form.occurrencedate).format('YYYY-MM-DD')) {
            //当天取小时
            this.dislengthtime = false;
            this.form.finisheddate = this.form.occurrencedate;
          } else {
            //跨天取整天，8小时   不包含公休日
            this.dislengthtime = true;
            let time = 0;
            for (let d = 0; d < this.relist.length; d++) {
              time = time + 1;
            }
            this.form.lengthtime = time * 8;
            // this.form.lengthtime = 8 * diffDate;
          }
        }

        //病假
        if (this.form.errortype === 'PR013009') {
          if (diffDate === 1) {
            //当天取小时
            this.dislengthtime = false;
            this.form.finisheddate = this.form.occurrencedate;
          } else {
            //跨天取整天，8小时  包含公休日
            this.dislengthtime = true;
            this.form.lengthtime = 8 * diffDate;
          }
        }
        //年休，代休_特殊
        if (this.form.errortype === 'PR013005' || this.form.errortype === 'PR013007') {
          if (this.typecheck == '0') {
            let time = 0;
            //不包含公休日
            for (let d = 0; d < this.relist.length; d++) {
              time = time + 1;
            }
            this.form.lengthtime = time * 8;
          } else {
            this.form.finisheddate = this.form.occurrencedate;
            this.form.lengthtime = 4;
          }
        }
      },
      rechange() {
        if (!this.form.refinisheddate || !this.form.reoccurrencedate) {
          return;
        }
        this.rediffNoDays();
        let rediffDate = moment(this.form.refinisheddate).diff(moment(this.form.reoccurrencedate), 'days') + 1;
        // if (this.form.errortype != 'PR013001' && this.form.errortype != 'PR013014') {
        // if (this.form.errortype != 'PR013001') {
        // }
        //add-ws-01/15-禅道任务712
        //当天时间    （外出，家长会，妊娠检查，劳灾，其他福利）
        if (this.form.errortype === 'PR013001' || this.form.errortype === 'PR013014' || this.form.errortype === 'PR013016'
          || this.form.errortype === 'PR013018' || this.form.errortype === 'PR013019') {
          this.form.refinisheddate = this.form.reoccurrencedate;
        }
        //请假单位为8小时    （结婚，产休，男护理，丧假，计划生育，工伤，流产,育儿假，父母照料假） 包含公休日
        if (this.form.errortype === 'PR013011' || this.form.errortype === 'PR013012' || this.form.errortype === 'PR013013' || this.form.errortype === 'PR013015' ||
          this.form.errortype === 'PR013017' || this.form.errortype === 'PR013020' || this.form.errortype === 'PR013021' || this.form.errortype === 'PR013023' || this.form.errortype === 'PR013024') {
          if (rediffDate > 0) {
            this.form.relengthtime = 8 * rediffDate;
          }
          //获取check提醒
          if(this.form.errortype === 'PR013023' || this.form.errortype === 'PR013024'){
            this.$store
              .dispatch('PFANS2016Store/getParentmsg', this.form)
              .then(res => {
                this.form.parentmsg = res.parentmsg.replace(/\n/g,"<br/>");
              })
          }
          this.getAge();//计算孩子或父母年龄
        }
        //add-ws-01/15-禅道任务712
        if (this.form.errortype === 'PR013005' || this.form.errortype === 'PR013007') {
          if (this.retypecheck == '0') {
            let time = 0;
            //不包含公休日
            for (let d = 0; d < this.relistTwo.length; d++) {
              time = time + 1;
            }
            this.form.relengthtime = time * 8;
          } else if (this.retypecheck == '1') {
            this.form.refinisheddate = this.form.reoccurrencedate;
            this.form.relengthtime = 4;
          } else if (this.retypecheck == '2') {
            this.form.refinisheddate = this.form.reoccurrencedate;
            this.form.relengthtime = 0;
          }
        }
        if (this.form.errortype === 'PR013009') {
          if (rediffDate === 1) {
            //当天取小时
            this.checkrelengthtime = false;
            this.form.refinisheddate = this.form.reoccurrencedate;
          } else {
            //跨天取整天，8小时  包含公休日
            this.checkrelengthtime = true;
            this.form.relengthtime = 8 * rediffDate;
          }
        }
        if (this.form.errortype === 'PR013006' || this.form.errortype === 'PR013008') {
          if (moment(this.form.finisheddate).format('YYYY-MM-DD') === moment(this.form.occurrencedate).format('YYYY-MM-DD')) {
            //当天取小时
            this.dislengthtime = false;
            this.form.relengthtime = this.form.occurrencedate;
          } else {
            //跨天取整天，8小时   不包含公休日
            this.dislengthtime = true;
            this.form.relengthtime = this.reList.length * 8;
          }
        }
        if (this.retypecheck == '0') {
          let timere = 0;
          for (let d = 0; d < this.relistTwo.length; d++) {
            timere = timere + 1;
          }
          this.form.relengthtime = timere * 8;
        } else if (this.retypecheck == '1') {
          this.form.refinisheddate = this.form.reoccurrencedate;
          this.form.relengthtime = 4;
        } else if (this.retypecheck == '2') {
          this.form.refinisheddate = this.form.reoccurrencedate;
          this.form.relengthtime = 0;
        }
      },
      getUserids(val) {
        if (val === 'undefined') {
          if (this.appUserid != '') {
            val = this.appUserid;
          } else {
            this.userlist = '1';
            return;
          }
        }
        this.form.user_id = val;
        let rst = getOrgInfoByUserId(val);
        if (rst) {
          this.centerid = rst.centerNmae;
          this.groupid = rst.groupNmae;
          this.teamid = rst.teamNmae;
          this.form.centerid = rst.centerId;
          this.form.groupid = rst.groupId;
          this.form.teamid = rst.teamId;
        } else {
          this.centerid = '';
          this.groupid = '';
          this.teamid = '';
          this.form.centerid = '';
          this.form.teamid = '';
          this.form.groupid = '';
        }
        if (!this.form.user_id || this.form.user_id === '' || val === 'undefined') {
          this.erroruser = this.$t('normal.error_08') + this.$t('label.applicant');
        } else {
          this.erroruser = '';
        }

      },
      //add_fjl_05/26 --添加代休剩余
      getonRest(val) {
        this.form.restdiff = '';
        this.form.restdiff2 = '';
        this.restdiff3 = '';
        //add-ws-6/8-禅道035
        this.$store
          .dispatch('PFANS2016Store/getFpans2016List2', {'user_id': this.userlist})
          .then(response => {
            this.$store
              .dispatch('PFANS2016Store/getRestday', {'userid': this.userlist})
              .then(response => {
                this.optionRest = [];
                for (let i = 0; i < response.length; i++) {
                  var ro = {};
                  ro.typecode = response[i].codetype,
                    ro.sumday = response[i].sumDay,
                    this.optionRest.push(ro);
                }
                if (this.optionRest.length > 0) {
                  for (let i = 0; i < this.optionRest.length; i++) {
                    if (this.optionRest[i].typecode === val) {
                      if (this.optionRest[i].sumday !== null && this.optionRest[i].sumday !== '') {
                        this.form.restdiff = (Number(this.optionRest[i].sumday) * 8).toFixed(2);
                      }
                    }
                  }
                }
              })
              .catch(error => {
                this.$message.error({
                  message: error,
                  type: 'error',
                  duration: 5 * 1000,
                });
              });
            let restdiff2 = 0;
            let restdiff = 0;
            for (let a = 0; a < response.length; a++) {
              if (response[a].status === '2') {
                if (response[a].errortype === this.form.errortype) {
                  restdiff2 += Number(response[a].lengthtime);
                }
              }
              if (response[a].status === '5') {
                if (response[a].errortype === this.form.errortype) {
                  restdiff += Number(response[a].relengthtime);
                }
              }
            }
            this.form.restdiff2 = Number(restdiff + restdiff2).toFixed(2);
            this.restdiff3 = Number(restdiff + restdiff2);
          });
        //add-ws-6/8-禅道035
      },
      //add_fjl_05/26 --添加代休剩余
      getErrorType(val) {
        this.form.hospital = '';
        this.form.edate = '';
        // this.form.finisheddate = moment(new Date()).format('YYYY-MM-DD');
        // this.form.occurrencedate = moment(new Date()).format('YYYY-MM-DD');
        this.form.worktime = '';
        this.form.weddingdate = '';//结婚日
        this.form.dateofbirth = '';//子女出生日
        this.form.parentsdate = '';//父母出生日期
        this.form.suchconfinement = '';//父母住院开始日期
        this.form.validateParentsname = '';//住院父母名字
        this.typecheck = '';
        let dictionaryInfo = getDictionaryInfo(val);
        if (dictionaryInfo) {
          this.form.enclosureexplain = dictionaryInfo.value2;
        }
        this.form.errortype = val;
        if (val === 'PR013001') {
          this.checkerrortishi = false;
          this.checkrelengthtime = false;
          this.dislengthtime = false;
          this.form.finisheddate = this.form.occurrencedate;
          this.showVacation = false;
          this.form.lengthtime = '0';
          this.getWorktime();
          //add ccm 0720
          this.rules.enclosurecontent[0].required = false;
          //add ccm 0720
          //add ccm 0812 从考勤管理申请异常，选择休假类型时，休假时间，休假日期
          if (this.$route.params._lengthtime && this.$route.params._day) {
            this.form.lengthtime = this.$route.params._lengthtime;
            this.form.occurrencedate = this.$route.params._day;
            this.form.finisheddate = this.$route.params._day;
          }
          //add ccm 0812 从考勤管理申请异常，选择休假类型时，休假时间，休假日期
        } else if (val === 'PR013005') {
          this.form.vacationtype = '';
          this.checkerrortishi = false;
          this.checkrelengthtime = false;
          this.dislengthtime = false;
          this.showVacation = false;
          //add ccm 0720
          this.rules.enclosurecontent[0].required = false;
          //add ccm 0720
        } else if (val === 'PR013006') {
          this.form.lengthtime = '0';
          this.checkerrortishi = false;
          this.checkrelengthtime = false;
          this.dislengthtime = false;
          this.showVacation = false;
          this.getonRest(val);
          //add ccm 0720
          this.rules.enclosurecontent[0].required = false;
          //add ccm 0720
        } else if (val === 'PR013007') {
          this.form.vacationtype = '';
          this.checkerrortishi = false;
          this.checkrelengthtime = false;
          this.dislengthtime = false;
          this.showVacation = false;
          this.getonRest(val);
          //add ccm 0720
          this.rules.enclosurecontent[0].required = false;
          //add ccm 0720
        } else if (val === 'PR013008') {
          this.checkerrortishi = false;
          this.checkrelengthtime = false;
          this.dislengthtime = false;
          this.showVacation = false;
          this.form.finisheddate = this.form.occurrencedate;
          this.form.lengthtime = '0';
          //add ccm 0720
          this.rules.enclosurecontent[0].required = false;
          //add ccm 0720
          //add ccm 0812 从考勤管理申请异常，选择休假类型时，休假时间，休假日期
          if (this.$route.params._lengthtime && this.$route.params._day) {
            this.form.lengthtime = this.$route.params._lengthtime;
            this.form.occurrencedate = this.$route.params._day;
            this.form.finisheddate = this.$route.params._day;
          }
          //add ccm 0812 从考勤管理申请异常，选择休假类型时，休假时间，休假日期

        } else if (val === 'PR013009') {
          this.checkerrortishi = false;
          this.checkrelengthtime = false;
          this.dislengthtime = false;
          this.form.finisheddate = this.form.occurrencedate;
          this.form.lengthtime = '0';
          this.showVacation = true;
          //add ccm 0720
          this.rules.enclosurecontent[0].required = true;
          //add ccm 0720
          //add ccm 0812 从考勤管理申请异常，选择休假类型时，休假时间，休假日期
          if (this.$route.params._lengthtime && this.$route.params._day) {
            this.form.lengthtime = this.$route.params._lengthtime;
            this.form.occurrencedate = this.$route.params._day;
            this.form.finisheddate = this.$route.params._day;
          }
          //add ccm 0812 从考勤管理申请异常，选择休假类型时，休假时间，休假日期
        } else if (val === 'PR013011') {
          this.checkerrortishi = false;
          this.checkrelengthtime = true;
          this.dislengthtime = true;
          this.form.finisheddate = this.form.occurrencedate;
          this.form.lengthtime = 8;
          this.showVacation = true;
          //add ccm 0720
          this.rules.enclosurecontent[0].required = true;
          //add ccm 0720
          // this.clearValidate(['weddingdate']);
        } else if (val === 'PR013012') {
          this.checkerrortishi = true;
          this.checkrelengthtime = true;
          this.dislengthtime = true;
          this.form.finisheddate = this.form.occurrencedate;
          this.form.lengthtime = 8;
          this.showVacation = true;
          //add ccm 0720
          this.rules.enclosurecontent[0].required = true;
          //add ccm 0720
        } else if (val === 'PR013013') {
          this.checkerrortishi = false;
          this.checkrelengthtime = true;
          this.dislengthtime = true;
          this.form.finisheddate = this.form.occurrencedate;
          this.form.lengthtime = 8;
          this.showVacation = true;
          //add ccm 0720
          this.rules.enclosurecontent[0].required = true;
          //add ccm 0720
        } else if (val === 'PR013014') {
          this.checkerrortishi = false;
          this.checkrelengthtime = true;
          this.dislengthtime = false;
          this.showVacation = false;
          this.form.finisheddate = this.form.occurrencedate;
          this.form.lengthtime = '0';
          //add ccm 0720
          this.rules.enclosurecontent[0].required = false;
          //add ccm 0720
        } else if (val === 'PR013015') {
          this.checkerrortishi = false;
          this.checkrelengthtime = true;
          this.dislengthtime = true;
          this.form.finisheddate = this.form.occurrencedate;
          this.form.lengthtime = 8;
          this.showVacation = true;
          //add ccm 0720
          this.rules.enclosurecontent[0].required = true;
          //add ccm 0720
        } else if (val === 'PR013016') {
          this.checkerrortishi = false;
          this.checkrelengthtime = false;
          this.dislengthtime = false;
          this.form.finisheddate = this.form.occurrencedate;
          this.form.lengthtime = '0';
          this.showVacation = true;
          //add ccm 0720
          this.rules.enclosurecontent[0].required = true;
          //add ccm 0720
        } else if (val === 'PR013017') {
          this.checkerrortishi = false;
          this.checkrelengthtime = true;
          this.dislengthtime = true;
          this.form.finisheddate = this.form.occurrencedate;
          this.form.lengthtime = 8;
          this.showVacation = true;
          //add ccm 0720
          this.rules.enclosurecontent[0].required = true;
          //add ccm 0720
        } else if (val === 'PR013018' || val === 'PR013019') {
          this.checkerrortishi = false;
          this.checkrelengthtime = true;
          this.dislengthtime = false;
          this.form.finisheddate = this.form.occurrencedate;
          this.form.lengthtime = '0';
          this.showVacation = false;
          //add ccm 0720
          this.rules.enclosurecontent[0].required = false;
          //add ccm 0720
        } else if (val === 'PR013020') {
          this.checkerrortishi = false;
          this.checkrelengthtime = true;
          this.dislengthtime = true;
          this.form.finisheddate = this.form.occurrencedate;
          this.form.lengthtime = 8;
          this.showVacation = false;
          //add ccm 0720
          this.rules.enclosurecontent[0].required = true;
          //add ccm 0720
        } else if (val === 'PR013021') {
          this.checkerrortishi = false;
          this.checkrelengthtime = true;
          this.dislengthtime = true;
          this.form.finisheddate = this.form.occurrencedate;
          this.form.lengthtime = 8;
          this.showVacation = true;
          //add ccm 0720
          this.rules.enclosurecontent[0].required = true;
          //add ccm 0720
        } else if (val === 'PR013022') {
          this.checkerrortishi = false;
          this.checkrelengthtime = true;
          this.dislengthtime = true;
          this.form.lengthtime = '1';
          this.showVacation = true;
          //add ccm 0720
          this.rules.enclosurecontent[0].required = true;
          //add ccm 0720
        }
        //region scc add 21/1/6 育儿假 from
        else if (val === 'PR013023'){
          this.checkerrortishi = false;//产休（女）的对应提示
          this.checkrelengthtime = true;//实际时间长度组件
          this.dislengthtime = true;//时间长度显示组件
          this.form.finisheddate = this.form.occurrencedate;
          this.form.lengthtime = 8;//时间长度总计
          this.showVacation = true;//附件说明
          this.rules.enclosurecontent[0].required = true;//附件必填
          // this.clearValidate(['dateofbirth']);
        }
        //endregion scc add 21/1/6 育儿假 to
        //region scc add 21/1/6 父母照料假 from
        else if (val === 'PR013024'){
          this.checkerrortishi = false;//产休（女）的对应提示
          this.checkrelengthtime = true;//实际时间长度组件
          this.dislengthtime = true;//时间长度显示组件
          this.form.finisheddate = this.form.occurrencedate;
          this.form.lengthtime = 8;//时间长度总计
          this.showVacation = true;//附件说明
          this.rules.enclosurecontent[0].required = true;//附件必填
          // this.clearValidate(['parentsdate', 'suchconfinement']);
        }
        //endregion scc add 21/1/6 父母照料假 to
        if (this.form.errortype === 'PR013014') {
          if (2 - this.parent <= 0) {
            Message({
              message: this.$t('label.PFANS2016FORMVIEW_BJDJZHCHECK'),
              type: 'error',
              duration: 5 * 1000,
            });
            this.form.errortype = null;
            return;
          }
        }

        this.$refs.ruleForm.validateField('lengthtime');
        // this.changeTime();
      },
      workflowState(val) {
        if (val.state === '1') {
          if (val.workflowCode === 'W0003' || val.workflowCode === 'W0070' || val.workflowCode === 'W0085' || val.workflowCode === 'W0087') {
            this.form.status = '3';
          } else if (val.workflowCode === 'W0059' || val.workflowCode === 'W0071' || val.workflowCode === 'W0086' || val.workflowCode === 'W0088') {
            this.form.status = '6';
          }
        } else if (val.state === '2') {
          if (val.workflowCode === 'W0003' || val.workflowCode === 'W0070' || val.workflowCode === 'W0085' || val.workflowCode === 'W0087') {
            this.form.status = '4';
          } else if (val.workflowCode === 'W0059' || val.workflowCode === 'W0071' || val.workflowCode === 'W0086' || val.workflowCode === 'W0088') {
            this.form.status = '7';
            this.canStart = false;

            this.$store
              .dispatch('PFANS2016Store/updateOvertime', this.form)
              .then(response => {
                this.loading = false;
              })
              .catch(error => {
                this.$message.error({
                  message: error,
                  type: 'error',
                  duration: 5 * 1000,
                });
                this.loading = false;
              });
          }
        }
        this.buttonClick2();
      },
      //add-ws-5/20-审批流程添加
      start() {
        this.form.applicationdate = moment(new Date()).format('YYYY-MM-DD');

        if (this.form.status === '4' || this.form.status === '6') {
          this.form.status = '5';
          this.disableupload = true;
        } else {
          this.form.status = '2';
          this.disableupload = true;
        }
        this.buttonClick2();
      },
      //add-ws-5/20-审批流程添加
      end() {
        if (this.form.status === '5') {
          this.form.status = '4';
        } else {
          this.form.status = '0';
        }
        this.buttonClick2('end');
      },
      fileError(err, file, fileList) {
        Message({
          message: this.$t('normal.error_04'),
          type: 'error',
          duration: 5 * 1000,
        });
      },
      fileRemove(file, fileList) {
        this.fileList = [];
        this.form.uploadfile = '';
        for (var item of fileList) {
          let o = {};
          o.name = item.name;
          o.url = item.url;
          this.fileList.push(o);
          this.form.uploadfile += item.name + ',' + item.url + ';';
        }
      },
      fileDownload(file) {
        if (file.url) {
          file.url = file.url.replace('%', '%25');
          file.url = file.url.replace('#', '%23');
          file.url = file.url.replace('&', '%26');
          file.url = file.url.replace('+', '%2B');
          file.url = file.url.replace('=', '%3D');
          file.url = file.url.replace('?', '%3F');
          var url = downLoadUrl(file.url);
          window.open(url);
        }

      },
      fileSuccess(response, file, fileList) {
        if (response.data == 'upload_success') {
          this.fileList = [];
          this.form.uploadfile = '';
          for (var item of fileList) {
            let o = {};
            o.name = item.name;
            if (!item.url) {
              o.url = item.response.info;
            } else {
              o.url = item.url;
            }
            this.fileList.push(o);
            this.form.uploadfile += o.name + ',' + o.url + ';';
          }
        } else {
          Message({
            message: this.$t('label.PFANS2016FORMVIEW_FILEERROR'),
            type: 'error',
            duration: 5 * 1000,
          });
          this.form.uploadfile = '';
          this.$refs.upload.clearFiles();
        }
      },
      buttonClick(val) {
        if (val === 'back') {
          if (this.$route.params._day) {
            //add_fjl_0901  添加返回时的流程URL
            this.$store.commit('global/SET_WORKFLOWURL', '/PFANS2010View');
            //add_fjl_0901  添加返回时的流程URL
            this.$router.push({
              name: 'PFANS2010FormView',
              params: {
                _id: this.$route.params._user + ',' + this.$route.params._year + ',' + this.$route.params._month,
                disabled: false,
              },
            });
          } else {
            this.$router.push({
              name: 'PFANS2016View',
              params: {},
            });
          }
          return;
        }
        this.$refs['ruleForm'].validate(valid => {
            this.$store.commit('global/SET_HISTORYURL', 'PFANS2016View');
            if (valid) {

              //add_fjl 04/09
              let time = 0;
              let timere = 0;
              let diffDate = moment(this.form.finisheddate).diff(moment(this.form.occurrencedate), 'days') + 1;
              let rediffDate = moment(this.form.refinisheddate).diff(moment(this.form.reoccurrencedate), 'days') + 1;
              if (parseInt(this.form.status) >= 4) {
                this.rediffNoDays();
              } else {
                this.diffNoDays();
              }
              if (this.form.errortype === 'PR013007') {
                if (this.form.status) {
                  if (parseInt(this.form.status) < 4) {
                    if (this.form.restdiff < this.form.lengthtime) {
                      Message({
                        message: this.$t('normal.error_norestdays'),
                        type: 'error',
                        duration: 5 * 1000,
                      });
                      return;
                    }
                  } else if (this.form.status === '5' || this.form.status === '7') {
                    if (this.form.restdiff < this.form.relengthtime) {
                      Message({
                        message: this.$t('normal.error_norestdays'),
                        type: 'error',
                        duration: 5 * 1000,
                      });
                      return;
                    }
                  } else {
                    //add ccm 0928 客户提出的bug代休填写实际被check，
                    if (Number(this.form.restdiff) + Number(this.form.lengthtime) < this.form.relengthtime) {
                      Message({
                        message: this.$t('normal.error_norestdays'),
                        type: 'error',
                        duration: 5 * 1000,
                      });
                      return;
                    }
                    //add ccm 0928 客户提出的bug代休填写实际被check，
                  }
                } else {
                  if (this.form.restdiff < this.form.lengthtime) {
                    Message({
                      message: this.$t('normal.error_norestdays'),
                      type: 'error',
                      duration: 5 * 1000,
                    });
                    return;
                  }
                }
              }
              //产休假，流产假
              if (this.form.errortype === 'PR013011' || this.form.errortype === 'PR013012' || this.form.errortype === 'PR013013'
                || this.form.errortype === 'PR013015' || this.form.errortype === 'PR013017' || this.form.errortype === 'PR013020'
                || this.form.errortype === 'PR013021') {
                if ((this.form.errortype === 'PR013012' || this.form.errortype === 'PR013021') && this.$store.getters.userinfo.userinfo.sex !== 'PR019002') {
                  Message({
                    message: this.$t('label.PFANS2016FORMVIEW_WOMENCHECK'),
                    type: 'error',
                    duration: 5 * 1000,
                  });
                  return;
                }
                //男护理假
                if (this.form.errortype === 'PR013013' && this.$store.getters.userinfo.userinfo.sex !== 'PR019001') {
                  Message({
                    message: this.$t('label.PFANS2016FORMVIEW_MENCHECK'),
                    type: 'error',
                    duration: 5 * 1000,
                  });
                  return;
                }
                if (this.form.lengthtime > diffDate * 8) {
                  Message({
                    message: this.$t('label.PFANS2016FORMVIEW_ERROREFFECTIVE'),
                    type: 'error',
                    duration: 5 * 1000,
                  });
                  return;
                }
              }
              //外出，家长会，劳灾，其他福利，妊娠检查
              if (this.form.errortype === 'PR013001' || this.form.errortype === 'PR013014' || this.form.errortype === 'PR013016'
                || this.form.errortype === 'PR013018' || this.form.errortype === 'PR013019') {
                //家长会一个事业年度只能申请两次
                if (this.form.errortype === 'PR013014') {
                  // if (2 - this.parent < 0) {
                  //   Message({
                  //     message: this.$t('label.PFANS2016FORMVIEW_BJDJZHCHECK'),
                  //     type: 'error',
                  //     duration: 5 * 1000,
                  //   });
                  //   return;
                  // }
                  //每次家长会假不能超过四小时
                  if (this.form.lengthtime > 4 || this.form.relengthtime > 4) {
                    Message({
                      message: this.$t('label.PFANS2016FORMVIEW_BJDJZCHECK'),
                      type: 'error',
                      duration: 5 * 1000,
                    });
                    return;
                  }
                } else if (this.form.errortype === 'PR013016' && this.$store.getters.userinfo.userinfo.sex !== 'PR019002') {
                  Message({
                    message: this.$t('label.PFANS2016FORMVIEW_WOMENCHECK'),
                    type: 'error',
                    duration: 5 * 1000,
                  });
                  return;
                }
                if (parseInt(this.form.status) >= 4) {
                  for (let d = 0; d < this.relistTwo.length; d++) {
                    timere = timere + 1;
                  }
                  if (timere === 0) {
                    Message({
                      message: this.$t('label.PFANS2016FORMVIEW_SHORTCHECK'),
                      type: 'error',
                      duration: 5 * 1000,
                    });
                    return;
                  }
                  if (this.form.relengthtime > 8) {
                    Message({
                      message: this.$t('label.PFANS2016FORMVIEW_WAICHUTIMENOCHECK'),
                      type: 'error',
                      duration: 5 * 1000,
                    });
                    return;
                  }
                } else {
                  for (let d = 0; d < this.relist.length; d++) {
                    time = time + 1;
                  }
                  if (time === 0) {
                    Message({
                      message: this.$t('label.PFANS2016FORMVIEW_SHORTCHECK'),
                      type: 'error',
                      duration: 5 * 1000,
                    });
                    return;
                  }
                  if (this.form.lengthtime > 8) {
                    Message({
                      message: this.$t('label.PFANS2016FORMVIEW_WAICHUTIMENOCHECK'),
                      type: 'error',
                      duration: 5 * 1000,
                    });
                    return;
                  }
                }
              }
              //代休_特殊
              if (this.form.errortype === 'PR013007') {
                if (parseInt(this.form.status) >= 4) {
                  for (let d = 0; d < this.relistTwo.length; d++) {
                    timere = timere + 1;
                  }
                  if (timere === 0) {
                    Message({
                      message: this.$t('label.PFANS2016FORMVIEW_SHORTCHECK'),
                      type: 'error',
                      duration: 5 * 1000,
                    });
                    return;
                  } else {
                    if (this.retypecheck === '0') {
                      this.form.relengthtime = timere * 8;
                    } else if (this.retypecheck === '1') {
                      this.form.relengthtime = 4;
                    } else if (this.retypecheck === '2') {
                      this.form.relengthtime = 0;
                    }
                  }
                } else {
                  for (let d = 0; d < this.relist.length; d++) {
                    time = time + 1;
                  }
                  if (time === 0) {
                    Message({
                      message: this.$t('label.PFANS2016FORMVIEW_SHORTCHECK'),
                      type: 'error',
                      duration: 5 * 1000,
                    });
                    return;
                  } else {
                    if (this.typecheck === '0') {
                      this.form.lengthtime = time * 8;
                    } else {
                      this.form.lengthtime = 4;
                    }
                  }
                }
              }
              //年休
              if (this.form.errortype === 'PR013005') {
                let enddateflg = moment(this.$store.getters.userinfo.userinfo.enddate).format('YYYY-MM-DD');
                //判断申请人是否在试用期
                if (enddateflg >= moment(new Date()).format('YYYY-MM-DD')) {
                  Message({
                    message: this.$t('label.PFANS2016FORMVIEW_ERRORANNUALLEAVEU'),
                    type: 'error',
                    duration: 5 * 1000,
                  });
                  return;
                }
                //根据工龄,check申请病假超过2/3/4月，则不能申请年休
                var workdayflg = moment(this.$store.getters.userinfo.userinfo.workday);
                var year = workdayflg.get('y');
                var mon = workdayflg.get('M') + 1;
                var day = workdayflg.get('d');
                //当前年度
                var date = new Date();
                var nowyear = date.getFullYear();

                var a = moment([year, mon, day]);
                var b = moment([nowyear, 4, 1]);
                var diffY = b.diff(a, 'years', true); // 取两位小数
                if (1 <= diffY < 10) {             //十年工龄，病假超过两个月check
                  if (this.sickleave > 60) {
                    Message({
                      message: this.$t('label.PFANS2016FORMVIEW_SHORTCHECKFLG'),
                      type: 'error',
                      duration: 5 * 1000,
                    });
                    return;
                  }
                } else if (10 <= diffY < 20) {        //十年到二十年工龄，病假超过三个月check
                  if (this.sickleave > 90) {
                    Message({
                      message: this.$t('label.PFANS2016FORMVIEW_SHORTCHECKFLG2'),
                      type: 'error',
                      duration: 5 * 1000,
                    });
                    return;
                  }
                } else if (20 <= diffY) {           //二十年年工龄以上，病假超过四个月check
                  if (this.sickleave > 120) {
                    Message({
                      message: this.$t('label.PFANS2016FORMVIEW_SHORTCHECKFLG3'),
                      type: 'error',
                      duration: 5 * 1000,
                    });
                    return;
                  }
                }
                if (parseInt(this.form.status) >= 4) {
                  // if(moment(this.form.refinisheddate).format("YYYY-MM-DD") === moment(this.form.reoccurrencedate).format("YYYY-MM-DD")){
                  //     if (this.retypecheck === '0') {
                  //         this.form.relengthtime =  8;
                  //         timere =  8;
                  //     } else {
                  //         this.form.relengthtime = 4;
                  //         timere = 4;
                  //     }
                  // } else {
                  for (let d = 0; d < this.relistTwo.length; d++) {
                    timere = timere + 1;
                  }
                  if (timere === 0) {
                    Message({
                      message: this.$t('label.PFANS2016FORMVIEW_SHORTCHECK'),
                      type: 'error',
                      duration: 5 * 1000,
                    });
                    return;
                  } else {
                    if (this.retypecheck === '0') {
                      this.form.relengthtime = timere * 8;
                    } else if (this.retypecheck === '1') {
                      this.form.relengthtime = 4;
                      timere = 0.5;
                    } else if (this.retypecheck === '2') {
                      this.form.relengthtime = 0;
                      timere = 0;
                    }
                    // }
                  }
                  if (this.checkDate < timere) {
                    Message({
                      message: this.$t('label.PFANS2016FORMVIEW_ERRORANNUALLEAVE'),
                      type: 'error',
                      duration: 5 * 1000,
                    });
                    return;
                  }
                } else {
                  // if(moment(this.form.finisheddate).format("YYYY-MM-DD") === moment(this.form.occurrencedate).format("YYYY-MM-DD")){
                  //     if (this.typecheck === '0') {
                  //         this.form.lengthtime =  8;
                  //         time =  8;
                  //     } else {
                  //         this.form.lengthtime = 4;
                  //         time = 4;
                  //     }
                  // } else {
                  for (let d = 0; d < this.relist.length; d++) {
                    time = time + 1;
                  }
                  if (time === 0) {
                    Message({
                      message: this.$t('label.PFANS2016FORMVIEW_SHORTCHECK'),
                      type: 'error',
                      duration: 5 * 1000,
                    });
                    return;
                  } else {
                    if (this.typecheck === '0') {
                      this.form.lengthtime = time * 8;
                    } else {
                      this.form.lengthtime = 4;
                      time = 0.5;
                    }
                  }
                  // }
                  if (this.checkDate < time) {
                    Message({
                      message: this.$t('label.PFANS2016FORMVIEW_ERRORANNUALLEAVE'),
                      type: 'error',
                      duration: 5 * 1000,
                    });
                    return;
                  }
                }
              }
              //代休_周末，事休
              if (this.form.errortype === 'PR013006' || this.form.errortype === 'PR013008') {
                // let sum = 0;
                // if (moment(this.form.finisheddate).format('YYYY-MM-DD') === moment(this.form.occurrencedate).format('YYYY-MM-DD')) {
                //   if (this.form.lengthtime > 8) {
                //     Message({
                //       message: this.$t('label.PFANS2016FORMVIEW_WAICHUTIMENOCHECK'),
                //       type: 'error',
                //       duration: 5 * 1000,
                //     });
                //     return;
                //   }
                // } else {
                if (parseInt(this.form.status) >= 4) {
                  for (let i = 0; i < this.relistTwo.length; i++) {
                    timere = timere + 1;
                  }
                  if (timere === 0) {
                    Message({
                      message: this.$t('label.PFANS2016FORMVIEW_SHORTCHECK'),
                      type: 'error',
                      duration: 5 * 1000,
                    });
                    return;
                  } else {
                    if (timere === 1) {
                      if (this.form.relengthtime > 8) {
                        Message({
                          message: this.$t('label.PFANS2016FORMVIEW_WAICHUTIMENOCHECK'),
                          type: 'error',
                          duration: 5 * 1000,
                        });
                        return;
                      }
                    } else {
                      if (this.form.relengthtime > timere * 8) {
                        Message({
                          message: this.$t('label.PFANS2016FORMVIEW_ERROREFFECTIVE'),
                          type: 'error',
                          duration: 5 * 1000,
                        });
                        return;
                      }
                    }
                  }
                } else {
                  for (let i = 0; i < this.relist.length; i++) {
                    time = time + 1;
                  }
                  if (time === 0) {
                    Message({
                      message: this.$t('label.PFANS2016FORMVIEW_SHORTCHECK'),
                      type: 'error',
                      duration: 5 * 1000,
                    });
                    return;
                  } else {
                    if (time === 1) {
                      if (this.form.lengthtime > 8) {
                        Message({
                          message: this.$t('label.PFANS2016FORMVIEW_WAICHUTIMENOCHECK'),
                          type: 'error',
                          duration: 5 * 1000,
                        });
                        return;
                      }
                    } else {
                      if (this.form.lengthtime > time * 8) {
                        Message({
                          message: this.$t('label.PFANS2016FORMVIEW_ERROREFFECTIVE'),
                          type: 'error',
                          duration: 5 * 1000,
                        });
                        return;
                      }
                    }
                  }
                }
                // }
              }
              //病休
              if (this.form.errortype === 'PR013009') {
                if (parseInt(this.form.status) >= 4) {
                  if (rediffDate === 1) {
                    if (this.form.relengthtime > 8) {
                      Message({
                        message: this.$t('label.PFANS2016FORMVIEW_WAICHUTIMENOCHECK'),
                        type: 'error',
                        duration: 5 * 1000,
                      });
                      return;
                    }
                    // } else {
                    //   if (rediffDate > 30 - this.sickleave || (this.form.relengthtime / 8) > 30 - this.sickleave) {
                    //     Message({
                    //       message: this.$t('label.PFANS2016FORMVIEW_SHORTCHECK'),
                    //       type: 'error',
                    //       duration: 5 * 1000,
                    //     });
                    //     return;
                    //   }
                  }
                } else {
                  if (diffDate === 1) {
                    if (this.form.lengthtime > 8) {
                      Message({
                        message: this.$t('label.PFANS2016FORMVIEW_WAICHUTIMENOCHECK'),
                        type: 'error',
                        duration: 5 * 1000,
                      });
                      return;
                    }
                    // } else {
                    //   if (diffDate > 30 - this.sickleave || (this.form.lengthtime / 8) > 30 - this.sickleave) {
                    //     Message({
                    //       message: this.$t('label.PFANS2016FORMVIEW_SHORTCHECK'),
                    //       type: 'error',
                    //       duration: 5 * 1000,
                    //     });
                    //     return;
                    //   }
                  }
                }
              }
              //加餐、哺乳（女）
              if (this.form.errortype === 'PR013022' && this.$store.getters.userinfo.userinfo.sex !== 'PR019002') {
                Message({
                  message: this.$t('label.PFANS2016FORMVIEW_WOMENCHECK'),
                  type: 'error',
                  duration: 5 * 1000,
                });
                return;
                this.form.lengthtime = 1;
              }
              //金额不能为0的check
              if ((this.form.errortype != 'PR013005' && this.form.errortype != 'PR013007') && this.form.status != '4' &&
                this.form.status != '5' && this.form.status != '6' && this.form.status != '7' && this.form.status != '8' && this.form.lengthtime <= 0) {
                Message({
                  message: this.$t('label.PFANS2016FORMVIEW_TIMECHECK'),
                  type: 'error',
                  duration: 5 * 1000,
                });
                return;
              }

              //add-ws-6/8-禅道035
              if (this.form.errortype === 'PR013007') {
                if (this.form.restdiff === '') {
                  this.form.restdiff = 0;
                }
                if (this.restdiff3 === '') {
                  this.restdiff3 = 0;
                }
                if (this.form.status) {
                  if (parseInt(this.form.status) < 4) {
                    if (this.form.restdiff - Number(this.restdiff3 + this.form.lengthtime - this.checklength3).toFixed(2) < 0) {
                      Message({
                        message: this.$t('label.PFANS2016FORMVIEW_CHECKRESTDIFF2'),
                        type: 'error',
                        duration: 5 * 1000,
                      });
                      return;
                    }
                  } else {
                    if (this.form.restdiff - Number(this.restdiff3 + this.form.relengthtime - this.checklength3).toFixed(2) < 0) {
                      Message({
                        message: this.$t('label.PFANS2016FORMVIEW_CHECKRESTDIFF2'),
                        type: 'error',
                        duration: 5 * 1000,
                      });
                      return;
                    }
                  }
                } else {
                  if (this.form.restdiff - Number(this.restdiff3 + this.form.lengthtime - this.checklength3).toFixed(2) < 0) {
                    Message({
                      message: this.$t('label.PFANS2016FORMVIEW_CHECKRESTDIFF2'),
                      type: 'error',
                      duration: 5 * 1000,
                    });
                    return;
                  }
                }
              } else if (this.form.errortype === 'PR013006') {
                if (this.form.restdiff === '') {
                  this.form.restdiff = 0;
                }
                if (this.form.restdiff2 === '') {
                  this.form.restdiff2 = 0;
                }
                if (this.form.status) {
                  if (parseInt(this.form.status) < 4) {
                    if (this.form.restdiff - Number(this.form.restdiff2 + this.form.lengthtime - this.checklength3) < 0) {
                      Message({
                        message: this.$t('label.PFANS2016FORMVIEW_CHECKRESTDIFF2'),
                        type: 'error',
                        duration: 5 * 1000,
                      });
                      return;
                    }
                  } else {
                    if (this.form.restdiff - Number(this.form.restdiff2 + this.form.relengthtime - this.checklength3) < 0) {
                      Message({
                        message: this.$t('label.PFANS2016FORMVIEW_CHECKRESTDIFF2'),
                        type: 'error',
                        duration: 5 * 1000,
                      });
                      return;
                    }
                  }
                } else {
                  if (this.form.restdiff - Number(this.form.restdiff2 + this.form.lengthtime - this.checklength3) < 0) {
                    Message({
                      message: this.$t('label.PFANS2016FORMVIEW_CHECKRESTDIFF2'),
                      type: 'error',
                      duration: 5 * 1000,
                    });
                    return;
                  }
                }
              }

              //add ccm 0806 请事假超过4小时保存时，check是否有年休，有年休，不允许保存事假，
              if (this.form.errortype === 'PR013008' && this.form.lengthtime >= 4) {
                let userInfo = getUserInfo(this.form.user_id);
                if (userInfo) {
                  if (this.remaningAnnual.length > 0) {
                    //有剩余年休
                    if (Number(this.remaningAnnual[0].remaining_annual_leave_thisyear) - Number(this.remaningAnnual[0].annual_leave_shenqingzhong) > 0) {
                      //试用期截止日
                      let enddateflg = moment(userInfo.userinfo.enddate).format('YYYY-MM-DD');
                      //判断申请人是否在试用期
                      if (enddateflg < moment(new Date()).format('YYYY-MM-DD')) {
                        if (userInfo.userinfo.resignation_date) {
                          //离职日
                          let resignationdate = moment(userInfo.userinfo.resignation_date).format('YYYY-MM-DD');
                          if (Number(this.remaningAnnual[0].annual_avg_remaining) > 0) {
                            Message({
                              message: this.$t('label.PFANS2016FORMVIEW_REMANINGRESIGNATIONCHECK'),
                              type: 'error',
                              duration: 5 * 1000,
                            });
                            return;
                          }
                        } else {
                          Message({
                            message: this.$t('label.PFANS2016FORMVIEW_REMANINGCHECK'),
                            type: 'error',
                            duration: 5 * 1000,
                          });
                          return;
                        }
                      }
                    }
                  }
                }
              }
              //add ccm 0806 请事假保存时，check是否有年休，有年休，不允许保存事假，

              //region scc add 育儿假超过规定天数予以提示 from
              if (this.form.errortype === 'PR013023') {
                if (Number(this.cumulative) >= 10) {
                  this.$confirm("您近一年内休假育儿假已经超过10天（上限），请确认是否提出?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                    center: true
                  })
                    .then(() => {
                      this.updint(val);
                    }).catch(() => {
                    this.$message.info({
                      type: "info",
                      message: this.$t('normal.confirm_tipis')
                    })
                    return;
                  })
                }
                //判断申请时长或实际申请时长是否大于1天
                else if ((this.form.relengthtime ? Number(this.form.relengthtime / 8) : Number(this.form.lengthtime / 8)) > 1) {
                  this.$confirm("每个月可申请1天，您已经超出当月可申请天数限制，请明记理由,确认是否提出?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                    center: true
                  }).then(() => {
                    this.updint(val);
                  }).catch(() => {
                    this.$message.info({
                      type: "info",
                      message: this.$t('normal.confirm_tipis')
                    })
                    return;
                  })
                }else{
                  this.updint(val);
                }
              }
              //region scc add 育儿假超过规定天数予以提示 to

              //    add_fjl_06/16  -- 添加异常申请每天累计不超过8小时check  start
              //               this.loading = true;
              //               this.$store
              //                 .dispatch('PFANS2016Store/getLeaveNumber', this.form)
              //                 .then(response => {
              //                   this.leaveNum = response;
              //                   this.loading = false;
              //                   if (parseInt(this.form.status) >= 4) {
              //                     let reletime = 0;
              //                     let retimess = 0;
              //                     if (this.form.errortype === 'PR013001' || this.form.errortype === 'PR013005' || this.form.errortype === 'PR013006'
              //                       || this.form.errortype === 'PR013007' || this.form.errortype === 'PR013016' || this.form.errortype === 'PR013018'
              //                       || this.form.errortype === 'PR013019' || this.form.errortype === 'PR013014') {
              //                       for (let i = 0; i < this.relistTwo.length; i++) {
              //                         retimess = retimess + 1;
              //                       }
              //                       if (retimess === 0) {
              //                         Message({
              //                           message: this.$t('label.PFANS2016FORMVIEW_SHORTCHECK'),
              //                           type: 'error',
              //                           duration: 5 * 1000,
              //                         });
              //                         return;
              //                       } else {
              //                         reletime = retimess;
              //                       }
              //                     } else {
              //                       reletime = rediffDate;
              //                     }
              //                     if (rediffDate * 8 - Number(this.leaveNum) + Number(this.form.relengthtime) < 0) {
              //                       Message({
              //                         message: this.$t('异常申请每天累计不超过8小时'),
              //                         type: 'error',
              //                         duration: 5 * 1000,
              //                       });
              //                       return;
              //                     } else {
              //                       this.updint(val);
              //                     }
              //                   } else {
              //                     let letime = 0;
              //                     let timess = 0;
              //                     if (this.form.errortype === 'PR013001' || this.form.errortype === 'PR013005' || this.form.errortype === 'PR013006'
              //                       || this.form.errortype === 'PR013007' || this.form.errortype === 'PR013016' || this.form.errortype === 'PR013018'
              //                       || this.form.errortype === 'PR013019' || this.form.errortype === 'PR013014') {
              //                       for (let i = 0; i < this.relist.length; i++) {
              //                         timess = timess + 1;
              //                       }
              //                       if (timess === 0) {
              //                         Message({
              //                           message: this.$t('label.PFANS2016FORMVIEW_SHORTCHECK'),
              //                           type: 'error',
              //                           duration: 5 * 1000,
              //                         });
              //                         return;
              //                       } else {
              //                         letime = timess;
              //                       }
              //                     } else {
              //                       letime = diffDate;
              //                     }
              //                     if (letime * 8 - Number(this.leaveNum) + Number(this.form.lengthtime) < 0) {
              //                       Message({
              //                         message: this.$t('异常申请每天累计不超过8小时'),
              //                         type: 'error',
              //                         duration: 5 * 1000,
              //                       });
              //                       return;
              //                     } else {
              //育儿假的保存需要手动确认
              if(this.form.errortype !== 'PR013023'){
                this.updint(val);
              }
              //     }
              //   }
              // })
              // .catch(error => {
              //   this.$message.error({
              //     message: error,
              //     type: 'error',
              //     duration: 5 * 1000,
              //   });
              //   this.loading = false;
              // });
              //    add_fjl_06/16  -- 添加异常申请每天累计不超过8小时check  end
            } else {
              Message({
                message: this.$t('normal.error_12'),
                type: 'error',
                duration: 5 * 1000,
              });
            }
          },
        );
      },
      updint(val) {
        //add-ws-6/8-禅道035
        if (this.$route.params._id) {
          //总经理审批自动通过
          // if (getCurrentRole() === '1' && this.form.status === '4' && this.form.user_id === '5e78fefff1560b363cdd6db7') {//失效
          //  if (getCurrentRole() === '1' && this.form.status === '4' && this.roles === '1') {//变更
          //   this.form.status = '7';
          // }
          this.form.abnormalid = this.$route.params._id;
          this.loading = true;
          this.$store
            .dispatch('PFANS2016Store/updatePfans2016', this.form)
            .then(response => {
              this.loading = false;
              this.data = response;
              Message({
                message: this.$t('normal.success_02'),
                type: 'success',
                duration: 5 * 1000,
              });
              if (val !== 'save' && val !== 'StartWorkflow') {
                if (this.$store.getters.historyUrl) {
                  this.$router.push(this.$store.getters.historyUrl);
                }
              }

              if (val === 'StartWorkflow') {
                this.disable = false;
                this.dislengthtime = true;
                this.checkrelengthtime = true;
                this.disrevacationtype = true;
                this.$refs.container.$refs.workflow.startWorkflow();
              }
            })
            .catch(error => {
              this.$message.error({
                message: error,
                type: 'error',
                duration: 5 * 1000,
              });
              this.loading = false;
            });
        } else {
          //总经理审批自动通过
          // if (getCurrentRole() === '1') {
          //   this.form.status = '4';
          // }
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
              this.$message.error({
                message: error,
                type: 'error',
                duration: 5 * 1000,
              });
              this.loading = false;
            });
        }
      },

      buttonClick2(val) {
        //总经理审批自动通过
        // if (getCurrentRole() === '1' && this.form.user_id === '5e78fefff1560b363cdd6db7') {//失效
        //if (getCurrentRole() === '1' && this.roles === '1' ) {//变更
        //   this.form.status = '7';
        // }
        this.$store.commit('global/SET_HISTORYURL', 'PFANS2016View');
        this.form.abnormalid = this.$route.params._id;
        this.loading = true;
        this.$store
          .dispatch('PFANS2016Store/updatePfans2016', this.form)
          .then(response => {
            this.loading = false;
            this.data = response;
            if (val === 'end') {
              if (this.$store.getters.historyUrl) {
                this.$router.push(this.$store.getters.historyUrl);
              }
            }
          })
          .catch(error => {
            this.$message.error({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
            this.loading = false;
          });
      },
      //子女和出生日期，用于获取check信息请求
      changeBirth(val) {
        this.getAge();//计算孩子年龄
        //根据时间输入，取后台取check信息返回页面 from
        this.$store
          .dispatch('PFANS2016Store/getParentmsg', this.form)
          .then(res => {
            this.form.parentmsg = res.parentmsg.replace(/\n/g,"<br/>");//系统提示
            this.cumulative = res.cumulative;//年累计申请
          })
      },
      changeParent(val) {
        this.getAge();//计算父母年龄
        //根据时间输入，取后台取check信息返回页面 from
        this.$store
          .dispatch('PFANS2016Store/getParentmsg', this.form)
          .then(res => {
            this.form.parentmsg = res.parentmsg.replace(/\n/g,"<br/>");
            this.cumulative = res.cumulative;//年累计申请
          })
      },
      //获取孩子或父母的年龄
      getAge(){
        //育儿假获取孩子年龄,天数不为0就涨一个月,向上取月
        if(this.form.errortype === 'PR013023'){
          if(this.form.occurrencedate && !this.form.reoccurrencedate){//开始
            //获取孩子年龄,开始时间减出生日期
            let duration = moment.duration(moment(this.form.occurrencedate).diff(moment(this.form.dateofbirth)))
            let years = duration._data.years;
            let month = duration._data.months;
            let days = duration._data.days;
            if(days > 0){
              month = month + 1;
            }
            if((years === 0 && month === 0 && days === 0) || years < 0 || month < 0 || days < 0){
              this.childrenage = "0";
            }else{
              this.childrenage = (years === 0 ? '' : years + "年")  + (month === 0 ? '' : month + "个月")
            }
          }else{//实际开始
            //获取孩子年龄,开始时间减出生日期
            let duration = moment.duration(moment(this.form.reoccurrencedate).diff(moment(this.form.dateofbirth)))
            let years = duration._data.years;
            let month = duration._data.months;
            let days = duration._data.days;
            if(days > 0){
              month = month + 1;
            }
            if((years === 0 && month === 0 && days === 0) || years < 0 || month < 0 || days < 0){
              this.childrenage = "0";
            }else{
              this.childrenage = (years === 0 ? '' : years + "年" )+ (month === 0 ? '' : month + "个月")
            }
          }
        }
        //父母照料假获取父母年龄,天数不为0就舍弃天数,向下取月
        else if(this.form.errortype === 'PR013024'){
          if(this.form.occurrencedate && !this.form.reoccurrencedate){//开始
            //获取父母年龄,开始时间减父母出生日期
            let duration = moment.duration(moment(this.form.occurrencedate).diff(moment(this.form.parentsdate)))
            let years = duration._data.years;
            let month = duration._data.months;
            let days = duration._data.days;
            if((years === 0 && month === 0 && days === 0) || years < 0 || month < 0 || days < 0){
              this.parentsage = "0";
            }else{
              this.parentsage = (years === 0 ? '' : years + "年") + (month === 0 ? '' : month + "个月")
            }
          }else{//实际开始
            //获取父母年龄,开始时间减父母出生日期
            let duration = moment.duration(moment(this.form.reoccurrencedate).diff(moment(this.form.parentsdate)))
            let poor = moment(moment(this.form.reoccurrencedate).format("YYYY-MM")).diff(moment(moment(this.form.parentsdate).format("YYYY-MM")), 'months');
            let years = duration._data.years;
            let month = duration._data.months;
            let days = duration._data.days;
            if((years === 0 && month === 0 && days === 0) || years < 0 || month < 0 || days < 0){
              this.parentsage = "0";
            }else{
              this.parentsage = (years === 0 ? '' : years + "年") + (month === 0 ? '' : month + "个月")
            }
          }
        }
      },
      //考勤异常申请显示履历
      handleView(){
        this.url = '';
        this.urlparams = {};
        this.url = 'PFANS2013FormView';
        if(!this.form.occurrencedate){
          this.$message.info({
            type: 'info',
            message: this.$t('normal.error_09') + this.$t('label.startdate'),
          })
          return;
        }else{
          if(this.form.reoccurrencedate){
            this.urlparams = {'_userid': this.form.user_id, '_date':moment(this.form.reoccurrencedate).format('YYYY-MM-DD'), '_errortype': this.form.errortype, '_view':'2016FormView'};
          }else{
            this.urlparams = {'_userid': this.form.user_id, '_date':moment(this.form.occurrencedate).format('YYYY-MM-DD'), '_errortype': this.form.errortype, '_view':'2016FormView'};
          }
        }
        this.$refs.PFANS2033Pop.open = true;
      }
    },
  };
</script>


<style lang="scss" rel="stylesheet/scss">

</style>
