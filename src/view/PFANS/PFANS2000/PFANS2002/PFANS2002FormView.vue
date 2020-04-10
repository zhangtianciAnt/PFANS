<template>
  <EasyNormalContainer
    :buttonList="buttonList"
    :title="titles"
    @buttonClick="buttonClick"
    :canStart="canStart"
    @end="end"
    @start="start"
    @workflowState="workflowState"
    ref="container"
    @disabled="setdisabled"
    v-loading="loading"
  >
    <div slot="customize" style="margin-top:2vw">
      <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="form">
        <el-tabs v-model="activeName" type="border-card">
          <el-tab-pane
            :label="$t('label.PFANS2002FORMVIEW_ORGIN')"
            name="first"
            style="padding-top:1%"
          >
            <el-row>
              <el-col :span="8">
                <el-form-item :error="errorname" :label="$t('label.user_name')" prop="name">
                  <div class="dpSupIndex" style="width: 20vw" prop="name">
                    <el-container>
                      <input class="content bg" v-model="form.name" :error="errorname"
                             :disabled="true"></input>
                      <!--<el-select-->
                      <!--:disabled="disabled"-->
                      <!--class="width"-->
                      <!--v-model="form.sex"-->
                      <!--style="width:20vw"-->
                      <!--&gt;-->
                      <!--<el-option-->
                      <!--:key="item.value"-->
                      <!--:label="item.label"-->
                      <!--:value="item.value"-->
                      <!--v-for="item in options"-->
                      <!--&gt;</el-option>-->
                      <!--</el-select>-->

                      <el-button :disabled="disabled" icon="el-icon-search" @click="dialogTableVisible = true"
                                 size="small"></el-button>
                      <el-dialog :visible.sync="dialogTableVisible" center size="50%" :before-close="submit"
                                 top="8vh" lock-scroll
                                 append-to-body>
                        <div style="text-align: center">
                          <el-row style="text-align: center;height: 90%;overflow: hidden">
                            <el-table
                              :data="gridData.filter(data => !search || data.suppliername.toLowerCase().includes(search.toLowerCase()))"
                              height="500px" highlight-current-row style="width: 100%" tooltip-effect="dark"
                              :span-method="arraySpanMethod" @row-click="handleClickChange">
                              <el-table-column property="name" :label="$t('label.user_name')"
                                               width="150"></el-table-column>
                              <el-table-column property="sex" :label="$t('label.sex')"
                                               width="100"></el-table-column>
                              <el-table-column property="birthday" :label="$t('label.PFANS2002VIEW_BIRTHDAY')"
                                               width="100"></el-table-column>
                              <el-table-column
                                align="right" width="230">
                                <template slot="header" slot-scope="scope">
                                  <el-input
                                    v-model="search"
                                    size="mini"
                                    :placeholder="$t('label.PFANS2002FORMVIEW_CHECK')"/>
                                </template>
                              </el-table-column>
                            </el-table>
                          </el-row>
                          <span slot="footer" class="dialog-footer">
                          <el-button type="primary" @click="submit">{{$t('button.confirm')}}</el-button>
                        </span>
                        </div>
                      </el-dialog>
                    </el-container>
                  </div>

                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('label.sex')" prop="sex">
                  <dicselect
                    :data="form.sex"
                    :disabled="disabled"
                    :code="code_sex"
                    @change="changeSex"
                    :multiple="multiple"
                    style="width: 20vw">
                  </dicselect>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  :label="$t('label.PFANS2002VIEW_BIRTHDAY')"
                  prop="birthday"
                >
                  <el-date-picker
                    :disabled="disabled"
                    :placeholder="$t('normal.error_09')"
                    class="width"
                    type="date"
                    style="width:20vw"
                    v-model="form.birthday"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-table
                  :data="tableData3"
                  style="width:46vw;margin-top:1%"
                  border stripe
                  header-cell-class-name="sub_bg_color_blue"
                >
                  <el-table-column
                    :label="$t('label.PFANS2002VIEW_EDUCATION')"
                    prop="education"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <dicselect
                        :data="scope.row.education"
                        :disabled="disabled"
                        @change="((val)=>{changeEducation(val,scope.$index)})"
                        class="width"
                        code="PR022"
                        style="width:100%"
                      ></dicselect>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2002FORMVIEW_SCHOOL')"
                    prop="school"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <el-input :disabled="disabled" class="width" v-model="scope.row.school" maxlength="20"
                                style="width:100%"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2002FORMVIEW_SPECIALTY')"
                    prop="specialty"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <el-input :disabled="disabled" class="width" v-model="scope.row.specialty" maxlength="20"
                                style="width:100%"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2002FORMVIEW_QUITYEAR')"
                    prop="quityear"
                    align="center">
                    <template slot-scope="scope">
                      <el-date-picker
                        :disabled="disabled"
                        :placeholder="$t('normal.error_09')"
                        class="width"
                        type="date"
                        style="width:100%"
                        v-model="scope.row.quityear"
                      ></el-date-picker>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
          </el-tab-pane>
          <!--第二个tab-->
          <el-tab-pane :label="$t('label.PFANS2002FORMVIEW_MATERIAL')" name="second">
            <el-collapse>
              <el-collapse-item>
                <template slot="title">
                <span
                  class="collapse_Title"
                  style="margin-left:0.5%;color:#005BAA"
                >{{$t('label.PFANS2002FORMVIEW_ONESELF')}}</span>
                </template>
                <div style="margin-left:5%;margin-top:0%">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2002FORMVIEW_RESUME')">
                        <span style="margin-right: 1rem ">{{$t('label.PFANSUSERFORMVIEW_NO')}}</span>
                        <el-switch :disabled="disabled" v-model="form.resume"></el-switch>
                        <span style="margin-left: 1rem ">{{$t('label.PFANSUSERFORMVIEW_YES')}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2002FORMVIEW_IDENTITY')">
                        <span style="margin-right: 1rem ">{{$t('label.PFANSUSERFORMVIEW_NO')}}</span>
                        <el-switch :disabled="disabled" v-model="form.identity"></el-switch>
                        <span style="margin-left: 1rem ">{{$t('label.PFANSUSERFORMVIEW_YES')}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2002FORMVIEW_DIPLOMA')">
                        <span style="margin-right: 1rem ">{{$t('label.PFANSUSERFORMVIEW_NO')}}</span>
                        <el-switch :disabled="disabled" v-model="form.diploma"></el-switch>
                        <span style="margin-left: 1rem ">{{$t('label.PFANSUSERFORMVIEW_YES')}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2002FORMVIEW_EXPERIENCE')">
                        <span style="margin-right: 1rem ">{{$t('label.PFANSUSERFORMVIEW_NO')}}</span>
                        <el-switch :disabled="disabled" v-model="form.experience"></el-switch>
                        <span style="margin-left: 1rem ">{{$t('label.PFANSUSERFORMVIEW_YES')}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2002FORMVIEW_ENTRY')">
                        <span style="margin-right: 1rem ">{{$t('label.PFANSUSERFORMVIEW_NO')}}</span>
                        <el-switch :disabled="disabled" v-model="form.entry"></el-switch>
                        <span style="margin-left: 1rem ">{{$t('label.PFANSUSERFORMVIEW_YES')}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2002FORMVIEW_REPORT')">
                        <span style="margin-right: 1rem ">{{$t('label.PFANSUSERFORMVIEW_NO')}}</span>
                        <el-switch :disabled="disabled" v-model="form.report"></el-switch>
                        <span style="margin-left: 1rem ">{{$t('label.PFANSUSERFORMVIEW_YES')}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2002FORMVIEW_OTHER1_1')">
                        <span style="margin-right: 1rem ">{{$t('label.PFANSUSERFORMVIEW_NO')}}</span>
                        <el-switch :disabled="disabled" v-model="form.other1"></el-switch>
                        <span style="margin-left: 1rem ">{{$t('label.PFANSUSERFORMVIEW_YES')}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2002FORMVIEW_OTHER2_1')">
                        <span style="margin-right: 1rem ">{{$t('label.PFANSUSERFORMVIEW_NO')}}</span>
                        <el-switch :disabled="disabled" v-model="form.other2"></el-switch>
                        <span style="margin-left: 1rem ">{{$t('label.PFANSUSERFORMVIEW_YES')}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2002FORMVIEW_ENGLISH')" maxlength="10">
                        <dicselect
                          :data="form.english"
                          :disabled="disabled"
                          @change="changeEnglish"
                          class="width"
                          code="PR053"
                          style="width:20vw"
                        ></dicselect>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        :label="$t('label.PFANS2002FORMVIEW_ENGLISHDETAIL')"
                        prop="english_detail"
                        v-show="english_show"
                      >
                        <el-input :disabled="disabled" class="width" maxlength="20" style="width:20vw"
                                  v-model="form.english_detail"></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2002FORMVIEW_JANPANESE')" maxlength="10">
                        <dicselect
                          :data="form.janpanese"
                          :disabled="disabled"
                          @change="changeJanpanese"
                          class="width"
                          code="PR054"
                          style="width:20vw"
                        ></dicselect>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        :label="$t('label.PFANS2002FORMVIEW_JANPANESEDETAIL')"
                        prop="janpanese_detail"
                        v-show="janpanese_show"
                      >
                        <el-input :disabled="disabled" class="width" maxlength="20" style="width:20vw"
                                  v-model="form.janpanese_detail"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>
                      <!--手动说明备注项-->
                      <el-form-item :label="$t('label.PFANS2002FORMVIEW_REMARK')">
                        <el-input type="textarea" v-model="form.remark" :disabled="disabled"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-collapse-item>
              <el-collapse-item>
                <template slot="title">
                  <span class="collapse_Title" style="margin-left:0.5%;color:#005BAA">{{$t('label.PFANS2002FORMVIEW_CLUB')}}</span>
                </template>
                <div style="margin-left:5%;margin-top:0%">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2002FORMVIEW_TICKET')">
                        <span style="margin-right: 1rem ">{{$t('label.PFANSUSERFORMVIEW_NO')}}</span>
                        <el-switch :disabled="disabled" v-model="form.ticket"></el-switch>
                        <span style="margin-left: 1rem ">{{$t('label.PFANSUSERFORMVIEW_YES')}}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2002FORMVIEW_HEALTH')">
                        <span style="margin-right: 1rem ">{{$t('label.PFANSUSERFORMVIEW_NO')}}</span>
                        <el-switch :disabled="disabled" v-model="form.health"></el-switch>
                        <span style="margin-left: 1rem ">{{$t('label.PFANSUSERFORMVIEW_YES')}}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-collapse-item>
              <el-collapse-item>
                <template slot="title">
                  <span class="collapse_Title" style="margin-left:0.5%;color:#005BAA">{{$t('label.enclosure')}}</span>
                </template>
                <div style="margin-left:5%;margin-top:1%">
                  <el-row>
                    <el-upload
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
                      <div class="el-upload__text">{{$t('label.enclosurecontent')}}<em>{{$t('normal.info_09')}}</em>
                      </div>
                    </el-upload>
                  </el-row>
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
          <el-tab-pane :label="$t('label.PFANS2002FORMVIEW_INTERVIEW')" name="third" style="padding-top:10px">
            <el-row>
              <el-col :span="8">
                <el-form-item
                  :label="$t('label.PFANS2002FORMVIEW_INTIME')"
                  prop="intime"
                >
                  <el-date-picker
                    :disabled="disabled"
                    :placeholder="$t('normal.error_09')"
                    class="width"
                    type="date"
                    style="width:20vw"
                    v-model="form.intime"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  :label="$t('label.PFANS2002FORMVIEW_EXPECTEDTIME')" prop="expectedtime">
                  <el-date-picker
                    :disabled="disabled"
                    :placeholder="$t('normal.error_09')"
                    class="width"
                    type="date"
                    style="width:20vw"
                    v-model="form.expectedtime"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  :label="$t('label.PFANS2026VIEW_ENTRYTIME')" prop="entrytime">
                  <el-date-picker
                    :disabled="disabled"
                    :placeholder="$t('normal.error_09')"
                    class="width"
                    type="date"
                    style="width:20vw"
                    v-model="form.entrytime"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

<!--table-->
            <el-row>
              <el-col :span="24">
                <el-table
                  :data="tableData"
                  :summary-method="getAverage"
                  border stripe
                  show-summary
                  style="width:46vw"
                  header-cell-class-name="sub_bg_color_blue"
                >
                  <el-table-column
                    :label="$t('label.PFANS2002FORMVIEW_INTERVIEWER')"
                    align="center"
                    prop="interviewer"
                  >
                    <template slot-scope="scope">
                      <user
                        :disabled="true"
                        :no="scope.row"
                        :userlist="scope.row.interviewer"
                        @getUserids="getInterviewerids"
                        selectType="Single"
                        style="width:100%"
                      ></user>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2002FORMVIEW_SCORE')"
                    align="center"
                    prop="score"
                  >
                    <template slot-scope="scope">
                      <el-input-number
                        :disabled="true"
                        :max="10"
                        :min="0"
                        :precision="1"
                        :step="0.1"
                        v-model="scope.row.score"
                        style="width:100%"
                      ></el-input-number>
                    </template>
                  </el-table-column>
<!-- wxl 4/8 面试官通过选人带出来 strat-->
<!--                  <el-table-column :label="$t('label.operation')" align="center" width="200">-->
<!--                    <template slot-scope="scope">-->
<!--                      <el-button-->
<!--                        :disabled="disabled"-->
<!--                        @click.native.prevent="deleteRow(scope.$index, tableData)"-->
<!--                        plain-->
<!--                        size="small"-->
<!--                        type="danger"-->
<!--                      >{{$t('button.delete')}}-->
<!--                      </el-button>-->
<!--                      <el-button-->
<!--                        :disabled="disabled"-->
<!--                        @click="addRow()"-->
<!--                        plain-->
<!--                        size="small"-->
<!--                        type="primary"-->
<!--                      >{{$t('button.insert')}}-->
<!--                      </el-button>-->
<!--                    </template>-->
<!--                  </el-table-column>-->
<!-- wxl 4/8 面试官通过选人带出来 end-->
                </el-table>
              </el-col>
            </el-row>
          </el-tab-pane>

          <el-tab-pane
            :label="$t('label.PFANS2002FORMVIEW_ATTACH')"
            name="fourth"
            style="padding-top:1%"
          >
            <el-row>
              <el-col :span="8">
                <el-form-item :label="$t('label.team')">
                  <org
                    :disabled="disabled"
                    :orglist="form.team_id"
                    @getOrgids="getTeamId"
                    orgtype="3"
                    selectType="Single"
                    style="width:20vw"
                  ></org>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :error="errorgroup" :label="$t('label.group')" prop="group_id">
                  <org
                    :error="errorgroup"
                    :disabled="disabled"
                    :orglist="form.group_id"
                    @getOrgids="getGroupId"
                    orgtype="2"
                    selectType="Single"
                    style="width:20vw"
                  ></org>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('label.center')" :error="errorcenter" prop="center_id">
                  <org
                    :error="errorcenter"
                    :disabled="disabled"
                    :orglist="form.center_id"
                    @getOrgids="getCenterId"
                    orgtype="1"
                    selectType="Single"
                    style="width:20vw"
                  ></org>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS2002FORMVIEW_LEVEL')">
                  <dicselect
                    :data="form.level"
                    :disabled="disabled"
                    @change="changeLevel"
                    class="width"
                    code="PR021"
                    style="width:20vw"
                  ></dicselect>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS2002FORMVIEW_GIVING')">
                  <el-input-number
                    :disabled="disabled"
                    :max="1000000"
                    :min="0"
                    :precision="2"
                    :step="100"
                    class="width"
                    style="width:20vw"
                    v-model="form.giving"
                  ></el-input-number>
                  <span style="margin-left:3%">{{$t('label.PFANS2002FORMVIEW_YUAN')}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <!--採用ルート-->
            <el-row>
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS2002FORMVIEW_ADOPTION')">
                  <dicselect
                    :data="form.adoption"
                    :disabled="true"
                    @change="changeUsing"
                    class="width"
                    code="PR051"
                    style="width:20vw"
                  ></dicselect>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  :label="$t('label.PFANS2002FORMVIEW_OTHER3')"
                  prop="other3"
                  v-show="other3_show"
                >
                  <el-input :disabled="true" class="width" maxlength="20" style="width:20vw"
                            v-model="form.other3"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item v-show="display" :label="$t('label.PFANS2002FORMVIEW_OTHERS')">
                  <user
                    :disabled="true"
                    :userlist="form.others"
                    @getUserids="getUserids"
                    selectType="Single"
                    style="width:20vw"
                  ></user>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </div>
  </EasyNormalContainer>
</template>

<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import dicselect from '../../../components/dicselect';
  import user from '../../../components/user';
  import org from '../../../components/org';
  import {uploadUrl} from '../../../../utils/customize';
  import {getDictionaryInfo} from '../../../../utils/customize';
  import moment from 'moment';
  import {Message} from 'element-ui';

  export default {
    name: 'PFANS2002FormView',
    components: {EasyNormalContainer, dicselect, user, org},
    data() {
      var checkname = (rule, value, callback) => {
        if (!value || value === '' || value === 'undefined') {
          this.errorname = this.$t('normal.error_09') + this.$t('label.user_name');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.user_name')));
        } else {
          this.errorname = '';
          return callback();
        }
      };
      var centerId = (rule, value, callback) => {
        if (!value || value === '' || value === 'undefined') {
          this.errorcenter = this.$t('normal.error_09') + this.$t('label.PFANS5012VIEW_CENTER');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS5012VIEW_CENTER')));
        } else {
          this.errorcenter = '';
          return callback();
        }
      };

      return {
        errorcenter: '',
        errorgroup: '',
        loading: false,
        display: false,
        disabled: false,
        errorname: '',
        english_show: false,
        janpanese_show: false,
        other3_show: false,
        other4_show: false,
        dialogTableVisible: false,
        multiple: false,
        search: '',
        result: '',
          code_sex: 'PR019',
        gridData: [],
        num: 0,
        activeName: 'first',
        tableData: [
          {
            interviewer: '',
            score: 0,
          },
        ],
        titles: 'label.PFANS2002FORMVIEW',
        tableData3: [
          {
            education: '',
            school: '',
            specialty: '',
            quityear: '',
          },
          {
            education: '',
            school: '',
            specialty: '',
            quityear: '',
          },
          {
            education: '',
            school: '',
            specialty: '',
            quityear: '',
          },
        ],
        form: {
          entry_enclosure: '',
          name: '',
          sex: '',
          birthday: '',

          education1: '',
            school1: '',
          specialty1: '',
          quityear1: '',

          education2: '',
            school2: '',
          specialty2: '',
          quityear2: '',

          education3: '',
            school3: '',
          specialty3: '',
          quityear3: '',

          intime: '',
          expectedtime: '',
          // entrytime:"",
          remark: '',
          centername: "",
          groupname: "",
          teamname: "",
          center_id: '',
          group_id: '',
          team_id: '',
          level: '',
          english: '',
          english_detail: '',
          janpanese: '',
          janpanese_detail: '',
          other1: false,
          other2: false,
          other3: '',
          resume: false,
          identity: false,
          diploma: false,
          experience: false,
          entry: false,
          report: false,
          ticket: false,
          health: false,
          interview: '',
          giving: '0',
          adoption: '',
          others: '',
          status: '0',
        },
        disable: false,
        canStart: false,
        buttonList: [],
        fileList: [],
        upload: uploadUrl(),
        rules: {
          name: [{required: true, validator: checkname, trigger: 'change'}],
          sex: [{required: true, message: this.$t('normal.error_08'),trigger: 'change'}],
          birthday: [{required: true, message: this.$t('normal.error_08')}],
          // education: [{required: true, message: this.$t('normal.error_08')}],
          // specialty: [{required: true, message: this.$t('normal.error_08')}],
          // quityear: [{required: true, message: this.$t('normal.error_08')}],
          // expectedtime: [{required: true, validator: validexpected, trigger: 'change'}],
          intime: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS2002FORMVIEW_INTIME'),
              trigger: 'change',
            },
            // {
            //   validator: validexpected,trigger:'change'
            // },
            // {
            //   validator: validentrytime,trigger:'change'
            // }
          ],
          center_id: [{required: true, validator: centerId, trigger: "blur"}],
          // entrytime: [{required: true, validator: validentrytime,trigger:'change'}],
        },
      };
    },

    created() {
      this.disabled = this.$route.params.disabled;
      if (!this.disabled) {
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
    mounted() {
      if (this.$route.params._org) {
        ({
          centername: this.form.centername,
          groupname: this.form.groupname,
          teamname: this.form.teamname,
          center_id: this.form.center_id,
          group_id: this.form.group_id,
          team_id: this.form.team_id
        } = this.$route.params._org);
      }
      this.getNameList();
      if (this.$route.params._id) {
        this.getOne(this.$route.params._id);
      }
    },

    methods: {
      checkRequire(){
        if(!this.form.name || !this.form.sex || !this.form.birthday){
          this.activeName = 'first';
        }else if(!this.form.intime){
          this.activeName = 'third';
        }else if(!this.form.center_id){
          this.activeName = 'fourth';
        }
      },
      setdisabled(val){
        if(this.$route.params.disabled){
          this.disabled = val;
        }
      },
      changeSex(val){
        this.form.sex = val;
      },
      getNameList() {
        this.loading = true;
        this.$store
          .dispatch('PFANS2002Store/getNameList', {})
          .then(response => {
            this.gridData = [];
            for (let i = 0; i < response.length; i++) {
              var vote = {};
              this.result = response;
              vote.name = response[i].name;
              if(getDictionaryInfo(response[i].sex)){
              vote.sex = getDictionaryInfo(response[i].sex).value1;
              }
              vote.birthday = moment(response[i].birthday).format('YYYY-MM-DD');
// wxl 4/8 面试官通过选人带出来 start
              vote.interview = response[i].interview
              vote.source = response[i].source
              vote.other = response[i].other
              vote.member = response[i].member
// wxl 4/8 面试官通过选人带出来 end
              this.gridData.push(vote);
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
      changeEnglish(val) {
        if (val === 'PR053004') {
          this.form.english = val;
          this.english_show = true;
        } else {
          this.form.english = val;
          this.english_show = false;
        }
      },
      changeJanpanese(val) {
        if (val === 'PR054005') {
          this.form.janpanese = val;
          this.janpanese_show = true;
        } else {
          this.form.janpanese = val;
          this.janpanese_show = false;
        }
      },
      changeOption(form, method) {
        let arr = [
          'other1',
          'other2',
          'resume',
          'identity',
          'diploma',
          'experience',
          'entry',
          'report',
          'ticket',
          'health',
        ];
        if (method === 'save') {
          for (var i in form) {
            if (arr.includes(i)) {
              form[i] = form[i] === true ? '0' : '1';
            }
          }
        } else if (method === 'view') {
          for (var i in form) {
            if (i === 'interview') {
              form[i] = JSON.parse(form[i]);
            }
            if (arr.includes(i)) {
              form[i] = form[i] === '0' ? true : false;
            }
          }
        }
      },
      submit() {
        let val = this.currentRow;
        let lst = this.currentRow2;
        let lst2 = this.currentRow3;
        this.dialogTableVisible = false;
        this.form.name = val;
        this.form.sex = lst;
        this.form.birthday = lst2;
        this.errorname = '';
// wxl 4/8 面试官通过选人带出来 start
        this.tableData = this.currentRow4
        this.form.adoption = this.currentRow5//招聘途径
        this.changeUsing(this.form.adoption)
        this.form.other3 = this.currentRow6//其他
        this.form.others = this.currentRow7//推荐人
// wxl 4/8 面试官通过选人带出来 end
      },
      handleClickChange(val) {
          console.log("val",val)
        this.form.name = val.name;
        this.currentRow = val.name;
        this.currentRow2 = val.sex;
        this.currentRow3 = val.birthday;
// wxl 4/8 面试官通过选人带出来 start
          this.changeOption(val, 'view');
        this.currentRow4 = val.interview;
        this.currentRow5 = val.source;//招聘途径
        this.currentRow6 = val.other;//其他
        this.currentRow7 = val.member;//推荐人
// wxl 4/8 面试官通过选人带出来 end
      },
      arraySpanMethod({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 3) {
          return [1, 2];
        }
      },
      getOne(id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS2002Store/getOne', id)
          .then(response => {
            console.log(response[0]);
            if (response) {
              this.form = response[0];
              this.changeOption(this.form, 'view');
              this.tableData = this.form.interview;
              this.tableData3[0].education = response[0].education1;
              this.tableData3[0].specialty = response[0].specialty1;
              this.tableData3[0].school = response[0].school1;
              this.tableData3[0].quityear = response[0].quityear1;

              this.tableData3[1].education = response[0].education2;
              this.tableData3[1].school = response[0].school2;
              this.tableData3[1].specialty = response[0].specialty2;
              this.tableData3[1].quityear = response[0].quityear2;

              this.tableData3[2].education = response[0].education3;
              this.tableData3[2].school = response[0].school3;
              this.tableData3[2].specialty = response[0].specialty3;
              this.tableData3[2].quityear = response[0].quityear3;
              //this.changeUsing(this.form.adoption);
              if (this.form.entry_enclosure != '') {
                let uploadfile = this.form.entry_enclosure.split(';');
                for (var i = 0; i < uploadfile.length; i++) {
                  if (uploadfile[i].split(',')[0] != '') {
                    let o = {};
                    o.name = uploadfile[i].split(',')[0];
                    o.url = uploadfile[i].split(',')[1];
                    this.fileList.push(o);
                  }
                }
              }
                if (this.form.adoption === 'PR051004') {
                    this.display = true;
                    this.form.other3 = '';
                }
                if (this.form.adoption === 'PR051005') {
                    this.other3_show = true;
                    this.form.others = '';
                }
              this.loading = false;
            }
            if (this.form.status === '2') {
              this.disabled = true;
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
      },
      getInterviewerids(userlist, row) {
        row.interviewer = userlist;
      },
      getCenterId(val) {
        this.getOrgInformation(val);
        if (!val || this.form.center_id === "") {
          this.errorcenter = this.$t("normal.error_08") + "center";
        } else {
          this.errorcenter = "";
        }
      },
      getGroupId(val) {
        this.getOrgInformation(val);
        if (this.form.center_id === "") {
          this.errorgroup = this.$t("normal.error_08") + "center";
        } else {
          this.errorgroup = "";
        }
      },
      getTeamId(val) {
        this.getOrgInformation(val);
        if (this.form.center_id === "") {
          this.errorgroup = this.$t("normal.error_08") + "center";
        } else {
          this.errorgroup = "";
        }
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


              org.team_id = treeCom.getNode(node).data._id;
            }
            if (index === 2) {
              org.groupname = treeCom.getNode(node).data.departmentname;
              org.group_id = treeCom.getNode(node).data._id;
            }
            if (index === 1) {
              org.centername = treeCom.getNode(node).data.companyname;
              org.center_id = treeCom.getNode(node).data._id;
            }
            node = treeCom.getNode(node).parent.data._id;
          }
          ({
            centername: this.form.centername,
            groupname: this.form.groupname,
            teamname: this.form.teamname,
            center_id: this.form.center_id,
            group_id: this.form.group_id,
            team_id: this.form.team_id,
          } = org);
        }
      },
      getUserids(val) {
        this.form.others = val;
      },
      changeEducation(val, index) {
        this.tableData3[index].education = val;
      },
      workflowState(val) {
        if (val.state === '1') {
          this.form.status = '3';
        } else if (val.state === '2') {
          this.form.status = '4';
        }
        this.buttonClick('update');
      },
      start() {
        this.form.status = '2';
        this.buttonClick('update');
      },
      end() {
        this.form.status = '0';
        this.buttonClick('update');
      },
      changeUsing(val) {
          console.log(val);
        if (val === 'PR051004') {
          this.display = true;
        } else {
          this.display = false;
          this.form.others = '';
        }
        this.form.adoption = val;
        if (val === 'PR051005') {
          this.other3_show = true;
        } else {
          this.other3_show = false;
        }
      },
      changeLevel(val) {
        this.form.level = val;
      },
      getAverage(param) {
        this.form.interview = JSON.stringify(this.tableData);
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = this.$t('label.PFANS2002FORMVIEW_AVESCORE');
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          } else {
            sums[index] = '';
          }
        });
        sums[1] = Math.round(sums[1] / param.data.length * 100) / 100;
        return sums;
      },

      deleteRow(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        } else {
          this.tableData[0].interviewer = '';
          this.tableData[0].score = 0;
        }
      },
      addRow() {
        this.tableData.push({
          interviewer: '',
          score: 0,
        });
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
        this.form.entry_enclosure = '';
        for (var item of fileList) {
          let o = {};
          o.name = item.name;
          o.url = item.url;
          this.fileList.push(o);
          this.form.entry_enclosure += item.name + ',' + item.url + ';';
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
        this.form.entry_enclosure = '';
        for (var item of fileList) {
          let o = {};
          o.name = item.name;
          if (!item.url) {
            o.url = item.response.info;
          } else {
            o.url = item.url;
          }
          this.fileList.push(o);
          this.form.entry_enclosure += o.name + ',' + o.url + ';';
        }
      },

      buttonClick(val) {
        this.checkRequire();
        this.$refs['form'].validate(valid => {
          if (valid) {
            this.loading = true;
            if (!this.$route.params._id) {
              this.changeOption(this.form, 'save');
              this.form.education1 = this.tableData3[0].education;
              this.form.quityear1 = this.tableData3[0].quityear;
              this.form.school1 = this.tableData3[0].school;
              this.form.specialty1 = this.tableData3[0].specialty;

              this.form.education2 = this.tableData3[1].education;
              this.form.quityear2 = this.tableData3[1].quityear;
              this.form.school2 = this.tableData3[1].school;
              this.form.specialty2 = this.tableData3[1].specialty;

              this.form.education3 = this.tableData3[2].education;
              this.form.quityear3 = this.tableData3[2].quityear;
              this.form.school3 = this.tableData3[2].school;
              this.form.specialty3 = this.tableData3[2].specialty;

              this.$store
                .dispatch('PFANS2002Store/insert', this.form)
                .then(response => {
                  this.loading = false;
                  this.$message({
                    message: this.$t('normal.success_01'),
                    type: 'success',
                  });
                  if (this.$store.getters.historyUrl) {
                    this.$router.push(this.$store.getters.historyUrl);
                  }
                })
                .catch(err => {
                  this.loading = false;
                  Message({
                    message: err,
                    type: 'error',
                    duration: 5 * 1000,
                  });
                });
            } else {
              this.loading = true;
              this.changeOption(this.form, 'save');
              // zqu start
              this.form.education1 = this.tableData3[0].education;
              this.form.quityear1 = this.tableData3[0].quityear;
              this.form.school1 = this.tableData3[0].school;
              this.form.specialty1 = this.tableData3[0].specialty;

              this.form.education2 = this.tableData3[1].education;
              this.form.quityear2 = this.tableData3[1].quityear;
              this.form.school2 = this.tableData3[1].school;
              this.form.specialty2 = this.tableData3[1].specialty;

              this.form.education3 = this.tableData3[2].education;
              this.form.quityear3 = this.tableData3[2].quityear;
              this.form.school3 = this.tableData3[2].school;
              this.form.specialty3 = this.tableData3[2].specialty;
              // zqu end
              this.$store
                .dispatch('PFANS2002Store/update', this.form)
                .then(response => {
                  this.loading = false;
                  if (val !== 'update') {
                    this.$message({
                      message: this.$t('normal.success_02'),
                      type: 'success',
                    });
                    if (this.$store.getters.historyUrl) {
                      this.$router.push(this.$store.getters.historyUrl);
                    }
                  }
                })
                .catch(err => {
                  this.loading = false;
                  Message({
                    message: err,
                    type: 'error',
                    duration: 5 * 1000,
                  });
                });
            }
          } else {
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

<style lang="scss" rel="stylesheet/scss" scoped>
  .width {
    width: 11vw;
  }

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
