<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" v-loading="loading" :title="title" @buttonClick="buttonClick" @disabled="setdisabled"
                         @end="end" @start="start" @workflowState="workflowState" ref="container">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="ruleForm"
                 style="padding: 2vw">
          <el-tabs @tab-click="handleClick" v-model="form.ticketstype" type="border-card">
            <el-tab-pane :label="$t('label.PFANS3001FORMVIEW_DOMESTIC')" name="first" value="1" :disabled="this.$route.params._id !== '' && this.form.ticketstype === 'second'"></el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS3001FORMVIEW_FOREIGN')" name="second" value="2" :disabled="this.$route.params._id !== '' && this.form.ticketstype === 'first'"></el-tab-pane>
            <el-row>
              <el-col :span="8">
                <el-form-item :label="$t('label.center')">
                  <el-input :disabled="true" style="width:20vw" v-model="centerid"></el-input>
                  <el-input  v-show='false' :disabled="false" style="width:20vw" v-model="form.center_id"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('label.group')">
                  <el-input :disabled="true" style="width:20vw" v-model="groupid"></el-input>
                  <el-input  v-show='false' :disabled="false" style="width:20vw" v-model="form.group_id"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('label.team')">
                  <el-input :disabled="true" style="width:20vw" v-model="teamid"></el-input>
                  <el-input  v-show='false' :disabled="false" style="width:20vw" v-model="form.team_id"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item :error="error" :label="$t('label.applicant')" prop="user_id">
                  <user :disabled="true" :error="error" :selectType="selectType"
                        :userlist="userlist" @getUserids="getUserids" style="width: 20vw"></user>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS3001FORMVIEW_ROMANID')" prop="romanid">
                  <el-input :disabled="!disable" maxlength="20" style="width:20vw" v-model="form.romanid"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS1012FORMVIEW_BUDGET')" >
                  <el-input :disabled="true" maxlength="20" style="width:20vw"
                            v-model="form.budgetnumber"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS3001VIEW_EXTENSIONNUMBER')" prop="extensionnumber">
                  <el-input :disabled="!disable" style="width:20vw" maxlength ="20"
                            v-model="form.extensionnumber"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-show="showDomestic">
                <el-form-item :label="$t('label.PFANS3001FORMVIEW_IDCARD')" prop="idcard">
                  <el-input :disabled="!disable" maxlength="18" style="width:20vw" v-model="form.idcard"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-show="showDomestic">
                <el-form-item :label="$t('label.PFANS3001VIEW_MOBILEPHONE')" prop="mobilephone">
                  <el-input :disabled="!disable" maxlength="20" style="width:20vw"
                            v-model="form.mobilephone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-show="showForeign">
                <el-form-item :label="$t('label.PFANS3001FORMVIEW_PASSPORT')" prop="passport">
                  <el-input :disabled="!disable" maxlength="9" style="width:20vw" v-model="form.passport"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-show="showForeign">
                <el-form-item :label="$t('label.PFANS3001FORMVIEW_EFFECTIVEDATE')" prop="effectivedate">
                  <el-date-picker :disabled="!disable" style="width:20vw" type="date"
                                  v-model="form.effectivedate"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-show="showForeign">
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS3001VIEW_MOBILEPHONE')" prop="mobilephone">
                  <el-input :disabled="!disable" maxlength="20" style="width:20vw"
                            v-model="form.mobilephone"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <!--            start(添加出差申请关联)  fjl 2020/04/08-->
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS1013VIEW_RELATION')" prop="business_id">
                  <el-select :disabled="!disable" clearable @change="changebusiness" style="width:20vw"
                             v-model="form.business_id">
                    <el-option
                      v-if="form.ticketstype === 'first'"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      v-for="item in relations">
                    </el-option>
                    <el-option
                      v-else
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      v-for="item in relations1">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <!--            end(添加申请日期)  fjl 2020/04/08-->
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS3001VIEW_TRIPPOINT')" prop="trippoint">
                  <el-input :disabled="!disable" maxlength="50" style="width:20vw"
                            v-model="form.trippoint"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS3001FORMVIEW_TRIPSTART')" prop="tripstart">
                  <el-date-picker :disabled="!disable" style="width:20vw" type="date"
                                  v-model="form.tripstart"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS3001VIEW_GOING')" prop="going">
                  <el-input :disabled="!disable" maxlength="20" style="width:20vw" v-model="form.going"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS3001VIEW_GOAIRLINENUMBER')" prop="goairlinenumber">
                  <el-input :disabled="!disable" maxlength="20" style="width:20vw"
                            v-model="form.goairlinenumber"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS3001FORMVIEW_TRIPEND')" prop="tripend">
                  <el-date-picker :disabled="!disable" style="width:20vw" type="date"
                                  v-model="form.tripend"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item :error="errorgodeparturedate" :label="$t('label.PFANS3001VIEW_GODEPARTUREDATE')"
                              prop="godeparturedate">
                  <el-date-picker :disabled="!disable" style="width:20vw" type="datetime"
                                  v-model="form.godeparturedate"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :error="errorgoarrivaldate" :label="$t('label.PFANS3001VIEW_GOARRIVALDATE')"
                              prop="goarrivaldate">
                  <el-date-picker :disabled="!disable" style="width:20vw" type="datetime"
                                  v-model="form.goarrivaldate"></el-date-picker>
                </el-form-item>
              </el-col>
              <!--            start(添加申请日期)  fjl 2020/04/08-->
              <el-col :span="8">
                <el-form-item :label="$t('label.application_date')" prop="applicationdate">
                  <div class="block">
                    <el-date-picker
                      :disabled="true"
                      style="width:20vw"
                      type="date"
                      v-model="form.applicationdate">
                    </el-date-picker>
                  </div>
                </el-form-item>
              </el-col>
              <!--            end(添加申请日期)  fjl 2020/04/08-->
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS3001VIEW_BACK')" prop="back">
                  <el-input :disabled="!disable" maxlength="20" style="width:20vw" v-model="form.back"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS3001VIEW_GOAIRLINENUMBER')" prop="reairlinenumber">
                  <el-input :disabled="!disable" maxlength="20" style="width:20vw"
                            v-model="form.reairlinenumber"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS3001VIEW_TICKETINGDATE')" prop="ticketingdate">
                  <el-date-picker :disabled="!disable" style="width:20vw" type="date"
                                  v-model="form.ticketingdate"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item :error="errorredeparturedate" :label="$t('label.PFANS3001VIEW_GODEPARTUREDATE')"
                              prop="redeparturedate">
                  <el-date-picker :disabled="!disable" style="width:20vw" type="datetime"
                                  v-model="form.redeparturedate"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :error="errorrearrivaldate" :label="$t('label.PFANS3001VIEW_GOARRIVALDATE')"
                              prop="rearrivaldate">
                  <el-date-picker :disabled="!disable" style="width:20vw" type="datetime"
                                  v-model="form.rearrivaldate"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
