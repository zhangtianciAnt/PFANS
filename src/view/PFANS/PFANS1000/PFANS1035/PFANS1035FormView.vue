<template>
  <div style="min-height: 100%">
    <EasyNormalContainer
      :buttonList="buttonList"
      :canStart="canStart"
      :enableSave="enableSave"
      v-loading="loading"
      :title="title"
      @buttonClick="buttonClick"
      @end="end"
      @start="start"
      @workflowState="workflowState"
      :workflowCode="workflowCode"
      ref="container"
    >
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="refform"
                 style="padding: 2vw">
          <el-row>
            <div class="sub_color_red">出差申请审批通过后，无需再申请考勤异常</div>
          </el-row>
          <el-tabs @tab-click="handleClick" v-model="activeName" type="border-card">
            <el-tab-pane :label="$t('label.PFANS1002FORMVIEW_INFORMATION')" name="first">
              <div>
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
                           @getOrgids="getGroupId"
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
                    <el-form-item :label="$t('label.PFANS5009VIEW_PROJECTNAME')" prop="companyprojectsname">
                      <el-select :disabled="!disable" clearable style="width: 20vw" v-model="form.companyprojectsname">
                        <el-option
                          :key="item.value"
                          :label="item.lable"
                          :value="item.value"
                          v-for="item in optionsdate">
                        </el-option>
                      </el-select>
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
                    <el-form-item :label="$t('label.PFANS1002VIEW_REGION')" prop="city">
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
                  <!--                  add_fjl_0721 添加地域名称显示 start-->
                  <el-col :span="8" v-if="form.city === 'PJ036005'">
                    <el-form-item :label="$t('label.PFANS1013VIEW_REGIONNAME')" prop="regionname">
                      <el-input :disabled="!disable" maxlength="50" style="width:20vw"
                                v-model="form.regionname"></el-input>
                    </el-form-item>
                  </el-col>
                  <!--                  add_fjl_0721 添加地域名称显示 end-->
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
                <!--                add-ws-7/10-禅道任务247-->
                <el-row v-if="this.form.checkch === '1'">
                  <el-form-item :label="$t('label.PFANS1002VIEW_QXCCLY')" prop="remark">
                    <el-input :disabled="!disable" style="width: 70vw" type="textarea"
                              v-model="form.remark">
                    </el-input>
                  </el-form-item>
                </el-row>
                <!--                add-ws-7/10-禅道任务247-->
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
                    <el-form-item :label="$t('label.PFANS1012FORMVIEW_BUDGET')" prop="budgetunit">
                      <!--                      <el-input :disabled="true" style="width:20vw" v-model="form.budgetunit" maxlength='50'></el-input>-->
                      <el-select clearable style="width: 20vw" v-model="form.budgetunit" :disabled="!disable"
                                 :placeholder="$t('normal.error_09')">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.lable"
                          :value="item.value"
                          @change="changeBut">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1013VIEW_YESYJDA')">
                      <span style="margin-right: 1rem ">{{$t('label.no')}}</span>
                      <el-switch
                        :disabled="!disable"
                        active-value="1"
                        inactive-value="0"
                        v-model="form.arrivenight"
                        inactive-color="#005BAA"
                      >
                      </el-switch>
                      <span style="margin-left: 1rem ">{{$t('label.yes')}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="this.$t('label.PFANS1002VIEW_MONEY')" >
                      <el-input-number
                        :disabled="!disable"
                        :min="0"
                        :precision="2"
                        controls-position="right"
                        style="width:20vw"
                        v-model="form.moneys"></el-input-number>
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
                        inactive-color="#005BAA"
                      >
                      </el-switch>
                      <span style="margin-left: 1vw ">{{$t('label.PFANS1004VIEW_INSIDE')}}</span>
                    </el-form-item>
                  </el-col>
<!--                  <el-col :span="8">-->
<!--                    <el-form-item :label="$t('label.PFANS1004VIEW_BUSINESSPLANTYPE')" prop="plantype" v-if="showPlan">-->
<!--                      <dicselect-->
<!--                        style="width:20vw"-->
<!--                        :disabled="!disable"-->
<!--                        :code="code3"-->
<!--                        :multiple="multiple"-->
<!--                        :data="form.plantype"-->
<!--                        @change="getplantype"-->
<!--                      >-->
<!--                      </dicselect>-->
<!--                    </el-form-item>-->
<!--                  </el-col>-->
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1002VIEW_CLASSIFICATIONTYPE')" prop="classificationtype"
                                  v-if="showPlan">
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
                    <el-form-item :label="$t('label.PFANS3003FORMVIEW_BALANCE')" v-if="showPlan">
                      <el-input-number
                        v-loading="baloading"
                        :disabled="true"
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
                    <el-form-item :label="$t('label.PFANS1002VIEW_LOANMONEY2')">
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
                  <el-col :span="8">
                    <template>
                      <el-form-item :label="$t('label.PFANS1012VIEW_TEMPORARYLOAN')" prop="loanapno">
                        <el-input :disabled="true" maxlength="20" style="width: 20vw"
                                  v-model="form.loanapno"></el-input>
                        <el-button @click="clickBun" size="small" :disabled="clickBunable" type="primary">{{$t('button.view')}}</el-button>
                      </el-form-item>
                    </template>
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
                  <el-col>
                    <el-form-item :label="$t('label.PFANS1002VIEW_PASSENGERS2')" prop="passengers">
                        <div class="sub_color_red">{{$t('label.PFANS1002VIEW_PCREMARKS')}}</div>
                      <span style="margin-right: 1vw ">{{$t('label.PFANSUSERFORMVIEW_NO')}}</span>
                      <el-switch
                        :disabled="!disable"
                        v-model="form.passengers"
                        active-value="1"
                        inactive-value="0"
                        @change="getpassengers1"
                        inactive-color="#005BAA"
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
                        inactive-color="#005BAA"
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
            <el-tab-pane :label="$t('label.PFANS3005FORMVIEW_LOANAPP_ACTU')" name="sixth ">
              <el-row>
                <el-table :data="tableA" border
                          header-cell-class-name="sub_bg_color_blue"
                          stripe style="width: 952px">
                  <el-table-column :label="$t('label.PFANS1013FORMVIEW_LOAN')" align="center"
                                   prop="loanapno" width="200px">
                    <template slot-scope="scope">
                      <span>{{scope.row.loanapno}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1013VIEW_LOANAMOUNT')" align="center" prop="moneys"
                                   width="150px">
                    <template slot-scope="scope">
                      <span>{{scope.row.moneys}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.remarks')" align="center" prop="remarks"
                                   width="300px">
                    <template slot-scope="scope">
                      <span>{{scope.row.remarks}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS5005VIEW_STATUS')" align="center" prop="status"
                                   width="150px">
                    <template slot-scope="scope">
                      <span>{{scope.row.status}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.operation')" align="center" width="150">
                    <template slot-scope="scope">
                      <el-button
                        @click.native.prevent="rowClick(scope.row)"
                        plain
                        size="small"
                        type="primary"
                        :disabled="disableview === true ? true : false"
                      >{{$t('button.viewdetails')}}
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>
              <div></div>
              <el-row>
                <el-table :data="tableB" border
                          header-cell-class-name="sub_bg_color_blue"
                          stripe style="width: 952px;margin-top: 40px">
                  <el-table-column :label="$t('label.PFANS1013VIEW_REIMNUMBER')" align="center"
                                   prop="invoiceno" width="200px">
                    <template slot-scope="scope">
                      <span>{{scope.row.invoiceno}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS3005VIEW_ACTUARIALAMOUNT')" align="center" prop="moneys"
                                   width="150px">
                    <template slot-scope="scope">
                      <span>{{scope.row.moneys}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.remarks')" align="center" prop="remarks"
                                   width="300px">
                    <template slot-scope="scope">
                      <span>{{scope.row.remarks}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS5005VIEW_STATUS')" align="center" prop="status"
                                   width="150px">
                    <template slot-scope="scope">
                      <span>{{scope.row.status}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.operation')" align="center" width="150">
                    <template slot-scope="scope">
                      <el-button
                        @click.native.prevent="rowClick1(scope.row)"
                        plain
                        size="small"
                        type="primary"
                        :disabled="disableview === true ? true : false"
                      >{{$t('button.viewdetails')}}
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>

            </el-tab-pane>
          </el-tabs>
        </el-form>
      </div>
    </EasyNormalContainer>
    <!--    <PFANS1012Pop :params="urlparams" :url="url" ref="PFANS1012Pop"></PFANS1012Pop>-->
    <!--    <PFANS1006Pop :params="urlparams" :url="url" ref="PFANS1006Pop"></PFANS1006Pop>-->
  </div>
</template>

<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import user from '../../../components/user.vue';
  import {Message} from 'element-ui';
  import moment from 'moment';
  import {
      getDictionaryInfo,
      getOrgInfo,
      getOrgInfoByUserId,
      getUserInfoName,
      getCurrentRole,
      getStatus,
      accAdd
  } from '@/utils/customize';
  import dicselect from '../../../components/dicselect';
  import org from '../../../components/org';
  import project from '../../../components/project.vue';
  import PFANS1012Pop from '@/components/EasyPop/PFANS1012Pop';
  import PFANS1006Pop from '@/components/EasyPop/PFANS1006Pop';

  export default {
    name: 'PFANS1035FormView',
    components: {
      dicselect,
      EasyNormalContainer,
      user,
      project,
        org,
        // PFANS1012Pop,
        // PFANS1006Pop,
    },
    watch: {
      form: {
        handler(newValue, oldValue) {
          if(this.form.moneys == ''){
            this.form.moneys = parseFloat(this.form.datenumber * 600 + 3600).toFixed(2)
          }
        },
        deep: true,
      },
    },
    data() {
      var validateUserid = (rule, value, callback) => {
        if (!this.form.user_id || this.form.user_id === '' || this.form.user_id === 'undefined') {
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
      //add_fjl_0724 添加项目名称必填项  start
      var validateprojectname = (rule, value, callback) => {
        if (!value || value === '' || value === 'undefined') {
          callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS5009VIEW_PROJECTNAME')));
        } else {
          callback();
        }
      };
      //add_fjl_0724 添加项目名称必填项  end
      return {
          // update gbb 20210316 NT_PFANS_20210227_BUG_033 pop画面传值类型修改 start
          //urlparams: '',
          urlparams: {},
          // update gbb 20210316 NT_PFANS_20210227_BUG_033 pop画面传值类型修改 end
          url: '',
          tableA: [],
          tableB: [],
        enableSave: false,
        optionsdate: [{value: 'PP024001', lable: this.$t('label.PFANS5008FORMVIEW_PROJECTGTXM')}],
        options: [],
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
        disableview: false,
        workflowCode: '',
        disabled: false,
        code1: 'PJ018',
        code2: 'PG002',
        code3: 'PR002',
        code4: 'PJ078',
        code5: 'PJ019',
        code6: 'PJ035',
        code7: 'PJ036',
        multiple: false,
        baloading: false,
        search: '',
        initalMoney: '0',
        gridData: [],
        //add-ws-7/7-禅道247
        checktype: '',
        checkdisabled: false,
        //add-ws-7/7-禅道247

        clickBunable:true,

        form: {
          //add-ws-7/7-禅道247
          remark: '',
          checkch: '',
          //add-ws-7/7-禅道247
          arrivenight: '',
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
          // plantype: '',
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
          publicexpense_id: '',
          loanapno:'',
          loanapplication_id:'',
          moneys:'',
          rulingid: '',
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
          //add-ws-7/7-禅道247
          remark: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1002VIEW_QXCCLY'),
            trigger: 'change',
          }],
          //add-ws-7/7-禅道247
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
              message: this.$t('normal.error_09') + this.$t('label.PFANS1002VIEW_CITY2'),
              trigger: 'change',
            },
          ],
          regionname: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1013VIEW_REGIONNAME'),
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
          classificationtype: [
            {
              required: false,
              message: this.$t('normal.error_09') + this.$t('label.PFANS1002VIEW_CLASSIFICATIONTYPE'),
              trigger: 'change',
            },
          ],
          // balance: [
          //   {
          //     required: false,
          //     message: this.$t('normal.error_08') + this.$t('label.PFANS1002VIEW_BALANCE'),
          //     trigger: 'blur',
          //   },
          // ],
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
          //add_fjl_项目名称
          companyprojectsname: [
            {
              required: true,
              validator: validateprojectname,
              trigger: 'change',
            },
          ],
          //NT_PFANS_20210304_BUG_079 预算编码变更为必填项，ztc start
            budgetunit: [
                {
                    required: true,
                    message: this.$t('normal.error_09') + this.$t('label.PFANS1012FORMVIEW_BUDGET'),
                    trigger: 'change',
                },
            ],
          //NT_PFANS_20210304_BUG_079 预算编码变更为必填项，ztc end
        },
        show: false,
        showPlan: false,
        // show3: false,
        show4: false,
        show5: false,
        canStart: false,
          checkGro: false,
      };
    },
    mounted() {
      this.getCompanyProjectList();
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
            this.initalMoney = this.form.moneys;
              //add_fjl_0806  添加总经理审批流程
            //update ztc 2021新年度流程调整 start
            let role = getCurrentRole();
            if (role == '1') {//总经理
              this.workflowCode = 'W0096';
            }
            // else if(role == '2' || role == '3') { //GM Center
            //   this.workflowCode = 'W0112'//新流程
            // }
            else { //TL 正式员工
              if(this.form.plan === '0'){
                //1022 事业计划外增加新流程
                this.workflowCode = 'W0004'
              }else{
                this.workflowCode = 'W0049'
              }
            }
            //update ztc 2021新年度流程调整 end
              //add_fjl_0806  添加总经理审批流程
            if (this.form.checkch != '1') {
              if (this.$route.params._type === 3) {
                this.form.checkch = '1';
              } else {
                this.form.checkch = '0';
              }
            }
            // let rst = getOrgInfoByUserId(response.business.user_id);
            // if (rst) {
            //     //upd_fjl_0806
            //     if (rst.groupId !== null && rst.groupId !== '' && rst.groupId !== undefined) {
            //         this.checkGro = true;
            //     } else {
            //         this.checkGro = false;
            //     }
            //     // this.centerid = rst.centerNmae;
            //     // this.groupid = rst.groupNmae;
            //     // this.teamid = rst.teamNmae;
            //     //upd_fjl_0806
            // }
            if (response.travelcontent.length > 0) {
              this.tablePD = [];
              for (let i = 0; i < response.travelcontent.length; i++) {
                let date = [];
                let letdate = response.travelcontent[i].duringdate.split(' ~ ');
                if (letdate.length > 0) {
                  date.push(letdate[0]);
                  date.push(letdate[1]);
                }
                this.tablePD.push({
                  travelcontent_id: response.travelcontent[i].travelcontent_id,
                  businessid: response.travelcontent[i].businessid,
                  duringdate: date,
                  place: response.travelcontent[i].place,
                  content: response.travelcontent[i].content,
                });
              }
            }
            this.userlist = this.form.user_id;
            this.getBudt(this.form.center_id);
            this.baseInfo.business = JSON.parse(JSON.stringify(this.form));
            if (this.form.objectivetype === 'PJ018005') {
              this.show = true;
            } else {
              this.show = false;
            }
            if (this.form.plan === '1') {
              this.showPlan = true;
              this.rules.classificationtype[0].required = true;
              // this.rules.balance[0].required = true;
            } else {
              this.showPlan = false;
              this.rules.classificationtype[0].required = false;
              // this.rules.balance[0].required = false;
              // this.show3 = false;
            }
            // if (this.form.plantype === 'PR002006') {
            //   this.show3 = true;
            // } else {
            //   this.show3 = false;
            // }
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
            if (this.form.status === '2' || this.form.status === '4') {
              this.disable = false;
              this.listAll();
            }
            //add ccm 0805
            if (this.form.loanapno !=null && this.form.loanapno !='' && this.form.loanapno!=undefined)
            {
              if (!this.$route.params.disabled && this.$route.params._id!='' && this.$route.params._id!=null)
              {
                this.clickBunable = false;
              }
            }
            //add ccm 0805
              //add_fjl_0806
              //有暂借款编号绑定暂借款信息
              if (this.form.loanapplication_id) {
                  this.$store
                      .dispatch('PFANS1006Store/getLoanapplicationOne2', {'loanapplication_id': this.form.loanapplication_id})
                      .then(response => {
                          if (response !== null && response !== '' && response !== undefined) {
                            for (var i = 0; i < response.length; i++)
                            {
                              let status = getStatus(response[i].status);
                              this.tableA.push({
                                loanapno: response[i].loanapno,
                                moneys: response[i].moneys,
                                remarks: response[i].remarks,
                                status: status,
                                loanapplication_id: response[i].loanapplication_id,
                              });
                            }
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
              }

              //有精算报销编号绑定精算信息
              if (this.form.publicexpense_id) {
                  this.$store
                      .dispatch('PFANS1013Store/selectByIdone2', {'publicexpense_id': this.form.publicexpense_id})
                      .then(response => {
                          if (response !== null && response !== '' && response !== undefined) {
                            for (var i = 0; i < response.length; i++)
                            {
                              let status = getStatus(response[i].status);
                              this.tableB.push({
                                invoiceno: response[i].invoiceno,
                                moneys: response[i].totalpay,
                                remarks: response[i].remark,
                                status: status,
                                evectionid: response[i].evectionid,
                              });
                            }
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

              }
              //add_fjl_0806
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
        this.userlist = this.$store.getters.userinfo.userid;
        if (this.userlist !== null && this.userlist !== ''&& this.userlist !== undefined) {
          let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
          //NT_PFANS_20210304_BUG_079 预算编码变更为必填项，ztc start
          // if(getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId)){
          //     this.form.budgetunit = getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId).encoding;
          // }
          //NT_PFANS_20210304_BUG_079 预算编码变更为必填项，ztc end
          if (rst) {
            this.centerid = rst.centerNmae;
            this.groupid = rst.groupNmae;
            this.teamid = rst.teamNmae;
            this.form.center_id = rst.centerId;
            this.form.group_id = rst.groupId;
            this.form.team_id = rst.teamId;
            this.getBudt(this.form.center_id);
              // if (rst.groupId !== null && rst.groupId !== ''&& rst.groupId !== undefined){
              //     this.form.group_id = rst.groupId;
              //     this.getBudt(this.form.group_id);
              //     this.checkGro = true;
              // } else {
              //     this.checkGro = false;
              // }
              //add_fjl_0806
          }
          this.form.user_id = this.$store.getters.userinfo.userid;
        }
      }
    },
    created() {
        // this.$store.commit('global/SET_WORKFLOWURL', '/PFANS1035FormView');
        this.disableview = this.$route.params._disableview;
      let userid = '';
      if (this.$route.params.userid) {
        if (getUserInfoName(this.$route.params.userid) !== '-1') {
          userid = getUserInfoName(this.$route.params.userid).userid;
        }
      }
      //add-ws-7/7-禅道247
      this.checktype = this.$route.params._type;
      //add-ws-7/7-禅道247
      this.disable = this.$route.params.disabled;
      if (!this.$route.params.disabled) {
        this.buttonList = [];
      }
      //add-ws-7/7-禅道153
      if (this.$route.params.statuss === this.$t('label.PFANS5004VIEW_OVERTIME')) {
        if (this.$route.params._type === 3) {
          this.form.checkch = '1';
          this.buttonList = [
            {
              key: 'ycss',
              name: 'button.ycss',
              disabled: false,
              icon: 'el-icon-check',
            },
          ];
          this.enableSave = true;
        } else {
          this.form.checkch = '0';
          if (userid === this.$store.getters.userinfo.userid) {
            this.buttonList = [
              {
                key: 'save',
                name: 'button.save',
                disabled: true,
                icon: 'el-icon-check',
              },
              {
                key: 'plantic',
                name: 'button.plantic',
                disabled: false,
              },
            ];
          }else{
            this.buttonList = [
              {
                key: 'save',
                name: 'button.save',
                disabled: true,
                icon: 'el-icon-check',
              },
              {
                key: 'plantic',
                name: 'button.plantic',
                disabled: true,
              },
            ];
          }
          this.enableSave = true;
        }
      } else if (this.$route.params.statuss === this.$t('label.node_step2')) {
        this.buttonList = [
          {
            key: 'save',
            name: 'button.save',
            disabled: false,
            icon: 'el-icon-check',
          },
        ];
        this.enableSave = true;
      } else {
        this.buttonList = [
          {
            key: 'save',
            name: 'button.save',
            disabled: false,
            icon: 'el-icon-check',
          },
        ];
      }
      //add-ws-7/7-禅道153
      // if (this.$route.params.disabled === "") {
      //   this.noback = true
      //   this.buttonList = []
      // }
    },
    methods: {
        //add_fjl_0806  查看详情
        rowClick(row) {
            this.$store.commit('global/SET_HISTORYURL', '');
            this.$store.commit('global/SET_WORKFLOWURL', '/FFFF1006FormView');
            this.$router.push({
                name: 'PFANS1006FormView',
                params: {
                    _id: row.loanapplication_id,
                    disabled: false,
                    _checkid: this.$route.params._id,
                    _check: true,
                    _fromname: 'PFANS1035FormView',
                },
            });
            // this.url = '';
            // this.urlparams = '';
            // this.url = 'PFANS1006FormView';
            // this.urlparams = {'_id': row.loanapplication_id, 'disabled': false};
            // this.$refs.PFANS1006Pop.open = true;
        },
        rowClick1(row) {
            this.$store.commit('global/SET_HISTORYURL', '');
            this.$store.commit('global/SET_WORKFLOWURL', '/FFFF1013FormView');
            this.$router.push({
                name: 'PFANS1013FormView',
                params: {
                    _id: row.evectionid,
                    disabled: false,
                    _checkid: this.$route.params._id,
                    _check2: true,
                    _fromname: 'PFANS1035FormView',
                },
            });
            // this.url = '';
            // this.urlparams = '';
            // this.url = 'PFANS1012FormView';
            // this.urlparams = {'_id': row.publicexpense_id, 'disabled': false};
            // this.$refs.PFANS1012Pop.open = true;
        },
        //add_fjl_0806  查看详情
        //add_fjl_0806
      // update center取预算单位横展 start 0404
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
        getCenterid(val) {
          this.form.center_id = val;
          this.form.budgetunit = '';
          this.getBudt(val);
          if(val === ""){
            this.form.group_id = "";
          }
        },
        getGroupId(val) {
          this.form.group_id = val;
          this.form.budgetunit = '';
          if(val != ""){
            this.getOrgInformation(val);
            this.getBudt(val);
          }else{
            this.getBudt(this.form.center_id);
          }
        },
      // update center取预算单位横展 end 0404
        getTeamid(val) {
            this.form.team_id = val;
        },
        //add_fjl_0806
      //add ccm 0805
      clickBun()
      {
        this.$store.commit('global/SET_HISTORYURL', '');
        this.$store.commit('global/SET_WORKFLOWURL', '/FFFFF1035FormView');
        this.$router.push({
          name: 'PFANS1006FormView',
          params: {
            _checkdisable: this.disable,
            _checkid: this.$route.params._id,
            _check: true,
            _id: this.form.loanapplication_id,
            _sta:'1',
            disabled: false,
          },
        });
      },
      //add ccm 0805

      //add-ws-4/24-项目名称所取数据源变更
      //upd-ws-6/5-禅道075任务，项目名称问题修正
      getCompanyProjectList() {
        if (this.disable) {
          this.ceralist();
        } else {
          this.listAll();
        }
      },
      //upd-ws-6/5-禅道075任务，项目名称问题修正
      //add_fjl_07/29_修改项目查看  start
      ceralist() {
        this.loading = true;
        this.$store
          .dispatch('PFANS5009Store/getSiteList5', {})
          .then(response => {
            for (let i = 0; i < response.length; i++) {
              this.optionsdate.push({
                value: response[i].companyprojects_id,
                lable: response[i].numbers + '_' + response[i].project_name,
              });
            }
            this.$store
              .dispatch('PFANS5013Store/getMyConProject', {})
              .then(response => {
                for (let i = 0; i < response.length; i++) {
                  this.optionsdate.push({
                    value: response[i].comproject_id,
                    lable: response[i].numbers + '_' + response[i].project_name,
                  });
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
      listAll() {
        this.loading = true;
        this.$store
          .dispatch('PFANS5013Store/Listproject2', {})
          .then(response => {
            for (let i = 0; i < response.length; i++) {
              this.optionsdate.push({
                value: response[i].companyprojects_id,
                lable: response[i].numbers + '_' + response[i].project_name,
              });
            }
            this.$store
              .dispatch('PFANS5013Store/Listproject', {})
              .then(response => {
                for (let i = 0; i < response.length; i++) {
                  this.optionsdate.push({
                    value: response[i].comproject_id,
                    lable: response[i].numbers + '_' + response[i].project_name,
                  });
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
      //add_fjl_07/29_修改项目查看  end
      //add-ws-4/24-项目名称所取数据源变更
      getBudt(val) {
        this.options = [];
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
                          this.options.push({
                              lable: dic[i].value2 + '_' + dic[i].value3,
                              value: dic[i].code,
                          });
                      }
                  }
              }
            if(this.options.length === 0) {
              if (getOrgInfo(this.form.group_id)) {
                let butinfo = (getOrgInfo(this.form.group_id).encoding).substring(0, 3);
                let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'JY002');
                if (dic.length > 0) {
                  for (let i = 0; i < dic.length; i++) {
                    if (butinfo === (dic[i].value1).substring(0,3)) {
                      this.options.push({
                        lable: dic[i].value2 + '_' + dic[i].value3,
                        value: dic[i].code,
                      });
                    }
                  }
                }
              }
            }
          }
        //ADD_FJL  修改人员预算编码
      },
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
          !this.form.companyprojectsname ||
          !this.form.regionname ||
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
              !this.form.classificationtype)
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
        //NT_PFANS_20210304_BUG_079 预算编码变更为必填项，ztc start
        // if(getOrgInfo(getOrgInfoByUserId(val).groupId)){
        //     this.form.budgetunit = getOrgInfo(getOrgInfoByUserId(val).groupId).encoding;
        // }
        //NT_PFANS_20210304_BUG_079 预算编码变更为必填项，ztc end
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
        if(this.form.city == 'PJ036005'){
          this.rules.regionname[0].required = true;
        }else{
          this.rules.regionname[0].required = false;
          this.form.regionname = '';
        }
      },
      getplan1(val) {
        this.form.plan = val;
        this.form.classificationtype = null;
        this.form.rulingid = null;
        this.form.balance = '0.00';
        if (val === '1') {
          this.showPlan = true;
          this.rules.classificationtype[0].required = true;
        } else {
          this.showPlan = false;
          this.rules.classificationtype[0].required = false;
        }
      },
      changeBut(val) {
        this.form.budgetunit = val;
      },
      // getplantype(val) {
      //   this.form.plantype = val;
      //   if (val === 'PR002006') {
      //     this.show3 = true;
      //   } else {
      //     this.show3 = false;
      //     this.form.classificationtype = null;
      //     this.form.balance = null;
      //   }
      // },
      //添加事业计划余额功能 1026 ztc fr
      checkBusPlan1(val){
        return new Promise((resolve, reject) => {
          this.baloading = true;
          let getOrgId = '';
          let orgId = getOrgInfo(this.form.center_id)
          if(orgId.encoding){
            getOrgId = this.form.center_id
          }else{
            getOrgId = this.form.group_id
          }
          let params = {
            yearInfo: (parseInt(moment(new Date()).format('MM')) >= 4 || parseInt(moment(new Date()).format('DD')) >= 10) ? moment(new Date()).format('YYYY') : parseInt(moment(new Date()).format('YYYY')) - 1 + '',
            getOrgIdInfo: getOrgId,
            classInfo: val,
          };
          if(val != '' && val != null){
            this.$store
              .dispatch('PFANS1036Store/getBusBalns',params)
              .then(response => {
                this.form.rulingid = response.data.rulingid
                resolve(response.data.surplsu)
                this.baloading = false;
              });
          }else{
            this.form.rulingid = '';
            resolve('0.00')
            this.baloading = false;
          }
        });
      },
      checkMess(busVal){
        return new Promise((resolve, reject) => {
          alert(this.form.moneys)
          alert(busVal)
          alert(this.initalMoney)
          if(Number(this.form.moneys) > accAdd(Number(busVal),Number(this.initalMoney))){
            Message({
              message: this.$t('label.PFANS1036FORMVIEW_SSJHN'),
              type: 'info',
              duration: 5 * 1000,
            });
            resolve('0')
          }else{
            resolve('1')
          }
        });
      },
      getplanBus(planVal) {
        return new Promise((resolve, reject) => {
          if (planVal === '1') {
            this.showPlan = true;
            this.rules.classificationtype[0].required = true;
          } else {
            this.form.classificationtype = null;
            this.form.rulingid = null;
            this.form.balance = '0.00';
            this.showPlan = false;
            this.rules.classificationtype[0].required = false;
          }
          resolve(true)
        });
      },
      saveInfo(){
        if (this.$route.params._id) {
          this.updateInfo();
        }else{
          this.insertInfo();
        }
      },
      checkMoney(){
        this.checkBusPlan1(this.form.classificationtype).then(val =>{
          this.form.balance = val;
          this.checkMess(val).then(busVal =>{
            this.form.plan = busVal
            this.getplanBus(busVal).then(planVal =>{
              this.saveInfo();
            })
          })
        })
      },
      getclassificationtype(val) {
        this.form.classificationtype = val;
        this.checkBusPlan(val);
      },
      checkBusPlan(val){
        this.baloading = true;
        let getOrgId = '';
        let orgId = getOrgInfo(this.form.center_id)
        if(orgId.encoding){
          getOrgId = this.form.center_id
        }else{
          getOrgId = this.form.group_id
        }
        let params = {
          yearInfo: (parseInt(moment(new Date()).format('MM')) >= 4 || parseInt(moment(new Date()).format('DD')) >= 10) ? moment(new Date()).format('YYYY') : parseInt(moment(new Date()).format('YYYY')) - 1 + '',
          getOrgIdInfo: getOrgId,
          classInfo: val,
        };
        if(val != '' && val != null){
          this.$store
            .dispatch('PFANS1036Store/getBusBalns',params)
            .then(response => {
              this.form.rulingid = response.data.rulingid
              this.form.balance = response.data.surplsu;
              this.baloading = false;
            });
        }else{
          this.form.balance = '0.00';
          this.baloading = false;
        }
      },
      updateInfo(){
        this.baseInfo.business = JSON.parse(JSON.stringify(this.form));
        this.baseInfo.business.businessid = this.$route.params._id;
        this.$store
          .dispatch('PFANS1035Store/updateBusiness', this.baseInfo)
          .then(response => {
            this.data = response;
            this.loading = false;
            this.paramsTitle();
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
      insertInfo(){
        this.baseInfo.business = JSON.parse(JSON.stringify(this.form));
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
            this.$message.error({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
            this.loading = false;
          });
      },
      //添加事业计划余额功能 1026 ztc to
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
      //add-ws-5-20-流程恒展开
      start(val) {
        if (val.state === '0') {
          this.form.status = '2';
        } else if (val.state === '2') {
          this.form.status = '4';
        }
        this.buttonClick('update');
      },
      //add-ws-5-20-流程恒展开
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
      //       this.$message.error({
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
            this.$message.error({
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
            this.tablePD[1].place = getDictionaryInfo(this.form.city).value1;
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
      checkparamsTitle() {
        let id = this.$route.params._checkid;
        let disable = this.$route.params._checkdisable;
        this.$router.push({
          name: 'PFANS1006FormView',
          params: {
            disabled: disable,
            _id: id,
          },
        });
      },
      buttonClick(val) {
        if (val === 'back') {
          if (this.$route.params._check8 != null && this.$route.params._check8 != '' && this.$route.params._check8 != undefined) {
            if (this.$route.params._check8) {
              this.checkparamsTitle();
            }
          } else {
            this.paramsTitle();
          }
          //add-ws-7/7-禅道153
        } else if (val === 'plantic') {
          this.$store.commit('global/SET_WORKFLOWURL', '/FFFFF1012FormView');
          this.$store
            .dispatch('PFANS1035Store/selectById2', {'business_id': this.$route.params._id})
            .then(response => {
              if (response.length > 0) {
                this.$router.push({
                  name: 'PFANS3001FormView',
                  params: {
                    _checkid: this.$route.params._id,
                    disabled: false,
                    _type: 0,
                    _checktype: 1,
                  },
                });
              } else {
                this.$router.push({
                  name: 'PFANS3001FormView',
                  params: {
                    _checkid: this.$route.params._id,
                    disabled: true,
                    _type: 1,
                    _checktype: 1,
                  },
                });
              }
            });
          //add-ws-7/10-禅道247
        } else if (val === 'ycss') {
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
          this.loading = true;
          this.$store
            .dispatch('PFANS1002Store/list', this.baseInfo)
            .then(response => {
              Message({
                message: this.$t('label.PFANS1002VIEW_ERRORCHECK7'),
                type: 'success',
                duration: 5 * 1000,
              });
              this.paramsTitle();
              this.loading = false;
            }).catch(error => {
            this.$message.error({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
            this.loading = false;
          });

        }
        //add-ws-7/10-禅道247
        //add-ws-7/7-禅道153
        else {
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
              if (this.form.companyprojectsname != 'PP024001')
              {
                this.form.plan = '0';
                this.form.classificationtype = null;
                this.form.rulingid = null;
                this.form.balance = '0.00';
                this.showPlan = false;
                this.rules.classificationtype[0].required = false;
                Message({
                  message: this.$t('normal.error_29'),
                  type: 'info',
                  duration: 5 * 1000,
                });
              }
              if(this.form.plan === '1'){
                this.checkMoney();
              } else{
                this.saveInfo();
              }
            } else {
              Message({
                message: this.$t('normal.error_12'),
                type: 'error',
                duration: 5 * 1000,
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






