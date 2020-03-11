<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :canStart="canStart" :title="title" @buttonClick="buttonClick"
                         ref="container" v-loading="loading"  @end="end"
                         @start="start"
                         @workflowState="workflowState">

      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="refform"
                 style="padding: 2rem">
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane :label="$t('label.PFANS5009FORMVIEW_PROJECTINFORMATION')" name="first">


              <template slot="title">
                <span class="collapse_Title">{{$t('label.PFANS5009FORMVIEW_PROJECTBASICINFORMATION')}}</span>
              </template>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.team')">
                    <org :disabled="true" :orglist="form.team_id" @getOrgids="getTeamId" orgtype="3"
                         style="width:20vw"></org>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :error="errorgroup" :label="$t('label.group')" prop="group_id">
                    <org :disabled="true" :error="errorgroup" :orglist="form.group_id" @getOrgids="getGroupId"
                         orgtype="2" style="width:20vw"></org>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :error="errorcenter" :label="$t('label.center')" prop="center_id">
                    <org :disabled="true" :error="errorcenter" :orglist="form.center_id"
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
                <el-col :span="8">
                  <el-form-item
                    :label="$t('label.PFANS5001FORMVIEW_PROJECTTYPE')"
                    prop="projecttype"
                  >
                    <dicselect
                      :code="code"
                      :data="form.projecttype"
                      :disabled="true"
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
                      :code="code1"
                      :data="form.field"
                      :disabled="true"
                      :multiple="multiple"
                      style="width: 20vw"
                      @change="getfield"
                    ></dicselect>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item
                    :label="$t('label.PFANS5001FORMVIEW_COUNTRY')"
                    prop="country"
                  >
                    <dicselect
                      :code="code6"
                      :data="form.country"
                      :disabled="true"
                      :multiple="multiple"
                      style="width: 20vw"
                      @change="getcountry"
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
                      :disabled="true"
                      :multiple="multiple"
                      style="width: 20vw"
                      @change="getcaron"
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
                <!--受託工数-->
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
              </el-row>
              <el-row>
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

            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS5009FORMVIEW_STAGEINFORMATION')" name="second">
              <el-form-item>
                <el-row>
                  <el-col :span="24">
                    <el-table :data="tableP" header-cell-class-name="sub_bg_color_blue" stripe border>
                      <el-table-column :label="$t('label.PFANS5009FORMVIEW_PHASE')" align="center" width="100">
                        <template slot-scope="scope">
                          <dicselect
                            :code="code5"
                            :data="scope.row.phase"
                            :disabled="true"
                            :no="scope.row"
                          ></dicselect>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS5009FORMVIEW_STAGEPRODUCT')" align="center" width="100">
                        <template slot-scope="scope">
                          <!--                          <el-input :disabled="true" style="width: 100%"-->
                          <!--                                    maxlength="20"-->
                          <!--                                    v-model="scope.row.stageproduct"-->
                          <!--                                    v-show="scope.row.showrow">-->
                          <!--                          </el-input>-->
                          <dicselect :code="code2"
                                     :data="scope.row.stageproduct"
                                     :disabled="true"
                                     :no="scope.row"
                                     @change="getrole1"
                                     style="width: 100%" v-if="scope.row.phase === 'PP012001'">
                          </dicselect>
                          <dicselect :code="code3"
                                     :data="scope.row.stageproduct"
                                     :disabled="true"
                                     :no="scope.row"
                                     @change="getrole1"
                                     style="width: 100%" v-if="scope.row.phase === 'PP012002'">
                          </dicselect>
                          <dicselect :code="code4"
                                     :data="scope.row.stageproduct"
                                     :disabled="true"
                                     :no="scope.row"
                                     @change="getrole1"
                                     style="width: 100%" v-if="scope.row.phase === 'PP012003'">
                          </dicselect>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS5009FORMVIEW_PRODUCTSTATUS')" align="center" width="100">
                        <template slot-scope="scope">
                          <el-input :disabled="!disabled" :no="scope.row" maxlength="20" style="width: 100%;"
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
                      <el-table-column :label="$t('label.PFANS5009FORMVIEW_ESTIMATEDSTARTTIME')" align="center"
                                       width="200">
                        <template slot-scope="scope">
                          <el-date-picker
                            maxlength="20"
                            v-model="scope.row.estimatedstarttime"
                            :no="scope.row"
                            :disabled="true"
                            type="date"
                            style="width: 100%"
                          ></el-date-picker>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS5009FORMVIEW_ESTIMATEDENDTIME')" align="center"
                                       width="200">
                        <template slot-scope="scope">
                          <el-date-picker
                            maxlength="20"
                            v-model="scope.row.estimatedendtime"
                            :no="scope.row"
                            :disabled="true"
                            type="date"
                            style="width: 100%"
                          ></el-date-picker>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS5009FORMVIEW_REMARKS')" align="center" width="100">
                        <template slot-scope="scope">
                          <el-input :disabled="!disabled" :no="scope.row" maxlength="20" style="width: 100%;"
                                    v-model.trim="scope.row.remarks"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS5009FORMVIEW_ACTUALSTARTTIME')" align="center"
                                       width="200">
                        <template slot-scope="scope">
                          <el-date-picker
                            maxlength="20"
                            v-model="scope.row.actualstarttime"
                            :no="scope.row"
                            :disabled="!disabled"
                            type="date"
                            style="width: 100%"
                          ></el-date-picker>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS5009FORMVIEW_ACTUALENDTIME')" align="center" width="200">
                        <template slot-scope="scope">
                          <el-date-picker
                            maxlength="20"
                            v-model="scope.row.actualendtime"
                            :no="scope.row"
                            :disabled="!disabled"
                            type="date"
                            style="width: 100%"
                          ></el-date-picker>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS5009FORMVIEW_PRODUCT')" align="center" width="200">
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
                    </el-table>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS5009FORMVIEW_PROJECTSYSTEM')" name="third">
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
                                :disabled="true"
                                :no="scope.row"
                                :userlist="scope.row.name"
                                @getUserids="getCitationUserid"
                                :multiple="multiple"
                                style="width: 18vw"
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
                                :disabled="true"
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
                                :disabled="true"
                                type="date"
                                :no="scope.row"
                                v-model="scope.row.exittime"
                                style="width: 9rem">
                              </el-date-picker>
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
                              <el-input
                                v-model="scope.row.name"
                                :disabled="true"
                                style="width: 100%">
                              </el-input>
                              <!--                              <el-col :span="8">-->
                              <!--                                <div class="dpSupIndex" style="width:10vw" prop="expname">-->
                              <!--                                  <el-container>-->
                              <!--                                    <input class="content bg" v-model="scope.row.name" :error="errorexpname"-->
                              <!--                                           :disabled="true"></input>-->
                              <!--                                    <el-button :disabled="true" icon="el-icon-search"-->
                              <!--                                               @click="dialogTableVisible1 = true"-->
                              <!--                                               size="small"></el-button>-->
                              <!--                                    <el-dialog :title="$t('label.PFANS5001FORMVIEW_OUTSOURCEPERSON')"-->
                              <!--                                               :visible.sync="dialogTableVisible1"-->
                              <!--                                               center size="50%"-->
                              <!--                                               top="8vh" lock-scroll-->
                              <!--                                               append-to-body>-->
                              <!--                                      <div style="text-align: center">-->
                              <!--                                        <el-row style="text-align: center;height: 90%;overflow: hidden">-->
                              <!--                                          <el-table-->
                              <!--                                            :data="gridData1.filter(data => !search || data.expname.toLowerCase().includes(search.toLowerCase()))"-->
                              <!--                                            height="500px" highlight-current-row style="width: 100%"-->
                              <!--                                            tooltip-effect="dark"-->
                              <!--                                            @row-click="handleClickChange">-->
                              <!--                                            <el-table-column property="number" fixed :label="$t('label.PFANS5001FORMVIEW_NUMBERS')"-->
                              <!--                                                             width="100"></el-table-column>-->
                              <!--                                            <el-table-column property="expname" fixed-->
                              <!--                                                             :label="$t('label.PFANSUSERFORMVIEW_CUSTOMERNAME')"-->
                              <!--                                                             width="100"></el-table-column>-->
                              <!--                                            <el-table-column property="suppliername" :label="$t('label.PFANS5001FORMVIEW_COOPERATIONCOMPANY')"-->
                              <!--                                                             width="100"></el-table-column>-->
                              <!--                                            <el-table-column property="post"-->
                              <!--                                                             :label="$t('label.PFANSUSERVIEW_POST')"-->
                              <!--                                                             width="150"></el-table-column>-->
                              <!--                                            <el-table-column-->
                              <!--                                              align="right" width="180">-->
                              <!--                                              <template slot="header" slot-scope="scope">-->
                              <!--                                                <el-input-->
                              <!--                                                  v-model="search"-->
                              <!--                                                  size="mini"-->
                              <!--                                                  placeholder="请输入姓名关键字搜索"/>-->
                              <!--                                              </template>-->
                              <!--                                            </el-table-column>-->
                              <!--                                          </el-table>-->
                              <!--                                        </el-row>-->
                              <!--                                        <span slot="footer" class="dialog-footer">-->
                              <!--                                            <el-button type="primary" @click="submit(scope.row)">{{$t('button.confirm')}}</el-button>-->
                              <!--                                          </span>-->
                              <!--                                      </div>-->
                              <!--                                    </el-dialog>-->
                              <!--                                  </el-container>-->
                              <!--                                </div>-->
                              <!--                              </el-col>-->
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
                                :disabled="true"
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
                                :disabled="true"
                                type="date"
                                :no="scope.row"
                                v-model="scope.row.exittime"
                                style="width: 9rem">
                              </el-date-picker>
                            </template>
                          </el-table-column>
                        </el-table>
                      </el-tab-pane>
                    </el-tabs>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-tab-pane>

            <el-tab-pane :label="$t('label.PFANS5001FORMVIEW_CONTRACT')" name="fifth">
              <el-form-item>
                <el-table :data="tableD" stripe border header-cell-class-name="sub_bg_color_blue"
                          style="width: 90vw">
                  <el-table-column
                    :label="$t('label.PFANS5009FORMVIEW_CONTRACT')"
                    align="center">
                    <template slot-scope="scope">
                      <el-col :span="8">
                        <div class="dpSupIndex" style="width:20vw">
                          <el-container>
                            <input class="content bg" v-model="scope.row.contract"
                                   :disabled="scope.row.type === '0' ? true : false"></input>
                            <el-button  :disabled="scope.row.type === '0' ? true : false" icon="el-icon-search" @click="dialogTableVisible3 = true"
                                       size="small"></el-button>
                            <el-dialog :title="$t('menu.BROKERAGECONTRACT')" :visible.sync="dialogTableVisible3" center
                                       size="50%"
                                       top="8vh" lock-scroll
                                       append-to-body>
                              <div style="text-align: center">
                                <el-row style="text-align: center;height: 90%;overflow: hidden">

                                  <el-table
                                    :data="gridData3.filter(data => !search || data.contract.toLowerCase().includes(search.toLowerCase()))"
                                    height="500px" highlight-current-row style="width: 100%" tooltip-effect="dark"
                                    @row-click="handleClickChange2">
                                    <el-table-column property="contract"
                                                     :label="$t('label.PFANS1032FORMVIEW_CONTRACTNUMBER')"
                                                     width="100"></el-table-column>
                                    <el-table-column property="deployment" :label="$t('label.group')"
                                                     width="100"></el-table-column>
                                    <el-table-column property="contracttype"
                                                     :label="$t('label.PFANS1024VIEW_CONTRACTTYPE')"
                                                     width="150"></el-table-column>
                                    <el-table-column property="applicationdate"
                                                     :label="$t('label.PFANS1024VIEW_APPLICATIONDATE')"
                                                     width="100"></el-table-column>
                                    <el-table-column property="state"
                                                     :label="$t('label.approval_status')"
                                                     width="100"></el-table-column>
                                    <el-table-column property="claimdatetime"
                                                     :label="$t('label.PFANS1024VIEW_CLAIMDATETIME')"
                                                     width="100"></el-table-column>
                                    <el-table-column
                                      align="right" width="230">
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
                    align="center">
                    <template slot-scope="scope">
                      <el-input
                        :no="scope.row"
                        :disabled="true"
                        v-model="scope.row.theme"
                        style="width: 100%">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMDATETIME')" align="center" prop="claimdatetime"
                                   width="370">
                    <template slot-scope="scope">
                      <el-date-picker unlink-panels
                                      class="bigWidth"
                                      :disabled="true"
                                      v-model.trim="scope.row.workinghours"
                                      type="daterange"
                                      :end-placeholder="$t('label.enddate')"
                                      :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                                      :start-placeholder="$t('label.startdate')"
                      ></el-date-picker>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.operation')" align="center" width="200">
                    <template slot-scope="scope">
                      <el-button
                        :disabled="scope.row.type === '0' ? true : false"
                        @click.native.prevent="deleteRow3(scope.$index, tableD)"
                        plain
                        size="small"
                        type="danger"
                      >{{$t('button.delete')}}
                      </el-button>

                      <el-button
                        :disabled="adddisabled"
                        @click="addRow3()"
                        plain
                        size="small"
                        type="primary"
                      >{{$t('button.insert')}}
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-tab-pane>


            <!--&lt;!&ndash;            工时统计&ndash;&gt;-->
            <!--            <el-tab-pane :label="$t('label.PFANS5009FORMVIEW_WORKSTATISTICS')" name="forth">-->
            <!--              <el-form-item>-->
            <!--                <el-row>-->
            <!--                  <el-col :span="24">-->
            <!--                    <el-table :data="tableA" header-cell-class-name="sub_bg_color_blue" stripe border>-->
            <!--                      <el-table-column :label="$t('label.PFANS5009FORMVIEW_MONTH')" align="center" width="100">-->
            <!--                        <template slot-scope="scope">-->
            <!--                          <el-input-->
            <!--                            :no="scope.row"-->
            <!--                            :disabled="!disabled"-->
            <!--                            v-model="scope.row.month"-->
            <!--                            style="width: 100%">-->
            <!--                          </el-input>-->
            <!--                        </template>-->
            <!--                      </el-table-column>-->
            <!--                      <el-table-column :label="$t('label.PFANS5009FORMVIEW_ESTIMATEDWORK')" align="center" width="200">-->
            <!--                        <template slot-scope="scope">-->
            <!--                          <el-input-->
            <!--                            :no="scope.row"-->
            <!--                            :disabled="!disabled"-->
            <!--                            v-model="scope.row.estimatedwork"-->
            <!--                            style="width: 100%">-->
            <!--                          </el-input>-->
            <!--                        </template>-->
            <!--                      </el-table-column>-->
            <!--                      <el-table-column :label="$t('label.PFANS5009FORMVIEW_ACTUALWORK')" align="center" width="200">-->
            <!--                        <template slot-scope="scope">-->
            <!--                          <el-input-->
            <!--                            :no="scope.row"-->
            <!--                            :disabled="!disabled"-->
            <!--                            v-model="scope.row.actualwork"-->
            <!--                            style="width: 100%">-->
            <!--                          </el-input>-->
            <!--                        </template>-->
            <!--                      </el-table-column>-->
            <!--                      <el-table-column :label="$t('label.operation')" align="center" width="200">-->
            <!--                        <template slot-scope="scope">-->
            <!--                          <el-button-->
            <!--                            :disabled="!disabled"-->
            <!--                            @click.native.prevent="deleteRow(scope.$index, tableA)"-->
            <!--                            plain-->
            <!--                            size="small"-->
            <!--                            type="danger"-->
            <!--                          >{{$t('button.delete')}}-->
            <!--                          </el-button>-->
            <!--                          <el-button-->
            <!--                            :disabled="!disabled"-->
            <!--                            @click="addRow()"-->
            <!--                            plain-->
            <!--                            size="small"-->
            <!--                            type="primary"-->
            <!--                          >{{$t('button.insert')}}-->
            <!--                          </el-button>-->
            <!--                        </template>-->
            <!--                      </el-table-column>-->

            <!--                    </el-table>-->
            <!--                  </el-col>-->
            <!--                </el-row>-->
            <!--              </el-form-item>-->

            <!--            </el-tab-pane>-->
            <!--            <el-tab-pane :label="$t('label.PFANS5009FORMVIEW_PROJECTANALYSIS')" name="fifth">-->
            <!--            </el-tab-pane>-->
            <!--            <el-tab-pane :label="$t('label.PFANS5009FORMVIEW_PROJECTQCD')" name="sixth">-->
            <!--            </el-tab-pane>-->
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
    import {Message} from 'element-ui';
    import moment from 'moment';
    import {getOrgInfoByUserId} from '@/utils/customize';
    import org from '../../../components/org';
    import {getDictionaryInfo} from '../../../../utils/customize';
    export default {
        name: 'PFANS5009FormView',
        components: {
            EasyNormalContainer,
            getOrgInfoByUserId,
            user,
            dicselect,
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
                adddisabled: false,
                disable: true,
                centerorglist: '',
                grouporglist: '',
                teamorglist: '',
                userlist: '',
                userlist1: '',
                dialogTableVisible3: false,
                loading: false,
                errorLeader: '',
                errorManager: '',
                errorcenter: '',
                errorgroup: '',
                errorexpname: '',
                search: '',
                gridData1: [],
                customerinfor: [],
                checkList: [],
                expatriates: [],
                selectType: 'Single',
                activeName: 'first',
                activeName2: 'first',
                title: 'title.PFANS5009VIEW',
                buttonList: [],
                currentRow: '',
                currentRow1: '',
                currentRow2: '',
                currentRow3: '',
                tabIndex: 0,
              multiple: false,

                //主页
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
                    languages: '',
                    startdate: moment(new Date()).format('YYYY-MM-DD'),
                    enddate: '',
                    work: '',
                    deadline: moment(new Date()).format('YYYY-MM-DD'),
                },

                //阶段信息
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
                    month: '',
                    remarks: '',
                    actualstarttime: '',
                    actualendtime: '',
                    product: '',
                    rowindex: '',
                    showrow: true,
                    showrow1: false,
                    showrow2: false,
                    showrow3: false,
                }],

                //项目体制  社内
                tableB: [
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
                ],

                //项目体制  社外
                tableC: [
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
                ],

                //工时统计
                tableA: [
                    {
                        stageinformation_id: '',
                        companyprojects_id: '',
                        month: '',
                        estimatedwork: '',
                        actualwork: '',
                        rowindex: '',
                    },
                ],

                //合同
                tableD: [
                    {
                        projectcontract_id: '',
                        companyprojects_id: '',
                        contract: '',
                        theme: '',
                        workinghours: '',
                        rowindex: '',
                        type:'0',
                    },
                ],

                data: [],
                gridData3: [],
                code: 'PP001',
                code1: 'PP002',
                code2: 'PP013',
                code3: 'PP014',
                code4: 'PP015',
                code5: 'PP012',
              code6: 'PP017',
              code7: 'PP016',
                showrow: true,
                showrow1: false,
                showrow2: false,
                showrow3: false,
                disabled: true,
                menuList: [],
                baseInfo: {},
                dialogTableVisible1: false,
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
                    languages: [
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
            this.getcontract();
            // this.getexpatriatesinfor();
            if (this.$route.params._id) {
                this.loading = true;
                this.$store
                    .dispatch('PFANS5009Store/selectById', {companyprojectsid: this.$route.params._id})
                    .then(response => {
                        this.form = response.companyprojects;
                        this.userlist = this.form.leaderid;
                        this.userlist1 = this.form.managerid;
                        this.centerorglist = this.form.center_id;
                        this.grouporglist = this.form.group_id;
                        this.teamorglist = this.form.team_id;
                        if (response.stageinformation.length > 0) {
                            this.tableP = [];
                            //阶段信息
                            for (let h = 0; h < response.stageinformation.length; h++) {
                                let o = {};
                                o.phase = response.stageinformation[h].phase;
                                o.stageproduct = response.stageinformation[h].stageproduct;
                                o.productstatus = response.stageinformation[h].productstatus;
                                o.estimatedwork = response.stageinformation[h].estimatedwork;
                                o.actualwork = response.stageinformation[h].actualwork;
                                o.estimatedstarttime = response.stageinformation[h].estimatedstarttime;
                                o.estimatedendtime = response.stageinformation[h].estimatedendtime;
                                o.remarks = response.stageinformation[h].remarks;
                                o.actualstarttime = response.stageinformation[h].actualstarttime;
                                o.actualendtime = response.stageinformation[h].actualendtime;
                                o.product = response.stageinformation[h].product;
                                this.tableP.push(o);
                            }
                        }
                        //项目合同
                        if (response.projectcontract.length > 0) {
                            let tabled = [];
                            for (var i = 0; i < response.projectcontract.length; i++) {
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
                                    type:'0',
                                })
                            }
                            this.tableD = tabled;
                        }
                        if (response.projectsystem.length > 0) {
                            //项目体制
                            for (var i = 0; i < response.projectsystem.length; i++) {
                                if (response.projectsystem[i].type === '0') {
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
                                } else {
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
                        // this.baseInfo.stageInformation = JSON.parse(JSON.stringify(this.tableP));
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
            // this.$store
            //   .dispatch('PFANS5001Store/getexpatriatesinfor', {})
            //   .then(response => {
            //     for (let i = 0; i < response.length; i++) {
            //       var vote = {};
            //       this.result = response;
            //       vote.value = response[i].expatriatesinfor_id;
            //       vote.label = response[i].expname;
            //       this.expatriates.push(vote);
            //     }
            //   });
        },
        created() {
            this.disabled = this.$route.params.disabled;
            this.adddisabled = this.$route.params.adddisabled;
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
            workflowState(val) {
                if (val.state === "1") {
                    this.form.status = "6";
                } else if (val.state === "2") {
                    this.form.status = "4";
                }
                this.buttonClick("update");
            },
            start() {
                this.form.status = "5";
                this.buttonClick("update");
            },
            end() {
                this.form.status = "0";
                this.buttonClick("update");
            },
            addRow3() {
                this.tableD.push({
                    projectcontract_id: '',
                    companyprojects_id: '',
                    contract: '',
                    theme: '',
                    workinghours: '',
                    rowindex: '',
                    type: '1',
                });
            },
            deleteRow3(index, rows) {
                if (rows.length > 1) {
                    rows.splice(index, 1);
                } else {
                    this.tableD = [{
                        projectcontract_id: '',
                        companyprojects_id: '',
                        contract: '',
                        theme: '',
                        workinghours: '',
                        rowindex: '',
                        type: '1',
                    }];
                }
            },
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
            getcontract() {
                this.contractapplication = {};
                this.contractapplication.entrycondition = [];
                this.contractapplication.entrycondition = 'HT004007';
                this.loading = true;
                this.$store
                    .dispatch('PFANS1026Store/get', this.contractapplication)
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
                            vote2.claimdatetime= response.contractapplication[i].claimdatetime;
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
            handleClickChange2(val) {
                this.currentRow = val.contract;
                this.themeRow= val.contract;
                this.workinghoursRow= val.claimdatetime;
            },
            submit2(row) {
                row.contract = this.currentRow;
                row.theme = this.themeRow;
                row.workinghours = this.workinghoursRow;
                this.dialogTableVisible3 = false;
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
            addRow() {
                this.tableA.push({
                    stageinformation_id: '',
                    companyprojects_id: '',
                    month: '',
                    estimatedwork: '',
                    actualwork: '',
                    rowindex: '',
                });
            },
            deleteRow(index, rows) {
                if (rows.length > 1) {
                    rows.splice(index, 1);
                } else {
                    this.tableA = [{
                        stageinformation_id: '',
                        companyprojects_id: '',
                        month: '',
                        estimatedwork: '',
                        actualwork: '',
                        rowindex: '',
                    }];
                }
            },
            getCitationUserid(userlist, row) {
                row.name = userlist;
                if (row.name != null && row.name !== '') {
                    let lst = getUserInfo(row.name);
                    row.position = lst.userinfo.post;
                    row.number = lst.userinfo.jobnumber;
                }
            },
            getcustomer(val) {
                this.result1.forEach(res => {
                    if (res.customerinfor_id === val) {
                        this.form.representative = res.liableperson;
                    }
                });
            },
            // getexpatriatesinfor() {
            //   this.loading = true;
            //   this.$store
            //     .dispatch('PFANS6004Store/getexpatriatesinfor', {})
            //     .then(response => {
            //       this.gridData1 = [];
            //       for (let i = 0; i < response.length; i++) {
            //         var vote1 = {};
            //         vote1.number = response[i].number;
            //         vote1.expname = response[i].expname;
            //         vote1.suppliername =  response[i].suppliername;
            //         vote1.post = response[i].post;
            //         this.gridData1.push(vote1);
            //       }
            //       this.centerorglist = this.form.center_id;
            //       this.grouporglist = this.form.group_id;
            //       this.teamorglist = this.form.team_id;
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
            // getrole(val, row) {
            //   row.phase = val;
            //   row.stageproduct = '';
            //   if (val === '') {
            //     row.showrow = true;
            //     row.showrow1 = false;
            //     row.showrow2 = false;
            //     row.showrow3 = false;
            //   } else if (val === 'PP012001') {
            //     row.showrow = false;
            //     row.showrow1 = true;
            //     row.showrow2 = false;
            //     row.showrow3 = false;
            //   } else if (val === 'PP012002') {
            //     row.showrow = false;
            //     row.showrow1 = false;
            //     row.showrow2 = true;
            //     row.showrow3 = false;
            //   } else if (val === 'PP012003') {
            //     row.showrow = false;
            //     row.showrow1 = false;
            //     row.showrow2 = false;
            //     row.showrow3 = true;
            //   }
            // },
            getrole1(val, row) {
                row.stageproduct = val;
            },
            getProduct(row) {
                if (row.product === '1') {
                    row.productstatus = this.$t('label.PFANS5009FORMVIEW_SUBMITTED');
                } else {
                    row.productstatus = this.$t('label.PFANS5009FORMVIEW_NOTSUBMITTED');
                }
            },
            getArea(val) {
                this.form.field = val;
            },
            getType(val) {
                this.form.projecttype = val;
            },
            handleClickChange(val) {
                this.currentRow = val.number;
                this.currentRow1 = val.expname;
                this.currentRow2 = val.suppliername;
                this.currentRow3 = val.post;
            },
            getworkinghours(workinghours) {
                if (workinghours != null) {
                    if (workinghours.length > 0) {
                        return moment(workinghours[0]).format('YYYY-MM-DD') + " ~ " + moment(workinghours[1]).format('YYYY-MM-DD');
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
                this.$refs['refform'].validate(valid => {
                    if (valid) {
                        this.loading = true;
                        this.baseInfo = {};
                        this.baseInfo.companyprojects = JSON.parse(JSON.stringify(this.form));
                        this.baseInfo.stageinformation = [];
                        this.baseInfo.projectcontract = [];
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
                        for (let i = 0; i < this.tableP.length; i++) {
                            if (
                                this.tableP[i].phase !== '' ||
                                this.tableP[i].stageproduct !== '' ||
                                this.tableP[i].productstatus !== '' ||
                                this.tableP[i].estimatedwork !== '' ||
                                this.tableP[i].actualwork !== '' ||
                                this.tableP[i].estimatedstarttime !== '' ||
                                this.tableP[i].estimatedendtime !== '' ||
                                this.tableP[i].remarks !== '' ||
                                this.tableP[i].actualstarttime !== '' ||
                                this.tableP[i].actualendtime !== '' ||
                                this.tableP[i].product !== ''
                            ) {
                                this.baseInfo.stageinformation.push({
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
                                    product: this.tableP[i].product,
                                });
                            }
                        }
                        if (this.$route.params._id) {
                            this.baseInfo.companyprojects.companyprojects_id = this.$route.params._id;
                            this.form.center_id = this.centerorglist;
                            this.form.group_id = this.grouporglist;
                            this.form.team_id = this.teamorglist;
                            this.form.startdate = moment(this.form.startdate).format('YYYY-MM-DD');
                            this.form.enddate = moment(this.form.enddate).format('YYYY-MM-DD');
                            this.form.deadline = moment(this.form.deadline).format('YYYY-MM-DD');
                            this.loading = true;
                            this.$store
                                .dispatch('PFANS5009Store/update', this.baseInfo)
                                .then(response => {
                                    this.data = response;
                                    this.loading = false;
                                    if (val !== 'update') {
                                        Message({
                                            message: this.$t('normal.success_02'),
                                            type: 'success',
                                            duration: 5 * 1000,
                                        });
                                        this.$router.push({
                                            name: 'PFANS5009View',
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
