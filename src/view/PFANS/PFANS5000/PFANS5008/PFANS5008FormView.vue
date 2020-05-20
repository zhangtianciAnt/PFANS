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
                    <div class="sub_color_red">
                      {{$t('label.PFANS5008FORMVIEW_CHECKTIMELENGTH')+this.checkdata+$t('label.hours')}}
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <div v-show="isShow">
                    <el-col :span="12">
                      <el-form-item :label="$t('label.PFANS5004VIEW_PROJECTNAMW')" prop="project_id">
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
                        {{companyform.project_name}}
                      </el-form-item>
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
                    <el-form-item :label="$t('label.PFANS5008VIEW_GZBZ')" style="width:  16vw" prop="work_memo">
                      <el-input
                        type="textarea"
                        :rows="2"
                        v-model="companyform.work_memo" :disabled="!disable"
                      >
                      </el-input>
                    </el-form-item>
                  </el-col>
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
              </el-aside>
              <el-main>
                <el-calendar v-model="companyform.log_date" :disabled="!disable" class="appManage">
                  <template
                    slot="dateCell"
                    slot-scope="{date, data}">
                    <p @click='changedate(data.day)'>
                      {{ data.day.split('-').slice(2).join('-') }}
                    </p>
                  </template>
                </el-calendar>
              </el-main>
            </el-container>
            <div align="center" v-show='divfalse' style="margin-top: 10vm">
              <span v-show="Riqickeck"> {{ this.companyform.log_date | moment('YYYY-MM-DD')}}</span>
              <span>{{$t('label.PFANS5008FORMVIEW_JL')}}</span>
            </div>
            <el-table
              header-cell-class-name="sub_bg_color_blue" stripe border
              :data="DataList"
              v-show="xsTable"
              @row-click="rowclick"
            >
              <el-table-column
                show-overflow-tooltip
                prop="project_name"
                :label="$t('label.PFANS5008FORMVIEW_GZPROGRAM')"
                width="250px">
              </el-table-column>
              <el-table-column
                prop="start_time"
                :label="$t('label.PFANS5008FORMVIEW_SC')"
                width="150px">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="work_phase"
                :label="$t('label.PFANS5008VIEW_JDJOBS')"
                width="150px">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="behavior_breakdown"
                :label="$t('label.PFANS5008VIEW_XWXF')"
                width="150px">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="wbs_id"
                :label="$t('label.PFANS5008FORMVIEW_WBSID')"
                width="150px">
              </el-table-column>
            </el-table>
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
          wbs_id: '',
        }],
        optionsdata: [{value: 'PP024001', lable: this.$t('label.PFANS5008FORMVIEW_PROJECTGTXM')}],
        optionsdate: [],
        optionsdategroup: [{value: 'PP024001', lable: this.$t('label.PFANS5008FORMVIEW_PROJECTGTXM')}],
        optionsdategroup: [],
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
          group_id: '',
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
        checkuserid: '',
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
          }],
          project_id: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS5004VIEW_PROJECTNAMW'),
            trigger: 'change',
          },
          ],
        },
      };
    },
    created() {
      //add -ws - 工作记录table表格编辑时根据编辑人id获取数据，新建时根据登录人id获取数据
      if (this.$store.getters.userinfo.userid !== undefined) {
        this.checkuserid = 0;
        this.User_id = this.$store.getters.userinfo.userid;
      } else {
        this.checkuserid = 1;
        this.User_id = this.$store.getters.useraccount._id;
      }
      if (this.$route.params._createby != undefined) {
        this.User_id = this.$route.params._createby;
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
        .dispatch('PFANS5008Store/getCheckList', {'createby': this.User_id})
        .then(response => {
          let datalist = [];
          for (let k = 0; k < response.length; k++) {

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
              obj.wbs_id = response[k].wbs_id;
              datalist[k] = obj;
              this.DataList = datalist;
              this.divfalse = true;
              this.xsTable = true;
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
            .dispatch('PFANS5008Store/getCheckList', {'createby': this.User_id})
            .then(response => {
              const data = [];
              let datalist = [];
              for (let k = 0; k < response.length; k++) {

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
                    obj.wbs_id = response[k].wbs_id;
                    datalist[k] = obj;
                    this.divfalse = true;
                    this.xsTable = true;
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
        this.companyform.logmanagement_id = this.$route.params._id;
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
                .dispatch('PFANS5008Store/getCheckList', {'createby': this.User_id})
                .then(response => {
                  let datalist = [];
                  for (let k = 0; k < response.length; k++) {

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
                      obj.wbs_id = response[k].wbs_id;
                      datalist[k] = obj;
                      this.divfalse = true;
                      this.xsTable = true;
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
                .dispatch('PFANS5008Store/getCheckList', {'createby': this.User_id})
                .then(response => {
                  let datalist = [];
                  for (let k = 0; k < response.length; k++) {

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
                      obj.wbs_id = response[k].wbs_id;
                      datalist[k] = obj;
                      this.divfalse = true;
                      this.xsTable = true;
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
          .dispatch('PFANS5009Store/getSiteList5', {})
          .then(response => {
            for (let i = 0; i < response.length; i++) {
              this.optionsdata.push({
                value: response[i].companyprojects_id,
                lable: response[i].numbers + '_' + response[i].project_name,
              });
              this.optionsdategroup.push({
                value: response[i].companyprojects_id,
                lable: response[i].group_id,
              });
            }

            this.$store
              .dispatch('PFANS5013Store/getMyConProject', {})
              .then(response => {
                for (let i = 0; i < response.length; i++) {
                  this.optionsdata.push({
                    value: response[i].comproject_id,
                    lable: response[i].numbers + '_' + response[i].project_name,
                  });
                  this.optionsdategroup.push({
                    value: response[i].comproject_id,
                    lable: response[i].group_id,
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
          .dispatch('PFANS5008Store/getCheckList', {'createby': this.User_id})
          .then(response => {
            let checklenth = 0;
            for (let j = 0; j < response.length; j++) {

              if (moment(response[j].log_date).format('YYYY-MM-DD') === moment(this.companyform.log_date).format('YYYY-MM-DD')) {
                checklenth += parseFloat(response[j].time_start);
              }

            }
            this.checkLenth = checklenth;
          });
      },
      checkgetAttendancelist() {
        let parameter = {
          user_id: this.User_id,
          years: moment(new Date()).format('YYYY'),
        };
        this.loading = true;
        this.$store
          .dispatch('PFANS2010Store/getAttendancelist', parameter)
          .then(response => {
            //add-ws-当前人的登陆id在设内表中未查到的时候，去社外表查询用社外的数据否则就用社内的数据
            if (response.length === 0) {
              this.$store
                .dispatch('PFANS5008Store/getAttendancepdlist', parameter)
                .then(response => {
                  this.checkList = response;
                  this.getAttendancelist();
                });
            } else {
              this.checkList = response;
              this.getAttendancelist();
            }
            //add-ws-当前人的登陆id在设内表中未查到的时候，去社外表查询用社外的数据否则就用社内的数据
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
        let sumoutgoinghours = 0;
        for (let j = 0; j < this.checkList.length; j++) {
          if (moment(this.checkList[j].dates).format('YYYY-MM-DD') === moment(this.companyform.log_date).format('YYYY-MM-DD')) {
            if (this.checkList[j].outgoinghours === null) {
              sumoutgoinghours = 0;
            } else if (this.checkList[j].outgoinghours === '') {
              sumoutgoinghours = 0;
            } else {
              sumoutgoinghours = parseFloat(this.checkList[j].outgoinghours);
            }
          }
        }
        this.checkdata = sumoutgoinghours;
      },
      setdisabled(val) {
        if (this.$route.params.disabled) {
          this.disabled = val;
        }
      },
      getProject(val) {
        if (val) {
          this.companyform.work_phase = '';
          this.companyform.behavior_breakdown = '';
          this.code3 = '0';
        }
        for (let item of this.optionsdata) {
          if (item.value === val) {
            this.companyform.project_name = item.lable;
          }
        }
        for (let item of this.optionsdategroup) {
          if (item.value === val) {
            this.companyform.group_id = item.lable;
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
        this.companyform.logmanagement_id = row.logmanagementid;
        this.loading = true;
        this.$store
          .dispatch('PFANS5008Store/getDataOne', {'logmanagement_id': this.row})
          .then(response => {

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
      changedate() {
        this.getAttendancelist();
        this.$route.params._id = '';
        this.row = '';
        this.companyform.logmanagement_id = '';
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
          .dispatch('PFANS5008Store/getCheckList', {'createby': this.User_id})
          .then(response => {
            const data = [];
            let datalist = [];
            for (let k = 0; k < response.length; k++) {

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
                  obj.wbs_id = response[k].wbs_id;
                  datalist[k] = obj;
                  this.divfalse = true;
                  this.xsTable = true;
                }
              }

            }
            this.DataList = datalist;
          });

        this.loading = false;
      },
      riqi() {
        this.getAttendancelist();
        this.divfalse = false;
        this.xsTable = false;
        this.loading = true;
        this.$store
          .dispatch('PFANS5008Store/getCheckList', {'createby': this.User_id})
          .then(response => {
            let datalist = [];
            for (let k = 0; k < response.length; k++) {

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
                obj.wbs_id = response[k].wbs_id;
                datalist[k] = obj;
                this.divfalse = true;
                this.xsTable = true;
              }

            }
            this.DataList = datalist;
            this.loading = false;
          });
      },
      buttonClick(val) {
        this.checklistgettable();
        if (val === 'mingtian') {
          this.$route.params._id = '';
          this.row = '';
          this.companyform.logmanagement_id = '';
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
            .dispatch('PFANS5008Store/getCheckList', {'createby': this.User_id})
            .then(response => {
              const data = [];
              let datalist = [];
              for (let k = 0; k < response.length; k++) {

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
                  obj.wbs_id = response[k].wbs_id;
                  datalist[k] = obj;
                  this.divfalse = true;
                  this.xsTable = true;
                }

              }
              this.DataList = datalist;
              this.loading = false;
            });
        }
        if (val === 'btnSave') {
          this.$refs['companyform'].validate(valid => {
            if (valid) {
              this.getAttendancelist();
              this.loading = true;
              let error = 0;
              //add-ws-日志截止日期check添加
              let check = 0;
              let log_date = moment(this.companyform.log_date).format('DD');
              let date = getDictionaryInfo('BP027001').value1;
              let checkdate = date < 10?'0'+date:date;
              if (moment(this.companyform.log_date).format('YYYY') < moment(new Date()).format('YYYY')) {
                if (moment(this.companyform.log_date).format('MM') > moment(new Date()).format('MM')) {
                  if (checkdate < moment(new Date()).format('DD')) {
                    check = check + 1;
                    Message({
                      message: this.$t('label.PFANS5008VIEW_CHECKDATA'),
                      type: 'error',
                      duration: 5 * 1000,
                    });
                    this.loading = false;
                  }
                }
              } else if (moment(this.companyform.log_date).format('MM') < moment(new Date()).format('MM')) {
                if (checkdate < moment(new Date()).format('DD')) {
                  check = check + 1;
                  Message({
                    message: this.$t('label.PFANS5008VIEW_CHECKDATA'),
                    type: 'error',
                    duration: 5 * 1000,
                  });
                  this.loading = false;
                }

              }
              //add-ws-日志截止日期check添加
              if (check === 0) {
                if (this.checkuserid === 0) {
                  if (moment(this.companyform.log_date).format('YYYY-MM-DD') >= moment(new Date()).format('YYYY-MM-DD')) {
                    error = error + 1;
                    Message({
                      message: this.$t('label.PFANS5008FORMVIEW_CKECKLOGDATA'),
                      type: 'error',
                      duration: 5 * 1000,
                    });
                    this.loading = false;
                  } else if (this.companyform.time_start == '0') {
                    error = error + 1;
                    Message({
                      message: this.$t('label.PFANS5008FORMVIEW_CKECKTIME'),
                      type: 'error',
                      duration: 5 * 1000,
                    });
                    this.loading = false;
                  }
                  this.$store
                    .dispatch('PFANS5008Store/getCheckList', {'createby': this.User_id})
                    .then(response => {
                      let checklenth = 0;
                      for (let j = 0; j < response.length; j++) {
                        if (moment(response[j].log_date).format('YYYY-MM-DD') === moment(this.companyform.log_date).format('YYYY-MM-DD')) {
                          checklenth += parseFloat(response[j].time_start);
                        }
                      }
                      if (this.companyform.logmanagement_id) {
                        this.checkLenth = checklenth;
                        if (parseFloat(this.checkLenth) + parseFloat(this.companyform.time_start) - parseFloat(this.checktimelength) > this.checkdata) {
                          error = error + 1;
                          Message({
                            message: this.$t('label.PFANS5008VIEW_CHECKLENTHLOGDATA'),
                            type: 'error',
                            duration: 5 * 1000,
                          });
                          this.loading = false;
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
                          this.loading = false;
                        }
                      }
                      if (error == 0) {
                        if (this.$route.params._id || this.row) {
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
                                .dispatch('PFANS5008Store/getCheckList', {'createby': this.User_id})
                                .then(response => {
                                  let datalist = [];
                                  for (let k = 0; k < response.length; k++) {
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
                                      obj.wbs_id = response[k].wbs_id;
                                      datalist[k] = obj;
                                      this.divfalse = true;
                                      this.xsTable = true;
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
                                .dispatch('PFANS5008Store/getCheckList', {'createby': this.User_id})
                                .then(response => {
                                  let datalist = [];
                                  for (let k = 0; k < response.length; k++) {

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
                                      obj.wbs_id = response[k].wbs_id;
                                      datalist[k] = obj;
                                      this.divfalse = true;
                                      this.xsTable = true;
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
                } else if (this.checkuserid === 1) {
                  if (this.companyform.time_start == '0') {
                    error = error + 1;
                    Message({
                      message: this.$t('label.PFANS5008FORMVIEW_CKECKTIME'),
                      type: 'error',
                      duration: 5 * 1000,
                    });
                    this.loading = false;
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
                            .dispatch('PFANS5008Store/getCheckList', {'createby': this.User_id})
                            .then(response => {
                              let datalist = [];
                              for (let k = 0; k < response.length; k++) {

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
                                  obj.wbs_id = response[k].wbs_id;
                                  datalist[k] = obj;
                                  this.divfalse = true;
                                  this.xsTable = true;
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
                            .dispatch('PFANS5008Store/getCheckList', {'createby': this.User_id})
                            .then(response => {
                              let datalist = [];
                              for (let k = 0; k < response.length; k++) {

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
                                  obj.wbs_id = response[k].wbs_id;
                                  datalist[k] = obj;
                                  this.divfalse = true;
                                  this.xsTable = true;
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
                }
              }
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
        this.$route.params._id = '';
        this.row = '';
        this.companyform.logmanagement_id = '';
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
          .dispatch('PFANS5008Store/getCheckList', {'createby': this.User_id})
          .then(response => {
            const data = [];
            let datalist = [];
            for (let k = 0; k < response.length; k++) {
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
                  obj.wbs_id = response[k].wbs_id;
                  datalist[k] = obj;
                  this.divfalse = true;
                  this.xsTable = true;
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
