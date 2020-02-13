<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :canStart="canStart" :title="title" @buttonClick="buttonClick"
                         @end="end"
                         @start="start" @workflowState="workflowState" ref="container" v-loading="loading">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="refform"
                 style="padding: 2rem">
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane :label="$t('label.PFANS5009FORMVIEW_PROJECTINFORMATION')" name="first">
              <el-collapse>
                <el-collapse-item>
                  <template slot="title">
                    <span class="collapse_Title">{{$t('label.PFANS5009FORMVIEW_PROJECTBASICINFORMATION')}}</span>
                  </template>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :error="errorcenter" :label="$t('label.center')" prop="center_id">
                        <org :disabled="!disabled" :error="errorcenter" :orglist="centerorglist"
                             @getOrgids="getCenterId"
                             orgtype="1" style="width:20vw"></org>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :error="errorgroup" :label="$t('label.group')" prop="group_id">
                        <org :disabled="!disabled" :error="errorgroup" :orglist="grouporglist" @getOrgids="getGroupId"
                             orgtype="2" style="width:20vw"></org>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.team')">
                        <org :disabled="!disabled" :orglist="teamorglist" @getOrgids="getTeamId" orgtype="3"
                             style="width:20vw"></org>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5009FORMVIEW_NAME1')" prop="project_name">
                        <el-input :disabled="!disabled" maxlength='20' style="width:20vw"
                                  v-model="form.project_name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5009FORMVIEW_NAME2')" prop="project_namejp">
                        <el-input :disabled="!disabled" maxlength='5' style="width:20vw"
                                  v-model="form.project_namejp"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5009FORMVIEW_PL')" prop="leaderid">
                        <el-input :disabled="!disabled" maxlength='50' style="width:20vw"
                                  v-model="form.leaderid"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5009FORMVIEW_TL')" prop="managerid">
                        <el-input :disabled="!disabled" maxlength='50' style="width:20vw"
                                  v-model="form.managerid"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5009FORMVIEW_TYPE')" prop="projecttype">
                        <dicselect
                          :code="code"
                          :data="form.projecttype"
                          :disabled="!disabled"
                          :multiple="multiple1"
                          @change="getType"
                          style="width:20vw">
                        </dicselect>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5009FORMVIEW_AREA')" prop="field">
                        <dicselect
                          :code="code1"
                          :data="form.field"
                          :disabled="!disabled"
                          :multiple="multiple1"
                          @change="getArea"
                          style="width:20vw">
                        </dicselect>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5009FORMVIEW_LANGUAGE')" prop="language">
                        <el-input :disabled="!disabled" maxlength='20' style="width:20vw"
                                  v-model="form.language"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5009FORMVIEW_STARTTIME')" prop="startdate">
                        <el-date-picker :disabled="!disabled" style="width:20vw" type="date"
                                        v-model="form.startdate"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5009FORMVIEW_ENDTIME')" prop="enddate">
                        <el-date-picker :disabled="!disabled" style="width:20vw" type="date"
                                        v-model="form.enddate"></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5009FORMVIEW_WORK')" prop="work">
                        <el-input-number
                          :disabled="!disabled"
                          :max="99999"
                          :min="0"
                          :precision="0"
                          :step="1"
                          controls-position="right"
                          style="width:20vw"
                          v-model.trim="form.work">
                        </el-input-number>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5009FORMVIEW_DEADLINE')" prop="deadline">
                        <el-date-picker :disabled="!disabled" style="width:20vw" type="date"
                                        v-model="form.deadline"></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-collapse-item>
              </el-collapse>
              <el-collapse>
                <el-collapse-item>
                  <template slot="title">
                    <span class="collapse_Title">{{$t('label.PFANS5009FORMVIEW_THEME')}}</span>
                  </template>
                </el-collapse-item>
              </el-collapse>
              <el-collapse>
                <el-collapse-item>
                  <template slot="title">
                    <span class="collapse_Title">{{$t('label.PFANS5009FORMVIEW_CONTRACT')}}</span>
                  </template>
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>

            <el-tab-pane :label="$t('label.PFANS5009FORMVIEW_STAGEINFORMATION')" name="second">
              <el-table :data="tableP" header-cell-class-name="sub_bg_color_blue" stripe border>
                <el-table-column :label="$t('label.PFANS5009FORMVIEW_PHASE')" align="center" width="100">
                  <template slot-scope="scope">
                    <el-input :disabled="true" :no="scope.row" maxlength="20" style="width: 100%;"
                              v-model.trim="scope.row.phase"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS5009FORMVIEW_STAGEPRODUCT')" align="center" width="100">
                  <template slot-scope="scope">
                    <el-input :disabled="true" :no="scope.row" maxlength="20" style="width: 100%;"
                              v-model.trim="scope.row.stageproduct"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS5009FORMVIEW_PRODUCTSTATUS')" align="center" width="100">
                  <template slot-scope="scope">
                    <el-input :disabled="true" :no="scope.row" maxlength="20" style="width: 100%;"
                              v-model.trim="scope.row.productstatus"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS5009FORMVIEW_ESTIMATEDWORK')" align="center" width="150">
                  <template slot-scope="scope">
                    <el-input-number
                      :disabled="true"
                      :no="scope.row"
                      :max="99999"
                      :min="0"
                      :precision="0"
                      :step="1"
                      controls-position="right"
                      style="width:100%"
                      v-model.trim="scope.row.estimatedwork">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS5009FORMVIEW_ACTUALWORK')" align="center" width="150">
                  <template slot-scope="scope">
                    <el-input-number
                      :disabled="!disabled"
                      :no="scope.row"
                      :max="99999"
                      :min="0"
                      :precision="0"
                      :step="1"
                      controls-position="right"
                      style="width:100%"
                      v-model.trim="scope.row.actualwork">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS5009FORMVIEW_ESTIMATEDSTARTTIME')" align="center" width="100">
                  <template slot-scope="scope">
                    <el-input :disabled="true" :no="scope.row" maxlength="20" style="width: 100%;"
                              v-model.trim="scope.row.estimatedstarttime"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS5009FORMVIEW_ESTIMATEDENDTIME')" align="center" width="100">
                  <template slot-scope="scope">
                    <el-input :disabled="true" :no="scope.row" maxlength="20" style="width: 100%;"
                              v-model.trim="scope.row.estimatedendtime"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS5009FORMVIEW_REMARKS')" align="center" width="100">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled" :no="scope.row" maxlength="20" style="width: 100%;"
                              v-model.trim="scope.row.remarks"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS5009FORMVIEW_ACTUALSTARTTIME')" align="center" width="100">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled" :no="scope.row" maxlength="20" style="width: 100%;"
                              v-model.trim="scope.row.actualstarttime"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS5009FORMVIEW_ACTUALENDTIME')" align="center" width="100">
                  <template slot-scope="scope">
                    <el-input :disabled="!disabled" :no="scope.row" maxlength="20" style="width: 100%;"
                              v-model.trim="scope.row.actualendtime"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS5009FORMVIEW_PRODUCT')" align="center" width="100">
                  <template slot-scope="scope">
                    <el-switch
                      :disabled="!disabled"
                      :no="scope.row"
                      @change="getProduct(scope.row)"
                      active-value="1"
                      inactive-value="0"
                      v-model.trim="scope.row.product"
                    >
                    </el-switch>
                  </template>
                </el-table-column>
