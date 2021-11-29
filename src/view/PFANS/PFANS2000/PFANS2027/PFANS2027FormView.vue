<template>
  <div class="dpSupIndex" style="min-height: 100%">
    <EasyNormalContainer
      :buttonList="buttonList"
      @buttonClick="buttonClick"
      @disabled="setdisabled"
      @end="end"
      @start="start"
      @workflowState="workflowState"
      ref="container"
      v-loading="loading"
    >
      <div slot="customize">
        <el-tabs type="border-card" v-model="activeName">
          <el-tab-pane :label="title" name="first">
            <el-row>
              <el-col :span="4">
                <dicselect :code="code14" @change="changeType" size="mini"></dicselect>
              </el-col>
              <el-col :span="2">
              </el-col>
              <el-col :span="4">
                <el-select @change="changed" size="mini" v-model="region" v-if="description">
                  <el-option :label="$t('label.PFANS2027VIEW_WHOLE')" value="1"></el-option>
                  <el-option :label="$t('label.PFANS2027VIEW_HEADQUARTERS')" value="2"></el-option>
                </el-select>
              </el-col>
            </el-row>
            <el-row style="padding-top: 10px">
              <div id="eagleMapContainer" @Scroll="hanldeScroll">
                <div id="table_list">
                  <plx-table-grid
                    :cell-class-name="rowheight"
                    :datas="data1"
                    :height-change="false"
                    :pagination-show="false"
                    :row-height="40"
                    border
                    header-cell-class-name="sub_bg_color_blue"
                    highlight-current-row
                    ref="eltable1"
                    stripe
                    style="width: 100%;height: calc(100vh - 260px - 2rem)"
                    use-virtual
                    v-if="isShow"
                  >
                    <!--                    <plx-table-column-->
                    <!--                      fixed="left"-->
                    <!--                      width="50">-->
                    <!--                      <template slot-scope="scope">-->
                    <!--                        <el-checkbox-->
                    <!--                          v-model="scope.row.dis"-->
                    <!--                          :disabled="!disabled"-->
                    <!--                          :key="index"-->
                    <!--                          @change="getChecked(scope.row.dis,scope.$index)"-->
                    <!--                          active-value="1"-->
                    <!--                          inactive-value="0"-->
                    <!--                        ></el-checkbox>-->
                    <!--                      </template>-->
                    <!--                    </plx-table-column>-->
                    <plx-table-column
                      :label="$t('label.PFANS2027VIEW_NAME')"
                      prop="userName"
                      fixed="left"
                      width="90"
                    ></plx-table-column>
                    <plx-table-column :label="$t('label.PFANS2027VIEW_RN')" prop="rnName" width="60">
                    </plx-table-column>
                    <plx-table-column
                      :label="$t('label.PFANS2027VIEW_DATE')"
                      prop="enterdayFormat"
                      width="90"
                    ></plx-table-column>
                    <plx-table-column
                      :label="$t('label.PFANS2027VIEW_GROUP2')"
                      prop="groupName"
                      width="140"
                    ></plx-table-column>
                    <plx-table-column
                      :label="$t('label.PFANS2027VIEW_TEAM')"
                      prop="teamName"
                      width="170"
                    ></plx-table-column>
                    <plx-table-column
                      :label="$t('label.PFANS2027VIEW_MONTH')"
                      prop="month"
                      width="60"
                    ></plx-table-column>
                    <plx-table-column
                      :label="$t('label.PFANS2027VIEW_FORM')"
                      prop="differenceName"
                      width="80"
                    ></plx-table-column>
                    <plx-table-column
                      :label="$t('label.PFANS2027VIEW_PRIZE')"
                      prop="prize"
                      width="80">
                      <template slot-scope="scope">
                        <el-input :disabled="getdisabled(scope.row)" size="mini" v-model="scope.row.prize"></el-input>
                      </template>
                    </plx-table-column>
                    <plx-table-column
                      :label="$t('label.PFANS2027VIEW_GIVE')"
                      prop="salary"
                      width="130">
                    </plx-table-column>
                    <plx-table-column
                      :label="$t('label.PFANS2027VIEW_ATTENDANCE')"
                      prop="workrate"
                      width="100"
                    >
                      <!--                      <template slot-scope="scope">-->
                      <!--                        <el-input-number-->
                      <!--                          :disabled="!disabled"-->
                      <!--                          :max="100"-->
                      <!--                          :min="0"-->
                      <!--                          :step="5"-->
                      <!--                          controls-position="right"-->
                      <!--                          size="mini"-->
                      <!--                          v-model="scope.row.workrate"-->
                      <!--                        ></el-input-number>-->
                      <!--                      </template>-->
                    </plx-table-column>
                    <plx-table-column
                      :label="$t('label.PFANS2027VIEW_2018YEAR')"
                      prop="bonussign"
                      width="100"
                    >
                      <template slot-scope="scope">
                        <el-input :disabled="getdisabled(scope.row)" size="mini" v-model="scope.row.bonussign"></el-input>
                      </template>
                    </plx-table-column>
                    <plx-table-column
                      :label="$t('label.PFANS2027VIEW_LASTMONTHS')"
                      prop="lastsymbol"
                      width="100"
                    >
                      <template slot-scope="scope">
                        <el-input :disabled="getdisabled(scope.row)" size="mini" v-model="scope.row.lastsymbol"></el-input>
                      </template>
                    </plx-table-column>
                    <plx-table-column :label="$t('label.PFANS2027VIEW_RESULT') + ' (' + $t('label.PFANS1027FORMVIEW_COL5T0') + ':' + getRate1 + '%)'"
                                      v-if="showState" >
                      <plx-table-column
                        :key="item.index"
                        :label="getTableColumnName(item.code)"
                        v-for="(item,index) in data2"
                        v-if="index <= 3 &&
                                  ((ShowType === 'PJ101004' && item.r5 === '1') || (ShowType === 'PJ101003' && (item.r6 === '1' || item.r82 === '1'))
                                  || (ShowType === 'PJ101002' && item.r81 === '1') || (ShowType === 'PJ101001' && item.r83 === '1'))"
                        width="140"
                      >
                        <template slot-scope="scope">
                          <el-select
                            :disabled="getdisabled(scope.row)"
                            size="mini"
                            v-if="index === 0"
                            v-model="scope.row.tatebai"
                          >
                            <el-option
                              :key="op.value"
                              :label="op.label"
                              :value="op.value"
                              v-for="op in optionsScore"
                            ></el-option>
                          </el-select>
                          <el-select
                            :disabled="getdisabled(scope.row)"
                            size="mini"
                            v-if="index === 1"
                            v-model="scope.row.satoshi"
                          >
                            <el-option
                              :key="op.value"
                              :label="op.label"
                              :value="op.value"
                              v-for="op in optionsScore"
                            ></el-option>
                          </el-select>
                          <el-select
                            :disabled="getdisabled(scope.row)"
                            size="mini"
                            v-if="index === 2"
                            v-model="scope.row.organization"
                          >
                            <el-option
                              :key="op.value"
                              :label="op.label"
                              :value="op.value"
                              v-for="op in optionsScore"
                            ></el-option>
                          </el-select>
                          <el-select
                            :disabled="getdisabled(scope.row)"
                            size="mini"
                            v-if="index === 3"
                            v-model="scope.row.systematics"
                          >
                            <el-option
                              :key="op.value"
                              :label="op.label"
                              :value="op.value"
                              v-for="op in optionsScore"
                            ></el-option>
                          </el-select>
                        </template>
                      </plx-table-column>
                    </plx-table-column>
                    <plx-table-column :label="$t('menu.PFANSPJ') + ' (' + $t('label.PFANS1027FORMVIEW_COL5T0') + ':' + getRate2+ '%)'">
                      <plx-table-column
                        :key="item.index"
                        :label="getTableColumnName(item.code)"
                        v-for="(item,index) in data2"
                        v-if="(index > 3  && index<= 7)&&
                                  ((ShowType === 'PJ101004' && item.r5 === '1') || (ShowType === 'PJ101003' && (item.r6 === '1' || item.r82 === '1'))
                                  || (ShowType === 'PJ101002' && item.r81 === '1') || (ShowType === 'PJ101001' && item.r83 === '1'))"
                        width="180"
                      >
                        <template slot-scope="scope">
                          <el-select
                            :disabled="getdisabled(scope.row)"
                            size="mini"
                            v-if="index === 4"
                            v-model="scope.row.manpower"
                          >
                            <el-option
                              :key="op.value"
                              :label="op.label"
                              :value="op.value"
                              v-for="op in optionsScore"
                            ></el-option>
                          </el-select>
                          <el-select
                            :disabled="getdisabled(scope.row)"
                            size="mini"
                            v-if="index === 5"
                            v-model="scope.row.scale"
                          >
                            <el-option
                              :key="op.value"
                              :label="op.label"
                              :value="op.value"
                              v-for="op in optionsScore"
                            ></el-option>
                          </el-select>
                          <el-select
                            :disabled="getdisabled(scope.row)"
                            size="mini"
                            v-if="index === 6"
                            v-model="scope.row.achievement"
                          >
                            <el-option
                              :key="op.value"
                              :label="op.label"
                              :value="op.value"
                              v-for="op in optionsScore"
                            ></el-option>
                          </el-select>
                          <el-select
                            :disabled="getdisabled(scope.row)"
                            size="mini"
                            v-if="index === 7"
                            v-model="scope.row.degree"
                          >
                            <el-option
                              :key="op.value"
                              :label="op.label"
                              :value="op.value"
                              v-for="op in optionsScore"
                            ></el-option>
                          </el-select>
                        </template>
                      </plx-table-column>
                    </plx-table-column>
                    <plx-table-column :label="$t('label.PFANS2027VIEW_MEAN') + ' (' + $t('label.PFANS1027FORMVIEW_COL5T0') + ':' + getRate3 + '%)'">
                      <plx-table-column
                        :key="item.index"
                        :label="getTableColumnName(item.code)"
                        v-for="(item,index) in data2"
                        v-if="(index > 7)&&
                                  ((ShowType === 'PJ101004' && item.r5 === '1') || (ShowType === 'PJ101003' && (item.r6 === '1' || item.r82 === '1'))
                                  || (ShowType === 'PJ101002' && item.r81 === '1') || (ShowType === 'PJ101001' && item.r83 === '1'))"
                        width="180"
                      >
                        <template slot-scope="scope">
                          <el-select
                            :disabled="getdisabled(scope.row)"
                            size="mini"
                            v-if="index === 8"
                            v-model="scope.row.assignment"
                          >
                            <el-option
                              :key="op.value"
                              :label="op.label"
                              :value="op.value"
                              v-for="op in optionsScore"
                            ></el-option>
                          </el-select>
                          <el-select
                            :disabled="getdisabled(scope.row)"
                            size="mini"
                            v-if="index === 9"
                            v-model="scope.row.teamwork"
                          >
                            <el-option
                              :key="op.value"
                              :label="op.label"
                              :value="op.value"
                              v-for="op in optionsScore"
                            ></el-option>
                          </el-select>
                          <el-select
                            :disabled="getdisabled(scope.row)"
                            size="mini"
                            v-if="index === 10"
                            v-model="scope.row.humandevelopment"
                          >
                            <el-option
                              :key="op.value"
                              :label="op.label"
                              :value="op.value"
                              v-for="op in optionsScore"
                            ></el-option>
                          </el-select>
                          <el-select
                            :disabled="getdisabled(scope.row)"
                            size="mini"
                            v-if="index === 11"
                            v-model="scope.row.workattitude"
                          >
                            <el-option
                              :key="op.value"
                              :label="op.label"
                              :value="op.value"
                              v-for="op in optionsScore"
                            ></el-option>
                          </el-select>
                        </template>
                      </plx-table-column>
                    </plx-table-column>
                    <plx-table-column :label="$t('label.PFANS2027VIEW_EVALUATION')">
                      <plx-table-column
                        :label="$t('label.PFANS2027VIEW_COMPOSITESCORES')"
                        prop="overallscore"
                        width="70"
                      ></plx-table-column>
                      <plx-table-column
                        :label="$t('label.PFANS2027VIEW_ONE')"
                        :prop="data.evaluatenum === 'PJ104001'?'commentaryresult':''"
                        width="70"
                      ></plx-table-column>
                      <plx-table-column
                        :label="$t('label.PFANS2027VIEW_TOW')"
                        :prop="data.evaluatenum === 'PJ104002'?'commentaryresult':''"
                        width="70"
                      ></plx-table-column>
                      <plx-table-column
                        :label="$t('label.PFANS2027VIEW_RESULTEVALUATION')"
                        :prop="data.evaluatenum === 'PJ104003'?'commentaryresult':''"
                        width="70"
                      ></plx-table-column>
                    </plx-table-column>
                    <plx-table-column :label="$t('label.PFANS2027VIEW_COMPOSITE1')">
                      <plx-table-column
                        :label="$t('label.PFANS2027VIEW_COMPOSITEEVALUATION')"
                        width="400"
                      >
                        <template slot-scope="scope">
                          <el-input
                            :disabled="getdisabled(scope.row)"
                            size="mini"
                            type="textarea"
                            :autosize="{ minRows: 1, maxRows: 2}"
                            v-model="scope.row.comprehensiveone"
                          ></el-input>
                        </template>
                      </plx-table-column>
                    </plx-table-column>
                    <plx-table-column :label="$t('label.PFANS2027VIEW_COMPOSITE2')">
                      <plx-table-column :label="$t('label.PFANS2027VIEW_FIRSTEVALUATION')" width="400">
                        <template slot-scope="scope">
                          <el-input
                            :disabled="getdisabled(scope.row)"
                            size="mini"
                            type="textarea"
                            :autosize="{ minRows: 1, maxRows: 2}"
                            v-model="scope.row.comprehensivetwo"
                          ></el-input>
                        </template>
                      </plx-table-column>
                    </plx-table-column>
                    <plx-table-column
                      :label="$t('label.PFANS2027VIEW_TITLEWEITIAO')"
                      v-if="data.evaluatenum === 'PJ104003'"
                    >
                      <plx-table-column :label="$t('label.January')" width="80">
                        <template slot-scope="scope">
                          <el-input
                            :disabled="data.status != 4 || !disabled"
                            size="mini"
                            v-model="scope.row.firstmonth"
                          ></el-input>
                        </template>
                      </plx-table-column>
                      <plx-table-column :label="$t('label.February')" width="80">
                        <template slot-scope="scope">
                          <el-input
                            :disabled="data.status != 4 || !disabled"
                            size="mini"
                            v-model="scope.row.secondmonth"
                          ></el-input>
                        </template>
                      </plx-table-column>
                      <plx-table-column :label="$t('label.March')" width="80">
                        <template slot-scope="scope">
                          <el-input
                            :disabled="data.status != 4 || !disabled"
                            size="mini"
                            v-model="scope.row.thirdmonth"
                          ></el-input>
                        </template>
                      </plx-table-column>
                    </plx-table-column>
                  </plx-table-grid>
                </div>
              </div>
            </el-row>
          </el-tab-pane>
          <el-tab-pane :label="title2" name="second">
            <el-table
              :cell-class-name="rowheight"
              :data="data2"
              :span-method="spanmethod2"
              border
              header-cell-class-name="sub_bg_color_blue"
              ref="eltable2"
              stripe
            >
              <el-table-column
                :label="$t('label.PFANS1027FORMVIEW_COL1')"
                prop="title1"
                width="60"
              ></el-table-column>
              <el-table-column
                :label="$t('label.PFANS1027FORMVIEW_COL2')"
                prop="title2"
                width="76"
              ></el-table-column>
              <el-table-column
                :formatter="formatter"
                :label="$t('label.PFANS1027FORMVIEW_COL3')"
                prop="title3"
                show-overflow-tooltip
                width="150"
              ></el-table-column>
              <el-table-column :label="$t('label.PFANS1027FORMVIEW_COL4T')">
                <el-table-column
                  :formatter="formatter"
                  :label="$t('label.PFANS1027FORMVIEW_COL4T1')"
                  prop="title4T1"
                  show-overflow-tooltip
                  width="120"
                ></el-table-column>
                <el-table-column
                  :formatter="formatter"
                  :label="$t('label.PFANS1027FORMVIEW_COL4T2')"
                  prop="title4T2"
                  show-overflow-tooltip
                  width="120"
                ></el-table-column>
                <el-table-column
                  :formatter="formatter"
                  :label="$t('label.PFANS1027FORMVIEW_COL4T3')"
                  prop="title4T3"
                  show-overflow-tooltip
                  width="120"
                ></el-table-column>
                <el-table-column
                  :formatter="formatter"
                  :label="$t('label.PFANS1027FORMVIEW_COL4T4')"
                  prop="title4T4"
                  show-overflow-tooltip
                  width="120"
                ></el-table-column>
                <el-table-column
                  :formatter="formatter"
                  :label="$t('label.PFANS1027FORMVIEW_COL4T5')"
                  prop="title4T5"
                  show-overflow-tooltip
                  width="120"
                ></el-table-column>
                <el-table-column
                  :formatter="formatter"
                  :label="$t('label.PFANS1027FORMVIEW_COL4T6')"
                  prop="title4T6"
                  show-overflow-tooltip
                  width="120"
                ></el-table-column>
                <el-table-column
                  :formatter="formatter"
                  :label="$t('label.PFANS1027FORMVIEW_COL4T7')"
                  prop="title4T7"
                  show-overflow-tooltip
                  width="120"
                ></el-table-column>
                <el-table-column
                  :formatter="formatter"
                  :label="$t('label.PFANS1027FORMVIEW_COL4T8')"
                  prop="title4T8"
                  show-overflow-tooltip
                  width="120"
                ></el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1027FORMVIEW_COL5T')">
                <el-table-column
                  :label="$t('label.PFANS1027FORMVIEW_COL5T1')"
                  prop="r5"
                  width="120"
                >
                  <template slot-scope="scope">
                    <el-select :disabled="!disabled" v-model="scope.row.r5">
                      <el-option
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        v-for="item in options"
                      ></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('label.PFANS1027FORMVIEW_COL5T0')"
                  prop="r5rate"
                  width="150"
                >
                  <template slot-scope="scope">
                    <el-input-number
                      :disabled="!disabled"
                      :max="100"
                      :min="0"
                      :step="5"
                      controls-position="right"
                      size="mini"
                      v-model="scope.row.r5rate"
                    ></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('label.PFANS1027FORMVIEW_COL5T2')"
                  prop="r6"
                  width="120"
                >
                  <template slot-scope="scope">
                    <el-select :disabled="!disabled" v-model="scope.row.r6">
                      <el-option
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        v-for="item in options"
                      ></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('label.PFANS1027FORMVIEW_COL5T0')"
                  prop="r6rate"
                  width="150"
                >
                  <template slot-scope="scope">
                    <el-input-number
                      :disabled="!disabled"
                      :max="100"
                      :min="0"
                      :step="5"
                      controls-position="right"
                      size="mini"
                      v-model="scope.row.r6rate"
                    ></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('label.PFANS1027FORMVIEW_COL5T3')"
                  prop="r81"
                  width="120"
                >
                  <template slot-scope="scope">
                    <el-select :disabled="!disabled" v-model="scope.row.r81">
                      <el-option
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        v-for="item in options"
                      ></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('label.PFANS1027FORMVIEW_COL5T0')"
                  prop="r81rate"
                  width="150"
                >
                  <template slot-scope="scope">
                    <el-input-number
                      :disabled="!disabled"
                      :max="100"
                      :min="0"
                      :step="5"
                      controls-position="right"
                      size="mini"
                      v-model="scope.row.r81rate"
                    ></el-input-number>
                  </template>
                </el-table-column>
                <!--                <el-table-column-->
                <!--                  :label="$t('label.PFANS1027FORMVIEW_COL5T4')"-->
                <!--                  prop="r82"-->
                <!--                  width="120"-->
                <!--                >-->
                <!--                  <template slot-scope="scope">-->
                <!--                    <el-select :disabled="!disabled" v-model="scope.row.r82">-->
                <!--                      <el-option-->
                <!--                        :key="item.value"-->
                <!--                        :label="item.label"-->
                <!--                        :value="item.value"-->
                <!--                        v-for="item in options"-->
                <!--                      ></el-option>-->
                <!--                    </el-select>-->
                <!--                  </template>-->
                <!--                </el-table-column>-->
                <!--                <el-table-column-->
                <!--                  :label="$t('label.PFANS1027FORMVIEW_COL5T0')"-->
                <!--                  prop="r82rate"-->
                <!--                  width="150"-->
                <!--                >-->
                <!--                  <template slot-scope="scope">-->
                <!--                    <el-input-number-->
                <!--                      :disabled="!disabled"-->
                <!--                      :max="100"-->
                <!--                      :min="0"-->
                <!--                      :step="5"-->
                <!--                      controls-position="right"-->
                <!--                      size="mini"-->
                <!--                      v-model="scope.row.r82rate"-->
                <!--                    ></el-input-number>-->
                <!--                  </template>-->
                <!--                </el-table-column>-->
                <el-table-column
                  :label="$t('label.PFANS1027FORMVIEW_COL5T5')"
                  prop="r83"
                  width="160"
                >
                  <template slot-scope="scope">
                    <el-select :disabled="!disabled" v-model="scope.row.r83">
                      <el-option
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        v-for="item in options"
                      ></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('label.PFANS1027FORMVIEW_COL5T0')"
                  prop="r83rate"
                  width="150"
                >
                  <template slot-scope="scope">
                    <el-input-number
                      :disabled="!disabled"
                      :max="100"
                      :min="0"
                      :step="5"
                      controls-position="right"
                      size="mini"
                      v-model="scope.row.r83rate"
                    ></el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
  import {getDictionaryInfo, getOrgInfo, getUserInfo, getCurrentRole10, getCurrentRole17} from "@/utils/customize";
  import EasyNormalContainer from "@/components/EasyNormalContainer";
  import dicselect from "../../../components/dicselect";
  import EasyNormalTable from "@/components/EasyNormalTable";
  import moment from "moment";
  import {Message} from "element-ui";

  export default {
    name: "PFANS2027FormView",
    components: {
      dicselect,
      EasyNormalContainer,
      EasyNormalTable
    },
    data() {
      return {
        role: getCurrentRole10(),  //人事 / 工资
        role1: getCurrentRole17(), //总经理
        R: 1,
        region: '1',
        description:false,
        groupid:'',
        showState: false,
        isShow: false,
        disabled: true,
        ShowType: "",
        activeName: "first",
        title: this.$t("title.PFANS2027VIEW_VIEW"),
        title2: this.$t("title.PFANS2027VIEW_VIEW2"),
        loading: false,
        buttonList: [],
        // disabled1: false,
        code14: "PJ101",
        buttonShow: false,
        titleShow: false,
        data: [],
        data1: [],
        data2: [
          {
            index: 1,
            title1: "経営・運営成果",
            title2: "系统联动",
            code: "PJ089001",
            r5: "0",
            r5rate: "0",
            r6: "0",
            r6rate: "0",
            r81: "0",
            r81rate: "20",
            r82: "0",
            r82rate: "0",
            r83: "1",
            r83rate: "40"
          },
          {
            index: 2,
            title1: "経営・運営成果",
            title2: "系统联动",
            code: "PJ089002",
            r5: "0",
            r5rate: "0",
            r6: "0",
            r6rate: "0",
            r81: "0",
            r81rate: "20",
            r82: "0",
            r82rate: "0",
            r83: "1",
            r83rate: "40"
          },
          {
            index: 3,
            title1: "経営・運営成果",
            title2: "系统联动",
            code: "PJ089003",
            r5: "0",
            r5rate: "0",
            r6: "0",
            r6rate: "0",
            r81: "1",
            r81rate: "20",
            r82: "0",
            r82rate: "0",
            r83: "1",
            r83rate: "40"
          },
          {
            index: 4,
            title1: "経営・運営成果",
            title2: "系统联动",
            code: "PJ089004",
            r5: "0",
            r5rate: "0",
            r6: "0",
            r6rate: "0",
            r81: "1",
            r81rate: "20",
            r82: "0",
            r82rate: "0",
            r83: "1",
            r83rate: "40"
          },
          {
            index: 5,
            title1: "PJ管理",
            title2: "系统联动",
            code: "PJ089005",
            r5: "1",
            r5rate: "60",
            r6: "1",
            r6rate: "60",
            r81: "1",
            r81rate: "40",
            r82: "1",
            r82rate: "60",
            r83: "1",
            r83rate: "20"
          },
          {
            index: 6,
            title1: "PJ管理",
            title2: "系统联动",
            code: "PJ089006",
            r5: "1",
            r5rate: "60",
            r6: "1",
            r6rate: "60",
            r81: "1",
            r81rate: "40",
            r82: "1",
            r82rate: "60",
            r83: "0",
            r83rate: "0"
          },
          {
            index: 7,
            title1: "PJ管理",
            title2: "系统联动",
            code: "PJ089007",
            r5: "1",
            r5rate: "60",
            r6: "1",
            r6rate: "60",
            r81: "1",
            r81rate: "40",
            r82: "1",
            r82rate: "60",
            r83: "0",
            r83rate: "0"
          },
          {
            index: 8,
            title1: "PJ管理",
            title2: "系统联动",
            code: "PJ089008",
            r5: "1",
            r5rate: "60",
            r6: "1",
            r6rate: "60",
            r81: "1",
            r81rate: "40",
            r82: "1",
            r82rate: "60",
            r83: "0",
            r83rate: "0"
          },
          {
            index: 9,
            title1: "意欲",
            title2: "系统联动",
            code: "PJ089009",
            r5: "1",
            r5rate: "40",
            r6: "1",
            r6rate: "40",
            r81: "1",
            r81rate: "40",
            r82: "1",
            r82rate: "40",
            r83: "1",
            r83rate: "40"
          },
          {
            index: 10,
            title1: "意欲",
            title2: "系统联动",
            code: "PJ089010",
            r5: "1",
            r5rate: "40",
            r6: "1",
            r6rate: "40",
            r81: "1",
            r81rate: "40",
            r82: "1",
            r82rate: "40",
            r83: "1",
            r83rate: "40"
          },
          {
            index: 11,
            title1: "意欲",
            title2: "系统联动",
            code: "PJ089011",
            r5: "1",
            r5rate: "40",
            r6: "1",
            r6rate: "40",
            r81: "1",
            r81rate: "40",
            r82: "1",
            r82rate: "40",
            r83: "1",
            r83rate: "40"
          },
          {
            index: 12,
            title1: "意欲",
            title2: "系统联动",
            code: "PJ089012",
            r5: "1",
            r5rate: "40",
            r6: "1",
            r6rate: "40",
            r81: "1",
            r81rate: "40",
            r82: "1",
            r82rate: "40",
            r83: "1",
            r83rate: "40"
          }
        ],
        options: [
          {
            value: "0",
            label: "-"
          },
          {
            value: "1",
            label: "○"
          }
        ],
        listData1: [],
        optionsScore: [
          {
            value: 0,
            label: "0"
          },
          {
            value: 1,
            label: "1"
          },
          {
            value: 2,
            label: "2"
          },
          {
            value: 3,
            label: "3"
          },
          {
            value: 4,
            label: "4"
          },
          {
            value: 5,
            label: "5"
          },
          {
            value: 6,
            label: "6"
          },
          {
            value: 7,
            label: "7"
          }
        ],
        rate1: 0,
        rate2: 0,
        rate3: 0
      };
    },
    created() {
      this.disabled = this.$route.params.disabled;
      if (this.disabled) {
        this.buttonList = [
          {
            key: "save",
            name: "button.save",
            disabled: this.$route.params.disabled1,
            icon: "el-icon-check"
          },
          {
            key: "commit",
            name: "button.commit",
            disabled: true,
            icon: "el-icon-upload2"
          }
        ];
      }
    },
    mounted() {
      //人事总务部长和工资计算担当
      if (this.role === '0') {
        this.description = true;
        this.groupid = this.$store.getters.userinfo.userinfo.groupid;
      }
      this.loading = true;
      this.$store
        .dispatch("PFANS2027Store/getOne", {
          lunarbonus_id: this.$route.params._id
        })
        .then(response => {
          this.data = response.lunarbonus;
          if (response.lunarbonus.status === 4) {
            this.disabled = false;
          }
          if (response.lunarbasic.length > 0) {
            this.data2 = response.lunarbasic;
          }
          if (response.lunardetail) {
            for (let item of response.lunardetail) {
              let userinfo = getUserInfo(item.user_id);
              if (userinfo) {
                item.userName = userinfo.userinfo.customername;
              }
              let dicinfo = getDictionaryInfo(item.rn);
              if (dicinfo) {
                item.rnName = dicinfo.value1;
                item.salary = dicinfo.value2;
              }
              let orgs = getOrgInfo(item.group_id);
              if (orgs) {
                item.groupName = orgs.companyname;
              }
              orgs = getOrgInfo(item.team_id);
              if (orgs) {
                item.teamName = orgs.companyname;
              }
              if (item.difference === "1") {
                item.differenceName = this.$t("label.PFANS2027VIEW_NEWSTAFF");
              } else if (item.difference === "2") {
                item.differenceName = this.$t("label.PFANS2027VIEW_OLDSTAFF");
              }

              item.enterdayFormat = moment(item.enterday).format("YYYY-MM-DD");


              if (this.role === '0') {
                this.R *= 0;
              } else {
                if (this.role1 === '0' && item.process === "4") {
                  this.R *= 1;
                } else if (this.role1 === '0' && item.process !== "4") {
                  this.R *= 0;
                } else {
                  if (this.$route.params.evaluatenum === "一次評価") {
                    if (item.process === "1") {
                      this.R *= 1;
                    } else {
                      this.R *= 0;
                    }
                  } else if (this.$route.params.evaluatenum === "二次評価") {
                    if (item.process === "2") {
                      this.R *= 1;
                    } else {
                      this.R *= 0;
                    }
                  } else if (this.$route.params.evaluatenum === "最终評価") {
                    if (item.process === "3") {
                      this.R *= 1;
                    } else {
                      this.R *= 0;
                    }
                  }
                }
              }
              this.course();
            }


            this.listData1 = response.lunardetail.sort();
          }
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
          this.$message.error({
            message: err,
            type: "error",
            duration: 5 * 1000
          });
        });
    },
    methods: {
      // 判断是否可以提交
      course() {
        if (this.R === 0 ) {
          this.buttonList[1].disabled = true;
        } else if (this.R === 1) {
          this.buttonList[1].disabled = false;
        }
      },
      // 判断是否可以更改数据（上一级未提交的数据不可更改）
      getdisabled(scope) {
        if (this.$route.params.disabled1 === false) {
          if (this.role === '0' && scope.process === "0") {
            return false;
          } else {
            if (scope.prize === "无") {
              return true;
            } else {
              if (this.role === '0' && scope.process === "4") {
                return false;
              } else {
                if (this.$route.params.evaluatenum === "一次評価" && scope.process === "1") {
                  return false;
                } else if (this.$route.params.evaluatenum === "二次評価" && scope.process === "2") {
                  return false;
                } else if (this.$route.params.evaluatenum === "最终評価" && scope.process === "3") {
                  return false;
                } else {
                  return true;
                }
              }
            }
          }
        } else {
          return true;
        }
      },
      setdisabled(val) {
        if (this.$route.params.disabled) {
          this.disabled = val;
        }
      },
      formatter(row, column) {
        if (column.property === "title3") {
          if (row.code) {
            let dic = getDictionaryInfo(row.code);
            if (dic) {
              return dic.value1;
            } else {
              return "";
            }
          }
        }
        if (column.property === "title4T1") {
          if (row.code) {
            let dic = getDictionaryInfo(row.code);
            if (dic) {
              return dic.value2;
            } else {
              return "";
            }
          }
        }
        if (column.property === "title4T2") {
          if (row.code) {
            let dic = getDictionaryInfo(row.code);
            if (dic) {
              return dic.value3;
            } else {
              return "";
            }
          }
        }
        if (column.property === "title4T3") {
          if (row.code) {
            let dic = getDictionaryInfo(row.code);
            if (dic) {
              return dic.value4;
            } else {
              return "";
            }
          }
        }
        if (column.property === "title4T4") {
          if (row.code) {
            let dic = getDictionaryInfo(row.code);
            if (dic) {
              return dic.value5;
            } else {
              return "";
            }
          }
        }
        if (column.property === "title4T5") {
          if (row.code) {
            let dic = getDictionaryInfo(row.code);
            if (dic) {
              return dic.value6;
            } else {
              return "";
            }
          }
        }
        if (column.property === "title4T6") {
          if (row.code) {
            let dic = getDictionaryInfo(row.code);
            if (dic) {
              return dic.value7;
            } else {
              return "";
            }
          }
        }
        if (column.property === "title4T7") {
          if (row.code) {
            let dic = getDictionaryInfo(row.code);
            if (dic) {
              return dic.value8;
            } else {
              return "";
            }
          }
        }
        if (column.property === "title4T8") {
          if (row.code) {
            let dic = getDictionaryInfo(row.code);
            if (dic) {
              return dic.value9;
            } else {
              return "";
            }
          }
        }
      },
      hanldeScroll(e) {
        const boxHeight = document.getElementById('eagleMapContainer').offsetHeight
        const tableHeight = document.getElementById('table_list').offsetHeight
        if (tableHeight - (e.target.scrollTop + boxHeight) < 50 && !this.loading && this.listPage < (this.tableList.length / 300)) {
          if (!this.scrollTop) {
            this.scrollTop = e.target.scrollTop
          }
          this.queryMoreStat(true, tableHeight, boxHeight)
        } else if (e.target.scrollTop === 0 && !this.loading) {
          this.queryMoreStat(false, tableHeight, boxHeight)
        }
      },
      queryMoreStat(type, tableHeight, boxHeight) {
        this.loading = true
        // 触底加载
        if (type) {
          this.listPage = this.listPage + 1
          const centerPage = this.listPage * 500
          const startPage = centerPage >= 500 ? centerPage - 500 : centerPage
          const endPage = centerPage + 1000
          const newList = this.tableList.slice(startPage, endPage)
          if (this.listPage > 0) {
            const box = document.getElementById('eagleMapContainer')
            box.scrollTop = this.scrollTop + 50
          }
          this.list = newList
        } else {
          // 置顶加载
          if (this.listPage > 0) {
            this.listPage = this.listPage - 1
            const centerPage = this.listPage * 500
            const startPage = centerPage >= 500 ? centerPage - 500 : centerPage
            const endPage = centerPage + 1000
            const newList = this.tableList.slice(startPage, endPage)
            if (this.listPage > 0) {
              const box = document.getElementById('eagleMapContainer')
              box.scrollTop = tableHeight - this.scrollTop - boxHeight
            }
            this.list = newList
          } else {
            this.list = this.tableList.slice(0, 100)
          }
        }
        this.$nextTick(() => {
          this.$refs.eltable1.doLayout();
          this.loading = false
        })
      },
      rowheight({row, column, rowIndex, columnIndex}) {
        let val = row[column.columnKey];
        return "row_height_left";
      },
      spanmethod2({row, column, rowIndex, columnIndex}) {
        if (
          columnIndex === 0 ||
          columnIndex === 12 ||
          columnIndex === 14 ||
          columnIndex === 16 ||
          columnIndex === 18 ||
          columnIndex === 20
        ) {
          if (rowIndex === 0) {
            return {
              rowspan: 4,
              colspan: 1
            };
          } else if (rowIndex === 4) {
            return {
              rowspan: 4,
              colspan: 1
            };
          } else if (rowIndex === 8) {
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
      //人事用【本部、全部】数据筛选
      changed(val){
        this.region = val;
        if (this.ShowType === "PJ101004") {
          if(val === '2'){
            this.data1 = this.listData1.filter(item => item.rn <= "PR021003" && item.group_id === this.groupid);
          }
          else{
            this.data1 = this.listData1.filter(item => item.rn <= "PR021003");
          }
          this.showState = false;
        } else if (this.ShowType === "PJ101003") {
          this.showState = false;
          if(val === '2'){
            this.data1 = this.listData1.filter(
              item =>
                (item.rn === "PR021004" ||
                item.rn === "PR021005" ||
                (item.rn >= "PR021006" && item.occupationtype === "PR055001")) && item.group_id === this.groupid

            );
          }
          else{
            this.data1 = this.listData1.filter(
              item =>
                item.rn === "PR021004" ||
                item.rn === "PR021005" ||
                (item.rn >= "PR021006" && item.occupationtype === "PR055001")

            );
          }
        } else if (this.ShowType === "PJ101002") {
          this.showState = true;
          if(val === '2'){
            this.data1 = this.listData1.filter(
              item => item.rn >= "PR021006" && item.occupationtype === "PR055002" && item.group_id === this.groupid
            );
          }
          else{
            this.data1 = this.listData1.filter(
              item => item.rn >= "PR021006" && item.occupationtype === "PR055002"
            );
          }
        } else if (this.ShowType === "PJ101001") {
          this.showState = true;
          if(val === '2'){
            this.data1 = this.listData1.filter(
              item => item.rn >= "PR021006" && item.occupationtype === "PR055003" && item.group_id === this.groupid
            );
          }
          else{
            this.data1 = this.listData1.filter(
              item => item.rn >= "PR021006" && item.occupationtype === "PR055003"
            );
          }
        }
        this.isShow = false;
        this.$nextTick(() => {
          this.isShow = true;
        });
      },
      changeType(val) {
        this.ShowType = val;
        if (this.ShowType === "PJ101004") {
          if(this.region === '2'){
            this.data1 = this.listData1.filter(item => item.rn <= "PR021003" && item.group_id === this.groupid);
          }
          else{
            this.data1 = this.listData1.filter(item => item.rn <= "PR021003");
          }
          this.showState = false;
        } else if (this.ShowType === "PJ101003") {
          this.showState = false;
          if(this.region === '2'){
            this.data1 = this.listData1.filter(
              item =>
                (item.rn === "PR021004" ||
                item.rn === "PR021005" ||
                (item.rn >= "PR021006" && item.occupationtype === "PR055001")) && item.group_id === this.groupid

            );
          }
          else{
            this.data1 = this.listData1.filter(
              item =>
                item.rn === "PR021004" ||
                item.rn === "PR021005" ||
                (item.rn >= "PR021006" && item.occupationtype === "PR055001")

            );
          }
        } else if (this.ShowType === "PJ101002") {
          this.showState = true;
          if(this.region === '2'){
            this.data1 = this.listData1.filter(
              item => item.rn >= "PR021006" && item.occupationtype === "PR055002" && item.group_id === this.groupid
            );
          }
          else{
            this.data1 = this.listData1.filter(
              item => item.rn >= "PR021006" && item.occupationtype === "PR055002"
            );
          }
        } else if (this.ShowType === "PJ101001") {
          this.showState = true;
          if(this.region === '2'){
            this.data1 = this.listData1.filter(
              item => item.rn >= "PR021006" && item.occupationtype === "PR055003" && item.group_id === this.groupid
            );
          }
          else{
            this.data1 = this.listData1.filter(
              item => item.rn >= "PR021006" && item.occupationtype === "PR055003"
            );
          }
        }
        this.isShow = false;
        this.$nextTick(() => {
          this.isShow = true;
        });
      },
      buttonClick(val) {
        if (val === 'save') {
          let form = {
            lunarbasic: this.data2,
            lunarbonus: this.data,
            lunardetail: this.listData1
          };
          this.loading = true;
          this.$store
            .dispatch("PFANS2027Store/update", form)
            .then(response => {
              Message({
                message: this.$t("normal.success_02"),
                type: "success",
                duration: 5 * 1000
              });
              if (this.$store.getters.historyUrl) {
                this.$router.push(this.$store.getters.historyUrl);
              }
            })
            .catch(err => {
              this.loading = false;
              this.$message.error({
                message: err,
                type: "error",
                duration: 5 * 1000
              });
            });
        }
        if (val === 'commit') {
          let lunarbonus = {
            lunarbonus_id: this.$route.params._id,
            evaluatenum: this.$route.params.evaluatenum,
          };
          this.$confirm(this.$t('normal.confirm_iscontinue2'), this.$t('normal.info'), {
            confirmButtonText: this.$t('button.confirm'),
            cancelButtonText: this.$t('button.cancel'),
            type: 'warning',
          }).then(() => {
            this.$store
              .dispatch("PFANS2027Store/createTodonotice",lunarbonus)
              .then(response => {
                // this.data = response;
                this.loading = false;
                Message({
                  message: this.$t('normal.success_03'),
                  type: 'success',
                  duration: 5 * 1000,
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
                this.loading = false;
              });
          }).catch(() => {
            this.$message.info({
              type: 'info',
              message: this.$t('normal.confirm_tipis'),
            });
          });
        }
      },
      getTableColumnName(val) {
        let dic = getDictionaryInfo(val);
        if (dic) {
          return dic.value1;
        } else {
          return "";
        }
      },
      getResult() {
        for (let item of this.data1) {
          item.overallscore = Math.round(
            ((((Number(item.tatebai) +
              Number(item.satoshi) +
              Number(item.organization) +
              Number(item.systematics)) *
              this.rate1) /
              100 +
              ((Number(item.manpower) +
                Number(item.scale) +
                Number(item.achievement) +
                Number(item.degree)) *
                this.rate2) /
              100 +
              ((Number(item.assignment) +
                Number(item.teamwork) +
                Number(item.humandevelopment) +
                Number(item.workattitude)) *
                this.rate3) /
              100) *
              80) /
            17
          );

          if (item.overallscore < 20) {
            item.commentaryresult = "H";
          } else if (item.overallscore < 40) {
            item.commentaryresult = "G";
          } else if (item.overallscore < 64) {
            item.commentaryresult = "F";
          } else if (item.overallscore < 72) {
            item.commentaryresult = "E";
          } else if (item.overallscore < 80) {
            item.commentaryresult = "D";
          } else if (item.overallscore < 88) {
            item.commentaryresult = "C";
          } else if (item.overallscore < 104) {
            item.commentaryresult = "B";
          } else {
            item.commentaryresult = "A";
          }

          if (this.data.status != 4) {
            item.firstmonth = item.commentaryresult;
            item.secondmonth = item.commentaryresult;
            item.thirdmonth = item.commentaryresult;
          }
        }
      },
      //upd 审批流程 fr
      // start(val) {
      //   this.data.status = '2';
      //   this.buttonClick("update");
      // },
      start(val) {
        if (val.state === '0') {
          this.data.status = '2';
        } else if (val.state === '2') {
          this.data.status = '4';
        }
        this.buttonClick();
      },
      //upd 审批流程 to
      end() {
        this.data.status = "4";
        this.buttonClick();
      },
      workflowState(val) {
        if (val.state === "1") {
          this.data.status = "3";
        } else if (val.state === "2") {
          this.data.status = "4";
        }
        this.buttonClick();
      },
    },
    watch: {
      data1: {
        handler() {
          this.getResult();
        },
        immediate: true, //刷新加载 立马触发一次handler
        deep: true // 可以深度检测到 person 对象的属性值的变化
      },
      data2: {
        handler() {
          for (let i = 0; i < this.data2.length; i++) {
            if (i === 0 || i === 4 || i === 8) {
              this.data2[i + 1].r5rate = this.data2[i].r5rate;
              this.data2[i + 2].r5rate = this.data2[i].r5rate;
              this.data2[i + 3].r5rate = this.data2[i].r5rate;

              this.data2[i + 1].r6rate = this.data2[i].r6rate;
              this.data2[i + 2].r6rate = this.data2[i].r6rate;
              this.data2[i + 3].r6rate = this.data2[i].r6rate;

              this.data2[i + 1].r81rate = this.data2[i].r81rate;
              this.data2[i + 2].r81rate = this.data2[i].r81rate;
              this.data2[i + 3].r81rate = this.data2[i].r81rate;

              this.data2[i + 1].r82rate = this.data2[i].r82rate;
              this.data2[i + 2].r82rate = this.data2[i].r82rate;
              this.data2[i + 3].r82rate = this.data2[i].r82rate;

              this.data2[i + 1].r83rate = this.data2[i].r83rate;
              this.data2[i + 2].r83rate = this.data2[i].r83rate;
              this.data2[i + 3].r83rate = this.data2[i].r83rate;
            }
          }
        },
        immediate: true, //刷新加载 立马触发一次handler
        deep: true // 可以深度检测到 person 对象的属性值的变化
      },
      rate1() {
        this.getResult();
      },
      rate2() {
        this.getResult();
      },
      rate3() {
        this.getResult();
      }
    },
    computed: {
      getRate1() {
        this.rate1 =
          this.ShowType === "PJ101004"
            ? this.data2[0].r5rate
            : this.ShowType === "PJ101003"
            ? this.data2[0].r6rate
            : this.ShowType === "PJ101002"
              ? this.data2[0].r81rate
              : this.ShowType === "PJ101001"
                ? this.data2[0].r83rate
                : 0;
        return this.rate1;
      },
      getRate2() {
        this.rate2 =
          this.ShowType === "PJ101004"
            ? this.data2[4].r5rate
            : this.ShowType === "PJ101003"
            ? this.data2[4].r6rate
            : this.ShowType === "PJ101002"
              ? this.data2[4].r81rate
              : this.ShowType === "PJ101001"
                ? this.data2[4].r83rate
                : 0;
        return this.rate2;
      },
      getRate3() {
        this.rate3 =
          this.ShowType === "PJ101004"
            ? this.data2[8].r5rate
            : this.ShowType === "PJ101003"
            ? this.data2[9].r6rate
            : this.ShowType === "PJ101002"
              ? this.data2[10].r81rate
              : this.ShowType === "PJ101001"
                ? this.data2[11].r83rate
                : 0;
        return this.rate3;
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  .dpSupIndex {
    .row_height_left {
      height: 40px;
      font-size: 0.75rem;
      padding: 0px;
      text-align: left;
      background-color: transparent !important;
    }
  }
  #eagleMapContainer{
    overflow-y: auto;
    margin-top: 10px;
    min-height: 150px;
    max-height: 600px;
  }
  #eagleMapContainer::-webkit-scrollbar {
    width: 6px; /*对垂直流动条有效*/
    height: 6px;
  }
  #eagleMapContainer::-webkit-scrollbar-track{
    background-color:rgba(0,0,0,0.1);
  }
  #eagleMapContainer::-webkit-scrollbar-thumb{
    border-radius: 6px;
    background-color: rgba(0,0,0,0.2);
  }
  /*定义右下角汇合处的样式*/
  #eagleMapContainer::-webkit-scrollbar-corner {
    background:rgba(0,0,0,0.2);
  }

</style>
