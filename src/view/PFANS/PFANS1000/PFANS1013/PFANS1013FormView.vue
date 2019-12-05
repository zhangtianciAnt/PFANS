<template>
  <div style="min-height: 100%">
    <EasyNormalContainer
      :buttonList="buttonList"
      :canStart="canStart"
      v-loading="loading"
      :title="title"
      @buttonClick="buttonClick"
      @end="end"
      @start="start"
      @workflowState="workflowState"
      ref="container"
    >
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="left" label-width="8rem" ref="refform"
                 style="padding: 1rem">
          <el-row :gutter="32" style="padding-top: 2%;padding-bottom: 2%">
            <el-col :span="8">
              <el-radio
                :disabled="!disable"
                v-model="form.type"
                label="1"
                @change="gettype"
              >{{$t('label.PFANS1013FORMVIEW_DOMESTIC')}}
              </el-radio>
              <el-radio
                :disabled="!disable"
                v-model="form.type"
                label="2"
                @change="gettype"
              >{{$t('label.PFANS1013FORMVIEW_ABROAD')}}
              </el-radio>
            </el-col>
          </el-row>
          <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('label.PFANS1013VIEW_TOTAL')" name="first">
              <div>
                <el-row :gutter="32" style="padding-top: 1%">
                  <el-col :span="8">
                    <el-form-item :label="$t('label.center')">
                      <el-input :disabled="true" style="width: 11rem" v-model="form.centerid"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.group')">
                      <el-input :disabled="true" style="width: 11rem" v-model="form.groupid"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.team')">
                      <el-input :disabled="true" style="width: 11rem" v-model="form.teamid"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="32">
                  <el-col :span="8">
                    <el-form-item :error="error" :label="$t('label.applicant')" prop="userid">
                      <user :disabled="!disable" :error="error" :selectType="selectType" :userlist="userlist"
                            @getUserids="getUserids" style="width: 10.2rem"></user>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1013VIEW_TELEPHONE')" prop="telephone">
                      <el-input :disabled="!disable" maxlength="11" style="width: 11rem"
                                v-model="form.telephone"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="32">
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1013VIEW_RELATION')" prop="relation">
                      <el-select :disabled="!disable" v-model="form.business_id"  @change="change" style="width: 11rem">
                        <el-option
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                          v-for="item in relations">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1013VIEW_PLACE')" prop="place">
                      <el-input :disabled="true" style="width: 11rem" v-model="form.place"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="32">
                  <el-col :span="8">
                    <template>
                      <el-form-item :label="$t('label.PFANS1013VIEW_STARTDATE')" prop="startdate">
                        <el-date-picker
                          :disabled="true"
                          style="width: 11rem"
                          type="date"
                          v-model="form.startdate">
                        </el-date-picker>
                      </el-form-item>
                    </template>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1013VIEW_ENDDATE')" prop="enddate">
                      <el-date-picker
                        :disabled="true"
                        style="width: 11rem"
                        type="date"
                        v-model="form.enddate">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1013VIEW_DATENUMBER')" prop="datenumber">
                      <el-input :disabled="true" style="width: 11rem" v-model="form.datenumber"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="32">
                  <el-col :span="8">
                    <el-form-item :label="$t('label.budgetunit')" prop="budgetunit">
                      <dicselect
                        :code="code1"
                        :data="form.budgetunit"
                        :disabled="!disable"
                        :multiple="multiple"
                        @change="getbudgetunit"
                        style="width: 11rem"
                      >
                      </dicselect>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1013FORMVIEW_LOAN')" prop="loan">
                      <el-select :disabled="!disable" style="width: 11rem" v-model="form.loan" @change="change2">
                        <el-option
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                          v-for="item in loans">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1013VIEW_LOANAMOUNT')" prop="loanamount">
                      <el-input-number
                        :disabled="true"
                        :min="0"
                        :max="9999999999"
                        :precision="2"
                        controls-position="right"
                        v-model="form.loanamount"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="32">
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1013VIEW_TOTALCURRENCY')" v-show="show2">
                      <el-input-number
                        :disabled="true"
                        :min="0"
                        :max="9999999999"
                        :precision="2"
                        v-model="form.totalcurrency"
                        @change="getforeign"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1013VIEW_CURRENCY')" prop="currency" v-show="show2">
                      <dicselect :code="code3"
                                 :data="form.currency"
                                 :disabled="!disable"
                                 :multiple="multiple"
                                 @change="getCurrency"
                                 style="width: 11rem">
                      </dicselect>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1013VIEW_JPY')" prop="jpy" v-show="show3">
                      <el-input :disabled="true" style="width: 11rem" v-model="form.jpyfxrate"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1013VIEW_USD')" prop="usd" v-show="show4">
                      <el-input :disabled="true" style="width: 11rem" v-model="form.dollarfxrate"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1013VIEW_RATE')" prop="rate" v-show="show5">
                      <el-input-number
                        :disabled="!disable"
                        :min="0"
                        :max="999999"
                        :precision="2"
                        controls-position="right"
                        :step="0.01"
                        v-model="form.otherfxrate"
                      ></el-input-number>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1013VIEW_TOTALPAY')">
                    <el-input-number
                      :disabled="true"
                      :min="0"
                      :max="9999999999"
                      :precision="2"
                      :step="0.01"
                      controls-position="right"
                      @change="gettotal"
                      v-model="form.totalpay"
                    ></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1013VIEW_BALANCE')" prop="balance">
                    <el-input-number
                      :disabled="true"
                      :max="9999999999"
                      :precision="2"
                      controls-position="right"
                      v-model="form.balance"
                    ></el-input-number>
                  </el-form-item>
                </el-col>
              </div>
              <div>
                <el-table :data="tableData"
                          :summary-method="getDsummaries"
                          show-summary
                          header-cell-class-name="sub_bg_color_grey height"
                          v-if="showdata" >
                  <el-table-column :label="$t('label.PFANS1013FORMVIEW_COSTITEM')" align="center" width="350">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable" style="width: 100%" v-model="scope.row.costitem">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1013FORMVIEW_RMB')" align="center"width="200" prop="rmb">
                    <template slot-scope="scope">
                      <el-input-number
                        :disabled="true"
                        :precision="2"
                        controls-position="right"
                        style="width: 100%"
                        @change="getValue"
                        v-model="scope.row.rmb">
                      </el-input-number>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <el-table :data="tableData2"
                        show-summary
                        :summary-method="getsummaries"
                        header-cell-class-name="sub_bg_color_grey height"
                        v-if="showdata2" >
                <el-table-column :label="$t('label.PFANS1013FORMVIEW_COSTITEM')" align="center" width="300">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" style="width: 100%" v-model="scope.row.costitem">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1013VIEW_RATECURRENCY')" align="center"width="150" prop="ratecurrency">
                  <template slot-scope="scope">
                    <el-input-number
                      :no="scope.row"
                      :disabled="true"
                      :precision="2"
                      controls-position="right"
                      style="width: 100%"
                      @change="getValue2"
                      v-model="scope.row.ratecurrency">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1013VIEW_USDCURRENCY')" align="center"width="150" prop="usdcurrency">
                  <template slot-scope="scope">
                    <el-input-number
                      :no="scope.row"
                      :disabled="true"
                      :precision="2"
                      controls-position="right"
                      style="width: 100%"
                      @change="getValue2"
                      v-model="scope.row.usdcurrency">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1013VIEW_JPYCURRENCY')" align="center"width="150" prop="jpycurrency">
                  <template slot-scope="scope">
                    <el-input-number
                      :no="scope.row"
                      :disabled="true"
                      :precision="2"
                      controls-position="right"
                      style="width: 100%"
                      @change="getValue2"
                      v-model="scope.row.jpycurrency">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1013FORMVIEW_RMB')" align="center"width="150" prop="rmb">
                  <template slot-scope="scope">
                    <el-input-number
                      :no="scope.row"
                      :disabled="true"
                      :precision="2"
                      controls-position="right"
                      style="width: 100%"
                      @change="getValue2"
                      v-model="scope.row.rmb">
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1013FORMVIEW_TOTAL')" align="center"width="150" prop="total">
                  <template slot-scope="scope">
                    <el-input-number
                      :no="scope.row"
                      :disabled="true"
                      :precision="2"
                      controls-position="right"
                      style="width: 100%"
                      @change="getValue2"
                      v-model="scope.row.total">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <!--            第二页-->
            <el-tab-pane :label="$t('label.PFANS1013VIEW_TRAFFIC')" name="second">
              <el-table :data="tableT" header-cell-class-name="sub_bg_color_grey height" show-summary :summary-method="getTsummaries">
                <el-table-column :label="$t('label.date')" align="center" width="160">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disable" style="width: 100%"
                                    v-model="scope.row.trafficdate"></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1012VIEW_REGION')" align="center" width="100">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" style="width: 100%" v-model="scope.row.region">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1012VIEW_VEHICLE')" align="center" width="100">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" style="width: 100%" v-model="scope.row.vehicle">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1012VIEW_STARTINGPOINT')" align="center" width="130">
                  <template slot-scope="scope">
                    <el-tooltip class="item" effect="light" :content="scope.row.startingpoint" placement="top" :disabled="scope.row.startingpoint===''?true:false">
                      <el-input :disabled="!disable" style="width: 100%" v-model="scope.row.startingpoint"/>
                    </el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1012VIEW_RMB')" align="center" prop="rmb" width="150">
                  <template slot-scope="scope">
                    <el-input-number
                      :disabled="!disable"
                      :max="1000000000"
                      :min="0"
                      :precision="2"
                      @change="changeRMB(scope.row)"
                      controls-position="right"
                      style="width: 100%"
                      v-model="scope.row.rmb"
                    ></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1012VIEW_FOREIGNCURRENCY')" align="center" prop="foreigncurrency"
                                 width="150" v-if="showforeigncurrency">
                  <template slot-scope="scope">
                    <el-input-number
                      :disabled="!disable"
                      :max="1000000000"
                      :min="0"
                      :precision="2"
                      :no="scope.row"
                      @change="changeForeigncurrency(scope.row)"
                      controls-position="right"
                      style="width: 100%"
                      v-model="scope.row.foreigncurrency"
                    ></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1012VIEW_ANNEXNO')" align="center" width="90">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" v-model="scope.row.annexno" style="width: 100%">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.operation')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-button
                      :disabled="!disable"
                      @click.native.prevent="deleteRow(scope.$index, tableT)"
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
            </el-tab-pane>

            <!--            第三页-->
            <el-tab-pane :label="$t('label.PFANS1013VIEW_ACCOMMODATION')" name="third">
              <el-table :data="tableA" header-cell-class-name="sub_bg_color_grey height"
                        :summary-method="getAsummaries"
                        show-summary>
                <el-table-column :label="$t('label.date')" align="center" width="160">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disable" v-model="scope.row.accommodationdate" style="width: 100%">
                    </el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1013FORMVIEW_ACTIVITYCONTENT')" align="center" width="100">
                  <template slot-scope="scope">
                    <dicselect :code="code4"
                               :no="scope.row"
                               @change="getactivitycontent"
                               :data="scope.row.activitycontent"
                               :disabled="!disable"
                               :multiple="multiple">
                    </dicselect>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1012VIEW_VEHICLE')" align="center" width="100">
                  <template slot-scope="scope">
                    <dicselect :code="code5"
                               :no="scope.row"
                               @change="getvehicle"
                               :data="scope.row.vehicle"
                               :disabled="!disable"
                               :multiple="multiple">
                    </dicselect>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1013FORMVIEW_MOVEMENTTIME')" align="center" width="100">
                  <template slot-scope="scope">
                    <dicselect :code="code7"
                               :no="scope.row"
                               :data="scope.row.movementtime"
                               @change="getmovementtime"
                               :disabled="!disable"
                               :multiple="multiple">
                    </dicselect>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1002VIEW_REGION')" align="center" width="100" v-if="showAout">
                  <template slot-scope="scope">
                    <dicselect :code="code9"
                               :no="scope.row"
                               :data="scope.row.exitarea"
                               @change="getexitarea"
                               :disabled="!disable"
                               :multiple="multiple">
                    </dicselect>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1013FORMVIEW_CITY')" align="center" width="100" v-else>
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" v-model="scope.row.city">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1013FORMVIEW_FACILITYTYPE')" align="center" width="100">
                  <template slot-scope="scope">
                    <dicselect :code="code8"
                               :no="scope.row"
                               :data="scope.row.facilitytype"
                               @change="getfacilitytype"
                               :disabled="!disable"
                               :multiple="multiple">
                    </dicselect>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1013FORMVIEW_FACILITYNAME')" align="center" width="100">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" v-model="scope.row.facilityname">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1013FORMVIEW_ACCOMMODATIONALLOWANCE')" align="center" width="150" prop="accommodationallowance" >
                  <template slot-scope="scope">
                    <el-input-number
                      :disabled="!disable"
                      :max="1000000000"
                      :min="0"
                      :precision="2"
                      controls-position="right"
                      style="width: 100%"
                      v-model="scope.row.accommodationallowance"
                      @change="changeRMB"
                    ></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1013FORMVIEW_ACCOMMODATION')" align="center" width="150" prop="accommodation" v-if="showAout">
                  <template slot-scope="scope">
                    <el-input-number
                      :disabled="!disable"
                      :max="1000000000"
                      :min="0"
                      :precision="2"
                      controls-position="right"
                      style="width: 100%"
                      v-model="scope.row.accommodation"
                      @change="changeForeigncurrency"
                    ></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1013FORMVIEW_TRAVELALLOWANCE')" align="center" width="150"v-else prop="travelallowance" >
                  <template slot-scope="scope">
                    <el-input-number
                      :disabled="!disable"
                      :max="1000000000"
                      :min="0"
                      :precision="2"
                      controls-position="right"
                      style="width: 100%"
                      v-model="scope.row.travelallowance"
                    ></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1013FORMVIEW_TRAVEL')" align="center" width="150"v-if="showAout" prop="travel">
                  <template slot-scope="scope">
                    <el-input-number
                      :disabled="!disable"
                      :max="1000000000"
                      :min="0"
                      :precision="2"
                      controls-position="right"
                      style="width: 100%"
                      v-model="scope.row.travel"
                    ></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1013FORMVIEW_RELATIVES')" align="center" width="150" v-else prop="relatives">
                  <template slot-scope="scope">
                    <el-input-number
                      :disabled="!disable"
                      :max="1000000000"
                      :min="0"
                      :precision="2"
                      controls-position="right"
                      style="width: 100%"
                      v-model="scope.row.relatives"
                    ></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1013FORMVIEW_PLANE')" align="center" width="150" v-if="showAout" prop="plane">
                  <template slot-scope="scope">
                    <el-input-number
                      :disabled="!disable"
                      :max="1000000000"
                      :min="0"
                      :precision="2"
                      controls-position="right"
                      style="width: 100%"
                      v-model="scope.row.plane"
                    ></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1013FORMVIEW_TRAIN')" align="center" width="150" v-else prop="train">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" v-model="scope.row.train"  style="width: 100%" @change="getvehicle"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1012VIEW_ANNEXNO')" align="center">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" v-model="scope.row.annexno">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.operation')" width="200" align="center">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="deleteRow3(scope.$index, tableA)"
                      type="danger"
                      size="small"
                      plain
                      :disabled="!disable"
                    >{{$t('button.delete')}}
                    </el-button>
                    <el-button
                      @click="addRow3()"
                      type="primary"
                      size="small"
                      plain
                      :disabled="!disable"
                    >{{$t('button.insert')}}
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <!--            第四页-->
            <el-tab-pane :label="$t('label.PFANS1012VIEW_OTHER')" name="fourth">
              <el-table :data="tableR" :summary-method="getRsummaries" header-cell-class-name="sub_bg_color_grey height"
                        show-summary>
                <el-table-column :label="$t('label.date')" align="center" width="160">
                  <template slot-scope="scope">
                    <el-date-picker :disabled="!disable" style="width: 100%" v-model="scope.row.otherdetailsdate">
                    </el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1012VIEW_COSTITEM')" align="center" width="150">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" style="width: 100%" v-model="scope.row.costitem">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1012VIEW_ABSTRACT')" align="center" width="150">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" style="width: 100%" v-model="scope.row.remarks" >
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1012VIEW_RMB')" align="center" prop="rmb" width="150">
                  <template slot-scope="scope">
                    <el-input-number
                      :disabled="!disable"
                      :max="1000000000"
                      :min="0"
                      :precision="2"
                      @change="changeRMB(scope.row)"
                      controls-position="right"
                      style="width: 100%"
                      v-model="scope.row.rmb"
                    ></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1012VIEW_FOREIGNCURRENCY')" align="center" prop="foreigncurrency"
                                 width="150" v-if="showforeigncurrency">
                  <template slot-scope="scope">
                    <el-input-number
                      :disabled="!disable"
                      :max="1000000000"
                      :min="0"
                      :precision="2"
                      :no="scope.row"
                      @change="changeForeigncurrency(scope.row)"
                      controls-position="right"
                      style="width: 100%"
                      v-model="scope.row.foreigncurrency"
                    ></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1012VIEW_ANNEXNO')" align="center" width="100">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" v-model="scope.row.annexno">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.operation')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-button
                      :disabled="!disable"
                      @click.native.prevent="deleteRow4(scope.$index, tableR)"
                      plain
                      size="small"
                      type="danger"
                    >{{$t('button.delete')}}
                    </el-button>
                    <el-button
                      :disabled="!disable"
                      @click="addRow4()"
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
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>
<script>
  import EasyNormalContainer from "@/components/EasyNormalContainer";
  import user from "../../../components/user.vue";
  import {Message} from 'element-ui';
  import {getOrgInfoByUserId,getDictionaryInfo,getUserInfo} from '@/utils/customize';
  import dicselect from "../../../components/dicselect";
  import {telephoneNumber} from '@/utils/validate';
  import moment from 'moment';

  export default {
    name: 'PFANS1013FormView',
    components: {
      dicselect,
      EasyNormalContainer,
      user,
    },
    data() {
      var checkuser = (rule, value, callback) => {
        if (!this.form.userid || this.form.userid === '' || this.form.userid === "undefined") {
          this.error = this.$t('normal.error_09') + this.$t('label.applicant');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.applicant')));
        } else {
          this.error = "";
          return callback();
        }
      };
      var checktele = (rule, value, callback) => {
        if (this.form.telephone !== null && this.form.telephone !== '') {
          if (telephoneNumber(value)) {
            callback(new Error(this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS1012VIEW_TELEPHONE')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      return {
        error: '',
        relations: [],
        loans:[],
        selectType: "Single",
        title: "title.PFANS1013VIEW",
        userlist: "",
        activeName: 'first',
        loading: false,
        disabled: false,
        tableTValue: "",
        tableAValue: "",
        tableRValue: "",
        tableDValue: "",
        tableValue: "",
        tableData: [{
          costitem: this.$t('label.PFANS1012VIEW_TRAFFICEXPENSEC'),
          rmb: "",
        },
          {
            costitem: this.$t('label.PFANS1013FORMVIEW_ACCOMMODATIONDATA'),
            rmb: "",
          },
          {
            costitem: this.$t('label.PFANS1013FORMVIEW_TRAVELALLOWANCEDATA'),
            rmb: "",
          },
          {
            costitem: this.$t('label.PFANS1013VIEW_OTHER'),
            rmb: "",
          }],
        tableData2: [{
          costitem: this.$t('label.PFANS1012VIEW_TRAFFICEXPENSEC'),
          ratecurrency: "",
          usdcurrency: "",
          jpycurrency: "",
          rmb: "",
          total: "",
        },
          {
            costitem: this.$t('label.PFANS1013FORMVIEW_ACCOMMODATIONDATA'),
            ratecurrency: "",
            usdcurrency: "",
            jpycurrency: "",
            rmb: "",
            total: "",
          },
          {
            costitem: this.$t('label.PFANS1013FORMVIEW_TRAVELALLOWANCEDATA'),
            ratecurrency: "",
            usdcurrency: "",
            jpycurrency: "",
            rmb: "",
            total: "",
          },
          {
            costitem: this.$t('label.PFANS1013VIEW_OTHER'),
            ratecurrency: "",
            usdcurrency: "",
            jpycurrency: "",
            rmb: "",
            total: "",
          },
        ],
        baseInfo: {},
        form: {
          type: '1',
          center_id: '',
          group_id: '',
          team_id: '',
          userid: '',
          telephone: '',
          business_id: '',
          place: '',
          startdate: '',
          enddate: '',
          datenumber: '',
          budgetunit: '',
          loan: '',
          loanamount: '',
          currency: '',
          totalpay: '',
          totalcurrency: '',
          balance: '',
          jpyfxrate: '',
          dollarfxrate: '',
          otherfxrate: '',
        },
        buttonList: [
          {
            key: 'save',
            name: 'button.save',
            disabled: false,
            icon: 'el-icon-check',
          },
        ],
        tableT: [{
          evectionid: "",
          trafficdetails_id: "",
          trafficdate: "",
          region: "",
          vehicle: "",
          startingpoint: "",
          rmb: "",
          foreigncurrency: "",
          annexno: "",
          rowindex: "",
        }],
        tableA: [{
          evectionid: "",
          accommodationdetails_id: "",
          accommodationdate: "",
          activitycontent: "",
          vehicle: "",
          movementtime: "",
          city: "",
          exitarea: "",
          facilitytype: "",
          facilityname: "",
          accommodationallowance: "",
          accommodation: "",
          travelallowance: "",
          travel: "",
          relatives: "",
          train: "",
          plane: "",
          annexno: "",
          rowindex: "",
        }],
        tableR: [{
          evectionid: "",
          otherdetails_id: "",
          otherdetailsdate: "",
          costitem: "",
          remarks: "",
          rmb: "",
          foreigncurrency: "",
          annexno: "",
          rowindex: "",
        }],
        rules: {
          userid: [{
            required: true,
            validator: checkuser,
            trigger: 'change'
          }],
          telephone: [{
            validator: checktele,
            trigger: 'change'
          }]
        },
        code1: 'PG002',
        code3: 'PJ003',
        code4: 'PJ024',
        code5: 'PJ025',
        code6: 'PJ026',
        code7: 'PJ027',
        code8: 'PJ020',
        code9: 'PJ017',
        multiple: false,
        show1: true,
        show2: false,
        show3: false,
        show4: false,
        show5: false,
        show: false,
        showAinner: true,
        showAout: false,
        showdata: true,
        showdata2: false,
        showforeigncurrency: false,
        canStart: false,
        result:"",
        result2:"",
        rank:"",
      };
    },
    mounted() {
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1013Store/selectById', {'evectionid': this.$route.params._id})
          .then(response => {
            this.form = response.evection;
            if (response.trafficdetails.length > 0) {
              this.tableT = response.trafficdetails
            }
            if (response.accommodationdetails.length > 0) {
              this.tableA = response.accommodationdetails
            }
            if (response.otherdetails.length > 0) {
              this.tableR = response.otherdetails
            }
            if (this.form.type === '1') {
              this.showdata = true;
              this.showdata2 = false;
              this.showAinner = true;
              this.showAout = false;
              this.form.type = '1';
              this.show = true;
              this.show2 = false;
              this.show3 = false;
              this.show4 = false;
              this.show5 = false;
              this.showdata = true;
              this.showdata2 = false;
              this.showAinner = true;
              this.showAout = false;
              this.showforeigncurrency = false;

            } else {
              if(this.form.currency==='PJ003001'){
                this.show4 = true;
              }else if(this.form.currency==='PJ003002'){
                this.show3 = true;
              }else if(this.form.currency==='PJ003003'){
                this.show5 = true;
              }
              this.showdata = false;
              this.showdata2 = true;
              this.showAinner = false;
              this.showAout = true;
              this.form.type = '2';
              this.show = false;
              this.show2 = true;
              this.showforeigncurrency = true;

            }
            //
            this.userlist = this.form.userid;
            this.baseInfo.evection = JSON.parse(JSON.stringify(this.form));
            this.baseInfo.trafficdetails = JSON.parse(JSON.stringify(this.tableT));
            this.baseInfo.accommodationdetails = JSON.parse(JSON.stringify(this.tableA));
            this.baseInfo.otherdetails = JSON.parse(JSON.stringify(this.tableR));
            let user = getUserInfo(this.userlist);
            if (user) {
              this.rank = user.userinfo.rank;
            }
            this.loading = false;
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000
            });
            this.loading = false;
          });
      } else {
        this.userlist = this.$store.getters.userinfo.userid;
        if (this.userlist !== null && this.userlist !== '') {
          let lst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
          this.form.centerid = lst.centerNmae;
          this.form.groupid = lst.groupNmae;
          this.form.teamid = lst.teamNmae;
          this.form.userid = this.$store.getters.userinfo.userid;

          let user = getUserInfo(this.userlist);
          if (user) {
            this.rank = user.userinfo.rank;
          }
        }
        if(this.form.type==='1'){
          this.showdata=true;
          this.showdata2=false;
          this.showAinner=true;
          this.showAout=false;

        } else{
          this.showdata=false;
          this.showdata2=true;
          this.showAinner=false;
          this.showAout=true;

        }
      }
      this.$store
        .dispatch('PFANS1013Store/getdate', {})
        .then(response => {
          for (let i = 0; i < response.length; i++) {
            var vote = {};
            this.result = response;
            vote.value = response[i].businessid;
            vote.label=moment(response[i].applicationdate).format('YYYY-MM-DD');
            this.relations.push(vote)
          }
        });
      this.$store
        .dispatch('PFANS1013Store/getLoanApplication', {})
        .then(response => {
          for (let i = 0; i < response.length; i++) {
            var vote = {};
            this.result2=response;
            vote.value = response[i].loanapplication_id;
            vote.label = moment(response[i].application_date).format('YYYY-MM-DD');
            this.loans.push(vote)
          }
        })
    },
    created() {
      if (!this.$route.params.disabled) {
        this.buttonList = [];
      }
      this.disable = this.$route.params.disabled;
    },
    methods: {
      gettype(val) {
        this.form.type = val;
        if (val === '1') {
          this.show = true;
          this.show2 = false;
          this.show3 = false;
          this.show4 = false;
          this.show5= false;
          this.showdata=true;
          this.showdata2=false;
          this.showAinner=true;
          this.showAout=false;
          this.showforeigncurrency=false;
        } else {
          this.show = false;
          this.show2 = true;
          this.showdata=false;
          this.showdata2=true;
          this.showAinner=false;
          this.showAout=true;
          this.showforeigncurrency=true;
        }
      },
      getUserids(val) {
        this.form.userid = val;
        this.userlist = val;
        let lst = getOrgInfoByUserId(val);
        this.form.centerid = lst.centerNmae;
        this.form.groupid = lst.groupNmae;
        this.form.teamid = lst.teamNmae;
        if (!this.form.userid || this.form.userid === '' ||typeof val === "undefined") {
          this.error = this.$t('normal.error_09') + this.$t('label.applicant');
        } else {
          this.error = "";
        }
      },
      getbudgetunit(val){
        this.form.budgetunit=val;
      },
      deleteRow(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        }
      },
      deleteRow3(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        }
      },
      deleteRow4(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        }
      },
      addRow() {
        this.tableT.push({
          evectionid: "",
          trafficdetails_id: "",
          trafficdate: "",
          region: "",
          vehicle: "",
          startingpoint: "",
          rmb: "",
          foreigncurrency: "",
          annexno: "",
          rowindex: "",
        });
      },
      addRow3() {
        this.tableA.push({
          evectionid: "",
          accommodationdetails_id: "",
          accommodationdate: "",
          activitycontent: "",
          vehicle: "",
          movementtime: "",
          city: "",
          exitarea:"",
          facilitytype: "",
          facilityname: "",
          accommodationallowance: "",
          accommodation: "",
          travelallowance: "",
          travel: "",
          relatives: "",
          train: "",
          plane: "",
          annexno: "",
          rowindex: ""
        });
      },
      addRow4() {
        this.tableR.push({
          evectionid: "",
          otherdetails_id: "",
          otherdetailsdate: "",
          costitem: "",
          remarks: "",
          rmb: "",
          foreigncurrency: "",
          annexno: "",
          rowindex: ""
        });
      },

      getTsummaries(param) {
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = this.$t('label.PFANS1012VIEW_ACCOUNT');
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          } else {
            sums[index] = '--'
          }
        });
        this.getforeign(sums);
        this. getValue(sums);
        this. getValue2(sums);
        this.gettotal(sums);
        this.tableTValue=sums;
        return sums;
      },
      change(val){
        this.result.forEach( res => {
          if(res.businessid === val){
            this.form.place = res.city,
              this.form.startdate=res.startdate,
              this.form.enddate=res.enddate,
              this.form.datenumber=res.datenumber
          }
        });
      },
      change2(val){
        this.result2.forEach( res => {
          if(res.loanapplication_id === val){
            this.form.loanamount = (res.moneys).toFixed(2);
          }
        });
      },
      getAsummaries(param){
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = this.$t('label.PFANS1012VIEW_ACCOUNT');
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          } else {
            sums[index] = '--'
          }
        });
        this.tableAValue=sums;
        return sums;
      },
      getRsummaries(param) {
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = this.$t('label.PFANS1012VIEW_ACCOUNT');
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          } else {
            sums[index] = '--'
          }
        });
        this.tableRValue=sums;
        return sums;
      },
      getDsummaries(param){
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = this.$t('label.PFANS1012VIEW_ACCOUNT');
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          } else {
            sums[index] = '--'
          }
        });
        this.tableDValue=sums;
        return sums;
      },
      getsummaries(param){
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = this.$t('label.PFANS1012VIEW_ACCOUNT');
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            if(index===5){
              sums[index]=sums[index].toFixed(2);
            }
          } else {
            sums[index] = '--'
          }
        });
        this.tableValue=sums;
        return sums;
      },
      getactivitycontent(val,row){
        row.activitycontent=val;
      },
      getvehicle(val,row){
        row.vehicle=val;
        if(val==='PJ025001'){
          row.train=getDictionaryInfo(val).value2;
        }
      },
      getmovementtime(val,row){
        row.movementtime=val;
        this.getTravel(row);
      },
      getexitarea(val,row){
        row.exitarea=val;
        this.getTravel(row);
      },
      getfacilitytype(val,row){
        row.facilitytype=val;
        this.getTravel(row);
      },
      getforeign(sums){
        if(this.form.type==='1'){
          this.form.totalcurrency=null;
        }
        if(this.form.type==='2'){
          this.form.totalcurrency=sums[5]+this.tableAValue[8]+this.tableAValue[9]+this.tableAValue[10]+this.tableRValue[4];
        }

      },
      getTravel(row){//111
        alert(row.movementtime);
        // if(row.facilitytype === "PJ020001"){
        // }else if(row.facilitytype === "PJ020002"){
        // }else if(row.facilitytype === "PJ020003"){
        // }else{
        // }
        debugger;
        //地域
        // var varexitarea;
        // let exitareadic = getDictionaryInfo(row.exitarea);
        // if (exitareadic) {
        //   varexitarea = exitareadic.value1;
        // }
        //设施类型
        var varfacilitytype;
        let facilitytypedic = getDictionaryInfo(row.facilitytype);
        if (facilitytypedic) {
          varfacilitytype = facilitytypedic.value2;
        }
        //移动时间
        var varmovementtime1;
        var varmovementtime2 = 1;
        let movementtimedic = getDictionaryInfo(row.movementtime);
        if (movementtimedic) {
          varmovementtime1 = movementtimedic.value1;
          varmovementtime2 = movementtimedic.value2;
        }
        //等级
        var varrank;
        let dictionaryInfo = getDictionaryInfo("PR021006");
        if (dictionaryInfo) {
          varrank = dictionaryInfo.value1;
        }
        varrank = varrank.substr(1,1);

        var vartravelallowancedata = '';
        if(row.exitarea === "PJ017001"){  //日本
          if(Number(varrank) < 7){
            vartravelallowancedata = varfacilitytype * varmovementtime2;
          }else if(Number(varrank) === 8){
            vartravelallowancedata = varfacilitytype * varmovementtime2;
          }else if(Number(varrank) > 8){
            vartravelallowancedata = varfacilitytype * varmovementtime2;
          }
        }else if(row.exitarea === "PJ017002"){ //第一区域
          if(Number(varrank) < 7){
            vartravelallowancedata = varfacilitytype * varmovementtime2;
          }else if(Number(varrank) === 8){
            vartravelallowancedata = varfacilitytype * varmovementtime2;
          }else if(Number(varrank) > 8){
            vartravelallowancedata = varfacilitytype * varmovementtime2;
          }
        }else if(row.exitarea === "PJ017003"){ //第二区域
          if(Number(varrank) < 7){
            vartravelallowancedata = varfacilitytype * varmovementtime2;
          }else if(Number(varrank) === 8){
            vartravelallowancedata = varfacilitytype * varmovementtime2;

          }else if(Number(varrank) > 8){
            vartravelallowancedata = varfacilitytype * varmovementtime2;
          }
        }
        alert(vartravelallowancedata);
      },
      gettotal(val){
        if(this.form.type==='1'){
          this.form.totalpay= Math.round((this.tableDValue[5]) * 10) / 10;
          this.form.balance=-(this.form.totalpay-this.form.loanamount).toFixed(2);
        }else if(this.form.type==='2'){
          if(this.form.currency==='PJ003001'){
            if(this.tableValue.length > 5){
              this.form.totalpay = Math.round((this.tableValue[5]) * 10) / 10;
            }
            this.form.balance=-(this.form.totalpay-this.form.loanamount).toFixed(2);
          }else if(this.form.currency==='PJ003002'){
            if(this.tableValue.length > 5){
              this.form.totalpay= Math.round((this.tableValue[5]) * 10) / 10;
            }
            this.form.balance=-(this.form.totalpay-this.form.loanamount).toFixed(2);
          }else {
            if(this.tableValue.length > 5){
              this.form.totalpay= Math.round((this.tableValue[5]) * 10) / 10;
            }
            this.form.balance=-(this.form.totalpay-this.form.loanamount).toFixed(2);
          }
        }
      },
      getValue(sums){
        this.tableData[0].rmb=sums[4];
        this.tableData[1].rmb=this.tableAValue[7];
        this.tableData[2].rmb=this.tableAValue[8]+this.tableAValue[9]+this.tableAValue[10];
        this.tableData[3].rmb=this.tableRValue[3];
      },
      getValue2(sums){
        this.tableData2[0].rmb=sums[4];
        this.tableData2[1].rmb=this.tableAValue[7];
        this.tableData2[3].rmb=this.tableRValue[3];
        if(this.form.currency==='PJ003001'){
          this.tableData2[0].usdcurrency=sums[5];
          this.tableData2[1].usdcurrency=this.tableAValue[8];
          this.tableData2[2].usdcurrency=this.tableAValue[9]+this.tableAValue[10];
          this.tableData2[3].usdcurrency=this.tableRValue[4];
          for(var i=0;i<this.tableData2.length;i++){
            this.tableData2[i].jpycurrency='';
            this.tableData2[i].ratecurrency='';
            this.tableData2[i].total=this.tableData2[i].usdcurrency*this.form.dollarfxrate+this.tableData2[i].rmb;
          }
        }else if(this.form.currency==='PJ003002'){
          this.tableData2[0].jpycurrency=sums[5];
          this.tableData2[1].jpycurrency=this.tableAValue[8];
          this.tableData2[2].jpycurrency=this.tableAValue[9]+this.tableAValue[10];
          this.tableData2[3].jpycurrency=this.tableRValue[4];
          for(var i=0;i<this.tableData2.length;i++){
            this.tableData2[i].usdcurrency='';
            this.tableData2[i].ratecurrency='';
            this.tableData2[i].total=this.tableData2[i].jpycurrency*this.form.jpyfxrate+this.tableData2[i].rmb;
          }
        }else  if(this.form.currency==='PJ003003'){
          this.tableData2[0].ratecurrency=sums[5];
          this.tableData2[1].ratecurrency=this.tableAValue[8];
          this.tableData2[2].ratecurrency=this.tableAValue[9]+this.tableAValue[10];
          this.tableData2[3].ratecurrency=this.tableRValue[4];
          for(var i=0;i<this.tableData2.length;i++){
            this.tableData2[i].total=this.tableData2[i].ratecurrency*this.form.otherfxrate+this.tableData2[i].rmb;
            this.tableData2[i].usdcurrency='';
            this.tableData2[i].jpycurrency='';
          }
        }
      },
      getCurrency(val) {
        this.form.currency = val;
        if (val === 'PJ003001') {
          let dictionaryInfo = getDictionaryInfo(val);
          if (dictionaryInfo) {
            this.form.dollarfxrate = dictionaryInfo.value2;
            this.show4 = true;
            this.show3 = false;
            this.show5 = false;
          }
        }
        if (val === 'PJ003002') {
          let dictionaryInfo = getDictionaryInfo(val);
          if (dictionaryInfo) {
            this.form.jpyfxrate = dictionaryInfo.value2;
            this.show3 = true;
            this.show4 = false;
            this.show5 = false;
          }
        }
        if (val === 'PJ003003') {
          let dictionaryInfo = getDictionaryInfo(val);
          if (dictionaryInfo) {
            this.show3 = false;
            this.show4 = false;
            this.show5 = true;
          }
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
      changeRMB(newValue) {
        if (newValue.rmb > 0) {
          newValue.foreigncurrency = "";
          newValue.display = false;
          this.$nextTick(() => {
            newValue.display = true
          })
        }
      },
      changeForeigncurrency(newValue) {
        if (newValue.foreigncurrency > 0) {
          newValue.rmb = "";
          newValue.display = false;
          this.$nextTick(() => {
            newValue.display = true
          })
        }
      },
      buttonClick(val) {
        if (val === "save") {
          this.$refs["refform"].validate(valid => {
            if (valid) {
              this.baseInfo = {};
              this.form.user_id = this.userlist;
              this.baseInfo.evection = JSON.parse(JSON.stringify(this.form));
              this.baseInfo.trafficdetails = [];
              this.baseInfo.accommodationdetails = [];
              this.baseInfo.otherdetails = [];
              for (let i = 0; i < this.tableT.length; i++) {
                if (this.tableT[i].trafficdate !== "" || this.tableT[i].region !== "" || this.tableT[i].vehicle !== "" || this.tableT[i].startingpoint !== ""
                  || this.tableT[i].rmb !== "" || this.tableT[i].foreigncurrency !== "" || this.tableT[i].annexno !== "") {
                  this.baseInfo.trafficdetails.push(
                    {
                      trafficdetails_id: this.tableT[i].trafficdetails_id,
                      evectionid: this.tableT[i].evectionid,
                      trafficdate: this.tableT[i].trafficdate,
                      region: this.tableT[i].region,
                      vehicle: this.tableT[i].vehicle,
                      startingpoint: this.tableT[i].startingpoint,
                      rmb: this.tableT[i].rmb,
                      foreigncurrency: this.tableT[i].foreigncurrency,
                      annexno: this.tableT[i].annexno,
                    }
                  );
                }
              }
              for (let i = 0; i < this.tableA.length; i++) {
                if (this.tableA[i].accommodationdate !== "" || this.tableA[i].activitycontent !== "" || this.tableA[i].vehicle !== ""
                  || this.tableA[i].movementtime !== "" || this.tableA[i].city !== "" || this.tableA[i].facilitytype !== "" || this.tableA[i].facilityname !== "" || this.tableA[i].accommodationallowance !== ""
                  || this.tableA[i].accommodation !== "" || this.tableA[i].travelallowance !== "" || this.tableA[i].travel !== "" || this.tableA[i].relatives !== "" || this.tableA[i].train !== ""
                  || this.tableA[i].plane !== "" || this.tableA[i].annexno !== "") {
                  this.baseInfo.accommodationdetails.push(
                    {
                      accommodationdetails_id: this.tableA[i].accommodationdetails_id,
                      evectionid: this.tableA[i].evectionid,
                      accommodationdate: this.tableA[i].accommodationdate,
                      activitycontent: this.tableA[i].activitycontent,
                      vehicle: this.tableA[i].vehicle,
                      movementtime: this.tableA[i].movementtime,
                      city: this.tableA[i].city,
                      facilitytype: this.tableA[i].facilitytype,
                      facilityname: this.tableA[i].facilityname,
                      accommodationallowance: this.tableA[i].accommodationallowance,
                      accommodation: this.tableA[i].accommodation,
                      travelallowance: this.tableA[i].travelallowance,
                      travel: this.tableA[i].travel,
                      relatives: this.tableA[i].facilitytype,
                      train: this.tableA[i].train,
                      plane: this.tableA[i].plane,
                      annexno: this.tableA[i].annexno,
                    }
                  );
                }
              }
              for (let i = 0; i < this.tableR.length; i++) {
                if (this.tableR[i].otherdetailsdate !== "" || this.tableR[i].costitem !== "" || this.tableR[i].remarks !== ""
                  || this.tableR[i].rmb !== "" || this.tableR[i].foreigncurrency !== "" || this.tableR[i].annexno !== "") {
                  this.baseInfo.otherdetails.push(
                    {
                      otherdetails_id: this.tableR[i].otherdetails_id,
                      evectionid: this.tableR[i].evectionid,
                      otherdetailsdate: this.tableR[i].otherdetailsdate,
                      costitem: this.tableR[i].costitem,
                      remarks: this.tableR[i].remarks,
                      rmb: this.tableR[i].rmb,
                      foreigncurrency: this.tableR[i].foreigncurrency,
                      annexno: this.tableR[i].annexno,
                    }
                  );
                }
              }
              if (this.$route.params._id) {
                this.baseInfo.evection.evectionid = this.$route.params._id;
                this.$store
                  .dispatch('PFANS1013Store/update', this.baseInfo)
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
                      duration: 5 * 1000
                    });
                    this.loading = false;
                  })
              } else {
                this.form.user_id = this.userlist;
                this.$store
                  .dispatch('PFANS1013Store/create', this.baseInfo)
                  .then(response => {
                    this.data = response;
                    this.loading = false;
                    this.$message({
                      message: this.$t("normal.success_01"),
                      type: "success",
                      duration: 5 * 1000
                    });
                    if (this.$store.getters.historyUrl) {
                      this.$router.push(this.$store.getters.historyUrl);
                    }
                  })
                  .catch(error => {
                    Message({
                      message: error,
                      type: 'error',
                      duration: 5 * 1000
                    });
                    this.loading = false;
                  });
              }
            }
          })
        }

      }
    }
  }


</script>

<style rel="stylesheet/scss" lang="scss">

</style>






