<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList"
                         :canStart="canStart"
                         :title="title"
                         @buttonClick="buttonClick"
                         @end="end" @start="start"
                         @workflowState="workflowState"
                         ref="container"
                         v-loading="loading">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="reff" style="padding: 2vw">
          <el-tabs type="border-card" v-model="activeName">
            <el-tab-pane :label="$t('label.PFANS1028VIEW_JUDGE')" name="first">
              <div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1028VIEW_CAREER')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.career"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1028VIEW_ORGANIZATION')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.deployment"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <!--取番号，-->
                    <el-form-item :label="$t('label.PFANS1028VIEW_NO')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.gfjudgeno"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <!--取契约番号-->
                    <el-form-item :label="$t('label.PFANS1028VIEW_JAPANNO')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.contractnumber"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1028VIEW_JUDGENO')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.jxjudgeno"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <!--带出PJ名-->
                    <el-form-item :label="$t('label.PFANS1028VIEW_NAME')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.janame"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1032FORMVIEW_DEPOSITARY')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.custoenglish"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <!--写达到TO-->
                    <el-form-item :label="$t('label.PFANS1028VIEW_COUNTRY')">
                      <dicselect :code="code1"
                                 :data="form.varto"
                                 :disabled="true"
                                 style="width:20vw">
                      </dicselect>
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
                          <el-checkbox :disabled="disabled1" @change="getChecked1"
                                       v-model="checked1">
                            <p>{{$t('label.PFANS1028VIEW_REQUIREMENTS1')}}</p>
                          </el-checkbox>
                        </el-col>
                        <el-col :span="20">
                          <el-checkbox :disabled="disabled3" @change="getChecked3" v-model="checked3">
                            <p>{{$t('label.PFANS1028VIEW_REQUIREMENTS3')}}</p>
                          </el-checkbox>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="8">
                          <el-checkbox :disabled="disabled2" @change="getChecked2"
                                       v-model="checked2">
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
                    <el-form-item :label="$t('label.PFANS1028VIEW_REQUIREMENTS')">
                      <span style="margin-right: 1vw ">{{$t('label.PFANS1028VIEW_NOT')}}</span>
                      <el-switch
                        :disabled="true"
                        active-value="1"
                        inactive-value="0"
                        v-model="form.requirements">
                      </el-switch>
                      <span style="margin-left: 1vw ">{{$t('label.PFANS1028VIEW_YES')}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>


                <!--開発開始日-->
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1028VIEW_PERIOD')">
                      <el-date-picker
                        :disabled="true"
                        :end-placeholder="$t('label.enddate')"
                        :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                        :start-placeholder="$t('label.startdate')"
                        style="width:20vw"
                        type="daterange"
                        v-model="form.claimdatetime">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item :label="$t('label.PFANS1028VIEW_TECHNICAL')">
                      <el-input :disabled="!disable" style="width: 70vw" type="textarea"
                                v-model="form.technical"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item
                      :label="$t('label.PFANS1028VIEW_POSSIBLE')" prop="possible">
                        <el-row>
                          <el-col :span="6">
                            <el-form-item>
                              <el-checkbox :disabled="!disable" v-model="form.other1" ><p>{{$t('label.PFANS1028VIEW_BOOKS')}}</p></el-checkbox>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item>
                              <el-checkbox :disabled="!disable" v-model="form.other2"><p>{{$t('label.PFANS1028VIEW_SOFTWARE')}}</p></el-checkbox>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item>
                              <el-checkbox :disabled="!disable" v-model="form.other3"><p>{{$t('label.PFANS1028VIEW_MAIL')}}</p></el-checkbox>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item>
                              <el-checkbox :disabled="!disable" v-model="form.other4"><p>{{$t('label.PFANS1028VIEW_SERVER')}}</p></el-checkbox>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="6">
                            <el-form-item>
                          <el-checkbox :disabled="!disable" @change="getChecked8" v-model="form.other5"><p>{{$t('label.PFANS1028VIEW_MEETING')}}</p></el-checkbox>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6" v-show="show1">
                            <el-form-item>
                              <el-checkbox :disabled="!disable" @change="getChecked9" v-model="form.other6"><p>{{$t('label.PFANS1028VIEW_COUNTRY2')}}</p></el-checkbox>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6" v-show="show1">
                            <el-form-item>
                              <el-checkbox :disabled="!disable" @change="getChecked10" v-model="form.other7"><p>{{$t('label.PFANS1028VIEW_OTHERC2')}}</p></el-checkbox>
                            </el-form-item>
                          </el-col>
                        </el-row>
                      <el-row>
                        <el-col :span="24" v-show="show3">
                          <el-form-item :label="$t('label.PFANS1028VIEW_POINTS106')">
                            <el-input :disabled="!disable" style="width: 70vw" type="textarea"
                                      v-model="form.oreason"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                        <el-row>
                          <el-col :span="6">
                            <el-form-item>
                              <el-checkbox :disabled="!disable" @change="getChecked11" v-model="form.other8"><p>{{$t('label.PFANS1028VIEW_OVERSEA')}}</p></el-checkbox>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6" v-show="show2">
                            <el-form-item>
                              <el-checkbox :disabled="!disable" @change="getChecked12" v-model="form.other9"><p>{{$t('label.PFANS1028VIEW_COUNTRY3')}}</p></el-checkbox>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6" v-show="show2">
                            <el-form-item>
                              <el-checkbox :disabled="!disable" @change="getChecked13" v-model="form.other10"><p>{{$t('label.PFANS1028VIEW_OTHERC2')}}</p></el-checkbox>
                            </el-form-item>
                          </el-col>
                        </el-row>
                      <el-row>
                        <el-col :span="24" v-show="show4">
                          <el-form-item :label="$t('label.PFANS1028VIEW_POINTS106')">
                            <el-input :disabled="!disable" style="width: 70vw" type="textarea"
                                      v-model="form.othreason"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                        <el-row>
                          <el-col :span="6">
                            <el-form-item>
                          <el-checkbox :disabled="!disable" @change="getChecked14" v-model="form.other11"><p>{{$t('label.PFANS1028VIEW_OTHER')}}</p></el-checkbox>
                            </el-form-item>
                          </el-col>
                        </el-row>
                      <el-row>
                        <el-col :span="24" v-show="show5">
                          <el-form-item :label="$t('label.PFANS1028VIEW_POINTS106')">
                            <el-input :disabled="!disable" style="width: 70vw" type="textarea"
                                      v-model="form.otherreason"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
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
                      <el-col>
                        <el-form-item :label="$t('label.PFANS1028VIEW_OUTPUTLIMIT2')"></el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item :label="$t('label.PFANS1028VIEW_JUDGENO')" style="margin-left: 50px">
                          <el-input :disabled="true" style="width: 20vw ; margin-left: 1px" v-model="form.jxjudgeno"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item>
                          <el-radio
                            :disabled="!disable"
                            label="0"
                            v-model="form.outputlimit2"
                            @change="getRadio2"
                            style="margin-left: 50px"
                          >{{this.$t('label.PFANS1028VIEW_PROHIBITED')}}
                          </el-radio>
                          <el-radio
                            :disabled="!disable"
                            label="1"
                            v-model="form.outputlimit2"
                            @change="getRadio2"
                            style="margin-left: 50px"
                          >{{this.$t('label.PFANS1028VIEW_LIMITATION')}}
                          </el-radio>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item :label="$t('label.PFANS1028VIEW_REASON')" style="margin-left: 50px">
                          <el-input :disabled="!disable" style="width:20vw ; margin-left: 1px" v-model="form.reason"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
<!--                      <el-col :span="24" v-show="show8">-->
<!--                        <el-form-item :label="$t('label.PFANS1028VIEW_RESTRICTED')" style="margin-left: 80px">-->
<!--                        </el-form-item>-->
<!--                      </el-col>-->
                      <el-col :span="12" v-show="show8">
                        <el-form-item :label="$t('label.PFANS1028VIEW_WEAPON')" style="margin-left: 80px">
                          <el-radio
                            :disabled="!disable"
                            label="0"
                            v-model="form.weapon"
                            @change="getvalue"
                          >{{this.$t('label.PFANS1028VIEW_JANO')}}
                          </el-radio>
                          <el-radio
                            :disabled="!disable"
                            label="1"
                            v-model="form.weapon"
                            @change="getvalue"
                          >{{this.$t('label.PFANS1028VIEW_PRONO')}}
                          </el-radio>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12" v-show="show8">
                        <el-form-item :label="$t('label.PFANS1028VIEW_RESON')">
                          <el-input :disabled="!disable" style="width:20vw" v-model="form.weaponreson"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12" v-show="show8">
                        <el-form-item :label="$t('label.PFANS1028VIEW_WORD')" style="margin-left: 80px">
                          <el-radio
                            :disabled="!disable"
                            label="0"
                            v-model="form.word"
                            @change="getvalue1"
                          >{{this.$t('label.PFANS1028VIEW_JANO')}}
                          </el-radio>
                          <el-radio
                            :disabled="!disable"
                            label="1"
                            v-model="form.word"
                            @change="getvalue1"
                          >{{this.$t('label.PFANS1028VIEW_PRONO')}}
                          </el-radio>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12" v-show="show8">
                        <el-form-item :label="$t('label.PFANS1028VIEW_RESON')">
                          <el-input :disabled="!disable" style="width:20vw" v-model="form.wordreson"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12" v-show="show8">
                        <el-form-item :label="$t('label.PFANS1028VIEW_SPECIFI')" style="margin-left: 80px">
                          <el-radio
                            :disabled="!disable"
                            label="0"
                            v-model="form.specifi"
                            @change="getvalue2"
                          >{{this.$t('label.PFANS1028VIEW_JANO')}}
                          </el-radio>
                          <el-radio
                            :disabled="!disable"
                            label="1"
                            v-model="form.specifi"
                            @change="getvalue2"
                          >{{this.$t('label.PFANS1028VIEW_PRONO')}}
                          </el-radio>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12" v-show="show8">
                        <el-form-item :label="$t('label.PFANS1028VIEW_RESON')">
                          <el-input :disabled="!disable" style="width:20vw" v-model="form.specifireson"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-radio
                        :disabled="!disable"
                        label="0"
                        v-model="form.restricted"
                        v-show="show8"
                        style="margin-left: 80px"
                      >{{this.$t('label.PFANS1028VIEW_NOTALL')}}
                      </el-radio>
                      <el-radio
                        :disabled="!disable"
                        label="1"
                        v-model="form.restricted"
                        v-show="show8"
                        style="margin-left: 80px"
                      >{{this.$t('label.PFANS1028VIEW_POSSCAN')}}
                      </el-radio>
                    </el-row>
                    <el-row>
                      <el-form-item></el-form-item>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-radio
                          :disabled="!disable"
                          label="0"
                          v-model="form.regulation"
                          style="margin-left: 50px"
                        >{{this.$t('label.PFANS1028VIEW_RULES1')}}
                        </el-radio>
                        <el-radio
                          :disabled="!disable"
                          label="1"
                          v-model="form.regulation"
                          style="margin-left: 50px"
                        >{{this.$t('label.PFANS1028VIEW_RULES2')}}
                        </el-radio>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col>
                        <el-form-item :label="$t('label.PFANS1028VIEW_MANAGEMENT2')"></el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item :label="$t('label.PFANS1028VIEW_JUDGENO')" style="margin-left: 50px">
                          <el-input :disabled="true" style="width: 20vw ; margin-left: 1px" v-model="form.lyjudgeno"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12" style="margin-left: 50px">
                        <el-form-item>
                          <el-radio
                            :disabled="!disable"
                            label="0"
                            v-model="form.management2"
                          >{{this.$t('label.PFANS1028VIEW_YES')}}
                          </el-radio>
                          <el-radio
                            :disabled="!disable"
                            label="1"
                            v-model="form.management2"
                          >{{this.$t('label.PFANS1028VIEW_NOT')}}
                          </el-radio>
                          <el-radio
                            :disabled="!disable"
                            label="3"
                            v-model="form.management2"
                          >{{this.$t('label.PFANS1028VIEW_ELEPHANTS')}}
                          </el-radio>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item :label="$t('label.PFANS1028VIEW_REASON')" style="margin-left: 50px">
                          <el-input :disabled="!disable" style="width:20vw ; margin-left: 1px" v-model="form.mareason"></el-input>
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
                            style="margin-left: 50px"
                          >{{this.$t('label.PFANS1028VIEW_YES')}}
                          </el-radio>
                          <el-radio
                            :disabled="!disable"
                            label="1"
                            v-model="form.management3"
                            style="margin-left: 50px"
                          >{{this.$t('label.PFANS1028VIEW_NOT')}}
                          </el-radio>
                          <el-radio
                            :disabled="!disable"
                            label="3"
                            v-model="form.management3"
                            style="margin-left: 50px"
                          >{{this.$t('label.PFANS1028VIEW_ELEPHANTS')}}
                          </el-radio>
                        </el-form-item>
                      </el-col>
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
                            @change="getRadio"
                            style="margin-left: 50px"
                          >{{this.$t('label.PFANS1028VIEW_YES2')}}
                          </el-radio>
                          <el-radio
                            :disabled="!disable"
                            label="1"
                            v-model="form.management4"
                            @change="getRadio"
                            style="margin-left: 50px"
                          >{{this.$t('label.PFANS1028VIEW_NOT')}}
                          </el-radio>
                          <el-radio
                            :disabled="!disable"
                            label="3"
                            v-model="form.management4"
                            @change="getRadio"
                            style="margin-left: 50px"
                          >{{this.$t('label.PFANS1028VIEW_ELEPHANTS2')}}
                          </el-radio>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24" v-show="show6">
                        <el-form-item :label="$t('label.PFANS1028VIEW_JUDGED')">
                          <el-radio
                            :disabled="!disable"
                            label="0"
                            v-model="form.judged"
                            style="margin-left: 50px"
                          >{{this.$t('label.PFANS1028VIEW_YES3')}}
                          </el-radio>
                          <el-radio
                            :disabled="!disable"
                            label="1"
                            v-model="form.judged"
                            style="margin-left: 50px"
                          >{{this.$t('label.PFANS1028VIEW_NOT')}}
                          </el-radio>
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
                          <el-row>
                            <el-radio
                              :disabled="!disable"
                              label="0"
                              v-model="form.americantechnology"
                              @change="getradio"
                              style="margin-left: 50px"
                            >{{this.$t('label.PFANS1028VIEW_JANO')}}
                            </el-radio>
                            <el-radio
                              :disabled="!disable"
                              label="1"
                              v-model="form.americantechnology"
                              @change="getradio"
                              style="margin-left: 50px"
                            >{{this.$t('label.PFANS1028VIEW_JANOJUDGE')}}
                            </el-radio>
                          </el-row>
                          <el-row>
                            <el-radio
                              :disabled="!disabled4"
                              label="0"
                              v-model="form.americantechno"
                              @change="getRadio1"
                              style="margin-left: 50px"
                            >{{this.$t('label.PFANS1028VIEW_NOT')}}
                            </el-radio>
                            <el-radio
                              :disabled="!disabled4"
                              label="1"
                              v-model="form.americantechno"
                              @change="getRadio1"
                              style="margin-left: 50px"
                            >{{this.$t('label.PFANS1028VIEW_OUGHT')}}
                            </el-radio>
                          </el-row>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8" v-show="show7">
                        <el-form-item :label="$t('label.PFANS1028VIEW_POINTS107')" style="margin-left: 200px">
                          <el-input :disabled="!disable" style="width: 20vw ; margin-left: 1px" v-model="form.eccnjudgeno"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-collapse-item>
                </el-collapse>
                <el-row>
                  <el-col :span="24">
                    <el-form-item :label="$t('label.PFANS1028VIEW_JUDGECOMPLEMENT')">
                      <el-input :disabled="!disable" style="width:70vw" v-model="form.judgecomplement"></el-input>
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
                            style="margin-left: 50px"
                          >{{this.$t('label.PFANS1028VIEW_NECESSARY')}}
                          </el-radio>
                          <el-radio
                            :disabled="!disable"
                            label="1"
                            v-model="form.exportlicense"
                            style="margin-left: 50px"
                          >{{this.$t('label.PFANS1028VIEW_UNNECESSARY')}}
                          </el-radio>
                        </el-form-item>
                      </el-col>
                      <el-col :span="24">
                        <el-form-item :label="$t('label.PFANS1028VIEW_DECRESULT')">
                          <el-radio
                            :disabled="!disable"
                            label="0"
                            v-model="form.decresult"
                            style="margin-left: 50px"
                          >{{this.$t('label.PFANS1028VIEW_CANOUTPUT')}}
                          </el-radio>
                          <el-radio
                            :disabled="!disable"
                            label="1"
                            v-model="form.decresult"
                            style="margin-left: 50px"
                          >{{this.$t('label.PFANS1028VIEW_NOTOUTPUT')}}
                          </el-radio>
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
                    <el-form-item :label="$t('label.PFANS1028VIEW_JUDGENO')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.jxjudgeno"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1028VIEW_JAPANNO')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.contractnumber"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <!--带出PJ名-->
                    <el-form-item :label="$t('label.PFANS1028VIEW_NAME')">
                      <el-input :disabled="!disable" style="width:20vw" v-model="form.janame"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item  :label="$t('label.PFANS1028VIEW_ORGANIZATION')">
                      <el-input style="width:20vw" v-model="form.deployment" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1028VIEW_TODAY')">
                      <div class="block">
                        <el-date-picker
                          :disabled="true"
                          style="width: 20vw"
                          type="date"
                          v-model="form.today">
                        </el-date-picker>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <div>
                  <el-tabs type="border-card" v-model="activeName2">
                    <el-tab-pane :label="$t('label.PFANS1028VIEW_COMMUNICATION')" name="first">
                      <el-row>
                        <el-table :data="tableCommun"
                                  :span-method="objectSpanMethod" border
                                  header-cell-class-name="sub_bg_color_blue" stripe>
                          <el-table-column :label="$t('label.PFANS1028VIEW_TECHNICALNUMBER')" align="center"
                                           prop="technicalnumber" width="50">
                            <!--<template slot-scope="scope">-->
                            <!--<el-input :disabled="true" maxlength="20" style="width: 100%"-->
                            <!--v-model="scope.row.technicalnumber">-->
                            <!--</el-input>-->
                            <!--</template>-->
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1028VIEW_GRADE')" align="center" prop="grade"
                                           width="50">
                            <!--<template slot-scope="scope">-->
                            <!--<el-input :disabled="true" maxlength="20" style="width: 100%"-->
                            <!--v-model="scope.row.grade"></el-input>-->
                            <!--</template>-->
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1028VIEW_TECHNICALNAME')" align="left"
                                           prop="technicalname"
                                           width="240">
                            <!--<template slot-scope="scope">-->
                            <!--<el-input :disabled="true" maxlength="20" style="width: 100%"-->
                            <!--v-model="scope.row.technicalname"></el-input>-->
                            <!--</template>-->
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1028VIEW_JUDGMENT1')" align="center" width="100">
                            <template slot-scope="scope">
                              <!--                              <dicselect :code="code1"-->
                              <!--                                         :data="scope.row.judgment1"-->
                              <!--                                         :disabled="!disable"-->
                              <!--                                         :multiple="multiple"-->
                              <!--                                         :no="scope.row"-->
                              <!--                                         @change="getjudgment1">-->
                              <!--                              </dicselect>-->
                              <el-select :disabled="!disable" clearable v-model="scope.row.judgment1">
                                <el-option label="o" value="1"></el-option>
                                <el-option label="x" value="2"></el-option>
                              </el-select>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1028VIEW_POINTS')" align="left" prop="points"
                                           width="500">
                            <!--<template slot-scope="scope">-->
                            <!--<el-input :disabled="true" maxlength="20" style="width: 100%"-->
                            <!--v-model="scope.row.points"></el-input>-->
                            <!--</template>-->
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1028VIEW_JUDGMENT2')" align="center" width="100">
                            <template slot-scope="scope">
                              <!--                              <dicselect :code="code1"-->
                              <!--                                         :data="scope.row.judgment2"-->
                              <!--                                         :disabled="!disable"-->
                              <!--                                         :multiple="multiple"-->
                              <!--                                         :no="scope.row"-->
                              <!--                                         @change="getjudgment2">-->
                              <!--                              </dicselect>-->
                              <el-select :disabled="!disable" clearable v-model="scope.row.judgment2">
                                <el-option label="o" value="1"></el-option>
                                <el-option label="x" value="2"></el-option>
                              </el-select>
                            </template>
                          </el-table-column>
                        </el-table>
                      </el-row>
                    </el-tab-pane>
                    <el-tab-pane :label="$t('label.PFANS1028VIEW_DELIVERY')" name="second">
                      <el-row>
                        <el-table :data="tableDelivery"
                                  :span-method="objectSpanMethod1" border
                                  header-cell-class-name="sub_bg_color_blue" stripe>
                          <el-table-column :label="$t('label.PFANS1028VIEW_TECHNICALNUMBER')" align="center"
                                           prop="technicalnumber" width="50">
                            <!--<template slot-scope="scope">-->
                            <!--<el-input :disabled="!disable" maxlength="20" style="width: 100%"-->
                            <!--v-model="scope.row.technicalnumber">-->
                            <!--</el-input>-->
                            <!--</template>-->
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1028VIEW_GRADE')" align="center" prop="grade"
                                           width="50">
                            <!--<template slot-scope="scope">-->
                            <!--<el-input :disabled="!disable" maxlength="20" style="width: 100%"-->
                            <!--v-model="scope.row.grade"></el-input>-->
                            <!--</template>-->
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1028VIEW_TECHNICALNAME')" align="left"
                                           prop="technicalname"
                                           width="240">
                            <!--<template slot-scope="scope">-->
                            <!--<el-input :disabled="!disable" maxlength="20" style="width: 100%"-->
                            <!--v-model="scope.row.technicalname"></el-input>-->
                            <!--</template>-->
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1028VIEW_JUDGMENT1')" align="center" width="100">
                            <template slot-scope="scope">
                              <el-select :disabled="!disable" clearable v-model="scope.row.judgment1">
                                <el-option label="o" value="1"></el-option>
                                <el-option label="x" value="2"></el-option>
                              </el-select>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1028VIEW_POINTS')" align="left" prop="points"
                                           width="500">
                            <!--<template slot-scope="scope">-->
                            <!--<el-input :disabled="!disable" maxlength="20" style="width: 100%"-->
                            <!--v-model="scope.row.points"></el-input>-->
                            <!--</template>-->
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1028VIEW_JUDGMENT2')" align="center" width="100">
                            <template slot-scope="scope">
                              <el-select :disabled="!disable" clearable v-model="scope.row.judgment2">
                                <el-option label="o" value="1"></el-option>
                                <el-option label="x" value="2"></el-option>
                              </el-select>
                            </template>
                          </el-table-column>
                        </el-table>
                      </el-row>
                    </el-tab-pane>
                    <el-tab-pane :label="$t('label.PFANS1028VIEW_COMPUTERS')" name="third">
                      <el-table :data="tableComputers"
                                :span-method="objectSpanMethod2" border
                                header-cell-class-name="sub_bg_color_blue" stripe>
                        <el-table-column :label="$t('label.PFANS1028VIEW_TECHNICALNUMBER')" align="center"
                                         prop="technicalnumber"
                                         width="50">
                          <!--<template slot-scope="scope">-->
                          <!--<el-input :disabled="!disable" maxlength="20" style="width: 100%"-->
                          <!--v-model="scope.row.technicalnumber">-->
                          <!--</el-input>-->
                          <!--</template>-->
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1028VIEW_GRADE')" align="center" prop="grade"
                                         width="50">
                          <!--<template slot-scope="scope">-->
                          <!--<el-input :disabled="!disable" maxlength="20" style="width: 100%"-->
                          <!--v-model="scope.row.grade"></el-input>-->
                          <!--</template>-->
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1028VIEW_TECHNICALNAME')" align="left"
                                         prop="technicalname"
                                         width="240">
                          <!--<template slot-scope="scope">-->
                          <!--<el-input :disabled="!disable" maxlength="20" style="width: 100%"-->
                          <!--v-model="scope.row.technicalname"></el-input>-->
                          <!--</template>-->
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1028VIEW_JUDGMENT1')" align="center" width="100">
                          <template slot-scope="scope">
                            <el-select :disabled="!disable" clearable v-model="scope.row.judgment1">
                              <el-option label="o" value="1"></el-option>
                              <el-option label="x" value="2"></el-option>
                            </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1028VIEW_POINTS')" align="left" prop="points"
                                         width="500">
                          <!--<template slot-scope="scope">-->
                          <!--<el-input :disabled="!disable" maxlength="20" style="width: 100%"-->
                          <!--v-model="scope.row.points"></el-input>-->
                          <!--</template>-->
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1028VIEW_JUDGMENT2')" align="center" width="100">
                          <template slot-scope="scope">
                            <el-select :disabled="!disable" clearable v-model="scope.row.judgment2">
                              <el-option label="o" value="1"></el-option>
                              <el-option label="x" value="2"></el-option>
                            </el-select>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-tab-pane>
                    <el-tab-pane :label="$t('label.PFANS1028VIEW_JASOFTWARE')" name="fourth">
                      <el-table :data="tableJasoftware"
                                :span-method="objectSpanMethod3" border
                                header-cell-class-name="sub_bg_color_blue" stripe>
                        <el-table-column :label="$t('label.PFANS1028VIEW_TECHNICALNUMBER')" align="center"
                                         prop="technicalnumber"
                                         width="50">
                          <!--<template slot-scope="scope">-->
                          <!--<el-input :disabled="!disable" maxlength="20" style="width: 100%"-->
                          <!--v-model="scope.row.technicalnumber">-->
                          <!--</el-input>-->
                          <!--</template>-->
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1028VIEW_GRADE')" align="center" prop="grade"
                                         width="50">
                          <!--<template slot-scope="scope">-->
                          <!--<el-input :disabled="!disable" maxlength="20" style="width: 100%"-->
                          <!--v-model="scope.row.grade"></el-input>-->
                          <!--</template>-->
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1028VIEW_TECHNICALNAME')" align="left"
                                         prop="technicalname"
                                         width="240">
                          <!--<template slot-scope="scope">-->
                          <!--<el-input :disabled="!disable" maxlength="20" style="width: 100%"-->
                          <!--v-model="scope.row.technicalname"></el-input>-->
                          <!--</template>-->
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1028VIEW_JUDGMENT1')" align="center" width="100">
                          <template slot-scope="scope">
                            <el-select :disabled="!disable" clearable v-model="scope.row.judgment1">
                              <el-option label="o" value="1"></el-option>
                              <el-option label="x" value="2"></el-option>
                            </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1028VIEW_POINTS')" align="left" prop="points"
                                         width="500">
                          <!--<template slot-scope="scope">-->
                          <!--<el-input :disabled="!disable" maxlength="20" style="width: 100%"-->
                          <!--v-model="scope.row.points"></el-input>-->
                          <!--</template>-->
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1028VIEW_JUDGMENT2')" align="center" width="100">
                          <template slot-scope="scope">
                            <el-select :disabled="!disable" clearable v-model="scope.row.judgment2">
                              <el-option label="o" value="1"></el-option>
                              <el-option label="x" value="2"></el-option>
                            </el-select>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-tab-pane>
                    <el-tab-pane :label="$t('label.PFANS1028VIEW_GATETECHNOLOGY')" name="fifth">
                      <el-table :data="tableGatetechnology"
                                :span-method="objectSpanMethod4" border
                                header-cell-class-name="sub_bg_color_blue" stripe>
                        <el-table-column :label="$t('label.PFANS1028VIEW_TECHNICALNUMBER')" align="center"
                                         prop="technicalnumber"
                                         width="50">
                          <!--<template slot-scope="scope">-->
                          <!--<el-input :disabled="!disable" maxlength="20" style="width: 100%"-->
                          <!--v-model="scope.row.technicalnumber">-->
                          <!--</el-input>-->
                          <!--</template>-->
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1028VIEW_GRADE')" align="center" prop="grade"
                                         width="50">
                          <!--<template slot-scope="scope">-->
                          <!--<el-input :disabled="!disable" maxlength="20" style="width: 100%"-->
                          <!--v-model="scope.row.grade"></el-input>-->
                          <!--</template>-->
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1028VIEW_TECHNICALNAME')" align="left"
                                         prop="technicalname"
                                         width="240">
                          <!--<template slot-scope="scope">-->
                          <!--<el-input :disabled="!disable" maxlength="20" style="width: 100%"-->
                          <!--v-model="scope.row.technicalname"></el-input>-->
                          <!--</template>-->
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1028VIEW_JUDGMENT1')" align="center" width="100">
                          <template slot-scope="scope">
                            <el-select :disabled="!disable" clearable v-model="scope.row.judgment1">
                              <el-option label="o" value="1"></el-option>
                              <el-option label="x" value="2"></el-option>
                            </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1028VIEW_POINTS')" align="left" prop="points"
                                         width="500">
                          <!--<template slot-scope="scope">-->
                          <!--<el-input :disabled="!disable" maxlength="20" style="width: 100%"-->
                          <!--v-model="scope.row.points"></el-input>-->
                          <!--</template>-->
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1028VIEW_JUDGMENT2')" align="center" width="100">
                          <template slot-scope="scope">
                            <el-select :disabled="!disable" clearable v-model="scope.row.judgment2">
                              <el-option label="o" value="1"></el-option>
                              <el-option label="x" value="2"></el-option>
                            </el-select>
                          </template>
                        </el-table-column>
                      </el-table>
                    </el-tab-pane>
                    <el-tab-pane :label="$t('label.PFANS1028VIEW_JUDGMENTRESULT')" name="sixth">
                      <el-row>
                        <el-col :span="12">
                          <el-form-item :label="$t('label.PFANS1028VIEW_JUDGMENTRESULT')">
                            <el-checkbox-group v-model="form.lijudegresult" :disabled="true">
                              <el-checkbox
                                label="0"
                              >{{this.$t('label.PFANS1028VIEW_LIJUDEGRESULT1')}}
                              </el-checkbox>
                              <el-checkbox
                                label="1"
                              >{{this.$t('label.PFANS1028VIEW_LIJUDEGRESULT2')}}
                              </el-checkbox>
                              <el-checkbox
                                label="2"
                              >{{this.$t('label.PFANS1028VIEW_LIJUDEGRESULT3')}}
                              </el-checkbox>
                              <el-checkbox
                                label="3"
                              >{{this.$t('label.PFANS1028VIEW_LIJUDEGRESULT4')}}
                              </el-checkbox>
                              <el-checkbox
                                label="4"
                              >{{this.$t('label.PFANS1028VIEW_LIJUDEGRESULT5')}}
                              </el-checkbox>
                            </el-checkbox-group>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1028VIEW_OUTPUTSUPPLIE')" name="third">
              <el-tabs type="border-card" v-model="activeName3">
                <el-tab-pane :label="$t('label.PFANS2023FORMVIEW_INTELLIGENCE')" name="first">

                  <el-row>
                    <!--取契约书番号-->
                    <el-col :span="12">
                      <el-form-item :label="$t('label.PFANS1028VIEW_JUDGENO')">
                        <el-input :disabled="true" style="width:20vw" v-model="form. lyjudgeno"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item :label="$t('label.PFANS1028VIEW_JAPANNO')">
                        <el-input :disabled="true" style="width:20vw" v-model="form.contractnumber"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <!--带出PJ名-->
                      <el-form-item :label="$t('label.PFANS1028VIEW_NAME')">
                        <el-input :disabled="!disable" style="width:20vw" v-model="form.janame"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item :label="$t('label.PFANS1028VIEW_EXPORT')">
                        <el-input :disabled="!disable" style="width:20vw" v-model="form.export"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item :label="$t('label.PFANS1028VIEW_ORGANIZATION')">
                        <el-input :disabled="true" style="width:20vw" v-model="form.deployment"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item :label="$t('label.PFANS1028VIEW_TODAY')">
                        <div class="block">
                          <el-date-picker
                            :disabled="true"
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
                  <el-row>
                    <el-table :data="tableIndustrial"
                              border
                              header-cell-class-name="sub_bg_color_blue" stripe>
                      <el-table-column :label="$t('label.PFANS1028VIEW_JAPNO')" align="center" prop="japno" width="50">
                        <!--<template slot-scope="scope">-->
                        <!--<el-input :disabled="true" maxlength="20" style="width: 100%" v-model="scope.row.japno">-->
                        <!--</el-input>-->
                        <!--</template>-->
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_TRADENAME')" align="left" prop="tradename"
                                       width="280">
                        <!--<template slot-scope="scope">-->
                        <!--<el-input :disabled="true"-->
                        <!--style="width: 100vw"-->
                        <!--type="textarea"-->
                        <!--v-model="scope.row.tradename"></el-input>-->
                        <!--</template>-->
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_JUDGMENT1')" align="center" width="100">
                        <template slot-scope="scope">
                          <!--                          <dicselect :code="code1"-->
                          <!--                                     :data="scope.row.judgment1"-->
                          <!--                                     :disabled="!disable"-->
                          <!--                                     :multiple="multiple"-->
                          <!--                                     :no="scope.row"-->
                          <!--                                     @change="getjudgment1">-->
                          <!--                          </dicselect>-->
                          <el-select :disabled="!disable" clearable v-model="scope.row.judgment1">
                            <el-option label="o" value="1"></el-option>
                            <el-option label="x" value="2"></el-option>
                          </el-select>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_SUMMARY')" align="left" prop="summary"
                                       width="380">
                        <!--<template slot-scope="scope">-->
                        <!--<el-input :disabled="true"-->
                        <!--style="width: 150vw"-->
                        <!--type="textarea"-->
                        <!--:autosize="{ minRows: 2, maxRows: 7}"-->
                        <!--v-model="scope.row.summary"></el-input>-->
                        <!--</template>-->
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_PAYMENT')" align="center" prop="payment"
                                       width="150">
                        <!--<template slot-scope="scope">-->
                        <!--<el-input :disabled="true" maxlength="20" style="width: 100%"-->
                        <!--v-model="scope.row.payment"></el-input>-->
                        <!--</template>-->
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_BIT')" align="center" prop="bit" width="60">
                        <!--<template slot-scope="scope">-->
                        <!--<el-input :disabled="true" maxlength="20" style="width: 100%"-->
                        <!--v-model="scope.row.bit"></el-input>-->
                        <!--</template>-->
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_JUDGMENT2')" align="center" width="100">
                        <template slot-scope="scope">
                          <!--                          <dicselect :code="code1"-->
                          <!--                                     :data="scope.row.judgment2"-->
                          <!--                                     :disabled="!disable"-->
                          <!--                                     :multiple="multiple"-->
                          <!--                                     :no="scope.row"-->
                          <!--                                     @change="getjudgment2">-->
                          <!--                          </dicselect>-->
                          <el-select :disabled="!disable" clearable v-model="scope.row.judgment2">
                            <el-option label="o" value="1"></el-option>
                            <el-option label="x" value="2"></el-option>
                          </el-select>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane :label="$t('label.PFANS1028VIEW_ELECTRONIC')" name="third">
                  <el-row>
                    <el-table :data="tableElectronic"
                              border
                              header-cell-class-name="sub_bg_color_blue" stripe>
                      <el-table-column :label="$t('label.PFANS1028VIEW_JAPNO')" align="center" prop="japno" width="50">
                        <!--<template slot-scope="scope">-->
                        <!--<el-input :disabled="true" maxlength="20" style="width: 100%" v-model="scope.row.japno">-->
                        <!--</el-input>-->
                        <!--</template>-->
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_TRADENAME')" align="left" prop="tradename"
                                       width="280">
                        <!--<template slot-scope="scope">-->
                        <!--<el-input :disabled="true"-->
                        <!--style="width: 100vw"-->
                        <!--type="textarea"-->
                        <!--v-model="scope.row.tradename"></el-input>-->
                        <!--</template>-->
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_JUDGMENT1')" align="center" width="100">
                        <template slot-scope="scope">
                          <!--                          <dicselect :code="code1"-->
                          <!--                                     :data="scope.row.judgment1"-->
                          <!--                                     :disabled="!disable"-->
                          <!--                                     :multiple="multiple"-->
                          <!--                                     :no="scope.row"-->
                          <!--                                     @change="getjudgment1">-->
                          <!--                          </dicselect>-->
                          <el-select :disabled="!disable" clearable v-model="scope.row.judgment1">
                            <el-option label="o" value="1"></el-option>
                            <el-option label="x" value="2"></el-option>
                          </el-select>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_SUMMARY')" align="left" prop="summary"
                                       width="380">
                        <!--<template slot-scope="scope">-->
                        <!--<el-input :disabled="true"-->
                        <!--style="width: 150vw"-->
                        <!--type="textarea"-->
                        <!--:autosize="{ minRows: 2, maxRows: 7}"-->
                        <!--v-model="scope.row.summary"></el-input>-->
                        <!--</template>-->
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_PAYMENT')" align="center" prop="payment"
                                       width="150">
                        <!--<template slot-scope="scope">-->
                        <!--<el-input :disabled="true" maxlength="20" style="width: 100%"-->
                        <!--v-model="scope.row.payment"></el-input>-->
                        <!--</template>-->
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_BIT')" align="center" prop="bit" width="60">
                        <!--<template slot-scope="scope">-->
                        <!--<el-input :disabled="true" maxlength="20" style="width: 100%"-->
                        <!--v-model="scope.row.bit"></el-input>-->
                        <!--</template>-->
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_JUDGMENT2')" align="center" width="100">
                        <template slot-scope="scope">
                          <!--                          <dicselect :code="code1"-->
                          <!--                                     :data="scope.row.judgment2"-->
                          <!--                                     :disabled="!disable"-->
                          <!--                                     :multiple="multiple"-->
                          <!--                                     :no="scope.row"-->
                          <!--                                     @change="getjudgment2">-->
                          <!--                          </dicselect>-->
                          <el-select :disabled="!disable" clearable v-model="scope.row.judgment2">
                            <el-option label="o" value="1"></el-option>
                            <el-option label="x" value="2"></el-option>
                          </el-select>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane :label="$t('label.PFANS1028VIEW_COM')" name="fourth">
                  <el-row>
                    <el-table :data="tableCon"
                              border
                              header-cell-class-name="sub_bg_color_blue" stripe>
                      <el-table-column :label="$t('label.PFANS1028VIEW_JAPNO')" align="center" prop="japno" width="50">
                        <!--<template slot-scope="scope">-->
                        <!--<el-input :disabled="true" maxlength="20" style="width: 100%" v-model="scope.row.japno">-->
                        <!--</el-input>-->
                        <!--</template>-->
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_TRADENAME')" align="left" prop="tradename"
                                       width="280">
                        <!--<template slot-scope="scope">-->
                        <!--<el-input :disabled="true"-->
                        <!--style="width: 100vw"-->
                        <!--type="textarea"-->
                        <!--v-model="scope.row.tradename"></el-input>-->
                        <!--</template>-->
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_JUDGMENT1')" align="center" width="100">
                        <template slot-scope="scope">
                          <!--                          <dicselect :code="code1"-->
                          <!--                                     :data="scope.row.judgment1"-->
                          <!--                                     :disabled="!disable"-->
                          <!--                                     :multiple="multiple"-->
                          <!--                                     :no="scope.row"-->
                          <!--                                     @change="getjudgment1">-->
                          <!--                          </dicselect>-->
                          <el-select :disabled="!disable" clearable v-model="scope.row.judgment1">
                            <el-option label="o" value="1"></el-option>
                            <el-option label="x" value="2"></el-option>
                          </el-select>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_SUMMARY')" align="left" prop="summary"
                                       width="380">
                        <!--<template slot-scope="scope">-->
                        <!--<el-input :disabled="true"-->
                        <!--style="width: 150vw"-->
                        <!--type="textarea"-->
                        <!--:autosize="{ minRows: 2, maxRows: 7}"-->
                        <!--v-model="scope.row.summary"></el-input>-->
                        <!--</template>-->
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_PAYMENT')" align="center" prop="payment"
                                       width="150">
                        <!--<template slot-scope="scope">-->
                        <!--<el-input :disabled="true" maxlength="20" style="width: 100%"-->
                        <!--v-model="scope.row.payment"></el-input>-->
                        <!--</template>-->
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_BIT')" align="center" prop="bit" width="60">
                        <!--<template slot-scope="scope">-->
                        <!--<el-input :disabled="true" maxlength="20" style="width: 100%"-->
                        <!--v-model="scope.row.bit"></el-input>-->
                        <!--</template>-->
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_JUDGMENT2')" align="center" width="100">
                        <template slot-scope="scope">
                          <!--                          <dicselect :code="code1"-->
                          <!--                                     :data="scope.row.judgment2"-->
                          <!--                                     :disabled="!disable"-->
                          <!--                                     :multiple="multiple"-->
                          <!--                                     :no="scope.row"-->
                          <!--                                     @change="getjudgment2">-->
                          <!--                          </dicselect>-->
                          <el-select :disabled="!disable" clearable v-model="scope.row.judgment2">
                            <el-option label="o" value="1"></el-option>
                            <el-option label="x" value="2"></el-option>
                          </el-select>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane :label="$t('label.PFANS1028VIEW_SOF')" name="fifth">
                  <el-row>
                    <el-table :data="tableSof"
                              border
                              header-cell-class-name="sub_bg_color_blue" stripe>
                      <el-table-column :label="$t('label.PFANS1028VIEW_JAPNO')" align="center" prop="japno" width="50">
                        <!--<template slot-scope="scope">-->
                        <!--<el-input :disabled="true" maxlength="20" style="width: 100%" v-model="scope.row.japno">-->
                        <!--</el-input>-->
                        <!--</template>-->
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_TRADENAME')" align="left" prop="tradename"
                                       width="280">
                        <!--<template slot-scope="scope">-->
                        <!--<el-input :disabled="true"-->
                        <!--style="width: 100vw"-->
                        <!--type="textarea"-->
                        <!--v-model="scope.row.tradename"></el-input>-->
                        <!--</template>-->
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_JUDGMENT1')" align="center" width="100">
                        <template slot-scope="scope">
                          <!--                          <dicselect :code="code1"-->
                          <!--                                     :data="scope.row.judgment1"-->
                          <!--                                     :disabled="!disable"-->
                          <!--                                     :multiple="multiple"-->
                          <!--                                     :no="scope.row"-->
                          <!--                                     @change="getjudgment1">-->
                          <!--                          </dicselect>-->
                          <el-select :disabled="!disable" clearable v-model="scope.row.judgment1">
                            <el-option label="o" value="1"></el-option>
                            <el-option label="x" value="2"></el-option>
                          </el-select>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_SUMMARY')" align="left" prop="summary"
                                       width="380">
                        <!--<template slot-scope="scope">-->
                        <!--<el-input :disabled="true"-->
                        <!--style="width: 150vw"-->
                        <!--type="textarea"-->
                        <!--:autosize="{ minRows: 2, maxRows: 7}"-->
                        <!--v-model="scope.row.summary"></el-input>-->
                        <!--</template>-->
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_PAYMENT')" align="center" prop="payment"
                                       width="150">
                        <!--<template slot-scope="scope">-->
                        <!--<el-input :disabled="true" maxlength="20" style="width: 100%"-->
                        <!--v-model="scope.row.payment"></el-input>-->
                        <!--</template>-->
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_BIT')" align="center" prop="bit" width="60">
                        <!--<template slot-scope="scope">-->
                        <!--<el-input :disabled="true" maxlength="20" style="width: 100%"-->
                        <!--v-model="scope.row.bit"></el-input>-->
                        <!--</template>-->
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1028VIEW_JUDGMENT2')" align="center" width="100">
                        <template slot-scope="scope">
                          <!--                          <dicselect :code="code1"-->
                          <!--                                     :data="scope.row.judgment2"-->
                          <!--                                     :disabled="!disable"-->
                          <!--                                     :multiple="multiple"-->
                          <!--                                     :no="scope.row"-->
                          <!--                                     @change="getjudgment2">-->
                          <!--                          </dicselect>-->
                          <el-select :disabled="!disable" clearable v-model="scope.row.judgment2">
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
                          label="0"
                          :disabled="true"
                          v-model="form.sujudegresult"
                        >{{this.$t('label.PFANS1028VIEW_SUJUDEGRESULT1')}}
                        </el-radio>
                        <el-radio
                          label="1"
                          :disabled="true"
                          v-model="form.sujudegresult"
                        >{{this.$t('label.PFANS1028VIEW_SUJUDEGRESULT2')}}
                        </el-radio>
                        <el-radio
                          label="2"
                          :disabled="true"
                          v-model="form.sujudegresult"
                        >{{this.$t('label.PFANS1028VIEW_SUJUDEGRESULT3')}}
                        </el-radio>
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
  import {Message} from 'element-ui';
  import moment from 'moment';
  import {getDictionaryInfo} from '@/utils/customize';
  import dicselect from '../../../components/dicselect';

  export default {
    name: 'PFANS1028FormView',
    components: {
      EasyNormalContainer,
      dicselect
    },
    data() {
      return {
        radioSujud: {
          tableIndustrial: '0',
          tableElectronic: '0',
          tableCon: '0',
          tableSof: '0',
        },
        radiolijudegresult: {
          tableCommun: '0',
          tableDelivery: '0',
          tableComputers: '0',
          tableJasoftware: '0',
          tableGatetechnology: '0'
        },
        checked1: false,
        checked2: false,
        checked3: false,
        checked4: false,
        disabled1: false,
        disabled2: false,
        disabled3: false,
        disabled4: false,
        disabled5: true,
        disabled6: true,
        disabled7: true,
        disabled8: true,
        show1: false,
        show2: false,
        show3: false,
        show4: false,
        show5: false,
        show6: false,
        show7: false,
        show8: false,
        activeName: 'first',
        activeName2: 'first',
        activeName3: 'first',
        disabled: true,
        options: [],
        // checkList: [],
        code1: 'HT012',
        loading: false,
        title: 'title.PFANS1028VIEW',
        canStart: false,
        multiple: false,
        orglist: '',
        baseInfo: {},
        arrJud: [],
        arrsofe: [],
        arrput: [],
        arrdel: [],
        arrgate: [],
        arrIndustrial: [],
        arrElectronic: [],
        arrCOM: [],
        arrSOF: [],
        form: {
          decisionnumber: '',
          career: this.$t('PSDCD'),
          deployment: '',
          contractnumber: '',
          janame: '',
          custoenglish: '',
          varto: '',
          review: '',
          requirements: '0',
          possible: '',
          claimdatetime: [],
          technical: '',
          today: moment(new Date()).format('YYYY-MM-DD'),
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
          sujudegresult: '2',
          lijudegresult: [''],
          jxjudgeno:'',
          gfjudgeno:'',
          lyjudgeno:'',
          americantechno:'',
          other1: false,
          other2: false,
          other3: false,
          other4: false,
          other5: false,
          other6: false,
          other7: false,
          other8: false,
          other9: false,
          other10: false,
          other11: false,
          oreason: '',
          othreason: '',
          otherreason: '',
          eccnjudgeno: '',
        },
        tableComputers: [
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: this.$t('label.PFANS1028VIEW_COMTECHNICAL1'),
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS40'),
            judgment2: '2',
          },
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS41'),
            judgment2: '2',
          },
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS42'),
            judgment2: '2',
          },
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS43'),
            judgment2: '2',
          },
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS44'),
            judgment2: '2',
          },
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS45'),
            judgment2: '2',
          },
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS46'),
            judgment2: '2',
          },
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS47'),
            judgment2: '2',
          },
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS48'),
            judgment2: '2',
          },
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS49'),
            judgment2: '2',
          },
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS50'),
            judgment2: '2',
          },
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS51'),
            judgment2: '2',
          },
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS52'),
            judgment2: '2',
          },
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS53'),
            judgment2: '2',
          },
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS54'),
            judgment2: '2',
          },
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS55'),
            judgment2: '2',
          },

          {
            technicalnumber: '02',
            grade: 'X',
            technicalname: this.$t('label.PFANS1028VIEW_COMTECHNICAL2'),
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS56'),
            judgment2: '2',
          },
          {
            technicalnumber: '02',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS57'),
            judgment2: '2',
          },
        ],
        tableDelivery: [
          {
            technicalnumber: '01',
            grade: 'J',
            technicalname: this.$t('label.PFANS1028VIEW_DETECHNICALNAME3'),
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS30'),
            judgment2: '2',
          },
          {
            technicalnumber: '02',
            grade: 'J',
            technicalname: this.$t('label.PFANS1028VIEW_DETECHNICALNAME2'),
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS31'),
            judgment2: '2',
          },
          {
            technicalnumber: '02',
            grade: 'J',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS32'),
            judgment2: '2',
          },
          {
            technicalnumber: '02',
            grade: 'X',
            technicalname: this.$t('label.PFANS1028VIEW_DETECHNICALNAME3'),
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS33'),
            judgment2: '2',
          },
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: this.$t('label.PFANS1028VIEW_DETECHNICALNAME4'),
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS34'),
            judgment2: '2',
          },
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS35'),
            judgment2: '2',
          },
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS36'),
            judgment2: '2',
          },
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS99'),
            judgment2: '2',
          },
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS98'),
            judgment2: '2',
          },
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS37'),
            judgment2: '2',
          },
          {
            technicalnumber: '04',
            grade: 'X',
            technicalname: this.$t('label.PFANS1028VIEW_DETECHNICALNAME5'),
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS38'),
            judgment2: '2',
          },
          {
            technicalnumber: '04',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS97'),
            judgment2: '2',
          },
          {
            technicalnumber: '04',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS96'),
            judgment2: '2',
          },
          {
            technicalnumber: '04',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS39'),
            judgment2: '2',
          },
        ],
        tableCommun: [
          {
            technicalnumber: '01',
            grade: 'J',
            technicalname: this.$t('label.PFANS1028VIEW_COTECHNICALNAME1'),
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS95'),
            judgment2: '2',
          },
          {
            technicalnumber: '01',
            grade: 'J',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS94'),
            judgment2: '2',
          },
          {
            technicalnumber: '02',
            grade: 'J',
            technicalname: this.$t('label.PFANS1028VIEW_COTECHNICALNAME2'),
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS2'),
            judgment2: '2',
          },
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: this.$t('label.PFANS1028VIEW_COTECHNICALNAME3'),
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS93'),
            judgment2: '2',
          },
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS92'),
            judgment2: '2',
          },
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS91'),
            judgment2: '2',
          },
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS4'),
            judgment2: '2',
          },
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS90'),
            judgment2: '2',
          },
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS89'),
            judgment2: '2',
          },
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS88'),
            judgment2: '2',
          },
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS87'),
            judgment2: '2',
          },
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS86'),
            judgment2: '2',
          },
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS85'),
            judgment2: '2',
          },
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS84'),
            judgment2: '2',
          },
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS83'),
            judgment2: '2',
          },
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS82'),
            judgment2: '2',
          },
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS81'),
            judgment2: '2',
          },
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS80'),
            judgment2: '2',
          },
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS79'),
            judgment2: '2',
          },
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS78'),
            judgment2: '2',
          },
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS77'),
            judgment2: '2',
          },
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS8'),
            judgment2: '2',
          },
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS9'),
            judgment2: '2',
          },
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS10'),
            judgment2: '2',
          },


          {
            technicalnumber: '02',
            grade: 'X',
            technicalname: this.$t('label.PFANS1028VIEW_COTECHNICALNAME4'),
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS76'),
            judgment2: '2',
          },
          {
            technicalnumber: '02',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS75'),
            judgment2: '2',
          },
          {
            technicalnumber: '02',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS12'),
            judgment2: '2',
          },
          {
            technicalnumber: '02',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS13'),
            judgment2: '2',
          },
          {
            technicalnumber: '03',
            grade: 'X',
            technicalname: this.$t('label.PFANS1028VIEW_COTECHNICALNAME5'),
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS14'),
            judgment2: '2',
          },
          {
            technicalnumber: '03',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS15'),
            judgment2: '2',
          },

          {
            technicalnumber: '04',
            grade: 'X',
            technicalname: this.$t('label.PFANS1028VIEW_COTECHNICALNAME6'),
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS74'),
            judgment2: '2',
          },
          {
            technicalnumber: '04',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS73'),
            judgment2: '2',
          },
          {
            technicalnumber: '05',
            grade: 'X',
            technicalname: this.$t('label.PFANS1028VIEW_COTECHNICALNAME7'),
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS72'),
            judgment2: '2',
          },
          {
            technicalnumber: '05',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS71'),
            judgment2: '2',
          },
          {
            technicalnumber: '05',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS71'),
            judgment2: '2',
          },
          {
            technicalnumber: '05',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS18'),
            judgment2: '2',
          },
          {
            technicalnumber: '05',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS19'),
            judgment2: '2',
          },
          {
            technicalnumber: '05',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS20'),
            judgment2: '2',
          },

          {
            technicalnumber: '06',
            grade: 'X',
            technicalname: this.$t('label.PFANS1028VIEW_COTECHNICALNAME8'),
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS69'),
            judgment2: '2',
          },
          {
            technicalnumber: '06',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS68'),
            judgment2: '2',
          },
          {
            technicalnumber: '06',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS67'),
            judgment2: '2',
          },
          {
            technicalnumber: '06',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS22'),
            judgment2: '2',
          },
          {
            technicalnumber: '06',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS23'),
            judgment2: '2',
          },
          {
            technicalnumber: '07',
            grade: 'X',
            technicalname: this.$t('label.PFANS1028VIEW_COTECHNICALNAME9'),
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS100'),
            judgment2: '2',
          },
          {
            technicalnumber: '07',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS101'),
            judgment2: '2',
          },
          {
            technicalnumber: '07',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS25'),
            judgment2: '2',
          },
          {
            technicalnumber: '07',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS26'),
            judgment2: '2',
          },
          {
            technicalnumber: '07',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS27'),
            judgment2: '2',
          },
          {
            technicalnumber: '08',
            grade: 'X',
            technicalname: this.$t('label.PFANS1028VIEW_COTECHNICALNAME10'),
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS28'),
            judgment2: '2',
          },
        ],
        tableJasoftware: [
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: this.$t('label.PFANS1028VIEW_SOFTWARE1'),
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS58'),
            judgment2: '2',
          },
          {
            technicalnumber: '01',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS59'),
            judgment2: '2',
          },
          {
            technicalnumber: '02',
            grade: 'X',
            technicalname: this.$t('label.PFANS1028VIEW_SOFTWARE2'),
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS60'),
            judgment2: '2',
          },
        ],
        tableGatetechnology: [
          {
            technicalnumber: '07',
            grade: 'X',
            technicalname: this.$t('label.PFANS1028VIEW_GATETECHNICAL1'),
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS61'),
            judgment2: '2',
          },
          {
            technicalnumber: '07',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS62'),
            judgment2: '2',
          },
          {
            technicalnumber: '07',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS63'),
            judgment2: '2',
          },
          {
            technicalnumber: '02',
            grade: 'X',
            technicalname: this.$t('label.PFANS1028VIEW_GATETECHNICAL2'),
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS64'),
            judgment2: '2',
          },
          {
            technicalnumber: '05',
            grade: 'X',
            technicalname: this.$t('label.PFANS1028VIEW_GATETECHNICAL3'),
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS65'),
            judgment2: '2',
          },
          {
            technicalnumber: '05',
            grade: 'X',
            technicalname: '',
            judgment1: '2',
            points: this.$t('label.PFANS1028VIEW_POINTS66'),
            judgment2: '2',
          },
        ],
        tableIndustrial: [
          {
            japno: '9',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME9'),
            summary: '',
            judgment1: '2',
            payment: '',
            bit: '',
            judgment2: '2',
          },
          {
            japno: '10',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME10'),
            summary: this.$t('label.PFANS1028VIEW_SUMMARY10'),
            judgment1: '2',
            payment: '',
            bit: '',
            judgment2: '2',
          },
          {
            japno: '11',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME11'),
            summary: this.$t('label.PFANS1028VIEW_SUMMARY11'),
            judgment1: '2',
            payment: '',
            bit: '',
            judgment2: '2',
          },
          // {
          //   japno: '16',
          //   tradename: this.$t('label.PFANS1028VIEW_TRADENAME16'),
          //   summary: this.$t('label.PFANS1028VIEW_SUMMARY16'),
          //   judgment1: '2',
          //   payment: '',
          //   bit: '',
          //   judgment2: '2',
          // },
          {
            japno: '16',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME16'),
            summary: this.$t('label.PFANS1028VIEW_SUMMARY16'),
            judgment1: '2',
            payment: '',
            bit: '',
            judgment2: '2',
          },
          {
            japno: '17',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME17'),
            summary: this.$t('label.PFANS1028VIEW_SUMMARY17'),
            judgment1: '2',
            payment: '8479509010',
            bit: '台',
            judgment2: '2',
          },
          {
            japno: '18',
            tradename: this.$t('label.PFANS1028VIEW_POINTS102'),
            summary: this.$t('label.PFANS1028VIEW_POINTS103'),
            judgment1: '2',
            payment: '8537109021',
            bit: '',
            judgment2: '2',
          },
          {
            japno: '19',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME19'),
            summary: this.$t('label.PFANS1028VIEW_POINTS104'),
            judgment1: '2',
            payment: '',
            bit: this.$t('label.PFANS1028VIEW_POINTS105'),
            judgment2: '2',
          },
          {
            japno: '24',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME24'),
            summary: this.$t('label.PFANS1028VIEW_SUMMARY24'),
            judgment1: '2',
            payment: '',
            bit: '',
            judgment2: '2',
          },
          {
            japno: '29',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME29'),
            summary: this.$t('label.PFANS1028VIEW_SUMMARY29'),
            judgment1: '2',
            payment: '',
            bit: '',
            judgment2: '2',
          },
          {
            japno: '35',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME35'),
            summary: this.$t('label.PFANS1028VIEW_SUMMARY35'),
            judgment1: '2',
            payment: '',
            bit: '',
            judgment2: '2',
          },
        ],
        tableElectronic: [
          {
            japno: '48',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME48'),
            summary: '',
            judgment1: '2',
            payment: '',
            bit: this.$t('label.PFANS1028VIEW_BIT4'),
            judgment2: '2',
          },
          {
            japno: '49',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME49'),
            summary: this.$t('label.PFANS1028VIEW_SUMMARY49'),
            judgment1: '2',
            payment: '',
            bit: this.$t('label.PFANS1028VIEW_BIT4'),
            judgment2: '2',
          },
          {
            japno: '50',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME50'),
            summary: this.$t('label.PFANS1028VIEW_SUMMARY50'),
            judgment1: '2',
            payment: '',
            bit: this.$t('label.PFANS1028VIEW_BIT4'),
            judgment2: '2',
          },
          {
            japno: '51',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME51'),
            summary: this.$t('label.PFANS1028VIEW_SUMMARY51'),
            judgment1: '2',
            payment: '8526101010',
            bit: this.$t('label.PFANS1028VIEW_BIT4'),
            judgment2: '2',
          },
          {
            japno: '52',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME52'),
            summary: this.$t('label.PFANS1028VIEW_SUMMARY51'),
            judgment1: '2',
            payment: '8526109011',
            bit: this.$t('label.PFANS1028VIEW_BIT6'),
            judgment2: '2',
          },
          {
            japno: '53',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME53'),
            summary: this.$t('label.PFANS1028VIEW_SUMMARY51'),
            judgment1: '2',
            payment: '8526109091',
            bit: this.$t('label.PFANS1028VIEW_BIT6'),
            judgment2: '2',
          },
          {
            japno: '54',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME54'),
            summary: this.$t('label.PFANS1028VIEW_SUMMARY51'),
            judgment1: '2',
            payment: '9014800020',
            bit: this.$t('label.PFANS1028VIEW_BIT6'),
            judgment2: '2',
          },
          {
            japno: '55',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME55'),
            summary: this.$t('label.PFANS1028VIEW_SUMMARY51'),
            judgment1: '2',
            payment: '9014209017',
            bit: this.$t('label.PFANS1028VIEW_BIT6'),
            judgment2: '2',
          },
          {
            japno: '56',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME56'),
            summary: this.$t('label.PFANS1028VIEW_SUMMARY51'),
            judgment1: '2',
            payment: '9014209018',
            bit: this.$t('label.PFANS1028VIEW_BIT6'),
            judgment2: '2',
          },
          {
            japno: '57',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME57'),
            summary: this.$t('label.PFANS1028VIEW_SUMMARY51'),
            judgment1: '2',
            payment: '9014209016',
            bit: this.$t('label.PFANS1028VIEW_BIT6'),
            judgment2: '2',
          },
          {
            japno: '58',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME58'),
            summary: this.$t('label.PFANS1028VIEW_SUMMARY51'),
            judgment1: '2',
            payment: '8537109021',
            bit: this.$t('label.PFANS1028VIEW_BIT6'),
            judgment2: '2',
          },
          {
            japno: '59',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME59'),
            summary: this.$t('label.PFANS1028VIEW_SUMMARY51'),
            judgment1: '2',
            payment: '',
            bit: this.$t('label.PFANS1028VIEW_BIT6'),
            judgment2: '2',
          },
          {
            japno: '60',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME60'),
            summary: this.$t('label.PFANS1028VIEW_SUMMARY51'),
            judgment1: '2',
            payment: '',
            bit: this.$t('label.PFANS1028VIEW_BIT6'),
            judgment2: '2',
          },
          {
            japno: '61',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME61'),
            summary: this.$t('label.PFANS1028VIEW_SUMMARY51'),
            judgment1: '2',
            payment: '',
            bit: this.$t('label.PFANS1028VIEW_BIT6'),
            judgment2: '2',
          },
          {
            japno: '62',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME62'),
            summary: this.$t('label.PFANS1028VIEW_SUMMARY51'),
            judgment1: '2',
            payment: '8537109021',
            bit: this.$t('label.PFANS1028VIEW_BIT6'),
            judgment2: '2',
          },
          {
            japno: '63',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME63'),
            summary: this.$t('label.PFANS1028VIEW_SUMMARY51'),
            judgment1: '2',
            payment: '',
            bit: '',
            judgment2: '2',
          },
          {
            japno: '64',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME64'),
            summary: this.$t('label.PFANS1028VIEW_SUMMARY51'),
            judgment1: '2',
            payment: '',
            bit: this.$t('label.PFANS1028VIEW_BIT4'),
            judgment2: '2',
          },
          {
            japno: '65',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME65'),
            summary: this.$t('label.PFANS1028VIEW_SUMMARY65'),
            judgment1: '2',
            payment: '',
            bit: this.$t('label.PFANS1028VIEW_BIT4'),
            judgment2: '2',
          },
          {
            japno: '66',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME66'),
            summary: this.$t('label.PFANS1028VIEW_SUMMARY66'),
            judgment1: '2',
            payment: '8543709930',
            bit: this.$t('label.PFANS1028VIEW_BIT4'),
            judgment2: '2',
          },
        ],
        tableCon: [
          {
            japno: '98',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME98'),
            summary: this.$t('label.PFANS1028VIEW_SUMMARY98'),
            judgment1: '2',
            payment: '',
            bit: '',
            judgment2: '2',
          },
          {
            japno: '99',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME99'),
            summary: '',
            judgment1: '2',
            payment: '',
            bit: '',
            judgment2: '2',
          },
          {
            japno: '100',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME100'),
            summary: '',
            judgment1: '2',
            payment: '',
            bit: '',
            judgment2: '2',
          },
          {
            japno: '101',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME101'),
            summary: '',
            judgment1: '2',
            payment: '',
            bit: '',
            judgment2: '2',
          },
          {
            japno: '102',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME102'),
            summary: this.$t('label.PFANS1028VIEW_SUMMARY102'),
            judgment1: '2',
            payment: '',
            bit: '',
            judgment2: '2',
          },
          {
            japno: '103',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME103'),
            summary: this.$t('label.PFANS1028VIEW_SUMMARY103'),
            judgment1: '2',
            payment: '',
            bit: '',
            judgment2: '2',
          },
          {
            japno: '104',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME104'),
            summary: '',
            judgment1: '2',
            payment: '',
            bit: '',
            judgment2: '2',
          },
          {
            japno: '105',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME105'),
            summary: '',
            judgment1: '2',
            payment: '',
            bit: '',
            judgment2: '2',
          },
          {
            japno: '106',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME106'),
            summary: '',
            judgment1: '2',
            payment: '',
            bit: '',
            judgment2: '2',
          },
        ],
        tableSof: [
          {
            japno: '1',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME1'),
            summary: '',
            judgment1: '2',
            payment: '8471411000',
            bit: this.$t('label.PFANS1028VIEW_BIT4'),
            judgment2: '2',
          },
          {
            japno: '2',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME2'),
            summary: '',
            judgment1: '2',
            payment: '8471412000',
            bit: this.$t('label.PFANS1028VIEW_BIT4'),
            judgment2: '2',
          },
          {
            japno: '3',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME3'),
            summary: '',
            judgment1: '2',
            payment: '8471491000',
            bit: this.$t('label.PFANS1028VIEW_BIT4'),
            judgment2: '2',
          },
          {
            japno: '4',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME4'),
            summary: '',
            judgment1: '2',
            payment: '8471492000',
            bit: this.$t('label.PFANS1028VIEW_BIT4'),
            judgment2: '2',
          },
          {
            japno: '5',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME5'),
            summary: '',
            judgment1: '2',
            payment: '8471501000',
            bit: this.$t('label.PFANS1028VIEW_BIT4'),
            judgment2: '2',
          },
          {
            japno: '6',
            tradename: this.$t('label.PFANS1028VIEW_TRADENAME6'),
            summary: '',
            judgment1: '2',
            payment: '8471502000',
            bit: this.$t('label.PFANS1028VIEW_BIT4'),
            judgment2: '2',
          },
        ],
        rules: {},
        buttonList: [{
          key: 'save',
          name: 'button.save',
          disabled: false,
          icon: 'el-icon-check',
        }],
      };
    },
    mounted() {
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1028Store/one', {'nonjudgment_id': this.$route.params._id})
          .then(response => {
            this.form = response;
            this.form.gfjudgeno='GF-'+response.contractnumber;
            this.form.jxjudgeno='JX-'+response.contractnumber;
            this.form.lyjudgeno='LY-'+response.contractnumber;
             this.form.today=moment(new Date()).format('YYYY-MM-DD');
            if(this.form.outputlimit2 === '1'){
              this.show8 = true;
            }else{
              this.show8 = false;
            }
            if(this.form.americantechno === '1'){
              this.show7 = true;
            }else{
              this.show7 = false;
            }
            if(this.form.americantechnology === '0'){
              this.disabled4 = true;
            }else{
              this.disabled4 = false
            }
             if(this.form.weapon === '1' && this.form.word === '1' && this.form.specifi === '1'){
               this.form.restricted = '0';
             } else {
               this.form.restricted = '1';
             }
            if (this.form.review !== '' && this.form.review !== null) {
              if (this.form.review === '2') {
                this.checked3 = true;
              } else if (this.form.review === '1') {
                this.checked1 = true;
              } else if (this.form.review === '3') {
                this.checked1 = true;
                this.checked2 = true;
              } else if (this.form.review === '4') {
                this.checked2 = true;
              }
            }
            if(this.form.management4 === '0'){
              this.show6 = true;
            }else{
              this.show6 = false;
            }
            // if (this.form.possible !== '') {
            //   this.checkList = JSON.parse(this.form.possible);
            // }
            if(this.form.other1 !== '' && this.form.other1 !== null){
              if(this.form.other1 === 'true'){
                this.form.other1 = true;
              } else {
                this.form.other1 = false;
              }
            }
            if(this.form.other2 !== '' && this.form.other2 !== null){
              if(this.form.other2 === 'true'){
                this.form.other2 = true;
              } else {
                this.form.other2 = false;
              }
            }
            if(this.form.other3 !== '' && this.form.other3 !== null){
              if(this.form.other3 === 'true'){
                this.form.other3 = true;
              } else {
                this.form.other3 = false;
              }
            }
            if(this.form.other4 !== '' && this.form.other4 !== null){
              if(this.form.other4 === 'true'){
                this.form.other4 = true;
              } else {
                this.form.other4 = false;
              }
            }
            if(this.form.other5 !== '' && this.form.other5 !== null){
              if(this.form.other5 === 'true'){
                this.form.other5 = true;
                this.show1 = true;
              } else {
                this.form.other5 = false;
                this.show1 = false;
              }
            }
            if(this.form.other6 !== '' && this.form.other6 !== null){
              if(this.form.other6 === 'true'){
                this.form.other6 = true;
              } else {
                this.form.other6 = false;
              }
            }
            if(this.form.other7 !== '' && this.form.other7 !== null){
              if(this.form.other7 === 'true'){
                this.form.other7 = true;
                this.show3 = true;
              } else {
                this.form.other7 = false;
                this.show3 = false;
              }
            }
            if(this.form.other8 !== '' && this.form.other8 !== null){
              if(this.form.other8 === 'true'){
                this.form.other8 = true;
                this.show2 = true;
              } else {
                this.form.other8 = false;
                this.show2 = false;
              }
            }
            if(this.form.other9 !== '' && this.form.other9 !== null){
              if(this.form.other9 === 'true'){
                this.form.other9 = true;
              } else {
                this.form.other9 = false;
              }
            }
            if(this.form.other10 !== '' && this.form.other10 !== null){
              if(this.form.other10 === 'true'){
                this.form.other10 = true;
                this.show4 = true;
              } else {
                this.form.other10 = false;
                this.show4 = false;
              }
            }
            if(this.form.other11 !== '' && this.form.other11 !== null){
              if(this.form.other11 === 'true'){
                this.form.other11 = true;
                this.show5 = true;
              } else {
                this.form.other11 = false;
                this.show5 = false;
              }
            }
            let repair = response.claimdatetime;
            let serdate = repair.slice(0, 10);
            let serdate1 = repair.slice(repair.length - 10);
            this.form.claimdatetime = [serdate, serdate1];
            this.grouporglist = this.form.deployment;
            if (this.form.limitcommunt !== '' && this.form.limitcommunt !== null) {
              for (let i = 0; i < JSON.parse(response.limitcommunt).length; i++) {
                let aa = JSON.parse(response.limitcommunt)[i];
                this.tableCommun[i].judgment1 = aa.jud1;
                this.tableCommun[i].judgment2 = aa.jud2;
              }
            }

            if (this.form.limitdelivery !== '' && this.form.limitdelivery !== null) {
              for (let i = 0; i < JSON.parse(response.limitdelivery).length; i++) {
                let aa = JSON.parse(response.limitdelivery)[i];
                this.tableDelivery[i].judgment1 = aa.jud1;
                this.tableDelivery[i].judgment2 = aa.jud2;
              }
            }

            if (this.form.limitcomputers !== '' && this.form.limitcomputers !== null) {
              for (let i = 0; i < JSON.parse(response.limitcomputers).length; i++) {
                let aa = JSON.parse(response.limitcomputers)[i];
                this.tableComputers[i].judgment1 = aa.jud1;
                this.tableComputers[i].judgment2 = aa.jud2;
              }
            }

            if (this.form.limitjasoftware !== '' && this.form.limitjasoftware !== null) {
              for (let i = 0; i < JSON.parse(response.limitjasoftware).length; i++) {
                let aa = JSON.parse(response.limitjasoftware)[i];
                this.tableJasoftware[i].judgment1 = aa.jud1;
                this.tableJasoftware[i].judgment2 = aa.jud2;
              }
            }

            if (this.form.limittechnology !== '' && this.form.limittechnology !== null) {
              for (let i = 0; i < JSON.parse(response.limittechnology).length; i++) {
                let aa = JSON.parse(response.limittechnology)[i];
                this.tableGatetechnology[i].judgment1 = aa.jud1;
                this.tableGatetechnology[i].judgment2 = aa.jud2;
              }
            }

            if (this.form.supplieindustrial !== '' && this.form.supplieindustrial !== null) {
              for (let i = 0; i < JSON.parse(response.supplieindustrial).length; i++) {
                let aa = JSON.parse(response.supplieindustrial)[i];
                this.tableIndustrial[i].judgment1 = aa.jud1;
                this.tableIndustrial[i].judgment2 = aa.jud2;
              }
            }

            if (this.form.supplielectronic !== '' && this.form.supplielectronic !== null) {
              for (let i = 0; i < JSON.parse(response.supplielectronic).length; i++) {
                let aa = JSON.parse(response.supplielectronic)[i];
                this.tableElectronic[i].judgment1 = aa.jud1;
                this.tableElectronic[i].judgment2 = aa.jud2;
              }
            }

            if (this.form.suppliecom !== '' && this.form.suppliecom !== null) {
              for (let i = 0; i < JSON.parse(response.suppliecom).length; i++) {
                let aa = JSON.parse(response.suppliecom)[i];
                this.tableCon[i].judgment1 = aa.jud1;
                this.tableCon[i].judgment2 = aa.jud2;
              }
            }

            if (this.form.suppliesof !== '' && this.form.suppliesof !== null) {
              for (let i = 0; i < JSON.parse(response.suppliesof).length; i++) {
                let aa = JSON.parse(response.suppliesof)[i];
                this.tableSof[i].judgment1 = aa.jud1;
                this.tableSof[i].judgment2 = aa.jud2;
              }
            }

            // if (this.form.lijudegresult && this.form.lijudegresult.split(',').length > 0) {
            //   let item = [];
            //   for (let i of this.form.lijudegresult.split(',')) {
            //     item.push(i);
            //   }
            //   this.form.lijudegresult = item;
            // } else {
            //   this.form.lijudegresult = [];
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
      if (!this.$route.params.disabled) {
        this.buttonList = [];
        this.disabled1 = true;
        this.disabled2 = true;
        this.disabled3 = true;
      }
      this.disable = this.$route.params.disabled;
    },
    methods: {
      getradio(val){
        this.form.americantechnology = val;
        if(this.form.americantechnology === '0'){
          this.disabled4 = true;
        }else{
          this.form.americantechno = '';
          this.disabled4 = false;
          this.show7 = false;
        }
      },
      getvalue(val){
        this.form.weapon = val;
        if(this.form.weapon === '1' && this.form.word === '1' && this.form.specifi === '1'){
          this.form.restricted = '0';
        } else {
          this.form.restricted = '1';
        }
      },
      getvalue1(val){
        this.form.word = val;
        if(this.form.weapon === '1' && this.form.word === '1' && this.form.specifi === '1'){
          this.form.restricted = '0';
        } else {
          this.form.restricted = '1';
        }
      },
      getvalue2(val){
        this.form.specifi = val;
        if(this.form.weapon === '1' && this.form.word === '1' && this.form.specifi === '1'){
          this.form.restricted = '0';
        } else {
          this.form.restricted = '1';
        }
      },
      objectSpanMethod4({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2 || columnIndex === 3) {
          if (rowIndex === 0) {
            return {
              rowspan: 3,
              colspan: 1
            };
          } else if (rowIndex === 3) {
            return {
              rowspan: 1,
              colspan: 1
            };
          } else if (rowIndex === 4) {
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
      objectSpanMethod3({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2 || columnIndex === 3) {
          if (rowIndex === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else if (rowIndex === 2) {
            return {
              rowspan: 1,
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
      objectSpanMethod2({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2 || columnIndex === 3) {
          if (rowIndex === 0) {
            return {
              rowspan: 16,
              colspan: 1
            };
          } else if (rowIndex === 16) {
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
      objectSpanMethod1({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2 || columnIndex === 3) {
          if (rowIndex === 0) {
            return {
              rowspan: 1,
              colspan: 1
            };
          } else if (rowIndex === 1) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else if (rowIndex === 3) {
            return {
              rowspan: 1,
              colspan: 1
            };
          } else if (rowIndex === 4) {
            return {
              rowspan: 6,
              colspan: 1
            };
          } else if (rowIndex === 10) {
            return {
              rowspan: 4,
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
      objectSpanMethod({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2 || columnIndex === 3) {
          if (rowIndex === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else if (rowIndex === 2) {
            return {
              rowspan: 1,
              colspan: 1
            };
          } else if (rowIndex === 3) {
            return {
              rowspan: 21,
              colspan: 1
            };
          } else if (rowIndex === 24) {
            return {
              rowspan: 4,
              colspan: 1
            };
          } else if (rowIndex === 28) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else if (rowIndex === 30) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else if (rowIndex === 32) {
            return {
              rowspan: 6,
              colspan: 1
            };
          } else if (rowIndex === 38) {
            return {
              rowspan: 5,
              colspan: 1
            };
          } else if (rowIndex === 43) {
            return {
              rowspan: 5,
              colspan: 1
            };
          } else if (rowIndex === 48) {
            return {
              rowspan: 1,
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
      getChecked1(val) {
        this.checked1 = val;
        if(val === true && this.checked2 === true){
          if(this.checked2 === true){
            this.form.review = '3';
            this.form.requirements = '1';
          }
        } else if (val === true) {
          this.disabled2 = false;
          this.checked3 = false;
          this.form.review = '1';
          this.form.requirements='0'
        } else if(val === false){
          this.checked1 = false;
          this.checked3 = false;
          this.form.review = '';
          this.form.requirements='1';
          this.form.requirements='';
        }
      },
      getChecked3(val) {
        this.checked3 = val;
        if (val === true) {
          this.disabled2 = true;
          this.checked1 = false;
          this.checked2 = false;
          this.form.review = '2';
          this.form.requirements='1'
        } else {
          this.disabled2 = false;
          this.form.review = '';
          this.form.requirements='0';
          this.form.requirements='';
        }
      },
      getChecked2(val) {
        this.checked2 = val;
        if (val === true) {
          if (this.form.review === '1') {
            this.form.review = '3';
            this.form.requirements='1'
          }
        } else if(val===false || this.checked1===true){
          this.form.review='1';
          this.form.requirements='0';
        }else if(val===true || this.checked1===false){
          this.form.review = '3';
          this.form.requirements='0';
        }else if(val===false || this.checked1===false){
          this.form.review = '';
          this.form.requirements='0';
        }
      },
      getChecked4(val){
        this.form.judgment1 = val;
        // if(val === true){
        //   this.form.judgment1 = '1';
        // } else if(val === false){
        //   this.form.judgment1 = '0';
        // }
      },
      getChecked8(val){
        this.form.other5 = val;
        if(val === true){
          this.show1 = true;
        } else {
          this.show1 = false;
          this.show3 = false
        }
      },
      getChecked9(val){
        this.form.other6 = val;
        if(val === true){
          this.form.other7 = false;
        }
      },
      getChecked10(val){
        this.form.other7 = val;
        if(val === true){
          this.form.other6 = false;
          this.show3 = true;
        }else{
          this.show3 = false;
        }
      },
      getChecked11(val){
        this.form.other8 = val;
        if(val === true){
          this.show2 = true;
        } else {
          this.show2 = false;
          this.show4 = false;
        }
      },
      getChecked12(val){
        this.form.other9 = val;
        if(val === true){
          this.form.other10 = false;
        }
      },
      getChecked13(val){
        this.form.other10 = val;
        if(val === true){
          this.form.other9 = false;
          this.show4 = true;
        }else{
          this.show4 = false;
        }
      },
      getChecked14(val){
        this.form.other11 = val;
        if(val === true){
          this.show5 = true;
        }else{
          this.show5 = false;
        }
      },
      getRadio(val){//americantechno
        this.form.management4 = val;
        if(this.form.management4 === '0'){
          this.show6 = true;
        }else{
          this.show6 = false;
        }
      },
      getRadio1(val){
        this.form.americantechno = val;
        if(this.form.americantechno === '1'){
          this.show7 = true;
        }else{
          this.show7 = false;
        }
      },
      getRadio2(val){
        this.form.outputlimit2 = val;
        if(this.form.outputlimit2 === '1'){
          this.show8 = true;
        }else{
          this.show8 = false;
        }
      },
      workflowState(val) {
        if (val.state === '1') {
          this.form.status = '3';
        } else if (val.state === '2') {
          this.form.status = '4';
        }
        this.buttonClick('save');
      },
      start() {
        this.form.status = '2';
        this.buttonClick('save');
      },
      end() {
        this.form.status = '0';
        this.buttonClick('save');
      },

      buttonClick(val) {
        if (val === 'save') {
          this.$refs['reff'].validate(valid => {
            if (valid) {
              this.loading = true;
              // if (JSON.stringify(this.checkList) !== '[]') {
              //   this.form.possible = JSON.stringify(this.checkList);
              // } else {
              //   this.form.possible = '';
              // }
              if(this.form.americantechnology === '1'){
                this.form.americantechno = '';
                this.form.eccnjudgeno = '';
              }
              if(this.form.outputlimit2 === '0'){
                this.form.weapon = '';
                this.form.weaponreson = '';
                this.form.word = '';
                this.form.wordreson = '';
                this.form.restricted = '';
                this.form.specifireson = '';
                this.form.specifi = '';
              }
              if(this.form.management4 === '1' || this.form.management4 === '3'){
                this.form.judged = '';
              }
              if(this.form.other5 === false){
                this.form.other6 = '';
                this.form.other7 = '';
                this.form.oreason = '';
              }
              if(this.form.other7 === false){
                this.form.oreason = '';
              }
              if(this.form.other8 === false){
                this.form.other9 = '';
                this.form.other10 = '';
                this.form.othreason = '';
              }
              if(this.form.other10 === false){
                this.form.othreason = '';
              }
              if(this.form.other11 === false){
                this.form.otherreason = '';
              }
              //通信デバイス、コンピューター及び電子デバイス製造
              for (let i = 0; i < this.tableCommun.length; i++) {
                this.arrJud.push({
                  jud1: this.tableCommun[i].judgment1,
                  jud2: this.tableCommun[i].judgment2,
                });
              }
              for (let i = 0; i < this.tableGatetechnology.length; i++) {
                this.arrgate.push({
                  jud1: this.tableGatetechnology[i].judgment1,
                  jud2: this.tableGatetechnology[i].judgment2,
                });
              }
              for (let i = 0; i < this.tableDelivery.length; i++) {
                this.arrdel.push({
                  jud1: this.tableDelivery[i].judgment1,
                  jud2: this.tableDelivery[i].judgment2,
                });
              }
              for (let i = 0; i < this.tableComputers.length; i++) {
                this.arrput.push({
                  jud1: this.tableComputers[i].judgment1,
                  jud2: this.tableComputers[i].judgment2,
                });
              }
              for (let i = 0; i < this.tableJasoftware.length; i++) {
                this.arrsofe.push({
                  jud1: this.tableJasoftware[i].judgment1,
                  jud2: this.tableJasoftware[i].judgment2,
                });
              }
              //工業設備
              for (let i = 0; i < this.tableIndustrial.length; i++) {
                this.arrIndustrial.push({
                  jud1: this.tableIndustrial[i].judgment1,
                  jud2: this.tableIndustrial[i].judgment2,
                });
              }
              //電子設備
              for (let i = 0; i < this.tableElectronic.length; i++) {
                this.arrElectronic.push({
                  jud1: this.tableElectronic[i].judgment1,
                  jud2: this.tableElectronic[i].judgment2,
                });
              }
              //ソフトウェア
              for (let i = 0; i < this.tableCon.length; i++) {
                this.arrCOM.push({
                  jud1: this.tableCon[i].judgment1,
                  jud2: this.tableCon[i].judgment2,
                });
              }
              //コンピュータ
              for (let i = 0; i < this.tableSof.length; i++) {
                this.arrSOF.push({
                  jud1: this.tableSof[i].judgment1,
                  jud2: this.tableSof[i].judgment2,
                });
              }
              let lijudegresult = '';
              if(this.form.lijudegresult!==null){
              for (let item of this.form.lijudegresult) {
                lijudegresult += item + ",";
                }
              lijudegresult = lijudegresult.substr(0, lijudegresult.length - 1);
              }
              this.form.lijudegresult = lijudegresult;
              this.form.limitcommunt = JSON.stringify(this.arrJud);
              this.form.limitdelivery = JSON.stringify(this.arrdel);
              this.form.limittechnology = JSON.stringify(this.arrgate);
              this.form.limitcomputers = JSON.stringify(this.arrput);
              this.form.limitjasoftware = JSON.stringify(this.arrsofe);
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
    watch: {
      tableIndustrial: {
        handler(val) {
          for (let item of val) {
            if (item.judgment1 && item.judgment1 === '2') {
              this.radioSujud.tableIndustrial = '2';
              return;
            } else if (item.judgment1 && item.judgment1 === '1' && item.judgment2 && item.judgment2 === '2') {
              this.radioSujud.tableIndustrial = '1';
              return
            }
          }
          this.radioSujud.tableIndustrial = '0';
        },
        immediate: true,  //刷新加载 立马触发一次handler
        deep: true  // 可以深度检测到 person 对象的属性值的变化
      },
      tableElectronic: {
        handler(val) {
          for (let item of val) {
            if (item.judgment1 && item.judgment1 === '2') {
              this.radioSujud.tableElectronic = '2';
              return;
            } else if (item.judgment1 && item.judgment1 === '1' && item.judgment2 && item.judgment2 === '2') {
              this.radioSujud.tableElectronic = '1';
              return
            }
          }
          this.radioSujud.tableElectronic = '0';
        },
        immediate: true,  //刷新加载 立马触发一次handler
        deep: true  // 可以深度检测到 person 对象的属性值的变化
      },
      tableCon: {
        handler(val) {
          for (let item of val) {
            if (item.judgment1 && item.judgment1 === '2') {
              this.radioSujud.tableCon = '2';
              return;
            } else if (item.judgment1 && item.judgment1 === '1' && item.judgment2 && item.judgment2 === '2') {
              this.radioSujud.tableCon = '1';
              return
            }
          }
          this.radioSujud.tableCon = '0';
        },
        immediate: true,  //刷新加载 立马触发一次handler
        deep: true  // 可以深度检测到 person 对象的属性值的变化
      },
      tableSof: {
        handler(val) {
          for (let item of val) {
            if (item.judgment1 && item.judgment1 === '2') {
              this.radioSujud.tableSof = '2';
              return;
            } else if (item.judgment1 && item.judgment1 === '1' && item.judgment2 && item.judgment2 === '2') {
              this.radioSujud.tableSof = '1';
              return
            }
          }
          this.radioSujud.tableSof = '0';
        },
        immediate: true,  //刷新加载 立马触发一次handler
        deep: true  // 可以深度检测到 person 对象的属性值的变化
      },
      radioSujud: {
        handler(val) {
          if (val.tableIndustrial === '2' || val.tableElectronic === '2' || val.tableCon === '2' || val.tableSof === '2') {
            this.form.sujudegresult = '2'
          } else if (val.tableIndustrial === '1' || val.tableElectronic === '1' || val.tableCon === '1' || val.tableSof === '1') {
            this.form.sujudegresult = '1'
          } else {
            this.form.sujudegresult = '0'
          }
        },
        immediate: true,  //刷新加载 立马触发一次handler
        deep: true  // 可以深度检测到 person 对象的属性值的变化
      },
      tableCommun: {
        handler(val) {
          let row = 0;
          for (let item of val) {
            let judgment1 = "";
            if (row <= 1) {
              judgment1 = val[0].judgment1
            } else if (row === 2) {
              judgment1 = val[2].judgment1
            } else if (row <= 24) {
              judgment1 = val[3].judgment1
            } else if (row <= 28) {
              judgment1 = val[25].judgment1
            } else if (row <= 30) {
              judgment1 = val[29].judgment1
            } else if (row <= 32) {
              judgment1 = val[31].judgment1
            } else if (row <= 38) {
              judgment1 = val[33].judgment1
            } else if (row <= 43) {
              judgment1 = val[39].judgment1
            } else if (row <= 48) {
              judgment1 = val[44].judgment1
            } else if (row === 49) {
              judgment1 = val[49].judgment1
            }
            if (item.grade === 'J') {
              if (judgment1 && judgment1 === '2') {
                this.radiolijudegresult.tableCommun = '4';
                return;
              } else if (judgment1 && judgment1 === '1' && item.judgment2 && item.judgment2 === '2') {
                this.radiolijudegresult.tableCommun = '2';
                return
              }
              this.radiolijudegresult.tableCommun = '0';
            } else if (item.grade === 'X') {
              if (judgment1 && judgment1 === '2') {
                this.radiolijudegresult.tableCommun = '4';
                return;
              } else if (judgment1 && judgment1 === '1' && item.judgment2 && item.judgment2 === '2') {
                this.radiolijudegresult.tableCommun = '3';
                return
              }
              this.radiolijudegresult.tableCommun = '1';
            }
            row = row + 1;
          }
        },
        immediate: true,  //刷新加载 立马触发一次handler
        deep: true  // 可以深度检测到 person 对象的属性值的变化
      },
      tableDelivery: {
        handler(val) {
          let row = 0;
          for (let item of val) {
            let judgment1 = "";
            if (row <= 0) {
              judgment1 = val[0].judgment1
            } else if (row <= 2) {
              judgment1 = val[1].judgment1
            } else if (row <= 3) {
              judgment1 = val[3].judgment1
            } else if (row <= 9) {
              judgment1 = val[4].judgment1
            } else if (row <= 13) {
              judgment1 = val[10].judgment1
            }
            if (item.grade === 'J') {
              if (judgment1 && judgment1 === '2') {
                this.radiolijudegresult.tableDelivery = '4';
                return;
              } else if (judgment1 && judgment1 === '1' && item.judgment2 && item.judgment2 === '2') {
                this.radiolijudegresult.tableDelivery = '2';
                return
              }
              this.radiolijudegresult.tableDelivery = '0';
            } else if (item.grade === 'X') {
              if (judgment1 && judgment1 === '2') {
                this.radiolijudegresult.tableDelivery = '4';
                return;
              } else if (judgment1 && judgment1 === '1' && item.judgment2 && item.judgment2 === '2') {
                this.radiolijudegresult.tableDelivery = '3';
                return
              }
              this.radiolijudegresult.tableDelivery = '1';
            }
            row = row + 1;
          }
        },
        immediate: true,  //刷新加载 立马触发一次handler
        deep: true  // 可以深度检测到 person 对象的属性值的变化
      },
      tableComputers: {
        handler(val) {
          let row = 0;
          for (let item of val) {
            let judgment1 = "";
            if (row <= 15) {
              judgment1 = val[0].judgment1
            } else {
              judgment1 = val[16].judgment1
            }
            if (item.grade === 'J') {
              if (judgment1 && judgment1 === '2') {
                this.radiolijudegresult.tableComputers = '4';
                return;
              } else if (judgment1 && judgment1 === '1' && item.judgment2 && item.judgment2 === '2') {
                this.radiolijudegresult.tableComputers = '2';
                return
              }
              this.radiolijudegresult.tableComputers = '0';
            } else if (item.grade === 'X') {
              if (judgment1 && judgment1 === '2') {
                this.radiolijudegresult.tableComputers = '4';
                return;
              } else if (judgment1 && judgment1 === '1' && item.judgment2 && item.judgment2 === '2') {
                this.radiolijudegresult.tableComputers = '3';
                return
              }
              this.radiolijudegresult.tableComputers = '1';
            }
            row = row + 1;
          }
        },
        immediate: true,  //刷新加载 立马触发一次handler
        deep: true  // 可以深度检测到 person 对象的属性值的变化
      },
      tableJasoftware: {
        handler(val) {
          let row = 0;
          for (let item of val) {
            let judgment1 = "";
            if (row <= 1) {
              judgment1 = val[0].judgment1
            } else {
              judgment1 = val[2].judgment1
            }
            if (item.grade === 'J') {
              if (judgment1 && judgment1 === '2') {
                this.radiolijudegresult.tableJasoftware = '4';
                return;
              } else if (judgment1 && judgment1 === '1' && item.judgment2 && item.judgment2 === '2') {
                this.radiolijudegresult.tableJasoftware = '2';
                return
              }
              this.radiolijudegresult.tableJasoftware = '0';
            } else if (item.grade === 'X') {
              if (judgment1 && judgment1 === '2') {
                this.radiolijudegresult.tableJasoftware = '4';
                return;
              } else if (judgment1 && judgment1 === '1' && item.judgment2 && item.judgment2 === '2') {
                this.radiolijudegresult.tableJasoftware = '3';
                return
              }
              this.radiolijudegresult.tableJasoftware = '1';
            }
            row = row + 1;
          }
        },
        immediate: true,  //刷新加载 立马触发一次handler
        deep: true  // 可以深度检测到 person 对象的属性值的变化
      },
      tableGatetechnology: {
        handler(val) {
          let row = 0;
          for (let item of val) {
            let judgment1 = "";
            if (row <= 2) {
              judgment1 = val[0].judgment1
            } else if (row <= 3) {
              judgment1 = val[3].judgment1
            } else {
              judgment1 = val[4].judgment1
            }
            if (item.grade === 'J') {
              if (judgment1 && judgment1 === '2') {
                this.radiolijudegresult.tableGatetechnology = '4';
                return;
              } else if (judgment1 && judgment1 === '1' && item.judgment2 && item.judgment2 === '2') {
                this.radiolijudegresult.tableGatetechnology = '2';
                return
              }
              this.radiolijudegresult.tableGatetechnology = '0';
            } else if (item.grade === 'X') {
              if (judgment1 && judgment1 === '2') {
                this.radiolijudegresult.tableGatetechnology = '4';
                return;
              } else if (judgment1 && judgment1 === '1' && item.judgment2 && item.judgment2 === '2') {
                this.radiolijudegresult.tableGatetechnology = '3';
                return
              }
              this.radiolijudegresult.tableGatetechnology = '1';
            }
            row = row + 1;
          }
        },
        immediate: true,  //刷新加载 立马触发一次handler
        deep: true  // 可以深度检测到 person 对象的属性值的变化
      },
      radiolijudegresult: {
        handler(val) {
          this.form.lijudegresult = [];
          if (val.tableCommun === '4' || val.tableDelivery === '4' || val.tableComputers === '4' || val.tableJasoftware === '4' || val.tableGatetechnology === '4') {
            this.form.lijudegresult.push('4')
            return;
          }
          if (val.tableCommun === '3' || val.tableDelivery === '3' || val.tableComputers === '3' || val.tableJasoftware === '3' || val.tableGatetechnology === '3') {
            this.form.lijudegresult.push('3')
          } else {
            this.form.lijudegresult.push('1')
          }

          if (val.tableCommun === '2' || val.tableDelivery === '2' || val.tableComputers === '2' || val.tableJasoftware === '2' || val.tableGatetechnology === '2') {
            this.form.lijudegresult.push('2')
          } else {
            this.form.lijudegresult.push('0')
          }
        },
        immediate: true,  //刷新加载 立马触发一次handler
        deep: true  // 可以深度检测到 person 对象的属性值的变化
      }
    }
  };
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

