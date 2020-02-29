<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList"
                         :title="title"
                         @buttonClick="buttonClick"
                         :canStart="canStart"
                         @end="end" @start="start"
                         @workflowState="workflowState"
                         ref="container"
                         v-loading="loading">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="reff" style="padding: 2vw">
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane :label="$t('label.PFANS1028VIEW_JUDGE')" name="first">
              <div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1028VIEW_CAREER')">
                      <el-input  :disabled="!disable" style="width:20vw" v-model="form.career"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :error="errorgroup" :label="$t('label.PFANS1028VIEW_ORGANIZATION')" prop="group_id">
                      <org :disabled="!disable" :error="errorgroup" :orglist="grouporglist" @getOrgids="getGroupId"
                           orgtype="2" style="width:20vw"></org>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <!--取番号，-->
                    <el-form-item :label="$t('label.PFANS1028VIEW_NO')">
                        <el-input  :disabled="!disable" style="width:20vw" v-model="form.decisionnumber"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <!--取契约番号-->
                    <el-form-item :label="$t('label.PFANS1028VIEW_JAPANNO')">
                      <el-select :disabled="!disable" style="width:20vw" v-model="form.contractnumber">
                        <el-option
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                          v-for="item in options">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <!--带出PJ名-->
                    <el-form-item :label="$t('label.PFANS1028VIEW_NAME')">
                      <el-input  :disabled="!disable" style="width:20vw" v-model="form.placejapanese"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1032FORMVIEW_DEPOSITARY')">
                      <el-input  :disabled="!disable" style="width:20vw" v-model="form.custoenglish"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <!--写达到TO-->
                    <el-form-item :label="$t('label.PFANS1028VIEW_COUNTRY')">
                      <el-input  :disabled="!disable"style="width:20vw" v-model="form.varto"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>


                <!--关联-->
                <el-row>
                  <el-col :span="24">
                    <el-form-item
                      :label="$t('label.PFANS1028VIEW_REVIEW')">
                      <!--                        <el-checkbox-group v-model="checkList">-->
                      <!--                          <el-checkbox  :label="$t('label.PFANS1028VIEW_REQUIREMENTS1')"></el-checkbox>-->
                      <!--                          <el-checkbox  :label="$t('label.PFANS1028VIEW_REQUIREMENTS3')"></el-checkbox>-->
                      <!--                          <el-checkbox  :label="$t('label.PFANS1028VIEW_REQUIREMENTS2')"></el-checkbox>-->
                      <!--                        </el-checkbox-group>-->
                      <el-row>
                        <el-col :span="4">
                          <el-checkbox v-model="checked1" @change="getChecked1" :disabled="disabled1" style="margin-left: 50px">
                            <p>{{$t('label.PFANS1028VIEW_REQUIREMENTS1')}}</p>
                          </el-checkbox>
                        </el-col>
                        <el-col :span="20">
                          <el-checkbox v-model="checked3" :disabled="disabled3"  @change="getChecked3">
                            <p>{{$t('label.PFANS1028VIEW_REQUIREMENTS3')}}</p>
                          </el-checkbox>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="8">
                          <el-checkbox v-model="checked2" :disabled="disabled2" @change="getChecked2" style="margin-left: 50px">
                            <p>{{$t('label.PFANS1028VIEW_REQUIREMENTS2')}}</p>
                          </el-checkbox>
                        </el-col>
                      </el-row>
                    </el-form-item>
                  </el-col>
                </el-row>

                <!--关联-->
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1028VIEW_REQUIREMENTS')" >
                      <span style="margin-right: 1vw ">{{$t('label.PFANS1028VIEW_NOT')}}</span>
                      <el-switch
                        :disabled="!disabled"
                        v-model="form.requirements"
                        active-value="1"
                        inactive-value="0">
                      </el-switch>
                      <span style="margin-left: 1vw ">{{$t('label.PFANS1028VIEW_YES')}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>



                <!--開発開始日-->
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1028VIEW_PERIOD')" >
                      <el-date-picker
                        v-model="form.claimdatetime"
                        :disabled="!disable"
                        type="daterange"
                        :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                        :start-placeholder="$t('label.startdate')"
                        :end-placeholder="$t('label.enddate')"
                        style="width:20vw">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item :label="$t('label.PFANS1028VIEW_TECHNICAL')">
                      <el-input  :disabled="!disable"  v-model="form.technical"  style="width: 70vw" type="textarea"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item
                      :label="$t('label.PFANS1028VIEW_POSSIBLE')">
                      <el-checkbox-group v-model="checkList">
                        <el-checkbox  :label="$t('label.PFANS1028VIEW_BOOKS')"></el-checkbox>
                        <el-checkbox  :label="$t('label.PFANS1028VIEW_SOFTWARE')"></el-checkbox>
                        <el-checkbox  :label="$t('label.PFANS1028VIEW_MAIL')"></el-checkbox>
                        <el-checkbox  :label="$t('label.PFANS1028VIEW_SERVER')"></el-checkbox>
                        <el-checkbox  :label="$t('label.PFANS1028VIEW_MEETING')"></el-checkbox>
                        <el-checkbox  :label="$t('label.PFANS1028VIEW_COUNTRY2')"></el-checkbox>
                        <el-checkbox  :label="$t('label.PFANS1028VIEW_OTHERC')"></el-checkbox>
                        <el-checkbox  :label="$t('label.PFANS1028VIEW_OVERSEA')"></el-checkbox>
                        <el-checkbox  :label="$t('label.PFANS1028VIEW_COUNTRY3')"></el-checkbox>
                        <el-checkbox  :label="$t('label.PFANS1028VIEW_OTHERC2')"></el-checkbox>
                        <el-checkbox  :label="$t('label.PFANS1028VIEW_OTHER')"></el-checkbox>
                      </el-checkbox-group>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-collapse>
                  <el-collapse-item>
                    <template slot="title">
                      <span class="collapse_Title">{{$t('label.PFANS1028VIEW_DETERMINE')}}</span>
                    </template>
                    <el-row>


                      <!--判断联动-->
                      <el-col :span="12">
                        <el-form-item :label="$t('label.PFANS1028VIEW_OUTPUTLIMIT2')">
                          <el-radio
                            :disabled="!disable"
                            label="0"
                            v-model="form.outputlimit2"
                          >{{this.$t('label.PFANS1028VIEW_PROHIBITED')}}</el-radio>
                          <el-radio
                            :disabled="!disable"
                            label="1"
                            v-model="form.outputlimit2"
                          >{{this.$t('label.PFANS1028VIEW_LIMITATION')}}</el-radio>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item :label="$t('label.PFANS1028VIEW_REASON')">
                          <el-input  :disabled="!disable" style="width:20vw" v-model="form.reason"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <el-form-item :label="$t('label.PFANS1028VIEW_RESTRICTED')">
                          <el-row>
                            <el-col :span="12">
                              <el-form-item :label="$t('label.PFANS1028VIEW_WEAPON')">
                                <el-radio
                                  :disabled="!disable"
                                  label="0"
                                  v-model="form.weapon"
                                >{{this.$t('label.PFANS1028VIEW_JANO')}}</el-radio>
                                <el-radio
                                  :disabled="!disable"
                                  label="1"
                                  v-model="form.weapon"
                                >{{this.$t('label.PFANS1028VIEW_PRONO')}}</el-radio>
                              </el-form-item>
                            </el-col>
                            <el-col :span="12">
                              <el-form-item :label="$t('label.PFANS1028VIEW_RESON')">
                                <el-input  :disabled="!disable" style="width:20vw" v-model="form.weaponreson"></el-input>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="12">
                              <el-form-item :label="$t('label.PFANS1028VIEW_WORD')">
                                <el-radio
                                  :disabled="!disable"
                                  label="0"
                                  v-model="form.word"
                                >{{this.$t('label.PFANS1028VIEW_JANO')}}</el-radio>
                                <el-radio
                                  :disabled="!disable"
                                  label="1"
                                  v-model="form.word"
                                >{{this.$t('label.PFANS1028VIEW_PRONO')}}</el-radio>
                              </el-form-item>
                            </el-col>
                            <el-col :span="12">
                              <el-form-item :label="$t('label.PFANS1028VIEW_RESON')">
                                <el-input  :disabled="!disable" style="width:20vw" v-model="form.wordreson"></el-input>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="12">
                              <el-form-item :label="$t('label.PFANS1028VIEW_SPECIFI')">
                                <el-radio
                                  :disabled="!disable"
                                  label="0"
                                  v-model="form.specifi"
                                >{{this.$t('label.PFANS1028VIEW_JANO')}}</el-radio>
                                <el-radio
                                  :disabled="!disable"
                                  label="1"
                                  v-model="form.specifi"
                                >{{this.$t('label.PFANS1028VIEW_PRONO')}}</el-radio>
                              </el-form-item>
                            </el-col>
                            <el-col :span="12">
                              <el-form-item :label="$t('label.PFANS1028VIEW_RESON')">
                                <el-input  :disabled="!disable" style="width:20vw" v-model="form.specifireson"></el-input>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-row>
                            <el-radio
                              :disabled="!disable"
                              label="0"
                              v-model="form.restricted"
                            >{{this.$t('label.PFANS1028VIEW_NOTALL')}}</el-radio>
                            <el-radio
                              :disabled="!disable"
                              label="1"
                              v-model="form.restricted"
                            >{{this.$t('label.PFANS1028VIEW_POSSCAN')}}</el-radio>
                          </el-row>
                        </el-form-item>
                      </el-col>
                      <el-row>
                        <el-col :span="12">
                            <el-radio
                              :disabled="!disable"
                              label="0"
                              v-model="form.regulation"
                            >{{this.$t('label.PFANS1028VIEW_RULES1')}}</el-radio>
                            <el-radio
                              :disabled="!disable"
                              label="1"
                              v-model="form.regulation"
                            >{{this.$t('label.PFANS1028VIEW_RULES2')}}</el-radio>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item :label="$t('label.PFANS1028VIEW_MANAGEMENT2')">
                            <el-radio
                              :disabled="!disable"
                              label="0"
                              v-model="form.management2"
                            >{{this.$t('label.PFANS1028VIEW_YES')}}</el-radio>
                            <el-radio
                              :disabled="!disable"
                              label="1"
                              v-model="form.management2"
                            >{{this.$t('label.PFANS1028VIEW_NOT')}}</el-radio>
                            <el-radio
                              :disabled="!disable"
                              label="3"
                              v-model="form.management2"
                            >{{this.$t('label.PFANS1028VIEW_ELEPHANTS')}}</el-radio>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item :label="$t('label.PFANS1028VIEW_REASON')">
                            <el-input  :disabled="!disable" style="width:20vw" v-model="form.mareason"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="24">
                          <el-form-item :label="$t('label.PFANS1028VIEW_MANAGEMENT3')">
                            <el-radio
                              :disabled="!disable"
                              label="0"
                              v-model="form.management3"
                            >{{this.$t('label.PFANS1028VIEW_YES')}}</el-radio>
                            <el-radio
                              :disabled="!disable"
                              label="1"
                              v-model="form.management3"
                            >{{this.$t('label.PFANS1028VIEW_NOT')}}</el-radio>
                            <el-radio
                              :disabled="!disable"
                              label="3"
                              v-model="form.management3"
                            >{{this.$t('label.PFANS1028VIEW_ELEPHANTS')}}</el-radio>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-row>
                  </el-collapse-item>
                </el-collapse>
                <el-collapse>
                  <el-collapse-item>
                    <template slot="title">
                      <span class="collapse_Title">{{$t('label.PFANS1028VIEW_DECRESULT')}}</span>
                    </template>
                    <el-row>
                      <el-col :span="24">
                        <el-form-item :label="$t('label.PFANS1028VIEW_MANAGEMENT4')">
                          <el-radio
                            :disabled="!disable"
                            label="0"
                            v-model="form.management4"
                          >{{this.$t('label.PFANS1028VIEW_YES2')}}</el-radio>
                          <el-radio
                            :disabled="!disable"
                            label="1"
                            v-model="form.management4"
                          >{{this.$t('label.PFANS1028VIEW_NOT')}}</el-radio>
                          <el-radio
                            :disabled="!disable"
                            label="3"
                            v-model="form.management4"
                          >{{this.$t('label.PFANS1028VIEW_ELEPHANTS2')}}</el-radio>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <el-form-item :label="$t('label.PFANS1028VIEW_JUDGED')">
                          <el-radio
                            :disabled="!disable"
                            label="0"
                            v-model="form.judged"
                          >{{this.$t('label.PFANS1028VIEW_YES3')}}</el-radio>
                          <el-radio
                            :disabled="!disable"
                            label="1"
                            v-model="form.judged"
                          >{{this.$t('label.PFANS1028VIEW_NOT')}}</el-radio>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-collapse-item>
                </el-collapse>
                <el-collapse>
                  <el-collapse-item>
                    <template slot="title">
                      <span class="collapse_Title">{{$t('label.PFANS1028VIEW_EXPORTEAR')}}</span>
                    </template>
                    <el-row>
                      <el-col :span="24">
                        <el-form-item :label="$t('label.PFANS1028VIEW_AMERICANTECHNOLOGY')">
                          <el-radio
                            :disabled="!disable"
                            label="0"
                            v-model="form.americantechnology"
                          >{{this.$t('label.PFANS1028VIEW_JANO')}}</el-radio>
                          <el-radio
                            :disabled="!disable"
                            label="1"
                            v-model="form.americantechnology"
                          >{{this.$t('label.PFANS1028VIEW_JANOJUDGE')}}</el-radio>
                          <el-radio
                            :disabled="!disable"
                            label="2"
                            v-model="form.americantechnology"
                          >{{this.$t('label.PFANS1028VIEW_NOT')}}</el-radio>
                          <el-radio
                            :disabled="!disable"
                            label="3"
                            v-model="form.americantechnology"
                          >{{this.$t('label.PFANS1028VIEW_OUGHT')}}</el-radio>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-collapse-item>
                </el-collapse>
                <el-row>
                  <el-col :span="24">
                    <el-form-item :label="$t('label.PFANS1028VIEW_JUDGECOMPLEMENT')">
                      <el-input  :disabled="!disable" style="width:70vw" v-model="form.judgecomplement"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-collapse>
                  <el-collapse-item>
                    <template slot="title">
                      <span class="collapse_Title">{{$t('label.PFANS1028VIEW_FIANLRESULT')}}</span>
                    </template>
                    <el-row>
                      <el-col :span="24">
                        <el-form-item :label="$t('label.PFANS1028VIEW_EXPORTLICENSE')">
                          <el-radio
                            :disabled="!disable"
                            label="0"
                            v-model="form.exportlicense"
                          >{{this.$t('label.PFANS1028VIEW_NECESSARY')}}</el-radio>
                          <el-radio
                            :disabled="!disable"
                            label="1"
                            v-model="form.exportlicense"
                          >{{this.$t('label.PFANS1028VIEW_UNNECESSARY')}}</el-radio>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item :label="$t('label.PFANS1028VIEW_DECRESULT')">
                          <el-radio
                            :disabled="!disable"
                            label="0"
                            v-model="form.decresult"
                          >{{this.$t('label.PFANS1028VIEW_CANOUTPUT')}}</el-radio>
                          <el-radio
                            :disabled="!disable"
                            label="1"
                            v-model="form.decresult"
                          >{{this.$t('label.PFANS1028VIEW_NOTOUTPUT')}}</el-radio>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </el-tab-pane>

            <el-tab-pane :label="$t('label.PFANS1028VIEW_OUTPUTLIMIT')" name="second">
              <div>
                <el-row>
                  <!--取契约书番号-->
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1028VIEW_JUDGENO')"  >
                      <el-input :disabled="!disable" style="width:20vw" v-model="form.outnumber"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1028VIEW_JAPANNO')">
                      <el-select :disabled="!disable" style="width:20vw" v-model="form.contractnumber">
                        <el-option
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                          v-for="item in options">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <!--带出PJ名-->
                    <el-form-item :label="$t('label.PFANS1028VIEW_NAME')">
                      <el-input  :disabled="!disable" style="width:20vw" v-model="form.placejapanese"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :error="errorgroup" :label="$t('label.PFANS1028VIEW_ORGANIZATION')" prop="group_id">
                      <org :disabled="!disable" :error="errorgroup" :orglist="grouporglist" @getOrgids="getGroupId"
                           orgtype="2" style="width:20vw"></org>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1028VIEW_TODAY')">
                      <div class="block">
                        <el-date-picker
                          :disabled="!disable"
                          style="width: 20vw"
                          type="date"
                          v-model="form.today">
                        </el-date-picker>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>

                <div>
                  <el-tabs v-model="activeName2" type="border-card">
                    <el-tab-pane :label="$t('label.PFANS1028VIEW_COMMUNICATION')" name="first">
                      <el-row >
                        <el-table :data="tableCommun"
                                  border
                                  :span-method="CommunSpanMethod"
                                  header-cell-class-name="sub_bg_color_blue" stripe>
                          <el-table-column :label="$t('label.PFANS1028VIEW_TECHNICALNUMBER')" align="center" width="150">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%" v-model="scope.row.technicalnumber">
                              </el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1028VIEW_GRADE')" align="center" width="170">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%" v-model="scope.row.grade"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1028VIEW_TECHNICALNAME')" align="center" width="150">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%" v-model="scope.row.technicalname"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1028VIEW_JUDGMENT1')" align="center" width="170">
                            <template slot-scope="scope">
