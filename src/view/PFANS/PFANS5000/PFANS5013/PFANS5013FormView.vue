<template>
  <div>
    <EasyNormalContainer
      :buttonList="buttonList"
      :title="title"
      @buttonClick="buttonClick"
      @end="end" @disabled="setdisabled"
      @start="start"
      @workflowState="workflowState"
      ref="container"
      v-loading="loading">

      <div slot="customize">
        <el-form
          :model="form"
          :rules="rules"
          label-position="top"
          label-width="8vw"
          ref="reff"
          style="padding: 2vw"
        >
          <el-tabs v-model="activeName" type="border-card">
            <!--            基本信息-->
            <el-tab-pane :label="$t('label.PFANS1002FORMVIEW_INFORMATION')" name="first">
              <div>
                <el-form
                  :model="form"
                  :rules="rules"
                  label-position="top"
                  label-width="8vw"
                  ref="from1"
                >
                  <!--                  <el-row>-->
                  <!--                    <el-col :span="8">-->
                  <!--                      <el-form-item :label="$t('label.team')">-->
                  <!--                        <org :disabled="!disable" :orglist="form.team_id" @getOrgids="getTeamId" orgtype="3"-->
                  <!--                             style="width:20vw"></org>-->
                  <!--                      </el-form-item>-->
                  <!--                    </el-col>-->
                  <!--                    <el-col :span="8">-->
                  <!--                      <el-form-item :error="errorgroup" :label="$t('label.group')" prop="group_id">-->
                  <!--                        <org :disabled="!disable" :error="errorgroup" :orglist="form.group_id" @getOrgids="getGroupId"-->
                  <!--                             orgtype="2" style="width:20vw"></org>-->
                  <!--                      </el-form-item>-->
                  <!--                    </el-col>-->
                  <!--                    <el-col :span="8">-->
                  <!--                      <el-form-item :error="errorcenter" :label="$t('label.center')" prop="center_id">-->
                  <!--                        <org :disabled="!disable" :error="errorcenter" :orglist="form.center_id"-->
                  <!--                             @getOrgids="getCenterId"-->
                  <!--                             orgtype="1" style="width:20vw"></org>-->
                  <!--                      </el-form-item>-->
                  <!--                    </el-col>-->
                  <!--                  </el-row>-->
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.team')">
                        <org :disabled="!disable" :orglist="form.team_id" @getOrgids="getTeamId" orgtype="3"
                             style="width:20vw"></org>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :error="errorgroup" :label="$t('label.group')" prop="group_id">
                        <org :disabled="!disable" :error="errorgroup" :orglist="form.group_id" @getOrgids="getGroupId"
                             orgtype="2" style="width:20vw"></org>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :error="errorcenter" :label="$t('label.center')" prop="center_id">
                        <org :disabled="!disable" :error="errorcenter" :orglist="form.center_id"
                             @getOrgids="getCenterId"
                             orgtype="1" style="width:20vw"></org>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <!--   项目名称(中)-->
                    <el-col :span="8">
                      <el-form-item
                        :label="$t('label.PFANS5001FORMVIEW_PROJECT_NAME')"
                        prop="project_name"
                      >
                        <el-input
                          :disabled="!disable"
                          maxlength="50"
                          style="width: 20vw"
                          v-model="form.project_name"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <!-- 项目名称(和)-->
                    <el-col :span="8">
                      <el-form-item
                        :label="$t('label.PFANS5001FORMVIEW_PROJECT_NAMEJP')"
                        prop="project_namejp"
                      >
                        <el-input
                          :disabled="!disable"
                          maxlength="50"
                          style="width: 20vw"
                          v-model="form.project_namejp"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        :error="errorLeader"
                        :label="$t('label.PFANS5001FORMVIEW_LEADERID')"
                        prop="leaderid"
                      >
                        <user
                          :disabled="!disable"
                          :error="errorLeader"
                          :selectType="selectType"
                          :userlist="userlist"
                          @getUserids="getUserids"
                          style="width: 20vw"
                        ></user>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <!--                    <el-col :span="8">-->
                    <!--                      <el-form-item-->
                    <!--                        :error="errorManager"-->
                    <!--                        :label="$t('label.PFANS5001FORMVIEW_MANAGERID')"-->
                    <!--                        prop="managerid"-->
                    <!--                      >-->
                    <!--                        <user-->
                    <!--                          :disabled="!disable"-->
                    <!--                          :error="errorManager"-->
                    <!--                          :selectType="selectType"-->
                    <!--                          :userlist="userlist1"-->
                    <!--                          @getUserids="getUserids1"-->
                    <!--                          style="width: 20vw"-->
                    <!--                        ></user>-->
                    <!--                      </el-form-item>-->
                    <!--                    </el-col>-->

                    <!--                    <el-col :span="8">-->
                    <!--                      <el-form-item-->
                    <!--                        :label="$t('label.PFANS5001FORMVIEW_FIELD')"-->
                    <!--                        prop="field"-->
                    <!--                      >-->
                    <!--                        <dicselect-->
                    <!--                          :code="code3"-->
                    <!--                          :data="form.field"-->
                    <!--                          :disabled="!disable"-->
                    <!--                          :multiple="multiple"-->
                    <!--                          style="width: 20vw"-->
                    <!--                          @change="getfield"-->
                    <!--                        ></dicselect>-->
                    <!--                      </el-form-item>-->
                    <!--                    </el-col>-->
                  </el-row>
                  <!--                  <el-row>-->
                  <!--                    <el-col :span="8">-->
                  <!--                      <el-form-item-->
                  <!--                        :label="$t('label.PFANS5001FORMVIEW_COUNTRY')"-->
                  <!--                        prop="country"-->
                  <!--                      >-->
                  <!--                        <dicselect-->
                  <!--                          :code="code6"-->
                  <!--                          :data="form.country"-->
                  <!--                          :disabled="!disable"-->
                  <!--                          :multiple="multiple"-->
                  <!--                          style="width: 20vw"-->
                  <!--                          @change="getcountry"-->
                  <!--                        ></dicselect>-->
                  <!--                      </el-form-item>-->
                  <!--                    </el-col>-->
                  <!--                    <el-col :span="8">-->
                  <!--                      <el-form-item-->
                  <!--                        :label="$t('label.PFANS5001FORMVIEW_CARON')"-->
                  <!--                        prop="caron"-->
                  <!--                      >-->
                  <!--                        <dicselect-->
                  <!--                          :code="code7"-->
                  <!--                          :data="form.caron"-->
                  <!--                          :disabled="!disable"-->
                  <!--                          :multiple="multiple"-->
                  <!--                          style="width: 20vw"-->
                  <!--                          @change="getcaron"-->
                  <!--                        ></dicselect>-->
                  <!--                      </el-form-item>-->
                  <!--                    </el-col>-->
                  <!--                    <el-col :span="8">-->
                  <!--                      <el-form-item :label="$t('label.PFANS5001FORMVIEW_LANGUAGE')" prop="languages">-->
                  <!--                        <el-input-->
                  <!--                          :disabled="!disable"-->
                  <!--                          maxlength="20"-->
                  <!--                          style="width: 20vw"-->
                  <!--                          v-model="form.languages"-->
                  <!--                        ></el-input>-->
                  <!--                      </el-form-item>-->
                  <!--                    </el-col>-->
                  <!--                  </el-row>-->
                  <el-row>

                    <el-col :span="8">
                      <el-form-item
                        :label="$t('label.PFANS5001FORMVIEW_PROJECTTYPE')"
                        prop="projecttype"
                      >
                        <dicselect
                          :code="code2"
                          :data="form.projecttype"
                          :disabled="!disable"
                          :multiple="multiple"
                          style="width: 20vw"
                          @change="getprojecttype"
                        ></dicselect>
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item
                        :label="$t('label.PFANS5001FORMVIEW_STARTDATE')"
                        prop="startdate"
                      >
                        <el-date-picker
                          :disabled="!disable"
                          style="width: 20vw"
                          type="date"
                          v-model="form.startdate"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>

                    <!--   納期-->
                    <!--                    <el-col :span="8">-->
                    <!--                      <el-form-item-->
                    <!--                        :label="$t('label.PFANS5009FORMVIEW_DEADLINE')"-->
                    <!--                        prop="deadline"-->
                    <!--                      >-->
                    <!--                        <el-date-picker-->
                    <!--                          :disabled="!disable"-->
                    <!--                          style="width: 20vw"-->
                    <!--                          type="date"-->
                    <!--                          v-model="form.deadline"-->
                    <!--                        ></el-date-picker>-->
                    <!--                      </el-form-item>-->
                    <!--                    </el-col>-->

                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5001FORMVIEW_ENDDATE')" prop="enddate">
                        <el-date-picker
                          :disabled="!disable"
                          style="width: 20vw"
                          type="date"
                          v-model="form.enddate"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <!--                  <el-row>-->
                  <!--受託工数-->
                  <!--                    <el-col :span="8">-->
                  <!--                      <el-form-item-->
                  <!--                        :label="$t('label.PFANS5009FORMVIEW_WORK')"-->
                  <!--                        prop="work"-->
                  <!--                      >-->
                  <!--                        <el-input-->
                  <!--                          :disabled="!disable"-->
                  <!--                          maxlength="20"-->
                  <!--                          style="width: 20vw"-->
                  <!--                          v-model="form.work"-->
                  <!--                        ></el-input>-->
                  <!--                      </el-form-item>-->
                  <!--                    </el-col>-->


                  <!--                  </el-row>-->
                  <el-row>
                    <el-col :span="8">
                      <el-form-item
                        :label="$t('label.PFANS5001FORMVIEW_BRIEFINTRODUCTION')"
                        prop="briefintroduction"
                      >
                        <el-input
                          :autosize="{ minRows: 3, maxRows: 4}"
                          :disabled="!disable"
                          style="width: 70vw"
                          type="textarea"
                          v-model="form.briefintroduction"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <!--                  <el-row>-->
                  <!--                    <el-col :span="8">-->
                  <!--                      <el-form-item-->
                  <!--                        :label="$t('label.PFANS5001FORMVIEW_REQUIREMENT')"-->
                  <!--                        prop="requirement"-->
                  <!--                      >-->
                  <!--                        <el-input-->
                  <!--                          :autosize="{ minRows: 3, maxRows: 4}"-->
                  <!--                          :disabled="!disable"-->
                  <!--                          style="width: 70vw"-->
                  <!--                          type="textarea"-->
                  <!--                          v-model="form.requirement"-->
                  <!--                        ></el-input>-->
                  <!--                      </el-form-item>-->
                  <!--                    </el-col>-->
                  <!--                  </el-row>-->
                </el-form>
              </div>
            </el-tab-pane>

            <!--            体制-->
            <el-tab-pane :label="$t('label.PFANS5001FORMVIEW_SYSTEM')" name="fourth">
              <el-form-item>
                <el-row>
                  <el-col :span="24">
                    <el-tabs v-model="activeName2" type="border-card">
                      <!--                社内-->
                      <el-tab-pane :label="$t('label.PFANS5001FORMVIEW_INCOMMUNITY')" name="first">
                        <el-table :data="tableB" stripe border header-cell-class-name="sub_bg_color_blue"
                                  style="width: 80vw">
                          <!--                      编号-->
                          <el-table-column
                            :label="$t('label.PFANS5001FORMVIEW_NUMBERS')"
                            align="center"
                            width="130">
                            <template slot-scope="scope">
                              <el-input
                                :no="scope.row"
                                :disabled="true"
                                v-model="scope.row.number"
                                style="width: 100%">
                              </el-input>
                            </template>
                          </el-table-column>
                          <!--                          &lt;!&ndash;             センター         &ndash;&gt;-->
                          <!--                          <el-table-column-->
                          <!--                            :label="$t('label.center')"-->
                          <!--                            align="center"-->
                          <!--                            width="180">-->
                          <!--                            <template slot-scope="scope">-->
                          <!--                              <el-input-->
                          <!--                                :no="scope.row"-->
                          <!--                                :disabled="true"-->
                          <!--                                v-model="scope.row.company"-->
                          <!--                                style="width: 100%">-->
                          <!--                              </el-input>-->
                          <!--                            </template>-->
                          <!--                          </el-table-column>-->
                          <!--      222              姓名-->

                          <el-table-column
                            :label="$t('label.PFANSUSERFORMVIEW_CUSTOMERNAME')"
                            align="center"
                            width="290">
                            <template slot-scope="scope">
                              <user
                                :disabled="!disable"
                                :no="scope.row"
                                :userlist="scope.row.name"
                                @getUserids="getCitationUserid"
                                :multiple="multiple"
                                style="width: 90%"
                              ></user>
                            </template>
                          </el-table-column>
                          <!--                    職務-->
                          <el-table-column
                            :label="$t('label.PFANSUSERVIEW_POST')"
                            align="center"
                            width="120">
                            <template slot-scope="scope">
                              <el-input
                                :no="scope.row"
                                :disabled="scope.$index == 0 || !disable"
                                v-model="scope.row.position"
                                style="width: 100%">
                              </el-input>
                            </template>
                          </el-table-column>
                          <!--                入场时间-->
                          <el-table-column
                            :label="$t('label.PFANS5001FORMVIEW_ADMISSIONTIME')"
                            align="center"
                            prop="admissiontime"
                            width="180">
                            <template slot-scope="scope">
                              <el-date-picker
                                :disabled="!disable"
                                type="date"
                                :no="scope.row"
                                v-model="scope.row.admissiontime"
                                style="width: 9rem">
                              </el-date-picker>
                            </template>
                          </el-table-column>
                          <!--                退场时间-->
                          <el-table-column
                            :label="$t('label.PFANS5001FORMVIEW_EXITIME')"
                            align="center"
                            prop="exittime"
                            width="180">
                            <template slot-scope="scope">
                              <el-date-picker
                                :disabled="!disable"
                                type="date"
                                :no="scope.row"
                                v-model="scope.row.exittime"
                                style="width: 9rem">
                              </el-date-picker>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.operation')" align="center" width="200">
                            <template slot-scope="scope">
                              <el-button
                                :disabled="!disable"
                                @click.native.prevent="deleteRow1(scope.$index, tableB)"
                                plain
                                size="small"
                                type="danger"
                              >{{$t('button.delete')}}
                              </el-button>
                              <el-button
                                :disabled="!disable"
                                @click="addRow1()"
                                plain
                                size="small"
                                type="primary"
                              >{{$t('button.insert')}}
                              </el-button>
                            </template>
                          </el-table-column>
                        </el-table>
                      </el-tab-pane>

                      <!--                社外-->
                      <el-tab-pane :label="$t('label.PFANS5001FORMVIEW_OUTCOMMUNITY')" name="second">
                        <el-table :data="tableC" stripe border header-cell-class-name="sub_bg_color_blue"
                                  style="width: 80vw">
                          <!--                      编号-->
                          <el-table-column
                            :label="$t('label.PFANS5001FORMVIEW_NUMBERS')"
                            align="center"
                            width="110">
                            <template slot-scope="scope">
                              <el-input
                                :no="scope.row"
                                :disabled="true"
                                v-model="scope.row.number"
                                style="width: 100%">
                              </el-input>
                            </template>
                          </el-table-column>
                          <!--                      协力公司-->
                          <el-table-column
                            :label="$t('label.PFANS5001FORMVIEW_COOPERATIONCOMPANY')"
                            align="center"
                            width="130">
                            <template slot-scope="scope">
                              <el-input
                                :no="scope.row"
                                :disabled="true"
                                v-model="scope.row.company"
                                style="width: 100%">
                              </el-input>
                            </template>
                          </el-table-column>
                          <!--                    姓名-->
                          <el-table-column
                            :label="$t('label.PFANSUSERFORMVIEW_CUSTOMERNAME')"
                            align="center"
                            width="220">
                            <template slot-scope="scope">
                              <el-col :span="8">
                                <div class="dpSupIndex" style="width:10vw" prop="expname">
                                  <el-container>
                                    <input class="content bg" v-model="scope.row.name" :error="errorexpname"
                                           :disabled="true" v-show="false"></input>
                                    <input class="content bg" v-model="expatriatesinfor_id"
                                           :disabled="true" ></input>
                                    <el-button :disabled="!disable" icon="el-icon-search"
                                               @click="dialogTableVisible1 = true"
                                               size="small"></el-button>
                                    <el-dialog :title="$t('label.PFANS5001FORMVIEW_OUTSOURCEPERSON')"
                                               :visible.sync="dialogTableVisible1"
                                               center size="50%"
                                               top="8vh" lock-scroll
                                               append-to-body>
                                      <div style="text-align: center">
                                        <el-row style="text-align: center;height: 90%;overflow: hidden">
                                          <el-table
                                            :data="gridData1.filter(data => !search || data.expname.toLowerCase().includes(search.toLowerCase()))"
                                            height="500px" highlight-current-row style="width: 100%"
                                            tooltip-effect="dark"
                                            @row-click="handleClickChange">
                                            <el-table-column property="number" fixed
                                                             :label="$t('label.PFANS5001FORMVIEW_NUMBERS')"
                                                             width="100"></el-table-column>
                                            <el-table-column property="expatriatesinfor_id" fixed v-if="false"
                                                             :label="$t('label.PFANSUSERFORMVIEW_CUSTOMERNAME')"
                                                             width="180"></el-table-column>

                                            <el-table-column property="expname" fixed
                                                             :label="$t('label.PFANSUSERFORMVIEW_CUSTOMERNAME')"
                                                             width="180"></el-table-column>

                                            <el-table-column property="suppliername"
                                                             :label="$t('label.PFANS5001FORMVIEW_COOPERATIONCOMPANY')"
                                                             width="100"></el-table-column>
                                            <el-table-column property="post"
                                                             :label="$t('label.PFANSUSERVIEW_POST')"
                                                             width="150"></el-table-column>
                                            <!--                                            <el-table-column property="post"-->
                                            <!--                                                             v-if="false"-->
                                            <!--                                                             :label="$t('label.PFANSUSERVIEW_POST')"-->
                                            <!--                                                             width="150"></el-table-column>-->
                                            <el-table-column
                                              align="right" width="180">
                                              <template slot="header" slot-scope="scope">
                                                <el-input
                                                  v-model="search"
                                                  size="mini"
                                                  placeholder="请输入姓名关键字搜索"/>
                                              </template>
                                            </el-table-column>
                                          </el-table>
                                        </el-row>
                                        <span slot="footer" class="dialog-footer">
                                            <el-button type="primary" @click="submit(scope.row)">{{$t('button.confirm')}}</el-button>
                                          </span>
                                      </div>
                                    </el-dialog>
                                  </el-container>
                                </div>
                              </el-col>
                            </template>
                          </el-table-column>
                          <!--                    職務-->
                          <el-table-column
                            :label="$t('label.PFANSUSERVIEW_POST')"
                            align="center"
                            width="120">
                            <template slot-scope="scope">
                              <el-input
                                :no="scope.row"
                                :disabled="true"
                                v-model="scope.row.position"
                                style="width: 100%">
                              </el-input>
                            </template>
                          </el-table-column>
                          <!--                入场时间-->
                          <el-table-column
                            :label="$t('label.PFANS6004FORMVIEW_ADMISSIONTIME')"
                            align="center"
                            prop="admissiontime"
                            width="180">
                            <template slot-scope="scope">
                              <el-date-picker
                                :disabled="!disable"
                                type="date"
                                :no="scope.row"
                                v-model="scope.row.admissiontime"
                                style="width: 9rem">
                              </el-date-picker>
                            </template>
                          </el-table-column>
                          <!--                退场时间-->
                          <el-table-column
                            :label="$t('label.PFANS6004FORMVIEW_EXITIME')"
                            align="center"
                            prop="exittime"
                            width="180">
                            <template slot-scope="scope">
                              <el-date-picker
                                :disabled="!disable"
                                type="date"
                                :no="scope.row"
                                v-model="scope.row.exittime"
                                style="width: 9rem">
                              </el-date-picker>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.operation')" align="center" width="200">
                            <template slot-scope="scope">
                              <el-button
                                :disabled="!disable"
                                @click.native.prevent="deleteRow2(scope.$index, tableC)"
                                plain
                                size="small"
                                type="danger"
                              >{{$t('button.delete')}}
                              </el-button>
                              <el-button
                                :disabled="!disable"
                                @click="addRow2()"
                                plain
                                size="small"
                                type="primary"
                              >{{$t('button.insert')}}
                              </el-button>
                            </template>
                          </el-table-column>
                        </el-table>
                      </el-tab-pane>
                    </el-tabs>
                  </el-col>
                </el-row>
              </el-form-item>
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
  import dicselect from '../../../components/dicselect.vue';
  import {getOrgInfoByUserId, getUserInfo} from '@/utils/customize';
  import {Message} from 'element-ui';
  import moment from 'moment';
  import org from '../../../components/org';
  import {getDictionaryInfo, uploadUrl} from '../../../../utils/customize';

  export default {
    name: 'PFANS5001FormView',
    components: {
      dicselect,
      EasyNormalContainer,
      getOrgInfoByUserId,
      user,
      org,
    },
    data() {
      var validateUserid = (rule, value, callback) => {
        if (!value || value === '' || value === 'undefined') {
          callback(
            new Error(
              this.$t('normal.error_08') +
              this.$t('label.PFANS5001FORMVIEW_LEADERID'),
            ),
          );
          this.errorLeader =
            this.$t('normal.error_08') +
            this.$t('label.PFANS5001FORMVIEW_LEADERID');
        } else {
          callback();
          this.errorLeader = '';
        }
      };
      var validateUserid1 = (rule, value, callback) => {
        if (!value || value === '' || value === 'undefined') {
          callback(
            new Error(
              this.$t('normal.error_08') +
              this.$t('label.PFANS5001FORMVIEW_MANAGERID'),
            ),
          );
          this.errorManager =
            this.$t('normal.error_08') +
            this.$t('label.PFANS5001FORMVIEW_MANAGERID');
        } else {
          callback();
          this.errorManager = '';
        }
      };
      var valiresig = (rule, value, callback) => {
        if (this.form.startdate && this.form.enddate) {
          let startdate = moment(this.form.startdate).format('YYYY-MM-DD');
          let enddate = moment(this.form.enddate).format('YYYY-MM-DD');
          if (moment(enddate).isBefore(startdate)) {
            callback(
              new Error(
                this.$t('label.PFANS5001FORMVIEW_ENDDATE') +
                this.$t('normal.error_checkTime1') +
                this.$t('label.PFANS5001FORMVIEW_STARTDATE'),
              ),
            );
          } else {
            this.$refs['from1'].clearValidate();
            callback();
          }
        } else {
          this.$refs['from1'].clearValidate();
          callback();
        }
      };
      var centerId = (rule, value, callback) => {
        if (!this.form.center_id || this.form.center_id === '') {
          callback(new Error(this.$t('normal.error_08') + 'center'));
          this.error = this.$t('normal.error_08') + 'center';
        } else {
          callback();
        }
      };
      var groupId = (rule, value, callback) => {
        if (!this.form.group_id || this.form.group_id === '') {
          callback(new Error(this.$t('normal.error_08') + 'group'));
          this.error = this.$t('normal.error_08') + 'group';
        } else {
          callback();
        }
      };
      var centerId = (rule, value, callback) => {
        if (!this.form.center_id || this.form.center_id === '') {
          callback(new Error(this.$t('normal.error_08') + 'center'));
          this.error = this.$t('normal.error_08') + 'center';
        } else {
          callback();
        }
      };
      return {
        // centerorglist: '',
        // grouporglist: '',
        // teamorglist: '',
        currentRow5: '',
        expatriatesinfor_id: '',
        errorcenter: '',
        errorgroup: '',
        errorexpname: '',
        search: '',
        Numbers: '',
        gridData1: [],
        gridData2: [],
        gridData3: [],
        disable: false,
        customerinfor: [],
        checkList: [],
        expatriates: [],
        disabled: true,
        error: '',
        errorLeader: '',
        errorManager: '',
        selectType: 'Single',
        userlist: '',
        userlist1: '',
        activeName: 'first',
        activeName2: 'first',
        buttonList: [],
        themeRow: '',
        workinghoursRow: '',
        currentRow: '',
        currentRow1: '',
        currentRow2: '',
        currentRow3: '',
        currentRow4: '',
        //项目计划
        tableA: [
          {
            stageinformation_id: '',
            comproject_id: '',
            phase: '',
            stageproduct: '',
            productstatus: '',
            estimatedwork: '',
            actualwork: '',
            manmonth: '',
            estimatedstarttime: '',
            estimatedendtime: '',
            remarks: '',
            actualstarttime: '',
            actualendtime: '',
            product: '',
            phasestatus: '',
            rowindex: '',
            showrow: true,
            showrow1: false,
            showrow2: false,
            showrow3: false,
          },
        ],
        //项目体制(本社)
        tableB: [
          {
            prosystem_id: '',
            comproject_id: '',
            type: '0',
            number: '',
            company: '',
            name: this.$store.getters.userinfo.userid,
            position: 'PL',
            admissiontime: '',
            exittime: '',
            rowindex: '',
          },
        ],
        //项目体制(外协)
        tableC: [
          {
            prosystem_id: '',
            comproject_id: '',
            type: '1',
            number: '',
            company: '',
            name: '',
            position: '',
            admissiontime: '',
            exittime: '',
            rowindex: '',
          },
        ],
        //合同
        tableD: [
          {
            projectcontract_id: '',
            comproject_id: '',
            contract: '',
            theme: '',
            workinghours: '',
            rowindex: '',
          },
        ],
        data: [],
        loading: false,
        dialogTableVisible1: false,
        dialogTableVisible2: false,
        dialogTableVisible3: false,
        title: 'label.PFANS5001VIEW1',
        rules: {
          leaderid: [
            {
              required: true,
              validator: validateUserid,
              trigger: 'change',
            },
          ],
          managerid: [
            {
              required: true,
              validator: validateUserid1,
              trigger: 'change',
            },
          ],
          project_name: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANS5001FORMVIEW_PROJECT_NAME'),
              trigger: 'blur',
            },
          ],
          project_namejp: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANS5001FORMVIEW_PROJECT_NAMEJP'),
              trigger: 'blur',
            },
          ],
          number: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANS5001FORMVIEW_NUMBERS'),
              trigger: 'blur',
            },
          ],
          projecttype: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANS5001FORMVIEW_PROJECTTYPE'),
              trigger: 'change',
            },
          ],
          field: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANS5001FORMVIEW_FIELD'),
              trigger: 'change',
            },
          ],
          startdate: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANS5001FORMVIEW_STARTDATE'),
              trigger: 'blur',
            }, {validator: valiresig, trigger: 'change'},
          ],
          enddate: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANS5001FORMVIEW_ENDDATE'),
              trigger: 'blur',
            }, {validator: valiresig, trigger: 'change'},
          ],
          manmonth: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANS5001FORMVIEW_MANMONTH'),
              trigger: 'blur',
            },
          ],
          salesvolume: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANS5001FORMVIEW_SALESVOLUME'),
              trigger: 'blur',
            },
          ],
          cost: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANS5001FORMVIEW_COST'),
              trigger: 'blur',
            },
          ],
          projectalabel: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANS5001FORMVIEW_PROJECTALABEL'),
              trigger: 'blur',
            },
          ],
          customername: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANS5001FORMVIEW_CUSTOMERNAME'),
              trigger: 'change',
            },
          ],
          // 开发语言
          languages: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANS5001FORMVIEW_BRIEFINTRODUCTION'),
              trigger: 'blur',
            },
          ],
          // 受託工数
          work: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANS5001FORMVIEW_BRIEFINTRODUCTION'),
              trigger: 'blur',
            },
          ],
          center_id: [
            {
              required: true,
              validator: centerId,
              trigger: 'change',
            },
          ],
          group_id: [
            {
              required: true,
              validator: groupId,
              trigger: 'change',
            },
          ],
          //纳期
          deadline: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANS5001FORMVIEW_BRIEFINTRODUCTION'),
              trigger: 'blur',
            },
          ],
          // 姓名
          expname: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.user_name'),
              trigger: 'blur',
            },
          ],
          // 委托元部署
          // deployment: [
          //     {
          //         required: true,
          //         message: this.$t('normal.error_08') + this.$t('label.user_name'),
          //         trigger: 'blur',
          //     },
          // ],
          // 事业国别
          // country: [
          //     {
          //         required: true,
          //         message: this.$t('normal.error_08') + this.$t('label.user_name'),
          //         trigger: 'blur',
          //     },
          // ],
          // 车载
          //   caron: [
          //       {
          //           required: true,
          //           message: this.$t('normal.error_08') + this.$t('label.user_name'),
          //           trigger: 'blur',
          //       },
          //   ],
          // center_id: [
          //   {
          //     required: true,
          //     validator: centerId,
          //     trigger: "blur"
          //   }
          // ],
        },
        baseInfo: {},
        form: {
          centername: '',
          groupname: '',
          teamname: '',
          center_id: '',
          group_id: '',
          team_id: '',
          project_name: '',
          project_namejp: '',
          leaderid: '',
          managerid: '',
          projecttype: '',
          field: '',
          languages: '',
          startdate: '',
          // 事业国别
          country: '',
          //车载
          caron: '',
          // 委托元
          entrust: '',
          enddate: '',
          work: '',
          deadline: '',
          tools: '',
          briefintroduction: '',
          //計画工数
          estimatedwork: '',
          requirement: '',
          behalf: '',
          intelligence: '',
          numbers: '',
          departmentid: '',
          technological: '',
          manmonth: '',
          cost: '',
          salesvolume: '',
          projectalabel: '',
          situation: '',
          confidential: '',
          managementtool: '',
          customername: '',
          representative: '',
          basicsituation: '',
          uploadfile: '',
          //合同
          // contract: '',
          // theme: '',
          // workinghours: '',
          // rowindex: '',
        },
        multiple: false,
        code: 'PP012',
        code1: 'PP013',
        code2: 'PP001',
        //code3: 'PJ063',
        code4: 'PP014',
        code5: 'PP015',
        code6: 'PP017',
        code7: 'PP016',
        code8: 'PP018',
        showrow: true,
        showrow1: false,
        showrow2: false,
        showrow3: false,
        // code7: "PP014",
        // code8: "PP015",
        // code9:"PR021",
        result: '',
        result1: '',
        fileList: [],
        upload: uploadUrl(),
        stage: '',
        status: '',
      };
    },

    mounted() {
      if (this.$route.params._org) {
        ({
          centername: this.form.centername,
          groupname: this.form.groupname,
          teamname: this.form.teamname,
          center_id: this.form.center_id,
          group_id: this.form.group_id,
          team_id: this.form.team_id,
        } = this.$route.params._org);
      }
      let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'PP018');
      for (let i = 0; i < dic.length; i++) {
        this.checkList = dic[i].code;
      }
      this.getexpatriatesinfor();
      this.getcustomerinfor();
      this.getcontract();
      if (this.$route.params._id) {
        this.Numbers = 0;
        this.loading = true;
        this.$store
          .dispatch('PFANS5013Store/selectById', {comproject_id: this.$route.params._id})
          .then(response => {
            this.form = response.comproject;
            this.userlist = this.form.leaderid;
            this.userlist1 = this.form.managerid;
            this.centerorglist = this.form.center_id;
            this.grouporglist = this.form.group_id;
            this.teamorglist = this.form.team_id;
            // if (this.form.tools != '') {
            //     this.checkList = JSON.parse(this.form.tools);
            // }
            //项目计划
            // if (response.stageinformation.length > 0) {
            //     this.tableA = response.stageinformation;
            //     for (var i = 0; i < this.tableA.length; i++) {
            //         if (this.tableA[i].phase === ''){
            //           this.tableA[i].showrow = true;
            //           this.tableA[i].showrow1 = false;
            //           this.tableA[i].showrow2 = false;
            //           this.tableA[i].showrow3 = false;
            //         }else if (this.tableA[i].phase === 'PP012001') {
            //             this.tableA[i].showrow = false;
            //             this.tableA[i].showrow1 = true;
            //             this.tableA[i].showrow2 = false;
            //             this.tableA[i].showrow3 = false;
            //         } else if (this.tableA[i].phase === 'PP012002') {
            //             this.tableA[i].showrow = false;
            //             this.tableA[i].showrow1 = false;
            //             this.tableA[i].showrow2 = true;
            //             this.tableA[i].showrow3 = false;
            //         } else if (this.tableA[i].phase === 'PP012003') {
            //             this.tableA[i].showrow = false;
            //             this.tableA[i].showrow1 = false;
            //             this.tableA[i].showrow2 = false;
            //             this.tableA[i].showrow3 = true;
            //         } else if (this.tableA[i].phase === ' ') {
            //             this.tableA[i].showrow = true;
            //         }
            //     }
            // }

            //项目体制
            if (response.prosystem.length > 0) {
              let tablec = [];
              let tableb = [];
              let flag1 = false;
              let flag2 = false;
              for (var i = 0; i < response.prosystem.length; i++) {
                if (response.prosystem[i].type === '0') {
                  flag1 = true;

                  tableb.push({
                    name: response.prosystem[i].prosystem,
                    comproject_id: response.prosystem[i].comproject_id,
                    type: response.prosystem[i].type,
                    number: response.prosystem[i].number,
                    company: response.prosystem[i].company,
                    name: response.prosystem[i].name,
                    position: response.prosystem[i].position,
                    // position: position,
                    admissiontime: response.prosystem[i].admissiontime,
                    exittime: response.prosystem[i].exittime,
                    rowindex: response.prosystem[i].rowindex,
                  });
                } else if (response.prosystem[i].type === '1') {
                  if(response.prosystem[i].name!=''||response.prosystem[i].name!=null){
                    this.$store
                      .dispatch('PFANS6004Store/getexpatriatesinforApplyOne', {'expatriatesinfor_id': response.prosystem[i].name})
                      .then(response => {
                        this.expatriatesinfor_id = response.expname;
                      })
                  }
                  flag2 = true;
                  tablec.push({
                    name: response.prosystem[i].prosystem,
                    comproject_id: response.prosystem[i].comproject_id,
                    type: response.prosystem[i].type,
                    number: response.prosystem[i].number,
                    company: response.prosystem[i].company,
                    name: response.prosystem[i].name,
                    position: response.prosystem[i].position,
                    admissiontime: response.prosystem[i].admissiontime,
                    exittime: response.prosystem[i].exittime,
                    rowindex: response.prosystem[i].rowindex,
                  });
                }
              }
              if(!flag1){
                this.tableB = [
                  {
                    prosystem_id: '',
                    comproject_id: '',
                    type: '0',
                    number: '',
                    company: '',
                    name: '',
                    position: '',
                    admissiontime: '',
                    exittime: '',
                    rowindex: '',
                  }
                ]
              }else{
                this.tableB = tableb;
              }

              if(!flag2){
                this.tableC = [
                  {
                    prosystem_id: '',
                    comproject_id: '',
                    type: '1',
                    number: '',
                    company: '',
                    name: '',
                    position: '',
                    admissiontime: '',
                    exittime: '',
                    rowindex: '',
                  },
                ]
              }else{
                this.tableC = tablec;
              }
            }
            //项目合同
            if (response.projectcontract.length > 0) {
              let tabled = [];
              for (let i = 0; i < response.projectcontract.length; i++) {
                if (response.projectcontract[i].workinghours !== '' && response.projectcontract[i].workinghours !== null) {
                  let claimdatetime = response.projectcontract[i].workinghours;
                  let claimdatetim = claimdatetime.slice(0, 10);
                  let claimdatetime1 = claimdatetime.slice(claimdatetime.length - 10);
                  response.projectcontract[i].workinghours = [claimdatetim, claimdatetime1];
                }
                tabled.push({
                  contract: response.projectcontract[i].contract,
                  theme: response.projectcontract[i].theme,
                  workinghours: response.projectcontract[i].workinghours,
                });

              }
              this.tableD = tabled;
            }
            // this.baseInfo.companyprojects = JSON.parse(JSON.stringify(this.form));
            // this.baseInfo.stageinformation = JSON.parse(JSON.stringify(this.tableA));
            if (this.form.uploadfile != null) {
              if (this.form.uploadfile != '') {
                let uploadfile = this.form.uploadfile.split(';');
                for (var i = 0; i < uploadfile.length; i++) {
                  if (uploadfile[i].split(',')[0] != '') {
                    let o = {};
                    o.name = uploadfile[i].split(',')[0];
                    o.url = uploadfile[i].split(',')[1];
                    this.fileList.push(o);
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
      } else {
        this.Numbers = 1;
        this.userlist = this.$store.getters.userinfo.userid;
        this.userlist1 = this.$store.getters.userinfo.userid;
        let lst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
        if (lst) {
          this.form.team_id = lst.teamId;
          this.form.group_id = lst.groupId;
          this.form.center_id = lst.centerId;
        }
      }
      this.$store
        .dispatch('PFANS5001Store/getcustomer', {})
        .then(response => {
          for (let i = 0; i < response.length; i++) {
            var vote = {};
            this.result1 = response;
            vote.value = response[i].customerinfor_id;
            vote.label = response[i].custchinese;
            this.customerinfor.push(vote);
          }
        });
      this.$store
        .dispatch('PFANS5001Store/getexpat', {})
        .then(response => {
          for (let i = 0; i < response.length; i++) {
            var vote = {};
            this.result = response;
            vote.value = response[i].expatriatesinfor_id;
            vote.label = response[i].expname;
            this.expatriates.push(vote);
          }
        });
    },

    created() {
      this.disable = this.$route.params.disabled;
      if (this.disable) {
        this.buttonList = [
          {
            key: 'save',
            name: 'button.save',
            disabled: false,
          },
        ];
      }
    },
    methods: {
      // add-ws共同部署center，group，team添加
      getCenterId(val) {
        this.form.center_id = val;
        if (!val || this.form.center_id === '') {
          this.errorcenter = this.$t('normal.error_08') + 'center';
        } else {
          this.errorcenter = '';
        }
      },
      getGroupId(val) {
        this.getOrgInformation(val);
        if (this.form.center_id === '') {
          this.errorgroup = this.$t('normal.error_08') + 'center';
        } else {
          this.errorgroup = '';
        }
      },
      getTeamId(val) {
        this.getOrgInformation(val);
        if (this.form.center_id === '') {
          this.errorgroup = this.$t('normal.error_08') + 'center';
        } else {
          this.errorgroup = '';
        }
      },
      // add-ws共同部署center，group，team添加
      checkRequire() {
        if (!this.form.project_name ||
          !this.form.project_namejp ||
          !this.form.userlist ||
          !this.form.projecttype ||
          !this.form.startdate ||
          !this.form.enddate) {
          this.activeName = 'first';
        }
      },
      setdisabled(val) {
        if (this.$route.params.disabled) {
          this.disable = val;
        }
      },
      setToolsorgs(val) {
        this.form.toolsorgs = val;
      },
      getcontract() {
        this.contractapplication = {};
        this.contractapplication.entrycondition = [];
        this.contractapplication.entrycondition = 'HT004007';
        this.loading = true;
        this.$store
          .dispatch('PFANS1026Store/get2', this.contractapplication)
          .then(response => {
            this.gridData3 = [];
            for (let i = 0; i < response.contractapplication.length; i++) {
              if (response.contractapplication[i].claimdatetime !== '' && response.contractapplication[i].claimdatetime !== null) {
                let claimdatetime = response.contractapplication[i].claimdatetime;
                let claimdatetim = claimdatetime.slice(0, 10);
                let claimdatetime1 = claimdatetime.slice(claimdatetime.length - 10);
                response.contractapplication[i].claimdatetime = [claimdatetim, claimdatetime1];
              }
              var vote2 = {};
              vote2.contract = response.contractapplication[i].contractnumber;
              vote2.deployment = response.contractapplication[i].deployment;
              vote2.contracttype = getDictionaryInfo(response.contractapplication[i].contracttype).value1;
              vote2.applicationdate = moment(response.contractapplication[i].applicationdate).format('YYYY-MM-DD');
              vote2.state = response.contractapplication[i].state;
              vote2.claimdatetime = response.contractapplication[i].claimdatetime;
              vote2.theme = response.contractapplication[i].theme;
              this.gridData3.push(vote2);
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
      getcustomerinfor() {
        this.loading = true;
        this.$store
          .dispatch('PFANS6002Store/getcustomerinfor2', {})
          .then(response => {
            this.gridData2 = [];
            for (let i = 0; i < response.length; i++) {
              var vote = {};
              vote.entrust = response[i].custchinese;
              vote.deployment = response[i].prochinese;
              this.gridData2.push(vote);
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

      getCenterId(val) {
        this.getOrgInformation(val);
        if (!val || this.form.center_id === '') {
          this.errorcenter = this.$t('normal.error_08') + 'center';
        } else {
          this.errorcenter = '';
        }
      },
      getGroupId(val) {
        this.getOrgInformation(val);
        if (this.form.center_id === '') {
          this.errorgroup = this.$t('normal.error_08') + 'center';
        } else {
          this.errorgroup = '';
        }
      },
      getTeamId(val) {
        this.getOrgInformation(val);
        if (this.form.center_id === '') {
          this.errorgroup = this.$t('normal.error_08') + 'center';
        } else {
          this.errorgroup = '';
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
        this.tableB[0].name = val;
        this.userlist = val;
        this.form.leaderid = val;
        let lst = getOrgInfoByUserId(val);
        this.tableB.number = lst.number;
        this.tableB.position = lst.post;
        if (
          !this.form.leaderid ||
          this.form.leaderid === '' ||
          val === 'undefined'
        ) {
          this.errorLeader =
            this.$t('normal.error_08') +
            this.$t('label.PFANS5001FORMVIEW_LEADERID');
        } else {
          this.errorLeader = '';
        }
      },
      getUserids1(val) {
        this.userlist1 = val;
        this.form.managerid = val;
        if (
          !this.form.managerid ||
          this.form.managerid === '' ||
          val === 'undefined'
        ) {
          this.errorManager =
            this.$t('normal.error_08') +
            this.$t('label.PFANS5001FORMVIEW_MANAGERID');
        } else {
          this.errorManager = '';
        }
      },
      handleClickChange(val) {
        this.currentRow = val.number;
        this.currentRow1 = val.expatriatesinfor_id;
        this.currentRow2 = val.suppliername;
        this.currentRow3 = val.post;
        this.currentRow4 = val.suppliernameid;
        this.currentRow5 = val.expname;
      },
      submit(row) {
        row.number = this.currentRow;
        row.name = this.currentRow1;
        this.expatriatesinfor_id = this.currentRow5;
        row.company = this.currentRow2;
        row.position = this.currentRow3;
        row.suppliernameid = this.currentRow4;
        this.dialogTableVisible1 = false;
      },
      handleClickChange1(val) {
        this.currentRow = val.entrust;
        this.currentRow1 = val.deployment;
      },
      submit1() {
        this.form.entrust = this.currentRow;
        this.form.deployment = this.currentRow1;
        this.dialogTableVisible2 = false;
      },
      //合同
      // handleClickChange2(val) {
      //     this.currentRow = val.contract;
      //     this.themeRow= val.theme;
      //     this.workinghoursRow= val.claimdatetime;
      //     this.getCompanyprojects();
      // },
      submit2(row) {
        row.contract = this.currentRow;
        row.theme = this.themeRow;
        row.workinghours = this.workinghoursRow;
        this.dialogTableVisible3 = false;
      },
      getCitationUserid(userlist, row) {
        row.name = userlist;
        if (row.name != null && row.name !== '') {
          let lst = getUserInfo(row.name);
          if (lst.userinfo.post) {
            row.position = getDictionaryInfo(lst.userinfo.post).value1;
          }
          row.number = lst.userinfo.jobnumber;
          let lst1 = getOrgInfoByUserId(row.name);
          row.company = lst1.groupNmae;
        } else {
          row.position = '';
          row.number = '';
          row.company = '';
        }
      },
      // getdepartmentid(val1) {
      //   this.form.departmentid = val1;
      // },
      getprojecttype(val1) {
        this.form.projecttype = val1;
      },
      getfield(val1) {
        this.form.field = val1;
      },
      getcountry(val1) {
        this.form.country = val1;
      },
      getcaron(val1) {
        this.form.caron = val1;
      },
      // gettechnological(val1) {
      //   this.form.technological = val1;
      // },
      // getsituation(val1) {
      //   this.form.situation = val1;
      // },
      // getconfidential(val1) {
      //   this.form.confidential = val1;
      // },
      // getmanagementtool(val1) {
      //   this.form.managementtool = val1;
      // },

      // getplantype(val1, row) {
      //   row.plantype = val1;
      // },
      getrole(val, row) {
        row.phase = val;
        row.stageproduct = ' ';
        if (val === '') {
          row.showrow = true;
          row.showrow1 = false;
          row.showrow2 = false;
          row.showrow3 = false;
        } else if (val === 'PP012001') {
          row.showrow = false;
          row.showrow1 = true;
          row.showrow2 = false;
          row.showrow3 = false;
        } else if (val === 'PP012002') {
          row.showrow = false;
          row.showrow1 = false;
          row.showrow2 = true;
          row.showrow3 = false;
        } else if (val === 'PP012003') {
          row.showrow = false;
          row.showrow1 = false;
          row.showrow2 = false;
          row.showrow3 = true;
        }
      },
      getrole1(val, row) {
        row.stageproduct = val;
      },
      getcustomer(val) {
        this.result1.forEach(res => {
          if (res.customerinfor_id === val) {
            this.form.representative = res.liableperson;
          }
        });
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
        if (val.state === '0') {
          this.form.status = '2';
        }else if (val.state === '2') {
          this.form.status = '4';
        }
        this.buttonClick('update');
      },
      end() {
        this.form.status = '0';
        this.buttonClick('update');
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
        this.form.uploadfile = '';
        for (var item of fileList) {
          let o = {};
          o.name = item.name;
          o.url = item.url;
          this.fileList.push(o);
          this.form.uploadfile += item.name + ',' + item.url + ';';
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
        this.form.uploadfile = '';
        for (var item of fileList) {
          let o = {};
          o.name = item.name;
          if (!item.url) {
            o.url = item.response.info;
          } else {
            o.url = item.url;
          }
          this.fileList.push(o);
          this.form.uploadfile += o.name + ',' + o.url + ';';
        }
      },
      //开发计划
      addRow() {
        this.tableA.push({
          stageinformation_id: '',
          comproject_id: '',
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
          phasestatus: '',
          rowindex: '',
          showrow: true,
          showrow1: false,
          showrow2: false,
          showrow3: false,
        });
      },
      // 开发计划
      deleteRow(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        } else {
          this.tableA = [{
            stageinformation_id: '',
            comproject_id: '',
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
            phasestatus: '',
            rowindex: '',
          }];
        }
      },
      //项目体制(本社)
      addRow1() {
        this.tableB.push({
          prosystem_id: '',
          comproject_id: '',
          type: '0',
          number: '',
          company: '',
          name: '',
          position: '',
          admissiontime: '',
          exittime: '',
          rowindex: '',
        });
      },
      deleteRow1(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        } else {
          this.tableB = [{
            prosystem_id: '',
            comproject_id: '',
            type: '0',
            number: '',
            company: '',
            name: '',
            position: '',
            admissiontime: '',
            exittime: '',
            rowindex: '',
          }];
        }
      },
      //项目体制(外协)
      addRow2() {
        this.tableC.push({
          prosystem_id: '',
          comproject_id: '',
          type: '1',
          number: '',
          company: '',
          name: '',
          suppliernameid: '',
          position: '',
          admissiontime: '',
          exittime: '',
          rowindex: '',
        });
      },
      // 体制-社内
      deleteRow2(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        } else {
          this.tableC = [{
            prosystem_id: '',
            comproject_id: '',
            type: '1',
            number: '',
            company: '',
            name: '',
            position: '',
            admissiontime: '',
            exittime: '',
            rowindex: '',
          }];
        }
      },
      //合同
      addRow3() {
        this.tableD.push({
          projectcontract_id: '',
          comproject_id: '',
          contract: '',
          theme: '',
          workinghours: '',
          rowindex: '',
        });
      },
      //合同
      deleteRow3(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        } else {
          this.tableD = [{
            projectcontract_id: '',
            comproject_id: '',
            contract: '',
            theme: '',
            workinghours: '',
            rowindex: '',
          }];
        }
      },
      // //计划合计
      // getTsummaries(param) {
      //   const {columns, data} = param;
      //   const sums = [];
      //   columns.forEach((column, index) => {
      //     if (index === 0) {
      //       sums[index] = this.$t('label.PFANS1012VIEW_ACCOUNT');
      //       return;
      //     }
      //     const values = data.map(item => Number(item[column.property]));
      //     if (!values.every(value => isNaN(value))) {
      //       sums[index] = values.reduce((prev, curr) => {
      //         const value = Number(curr);
      //         if (!isNaN(value)) {
      //           return prev + curr;
      //         } else {
      //           return prev;
      //         }
      //       }, 0);
      //       if (index == 2) {
      //         sums[index] = Math.round((sums[index]) * 100) / 100;
      //       }
      //     } else {
      //       sums[index] = '0.00';
      //     }
      //   });
      //   this.form.estimatedwork = sums;
      //   return sums;
      // },
      getexpatriatesinfor() {
        this.loading = true;
        this.$store
          .dispatch('PFANS6004Store/getWithoutAuth', {})
          .then(response => {
            this.gridData1 = [];
            for (let i = 0; i < response.length; i++) {
              var vote1 = {};
              vote1.number = response[i].number;
              vote1.expatriatesinfor_id= response[i].expatriatesinfor_id;
              vote1.expname = response[i].expname;
              vote1.suppliername = response[i].suppliername;
              // vote1.post = response[i].post;
              if (response[i].post) {
                vote1.post = getDictionaryInfo(response[i].post).value1;
              }
              vote1.suppliernameid = response[i].supplierinfor_id;
              this.gridData1.push(vote1);
            }
            this.centerorglist = this.form.center_id;
            this.grouporglist = this.form.group_id;
            this.teamorglist = this.form.team_id;
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
      //上传附件
      // fileError(err, file, fileList) {
      //     Message({
      //         message: this.$t("normal.error_04"),
      //         type: 'error',
      //         duration: 5 * 1000
      //     });
      // },
      // fileRemove(file, fileList) {
      //     this.fileList = [];
      //     this.form.uploadfile = "";
      //     for (var item of fileList) {
      //         let o = {};
      //         o.name = item.name;
      //         o.url = item.url;
      //         this.fileList.push(o);
      //         this.form.uploadfile += item.name + "," + item.url + ";"
      //     }
      // },
      // fileDownload(file) {
      //     if (file.url) {
      //         var url = downLoadUrl(file.url);
      //         window.open(url);
      //     }
      //
      // },
      // fileSuccess(response, file, fileList) {
      //     this.fileList = [];
      //     this.form.uploadfile = "";
      //     for (var item of fileList) {
      //         let o = {};
      //         o.name = item.name;
      //         if (!item.url) {
      //             o.url = item.response.info;
      //         } else {
      //             o.url = item.url;
      //         }
      //         this.fileList.push(o);
      //         this.form.uploadfile += o.name + "," + o.url + ";"
      //     }
      // },
      getCompanyprojects() {
        if (this.Numbers == 1) {
          this.$store
            .dispatch('PFANS5013Store/getFpans5013List', {})
            .then(response => {
              let number = 0;
              let numbe = 0;
              let numbers;
              for (let j = 0; j < response.length; j++) {
                number = number + 1;
              }
              numbe = number + 1;
              if (numbe.toString().length === 1) {
                numbe = '00' + numbe;
              } else if (numbe.toString().length === 2) {
                numbe = '0' + numbe;
              } else {
                numbe = numbe;
              }
              numbers = moment(new Date()).format('YYYY').toString() + numbe;
              this.form.numbers = numbers;
            });
        }
      },
      getworkinghours(workinghours) {
        if (workinghours != null) {
          if (workinghours.length > 0) {
            return moment(workinghours[0]).format('YYYY-MM-DD') + ' ~ ' + moment(workinghours[1]).format('YYYY-MM-DD');
          } else {
            return '';
          }
        } else {
          return '';
        }
      },
      buttonClick(val) {
        this.form.leaderid = this.userlist;
        this.form.managerid = this.userlist1;
        this.checkRequire();
        this.$refs['from1'].validate(valid => {
          if (valid) {
            this.loading = true;
            this.baseInfo = {};
            if (JSON.stringify(this.checkList) !== '[]') {
              this.form.tools = JSON.stringify(this.checkList);
            } else {
              this.form.tools = '';
            }
            var manMonth = 0;
            for (let i = 0; i < this.tableA.length; i++) {
              if (this.tableA.estimatedwork !== '') {
                manMonth = Math.round((manMonth + this.tableA[i].estimatedwork) * 100) / 100;
              }
            }
            this.form.manmonth = manMonth;
            this.baseInfo.comproject = JSON.parse(JSON.stringify(this.form));
            this.baseInfo.stageinformation = [];
            this.baseInfo.prosystem = [];
            this.baseInfo.projectcontract = [];
            //项目计划
            for (let i = 0; i < this.tableA.length; i++) {
              if (
                this.tableA[i].phase !== '' ||
                this.tableA[i].stageproduct !== '' ||
                this.tableA[i].estimatedwork !== '' ||
                this.tableA[i].estimatedstarttime !== '' ||
                this.tableA[i].estimatedendtime !== '' ||
                this.tableA[i].remarks !== ''
              ) {
                this.baseInfo.stageinformation.push({
                  phase: this.tableA[i].phase,
                  stageproduct: this.tableA[i].stageproduct,
                  estimatedwork: this.tableA[i].estimatedwork,
                  estimatedstarttime: this.tableA[i].estimatedstarttime,
                  estimatedendtime: this.tableA[i].estimatedendtime,
                  remarks: this.tableA[i].remarks,
                });
              }
            }
            let error1 = 0;
            for (let i = 0; i < this.tableB.length; i++) {
              for (let K = 1; K < this.tableB.length; K++) {
                if (this.tableB[i].name === this.tableB[K].name) {
                  this.activeName = 'fourth';
                  this.loading = false;
                  error1 = error1 + 1;
                  Message({
                    message: this.$t('label.PFANS5013FROMVIEW_CHECKERROR'),
                    type: 'error',
                    duration: 5 * 1000,
                  });
                }
                break;
              }
              break;
            }
            for (let i = 0; i < this.tableC.length; i++) {
              for (let K = 1; K < this.tableC.length; K++) {
                if (this.tableC[i].name === this.tableC[K].name) {
                  this.activeName = 'fourth';
                  this.loading = false;
                  error1 = error1 + 1;
                  Message({
                    message: this.$t('label.PFANS5013FROMVIEW_CHECKERROR'),
                    type: 'error',
                    duration: 5 * 1000,
                  });
                }
                break;
              }
              break;
            }
            for (let i = 0; i < this.tableB.length; i++) {
              if ((!this.tableB[i].admissiontime || this.tableB[i].admissiontime === '' || !this.tableB[i].exittime || this.tableB[i].exittime === '') && this.tableB[i].name !== '') {
                this.activeName = 'fourth';
                this.loading = false;
                error1 = error1 + 1;
                Message({
                  message: this.$t('normal.error_pfans50011'),
                  type: 'error',
                  duration: 5 * 1000,
                });
                return;
              }
              if (
                this.tableB[i].number !== '' ||
                this.tableB[i].name !== '' ||
                this.tableB[i].admissiontime !== '' ||
                this.tableB[i].exittime !== ''
              ) {
                this.baseInfo.prosystem.push({
                  number: this.tableB[i].number,
                  name: this.tableB[i].name,
                  type: this.tableB[i].type,
                  company: this.tableB[i].company,
                  position: this.tableB[i].position,
                  admissiontime: this.tableB[i].admissiontime,
                  exittime: this.tableB[i].exittime,
                });
              }
            }
            for (let i = 0; i < this.tableC.length; i++) {
              if (
                this.tableC[i].number !== '' ||
                this.tableC[i].name !== '' ||
                this.tableC[i].suppliernameid !== '' ||
                this.tableC[i].admissiontime !== '' ||
                this.tableC[i].exittime !== ''
              ) {
                this.baseInfo.prosystem.push({
                  number: this.tableC[i].number,
                  name: this.tableC[i].name,
                  suppliernameid: this.tableC[i].suppliernameid,
                  type: this.tableC[i].type,
                  company: this.tableC[i].company,
                  admissiontime: this.tableC[i].admissiontime,
                  exittime: this.tableC[i].exittime,
                  position: this.tableC[i].position,
                });
              }
            }
            for (let i = 0; i < this.tableD.length; i++) {
              this.tableD[i].workinghours = this.getworkinghours(this.tableD[i].workinghours);
              if (
                this.tableD[i].contract !== '' ||
                this.tableD[i].theme !== '' ||
                this.tableD[i].workinghours !== ''
              ) {
                this.baseInfo.projectcontract.push({
                  contract: this.tableD[i].contract,
                  theme: this.tableD[i].theme,
                  workinghours: this.tableD[i].workinghours,
                });
              }
            }
            // if (error != '') {
            //     this.loading = false;
            //     Message({
            //         message: this.$t('normal.error_08') +
            //             this.$t('label.PFANS5001FORMVIEW_CONTRACT'),
            //         type: 'error',
            //         duration: 5 * 1000,
            //     });
            // }
            // if(this.form.status === '2'){
            //     this.disable = false
            // }else {
            //     this.disable = true
            // }
            if (error1 === 0) {
              if (this.$route.params._id) {
                this.baseInfo.comproject.comproject_id = this.$route.params._id;
                this.form.center_id = this.centerorglist;
                this.form.group_id = this.grouporglist;
                this.form.team_id = this.teamorglist;
                this.$store
                  .dispatch('PFANS5013Store/update', this.baseInfo)
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
                this.$store
                  .dispatch('PFANS5013Store/insert', this.baseInfo)
                  .then(response => {
                    this.data = response;

                    this.loading = false;
                    this.$message({
                      message: this.$t('normal.success_01'),
                      type: 'success',
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
