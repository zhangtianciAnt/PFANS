<template>
  <div>
    <EasyNormalContainer
      :buttonList="buttonList"
      :title="title"
      @buttonClick="buttonClick"
      :defaultStart="defaultStart"
      @StartWorkflow="buttonClick"
      :canStart="canStart"
      @end="end" :workflowCode="workcode"
      @start="start" @disabled="setdisabled"
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
            <el-tab-pane :label="$t('label.PFANS1002FORMVIEW_INFORMATION')" name="first">
              <div>
                <el-form
                  :model="form"
                  :rules="rules"
                  label-position="top"
                  label-width="8vw"
                  ref="from1"
                >
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
                          maxlength="255"
                          :disabled="!disable"
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
                          maxlength="255"
                          :disabled="!disable"
                          style="width: 20vw"
                          v-model="form.project_namejp"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <!--                    add-ws-No.50-内采时，增加委托元项目-->
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5001FORMVIEW_NEICE')">
                        <span style="margin-right: 1vw ">{{$t('label.no')}}</span>
                        <el-switch
                          :disabled="!disable"
                          active-value="1"
                          inactive-value="0"
                          v-model="form.neice"
                        >
                        </el-switch>
                        <span style="margin-left: 1vw ">{{$t('label.yes')}}</span>
                      </el-form-item>
                    </el-col>
                    <!--                    add-ws-No.50-内采时，增加委托元项目-->
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item
                        :error="errorLeader"
                        :label="$t('label.PFANS5009FORMVIEW_PL')"
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
                    <el-col :span="8">
                      <el-form-item
                        :error="errorManager"
                        :label="$t('label.PFANS5009FORMVIEW_TL')"
                        prop="managerid"
                      >
                        <user
                          :disabled="!disable"
                          :error="errorManager"
                          :selectType="selectType"
                          :userlist="userlist1"
                          @getUserids="getUserids1"
                          style="width: 20vw"
                        ></user>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5001FORMVIEW_LANGUAGE')" prop="languages">
                        <el-input
                          :disabled="!disable"
                          maxlength="20"
                          style="width: 20vw"
                          v-model="form.languages"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
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
                        :label="$t('label.PFANS5001FORMVIEW_FIELD')"
                        prop="field"
                      >
                        <dicselect
                          :code="code3"
                          :data="form.field"
                          :disabled="!disable"
                          :multiple="multiple"
                          style="width: 20vw"
                          @change="getfield"
                        ></dicselect>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        :label="$t('label.PFANS5001FORMVIEW_COUNTRY')"
                        prop="country"
                      >
                        <dicselect
                          :code="code6"
                          :data="form.country"
                          :disabled="!disable"
                          :multiple="multiple"
                          style="width: 20vw"
                          @change="getcountry"
                        ></dicselect>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <!-- //委托元（在华）-->
                    <el-col :span="8">
                      <el-form-item
                        :label="$t('label.PFANS5001FORMVIEW_CHENTRUST')"
                      >
                        <dicselect
                          :code="code9"
                          :data="form.chentrust"
                          :disabled="!disable"
                          :multiple="multiple"
                          style="width: 20vw"
                          @change="getchentrust"
                        ></dicselect>
                      </el-form-item>
                    </el-col>
                    <!-- //委托元（在华以外）-->
                    <el-col :span="8">
                      <el-form-item
                        :label="$t('label.PFANS5001FORMVIEW_OUENTRUST')"

                      >
                        <dicselect
                          :code="code10"
                          :data="form.ouentrust"
                          :disabled="!disable"
                          :multiple="multiple"
                          style="width: 20vw"
                          @change="getouentrust"
                        ></dicselect>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        :label="$t('label.PFANS5001FORMVIEW_CARON')"
                        prop="caron"
                      >
                        <dicselect
                          :code="code7"
                          :data="form.caron"
                          :disabled="!disable"
                          :multiple="multiple"
                          style="width: 20vw"
                          @change="getcaron"
                        ></dicselect>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
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
                  <el-row>
                    <!--受託工数-->
<!--                    NT_PFANS_20210304_BUG_052  将受託工数 变为数字组件-->
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5009FORMVIEW_WORK')" prop="work">
                        <el-input-number
                          :disabled="!disabled"
                          :max="99999"
                          :min="0"
                          :precision="2"
                          :step="1"
                          controls-position="right"
                          style="width:20vw"
                          v-model="form.work"
                        ></el-input-number>
                      </el-form-item>
                    </el-col>
                    <!--   納期-->
                    <el-col :span="8">
                      <el-form-item
                        :label="$t('label.PFANS5009FORMVIEW_DEADLINE')"
                        prop="deadline"
                      >
                        <el-date-picker
                          :disabled="!disable"
                          style="width: 20vw"
                          type="date"
                          v-model="form.deadline"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
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
                  <el-row>
                    <el-col :span="8">
                      <el-form-item
                        :label="$t('label.PFANS5001FORMVIEW_REQUIREMENT')"
                        prop="requirement"
                      >
                        <el-input
                          :autosize="{ minRows: 3, maxRows: 4}"
                          :disabled="!disable"
                          style="width: 70vw"
                          type="textarea"
                          v-model="form.requirement"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS5001FORMVIEW_ENTRUST')" name="second">
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS5001FORMVIEW_TOOLSTYPE')" prop="toolstype">
                    <el-switch
                      :disabled="!disable"
                      active-color="#13ce66"
                      inactive-color="#13ce66"
                      active-value="1"
                      inactive-value="0"
                      active-text="内采"
                      inactive-text="通常"
                      v-model="form.toolstype">
                    </el-switch>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-show="form.toolstype === '1'">
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS5001FORMVIEW_ENTRUST')" prop="toolsorgs">
                    <org :disabled="!disable" :orglist="form.toolsorgs" orgtype="2" @getOrgids="setToolsorgs"
                         style="width:20vw"></org>
                  </el-form-item>
                </el-col>
                <!--                    add-ws-No.50-内采时，增加委托元项目-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS5001FORMVIEW_OPTIONSDATA')">
                    <el-select v-model="form.projectids" :disabled="!disable" style="width: 16vw" clearable
                    >
                      <el-option
                        v-for="item in optionsdata"
                        :key="item.value"
                        :label="item.lable"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <!--                    add-ws-No.50-内采时，增加委托元项目-->
              </el-row>
              <el-row v-show="form.toolstype === '0' || !form.toolstype">
                <el-col :span="8">
                  <el-form-item :error="errorLeader" :label="$t('label.PFANS5001FORMVIEW_ENTRUST')"
                                prop="errorLeader">
                    <div class="dpSupIndex" style="width: 20vw" prop="errorLeader">
                      <el-container>
                        <input class="content bg" v-model="form.entrust" :error="errorLeader"
                               :disabled="true"></input>
                        <el-button :disabled="!disable" icon="el-icon-search" @click="dialogTableVisible2 = true"
                                   size="small"></el-button>
                        <el-dialog :title="$t('label.PFANS5001FORMVIEW_ENTRUST')" :visible.sync="dialogTableVisible2"
                                   center size="50%"
                                   top="8vh" lock-scroll
                                   append-to-body>
                          <div style="text-align: center">
                            <el-row style="text-align: center;height: 90%;overflow: hidden">
                              <el-table
                                :data="gridData2.filter(data => !search || data.entrust.toLowerCase().includes(search.toLowerCase())
                                || data.thecompany.toLowerCase().includes(search.toLowerCase())
                                )"
                                height="500px" highlight-current-row style="width: 100%" tooltip-effect="dark"
                                @row-click="handleClickChange1">
                                <el-table-column show-overflow-tooltip property="entrust"
                                                 :label="$t('label.PFANS5001FORMVIEW_ENTRUST')"
                                                 width="240"></el-table-column>
                                <el-table-column show-overflow-tooltip property="thecompany"
                                                 :label="$t('label.PFANS6003FORMVIEW_THECOMPANY')"
                                                 width="240"></el-table-column>
                                <el-table-column
                                  align="right" width="230">
                                  <template slot="header" slot-scope="scope">
                                    <el-input
                                      v-model="search"
                                      size="mini"
                                      :placeholder="$t('label.PFANS1012FORMVIEW_USERNAME2')"/>
                                  </template>
                                </el-table-column>
                              </el-table>
                            </el-row>
                            <span slot="footer" class="dialog-footer">
                          <el-button type="primary" @click="submit1">{{$t('button.confirm')}}</el-button>
                        </span>
                          </div>
                        </el-dialog>
                      </el-container>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS6003FORMVIEW_THECOMPANY')">
                    <el-input :disabled="true" style="width:20vw" v-model="form.deployment"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.ASSETS1002VIEW_USERID')" prop="behalf">
                    <el-input :disabled="true" maxlength='20' style="width:20vw"
                              v-model="form.behalf"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-show="form.toolstype === '0' || !form.toolstype">
                <el-col :span="8">
                  <el-form-item
                    :label="$t('label.PFANS1017FORMVIEW_PREPAREFOR')"
                    prop="intelligence"
                  >
                    <el-input
                      :disabled="true"
                      style="width: 71vw"
                      type="textarea"
                      v-model="form.intelligence"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS5001FORMVIEW_DEVELOPMENTPLAN')" name="third">
              <el-form-item>
                <el-row>
                  <el-col :span="24">
                    <el-table :data="tableA" stripe border header-cell-class-name="sub_bg_color_blue"
                              style="width: 70vw">
                      <el-table-column :label="$t('label.PFANS5009FORMVIEW_PHASE')" align="center" width="150">
                        <template slot-scope="scope">
                          <dicselect
                            :code="code"
                            :data="scope.row.phase"
                            :disabled="!disable"
                            :no="scope.row"
                            style="width: 100%"
                            @change="getrole"
                          ></dicselect>
                        </template>
                      </el-table-column>

                      <el-table-column
                        :label="$t('label.PFANS5009FORMVIEW_STAGEPRODUCT')"
                        align="center" width="150"
                      >
                        <template slot-scope="scope">
                          <el-input :disabled="!disable" style="width: 100%"
                                    maxlength="20"
                                    v-model="scope.row.stageproduct"
                                    v-show="scope.row.showrow">
                          </el-input>
                          <dicselect :code="code1"
                                     :data="scope.row.stageproduct"
                                     :disabled="!disable"
                                     :no="scope.row"
                                     @change="getrole1"
                                     style="width: 100%" v-show="scope.row.showrow1">
                          </dicselect>
                          <dicselect :code="code4"
                                     :data="scope.row.stageproduct"
                                     :disabled="!disable"
                                     :no="scope.row"
                                     @change="getrole1"
                                     style="width: 100%" v-show="scope.row.showrow2">
                          </dicselect>
                          <dicselect :code="code5"
                                     :data="scope.row.stageproduct"
                                     :disabled="!disable"
                                     :no="scope.row"
                                     @change="getrole1"
                                     style="width: 100%" v-show="scope.row.showrow3">
                          </dicselect>
                        </template>
                      </el-table-column>
                      <!--                      预计人月-->
                      <el-table-column
                        :label="$t('label.PFANS5009FORMVIEW_ESTIMATEDWORK')"
                        align="center" width="150">
                        <template slot-scope="scope">
                          <el-input-number
                            :disabled="!disable"
                            :max="1000000000"
                            :min="0"
                            :no="scope.row"
                            :precision="2"
                            controls-position="right"
                            style="width: 100%"
                            v-model="scope.row.estimatedwork"
                          ></el-input-number>
                        </template>
                      </el-table-column>
                      <el-table-column
                        :label="$t('label.PFANS5009FORMVIEW_ESTIMATEDSTARTTIME')"
                        align="center"
                        width="160vm"
                      >
                        <template slot-scope="scope">
                          <el-date-picker
                            v-model="scope.row.estimatedstarttime"
                            :disabled="!disable"
                            type="date"
                            style="width: 100%"
                          ></el-date-picker>
                        </template>
                      </el-table-column>

                      <el-table-column
                        :label="$t('label.PFANS5009FORMVIEW_ESTIMATEDENDTIME')"
                        align="center"
                        width="160vm"
                      >
                        <template slot-scope="scope">
                          <el-date-picker
                            v-model="scope.row.estimatedendtime"
                            :disabled="!disable"
                            type="date"
                            style="width: 100%"
                          >
                          </el-date-picker>
                        </template>
                      </el-table-column>
                      <el-table-column
                        :label="$t('label.PFANS5009FORMVIEW_REMARKS')"
                        align="center">
                        <template slot-scope="scope">
                          <el-input
                            :no="scope.row"
                            :disabled="!disable"
                            v-model="scope.row.remarks"
                            style="width: 100%">
                          </el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.operation')" align="center" width="200">
                        <template slot-scope="scope">
                          <el-button
                            :disabled="!disable"
                            @click.native.prevent="deleteRow(scope.$index, tableA)"
                            plain
                            size="small"
                            type="danger"
                          >{{$t('button.delete')}}
                          </el-button>
                          <el-button
                            :disabled="!disable"
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
                                  style="width: 80vw" :cell-class-name="setPl">
                          <!--                       编号-->
                          <!--<el-table-column-->
                          <!--:label="$t('label.PFANS5001FORMVIEW_NUMBERS')"-->
                          <!--align="center"-->
                          <!--width="130">-->
                          <!--<template slot-scope="scope">-->
                          <!--<el-input-->
                          <!--:no="scope.row"-->
                          <!--:disabled="true"-->
                          <!--v-model="scope.row.number"-->
                          <!--style="width: 100%">-->
                          <!--</el-input>-->
                          <!--</template>-->
                          <!--</el-table-column>-->
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
                          <!--                    姓名-->
                          <el-table-column
                            :label="$t('label.PFANSUSERFORMVIEW_CUSTOMERNAME')"
                            align="center"
                            width="290">
                            <template slot-scope="scope">
                              <!--<el-input v-show="true" :disabled="!disabled" v-model="scope.row.nameN"-->
                              <!--@change="changeInt(scope.row)"-->
                              <!--:no="scope.row" style="width:15.7vw;margin-left: -4vw" size="small"></el-input>-->
                              <!--<el-input v-show="false" :disabled="!disabled" v-model="scope.row.name"-->
                              <!--@change="changeInt(scope.row)"-->
                              <!--:no="scope.row" style="width:14vw" size="small"></el-input>-->
                              <user
                                v-if="scope.$index == 0"
                                :disabled="!disable"
                                :no="scope.row"
                                :userlist="scope.row.name"
                                @close="getCitationUserid"
                                :multiple="multiple"
                                style="width: 80%"
                              ></user>
                              <user
                                v-else
                                :disabled="!disable"
                                :no="scope.row"
                                :userlist="scope.row.name"
                                @close="getCitationUserid"
                                :multiple="multiple"
                                :selectType="selectType1"
                                style="width: 80%"
                              ></user>
                            </template>
                          </el-table-column>
                  <!--         region add_qhr_20210810 添加rank字段-->
                          <!--          RANK-->
                          <el-table-column
                            :label="$t('label.PFANS5001FORMVIEW_RANK')"
                            align="center"
                            width="130">
                            <template slot-scope="scope">
                              <el-input
                                :no="scope.row"
                                :disabled="true"
                                v-model="scope.row.rank"
                                style="width: 100%">
                              </el-input>
                            </template>
                          </el-table-column>
                          <!--         endregion add_qhr_20210810 添加rank字段-->
                          <!--                    職務-->
                          <el-table-column
                            :label="$t('label.PFANSUSERVIEW_POST')"
                            align="center"
                            width="120">
                            <template slot-scope="scope">
                              <el-input
                                :no="scope.row"
                                :disabled="!disable"
                                v-model="scope.row.position"
                                style="width: 100%">
                              </el-input>
                            </template>
                          </el-table-column>
                          <!--         region add_qhr_20210810 添加报告者字段-->
                          <!--          报告者-->
                          <el-table-column
                            :label="$t('label.PFANS5001FORMVIEW_REPORTER')"
                            align="center"
                            width="250">
                            <template slot-scope="scope">
                              <user
                                :disabled="!disable"
                                :no="scope.row"
                                :userlist="scope.row.reporter"
                                @close="getReporter"
                                :multiple="multiple"
                                style="width: 80%"
                              ></user>
                            </template>
                          </el-table-column>
                          <!--         endregion add_qhr_20210810 添加报告者字段-->
                          <!--                进组时间-->
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
                          <!--                退出时间-->
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
                                plain v-show="scope.$index != 0"
                                size="small"
                                type="danger"
                              >{{$t('button.delete')}}
                              </el-button>
                              <el-button
                                :disabled="!disable"
                                @click="addRow1()"
                                plain v-show="scope.$index != 0"
                                size="small"
                                type="primary"
                              >{{$t('button.insert')}}
                              </el-button>
                            </template>
                          </el-table-column>
                        </el-table>
                      </el-tab-pane>

                      <!--                构内-->
                      <el-tab-pane :label="$t('label.PFANS5001FORMVIEW_WITHINSTRUCTURE')" name="second">
                        <el-table :data="tableC" stripe border header-cell-class-name="sub_bg_color_blue"
                                  style="width: 80vw">
                          <!--                      编号-->
                          <!--<el-table-column-->
                          <!--:label="$t('label.PFANS5001FORMVIEW_NUMBERS')"-->
                          <!--align="center"-->
                          <!--width="110">-->
                          <!--<template slot-scope="scope">-->
                          <!--<el-input-->
                          <!--:no="scope.row"-->
                          <!--:disabled="true"-->
                          <!--v-model="scope.row.number"-->
                          <!--style="width: 100%">-->
                          <!--</el-input>-->
                          <!--</template>-->
                          <!--</el-table-column>-->
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
                                    <input class="content bg" v-model="scope.row.name_id"
                                           :disabled="true"></input>