<!--                              <dicselect :code="code1"-->
<!--                                         :data="scope.row.judgment1"-->
<!--                                         :disabled="!disable"-->
<!--                                         :multiple="multiple"-->
<!--                                         :no="scope.row"-->
<!--                                         @change="getjudgment1">-->
<!--                              </dicselect>-->
                              <el-select v-model="scope.row.judgment1" clearable :disabled="!disable">
                                <el-option label="o" value="1"></el-option>
                                <el-option label="x" value="2"></el-option>
                              </el-select>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1028VIEW_POINTS')" align="center" width="170">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%" v-model="scope.row.points"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1028VIEW_JUDGMENT2')" align="center" width="170">
                            <template slot-scope="scope">
<!--                              <dicselect :code="code1"-->
<!--                                         :data="scope.row.judgment2"-->
<!--                                         :disabled="!disable"-->
<!--                                         :multiple="multiple"-->
<!--                                         :no="scope.row"-->
<!--                                         @change="getjudgment2">-->
<!--                              </dicselect>-->
                              <el-select v-model="scope.row.judgment2" clearable :disabled="!disable">
                                <el-option label="o" value="1"></el-option>
                                <el-option label="x" value="2"></el-option>
                              </el-select>
                            </template>
                          </el-table-column>
                        </el-table>
                      </el-row>

                    </el-tab-pane>
                    <el-tab-pane :label="$t('label.PFANS1028VIEW_DELIVERY')" name="second">
                      <el-row >
                        <el-table :data="tableDelivery"
                                  border
                                  header-cell-class-name="sub_bg_color_blue" stripe>
                          <el-table-column :label="$t('label.PFANS1028VIEW_TECHNICALNUMBER')" align="center" width="150">
                            <template slot-scope="scope">
                              <el-input :disabled="!disable" maxlength="20" style="width: 100%" v-model="scope.row.technicalnumber">
                              </el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1028VIEW_GRADE')" align="center" width="170">
                            <template slot-scope="scope">
                              <el-input :disabled="!disable" maxlength="20" style="width: 100%" v-model="scope.row.grade"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1028VIEW_TECHNICALNAME')" align="center" width="150">
                            <template slot-scope="scope">
                              <el-input :disabled="!disable" maxlength="20" style="width: 100%" v-model="scope.row.technicalname"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1028VIEW_JUDGMENT1')" align="center" width="170">
                            <template slot-scope="scope">
                              <dicselect :code="code1"
                                         :data="scope.row.judgment1"
                                         :disabled="!disable"
                                         :multiple="multiple"
                                         :no="scope.row"
                                         @change="getjudgment1">
                              </dicselect>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1028VIEW_POINTS')" align="center" width="170">
                            <template slot-scope="scope">
                              <el-input :disabled="!disable" maxlength="20" style="width: 100%" v-model="scope.row.points"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1028VIEW_JUDGMENT2')" align="center" width="170">
                            <template slot-scope="scope">
                              <dicselect :code="code1"
                                         :data="scope.row.judgment2"
                                         :disabled="!disable"
                                         :multiple="multiple"
                                         :no="scope.row"
                                         @change="getjudgment2">
                              </dicselect>
                            </template>
                          </el-table-column>
                        </el-table>
                      </el-row>
                    </el-tab-pane>
                    <el-tab-pane :label="$t('label.PFANS1028VIEW_COMPUTERS')" name="third">
                      <el-table :data="tableComputers"
                                border
                                header-cell-class-name="sub_bg_color_blue" stripe>
                        <el-table-column :label="$t('label.PFANS1028VIEW_TECHNICALNUMBER')" align="center" width="150">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" style="width: 100%" v-model="scope.row.technicalnumber">
                            </el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1028VIEW_GRADE')" align="center" width="170">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" style="width: 100%" v-model="scope.row.grade"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1028VIEW_TECHNICALNAME')" align="center" width="150">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" style="width: 100%" v-model="scope.row.technicalname"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1028VIEW_JUDGMENT1')" align="center" width="170">
                          <template slot-scope="scope">
                            <dicselect :code="code1"
                                       :data="scope.row.judgment1"
                                       :disabled="!disable"
                                       :multiple="multiple"
                                       :no="scope.row"
                                       @change="getjudgment1">
                            </dicselect>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1028VIEW_POINTS')" align="center" width="170">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" style="width: 100%" v-model="scope.row.points"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1028VIEW_JUDGMENT2')" align="center" width="170">
                          <template slot-scope="scope">
                            <dicselect :code="code1"
                                       :data="scope.row.judgment2"
                                       :disabled="!disable"
                                       :multiple="multiple"
                                       :no="scope.row"
                                       @change="getjudgment2">
                            </dicselect>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-tab-pane>
                    <el-tab-pane :label="$t('label.PFANS1028VIEW_JASOFTWARE')" name="fourth">
                      <el-table :data="tableJasoftware"
                                border
                                header-cell-class-name="sub_bg_color_blue" stripe>
                        <el-table-column :label="$t('label.PFANS1028VIEW_TECHNICALNUMBER')" align="center" width="150">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" style="width: 100%" v-model="scope.row.technicalnumber">
                            </el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1028VIEW_GRADE')" align="center" width="170">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" style="width: 100%" v-model="scope.row.grade"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1028VIEW_TECHNICALNAME')" align="center" width="150">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" style="width: 100%" v-model="scope.row.technicalname"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1028VIEW_JUDGMENT1')" align="center" width="170">
                          <template slot-scope="scope">
                            <dicselect :code="code1"
                                       :data="scope.row.judgment1"
                                       :disabled="!disable"
                                       :multiple="multiple"
                                       :no="scope.row"
                                       @change="getjudgment1">
                            </dicselect>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1028VIEW_POINTS')" align="center" width="170">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" style="width: 100%" v-model="scope.row.points"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1028VIEW_JUDGMENT2')" align="center" width="170">
                          <template slot-scope="scope">
                            <dicselect :code="code1"
                                       :data="scope.row.judgment2"
                                       :disabled="!disable"
                                       :multiple="multiple"
                                       :no="scope.row"
                                       @change="getjudgment2">
                            </dicselect>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-tab-pane>
                    <el-tab-pane :label="$t('label.PFANS1028VIEW_GATETECHNOLOGY')" name="fifth">
                      <el-table :data="tableGatetechnology"
                                border
                                header-cell-class-name="sub_bg_color_blue" stripe>
                        <el-table-column :label="$t('label.PFANS1028VIEW_TECHNICALNUMBER')" align="center" width="150">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" style="width: 100%" v-model="scope.row.technicalnumber">
                            </el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1028VIEW_GRADE')" align="center" width="170">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" style="width: 100%" v-model="scope.row.grade"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1028VIEW_TECHNICALNAME')" align="center" width="150">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" style="width: 100%" v-model="scope.row.technicalname"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1028VIEW_JUDGMENT1')" align="center" width="170">
                          <template slot-scope="scope">
                            <dicselect :code="code1"
                                       :data="scope.row.judgment1"
                                       :disabled="!disable"
                                       :multiple="multiple"
                                       :no="scope.row"
                                       @change="getjudgment1">
                            </dicselect>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1028VIEW_POINTS')" align="center" width="170">
                          <template slot-scope="scope">
                            <el-input :disabled="!disable" maxlength="20" style="width: 100%" v-model="scope.row.points"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1028VIEW_JUDGMENT2')" align="center" width="170">
                          <template slot-scope="scope">
                            <dicselect :code="code1"
                                       :data="scope.row.judgment2"
                                       :disabled="!disable"
                                       :multiple="multiple"
                                       :no="scope.row"
                                       @change="getjudgment2">
                            </dicselect>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-tab-pane>
                    <el-tab-pane :label="$t('label.PFANS1028VIEW_JUDGMENTRESULT')" name="sixth">
                      <el-row>
                        <el-col :span="12">
                          <el-form-item :label="$t('label.PFANS1028VIEW_JUDGMENTRESULT')">
                            <el-radio
                              :disabled="!disable"
                              label="0"
                              v-model="form.lijudegresult"
                            >{{this.$t('label.PFANS1028VIEW_LIJUDEGRESULT1')}}</el-radio>
                            <el-radio
                              :disabled="!disable"
                              label="1"
                              v-model="form.lijudegresult"
                            >{{this.$t('label.PFANS1028VIEW_LIJUDEGRESULT2')}}</el-radio>
                            <el-radio
                              :disabled="!disable"
                              label="2"
                              v-model="form.lijudegresult"
                            >{{this.$t('label.PFANS1028VIEW_LIJUDEGRESULT3')}}</el-radio>
                            <el-radio
                              :disabled="!disable"
                              label="3"
                              v-model="form.lijudegresult"
                            >{{this.$t('label.PFANS1028VIEW_LIJUDEGRESULT4')}}</el-radio>
                            <el-radio
                              :disabled="!disable"
                              label="3"
                              v-model="form.lijudegresult"
                            >{{this.$t('label.PFANS1028VIEW_LIJUDEGRESULT5')}}</el-radio>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-tab-pane>

                  </el-tabs>
                </div>



              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1028VIEW_OUTPUTSUPPLIE')" name="third">
              <el-tabs v-model="activeName3" type="border-card">
                <el-tab-pane :label="$t('label.PFANS2023FORMVIEW_INTELLIGENCE')" name="first">

                  <el-row>
                    <!--取契约书番号-->
                    <el-col :span="12">
                      <el-form-item :label="$t('label.PFANS1028VIEW_JUDGENO')"  >
                        <el-input :disabled="!disable" style="width:20vw" v-model="form. productnumber"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item :label="$t('label.PFANS1028VIEW_JAPANNO')">
                        <el-select :disabled="!disable" style="width:20vw" v-model="form.contractnumber">
                          <el-option
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            v-for="item in options">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <!--带出PJ名-->
                      <el-form-item :label="$t('label.PFANS1028VIEW_NAME')">
                        <el-input  :disabled="!disable" style="width:20vw" v-model="form.placejapanese"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item  :label="$t('label.PFANS1028VIEW_EXPORT')" >
                        <el-input  :disabled="!disable" style="width:20vw" v-model="form.export"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item :error="errorgroup" :label="$t('label.PFANS1028VIEW_ORGANIZATION')" prop="group_id">
                        <org :disabled="!disable" :error="errorgroup" :orglist="grouporglist" @getOrgids="getGroupId"
                             orgtype="2" style="width:20vw"></org>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item :label="$t('label.PFANS1028VIEW_TODAY')">
                        <div class="block">
                          <el-date-picker
                            :disabled="!disable"
                            style="width: 20vw"
                            type="date"
                            v-model="form.today">
                          </el-date-picker>
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>

                </el-tab-pane>
                <el-tab-pane :label="$t('label.PFANS1028VIEW_INDUSTRIAL')" name="second">
                  <el-row >
                    <el-table :data="tableIndustrial"
                              border
                              header-cell-class-name="sub_bg_color_blue" stripe>
                      <el-table-column :label="$t('label.PFANS1028VIEW_JAPNO')" align="center" width="150">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" style="width: 100%" v-model="scope.row.japno">
                          </el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_TRADENAME')" align="center" width="170">
                        <template slot-scope="scope">
                          <el-input :disabled="true"
                                    style="width: 100vw"
                                    type="textarea"
                                    v-model="scope.row.tradename"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_JUDGMENT1')" align="center" width="150">
                        <template slot-scope="scope">
