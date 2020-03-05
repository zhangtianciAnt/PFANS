<template>
  <div style="min-height: 100%">
    <EasyNormalContainer ref="container" :title="title" @buttonClick="buttonClick" :buttonList="buttonList"
                         v-loading="loading">
      <div slot="customize" style="margin-top: 4rem;">
        <el-form ref="form" label-width="8vw" label-position="top" style="padding: 2vw">
          <el-form :model="companyform" ref="companyform"
                   class="demo-ruleForm" :rules="rules">
            <el-container>
              <el-aside style="width: 58%;height: 40rem">
                <el-tabs type="border-card">
                <el-row>
                  <el-col :span="11">
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
                  <el-col :span="10">
                    <el-form-item :label="$t('label.PFANS5008FORMVIEW_SC')" prop="time_start">
                      <el-input-number v-model="companyform.time_start" :disabled="!disable" controls-position="right"
                                       :precision="2" :step="0.5" :min="0" :max="24" style="width: 16vw"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <div v-show="isShow">
                    <el-col :span="6">
                      <el-form-item :label="$t('label.PFANS5008VIEW_XZPROGRAM')" prop="project_id">
                        <el-select v-model="companyform.project_id" :disabled="!disable" style="width: 16vw" clearable >
                          <el-option
                            v-for="item in optionsdata"
                            :key="item.value"
                            :label="item.lable"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10">
                      <el-form-item>
                        <el-link style="width: 9rem;color: #005baa;margin-left: 7vw;font-weight: 700" target="_blank"
                                 :underline="false"
                                 @click="program=true" type="primary" :disabled="!disable">
                          <span>{{$t('label.PFANS5008FORMVIEW_BIANJI')}}</span>
                        </el-link>
                        <el-dialog :visible.sync="program" width="50%">
                          <table border="0" cellspacing="0" cellpadding="0" width="800rem">
                            <div style="text-align: center">
                              <el-transfer
                                style="text-align: left; display: inline-block"
                                @change="handleChange"
                                v-model="determine.project_name"
                                :titles="[$t('label.PFANS5008FORMVIEW_BMXM'),$t('label.PFANS5008FORMVIEW_GRXM')]"
                                :button-texts="[$t('label.PFANS5008FORMVIEW_LEFT'),$t('label.PFANS5008FORMVIEW_RIGHT')]"
                                :format="{noChecked: '${total}',hasChecked: '${checked}/${total}'}"
                                :data="transfer"

                              >
                              </el-transfer>
                              <el-form-item>
                                <el-button type="primary" @click="submitForm(determine)">{{$t('button.confirm')}}
                                </el-button>
                              </el-form-item>
                            </div>
                          </table>
                        </el-dialog>
                      </el-form-item>
                    </el-col>
                  </div>
                </el-row>
                <el-row>
                  <el-col :span="11">
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
                  <el-col :span="10">
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
                <el-form-item label="WBS_ID" style="width: 81.8%" prop="wbs_id">
                  <el-input
                    type="textarea"
                    :rows="2"
                    v-model="companyform.wbs_id" :disabled="!disable"
                    style="width: 36vw">
                  </el-input>
                </el-form-item>
                <el-form-item :label="$t('label.PFANS5008VIEW_GZBZ')" style="width: 81.8%" prop="work_memo">
                  <el-input
                    type="textarea"
                    :rows="7"
                    v-model="companyform.work_memo" :disabled="!disable"
                    style="width: 36vw">
                  </el-input>
                </el-form-item>
                </el-tabs>
              </el-aside>
              <el-tabs type="border-card">
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
                <div align="center">
                  <span v-show="Riqickeck"> {{ this.companyform.log_date | moment('YYYY-MM-DD')}}</span>
                  <span>{{$t('label.PFANS5008FORMVIEW_JL')}}</span>
                </div>
                <el-table
                  :data="DataList"
                  v-show="xsTable"
                  @row-click="rowclick"
                >
                  <el-table-column
                    prop="start_time"
                    :label="$t('label.PFANS5008FORMVIEW_SC')"
                    width="120%">
                  </el-table-column>
                  <el-table-column
                    prop="work_phase"
                    :label="$t('label.PFANS5008VIEW_JDJOBS')"
                    width="140%">
                  </el-table-column>
                  <el-table-column
                    prop="behavior_breakdown"
                    :label="$t('label.PFANS5008VIEW_XWXF')"
                    width="140%">
                  </el-table-column>
                  <el-table-column
                    prop="project_id"
                    :label="$t('label.PFANS5008FORMVIEW_GZPROGRAM')"
                    width="120%">
                  </el-table-column>
                </el-table>
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
        loading: false,
        DataList: [{
          start_time: '',
          work_phase: '',
          behavior_breakdown: '',
          project_id: '',
        }],
        transferData: [],
        transfer: [],
        optionsdata: [],
        optionsdate: [],
        optiondate: [],
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
        determine: {
          user_id: '',
          project_id: '',
          project_name: [],
        },
        Riqickeck: true,
        xsTable: false,
        program: false,
        code2: 'PP008',
        multiple2: false,
        data2: '',
        code3: 'PP009',
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
      this.companyform.log_date = this.$route.params.date;
      this.buttonList = [
        {
          key: 'btnSave',
          name: 'button.confirm',
        },
        {
          key: 'mingtian',
          name: 'button.mingtian',
        },
      ];
      this.loading = true;
      this.$store
        .dispatch('PFANS5008Store/getProjectList', {})
        .then(response => {
          const data = [];
          for (let i = 0; i < response.length; i++) {
            data.push({
              key: response[i].project_id,
              label: response[i].project_name,
            });
          }
          this.transferData = data;
          this.$store
            .dispatch('PFANS5008Store/getDataList', {})
            .then(response => {
              let datalist = [];
              for (let k = 0; k < response.length; k++) {
                if (this.companyform.log_date === moment(response[k].log_date).format('YYYY-MM-DD')) {
                  for (let i = 0; i < this.transferData.length; i++) {
                    if (this.transferData[i].key === response[k].project_id) {
                      response[k].project_id = this.transferData[i].label;
                    }
                  }
                  if (response[k].work_phase !== null && response[k].work_phase !== '') {
                    let letErrortype = getDictionaryInfo(response[k].work_phase);
                    if (letErrortype != null) {
                      response[k].work_phase = letErrortype.value1;
                    }
                  }
                  if (response[k].behavior_breakdown !== null && response[k].behavior_breakdown !== '') {
                    let letErrortype = getDictionaryInfo(response[k].behavior_breakdown);
                    if (letErrortype != null) {
                      response[k].behavior_breakdown = letErrortype.value1;
                    }
                  }
                  let obj = {};
                  obj.start_time = response[k].time_start;
                  obj.work_phase = response[k].work_phase;
                  obj.behavior_breakdown = response[k].behavior_breakdown;
                  obj.project_id = response[k].project_id;
                  this.xsTable = true;
                  obj.logmanagementid = response[k].logmanagement_id;
                  datalist[k] = obj;
                  this.DataList = datalist;
                  this.xsTable = true;
                }
              }
            });
          this.loading = false;
        });
      this.disable = this.$route.params.disabled;
      let c = this.$route.params._id;
      if (c === '') {
        if (this.disable) {
          this.companyform.log_date = new Date();
          this.buttonList = [
            {
              key: 'btnSave',
              name: 'button.confirm',
            },
            {
              key: 'mingtian',
              name: 'button.mingtian',
            },
          ];
          this.loading = true;
          this.$store
            .dispatch('PFANS5008Store/getProjectList', {})
            .then(response => {
              const data = [];
              for (let i = 0; i < response.length; i++) {
                data.push({
                  key: response[i].project_id,
                  label: response[i].project_name,
                });
              }
              this.transferData = data;
              this.$store
                .dispatch('PFANS5008Store/getDataList', {})
                .then(response => {
                  const data = [];
                  let datalist = [];
                  for (let k = 0; k < response.length; k++) {
                    if (response[k].has_project === '01') {
                      if (moment(response[k].log_date).format('YYYY-MM-DD') === moment(new Date()).format('YYYY-MM-DD')) {
                        for (let i = 0; i < this.transferData.length; i++) {
                          if (this.transferData[i].key === response[k].project_id) {
                            response[k].project_id = this.transferData[i].label;
                          }
                        }
                        if (response[k].work_phase !== null && response[k].work_phase !== '') {
                          let letErrortype = getDictionaryInfo(response[k].work_phase);
                          if (letErrortype != null) {
                            response[k].work_phase = letErrortype.value1;
                          }
                        }
                        if (response[k].behavior_breakdown !== null && response[k].behavior_breakdown !== '') {
                          let letErrortype = getDictionaryInfo(response[k].behavior_breakdown);
                          if (letErrortype != null) {
                            response[k].behavior_breakdown = letErrortype.value1;
                          }
                        }
                        let obj = {};
                        obj.start_time = response[k].time_start;
                        obj.work_phase = response[k].work_phase;
                        obj.behavior_breakdown = response[k].behavior_breakdown;
                        obj.project_id = response[k].project_id;
                        this.xsTable = true;
                        obj.logmanagementid = response[k].logmanagement_id;
                        datalist[k] = obj;
                        this.xsTable = true;
                      }
                    }
                  }
                  this.DataList = datalist;
                });
            });
        }
      }
    },
    mounted() {
      this.getCompanyProjectList();
      this.loading = true;
      this.$store
        .dispatch('PFANS5008Store/getProjectList', {})
        .then(response => {
          this.optionsdata = [];
          let user_id = this.$store.getters.userinfo.userid;
          for (let i = 0; i < response.length; i++) {
            if (user_id === response[i].user_id) {
              var vote = {};
              vote.value = response[i].project_id,
                vote.lable = response[i].project_name,
                this.optionsdata.push(vote);
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
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS5008Store/getDataOne', {'logmanagement_id': this.$route.params._id})
          .then(response => {
            this.data = response;
            if (this.data.has_project === '01') {
              this.companyform = this.data;
              this.$store
                .dispatch('PFANS5008Store/getProjectList', {})
                .then(response => {
                  const data = [];
                  for (let i = 0; i < response.length; i++) {
                    data.push({
                      key: response[i].project_id,
                      label: response[i].project_name,
                    });
                  }
                  this.transferData = data;
                  this.$store
                    .dispatch('PFANS5008Store/getDataList', {})
                    .then(response => {
                      let datalist = [];
                      for (let k = 0; k < response.length; k++) {
                        if (moment(this.data.log_date).format('YYYY-MM-DD') === moment(response[k].log_date).format('YYYY-MM-DD')) {
                          for (let i = 0; i < this.transferData.length; i++) {
                            if (this.transferData[i].key === response[k].project_id) {
                              response[k].project_id = this.transferData[i].label;
                            }
                          }
                          if (response[k].work_phase !== null && response[k].work_phase !== '') {
                            let letErrortype = getDictionaryInfo(response[k].work_phase);
                            if (letErrortype != null) {
                              response[k].work_phase = letErrortype.value1;
                            }
                          }
                          if (response[k].behavior_breakdown !== null && response[k].behavior_breakdown !== '') {
                            let letErrortype = getDictionaryInfo(response[k].behavior_breakdown);
                            if (letErrortype != null) {
                              response[k].behavior_breakdown = letErrortype.value1;
                            }
                          }
                          let obj = {};
                          obj.start_time = response[k].time_start;
                          obj.work_phase = response[k].work_phase;
                          obj.behavior_breakdown = response[k].behavior_breakdown;
                          obj.project_id = response[k].project_id;
                          this.xsTable = true;
                          obj.logmanagementid = response[k].logmanagement_id;
                          datalist[k] = obj;
                          this.xsTable = true;
                        }

                      }
                      this.DataList = datalist;
                    });
                });
            }
            this.loading = false;
          });
      }
    },
    methods: {
      rowclick(row, event, column) {
        this.row = row.logmanagementid;
        this.loading = true;
        this.$store
          .dispatch('PFANS5008Store/getDataOne', {'logmanagement_id': this.row})
          .then(response => {
            this.companyform = response;
            this.loading = false;
          });
      },
      riqi() {
        this.xsTable = false;
        this.loading = true;
        this.$store
          .dispatch('PFANS5008Store/getDataList', {})
          .then(response => {
            let datalist = [];
            for (let k = 0; k < response.length; k++) {
              if (moment(this.companyform.log_date).format('YYYY-MM-DD') === moment(response[k].log_date).format('YYYY-MM-DD')) {
                for (let i = 0; i < this.transferData.length; i++) {
                  if (this.transferData[i].key === response[k].project_id) {
                    response[k].project_id = this.transferData[i].label;
                  }
                }
                if (response[k].work_phase !== null && response[k].work_phase !== '') {
                  let letErrortype = getDictionaryInfo(response[k].work_phase);
                  if (letErrortype != null) {
                    response[k].work_phase = letErrortype.value1;
                  }
                }
                if (response[k].behavior_breakdown !== null && response[k].behavior_breakdown !== '') {
                  let letErrortype = getDictionaryInfo(response[k].behavior_breakdown);
                  if (letErrortype != null) {
                    response[k].behavior_breakdown = letErrortype.value1;
                  }
                }
                let obj = {};
                obj.start_time = response[k].time_start;
                obj.work_phase = response[k].work_phase;
                obj.behavior_breakdown = response[k].behavior_breakdown;
                obj.project_id = response[k].project_id;
                this.xsTable = true;
                obj.logmanagementid = response[k].logmanagement_id;
                datalist[k] = obj;
                this.xsTable = true;
              }
            }
            this.DataList = datalist;
            this.loading = false;
          });
      },
      handleChange(value, direction, movedKeys) {
        this.optionsdate = [];
        if (direction === 'right') {
          for (var k = 0; k < value.length; k++) {
            var vote = {};
            vote.value = value[k];
            this.optionsdate.push(vote);
          }
          this.determine.project_id = this.optionsdate;
        }
      },
      submitForm(determine) {
        if (this.determine.project_id == '') {
          this.$store
            .dispatch('PFANS5008Store/deletePersonal', {
              user_id: this.$store.getters.userinfo.userid,
            })
            .then(response => {
              this.$store
                .dispatch('PFANS5008Store/getProjectList', {})
                .then(response => {
                  this.optionsdata = [];
                  let user_id = this.$store.getters.userinfo.userid;
                  for (let i = 0; i < response.length; i++) {
                    if (user_id === response[i].user_id) {
                      var vote = {};
                      vote.value = response[i].project_id,
                        vote.lable = response[i].project_name,
                        this.optionsdata.push(vote);
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
            });
        } else if (this.determine.project_id != '') {
          determine.user_id = this.$store.getters.userinfo.userid;
          const data = [];
          for (let i = 0; i < this.transfer.length; i++) {
            for (var m = 0; m < determine.project_id.length; m++) {
              if (this.transfer[i].key === determine.project_id[m].value) {
                data.push({
                  project_id: determine.project_id[m].value,
                  project_name: this.transfer[i].label,
                  user_id: determine.user_id,
                });
              }
            }
          }
          this.optiondate = data;
          this.loading = true;
          this.baseInfo = {};
          this.baseInfo.personalprojects = [];
          for (let i = 0; i < this.optiondate.length; i++) {
            this.baseInfo.personalprojects.push({
              project_id: this.optiondate[i].project_id,
              project_name: this.optiondate[i].project_name,
              user_id: this.optiondate[i].user_id,
            });
          }

          this.$store
            .dispatch('PFANS5008Store/deletePersonal', {
              user_id: this.$store.getters.userinfo.userid,
            })
            .then(response => {
              this.$store
                .dispatch('PFANS5008Store/createProject', this.baseInfo)
                .then(response => {
                  this.List = response;
                  this.$store
                    .dispatch('PFANS5008Store/getProjectList', {})
                    .then(response => {
                      this.optionsdata = [];
                      let user_id = this.$store.getters.userinfo.userid;
                      for (let i = 0; i < response.length; i++) {
                        if (user_id === response[i].user_id) {
                          var vote = {};
                          vote.value = response[i].project_id,
                            vote.lable = response[i].project_name,
                            this.optionsdata.push(vote);
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
                  this.data = response;
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
            });
          this.loading = false;
          this.program = false;
        }
        this.program = false;
      },
      getCompanyProjectList() {
        this.loading = true;
        this.$store
          .dispatch('PFANS5008Store/getCompanyProjectList', {})
          .then(response => {
            const data = [];
            for (let i = 0; i < response.length; i++) {
                if(response[i].status=='5'||response[i].status=='6'||response[i].status=='7'||response[i].status=='8'){
                    data.push({
                        key: response[i].companyprojects_id,
                        label: response[i].project_name,
                    });
                }
            }
            this.transfer = data;
            console.log("aaa",this.transfer)
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
      buttonClick(val) {
        if (val === 'mingtian') {
          this.xsTable = false;
          this.companyform.log_date = moment(this.companyform.log_date).add(1, 'days').format('YYYY-MM-DD');
          this.companyform.time_start = '';
          this.companyform.wbs_id = '';
          this.companyform.behavior_breakdown = '';
          this.companyform.work_phase = '';
          this.companyform.work_memo = '';
          this.loading = true;
          this.$store
            .dispatch('PFANS5008Store/getDataList', {})
            .then(response => {
              const data = [];
              let datalist = [];
              for (let k = 0; k < response.length; k++) {
                if (moment(response[k].log_date).format('YYYY-MM-DD') === moment(this.companyform.log_date).format('YYYY-MM-DD')) {
                  for (let i = 0; i < this.transferData.length; i++) {
                    if (this.transferData[i].key === response[k].project_id) {
                      response[k].project_id = this.transferData[i].label;
                    }
                  }
                  if (response[k].work_phase !== null && response[k].work_phase !== '') {
                    let letErrortype = getDictionaryInfo(response[k].work_phase);
                    if (letErrortype != null) {
                      response[k].work_phase = letErrortype.value1;
                    }
                  }
                  if (response[k].behavior_breakdown !== null && response[k].behavior_breakdown !== '') {
                    let letErrortype = getDictionaryInfo(response[k].behavior_breakdown);
                    if (letErrortype != null) {
                      response[k].behavior_breakdown = letErrortype.value1;
                    }
                  }
                  let obj = {};
                  obj.start_time = response[k].time_start;
                  obj.work_phase = response[k].work_phase;
                  obj.behavior_breakdown = response[k].behavior_breakdown;
                  obj.project_id = response[k].project_id;
                  this.xsTable = true;
                  obj.logmanagementid = response[k].logmanagement_id;
                  datalist[k] = obj;
                  this.xsTable = true;
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
              if (this.$route.params._id) {
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
                      .dispatch('PFANS5008Store/getDataList', {})
                      .then(response => {
                        let datalist = [];
                        for (let k = 0; k < response.length; k++) {
                          if (moment(response[k].log_date).format('YYYY-MM-DD') === moment(this.companyform.log_date).format('YYYY-MM-DD')) {
                            for (let i = 0; i < this.transferData.length; i++) {
                              if (this.transferData[i].key === response[k].project_id) {
                                response[k].project_id = this.transferData[i].label;
                              }
                            }
                            if (response[k].work_phase !== null && response[k].work_phase !== '') {
                              let letErrortype = getDictionaryInfo(response[k].work_phase);
                              if (letErrortype != null) {
                                response[k].work_phase = letErrortype.value1;
                              }
                            }
                            if (response[k].behavior_breakdown !== null && response[k].behavior_breakdown !== '') {
                              let letErrortype = getDictionaryInfo(response[k].behavior_breakdown);
                              if (letErrortype != null) {
                                response[k].behavior_breakdown = letErrortype.value1;
                              }
                            }
                            let obj = {};
                            obj.start_time = response[k].time_start;
                            obj.work_phase = response[k].work_phase;
                            obj.behavior_breakdown = response[k].behavior_breakdown;
                            obj.project_id = response[k].project_id;
                            this.xsTable = true;
                            obj.logmanagementid = response[k].logmanagement_id;
                            datalist[k] = obj;
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
                      .dispatch('PFANS5008Store/getDataList', {})
                      .then(response => {
                        let datalist = [];
                        for (let k = 0; k < response.length; k++) {
                          if (moment(this.companyform.log_date).format('YYYY-MM-DD') === moment(response[k].log_date).format('YYYY-MM-DD')) {
                            for (let i = 0; i < this.transferData.length; i++) {
                              if (this.transferData[i].key === response[k].project_id) {
                                response[k].project_id = this.transferData[i].label;
                              }
                            }
                            if (response[k].work_phase !== null && response[k].work_phase !== '') {
                              let letErrortype = getDictionaryInfo(response[k].work_phase);
                              if (letErrortype != null) {
                                response[k].work_phase = letErrortype.value1;
                              }
                            }
                            if (response[k].behavior_breakdown !== null && response[k].behavior_breakdown !== '') {
                              let letErrortype = getDictionaryInfo(response[k].behavior_breakdown);
                              if (letErrortype != null) {
                                response[k].behavior_breakdown = letErrortype.value1;
                              }
                            }
                            let obj = {};
                            obj.start_time = response[k].time_start;
                            obj.work_phase = response[k].work_phase;
                            obj.behavior_breakdown = response[k].behavior_breakdown;
                            obj.project_id = response[k].project_id;
                            this.xsTable = true;
                            obj.logmanagementid = response[k].logmanagement_id;
                            datalist[k] = obj;
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
        }
      },
      JDjobs(value1) {
        this.companyform.work_phase = value1;
      },
      XWXF(value3) {
        this.companyform.behavior_breakdown = value3;
      },
      clickdata() {
        if (this.companyform.log_date == null) {
          this.Riqickeck = false;
        } else {
          this.Riqickeck = true;
        }
        this.xsTable = false;
        this.loading = true;
        this.$store
          .dispatch('PFANS5008Store/getProjectList', {})
          .then(response => {
            const data = [];
            for (let i = 0; i < response.length; i++) {
              data.push({
                key: response[i].project_id,
                label: response[i].project_name,
              });
            }
            this.transferData = data;
            let log_date = moment(this.companyform.log_date).format('YYYY-MM-DD');
            this.$store
              .dispatch('PFANS5008Store/getDataList', {})
              .then(response => {
                const data = [];
                let datalist = [];
                for (let k = 0; k < response.length; k++) {
                  if (response[k].has_project === '01') {
                    let log_date3 = moment(response[k].log_date).format('YYYY-MM-DD');
                    if (log_date3 === log_date) {
                      for (let i = 0; i < this.transferData.length; i++) {
                        if (this.transferData[i].key === response[k].project_id) {
                          response[k].project_id = this.transferData[i].label;
                        }
                      }
                      if (response[k].work_phase !== null && response[k].work_phase !== '') {
                        let letErrortype = getDictionaryInfo(response[k].work_phase);
                        if (letErrortype != null) {
                          response[k].work_phase = letErrortype.value1;
                        }
                      }
                      if (response[k].behavior_breakdown !== null && response[k].behavior_breakdown !== '') {
                        let letErrortype = getDictionaryInfo(response[k].behavior_breakdown);
                        if (letErrortype != null) {
                          response[k].behavior_breakdown = letErrortype.value1;
                        }
                      }
                      let obj = {};
                      obj.start_time = response[k].time_start;
                      obj.work_phase = response[k].work_phase;
                      obj.behavior_breakdown = response[k].behavior_breakdown;
                      obj.project_id = response[k].project_id;
                      this.xsTable = true;
                      obj.logmanagementid = response[k].logmanagement_id;
                      datalist[k] = obj;
                      this.xsTable = true;
                    }
                  }
                }
                this.DataList = datalist;
              });
          });
        this.loading = false;
      },
    },
    watch: {
      'companyform.log_date'(val){
          this.riqi();
      }
    }
  };
</script>
<style lang="scss">
  .appManage {
    .el-calendar-day {
      height: 2.8rem;
    }
  }

  .el-form-item__error {
    width: 15rem;
  }
</style>
