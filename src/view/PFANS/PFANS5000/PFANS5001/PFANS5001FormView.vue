phase<template>
  <div>
    <EasyNormalContainer
      :buttonList="buttonList"
      :title="title"
      @buttonClick="buttonClick"
      @end="end"
      @start="start"
      @workflowState="workflowState"
      ref="container"
      v-loading="loading"
    >
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
                    <!--                    <el-col :span="8">-->
                    <!--                      <el-form-item :label="$t('label.PFANS5001FORMVIEW_NUMBERS')" prop="numbers">-->
                    <!--                        <el-input-->
                    <!--                          :disabled="!disable"-->
                    <!--                          maxlength="20"-->
                    <!--                          style="width: 20vw"-->
                    <!--                          v-model="form.numbers"-->
                    <!--                        ></el-input>-->
                    <!--                      </el-form-item>-->
                    <!--                    </el-col>-->
                  </el-row>
                  <el-row>
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
                    <el-col :span="8">
                      <el-form-item
                        :error="errorManager"
                        :label="$t('label.PFANS5001FORMVIEW_MANAGERID')"
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
                  <!--                  <el-row>-->
                  <!--                    <el-col :span="8">-->
                  <!--                      <el-form-item :label="$t('label.PFANS5001FORMVIEW_MANMONTH')" prop="manmonth">-->
                  <!--                        <el-input-number-->
                  <!--                          :disabled="!disable"-->
                  <!--                          :max="1000000000"-->
                  <!--                          :min="0"-->
                  <!--                          :precision="2"-->
                  <!--                          controls-position="right"-->
                  <!--                          style="width: 20vw"-->
                  <!--                          v-model="form.manmonth"-->
                  <!--                        ></el-input-number>-->
                  <!--                      </el-form-item>-->
                  <!--                    </el-col>-->
                  <!--                    <el-col :span="8">-->
                  <!--                      <el-form-item :label="$t('label.PFANS5001FORMVIEW_COST')" prop="cost">-->
                  <!--                        <el-input-number-->
                  <!--                          :disabled="!disable"-->
                  <!--                          :max="1000000000"-->
                  <!--                          :min="0"-->
                  <!--                          :precision="2"-->
                  <!--                          controls-position="right"-->
                  <!--                          style="width: 20vw"-->
                  <!--                          v-model="form.cost"-->
                  <!--                        ></el-input-number>-->
                  <!--                      </el-form-item>-->
                  <!--                    </el-col>-->
                  <!--                    <el-col :span="8">-->
                  <!--                      <el-form-item-->
                  <!--                        :label="$t('label.PFANS5001FORMVIEW_SALESVOLUME')"-->
                  <!--                        prop="salesvolume"-->
                  <!--                      >-->
                  <!--                        <el-input-number-->
                  <!--                          :disabled="!disable"-->
                  <!--                          :max="1000000000"-->
                  <!--                          :min="0"-->
                  <!--                          :precision="2"-->
                  <!--                          controls-position="right"-->
                  <!--                          style="width: 20vw"-->
                  <!--                          v-model="form.salesvolume"-->
                  <!--                        ></el-input-number>-->
                  <!--                      </el-form-item>-->
                  <!--                    </el-col>-->
                  <!--                  </el-row>-->


                  <!--受託工数-->
                  <el-row>
                    <el-col :span="8">
                      <el-form-item
                        :label="$t('label.PFANS5009FORMVIEW_WORK')"
                        prop="work"
                      >
                        <el-input
                          :disabled="!disable"
                          maxlength="20"
                          style="width: 20vw"
                          v-model="form.work"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <!--   納期-->
                    <el-col :span="8">
                      <el-form-item
                        :label="$t('label.PFANS5009FORMVIEW_DEADLINE')"
                        prop="deadline"
                      ><el-date-picker
                        :disabled="!disable"
                        style="width: 20vw"
                        type="date"
                        v-model="form.deadline"
                      ></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <!-- 其他管理工具 -->
                  <el-row>
                    <el-col :span="8">
                      <template>
                        <el-form-item
                          :label="$t('label.PFANS5001FORMVIEW_TOOLS')"
                          prop="tools"
                        >
                          <el-checkbox-group v-model="checkList">
                            <el-checkbox label="SVN"></el-checkbox>
                            <el-checkbox label="redmine"></el-checkbox>
                            <el-checkbox label="gitlab"></el-checkbox>
                            <el-checkbox label="其他"></el-checkbox>
                          </el-checkbox-group>
                        </el-form-item>
                      </template>
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
                  <el-form-item
                    :error="errorLeader"
                    :label="$t('label.PFANS5001FORMVIEW_ENTRUST')"
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
                    :label="$t('label.PFANS5001FORMVIEW_DEPLOYMENT')"
                    prop="deployment"
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
                  <el-form-item :label="$t('label.PFANS5001FORMVIEW_BEHALF')" prop="behalf">
                    <el-input :disabled="!disable" maxlength='20' style="width:20vw"
                              v-model="form.behalf"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item
                    :label="$t('label.PFANS5001FORMVIEW_INTELLIGENCE')"
                    prop="intelligence"
                  >
                    <el-input
                      :disabled="!disable"
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
                      <el-table-column :label="$t('label.PFANS5009FORMVIEW_PHASE')" align="center">
                        <template slot-scope="scope">
                          <dicselect
                            :code="code"
                            :data="scope.row.phase"
                            :disabled="!disable"
                            :no="scope.row"
                            @change="getrole"
                          ></dicselect>
                        </template>
                      </el-table-column>

                      <el-table-column
                        :label="$t('label.PFANS5009FORMVIEW_STAGEPRODUCT')"
                        align="center"
                      >
                        <template slot-scope="scope">
                          <dicselect
                            :code="code1"
                            :data="scope.row.stageproduct"
                            :disabled="!disable"
                            :no="scope.row"
                            @change="getrole1"
                          ></dicselect>
                        </template>
                      </el-table-column>
                      <el-table-column
                        :label="$t('label.PFANS5009FORMVIEW_ESTIMATEDWORK')"
                        align="center">
                        <template slot-scope="scope">
                          <el-input
                            :no="scope.row"
                            :disabled="!disable"
                            v-model="scope.row.estimatedwork"
                            style="width: 100%">
                          </el-input>
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
                          <!--                    姓名-->
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
                                style="width: 18vw"
                              ></user>
                              <!--<user-->
                                <!--:disabled="!disable"-->
                                <!--:error="errorLeader"-->
                                <!--:selectType="selectType"-->
                                <!--:userlist="userlist"-->
                                <!--:multiple="multiple"-->
                                <!--@getUserids="getUserids"-->
                                <!--style="width: 18vw"-->
                              <!--&gt;</user>-->
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
                            width="200">
                            <template slot-scope="scope">
                              <el-col :span="8">
                                  <div class="dpSupIndex" style="width:10vw" prop="expname">
                                    <el-container>
                                      <input class="content bg" v-model="scope.row.name" :error="errorexpname"
                                             :disabled="true"></input>
                                      <el-button :disabled="!disabled" icon="el-icon-search"
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
                                              <el-table-column property="number" fixed :label="$t('label.PFANS5001FORMVIEW_NUMBERS')"
                                                               width="100"></el-table-column>
                                              <el-table-column property="expname" fixed
                                                               :label="$t('label.PFANSUSERFORMVIEW_CUSTOMERNAME')"
                                                               width="100"></el-table-column>
                                              <el-table-column property="suppliername" :label="$t('label.PFANS5001FORMVIEW_COOPERATIONCOMPANY')"
                                                               width="100"></el-table-column>
                                              <el-table-column property="post"
                                                               :label="$t('label.PFANSUSERVIEW_POST')"
                                                               width="150"></el-table-column>
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

            <!--            合同-->
            <el-tab-pane :label="$t('label.PFANS5001FORMVIEW_CONTRACT')" name="fifth">
              <el-form-item>
                <el-row>
                  <el-col :span="24">
                  </el-col>
                </el-row>
              </el-form-item>
            </el-tab-pane>

            <!--            文件上传-->
            <el-tab-pane :label="$t('label.PFANS5001FORMVIEW_FILEUPLOAD')" name="sixth">
              <el-form-item>
                <el-row>
                  <el-col :span="24">
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
  import {uploadUrl} from '@/utils/customize';
  import {getUserInfo} from '@/utils/customize';
  import {Message} from 'element-ui';
  import moment from 'moment';
  import {getOrgInfoByUserId} from '@/utils/customize';
  import org from '../../../components/org';

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
      return {
        centerorglist: '',
        grouporglist: '',
        teamorglist: '',
        errorcenter: '',
        errorgroup: '',
        errorexpname: '',
        search: '',
        gridData1: [],
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
        currentRow : '',
        currentRow1 : '',
        currentRow2 : '',
        currentRow3 : '',
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
            estimatedstarttime: '',
            estimatedendtime: '',
            remarks: '',
            actualstarttime: '',
            actualendtime: '',
            product: '',
            phasestatus: '',
            rowindex: '',
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
            name: '',
            position:'',
            admissiontime: '',
            exittime: '',
            rowindex: '',
          },
        ],
        //项目体制(外协)
        tableC: [
            {
                projectsystem_id: '',
                companyprojects_id: '',
                type: '1',
                number: '',
                company: '',
                name: '',
                position:'',
                admissiontime: '',
                exittime: '',
                rowindex: '',
            },
        ],
        data: [],
        loading: false,
        dialogTableVisible1: false,
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
          briefintroduction: [
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
        },
        baseInfo: {},
        form: {
          project_name: '',
          project_namejp: '',
          leaderid: '',
          managerid: '',
          projecttype: '',
          field: '',
          languages: '',
          startdate: '',
          enddate: '',
          work: '',
          deadline: '',
          tools: '',
          briefintroduction: '',
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
        },
        multiple: false,
        code: 'PP012',
        code1: 'PP013',
        code2: 'PP001',
        code3: 'PP002',
        // code4: "PP004",
        // code5: "PP005",
        // code6: "PP007",
        // code7: "PP014",
        // code8: "PP015",
        // code9:"PR021",
        result: '',
        result1: '',
        fileList: [],
        upload: uploadUrl(),
      };
    },
    mounted() {
      this.getexpatriatesinfor();
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS5001Store/selectById', {companyprojectsid: this.$route.params._id})
          .then(response => {
            this.form = response.companyprojects;
            this.userlist = this.form.leaderid;
            this.userlist1 = this.form.managerid;
            //项目计划111
            if (response.stageinformation.length > 0) {
                this.tableA = response.stageinformation;
            }
            //项目体制
            if (response.projectsystem.length > 0) {
                for (var i = 0; i < response.projectsystem.length; i++) {
                    if(response.projectsystem[i].type === '0'){
                        this.tableB = [];
                        let o = {};
                        o.name = response.projectsystem[i].projectsystem_id;
                        o.companyprojects_id = response.projectsystem[i].companyprojects_id;
                        o.type = response.projectsystem[i].type;
                        o.number = response.projectsystem[i].number;
                        o.company = response.projectsystem[i].company;
                        o.name = response.projectsystem[i].name;
                        o.position = response.projectsystem[i].position;
                        o.admissiontime = response.projectsystem[i].admissiontime;
                        o.exittime = response.projectsystem[i].exittime;
                        o.rowindex = response.projectsystem[i].rowindex;
                        this.tableB.push(o);

                    }
                    else{
                        this.tableC = [];
                        let o = {};
                        o.name = response.projectsystem[i].projectsystem_id;
                        o.companyprojects_id = response.projectsystem[i].companyprojects_id;
                        o.type = response.projectsystem[i].type;
                        o.number = response.projectsystem[i].number;
                        o.company = response.projectsystem[i].company;
                        o.name = response.projectsystem[i].name;
                        o.position = response.projectsystem[i].position;
                        o.admissiontime = response.projectsystem[i].admissiontime;
                        o.exittime = response.projectsystem[i].exittime;
                        o.rowindex = response.projectsystem[i].rowindex;
                        this.tableC.push(o);
                    }
                }
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
        this.userlist = this.$store.getters.userinfo.userid;
        this.userlist1 = this.$store.getters.userinfo.userid;
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
      getUserids(val) {
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
      submit(row) {
        row.number = this.currentRow;
        row.name = this.currentRow1;
        row.company = this.currentRow2;
        row.position = this.currentRow3;
        this.dialogTableVisible1 = false;
      },
      handleClickChange(val) {
        this.currentRow = val.number;
        this.currentRow1 = val.expname;
        this.currentRow2 = val.suppliername;
        this.currentRow3 = val.post;
      },
      getCitationUserid(userlist, row) {
        row.name = userlist;
        if (row.name != null && row.name !== '') {
          let lst = getUserInfo(row.name);
          row.position = lst.userinfo.post;
          row.number = lst.userinfo.jobnumber;
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
      getrole(val1, row) {
        row.phase = val1;
      },
      getrole1(val1, row) {
        row.stageproduct = val1;
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
      start() {
        this.form.status = '2';
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
              position:'',
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
              projectsystem_id: '',
              companyprojects_id: '',
              type: '0',
              number: '',
              company: '',
              name: '',
              position:'',
              admissiontime: '',
              exittime: '',
              rowindex: '',
          }];
        }
      },
      //项目体制(外协)
      addRow2() {
          this.tableC.push({
              projectsystem_id: '',
              companyprojects_id: '',
              type: '1',
              number: '',
              company: '',
              name: '',
              position:'',
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
              projectsystem_id: '',
              companyprojects_id: '',
              type: '1',
              number: '',
              company: '',
              name: '',
              position:'',
              admissiontime: '',
              exittime: '',
              rowindex: '',
          }];
        }
      },
      getexpatriatesinfor() {
        this.loading = true;
        this.$store
          .dispatch('PFANS6004Store/getexpatriatesinfor', {})
          .then(response => {
            this.gridData1 = [];
            for (let i = 0; i < response.length; i++) {
              var vote1 = {};
              vote1.number = response[i].number;
              vote1.expname = response[i].expname;
              vote1.suppliername =  response[i].suppliername;
              vote1.post = response[i].post;
              this.gridData1.push(vote1);
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
        this.form.leaderid = this.userlist;
        this.form.managerid = this.userlist1;
        this.$refs['from1'].validate(valid => {
          if (valid) {
            this.loading = true;
            this.baseInfo = {};
            this.baseInfo.companyprojects = JSON.parse(JSON.stringify(this.form));
            this.baseInfo.stageinformation = [];
            this.baseInfo.projectsystem = [];
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
            for (let i = 0; i < this.tableB.length; i++) {
              if (
                this.tableB[i].number !== '' ||
                this.tableB[i].name !== '' ||
                this.tableB[i].admissiontime !== '' ||
                this.tableB[i].exittime !== ''
              ) {
                this.baseInfo.projectsystem.push({
                  number: this.tableB[i].number,
                  name: this.tableB[i].name,
                  type: this.tableB[i].type,
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
                    this.tableC[i].admissiontime !== '' ||
                    this.tableC[i].exittime !== ''
                ) {
                    this.baseInfo.projectsystem.push({
                        number: this.tableC[i].number,
                        name: this.tableC[i].name,
                        type: this.tableC[i].type,
                        company: this.tableC[i].company,
                        admissiontime: this.tableC[i].admissiontime,
                        exittime: this.tableC[i].exittime,
                        position: this.tableC[i].position
                    });
                }
            }
            if (this.$route.params._id) {
              this.baseInfo.companyprojects.companyprojects_id = this.$route.params._id;
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
                .dispatch('PFANS5001Store/insert', this.baseInfo)
                .then(response => {
                  console.log("VVVAAAAA" + response);
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
