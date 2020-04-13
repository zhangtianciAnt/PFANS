<template>
  <div style="min-height: 100%">
    <EasyNormalContainer ref="container" :title="title" @buttonClick="buttonClick" :buttonList="buttonList"
                         @disabled="setdisabled"
                         v-loading="loading">
      <div slot="customize" style="margin-top: 4rem;">
        <el-form ref="form" label-width="8vw" label-position="top" style="padding: 2vw">
          <el-form :model="companyform" ref="companyform"
                   class="demo-ruleForm" :rules="rules">
            <el-container>
              <el-aside style="width: 58%;height: 39.3rem">
                <el-tabs type="border-card">
                  <el-row>
                    <el-col :span="12">
                      <el-form-item :label="$t('label.PFANS5008VIEW_RIQI')" prop="log_date">
                        <el-date-picker
                          @change="clickdata"
                          v-model="companyform.log_date"
                          :disabled="!disable"
                          type="date"
                          style="width:16vw"
                        >
                        </el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item :label="$t('label.PFANS5008FORMVIEW_SC')" prop="time_start">
                        <el-input-number v-model="companyform.time_start" :disabled="!disable" controls-position="right"
                                         :precision="2" :step="0.5" :min="0" :max="24" style="width: 16vw"
                        ></el-input-number>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <div v-show="isShow">
                      <el-col :span="12">
                        <el-form-item :label="$t('label.PFANS5004VIEW_PROJECTNAMW')">
                          <el-select v-model="companyform.project_id" :disabled="!disable" style="width: 16vw" clearable
                                     @change="getProject">
                            <el-option
                              v-for="item in optionsdata"
                              :key="item.value"
                              :label="item.lable"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item :label="$t('label.PFANS5008VIEW_PROGRAMNAME')" style="width:17vw"
                                      prop="project_name">
                        </el-form-item>
                        {{companyform.project_name}}
                      </el-col>
                    </div>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item :label="$t('label.PFANS5008VIEW_JDJOBS')" style="width:17vw" prop="work_phase">
                        <dicselect
                          :disabled="!disable"
                          :code="code2"
                          :multiple="multiple2"
                          :data="companyform.work_phase"
                          @change="JDjobs"
                          style="width: 16vw">
                        </dicselect>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item :label="$t('label.PFANS5008VIEW_XWXF')" style="width:  17vw"
                                    prop="behavior_breakdown">
                        <dicselect
                          :disabled="!disable"
                          :code="code3"
                          :multiple="multiple3"
                          :data="companyform.behavior_breakdown"
                          @change="XWXF"
                          style="width: 16vw">
                        </dicselect>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="WBS_ID" style="width:  17vw" prop="wbs_id">
                        <el-input
                          :rows="2"
                          v-model="companyform.wbs_id" :disabled="!disable"
                          style="width: 16vw">
                        </el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-form-item :label="$t('label.PFANS5008VIEW_GZBZ')" style="width: 81.8%" prop="work_memo">
                    <el-input
                      type="textarea"
                      :rows="3"
                      v-model="companyform.work_memo" :disabled="!disable"
                      style="width: 36vw">
                    </el-input>
                  </el-form-item>
                  <div align="center" v-show = 'divfalse'>
                    <span v-show="Riqickeck"> {{ this.companyform.log_date | moment('YYYY-MM-DD')}}</span>
                    <span>{{$t('label.PFANS5008FORMVIEW_JL')}}</span>
                  </div>
                  <el-table
                    :data="DataList"
                    v-show="xsTable"
                    @row-click="rowclick"
                  >
                    <el-table-column
                      show-overflow-tooltip
                      prop="project_name"
                      :label="$t('label.PFANS5008FORMVIEW_GZPROGRAM')"
                      width="130px">
                    </el-table-column>
                    <el-table-column
                      prop="start_time"
                      :label="$t('label.PFANS5008FORMVIEW_SC')"
                      width="120px">
                    </el-table-column>
                    <el-table-column
                      show-overflow-tooltip
                      prop="work_phase"
                      :label="$t('label.PFANS5008VIEW_JDJOBS')"
                      width="140px">
                    </el-table-column>
                    <el-table-column
                      show-overflow-tooltip
                      prop="behavior_breakdown"
                      :label="$t('label.PFANS5008VIEW_XWXF')"
                      width="100px">
                    </el-table-column>
                  </el-table>
                </el-tabs>
              </el-aside>
              <el-tabs type="border-card" style="width: 400px">
                <el-main>
                  <el-calendar v-model="companyform.log_date" :disabled="!disable" class="appManage">
                    <template
                      slot="dateCell"
                      slot-scope="{date, data}">
                      <p>
                        {{ data.day.split('-').slice(2).join('-') }}
                      </p>
                    </template>
                  </el-calendar>
                </el-main>
              </el-tabs>
            </el-container>
          </el-form>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>