<!--                          <dicselect :code="code1"-->
<!--                                     :data="scope.row.judgment1"-->
<!--                                     :disabled="!disable"-->
<!--                                     :multiple="multiple"-->
<!--                                     :no="scope.row"-->
<!--                                     @change="getjudgment1">-->
<!--                          </dicselect>-->
                          <el-select v-model="scope.row.judgment1" clearable :disabled="!disable">
                            <el-option label="o" value="1"></el-option>
                            <el-option label="x" value="2"></el-option>
                          </el-select>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_SUMMARY')" align="center" width="170">
                        <template slot-scope="scope">
                          <el-input :disabled="true"
                                    style="width: 150vw"
                                    type="textarea"
                                    :autosize="{ minRows: 2, maxRows: 7}"
                                    v-model="scope.row.summary"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_PAYMENT')" align="center" width="170">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" style="width: 100%" v-model="scope.row.payment"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_BIT')" align="center" width="170">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" style="width: 100%" v-model="scope.row.bit"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_JUDGMENT2')" align="center" width="170">
                        <template slot-scope="scope">
<!--                          <dicselect :code="code1"-->
<!--                                     :data="scope.row.judgment2"-->
<!--                                     :disabled="!disable"-->
<!--                                     :multiple="multiple"-->
<!--                                     :no="scope.row"-->
<!--                                     @change="getjudgment2">-->
<!--                          </dicselect>-->
                          <el-select v-model="scope.row.judgment2" clearable :disabled="!disable">
                            <el-option label="o" value="1"></el-option>
                            <el-option label="x" value="2"></el-option>
                          </el-select>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane :label="$t('label.PFANS1028VIEW_ELECTRONIC')" name="third">
                  <el-row >
                    <el-table :data="tableElectronic"
                              border
                              header-cell-class-name="sub_bg_color_blue" stripe>
                      <el-table-column :label="$t('label.PFANS1028VIEW_JAPNO')" align="center" width="150">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" style="width: 100%" v-model="scope.row.japno">
                          </el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_TRADENAME')" align="center" width="170">
                        <template slot-scope="scope">
                          <el-input :disabled="true"
                                    style="width: 100vw"
                                    type="textarea"
                                    v-model="scope.row.tradename"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_JUDGMENT1')" align="center" width="150">
                        <template slot-scope="scope">
