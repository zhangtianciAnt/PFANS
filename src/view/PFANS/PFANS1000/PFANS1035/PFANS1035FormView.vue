<template>
  <div style="min-height: 100%">
    <EasyNormalContainer
      :buttonList="buttonList"
      :canStart="canStart"
      v-loading="loading"
      :title="title"
      @buttonClick="buttonClick"
      @end="end"
      @start="start"
      @workflowState="workflowState"
      ref="container"
    >
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="refform"
                 style="padding: 2vw">
          <el-tabs @tab-click="handleClick" v-model="activeName" type="border-card">
            <el-tab-pane :label="$t('label.PFANS1002FORMVIEW_INFORMATION')" name="first">
              <div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.center')">
                      <el-input :disabled="true" style="width:20vw" v-model="centerid"></el-input>
                      <el-input v-show='false' :disabled="true" style="width:20vw" v-model="form.center_id"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.group')">
                      <el-input :disabled="true" style="width:20vw" v-model="groupid"></el-input>
                      <el-input v-show='false' :disabled="true" style="width:20vw" v-model="form.group_id"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.team')">
                      <el-input :disabled="true" style="width:20vw" v-model="teamid"></el-input>
                      <el-input v-show='false' :disabled="true" style="width:20vw" v-model="form.team_id"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :error="error" :label="$t('label.applicant')" prop="user_id">
                      <user :disabled="true" :error="error" :selectType="selectType" :userlist="userlist"
                            @getUserids="getUserids" style="width: 20vw"></user>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.application_date')" prop="applicationdate">
                      <div class="block">
                        <el-date-picker
                          :disabled="!disable"
                          style="width:20vw"
                          type="date"
                          v-model="form.applicationdate">
                        </el-date-picker>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS5009VIEW_PROJECTNAME')" prop="projectname">
                      <div class="dpSupIndex" style="width: 19vw" prop="projectname">
                        <project :data="form.companyprojectsname" :disabled="!disable" @change="change" style="width: 100%">
                        </project>
                        <!--<el-container>-->
                          <!--<input class="content bg" v-model="form.projectname"-->
                                 <!--:disabled="true"></input>-->
                          <!--<el-button :disabled="!disable" icon="el-icon-search" @click="dialogTableVisible = true"-->
                                     <!--size="small"></el-button>-->
                          <!--<el-dialog :title="$t('label.PFANS5009VIEW_PROJECTNAME')" :visible.sync="dialogTableVisible"-->
                                     <!--center size="50%"-->
                                     <!--top="8vh" lock-scroll-->
                                     <!--append-to-body>-->
                            <!--<div style="text-align: center">-->
                              <!--<el-row style="text-align: center;height: 90%;overflow: hidden">-->
                                <!--<el-table-->
                                  <!--:data="gridData.filter(data => !search || data.projectname.toLowerCase().includes(search.toLowerCase()))"-->
                                  <!--height="500px" highlight-current-row style="width: 100%" tooltip-effect="dark"-->
                                  <!--@row-click="handleClickChange">-->
                                  <!--<el-table-column property="numbers"-->
                                                   <!--:label="$t('label.PFANS5004VIEW_PROJECTNUMBER')"-->
                                                   <!--width="200"></el-table-column>-->
                                  <!--<el-table-column property="projectname"-->
                                                   <!--:label="$t('label.PFANS5009VIEW_PROJECTNAME')"-->
                                                   <!--width="200"></el-table-column>-->
                                  <!--<el-table-column-->
                                    <!--align="right" width="230">-->
                                    <!--<template slot="header" slot-scope="scope">-->
                                      <!--<el-input-->
                                        <!--v-model="search"-->
                                        <!--size="mini"-->
                                        <!--placeholder="请输入项目名称关键字搜索"/>-->
                                    <!--</template>-->
                                  <!--</el-table-column>-->
                                <!--</el-table>-->
                              <!--</el-row>-->
                              <!--<span slot="footer" class="dialog-footer">-->
                          <!--<el-button type="primary" @click="submit">{{$t('button.confirm')}}</el-button>-->
                        <!--</span>-->
                            <!--</div>-->
                          <!--</el-dialog>-->
                        <!--</el-container>-->
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_CONDOMINIUMCOMPANY2')" prop="condominiumcompany">
                      <el-input :disabled="!disable" maxlength="20" style="width:20vw"
                                v-model="form.condominiumcompany"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <!--                    111-->
                    <el-form-item :label="$t('label.PFANS1002VIEW_CITY2')" prop="city">
                      <dicselect
                        :code="code7"
                        :data="form.city"
                        :disabled="!disable"
                        :multiple="multiple"
                        @change="getCity"
                        style="width:20vw"
                      >
                      </dicselect>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <template>
                      <el-form-item :label="$t('label.PFANS1002VIEW_STARTDATE2')" prop="startdate">
                        <div class="block">
                          <el-date-picker
                            :disabled="!disable"
                            style="width:20vw"
                            type="date"
                            v-model="form.startdate"
                          >
                          </el-date-picker>
                        </div>
                      </el-form-item>
                    </template>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_ENDDATE2')" prop="enddate">
                      <div class="block">
                        <el-date-picker
                          :disabled="!disable"
                          style="width:20vw"
                          type="date"
                          v-model="form.enddate"
                        >
                        </el-date-picker>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_DATENUMBER2')" prop="datenumber">
                      <el-input :disabled="true" style="width:20vw" v-model="form.datenumber"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1002FORMVIEW_PURPOSE')" name="second">
              <div>
                <el-row type="flex">
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_OBJECTIVETYPE')" prop="objectivetype">
                      <dicselect
                        :code="code1"
                        :data="form.objectivetype"
                        :disabled="!disable"
                        :multiple="multiple"
                        @change="getobjectivetype"
                        style="width:20vw"
                      >
                      </dicselect>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_OBJECTIVETYPEOTHER')" prop="objectivetypeother"
                                  v-if="show">
                      <el-input :disabled="!disable" maxlength="20" style="width:20vw"
                                v-model="form.objectivetypeother"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item prop="details">
                      <el-input :disabled="!disable" style="width: 70vw" type="textarea" :rows="3"
                                v-model="form.details"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1002FORMVIEW_CONTENT')" name="third">
              <el-row>
                <el-col :span="24">
                  <el-table :data="tablePD" header-cell-class-name="sub_bg_color_blue" stripe border
                            style="width: 70vw">
                    <el-table-column :label="$t('label.PFANS1002VIEW_TRAVELCONTENTDATE2')" align="center"
                                     prop="startdate"
                                     width="370">
                      <template slot-scope="scope">
                        <el-date-picker
                          v-model="scope.row.duringdate"
                          class="bigWidth"
                          :disabled="!disable"
                          type="daterange"
                          unlink-panels
                          style="width:20vw"
                          :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                          :start-placeholder="$t('label.startdate')"
                          :end-placeholder="$t('label.enddate')"
                        >
                        </el-date-picker>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1002VIEW_PLACE2')" align="center">
                      <template slot-scope="scope">
                        <el-input :disabled="!disable" maxlength="20" style="width: 100%;"
                                  v-model="scope.row.place"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1002VIEW_CONTENT2')" align="center">
                      <template slot-scope="scope">
                        <el-input :disabled="!disable" maxlength="20" style="width: 100%;"
                                  v-model="scope.row.content"></el-input>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1002FORMVIEW_EXPENSE')" name="fourth">
              <div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1012FORMVIEW_BUDGET')" >
                      <el-input :disabled="true" style="width:20vw" v-model="form.budgetunit" maxlength='50'></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_PLAN2')" prop="plan">
                      <span style="margin-right: 1vw ">{{$t('label.PFANS1004VIEW_OUTER')}}</span>
                      <el-switch
                        :disabled="!disable"
                        v-model="form.plan"
                        active-value="1"
                        inactive-value="0"
                        @change="getplan1"
                      >
                      </el-switch>
                      <span style="margin-left: 1vw ">{{$t('label.PFANS1004VIEW_INSIDE')}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1004VIEW_BUSINESSPLANTYPE')" prop="plantype" v-if="show2">
                      <dicselect
                        style="width:20vw"
                        :disabled="!disable"
                        :code="code3"
                        :multiple="multiple"
                        :data="form.plantype"
                        @change="getplantype"
                      >
                      </dicselect>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_CLASSIFICATIONTYPE')" prop="classificationtype"
                                  v-if="show3">
                      <dicselect
                        style="width:20vw"
                        :disabled="!disable"
                        :code="code4"
                        :multiple="multiple"
                        :data="form.classificationtype"
                        @change="getclassificationtype"
                      >
                      </dicselect>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS3003FORMVIEW_BALANCE')" prop="balance" v-if="show2">
                      <el-input-number
                        :disabled="!disable"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="1"
                        controls-position="right"
                        style="width:20vw"
                        v-model="form.balance">
                      </el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <template>
                      <el-form-item :label="$t('label.PFANS1002VIEW_BOOKINGDAY')" prop="bookingday">
                        <div class="block">
                          <el-date-picker
                            :disabled="!disable"
                            style="width:20vw"
                            type="date"
                            v-model="form.bookingday">
                          </el-date-picker>
                        </div>
                      </el-form-item>
                    </template>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <template>
                      <el-form-item :label="$t('label.PFANS1002VIEW_LOANDAY2')" prop="loanday">
                        <div class="block">
                          <el-date-picker
                            :disabled="!disable"
                            style="width:20vw"
                            type="date"
                            v-model="form.loanday">
                          </el-date-picker>
                        </div>
                      </el-form-item>
                    </template>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_LOANMONEY2')" prop="loanmoney">
                      <el-input-number
                        :disabled="!disable"
                        :max="999999999"
                        :min="0"
                        :precision="2"
                        :step="1"
                        controls-position="right"
                        style="width:20vw"
                        v-model="form.loanmoney">
                      </el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_ACCOMMODATIONCOST2')" prop="accommodationcost">
                      <dicselect :code="code5"
                                 :data="form.accommodationcost"
                                 :disabled="!disable"
                                 :multiple="multiple"
                                 @change="getaccommodationcost1"
                                 style="width:20vw">
                      </dicselect>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_ACCOMMODATION2')" prop="accommodation">
                      <dicselect :code="code6"
                                 :data="form.accommodation"
                                 :disabled="!disable"
                                 :multiple="multiple"
                                 @change="getaccommodation1"
                                 style="width:20vw">
                      </dicselect>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1002FORMVIEW_OTHERS2')" name="fifth">
              <div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_PASSENGERS2')" prop="passengers">
                      <span style="margin-right: 1vw ">{{$t('label.PFANSUSERFORMVIEW_NO')}}</span>
                      <el-switch
                        :disabled="!disable"
                        v-model="form.passengers"
                        active-value="1"
                        inactive-value="0"
                        @change="getpassengers1"
                      >
                      </el-switch>
                      <span style="margin-left: 1vw ">{{$t('label.PFANSUSERFORMVIEW_YES')}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_FIXEDASSETSNO2')" prop="fixedassetsno"
                                  v-if="show4">
                      <el-input :disabled="!disable" maxlength="20" style="width:20vw"
                                v-model="form.fixedassetsno"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_EXTERNAL')" prop="external">
                      <span style="margin-right: 1vw ">{{$t('label.PFANSUSERFORMVIEW_NO')}}</span>
                      <el-switch
                        :disabled="!disable"
                        v-model="form.external"
                        active-value="1"
                        inactive-value="0"
                        @change="getexternal"
                      >
                      </el-switch>
                      <span style="margin-left: 1vw ">{{$t('label.PFANSUSERFORMVIEW_YES')}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="16">
                    <el-form-item :label="$t('label.PFANS1002VIEW_REGULATIONS')" prop="regulations" v-if="show5">
                      <el-input-number
                        :disabled="!disable"
                        :max="99999"
                        :min="0"
                        :precision="2"
                        :step="1"
                        controls-position="right"
                        style="width:20vw"
                        v-model="form.regulations">
                      </el-input-number>
                      {{$t('label.yuan')}}
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item :label="$t('label.PFANS1002VIEW_REASON2')" prop="reason" v-if="show5">
                      <el-input :disabled="!disable" style="width: 70vw" type="textarea"
                                v-model="form.reason"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item :label="$t('label.PFANS1002VIEW_OTHEREXPLANATION2')" prop="otherexplanation">
                      <el-input :disabled="!disable" style="width: 70vw" type="textarea" :rows="3"
                                v-model="form.otherexplanation"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import user from '../../../components/user.vue';
  import {Message} from 'element-ui';
  import moment from 'moment';
  import {getOrgInfoByUserId,getOrgInfo,getDictionaryInfo} from '@/utils/customize';
  import dicselect from '../../../components/dicselect';

  import project from '../../../components/project.vue';
  export default {
    name: 'PFANS1035FormView',
    components: {
      dicselect,
      EasyNormalContainer,
      user,
      project
    },
    data() {
      var validateUserid = (rule, value, callback) => {
        if (!value || value === '' || value === 'undefined') {
          callback(new Error(this.$t('normal.error_09') + this.$t('label.applicant')));
          this.error = this.$t('normal.error_09') + this.$t('label.applicant');
        } else {
          callback();
          this.error = '';
        }
      };
      var validatestartdate1 = (rule, value, callback) => {
        if (this.form.startdate !== null && this.form.startdate !== '' && this.form.enddate !== '' && this.form.enddate !== null) {
          if (moment(this.form.enddate).format('YYYY-MM-DD') < moment(this.form.startdate).format('YYYY-MM-DD')) {
            callback(new Error(this.$t('label.PFANS1002FORMVIEW_ERROR1')));
          } else {
            this.form.datenumber = moment(this.form.enddate).diff(moment(this.form.startdate), 'days') + 1;
            callback();
          }
        } else {
          this.form.datenumber = 0;
          callback();
        }
      };
      var validateenddate1 = (rule, value, callback) => {
        if (this.form.startdate !== '' && this.form.startdate !== null && this.form.enddate !== '' && this.form.enddate !== null) {
          if (moment(this.form.enddate).format('YYYY-MM-DD') < moment(this.form.startdate).format('YYYY-MM-DD')) {
            callback(new Error(this.$t('label.PFANS1002FORMVIEW_ERROR1')));
          } else {
            this.form.datenumber = moment(this.form.enddate).diff(moment(this.form.startdate), 'days') + 1;
            callback();
          }
        } else {
          this.form.datenumber = 0;
          callback();
        }
      };
      return {
        centerid: '',
        groupid: '',
        teamid: '',
        disable: false,
        error: '',
        selectType: 'Single',
        title: 'title.PFANS1035VIEW',
        userlist: '',
        activeName: 'first',
        loading: false,
        disabled: false,
        code1: 'PJ018',
        code2: 'PG002',
        code3: 'PR002',
        code4: 'PR003',
        code5: 'PJ019',
        code6: 'PJ035',
        code7: 'PJ036',
        multiple: false,
        search: '',
        gridData: [],
        form: {
          center_id: '',
          group_id: '',
          team_id: '',
          user_id: '',
          applicationdate: moment(new Date()).format('YYYY-MM-DD'),
          businesstype: '',
          condominiumcompany: '',
          city: '',
          startdate: '',
          enddate: '',
          datenumber: '0',
          objectivetype: '',
          objectivetypeother: this.$t('label.PFANS1002VIEW_OTHER'),
          details: '',
          budgetunit: '',
          plan: '',
          plantype: '',
          classificationtype: '',
          balance: '',
          bookingday: '',
          loanday: '',
          projectname: '',
          companyprojectsname: '',
          loanmoney: '',
          accommodationcost: '',
          accommodation: '',
          passengers: '',
          fixedassetsno: '',
          external: '',
          regulations: '',
          reason: '',
          otherexplanation: '',
        },
        buttonList: [
          {
            key: 'save',
            name: 'button.save',
            disabled: false,
            icon: 'el-icon-check',
          },
        ],
        tablePD: [
          {
            travelcontent_id: '',
            businessid: '',
            duringdate: '',
            place: '',
            content: '',
          },
          {
            travelcontent_id: '',
            businessid: '',
            duringdate: '',
            place: '',
            content: '',
          },
          {
            travelcontent_id: '',
            businessid: '',
            duringdate: '',
            place: '',
            content: '',
          },
        ],
        baseInfo: {},
        dialogTableVisible: false,
        rules: {
          user_id: [
            {
              required: true,
              validator: validateUserid,
              trigger: 'change',
            },
          ],
          applicationdate: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.application_date'),
              trigger: 'blur',
            },
          ],
          condominiumcompany: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1002VIEW_CONDOMINIUMCOMPANY2'),
              trigger: 'blur',
            },
          ],
          city: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1002VIEW_CITY2'),
              trigger: 'change',
            },
          ],
          startdate: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS1002VIEW_STARTDATE2'),
              trigger: 'blur',
            },
            {validator: validatestartdate1, trigger: 'blur'},
          ],
          enddate: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS1002VIEW_ENDDATE2'),
              trigger: 'blur',
            },
            {validator: validateenddate1, trigger: 'blur'},
          ],
          objectivetype: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS1002VIEW_OBJECTIVETYPE'),
              trigger: 'change',
            },
          ],
          objectivetypeother: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1002VIEW_OBJECTIVETYPEOTHER'),
              trigger: 'blur',
            },
          ],
          details: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1002VIEW_DETAILS'),
              trigger: 'blur',
            },
          ],
          plan: [
            {
              required: true,
            },
          ],
          plantype: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS1002VIEW_PLANTYPE'),
              trigger: 'change',
            },
          ],
          classificationtype: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS1002VIEW_CLASSIFICATIONTYPE'),
              trigger: 'change',
            },
          ],
          balance: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1002VIEW_BALANCE'),
              trigger: 'blur',
            },
          ],
          bookingday: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS1002VIEW_BOOKINGDAY'),
              trigger: 'blur',
            },
          ],
            // DEL   FJL
          // loanday: [
          //   {
          //     required: true,
          //     message: this.$t('normal.error_09') + this.$t('label.PFANS1002VIEW_LOANDAY2'),
          //     trigger: 'blur',
          //   },
          // ],
          loanmoney: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1002VIEW_LOANMONEY2'),
              trigger: 'blur',
            },
          ],
          accommodationcost: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS1002VIEW_ACCOMMODATIONCOST2'),
              trigger: 'change',
            },
          ],
          accommodation: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS1002VIEW_ACCOMMODATION2'),
              trigger: 'change',
            },
          ],
          passengers: [
            {
              required: true,
            },
          ],
          fixedassetsno: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1002VIEW_FIXEDASSETSNO2'),
              trigger: 'blur',
            },
          ],
          external: [
            {
              required: true,
            },
          ],
          regulations: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1002VIEW_REGULATIONS'),
              trigger: 'blur',
            },
          ],
          reason: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1002VIEW_REASON2'),
              trigger: 'blur',
            },
          ],
        },
        show: false,
        show2: false,
        show3: false,
        show4: false,
        show5: false,
        canStart: false,
      };
    },
    mounted() {
      this.getProjectNames();
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1035Store/selectById', {'businessid': this.$route.params._id})
          .then(response => {
            if (!response.business) {
              this.loading = false;
              return;
            }
            this.form = response.business;
            let rst = getOrgInfoByUserId(response.business.user_id);
            if (rst) {
              this.centerid = rst.centerNmae;
              this.groupid = rst.groupNmae;
              this.teamid = rst.teamNmae;
            }
            if (response.travelcontent.length > 0) {
              this.tablePD = [];
              for (let i = 0; i < response.travelcontent.length; i++) {
                let date = [];
                let letdate = response.travelcontent[i].duringdate.split(" ~ ");
                if (letdate.length > 0) {
                  date.push(letdate[0]);
                  date.push(letdate[1]);
                }
                this.tablePD.push({
                  travelcontent_id: response.travelcontent[i].travelcontent_id,
                  businessid: response.travelcontent[i].businessid,
                  duringdate: date,
                  place: response.travelcontent[i].place,
                  content: response.travelcontent[i].content
                });
              }
            }
            this.userlist = this.form.user_id;
            this.baseInfo.business = JSON.parse(JSON.stringify(this.form));
            if (this.form.objectivetype === 'PJ018005') {
              this.show = true;
            } else {
              this.show = false;
            }
            if (this.form.plan === '1') {
              this.show2 = true;
            } else {
              this.show2 = false;
              this.show3 = false;
            }
            if (this.form.plantype === 'PR002006') {
              this.show3 = true;
            } else {
              this.show3 = false;
            }
            if (this.form.passengers === '1') {
              this.show4 = true;
            } else {
              this.show4 = false;
            }
            if (this.form.external === '1') {
              this.show5 = true;
            } else {
              this.show5 = false;
            }
            if (this.form.status === '2') {
              this.disable = false;
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
      } else {
        this.userlist = this.$store.getters.userinfo.userid;
        if (this.userlist !== null && this.userlist !== '') {
          let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
            if(getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId)){
                this.form.budgetunit = getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId).encoding;
            }
          if (rst) {
            this.centerid = rst.centerNmae;
            this.groupid = rst.groupNmae;
            this.teamid = rst.teamNmae;
            this.form.center_id = rst.centerId;
            this.form.group_id = rst.groupId;
            this.form.team_id = rst.teamId;
          }
          this.form.user_id = this.$store.getters.userinfo.userid;
        }
      }
    },
    created() {
      if (!this.$route.params.disabled) {
        this.buttonList = [];
      }
      this.disable = this.$route.params.disabled;
    },
    methods: {
      change(val) {
        this.form.companyprojectsname = val;
      },
      checkRequire() {
        if (
          !this.form.user_id ||
          !this.form.applicationdate ||
          !this.form.condominiumcompany ||
          !this.form.city ||
          !this.form.startdate ||
          !this.form.enddate
        ) {
          this.activeName = 'first';
        } else if (
          !this.form.objectivetype ||
          !this.form.details
        ) {
          this.activeName = 'second';
        } else if (
          !this.form.budgetunit ||
          (this.form.plan === '1' && (
              !this.form.plantype ||
              !this.form.classificationtype ||
              !this.form.balance)
          ) ||
          !this.form.bookingday ||
          !this.form.loanday ||
          !this.form.loanmoney ||
          !this.form.accommodationcost ||
          !this.form.accommodation
        ) {
          this.activeName = 'fourth';
        } else if (
          !this.form.fixedassetsno ||
          !this.form.regulations ||
          !this.form.reason
        ) {
          this.activeName = 'fifth';
        }
      },
      getUserids(val) {
        this.form.user_id = val;
        this.userlist = val;
        let rst = getOrgInfoByUserId(val);
          if(getOrgInfo(getOrgInfoByUserId(val).groupId)){
              this.form.budgetunit = getOrgInfo(getOrgInfoByUserId(val).groupId).encoding;
          }
        if (rst) {
          this.centerid = rst.centerNmae;
          this.groupid = rst.groupNmae;
          this.teamid = rst.teamNmae;
          this.form.center_id = rst.centerId;
          this.form.group_id = rst.groupId;
          this.form.team_id = rst.teamId;
        } else {
          this.centerid = '';
          this.groupid = '';
          this.teamid = '';
          this.form.center_id = '';
          this.form.group_id = '';
          this.form.team_id = '';
        }
        if (!this.form.user_id || this.form.user_id === '' || val === 'undefined') {
          this.error = this.$t('normal.error_09') + this.$t('label.applicant');
        } else {
          this.error = '';
        }
      },
      getobjectivetype(val) {
        this.form.objectivetype = val;
        if (val === 'PJ018005') {
          this.show = true;
          this.form.objectivetypeother = this.$t('label.PFANS1002VIEW_OTHER');
        } else {
          this.show = false;
          this.form.objectivetypeother = null;
          this.rules.objectivetypeother[0].required = false;
        }
      },
      getCity(val) {
        this.form.city = val;
      },
      getplan1(val) {
        this.form.plan = val;
        if (val === '1') {
          this.show2 = true;
        } else {
          this.show2 = false;
          this.form.plantype = null;
          this.show3 = false;
          this.form.classificationtype = null;
          this.form.balance = null;
        }
      },
      getplantype(val) {
        this.form.plantype = val;
        if (val === 'PR002006') {
          this.show3 = true;
        } else {
          this.show3 = false;
          this.form.classificationtype = null;
          this.form.balance = null;
        }
      },
      getclassificationtype(val) {
        this.form.classificationtype = val;
      },
      getaccommodationcost1(val) {
        this.form.accommodationcost = val;
      },
      getaccommodation1(val) {
        this.form.accommodation = val;
      },
      getpassengers1(val) {
        this.form.passengers = val;
        if (val === '1') {
          this.show4 = true;
        } else {
          this.show4 = false;
          this.form.fixedassetsno = null;
        }
      },
      getexternal(val) {
        this.form.external = val;
        if (val === '1') {
          this.show5 = true;
        } else {
          this.show5 = false;
          this.form.reason = null;
          this.form.regulations = null;
        }
      },
      workflowState(val) {
        if (val.state === '1') {
          this.form.status = '3';
        } else if (val.state === '2') {
          this.form.status = '4';
        }
        this.buttonClick('update');
      },
      start(val) {
        this.form.status = '2';
        this.buttonClick('update');
      },
      end(val) {
        this.form.status = '0';
        this.buttonClick('update');
      },
      // update() {
      //   this.loading = true;
      //   this.$store
      //     .dispatch('PFANS1035Store/updateBusiness', this.baseInfo)
      //     .then(response => {
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
      paramsTitle() {
        this.$router.push({
          name: 'PFANS1001FormView',
          params: {
            title: 2,
          },
        });
      },
      submit() {
        let val = this.currentRow;
        let val1 = this.currentRow1;
        this.dialogTableVisible = false;
        this.form.projectname = val;
        this.form.companyprojectsname = val1;
      },
      handleClickChange(val) {
        this.currentRow = val.projectname;
        this.currentRow1 = val.companyprojectsname;
      },
      getProjectNames() {
        this.loading = true;
        this.$store
          .dispatch('PFANS5001Store/getFpans5001List2', {})
          .then(response => {
            this.gridData = [];
            for (let i = 0; i < response.length; i++) {
              var vote = {};
              vote.projectname = response[i].project_name;
              vote.numbers = response[i].numbers;
              vote.companyprojectsname = response[i].companyprojects_id;
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
      handleClick(tab, event) {
        this.activeName = tab.name;
        //出差内容
        if (tab.name === 'third') {
          if (this.tablePD[0].travelcontent_id === '') {
            let date = [];
            date.push(this.form.startdate);
            date.push(this.form.startdate);
            this.tablePD[0].duringdate = date;
            this.tablePD[0].place = this.$t('label.PFANS1035FORMVIEW_MOBILE');
            this.tablePD[1].place =  getDictionaryInfo(this.form.city).value1;
            this.tablePD[2].place = this.$t('label.PFANS1035FORMVIEW_MOBILE');

            let date1 = [];
            date1.push(this.form.startdate);
            date1.push(this.form.enddate);
            this.tablePD[1].duringdate = date1;

            let date2 = [];
            date2.push(this.form.enddate);
            date2.push(this.form.enddate);
            this.tablePD[2].duringdate = date2;
          }
        }
      },
      buttonClick(val) {
        if (val === 'back') {
          this.paramsTitle();
        } else {
          this.checkRequire();
          this.$refs['refform'].validate(valid => {
            if (valid) {
              this.loading = true;
              this.form.businesstype = '1';
              this.form.user_id = this.userlist;
              this.baseInfo.business = JSON.parse(JSON.stringify(this.form));
              this.baseInfo.travelcontent = [];
              for (let i = 0; i < this.tablePD.length; i++) {
                this.baseInfo.travelcontent.push(
                  {
                    travelcontent_id: this.tablePD[i].travelcontent_id,
                    businessid: this.tablePD[i].businessid,
                    //开始结束日期
                    duringdate: moment(this.tablePD[i].duringdate[0]).format('YYYY-MM-DD') + ' ~ ' + moment(this.tablePD[i].duringdate[1]).format('YYYY-MM-DD'),
                    place: this.tablePD[i].place,
                    content: this.tablePD[i].content,
                  },
                );
              }
              if (this.$route.params._id) {
                this.baseInfo.business.businessid = this.$route.params._id;
                this.loading = true;
                this.$store
                  .dispatch('PFANS1035Store/updateBusiness', this.baseInfo)
                  .then(response => {
                    this.data = response;
                    this.loading = false;
                    if (val !== 'update') {
                      Message({
                        message: this.$t('normal.success_02'),
                        type: 'success',
                        duration: 5 * 1000,
                      });
                      this.paramsTitle();
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
                  .dispatch('PFANS1035Store/createBusiness', this.baseInfo)
                  .then(response => {
                    this.data = response;
                    this.loading = false;
                    Message({
                      message: this.$t('normal.success_01'),
                      type: 'success',
                      duration: 5 * 1000,
                    });
                    this.paramsTitle();
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
        }
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">
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






