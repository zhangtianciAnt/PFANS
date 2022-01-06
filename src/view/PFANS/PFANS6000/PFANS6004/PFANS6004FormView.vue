<template>
  <div style="min-height: 100%">
    <EasyNormalContainer ref="container" v-loading="loading" :buttonList="buttonList" :title="title"
                         @buttonClick="buttonClick" @disabled="setdisabled">
      <div slot="customize">
        <el-form ref="refform" :model="form" :rules="rules" label-position="top" label-width="8vw"
                 style="padding: 3vw">
          <!--            第一行-->
          <el-row>
            <!--            姓名-->
            <el-col :span="8">
              <el-form-item :error="errorexpname" :label="$t('label.user_name')"
                            prop="expname">
                <el-input v-model="form.expname" :disabled="true" maxlength='36'
                          style="width: 20vw"></el-input>
              </el-form-item>
            </el-col>
            <!--            性别-->
            <el-col :span="8">
              <el-form-item :label="$t('label.sex')" prop="sex">
                <dicselect
                  v-model="form.sex"
                  :code="code1"
                  :data="form.sex"
                  :disabled="true"
                  :multiple="multiple"
                  style="width:20vw"
                  @change="changesex">
                </dicselect>
              </el-form-item>
            </el-col>
            <!--            账号-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANSUSERFORMVIEW_ADFIELD')" prop="accountname">
                <el-input
                  v-model="form.accountname"
                  :disabled="!disabled"
                  maxlength="100"
                  style="width:20vw">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--            第二行-->
          <el-row>
            <!--            毕业院校-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6001VIEW_GRADUATESCHOOL')" prop="graduateschool">
                <el-input v-model="form.graduateschool" :disabled="true" maxlength="50" style="width:20vw"></el-input>
              </el-form-item>
            </el-col>
            <!--            学历-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2026VIEW_EDUCATIONALBACKGROUND')" prop="education">
                <dicselect
                  v-model="form.education"
                  :code="code2"
                  :data="form.education"
                  :disabled="true"
                  :multiple="multiple"
                  style="width:20vw"
                  @change="changeeducation">
                </dicselect>
              </el-form-item>
            </el-col>
            <!--            年龄-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANSUSERFORMVIEW_AGE')">
                <el-input v-model="age" :disabled="true" style="width:20vw"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--            第三行-->
          <el-row>
            <!--            供应商名称-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6001VIEW_SUPPLIERNAME')" prop="suppliername">
                <el-input v-model="form.suppliername" :disabled="true" maxlength="255" style="width:20vw"></el-input>
              </el-form-item>
            </el-col>
            <!--            技术分类-->
            <!--<el-col :span="8">-->
            <!--<el-form-item :label="$t('label.PFANS2003VIEW_TECHNOLOGY')" prop="technology">-->
            <!--<dicselect-->
            <!--:code="code5"-->
            <!--:data="form.technology"-->
            <!--:disabled="true"-->
            <!--:multiple="multiple"-->
            <!--@change="changetechnology"-->
            <!--style="width:20vw">-->
            <!--</dicselect>-->
            <!--</el-form-item>-->
            <!--</el-col>-->
            <!--            Rn-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6004FORMVIEW_RN')" prop="rn">
                <dicselect
                  :code="code4"
                  :data="form.rn"
                  :disabled="true"
                  :multiple="multiple"
                  style="width:20vw"
                  @change="changern">
                </dicselect>
              </el-form-item>
            </el-col>
            <!--           卒业年-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2024VIEW_GRADUATIONYEAR')" prop="graduation_year">
                <el-date-picker
                  v-model="form.graduation_year"
                  :disabled="true"
                  style="width:20vw"
                  type="year">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <!--          第四行-->
          <el-row>
            <el-col :span="2">
              <el-form-item :label="$t('label.department')">

                <!--                    add_ccm_06/04  &#45;&#45;添加履历-->
                <el-button
                  plain size="mini"
                  type="primary"
                  @click="dialogTableVisible9 = true"
                >{{ $t('label.PFANSUSERFORMVIEW_PERSONAL') }}
                </el-button>
                <el-dialog
                  :title="$t('label.department') + $t('label.PFANSUSERFORMVIEW_PERSONAL')"
                  :visible.sync="dialogTableVisible9"
                >
                  <el-row>
                    <el-col :span="24">
                      <el-table :data="expData" stripe>
                        <el-table-column
                          :label="$t('label.PFANSUSERFORMVIEW_TIME')"
                          align="center"
                          property="date"
                          width="300"
                        >
                          <template slot-scope="scope">
                            <span style="color:#75a7ef">{{ scope.row.exdatestr }}</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          :label="$t('label.department')"
                          align="center"
                          property="after"
                        >
                          <template slot-scope="scope">
                            <span style="color:#75a7ef">{{ scope.row.groupname }}</span>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-col>
                  </el-row>
                </el-dialog>
                <!--                    add_fjl_05/21  &#45;&#45;添加履历-->
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :error="errororgInformationcenterid" :label="$t('label.center')"
                            prop="orgInformationcenterid">
                <org
                  :error="errororgInformationcenterid"
                  :orglist="form.orgInformationcenterid"
                  orgtype="1"
                  selectType="Single"
                  style="width:12.4vw"
                  @getOrgids="getOrgInformationCenterid"
                ></org>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :error="errororgInformationgroupid" :label="$t('label.group')" prop="orgInformationgroupid">
                <org
                  :error="errororgInformationgroupid"
                  :orglist="form.orgInformationgroupid"
                  orgtype="2"
                  selectType="Single"
                  style="width:20vw"
                  @getOrgids="getOrgInformationGroupId"
                ></org>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')">
                <org
                  :orglist="form.orgInformationteamid"
                  orgtype="3"
                  selectType="Single"
                  style="width:20vw"
                  @getOrgids="getOrgInformationTeamid"
                ></org>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row>
            <!--            作业场所-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6004FORMVIEW_OPERATIONFORM')" prop="operationform">
                <dicselect
                  :code="code20"
                  :data="form.operationform"
                  :disabled="!disabled"
                  :multiple="multiple"
                  style="width:20vw"
                  @change="changeoperationform">
                </dicselect>
              </el-form-item>
            </el-col>
            <!--            邮箱-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANSUSERFORMVIEW_EMAILADDRESS')">
                <el-input v-model="form.email" :disabled="!disabled" maxlength="100"
                          style="width:20vw"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--          第五行-->
          <el-row>
            <!--            作业分类-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6004FORMVIEW_JOBCLASSIFICATIONM')" prop="jobclassification">
                <dicselect
                  :code="code21"
                  :data="form.jobclassification"
                  :disabled="!disabled"
                  :multiple="multiple"
                  style="width:20vw"
                  @change="changejobclassification">
                </dicselect>
              </el-form-item>
            </el-col>
            <!--            入场时间-->
            <el-col :span="8">
              <el-form-item :error="erroradmissiontime" :label="$t('label.PFANS6004FORMVIEW_ADMISSIONTIME')"
                            prop="admissiontime">
                <el-date-picker
                  v-model="form.admissiontime"
                  :disabled="!disabled"
                  style="width:20vw"
                  type="date">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <!--            编号变更卡号-->
            <!--1111-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANSUSERFORMVIEW_JOBNUMBER')" prop="number">
                <el-input
                  v-model="form.number"
                  :disabled="!disabled"
                  maxlength="20" style="width:20vw">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--                更衣柜号-->
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANSUSERFORMVIEW_LOCKERNUMBER')" prop="lockernumber">
                <el-input
                  v-model="form.lockernumber"
                  :disabled="!disabled"
                  maxlength="20" style="width:20vw">
                </el-input>
              </el-form-item>
            </el-col>
            <!--            预计退场时间-->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2002FORMVIEW_YJEXITTIME')" prop="yjexitime">
                <el-date-picker
                  v-model="form.yjexitime"
                  :disabled="!disabled"
                  style="width:20vw"
                  type="date">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>


          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('label.PFANS2003FORMVIEW_SPECIALITY')">
                <el-input v-model="form.speciality" :disabled="!disabled" :rows="2" style="width: 71vw"
                          type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--          第六行-->
          <el-collapse>
            <el-collapse-item>
              <template slot="title">
                <span class="collapse_Title">{{ $t('label.PFANS6004VIEW_EXINTELLIGENCE') }}</span>
              </template>
              <!--          第七行-->
              <el-row>
                <!--            退场与否-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS6004FORMVIEW_EXITS')" prop="exits">
                    <span style="margin-right: 1vw ">{{ $t('label.no') }}</span>
                    <el-switch v-model="form.exits"
                               :disabled="!disabled"
                               active-value="0"
                               inactive-value="1"
                               @change="changeexits"
                    ></el-switch>
                    <span style="margin-left: 1vw ">{{ $t('label.yes') }}</span>
                  </el-form-item>
                </el-col>
              </el-row>

              <!--          第八行-->
              <el-row>
                <!--            退场时间-->
                <el-col :span="8">
                  <el-form-item v-if="show" :error="errorexitime" :label="$t('label.PFANS6004FORMVIEW_EXITIME')"
                                prop="exitime">
                    <el-date-picker
                      v-model="form.exitime"
                      :disabled="!disabled"
                      style="width:20vw"
                      type="date">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <!--            退场理由-->
                <el-col :span="8">
                  <el-form-item v-if="show" :label="$t('label.PFANS6004FORMVIEW_EXITREASON')" prop="exitreason">
                    <dicselect
                      :code="code6"
                      :data="form.exitreason"
                      :disabled="!disabled"
                      :multiple="multiple"
                      style="width:20vw"
                      @change="changeexitreason">
                    </dicselect>
                  </el-form-item>
                </el-col>
                <!--            所有技术-->
                <el-col :span="8">
                  <el-form-item v-if="show" :label="$t('label.PFANS6004FORMVIEW_ALLTECHNOLOGY')" prop="alltechnology">
                    <!--                    <dicselect-->
                    <!--                      :code="code7"-->
                    <!--                      :data="form.alltechnology"-->
                    <!--                      :disabled="!disabled"-->
                    <!--                      :multiple="multiple"-->
                    <!--                      @change="changealltechnology"-->
                    <!--                      style="width:20vw">-->
                    <!--                    </dicselect>-->
                    <el-input v-model="form.alltechnology" :disabled="!disabled" maxlength="100"
                              style="width:20vw"></el-input>

                  </el-form-item>
                </el-col>
              </el-row>
              <!--          第九行-->
              <el-row>
                <!--            現場評価-->
                <el-col :span="8">
                  <el-form-item v-if="show" :label="$t('label.PFANS6004FORMVIEW_SITEVALUATION')" prop="sitevaluation">
                    <dicselect
                      :code="code8"
                      :data="form.sitevaluation"
                      :disabled="!disabled"
                      :multiple="multiple"
                      style="width:20vw"
                      @change="changesitevaluation">
                    </dicselect>
                  </el-form-item>
                </el-col>
                <!--            業務影響-->
                <el-col :span="8">
                  <el-form-item v-if="show" :label="$t('label.PFANS6004FORMVIEW_BUSINESSIMPACT')"
                                prop="businessimpact">
                    <dicselect
                      :code="code10"
                      :data="form.businessimpact"
                      :disabled="!disabled"
                      :multiple="multiple"
                      style="width:20vw"
                      @change="changebusinessimpact">
                    </dicselect>
                  </el-form-item>
                </el-col>
                <!--            対策-->
                <el-col :span="8">
                  <el-form-item v-if="show" :label="$t('label.PFANS6004FORMVIEW_COUNTERMEASURE')"
                                prop="countermeasure">
                    <!--                    <dicselect-->
                    <!--                      :code="code9"-->
                    <!--                      :data="form.countermeasure"-->
                    <!--                      :disabled="!disabled"-->
                    <!--                      :multiple="multiple"-->
                    <!--                      @change="changecountermeasure"-->
                    <!--                      style="width:20vw">-->
                    <!--                    </dicselect>-->
                    <el-input v-model="form.countermeasure" :disabled="!disabled" maxlength="100"
                              style="width:20vw"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-collapse-item>
          </el-collapse>
          <!--          最后一行-->
          <!--          项目信息-->
          <el-collapse>
            <el-collapse-item>
              <template slot="title">
                <span class="collapse_Title">{{ $t('label.PFANS6004VIEW_PROJECTINFORMATION') }}</span>
              </template>
              <el-table
                :data="tableData"
                border header-cell-class-name="sub_bg_color_blue" stripe
                style="width:100%"
              >
                <!--                部门-->
                <el-table-column
                  :label="$t('label.department')"
                  prop="group_id"
                  show-overflow-tooltip
                  width="200"
                >
                </el-table-column>
                <!--                项目-->
                <el-table-column
                  :label="$t('label.PFANS5009VIEW_PROJECTNAME')"
                  prop="project_name"
                  show-overflow-tooltip
                  width="200"
                >
                </el-table-column>
                <!--                项目类型-->
                <el-table-column
                  :label="$t('label.PFANS5001FORMVIEW_PROJECTTYPE')"
                  prop="projecttype"
                  show-overflow-tooltip
                  width="150"
                >
                </el-table-column>
                <!--                开始时间-->
                <el-table-column
                  :label="$t('label.PFANS5001FORMVIEW_STARTDATE')"
                  prop="admissiontime"
                  width="150"
                >
                </el-table-column>
                <!--                结束时间-->
                <el-table-column
                  :label="$t('label.end')"
                  prop="exittime"
                  width="150"
                >
                </el-table-column>
              </el-table>
            </el-collapse-item>
          </el-collapse>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