<!--                          <dicselect :code="code1"-->
<!--                                     :data="scope.row.judgment1"-->
<!--                                     :disabled="!disable"-->
<!--                                     :multiple="multiple"-->
<!--                                     :no="scope.row"-->
<!--                                     @change="getjudgment1">-->
<!--                          </dicselect>-->
                          <el-select v-model="scope.row.judgment1" clearable :disabled="!disable">
                            <el-option label="o" value="1"></el-option>
                            <el-option label="x" value="2"></el-option>
                          </el-select>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_SUMMARY')" align="center" width="170">
                        <template slot-scope="scope">
                          <el-input :disabled="true"
                                    style="width: 150vw"
                                    type="textarea"
                                    :autosize="{ minRows: 2, maxRows: 7}"
                                    v-model="scope.row.summary"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_PAYMENT')" align="center" width="170">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" style="width: 100%" v-model="scope.row.payment"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_BIT')" align="center" width="170">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" style="width: 100%" v-model="scope.row.bit"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_JUDGMENT2')" align="center" width="170">
                        <template slot-scope="scope">
<!--                          <dicselect :code="code1"-->
<!--                                     :data="scope.row.judgment2"-->
<!--                                     :disabled="!disable"-->
<!--                                     :multiple="multiple"-->
<!--                                     :no="scope.row"-->
<!--                                     @change="getjudgment2">-->
<!--                          </dicselect>-->
                          <el-select v-model="scope.row.judgment2" clearable :disabled="!disable">
                            <el-option label="o" value="1"></el-option>
                            <el-option label="x" value="2"></el-option>
                          </el-select>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane :label="$t('label.PFANS1028VIEW_COM')" name="fourth">
                  <el-row >
                    <el-table :data="tableCon"
                              border
                              header-cell-class-name="sub_bg_color_blue" stripe>
                      <el-table-column :label="$t('label.PFANS1028VIEW_JAPNO')" align="center" width="150">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" style="width: 100%" v-model="scope.row.japno">
                          </el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_TRADENAME')" align="center" width="170">
                        <template slot-scope="scope">
                          <el-input :disabled="true"
                                    style="width: 100vw"
                                    type="textarea"
                                    v-model="scope.row.tradename"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_JUDGMENT1')" align="center" width="150">
                        <template slot-scope="scope">