<!--                <el-table-column :label="$t('label.operation')" align="center" width="200">-->
<!--                  <template slot-scope="scope">-->
<!--                    <el-button-->
<!--                      :disabled="!disabled"-->
<!--                      @click.native.prevent="deleteRow(scope.$index, tableP)"-->
<!--                      plain-->
<!--                      size="small"-->
<!--                      type="danger"-->
<!--                    >{{$t('button.delete')}}-->
<!--                    </el-button>-->
<!--                    <el-button-->
<!--                      :disabled="!disable"-->
<!--                      @click="addRow()"-->
<!--                      plain-->
<!--                      size="small"-->
<!--                      type="primary"-->
<!--                    >{{$t('button.insert')}}-->
<!--                    </el-button>-->
<!--                  </template>-->
<!--                </el-table-column>-->
              </el-table>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS5009FORMVIEW_PROJECTSYSTEM')" name="third">
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS5009FORMVIEW_WORKSTATISTICS')" name="forth">
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS5009FORMVIEW_PROJECTANALYSIS')" name="fifth">
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS5009FORMVIEW_PROJECTQCD')" name="sixth">
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import PFANS5009View from '../PFANS5009/PFANS5009View.vue';
  import dicselect from '../../../components/dicselect.vue';
  import {Message} from 'element-ui';
  import moment from 'moment';
  import org from '../../../components/org';

  export default {
    name: 'PFANS5009FormView',
    components: {
      EasyNormalContainer,
      PFANS5009View,
      dicselect,
      org,
    },
    data() {
      var checkcenter = (rule, value, callback) => {
        if (!value || value === '') {
          this.errorcenter = this.$t('normal.error_09') + this.$t('label.center');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.center')));
        } else {
          this.errorcenter = '';
          return callback();
        }

      };
      var checkgroup = (rule, value, callback) => {
        if (!value || value === '') {
          this.errorgroup = this.$t('normal.error_09') + this.$t('label.group');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.group')));
        } else {
          this.errorgroup = '';
          return callback();
        }

      };
      return {
        centerorglist: '',
        grouporglist: '',
        teamorglist: '',
        loading: false,
        errorcenter: '',
        errorgroup: '',
        activeName: 'first',
        title: 'title.PFANS5009VIEW',
        buttonList: [],
        tabIndex: 0,
        multiple1: false,
        form: {
          center_id: '',
          group_id: '',
          team_id: '',
          project_name: '',
          project_namejp: '',
          leaderid: '',
          managerid: '',
          projecttype: '',
          field: '',
          language: '',
          startdate: moment(new Date()).format('YYYY-MM-DD'),
          enddate: '',
          work: '',
          deadline: moment(new Date()).format('YYYY-MM-DD'),
        },
        tableP: [{
          companyprojects_id: '',
          stageinformation_id: '',
          phase: '',
          stageproduct: '',
          productstatus: '',
          estimatedwork: '',
          actualwork: '',
          estimatedstarttime: '',
          estimatedendtime: '',
          remarks: '',
          actualstarttime: '',
          actualendtime: '',
          product: '',
          rowindex: '',
        }],
        code: 'PP001',
        code1: 'PP002',
        disabled: true,
        menuList: [],
        rules: {
          center_id: [
            {
              required: true,
              validator: checkcenter,
              trigger: 'change',
            },
          ],
          group_id: [
            {
              required: true,
              validator: checkgroup,
              trigger: 'change',
            },
          ],
          project_name: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS5009FORMVIEW_NAME1'),
              trigger: 'blur',
            },
          ],
          project_namejp: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS5009FORMVIEW_NAME2'),
              trigger: 'blur',
            },
          ],
          leaderid: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS5009FORMVIEW_PL'),
              trigger: 'blur',
            },
          ],
          managerid: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS5009FORMVIEW_TL'),
              trigger: 'blur',
            },
          ],
          projecttype: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS5009FORMVIEW_TYPE'),
              trigger: 'change',
            },
          ],
          field: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS5009FORMVIEW_AREA'),
              trigger: 'change',
            },
          ],
          language: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS5009FORMVIEW_LANGUAGE'),
              trigger: 'blur',
            },
          ],
          startdate: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS5009FORMVIEW_STARTTIME'),
              trigger: 'change',
            },
          ],
          enddate: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS5009FORMVIEW_ENDTIME'),
              trigger: 'change',
            },
          ],
          work: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS5009FORMVIEW_WORK'),
              trigger: 'blur',
            },
          ],
          deadline: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS5009FORMVIEW_DEADLINE'),
              trigger: 'change',
            },
          ],
        },
        canStart: false,
      };
    },
    mounted() {
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS5009Store/selectById', {'companyprojects_id': this.$route.params._id})
          .then(response => {
            this.form = response.companyprojects;
            this.centerorglist = this.form.center_id;
            this.grouporglist = this.form.group_id;
            this.teamorglist = this.form.team_id;
            this.baseInfo.companyprojects=JSON.parse(JSON.stringify(this.form));
            this.baseInfo.stageinformation = JSON.parse(JSON.stringify(this.tableP));
            if (response.stageinformation.length > 0) {
              this.tableP = response.stageinformation;
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
    created() {
      this.disabled = this.$route.params.disabled;
      if (this.disabled) {
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
      getCenterId(val) {
        this.form.center_id = val;
        this.centerorglist = val;
        if (!this.form.center_id || this.form.center_id === '' || val === 'undefined') {
          this.errorcenter = this.$t('normal.error_09') + this.$t('label.center');
        } else {
          this.errorcenter = '';
        }
      },
      getGroupId(val) {
        this.form.group_id = val;
        this.grouporglist = val;
        if (!this.form.group_id || this.form.group_id === '' || val === 'undefined') {
          this.errorgroup = this.$t('normal.error_09') + this.$t('label.group');
        } else {
          this.errorgroup = '';
        }
      },
      getTeamId(val) {
        this.form.team_id = val;
        this.teamorglist = val;
      },
      getProduct(row){
        if(row.product === '1'){
          row.productstatus = this.$t('label.PFANS5009FORMVIEW_SUBMITTED');
        }else{
          row.productstatus = this.$t('label.PFANS5009FORMVIEW_NOTSUBMITTED');
        }
      },
      getArea(val) {
        this.form.field = val;
      },
      getType(val) {
        this.form.projecttype = val;
      },
      // workflowState(val) {
      //   if (val.state === '1') {
      //     this.form.status = '3';
      //   } else if (val.state === '2') {
      //     this.form.status = '4';
      //   }
      //   this.buttonClick('update');
      // },
      // start() {
      //   this.form.status = '2';
      //   this.buttonClick('update');
      // },
      // end() {
      //   this.form.status = '0';
      //   this.buttonClick('update');
      // },
      // getCompanyProjectList() {
      //   this.loading = true;
      //   this.$store
      //     .dispatch('PFANS5009Store/getCompanyProjectList', {})
      //     .then(response => {
      //       this.optionsdata = [];
      //       for (let i = 0; i < response.length; i++) {
      //         var vote = {};
      //         vote.value = response[i].companyprojects_id;
      //         vote.lable = response[i].project_name;
      //         this.optionsdata.push(vote);
      //       }
      //       this.loading = false;
      //     })
      //     .catch(error => {
      //       Message({
      //         message: error,
      //         type: 'error',
      //         duration: 5 * 1000,
      //       });
      //       this.loading = false;
      //     });
      // },
      buttonClick(val) {
        this.$refs['refform'].validate(valid => {
          if (valid) {
            this.loading = true;
            this.baseInfo = {};
            this.baseInfo.companyprojects = JSON.parse(JSON.stringify(this.form));
            this.baseInfo.stageInformation = [];
            for (let i = 0; i < this.tableP.length; i++) {
              if (
                this.tableP[i].phase !== "" ||
                this.tableP[i].stageproduct !== "" ||
                this.tableP[i].productstatus !== "" ||
                this.tableP[i].estimatedwork !== ""||
                this.tableP[i].actualwork !== "" ||
                this.tableP[i].estimatedstarttime !== "" ||
                this.tableP[i].estimatedendtime !== "" ||
                this.tableP[i].remarks !== "" ||
                this.tableP[i].actualstarttime !== "" ||
                this.tableP[i].actualendtime !== "" ||
                this.tableP[i].product !== ""
              ) {
                this.baseInfo.stageInformation.push({
                  stageInformation_id: this.tableP[i].stageInformation_id,
                  companyprojects_id: this.tableP[i].companyprojects_id,
                  phase: this.tableP[i].phase,
                  stageproduct: this.tableP[i].stageproduct,
                  productstatus: this.tableP[i].productstatus,
                  estimatedwork: this.tableP[i].estimatedwork,
                  actualwork: this.tableP[i].actualwork,
                  estimatedstarttime: this.tableP[i].estimatedstarttime,
                  estimatedendtime: this.tableP[i].estimatedendtime,
                  remarks: this.tableP[i].remarks,
                  actualstarttime: this.tableP[i].actualstarttime,
                  actualendtime: this.tableP[i].actualendtime,
                  product: this.tableP[i].product
                });
              }
            }if (this.$route.params._id) {
              this.form.projectinformation = this.$route.params._id;
              this.form.center_id = this.centerorglist;
              this.form.group_id = this.grouporglist;
              this.form.team_id = this.teamorglist;
              this.form.startdate = moment(this.form.startdate).format('YYYY-MM-DD');
              this.form.enddate = moment(this.form.enddate).format('YYYY-MM-DD');
              this.form.deadline = moment(this.form.deadline).format('YYYY-MM-DD');
              this.loading = true;
              this.$store
                .dispatch('PFANS5009Store/updateRecruit', this.form)
                .then(response => {
                  this.data = response;
                  this.loading = false;
                  if (val !== 'update') {
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

            }
            // else {
            //   this.form.application_date = moment(this.form.application_date).format('YYYY-MM-DD');
            //   this.form.turningday = moment(this.form.turningday).format('YYYY-MM-DD');
            //   this.form.expectedarrivaltime = moment(this.form.expectedarrivaltime).format('YYYY-MM-DD');
            //   this.$store
            //     .dispatch('PFANS5009Store/createRecruit', this.form)
            //     .then(response => {
            //       this.data = response;
            //       this.loading = false;
            //       Message({
            //         message: this.$t('normal.success_01'),
            //         type: 'success',
            //         duration: 5 * 1000,
            //       });
            //       if (this.$store.getters.historyUrl) {
            //         this.$router.push(this.$store.getters.historyUrl);
            //       }
            //     })
            //     .catch(error => {
            //       Message({
            //         message: error,
            //         type: 'error',
            //         duration: 5 * 1000,
            //       });
            //       this.loading = false;
            //     });
            // }
          }
        });
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  .width {
    width: 13rem;
  }

  .el-table__footer-wrapper tbody td, .el-table__header-wrapper tbody td {
    color: blue;
  }
</style>