<!--                                    项目dialog 体制 合同优化添加分页 ztc fr-->
                                    <el-button :disabled="!disable" icon="el-icon-search"
                                               @click="dialogone(scope.row)"
                                               size="small"></el-button>
<!--                                    项目dialog 体制 合同优化添加分页 ztc to-->
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
                                            <!--<el-table-column property="number" fixed-->
                                            <!--:label="$t('label.PFANS5001FORMVIEW_NUMBERS')"-->
                                            <!--width="100"></el-table-column>-->
                                            <el-table-column property="expatriatesinfor_id" fixed v-if="false"
                                                             :label="$t('label.PFANSUSERFORMVIEW_CUSTOMERNAME')"
                                                             width="180"></el-table-column>
                                            <el-table-column property="expname" fixed
                                                             :label="$t('label.PFANSUSERFORMVIEW_CUSTOMERNAME')"
                                                             width="180"></el-table-column>
                                            <el-table-column property="suppliername"
                                                             :label="$t('label.PFANS5001FORMVIEW_COOPERATIONCOMPANY')"
                                                             width="200"></el-table-column>
                                            <el-table-column property="post1"
                                                             :label="$t('label.PFANSUSERVIEW_POST')"
                                                             width="150"></el-table-column>
                                            <el-table-column property="post" v-if="false"
                                                             :label="$t('label.PFANSUSERVIEW_POST')"
                                                             width="150"></el-table-column>
                                            <el-table-column property="suppliernameid" v-if="false"
                                                             :label="$t('label.PFANSUSERVIEW_POST')"
                                                             width="150"></el-table-column>
                                            <el-table-column
                                              align="right" width="180">
                                              <template slot="header" slot-scope="scope">
                                                <!--                                    项目dialog 体制 合同优化添加分页 ztc fr-->
                                                <el-input
                                                  v-model="search"
                                                  size="mini"
                                                  :placeholder="$t('label.PFANS5009FORMVIEW_IMPORT')"
                                                />
                                                <!--                                    项目dialog 体制 合同优化添加分页 ztc to-->
                                              </template>
                                            </el-table-column>
                                          </el-table>
                                          <!--                                    项目dialog 体制 合同优化添加分页 ztc fr-->
                                          <div class="pagination-container" style="padding-top: 2rem">
                                            <el-pagination :current-page.sync="listQuerySys.currentPage" :page-size="listQuerySys.pageSize"
                                                           :page-sizes="[20,30,50,9999]" :total="totalSysm" @current-change="handleCurrentChangeSys"
                                                           @size-change="handleSizeChangeSys" layout="slot,sizes, ->,prev, pager, next, jumper">
                                              <slot><span class="front Content_front"
                                                          style="padding-right: 0.5rem;font-weight: 400"></span></slot>
                                            </el-pagination>
                                          </div>
                                          <!--                                    项目dialog 体制 合同优化添加分页 ztc to-->
                                        </el-row>
                                        <span slot="footer" class="dialog-footer">
                                            <el-button type="primary" @click="submit()">{{$t('button.confirm')}}</el-button>
                                          </span>
                                      </div>
                                    </el-dialog>
                                  </el-container>
                                </div>
                              </el-col>
                            </template>
                          </el-table-column>
                          <!--         region add_qhr_20210810 添加rank字段-->
                          <!--          RANK-->
                          <el-table-column
                            :label="$t('label.PFANS5001FORMVIEW_RANK')"
                            align="center"
                            width="130">
                            <template slot-scope="scope">
                              <el-input
                                :no="scope.row"
                                :disabled="true"
                                v-model="scope.row.rank"
                                style="width: 100%">
                              </el-input>
                            </template>
                          </el-table-column>
                          <!--         endregion add_qhr_20210810 添加rank字段-->
                          <!--                    職務-->
                          <el-table-column
                            :label="$t('label.PFANSUSERVIEW_POST')"
                            align="center"
                            width="120">
                            <template slot-scope="scope">
                              <el-input
                                :no="scope.row"
                                :disabled="!disable"
                                maxlength="20"
                                v-model="scope.row.position"
                                style="width: 100%">
                              </el-input>
                            </template>
                          </el-table-column>
                          <!--         region add_qhr_20210810 添加报告者字段-->
                          <!--          报告者-->
                          <el-table-column
                            :label="$t('label.PFANS5001FORMVIEW_REPORTER')"
                            align="center"
                            width="250">
                            <template slot-scope="scope">
                              <user
                                :disabled="!disable"
                                :no="scope.row"
                                :userlist="scope.row.reporter"
                                @close="getReporter"
                                :multiple="multiple"
                                style="width: 80%"
                              ></user>
                            </template>
                          </el-table-column>
                          <!--         endregion add_qhr_20210810 添加报告者字段-->
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

                      <!--                构外-->
                      <el-tab-pane :label="$t('label.PFANS5001FORMVIEW_OUTSIDESTRUCTURE')" name="third">
                        <el-table :data="tableE" stripe border header-cell-class-name="sub_bg_color_blue"
                                  style="width: 80vw">
                          <!--       外注公司-->
                          <el-table-column
                            :label="$t('label.PFANS5001FORMVIEW_NOTECOMPANY')"
                            align="center"
                            width="220">
                            <template slot-scope="scope">
                              <el-input
                                :no="scope.row"
                                :disabled="true"
                                v-model="scope.row.company"
                                style="width: 100%">
                              </el-input>
                            </template>
                          </el-table-column>

                          <!--          窗口-->
                          <el-table-column
                            :label="$t('label.PFANS5001FORMVIEW_MADOGUCHI')"
                            align="center"
                            width="220">
                            <template slot-scope="scope">
                              <el-input
                                :no="scope.row"
                                :disabled="true"
                                v-model="scope.row.madoguchi"
                                style="width: 100%">
                              </el-input>
                            </template>
                          </el-table-column>

                          <!--          人月数-->
                          <el-table-column
                            :label="$t('label.PFANS5001FORMVIEW_NUMBEROFMONTHS')"
                            align="center"
                            width="150">
                            <template slot-scope="scope">
                              <el-input-number
                                :disabled="!disable"
                                :min="0"
                                :no="scope.row"
                                :precision="2"
                                controls-position="right"
                                style="width: 100%"
                                v-model="scope.row.numberofmonths"
                                @change="changeNum($event,scope.row,scope.$index)"
                              ></el-input-number>
                            </template>
                          </el-table-column>

                          <!--       对应合同人月数-->
                          <el-table-column
                            :label="$t('label.PFANS5001FORMVIEW_TOTALNUMBER')"
                            align="center"
                            width="120">
                            <template slot-scope="scope">
                              <el-input
                                :no="scope.row"
                                :disabled="true"
                                v-model="scope.row.totalnumber"
                                style="width: 100%">
                              </el-input>
                            </template>
                          </el-table-column>

                          <!--       每月管理规模-->
                          <el-table-column
                            :label="$t('label.PFANS5001FORMVIEW_MONTHLYSCALE')"
                            align="center"
                            width="120">
                            <template slot-scope="scope">
                              <el-input
                                :no="scope.row"
                                :disabled="true"
                                v-model="scope.row.monthlyscale"
                                style="width: 100%">
                              </el-input>
                            </template>
                          </el-table-column>

                          <!--          报告者-->
                          <el-table-column
                            :label="$t('label.PFANS5001FORMVIEW_REPORTER')"
                            align="center"
                            width="170">
                            <template slot-scope="scope">
                              <user
                                :disabled="!disable"
                                :no="scope.row"
                                :userlist="scope.row.reporter"
                                :multiple="multiple"
                                @close="getReporter"
                                style="width: 80%"
                              ></user>
                            </template>
                          </el-table-column>

                          <!--         开始时间-->
                          <el-table-column
                            :label="$t('label.PFANS5001FORMVIEW_STARTTIME')"
                            align="center"
                            prop="admissiontime"
                            width="180">
                            <template slot-scope="scope">
                              <el-date-picker
                                :disabled="true"
                                type="date"
                                :no="scope.row"
                                v-model="scope.row.admissiontime"
                                style="width: 9rem">
                              </el-date-picker>
                            </template>
                          </el-table-column>

                          <!--          结束时间-->
                          <el-table-column
                            :label="$t('label.PFANS5001FORMVIEW_ENDOFTIME')"
                            align="center"
                            prop="exittime"
                            width="180">
                            <template slot-scope="scope">
                              <el-date-picker
                                :disabled="true"
                                type="date"
                                :no="scope.row"
                                v-model="scope.row.exittime"
                                style="width: 9rem">
                              </el-date-picker>
                            </template>
                          </el-table-column>

                          <!--          操作-->
                          <el-table-column :label="$t('label.operation')" align="center" width="200">
                            <template slot-scope="scope">
                              <el-button
                                :disabled="!disable"
                                @click.native.prevent="deleteRow4(scope.$index, tableE)"
                                plain
                                size="small"
                                type="danger"
                              >{{$t('button.delete')}}
                              </el-button>
<!--                              add  ml  211214  构外新建按钮控制   from-->
                              <el-button
                                :disabled = "addOrNot(scope.$index)"
                                @click="addRow4()"
                                plain
                                size="small"
                                type="primary"
                              >{{$t('button.insert')}}
                              </el-button>