<!--                          <dicselect :code="code1"-->
<!--                                     :data="scope.row.judgment1"-->
<!--                                     :disabled="!disable"-->
<!--                                     :multiple="multiple"-->
<!--                                     :no="scope.row"-->
<!--                                     @change="getjudgment1">-->
<!--                          </dicselect>-->
                          <el-select v-model="scope.row.judgment1" clearable :disabled="!disable">
                            <el-option label="o" value="1"></el-option>
                            <el-option label="x" value="2"></el-option>
                          </el-select>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_SUMMARY')" align="center" width="170">
                        <template slot-scope="scope">
                          <el-input :disabled="true"
                                    style="width: 150vw"
                                    type="textarea"
                                    :autosize="{ minRows: 2, maxRows: 7}"
                                    v-model="scope.row.summary"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_PAYMENT')" align="center" width="170">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" style="width: 100%" v-model="scope.row.payment"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_BIT')" align="center" width="170">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" style="width: 100%" v-model="scope.row.bit"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_JUDGMENT2')" align="center" width="170">
                        <template slot-scope="scope">
<!--                          <dicselect :code="code1"-->
<!--                                     :data="scope.row.judgment2"-->
<!--                                     :disabled="!disable"-->
<!--                                     :multiple="multiple"-->
<!--                                     :no="scope.row"-->
<!--                                     @change="getjudgment2">-->
<!--                          </dicselect>-->
                          <el-select v-model="scope.row.judgment2" clearable :disabled="!disable">
                            <el-option label="o" value="1"></el-option>
                            <el-option label="x" value="2"></el-option>
                          </el-select>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane :label="$t('label.PFANS1028VIEW_SOF')" name="fifth">
                  <el-row >
                    <el-table :data="tableSof"
                              border
                              header-cell-class-name="sub_bg_color_blue" stripe>
                      <el-table-column :label="$t('label.PFANS1028VIEW_JAPNO')" align="center" width="150">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" style="width: 100%" v-model="scope.row.japno">
                          </el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_TRADENAME')" align="center" width="170">
                        <template slot-scope="scope">
                          <el-input :disabled="true"
                                    style="width: 100vw"
                                    type="textarea"
                                    v-model="scope.row.tradename"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_JUDGMENT1')" align="center" width="150">
                        <template slot-scope="scope">
<!--                          <dicselect :code="code1"-->
<!--                                     :data="scope.row.judgment1"-->
<!--                                     :disabled="!disable"-->
<!--                                     :multiple="multiple"-->
<!--                                     :no="scope.row"-->
<!--                                     @change="getjudgment1">-->
<!--                          </dicselect>-->
                          <el-select v-model="scope.row.judgment1" clearable :disabled="!disable">
                            <el-option label="o" value="1"></el-option>
                            <el-option label="x" value="2"></el-option>
                          </el-select>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_SUMMARY')" align="center" width="170">
                        <template slot-scope="scope">
                          <el-input :disabled="true"
                                    style="width: 150vw"
                                    type="textarea"
                                    :autosize="{ minRows: 2, maxRows: 7}"
                                    v-model="scope.row.summary"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_PAYMENT')" align="center" width="170">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" style="width: 100%" v-model="scope.row.payment"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_BIT')" align="center" width="170">
                        <template slot-scope="scope">
                          <el-input :disabled="true" maxlength="20" style="width: 100%" v-model="scope.row.bit"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_JUDGMENT2')" align="center" width="170">
                        <template slot-scope="scope">