import EasyNormalContainer from '@/components/EasyNormalContainer';
import PFANS6004View from '../PFANS6004/PFANS6004View.vue';
import dicselect from '../../../components/dicselect.vue';
import {Message} from 'element-ui';
import moment from 'moment';
import {getDictionaryInfo, getorgGroupList, getOrgInfo, getUserInfo} from '../../../../utils/customize';
import org from '../../../components/org';

export default {
  name: 'PFANS6004FormView',
  components: {
    EasyNormalContainer,
    PFANS6004View,
    dicselect,
    org,
  },
  data() {
    var checkexpname = (rule, value, callback) => {
      if (!value || value === '') {
        this.errorexpname = this.$t('normal.error_09') + this.$t('label.user_name');
        return callback(new Error(this.$t('normal.error_09') + this.$t('label.user_name')));
      } else {
        this.errorexpname = '';
        return callback();
      }
    };

    var checkgraduateschool = (rule, value, callback) => {
      if (!value || value === '') {
        this.errorgraduateschool = this.$t('normal.error_09') + this.$t('label.PFANS6001VIEW_GRADUATESCHOOL');
        return callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS6001VIEW_GRADUATESCHOOL')));
      } else {
        this.errorgraduateschool = '';
        return callback();
      }
    };

    var checkgroup = (rule, value, callback) => {
      if (!value || value === '') {
        this.errorgroup = this.$t('normal.error_09') + this.$t('label.department');
        return callback(new Error(this.$t('normal.error_09') + this.$t('label.department')));
      } else {
        this.errorgroup = '';
        return callback();
      }
    };

    //add ccm 20210901 外注添加组织信息 fr
    var checkorgInformationcenterid = (rule, value, callback) => {
      if (!this.form.orgInformationcenterid || this.form.orgInformationcenterid === '') {
        this.errororgInformationcenterid = this.$t('normal.error_09') + this.$t('label.center');
        return callback(new Error(this.$t('normal.error_09') + this.$t('label.center')));
      } else {
        this.errororgInformationcenterid = '';
        return callback();
      }
    };
    var checkorgInformationgroupid = (rule, value, callback) => {
      if (!this.form.orgInformationgroupid || this.form.orgInformationgroupid === '') {
        this.errororgInformationgroupid = this.$t('normal.error_09') + this.$t('label.group');
        return callback(new Error(this.$t('normal.error_09') + this.$t('label.group')));
      } else {
        this.errororgInformationgroupid = '';
        return callback();
      }
    };
    //add ccm 20210901 外注添加组织信息 to


    var checksuppliername = (rule, value, callback) => {
      if (!value || value === '' || value === 'undefined') {
        this.errorsuppliername = this.$t('normal.error_09') + this.$t('label.PFANS6001VIEW_SUPPLIERNAME');
        return callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS6001VIEW_SUPPLIERNAME')));
      } else {
        this.errorsuppliername = '';
        return callback();
      }
    };
    var valadmissiontime = (rule, value, callback) => {
      if (this.form.exits == '0') {
        if (this.form.exitime !== null && this.form.exitime !== '') {
          if (moment(value).format('YYYY-MM-DD') > moment(this.form.exitime).format('YYYY-MM-DD')) {
            callback(new Error(this.$t('label.PFANS6004FORMVIEW_ADMISSIONTIME') + this.$t('normal.error_checkTime2') + this.$t('label.PFANS2002FORMVIEW_EXITTIME')));
            this.erroradmissiontime = this.$t('label.PFANS6004FORMVIEW_ADMISSIONTIME') + this.$t('normal.error_checkTime2') + this.$t('label.PFANS2002FORMVIEW_EXITTIME');
          } else {
            callback();
            this.erroradmissiontime = '';
            this.errorexitime = '';
          }
        }
      } else {
        callback();
        this.erroradmissiontime = '';
      }
    };
    var valexitime = (rule, value, callback) => {
      if (this.form.exitime !== null && this.form.exitime !== '') {
        if (moment(value).format('YYYY-MM-DD') < moment(this.form.admissiontime).format('YYYY-MM-DD')) {
          callback(new Error(this.$t('label.PFANS2002FORMVIEW_EXITTIME') + this.$t('normal.error_checkTime1') + this.$t('label.PFANS2002FORMVIEW_ADMISSIONTIME')));
          this.errorexitime = this.$t('label.PFANS2002FORMVIEW_EXITTIME') + this.$t('normal.error_checkTime1') + this.$t('label.PFANS2003FORMVIEW_INTERVIEWDATE');
        } else {
          callback();
          this.erroradmissiontime = '';
          this.errorexitime = '';
        }
      } else {
        callback();
        this.errorexitime = '';
      }
    };
    return {
      age: '',
      loading: false,
      selectType: 'Single',
      title: 'title.PFANS6004VIEW',
      errorexpname: '',
      errorsuppliername: '',
      erroradmissiontime: '',
      grouporglist: '',
      grouporglistflg: '',
      errorexitime: '',
      errorgroup: '',

      //add ccm 20210901 外注添加组织信息 fr
      errororgInformationcenterid: '',
      errororgInformationgroupid: '',
      //add ccm 20210901 外注添加组织信息 to

      errorgraduateschool: '',
      expData: null,
      dialogTableVisible9: false,
      disabled: false,
      buttonList: [],
      multiple: false,
      search: '',
      gridData1: [],
      form: {
        expatriatesinfor_id: '',
        accountname: '',
        expname: '',
        cooperuserid: '',
        sex: '',
        group_id: '',
        number: '',
        post: '',
        contactinformation: '',
        suppliername: '',
        suppliernameid: '',
        graduateschool: '',
        education: '',
        graduation_year: '',
        technology: '',
        email: '',
        rn: '',
        operationform: '',
        jobclassification: '',
        admissiontime: moment(new Date()).format('YYYY-MM-DD'),
        exitime: moment(new Date()).format('YYYY-MM-DD'),
        yjexitime: '',
        exitreason: '',
        alltechnology: '',
        sitevaluation: '',
        businessimpact: '',
        whetherentry: '',
        countermeasure: '',
        exits: '1',
        lockernumber: '',
        //add ccm 20210901 外注添加组织信息 fr
        orgInformationcenterid: '',
        orgInformationgroupid: '',
        orgInformationteamid: '',
        //add ccm 20210901 外注添加组织信息 to
      },
      tableData: [{
        group_id: '',
        project_name: '',
        projecttype: '',
        exittime: '',
        admissiontime: '',
      }],
      //性别
      code1: 'PR019',
      //学历
      code2: 'PR022',
      // 面试结果
      code3: 'BP003',
      //Rn
      code4: 'PR021',
      //技术分类
      code5: 'BP005',
      //退场理由
      code6: 'BP012',
      //所有技术
      code7: 'BP008',
      //现场评价
      code8: 'BP009',
      //対策
      code9: 'BP011',
      //業務影響
      code10: 'BP010',
      code15: 'PG021',
      //作业形态
      code20: 'BP024',
      //作业分类
      code21: 'BP025',
      result1: '',
      disabled: true,
      rules: {
        //AD域账号
        accountname: [
          {
            required: true,
            message:
              this.$t('normal.error_08') +
              this.$t('label.PFANSUSERFORMVIEW_ADFIELD'),
            trigger: 'blur',
          },
        ],
        // 姓名
        expname: [
          {
            required: true,
            validator: checkexpname,
            trigger: 'change',
          }],
        // 性别
        sex: [
          {
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.sex'),
            trigger: 'change',
          },
        ],
        //所属部门
        group_id: [
          {
            required: true,
            validator: checkgroup,
            trigger: 'change',
          },
        ],
        //add ccm 20210901 外注添加组织信息 fr
        orgInformationcenterid: [
          {
            required: true,
            validator: checkorgInformationcenterid,
            trigger: 'blur',
          },
        ],
        orgInformationgroupid: [
          {
            required: true,
            validator: checkorgInformationgroupid,
            trigger: 'blur',
          },
        ],
        //add ccm 20210901 外注添加组织信息 to
        // 编号
        number: [
          {
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANSUSERFORMVIEW_JOBNUMBER'),
            trigger: 'blur',
          },
        ],
        // 供应商名称
        suppliername: [
          {
            required: true,
            validator: checksuppliername,
            trigger: 'change',
          },
        ],
        // 毕业院校
        graduateschool: [
          {
            required: true,
            validator: checkgraduateschool,
            trigger: 'change',
          }],
        // 学历
        education: [
          {
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS2026VIEW_EDUCATIONALBACKGROUND'),
            trigger: 'change',
          },
        ],
        //毕业年
        graduation_year: [
          {
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS2024VIEW_GRADUATIONYEAR'),
            trigger: 'change',
          },
        ],
        // 作业形态
        operationform: [
          {
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS6004FORMVIEW_OPERATIONFORM'),
            trigger: 'change',
          },
        ],
        // 作业分类
        jobclassification: [
          {
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS6004FORMVIEW_JOBCLASSIFICATIONM'),
            trigger: 'change',
          },
        ],
        // 入场时间
        admissiontime: [
          {
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS6004FORMVIEW_ADMISSIONTIME'),
            trigger: 'change',
          },
          {validator: valadmissiontime, trigger: 'change'},
        ],
        // 技术分类
        technology: [
          {
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS2003VIEW_TECHNOLOGY'),
            trigger: 'change',
          },
        ],
        // Rn
        rn: [
          {
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS2003FORMVIEW_RN'),
            trigger: 'change',
          },
        ],
        // 退场时间
        exitime: [
          {
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS6004FORMVIEW_EXITIME'),
            trigger: 'change',
          },
          {validator: valexitime, trigger: 'change'},
        ],
        // 退场理由
        exitreason: [
          {
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS6004FORMVIEW_EXITREASON'),
            trigger: 'change',
          },
        ],
        // 所有技术
        // alltechnology: [
        //   {
        //     required: true,
        //     message: this.$t('normal.error_09') + this.$t('label.PFANS6004FORMVIEW_ALLTECHNOLOGY'),
        //     trigger: 'change',
        //   },
        // ],
        // 現場評価
        sitevaluation: [
          {
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS6004FORMVIEW_SITEVALUATION'),
            trigger: 'change',
          },
        ],
        // 業務影響
        businessimpact: [
          {
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS6004FORMVIEW_BUSINESSIMPACT'),
            trigger: 'change',
          },
        ],
        // 対策
        // countermeasure: [
        //   {
        //     required: true,
        //     message: this.$t('normal.error_09') + this.$t('label.PFANS6004FORMVIEW_COUNTERMEASURE'),
        //     trigger: 'change',
        //   },
        // ],
      },
      show: false,
    };
  },
  mounted() {
    if (this.$route.params._account) {
      this.selectById();
    }
    if (this.$route.params._id) {
      this.loading = true;
      this.$store
        .dispatch('PFANS6004Store/getexpatriatesinforApplyOne', {'expatriatesinfor_id': this.$route.params._id})
        .then(response => {
          this.form = response;
          //账号
          // if(this.form.account != null){
          //     let letaccount = this.form.account.split("K");
          //     if(letaccount.length === 1){
          //         this.form.account = "";
          //     }
          // }

          //ccm add
          this.$store
            .dispatch('PFANS6004Store/getGroupexpDetail', {'expatriatesinfor_id': this.$route.params._id})
            .then(response => {
              this.expData = [];

              for (let g = 0; g < response.length; g++) {
                let letexpData = {};
                if (response[g].exdatestr !== null && response[g].exdatestr !== '') {
                  letexpData.exdatestr = moment(response[g].exdatestr).format('YYYY-MM-DD');
                }
                letexpData.group_id = response[g].group_id;
                let group = getOrgInfo(response[g].group_id);
                if (group) {
                  letexpData.groupname = group.title;
                }
                this.expData.push(letexpData);
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

          //ccm add

          if (this.form.birth != '') {
            let birthdays = new Date(this.form.birth);
            let d = new Date();
            let age = 0;
            let agenew = 0;
            age = d.getFullYear() - birthdays.getFullYear();
            agenew = d.getFullYear() - birthdays.getFullYear();
            if (d.getMonth() > birthdays.getMonth() || (d.getMonth() == birthdays.getMonth() && d.getDate() > birthdays.getDate())) {
              agenew = age;
            } else {
              agenew = age - 1;
            }
            this.age = agenew;
          } else {
            this.age = 0;
          }
          // this.form.admissiontime = moment(new Date()).format('YYYY-MM-DD');
          this.grouporglist = this.form.group_id;
          this.grouporglistflg = this.form.group_id;
          this.loading = false;
          if (this.form.exits === '1') {
            this.show = false;
          } else {
            this.show = true;
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
    if (this.form.exits === '1') {
      this.show = false;
      this.rules.exitime[0].required = false;
      this.rules.exitreason[0].required = false;
      //this.rules.alltechnology[0].required = false;
      this.rules.sitevaluation[0].required = false;
      this.rules.businessimpact[0].required = false;
      //this.rules.countermeasure[0].required = false;
    } else {
      this.show = true;
      this.rules.exitime[0].required = true;
      this.rules.exitreason[0].required = true;
      //this.rules.alltechnology[0].required = true;
      this.rules.sitevaluation[0].required = true;
      this.rules.businessimpact[0].required = true;
      //this.rules.countermeasure[0].required = true;
    }
  },
  methods: {
    setdisabled(val) {
      if (this.$route.params.disabled) {
        this.disabled = val;
      }
    },
    changesex(val) {
      this.form.sex = val;
    },
    changeeducation(val) {
      this.form.education = val;
    },
    changeoperationform(val) {
      this.form.operationform = val;
      if (val === 'BP024002') {
        this.form.number = '00000';
      } else {
        this.form.number = '';
      }
    },
    changetechnology(val) {
      this.form.technology = val;
    },
    changejobclassification(val) {
      this.form.jobclassification = val;
    },
    changern(val) {
      this.form.rn = val;
    },
    changealltechnology(val) {
      this.form.alltechnology = val;
    },
    changesitevaluation(val) {
      this.form.sitevaluation = val;
    },
    changebusinessimpact(val) {
      this.form.businessimpact = val;
    },
    changecountermeasure(val) {
      this.form.countermeasure = val;
    },
    changeexitreason(val) {
      this.form.exitreason = val;
    },
    getGroupId(val) {
      this.form.group_id = val;
      this.grouporglist = val;
      if (!this.form.group_id || this.form.group_id === '' || val === 'undefined') {
        this.errorgroup = this.$t('normal.error_09') + this.$t('label.department');
      } else {
        this.errorgroup = '';
      }
    },
    //add ccm 20210901 外注添加组织信息 fr
    getOrgInformationCenterid(val) {
      this.getOrgInformation(val);
      this.form.orgInformationcenterid = val;
      if (!this.form.orgInformationcenterid || this.form.orgInformationcenterid === '' || val === 'undefined') {
        this.errororgInformationcenterid = this.$t('normal.error_09') + this.$t('label.center');
      } else {
        this.errororgInformationcenterid = '';
      }
    },
    getOrgInformationGroupId(val) {
      this.getOrgInformation(val);
      this.form.orgInformationgroupid = val;
      if (!this.form.orgInformationgroupid || this.form.orgInformationgroupid === '' || val === 'undefined') {
        this.errororgInformationgroupid = this.$t('normal.error_09') + this.$t('label.group');
      } else {
        this.errororgInformationgroupid = '';
      }
    },
    getOrgInformationTeamid(val) {
      this.getOrgInformation(val);
    },
    getOrgInformation(id) {
      let org = {};
      let treeCom = this.$store.getters.orgs;

      if (id && treeCom.getNode(id)) {
        let node = id;
        let type = treeCom.getNode(id).data.type || 0;
        for (let index = parseInt(type); index >= 1; index--) {
          if (parseInt(type) === index && ![1, 2].includes(parseInt(type))) {
            org.teamname = treeCom.getNode(node).data.departmentname;
            org.teamid = treeCom.getNode(node).data._id;
          }
          if (index === 2) {
            org.groupname = treeCom.getNode(node).data.departmentname;
            org.groupid = treeCom.getNode(node).data._id;
            org.budgetunit = treeCom.getNode(node).data.companyen;
          }
          if (index === 1) {
            org.centername = treeCom.getNode(node).data.companyname;
            org.centerid = treeCom.getNode(node).data._id;
          }
          node = treeCom.getNode(node).parent.data._id;
        }
        ({
          centerid: this.form.orgInformationcenterid,
          groupid: this.form.orgInformationgroupid,
          teamid: this.form.orgInformationteamid,
        } = org);
      }
    },
    //add ccm 20210901 外注添加组织信息 to


    changeexits(val) {

      this.form.exits = val;
      if (val === '1') {
        this.show = false;
        this.rules.exitime[0].required = false;
        this.rules.exitreason[0].required = false;
        //this.rules.alltechnology[0].required = false;
        this.rules.sitevaluation[0].required = false;
        this.rules.businessimpact[0].required = false;
        //this.rules.countermeasure[0].required = false;
        this.erroradmissiontime = '';
        this.errorexitime = '';
      } else {
        this.show = true;
        this.form.exitime = null;
        this.form.exitreason = null;
        this.form.alltechnology = null;
        this.form.sitevaluation = null;
        this.form.businessimpact = null;
        this.form.countermeasure = null;
        this.rules.exitime[0].required = true;
        this.rules.exitreason[0].required = true;
        //this.rules.alltechnology[0].required = true;
        this.rules.sitevaluation[0].required = true;
        this.rules.businessimpact[0].required = true;
        //this.rules.countermeasure[0].required = true;
      }
    },
    selectById(val) {
      this.loading = true;
      this.$store
        .dispatch('PFANS6004Store/getCompanyProject', {'SyspName': this.$route.params._account})
        .then(response => {
          for (let j = 0; j < response.length; j++) {
            if (response[j].group_id !== null && response[j].group_id !== '') {
              let group = getorgGroupList(response[j].group_id);
              if (group) {
                response[j].group_id = group.centername;
              }
            }
            if (response[j].project_name !== null && response[j].project_name !== '') {
              let project_name = getUserInfo(response[j].project_name);
              if (project_name) {
                response[j].project_name = user.userinfo.customername;
              }
            }
            if (response[j].admissiontime !== null && response[j].admissiontime !== '') {
              response[j].admissiontime = moment(response[j].admissiontime).format('YYYY-MM-DD');
            }
            if (response[j].exittime !== null && response[j].exittime !== '') {
              response[j].exittime = moment(response[j].exittime).format('YYYY-MM-DD');
            }
            if (response[j].projecttype !== null && response[j].projecttype !== '') {
              let checkvalue1 = getDictionaryInfo(response[j].projecttype);
              if (checkvalue1) {
                response[j].projecttype = checkvalue1.value1;
              }

            }
          }
          this.tableData = response;
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
    buttonClick(val) {
      this.$refs['refform'].validate(valid => {
        if (valid) {
          this.form.expatriatesinfor_id = this.$route.params._id;
          this.form.admissiontime = moment(this.form.admissiontime).format('YYYY-MM-DD');
          if (this.form.exits === '1') {
            this.form.exitime = '';
            this.form.exitreason = '';
            this.form.alltechnology = '';
            this.form.sitevaluation = '';
            this.form.businessimpact = '';
            this.form.countermeasure = '';
            this.rules.exitime[0].required = false;
            this.rules.exitreason[0].required = false;
            //this.rules.alltechnology[0].required = false;
            this.rules.sitevaluation[0].required = false;
            this.rules.businessimpact[0].required = false;
            //this.rules.countermeasure[0].required = false;
          }

          // add ccm 20210901 外注添加组织信息 fr
          if (this.form.orgInformationcenterid != null && this.form.orgInformationcenterid != '') {
            let centerInfo = getOrgInfo(this.form.orgInformationcenterid);
            if (centerInfo && centerInfo.encoding != null && centerInfo.encoding != '' && centerInfo.encoding != undefined) {
              this.form.group_id = this.form.orgInformationcenterid;
            } else {
              let groupInfo = getOrgInfo(this.form.orgInformationgroupid);
              if (groupInfo && groupInfo.encoding != null && groupInfo.encoding != '' && groupInfo.encoding != undefined) {
                this.form.group_id = this.form.orgInformationgroupid;
              }
            }
          }
          // add ccm 20210901 外注添加组织信息 to

          if (this.$route.params._id) {
            //upd_fjl_0928  添加group修改后的确认框  start
            if (this.grouporglistflg != null && this.grouporglistflg != '' &&
              this.grouporglistflg != undefined && this.grouporglistflg != this.grouporglist) {
              this.$confirm(this.$t('normal.error_priceset'), this.$t('normal.info'), {
                confirmButtonText: this.$t('button.confirm'),
                cancelButtonText: this.$t('button.cancel'),
                type: 'warning',
              }).then(() => {
                this.loading = true;
                this.$store
                  .dispatch('PFANS6004Store/updateexpatriatesinfor', this.form)
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
                    this.$message.error({
                      message: error,
                      type: 'error',
                      duration: 5 * 1000,
                    });
                    this.loading = false;
                  });
              }).catch(() => {
                this.$message.info({
                  type: 'info',
                  message: this.$t('label.PFANS1026FORMVIEW_tipis'),
                });
              });
            } else {
              this.loading = true;
              this.$store
                .dispatch('PFANS6004Store/updateexpatriatesinfor', this.form)
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
                  this.$message.error({
                    message: error,
                    type: 'error',
                    duration: 5 * 1000,
                  });
                  this.loading = false;
                });
            }
            //upd_fjl_0928  添加group修改后的确认框  end
          } else {
            this.form.admissiontime = moment(this.form.admissiontime).format('YYYY-MM-DD');
            this.loading = true;
            this.$store
              .dispatch('PFANS6004Store/createexpatriatesinforApply', this.form)
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
        } else {
          Message({
            message: this.$t('normal.error_12'),
            type: 'error',
            duration: 5 * 1000,
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss">
.dpSupIndex {
  .content {
    height: 34px;
    min-width: 80%;
    border: 0.1rem solid #ebeef5;
    overflow-y: scroll;
    overflow-x: hidden;
    line-height: 34px;
    padding: 0.1rem 0.5rem 0.2rem 0.5rem;
  }

  .bg {
    background: white;
    border-width: 1px;
  }
}
</style>