<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import dicselect from '../../../components/dicselect.vue';
  import PFANS5008View from '../PFANS5008/PFANS5008View.vue';
  import {Message} from 'element-ui';
  import moment from 'moment';
  import {getDictionaryInfo} from '@/utils/customize';

  export default {
    name: 'PFANS5008FormView',
    components: {
      EasyNormalContainer,
      dicselect,
      PFANS5008View,
    },
    data() {
      return {
        divfalse: false,
        checktimelength: '',
        checkLenth: '',
        checkList: [],
        checkdata: '',
        loading: false,
        DataList: [{
          start_time: '',
          work_phase: '',
          behavior_breakdown: '',
          project_name: '',
        }],
        optionsdata: [{value: 'PP024001', lable: this.$t('label.PFANS5008FORMVIEW_PROJECTGTXM')}],
        optionsdate: [],
        buttonList: [],
        disable: false,
        PFANS5008: this.$route.params.PFANS5008,
        companyform: {
          project_id: '',
          project_name: '',
          time_start: '',
          time_end: '',
          log_date: '',
          work_phase: '',
          behavior_breakdown: '',
          work_memo: '',
          has_project: '',
          wbs_id: '',
        },
        User_id: '',
        Riqickeck: true,
        xsTable: false,
        program: false,
        code2: 'PP008',
        multiple2: false,
        data2: '',
        data: '',
        code3: '',
        multiple3: false,
        data3: '',
        activeName: 'first',
        isShow: true,
        title: 'title.PFANS5008',
        rules: {
          log_date: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS5008VIEW_RIQI'),
            trigger: 'blur',
          },
          ],
        },
      };
    },
    created() {
      //add -ws - 工作记录table表格编辑时根据编辑人id获取数据，新建时根据登录人id获取数据
      if(this.$route.params._createby!=undefined){
        this.User_id = this.$route.params._createby;
      }else{
        if (this.$store.getters.userinfo.userid !== undefined) {
          this.User_id = this.$store.getters.userinfo.userid;
        } else {
          this.User_id = this.$store.getters.useraccount._id;
        }
      }
      //add -ws - 工作记录table表格编辑时根据编辑人id获取数据，新建时根据登录人id获取数据
      this.companyform.log_date = this.$route.params.date;
      this.buttonList = [
        {
          key: 'btnSave',
          name: 'button.confirm',
          disabled: false,
        },
        {
          key: 'mingtian',
          name: 'button.mingtian',
          disabled: false,
        },
      ];
      this.loading = true;

      this.$store
        .dispatch('PFANS5008Store/getCheckList', {})
        .then(response => {
          let datalist = [];
          for (let k = 0; k < response.length; k++) {
            if (this.User_id === response[k].createby) {
              this.code3 = '';
              if (this.companyform.log_date === moment(response[k].log_date).format('YYYY-MM-DD')) {
                if (response[k].work_phase === 'PP008001') {
                  this.code3 = 'PP009';
                  let letErrortype = getDictionaryInfo(response[k].behavior_breakdown);
                  if (letErrortype != null) {
                    response[k].behavior_breakdown = letErrortype.code;
                  }
                } else if (response[k].work_phase === 'PP008002') {
                  this.code3 = 'PP010';
                  let letErrortype = getDictionaryInfo(response[k].behavior_breakdown);
                  if (letErrortype != null) {
                    response[k].behavior_breakdown = letErrortype.code;
                  }
                } else if (response[k].work_phase === 'PP008003') {
                  this.code3 = 'PP025';
                  let letErrortype = getDictionaryInfo(response[k].behavior_breakdown);
                  if (letErrortype != null) {
                    response[k].behavior_breakdown = letErrortype.code;
                  }
                } else if (response[k].work_phase === 'PP008004') {
                  this.code3 = 'PP011';
                  let letErrortype = getDictionaryInfo(response[k].behavior_breakdown);
                  if (letErrortype != null) {
                    response[k].behavior_breakdown = letErrortype.code;
                  }
                }
                if (response[k].work_phase !== null && response[k].work_phase !== '') {
                  let letErrortype = getDictionaryInfo(response[k].work_phase);
                  if (letErrortype != null) {
                    response[k].work_phase = letErrortype.value1;
                  }
                }
                let obj = {};
                obj.start_time = response[k].time_start;
                obj.work_phase = response[k].work_phase;
                let letErrortypecheck = getDictionaryInfo(response[k].behavior_breakdown);
                if (letErrortypecheck != null) {
                  obj.behavior_breakdown = letErrortypecheck.value1;
                }
                obj.project_name = response[k].project_name;
                this.divfalse = true;
                this.xsTable = true;
                obj.logmanagementid = response[k].logmanagement_id;
                datalist[k] = obj;
                this.DataList = datalist;
                this.divfalse = true;
                this.xsTable = true;
              }
            }
          }
        });
      this.loading = false;
      this.disable = this.$route.params.disabled;
      let c = this.$route.params._id;
      if (c === '') {
        if (this.disable) {
          this.companyform.log_date = new Date();
          this.buttonList = [
            {
              key: 'btnSave',
              name: 'button.confirm',
              disabled: false,
            },
            {
              key: 'mingtian',
              name: 'button.mingtian',
              disabled: false,
            },
          ];
          this.loading = true;
          this.$store
            .dispatch('PFANS5008Store/getCheckList', {})
            .then(response => {
              const data = [];
              let datalist = [];
              for (let k = 0; k < response.length; k++) {
                if (this.User_id === response[k].createby) {
                  this.code3 = '';
                  if (response[k].has_project === '01') {
                    if (moment(response[k].log_date).format('YYYY-MM-DD') === moment(new Date()).format('YYYY-MM-DD')) {
                      if (response[k].work_phase === 'PP008001') {
                        this.code3 = 'PP009';
                        let letErrortype = getDictionaryInfo(response[k].behavior_breakdown);
                        if (letErrortype != null) {
                          response[k].behavior_breakdown = letErrortype.code;
                        }
                      } else if (response[k].work_phase === 'PP008002') {
                        this.code3 = 'PP010';
                        let letErrortype = getDictionaryInfo(response[k].behavior_breakdown);
                        if (letErrortype != null) {
                          response[k].behavior_breakdown = letErrortype.code;
                        }
                      } else if (response[k].work_phase === 'PP008003') {
                        this.code3 = 'PP025';
                        let letErrortype = getDictionaryInfo(response[k].behavior_breakdown);
                        if (letErrortype != null) {
                          response[k].behavior_breakdown = letErrortype.code;
                        }
                      } else if (response[k].work_phase === 'PP008004') {
                        this.code3 = 'PP011';
                        let letErrortype = getDictionaryInfo(response[k].behavior_breakdown);
                        if (letErrortype != null) {
                          response[k].behavior_breakdown = letErrortype.code;
                        }
                      }
                      if (response[k].work_phase !== null && response[k].work_phase !== '') {
                        let letErrortype = getDictionaryInfo(response[k].work_phase);
                        if (letErrortype != null) {
                          response[k].work_phase = letErrortype.value1;
                        }
                      }
                      let obj = {};
                      obj.start_time = response[k].time_start;
                      obj.work_phase = response[k].work_phase;
                      let letErrortypecheck = getDictionaryInfo(response[k].behavior_breakdown);
                      if (letErrortypecheck != null) {
                        obj.behavior_breakdown = letErrortypecheck.value1;
                      }
                      obj.project_name = response[k].project_name;
                      this.divfalse = true;
                      this.xsTable = true;
                      obj.logmanagementid = response[k].logmanagement_id;
                      datalist[k] = obj;
                      this.divfalse = true;
                      this.xsTable = true;
                    }
                  }
                }
              }
              this.DataList = datalist;
            });
        }
      }
    },
    mounted() {
      this.getCompanyProjectList();
      this.checkgetAttendancelist();
      if (this.companyform.project_id) {
        this.companyform.work_phase = '';
      }
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS5008Store/getDataOne', {'logmanagement_id': this.$route.params._id})
          .then(response => {
            this.data = response;
            this.checktimelength = response.time_start;
            if (response.confirmstatus == '1') {
              this.buttonList[0].disabled = true;
              this.buttonList[1].disabled = true;
              this.disable = false;
            } else {
              this.buttonList[0].disabled = false;
              this.buttonList[1].disabled = false;
              this.disable = true;
            }
            if (this.data.has_project === '01') {
              this.code3 = '';
              if (this.data.work_phase === 'PP008001') {
                this.code3 = 'PP009';
                let letErrortype = getDictionaryInfo(this.data.behavior_breakdown);
                if (letErrortype != null) {
                  this.data.behavior_breakdown = letErrortype.code;
                }
              } else if (this.data.work_phase === 'PP008002') {
                this.code3 = 'PP010';
                let letErrortype = getDictionaryInfo(this.data.behavior_breakdown);
                if (letErrortype != null) {
                  this.data.behavior_breakdown = letErrortype.code;
                }
              } else if (this.data.work_phase === 'PP008003') {
                this.code3 = 'PP025';
                let letErrortype = getDictionaryInfo(this.data.behavior_breakdown);
                if (letErrortype != null) {
                  this.data.behavior_breakdown = letErrortype.code;
                }
              } else if (this.data.work_phase === 'PP008004') {
                this.code3 = 'PP011';
                let letErrortype = getDictionaryInfo(this.data.behavior_breakdown);
                if (letErrortype != null) {
                  this.data.behavior_breakdown = letErrortype.code;
                }
              }
              this.companyform = this.data;

              this.$store
                .dispatch('PFANS5008Store/getCheckList', {})
                .then(response => {
                  let datalist = [];
                  for (let k = 0; k < response.length; k++) {
                    if (this.User_id === response[k].createby) {
                      this.code3 = '';
                      if (moment(this.data.log_date).format('YYYY-MM-DD') === moment(response[k].log_date).format('YYYY-MM-DD')) {
                        if (response[k].work_phase === 'PP008001') {
                          this.code3 = 'PP009';
                          let letErrortype = getDictionaryInfo(response[k].behavior_breakdown);
                          if (letErrortype != null) {
                            response[k].behavior_breakdown = letErrortype.code;
                          }
                        } else if (response[k].work_phase === 'PP008002') {
                          this.code3 = 'PP010';
                          let letErrortype = getDictionaryInfo(response[k].behavior_breakdown);
                          if (letErrortype != null) {
                            response[k].behavior_breakdown = letErrortype.code;
                          }
                        } else if (response[k].work_phase === 'PP008003') {
                          this.code3 = 'PP025';
                          let letErrortype = getDictionaryInfo(response[k].behavior_breakdown);
                          if (letErrortype != null) {
                            response[k].behavior_breakdown = letErrortype.code;
                          }
                        } else if (response[k].work_phase === 'PP008004') {
                          this.code3 = 'PP011';
                          let letErrortype = getDictionaryInfo(response[k].behavior_breakdown);
                          if (letErrortype != null) {
                            response[k].behavior_breakdown = letErrortype.code;
                          }
                        }
                        if (response[k].work_phase !== null && response[k].work_phase !== '') {
                          let letErrortype = getDictionaryInfo(response[k].work_phase);
                          if (letErrortype != null) {
                            response[k].work_phase = letErrortype.value1;
                          }
                        }
                        let obj = {};
                        obj.start_time = response[k].time_start;
                        obj.work_phase = response[k].work_phase;
                        let letErrortypecheck = getDictionaryInfo(response[k].behavior_breakdown);
                        if (letErrortypecheck != null) {
                          obj.behavior_breakdown = letErrortypecheck.value1;
                        }
                        obj.project_name = response[k].project_name;
                        this.divfalse = true;
                        this.xsTable = true;
                        obj.logmanagementid = response[k].logmanagement_id;
                        datalist[k] = obj;
                        this.divfalse = true;
                        this.xsTable = true;
                      }
                    }
                  }
                  this.DataList = datalist;
                });
            } else if (this.data.has_project === '02') {
              this.code3 = '';
              if (this.data.work_phase === 'PP008001') {
                this.code3 = 'PP009';
                let letErrortype = getDictionaryInfo(this.data.behavior_breakdown);
                if (letErrortype != null) {
                  this.data.behavior_breakdown = letErrortype.code;
                }
              } else if (this.data.work_phase === 'PP008002') {
                this.code3 = 'PP010';
                let letErrortype = getDictionaryInfo(this.data.behavior_breakdown);
                if (letErrortype != null) {
                  this.data.behavior_breakdown = letErrortype.code;
                }
              } else if (this.data.work_phase === 'PP008003') {
                this.code3 = 'PP025';
                let letErrortype = getDictionaryInfo(this.data.behavior_breakdown);
                if (letErrortype != null) {
                  this.data.behavior_breakdown = letErrortype.code;
                }
              } else if (this.data.work_phase === 'PP008004') {
                this.code3 = 'PP011';
                let letErrortype = getDictionaryInfo(this.data.behavior_breakdown);
                if (letErrortype != null) {
                  this.data.behavior_breakdown = letErrortype.code;
                }
              }
              this.companyform = this.data;

              this.$store
                .dispatch('PFANS5008Store/getCheckList', {})
                .then(response => {
                  let datalist = [];
                  for (let k = 0; k < response.length; k++) {
                    if (this.User_id === response[k].createby) {
                      this.code3 = '';
                      if (moment(this.data.log_date).format('YYYY-MM-DD') === moment(response[k].log_date).format('YYYY-MM-DD')) {
                        if (response[k].work_phase === 'PP008001') {
                          this.code3 = 'PP009';
                          let letErrortype = getDictionaryInfo(response[k].behavior_breakdown);
                          if (letErrortype != null) {
                            response[k].behavior_breakdown = letErrortype.code;
                          }
                        } else if (response[k].work_phase === 'PP008002') {
                          this.code3 = 'PP010';
                          let letErrortype = getDictionaryInfo(response[k].behavior_breakdown);
                          if (letErrortype != null) {
                            response[k].behavior_breakdown = letErrortype.code;
                          }
                        } else if (response[k].work_phase === 'PP008003') {
                          this.code3 = 'PP025';
                          let letErrortype = getDictionaryInfo(response[k].behavior_breakdown);
                          if (letErrortype != null) {
                            response[k].behavior_breakdown = letErrortype.code;
                          }
                        } else if (response[k].work_phase === 'PP008004') {
                          this.code3 = 'PP011';
                          let letErrortype = getDictionaryInfo(response[k].behavior_breakdown);
                          if (letErrortype != null) {
                            response[k].behavior_breakdown = letErrortype.code;
                          }
                        }
                        if (response[k].work_phase !== null && response[k].work_phase !== '') {
                          let letErrortype = getDictionaryInfo(response[k].work_phase);
                          if (letErrortype != null) {
                            response[k].work_phase = letErrortype.value1;
                          }
                        }
                        let obj = {};
                        obj.start_time = response[k].time_start;
                        obj.work_phase = response[k].work_phase;
                        let letErrortypecheck = getDictionaryInfo(response[k].behavior_breakdown);
                        if (letErrortypecheck != null) {
                          obj.behavior_breakdown = letErrortypecheck.value1;
                        }
                        obj.project_name = response[k].project_name;
                        this.divfalse = true;
                        this.xsTable = true;
                        obj.logmanagementid = response[k].logmanagement_id;
                        datalist[k] = obj;
                        this.divfalse = true;
                        this.xsTable = true;
                      }
                    }
                  }
                  this.DataList = datalist;
                });

            }
            this.loading = false;
          });
      }
    },
    methods: {
      getCompanyProjectList() {
        this.loading = true;
        this.$store
          .dispatch('PFANS5009Store/getSiteList3', {})
          .then(response => {
            for (let i = 0; i < response.length; i++) {
              this.optionsdata.push({
                value: response[i].companyprojects_id,
                lable: response[i].project_name,
              });
            }

            this.$store
              .dispatch('PFANS5013Store/getMyConProject', {})
              .then(response => {
                for (let i = 0; i < response.length; i++) {
                  this.optionsdata.push({
                    value: response[i].comproject_id,
                    lable: response[i].project_name,
                  });
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
      checklistgettable() {
        this.$store
          .dispatch('PFANS5008Store/getCheckList', {})
          .then(response => {
            let checklenth = 0;
            for (let j = 0; j < response.length; j++) {
              if (this.User_id === response[j].createby) {
                if (moment(response[j].log_date).format('YYYY-MM-DD') === moment(this.companyform.log_date).format('YYYY-MM-DD')) {
                  checklenth += parseFloat(response[j].time_start);
                }
              }
            }
            this.checkLenth = checklenth;
          });
      },
      checkgetAttendancelist() {
        let parameter = {
          user_id: this.$store.getters.userinfo.userid,
          years: moment(new Date()).format('YYYY'),
          months: moment(new Date()).format('MM'),
        };
        this.loading = true;
        this.$store
          .dispatch('PFANS2010Store/getAttendancelist', parameter)
          .then(response => {
            this.checkList = response;
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
      getAttendancelist() {
        let timelenthcheck = 0;
        for (let j = 0; j < this.checkList.length; j++) {
          if (moment(this.checkList[j].dates).format('YYYY-MM-DD') === moment(this.companyform.log_date).format('YYYY-MM-DD')) {
            if (this.checkList[j].absenteeism === null || this.checkList[j].absenteeism === '') {
              this.checkList[j].absenteeism = this.checkList[j].tabsenteeism;
            }
            if (this.checkList[j].normal === null || this.checkList[j].normal === '') {
              this.checkList[j].normal = 0;
            }
            if (this.checkList[j].ordinaryindustry === null || this.checkList[j].ordinaryindustry === '') {
              this.checkList[j].ordinaryindustry = 0;
            }
            if (this.checkList[j].weekendindustry === null || this.checkList[j].weekendindustry === '') {
              this.checkList[j].weekendindustry = 0;
            }
            if (this.checkList[j].statutoryresidue === null || this.checkList[j].statutoryresidue === '') {
              this.checkList[j].statutoryresidue = 0;
            }
            if (this.checkList[j].annualrestday === null || this.checkList[j].annualrestday === '') {
              this.checkList[j].annualrestday = 0;
            }
            if (this.checkList[j].specialday === null || this.checkList[j].specialday === '') {
              this.checkList[j].specialday = 0;
            }
            if (this.checkList[j].youthday === null || this.checkList[j].youthday === '') {
              this.checkList[j].youthday = 0;
            }
            if (this.checkList[j].womensday === null || this.checkList[j].womensday === '') {
              this.checkList[j].womensday = 0;
            }
            if (this.checkList[j].nursingleave === null || this.checkList[j].nursingleave === '') {
              this.checkList[j].nursingleave = 0;
            }
            if (this.checkList[j].absenteeism === null || this.checkList[j].absenteeism === '') {
              this.checkList[j].absenteeism = 0;
            }
            timelenthcheck = parseFloat(this.checkList[j].normal) + parseFloat(this.checkList[j].ordinaryindustry) + parseFloat(this.checkList[j].weekendindustry) + parseFloat(this.checkList[j].statutoryresidue) + parseFloat(this.checkList[j].annualrestday) + parseFloat(this.checkList[j].specialday)
              + parseFloat(this.checkList[j].youthday) + parseFloat(this.checkList[j].womensday) - parseFloat(this.checkList[j].absenteeism);
            this.checkdata = timelenthcheck;
          }
        }
      },
      setdisabled(val) {
        if (this.$route.params.disabled) {
          this.disabled = val;
        }
      },
      getProject(val) {
        if (val) {
          this.companyform.work_phase = '';
          this.code3 = '0';
        }
        for (let item of this.optionsdata) {
          if (item.value === val) {
            this.companyform.project_name = item.lable;
          }
        }
        this.companyform.project_id = val;
        if (val != 'PP024001') {
          this.form = {};
          this.form.log_date = moment(this.companyform.log_date).format('YYYY-MM-DD');
          this.loading = true;
          this.$store
            .dispatch('PFANS5008Store/getListcheck', this.companyform)
            .then(response => {
              this.$store
                .dispatch('PFANS5008Store/CheckList', {})
                .then(response => {
                  for (let i = 0; i < response.length; i++) {
                    if (val === response[i].companyprojects_id) {
                      if (moment(this.companyform.log_date).format('YYYY-MM-DD') < moment(response[i].admissiontime).format('YYYY-MM-DD') || moment(this.companyform.log_date).format('YYYY-MM-DD') > moment(response[i].exitime).format('YYYY-MM-DD')) {
                        Message({
                          message: this.$t('label.PFANS5008FORMVIEW_CKECKLOGDATAERROR'),
                          type: 'error',
                          duration: 5 * 1000,
                        });
                        break;
                      }
                    }
                  }
                });
              for (let k = 0; k < response.length; k++) {
                if (val === response[k].companyprojects_ID) {
                  if (response[k].estimatedendtime != null) {
                    if (moment(this.companyform.log_date).format('YYYY-MM-DD') < moment(response[k].estimatedstarttime).format('YYYY-MM-DD') || moment(this.companyform.log_date).format('YYYY-MM-DD') > moment(response[k].estimatedendtime).format('YYYY-MM-DD')) {
                      Message({
                        message: this.$t('label.PFANS5008FORMVIEW_RIZHICHECKL'),
                        type: 'error',
                        duration: 5 * 1000,
                      });
                      break;
                    }
                    break;
                  } else {
                    if (response[k].extensiondate != null) {
                      if (moment(this.companyform.log_date).format('YYYY-MM-DD') > moment(response[k].extensiondate).format('YYYY-MM-DD')) {
                        Message({
                          message: this.$t('label.PFANS5008FORMVIEW_RIZHICHECKL'),
                          type: 'error',
                          duration: 5 * 1000,
                        });
                        break;
                      }
                    } else {
                      if (moment(this.companyform.log_date).format('YYYY-MM-DD') > moment(response[k].claimdatetime).format('YYYY-MM-DD')) {
                        Message({
                          message: this.$t('label.PFANS5008FORMVIEW_RIZHICHECKL'),
                          type: 'error',
                          duration: 5 * 1000,
                        });
                        break;
                      }
                    }
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
        }
      },
      rowclick(row, event, column) {
        this.row = row.logmanagementid;
        this.loading = true;
        this.$store
          .dispatch('PFANS5008Store/getDataOne', {'logmanagement_id': this.row})
          .then(response => {
            if (response.confirmstatus == '1') {
              this.buttonList[0].disabled = true;
              this.buttonList[1].disabled = true;
              this.disable = false;
            } else {
              this.buttonList[0].disabled = false;
              this.buttonList[1].disabled = false;
              this.disable = true;
            }
            this.code3 = '';
            if (response.work_phase === 'PP008001') {
              this.code3 = 'PP009';
              let letErrortype = getDictionaryInfo(response.behavior_breakdown);
              if (letErrortype != null) {
                response.behavior_breakdown = letErrortype.code;
              }
            } else if (response.work_phase === 'PP008002') {
              this.code3 = 'PP010';
              let letErrortype = getDictionaryInfo(response.behavior_breakdown);
              if (letErrortype != null) {
                response.behavior_breakdown = letErrortype.code;
              }
            } else if (response.work_phase === 'PP008003') {
              this.code3 = 'PP025';
              let letErrortype = getDictionaryInfo(response.behavior_breakdown);
              if (letErrortype != null) {
                response.behavior_breakdown = letErrortype.code;
              }
            } else if (response.work_phase === 'PP008004') {
              this.code3 = 'PP011';
              let letErrortype = getDictionaryInfo(response.behavior_breakdown);
              if (letErrortype != null) {
                response.behavior_breakdown = letErrortype.code;
              }
            }
            this.companyform = response;
            this.loading = false;
          });
      },
      riqi() {
        this.getAttendancelist();
        this.divfalse = false;
        this.xsTable = false;
        this.loading = true;
        this.$store
          .dispatch('PFANS5008Store/getCheckList', {})
          .then(response => {
            let datalist = [];
            for (let k = 0; k < response.length; k++) {
              if (this.User_id === response[k].createby) {
                this.code3 = '';
                if (moment(this.companyform.log_date).format('YYYY-MM-DD') === moment(response[k].log_date).format('YYYY-MM-DD')) {
                  if (response[k].work_phase === 'PP008001') {
                    this.code3 = 'PP009';
                    let letErrortype = getDictionaryInfo(response[k].behavior_breakdown);
                    if (letErrortype != null) {
                      response[k].behavior_breakdown = letErrortype.code;
                    }
                  } else if (response[k].work_phase === 'PP008002') {
                    this.code3 = 'PP010';
                    let letErrortype = getDictionaryInfo(response[k].behavior_breakdown);
                    if (letErrortype != null) {
                      response[k].behavior_breakdown = letErrortype.code;
                    }
                  } else if (response[k].work_phase === 'PP008003') {
                    this.code3 = 'PP025';
                    let letErrortype = getDictionaryInfo(response[k].behavior_breakdown);
                    if (letErrortype != null) {
                      response[k].behavior_breakdown = letErrortype.code;
                    }
                  } else if (response[k].work_phase === 'PP008004') {
                    this.code3 = 'PP011';
                    let letErrortype = getDictionaryInfo(response[k].behavior_breakdown);
                    if (letErrortype != null) {
                      response[k].behavior_breakdown = letErrortype.code;
                    }
                  }
                  if (response[k].work_phase !== null && response[k].work_phase !== '') {
                    let letErrortype = getDictionaryInfo(response[k].work_phase);
                    if (letErrortype != null) {
                      response[k].work_phase = letErrortype.value1;
                    }
                  }
                  let obj = {};
                  obj.start_time = response[k].time_start;
                  obj.work_phase = response[k].work_phase;
                  let letErrortypecheck = getDictionaryInfo(response[k].behavior_breakdown);
                  if (letErrortypecheck != null) {
                    obj.behavior_breakdown = letErrortypecheck.value1;
                  }
                  obj.project_name = response[k].project_name;
                  this.divfalse = true;
                  this.xsTable = true;
                  obj.logmanagementid = response[k].logmanagement_id;
                  datalist[k] = obj;
                  this.divfalse = true;
                  this.xsTable = true;
                }
              }
            }
            this.DataList = datalist;
            this.loading = false;
          });
      },
      buttonClick(val) {
        this.checklistgettable();
        if (val === 'mingtian') {
          this.divfalse = false;
          this.xsTable = false;
          this.companyform.log_date = moment(this.companyform.log_date).add(1, 'days').format('YYYY-MM-DD');
          this.getAttendancelist();
          this.companyform.time_start = '';
          this.companyform.wbs_id = '';
          this.companyform.behavior_breakdown = '';
          this.companyform.work_phase = '';
          this.companyform.work_memo = '';
          this.loading = true;
          this.$store
            .dispatch('PFANS5008Store/getCheckList', {})
            .then(response => {
              const data = [];
              let datalist = [];
              for (let k = 0; k < response.length; k++) {
                if (this.User_id === response[k].createby) {
                  this.code3 = '';
                  if (moment(response[k].log_date).format('YYYY-MM-DD') === moment(this.companyform.log_date).format('YYYY-MM-DD')) {
                    if (response[k].work_phase === 'PP008001') {
                      this.code3 = 'PP009';
                      let letErrortype = getDictionaryInfo(response[k].behavior_breakdown);
                      if (letErrortype != null) {
                        response[k].behavior_breakdown = letErrortype.code;
                      }
                    } else if (response[k].work_phase === 'PP008002') {
                      this.code3 = 'PP010';
                      let letErrortype = getDictionaryInfo(response[k].behavior_breakdown);
                      if (letErrortype != null) {
                        response[k].behavior_breakdown = letErrortype.code;
                      }
                    } else if (response[k].work_phase === 'PP008003') {
                      this.code3 = 'PP025';
                      let letErrortype = getDictionaryInfo(response[k].behavior_breakdown);
                      if (letErrortype != null) {
                        response[k].behavior_breakdown = letErrortype.code;
                      }
                    } else if (response[k].work_phase === 'PP008004') {
                      this.code3 = 'PP011';
                      let letErrortype = getDictionaryInfo(response[k].behavior_breakdown);
                      if (letErrortype != null) {
                        response[k].behavior_breakdown = letErrortype.code;
                      }
                    }
                    if (response[k].work_phase !== null && response[k].work_phase !== '') {
                      let letErrortype = getDictionaryInfo(response[k].work_phase);
                      if (letErrortype != null) {
                        response[k].work_phase = letErrortype.value1;
                      }
                    }
                    let obj = {};
                    obj.start_time = response[k].time_start;
                    obj.work_phase = response[k].work_phase;
                    let letErrortypecheck = getDictionaryInfo(response[k].behavior_breakdown);
                    if (letErrortypecheck != null) {
                      obj.behavior_breakdown = letErrortypecheck.value1;
                    }
                    obj.project_name = response[k].project_name;
                    this.divfalse = true;
                    this.xsTable = true;
                    obj.logmanagementid = response[k].logmanagement_id;
                    datalist[k] = obj;
                    this.divfalse = true;
                    this.xsTable = true;
                  }
                }
              }
              this.DataList = datalist;
              this.loading = false;
            });
        }
        if (val === 'btnSave') {
          this.companyform.logmanagement_id = this.$route.params._id;
          this.$refs['companyform'].validate(valid => {
            if (valid) {
              let error = 0;
              if (moment(this.companyform.log_date).format('YYYY-MM-DD') >= moment(new Date()).format('YYYY-MM-DD')) {
                error = error + 1;
                Message({
                  message: this.$t('label.PFANS5008FORMVIEW_CKECKLOGDATA'),
                  type: 'error',
                  duration: 5 * 1000,
                });
              } else if (this.companyform.time_start == '0') {
                error = error + 1;
                Message({
                  message: this.$t('label.PFANS5008FORMVIEW_CKECKTIME'),
                  type: 'error',
                  duration: 5 * 1000,
                });
              }
              this.$store
                .dispatch('PFANS5008Store/getCheckList', {})
                .then(response => {
                  let checklenth = 0;
                  for (let j = 0; j < response.length; j++) {
                    if (this.User_id === response[j].createby) {
                      if (moment(response[j].log_date).format('YYYY-MM-DD') === moment(this.companyform.log_date).format('YYYY-MM-DD')) {
                        checklenth += parseFloat(response[j].time_start);
                      }
                    }
                  }
                  if (this.$route.params._id || this.row) {

                    this.checkLenth = checklenth;
                    if (parseFloat(this.checkLenth) + parseFloat(this.companyform.time_start)-parseFloat(this.checktimelength) > this.checkdata) {
                      error = error + 1;
                      Message({
                        message: this.$t('label.PFANS5008VIEW_CHECKLENTHLOGDATA'),
                        type: 'error',
                        duration: 5 * 1000,
                      });
                    }
                  } else {
                    this.checkLenth = checklenth;
                    if (parseFloat(this.checkLenth) + parseFloat(this.companyform.time_start) > this.checkdata) {
                      error = error + 1;
                      Message({
                        message: this.$t('label.PFANS5008VIEW_CHECKLENTHLOGDATA'),
                        type: 'error',
                        duration: 5 * 1000,
                      });
                    }
                  }
                  if (error == 0) {
                    if (this.$route.params._id || this.row) {
                      this.loading = true;
                      this.$store
                        .dispatch('PFANS5008Store/updateNewUser', this.companyform)
                        .then(response => {
                          this.data = response;
                          Message({
                            message: this.$t('normal.success_02'),
                            type: 'success',
                            duration: 5 * 1000,
                          });
                          this.$store
                            .dispatch('PFANS5008Store/getCheckList', {})
                            .then(response => {
                              let datalist = [];
                              for (let k = 0; k < response.length; k++) {
                                if (this.User_id === response[k].createby) {
                                  if (moment(response[k].log_date).format('YYYY-MM-DD') === moment(this.companyform.log_date).format('YYYY-MM-DD')) {
                                    if (response[k].work_phase === 'PP008001') {
                                      this.code3 = 'PP009';
                                      let letErrortype = getDictionaryInfo(response[k].behavior_breakdown);
                                      if (letErrortype != null) {
                                        response[k].behavior_breakdown = letErrortype.code;
                                      }
                                    } else if (response[k].work_phase === 'PP008002') {
                                      this.code3 = 'PP010';
                                      let letErrortype = getDictionaryInfo(response[k].behavior_breakdown);
                                      if (letErrortype != null) {
                                        response[k].behavior_breakdown = letErrortype.code;
                                      }
                                    } else if (response[k].work_phase === 'PP008003') {
                                      this.code3 = 'PP025';
                                      let letErrortype = getDictionaryInfo(response[k].behavior_breakdown);
                                      if (letErrortype != null) {
                                        response[k].behavior_breakdown = letErrortype.code;
                                      }
                                    } else if (response[k].work_phase === 'PP008004') {
                                      this.code3 = 'PP011';
                                      let letErrortype = getDictionaryInfo(response[k].behavior_breakdown);
                                      if (letErrortype != null) {
                                        response[k].behavior_breakdown = letErrortype.code;
                                      }
                                    }
                                    if (response[k].work_phase !== null && response[k].work_phase !== '') {
                                      let letErrortype = getDictionaryInfo(response[k].work_phase);
                                      if (letErrortype != null) {
                                        response[k].work_phase = letErrortype.value1;
                                      }
                                    }
                                    let obj = {};
                                    obj.start_time = response[k].time_start;
                                    obj.work_phase = response[k].work_phase;
                                    let letErrortypecheck = getDictionaryInfo(response[k].behavior_breakdown);
                                    if (letErrortypecheck != null) {
                                      obj.behavior_breakdown = letErrortypecheck.value1;
                                    }
                                    obj.project_name = response[k].project_name;
                                    this.divfalse = true;
                                    this.xsTable = true;
                                    obj.logmanagementid = response[k].logmanagement_id;
                                    datalist[k] = obj;
                                    this.divfalse = true;
                                    this.xsTable = true;
                                  }
                                }
                              }
                              this.DataList = datalist;
                              this.loading = false;
                            });
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
                      if (this.companyform.project_id === '') {
                        this.companyform.has_project = '02';
                      } else {
                        this.companyform.has_project = '01';
                      }
                      this.loading = true;
                      this.$store
                        .dispatch('PFANS5008Store/createNewUser', this.companyform)
                        .then(response => {
                          this.data = response;
                          Message({
                            message: this.$t('normal.success_01'),
                            type: 'success',
                            duration: 5 * 1000,
                          });
                          this.$store
                            .dispatch('PFANS5008Store/getCheckList', {})
                            .then(response => {
                              let datalist = [];
                              for (let k = 0; k < response.length; k++) {
                                if (this.User_id === response[k].createby) {
                                  if (moment(this.companyform.log_date).format('YYYY-MM-DD') === moment(response[k].log_date).format('YYYY-MM-DD')) {
                                    if (response[k].work_phase === 'PP008001') {
                                      this.code3 = 'PP009';
                                      let letErrortype = getDictionaryInfo(response[k].behavior_breakdown);
                                      if (letErrortype != null) {
                                        response[k].behavior_breakdown = letErrortype.code;
                                      }
                                    } else if (response[k].work_phase === 'PP008002') {
                                      this.code3 = 'PP010';
                                      let letErrortype = getDictionaryInfo(response[k].behavior_breakdown);
                                      if (letErrortype != null) {
                                        response[k].behavior_breakdown = letErrortype.code;
                                      }
                                    } else if (response[k].work_phase === 'PP008003') {
                                      this.code3 = 'PP025';
                                      let letErrortype = getDictionaryInfo(response[k].behavior_breakdown);
                                      if (letErrortype != null) {
                                        response[k].behavior_breakdown = letErrortype.code;
                                      }
                                    } else if (response[k].work_phase === 'PP008004') {
                                      this.code3 = 'PP011';
                                      let letErrortype = getDictionaryInfo(response[k].behavior_breakdown);
                                      if (letErrortype != null) {
                                        response[k].behavior_breakdown = letErrortype.code;
                                      }
                                    }
                                    if (response[k].work_phase !== null && response[k].work_phase !== '') {
                                      let letErrortype = getDictionaryInfo(response[k].work_phase);
                                      if (letErrortype != null) {
                                        response[k].work_phase = letErrortype.value1;
                                      }
                                    }
                                    let obj = {};
                                    obj.start_time = response[k].time_start;
                                    obj.work_phase = response[k].work_phase;
                                    let letErrortypecheck = getDictionaryInfo(response[k].behavior_breakdown);
                                    if (letErrortypecheck != null) {
                                      obj.behavior_breakdown = letErrortypecheck.value1;
                                    }
                                    obj.project_name = response[k].project_name;
                                    this.divfalse = true;
                                    this.xsTable = true;
                                    obj.logmanagementid = response[k].logmanagement_id;
                                    datalist[k] = obj;
                                    this.divfalse = true;
                                    this.xsTable = true;
                                  }
                                }
                              }
                              this.DataList = datalist;
                              this.loading = false;
                            });
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
            } else {
              Message({
                message: this.$t('normal.error_12'),
                type: 'error',
                duration: 5 * 1000,
              });
            }
          });
        }
      },
      JDjobs(value1) {
        this.companyform.work_phase = value1;
        if (value1 === 'PP008001') {
          this.code3 = 'PP009';
        } else if (value1 === 'PP008002') {
          this.code3 = 'PP010';
        } else if (value1 === 'PP008003') {
          this.code3 = 'PP025';
        } else if (value1 === 'PP008004') {
          this.code3 = 'PP011';
        }
      },
      XWXF(value3) {
        this.companyform.behavior_breakdown = value3;
      },
      clickdata() {
        this.getAttendancelist();
        this.companyform.time_start = '';
        this.companyform.wbs_id = '';
        this.companyform.behavior_breakdown = '';
        this.companyform.work_phase = '';
        this.companyform.work_memo = '';
        if (this.companyform.log_date == null) {
          this.Riqickeck = false;
        } else {
          this.Riqickeck = true;
        }
        this.divfalse = false;
        this.xsTable = false;
        this.loading = true;

        let log_date = moment(this.companyform.log_date).format('YYYY-MM-DD');
        this.$store
          .dispatch('PFANS5008Store/getCheckList', {})
          .then(response => {
            const data = [];
            let datalist = [];
            for (let k = 0; k < response.length; k++) {
              if (this.User_id === response[k].createby) {
                if (response[k].has_project === '01') {
                  let log_date3 = moment(response[k].log_date).format('YYYY-MM-DD');
                  if (log_date3 === log_date) {
                    if (response[k].work_phase === 'PP008001') {
                      this.code3 = 'PP009';
                      let letErrortype = getDictionaryInfo(response[k].behavior_breakdown);
                      if (letErrortype != null) {
                        response[k].behavior_breakdown = letErrortype.code;
                      }
                    } else if (response[k].work_phase === 'PP008002') {
                      this.code3 = 'PP010';
                      let letErrortype = getDictionaryInfo(response[k].behavior_breakdown);
                      if (letErrortype != null) {
                        response[k].behavior_breakdown = letErrortype.code;
                      }
                    } else if (response[k].work_phase === 'PP008003') {
                      this.code3 = 'PP025';
                      let letErrortype = getDictionaryInfo(response[k].behavior_breakdown);
                      if (letErrortype != null) {
                        response[k].behavior_breakdown = letErrortype.code;
                      }
                    } else if (response[k].work_phase === 'PP008004') {
                      this.code3 = 'PP011';
                      let letErrortype = getDictionaryInfo(response[k].behavior_breakdown);
                      if (letErrortype != null) {
                        response[k].behavior_breakdown = letErrortype.code;
                      }
                    }
                    if (response[k].work_phase !== null && response[k].work_phase !== '') {
                      let letErrortype = getDictionaryInfo(response[k].work_phase);
                      if (letErrortype != null) {
                        response[k].work_phase = letErrortype.value1;
                      }
                    }
                    let obj = {};
                    obj.start_time = response[k].time_start;
                    obj.work_phase = response[k].work_phase;
                    let letErrortypecheck = getDictionaryInfo(response[k].behavior_breakdown);
                    if (letErrortypecheck != null) {
                      obj.behavior_breakdown = letErrortypecheck.value1;
                    }
                    obj.project_name = response[k].project_name;
                    this.divfalse = true;
                    this.xsTable = true;
                    obj.logmanagementid = response[k].logmanagement_id;
                    datalist[k] = obj;
                    this.divfalse = true;
                    this.xsTable = true;
                  }
                }
              }
            }
            this.DataList = datalist;
          });

        this.loading = false;
      },
    },
    watch: {
      'companyform.log_date'(val) {
        this.riqi();
      },
    },
  };
</script>
<style lang="scss">
  .appManage {
    .el-calendar-day {
      height: 2.8rem;
      width: 2.8rem;
    }
  }

  .el-form-item__error {
    width: 15rem;
  }
</style>