<!--                          <dicselect :code="code1"-->
<!--                                     :data="scope.row.judgment2"-->
<!--                                     :disabled="!disable"-->
<!--                                     :multiple="multiple"-->
<!--                                     :no="scope.row"-->
<!--                                     @change="getjudgment2">-->
<!--                          </dicselect>-->
                          <el-select v-model="scope.row.judgment2" clearable :disabled="!disable">
                            <el-option label="o" value="1"></el-option>
                            <el-option label="x" value="2"></el-option>
                          </el-select>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane :label="$t('label.PFANS1028VIEW_JUDGMENTRESULT')" name="sixth">
                  <el-row>
                    <el-col :span="12">
                      <el-form-item :label="$t('label.PFANS1028VIEW_JUDGMENTRESULT')">
                        <el-radio
                          :disabled="true"
                          label="0"
                          v-model="radioSujud"
                        >{{this.$t('label.PFANS1028VIEW_SUJUDEGRESULT1')}}</el-radio>
                        <el-radio
                          :disabled="true"
                          label="1"
                          v-model="radioSujud"
                        >{{this.$t('label.PFANS1028VIEW_SUJUDEGRESULT2')}}</el-radio>
                        <el-radio
                          :disabled="true"
                          label="2"
                          v-model="radioSujud"
                        >{{this.$t('label.PFANS1028VIEW_SUJUDEGRESULT3')}}</el-radio>
                      </el-form-item>
                    </el-col>
                  </el-row>

                </el-tab-pane>

              </el-tabs>

            </el-tab-pane>

          </el-tabs>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import user from "../../../components/user.vue";
  import {Message} from 'element-ui';
  import dicselect from '../../../components/dicselect';
  import moment from "moment";
  import org from "../../../components/org";
  import {getDictionaryInfo} from '@/utils/customize';


  export default {
    name: "PFANS1028FormView",
    components: {
      EasyNormalContainer,
      user,
      org,
      dicselect
    },
    data() {
      var checkuser = (rule, value, callback) => {
        if (!this.form.user_id || this.form.user_id === '' || this.form.user_id === "undefined") {
          this.error = this.$t('normal.error_09') + this.$t('label.user_name');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.user_name')));
        } else {
          this.error = "";
          return callback();
        }
      };
      var checktele = (rule, value, callback) => {
        this.regExp = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{0,20}$/;
        if (this.form.telephone !== null && this.form.telephone !== '') {
          if (!this.regExp.test(value)) {
            callback(new Error(this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS1012VIEW_TELEPHONE')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      return {
        radioSujud: '',
        checked1: false,
        checked2: false,
        checked3: false,
        disabled1: false,
        disabled2: false,
        disabled3: false,
        activeName: 'first',
        activeName2: 'first',
        activeName3: 'first',
        disabled: true,

        errorgroup: '',
        grouporglist: '',
        options:[],
        checkList: [],
        // possible:[],
        // outputlimit2:[],
        tableAValue:'',
        error: '',
        userlist: '',
        code1: 'HT016',
        code2: 'HT005',
        selectType: "Single",
        loading: false,
        title: "title.PFANS1028VIEW",
        canStart: false,
        multiple: false,
        orglist:'',
        baseInfo: {},
        arrJud: [],
        arrIndustrial: [],
        arrElectronic: [],
        arrCOM: [],
        arrSOF: [],
        form: {

          decisionnumber: '',
          career: '',
          deployment: '',
          contractnumber: '',
          janame: '',
          custoenglish: '',
          varto: '',
          review: '',
          requirements: '0',
          possible: '',
          claimdatetime:[],
          technical: '',
          today:moment(new Date()).format('YYYY-MM-DD'),
          export: '',
          outnumber: '',
          productnumber: '',
          outputlimit2: '',
          weapon: '',
          weaponreson: '',
          word: '',
          wordreson: '',
          specifi: '',
          specifireson: '',
          restricted: '',
          regulation: '',
          management2: '',
          mareason: '',
          reason: '',
          management3: '',
          management4: '',
          judged: '',
          americantechnology: '',
          judgecomplement: '',
          exportlicense: '',
          decresult: '',
          limitcommunt: '',
          limitdelivery: '',
          limitcomputers: '',
          limitjasoftware: '',
          limittechnology: '',
          supplieindustrial: '',
          supplielectronic: '',
          suppliecom: '',
          suppliesof: '',
          sujudegresult: '',
          lijudegresult: '',
        },

        tableComputers: [{}],
        tableDelivery: [{}],
        tableGatetechnology: [{}],
        tableJasoftware: [{}],
        tableCommun: [{
          technicalnumber:'01',
          grade: 'J',
          technicalname: '技術名称',
          judgment1: '',
          points: '規制要点',
          judgment2: '',
        },{
          technicalnumber:'02',
          grade: 'J',
          technicalname: '技術名称',
          judgment1: '',
          points: '規制要点',
          judgment2: '',
        },{
          technicalnumber:'01',
          grade:  'X',
          technicalname: '技術名称',
          judgment1: '',
          points: '規制要点',
          judgment2: '',
        },
          {
            technicalnumber:'02',
            grade:  'X',
            technicalname: '技術名称',
            judgment1: '',
            points: '規制要点',
            judgment2: '',
          },
          {
            technicalnumber:'03',
            grade:  'X',
            technicalname: '技術名称',
            judgment1: '',
            points: '規制要点',
            judgment2: '',
          },
          {
            technicalnumber:'04',
            grade:  'X',
            technicalname: '技術名称',
            judgment1: '',
            points: '規制要点',
            judgment2: '',
          },
          {
            technicalnumber:'05',
            grade:  'X',
            technicalname: '技術名称',
            judgment1: '',
            points: '規制要点',
            judgment2: '',
          },
          {
            technicalnumber:'06',
            grade:  'X',
            technicalname: '技術名称',
            judgment1: '',
            points: '規制要点',
            judgment2: '',
          },
          {
            technicalnumber:'07',
            grade:  'X',
            technicalname: '技術名称',
            judgment1: '',
            points: '規制要点',
            judgment2: '',
          },
          {
            technicalnumber:'08',
            grade:  'X',
            technicalname: '技術名称',
            judgment1: '',
            points: '規制要点',
            judgment2: '',
          },
        ],
        tableIndustrial: [{
          japno: '4',
          tradename: this.$t('label.PFANS1028VIEW_TRADENAME4'),
          summary:  this.$t('label.PFANS1028VIEW_SUMMARY4'),
          judgment1: '',
          payment: '8479509010',
          bit:  this.$t('label.PFANS1028VIEW_BIT4'),
          judgment2: '',
        },
          {
            japno: '5',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME5'),
            summary:  this.$t('label.PFANS1028VIEW_SUMMARY5'),
            judgment1: '',
            payment: '8537109021',
            bit:  this.$t('label.PFANS1028VIEW_BIT5'),
            judgment2: '',
          },
          {
            japno: '33',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME33'),
            summary:  this.$t('label.PFANS1028VIEW_SUMMARY33'),
            judgment1: '',
            payment: '',
            bit:  '',
            judgment2: '',
          },
          {
            japno: '40',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME40'),
            summary:  this.$t('label.PFANS1028VIEW_SUMMARY40'),
            judgment1: '',
            payment: '',
            bit:  '',
            judgment2: '',
          }
        ],
        tableElectronic:[{
          japno: '48',
          tradename: this.$t('label.PFANS1028VIEW_TRADENAME48'),
          summary:  '',
          judgment1: '',
          payment: '',
          bit: this.$t('label.PFANS1028VIEW_BIT4'),
          judgment2: '',
        },
          {
            japno: '49',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME49'),
            summary:  this.$t('label.PFANS1028VIEW_SUMMARY49'),
            judgment1: '',
            payment: '',
            bit: this.$t('label.PFANS1028VIEW_BIT4'),
            judgment2: '',
          },
          {
            japno: '50',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME50'),
            summary:  this.$t('label.PFANS1028VIEW_SUMMARY50'),
            judgment1: '',
            payment: '',
            bit: this.$t('label.PFANS1028VIEW_BIT4'),
            judgment2: '',
          },
          {
            japno: '51',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME51'),
            summary:  this.$t('label.PFANS1028VIEW_SUMMARY51'),
            judgment1: '',
            payment: '8526101010',
            bit: this.$t('label.PFANS1028VIEW_BIT4'),
            judgment2: '',
          },
          {
            japno: '52',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME51'),
            summary:  this.$t('label.PFANS1028VIEW_SUMMARY52'),
            judgment1: '',
            payment: '8526109011',
            bit: this.$t('label.PFANS1028VIEW_BIT6'),
            judgment2: '',
          },
          {
            japno: '53',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME51'),
            summary:  this.$t('label.PFANS1028VIEW_SUMMARY53'),
            judgment1: '',
            payment: '8526109091',
            bit: this.$t('label.PFANS1028VIEW_BIT6'),
            judgment2: '',
          },
          {
            japno: '54',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME51'),
            summary:  this.$t('label.PFANS1028VIEW_SUMMARY54'),
            judgment1: '',
            payment: '9014800020',
            bit: this.$t('label.PFANS1028VIEW_BIT6'),
            judgment2: '',
          },
          {
            japno: '55',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME51'),
            summary:  this.$t('label.PFANS1028VIEW_SUMMARY55'),
            judgment1: '',
            payment: '9014209017',
            bit: this.$t('label.PFANS1028VIEW_BIT6'),
            judgment2: '',
          },
          {
            japno: '56',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME51'),
            summary:  this.$t('label.PFANS1028VIEW_SUMMARY56'),
            judgment1: '',
            payment: '9014209018',
            bit: this.$t('label.PFANS1028VIEW_BIT6'),
            judgment2: '',
          },
          {
            japno: '57',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME51'),
            summary:  this.$t('label.PFANS1028VIEW_SUMMARY57'),
            judgment1: '',
            payment: '9014209016',
            bit: this.$t('label.PFANS1028VIEW_BIT6'),
            judgment2: '',
          },
          {
            japno: '58',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME51'),
            summary:  this.$t('label.PFANS1028VIEW_SUMMARY58'),
            judgment1: '',
            payment: '8537109021',
            bit: this.$t('label.PFANS1028VIEW_BIT6'),
            judgment2: '',
          },
          {
            japno: '59',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME51'),
            summary:  this.$t('label.PFANS1028VIEW_SUMMARY59'),
            judgment1: '',
            payment: '',
            bit: this.$t('label.PFANS1028VIEW_BIT6'),
            judgment2: '',
          },
          {
            japno: '60',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME51'),
            summary:  this.$t('label.PFANS1028VIEW_SUMMARY60'),
            judgment1: '',
            payment: '',
            bit: this.$t('label.PFANS1028VIEW_BIT6'),
            judgment2: '',
          },
          {
            japno: '61',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME51'),
            summary:  this.$t('label.PFANS1028VIEW_SUMMARY61'),
            judgment1: '',
            payment: '',
            bit: this.$t('label.PFANS1028VIEW_BIT6'),
            judgment2: '',
          },
          {
            japno: '62',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME51'),
            summary:  this.$t('label.PFANS1028VIEW_SUMMARY62'),
            judgment1: '',
            payment: '8537109021',
            bit: this.$t('label.PFANS1028VIEW_BIT6'),
            judgment2: '',
          },
          {
            japno: '63',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME51'),
            summary:  this.$t('label.PFANS1028VIEW_SUMMARY63'),
            judgment1: '',
            payment: '',
            bit:  '',
            judgment2: '',
          },
          {
            japno: '64',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME51'),
            summary:  this.$t('label.PFANS1028VIEW_SUMMARY64'),
            judgment1: '',
            payment: '',
            bit: this.$t('label.PFANS1028VIEW_BIT4'),
            judgment2: '',
          },
          {
            japno: '65',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME65'),
            summary:  this.$t('label.PFANS1028VIEW_SUMMARY65'),
            judgment1: '',
            payment: '',
            bit: this.$t('label.PFANS1028VIEW_BIT4'),
            judgment2: '',
          },
          {
            japno: '66',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME66'),
            summary:  this.$t('label.PFANS1028VIEW_SUMMARY66'),
            judgment1: '',
            payment: '8543709930',
            bit: this.$t('label.PFANS1028VIEW_BIT4'),
            judgment2: '',
          }
        ],
        tableCon: [{
          japno: '98',
          tradename: this.$t('label.PFANS1028VIEW_TRADENAME98'),
          summary:  this.$t('label.PFANS1028VIEW_SUMMARY98'),
          judgment1: '',
          payment: '',
          bit:  '',
          judgment2: '',
        },
          {
            japno: '99',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME99'),
            summary:  '',
            judgment1: '',
            payment:  '',
            bit: '',
            judgment2: '',
          },
          {
            japno: '100',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME100'),
            summary:  '',
            judgment1: '',
            payment: '',
            bit:  '',
            judgment2: '',
          },
          {
            japno: '101',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME101'),
            summary:  '',
            judgment1: '',
            payment: '',
            bit:  '',
            judgment2: '',
          },
          {
            japno: '102',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME102'),
            summary:  this.$t('label.PFANS1028VIEW_SUMMARY102'),
            judgment1: '',
            payment:  '',
            bit:  '',
            judgment2: '',
          },
          {
            japno: '103',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME103'),
            summary:  this.$t('label.PFANS1028VIEW_SUMMARY103'),
            judgment1: '',
            payment: '',
            bit:  '',
            judgment2: '',
          },
          {
            japno: '104',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME104'),
            summary:  '',
            judgment1: '',
            payment: '',
            bit:  '',
            judgment2: '',
          },
          {
            japno: '105',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME105'),
            summary:  '',
            judgment1: '',
            payment: '',
            bit:  '',
            judgment2: '',
          },
          {
            japno: '106',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME106'),
            summary:  '',
            judgment1: '',
            payment: '',
            bit:  '',
            judgment2: '',
          }
        ],
        tableSof: [{
          japno: '1',
          tradename: this.$t('label.PFANS1028VIEW_TRADENAME1'),
          summary:  '',
          judgment1: '',
          payment: '8471411000',
          bit: this.$t('label.PFANS1028VIEW_BIT4'),
          judgment2: '',
        },
          {
            japno: '2',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME2'),
            summary: '',
            judgment1: '',
            payment:  '8471412000',
            bit: this.$t('label.PFANS1028VIEW_BIT4'),
            judgment2: '',
          },
          {
            japno: '3',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME3'),
            summary:  this.$t('label.PFANS1028VIEW_SUMMARY103'),
            judgment1: '',
            payment: '8471491000',
            bit:  this.$t('label.PFANS1028VIEW_BIT4'),
            judgment2: '',
          },
          {
            japno: '4',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME4'),
            summary:  '',
            judgment1: '',
            payment: '8471492000',
            bit:  this.$t('label.PFANS1028VIEW_BIT4'),
            judgment2: '',
          },
          {
            japno: '5',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME5'),
            summary:  '',
            judgment1: '',
            payment: '8471501000',
            bit: this.$t('label.PFANS1028VIEW_BIT4'),
            judgment2: '',
          },
          {
            japno: '6',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME6'),
            summary:  '',
            judgment1: '',
            payment: '8471502000',
            bit:  this.$t('label.PFANS1028VIEW_BIT4'),
            judgment2: '',
          }
        ],
        rules: {},
        buttonList: [  {
          key: 'save',
          name: 'button.save',
          disabled: false,
          icon: 'el-icon-check',
        },]
      }
    },
    mounted() {
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1028Store/one', {"nonjudgment_id": this.$route.params._id})
          .then(response => {
            this.form = response;
            if(this.form.possible !== ""){
              this.checkList = JSON.parse(this.form.possible);
            }
            if(this.form.review !== "" && this.form.review !== null){
              if(this.form.review === "2"){
                this.checked3 = true;
              } else if(this.form.review === "1"){
                this.checked1 = true;
              } else if(this.form.review === "3"){
                this.checked1 = true;
                this.checked2 = true;
              } else if(this.form.review === "4"){
                this.checked2 = true;
              }
            }
            let repair = response.claimdatetime;
            let serdate = repair.slice(0, 10);
            let serdate1 = repair.slice(repair.length - 10);
            this.form.claimdatetime = [serdate, serdate1];
            debugger;
            this.grouporglist = this.form.group_id;
            for (let i = 0; i < JSON.parse(response.limitcommunt).length; i++) {
                let aa = JSON.parse(response.limitcommunt)[i];
                this.tableCommun[i].judgment1 = aa.jud1;
                this.tableCommun[i].judgment2 = aa.jud2;
            }
            // tableIndustrial
            // tableElectronic
            // tableCon
            // tableSof

            for (let i = 0; i < JSON.parse(response.supplieindustrial).length; i++) {
                let aa = JSON.parse(response.supplieindustrial)[i];
                this.tableIndustrial[i].judgment1 = aa.jud1;
                this.tableIndustrial[i].judgment2 = aa.jud2;
            }
            for (let i = 0; i < JSON.parse(response.supplielectronic).length; i++) {
                let aa = JSON.parse(response.supplielectronic)[i];
                this.tableElectronic[i].judgment1 = aa.jud1;
                this.tableElectronic[i].judgment2 = aa.jud2;
            }
            for (let i = 0; i < JSON.parse(response.suppliecom).length; i++) {
                let aa = JSON.parse(response.suppliecom)[i];
                this.tableCon[i].judgment1 = aa.jud1;
                this.tableCon[i].judgment2 = aa.jud2;
            }
            for (let i = 0; i < JSON.parse(response.suppliesof).length; i++) {
                let aa = JSON.parse(response.suppliesof)[i];
                this.tableSof[i].judgment1 = aa.jud1;
                this.tableSof[i].judgment2 = aa.jud2;
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
      }
    },
    created(){
      if(!this.$route.params.disabled){
        this.buttonList=[]
      }
      this.disable = this.$route.params.disabled;
    },
    methods: {
      getChecked1(val) {
        this.checked1 = val;
        if (val === true) {
          this.disabled2 = false;
          this.checked3 = false;
          this.form.review = "1";
        } else {
          this.checked1 = false;
          this.checked2 = false;
          this.checked3 = false;
          this.form.review = "";
        }
      },
      getChecked3(val) {
        this.checked3 = val;
        if (val === true) {
          this.disabled2 = true;
          this.checked1 = false;
          this.checked2 = false;
          this.form.review = "2";
        } else {
          this.disabled2 = false;
          this.form.review = "";
        }
      },
      getChecked2(val) {
        this.checked2 = val;
        if (val === true) {
          if(this.form.review === "1"){
            this.form.review = "3";
          } else {
            this.form.review = "4";
          }
        } else {
          this.form.review = "";
        }
      },

      /*合并单元格*/
      CommunSpanMethod({ row, column, rowIndex, columnIndex }) {
    if (columnIndex === 0) {
      if (rowIndex % 2 === 0) {
        return {
          rowspan: 2,
          colspan: 1
        };
      } else {
        return {
          rowspan: 0,
          colspan: 0
        };
      }
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
      workflowState(val) {
        if (val.state === '1') {
          this.form.status = '3';
        } else if (val.state === '2') {
          this.form.status = '4';
        }
        this.buttonClick("save");
      },
      start() {
        this.form.status = '2';
        this.buttonClick("save");
      },
      end() {
        this.form.status = '0';
        this.buttonClick("save");
      },

      getjudgment1(row,val){
        row.judgment1=val;
      },
      getjudgment2(row,val){
        row.judgment2=val;
      },

      buttonClick(val) {
        if(val==="save"){
        this.$refs["reff"].validate(valid => {
          if (valid) {
            this.loading = true;
            if(JSON.stringify(this.checkList) !== '[]'){
              this.form.possible = JSON.stringify(this.checkList);
            }else{
              this.form.possible = '';
            }
            //通信デバイス、コンピューター及び電子デバイス製造
            for(let i = 0; i < this.tableCommun.length; i++){
              this.arrJud.push({
                jud1:this.tableCommun[i].judgment1,
                jud2:this.tableCommun[i].judgment2,
              })
            }
            //工業設備
            for(let i = 0; i < this.tableIndustrial.length; i++){
              this.arrIndustrial.push({
                jud1:this.tableIndustrial[i].judgment1,
                jud2:this.tableIndustrial[i].judgment2,
              })
            }
            //電子設備
            for(let i = 0; i < this.tableElectronic.length; i++){
              this.arrElectronic.push({
                jud1:this.tableElectronic[i].judgment1,
                jud2:this.tableElectronic[i].judgment2,
              })
            }
            //ソフトウェア
            for(let i = 0; i < this.tableCon.length; i++){
              this.arrCOM.push({
                jud1:this.tableCon[i].judgment1,
                jud2:this.tableCon[i].judgment2,
              })
            }
            //コンピュータ
            for(let i = 0; i < this.tableSof.length; i++){
              this.arrSOF.push({
                jud1:this.tableSof[i].judgment1,
                jud2:this.tableSof[i].judgment2,
              })
            }

            this.form.limitcommunt = JSON.stringify(this.arrJud);
            this.form.supplieindustrial = JSON.stringify(this.arrIndustrial);
            this.form.supplielectronic = JSON.stringify(this.arrElectronic);
            this.form.suppliecom = JSON.stringify(this.arrCOM);
            this.form.suppliesof = JSON.stringify(this.arrSOF);
            this.form.claimdatetime = moment(this.form.claimdatetime[0]).format('YYYY-MM-DD') + ' ~ ' + moment(this.form.claimdatetime[1]).format('YYYY-MM-DD');
            if (this.$route.params._id) {     //编辑
              this.$store
                .dispatch('PFANS1028Store/update', this.form)
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
                })
            }
          }
        });
      }
      }
    }
  }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .el-table {
    overflow-x: auto;
  }

  .el-table__header-wrapper,
  .el-table__body-wrapper,
  .el-table__footer-wrapper {
    overflow: visible;
  }

  .el-table::after {
    position: relative;
  }

  .el-table--scrollable-x .el-table__body-wrapper {
    overflow: visible;
  }
</style>