<!--add  ml  211214  构外新建按钮控制   to-->
                            </template>
                          </el-table-column>
                        </el-table>
                      </el-tab-pane>

                    </el-tabs>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-tab-pane>

            <!--            合同-->
            <el-tab-pane :label="$t('label.PFANS5001FORMVIEW_CONTRACT')" name="fifth">
              <el-form-item>
                <el-table :data="tableD" stripe border header-cell-class-name="sub_bg_color_blue"
                          style="width: 90vw" v-show="form.toolstype === '0' || !form.toolstype">
                  <el-table-column
                    :label="$t('label.PFANS5009FORMVIEW_CONTRACT')"
                    align="center"
                    width="200">
                    <template slot-scope="scope">
                      <el-col :span="8">
                        <div class="dpSupIndex" style="width:16vw">
                          <el-container>
                            <input class="content bg" v-model="scope.row.contract"
                                   :disabled="true" style="min-width: 50%;width: 50%"></input>
                            <el-button :disabled="!disable" icon="el-icon-search" @click="changecontract(scope.row)"
                                       size="small"></el-button>
                            <el-dialog :visible.sync="dialogTableVisible3" center
                                       size="50%"
                                       top="8vh" lock-scroll
                                       width="72%"
                                       append-to-body>
                              <div style="text-align: center">
                                <el-row style="text-align: center;height: 90%;overflow: hidden">
                                  <el-table
                                    :data="gridData3.filter(data => !search || data.contract.toLowerCase().includes(search.toLowerCase()))"
                                    height="500px" highlight-current-row style="width: 100%" tooltip-effect="dark"
                                    @row-click="handleClickChange2">
                                    <el-table-column property="contract"
                                                     :label="$t('label.PFANS1032FORMVIEW_CONTRACTNUMBER')"
                                                     width="160"></el-table-column>
                                    <el-table-column property="deployment" :label="$t('label.group')"
                                                     width="180"></el-table-column>
                                    <el-table-column property="contracttype"
                                                     :label="$t('label.PFANS1024VIEW_CONTRACTTYPE')"
                                                     width="150"></el-table-column>
                                    <!--<el-table-column property="applicationdate"-->
                                    <!--:label="$t('label.PFANS1024VIEW_APPLICATIONDATE')"-->
                                    <!--width="100"></el-table-column>-->
                                    <el-table-column property="claimdatetime"
                                                     :label="$t('label.PFANS1026VIEW_CONTRACTPERIOD')"
                                                     width="200"></el-table-column>
                                    <el-table-column
                                      align="right" width="230">
                                      <template slot="header" slot-scope="scope">
                                        <!--                                    项目dialog 体制 合同优化添加分页 ztc fr-->
                                        <el-input
                                          v-model="search"
                                          size="mini"
                                          :placeholder="$t('label.PFANS5009FORMVIEW_IMPORTCONT')"/>
                                        <!--                                    项目dialog 体制 合同优化添加分页 ztc to-->
                                      </template>
                                    </el-table-column>
                                  </el-table>
                                  <!--                                    项目dialog 体制 合同优化添加分页 ztc fr-->
                                  <el-pagination :current-page.sync="listQueryCont.currentPage" :page-size="listQueryCont.pageSize"
                                                 :page-sizes="[20,30,50,9999]" :total="totalCont" @current-change="handleCurrentChangeCont"
                                                 @size-change="handleSizeChangeCont" layout="slot,sizes, ->,prev, pager, next, jumper">
                                    <slot><span class="front Content_front"
                                                style="padding-right: 0.5rem;font-weight: 400"></span></slot>
                                  </el-pagination>
                                  <!--                                    项目dialog 体制 合同优化添加分页 ztc to-->
                                </el-row>
                                <span slot="footer" class="dialog-footer">
                                  <el-button type="primary"
                                             @click="submit2(scope.row)">{{$t('button.confirm')}}</el-button>
                                </span>
                              </div>
                            </el-dialog>
                          </el-container>
                        </div>
                      </el-col>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS5009FORMVIEW_THEME')"
                    align="center" width="180">
                    <template slot-scope="scope">
                      <el-input
                        :no="scope.row"
                        :disabled="true"
                        v-model="scope.row.theme"
                        style="width: 100%">
                      </el-input>
                    </template>
                  </el-table-column>
                  <!--                   add-ws-6/9-禅道任务080-->
                  <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMTYPE')" align="center" width="130">
                    <template slot-scope="scope">
                      <el-form-item>
                        <el-input :disabled="true" :no="scope.row" v-model="scope.row.claimtype">
                        </el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <!--                   add-ws-6/9-禅道任务080-->
                  <!--                   add-ws-6/9-禅道任务080-->
                  <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYDATE')" align="center"
                                   width="154px">
                    <template slot-scope="scope">
                      <el-date-picker :disabled="true" type="date" v-model="scope.row.deliveryfinshdate"
                                      style="width: 100%"></el-date-picker>
                    </template>
                  </el-table-column>
                  <!--                   add-ws-6/9-禅道任务080-->
                  <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMDATETIME')" align="center" prop="claimdatetime"
                                   width="280">
                    <template slot-scope="scope">
                      <el-date-picker unlink-panels
                                      class="bigWidth"
                                      :disabled="true"
                                      v-model="scope.row.workinghours"
                                      type="daterange"
                                      :end-placeholder="$t('label.enddate')"
                                      :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                                      :start-placeholder="$t('label.startdate')"
                                      style="width: 100%"
                      ></el-date-picker>
                    </template>
                  </el-table-column>
                  <!--                  add-ws-合同关联项目，分配金额-->
                  <el-table-column :label="$t('label.PFANS5001FORMVIEW_CONTRACTREQUESTAMOUNT')" align="center"
                                   width="180">
                    <template slot-scope="scope">
                      <el-input-number
                        :disabled="true"
                        :max="1000000000"
                        :min="0"
                        :precision="2"
                        controls-position="right"
                        style="width: 100%"
                        v-model="scope.row.contractrequestamount"
                      ></el-input-number>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS5001FORMVIEW_CHECKCONTRACTAMOUNT')" align="center"
                                   width="180">
                    <template slot-scope="scope">
                      <el-input-number
                        :disabled="!disable"
                        :max="1000000000"
                        :min="0"
                        :precision="2"
                        controls-position="right"
                        @change="changeRMB(scope.row)"
                        style="width: 100%"
                        v-model="scope.row.contractamount"
                      ></el-input-number>
                    </template>
                  </el-table-column>
                  <!--                  add-ws-合同关联项目，分配金额-->
                  <el-table-column :label="$t('label.operation')" align="center" width="150">
                    <template slot-scope="scope">
                      <el-button
                        :disabled="!disable"
                        @click.native.prevent="deleteRow3(scope.$index, tableD)"
                        plain
                        size="small"
                        type="danger"
                      >{{$t('button.delete')}}
                      </el-button>
                      <el-button
                        :disabled="!disable"
                        @click="addRow3()"
                        plain
                        size="small"
                        type="primary"
                      >{{$t('button.insert')}}
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-table :data="tableclaimtype" stripe border header-cell-class-name="sub_bg_color_blue"
                          style="width: 90vw" v-show="form.toolstype === '1'">
                  <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMTYPE')" align="center" prop="claimtype"
                                   width="130">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable" v-model="scope.row.claimtype">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYDATE')" align="center" prop="deliverydate"
                                   width="170">
                    <template slot-scope="scope">
                      <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.deliverydate"
                                      style="width: 9.5rem"></el-date-picker>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_COMPLETIONDATE')" align="center"
                                   prop="completiondate"
                                   width="170">
                    <template slot-scope="scope">
                      <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.completiondate"
                                      style="width: 9.5rem"></el-date-picker>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMDATE')" align="center" prop="claimdate"
                                   width="170">
                    <template slot-scope="scope">
                      <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.claimdate"
                                      style="width: 9.5rem"></el-date-picker>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_SUPPORTDATE')" align="center" prop="supportdate"
                                   width="170">
                    <template slot-scope="scope">
                      <el-date-picker :disabled="!disabled" type="date" v-model="scope.row.supportdate"
                                      style="width: 9.5rem"></el-date-picker>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')" align="center" prop="claimamount"
                                   width="190">
                    <template slot-scope="scope">
                      <el-input-number v-model="scope.row.claimamount" controls-position="right" style="width: 11rem"
                                       :disabled="!disabled" :min="0" :max="1000000000"
                                       :precision="2"></el-input-number>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.operation')" align="center" width="200">
                    <template slot-scope="scope">
                      <el-button
                        :disabled="!disable"
                        @click.native.prevent="deleteRowClaim(scope.$index, tableclaimtype)"
                        plain
                        size="small"
                        type="danger"
                      >{{$t('button.delete')}}
                      </el-button>
                      <el-button
                        :disabled="!disable"
                        @click="addRowClaim()"
                        plain
                        size="small"
                        type="primary"
                      >{{$t('button.insert')}}
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <el-table :data="tablecompound" stripe border header-cell-class-name="sub_bg_color_blue"
                          style="padding-top: 2vw" v-if="displaycompound">
                  <el-table-column
                    :label="$t('label.PFANS5009FORMVIEW_CONTRACT')"
                    align="center"
                    width="220%">
                    <template slot-scope="scope">
                      <el-input :disabled="true" v-model="scope.row.contractnumber"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS1024VIEW_CLAIMTYPE')"
                    align="center"
                    width="150">
                    <template slot-scope="scope">
                      <el-input :disabled="true" v-model="scope.row.claimtype"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')"
                    align="center"
                    width="370">
                    <template slot-scope="scope">
                      <el-input :disabled="true" v-model="scope.row.claimamount"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS5009FORMVIEW_AMOUNTALLOCATED')"
                    align="center"
                    width="270">
                    <template slot-scope="scope">
                      <el-input :disabled="true" v-model="scope.row.contractrequestamount"></el-input>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-tab-pane>
            <!--            其他管理工具-->
            <el-tab-pane :label="$t('label.PFANS5001FORMVIEW_TOOLS')" name="sixth">
              <el-form-item>
                <el-row>
                  <el-col :span="24">
                    <!-- 其他管理工具 -->
                    <el-row>
                      <el-col :span="8">
                        <template>
                          <el-form-item
                            :label="$t('label.PFANS5001FORMVIEW_TOOLS')"
                            prop="tools"
                          >
                            <el-checkbox-group v-model="checkList" :disabled="!disable">
                              <el-checkbox v-for="(item,index) in checkboxs" :key="index"
                                           :label="item.value1"></el-checkbox>

                            </el-checkbox-group>
                          </el-form-item>
                        </template>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-tab-pane>
            <!--            文件上传-->
            <el-tab-pane :label="$t('label.PFANS5001FORMVIEW_FILEUPLOAD')" name="seventh">
              <el-form-item>
                <el-row>
                  <el-col :span="8">
                    <el-upload
                      :disabled="!disable"
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
  import {getOrgInfoByUserId, getUserInfo, getUserInfoName} from '@/utils/customize';
  import {Message} from 'element-ui';
  import moment from 'moment';
  import org from '../../../components/org';
  import {downLoadUrl,getDictionaryInfo, uploadUrl} from '../../../../utils/customize';

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
              this.$t('label.PFANS5009FORMVIEW_PL'),
            ),
          );
          this.errorLeader =
            this.$t('normal.error_08') +
            this.$t('label.PFANS5009FORMVIEW_PL');
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
              this.$t('label.PFANS5009FORMVIEW_TL'),
            ),
          );
          this.errorManager =
            this.$t('normal.error_08') +
            this.$t('label.PFANS5009FORMVIEW_TL');
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
      return {
        // 项目dialog 体制 合同优化添加分页 ztc fr
        listQuerySys: {
          currentPage: 1,
          pageSize: 20,
        },
        listQueryCont: {
          currentPage: 1,
          pageSize: 50,
        },
        totalSysm: 0,
        totalCont: 0,
        // 项目dialog 体制 合同优化添加分页 ztc to
        //add-12/24-审批check
        defaultStart: false,
        //add-12/24-审批check
        workcode: '',
        //合同时间check
        contra: [],
        time: [],
        nowtime: '',
        //合同时间check
        //region scc add 选择合同时，获取合同号 from
        contNum: '',
        //endregion scc add 选择合同时，获取合同号 from
        tableclaimtype: [{
          claimtype: '',
          deliverydate: '',
          completiondate: '',
          claimdate: '',
          supportdate: '',
          claimamount: 0,
        }],
        //内采合同
        // centerorglist: '',
        // grouporglist: '',
        // teamorglist: '',
        errorcenter: '',
        errorgroup: '',
        checkmessage: '',
        errorgroup1: '',
        errorexpname: '',
        search: '',
        Numbers: '',
        gridData1: [],
        gridData2: [],
        gridData3: [],
        compounddata: [],
        disable: true,
        customerinfor: [],
        checkList: [],
        checkboxs: [],
        expatriates: [],
        disabled: true,
        error: '',
        errorLeader: '',
        errorManager: '',
        selectType: 'Single',
        selectType1: 'mult',
        userlist: '',
        userlist1: '',
        activeName: 'first',
        activeName2: 'first',
        buttonList: [],
        themeRow: '',
        themeinfor_id: '', //add_qhr_20210707 添加参数
        claimamount: '',
        workinghoursRow: '',
        currentRow: '',
        currentRow1: '',
        currentRow2: '',
        currentRow3: '',
        currentRow4: '',
        currentRow5: '',
        currentRow6: '',
        currentRow7: '',
        currentRow8: '',
        //add_qhr_20210810 添加字段
        currentRow9: '',
        //region scc add 9/16 选中行标记 from
        rowindextag: '',
        //endregion scc add 9/16 选中行标记 to
        //项目计划
        tableA: [
          {
            stageinformation_id: '',
            companyprojects_id: '',
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
            projectsystem_id: '',
            companyprojects_id: '',
            type: '0',
            number: '',
            company: '',
            name: this.$store.getters.userinfo.userid,
            //add_qhr_20210810 添加rank、报告者字段
            rank: this.$store.getters.userinfo.userinfo.rank,
            reporter: '',
            position: 'PL',
            admissiontime: '',
            exittime: '',
            rowindex: '',
            // nameN: getUserInfo(this.$store.getters.userinfo.userid).userinfo.customername,
          }, {
            projectsystem_id: '',
            companyprojects_id: '',
            type: '0',
            number: '',
            company: '',
            name: '',
            //add_qhr_20210810 添加rank、报告者字段
            rank: '',
            reporter: '',
            position: '',
            admissiontime: '',
            exittime: '',
            rowindex: '',
            // nameN: '',
          },
        ],
        //项目体制(外协)
        tableC: [
          {
            name_id: '',
            projectsystem_id: '',
            companyprojects_id: '',
            type: '1',
            number: '',
            company: '',
            name: '',
            //add_qhr_20210810 添加rank、报告者字段
            rank: '',
            reporter: '',
            position: '',
            admissiontime: '',
            exittime: '',
            rowindex: '',
          },
        ],
        //region scc add 构外
        tableE: [
        ],
        //endregion scc add 构外
        //合同
        tableD: [
          {
            contractnumbercount_id: '',
            //add-ws-6/9-禅道任务080
            deliveryfinshdate: '',
            claimtype: '',
            //add-ws-6/9-禅道任务080
            projectcontract_id: '',
            companyprojects_id: '',
            contract: '',
            theme: '',
            workinghours: '',
            //add-ws-合同关联项目，分配金额
            contractrequestamount: '',
            contractamount: '',
            //add-ws-合同关联项目，分配金额
            rowindex: '',
            themeinfor_id: '', //add_qhr_20210707 添加参数
          },
        ],
        tableAnt: [],
        //合同分配金额
        tablecompound: [],
        optionsdata: [],
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
                this.$t('label.PFANS5001FORMVIEW_LANGUAGE'),
              trigger: 'blur',
            },
          ],
          // 受託工数
          work: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANS5005VIEW_WORK'),
              trigger: 'blur',
            },
          ],
          //纳期
          deadline: [
            {
              required: true,
              message:
                this.$t('normal.error_08') +
                this.$t('label.PFANS5009FORMVIEW_DEADLINE'),
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
          deployment: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.user_name'),
              trigger: 'blur',
            },
          ],
          errorLeader: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS5001FORMVIEW_ENTRUST'),
              trigger: 'blur',
            },
          ],
          // 事业国别
          country: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS5001FORMVIEW_COUNTRY'),
              trigger: 'blur',
            },
          ],
          // 车载
          caron: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS5001FORMVIEW_CARON'),
              trigger: 'blur',
            },
          ],
          // 委託元（在華）
          // chentrust: [
          //   {
          //     required: true,
          //     message: this.$t('normal.error_08') + this.$t('label.PFANS5001FORMVIEW_CHENTRUST'),
          //     trigger: 'blur',
          //   },
          // ],
          // // 委託元（在華以外）
          // ouentrust: [
          //   {
          //     required: true,
          //     message: this.$t('normal.error_08') + this.$t('label.PFANS5001FORMVIEW_OUENTRUST'),
          //     trigger: 'blur',
          //   },
          // ],
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
        },
        baseInfo: {},
        form: {
          projectids: '',
          neice: '',
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
          toolstype: '',
          // 事业国别
          country: '',
          //车载
          caron: '',
          // 委托元
          entrust: '',
          //委托元（在华）
          chentrust: '',
          //委托元（在华以外）
          ouentrust: '',
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
        code3: 'PJ063',
        code4: 'PP014',
        code5: 'PP015',
        code6: 'PJ141',
        code7: 'PP021',
        code8: 'PP018',
        code9: 'PP019',
        code10: 'PP023',
        showrow: true,
        showrow1: false,
        showrow2: false,
        showrow3: false,
        result: '',
        result1: '',
        fileList: [],
        upload: uploadUrl(),
        canStart: false,
        displaycompound: false,
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
        this.checkboxs.push(dic[i]);
      }
      this.Listprojectids();
      this.getcustomerinfor();
      if (this.$route.params._id) {
        this.Numbers = 0;
        this.disable = this.$route.params.disabled;
        this.loading = true;
        this.$store
          .dispatch('PFANS5001Store/selectById', {companyprojectsid: this.$route.params._id})
          .then(response => {
            this.form = response.companyprojects;
            this.userlist = this.form.leaderid;
            this.userlist1 = this.form.managerid;
            this.centerorglist = this.form.center_id;
            this.grouporglist = this.form.group_id;
            this.teamorglist = this.form.team_id;
            if (this.form.tools != '') {
              this.checkList = JSON.parse(this.form.tools);
            }

            if (this.form.projecttype === 'PP001002') {
              this.workcode = 'W0008';
            } else {
              this.workcode = 'W0064';
            }
            //项目计划
            if (response.stageinformation.length > 0) {
              this.tableA = response.stageinformation;
              for (var i = 0; i < this.tableA.length; i++) {
                if (this.tableA[i].phase === '') {
                  this.tableA[i].showrow = true;
                  this.tableA[i].showrow1 = false;
                  this.tableA[i].showrow2 = false;
                  this.tableA[i].showrow3 = false;
                } else if (this.tableA[i].phase === 'PP012001') {
                  this.tableA[i].showrow = false;
                  this.tableA[i].showrow1 = true;
                  this.tableA[i].showrow2 = false;
                  this.tableA[i].showrow3 = false;
                } else if (this.tableA[i].phase === 'PP012002') {
                  this.tableA[i].showrow = false;
                  this.tableA[i].showrow1 = false;
                  this.tableA[i].showrow2 = true;
                  this.tableA[i].showrow3 = false;
                } else if (this.tableA[i].phase === 'PP012003') {
                  this.tableA[i].showrow = false;
                  this.tableA[i].showrow1 = false;
                  this.tableA[i].showrow2 = false;
                  this.tableA[i].showrow3 = true;
                } else if (this.tableA[i].phase === ' ') {
                  this.tableA[i].showrow = true;
                }
              }
            }

            //项目体制
            if (response.projectsystem.length > 0) {
              let tablec = [
                {
                  projectsystem_id: '',
                  companyprojects_id: '',
                  type: '1',
                  number: '',
                  company: '',
                  name: '',
                  //add_qhr_20210810 添加rank、报告者字段
                  rank: '',
                  reporter: '',
                  position: '',
                  admissiontime: '',
                  exittime: '',
                  rowindex: '',
                },
              ];
              let tableb = [
                {
                  projectsystem_id: '',
                  companyprojects_id: '',
                  type: '0',
                  number: '',
                  company: '',
                  name: '',
                  //add_qhr_20210810 添加rank、报告者字段
                  rank: '',
                  reporter: '',
                  position: '',
                  admissiontime: '',
                  exittime: '',
                  rowindex: '',
                },
              ];
              let tableE = [];//scc add tableE临时变量
              let flag1 = false;
              let flag2 = false;
              for (var i = 0; i < response.projectsystem.length; i++) {
                if (response.projectsystem[i].type === '0') {
                  flag1 = true;
                  tableb.push({
                    projectsystem_id: response.projectsystem[i].projectsystem_id,
                    companyprojects_id: response.projectsystem[i].companyprojects_id,
                    type: response.projectsystem[i].type,
                    number: response.projectsystem[i].number,
                    company: response.projectsystem[i].company,
                    name: response.projectsystem[i].name,
                    //add_qhr_20210810 添加rank、报告者字段
                    rank: response.projectsystem[i].rank,
                    reporter: response.projectsystem[i].reporter,
                    // nameN: getUserInfo(response.projectsystem[i].name).userinfo.customername,
                    position: response.projectsystem[i].position,
                    admissiontime: response.projectsystem[i].admissiontime,
                    exittime: response.projectsystem[i].exittime,
                    rowindex: response.projectsystem[i].rowindex,
                  });
                } else if (response.projectsystem[i].type === '1') {
                  flag2 = true;
                  //add-ws-value1非空判断
                  let letbudge = getDictionaryInfo(response.projectsystem[i].position);
                  if (letbudge) {
                    response.projectsystem[i].position = letbudge.value1;
                  }
                  //add-ws-value1非空判断
                  tablec.push({
                    projectsystem_id: response.projectsystem[i].projectsystem_id,//TODO 21/11/25 ??? projectsystem_id ?
                    companyprojects_id: response.projectsystem[i].companyprojects_id,
                    type: response.projectsystem[i].type,
                    number: response.projectsystem[i].number,
                    company: response.projectsystem[i].company,
                    name: response.projectsystem[i].name,
                    name_id: response.projectsystem[i].name_id,
                    //add_qhr_20210810 添加rank、报告者字段
                    rank: response.projectsystem[i].rank,
                    reporter: response.projectsystem[i].reporter,
                    position: response.projectsystem[i].position,
                    admissiontime: response.projectsystem[i].admissiontime,
                    exittime: response.projectsystem[i].exittime,
                    rowindex: response.projectsystem[i].rowindex,
                  });
                }
                //region scc add 获取构外 from
                else if (response.projectsystem[i].type === '2') {
                  tableE.push({
                    projectsystem_id:  response.projectsystem[i].projectsystem_id,
                    companyprojects_id: response.projectsystem[i].companyprojects_id,
                    type: response.projectsystem[i].type,
                    company: response.projectsystem[i].company,
                    reporter: response.projectsystem[i].reporter,
                    admissiontime: response.projectsystem[i].admissiontime,
                    exittime: response.projectsystem[i].exittime,
                    rowindex: response.projectsystem[i].rowindex,
                    madoguchi: response.projectsystem[i].madoguchi,
                    numberofmonths: response.projectsystem[i].numberofmonths,
                    monthlyscale: response.projectsystem[i].monthlyscale,
                    //构外添加合同每月平均金额 ztc fr
                    amountof: response.projectsystem[i].amountof,
                    //构外添加合同每月平均金额 ztc to
                    contractno: response.projectsystem[i].contractno,
                    totalnumber: response.projectsystem[i].totalnumber,
                  });
                }
                //endregion scc add 获取构外 to
              }
              if (flag1) {
                tableb.shift();
              }
              if (flag2) {
                tablec.shift();
              }
              this.tableB = tableb;
              this.tableC = tablec;
              this.tableE = tableE;
              //add-ws-修改判断tableB为一条的时候添加空行
              let checktableb = 0;
              for (var i = 0; i < this.tableB.length; i++) {
                checktableb = checktableb + 1;
              }
              if (checktableb === 1) {
                this.addRow1();
              }
              //add-ws-修改判断tableB为一条的时候添加空行
            }
            /*else{
                this.tableB = [
                    {
                        projectsystem_id: '',
                        companyprojects_id: '',
                        type: '0',
                        number: '',
                        company: '',
                        name: '',
                        position: '',
                        admissiontime: '',
                        exittime: '',
                        rowindex: '',
                    },
                ];
                this.tableC = [
                    {
                        projectsystem_id: '',
                        companyprojects_id: '',
                        type: '1',
                        number: '',
                        company: '',
                        name: '',
                        position: '',
                        admissiontime: '',
                        exittime: '',
                        rowindex: '',
                    },
                ];
            }*/
            //项目合同
            if (response.projectcontract.length > 0) {
              let tabled = [];
              for (let i = 0; i < response.projectcontract.length; i++) {
                tabled.push({
                  contractnumbercount_id: response.projectcontract[i].contractnumbercount_id,
                  contractamount: response.projectcontract[i].contractamount,
                  theme: response.projectcontract[i].theme,
                });
              }
              this.tableD = tabled;
            }
            if (response.projectcontract.length > 0) {
              for (let p = 0; p < response.projectcontract.length; p++) {
                this.tableAnt.push(response.projectcontract[p].contractnumbercount_id);
              }
              this.getContractNumber();
            }

            //ADD 03-18 ,委托元为内采时，合同可自行添加请求金额
            if (response.contractnumbercount.length > 0) {
              this.tableclaimtype = response.contractnumbercount;
            }
            //ADD 03-18 ,委托元为内采时，合同可自行添加请求金额 END

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
            if (this.form.status === '4') {
              this.disabled = true;
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
        //add_qhr_20210810 添加rank、报告者字段
        this.tableB[0].rank = getDictionaryInfo(this.tableB[0].rank).value1;
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
      getContractNumber() {
        this.loading = true;
        for (let h = 0; h < this.tableAnt.length; h++) {
          this.$store
            .dispatch('PFANS5001Store/selectConnumList', {'contractnumbercount_id': this.tableAnt[h]})
            .then(response => {
              if (response.claimdatetimeqh !== '' && response.claimdatetimeqh !== null) {
                let claimdatetime = response.claimdatetimeqh;
                let claimdatetim = claimdatetime.slice(0, 10);
                let claimdatetime1 = claimdatetime.slice(claimdatetime.length - 10);
                response.claimdatetimeqh = [claimdatetim, claimdatetime1];
              }

              this.tableD[h].deliveryfinshdate = response.deliveryfinshdate,
                this.tableD[h].claimtype = response.claimtype,
                this.tableD[h].contractrequestamount = response.claimamount,
                this.tableD[h].contract = response.contractnumber,
                this.tableD[h].workinghours = response.claimdatetimeqh
                this.loading = false;
            });
        }
      },
      // add-ws-No.50-内采时，增加委托元项目
      Listprojectids() {
        this.optionsdata = [];
        this.loading = true;
        this.$store
          .dispatch('PFANS5001Store/getFpans5001List2', {})
          .then(response => {
            for (let c = 0; c < response.length; c++) {
              if (response[c].neice === '1') {
                this.optionsdata.push({
                  value: response[c].companyprojects_id,
                  lable: response[c].numbers + '_' + response[c].project_name,
                });
              }
            }
            this.loading = false;
          }).catch(error => {
          this.$message.error({
            message: error,
            type: 'error',
            duration: 5 * 1000,
          });
          this.loading = false;
        });
      },
      // add-ws-No.50-内采时，增加委托元项目
      //ADD-WS-合同分配金额不能大于合同分配金额
      changeRMB(row) {
        this.checkmessage = 0;
        if (row.contractrequestamount < row.contractamount) {
          this.checkmessage = 1;
          Message({
            message: this.$t('label.PFANS5001FORMVIEW_CHECKERRORMESSAGE'),
            type: 'error',
            duration: 5 * 1000,
          });
        }
      },
      //ADD-WS-合同分配金额不能大于合同分配金额
      setPl({row, column, rowIndex, columnIndex}) {
        if (row.position != '' && row.position != null) {
          if (row.position.toUpperCase() === 'PL') {
            return 'PlStyle';
          }
        }

      },
      checkRequire() {
        if (!this.form.group_id ||
          !this.form.center_id ||
          !this.form.project_name ||
          !this.form.project_namejp ||
          !this.form.leaderid ||
          !this.form.managerid ||
          !this.form.languages ||
          !this.form.projecttype ||
          !this.form.field ||
          !this.form.country ||
          !this.form.chentrust ||
          !this.form.ouentrust ||
          !this.form.caron ||
          !this.form.startdate ||
          !this.form.enddate ||
          !this.form.work ||
          !this.form.deadline
        ) {
          this.activeName = 'first';
        } else if (!this.tableB[0].name && !this.tableC[0].name) {
          this.activeName = 'fourth';
        } else if (!this.tableD[0].projectcontract_id) {
          this.activeName = 'fifth';
        }
      },
      setdisabled(val) {
        if (this.$route.params.disabled) {
          this.disable = val;
        }
      },
      setToolsorgs(val) {
        this.form.toolsorgs = val;
        // add-ws-No.50-内采时，增加委托元项目
        this.optionsdata = [];
        this.loading = true;
        this.$store
          .dispatch('PFANS5001Store/getFpans5001List2', {})
          .then(response => {
            for (let c = 0; c < response.length; c++) {
              if (this.form.toolsorgs) {
                if (response[c].neice === '1' && response[c].group_id === this.form.toolsorgs) {
                  this.optionsdata.push({
                    value: response[c].companyprojects_id,
                    lable: response[c].numbers + '_' + response[c].project_name,
                  });
                }
              } else {
                if (response[c].neice === '1') {
                  this.optionsdata.push({
                    value: response[c].companyprojects_id,
                    lable: response[c].numbers + '_' + response[c].project_name,
                  });
                }
              }

            }
            this.loading = false;
          }).catch(error => {
          this.$message.error({
            message: error,
            type: 'error',
            duration: 5 * 1000,
          });
          this.loading = false;
        });
        // add-ws-No.50-内采时，增加委托元项目
      },
      // 项目dialog 体制 合同优化添加分页 ztc fr
      getcontract() {
        let params = {
          currentPage: this.listQueryCont.currentPage,
          pageSize: this.listQueryCont.pageSize,
        }
        this.$store
          .dispatch('PFANS1026Store/getforContDiaLog', params)
          .then(response => {
            this.gridData3 = [];
            // this.compounddata = [];
            for (let i = 0; i < response.resultList.length; i++) {
              if (response.resultList[i].claimdatetime !== '' && response.resultList[i].claimdatetime !== null && response.resultList[i].claimdatetime !== undefined) {
                let claimdatetime = response.resultList[i].claimdatetime;
                let claimdatetim = claimdatetime.slice(0, 10);
                let claimdatetime1 = claimdatetime.slice(claimdatetime.length - 10);
                response.resultList[i].claimdatetime = [claimdatetim + ' ~ ' + claimdatetime1];
                response.resultList[i].entrypayment = [claimdatetim, claimdatetime1];
              }
              //resign  add  scc  20200202  选择合同页面显示合同时间 from
              else if (response.resultList[i].contractdate !== '' && response.resultList[i].contractdate !== null && response.resultList[i].contractdate !== undefined){
                let contractdate = response.resultList[i].contractdate;
                let contractdate_st_end = contractdate.split('~');
                response.resultList[i].claimdatetime = [contractdate_st_end[0] + '~' + contractdate_st_end[1]];
              }
              //end resign  add  scc  20200202  选择合同页面显示合同时间 to
              //add-ws-value1非空判断
              let letbudge = getDictionaryInfo(response.resultList[i].contracttype);
              if (letbudge) {
                response.resultList[i].contracttype = letbudge.value1;
              }
              //add-ws-value1非空判断
              var vote2 = {};
              vote2.contract = response.resultList[i].contractnumber;
              vote2.deployment = response.resultList[i].deployment;
              vote2.contracttype = response.resultList[i].contracttype;
              vote2.applicationdate = moment(response.resultList[i].applicationdate).format('YYYY-MM-DD');
              vote2.state = response.resultList[i].state;
              vote2.claimdatetime = response.resultList[i].claimdatetime;
              vote2.entrypayment = response.resultList[i].entrypayment;
              vote2.theme = response.resultList[i].theme;
              //add_qhr_20210707 添加字段参数
              vote2.themeinfor_id = response.resultList[i].themeinfor_id;
              vote2.claimamount = response.resultList[i].claimamount;
              this.gridData3.push(vote2);
            }
            this.totalCont = response.total;
            // this.compounddata = response.contractcompound;
          })
          .catch(error => {
            this.$message.error({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
          });
        // 项目dialog 体制 合同优化添加分页 ztc to
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
              vote.liableperson = response[i].liableperson;
              vote.thecompany = response[i].thecompany;
              vote.remarks = response[i].remarks;
              this.gridData2.push(vote);
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

      getCenterId(val) {
        this.form.center_id = val;
        if (!val || this.form.center_id === '') {
          this.errorcenter = this.$t('normal.error_08') + 'center';
        } else {
          this.errorcenter = '';
        }
      },
      // 可以进行重复选择，只需要做进组退组时间不重复的check ztc fr
      // getGroupId(val) {
      //   this.getOrgInformation(val);
      //   if (this.form.center_id === '') {
      //     this.errorgroup = this.$t('normal.error_08') + 'center';
      //   } else {
      //     this.errorgroup = '';
      //   }
      // },
      // 可以进行重复选择，只需要做进组退组时间不重复的check ztc to
      getTeamId(val) {
        this.getOrgInformation(val);
        if (this.form.center_id === '') {
          this.errorgroup = this.$t('normal.error_08') + 'center';
        } else {
          this.errorgroup = '';
        }
      },
      getGroupId(val) {
        this.getOrgInformation(val);
        if (this.form.group_id === '') {
          this.errorgroup1 = this.$t('normal.error_08') + 'group';
        } else {
          this.errorgroup1 = '';
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
      getCitationUserid(userlist, row) {
        //人员userid值集合
        let us = userlist.split(',');
        if (us.length > 1) {
          row.name = null;
          let newus = [];
          for (let i = 0; i < us.length; i++)
          {
            let tableb = this.tableB.filter(item=>item.name === us[i]);
            if (tableb.length === 0)
            {
              newus.push(us[i]);
            }
          }
          for (let i = 0; i < newus.length; i++)
          {
            let position = '';
            let rank = '';
            let lst = getUserInfo(newus[i]);
            if (lst.userinfo.post) {
              position = getDictionaryInfo(lst.userinfo.post).value1;
            }
            if (lst.userinfo.rank) {
              rank = getDictionaryInfo(lst.userinfo.rank).value1;
            }
            this.tableB.push({
              name: newus[i],
              rank: rank,
              reporter: '',
              position: position,
              admissiontime: '',
              exittime: '',
              number: '',
              type: '0',
              company: '',
            });
          }
          //保留人名不为空的数据
          this.tableB = this.tableB.filter(itam => itam.name !== null && itam.name !== '');
        } else{
          if (userlist !='')
          {
            row.name = null;
            // 可以进行重复选择，只需要做进组退组时间不重复的check ztc fr
            // if (this.tableB.filter(item=>item.name === userlist).length === 0)
            // {
               row.name = userlist;
              if (row.name != null && row.name !== '') {
                let lst = getUserInfo(row.name);
                if (lst.userinfo.post) {
                  row.position = getDictionaryInfo(lst.userinfo.post).value1;
                }
                if (lst.userinfo.rank) {
                  row.rank = getDictionaryInfo(lst.userinfo.rank).value1;
                }
                row.number = lst.userinfo.jobnumber;
                let lst1 = getOrgInfoByUserId(row.name);
                row.company = lst1.groupNmae;
              }
            // }
            // 可以进行重复选择，只需要做进组退组时间不重复的check ztc fr
            //保留人名不为空的数据
            //region scc del 9/26 变更体制初始第一条数据，空行数据不会删除，空行按钮需要 from
            // this.tableB = this.tableB.filter(itam => itam.name !== null && itam.name !== '');
            //endregion scc del 9/26 变更体制初始第一条数据，空行数据不会删除，空行按钮需要 to
          }
          else
          {
            row.name = null;
            row.position = '';
            row.rank ='';
          }
        }
      },
      //upd ccm 20210817 PJ起案体制选择氏名时显示问题修改 to

      getReporter(userlist, row) {
        //upd ccm 20210817 PJ起案体制选择报告者进行体制内人员check fr
        row.reporter = userlist;
        if (userlist!=null && userlist !='' && userlist !=undefined)
        {
          if(this.tableB.filter(item => item.name === userlist).length === 0)
          {
            if (row.type === '0')
            {
              Message({
                message: this.$t(row.name == null || row.name == '' ? '': getUserInfo(row.name).userinfo.customername)
                  + this.$t(' ') + this.$t('label.PFANS5001FORMVIEW_REPORTERERROR'),
                type: 'error',
                duration: 5 * 1000,
              });
            }
            else
            {
              Message({
                message: this.$t(row.name_id || '')
                  + this.$t(' ') + this.$t('label.PFANS5001FORMVIEW_REPORTERERROR'),
                type: 'error',
                duration: 5 * 1000,
              });
            }
          }
        }
        //upd ccm 20210817 PJ起案体制选择报告者进行体制内人员check to
      },
      getUseridsInput(val, row) {
        row.name = val;
      },
      getUserids(val) {
        this.tableB[0].name = val;
        //region scc add 9/26 PJ起案体制rank自动带出 from
        let lst1 = getUserInfo(this.tableB[0].name);
        if (lst1.userinfo.rank) {
          this.tableB[0].rank = getDictionaryInfo(lst1.userinfo.rank).value1;
        }
        //endregion scc add 9/26 PJ起案体制rank自动带出 to
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
            this.$t('label.PFANS5009FORMVIEW_PL');
        } else {
          this.errorLeader = '';
        }
      },

      getUserids1(val) {
        this.tableB[1].name = val;
        this.tableB[1].position = 'TL';
        this.userlist1 = val;
        this.form.managerid = val;
        if (
          !this.form.managerid ||
          this.form.managerid === '' ||
          val === 'undefined'
        ) {
          this.errorManager =
            this.$t('normal.error_08') +
            this.$t('label.PFANS5009FORMVIEW_TL');
        } else {
          this.errorManager = '';
        }
      },
      handleClickChange(val) {
        this.currentRow = val.number;
        //add-ws-数据库id存的是name名，外协关联修改
        this.currentRow1 = val.account;
        //add-ws-数据库id存的是name名，外协关联修改
        this.currentRow2 = val.suppliername;
        this.currentRow3 = val.post;
        this.currentRow4 = val.supplierinfor_id;
        this.currentRow5 = val.expname;
        //add_qhr_20210810 添加rank、报告者字段
        // 项目dialog 体制 合同优化添加分页 ztc fr
        this.currentRow9 = val.rn;
        // 项目dialog 体制 合同优化添加分页 ztc to
      },
      //region scc upd 9/16 根据当前行进行数据跟新 from
      submit() {
        for(let i = 0; i < this.tableC.length; i++){
          if(this.tableC[i].rowindex === this.rowindextag || this.tableC[i].rowindex === Number(this.rowindextag)){
            this.tableC[i].number = this.currentRow;
            this.tableC[i].name = this.currentRow1;
            //add-ws-数据库id存的是name名，外协关联修改
            this.tableC[i].name_id = this.currentRow5;
            //add-ws-数据库id存的是name名，外协关联修改
            this.tableC[i].company = this.currentRow2;
            this.tableC[i].position = this.currentRow3;
            this.tableC[i].suppliernameid = this.currentRow4;
            //add_qhr_20210810 添加rank、报告者字段
            this.tableC[i].rank = getDictionaryInfo(this.currentRow9).value1;
          }
        }
        this.dialogTableVisible1 = false;
      },
      //endregion scc upd 9/16 根据当前行进行数据跟新 to
      handleClickChange1(val) {
        this.currentRow = val.entrust;
        this.currentRow6 = val.liableperson;
        this.currentRow7 = val.thecompany;
        this.currentRow8 = val.remarks;
      },
      submit1() {
        this.form.entrust = this.currentRow;
        this.form.deployment = this.currentRow7;
        this.form.behalf = this.currentRow6;
        this.form.intelligence = this.currentRow8;
        this.dialogTableVisible2 = false;
      },
      //合同
      handleClickChange2(val) {
        this.claimamount = val.claimamount;
        this.currentRow = val.contract;
        this.themeRow = val.theme;
        this.themeinfor_id = val.themeinfor_id;  //add_qhr_20210707 添加参数
        this.workinghoursRow = val.entrypayment;
      },
      //add-ws-6/9-禅道任务080
      //根据合同号查询合同期间 scc
      findCon(){
        if(this.contra.length > 0) {
          //获取合同号字符串 scc
          let contra = "";
          for (let i = 0; i < this.contra.length; i++) {
            if (i === this.contra.length - 1) {
              contra += this.contra[i];
            } else {
              contra += this.contra[i] + ",";
            }
          }
          //获取合同号字符串 scc
          //后台请求合同号对应的合同期间 scc
          this.loading = true;
          this.$store
            .dispatch('PFANS1026Store/getContranumber', {'contra': contra})
            .then(response => {
              this.time = [];
              if (response.length > 0) {
                for (let i = 0; i < response.length; i++) {
                  this.time[i] = response[i];
                }
              }
            });
          this.loading = false;
        }else{
          this.time = [];
        }
        //后台请求合同号对应的合同期间 scc
      },
      //根据合同号查询合同期间 scc
      changecontract(row) {
        // 项目dialog 体制 合同优化添加分页 ztc fr
        this.getcontract();
        // 项目dialog 体制 合同优化添加分页 ztc to
        let table = this.tableD;
        let check = [];
        let checktable = 0;
        let checktable1 = 0;
        this.dialogTableVisible3 = true;
        this.contra = [];
        //获取当前表中已有合同 scc
        for(let i = 0; i < this.tableD.length; i++){
          if(!this.tableD[i].contract){
            continue;
          }
          //合同号去重 scc
          this.contra = this.contra.filter(item => item != this.tableD[i].contract);
          this.contra[this.contra.length] = this.tableD[i].contract;
          //合同号去重 scc
        }
        this.findCon();
        //获取当前表中已有合同 scc
        for (let a = 0; a < table.length; a++) {
          if (row.contract != '') {
            if (table[a].contract != row.contract) {
              checktable1 = checktable1 + 1;
              check.push({
                contractnumbercount_id: table[a].contractnumbercount_id,
                deliveryfinshdate: table[a].deliveryfinshdate,
                claimtype: table[a].claimtype,
                contract: table[a].contract,
                theme: table[a].theme,
                themeinfor_id: table[a].themeinfor_id,  //add_qhr_20210707 添加参数
                workinghours: table[a].workinghours,
                contractrequestamount: table[a].contractrequestamount,
                contractamount: table[a].contractamount,
              });
            } else {
              checktable = checktable + 1;
            }
          }
        }
        if (checktable === this.tableD.length) {
          this.tableD = [{
            contractnumbercount_id: '',
            deliveryfinshdate: '',
            claimtype: '',
            projectcontract_id: '',
            companyprojects_id: '',
            contract: '',
            theme: '',
            themeinfor_id: '', //add_qhr_20210707 添加参数
            workinghours: '',
            contractrequestamount: '',
            contractamount: '',
            rowindex: '',
          }];
        } else {
          if (checktable1 != 0) {
            this.tableD = check;
          }
        }
      },
      //add-ws-6/9-禅道任务080
      submit2(row) {
        //add-ws-6/9-禅道任务080
        let table = [];
        let tabled = [];
        this.loading = true;
        this.$store
          .dispatch('PFANS1026Store/get2', {'contractnumber': this.currentRow})
          .then(response => {
            let contractnumbercount = response.contractnumbercount;
            //判断此次选中合同中的回数 scc
            var intercept = response.contractnumbercount.length;
            //判断此次选中合同中的回数 scc
            if (contractnumbercount.length > 0) {
              for (let i = 0; i < contractnumbercount.length; i++) {
                if (contractnumbercount[i].claimdatetimeqh !== '' && contractnumbercount[i].claimdatetimeqh !== null && contractnumbercount[i].claimdatetimeqh !== undefined) {
                  let claimdatetime = contractnumbercount[i].claimdatetimeqh;
                  let claimdatetim = claimdatetime.slice(0, 10);
                  let claimdatetime1 = claimdatetime.slice(claimdatetime.length - 10);
                  contractnumbercount[i].claimdatetimeqh = [claimdatetim, claimdatetime1];
                }
                table.push({
                  contractnumbercount_id: contractnumbercount[i].contractnumbercount_id,
                  deliveryfinshdate: contractnumbercount[i].deliverydate,
                  claimtype: contractnumbercount[i].claimtype,
                  contract: this.currentRow,
                  theme: this.themeRow,
                  themeinfor_id: this.themeinfor_id,  //add_qhr_20210707 添加参数
                  workinghours: contractnumbercount[i].claimdatetimeqh,
                  contractrequestamount: contractnumbercount[i].claimamount,
                  contractamount: '',
                });
              }
              tabled = this.tableD;
              this.tableD = tabled.concat(table);
            }
            //获取选取的当前合同是否存在延止日期，如果存在，改变当前合同的截至日期为延止日期 scc
            let contradeta = response.contractapplication;
            //region scc add 选择合同时，获取合同号 from
            this.contNum = contradeta[0].contractnumber;
            //endregion scc add 选择合同时，获取合同号 to
            //如果合同没有contractdate，取claimdatetime scc
            if(contradeta.length > 0){
              let timec = "";
              if(contradeta[0].contractdate) {
                timec = contradeta[0].contractdate;//字符串
              }else{
                timec = contradeta[0].claimdatetime;//字符串
              }
              //如果合同没有contractdate，取claimdatetime scc
              //如果存在延止日期，延长合同期限至延止日期 scc
              let extensdate = contradeta[0].extensiondate;
              if(extensdate){
                let time1 = timec.split('~');//数组
                this.nowtime = time1[0] + "~" + extensdate;
              } else{
                this.nowtime = timec;
              }
            }
            //如果存在延止日期，延长合同期限至延止日期 scc
            //获取选取的当前合同是否存在延止日期，如果存在，改变当前合同的截至日期为延止日期 scc
              if (this.nowtime) {
                var areatime = this.nowtime.split('~');
                var opentime = areatime[0];
                var closetime = areatime[1];
                ////当前选中合同日期转成时间对象 scc
                var date1 = new Date(opentime);
                var date2 = new Date(closetime);
                //当前选中合同日期转成时间对象 scc
              }
              if(this.time.length > 0) {
                for (let i = 0; i < this.time.length; i++) {
                  let contra = this.time[i].split("~");
                  ////每条合同的时间点 scc
                  let date3 = new Date(contra[0]);
                  let date4 = new Date(contra[1]);
                  //判断新添加合同的两个时间点，在不在已有合同回数时间的区间内 scc
                  let e1 = ((date1.getTime() > date3.getTime() && date1.getTime() < date4.getTime()) || (date2.getTime() > date3.getTime() && date2.getTime() < date4.getTime()));
                  //判断新添加合同的两个时间点，与已有合同回数的时间点是否重合 scc
                  let e2 = (date1.getTime() === date3.getTime() || date1.getTime() === date4.getTime() || date2.getTime() === date3.getTime() || date2.getTime() === date4.getTime());
                  //判断新添加合同的两个时间点，是不是包含或者被包含于已有合同回数时间 scc
                  let e3 = ((date1.getTime() < date3.getTime() && date2.getTime() > date4.getTime()));
                  //判断上述条件是否为真 scc
                  let e4 = (e1 || e2 || e3);
                  //提示错误信息 scc
                  if (e4) {
                    Message({
                      message: this.$t('normal.info_27'),
                      type: 'error',
                      duration: 5 * 1000,
                    });
                    this.tableD.splice(this.tableD.length - intercept, intercept);
                    this.loading = false;
                    return;
                    // break;
                  }
                  //提示错误信息 scc
                }
              }
            this.forDetail(this.contNum);
            this.loading = false;
          });
        for (let a = 0; a < this.tableD.length; a++) {
          if (this.tableD[a].contract === '') {
            this.tableD.splice(a, 1);
          }
        }
        //add-ws-6/9-禅道任务080
        this.dialogTableVisible3 = false;
        this.search = '';
        //region复合合同金额分配
        // if (this.compounddata.length > 0) {
        //   let dic = this.compounddata.filter(item => item.contractnumber === row.contract
        //     && item.group_id === this.form.group_id);
        //   let claimamount = 0;
        //   for (let dtem of dic) {
        //     //add-ws-合同关联项目，分配金额
        //     claimamount = claimamount + Number(dtem.contractrequestamount);
        //     this.tablecompound.push({
        //       contractnumber: dtem.contractnumber,
        //       claimtype: dtem.claimtype,
        //       claimamount: dtem.claimamount,
        //       contractrequestamount: dtem.contractrequestamount,
        //     });
        //   }
        //   if (this.tablecompound.length > 0) {
        //     row.contractrequestamount = claimamount;
        //     this.displaycompound = true;
        //   }
        // }
        //endregion
      },
      getprojecttype(val1) {
        this.form.projecttype = val1;
        if (this.form.projecttype === 'PP001002') {
          this.workcode = 'W0008';
        } else {
          this.workcode = 'W0064';
        }
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
      getchentrust(val1) {
        this.form.chentrust = val1;
      },
      getouentrust(val1) {
        this.form.ouentrust = val1;
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
        } else if (val.state === '2') {
          this.form.status = '4';
        }
        // this.form.status = '2';
        this.buttonClick('update');
      },
      end() {
        this.form.status = '3';
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
          file.url = file.url.replace('%', '%25');
          file.url = file.url.replace('#', '%23');
          file.url = file.url.replace('&', '%26');
          file.url = file.url.replace('+', '%2B');
          file.url = file.url.replace('=', '%3D');
          file.url = file.url.replace('?', '%3F');
          var url = downLoadUrl(file.url);
          window.open(url);
        }
      },
      fileSuccess(response, file, fileList) {
        if (response.data == 'upload_success') {
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
        } else {
          Message({
            message: this.$t('label.PFANS2016FORMVIEW_FILEERROR'),
            type: 'error',
            duration: 5 * 1000,
          });
          this.form.uploadfile = '';
          this.$refs.upload.clearFiles();
        }
      },
      //开发计划
      addRow() {
        this.tableA.push({
          stageinformation_id: '',
          companyprojects_id: '',
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
            companyprojects_id: '',
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
          projectsystem_id: '',
          companyprojects_id: '',
          type: '0',
          number: '',
          company: '',
          name: '',
          // nameN: '',
          //add_qhr_20210810 添加rank、报告者字段
          rank: '',
          reporter: '',
          position: '',
          admissiontime: '',
          exittime: '',
          rowindex: '',
        });
      },
      deleteRow1(index, rows) {
        if (index === 1) {
          rows[1].name = '';
          // rows[1].nameN = '';
          //add_qhr_20210810 添加rank、报告者字段
          rows[1].rank = '';
          rows[1].reporter = '';
          rows[1].position = '';
          rows[1].admissiontime = '';
          rows[1].exittime = '';
        }
        if (rows.length > 2) {
          rows.splice(index, 1);
        }
      },
      //项目体制(外协)
      addRow2() {
        //region scc add 9/16 上一条数据的index from
        let num = this.tableC[this.tableC.length - 1].rowindex;
        //endregion scc add 9/16 上一条数据的index to
        this.tableC.push({
          projectsystem_id: '',
          companyprojects_id: '',
          type: '1',
          number: '',
          company: '',
          name: '',
          //add_qhr_20210810 添加rank、报告者字段
          rank: '',
          reporter: '',
          suppliernameid: '',
          position: '',
          admissiontime: '',
          exittime: '',
          //region scc add 9/16 添加行时跟新index from
          rowindex: num + 1,
          //endregion scc add 9/16 添加行时跟新index to
        });
      },
      // 体制-社内
      deleteRow2(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        } else {
          this.tableC = [{
            projectsystem_id: '',
            companyprojects_id: '',
            type: '1',
            number: '',
            company: '',
            name: '',
            //add_qhr_20210810 添加rank、报告者字段
            rank: '',
            reporter: '',
            position: '',
            admissiontime: '',
            exittime: '',
            rowindex: '',
          }];
        }
      },
      //region scc add 构外 from
      addRow4() {
        if(this.tableE[this.tableE.length - 1].company) {
          this.tableE.push({
            projectsystem_id: this.tableE[this.tableE.length - 1].projectsystem_id,
            companyprojects_id: this.tableE[this.tableE.length - 1].companyprojects_id,
            reporter: '',//报告者
            type: '2',//构外
            madoguchi: this.tableE[this.tableE.length - 1].madoguchi,//窗口
            company: this.tableE[this.tableE.length - 1].company,//外注公司
            numberofmonths: 0,//人月数
            monthlyscale: 0, //每月管理规模
            //构外添加合同每月平均金额 ztc fr
            amountof: this.tableE[this.tableE.length - 1].amountof, //平均委托合同费用
            //构外添加合同每月平均金额 ztc to
            admissiontime: this.tableE[this.tableE.length - 1].admissiontime,//开始时间
            exittime: this.tableE[this.tableE.length - 1].exittime,//结束时间
            rowindex: '',
            contractno: this.tableE[this.tableE.length - 1].contractno,
            totalnumber: this.tableE[this.tableE.length - 1].totalnumber,
          });
        }
      },
      deleteRow4(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        } else {
          this.$confirm('删除后需要重新关联合同进行构外数据关联, 是否继续?', this.$t('normal.info'), {
            confirmButtonText: this.$t('button.confirm'),
            cancelButtonText: this.$t('button.cancel'),
            type: 'warning'
          }).then(() => {
            rows.splice(index, 1);
            this.$message.success({
              type: 'success',
              message: this.$t('normal.info_03'),
            });
          }).catch(() => {
            this.$message.info({
              type: 'info',
              message: this.$t('normal.info_04'),
            });
          });
        }
      },
      //endregion scc add 构外 to
      //合同
      addRow3() {
        this.tableD.push({
          contractnumbercount_id: '',
          //add-ws-6/9-禅道任务080
          deliveryfinshdate: '',
          claimtype: '',
          //add-ws-6/9-禅道任务080
          projectcontract_id: '',
          companyprojects_id: '',
          contract: '',
          theme: '',
          themeinfor_id: '',  //add_qhr_20210707 添加参数
          workinghours: '',
          //add-ws-合同关联项目，分配金额
          contractrequestamount: '',
          contractamount: '',
          //add-ws-合同关联项目，分配金额
          rowindex: '',
        });
      },
      //合同
      deleteRow3(index, rows) {
        if (rows.length > 1) {
          for (let i = 0; i < this.tablecompound.length; i++) {
            if (this.tablecompound[i].contractnumber === rows[index].contract) {
              this.tablecompound.splice(i, 1);
            }
          }
          rows.splice(index, 1);
        } else {
          this.tablecompound = [];
          this.displaycompound = false;
          this.tableD = [{
            contractnumbercount_id: '',
            //add-ws-6/9-禅道任务080
            deliveryfinshdate: '',
            claimtype: '',
            //add-ws-6/9-禅道任务080
            projectcontract_id: '',
            companyprojects_id: '',
            contract: '',
            theme: '',
            themeinfor_id: '',  //add_qhr_20210707 添加参数
            workinghours: '',
            //add-ws-合同关联项目，分配金额
            contractrequestamount: '',
            contractamount: '',
            //add-ws-合同关联项目，分配金额
            rowindex: '',
          }];
        }
        this.linkageToDelete();//scc add
      },
      //ADD 03-18 ,委托元为内采时，合同可自行添加请求金额
      addRowClaim() {
        this.tableclaimtype.push({
          claimtype: '',
          deliverydate: '',
          completiondate: '',
          claimdate: '',
          supportdate: '',
          claimamount: '',
        });
      },
      //合同
      deleteRowClaim(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
          this.contra = [];
          this.time = [];
        } else {
          this.tableclaimtype = [{
            claimtype: '',
            deliverydate: '',
            completiondate: '',
            claimdate: '',
            supportdate: '',
            claimamount: '',
          }];
          this.contra = [];
          this.time = [];
        }
      },
      //ADD 03-18 ,委托元为内采时，合同可自行添加请求金额 END
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
      // 项目dialog 体制 合同优化添加分页 ztc fr
      //region scc upd 9/16 点击放大镜时，标记改行 from
      dialogone(val){
        this.dialogTableVisible1 = true;
        this.getexpatriatesinfor();
        this.rowindextag = val.rowindex;
      },
      //endregion scc upd 9/16 点击放大镜时，标记改行 to
      handleSizeChangeSys(val) {
        this.listQuerySys.pageSize = val;
        this.getexpatriatesinfor();
      },
      handleCurrentChangeSys(val) {
        this.listQuerySys.currentPage = val;
        this.getexpatriatesinfor();
      },
      handleSizeChangeCont(val) {
        this.listQueryCont.pageSize = val;
        this.getcontract();
      },
      handleCurrentChangeCont(val) {
        this.listQueryCont.currentPage = val;
        this.getcontract();
      },
       getexpatriatesinfor() {
        let params = {
          currentPage: this.listQuerySys.currentPage,
          pageSize: this.listQuerySys.pageSize,
        }
        this.$store
          .dispatch('PFANS6004Store/getforSysDiaLog', params)
          .then(response => {
            this.gridData1 = [];
            this.gridData1 = response.resultList;
            // for (let i = 0; i < response.length; i++) {
            //   if (response[i].account) {
            //     var vote1 = {};
            //     vote1.number = response[i].number;
            //     vote1.name_id = response[i].account;
            //     vote1.expname = response[i].expname;
            //     vote1.suppliername = response[i].suppliername;
            //     //add_qhr_20210810 添加rank、报告者字段
            //     vote1.rank = response[i].rn;
            //     if (response[i].post) {
            //       //add-ws-value1-非空判断
            //       let postvalue1 = '';
            //       let letbudge = getDictionaryInfo(response[i].post);
            //       if (letbudge) {
            //         postvalue1 = letbudge.value1;
            //       }
            //       //add-ws-value1-非空判断
            //       vote1.post1 = postvalue1;
            //       vote1.post = response[i].post;
            //     }
            //     // vote1.post = response[i].post
            //     vote1.suppliernameid = response[i].supplierinfor_id;
            //     this.gridData1.push(vote1);
            //   }
            // }
            this.totalSysm = response.total;
            this.centerorglist = this.form.center_id;
            this.grouporglist = this.form.group_id;
            this.teamorglist = this.form.team_id;
          })
          // 项目dialog 体制 合同优化添加分页 ztc to
          .catch(error => {
            this.$message.error({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
            this.loading = false;
          });
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
            if (this.form.toolstype === '0') {
              this.form.toolsorgs = ' ';
              this.tableclaimtype = [{
                claimtype: '',
                deliverydate: '',
                completiondate: '',
                claimdate: '',
                supportdate: '',
                claimamount: '',
              }];
            }
            if (this.form.toolstype === '1') {
              this.form.entrust = ' ';
              this.form.deployment = ' ';
              this.form.behalf = ' ';
              this.form.intelligence = ' ';
              this.tableD = [{
                contractnumbercount_id: '',
                //add-ws-6/9-禅道任务080
                deliveryfinshdate: '',
                claimtype: '',
                //add-ws-6/9-禅道任务080
                contract: '',
                theme: '',
                themeinfor_id: '',  //add_qhr_20210707 添加参数
                workinghours: '',
                //add-ws-合同关联项目，分配金额
                contractrequestamount: '',
                contractamount: '',
                //add-ws-合同关联项目，分配金额
              }];
            }
            let error = 0;
            let error1 = 0;
            let error2 = 0;
            let error3 = 0;
            let error4 = 0;
            let error5 = 0;
            let error7 = 0;
            let error8 = 0;
            let error9 = 0;
            let error10 = 0;
            let error11 = 0;
            let error12 = 0;
            let error13 = 0;
            let error14 = 0;
            this.baseInfo.companyprojects = JSON.parse(JSON.stringify(this.form));
            this.baseInfo.stageinformation = [];
            this.baseInfo.projectsystem = [];
            this.baseInfo.projectcontract = [];
            //项目计划
            for (let i = 0; i < this.tableA.length; i++) {
              if (this.tableA[i].phase == '' && this.tableA[i].estimatedstarttime == '' && this.tableA[i].estimatedendtime == '') {
                error4 = error4 + 1;
                break;
              }
              if (moment(this.tableA[i].estimatedstarttime).format('YYYY-MM-DD') > moment(this.tableA[i].estimatedendtime).format('YYYY-MM-DD')) {
                error7 = error7 + 1;
                break;
              }
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

            //theme 还未和合同关联 注掉
            //add-ws-01/16-禅道任务710
            // for (let i = 0; i < this.tableD.length; i++) {
            //   for (let j = 1; j < this.tableD.length; j++) {
            //     if (this.tableD[i].theme != this.tableD[j].theme) {
            //       Message({
            //         message: this.$t('label.PFANS5001FORMVIEW_PROJECTERROR'),
            //         type: 'error',
            //         duration: 5 * 1000,
            //       });
            //       this.activeName = 'fifth';
            //       this.loading = false;
            //       return;
            //     }
            //   }
            // }
            //add-ws-01/16-禅道任务710
            //theme 还未和合同关联 注掉
            for (let i = 0; i < this.tableB.length; i++) {

              //region scc add scc 9/27 项目体制社内氏名非空验证 from
              if(!this.tableB[i].name && (this.tableB[i].position || this.tableB[i].reporter || this.tableB[i].admissiontime || this.tableB[i].exittime)){
                Message({
                  message: this.$t('label.PFANS5001FORMVIEW_SNAME'),
                  type: 'error',
                  duration: 5 * 1000,
                });
                this.activeName = 'fourth';
                this.loading = false;
                return;
              }
              //endregion scc add scc 9/27 项目体制社内氏名非空验证 to

              //add_fjl 体制人员重复check start
              // 可以进行重复选择，只需要做进组退组时间不重复的check ztc fr
              // let num = 0;
              // for (let j = 0; j < this.tableB.length; j++) {
              //   if (this.tableB[i].name === this.tableB[j].name) {
              //     num++;
              //     if (num > 1) {
              //       Message({
              //         message: this.$t(getUserInfo(this.tableB[i].name).userinfo.customername)
              //           + this.$t('label.PFANS5001FORMVIEW_CHECKDOUBLE'),
              //         type: 'error',
              //         duration: 5 * 1000,
              //       });
              //       this.activeName = 'fourth';
              //       this.loading = false;
              //       return;
              //     }
              //   }
              // }
              // 可以进行重复选择，只需要做进组退组时间不重复的check ztc to
              //add ccm 20210825 体制报告者在体制中是否存在 fr
              if(this.tableB[i].reporter!=null && this.tableB[i].reporter!='')
              {
                if (this.tableB.filter(item => item.name === this.tableB[i].reporter).length === 0)
                {
                  Message({
                    message: this.$t(this.tableB[i].name == null || this.tableB[i].name == '' ? '': getUserInfo(this.tableB[i].name).userinfo.customername)
                      + this.$t(' ') + this.$t('label.PFANS5001FORMVIEW_REPORTERERROR'),
                    type: 'error',
                    duration: 5 * 1000,
                  });
                  this.activeName = 'fourth';
                  this.loading = false;
                  return;
                }
              }
              //add ccm 20210825 体制报告者在体制中是否存在 to
              //add_fjl 体制人员重复check end
              // this.changeInt(this.tableB[i]);
              // 社内员工进组时间&退出时间必须Check
              if ((!this.tableB[i].admissiontime || this.tableB[i].admissiontime === '' || !this.tableB[i].exittime || this.tableB[i].exittime === '') && this.tableB[i].name !== '') {
                error10 = error10 + 1;
                break;
              }
              if (moment(this.tableB[i].admissiontime).format('YYYY-MM-DD') > moment(this.tableB[i].exittime).format('YYYY-MM-DD')) {
                error8 = error8 + 1;
                break;
              }
              if (
                this.tableB[i].number !== '' ||
                this.tableB[i].name !== '' ||
                this.tableB[i].admissiontime !== '' ||
                this.tableB[i].exittime !== ''
              ) {
                this.baseInfo.projectsystem.push({
                  number: this.tableB[i].number,
                  name: this.tableB[i].name,
                  //add_qhr_20210810 添加rank、报告者字段
                  rank: this.tableB[i].rank,
                  reporter: this.tableB[i].reporter,
                  type: this.tableB[i].type,
                  company: this.tableB[i].company,
                  position: this.tableB[i].position,
                  admissiontime: this.tableB[i].admissiontime,
                  exittime: this.tableB[i].exittime,
                });
              }
            }

            for (let i = 0; i < this.tableE.length; i++) {
              //region scc add scc 9/27 项目体制构外报告者,人月数非空验证 from
              if(!this.tableE[i].reporter && (this.tableE[i].company || this.tableE[i].admissiontime || this.tableE[i].exittime)){
                Message({
                  message: this.$t('normal.error_08') + this.$t('label.PFANS5001FORMVIEW_REPORTER'),
                  type: 'error',
                  duration: 5 * 1000,
                });
                this.activeName = 'fourth';
                this.loading = false;
                return;
              }else if(!this.tableE[i].numberofmonths && (this.tableE[i].company || this.tableE[i].admissiontime || this.tableE[i].exittime)){
                Message({
                  message: this.$t('normal.error_08') + this.$t('label.PFANS5001FORMVIEW_NUMBEROFMONTHS'),
                  type: 'error',
                  duration: 5 * 1000,
                });
                this.activeName = 'fourth';
                this.loading = false;
                return;
              }
              //endregion scc add scc 9/27 项目体制构外报告者,人月数非空验证 to
              //region scc add 保存构外 from
              if (
                this.tableE[i].company !== '' ||
                this.tableE[i].admissiontime !== '' ||
                this.tableE[i].exittime !== ''
              ) {
                this.baseInfo.projectsystem.push({
                  projectsystem_id: this.tableE[i].projectsystem_id,
                  companyprojects_id: this.tableE[i].companyprojects_id,
                  reporter: this.tableE[i].reporter,
                  type: this.tableE[i].type,
                  company: this.tableE[i].company,
                  admissiontime: this.tableE[i].admissiontime,
                  exittime: this.tableE[i].exittime,
                  madoguchi: this.tableE[i].madoguchi,//窗口
                  numberofmonths: this.tableE[i].numberofmonths,//人月数
                  monthlyscale: this.tableE[i].monthlyscale, //每月管理规模
                  rowindex: this.tableE[i].rowindex,
                  contractno: this.tableE[i].contractno,
                  totalnumber: this.tableE[i].totalnumber,
                });
              }
              //endregion scc add 保存构外 to
            }

            for (let i = 0; i < this.tableC.length; i++) {

              //region scc add scc 9/27 项目体制社外氏名非空验证 from
              if(!this.tableC[i].name && (this.tableC[i].position || this.tableC[i].reporter || this.tableC[i].admissiontime || this.tableC[i].exittime)){
                Message({
                  message: this.$t('label.PFANS5001FORMVIEW_SNAME'),
                  type: 'error',
                  duration: 5 * 1000,
                });
                this.activeName = 'fourth';
                this.loading = false;
                return;
              }
              //endregion scc add scc 9/27 项目体制社外氏名非空验证 to

              //add ccm 20210825 体制报告者在体制中是否存在 fr
              if(this.tableC[i].reporter!=null && this.tableC[i].reporter!='')
              {
                if (this.tableB.filter(item => item.name === this.tableC[i].reporter).length === 0)
                {
                  Message({
                    message: this.$t(this.tableC[i].name_id || '')
                      + this.$t(' ') + this.$t('label.PFANS5001FORMVIEW_REPORTERERROR'),
                    type: 'error',
                    duration: 5 * 1000,
                  });
                  this.activeName = 'fourth';
                  this.loading = false;
                  return;
                }
              }
              //add ccm 20210825 体制报告者在体制中是否存在 to


              // 外协员工入场时间&离场时间必须Check
              if ((!this.tableC[i].admissiontime || this.tableC[i].admissiontime === '' || !this.tableC[i].exittime || this.tableC[i].exittime === '') && this.tableC[i].name !== '') {
                error11 = error11 + 1;
                break;
              }
              if (moment(this.tableC[i].admissiontime).format('YYYY-MM-DD') > moment(this.tableC[i].exittime).format('YYYY-MM-DD')) {
                error9 = error9 + 1;
                break;
              }
              if (
                this.tableC[i].number !== '' ||
                this.tableC[i].name !== '' ||
                this.tableC[i].suppliernameid !== '' ||
                this.tableC[i].admissiontime !== '' ||
                this.tableC[i].exittime !== ''
              ) {
                this.baseInfo.projectsystem.push({
                  number: this.tableC[i].number,
                  name: this.tableC[i].name,
                  //add_qhr_20210810 添加rank、报告者字段
                  rank: this.tableC[i].rank,
                  reporter: this.tableC[i].reporter,
                  suppliernameid: this.tableC[i].suppliernameid,
                  type: this.tableC[i].type,
                  name_id: this.tableC[i].name_id,
                  company: this.tableC[i].company,
                  admissiontime: this.tableC[i].admissiontime,
                  exittime: this.tableC[i].exittime,
                  position: this.tableC[i].position,
                });
              }
            }

            //add-ws-存在check关闭loading
            if (this.checkmessage === 1) {
              error12 = error12 + 1;
            }
            //add-ws-6/9-禅道任务080
            let listsum = [];
            let Listcheck = this.tableD;
            for (let list of Listcheck) {
              listsum = this.tableD.filter(item => item.contract == list.contract && item.claimtype == list.claimtype);
              if (listsum.length > 1) {
                error14 = error14 + 1;
              }
            }
            //add-ws-6/9-禅道任务080
            //add-ws-存在check关闭loading
            for (let i = 0; i < this.tableD.length; i++) {
              this.tableD[i].contractamount = this.tableD[i].contractamount === undefined ? 0 : this.tableD[i].contractamount;
              if (this.tableD[i].contract == '') {
                error = error + 1;
                break;
              }
              if (this.tableD[i].contractamount == 0) {
                error13 = error13 + 1;
                break;
              }
              if (this.tableD[i].contractrequestamount > 0) {
                if (
                  this.tableD[i].contract !== '' ||
                  this.tableD[i].theme !== '' ||
                  this.tableD[i].workinghours !== ''
                ) {

                  this.baseInfo.projectcontract.push({
                    //add-ws-6/9-禅道任务080
                    contractnumbercount_id: this.tableD[i].contractnumbercount_id,
                    deliveryfinshdate: this.tableD[i].deliveryfinshdate,
                    claimtype: this.tableD[i].claimtype,
                    //add-ws-6/9-禅道任务080
                    //add-ws-合同关联项目，分配金额
                    contractrequestamount: this.tableD[i].contractrequestamount,
                    contractamount: this.tableD[i].contractamount,
                    //add-ws-合同关联项目，分配金额
                    contract: this.tableD[i].contract,
                    theme: this.tableD[i].theme,
                    themeinfor_id: this.tableD[i].themeinfor_id,  //add_qhr_20210707 添加参数
                    workinghours: this.tableD[i].workinghours,
                  });
                }
              }
            }
            //ADD 03-18 ,委托元为内采时，合同可自行添加请求金额
            this.baseInfo.contractnumbercount = this.tableclaimtype;
            //ADD 03-18 ,委托元为内采时，合同可自行添加请求金额 END
            if (this.form.toolstype === '1') {
              if (this.form.toolsorgs === undefined) {
                error5 = error5 + 1;
              }
            } else {
              if (this.form.entrust === '') {
                error5 = error5 + 1;
              }
            }

            //ADD-WS-开发部门，体制时间范围check
            for (let i = 0; i < this.tableclaimtype.length; i++) {
              if (this.tableclaimtype[i].claimtype == '' || this.tableclaimtype[i].deliverydate == '' || this.tableclaimtype[i].completiondate == '' || this.tableclaimtype[i].claimdate == '' || this.tableclaimtype[i].supportdate == '' || this.tableclaimtype[i].claimamount == '') {
                error3 = error3 + 1;
              }
            }
            if (error5 != 0) {
              this.activeName = 'second';
              this.loading = false;
              Message({
                message: this.$t('normal.error_08') +
                  this.$t('label.PFANS5001FORMVIEW_ENTRUST'),
                type: 'error',
                duration: 5 * 1000,
              });

            } else if (error4 != 0) {
              this.activeName = 'third';
              this.loading = false;
              Message({
                message: this.$t('normal.error_08') +
                  this.$t('label.PFANS5001FORMVIEW_DEVELOPMENTPLAN'),
                type: 'error',
                duration: 5 * 1000,
              });
            } else if (error7 != 0) {
              this.activeName = 'third';
              this.loading = false;
              Message({
                message: this.$t('label.PFANS5001FORMVIEW_CHECKDATAERROR'),
                type: 'error',
                duration: 5 * 1000,
              });
            } else if (error8 != 0) {
              this.activeName = 'fourth';
              this.loading = false;
              Message({
                message: this.$t('label.PFANS5001FORMVIEW_CHECKDATAERRORN'),
                type: 'error',
                duration: 5 * 1000,
              });
            } else if (error10 != 0) {
              this.activeName = 'fourth';
              Message({
                message: this.$t('normal.error_pfans50011'),
                type: 'error',
                duration: 5 * 1000,
              });
              this.loading = false;
            } else if (error11 != 0) {
              this.activeName = 'fourth';
              Message({
                message: this.$t('normal.error_pfans5001'),
                type: 'error',
                duration: 5 * 1000,
              });
              this.loading = false;
            } else if (error9 != 0) {
              this.activeName = 'fourth';
              this.loading = false;
              Message({
                message: this.$t('label.PFANS5001FORMVIEW_CHECKDATAERRORW'),
                type: 'error',
                duration: 5 * 1000,
              });
            } else if (error13 != 0) {
              this.activeName = 'fifth';
              Message({
                message: this.$t('label.PFANS5001FORMVIEW_CHECKCONTRACTAMOUNTERROR'),
                type: 'error',
                duration: 5 * 1000,
              });
              this.loading = false;
            } else if (error != 0 && this.form.toolstype !== '1') {
              this.activeName = 'fifth';
              this.loading = false;
              Message({
                message: this.$t('normal.error_08') +
                  this.$t('label.PFANS5001FORMVIEW_CONTRACT'),
                type: 'error',
                duration: 5 * 1000,
              });
            } else if (error3 != 0 && this.form.toolstype !== '0') {
              this.activeName = 'fifth';
              this.loading = false;
              Message({
                message: this.$t('normal.error_08') +
                  this.$t('label.PFANS5001FORMVIEW_CONTRACT') +
                  this.$t('label.PFANS1024VIEW_CONTR'),
                type: 'error',
                duration: 5 * 1000,
              });
            } else if (error14 != 0) {
              this.activeName = 'fifth';
              this.loading = false;
              Message({
                message: this.$t('label.PFANS5009FORMVIEW_CHECKLANGUAGE'),
                type: 'error',
                duration: 5 * 1000,
              });
            }
            //add-ws-6/9-禅道任务080
            //add-ws-存在check关闭loading
            else if (error12 != 0) {
              this.activeName = 'fifth';
              this.loading = false;
            }
            //add-ws-存在check关闭loading
            else if (this.$route.params._id) {
              for (let i = 0; i < this.baseInfo.projectcontract.length; i++) {
                this.baseInfo.projectcontract[i].workinghours = this.getworkinghours(this.baseInfo.projectcontract[i].workinghours);
              }
              this.baseInfo.companyprojects.companyprojects_id = this.$route.params._id;
              this.form.center_id = this.centerorglist;
              this.form.group_id = this.grouporglist;
              this.form.team_id = this.teamorglist;
              this.$store
                .dispatch('PFANS5001Store/update', this.baseInfo)
                .then(response => {
                  this.data = response;
                  this.loading = false;
                  if (val !== 'update') {
                    Message({
                      message: this.$t('normal.success_02'),
                      type: 'success',
                      duration: 5 * 1000,
                    });
                    if (this.$store.getters.historyUrl && val != 'StartWorkflow') {
                      this.$router.push(this.$store.getters.historyUrl);
                    }
                    if (val === 'StartWorkflow') {
                      this.$refs.container.$refs.workflow.startWorkflow();
                    }
                  }
                })
                .catch(error => {
                  this.$message.error({
                    message: error,
                    type: 'error',
                    duration: 5 * 1000,
                  });
                  //region scc add 9/28 进退场时间check，留在体制页 from
                  this.activeName = 'fourth';
                  //endregion scc add 9/28 进退场时间check，留在体制页 to
                  this.loading = false;
                });
            } else {
              for (let i = 0; i < this.baseInfo.projectcontract.length; i++) {
                this.baseInfo.projectcontract[i].workinghours = this.getworkinghours(this.baseInfo.projectcontract[i].workinghours);
              }
              this.$store
                .dispatch('PFANS5001Store/insert', this.baseInfo)
                .then(response => {
                  this.data = response;
                  this.loading = false;
                  this.$message.success({
                    message: this.$t('normal.success_01'),
                    type: 'success',
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
                  //region scc add 9/28 进退场时间check，留在体制页 from
                  this.activeName = 'fourth';
                  //endregion scc add 9/28 进退场时间check，留在体制页 to
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

      //region scc add 构外信息带入 from
      //构外添加合同每月平均金额,变更获取构外信息方式 ztc fr
      forDetail(val) {
        let params = {
          contractNo: val,
          centerId: this.form.center_id,
          groupId: this.form.group_id,
        }
        this.$store
          .dispatch('PFANS5001Store/forDetail', params)
          .then(res => {
            if(res != null){
              res.forEach(item =>{
                if(JSON.stringify(item) !== '{}'){
                  let startTime = item.Interval.split("~")[0];
                  let endTime = item.Interval.split("~")[1];

                  let start = moment(new Date(startTime));
                  let end = moment(new Date(endTime));
                  let poor = end.diff(start, 'months');
                  poor = Number(poor) + 1;
                  let amount_of = Number(Number(item.Amountof) / Number(poor)).toFixed(2);


                  this.tableE.push({
                    projectsystem_id: '',
                    companyprojects_id :  '',
                    company : item.Custojapanese,
                    madoguchi : item.Madoguchi,
                    admissiontime : startTime,
                    exittime : endTime,
                    numberofmonths: 0,
                    reporter : '',
                    type : '2',
                    monthlyscale: 0,
                    contractno: item.ContractNo,
                    totalnumber: item.Numberofworkers,
                    amountof: amount_of,
                    rowindex: '',
                  })
                }
              })
              //构外添加合同每月平均金额,变更获取构外信息方式 ztc to
              this.linkageToDelete();
            }
          })
        .catch(error => {
          this.$message.error({
            message: error,
            type: 'error',
            duration: 5 * 1000,
          });
        })
      },
      //endregion scc add 构外信息带入 to

      //region scc add 根据合同号，判断构外与合同是否关联，不关联，删除构外条数 from
      linkageToDelete() {
        let tableE1 = JSON.parse(JSON.stringify(this.tableE));
        for(let i = 0; i < tableE1.length; i++){
          let flag = false;
          for(let j = 0; j < this.tableD.length; j++){
            if(tableE1[i].contractno === this.tableD[j].contract){
              flag = true;
            }
          }
          if(!flag){
            this.tableE = this.tableE.filter(it => it.contractno !== tableE1[i].contractno);
          }
        }
      },
      //endregion scc add 根据合同号，判断构外与合同是否关联，不关联，删除构外条数 to

      //region scc add 人月数change事件，赋值每月管理规模 from
      changeNum(val,row,$index){
        row.numberofmonths = val;
        let start = moment(new Date(row.admissiontime));
        let end = moment(new Date(row.exittime));
        let poor = end.diff(start, 'months');
        //构外添加合同每月平均金额,变更获取构外信息方式 ztc fr
        poor = Number(poor) + 1;
        row.monthlyscale = Number(Number(val) / Number(poor)).toFixed(2);
        //构外添加合同每月平均金额,变更获取构外信息方式 ztc to
      },
      //endregion scc add 人月数change事件，赋值每月管理规模 to
      //region  add  ml  211214  构外新建按钮控制   from
      addOrNot($index){
        if(this.tableE.length - 1 === 0){
          return false;
        }else{
          if($index !== this.tableE.length - 1){
            return true;
          }
          return false;
        }
      },
      //endregion  add  ml  211214  构外新建按钮控制   to
    },
    //region scc add 监听选择合同操作，给构外赋值 from
    watch: {
      // contNum:{
      //   handler(newVal, oldVal){
      //     if(newVal){
      //       this.forDetail(newVal);
      //     }
      //   },
      //   deep: true,
      // }
    },
    //endregion scc add 监听选择合同操作，给构外赋值 to
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

  .PlStyle {
    background-color: #005BAA !important;
  }
</style>
