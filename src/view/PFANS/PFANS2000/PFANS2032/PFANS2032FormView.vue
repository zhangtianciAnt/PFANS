<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :canStart="canStart" :title="title" :workflowCode="right"
                         @buttonClick="buttonClick"
                         @end="end" @start="start" @workflowState="workflowState" ref="container" v-loading="loading">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="reff" style="padding: 2vw">
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane :label="$t('label.PFANS2026VIEW_OUT')" name="second">
              <el-row v-if='checkbox'>

                <el-col :span="8">
                  <el-checkbox v-model="form.checkedgm" disabled>
                    <div class="sub_color_blue">
                      {{$t('label.PFANS2026FORMVIEW_MESSAGE9')}}
                    </div>
                  </el-checkbox>
                </el-col>
                <el-col :span="8">
                  <el-checkbox v-model="form.checkedcenter" disabled>
                    <div class="sub_color_blue">
                      {{$t('label.PFANS2026FORMVIEW_MESSAGE10')}}
                    </div>
                  </el-checkbox>
                </el-col>
              </el-row>
              <el-row style="margin-top: 1rem">
                <el-col :span="8">
                  <el-form-item :label="$t('label.center')">
                    <el-input :disabled="true" style="width:20vw" v-model="centerid"></el-input>
                    <el-input v-show='false' :disabled="false" style="width:20vw" v-model="form.center_id"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.group')">
                    <el-input :disabled="true" style="width:20vw" v-model="groupid"></el-input>
                    <el-input v-show='false' :disabled="false" style="width:20vw" v-model="form.group_id"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.team')">
                    <el-input :disabled="true" style="width:20vw" v-model="teamid"></el-input>
                    <el-input v-show='false' :disabled="false" style="width:20vw" v-model="form.team_id"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :error="error" :label="$t('label.PFANS2026VIEW_RESIGN')" prop="user_id">
                    <user :disabled="true" :error="error" :selectType="selectType" :userlist="userlist"
                          @getUserids="getUserids" style="width:20vw" v-model="form.user_id"></user>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2026VIEW_EDUCATIONALBACKGROUND')"
                                prop="educational_background">
                    <dicselect :code="code2"
                               :data="form.educational_background"
                               :disabled="true"
                               :multiple="multiple"
                               @change="geteducational_background"
                               style="width:20vw">
                    </dicselect>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2026VIEW_RESIGNATIONDATE')" prop="resignation_date">
                    <el-date-picker :disabled="true" style="width:20vw" v-model="form.resignation_date">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :error="errorreporter" :label="$t('label.PFANS2026VIEW_REPORTER')">
                    <user :disabled="!disable" :error="errorreporter" :selectType="selectType"
                          :userlist="reporterlist" @getUserids="getReporterids" style="width:20vw"></user>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2026VIEW_REPORTDATE')">
                    <el-date-picker :disabled="!disable" style="width:20vw" v-model="form.report_date">
                    </el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANSUSERFORMVIEW_RANK')">
                    <dicselect
                      :code="code"
                      class="width"
                      style="width:20vw"
                      :data="form.starank"
                      :disabled="true"
                    ></dicselect>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :error="errordata" :label="$t('label.PFANS2032FROMVIEW_USERDATA')" prop="userdata">
                    <user :disabled="!disable" :error="errordata" :selectType="selectType" :userlist="userdatalist"
                          @getUserids="getUserdata" style="width:20vw" v-model="form.userdata"></user>
                  </el-form-item>
                </el-col>
                <el-col :span="16">
                  <el-form-item :label="$t('label.PFANS2032FROMVIEW_REMARKDATA')">
                    <el-input :disabled="!disable" style="width: 46vw;" type="textarea"
                              v-model="form.remarkdata">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :error="errorwork" :label="$t('label.PFANS2032FROMVIEW_USERWORKFOLW')" prop="userwork">
                    <user :disabled="!disable" :error="errorwork" :selectType="selectType" :userlist="userworkfolwlist"
                          @getUserids="getUserwork" style="width:20vw" v-model="form.userworkfolw"></user>
                  </el-form-item>
                </el-col>
                <el-col :span="16">
                  <el-form-item :label="$t('label.PFANS2032FROMVIEW_REMARKWORKFOLW')">
                    <el-input :disabled="!disable" style="width: 46vw;" type="textarea"
                              v-model="form.remarkworkfolw">
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8" v-if="!checkdisable">
                  <el-form-item :label="$t('label.PFANS2030FROMVIEW_BUTTON2')">
                    <el-button @click="submitForm('ruleFormNew')" icon="el-icon-view" :disabled="false">
                      {{$t('label.PFANS2030FROMVIEW_BUTTON')}}
                    </el-button>
                  </el-form-item>
                </el-col>
              </el-row>
