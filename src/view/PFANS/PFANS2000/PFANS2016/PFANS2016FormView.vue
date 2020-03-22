<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :title="title" @buttonClick="buttonClick" @end="end"
                         :canStart="canStart"
                         @start="start" @workflowState="workflowState" ref="container" v-loading="loading"
                         :workflowCode="workflowCode">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="ruleForm"
                 style="padding: 2vw">
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.center')" prop="centerid">
                <el-input :disabled="true" style="width:20vw" v-model="form.centerid"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')" prop="groupid">
                <el-input :disabled="true" style="width:20vw" v-model="form.groupid"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')" prop="teamid">
                <el-input :disabled="true" style="width:20vw" v-model="form.teamid"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.applicant')" prop="user_id">
                <user :disabled="!disable" :error="error" :selectType="selectType" :userlist="userlist"
                      @getUserids="getUserids" style="width: 20vw"></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.application_date')" prop="applicationdate">
                <el-date-picker :disabled="!disable" style="width:20vw" type="date"
                                v-model="form.applicationdate"></el-date-picker>
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
            <el-col :span="8"
                    v-show="form.errortype != 'PR013005' && form.errortype != 'PR013006'&& form.errortype != 'PR013007'">
              <el-form-item :label="$t('label.PFANS2016FORMVIEW_LENGTHTIME')" label-width="9rem" prop="lengthtime">
                <el-input-number
                  :disabled="false"
                  :max="1000000000"
                  :min="0"
                  :precision="2"
                  controls-position="right"
                  style="width:20vw"
                  @change="getTime"
                  v-model="form.lengthtime"
                ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8"
                    v-show="form.errortype != 'PR013001' && form.errortype != 'PR013005' && form.errortype != 'PR013006'&& form.errortype != 'PR013007'">
              <el-form-item :label="$t('label.PFANS2016FORMVIEW_RELENGTHTIME')" label-width="9rem" prop="relengthtime">
                <el-input :disabled="true"
                          style="width:20vw" v-model="form.relengthtime"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8"
                    v-show="(form.errortype == 'PR013005' || form.errortype == 'PR013006'|| form.errortype == 'PR013007') && form.status != '4' && form.status != '5' && form.status != '6' && form.status != '7'&& form.status != '8'">
              <el-form-item :label="$t('label.PFANS2016FORMVIEW_XJTYPE')" label-width="9rem" prop="lengthtime">
                <el-select v-model="form.lengthtime"
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
                    v-show="(form.errortype == 'PR013005' || form.errortype == 'PR013006'|| form.errortype == 'PR013007') && (form.status === '4' || form.status === '5' || form.status === '6' || form.status === '7')">
              <el-form-item :label="$t('label.PFANS2016FORMVIEW_RELENGTHTIME')" label-width="9rem" prop="relengthtime">
                <el-select @change="handleclick" v-model="form.relengthtime"
                           :disabled="form.status === '5' || form.status === '7'">
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
          </el-row>
          <el-row>
            <el-col :span="8"
                    v-if="form.status != '4' && form.status != '5' && form.status != '6' && form.status != '7'">
              <el-form-item :label="$t('label.startdate')" prop="occurrencedate">
                <el-date-picker :disabled="!disable" @change="change"
                                style="width:20vw" type="date" v-model="form.occurrencedate"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8"
                    v-if="form.errortype != 'PR013001'&&form.errortype != 'PR013005'&&form.errortype != 'PR013006'&&form.errortype != 'PR013007'">
              <el-form-item :error="errorstarttime" :label="$t('label.start')" prop="periodstart">
                <el-time-picker
                  :disabled="!disable"
                  @change="change"
                  format='HH:mm'
                  style="width:20vw"
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
          <el-row >
            <el-col :span="8"
                    v-if="this.typecheck!='1'&&this.typecheck!='2'&&form.status != '4' && form.status != '5' && form.status != '6' && form.status != '7' ">
              <el-form-item :label="$t('label.enddate')" prop="finisheddate">
                <el-date-picker :disabled="!disable" @change="change"
                                style="width:20vw" type="date" v-model="form.finisheddate"></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="8"
                    v-if="form.errortype != 'PR013001'&&form.errortype != 'PR013005'&&form.errortype != 'PR013006'&&form.errortype != 'PR013007'">
              <el-form-item :error="errorendtime" :label="$t('label.end')" prop="periodend">
                <el-time-picker
                  :disabled="!disable"
                  @change="change"
                  format='HH:mm'
                  style="width:20vw" v-model="form.periodend">
                </el-time-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row
            v-if="(form.errortype != 'PR013005' && form.errortype != 'PR013006') && (form.status === '4' || form.status === '5' || form.status === '6' || form.status === '7') ">
            <el-col :span="8">
              <el-form-item :label="$t('label.restartdate')" prop="reoccurrencedate">
                <el-date-picker @change="rechange" :disabled="form.status === '5' || form.status === '7'"
                                style="width:20vw" type="date" v-model="form.reoccurrencedate"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8"
                    v-if="form.errortype != 'PR013001'&&form.errortype != 'PR013005'&&form.errortype != 'PR013006'&&form.errortype != 'PR013007'">
              <el-form-item :error="reerrorstarttime" :label="$t('label.restart')" prop="reperiodstart">
                <el-time-picker
                  :disabled="form.status === '5' || form.status === '7'"
                  @change="rechange"
                  format='HH:mm'
                  style="width:20vw"
                  v-model="form.reperiodstart">
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
          <el-row
            v-if="(form.errortype != 'PR013005' && form.errortype != 'PR013006') && (form.status === '4' || form.status === '5' || form.status === '6' || form.status === '7') ">
            <el-col :span="8" v-if="this.typecheck!='1'&&this.typecheck!='2'">
              <el-form-item :label="$t('label.reenddate')" prop="refinisheddate">
                <el-date-picker @change="rechange" :disabled="form.status === '5' || form.status === '7'"
                                style="width:20vw" type="date" v-model="form.refinisheddate"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8"
                    v-if="form.errortype != 'PR013001'&&form.errortype != 'PR013005'&&form.errortype != 'PR013006'&&form.errortype != 'PR013007'">
              <el-form-item :error="reerrorendtime" :label="$t('label.reend')" prop="reperiodend">
                <el-time-picker
                  :disabled="form.status === '5' || form.status === '7'"
                  @change="rechange"
                  format='HH:mm'
                  style="width:20vw" v-model="form.reperiodend">
                </el-time-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-show="showFemale">
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
                  :disabled="!disable"
                  :file-list="fileList"
                  :on-error="fileError"
                  :on-preview="fileDownload"
                  :on-remove="fileRemove"
                  :on-success="fileSuccess"
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
                <el-input :disabled="!disable" :rows="6" style="width: 72vw" type="textarea"
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
    import {getDictionaryInfo, uploadUrl} from '../../../../utils/customize';

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
                if (!value || value === '' || value === "undefined") {
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
            var validateEndtime = (rule, value, callback) => {
                if (this.form.periodend !== null && this.form.periodend !== '') {
                    if ((moment(this.form.finisheddate).format('YYYY-MM-DD') === moment(this.form.occurrencedate).format('YYYY-MM-DD') && moment(value).format('HH:mm') < moment(this.form.periodstart).format('HH:mm'))
                        || (moment(this.form.finisheddate).format('YYYY-MM-DD') < moment(this.form.occurrencedate).format('YYYY-MM-DD'))) {
                        callback(new Error(this.$t('label.end') + this.$t('normal.error_checkTime1') + this.$t('label.start')));
                        this.errorendtime = this.$t('label.end') + this.$t('normal.error_checkTime1') + this.$t('label.start');
                    } else {
                        this.clearValidate(["periodstart", "occurrencedate", "finisheddate"]);
                        callback();
                        this.errorendtime = '';
                    }
                } else {
                    this.clearValidate(["periodstart", "occurrencedate", "periodend"]);
                    callback();
                    this.errorendtime = '';
                }
            };
            var revalidateEndtime = (rule, value, callback) => {
                if (this.form.reperiodend !== null && this.form.reperiodend !== '') {
                    if ((moment(this.form.refinisheddate).format('YYYY-MM-DD') === moment(this.form.reoccurrencedate).format('YYYY-MM-DD') && moment(value).format('HH:mm') < moment(this.form.reperiodstart).format('HH:mm'))
                        || (moment(this.form.refinisheddate).format('YYYY-MM-DD') < moment(this.form.reoccurrencedate).format('YYYY-MM-DD'))) {
                        callback(new Error(this.$t('label.reend') + this.$t('normal.error_checkTime1') + this.$t('label.restart')));
                        this.reerrorendtime = this.$t('label.reend') + this.$t('normal.error_checkTime1') + this.$t('label.restart');
                    } else {
                        this.clearValidate(["reperiodstart", "reoccurrencedate", "refinisheddate"]);
                        callback();
                        this.reerrorendtime = '';
                    }
                } else {
                    this.clearValidate(["reperiodstart", "reoccurrencedate", "reperiodend"]);
                    callback();
                    this.reerrorendtime = '';
                }
            };
            var validateStarttime = (rule, value, callback) => {
                if (this.form.periodstart !== null && this.form.periodstart !== '') {
                    if ((moment(this.form.finisheddate).format('YYYY-MM-DD') === moment(this.form.occurrencedate).format('YYYY-MM-DD') && moment(value).format('HH:mm') > moment(this.form.periodend).format('HH:mm'))
                        || (moment(this.form.finisheddate).format('YYYY-MM-DD') < moment(this.form.occurrencedate).format('YYYY-MM-DD'))
                    ) {
                        callback(new Error(this.$t('label.start') + this.$t('normal.error_checkTime2') + this.$t('label.end')));
                        this.errorstarttime = this.$t('label.start') + this.$t('normal.error_checkTime2') + this.$t('label.end');

                    } else {
                        callback();
                        this.clearValidate(["periodend", "occurrencedate", "periodstart"]);
                        this.errorstarttime = '';
                    }
                } else {
                    callback();
                    this.clearValidate(["periodend", "occurrencedate", "periodstart"]);
                    this.errorstarttime = '';
                }
            };
            var revalidateStarttime = (rule, value, callback) => {
                if (this.form.reperiodstart !== null && this.form.reperiodstart !== '') {
                    if ((moment(this.form.refinisheddate).format('YYYY-MM-DD') === moment(this.form.reoccurrencedate).format('YYYY-MM-DD') && moment(value).format('HH:mm') > moment(this.form.reperiodend).format('HH:mm'))
                        || (moment(this.form.refinisheddate).format('YYYY-MM-DD') < moment(this.form.reoccurrencedate).format('YYYY-MM-DD'))
                    ) {
                        callback(new Error(this.$t('label.restart') + this.$t('normal.error_checkTime2') + this.$t('label.reend')));
                        this.reerrorstarttime = this.$t('label.restart') + this.$t('normal.error_checkTime2') + this.$t('label.reend');

                    } else {
                        callback();
                        this.clearValidate(["reperiodend", "reoccurrencedate", "reperiodstart"]);
                        this.reerrorstarttime = '';
                    }
                } else {
                    callback();
                    this.clearValidate(["reperiodend", "reoccurrencedate", "reperiodstart"]);
                    this.reerrorstarttime = '';
                }
            };
            var validateEnddate = (rule, value, callback) => {
                if (this.form.finisheddate !== null && this.form.finisheddate !== '') {
                    if (moment(value).format('YYYY-MM-DD') < moment(this.form.occurrencedate).format('YYYY-MM-DD')) {
                        callback(new Error(this.$t('label.enddate') + this.$t('normal.error_checkTime1') + this.$t('label.startdate')));
                    } else {
                        if (moment(value).format('YYYY-MM-DD') === moment(this.form.occurrencedate).format('YYYY-MM-DD') && (this.form.periodstart !== '' && this.form.periodend)) {
                            if (this.form.periodstart > this.form.periodend) {
                                callback(new Error(this.$t('label.startdate') + this.$t('normal.error_checkTime2') + this.$t('label.enddate')));
                                return;
                            }
                        }
                        callback();
                        this.clearValidate(["occurrencedate", "periodend", "periodstart"]);
                    }
                } else {
                    callback();
                    this.clearValidate(["occurrencedate", "periodend", "periodstart"]);
                }
            };
            var revalidateEnddate = (rule, value, callback) => {
                if (this.form.refinisheddate !== null && this.form.refinisheddate !== '') {
                    if (moment(value).format('YYYY-MM-DD') < moment(this.form.reoccurrencedate).format('YYYY-MM-DD')) {
                        callback(new Error(this.$t('label.reenddate') + this.$t('normal.error_checkTime1') + this.$t('label.restartdate')));
                    } else {
                        if (moment(value).format('YYYY-MM-DD') === moment(this.form.reoccurrencedate).format('YYYY-MM-DD') && (this.form.reperiodstart !== '' && this.form.reperiodend)) {
                            if (this.form.reperiodstart > this.form.reperiodend) {
                                callback(new Error(this.$t('label.restartdate') + this.$t('normal.error_checkTime2') + this.$t('label.reenddate')));
                                return;
                            }
                        }
                        callback();
                        this.clearValidate(["reoccurrencedate", "reperiodend", "reperiodstart"]);
                    }
                } else {
                    callback();
                    this.clearValidate(["reoccurrencedate", "reperiodend", "reperiodstart"]);
                }
            };
            var validateStartdate = (rule, value, callback) => {
                if (this.form.occurrencedate !== null && this.form.occurrencedate !== '') {
                    if (moment(value).format('YYYY-MM-DD') > moment(this.form.finisheddate).format('YYYY-MM-DD')) {
                        callback(new Error(this.$t('label.startdate') + this.$t('normal.error_checkTime2') + this.$t('label.enddate')));
                    } else {
                        if (moment(value).format('YYYY-MM-DD') === moment(this.form.finisheddate).format('YYYY-MM-DD') && (this.form.periodstart !== '' && this.form.periodend)) {
                            if (this.form.periodstart > this.form.periodend) {
                                callback(new Error(this.$t('label.startdate') + this.$t('normal.error_checkTime2') + this.$t('label.enddate')));
                            }
                        }
                        callback();
                        this.clearValidate(["finisheddate", "periodend", "periodstart"]);
                    }
                } else {
                    callback();
                    this.clearValidate(["finisheddate", "periodend", "periodstart"]);
                }
            };
            var revalidateStartdate = (rule, value, callback) => {
                if (this.form.reoccurrencedate !== null && this.form.reoccurrencedate !== '') {
                    if (moment(value).format('YYYY-MM-DD') > moment(this.form.refinisheddate).format('YYYY-MM-DD')) {
                        callback(new Error(this.$t('label.restartdate') + this.$t('normal.error_checkTime2') + this.$t('label.reenddate')));
                    } else {
                        if (moment(value).format('YYYY-MM-DD') === moment(this.form.refinisheddate).format('YYYY-MM-DD') && (this.form.reperiodstart !== '' && this.form.reperiodend)) {
                            if (this.form.reperiodstart > this.form.reperiodend) {
                                callback(new Error(this.$t('label.restartdate') + this.$t('normal.error_checkTime2') + this.$t('label.reenddate')));
                            }
                        }
                        callback();
                        this.clearValidate(["refinisheddate", "reperiodend", "reperiodstart"]);
                    }
                } else {
                    callback();
                    this.clearValidate(["refinisheddate", "reperiodend", "reperiodstart"]);
                }
            };
            var validateLength = (rule, value, callback) => {
                if (this.form.errortype == 'PR013005' || this.form.errortype == 'PR013006') {
                    this.$store
                        .dispatch('PFANS2016Store/cklength', {
                            "user_id": this.form.user_id,
                            errortype: this.form.errortype,
                            lengthtime: this.form.lengthtime,
                        })
                        .then(response => {
                            this.checkDate = response.dat;
                            if (response.can === "no") {
                                callback(this.$t('normal.error_norestdays'));
                            } else {
                                this.form.restdate = response.dat;
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
                if ((this.form.errortype == 'PR013005' || this.form.errortype == 'PR013006') && this.form.status === '4') {
                    this.$store
                        .dispatch('PFANS2016Store/cklength', {
                            "user_id": this.form.user_id,
                            errortype: this.form.errortype,
                            relengthtime: this.form.relengthtime,
                        })
                        .then(response => {
                            if (response.can === "no") {
                                callback(this.$t('normal.error_norestdays'));
                            } else {
                                this.form.restdate = response.dat;
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
            return {
                relistTwo: '',
                workflowCode: "W0003",
                canStart: true,
                loading: false,
                errort: '',
                checkDate: '',
                errorendtime: '',
                reerrorendtime: '',
                errorstarttime: '',
                reerrorstarttime: '',
                options: [],
                value: [],
                options1: [{
                    value: '0',
                    label: '全天'
                }, {
                    value: '1',
                    label: '上午'
                }, {
                    value: '2',
                    label: '下午'
                }],
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
                    lengthtime: '0',
                    relengthtime: '0',
                    occurrencedate: moment(new Date()).format('YYYY-MM-DD'),
                    finisheddate: moment(new Date()).format('YYYY-MM-DD'),
                    reoccurrencedate: moment(new Date()).format('YYYY-MM-DD'),
                    refinisheddate: moment(new Date()).format('YYYY-MM-DD'),
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
                    reoccurrencedate: [,
                        {validator: revalidateStartdate, trigger: 'change'}],
                    refinisheddate: [
                        {validator: revalidateEnddate, trigger: 'change'}],
                    reperiodstart: [
                        {validator: revalidateStarttime, trigger: 'change'}],
                    reperiodend: [
                        {validator: revalidateEndtime, trigger: 'change'}],
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
                    cause: [
                        {
                            required: true,
                            message:
                                this.$t("normal.error_08") +
                                this.$t("label.cause"),
                            trigger: "change"
                        }
                    ],
                    lengthtime: [{
                        required: true,
                        validator: validateLength,
                        trigger: 'change',
                    }],
                    relengthtime: [{
                        validator: revalidateLength,
                        trigger: 'change',
                    }],
                    hospital: [{required: true, validator: validatePass, trigger: 'blur'}],
                    edate: [{required: true, validator: validatePass2, trigger: 'change'}],
                },
                fileList: [],
                upload: uploadUrl(),
                workshift: '',
                typecheck: '0',
                timeSum: '',
                closingtime: '',
                lunchbreakS: '',
                lunchbreakE: '',
                dateInfo: [],
                Todaysum: [],
                reList: [],
                relist: [],
            };
        },
        mounted() {
            this.getAttendance();
            this.getDay();
            if (this.$route.params._id) {
                this.loading = true;
                this.$store
                    .dispatch('PFANS2016Store/getPfans2016One', {'abnormalid': this.$route.params._id})
                    .then(response => {
                        this.form = response;
                        this.userlist = this.form.user_id;
                        this.relation = this.form.relation;
                        if (this.form.status === '2' || this.form.status === '4') {
                            this.disable = false;
                        }
                        if (this.form.errortype == 'PR013006') {
                            this.options1 = [{
                                value: '0',
                                label: '全天'
                            }];
                        }
                        if (this.form.errortype == 'PR013007') {
                            this.options1 = [{
                                value: '1',
                                label: '上午'
                            }, {
                                value: '2',
                                label: '下午'
                            }];
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

                if (this.form.status === "0") {
                    this.workflowCode = "W0003";
                    this.canStart = true;
                } else if (this.form.status === "4") {
                    this.workflowCode = "W0056";
                    this.canStart = true;
                } else if (this.form.status === "7") {
                    this.workflowCode = "W0040";
                    this.canStart = false;
                }

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
                        disabled: false,
                        icon: 'el-icon-check',
                    },
                ];
            }
        },
        methods: {
            handleClick(val){
                this.typecheck = val;
                this.form.occurrencedate=moment(new Date()).format('YYYY-MM-DD');
                this.form.finisheddate=moment(new Date()).format('YYYY-MM-DD');

            },
            handleclick(val) {
                this.typecheck = val;
                this.form.reoccurrencedate = moment(new Date()).format('YYYY-MM-DD');
                this.form.refinisheddate = moment(new Date()).format('YYYY-MM-DD');

            },
            getTime(val) {
                let sum = 0;
                for (let i = 0; i < this.relist.length; i++) {
                    sum = sum + 1;
                }
                if (sum * 8 < val) {
                    Message({
                        message: this.$t("label.PFANS2016FORMVIEW_WCCHECKTYPE"),
                        type: 'error',
                        duration: 5 * 1000,
                    });
                }
            },
            getarrDate() {
                var getDate = function (str) {
                    var tempDate = new Date();
                    var list = str.split("-");
                    tempDate.setFullYear(list[0]);
                    tempDate.setMonth(list[1] - 1);
                    tempDate.setDate(list[2]);
                    return tempDate;
                };
                if (this.form.occurrencedate != null && this.form.finisheddate != null) {
                    var date1 = getDate(moment(this.form.occurrencedate).format("YYYY-MM-DD"));
                    var date2 = getDate(moment(this.form.finisheddate).format("YYYY-MM-DD"));
                    if (date1 > date2) {
                        var tempDate = date1;
                        date1 = date2;
                        date2 = tempDate;
                    }
                    date1.setDate(date1.getDate() + 1);
                    var dateArr = [];
                    var i = 0;
                    while (!(date1.getFullYear() == date2.getFullYear()
                        && date1.getMonth() == date2.getMonth() && date1.getDate() == date2
                            .getDate())) {
                        var dayStr = date1.getDate().toString();
                        if (dayStr.length == 1) {
                            dayStr = "0" + dayStr;
                        }
                        var monthStr = (date1.getMonth() + 1).toString();
                        if (monthStr.length == 1) {
                            monthStr = "0" + monthStr;
                        }
                        dateArr[i] = date1.getFullYear() + "-" + monthStr + "-"
                            + dayStr;
                        i++;
                        date1.setDate(date1.getDate() + 1);
                    }
                    dateArr.splice(0, 0, moment(this.form.occurrencedate).format("YYYY-MM-DD"));
                    dateArr.push(moment(this.form.finisheddate).format("YYYY-MM-DD"));
                    this.Todaysum = dateArr;
                }
            },
            getDay() {
                this.$store
                    .dispatch('PFANS8007Store/getList', {})
                    .then(response => {
                        for (let i = 0; i < response.length; i++) {
                            this.dateInfo.push({
                                dateflg: moment(response[i].workingdate).format('YYYY-MM-DD'),
                                type: response[i].type
                            });
                        }
                    })
            },
            getAttendance() {
                this.loading = true;
                this.$store
                    .dispatch('PFANS2018Store/getFpans2018List', {})
                    .then(response => {
                        this.workshift = response[0].workshift_end;
                        this.closingtime = response[0].closingtime_end;
                        this.lunchbreakS = response[0].lunchbreak_start;
                        this.lunchbreakE = response[0].lunchbreak_end;
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
            },
            clearValidate(prop) {
                this.$refs["ruleForm"].fields.forEach((e) => {
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
                this.getarrDate();
                var getDate = function (str) {
                    var tempDate = new Date();
                    var list = str.split("-");
                    tempDate.setFullYear(list[0]);
                    tempDate.setMonth(list[1] - 1);
                    tempDate.setDate(list[2]);
                    return tempDate;
                };
                for (let i = 0; i < this.Todaysum.length; i++) {
                    var date = getDate(this.Todaysum[i]);
                    if (date.getDay() == 6) {
                        this.Todaysum.splice(i, 1)
                    }
                    this.reList = this.Todaysum
                }
                for (let j = 0; j < this.reList.length; j++) {
                    var data = getDate(this.reList[j]);
                    if (data.getDay() == 0) {
                        this.reList.splice(j, 1)
                    }
                    this.relist = this.reList
                }
                for (let a = 0; a < this.relist.length; a++) {
                    for (let b = 0; b < this.dateInfo.length; b++) {
                        if (this.dateInfo[b].dateflg == this.relist[a] && this.dateInfo[b].type != '4') {
                            this.relist.splice(a, 1)
                        }
                    }
                }
                if (this.typecheck == '0') {
                    let time = 0;
                    for (let d = 0; d < this.relist.length; d++) {
                        time = time + 1;
                    }
                    if (this.checkDate < time) {
                        Message({
                            message: this.$t("label.PFANS2016FORMVIEW_YJCHECKEROR"),
                            type: 'error',
                            duration: 5 * 1000,
                        });
                    }
                } else {
                    if (this.form.occurrencedate !== '' && this.form.finisheddate !== '') {
                        if (moment(this.form.occurrencedate).format('YYYY-MM-DD') < moment(this.form.finisheddate).format('YYYY-MM-DD')) {
                            var beginHours;
                            var endHours;
                            var time;
                            var beginDay = moment(this.form.occurrencedate).format('YYYY-MM-DD');
                            var endDay = moment(this.form.finisheddate).format('YYYY-MM-DD');
                            var dayBegin = new Date(beginDay);
                            var dayEnd = new Date(endDay);
                            var daysDiff = dayEnd.getTime() - dayBegin.getTime();
                            var dayDiff = Math.floor(daysDiff / (24 * 3600 * 1000));
                            if (dayDiff - 1 > 0) {
                                dayDiff = (dayDiff - 1) * 8;
                                var hoursBegin = new Date(this.form.periodstart);
                                var hoursEnd = new Date(this.form.periodend);
                                var timeUp = Number(this.workshift.replace(':', '.'));         //上班时间
                                var timeDown = Number(this.closingtime.replace(':', '.'));     //下班时间
                                var lunchflgS = Number(this.lunchbreakS.replace(':', '.'));    //午休开始时间
                                var lunchflgE = Number(this.lunchbreakE.replace(':', '.'));    //午休结束时间
                                var beginTime = hoursBegin.getHours() + hoursBegin.getMinutes() / 60;  //申请开始时间
                                if (beginTime <= lunchflgE) {
                                    beginHours = (lunchflgS - beginTime) + (timeDown - lunchflgE);
                                } else {
                                    beginHours = timeDown - beginTime;
                                }
                                if (beginHours > 8) {
                                    beginHours = 8;
                                }
                                var endTime = hoursEnd.getHours() + hoursEnd.getMinutes() / 60;  //申请结束时间
                                if (endTime >= lunchflgS) {
                                    endHours = (endTime - lunchflgE) + (lunchflgS - timeUp);
                                } else {
                                    endHours = endTime - timeUp;
                                }
                                if (endHours > 8) {
                                    endHours = 8;
                                }
                                time = beginHours + endHours;
                                if (this.$i18n) {
                                    if (this.form.periodstart !== '' && this.form.periodend !== '') {
                                        this.form.lengthtime = parseFloat(dayDiff + time).toFixed(1);
                                    } else {
                                        this.form.lengthtime = parseFloat(dayDiff).toFixed(1);
                                    }

                                }
                            } else {
                                var dayBegin = new Date(this.form.periodstart);
                                var dayEnd = new Date(this.form.periodend);
                                var timeUp = Number(this.workshift.replace(':', '.'));         //上班时间
                                var timeDown = Number(this.closingtime.replace(':', '.'));     //下班时间
                                var lunchflgS = Number(this.lunchbreakS.replace(':', '.'));    //午休开始时间
                                var lunchflgE = Number(this.lunchbreakE.replace(':', '.'));    //午休结束时间
                                var beginTime = dayBegin.getHours() + dayBegin.getMinutes() / 60;
                                if (beginTime <= lunchflgE) {
                                    beginHours = (lunchflgS - beginTime) + (timeDown - lunchflgE);
                                } else {
                                    beginHours = timeDown - beginTime;
                                }
                                if (beginHours > 8) {
                                    beginHours = 8;
                                }
                                var endTime = dayEnd.getHours() + dayEnd.getMinutes() / 60;
                                if (endTime >= lunchflgS) {
                                    endHours = (endTime - lunchflgE) + (lunchflgS - timeUp);
                                } else {
                                    endHours = endTime - timeUp;
                                }
                                if (endHours > 8) {
                                    endHours = 8;
                                }
                                time = beginHours + endHours;
                                if (this.$i18n) {
                                    this.form.lengthtime = parseFloat(time).toFixed(1);
                                }
                            }
                        } else if (moment(this.form.occurrencedate).format('YYYY-MM-DD') === moment(this.form.finisheddate).format('YYYY-MM-DD')) {
                            var time;
                            var dayBegin = new Date(this.form.periodstart);
                            var dayEnd = new Date(this.form.periodend);
                            var timeUp = Number(this.workshift.replace(':', '.'));         //上班时间
                            var timeDown = Number(this.closingtime.replace(':', '.'));     //下班时间
                            var lunchflgS = Number(this.lunchbreakS.replace(':', '.'));    //午休开始时间
                            var lunchflgE = Number(this.lunchbreakE.replace(':', '.'));    //午休结束时间
                            var beginTime = dayBegin.getHours() + dayBegin.getMinutes() / 60;     //申请开始时间
                            var endTime = dayEnd.getHours() + dayEnd.getMinutes() / 60;           //申请结束时间
                            if ((endTime <= lunchflgS && beginTime <= timeUp) || (beginTime >= lunchflgE && endTime <= timeDown)) {
                                time = endTime - beginTime;
                            } else if (endTime >= lunchflgS && endTime <= lunchflgE) {
                                time = lunchflgS - beginTime;
                            } else if (endTime >= lunchflgE && beginTime <= lunchflgS) {
                                time = (lunchflgS - beginTime) + (endTime - lunchflgE);
                            } else if (beginTime >= lunchflgE && beginTime <= timeDown) {
                                time = (lunchflgS - beginTime) + (endTime - lunchflgE);
                            } else {
                                this.form.lengthtime = '0';
                            }
                            if (this.$i18n && time !== "") {
                                if (time > 8) {
                                    time = 8;
                                }
                                if (time > 0) {
                                    this.form.lengthtime = parseFloat(time).toFixed(1);
                                } else {
                                    this.form.lengthtime = '0';
                                }
                            }
                        } else {
                            this.form.lengthtime = '0';
                        }
                    }
                }
            },
            rechange() {
                var getDate = function (str) {
                    var tempDate = new Date();
                    var list = str.split("-");
                    tempDate.setFullYear(list[0]);
                    tempDate.setMonth(list[1] - 1);
                    tempDate.setDate(list[2]);
                    return tempDate;
                };
                if (this.form.reoccurrencedate != null && this.form.refinisheddate != null) {
                    var date1 = getDate(moment(this.form.reoccurrencedate).format("YYYY-MM-DD"));
                    var date2 = getDate(moment(this.form.refinisheddate).format("YYYY-MM-DD"));
                    if (date1 > date2) {
                        var tempDate = date1;
                        date1 = date2;
                        date2 = tempDate;
                    }
                    date1.setDate(date1.getDate() + 1);
                    var dateArr = [];
                    var i = 0;
                    while (!(date1.getFullYear() == date2.getFullYear()
                        && date1.getMonth() == date2.getMonth() && date1.getDate() == date2
                            .getDate())) {
                        var dayStr = date1.getDate().toString();
                        if (dayStr.length == 1) {
                            dayStr = "0" + dayStr;
                        }
                        var monthStr = (date1.getMonth() + 1).toString();
                        if (monthStr.length == 1) {
                            monthStr = "0" + monthStr;
                        }
                        dateArr[i] = date1.getFullYear() + "-" + monthStr + "-"
                            + dayStr;
                        i++;
                        date1.setDate(date1.getDate() + 1);
                    }
                    dateArr.splice(0, 0, moment(this.form.reoccurrencedate).format("YYYY-MM-DD"));
                    dateArr.push(moment(this.form.refinisheddate).format("YYYY-MM-DD"));
                    this.Todaysum = dateArr;
                }
                for (let i = 0; i < this.Todaysum.length; i++) {
                    var date = getDate(this.Todaysum[i]);
                    if (date.getDay() == 6) {
                        this.Todaysum.splice(i, 1)
                    }
                    this.reList = this.Todaysum
                }
                for (let j = 0; j < this.reList.length; j++) {
                    var data = getDate(this.reList[j]);
                    if (data.getDay() == 0) {
                        this.reList.splice(j, 1)
                    }
                    this.relistTwo = this.reList
                }
                for (let a = 0; a < this.relistTwo.length; a++) {
                    for (let b = 0; b < this.dateInfo.length; b++) {
                        if (this.dateInfo[b].dateflg == this.relistTwo[a] && this.dateInfo[b].type != '4') {
                            this.relistTwo.splice(a, 1)
                        }
                    }
                }
                if (this.typecheck == '0') {
                    let timere = 0;
                    for (let d = 0; d < this.relistTwo.length; d++) {
                        timere = timere + 1;
                    }
                    if (this.checkDate < timere) {
                        Message({
                            message: this.$t("label.PFANS2016FORMVIEW_SJCHECKEROR"),
                            type: 'error',
                            duration: 5 * 1000,
                        });
                    }
                } else {
                    if (this.form.reoccurrencedate !== '' && this.form.refinisheddate !== '') {
                        if (moment(this.form.reoccurrencedate).format('YYYY-MM-DD') < moment(this.form.refinisheddate).format('YYYY-MM-DD')) {
                            var beginHours;
                            var endHours;
                            var time;
                            var beginDay = moment(this.form.reoccurrencedate).format('YYYY-MM-DD');
                            var endDay = moment(this.form.refinisheddate).format('YYYY-MM-DD');
                            var dayBegin = new Date(beginDay);
                            var dayEnd = new Date(endDay);
                            var daysDiff = dayEnd.getTime() - dayBegin.getTime();
                            var dayDiff = Math.floor(daysDiff / (24 * 3600 * 1000));
                            if (dayDiff - 1 > 0) {
                                dayDiff = (dayDiff - 1) * 8;
                                var dayBegin = new Date(this.form.reperiodstart);
                                var dayEnd = new Date(this.form.reperiodend);
                                var timeUp = Number(this.workshift.replace(':', '.'));         //上班时间
                                var timeDown = Number(this.closingtime.replace(':', '.'));     //下班时间
                                var lunchflgS = Number(this.lunchbreakS.replace(':', '.'));    //午休开始时间
                                var lunchflgE = Number(this.lunchbreakE.replace(':', '.'));    //午休结束时间
                                var beginTime = dayBegin.getHours() + dayBegin.getMinutes() / 60;
                                if (beginTime <= lunchflgE) {
                                    beginHours = (lunchflgS - beginTime) + (timeDown - lunchflgE);
                                } else {
                                    beginHours = timeDown - beginTime;
                                }
                                if (beginHours > 8) {
                                    beginHours = 8;
                                }
                                var endTime = dayEnd.getHours() + dayEnd.getMinutes() / 60;
                                if (endTime >= lunchflgS) {
                                    endHours = (endTime - lunchflgE) + (lunchflgS - timeUp);
                                } else {
                                    endHours = endTime - timeUp;
                                }
                                if (endHours > 8) {
                                    endHours = 8;
                                }
                                var time = beginTime + endTime;
                                if (this.$i18n) {
                                    this.form.relengthtime = parseFloat(dayDiff + time).toFixed(1);
                                }
                            } else {
                                var dayBegin = new Date(this.form.reperiodstart);
                                var dayEnd = new Date(this.form.reperiodend);
                                var timeUp = Number(this.workshift.replace(':', '.'));         //上班时间
                                var timeDown = Number(this.closingtime.replace(':', '.'));     //下班时间
                                var lunchflgS = Number(this.lunchbreakS.replace(':', '.'));    //午休开始时间
                                var lunchflgE = Number(this.lunchbreakE.replace(':', '.'));    //午休结束时间
                                var beginTime = dayBegin.getHours() + dayBegin.getMinutes() / 60;
                                if (beginTime <= lunchflgE) {
                                    beginHours = (lunchflgS - beginTime) + (timeDown - lunchflgE);
                                } else {
                                    beginHours = timeDown - beginTime;
                                }
                                if (beginHours > 8) {
                                    beginHours = 8;
                                }
                                var endTime = dayEnd.getHours() + dayEnd.getMinutes() / 60;
                                if (endTime >= lunchflgS) {
                                    endHours = (endTime - lunchflgE) + (lunchflgS - timeUp);
                                } else {
                                    endHours = endTime - timeUp;
                                }
                                if (endHours > 8) {
                                    endHours = 8;
                                }
                                time = beginTime + endTime;
                                if (this.$i18n) {
                                    this.form.relengthtime = parseFloat(time).toFixed(1);
                                }
                            }
                        } else if (moment(this.form.reoccurrencedate).format('YYYY-MM-DD') === moment(this.form.refinisheddate).format('YYYY-MM-DD')) {
                            var time;
                            var dayBegin = new Date(this.form.reperiodstart);
                            var dayEnd = new Date(this.form.reperiodend);
                            var timeUp = Number(this.workshift.replace(':', '.'));         //上班时间
                            var timeDown = Number(this.closingtime.replace(':', '.'));     //下班时间
                            var lunchflgS = Number(this.lunchbreakS.replace(':', '.'));    //午休开始时间
                            var lunchflgE = Number(this.lunchbreakE.replace(':', '.'));    //午休结束时间
                            var beginTime = dayBegin.getHours() + dayBegin.getMinutes() / 60;
                            var endTime = dayEnd.getHours() + dayEnd.getMinutes() / 60;
                            if ((endTime <= lunchflgS && beginTime <= timeUp) || (beginTime >= lunchflgE && endTime <= timeDown)) {
                                time = endTime - beginTime;
                            } else if (endTime >= lunchflgS && endTime <= lunchflgE) {
                                time = lunchflgS - beginTime;
                            } else if (endTime >= lunchflgE && beginTime <= lunchflgS) {
                                time = (lunchflgS - beginTime) + (endTime - lunchflgE);
                            } else if (beginTime >= lunchflgE && beginTime <= timeDown) {
                                time = (lunchflgS - beginTime) + (endTime - lunchflgE);
                            } else {
                                this.form.relengthtime = '0';
                            }
                            if (this.$i18n && time !== "") {
                                if (time > 8) {
                                    time = 8;
                                }
                                if (time > 0) {
                                    this.form.relengthtime = parseFloat(time).toFixed(1);
                                } else {
                                    this.form.relengthtime = '0';
                                }
                            }
                        } else {
                            this.form.relengthtime = '';
                        }
                    }
                }
            },
            getUserids(val) {
                if (val === "undefined") {
                    this.userlist = "1";
                    return
                }
                this.form.user_id = val;
                let lst = getOrgInfoByUserId(val);
                this.form.centerid = lst.centerNmae;
                this.form.groupid = lst.groupNmae;
                this.form.teamid = lst.teamNmae;
                if (!this.form.user_id || this.form.user_id === '' || val === "undefined") {
                    this.error = this.$t('normal.error_08') + this.$t('label.applicant');
                } else {
                    this.error = '';
                }

            },
            getErrorType(val) {
                this.typecheck='';
                let dictionaryInfo = getDictionaryInfo(val);
                if (dictionaryInfo) {
                    this.form.enclosureexplain = dictionaryInfo.value2;
                }
                this.form.errortype = val;
                if (val === 'PR013004') {
                    this.showFemale = true;
                } else if (val === 'PR013005') {
                    this.typecheck = 0;
                } else if (val === 'PR013006') {
                    this.options1 = [{
                        value: '0',
                        label: '全天'
                    }];
                } else if (val === 'PR013007') {
                    this.options1 = [{
                        value: '1',
                        label: '上午'
                    }, {
                        value: '2',
                        label: '下午'
                    }];
                    this.showWeekend = false;
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
                if (val == 'PR013005' || val == 'PR013006') {
                    this.form.lengthtime = "0";
                    this.form.relengthtime = "0";
                }
                this.$refs.ruleForm.validateField("lengthtime");
            },
            workflowState(val) {
                if (val.state === "1") {
                    if (val.workflowCode === "W0003") {
                        this.form.status = '3';
                    } else if (val.workflowCode === "W0056") {
                        this.form.status = '6';
                    }
                } else if (val.state === "2") {
                    if (val.workflowCode === "W0003") {
                        this.form.status = '4';
                    } else if (val.workflowCode === "W0056") {
                        this.form.status = '7';
                        this.canStart = false;
                    }
                }
                this.buttonClick("update");
            },
            start() {
                if (this.form.status === "4" || this.form.status === "6") {
                    this.form.status = '5';

                } else {
                    this.form.status = '2';
                }
                this.buttonClick("update");
            },
            end() {
                if (this.form.status === "5") {
                    var status = "4";
                } else {
                    var status = "0";
                }
                this.buttonClick("update");
            },
            fileError(err, file, fileList) {
                Message({
                    message: this.$t("normal.error_04"),
                    type: 'error',
                    duration: 5 * 1000
                });
            },
            fileRemove(file, fileList) {
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
                this.$refs['ruleForm'].validate(valid => {//111
                    if (valid) {
                        this.errort = '';
                        let letrelation = '';
                        for (let j = 0; j < this.form.relation.length; j++) {
                            letrelation = letrelation + ',' + this.form.relation[j];
                        }
                        let letnewdate = moment(new Date()).format('YYYY-MM-DD');
                        let letoccurrencedate = moment(this.form.occurrencedate).format('YYYY-MM-DD');
                        let letfinisheddate = moment(this.form.finisheddate).format('YYYY-MM-DD');
                        this.form.periodstart = letoccurrencedate.replace(letnewdate, letoccurrencedate);
                        if (this.typecheck == '0') {
                            if (this.relist.length != '0') {
                                let time = 0;
                                for (let d = 0; d < this.relist.length; d++) {
                                    time = time + 1;
                                }
                                this.form.lengthtime = time;
                            }
                            if (this.relistTwo.length != '0') {
                                let timere = 0;
                                for (let d = 0; d < this.relistTwo.length; d++) {
                                    timere = timere + 1;
                                }
                                this.form.relengthtime = timere;
                            }
                        }
                        this.form.periodend = letfinisheddate.replace(letnewdate, letfinisheddate);
                        this.form.relation = letrelation.substring(1, letrelation.length);
                        if (this.$route.params._id) {
                            this.form.abnormalid = this.$route.params._id;
                            this.loading = true;
                            this.$store
                                .dispatch('PFANS2016Store/updatePfans2016', this.form)
                                .then(response => {
                                    this.loading = false;
                                    // if(response === 'PR013005'){
                                    //     this.errort = this.$t('normal.ERROR_RETIRE');
                                    // }
                                    // else{
                                    this.data = response;
                                    if (val !== "update") {
                                        Message({
                                            message: this.$t('normal.success_02'),
                                            type: 'success',
                                            duration: 5 * 1000,
                                        });
                                        if (this.$store.getters.historyUrl) {
                                            this.$router.push(this.$store.getters.historyUrl);
                                        }
                                    }
                                    // }

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
