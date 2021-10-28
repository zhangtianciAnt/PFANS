<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" v-loading="loading" :title="title" @buttonClick="buttonClick"
                         @disabled="setdisabled"
                         @end="end" @start="start" @workflowState="workflowState" ref="container">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="ruleForm"
                 style="padding: 2vw">
          <el-tabs @tab-click="handleClick" v-model="form.ticketstype" type="border-card">
            <el-tab-pane :label="$t('label.PFANS3001FORMVIEW_DOMESTIC')" name="first" value="1"
                         :disabled="this.$route.params._id !== '' && this.form.ticketstype === 'second'"></el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS3001FORMVIEW_FOREIGN')" name="second" value="2"
                         :disabled="this.$route.params._id !== '' && this.form.ticketstype === 'first'"></el-tab-pane>
            <!--            start  fjl 2020/04/08  添加总务担当的受理功能-->
            <el-row>
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS3001FORMVIEW_ACCEPTSTATUS')">
                  <el-select clearable style="width: 20vw" v-model="form.acceptstatus" :disabled="acceptShow"
                             :placeholder="$t('normal.error_09')" @change="changeAcc">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS3006VIEW_ACCEPTTIME')">
                  <el-date-picker :disabled="acceptShow" style="width:20vw" type="date"
                                  v-model="form.findate"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-show="refuseShow">
                <el-form-item :label="$t('label.PFANS3007FORMVIEW_REFUSEREASON')">
                  <el-input :disabled="acceptShow" maxlength="100" style="width:20vw"
                            v-model="form.refusereason"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-show="refuseShow1">
                <el-form-item :label="$t('label.PFANS5004VIEW_FINSHTIME')">
                  <el-date-picker :disabled="acceptShow" style="width:20vw" type="date"
                                  v-model="form.finshtime"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <!--  新增总务，完成状态显示 start  -->
            <el-row>
              <el-col :span="8" v-show="refuseShow1">
                <el-form-item :label="$t('label.PFANS3001FORMVIEW_TICKETORDERNUMBER')" prop="ticketordernumber">
                  <el-input :disabled="acceptShow" maxlength="100" style="width:20vw"
                            v-model="form.ticketordernumber"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-show="refuseShow1">
                <el-form-item :label="$t('label.PFANS3001FORMVIEW_TICKETVENDORS')" prop="ticketvendors">
                  <el-input :disabled="acceptShow" maxlength="100" style="width:20vw"
                            v-model="form.ticketvendors"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8" v-show="refuseShow1">
                <el-form-item :label="$t('label.PFANS3001FORMVIEW_CHANGEAMOUNTFORFIRST')" >
                  <div class="block">
                    <el-input-number
                      :disabled="acceptShow"
                      style="width:20vw"
                      :precision="2"
                      :step="0.1"
                      controls-position="right"
                      v-model="form.changeamountforfirst">
                    </el-input-number>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-show="refuseShow1">
                <el-form-item :label="$t('label.PFANS3001FORMVIEW_CHANGEAMOUNTFORSECOND')" >
                  <div class="block">
                    <el-input-number
                      :disabled="acceptShow"
                      style="width:20vw"
                      :precision="2"
                      :step="0.1"
                      controls-position="right"
                      v-model="form.changeamountforsecond">
                    </el-input-number>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-show="refuseShow1">
                <el-form-item :label="$t('label.PFANS3001FORMVIEW_TICKETAMOUNT')" prop="ticketamount">
                  <div class="block">
                    <el-input-number
                      :disabled="acceptShow"
                      style="width:20vw"
                      :precision="2"
                      :step="0.1"
                      controls-position="right"
                      v-model="form.ticketamount">
                    </el-input-number>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <!--  新增总务，完成状态显示 end  -->
            <!--            end  fjl 2020/04/08  添加总务担当的受理功能-->
            <!--<el-row>-->
            <!--<el-col :span="8">-->
            <!--<el-form-item :label="$t('label.center')">-->
            <!--<el-input :disabled="true" style="width:20vw" v-model="centerid"></el-input>-->
            <!--<el-input v-show='false' :disabled="false" style="width:20vw" v-model="form.center_id"></el-input>-->
            <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="8">-->
            <!--<el-form-item :label="$t('label.group')">-->
            <!--<el-input :disabled="true" style="width:20vw" v-model="groupid"></el-input>-->
            <!--<el-input v-show='false' :disabled="false" style="width:20vw" v-model="form.group_id"></el-input>-->
            <!--</el-form-item>-->
            <!--</el-col>-->
            <!--<el-col :span="8">-->
            <!--<el-form-item :label="$t('label.team')">-->
            <!--<el-input :disabled="true" style="width:20vw" v-model="teamid"></el-input>-->
            <!--<el-input v-show='false' :disabled="false" style="width:20vw" v-model="form.team_id"></el-input>-->
            <!--</el-form-item>-->
            <!--</el-col>-->
            <!--</el-row>-->
            <el-row>
              <el-col :span="8">
                <el-form-item :label="$t('label.center')">
                  <org :disabled="!disable"
                       :orglist="form.center_id"
                       @getOrgids="getCenterid"
                       orgtype="1"
                       style="width: 20vw"
                  ></org>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('label.group')">
                  <org :disabled="!disable"
                       :orglist="form.group_id"
                       @getOrgids="getGroupId1"
                       orgtype="2"
                       style="width: 20vw"
                  ></org>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('label.team')">
                  <org :disabled="true"
                       :orglist="form.team_id"
                       @getOrgids="getTeamid"
                       orgtype="3"
                       style="width: 20vw"
                  ></org>
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
                <el-form-item :label="$t('label.PFANS1012FORMVIEW_BUDGET')" prop="budgetnumber">
                  <el-select clearable style="width: 20vw" v-model="form.budgetnumber" :disabled="!disable"
                             :placeholder="$t('normal.error_09')">
                    <el-option
                      v-for="item in options1"
                      :key="item.value"
                      :label="item.lable"
                      :value="item.value"
                      @change="getBudgetunit">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS3001VIEW_EXTENSIONNUMBER')" prop="extensionnumber">
                  <el-input :disabled="!disable" style="width:20vw" maxlength="20"
                            v-model="form.extensionnumber"></el-input>
                </el-form-item>
              </el-col>
              <!--              add_fjl_05/25  &#45;&#45; 修改国内时的身份证/护照-->
              <el-col :span="8" v-if="form.ticketstype === 'first'">
                <el-form-item :label="$t('label.PFANS3001FORMVIEW_IDCARDORPA')" prop="idcardorpa">
                  <el-input :disabled="!disable" maxlength="18" style="width:20vw" v-model="form.idcardorpa"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="form.ticketstype === 'second'">
                <el-form-item :label="$t('label.PFANS3001FORMVIEW_IDCARD')" prop="idcard">
                  <el-input :disabled="!disable" maxlength="18" style="width:20vw" v-model="form.idcard"></el-input>
                </el-form-item>
              </el-col>
              <!--              add_fjl_05/25  &#45;&#45; 修改国内时的身份证/护照-->
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
                    <!--NT_PFANS_20210308_BUG_149 ztc start-->
                    <el-option
                      v-if="form.ticketstype === 'second'"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      v-for="item in relations1">
                    </el-option>
                    <!--NT_PFANS_20210308_BUG_149 ztc end-->
                  </el-select>
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
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS3005VIEW_ACTUARIALAMOUNT')" prop="actuarialamount">
                  <div class="block">
                    <el-input-number
                      :disabled="!disable"
                      style="width:20vw"
                      :precision="2"
                      :step="0.1"
                      controls-position="right"
                      v-model="form.actuarialamount">
                    </el-input-number>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS3001VIEW_TRIPPOINT')" prop="trippoint">
                  <el-input :disabled="true" maxlength="50" style="width:20vw"
                            v-model="form.trippoint"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS3001FORMVIEW_TRIPSTART')" prop="tripstart">
                  <el-date-picker :disabled="true" style="width:20vw" type="date"
                                  v-model="form.tripstart"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS3001FORMVIEW_TRIPEND')" prop="tripend">
                  <el-date-picker :disabled="true" style="width:20vw" type="date"
                                  v-model="form.tripend"></el-date-picker>
                </el-form-item>
              </el-col>

            </el-row>
            <!--2020-05-06 ztc 机票改为明细 start-->
            <el-table :data="tableA" border stripe :header-cell-style="getRowClass">

              <el-table-column :label="$t('label.PFANS3001VIEW_GO')" align="center">
                <el-table-column :label="$t('label.PFANS3001VIEW_GOING')" prop="going" align="center" width="240">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" style="width: 90%" v-model="scope.row.going"></el-input>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS3001VIEW_GOAIRLINENUMBER')" prop="goairlinenumber"
                                 align="center" width="240">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" style="width: 90%"
                              v-model="scope.row.goairlinenumber"></el-input>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS3001VIEW_GODEPARTUREDATE')" prop="godeparturedate"
                                 align="center" width="240">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disable" style="width: 90%" type="datetime"
                                    v-model="scope.row.godeparturedate"></el-date-picker>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS3001VIEW_GOARRIVALDATE')" prop="goarrivaldate" align="center"
                                 width="240">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disable" style="width: 90%" type="datetime"
                                    v-model="scope.row.goarrivaldate"></el-date-picker>
                  </template>
                </el-table-column>
              </el-table-column>

              <el-table-column :label="$t('label.PFANS3001VIEW_RETURN')" align="center">
                <el-table-column :label="$t('label.PFANS3001VIEW_BACK')" prop="back" align="center" width="240">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" maxlength="20" style="width: 90%"
                              v-model="scope.row.back"></el-input>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS3001VIEW_GOAIRLINENUMBER')" prop="reairlinenumber"
                                 align="center"
                                 width="240">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" maxlength="20" style="width: 90%"
                              v-model="scope.row.reairlinenumber"></el-input>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS3001VIEW_GODEPARTUREDATE')" prop="ticketingdate" align="center"
                                 width="240">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disable" style="width: 90%" type="datetime"
                                    v-model="scope.row.ticketingdate"></el-date-picker>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS3001VIEW_GOARRIVALDATE')" prop="redeparturedate" align="center"
                                 width="240">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disable" style="width: 90%" type="datetime"
                                    v-model="scope.row.redeparturedate"></el-date-picker>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS3001VIEW_TICKETINGDATE')" prop="rearrivaldate" align="center"
                                 width="240">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disable" style="width: 90%" type="datetime"
                                    v-model="scope.row.rearrivaldate"></el-date-picker>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.operation')" width="160" align="center">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="deleteRow1(scope.$index, tableA)"
                    type="danger"
                    size="small"
                    plain
                    :disabled="!disable"
                  >{{$t('button.delete')}}
                  </el-button>
                  <el-button
                    @click="addRow1()"
                    type="primary"
                    size="small"
                    plain
                    :disabled="!disable"
                  >{{$t('button.insert')}}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <!--2020-05-06 ztc 机票改为明细 end-->
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
    import {getCurrentRole2, getDictionaryInfo, getOrgInfoByUserId} from '@/utils/customize';
    import {idcardNumber, isvalidPhone} from '@/utils/validate';
    import moment from 'moment';
    import {getOrgInfo} from "../../../../utils/customize";
    import org from '../../../components/org';

    export default {
        name: 'PFANS3001FormView',
        components: {
            EasyNormalContainer,
            PFANS3001View,
            user,
            dicselect,
            org,
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
                if (!value || value === '' || value === "undefined") {
                    callback(new Error(this.$t('normal.error_09') + this.$t('label.applicant')));
                    this.error = this.$t('normal.error_09') + this.$t('label.applicant');
                } else {
                    callback();
                    this.error = '';
                }
            };
            var centerIds = (rule, value, callback) => {
                if (!value || value === '' || value === 'undefined') {
                    this.errorcenter = this.$t('normal.error_09') + this.$t('label.center');
                    return callback(new Error(this.$t('normal.error_09') + this.$t('label.center')));
                } else {
                    this.errorcenter = '';
                    return callback();
                }
            };
            var groupIds = (rule, value, callback) => {
                if (!value || value === '' || value === 'undefined') {
                    this.errorgroup = this.$t('normal.error_09') + this.$t('label.group');
                    return callback(new Error(this.$t('normal.error_09') + this.$t('label.group')));
                } else {
                    this.errorgroup = '';
                    return callback();
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
            //region scc add 10/26 必填 from
            var validateOrder = (rule, value, callback) => {//机票订单号
              if(rule.required){
                if (this.form.ticketordernumber === null || this.form.ticketordernumber === '') {
                  callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS3001FORMVIEW_TICKETORDERNUMBER')));
                } else {
                  callback();
                }
              }else{
                callback();
              }
            };
            var validateSupplier = (rule, value, callback) => {//机票供应商
              if(rule.required){
                if (this.form.ticketvendors === null || this.form.ticketvendors === '') {
                  callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS3001FORMVIEW_TICKETVENDORS')));
                } else {
                  callback();
                }
              }else{
                callback();
              }
            };
            var validateTicketAmount = (rule, value, callback) => {//出票金额
              if(rule.required){
                if (!this.form.ticketamount || isNaN(this.form.ticketamount) || this.form.ticketamount === '0.00' || Number(this.form.ticketamount) < 0) {
                  callback(new Error(this.$t('label.PFANS3001FORMVIEW_TICKETAMOUNTTOZERO')));
                } else {
                  callback();
                }
              }else{
                callback();
              }
            };
          //endregion scc add 10/26 必填 to
            return {
                options1: [],
                centerid: '',
                groupid: '',
                teamid: '',
                errorredeparturedate: '',
                errorrearrivaldate: '',
                errorgodeparturedate: '',
                errorgoarrivaldate: '',
                errorcenter: '',
                errorgroup: '',
                showForeign: '',
                showDomestic: '',
                loading: false,
                checkGro: false,
                title: 'title.PFANS3001VIEW',
                error: '',
                selectType: 'Single',
                userlist: '',
                tableA: [{
                    tickets_id: '',
                    ticketsdetailid: '',
                    going: '',
                    goairlinenumber: '',
                    godeparturedate: '',
                    goarrivaldate: '',
                    back: '',
                    reairlinenumber: '',
                    ticketingdate: '',
                    redeparturedate: '',
                    rearrivaldate: '',
                }],
                buttonList: [],
                regExp: [],
                baseInfo: {},
                code: 'PG001',
                multiple: false,
                relations: [],
                relations1: [],
                options: [
                    {
                        value: '0',
                        label: this.$t('label.PFANS3006VIEW_ACCEPT'),
                    },
                    {
                        value: '1',
                        label: this.$t('label.PFANS3006VIEW_REFUSE'),
                    },
                    {
                        value: '2',
                        label: this.$t('label.PFANS3006VIEW_CARRYOUT'),
                    },

                    //add-ws-7/7-禅道247
                    {
                        value: '3',
                        label: this.$t('label.PFANS3006VIEW_CARRYOUT2'),
                    },
                    //add-ws-7/7-禅道247
                ],
                acceptShow: true,
                refuseShow: false,
                refuseShow1: false,
                form: {
                    businessname: '',
                    user_id: '',
                    center_id: '',
                    group_id: '',
                    team_id: '',
                    business_id: '',
                    applicationdate: moment(new Date()).format("YYYY-MM-DD"),
                    ticketstype: 'first',
                    idcard: '',
                    dcardorpa: '',
                    tripend: '',
                    passport: '',
                    effectivedate: '',
                    romanid: '',
                    extensionnumber: '',
                    budgetnumber: '',
                    mobilephone: '',
                    trippoint: '',
                    tripstart: '',
                    accept: '0',
                    acceptstatus: '',
                    findate: '',
                    refusereason: '',
                    actuarialamount: '',
                    finshtime: '',
                  //region scc add 10/26 新增机票详细 from
                    ticketordernumber: '',//机票订单号
                    ticketvendors: '',//机票供应商
                    changeamountforfirst: '',//第一次变更后金额
                    changeamountforsecond: '',//第二次变更后金额
                    ticketamount: '',//出票金额
                  //endregion scc add 10/26 新增机票详细 to
                },
                rules: {
                    user_id: [{
                        required: true,
                        validator: validateUserid,
                        trigger: 'change',
                    }],
                    center_id: [
                        {
                            required: true,
                            validator: centerIds,
                            trigger: 'change',
                        },
                    ],
                    group_id: [
                        {
                            required: true,
                            validator: groupIds,
                            trigger: 'change',
                        },
                    ],
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
                    budgetnumber: [{
                        required: true,
                        message: this.$t('normal.error_09') + this.$t('label.group') + this.$t('label.hou') + this.$t('label.PFANS1012FORMVIEW_BUDGET'),
                        trigger: 'change',
                    }],
                    extensionnumber: [{
                        required: true,
                        message: this.$t('normal.error_08') + this.$t('label.PFANS3001VIEW_EXTENSIONNUMBER'),
                        trigger: 'blur',
                    },],
                    idcardorpa: [{
                        required: true,
                        message: this.$t('normal.error_08') + this.$t('label.PFANS3001FORMVIEW_IDCARDORPA'),
                        trigger: 'blur',
                    }],
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
                        trigger: 'change',
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

                  //region scc add 10/26 必填 from
                    ticketordernumber: [{
                      required: false,
                      validator: validateOrder,
                      trigger: 'blur',
                    }],
                    ticketvendors: [{
                      required: false,
                      validator: validateSupplier,
                      trigger: 'blur',
                    }],
                    ticketamount: [{
                      required: false,
                      validator: validateTicketAmount,
                      trigger: 'change',
                    }],
                  //endregion scc add 10/26 必填 to
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
            //add-ws-7/7-禅道153
            if (this.$route.params._type === 0) {
                this.getBusOuter();
                this.loading = true;
                this.$store
                    .dispatch('PFANS1035Store/selectById2', {'business_id': this.$route.params._checkid})
                    .then(response => {
                        this.$store
                            .dispatch('PFANS3001Store/selectById', {'tickets_id': response[0].tickets_id})
                            .then(response => {
                                this.form = response.tickets;
                                if (this.form.ticketstype === 'first') {
                                    this.form.idcardorpa = this.form.idcard;
                                }
                                //del_fjl_0928
                                // if (this.form.budgetnumber !== null && this.form.budgetnumber !== "") {
                                //   let procurement = getDictionaryInfo(this.form.budgetnumber);
                                //   if (procurement != null) {
                                //     this.form.budgetnumber = procurement.value2 + '_' + procurement.value3;
                                //   }
                                // }
                                //del_fjl_0928
                                /* if (this.form.group_name != '' && this.form.group_name != null) {
                                   this.orglist = this.form.group_name;
                                   this.getchangeGroup(this.form.group_name)
                                 }*/
                                // <!--2020-05-06 ztc 机票改为明细 start-->
                                if (response.ticketsdetails.length > 0) {
                                    this.tableA = response.ticketsdetails;
                                }
                                // <!--2020-05-06 ztc 机票改为明细 end-->
                                //start(添加角色权限，只有总务的人才可以进行受理)  fjl 2020/04/08
                                let role = getCurrentRole2();
                                if (role === '0') {
                                    if (this.disable) {
                                        this.form.findate = moment(new Date()).format('YYYY-MM-DD');
                                        this.acceptShow = false;
                                    } else {
                                        this.acceptShow = true;
                                    }
                                } else {
                                    this.acceptShow = true;
                                }
                                //end(添加角色权限，只有总务的人才可以进行受理)  fjl 2020/04/08
                                // let rst = getOrgInfoByUserId(response.tickets.user_id);
                                // if (rst) {
                                //     //upd_fjl_0927
                                //     if (rst.groupId !== null && rst.groupId !== '' && rst.groupId !== undefined) {
                                //         this.checkGro = true;
                                //     } else {
                                //         this.checkGro = false;
                                //     }
                                //     // this.centerid = rst.centerNmae;
                                //     // this.groupid = rst.groupNmae;
                                //     // this.teamid = rst.teamNmae;
                                //     //upd_fjl_0927
                                // }
                                this.getBudt(this.form.centerid);
                                if (this.form.ticketstype === 'first') {
                                    this.showDomestic = true;
                                    this.showForeign = false;
                                    // this.rules.idcard[0].required = true;
                                    this.rules.passport[0].required = false;
                                    this.rules.effectivedate[0].required = false;
                                } else {
                                    this.showDomestic = false;
                                    this.showForeign = true;
                                    // this.rules.idcard[0].required = false;
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
                                // this.getBudt(this.userlist);
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
                        this.loading = false;
                    });

            } else if (this.$route.params._type === 1) {
                if (this.$route.params._checktype === 1) {
                    this.form.ticketstype = 'first';
                    this.showDomestic = true;
                    this.showForeign = false;
                    this.rules.passport[0].required = false;
                    this.rules.effectivedate[0].required = false;
                } else {
                    this.form.ticketstype = 'second';
                    this.showDomestic = false;
                    this.showForeign = true;
                    this.rules.passport[0].required = true;
                    this.rules.effectivedate[0].required = true;
                }
                this.loading = true;
                this.$store
                    .dispatch('PFANS1013Store/getdate')
                    .then(response => {
                        for (let i = 0; i < response.length; i++) {
                            if (this.disable) {
                                if (response[i].user_id === this.$store.getters.userinfo.userid) {
                                    if (response[i].businesstype === '0') {
                                        this.relations1.push({
                                            value: response[i].business_id,
                                            label: response[i].business_number,
                                            region: response[i].region,
                                            startdate: response[i].startdate,
                                            enddate: response[i].enddate,
                                        });
                                    } else if (response[i].businesstype === '1') {
                                        this.relations.push({
                                            city: response[i].city,
                                            value: response[i].business_id,
                                            label: response[i].business_number,
                                            // region: response[i].region,
                                            startdate: response[i].startdate,
                                            enddate: response[i].enddate,
                                        });
                                    }
                                }
                            } else {
                                if (response[i].businesstype === '0') {
                                    this.relations1.push({
                                        value: response[i].business_id,
                                        label: response[i].business_number,
                                        region: response[i].region,
                                        startdate: response[i].startdate,
                                        enddate: response[i].enddate,
                                    });
                                } else if (response[i].businesstype === '1') {
                                    this.relations.push({
                                        city: response[i].city,
                                        value: response[i].business_id,
                                        label: response[i].business_number,
                                        // region: response[i].region,
                                        startdate: response[i].startdate,
                                        enddate: response[i].enddate,
                                    });
                                }
                            }
                        }
                        this.userlist = this.$store.getters.userinfo.userid;
                        if (this.userlist !== null && this.userlist !== '' && this.userlist !== undefined) {
                            let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
                            if (rst) {
                                this.centerid = rst.centerNmae;
                                this.groupid = rst.groupNmae;
                                this.teamid = rst.teamNmae;
                                this.form.center_id = rst.centerId;
                                this.form.group_id = rst.groupId;
                                this.form.team_id = rst.teamId;
                                //add_fjl_0927
                                // if (rst.groupId !== null && rst.groupId !== '' && rst.groupId !== undefined) {
                                //     this.form.group_id = rst.groupId;
                                this.getBudt(this.form.center_id);
                                //     this.checkGro = true;
                                // } else {
                                //     this.checkGro = false;
                                // }
                                //add_fjl_0927
                            }
                            // if (this.form.group_id) {
                            //   this.getchangeGroup(this.form.group_id)
                            // }
                            this.form.user_id = this.$store.getters.userinfo.userid;
                            // this.getBudt(this.form.user_id);
                        }
                        this.changebusiness(this.$route.params._checkid);
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
            } else {
                this.getBusOuter();
                if (this.$route.params._id) {
                    this.loading = true;
                    this.$store
                        .dispatch('PFANS3001Store/selectById', {'tickets_id': this.$route.params._id})
                        .then(response => {
                            this.form = response.tickets;
                            if (this.form.ticketstype === 'first') {
                                this.form.idcardorpa = this.form.idcard;
                            }
                            // <!--2020-05-06 ztc 机票改为明细 start-->
                            if (response.ticketsdetails.length > 0) {
                                this.tableA = response.ticketsdetails;
                            }
                            // <!--2020-05-06 ztc 机票改为明细 end-->
                            // if (this.form.group_id) {
                            //   this.getchangeGroup(this.form.group_id)
                            // }
                            if (this.form.acceptstatus === '1') {
                                this.refuseShow = true;
                                this.refuseShow1 = false;
                            } else if (this.form.acceptstatus === '2') {
                                this.refuseShow = false;
                                this.refuseShow1 = true;
                                //region scc add 10/27 初始加载，显示输入框就需要必填 from
                                this.rules.ticketordernumber[0].required = true;
                                this.rules.ticketvendors[0].required = true;
                                this.rules.ticketamount[0].required = true;
                                //endregion scc add 10/27 初始加载，显示输入框就需要必填 to
                            } else {
                                this.refuseShow = false;
                                this.refuseShow1 = false;
                            }
                            //start(添加角色权限，只有总务的人才可以进行受理)  fjl 2020/04/08
                            let role = getCurrentRole2();
                            if (role === '0') {
                                if (this.disable) {
                                    this.form.findate = moment(new Date()).format('YYYY-MM-DD');
                                    this.acceptShow = false;
                                } else {
                                    this.acceptShow = true;
                                }
                            } else {
                                this.acceptShow = true;
                            }
                            //end(添加角色权限，只有总务的人才可以进行受理)  fjl 2020/04/08
                            // let rst = getOrgInfoByUserId(response.tickets.user_id);
                            // if (rst) {
                            //     //upd_fjl_0927
                            //     if (rst.groupId !== null && rst.groupId !== '' && rst.groupId !== undefined) {
                            //         this.checkGro = true;
                            //     } else {
                            //         this.checkGro = false;
                            //     }
                            //     // this.centerid = rst.centerNmae;
                            //     // this.groupid = rst.groupNmae;
                            //     // this.teamid = rst.teamNmae;
                            //     //upd_fjl_0927
                            // }
                            this.getBudt(this.form.center_id);
                            if (this.form.ticketstype === 'first') {
                                this.showDomestic = true;
                                this.showForeign = false;
                                // this.rules.idcard[0].required = true;
                                this.rules.passport[0].required = false;
                                this.rules.effectivedate[0].required = false;
                            } else {
                                this.showDomestic = false;
                                this.showForeign = true;
                                // this.rules.idcard[0].required = false;
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
                            // this.getBudt(this.userlist);
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
                } else {
                    this.showDomestic = true;
                    this.userlist = this.$store.getters.userinfo.userid;
                    if (this.userlist !== null && this.userlist !== '' && this.userlist !== undefined) {
                        let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
                        if (rst) {
                            this.centerid = rst.centerNmae;
                            this.groupid = rst.groupNmae;
                            this.teamid = rst.teamNmae;
                            this.form.center_id = rst.centerId;
                            this.form.group_id = rst.groupId;
                            this.form.team_id = rst.teamId;
                            this.getBudt(this.form.center_id);
                            //add_fjl_0927
                            // if (rst.groupId !== null && rst.groupId !== '' && rst.groupId !== undefined) {
                            //     this.form.group_id = rst.groupId;
                            //     this.checkGro = true;
                            // } else {
                            //     this.checkGro = false;
                            // }
                            //add_fjl_0927
                            // if(rst.groupId){
                            //     this.form.budgetnumber = getOrgInfo(rst.groupId).encoding;
                            // }
                            // let budgetunit = getUserInfo(this.$store.getters.userinfo.userid).userinfo.budgetunit
                            // if (budgetunit) {
                            //     this.form.budgetnumber = budgetunit
                            // }
                        }
                        // if (this.form.group_id) {
                        //   this.getchangeGroup(this.form.group_id)
                        // }
                        this.form.user_id = this.$store.getters.userinfo.userid;
                        // this.getBudt(this.form.user_id);
                    }
                }
            }
            //add-ws-7/7-禅道153

        },
        methods: {
          getOrgInformation(id) {
            let org = {};
            let treeCom = this.$store.getters.orgs;
            if (id && treeCom.getNode(id)) {
              let node = id;
              let type = treeCom.getNode(id).data.type || 0;
              for (let index = parseInt(type); index >= 1; index--) {
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
                center_id: this.form.center_id,
                group_id: this.form.group_id,
              } = org);
            }
          },
            //add_fjl_0927
            getCenterid(val) {
              this.form.center_id = val;
              this.form.budgetnumber = '';
              this.getBudt(val);
              if(val === ""){
                this.form.group_id = "";
              }
            },
            getGroupId1(val) {
              this.form.group_id = val;
              this.form.budgetnumber = '';
              if(val != ""){
                this.getOrgInformation(val);
                this.getBudt(val);
              }else{
                this.getBudt(this.form.center_id);
              }
            },
            getTeamid(val) {
                this.form.team_id = val;
            },
            //add_fjl_0927
            //change受理状态  add_fjl
            changeAcc(val) {
                this.form.acceptstatus = val;
                if (val === '1') {
                    this.refuseShow = true;
                    this.refuseShow1 = false;
                    this.form.finshtime = null;
                    //region scc add 只有受理状态为变更时，才必填 from
                    this.form.ticketordernumber = null;
                    this.form.ticketvendors = null;
                    this.form.changeamountforfirst = 0;
                    this.form.changeamountforsecond = 0;
                    this.form.ticketamount = 0;
                    this.rules.ticketordernumber[0].required = false;
                    this.rules.ticketvendors[0].required = false;
                    this.rules.ticketamount[0].required = false;
                  //endregion scc add 只有受理状态为变更时，才必填 to
                } else if (val === '2') {
                    this.refuseShow = false;
                    this.refuseShow1 = true;
                    this.form.finshtime = moment(new Date()).format("YYYY-MM-DD")
                    this.form.refusereason = null;
                    //region scc add 只有受理状态为变更时，才必填 from
                    this.$refs["ruleForm"].clearValidate();
                    this.rules.ticketordernumber[0].required = true;
                    this.rules.ticketvendors[0].required = true;
                    this.rules.ticketamount[0].required = true;
                  //endregion scc add 只有受理状态为变更时，才必填 to
                } else {
                    this.refuseShow = false;
                    this.refuseShow1 = false;
                    this.form.refusereason = null;
                    this.form.finshtime = null;
                    //region scc add 只有受理状态为变更时，才必填 from
                    this.form.ticketordernumber = null;
                    this.form.ticketvendors = null;
                    this.form.changeamountforfirst = 0;
                    this.form.changeamountforsecond = 0;
                    this.form.ticketamount = 0;
                    this.rules.ticketordernumber[0].required = false;
                    this.rules.ticketvendors[0].required = false;
                    this.rules.ticketamount[0].required = false;
                  //endregion scc add 只有受理状态为变更时，才必填 to
                }
            },
            getBudt(val) {
                this.options1 = [];
                if (val === '' || val === null) {
                    return;
                }
                //ADD_FJL  修改人员预算编码
                // if (getOrgInfo(getOrgInfoByUserId(val).groupId)) {
              if(getOrgInfo(val)){
                let butinfo = (getOrgInfo(val).encoding).substring(0,3);
                let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'JY002');
                if (dic.length > 0) {
                  for (let i = 0; i < dic.length; i++) {
                    if (butinfo === (dic[i].value1).substring(0,3)) {
                      this.options1.push({
                        lable: dic[i].value2 + '_' + dic[i].value3,
                        value: dic[i].code,
                      });
                    }
                  }
                }
                if(this.options1.length === 0) {
                  if (getOrgInfo(this.form.group_id)) {
                    let butinfo = (getOrgInfo(this.form.group_id).encoding).substring(0, 3);
                    let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'JY002');
                    if (dic.length > 0) {
                      for (let i = 0; i < dic.length; i++) {
                        if (butinfo === (dic[i].value1).substring(0,3)) {
                          this.options1.push({
                            lable: dic[i].value2 + '_' + dic[i].value3,
                            value: dic[i].code,
                          });
                        }
                      }
                    }
                  }
                }
              }

                // }
                //ADD_FJL  修改人员预算编码
            },
            addRow1() {
                this.tableA.push({
                    tickets_id: '',
                    ticketsdetailid: '',
                    going: '',
                    goairlinenumber: '',
                    tripend: '',
                    godeparturedate: '',
                    goarrivaldate: '',
                    back: '',
                    reairlinenumber: '',
                    ticketingdate: '',
                    redeparturedate: '',
                    rearrivaldate: '',
                });
            },
            // getCenterId(val) {
            //   this.getOrgInformation(val);
            //   if (!val || this.form.center_id === '') {
            //     this.errorcenter = this.$t('normal.error_09') + 'center';
            //   } else {
            //     this.errorcenter = '';
            //   }
            // },
            // getGroupId(orglist) {
            //   this.getchangeGroup(orglist)
            //   this.form.group_id = orglist
            //   if (!this.form.group_id || this.form.group_id === '') {
            //     this.errorgroup = this.$t('normal.error_09') + 'group';
            //   } else {
            //     this.errorgroup = '';
            //   }
            // },
            // getTeamId(val) {
            //   this.getOrgInformation(val);
            //   if (this.form.group_id === '') {
            //     this.errorgroup = this.$t('normal.error_08') + 'group';
            //   } else {
            //     this.errorgroup = '';
            //   }
            //   if (this.form.center_id === '') {
            //     this.errorcenter = this.$t('normal.error_08') + 'center';
            //   } else {
            //     this.errorcenter = '';
            //   }
            // },
            // getOrgInformation(id) {
            //   let org = {};
            //   let treeCom = this.$store.getters.orgs;
            //   if (id && treeCom.getNode(id)) {
            //     let node = id;
            //     let type = treeCom.getNode(id).data.type || 0;
            //     for (let index = parseInt(type); index >= 1; index--) {
            //       if (parseInt(type) === index && ![1, 2].includes(parseInt(type))) {
            //         org.teamname = treeCom.getNode(node).data.departmentname;
            //         org.team_id = treeCom.getNode(node).data._id;
            //       }
            //       if (index === 2) {
            //         org.groupname = treeCom.getNode(node).data.departmentname;
            //         org.group_id = treeCom.getNode(node).data._id;
            //       }
            //       if (index === 1) {
            //         org.centername = treeCom.getNode(node).data.companyname;
            //         org.center_id = treeCom.getNode(node).data._id;
            //       }
            //       node = treeCom.getNode(node).parent.data._id;
            //     }
            //     ({
            //       centername: this.form.centername,
            //       groupname: this.form.groupname,
            //       teamname: this.form.teamname,
            //       center_id: this.form.center_id,
            //       group_id: this.form.group_id,
            //       team_id: this.form.team_id,
            //     } = org);
            //   }
            //   this.getchangeGroup(this.form.group_id)
            // },
            deleteRow1(index, rows) {
                if (rows.length > 1) {
                    rows.splice(index, 1);
                } else {
                    this.tableA = [{
                        tickets_id: '',
                        ticketsdetailid: '',
                        going: '',
                        goairlinenumber: '',
                        tripend: '',
                        godeparturedate: '',
                        goarrivaldate: '',
                        back: '',
                        reairlinenumber: '',
                        ticketingdate: '',
                        redeparturedate: '',
                        rearrivaldate: '',
                    }];
                }
            },
            getBudgetunit(val) {
                this.form.budgetnumber = val;
            },
            //start(添加出差申请关联)  fjl 2020/04/08
            changebusiness(val) {
                this.form.business_id = val;
                if (this.form.ticketstype === 'first') {
                    for (var i = 0; i < this.relations.length; i++) {
                        if (this.relations[i].value === val) {
                            let cityflg = getDictionaryInfo(this.relations[i].city);
                            if (cityflg) {
                                this.form.trippoint = cityflg.value1;
                            }
                            this.form.tripstart = this.relations[i].startdate;
                            this.form.tripend = this.relations[i].enddate;
                            this.form.businessname = this.relations[i].label;
                        }
                    }

                } else if (this.form.ticketstype === 'second') {
                    for (var i = 0; i < this.relations1.length; i++) {
                        if (this.relations1[i].value === val) {
                            let regionflg = getDictionaryInfo(this.relations1[i].region);
                            if (regionflg) {
                                this.form.trippoint = regionflg.value1;
                            }
                            this.form.tripstart = this.relations1[i].startdate;
                            this.form.tripend = this.relations1[i].enddate;
                            this.form.businessname = this.relations1[i].label;
                        }
                    }
                }
            },
            getBusOuter() {
                this.loading = true;
                this.$store
                    .dispatch('PFANS1013Store/getdate')
                    .then(response => {
                        for (let i = 0; i < response.length; i++) {
                            //add-ws-7/7-禅道153
                            if (this.disable) {
                                if (response[i].user_id === this.$store.getters.userinfo.userid) {
                                    if (response[i].businesstype === '0') {
                                        this.relations1.push({
                                            value: response[i].business_id,
                                            label: response[i].business_number,
                                            region: response[i].region,
                                            startdate: response[i].startdate,
                                            enddate: response[i].enddate,
                                        });
                                    } else if (response[i].businesstype === '1') {
                                        this.relations.push({
                                            city: response[i].city,
                                            value: response[i].business_id,
                                            label: response[i].business_number,
                                            // region: response[i].region,
                                            startdate: response[i].startdate,
                                            enddate: response[i].enddate,
                                        });
                                    }
                                }
                            } else {
                                if (response[i].businesstype === '0') {
                                    this.relations1.push({
                                        value: response[i].business_id,
                                        label: response[i].business_number,
                                        region: response[i].region,
                                        startdate: response[i].startdate,
                                        enddate: response[i].enddate,
                                    });
                                } else if (response[i].businesstype === '1') {
                                    this.relations.push({
                                        city: response[i].city,
                                        value: response[i].business_id,
                                        label: response[i].business_number,
                                        // region: response[i].region,
                                        startdate: response[i].startdate,
                                        enddate: response[i].enddate,
                                    });
                                }
                            }
                            //add-ws-7/7-禅道153
                        }
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
            //end(添加出差申请关联)  fjl 2020/04/08
            setdisabled(val) {
                if (this.$route.params.disabled) {
                    this.disabled = val;
                }
            },
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (column.level === 1 && columnIndex === 0) {
                    return {
                        color: 'white',
                        background: '#89CCFF',
                        border: '1px solid white',
                    };
                }
                if (column.level === 2 && columnIndex >= 0 && columnIndex < 4) {
                    return {
                        color: 'white',
                        background: '#79CCFF',
                        border: '1px solid white',
                    };
                }
                if (column.level === 1 && columnIndex === 1) {
                    return {
                        color: 'white',
                        background: '#778899',
                        border: '1px solid white',
                    };
                }
                if (column.level === 2 && columnIndex >= 4 && columnIndex < 9) {
                    return {
                        color: 'white',
                        background: '#778899',
                        border: '1px solid white',
                    };
                }
                if (column.level === 1 && columnIndex === 2) {
                    return {
                        color: 'white',
                        background: '#BA55D3',
                        border: '1px solid white',
                    };
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
                    // this.rules.idcard[0].required = true;
                    this.rules.passport[0].required = false;
                    this.rules.effectivedate[0].required = false;
                } else {
                    this.showForeign = true;
                    this.showDomestic = false;
                    // this.rules.idcard[0].required = false;
                    this.rules.passport[0].required = true;
                    this.rules.effectivedate[0].required = true;
                }
                this.$refs["ruleForm"].clearValidate();
            },
            getUserids(val) {
                this.form.user_id = val;
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
                // if (this.form.group_id) {
                //   this.getchangeGroup(this.form.group_id)
                // }
                if (!this.form.user_id || this.form.user_id === '' || val === "undefined") {
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
            //upd 审批流程 fr
            // start() {
            //   this.form.status = '2';
            //   this.buttonClick("update");
            // },
            start(val) {
                if (val.state === '0') {
                    this.form.status = '2';
                } else if (val.state === '2') {
                    this.form.status = '4';
                }
                this.buttonClick("update");
            },
            //upd 审批流程 to
            end() {
                this.form.status = '0';
                this.buttonClick("update");
            },
            //add-ws-7/7-禅道153
            paramsTitle() {
                this.$router.push({
                    name: 'PFANS3001View',
                });
            },
            //add-ws-7/7-禅道153
            buttonClick(val) {
                //add-ws-7/7-禅道153
                if (val === 'back') {
                    this.paramsTitle();
                } else {
                    //add-ws-7/7-禅道153
                    this.$refs['ruleForm'].validate(valid => {
                        if (valid) {
                            if (this.form.ticketstype === 'first') {
                                this.form.passport = '';
                                this.form.effectivedate = '';
                                this.form.idcard = this.form.idcardorpa;
                            }
                            // else {
                            //   this.form.idcard = '';
                            // }
                            this.baseInfo = {};
                            this.baseInfo.tickets = JSON.parse(JSON.stringify(this.form));
                            this.baseInfo.ticketsdetails = [];
                            for (let i = 0; i < this.tableA.length; i++) {
                                if (this.tableA[i].going !== '' || this.tableA[i].goairlinenumber !== '' || this.tableA[i].tripend !== '' ||
                                    this.tableA[i].godeparturedate !== '' || this.tableA[i].goarrivaldate !== 0 || this.tableA[i].back !== 0
                                    || this.tableA[i].reairlinenumber !== '' || this.tableA[i].ticketingdate !== '' || this.tableA[i].redeparturedate !== ''
                                    || this.tableA[i].rearrivaldate !== '') {
                                    this.baseInfo.ticketsdetails.push(
                                        {
                                            tickets_id: this.tableA[i].tickets_id,
                                            ticketsdetailid: this.tableA[i].ticketsdetailid,
                                            going: this.tableA[i].going,
                                            goairlinenumber: this.tableA[i].goairlinenumber,
                                            tripend: this.tableA[i].tripend,
                                            godeparturedate: this.tableA[i].godeparturedate,
                                            goarrivaldate: this.tableA[i].goarrivaldate,
                                            back: this.tableA[i].back,
                                            reairlinenumber: this.tableA[i].reairlinenumber,
                                            ticketingdate: this.tableA[i].ticketingdate,
                                            redeparturedate: this.tableA[i].redeparturedate,
                                            rearrivaldate: this.tableA[i].rearrivaldate,
                                        },
                                    );
                                }
                            }
                            if (this.$route.params._id) {
                                this.baseInfo.tickets.tickets_id = this.$route.params._id;
                                this.loading = true;
                                this.$store
                                    .dispatch('PFANS3001Store/update', this.baseInfo)
                                    .then(response => {
                                        this.data = response;
                                        this.loading = false;
                                        if (val !== "update") {
                                            Message({
                                                message: this.$t('normal.success_02'),
                                                type: 'success',
                                                duration: 5 * 1000,
                                            });
                                            if (this.$store.getters.historyUrl) {
                                                this.$router.push(this.$store.getters.historyUrl);
                                            } else {
                                                this.paramsTitle();
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

                            } else {
                                this.loading = true;
                                this.$store
                                    .dispatch('PFANS3001Store/insert', this.baseInfo)
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
                                        } else {
                                            this.paramsTitle();
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
                                message: this.$t("normal.error_12"),
                                type: 'error',
                                duration: 5 * 1000
                            });
                        }
                    });
                    //add-ws-7/7-禅道153
                }
                //add-ws-7/7-禅道153
            },
        },
    };
</script>

<style scoped>

</style>