<!--              <el-drawer :visible.sync="diaoshu" size="60%" :show-close="false" :withHeader="false" append-to-body-->
<!--                         destroy-on-close custom-class="custimize_drawer">-->
<!--                <el-form label-position="top" label-width="8vw" ref="reff" style="padding: 2vw">-->
<!--                  <el-row>-->
<!--                    <el-col :span="8">-->
<!--                      <el-form-item :label="$t('label.center')">-->
<!--                        <el-input :disabled="true" style="width:12vw" v-model="centerid"></el-input>-->
<!--                      </el-form-item>-->
<!--                    </el-col>-->
<!--                    <el-col :span="8">-->
<!--                      <el-form-item :label="$t('label.group')">-->
<!--                        <el-input :disabled="true" style="width:12vw" v-model="groupid"></el-input>-->
<!--                      </el-form-item>-->
<!--                    </el-col>-->
<!--                    <el-col :span="8">-->
<!--                      <el-form-item :label="$t('label.team')">-->
<!--                        <el-input :disabled="true" style="width:12vw" v-model="teamid"></el-input>-->
<!--                      </el-form-item>-->
<!--                    </el-col>-->
<!--                  </el-row>-->
<!--                  <el-row>-->
<!--                    <el-col :span="8">-->
<!--                      <el-form-item :label="$t('label.user_name')" prop="user_id">-->
<!--                        <user :disabled="true" :selectType="selectType" :userlist="userlist"-->
<!--                              style="width:12vw"></user>-->
<!--                      </el-form-item>-->
<!--                    </el-col>-->
<!--                    <el-col :span="8">-->
<!--                      <el-form-item :label="$t('label.sex')" prop="sex">-->
<!--                        <dicselect :code="code3"-->
<!--                                   :data="sex"-->
<!--                                   :disabled="true"-->
<!--                                   :multiple="multiple"-->
<!--                                   style="width:12vw">-->
<!--                        </dicselect>-->
<!--                      </el-form-item>-->
<!--                    </el-col>-->
<!--                    <el-col :span="8">-->
<!--                      <el-form-item :label="$t('label.PFANS2026VIEW_EDUCATIONALBACKGROUND')"-->
<!--                                    prop="educational_background">-->
<!--                        <dicselect :code="code2"-->
<!--                                   :data="educational_background"-->
<!--                                   :disabled="true"-->
<!--                                   :multiple="multiple"-->
<!--                                   style="width:12vw">-->
<!--                        </dicselect>-->
<!--                      </el-form-item>-->
<!--                    </el-col>-->
<!--                  </el-row>-->
<!--                  <el-row>-->
<!--                    <el-col :span="8">-->
<!--                      <el-form-item :label="$t('label.PFANS2026VIEW_POSITION')" prop="position">-->
<!--                        <dicselect :code="code4"-->
<!--                                   :data="position"-->
<!--                                   :disabled="true"-->
<!--                                   :multiple="multiple"-->
<!--                                   style="width:12vw">-->
<!--                        </dicselect>-->
<!--                      </el-form-item>-->
<!--                    </el-col>-->
<!--                    <el-col :span="8">-->
<!--                      <el-form-item :label="$t('label.PFANS2026VIEW_ENTRYTIME')" prop="entry_time">-->
<!--                        <el-date-picker :disabled="true" style="width:12vw" v-model="entry_time">-->
<!--                        </el-date-picker>-->
<!--                      </el-form-item>-->
<!--                    </el-col>-->
<!--                    <el-col :span="8">-->
<!--                      <el-form-item :label="$t('label.application_date')" prop="application_date">-->
<!--                        <el-date-picker :disabled="true" style="width:12vw" v-model="application_date">-->
<!--                        </el-date-picker>-->
<!--                      </el-form-item>-->
<!--                    </el-col>-->
<!--                  </el-row>-->
<!--                  <el-row>-->
<!--                    <el-col :span="8">-->
<!--                      <el-form-item :label="$t('label.PFANSUSERFORMVIEW_RANK')">-->
<!--                        <dicselect-->
<!--                          :code="code"-->
<!--                          class="width"-->
<!--                          style="width:12vw"-->
<!--                          :data="starank"-->
<!--                          :disabled="true"-->
<!--                        ></dicselect>-->
<!--                      </el-form-item>-->
<!--                    </el-col>-->
<!--                    <el-col :span="8">-->
<!--                      <el-form-item :label="$t('label.PFANS2026VIEW_ADDRESS')">-->
<!--                        <el-input :disabled="true" maxlength="50" style="width:12vw"-->
<!--                                  v-model="address"></el-input>-->
<!--                      </el-form-item>-->
<!--                    </el-col>-->
<!--                    <el-col :span="8">-->
<!--                      <el-form-item :label="$t('label.PFANS2026VIEW_DEPARTUREDATE')">-->
<!--                        <el-date-picker :disabled="true" style="width:12vw" v-model="hope_exit_date"-->
<!--                        >-->
<!--                        </el-date-picker>-->
<!--                      </el-form-item>-->
<!--                    </el-col>-->
<!--                  </el-row>-->
<!--                  <el-row>-->
<!--                    <el-col :span="8">-->
<!--                      <el-form-item :label="$t('label.PFANS2026VIEW_FIXEDTELEPHONE')">-->
<!--                        <el-input :disabled="true" maxlength="20" style="width:12vw"-->
<!--                                  v-model="fixed_phone"></el-input>-->
<!--                      </el-form-item>-->
<!--                    </el-col>-->
<!--                    <el-col :span="8">-->
<!--                      <el-form-item :label="$t('label.user_mobile')">-->
<!--                        <el-input :disabled="true" maxlength="20" style="width:12vw"-->
<!--                                  v-model="cellphone"></el-input>-->
<!--                      </el-form-item>-->
<!--                    </el-col>-->
<!--                    <el-col :span="8">-->
<!--                      <el-form-item :label="$t('label.email')">-->
<!--                        <el-input :disabled="true" maxlength="100" style="width:12vw"-->
<!--                                  v-model="email"></el-input>-->
<!--                      </el-form-item>-->
<!--                    </el-col>-->
<!--                  </el-row>-->
<!--                  <el-row>-->
<!--                    <el-form-item :label="$t('label.PFANS2026VIEW_CAUSE')">-->
<!--                      <el-input :disabled="true"-->
<!--                                :placeholder="$t('label.PFANS2026VIEW_REMARK2')"-->
<!--                                style="width: 49.5vw" type="textarea"-->
<!--                                v-model="reason">-->
<!--                      </el-input>-->
<!--                    </el-form-item>-->
<!--                  </el-row>-->
<!--                </el-form>-->
<!--              </el-drawer>-->
              <el-row>
                <el-col :span="24">
                  <el-form-item :label="$t('label.PFANS2026VIEW_SOCIALEVALUATION')">
                    <dicselect :code="code1"
                               :data="form.social_evaluation"
                               :disabled="!disable"
                               :multiple="multiple"
                               @change="getSocial"
                               style="width: 70vw;">
                    </dicselect>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item :label="$t('label.PFANS2026VIEW_EXTERNALEVALUATION')">
                  <el-input :disabled="!disable" style="width: 70vw;" type="textarea"
                            v-model="form.external_evaluation">
                  </el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item :label="$t('label.PFANS2026VIEW_REASON2')">
                  <el-input :disabled="!disable" :placeholder="$t('label.PFANS2026FORMVIEW_PLACEHOLDER1')"
                            style="width: 70vw;"
                            type="textarea" v-model="form.reason2">
                  </el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item :label="$t('label.PFANS2026VIEW_IMPACTRESIGNATIONEXTERNAL')">
                  <el-input :disabled="!disable" style="width: 70vw;" type="textarea"
                            v-model="form.impact_resignation_external">
                  </el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item :label="$t('label.PFANS2026VIEW_IMPACTRESIGNATIONINTERNAL')">
                  <el-input :disabled="!disable" style="width: 70vw;" type="textarea"
                            v-model="form.impact_resignation_internal">
                  </el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item :label="$t('label.PFANS2026VIEW_INFLUENCEINFORMATIONSECURITY')">
                  <el-input :disabled="!disable" :placeholder="$t('label.PFANS2026FORMVIEW_PLACEHOLDER2')" :rows="3"
                            style="width: 70vw;"
                            type="textarea"
                            v-model="form.influence_information_security">
                  </el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item :label="$t('label.PFANS2026VIEW_RETIREMENTSTRATEGY')">
                  <el-input :disabled="!disable" :placeholder="$t('label.PFANS2026FORMVIEW_PLACEHOLDER3')"
                            style="width: 70vw;"
                            type="textarea"
                            v-model="form.retirement_strategy">
                  </el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item :label="$t('label.PFANS2026FORMVIEW_DATA1')" prop="jpwork_delivery">
                  <el-input :disabled="!disable1" :rows="2" style="width: 70vw;" type="textarea"
                            v-model="form.jpwork_delivery">
                  </el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item :label="$t('label.PFANS2026FORMVIEW_CITATION')">
                  <el-row>
                    <el-col :span="24">
                      <el-table :data="tableD" stripe border header-cell-class-name="sub_bg_color_blue"
                                style="width: 70vw">
                        <el-table-column :label="$t('label.PFANS2026FORMVIEW_CONTENT')" align="center" fixed
                                         prop="content" width="230">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable1" v-model="scope.row.content">
                            </el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS2026FORMVIEW_USERID')" align="center" prop="user_id">
                          <template slot-scope="scope">
                            <user
                              :disabled="!disable1"
                              :no="scope.row"
                              :userlist="scope.row.user_id"
                              @getUserids="getCitationUserid"
                              selectType="Single"
                              style="width: 90%"
                            ></user>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS2026FORMVIEW_REMARKS')" align="center" prop="remarks">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable1" v-model="scope.row.remarks">
                            </el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.operation')" align="center" width="200">
                          <template slot-scope="scope">
                            <el-button
                              :disabled="!disable1"
                              @click.native.prevent="deleteRow(scope.$index, tableD)"
                              plain
                              size="small"
                              type="danger"
                            >{{$t('button.delete')}}
                            </el-button>
                            <el-button
                              :disabled="!disable1"
                              @click="addRow()"
                              plain
                              size="small"
                              type="primary"
                            >{{$t('button.insert')}}
                            </el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-row>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS2026VIEW_RIGHT')" name="fourth">
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.center')">
                    <el-input :disabled="true" style="width:20vw" v-model="centerid"></el-input>
                    <el-input v-show='false' :disabled="false" style="width:20vw" v-model="form.center_id"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.group')">
                    <el-input :disabled="true" style="width:20vw" v-model="groupid"></el-input>
                    <el-input v-show='false' :disabled="false" style="width:20vw" v-model="form.group_id"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.team')">
                    <el-input :disabled="true" style="width:20vw" v-model="teamid"></el-input>
                    <el-input v-show='false' :disabled="false" style="width:20vw" v-model="form.team_id"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :error="error" :label="$t('label.user_name')">
                    <user :disabled="true" :error="error" :selectType="selectType" :userlist="userlist"
                          @getUserids="getUserids" style="width:20vw" v-model="form.user_id"></user>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.sex')" prop="sex">
                    <dicselect :code="code3"
                               :data="form.sex"
                               :disabled="true"
                               :multiple="multiple"
                               @change="getsex"
                               style="width:20vw">
                    </dicselect>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-table
                    :data="tableData"
                    border
                    stripe
                    header-cell-class-name="sub_bg_color_blue"
                    style="width: 90vw">
                    <el-table-column
                      :label="$t('label.PFANS2026FORMVIEW_ORDERNUMBER')"
                      align="center"
                      prop="ordernumber"
                      width="50">
                    </el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS2026FORMVIEW_CONFIRMPERSON')"
                      align="center"
                      prop="confirmperson"
                      width="150">
                    </el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS2026FORMVIEW_CONFIRMEDATA')"
                      align="center"
                      prop="confirmdata"
                      width="605">
                    </el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS2026FORMVIEW_CONFIRMMARK')"
                      align="center" width="100">
                      <template slot-scope="scope">
                        <el-checkbox :disabled="true" v-model="scope.row.checked" :on="scope.row"
                                     @change="checkCon(scope.row)"></el-checkbox>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS2026FORMVIEW_CONDATE')"
                      align="center"
                      width="150">
                      <template slot-scope="scope">
                        <el-input :disabled="true" v-model="scope.row.condate" :on="scope.row"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column
                      :label="$t('label.PFANS2026FORMVIEW_CONPERSON')"
                      align="center"
                      width="150">
                      <template slot-scope="scope">
                        <el-input :disabled="true" v-model="scope.row.person" :on="scope.row"></el-input>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </div>
    </EasyNormalContainer>
    <PFANS2026Pop :params="urlparams" ref="PFANS2026Pop" :url="url"></PFANS2026Pop>
  </div>
