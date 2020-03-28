<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" v-loading="loading" :title="title" @buttonClick="buttonClick"
                         ref="container">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="Form"
                 style="padding: 2vw">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('label.PFANS2018VIEW_WORKSHIFT')" prop="workshift_start">
                <el-time-select
                  :disabled="!disable"
                  :picker-options="{
                    start: '06:00',
                    step: '00:15',
                    end: '23:45',
                    maxTime:form.workshift_end}"
                  style="width:9.5vw"
                  v-model="form.workshift_start">
                </el-time-select>
             <span>~</span>
                <el-time-select
                  :disabled="!disable"
                  :picker-options="{
                      start: '00:00',
                      step: '00:15',
                      end: '23:45',
                       minTime: form.workshift_start,
                       maxTime:form.lunchbreak_start}"
                  style="width:9.5vw"
                  v-model="form.workshift_end">
                </el-time-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2018VIEW_LUNCHBREAK')" prop="lunchbreak_start">
                <el-time-select
                  :disabled="!disable"
                  :picker-options="{
                    start: '00:00',
                    step: '00:15',
                    end: '23:45',
                    minTime: form.workshift_end,
                    maxTime:form.lunchbreak_end}"
                  style="width:9.5vw"
                  v-model="form.lunchbreak_start"
                >
                </el-time-select>
              <span>~</span>
                <el-time-select
                  :disabled="!disable"
                  :picker-options="{
                    start: '00:00',
                    step: '00:15',
                    end: '23:45',
                    minTime: form.lunchbreak_start,
                    maxTime:form.closingtime_start}"
                  style="width:9.5vw"
                  v-model="form.lunchbreak_end">
                </el-time-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('label.PFANS2018VIEW_CLOSINGTIME')" prop="closingtime_start">
                <el-time-select
                  :disabled="!disable"
                  :picker-options="{
                    start: '00:00',
                    step: '00:15',
                    end: '23:45',
                    minTime: form.lunchbreak_end,
                    maxTime:form.closingtime_end}"
                  style="width:9.5vw"
                  v-model="form.closingtime_start">
                </el-time-select>
              <span>~</span>
                <el-time-select
                  :disabled="!disable"
                  :picker-options="{
                    start: '00:00',
                    step: '00:15',
                    end: '23:45',
                    minTime: form.closingtime_start,
                    maxTime:form.nightshift_start}"
                  style="width:9.5vw"
                  v-model="form.closingtime_end">
                </el-time-select>
              </el-form-item>
            </el-col>
            <el-col :span="3">
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('label.PFANS2018VIEW_COMPASSIONATELEAVE')" prop="compassionateleave">
                <el-input-number :disabled="!disable" :min="0" :max="9999" controls-position="right"
                                 :precision="2" :step="0.25" style="width:20vw"
                                 v-model="form.compassionateleave"></el-input-number>
                <span>{{$t('label.hours')}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('label.PFANS2018VIEW_LATEEARLYLEAVE')" prop="lateearlyleave">
                <el-input-number :disabled="!disable" :min="0" :precision="2" :max="9999" controls-position="right"
                                 :step="0.25" style="width:20vw" v-model="form.lateearlyleave"></el-input-number>
                <span>{{$t('label.hours')}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('label.PFANS2018VIEW_ABSENTEEISM')" prop="absenteeism">
                <el-input-number :disabled="!disable" :min="0" :precision="2" :max="9999" controls-position="right"
                                 :step="4" style="width:20vw" v-model="form.absenteeism"></el-input-number>
                <span>{{$t('label.hours')}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('label.PFANS2018VIEW_OVERTIME')" prop="overtime">
                <el-input-number :disabled="!disable" :min="0" :precision="2" :max="9999" controls-position="right"
                                 :step="0.25" style="width:20vw" v-model="form.overtime"></el-input-number>
                <span>{{$t('label.hours')}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('label.PFANS2018FORMVIEW_WEEKENDOVERTIME')" prop="weekendovertime">
                <el-input-number :disabled="!disable" :min="0" :precision="2" :step="8" :max="9999"
                                 controls-position="right"
                                  style="width:20vw"
                                 v-model="form.weekendovertime"></el-input-number>
                <span>{{$t('label.hours')}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('label.PFANS2018VIEW_WEEKDAYSOVERTIME')" prop="weekdaysovertime">
                <el-input-number :disabled="!disable" :min="0" :max="9999" controls-position="right"
                                 :precision="2" :step="0.1" style="width:20vw"
                                 v-model="form.weekdaysovertime"></el-input-number>
                <span>{{$t('label.hours')}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('label.PFANS2018FORMVIEW_DEADLINE')" prop="deadline">
                <el-time-select
                  :disabled="!disable"
                  :picker-options="{
                    start: '00:00',
                    step: '00:15',
                    end: '23:45'}"
                  style="width:20vw"
                  v-model="form.deadline">
                </el-time-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('label.PFANS2018FORMVIEW_ABNORMALDEADLINE')" prop="abnormaldeadline">
                <el-input-number :disabled="!disable" :max="31" :min="1" :step="1" controls-position="right"
                                 style="width:9.5vw" v-model="form.abnormaldeadline"></el-input-number>
                <span>{{$t('label.day')}}</span>
                <el-time-select
                  :disabled="!disable"
                  :picker-options="{
                    start: '00:00',
                    step: '00:15',
                    end: '23:45'}"
                  style="width:9.5vw"
                  v-model="form.abnormaldeadlinetime">
                </el-time-select>
                <span>{{$t('label.hour')}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('label.PFANS2018FORMVIEW_TRANSFINITEREMINDER')" prop="transfinitereminder">
                <el-input-number :disabled="!disable" :min="0" :precision="2" :max="9999" controls-position="right"
                                 :step="1"  style="width:20vw"
                                 v-model="form.transfinitereminder"></el-input-number>
                <span>{{$t('label.hours')}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item :label="$t('label.PFANS2018VIEW_WORKINGHOURS')" prop="workinghours">
                  <el-input-number :disabled="!disable" :min="0" :max="9999" controls-position="right"
                                   :precision="2" :step="0.1" style="width:20vw"
                                   v-model="form.workinghours"></el-input-number>
                  <span>{{$t('label.hours')}}</span>
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
  import PFANS2018View from './PFANS2018View';
  import {Message} from 'element-ui';
  import moment from 'moment';
  export default {
    name: 'PFANS2018FormView',
    components: {
      EasyNormalContainer,
      PFANS2018View,
    },
    data() {
      var validateAbnormaldeadlinetime = (rule, value, callback) => {
        if (this.form.abnormaldeadlinetime !== null && this.form.abnormaldeadlinetime !== '') {
          callback();
        } else {
          callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS2018FORMVIEW_ABNORMALDEADLINE')));
        }
      };
      var validateUpstart = (rule, value, callback) => {
        if (this.form.workshift_start !== null && this.form.workshift_start !== '' && this.form.workshift_end !== null && this.form.workshift_end !== '') {
          if (value >= this.form.workshift_end) {
            callback(new Error(this.$t('label.PFANS2018VIEW_WORKSHIFTSTART') + this.$t('normal.error_checkTime2') + this.$t('label.PFANS2018VIEW_WORKSHIFTEND')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var validateWorkshift_end = (rule, value, callback) => {
        if (this.form.workshift_end !== null && this.form.workshift_end !== '') {
          if (value <= this.form.workshift_start) {
            callback(new Error(this.$t('label.PFANS2018VIEW_WORKSHIFTEND') + this.$t('normal.error_checkTime1') + this.$t('label.PFANS2018VIEW_WORKSHIFTSTART')));
          } else if (this.form.closingtime_start !== null && this.form.closingtime_start !== '' && value >= this.form.closingtime_start) {
            callback(new Error(this.$t('label.PFANS2018VIEW_WORKSHIFTEND') + this.$t('normal.error_checkTime2') + this.$t('label.PFANS2018VIEW_CLOSINGTIMESTART')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var validateDownstart = (rule, value, callback) => {
        if (this.form.closingtime_start !== null && this.form.closingtime_start !== '') {
          if (this.form.closingtime_end !== null && this.form.closingtime_end !== '' && value >= this.form.closingtime_end) {
            callback(new Error(this.$t('label.PFANS2018VIEW_CLOSINGTIMESTART') + this.$t('normal.error_checkTime2') + this.$t('label.PFANS2018VIEW_CLOSINGTIMEEND')));
          } else if (this.form.workshift_end !== null && this.form.workshift_end !== '' && value <= this.form.workshift_end) {
            callback(new Error(this.$t('label.PFANS2018VIEW_CLOSINGTIMESTART') + this.$t('normal.error_checkTime1') + this.$t('label.PFANS2018VIEW_WORKSHIFTEND')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var validateClosingtime_end = (rule, value, callback) => {
        if (this.form.closingtime_end !== null && this.form.closingtime_end !== '') {
          if (this.form.closingtime_start !== null && this.form.closingtime_start !== '' && value <= this.form.closingtime_start) {
            callback(new Error(this.$t('label.PFANS2018VIEW_CLOSINGTIMEEND') + this.$t('normal.error_checkTime1') + this.$t('label.PFANS2018VIEW_CLOSINGTIMESTART')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var validateLunchstart = (rule, value, callback) => {
        if (this.form.lunchbreak_start !== null && this.form.lunchbreak_start !== '') {
          if (this.form.lunchbreak_end !== null && this.form.lunchbreak_end !== '' && value >= this.form.lunchbreak_end) {
            callback(new Error(this.$t('label.PFANS2018VIEW_LUNCHBREAKSTART') + this.$t('normal.error_checkTime2') + this.$t('label.PFANS2018VIEW_LUNCHBREAKEND')));
          } else if (this.form.workshift_end !== null && this.form.workshift_end !== '' && value < this.form.workshift_end) {
            callback(new Error(this.$t('label.PFANS2018VIEW_LUNCHBREAKSTART') + this.$t('normal.error_checkTime1') + this.$t('label.PFANS2018VIEW_WORKSHIFTEND')));
          } else if (this.form.closingtime_start !== null && this.form.closingtime_start !== '' && value > this.form.closingtime_start) {
            callback(new Error(this.$t('label.PFANS2018VIEW_LUNCHBREAKSTART') + this.$t('normal.error_checkTime2') + this.$t('label.PFANS2018VIEW_CLOSINGTIMESTART')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var validateLunchbreak_end = (rule, value, callback) => {
        if (this.form.lunchbreak_end !== null && this.form.lunchbreak_end !== '') {
          if (this.form.lunchbreak_start !== null && this.form.lunchbreak_start !== '' && value <= this.form.lunchbreak_start) {
            callback(new Error(this.$t('label.PFANS2018VIEW_LUNCHBREAKEND') + this.$t('normal.error_checkTime1') + this.$t('label.PFANS2018VIEW_LUNCHBREAKSTART')));
          } else if (this.form.closingtime_start !== null && this.form.closingtime_start !== '' && value > this.form.closingtime_start) {
            callback(new Error(this.$t('label.PFANS2018VIEW_LUNCHBREAKEND') + this.$t('normal.error_checkTime2') + this.$t('label.PFANS2018VIEW_CLOSINGTIMESTART')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      return {
        loading: false,
        title: 'title.PFANS2018VIEW',
        form: {
          workshift_start: '',
          workshift_end: '',
          closingtime_start: '',
          closingtime_end: '',
          lunchbreak_start: '',
          lunchbreak_end: '',
          compassionateleave: '',
          lateearlyleave: '',
          absenteeism: '',
          overtime: '',
          weekendovertime: '',
          weekdaysovertime: '',
          deadline: '',
          abnormaldeadline: '',
          abnormaldeadlinetime: '',
          transfinitereminder: '',
          workinghours: '',
        },
        buttonList: [],
        disable: true,
        rules: {
          workshift_start: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS2018VIEW_WORKSHIFT'),
            trigger: 'change',
          },
            {validator: validateUpstart, trigger: 'change'}],
          workshift_end: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS2018VIEW_WORKSHIFT'),
            trigger: 'change',
          },
            {validator: validateWorkshift_end, trigger: 'change'}],
          closingtime_start: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS2018VIEW_CLOSINGTIME'),
            trigger: 'change',
          },
            {validator: validateDownstart, trigger: 'change'}],
          closingtime_end: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS2018VIEW_CLOSINGTIME'),
            trigger: 'change',
          },
            {validator: validateClosingtime_end, trigger: 'change'}],
          lunchbreak_start: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS2018VIEW_LUNCHBREAK'),
            trigger: 'change',
          },
            {validator: validateLunchstart, trigger: 'change'}],
          lunchbreak_end: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS2018VIEW_LUNCHBREAK'),
            trigger: 'change',
          },
            {validator: validateLunchbreak_end, trigger: 'change'},
          ],
          compassionateleave: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS2018VIEW_COMPASSIONATELEAVE'),
            trigger: 'change',
          }],
          lateearlyleave: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS2018VIEW_LATEEARLYLEAVE'),
            trigger: 'change',
          }],
          absenteeism: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS2018VIEW_ABSENTEEISM'),
            trigger: 'change',
          }],
          overtime: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS2018VIEW_OVERTIME'),
            trigger: 'change',
          }],
          weekdaysovertime: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS2018VIEW_WEEKDAYSOVERTIME'),
            trigger: 'change',
          }],
          weekendovertime: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS2018FORMVIEW_WEEKENDOVERTIME'),
            trigger: 'change',
          }],
          deadline: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS2018FORMVIEW_DEADLINE'),
            trigger: 'change',
          }],
          abnormaldeadline: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS2018FORMVIEW_ABNORMALDEADLINE'),
            trigger: 'change',
          },
            {validator: validateAbnormaldeadlinetime, trigger: 'change'}],
          transfinitereminder: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS2018FORMVIEW_TRANSFINITEREMINDER'),
            trigger: 'change',
          }],
          workinghours: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS2018VIEW_WORKINGHOURS'),
            trigger: 'change',
          }]
        },
      };
    },
    mounted() {

      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS2018Store/getPfans2018One', {'attendancesetting_id': this.$route.params._id})
          .then(response => {
            this.form = response;
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
      buttonClick(val) {
        this.$refs['Form'].validate(valid => {
          if (valid) {
            if (this.$route.params._id) {
              this.form.abnormalid = this.$route.params._id;
              this.loading = true;
              this.$store
                .dispatch('PFANS2018Store/updatePfans2018', this.form)
                .then(response => {
                  this.data = response;
                  this.loading = false;
                  Message({
                    message: this.$t('normal.success_02'),
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

            } else {
              this.loading = true;
              this.$store
                .dispatch('PFANS2018Store/createPfans2018', this.form)
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