<!--            start  fjl 2020/04/08  添加总务担当的受理功能-->
            <el-row v-show="acceptShow">
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS3001FORMVIEW_ACCEPT')" prop="accept">
                  <span style="margin-right: 1rem ">{{$t('label.no')}}</span>
                  <el-switch
                    :disabled="!disable"
                    v-model="form.accept"
                    active-value="1"
                    inactive-value="0"
                  >
                  </el-switch>
                  <span style="margin-left: 1rem ">{{$t('label.yes')}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-show="form.accept === '1'">
                <el-form-item :label="$t('label.PFANS3001FORMVIEW_ACCEPTSTATUS')">
                  <el-select clearable style="width: 20vw"  v-model="form.acceptstatus" :disabled="!disable"
                             :placeholder="$t('normal.error_09')">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-show="form.accept === '1'">
                <el-form-item :label="$t('label.PFANS5004VIEW_FINSHTIME')">
                  <el-date-picker :disabled="!disable" style="width:20vw" type="date"
                                  v-model="form.findate"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
<!--            end  fjl 2020/04/08  添加总务担当的受理功能-->
          </el-tabs>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import PFANS3001View from '../PFANS3001/PFANS3001View.vue';
  import {Message} from 'element-ui';
  import user from '../../../components/user.vue';
  import dicselect from '../../../components/dicselect.vue';
  import {getOrgInfoByUserId,getDictionaryInfo,getCurrentRole2} from '@/utils/customize';
  import {isvalidPhone, idcardNumber, telephoneNumber} from '@/utils/validate';
  import moment from 'moment';
  import {getOrgInfo} from "../../../../utils/customize";
  import {getUserInfo} from "../../../../utils/customize";

  export default {
    name: 'PFANS3001FormView',
    components: {
      EasyNormalContainer,
      PFANS3001View,
      user,
      dicselect,
    },
    data() {
      var validateIdCard = (rule, value, callback) => {
        if (this.form.idcard !== null && this.form.idcard !== '') {
          if (!idcardNumber(value)) {
            callback(new Error(this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS3001FORMVIEW_IDCARD')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var validateUserid = (rule, value, callback) => {
        if (!value || value === '' || value ==="undefined") {
          callback(new Error(this.$t('normal.error_09') + this.$t('label.applicant')));
          this.error = this.$t('normal.error_09') + this.$t('label.applicant');
        } else {
          callback();
          this.error = '';
        }
      };
      var validateTel = (rule, value, callback) => {
        if (this.form.mobilephone !== null && this.form.mobilephone !== '') {
          if (!isvalidPhone(value)) {
            callback(new Error(this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS3001VIEW_MOBILEPHONE')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var validateTripstart = (rule, value, callback) => {
        if (this.form.tripstart !== null && this.form.tripstart !== '' && this.form.tripend !== null && this.form.tripend !== '') {
          if (moment(value).format('YYYY-MM-DD') > moment(this.form.tripend).format('YYYY-MM-DD')) {
            callback(new Error(this.$t('label.PFANS3001FORMVIEW_TRIPSTART') + this.$t('normal.error_checkTime2') + this.$t('label.PFANS3001FORMVIEW_TRIPEND')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var validateTripend = (rule, value, callback) => {
        if (this.form.tripend !== null && this.form.tripend !== '' && this.form.tripstart !== null && this.form.tripstart !== '') {
          if (moment(value).format('YYYY-MM-DD') < moment(this.form.tripstart).format('YYYY-MM-DD')) {
            callback(new Error(this.$t('label.PFANS3001FORMVIEW_TRIPEND') + this.$t('normal.error_checkTime1') + this.$t('label.PFANS3001FORMVIEW_TRIPSTART')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var validateGodeparturedate = (rule, value, callback) => {
        if (this.form.godeparturedate !== null && this.form.godeparturedate !== '' && this.form.goarrivaldate !== null && this.form.goarrivaldate !== '') {
          if (moment(value).format('YYYY-MM-DD HH:mm:ss') >= moment(this.form.goarrivaldate).format('YYYY-MM-DD HH:mm:ss')) {
            callback(new Error(this.$t('label.PFANS3001VIEW_GODEPARTUREDATE') + this.$t('normal.error_checkTime2') + this.$t('label.PFANS3001VIEW_GOARRIVALDATE')));
            this.errorgodeparturedate = this.$t('label.PFANS3001VIEW_GODEPARTUREDATE') + this.$t('normal.error_checkTime2') + this.$t('label.PFANS3001VIEW_GOARRIVALDATE');
          } else {
            callback();
            this.errorgodeparturedate = '';
          }
        } else {
          callback();
          this.errorgodeparturedate = '';
        }
      };
      var validateGoarrivaldate = (rule, value, callback) => {
        if (this.form.goarrivaldate !== null && this.form.goarrivaldate !== '' && this.form.godeparturedate !== null && this.form.godeparturedate !== '') {
          if (moment(value).format('YYYY-MM-DD HH:mm:ss') <= moment(this.form.godeparturedate).format('YYYY-MM-DD HH:mm:ss')) {
            callback(new Error(this.$t('label.PFANS3001VIEW_GOARRIVALDATE') + this.$t('normal.error_checkTime1') + this.$t('label.PFANS3001VIEW_GODEPARTUREDATE')));
            this.errorgoarrivaldate = this.$t('label.PFANS3001VIEW_GOARRIVALDATE') + this.$t('normal.error_checkTime1') + this.$t('label.PFANS3001VIEW_GODEPARTUREDATE');
          } else {
            callback();
            this.errorgoarrivaldate = '';
          }
        } else {
          callback();
          this.errorgoarrivaldate = '';
        }
      };
      var validateRedeparturedate = (rule, value, callback) => {
        if (this.form.redeparturedate !== null && this.form.redeparturedate !== '') {
          if (this.form.rearrivaldate !== null && this.form.rearrivaldate !== '' && moment(value).format('YYYY-MM-DD HH:mm:ss') >= moment(this.form.rearrivaldate).format('YYYY-MM-DD HH:mm:ss')) {
            callback(new Error(this.$t('label.PFANS3001VIEW_GODEPARTUREDATE') + this.$t('normal.error_checkTime2') + this.$t('label.PFANS3001VIEW_GOARRIVALDATE')));
            this.errorredeparturedate = this.$t('label.PFANS3001VIEW_GODEPARTUREDATE') + this.$t('normal.error_checkTime2') + this.$t('label.PFANS3001VIEW_GOARRIVALDATE');
          } else if (this.form.goarrivaldate !== null && this.form.goarrivaldate !== '' && moment(value).format('YYYY-MM-DD HH:mm:ss') <= moment(this.form.goarrivaldate).format('YYYY-MM-DD HH:mm:ss')) {
            callback(new Error(this.$t('label.PFANS3001VIEW_GODEPARTUREDATE') + this.$t('normal.error_checkTime1') + this.$t('label.PFANS3001VIEW_GOARRIVALDATE')));
            this.errorredeparturedate = this.$t('label.PFANS3001VIEW_GODEPARTUREDATE') + this.$t('normal.error_checkTime2') + this.$t('label.PFANS3001VIEW_GOARRIVALDATE');
          } else {
            callback();
            this.errorredeparturedate = '';
          }
        } else {
          callback();
          this.errorredeparturedate = '';
        }
      };
      var validateRearrivaldate = (rule, value, callback) => {
        if (this.form.rearrivaldate !== null && this.form.rearrivaldate !== '') {
          if (this.form.redeparturedate !== null && this.form.redeparturedate !== '' && moment(value).format('YYYY-MM-DD HH:mm:ss') <= moment(this.form.redeparturedate).format('YYYY-MM-DD HH:mm:ss')) {
            callback(new Error(this.$t('label.PFANS3001VIEW_GOARRIVALDATE') + this.$t('normal.error_checkTime1') + this.$t('label.PFANS3001VIEW_GODEPARTUREDATE')));
            this.errorrearrivaldate = this.$t('label.PFANS3001VIEW_GOARRIVALDATE') + this.$t('normal.error_checkTime1') + this.$t('label.PFANS3001VIEW_GODEPARTUREDATE');
          } else {
            callback();
            this.errorrearrivaldate = '';
          }
        } else {
          callback();
          this.errorrearrivaldate = '';
        }
      };
      return {
        centerid: '',
        groupid: '',
        teamid: '',
        errorredeparturedate: '',
        errorrearrivaldate: '',
        errorgodeparturedate: '',
        errorgoarrivaldate: '',
        showForeign: '',
        showDomestic: '',
        loading: false,
        title: 'title.PFANS3001VIEW',
        error: '',
        selectType: 'Single',
        userlist: '',
        buttonList: [],
        regExp: [],
        code: 'PG001',
        multiple: false,
        relations: [],
        relations1: [],
        options: [
          {
            value: '0',
            label: this.$t('label.PFANS3001FORMVIEW_CORRESPONDING'),
          },
          {
            value: '1',
            label: this.$t('label.PFANS3001FORMVIEW_COMPLETED'),
          },
        ],
        acceptShow: false,
        form: {
          user_id: '',
          center_id: '',
          group_id: '',
          team_id: '',
          business_id: '',
          applicationdate: moment(new Date()).format("YYYY-MM-DD"),
          ticketstype: 'first',
          idcard: '',
          passport: '',
          effectivedate: '',
          romanid: '',
          extensionnumber: '',
          budgetnumber: '',
          mobilephone: '',
          trippoint: '',
          going: '',
          goairlinenumber: '',
          godeparturedate: '',
          goarrivaldate: '',
          back: '',
          reairlinenumber: '',
          redeparturedate: '',
          rearrivaldate: '',
          ticketingdate: '',
          tripstart: '',
          tripend: '',
          accept: '0',
          acceptstatus: '',
          findate: '',
        },
        rules: {
          user_id: [{
            required: true,
            validator: validateUserid,
            trigger: 'change',
          }],
          // add  fjl   start
          business_id: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS1013VIEW_RELATION'),
            trigger: 'change',
          }],
          applicationdate: [{
            required: true,
            message: this.$t("normal.error_09") + this.$t("label.application_date"),
            trigger: "change"
          }],
          // add  fjl   start
          romanid: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS3001FORMVIEW_ROMANID'),
            trigger: 'blur',
          }],
          extensionnumber: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS3001VIEW_EXTENSIONNUMBER'),
            trigger: 'blur',
          },],
          idcard: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS3001FORMVIEW_IDCARD'),
            trigger: 'blur',
          },
            {validator: validateIdCard, trigger: 'blur'}],
          mobilephone: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS3001VIEW_MOBILEPHONE'),
            trigger: 'blur',
          },
            // {validator: validateTel, trigger: 'blur'}
            ],
          passport: [{
            required: false,
            message: this.$t('normal.error_08') + this.$t('label.PFANS3001FORMVIEW_PASSPORT'),
            trigger: 'blur',
          }],
          effectivedate: [{
            required: false,
            message: this.$t('normal.error_08') + this.$t('label.PFANS3001FORMVIEW_EFFECTIVEDATE'),
            trigger: 'blur',
          }],
          trippoint: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS3001VIEW_TRIPPOINT'),
            trigger: 'blur',
          }],
          tripstart: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS3001FORMVIEW_TRIPSTART'),
            trigger: 'change',
          },
            {validator: validateTripstart, trigger: 'change'}],
          tripend: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS3001FORMVIEW_TRIPEND'),
            trigger: 'change',
          },
            {validator: validateTripend, trigger: 'change'}],
          going: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS3001VIEW_GOING'),
            trigger: 'blur',
          }],
          goairlinenumber: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS3001VIEW_GOAIRLINENUMBER'),
            trigger: 'blur',
          }],
          godeparturedate: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS3001VIEW_GODEPARTUREDATE'),
            trigger: 'change',
          },
            {validator: validateGodeparturedate, trigger: 'change'}],
          goarrivaldate: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS3001VIEW_GOARRIVALDATE'),
            trigger: 'change',
          },
            {validator: validateGoarrivaldate, trigger: 'change'}],
          back: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS3001VIEW_BACK'),
            trigger: 'blur',
          }],
          reairlinenumber: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS3001VIEW_GOAIRLINENUMBER'),
            trigger: 'blur',
          }],
          redeparturedate: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS3001VIEW_GODEPARTUREDATE'),
            trigger: 'change',
          },
            {validator: validateRedeparturedate, trigger: 'change'}],
          rearrivaldate: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS3001VIEW_GOARRIVALDATE'),
            trigger: 'change',
          },
            {validator: validateRearrivaldate, trigger: 'change'}],
        },
      };
    },
    created() {
      this.disable = this.$route.params.disabled;
      if (this.disable) {
        this.buttonList = [
          {
            key: 'save',
            name: 'button.save',
            icon: 'el-icon-check',
            disabled: false,
          },
        ];
      }
    },
    mounted() {
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS3001Store/getPfans3001One', {'tickets_id': this.$route.params._id})
          .then(response => {
            this.form = response;
              let rst = getOrgInfoByUserId(response.user_id);
              if(rst){
                  this.centerid = rst.centerNmae;
                  this.groupid= rst.groupNmae;
                  this.teamid= rst.teamNmae;
              }
            if (this.form.ticketstype === 'first') {
              this.showDomestic = true;
              this.showForeign = false;
              this.rules.idcard[0].required = true;
              this.rules.passport[0].required = false;
              this.rules.effectivedate[0].required = false;
            } else {
              this.showDomestic = false;
              this.showForeign = true;
              this.rules.idcard[0].required = false;
              this.rules.passport[0].required = true;
              this.rules.effectivedate[0].required = true;
            }
            this.userlist = this.form.user_id;
            if (this.form.status === '2') {
              this.disable = false;
            }
            if (this.form.status === '4') {
              this.disabled = true;
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
      }
      else {
        this.showDomestic = true;
        this.userlist = this.$store.getters.userinfo.userid;
        if (this.userlist !== null && this.userlist !== '' && this.userlist !== undefined) {
          let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
            if(rst) {
                this.centerid = rst.centerNmae;
                this.groupid = rst.groupNmae;
                this.teamid = rst.teamNmae;
                this.form.center_id = rst.centerId;
                this.form.group_id = rst.groupId;
                this.form.team_id = rst.teamId;
                // if(rst.groupId){
                //     this.form.budgetnumber = getOrgInfo(rst.groupId).encoding;
                // }
                let budgetunit = getUserInfo(this.$store.getters.userinfo.userid).userinfo.budgetunit
                if(budgetunit){
                    this.form.budgetnumber = budgetunit
                }
            }
          this.form.user_id = this.$store.getters.userinfo.userid;
        }
      }
      this.getBusOuter();
      //start(添加角色权限，只有总务的人才可以进行受理)  fjl 2020/04/08
      let role = getCurrentRole2();
      if(role === '0'){
        this.acceptShow = true;
      }
      //end(添加角色权限，只有总务的人才可以进行受理)  fjl 2020/04/08
    },
    methods: {
      //start(添加出差申请关联)  fjl 2020/04/08
      changebusiness(val) {
        this.form.business_id = val;
        if(this.form.ticketstype === 'first'){
          for (var i = 0; i < this.relations.length; i++) {
            if (this.relations[i].value === val) {
              let cityflg = getDictionaryInfo(this.relations[i].city);
              if(cityflg){
                this.form.trippoint = cityflg.value1;
              }
              this.form.tripstart = this.relations[i].startdate;
              this.form.tripend = this.relations[i].enddate;
            }
          }

        } else if(this.form.ticketstype === 'second'){
          for (var i = 0; i < this.relations1.length; i++) {
            if (this.relations1[i].value === val) {
              let regionflg = getDictionaryInfo(this.relations1[i].region);
              if(regionflg){
                this.form.trippoint = regionflg.value1;
              }
              this.form.tripstart = this.relations1[i].startdate;
              this.form.tripend = this.relations1[i].enddate;
            }
          }
        }
      },
      getBusOuter() {
        this.loading = true;
        this.$store
          .dispatch('PFANS1001Store/getBusiness')
          .then(response => {
            for (let i = 0; i < response.length; i++) {
              if (response[i].user_id === this.$store.getters.userinfo.userid) {
                if(response[i].businesstype === '0'){
                  this.relations1.push({
                    value: response[i].business_id,
                    label: this.$t('menu.PFANS1002') + '_' + moment(response[i].createon).format('YYYY-MM-DD'),
                    region: response[i].region,
                    startdate: response[i].startdate,
                    enddate: response[i].enddate,
                  });
                } else if(response[i].businesstype === '1'){
                  this.relations.push({
                    city: response[i].city,
                    value: response[i].business_id,
                    label: this.$t('menu.PFANS1035') + '_' + moment(response[i].createon).format('YYYY-MM-DD'),
                    // region: response[i].region,
                    startdate: response[i].startdate,
                    enddate: response[i].enddate,
                  });
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
      },
      //end(添加出差申请关联)  fjl 2020/04/08
      setdisabled(val){
        if(this.$route.params.disabled){
          this.disabled = val;
        }
      },
      handleClick(tab, event) {
        this.form.business_id = '';
        this.form.trippoint = '';
        this.form.tripstart = '';
        this.form.tripend = '';
        if (tab.name === 'first') {
          this.showDomestic = true;
          this.showForeign = false;
          this.rules.idcard[0].required = true;
          this.rules.passport[0].required = false;
          this.rules.effectivedate[0].required = false;
        } else {
          this.showForeign = true;
          this.showDomestic = false;
          this.rules.idcard[0].required = false;
          this.rules.passport[0].required = true;
          this.rules.effectivedate[0].required = true;
        }
        this.$refs["ruleForm"].clearValidate();
      },
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
        if (!this.form.user_id || this.form.user_id === ''  || val ==="undefined") {
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
            if(this.form.ticketstype === 'first'){
              this.form.passport = '';
              this.form.effectivedate = '';
            }else {
              this.form.idcard = '';
            }
            if (this.$route.params._id) {
              this.form.abnormalid = this.$route.params._id;
              this.loading = true;
              this.$store
                .dispatch('PFANS3001Store/updatePfans3001', this.form)
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
                .dispatch('PFANS3001Store/createPfans3001', this.form)
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
  };
</script>

<style scoped>

</style>