</template>

<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import user from '../../../components/user.vue';
  import {Message} from 'element-ui';
  import moment from 'moment';
  import {getOrgInfoByUserId, getUserInfo} from '@/utils/customize';
  import {isvalidPhone, telephoneNumber} from '@/utils/validate';
  import dicselect from '../../../components/dicselect';
  import {getCurrentRole,getCurrentRole12} from '../../../../utils/customize';
  import {getDictionaryInfo} from '../../../../utils/customize';
  import PFANS2026Pop from '@/components/EasyPop/PFANS2026Pop';

  export default {
    name: 'PFANS2032FormView',
    components: {
      dicselect,
      EasyNormalContainer,
      user,
      PFANS2026Pop
    },
    data() {
      var validateDay = (rule, value, callback) => {
        if (value) {
//wxl 0410  start
          // if (moment(value).diff(moment(this.form.application_date), 'day') <= 30) {
          //   callback(new Error(this.$t('normal.error_date1')));
          // }
          if (moment(value).diff(moment(this.form.application_date), 'day') < 0) {
            callback(new Error(this.$t('normal.error_checkTime1') + this.$t('label.application')));
          }
//wxl 0410  end
          else {
            callback();
          }
        } else {
          callback();
        }
      };
      var checkuser = (rule, value, callback) => {
        if (!this.form.user_id || this.form.user_id === '' || this.form.user_id === 'undefined') {
          this.error = this.$t('normal.error_09') + this.$t('label.PFANS2026VIEW_RESIGN');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS2026VIEW_RESIGN')));
        } else {
          this.error = '';
          return callback();
        }
      };
      var userdata = (rule, value, callback) => {
        if (!this.form.userdata || this.form.userdata === '' || this.form.userdata === 'undefined') {
          this.errordata = this.$t('normal.error_09') + this.$t('label.PFANS2032FROMVIEW_USERDATA');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS2032FROMVIEW_USERDATA')));
        } else {
          this.errordata = '';
          return callback();
        }
      };

      var userwork = (rule, value, callback) => {
        if (!this.form.userworkfolw || this.form.userworkfolw === '' || this.form.userworkfolw === 'undefined') {
          this.errorwork = this.$t('normal.error_09') + this.$t('label.PFANS2032FROMVIEW_USERWORKFOLW');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS2032FROMVIEW_USERWORKFOLW')));
        } else {
          this.errorwork = '';
          return callback();
        }
      };


      var checkrep = (rule, value, callback) => {
        if (this.disable1) {
          if (!this.form.reporter || this.form.reporter === '' || this.form.reporter === 'undefined') {
            this.errorreporter = this.$t('normal.error_09') + this.$t('label.user_name');
            return callback(new Error(this.$t('normal.error_09') + this.$t('label.user_name')));
          } else {
            this.errorreporter = '';
            return callback();
          }
        } else {
          callback();
        }
      };
      return {
        flowData: [],
        listsums: [],
        status: '',
        ID: '',
        url: '',
        urlparams: '',
        defaultStart: false,
        checkdisable: true,
        hope_exit_date: '',
        sex: '',
        educational_background: '',
        position: '',
        entry_time: '',
        application_date: '',
        starank: '',
        address: '',
        fixed_phone: '',
        cellphone: '',
        email: '',
        reason: '',
        code: '',
        code4: 'PG021',
        arrSOF: [],
        centerid: '',
        groupid: '',
        teamid: '',
        tableData: [{
          ordernumber: '1',
          confirmperson: this.$t('label.PFANS2026FORMVIEW_UNIONMEMBER'),
          confirmdata: this.$t('label.PFANS2026FORMVIEW_DATA4'),
          checked: '',
          condate: '',
          person: '',
        },
          {
            ordernumber: '2',
            confirmperson: this.$t('label.PFANS2026FORMVIEW_FINANCE'),
            confirmdata: this.$t('label.PFANS2026FORMVIEW_DATA5'),
            checked: '',
            condate: '',
            person: '',
          }, {
            ordernumber: '3',
            confirmperson: this.$t('label.PFANS2026FORMVIEW_LEGALAFFAIRS'),
            confirmdata: this.$t('label.PFANS2026FORMVIEW_DATA6'),
            checked: '',
            condate: '',
            person: '',
          }, {
            ordernumber: '4',
            confirmperson: this.$t('label.PFANS2026FORMVIEW_AFFAIRSPERSONNEL1'),
            confirmdata: this.$t('label.PFANS2026FORMVIEW_DATA7'),
            checked: '',
            condate: '',
            person: '',
          }, {
            ordernumber: '5',
            confirmperson: this.$t('label.PFANS2026FORMVIEW_AFFAIRSPERSONNEL2'),
            confirmdata: this.$t('label.PFANS2026FORMVIEW_DATA8'),
            checked: '',
            condate: '',
            person: '',
          },
          {
            ordernumber: '6',
            confirmperson: this.$t('label.PFANS2026FORMVIEW_AFFAIRSPERSONNEL4'),
            confirmdata: this.$t('label.PFANS2026FORMVIEW_DATA9'),
            checked: '',
            condate: '',
            person: '',
          }, {
            ordernumber: '7',
            confirmperson: this.$t('label.PFANS2026FORMVIEW_AFFAIRSPERSONNEL5'),
            confirmdata: this.$t('label.PFANS2026FORMVIEW_DATA11'),
            checked: '',
            condate: '',
            person: '',
          }, {
            ordernumber: '8',
            confirmperson: this.$t('label.PFANS2026FORMVIEW_INFORMATIONSYSTEM'),
            confirmdata: this.$t('label.PFANS2026FORMVIEW_DATA12'),
            checked: '',
            condate: '',
            person: '',
          }, {
            ordernumber: '9',
            confirmperson: this.$t('label.PFANS2026FORMVIEW_AFFAIRSPERSONNEL3'),
            confirmdata: this.$t('label.PFANS2026FORMVIEW_DATA10'),
            checked: '',
            condate: '',
            person: '',
          },
        ],
        right: '',
        d1: false,
        d2: true,
        d3: true,
        d4: true,
        errordata: '',
        errorwork: '',
        error: '',
        errorreporter: '',
        selectType: 'Single',
        title: 'title.PFANS2032FROMVIEW',
        userlist: '',
        userworkfolwlist: '',
        userdatalist: '',
        reporterlist: '',
        activeName: 'second',
        loading: false,
        // update gbb 20210315 NT_PFANS_20210228_BUG_044 数据【未开始】和【驳回】是可保存 start
        // buttonList: [
        //   {
        //     key: 'save',
        //     name: 'button.save',
        //     // disabled: false,
        //     icon: 'el-icon-check',
        //   },
        // ],
        buttonList:[],
        // update gbb 20210315 NT_PFANS_20210228_BUG_044 数据【未开始】和【驳回】是可保存 end
        tableD: [
          {
            citation_id: '',
            staffexitprocedure_id: '',
            content: '',
            user_id: '',
            remarks: '',
          },
        ],
        baseInfo: {},
        checkbox: false,
        form: {
          userdata: '',
          userworkfolw: '',
          remarkdata: '',
          remarkworkfolw: '',
          checkedgm: false,
          checkedcenter: false,
          starank: '',
          staffexitprocedure_id: '',
          center_id: '',
          group_id: '',
          team_id: '',
          user_name: '',
          sex: '',
          position: '',
          entry_time: '',
          application_date: moment(new Date()).format('YYYY-MM-DD'),
          jpwork_delivery: '',
          educational_background: '',
          resignation_date: '',
          reporter: '',
          report_date: moment().format('YYYY-MM-DD'),
          external_evaluation: '',
          influence_information_security: '',
          social_evaluation: '',
          reason2: '',
          retirement_strategy: '',
          impact_resignation_internal: '',
          impact_resignation_external: '',
        },
        code1: 'PR012',
        code2: 'PR022',
        code3: 'PR019',
        disable: true,
        disable1: true,
        multiple: false,
        rules: {
          user_id: [{
            required: true,
            validator: checkuser,
            trigger: 'change',
          }],

          userdata: [{
            required: true,
            validator: userdata,
            trigger: 'change',
          }],
          userwork: [{
            required: true,
            validator: userwork,
            trigger: 'change',
          }],
          sex: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.sex'),
            trigger: 'change',
          }],
          jpwork_delivery: [{
            required: true,
            message: this.$t('label.PFANS2026FORMVIEW_DATA0'),
            trigger: 'change',
          }],
          reporterlist: [{
            // required: this.disable1,
            required: true,
            validator: checkrep,
            trigger: 'change',
          }],
        },
        canStart: false,
        //add-ws-9/11-禅道任务515
        params_id: '',
        //add-ws-9/11-禅道任务515
      };
    },
    mounted() {
      this.loading = true;
      if (this.params_id) {
        this.$store
          .dispatch('PFANS2026Store/selectById2', {'staffexitproceid': this.params_id})
          .then(response => {
            this.form = response.staffexitproce;
            this.ID = this.params_id
            this.status = this.form.status === '4' ? 'normal.done' : (this.form.status === '2' ? 'normal.doing' : 'normal.todo')
            if (response.staffexitproce.checkedgm === 'true') {
              this.form.checkedgm = true;
              this.checkbox = true;
            } else {
              this.form.checkedgm = false;
            }
            let role = getCurrentRole();
            if(role == '2' || role == '3') { //GM Center
              this.right = 'W0139'//新流程
            }else { //TL 正式员工
              this.right = 'W0081'
            }
            if (response.staffexitproce.checkedcenter === 'true') {
              this.form.checkedcenter = true;
            } else {
              this.form.checkedcenter = false;
            }
            if (this.form.condate !== '' && this.form.condate !== null) {
              for (let i = 0; i < JSON.parse(this.form.condate).length; i++) {
                let aa = JSON.parse(this.form.condate)[i];
                this.tableData[i].checked = aa.jud1;
                this.tableData[i].condate = aa.jud2;
                this.tableData[i].person = aa.jud3;
              }
            }
            if (response.staffexitproce.user_id !== null && response.staffexitproce.user_id !== '') {
              let rst = getOrgInfoByUserId(response.staffexitproce.user_id);
              if (rst) {
                this.centerid = rst.centerNmae;
                this.groupid = rst.groupNmae;
                this.form.group_id = rst.groupId;
                this.teamid = rst.teamNmae;
              }
            }
            if (response.citation.length > 0) {
              this.tableD = response.citation;
            }
            this.userlist = this.form.user_id;
            this.userworkfolwlist = this.form.userworkfolw;
            this.userdatalist = this.form.userdata;
            this.reporterlist = this.form.reporter;
            this.baseInfo.staffexitproce = JSON.parse(JSON.stringify(this.form));
            this.baseInfo.citation = JSON.parse(JSON.stringify(this.tableD));
            if (!this.$route.params.disabled) {
              this.disable = this.$route.params.disabled;
              this.disable1 = this.$route.params.disabled;
            }
            this.checklist();
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
        this.$store
          .dispatch('PFANS2026Store/selectById', {'staffexitprocedureid': this.$route.params._staid})
          .then(response => {
            this.form = response.staffexitprocedure;
            this.form.resignation_date = response.staffexitprocedure.hope_exit_date;
            this.userlist = this.form.user_id;
            this.userworkfolwlist = this.form.userworkfolw;
            this.userdatalist = this.form.userdata;
            if (this.$store.getters.userinfo) {
              this.reporterlist = this.$store.getters.userinfo.userid;
            }
            if (response.staffexitprocedure.user_id !== null && response.staffexitprocedure.user_id !== '') {
              let rst = getOrgInfoByUserId(response.staffexitprocedure.user_id);
              if (rst) {
                this.centerid = rst.centerNmae;
                this.groupid = rst.groupNmae;
                this.form.group_id = rst.groupId;
                this.form.team_id = rst.teamId;
                this.form.center_id = rst.centerId;
                this.teamid = rst.teamNmae;
              }
            }
            this.loading = false;
          });
        this.loading = false;
      }
    },
    created() {
      //add-ws-9/11-禅道任务515
      this.params_id = this.$route.params._id;
      //add-ws-9/11-禅道任务515
      this.$store.commit('global/SET_WORKFLOWURL', '/PFANS2032View');
      if (this.$route.params._checkdisabled) {
        this.checkdisable = true;
      } else {
        this.checkdisable = false;
      }
      if (!this.$route.params.disabled) {
        this.buttonList = [];
      }
      this.disable = this.$route.params.disabled;
      // update gbb 20210315 NT_PFANS_20210228_BUG_044 数据【未开始】和【驳回】是可保存 start
      if (this.disable) {
        //未开始/驳回时可点击保存
        if (this.$route.params._status === this.$t('normal.todo') || this.$route.params._status === this.$t('label.node_step2')) {
          this.buttonList = [
            {
              key: 'save',
              name: 'button.save',
              // disabled: false,
              icon: 'el-icon-check',
            },
          ]
        }
      }
      // update gbb 20210315 NT_PFANS_20210228_BUG_044 数据【未开始】和【驳回】是可保存 end
    },
    methods: {
      checklist(){
        this.loading = true;
        this.$store
          .dispatch('PFANS2026Store/selectById', {'staffexitprocedureid': this.form.staffexitprocedure_id})
          .then(response => {
            this.listsums = response;
            let status = this.listsums.staffexitprocedure.status === '4' ? 'normal.done' : (this.listsums.staffexitprocedure.status === '2' ? 'normal.doing' : 'normal.todo')
            this.flowData= [
              {
                No: '1',
                Name: '离职申请',
                Status:status,
                url: 'PFANS2026FormView',
                params: {'_id':this.listsums.staffexitprocedure.staffexitprocedure_id}
              },
              {
                No: '2',
                Name: '退职者调书&离职手续',
                Status: this.status,
                url: 'PFANS2032FormView',
                params: {'_id':this.ID}
              }
            ]
            this.$emit('showPop',this.flowData)
          }).catch(error => {
          Message({
            message: error,
            type: 'error',
            duration: 5 * 1000,
          });
          this.loading = false;
        });
      },
      submitForm(ruleFormNew) {
        this.url = '';
        this.urlparams = '';
        this.url = 'PFANS2026FormView';
        this.urlparams = {'_id': this.listsums.staffexitprocedure.staffexitprocedure_id, 'disabled': false};
        this.$refs.PFANS2026Pop.open = true;
        this.loading = false;
      },
      checkRequire() {
        this.activeName = 'second';
      },
      getUserwork(val) {
        this.userworkfolwlist = val;
        this.form.userworkfolw = val;
        if (!this.form.userworkfolw || this.form.userworkfolw === '' || typeof val == 'undefined') {
          this.errorwork = this.$t('normal.error_08') + this.$t('label.PFANS2032FROMVIEW_USERWORKFOLW');
        } else {
          this.errorwork = '';
        }
      },
      getUserdata(val) {
        this.userdatalist = val;
        this.form.userdata = val;
        if (!this.form.userdata || this.form.userdata === '' || typeof val == 'undefined') {
          this.errordata = this.$t('normal.error_08') + this.$t('label.PFANS2032FROMVIEW_USERDATA');
        } else {
          this.errordata = '';
        }
      },
      getUserids(val) {
        this.userlist = val;
        this.form.user_id = val;
        let lst = getUserInfo(val);
        let rst = getOrgInfoByUserId(val);
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
        if (lst) {
          this.form.sex = lst.userinfo.sex;
          this.form.educational_background = lst.userinfo.educational;
          this.form.position = lst.userinfo.post;
          this.form.entry_time = lst.userinfo.enterday;
        } else {
          this.form.sex = '';
          this.form.educational_background = '';
          this.form.position = '';
          this.form.entry_time = '';
        }
        if (!this.form.user_id || this.form.user_id === '' || typeof val == 'undefined') {
          this.error = this.$t('normal.error_08') + this.$t('label.user_name');
        } else {
          this.error = '';
        }
      },
      getReporterids(val) {
        this.reporterlist = val;
        this.form.reporter = val;
        if (!this.form.reporter || this.form.reporter === '') {
          this.errorreporter = this.$t('normal.error_08') + this.$t('label.PFANS2026VIEW_REPORTER');
        } else {
          this.errorreporter = '';
        }
      },
      getCitationUserid(userlist, row) {
        row.user_id = userlist;
      },
      getType(val) {
        this.form.educational_background = val;
      },
      getSocial(val) {
        this.form.social_evaluation = val;
      },
      geteducational_background(val) {
        this.form.educational_background = val;
      },
      getsex(val) {
        this.form.sex = val;
      },
      getCurrentRole2() {
        let roles = '';
        if (this.$store.getters.useraccount && this.$store.getters.useraccount.roles && this.$store.getters.useraccount.roles.length > 0) {
          for (let role of this.$store.getters.useraccount.roles) {
            roles = roles + role.description;
          }
          if (roles.toUpperCase().indexOf('财务部长') != -1) {
            return '1';
          } else if (roles.toUpperCase().indexOf('法务') != -1) {
            return '2';
          } else if (roles.toUpperCase().indexOf('总务担当') != -1) {
            return '3';
          } else if (roles.toUpperCase().indexOf('工资计算担当') != -1) {
            return '4';
          } else if (roles.toUpperCase().indexOf('研修担当') != -1) {
            return '5';
          } else if (roles.toUpperCase().indexOf('人事总务部长') != -1) {
            return '6';
          } else if (roles.toUpperCase().indexOf('IT担当') != -1) {
            return '7';
          } else if (roles.toUpperCase().indexOf('离职担当') != -1) {
            return '8';
          } else if (roles.toUpperCase().indexOf('工会担当') != -1) {
            return '0';
          }
        }
      },
      getCurrentRole3() {
        let roles = '';
        if (this.$store.getters.useraccount && this.$store.getters.useraccount.roles && this.$store.getters.useraccount.roles.length > 0) {
          for (let role of this.$store.getters.useraccount.roles) {
            roles = roles + role.description;
          }
          if (roles.toUpperCase().indexOf('CENTER') != -1) {
            return '2';
          } else if (roles.toUpperCase().indexOf('GM') != -1) {
            return '1';
          } else if (roles.toUpperCase().indexOf('TL') != -1) {
            return '0';
          }
        }
      },
      workflowState(val) {
        if (this.form.checkedcenter == true) {
          let a = this.getCurrentRole2();
          if (a == 5) {
            if (this.tableData[5].checked == true) {
              this.tableData[8].checked = true;
              this.tableData[8].condate = moment(new Date()).format('YYYY-MM-DD');
              this.tableData[8].person = getUserInfo(this.$store.getters.userinfo.userid).userinfo.customername;
            } else {
              this.tableData[5].checked = true;
              this.tableData[5].condate = moment(new Date()).format('YYYY-MM-DD');
              this.tableData[5].person = getUserInfo(this.$store.getters.userinfo.userid).userinfo.customername;
            }
          } else {
            this.tableData[a].checked = true;
            this.tableData[a].condate = moment(new Date()).format('YYYY-MM-DD');
            this.tableData[a].person = getUserInfo(this.$store.getters.userinfo.userid).userinfo.customername;
          }
        } else {
          let b = this.getCurrentRole3();
          if (b == 1) {
            this.form.checkedgm = true;
          } else if (b == 2) {
            this.form.checkedgm = true;
            this.form.checkedcenter = true;
          }
        }
        if (val.state === '1') {
          this.form.status = '3';
        } else if (val.state === '2') {
          this.form.status = '4';
        }
        this.buttonClick('update');
      },
      //upd 审批流程 fr
      start(val) {
        this.checkbox = true;
        let b = this.getCurrentRole3();
        if (b == 1) {
          this.form.checkedgm = true;
        } else if (b == 2) {
          this.form.checkedgm = true;
          this.form.checkedcenter = true;
        }
        if (val.state === '0') {
          this.form.status = '2';
        } else if (val.state === '2') {
          this.form.status = '4';
        }
        this.buttonClick('update');
      },
      //upd 审批流程 to
      end() {
        this.form.status = '0';
        this.buttonClick('update');
      },
      deleteRow(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        } else {
          this.tableD = [{
            citation_id: '',
            staffexitprocedure_id: '',
            content: '',
            user_id: null,
            remarks: '',
          }];
        }
      },
      addRow() {
        this.tableD.push({
          citation_id: '',
          staffexitprocedure_id: '',
          content: '',
          user_id: '',
          remarks: '',
        });
      },

      buttonClick(val) {
        this.checkRequire();
        this.$refs['reff'].validate(valid => {
          if (valid) {
            //离职相关手续的字段拼接
            for (let i = 0; i < this.tableData.length; i++) {
              this.arrSOF.push({
                jud1: this.tableData[i].checked,
                jud2: this.tableData[i].condate,
                jud3: this.tableData[i].person,
              });
            }
            this.form.condate = JSON.stringify(this.arrSOF);
            this.loading = true;
            this.baseInfo = {};
            this.form.user_id = this.userlist;
            this.form.userworkfolw = this.userworkfolwlist;
            this.form.userdata = this.userdatalist;
            this.form.reporter = this.reporterlist;
            this.form.application_date = moment(this.form.application_date).format('YYYY-MM-DD');
            if (this.form.entry_time) {
              this.form.entry_time = moment(this.form.entry_time).format('YYYY-MM-DD');
            }
            this.form.report_date = moment(this.form.report_date).format('YYYY-MM-DD');
            this.baseInfo.staffexitproce = JSON.parse(JSON.stringify(this.form));
            this.baseInfo.citation = [];
            for (let i = 0; i < this.tableD.length; i++) {
              if (this.tableD[i].content !== '' || this.tableD[i].user_id !== '' || this.tableD[i].remarks !== '') {
                this.baseInfo.citation.push(
                  {
                    citation_id: this.tableD[i].citation_id,
                    staffexitprocedure_id: this.tableD[i].staffexitprocedure_id,
                    content: this.tableD[i].content,
                    user_id: this.tableD[i].user_id,
                    remarks: this.tableD[i].remarks,
                  },
                );
              }
            }
            if (this.params_id) {
              // this.baseInfo.staffexitproce.staffexitproce_id = this.params_id;
              this.$store
                .dispatch('PFANS2026Store/update2', this.baseInfo)
                .then(response => {
                  this.data = response;
                  this.$store.commit('global/SET_WORKFLOWURL', '/PFANS2032View');
                  this.$router.push({
                    name: 'PFANS2032View',
                  });
                  this.loading = false;
                  if (val !== 'update') {
                    Message({
                      message: this.$t('normal.success_02'),
                      type: 'success',
                      duration: 5 * 1000,
                    });
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
              this.baseInfo.staffexitproce.staffexitprocedure_id = this.$route.params._staid;
              this.$store
                .dispatch('PFANS2026Store/insert2', this.baseInfo)
                .then(response => {
                  this.data = response;
                  this.loading = false;
                  this.$store.commit('global/SET_WORKFLOWURL', '/PFANS2032View');
                  this.$router.push({
                    name: 'PFANS2032View',
                  });
                  Message({
                    message: this.$t('normal.success_01'),
                    type: 'success',
                    duration: 5 * 1000,
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

<style rel="stylesheet/scss" lang="scss">
  .custimize_drawer {
    -webkit-box-sizing: border-box;
    overflow: auto;
  }
</style>
