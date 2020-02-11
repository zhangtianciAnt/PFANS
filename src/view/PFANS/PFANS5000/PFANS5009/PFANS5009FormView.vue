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
                      <el-form-item :label="$t('label.PFANS5009FORMVIEW_NAME1')" prop="name1">
                        <el-input :disabled="!disabled" maxlength='20' style="width:20vw"
                                  v-model="form.name1"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5009FORMVIEW_NAME1')" prop="name2">
                        <el-input :disabled="!disabled" maxlength='5' style="width:20vw"
                                  v-model="form.name2"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5009FORMVIEW_PL')" prop="pl">
                        <el-input :disabled="!disabled" maxlength='50' style="width:20vw"
                                  v-model="form.pl"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5009FORMVIEW_TL')" prop="tl">
                        <el-input :disabled="!disabled" maxlength='50' style="width:20vw"
                                  v-model="form.tl"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5009FORMVIEW_TYPE')" prop="type">
                          <dicselect
                            :code="code"
                            :data="form.type"
                            :disabled="!disabled"
                            :multiple="multiple1"
                            :selectType="selectType1"
                            @change="getRecruitmentroute"
                            style="width:20vw">
                          </dicselect>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5009FORMVIEW_AREA')" prop="area">
                        <dicselect
                          :code="code"
                          :data="form.area"
                          :disabled="!disabled"
                          :multiple="multiple1"
                          :selectType="selectType1"
                          @change="getRecruitmentroute"
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
                      <el-form-item :label="$t('label.PFANS5009FORMVIEW_STARTTIME')" prop="starttime">
                        <el-date-picker :disabled="!disabled" style="width:20vw" type="date"
                                        v-model="form.starttime"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5009FORMVIEW_ENDTIME')" prop="endtime">
                        <el-date-picker :disabled="!disabled" style="width:20vw" type="date"
                                        v-model="form.endtime"></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5009FORMVIEW_WORK')" prop="work">
                        <el-input :disabled="!disabled" maxlength='20' style="width:20vw"
                                  v-model="form.work"></el-input>
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
              <el-table :data="tableP" header-cell-class-name="sub_bg_color_blue" stripe="true">
                <el-table-column>
                  <el-table-column :label="$t('label.PFANS1036FORMVIEW_ASSETNAME')" align="center" width="100">
                    <template slot-scope="scope">
                      <el-input :disabled="true" :no="scope.row" maxlength="20" style="width: 100%;"
                                v-model.trim="scope.row.place"></el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column>
                  <el-table-column :label="$t('label.PFANS1036FORMVIEW_ASSETTYPE')" align="center" width="100">
                    <template slot-scope="scope">
                      <el-input :disabled="true" :no="scope.row" maxlength="20" style="width: 100%;"
                                v-model.trim="scope.row.place"></el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column>
                  <el-table-column :label="$t('label.PFANS1036FORMVIEW_UNITPRICETHOUSAND')" align="center"
                                   width="100">
                    <template slot-scope="scope">
                      <el-input :disabled="true" :no="scope.row" maxlength="20" style="width: 100%;"
                                v-model.trim="scope.row.place"></el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.April')" align="center" width="100">
                  <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="100">
                    <template slot-scope="scope">
                      <el-input :disabled="true" :no="scope.row" maxlength="20" style="width: 100%;"
                                v-model.trim="scope.row.place"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="100">
                    <template slot-scope="scope">
                      <el-input :disabled="true" :no="scope.row" maxlength="20" style="width: 100%;"
                                v-model.trim="scope.row.place"></el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.May')" align="center" width="100">
                  <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="100">
                    <template slot-scope="scope">
                      <el-input :disabled="true" :no="scope.row" maxlength="20" style="width: 100%;"
                                v-model.trim="scope.row.place"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="100">
                    <template slot-scope="scope">
                      <el-input :disabled="true" :no="scope.row" maxlength="20" style="width: 100%;"
                                v-model.trim="scope.row.place"></el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.June')" align="center" width="100">
                  <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="100">
                    <template slot-scope="scope">
                      <el-input :disabled="true" :no="scope.row" maxlength="20" style="width: 100%;"
                                v-model.trim="scope.row.place"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="100">
                    <template slot-scope="scope">
                      <el-input :disabled="true" :no="scope.row" maxlength="20" style="width: 100%;"
                                v-model.trim="scope.row.place"></el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.July')" align="center" width="100">
                  <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="100">
                    <template slot-scope="scope">
                      <el-input :disabled="true" :no="scope.row" maxlength="20" style="width: 100%;"
                                v-model.trim="scope.row.place"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="100">
                    <template slot-scope="scope">
                      <el-input :disabled="true" :no="scope.row" maxlength="20" style="width: 100%;"
                                v-model.trim="scope.row.place"></el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.August')" align="center" width="100">
                  <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="100">
                    <template slot-scope="scope">
                      <el-input :disabled="true" :no="scope.row" maxlength="20" style="width: 100%;"
                                v-model.trim="scope.row.place"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="100">
                    <template slot-scope="scope">
                      <el-input :disabled="true" :no="scope.row" maxlength="20" style="width: 100%;"
                                v-model.trim="scope.row.place"></el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.September')" align="center" width="100">
                  <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="100">
                    <template slot-scope="scope">
                      <el-input :disabled="true" :no="scope.row" maxlength="20" style="width: 100%;"
                                v-model.trim="scope.row.place"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="100">
                    <template slot-scope="scope">
                      <el-input :disabled="true" :no="scope.row" maxlength="20" style="width: 100%;"
                                v-model.trim="scope.row.place"></el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.firsthalfyear')" align="center" width="100">
                  <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="100">
                    <template slot-scope="scope">
                      <el-input :disabled="true" :no="scope.row" maxlength="20" style="width: 100%;"
                                v-model.trim="scope.row.place"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="100">
                    <template slot-scope="scope">
                      <el-input :disabled="true" :no="scope.row" maxlength="20" style="width: 100%;"
                                v-model.trim="scope.row.place"></el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.October')" align="center" width="100">
                  <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="100">
                    <template slot-scope="scope">
                      <el-input :disabled="true" :no="scope.row" maxlength="20" style="width: 100%;"
                                v-model.trim="scope.row.place"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="100">
                    <template slot-scope="scope">
                      <el-input :disabled="true" :no="scope.row" maxlength="20" style="width: 100%;"
                                v-model.trim="scope.row.place"></el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.November')" align="center" width="100">
                  <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="100">
                    <template slot-scope="scope">
                      <el-input :disabled="true" :no="scope.row" maxlength="20" style="width: 100%;"
                                v-model.trim="scope.row.place"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="100">
                    <template slot-scope="scope">
                      <el-input :disabled="true" :no="scope.row" maxlength="20" style="width: 100%;"
                                v-model.trim="scope.row.place"></el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.December')" align="center" width="100">
                  <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="100">
                    <template slot-scope="scope">
                      <el-input :disabled="true" :no="scope.row" maxlength="20" style="width: 100%;"
                                v-model.trim="scope.row.place"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="100">
                    <template slot-scope="scope">
                      <el-input :disabled="true" :no="scope.row" maxlength="20" style="width: 100%;"
                                v-model.trim="scope.row.place"></el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.January')" align="center" width="100">
                  <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="100">
                    <template slot-scope="scope">
                      <el-input :disabled="true" :no="scope.row" maxlength="20" style="width: 100%;"
                                v-model.trim="scope.row.place"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="100">
                    <template slot-scope="scope">
                      <el-input :disabled="true" :no="scope.row" maxlength="20" style="width: 100%;"
                                v-model.trim="scope.row.place"></el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.February')" align="center" width="100">
                  <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="100">
                    <template slot-scope="scope">
                      <el-input :disabled="true" :no="scope.row" maxlength="20" style="width: 100%;"
                                v-model.trim="scope.row.place"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="100">
                    <template slot-scope="scope">
                      <el-input :disabled="true" :no="scope.row" maxlength="20" style="width: 100%;"
                                v-model.trim="scope.row.place"></el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.March')" align="center" width="100">
                  <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="100">
                    <template slot-scope="scope">
                      <el-input :disabled="true" :no="scope.row" maxlength="20" style="width: 100%;"
                                v-model.trim="scope.row.place"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="100">
                    <template slot-scope="scope">
                      <el-input :disabled="true" :no="scope.row" maxlength="20" style="width: 100%;"
                                v-model.trim="scope.row.place"></el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.secondhalfyear')" align="center" width="100">
                  <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="100">
                    <template slot-scope="scope">
                      <el-input :disabled="true" :no="scope.row" maxlength="20" style="width: 100%;"
                                v-model.trim="scope.row.place"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="100">
                    <template slot-scope="scope">
                      <el-input :disabled="true" :no="scope.row" maxlength="20" style="width: 100%;"
                                v-model.trim="scope.row.place"></el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="100">
                  <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" width="100">
                    <template slot-scope="scope">
                      <el-input :disabled="true" :no="scope.row" maxlength="20" style="width: 100%;"
                                v-model.trim="scope.row.place"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="100">
                    <template slot-scope="scope">
                      <el-input :disabled="true" :no="scope.row" maxlength="20" style="width: 100%;"
                                v-model.trim="scope.row.place"></el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.operation')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-button
                      :disabled="!disable"
                      @click.native.prevent="deleteRowF(scope.$index, tableP)"
                      plain
                      size="small"
                      type="danger"
                    >{{$t('button.delete')}}
                    </el-button>
                    <el-button
                      :disabled="!disable"
                      @click="addRowF()"
                      plain
                      size="small"
                      type="primary"
                    >{{$t('button.insert')}}
                    </el-button>
                  </template>
                </el-table-column>

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
  import user from '../../../components/user.vue';
  import {Message} from 'element-ui';
  import {getOrgInfoByUserId} from '@/utils/customize';
  import moment from 'moment';
  import org from '../../../components/org';

  export default {
    name: 'PFANS5009FormView',
    components: {
      EasyNormalContainer,
      PFANS5009View,
      getOrgInfoByUserId,
      dicselect,
      user,
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
        optionsdata: [],
        loading: false,
        errorcenter: '',
        errorgroup: '',
        activeName: 'first',
        checked: true,
        selectType1: 'double',
        title: 'title.PFANS5009VIEW',
        buttonList: [],
        tabIndex: 0,
        multiple: false,
        multiple1: true,
        form: {
          projectinformationid: '',
          postname: '',
          center_id: '',
          group_id: '',
          team_id: '',
          experience: '',
          project_name: '',
          peoplerequired: '',
          workplace: '',
          applicationtime: moment(new Date()).format('YYYY-MM-DD'),
          viewproject: '',
          recruitmentroute: '',
          other: '',
          jobdemand: '',
          needtotravel: '',
          demandlevel: '',
          suggestedsalary: '',
          turningday: moment(new Date()).format('YYYY-MM-DD'),
          afterturningpositiv: '',
          expectedarrivaltime: moment(new Date()).format('YYYY-MM-DD'),
          skilllevel: '',
          genderrequirements: '',
          postother: '',
          agerequirement: '',
          requirements: '',
          professional: '',
          otherrequirements: '',
          responsibilities: '',
        },
        tableP: [{
          travelcontent_id: '',
          businessid: '',
          travelcontentdate: '',
          place: '',
          content: '',
          rowindex: '',
        }],
        code: 'PR027',
        code1: 'PR028',
        code2: 'PR029',
        code3: 'PR030',
        code4: 'PR031',
        code5: 'PR032',
        code6: 'PR052',
        disabled: true,
        menuList: [],
        rules: {
          viewproject: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS5009VIEW_VIEWPROJECT'),
              trigger: 'change',
            },
          ],
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
          postname: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS5009VIEW_POSITIONTITLE'),
              trigger: 'change',
            },
          ],
          peoplerequired: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS5009VIEW_PEOPLEREQUIRED'),
              trigger: 'change',
            },
          ],
          workplace: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS5009VIEW_WORKPLACE'),
              trigger: 'change',
            },
          ],
          applicationtime: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.application_date'),
              trigger: 'change',
            },
          ],
          genderrequirements: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS5009VIEW_GENDERREQUIREMENTS'),
              trigger: 'change',
            },
          ],
          agerequirement: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS5009VIEW_AGEREQUIREMENT'),
              trigger: 'change',
            },
          ],
          requirements: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS5009VIEW_REQUIREMENTS'),
              trigger: 'change',
            },
          ],
          professional: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS5009VIEW_PROFESSIONAL'),
              trigger: 'change',
            },
          ],
          experience: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS5009VIEW_EXPERIENCE'),
              trigger: 'change',
            },
          ],
          otherrequirements: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS5009VIEW_OTHERREQUIREMENTS'),
              trigger: 'change',
            },
          ],
        },
        show1: false,
        show2: false,
        canStart: false,
      };
    },
    mounted() {
      this.getCompanyProjectList();
      this.loading = true;
      if (this.$route.params._id) {
        this.$store
          .dispatch('PFANS5009Store/getRecruitOne', {'projectinformationid': this.$route.params._id})
          .then(response => {
            if (!response.projectinformation) {
              this.loading = false;
              return;
            }
            this.form = response.projectinformation;
            this.centerorglist = this.form.center_id;
            this.grouporglist = this.form.group_id;
            this.teamorglist = this.form.team_id;
            this.userlist = this.form.user_id;
            this.baseInfo.projectinformation = JSON.parse(JSON.stringify(this.form));
            this.baseInfo.stageinformation = JSON.parse(JSON.stringify(this.tableP));
            //this.form.recruitmentroute = this.form.recruitmentroute.split(',');
            if (response.stageinformation.length > 0) {
              this.tableP = response.stageinformation;
            }
            // if (this.form.recruitmentroute === 'PR027004') {
            //   this.show1 = true;
            // }
            // if (this.form.requirements === 'PR032005') {
            //   this.show2 = true;
            // }
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
      addRow() {
        this.tableP.push({
          projectinformationid: '',
          stageinformation_id: "",
          travelcontentdate: '',
          place: '',
          content: '',
          rowindex: '',
          display: true,
        });
      },
      deleteRow(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        } else {
          this.tableP = [{
            travelcontentdate: '',
            place: '',
            content: '',
          }];
        }
      },
      getRecruitmentroute(val) {
        this.form.recruitmentroute = val;
        this.show1 = false;
        for (let i = 0; i < val.length; i++) {
          if (val[i] === 'PR027004') {
            this.show1 = true;
          }
        }
      },
      getJobdemand(val) {
        this.form.jobdemand = val;
      },
      getNeedtotravel(val) {
        this.form.needtotravel = val;
      },
      getDemandlevel(val) {
        this.form.demandlevel = val;
      },
      getGenderrequirements(val) {
        this.form.genderrequirements = val;
      },
      getSkilllevel(val) {
        this.form.skilllevel = val;
      },
      getAftert(val) {
        this.form.afterturningpositiv = val;
      },
      getRequirements(val) {
        this.form.requirements = val;
        if (val === 'PR032005') {
          this.show2 = true;
        }
        if (val === 'PR035009') {
          this.show2 = false;
        } else if (val === 'PR032002') {
          this.show2 = false;
        } else if (val === 'PR032003') {
          this.show2 = false;
        } else if (val === 'PR032004') {
          this.show2 = false;
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
      start() {
        this.form.status = '2';
        this.buttonClick('update');
      },
      end() {
        this.form.status = '0';
        this.buttonClick('update');
      },
      getCompanyProjectList() {
        this.loading = true;
        this.$store
          .dispatch('PFANS5009Store/getCompanyProjectList', {})
          .then(response => {
            this.optionsdata = [];
            for (let i = 0; i < response.length; i++) {
              var vote = {};
              vote.value = response[i].companyprojects_id;
              vote.lable = response[i].project_name;
              this.optionsdata.push(vote);
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
      buttonClick(val) {
        this.$refs['refform'].validate(valid => {
          if (valid) {
            this.form.recruitmentroute = this.form.recruitmentroute.join(',');
            if (this.$route.params._id) {
              this.form.projectinformation = this.$route.params._id;
              this.form.center_id = this.centerorglist;
              this.form.group_id = this.grouporglist;
              this.form.team_id = this.teamorglist;
              this.form.applicationtime = moment(this.form.applicationtime).format('YYYY-MM-DD');
              this.form.turningday = moment(this.form.turningday).format('YYYY-MM-DD');
              this.form.expectedarrivaltime = moment(this.form.expectedarrivaltime).format('YYYY-MM-DD');
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

            } else {
              this.form.application_date = moment(this.form.application_date).format('YYYY-MM-DD');
              this.form.turningday = moment(this.form.turningday).format('YYYY-MM-DD');
              this.form.expectedarrivaltime = moment(this.form.expectedarrivaltime).format('YYYY-MM-DD');
              this.$store
                .dispatch('PFANS5009Store/createRecruit', this.form)
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
