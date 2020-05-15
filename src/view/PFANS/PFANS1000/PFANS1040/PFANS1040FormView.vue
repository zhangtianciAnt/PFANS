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
      :workflowCode="workflowCode"
      ref="container"
    >
      <div slot="customize">
        <el-form label-position="top" label-width="8vw" ref="refform" :model="refform" :rules="rules"
                 style="padding: 2vw">
          <el-tabs @tab-click="handleClick" v-model="activeName" type="border-card">

            <el-row style="padding-top: 2%;padding-bottom: 2%">
              <el-col :span="6">
                <el-form-item :label="$t('label.PFANS1036FORMVIEW_BUSINESSYEAR')" prop="year" :error="erroryear">
                  <div class="block">
                    <el-date-picker
                      type="year"
                      @change="yearChange"
                      :disabled="disabledT"
                      style="width: 18vw"
                      v-model="refform.year">
                    </el-date-picker>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item :label="$t('label.PFANS1039FORMVIEW_GROUP')" :error="errorgroup" prop="group">
                  <el-select v-model="refform.group_id" style="width: 20vw" :disabled="disabledT"
                             @change="groupChange">
                    <el-option
                      v-for="item in grp_options"
                      :key="item.value"
                      :label="item.lable"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-table :data="tableDataA" max-height="400" tooltip-effect="dark" :row-class-name="rowClass"
                      highlight-current-row stripe border :header-cell-style="getHeaderClass"
                      row-key="rowid"
                      style="width: 100%"
                      border
                      lazy
                      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
              <el-table-column fixed
                               type="index">
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_PLAN')"
                               prop="code3"
                               align="center"
                               fixed
                               width="100">
                <template slot-scope="scope">
                  {{scope.row.type == '1'? $t('label.PFANS1039FORMVIEW_PLAN'):$t('label.PFANS1039FORMVIEW_PROSPECTS')}}
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_THEME')" fixed
                               align="center" width="230">
                <template slot-scope="scope">
                  <el-input :disabled="setDisabled(scope.row)" maxlength="100" style="width: 100%"
                            v-model="scope.row.themename"></el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.date')" fixed
                               align="center" width="125">
                <template slot-scope="scope">
                  <el-date-picker
                    v-model="scope.row.month"
                    type="month"
                    style="width:8vw"
                    :disabled="true"
                    size="small"
                    v-if="scope.row.type === '2'">
                  </el-date-picker>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.remarks')" align="center" width="230">
                <template slot-scope="scope">
                  <el-input :disabled="setDisabled(scope.row)" maxlength="100" style="width: 100%"
                            v-model="scope.row.remarks"></el-input>
                </template>
              </el-table-column>

              <!--分野-->
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_TEAM')" align="center" width="230">
                <template slot-scope="scope">
                  <dicselect
                    :code="code3"
                    :data="scope.row.branch"
                    :disabled="setDisabled(scope.row)"
                    :no="scope.row"
                    @change="getBranch"
                  ></dicselect>
                </template>
              </el-table-column>
              <!--种类-->
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_KIND')" align="center" width="150">
                <template slot-scope="scope">
                  <dicselect
                    :code="code4"
                    :data="scope.row.kind"
                    :disabled="true"
                    :no="scope.row"
                    @change="getKind"
                  ></dicselect>
                </template>
              </el-table-column>
              <!--契約形式-->
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_CONTRACTTYPE')" align="center" width="190">
                <template slot-scope="scope">
                  <dicselect
                    :code="code5"
                    :data="scope.row.contracttype"
                    :disabled="setDisabled(scope.row)"
                    :no="scope.row"
                    @change="getContractType"
                  ></dicselect>
                </template>
              </el-table-column>
              <!--通貨種別-->
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_CURRENCYTYPE')" align="center" width="200">
                <template slot-scope="scope">
                  <el-select :no="scope.row" v-model="scope.row.currencytype"
                             @change="(val)=>{getCurrencyType(val,scope.row)}" style="width: 11rem"
                             :disabled="setDisabled(scope.row)">
                    <el-option
                      v-for="item in currency_options"
                      :key="item.value"
                      :label="item.lable"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <!--委託元-->
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_ASSIGNOR')" align="center" width="210"
                               :error="errorcusto">
                <template slot-scope="scope">
                  <el-form-item>
                    <div >
                      <el-input class="content bg"
                                :disabled="setDisabled(scope.row)"
                                v-if="scope.row.show"
                                v-model="scope.row.assignor">
                        <el-button :disabled="setDisabled(scope.row)" size="small" slot="append" icon="el-icon-search"
                                   @click="handleClickA(scope.row)"></el-button>
                      </el-input>

                      <org :disabled="setDisabled(scope.row)" :no="scope.row" :orglist="scope.row.assignor"
                           @getOrgids="getAssignor"
                           orgtype="2" v-if="scope.row.showG"></org>
                    </div>
                  </el-form-item>
                  <el-dialog :visible.sync="dialogVisibleA"
                             top="8vh"
                             append-to-body>
                    <el-table :data="dataA" :row-key="row_id" @row-click="rowClick" max-height="400"
                              ref="roletableA">
                      <el-table-column property="custchinese" :label="$t('label.PFANS5001FORMVIEW_CUSTOMERNAME')"
                                       width="120"></el-table-column>
                      <el-table-column property="thecompany" :label="$t('label.PFANS6003FORMVIEW_THECOMPANY')"
                                       width="120"></el-table-column>
                      <el-table-column property="liableperson" :label="$t('label.ASSETS1002VIEW_USERID')"
                                       width="120"></el-table-column>
                      <el-table-column property="prochinese" :label="$t('label.PFANS6002FORMVIEW_PROJECTPERSON')"
                                       width="120"></el-table-column>
                      <el-table-column property="protelephone"
                                       :label="$t('label.PFANS2003FORMVIEW_CONTACTINFORMATION')"
                                       width="120"></el-table-column>
                    </el-table>
                  </el-dialog>
                </template>
              </el-table-column>

              <!--上一年度后三个月的数据-->
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_19January')"
                               align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="80">
                  <template slot-scope="scope">
                    <el-input :disabled="true" maxlength="20" style="width: 100%"
                              v-model="scope.row.personnel191"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="190">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.amount191" controls-position="right"
                                     style="width: 100%" :disabled="true"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_19February')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="80">
                  <template slot-scope="scope">
                    <el-input :disabled="true" maxlength="20" style="width: 100%"
                              v-model="scope.row.personnel192"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="190">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.amount192" controls-position="right"
                                     style="width: 100%" :disabled="true"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_19March')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="80">
                  <template slot-scope="scope">
                    <el-input :disabled="true" maxlength="20" style="width: 100%"
                              v-model="scope.row.personnel193"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="180">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.amount193" controls-position="right"
                                     style="width: 100%" :disabled="true"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>

              <!--本事业年度-->
              <el-table-column :label="$t('label.April')" align="center" width="280">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="80">
                  <template slot-scope="scope">
                    <el-input :disabled="scope.row.type === '2' ? setDisabled(scope.row)? true:arrays[0].disabled : setDisabled(scope.row)" maxlength="20" style="width: 100%"
                              v-model="scope.row.personnel4"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="180">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.amount4" controls-position="right"
                                     style="width: 100%" :disabled="scope.row.type === '2' ? setDisabled(scope.row)? true:arrays[0].disabled : setDisabled(scope.row)"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.May')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="80">
                  <template slot-scope="scope">
                    <el-input :disabled="scope.row.type === '2' ? setDisabled(scope.row)? true:arrays[1].disabled : setDisabled(scope.row)" maxlength="20" style="width: 100%"
                              v-model="scope.row.personnel5"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="180">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.amount5" controls-position="right"
                                     style="width: 100%" :disabled="scope.row.type === '2' ? setDisabled(scope.row)? true:arrays[1].disabled : setDisabled(scope.row)"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.June')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="80">
                  <template slot-scope="scope">
                    <el-input :disabled="scope.row.type === '2' ? setDisabled(scope.row)? true:arrays[2].disabled : setDisabled(scope.row)" maxlength="20" style="width: 100%"
                              v-model="scope.row.personnel6"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="180">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.amount6" controls-position="right"
                                     style="width: 100%" :disabled="scope.row.type === '2' ? setDisabled(scope.row)? true:arrays[2].disabled : setDisabled(scope.row)"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.July')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="80">
                  <template slot-scope="scope">
                    <el-input :disabled="scope.row.type === '2' ? setDisabled(scope.row)? true:arrays[3].disabled : setDisabled(scope.row)" maxlength="20" style="width: 100%"
                              v-model="scope.row.personnel7"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="190">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.amount7" controls-position="right"
                                     style="width: 100%" :disabled="scope.row.type === '2' ? setDisabled(scope.row)? true:arrays[3].disabled : setDisabled(scope.row)"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.August')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="80">
                  <template slot-scope="scope">
                    <el-input :disabled="scope.row.type === '2' ? setDisabled(scope.row)? true:arrays[4].disabled : setDisabled(scope.row)" maxlength="20" style="width: 100%"
                              v-model="scope.row.personnel8"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="190">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.amount8" controls-position="right"
                                     style="width: 100%" :disabled="scope.row.type === '2' ? setDisabled(scope.row)? true:arrays[4].disabled : setDisabled(scope.row)"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.September')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="80">
                  <template slot-scope="scope">
                    <el-input :disabled="scope.row.type === '2' ? setDisabled(scope.row)? true:arrays[5].disabled : setDisabled(scope.row)" maxlength="20" style="width: 100%"
                              v-model="scope.row.personnel9"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="190">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.amount9" controls-position="right"
                                     style="width: 100%" :disabled="scope.row.type === '2' ? setDisabled(scope.row)? true:arrays[5].disabled : setDisabled(scope.row)"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.October')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="80">
                  <template slot-scope="scope">
                    <el-input :disabled="scope.row.type === '2' ? setDisabled(scope.row)? true:arrays[6].disabled : setDisabled(scope.row)" maxlength="20" style="width: 100%"
                              v-model="scope.row.personnel10"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="190">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.amount10" controls-position="right"
                                     style="width: 100%" :disabled="scope.row.type === '2' ? setDisabled(scope.row)? true:arrays[6].disabled : setDisabled(scope.row)"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.November')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="80">
                  <template slot-scope="scope">
                    <el-input :disabled="scope.row.type === '2' ? setDisabled(scope.row)? true:arrays[7].disabled : setDisabled(scope.row)" maxlength="20" style="width: 100%"
                              v-model="scope.row.personnel11"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="190">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.amount11" controls-position="right"
                                     style="width: 100%" :disabled="scope.row.type === '2' ? setDisabled(scope.row)? true:arrays[7].disabled : setDisabled(scope.row)"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.December')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="80">
                  <template slot-scope="scope">
                    <el-input :disabled="scope.row.type === '2' ? setDisabled(scope.row)? true:arrays[8].disabled : setDisabled(scope.row)" maxlength="20" style="width: 100%"
                              v-model="scope.row.personnel12"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="190">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.amount12" controls-position="right"
                                     style="width: 100%" :disabled="scope.row.type === '2' ? setDisabled(scope.row)? true:arrays[8].disabled : setDisabled(scope.row)"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.January')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="80">
                  <template slot-scope="scope">
                    <el-input :disabled="scope.row.type === '2' ? setDisabled(scope.row)? true:arrays[9].disabled : setDisabled(scope.row)" maxlength="20" style="width: 100%"
                              v-model="scope.row.personnel1"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="190">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.amount1" controls-position="right"
                                     style="width: 100%" :disabled="scope.row.type === '2' ? setDisabled(scope.row)? true:arrays[9].disabled : setDisabled(scope.row)"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.February')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="80">
                  <template slot-scope="scope">
                    <el-input :disabled="scope.row.type === '2' ? setDisabled(scope.row)? true:arrays[10].disabled : setDisabled(scope.row)" maxlength="20" style="width: 100%"
                              v-model="scope.row.personnel2"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="190">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.amount2" controls-position="right"
                                     style="width: 100%" :disabled="scope.row.type === '2' ? setDisabled(scope.row)? true:arrays[10].disabled : setDisabled(scope.row)"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.March')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_PERSONNEL')" align="center" width="80">
                  <template slot-scope="scope">
                    <el-input :disabled="scope.row.type === '2' ? setDisabled(scope.row)? true:arrays[11].disabled : setDisabled(scope.row)" maxlength="20" style="width: 100%"
                              v-model="scope.row.personnel3"></el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_AMOUNT')" align="center" width="190">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.amount3" controls-position="right"
                                     style="width: 100%" :disabled="scope.row.type === '2' ? setDisabled(scope.row)? true:arrays[11].disabled : setDisabled(scope.row)"
                                     :min="0" :max="10000000000" :precision="2">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.operation')" align="center" width="200">
                <template slot-scope="scope">
                  <el-button
                    :disabled="setDisabled(scope.row)"
                    @click.native.prevent="deleteRowF(scope.$index, tableDataA)"
                    plain
                    size="small"
                    type="danger"
                  >{{$t('button.delete')}}
                  </el-button>
                  <el-button
                    :disabled="setDisabledbt(scope.row)"
                    @click="addRowtableDataA(scope.$index,scope.row)"
                    plain
                    size="small"
                    type="primary"
                  >{{$t('button.insert')}}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tabs>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
    import EasyNormalContainer from '@/components/EasyNormalContainer';
    import EasyWorkFlow from '@/components/EasyWorkFlow';
    import {Message} from 'element-ui';
    import dicselect from '../../../components/dicselect';
    import {getCurrentRole, getDictionaryInfo, getDownOrgInfo, getUpOrgInfo,getUserInfo} from '@/utils/customize';
    import org from '../../../components/org';
    import moment from 'moment';

    export default {
        name: 'PFANS1040FormView',
        components: {
            EasyNormalContainer,
            EasyWorkFlow,
            dicselect,
            org,
        },
        data() {
            return {
                errorcusto: '',
                erroryear: '',
                errorgroup: '',
                grp_options: [],
                currency_options: [],
                // loadingflg: '0',
                dialogVisibleA: false,
                recordData: [],
                dataA: [],
                row_id: '',
                // show2: false,
                title: 'title.PFANS1040VIEW',
                activeName: 'plan',
                workflowCode: '',
                status: '0',
                loading: false,
                disabledT: false,
                disabled: false,
                // refform: {},
                refform: {
                    themeplan_id: '',
                    year: '',
                    month: '',
                    group_id: '',
                    center_id: '',
                    region: '',
                },
                rules: {
                    year: [
                        {
                            required: true,
                            message:
                                this.$t('normal.error_08') +
                                this.$t('label.PFANS1036FORMVIEW_BUSINESSYEAR'),
                            trigger: 'blur',
                        },
                    ],
                    group_id: [
                        {
                            required: true,
                            message:
                                this.$t('normal.error_09') +
                                this.$t('label.PFANS1039FORMVIEW_GROUP'),
                            trigger: 'change',
                        },
                    ],
                    // themename: [
                    //   {
                    //     required: true,
                    //     message:
                    //       this.$t('normal.error_08') +
                    //       this.$t('label.PFANS1039FORMVIEW_THEME'),
                    //     trigger: 'change',
                    //   },
                    // ],
                },
                arrays: [
                    {disabled: true},
                    {disabled: true},
                    {disabled: true},
                    {disabled: true},
                    {disabled: true},
                    {disabled: true},
                    {disabled: true},
                    {disabled: true},
                    {disabled: true},
                    {disabled: true},
                    {disabled: true},
                    {disabled: true},
                ],
                buttonList: [
                    {
                        key: 'save',
                        name: 'button.save',
                        disabled: false,
                        icon: 'el-icon-check',
                    },
                ],
                themeplan: [{
                    themeplan_id: '',
                    center_id: '',
                    group_id: '',
                    year: '',
                    type: '0',
                }],
                tableB: [],
                tableA: [
                    {
                        themeplan_id: '',
                        themeplandetail_id: '',
                        center_id: '',
                        group_id: '',
                        month: '',
                        year: '',
                        theme_id: '',
                        themename: '',
                        remarks: '',
                        branch: '',
                        kind: 'PJ064001',
                        contracttype: '',
                        currencytype: '',
                        assignor: '',
                        personnel191: '',
                        amount191: '',
                        personnel192: '',
                        amount192: '',
                        personnel193: '',
                        amount193: '',
                        personnel4: '',
                        amount4: '',
                        personnel5: '',
                        amount5: '',
                        personnel6: '',
                        amount6: '',
                        personnel7: '',
                        amount7: '',
                        personnel8: '',
                        amount8: '',
                        personnel9: '',
                        amount9: '',
                        personnel10: '',
                        amount10: '',
                        personnel11: '',
                        amount11: '',
                        personnel12: '',
                        amount12: '',
                        personnel1: '',
                        amount1: '',
                        personnel2: '',
                        amount2: '',
                        personnel3: '',
                        amount3: '',
                        type: '0',
                        rowindex: '',
                        status: '0',
                        show: false,
                        showG: false,
                    },
                ],
                baseInfo: [],
                code3: 'PJ063',
                code4: 'PJ064',
                code5: 'PJ065',
                code7: ' ',
                canStart: false,
                tableDataAcount:1,
                tableDataA: [
                    {
                        rowid:'0',
                        themeplantype: this.$t('label.PFANS1039FORMVIEW_PROSPECTS'),
                        themeplan_id: '',
                        themeplandetail_id: '',
                        pthemeplandetail_id: '',
                        center_id: '',
                        group_id: '',
                        month: '',
                        year: '',
                        theme_id: '',
                        themename: '',
                        remarks: '',
                        branch: '',
                        kind: 'PJ064001',
                        contracttype: '',
                        currencytype: '',
                        assignor: '',
                        personnel191: '',
                        amount191: '',
                        personnel192: '',
                        amount192: '',
                        personnel193: '',
                        amount193: '',
                        personnel4: '',
                        amount4: '',
                        personnel5: '',
                        amount5: '',
                        personnel6: '',
                        amount6: '',
                        personnel7: '',
                        amount7: '',
                        personnel8: '',
                        amount8: '',
                        personnel9: '',
                        amount9: '',
                        personnel10: '',
                        amount10: '',
                        personnel11: '',
                        amount11: '',
                        personnel12: '',
                        amount12: '',
                        personnel1: '',
                        amount1: '',
                        personnel2: '',
                        amount2: '',
                        personnel3: '',
                        amount3: '',
                        type: '1',
                        rowindex: '',
                        status: '0',
                        plantype: '0',
                        show: false,
                        showG: false,
                        children:[],
                    }
                ],
            };
        },
        mounted() {
            if (this.$route.params._id) {//查看，编辑
                this.loading = true;
                this.disabledT = true;
                this.$store
                    .dispatch('PFANS1040Store/getdetilList', {'themeplan_id': this.$route.params._id,'type': '1'})
                    .then(response => {
                        this.refform.themeplan_id = this.$route.params._id;
                        this.tableDataA = response;
                        if(this.tableDataA.length > 0){
                            this.refform.year = this.tableDataA[0].year;
                            this.refform.group_id = this.tableDataA[0].group_id;
                            this.refform.center_id = this.tableDataA[0].center_id;
                            for (var i = 0; i < this.tableDataA.length; i++) {
                                if(this.tableDataA[i].contracttype != ''){
                                    if(this.tableDataA[i].contracttype == 'PJ065001'){//外部委託
                                        this.tableDataA[i].show = true;
                                        this.tableDataA[i].showG = false;
                                    } else {//センター内委託 //社内委託
                                        this.tableDataA[i].show = false;
                                        this.tableDataA[i].showG = true;
                                    }
                                }
                                var monthCurrent = Number(moment(new Date()).format('MM'));
                                if(monthCurrent === 1){
                                    this.arrays[10].disabled = false;
                                    this.arrays[11].disabled = false;
                                }
                                else if(monthCurrent === 2){
                                    this.arrays[11].disabled = false;
                                }
                                else if(monthCurrent === 3){
                                }
                                else{
                                    for (var j = 0; j < 12; j++) {
                                        if (j > monthCurrent - 4) {
                                            this.arrays[j].disabled = false;
                                        }
                                    }
                                }
                                let letchildren = this.tableDataA[i].children;
                                if(letchildren.length > 0){
                                    for (var j = 0; j < letchildren.length; j++) {
                                        if(letchildren[j].month != ''){
                                            letchildren[j].month = this.refform.year + '-' + letchildren[j].month
                                        }
                                        if(letchildren[j].contracttype != ''){
                                            if(letchildren[j].contracttype == 'PJ065001'){//外部委託
                                                letchildren[j].show = true;
                                                letchildren[j].showG = false;
                                            } else {//センター内委託 //社内委託
                                                letchildren[j].show = false;
                                                letchildren[j].showG = true;
                                            }
                                        }
                                    }
                                }
                                else{
                                    if (this.tableDataA[0].status === '4') {
                                        let letchildren = {
                                            rowid:(this.tableDataAcount).toString(),
                                            themeplantype: this.$t('label.PFANS1039FORMVIEW_PROSPECTS'),
                                            themeplan_id: this.tableDataA[i].themeplan_id,
                                            themeplandetail_id: '',
                                            pthemeplandetail_id: this.tableDataA[i].themeplandetail_id,
                                            center_id: '',
                                            group_id: '',
                                            month: moment(new Date()).format('YYYY-MM'),
                                            year: '',
                                            theme_id: '',
                                            themename: '',
                                            remarks: '',
                                            branch: '',
                                            kind: 'PJ064001',
                                            contracttype: '',
                                            currencytype: '',
                                            assignor: '',
                                            personnel191: '',
                                            amount191: '',
                                            personnel192: '',
                                            amount192: '',
                                            personnel193: '',
                                            amount193: '',
                                            personnel4: '',
                                            amount4: '',
                                            personnel5: '',
                                            amount5: '',
                                            personnel6: '',
                                            amount6: '',
                                            personnel7: '',
                                            amount7: '',
                                            personnel8: '',
                                            amount8: '',
                                            personnel9: '',
                                            amount9: '',
                                            personnel10: '',
                                            amount10: '',
                                            personnel11: '',
                                            amount11: '',
                                            personnel12: '',
                                            amount12: '',
                                            personnel1: '',
                                            amount1: '',
                                            personnel2: '',
                                            amount2: '',
                                            personnel3: '',
                                            amount3: '',
                                            type: '2',
                                            rowindex: '',
                                            status: '0',
                                            show: false,
                                            showG: false,
                                        }
                                        this.tableDataA[i].children.push(letchildren);
                                        this.tableDataAcount = this.tableDataAcount + 1;
                                    }
                                }
                            }
                            if (this.tableDataA[0].status === '0' || this.tableDataA[0].status === '2' || this.tableDataA[0].status === '3') {
                                this.workflowCode = 'W0053';
                                this.canStart = true;
                            } else if (this.tableDataA[0].status === '4') {
                                this.workflowCode = 'W0052';
                                this.canStart = true;
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
                this.loading = true;
                this.disabledT = false;
                this.refform.year = parseInt(moment(new Date()).format('MM')) >= 4 ? parseInt(moment(new Date()).format('YYYY')) + 1 + '' : moment(new Date()).format('YYYY');
                this.refform.group_id = this.$route.params.group_id;
                this.refform.center_id = this.$route.params.center_id;
                this.tableA.group_id = this.$route.params.group_id;
                this.workflowCode = 'W0053';
                // this.getdata(this.year, '');
                this.loading = false;
            }
            //Set Group data
            this.getGroupOptions();
            this.getcustomerinfor();
        },
        created() {
            this.loading = true;
            this.disabled = this.$route.params.disabled;
            if(this.$route.params.plancount != undefined){
                this.tableDataAcount = Number(this.$route.params.plancount);
            }
            if (this.disabled) {
                this.buttonList = [];
            }
            //通貨種別
            const options = [];
            //美元
            let dic = getDictionaryInfo('PG019001');
            options.push(
                {
                    value: dic.code,
                    lable: dic.value1,
                },
            );
            //人民币
            dic = getDictionaryInfo('PG019003');
            options.push(
                {
                    value: dic.code,
                    lable: dic.value1,
                },
            );
            this.currency_options = options;
            this.loading = false;
        },
        methods: {
            getGroupOptions() {
                this.loading = true;
                let role = getCurrentRole();
                const options = [];
                if (role === '3') {//GM
                    options.push(
                        {
                            value: this.$store.getters.userinfo.userinfo.groupid,
                            lable: this.$store.getters.userinfo.userinfo.groupname,
                        },
                    );
                } else if (role === '2') {//Center长
                    if (this.$store.getters.userinfo.userid) {
                        let centerId = this.$store.getters.userinfo.userinfo.centerid;
                        let orgs = getDownOrgInfo(centerId);
                        if (orgs) {
                            for (let org of orgs) {
                                // console.log(org);
                                options.push(
                                    {
                                        value: org._id,
                                        lable: org.companyname,
                                    },
                                );
                            }
                        }
                    }
                } else if (role === '1') {//总经理
                    if (this.$store.getters.userinfo.userid) {
                        let centerId = this.$store.getters.userinfo.userinfo.centerid;
                        let orgs = getDownOrgInfo(centerId);
                        if (orgs) {
                            for (let center of orgs) {
                                let centers = getDownOrgInfo(center._id);
                                if (centers) {
                                    for (let group of centers) {
                                        options.push(
                                            {
                                                value: group._id,
                                                lable: group.companyname,
                                            },
                                        );
                                    }
                                }
                            }
                        }
                    }
                }
                const vote1 = [];
                if (this.$store.getters.userinfo.userid ==='5e78fefff1560b363cdd6db7'
                    || this.$store.getters.userinfo.userid ==='5e78b2254e3b194874180f31'
                    || this.$store.getters.userinfo.userid ==='5e78b2004e3b194874180e21'
                    || this.$store.getters.userinfo.userid ==='5e78b2064e3b194874180e4d')
                {
                    let centerId = '5e7858a08f4316308435112c';
                    let orgs = getDownOrgInfo(centerId);
                    if (orgs){
                        if(orgs.length > 0){
                            if(getDownOrgInfo(orgs[0]._id).length > 0){
                                this.group_id = getDownOrgInfo(orgs[0]._id)[0]._id;
                            }
                        }
                        for (let center of orgs) {
                            let centers = getDownOrgInfo(center._id);
                            if (centers){
                                for (let group of centers) {
                                    vote1.push(
                                        {
                                            value: group._id,
                                            lable: group.companyname,
                                        },
                                    );
                                }
                            }
                        }
                    }
                    this.grp_options = vote1;
                }
                else
                {
                    this.grp_options = options;
                }
                this.loading = false;
            },
            getcustomerinfor() {
                this.loading = true;
                this.$store
                    .dispatch('PFANS6002Store/getcustomerinfor2')
                    .then(response => {
                        for (let j = 0; j < response.length; j++) {
                            if (response[j].custchinese !== null && response[j].custchinese !== '') {
                                let custchinese = getUserInfo(response[j].custchinese);
                                if (custchinese) {
                                    response[j].custchinese = user.userinfo.customername;
                                }
                            }
                            if (response[j].liableperson !== null && response[j].liableperson !== '') {
                                let liableperson = getUserInfo(response[j].liableperson);
                                if (liableperson) {
                                    response[j].liableperson = user.userinfo.customername;
                                }
                            }
                            if (response[j].prochinese !== null && response[j].prochinese !== '') {
                                let prochinese = getUserInfo(response[j].prochinese);
                                if (prochinese) {
                                    response[j].prochinese = user.userinfo.customername;
                                }
                            }
                            if (response[j].protelephone !== null && response[j].protelephone !== '') {
                                let protelephone = getUserInfo(response[j].protelephone);
                                if (protelephone) {
                                    response[j].protelephone = user.userinfo.customername;
                                }
                            }
                            if (response[j].commontperson !== null && response[j].commontperson !== '') {
                                let commontperson = getUserInfo(response[j].commontperson);
                                if (commontperson) {
                                    response[j].commontperson = user.userinfo.customername;
                                }
                            }
                            if (response[j].comtelephone !== null && response[j].comtelephone !== '') {
                                let comtelephone = getUserInfo(response[j].comtelephone);
                                if (comtelephone) {
                                    response[j].comtelephone = user.userinfo.customername;
                                }
                            }
                            if (response[j].addchinese !== null && response[j].addchinese !== '') {
                                let addchinese = getUserInfo(response[j].addchinese);
                                if (addchinese) {
                                    response[j].addchinese = user.userinfo.customername;
                                }
                            }
                            if (response[j].perscale !== null && response[j].perscale !== '') {
                                let perscale = getDictionaryInfo(response[j].perscale);
                                if (perscale != null) {
                                    response[j].perscale = perscale.value1;
                                }
                            }
                        }
                        this.dataA = response;
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
            getdata(year, month) {
                let datainfo = {};
                if (year != '') {
                    datainfo = {'type': '1', 'year': year, 'months': ''};
                } else {
                    datainfo = {'type': '2', 'year': this.refform.months.substring(0, 4), 'months': this.refform.months};
                }
                this.loading = true;
                this.$store
                    .dispatch('PFANS1040Store/get', datainfo)
                    .then(response => {
                        // let con = response;
                        // for (let i = 0; i < con.length; i++) {
                        //   if (con[i].currencytype !== '' && con[i].currencytype !== null) {
                        //     con[i].currencytype = getDictionaryInfo(con[i].currencytype).value4;
                        //   }
                        // }
                        // if(this.code5 === 'PJ065001'){
                        //   this.show = true;
                        //   this.show1 = false;
                        //   this.show2 = false;
                        // } else if(this.code5 === 'PJ065002'){
                        //   this.show = false;
                        //   this.show1 = true;
                        //   this.show2 = false;
                        // } else if(this.code5 === 'PJ065003'){
                        //   this.show = false;
                        //   this.show1 = false;
                        //   this.show2 = true;
                        // }
                        if (response.length > 0) {
                            if (year != '') {
                                this.tableA = response;
                                if (this.tableA[0].status != '0') {
                                    this.disabled = true;
                                }
                            } else {
                                this.tableB = [];
                                this.tableB = response;
                                var monthCurrent = Number(this.refform.months.substr(5, 2));//Number(moment(new Date()).format('MM'));
                                for (var j = 0; j < 12; j++) {
                                    if (j > monthCurrent - 3) {
                                        this.arrays[j].disabled = false;
                                    }
                                }
                            }
                        } else {
                            if (year != '') {
                                this.tableA = [];
                                if (year === moment(new Date()).format('YYYY')) {
                                    this.addRowA();
                                }
                            } else {
                                this.tableB = [];
                                if (this.tableA.length > 0) {
                                    if (this.tableA[0].status === '4' && this.tableA[0].year === this.refform.months.substring(0, 4)) {
                                        this.disabled = true;
                                        this.tableB = this.tableA;
                                        var monthCurrent = Number(this.refform.months.substr(5, 2));
                                        for (var i = 0; i < 12; i++) {
                                            if (i > monthCurrent - 5) {
                                                this.arrays[i].disabled = false;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        // if(this.loadingflg === '1'){
                        //     this.loading = false;
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
            },
            handleClickA(row) {
                this.recordData = row;
                this.dialogVisibleA = true;
            },
            rowClick(row) {
                this.loading = true;
                this.recordData.assignor = row.custjapanese;
                //this.recordData.assignor = row.customerinfor_id;
                this.dialogVisibleA = false;
                this.loading = false;
            },
            setDisabled(val, row) {
                if (val.status === '2' || val.status === '4'  || val.status === '5' || val.status === '6') {
                    return true;
                } else {
                    return false;
                }
            },
            setDisabledbt(val, row) {
                if (val.status === '2' || val.status === '4'  || val.status === '5' || val.status === '6') {
                    if(val.type === '2' && val.status === '4'){
                        if(Number(moment(val.month).format('MM')) + 1 === Number(moment(new Date()).format('MM'))){
                            return false;
                        }
                        if(Number(moment(val.month).format('MM')) === Number(moment(new Date()).format('MM'))){
                            return true;
                        }
                    }
                    else{
                        return true;
                    }
                } else {
                    return false;
                }
            },
            getBranch(val, row) {
                row.branch = val;
            },
            getKind(val, row) {
                row.kind = val;
            },
            getContractType(val, row) {
                row.contracttype = val;
                if (val === 'PJ065001') {//外部委託
                    row.show = true;
                    row.showG = false;
                } else {//センター内委託 //社内委託
                    row.show = false;
                    row.showG = true;
                }
                row.assignor = '';
            },
            getCurrencyType(val, row) {
                row.currencytype = val;
            },
            getAssignor(val, row) {
                row.assignor = val;
            },
            workflowState(val) {
                if (val.state === '1') {
                    if (val.workflowCode === 'W0053') {
                        this.status = '3';
                    } else if (val.workflowCode === 'W0052') {
                        this.status = '0';
                    }
                } else if (val.state === '2') {
                    // if (val.workflowCode === 'W0053') {
                    //     this.status = '4';
                    // } else if (val.workflowCode === 'W0052') {
                    //     this.status = '4';
                    //     //this.canStart = false;
                    // }
                    this.status = '4';
                }
                this.buttonClick();
            },
            start() {
                if (this.status === '4' || this.status === '6' || (this.workflowCode === 'W0052' && this.status === '0')) {
                    this.status = '5';
                } else {
                    this.status = '2';
                }
                this.buttonClick();
            },
            end() {
                if (this.status === '5') {
                    this.status = '4';
                } else {
                    this.status = '0';
                }
                this.buttonClick();
            },
            yearChange(value) {
                let val = value;
                if (value) {
                    val = moment(value).format('YYYY');
                }
                this.refform.year = val;
                // this.getdata(this.refform.year, '');
                // if (this.refform.year === moment(new Date()).format('YYYY')) {
                //   this.disabled = false;
                // } else {
                //   this.disabled = true;
                // }
            },
            monthChange(value) {
                let val = value;
                if (value) {
                    val = moment(value).format('YYYY-MM');
                }
                this.refform.month = val;
                // this.getdata('', this.months);
            },
            groupChange(val) {
                let orgInfo = getUpOrgInfo(val);
                this.refform.group_id = val;
                this.refform.center_id = orgInfo._id;
            },
            //el-tabsClick
            handleClick(tab, event) {
                // this.loadingflg = '0';
                // this.activeName = tab.name;
                // if (tab.name === 'plan') {
                //     this.workflowCode = 'W0052';
                //     this.canStart = false;
                //     // this.getdata(this.year, '');
                // } else {
                //     if (this.tableA[0].status === '4') {
                //         this.workflowCode = 'W0053';
                //         this.canStart = true;
                //     }
                //     // this.getdata('', this.months);
                // }
            },
            deleteRowF(index, rows) {
                if (rows.length > 1) {
                    rows.splice(index, 1);
                }
            },
            addRowtableDataA(index,rows) {
                if(rows.type === '1'){
                    this.tableDataA.push(
                        {
                            rowid:(this.tableDataAcount).toString(),
                            themeplantype: this.$t('label.PFANS1039FORMVIEW_PLAN'),
                            themeplan_id: '',
                            themeplandetail_id: '',
                            pthemeplandetail_id: '',
                            center_id: '',
                            group_id: '',
                            month: '',
                            year: '',
                            theme_id: '',
                            themename: '',
                            remarks: '',
                            branch: '',
                            kind: 'PJ064001',
                            contracttype: '',
                            currencytype: '',
                            assignor: '',
                            personnel191: '',
                            amount191: '',
                            personnel192: '',
                            amount192: '',
                            personnel193: '',
                            amount193: '',
                            personnel4: '',
                            amount4: '',
                            personnel5: '',
                            amount5: '',
                            personnel6: '',
                            amount6: '',
                            personnel7: '',
                            amount7: '',
                            personnel8: '',
                            amount8: '',
                            personnel9: '',
                            amount9: '',
                            personnel10: '',
                            amount10: '',
                            personnel11: '',
                            amount11: '',
                            personnel12: '',
                            amount12: '',
                            personnel1: '',
                            amount1: '',
                            personnel2: '',
                            amount2: '',
                            personnel3: '',
                            amount3: '',
                            type: '1',
                            rowindex: '',
                            status: '0',
                            plantype: '0',
                            show: false,
                            showG: false,
                            children:[],
                        });
                    this.tableDataAcount = this.tableDataAcount + 1;
                }
                if(rows.type === '2'){
                    let letchildren = {
                        rowid:(this.tableDataAcount).toString(),
                        themeplantype: this.$t('label.PFANS1039FORMVIEW_PROSPECTS'),
                        themeplan_id: rows.themeplan_id,
                        themeplandetail_id: '',
                        pthemeplandetail_id: rows.pthemeplandetail_id,
                        center_id: rows.center_id,
                        group_id: rows.group_id,
                        month: moment(new Date()).format('YYYY-MM'),
                        year: rows.year,
                        theme_id: '',
                        themename: '',
                        remarks: '',
                        branch: '',
                        kind: 'PJ064001',
                        contracttype: '',
                        currencytype: '',
                        assignor: '',
                        personnel191: '',
                        amount191: '',
                        personnel192: '',
                        amount192: '',
                        personnel193: '',
                        amount193: '',
                        personnel4: '',
                        amount4: '',
                        personnel5: '',
                        amount5: '',
                        personnel6: '',
                        amount6: '',
                        personnel7: '',
                        amount7: '',
                        personnel8: '',
                        amount8: '',
                        personnel9: '',
                        amount9: '',
                        personnel10: '',
                        amount10: '',
                        personnel11: '',
                        amount11: '',
                        personnel12: '',
                        amount12: '',
                        personnel1: '',
                        amount1: '',
                        personnel2: '',
                        amount2: '',
                        personnel3: '',
                        amount3: '',
                        type: '2',
                        rowindex: '',
                        status: '0',
                        show: false,
                        showG: false,
                    }
                    for (let i = 0; i < this.tableDataA.length; i++) {
                      if(this.tableDataA[i].themeplandetail_id === rows.pthemeplandetail_id){
                          this.tableDataA[i].children.push(letchildren);
                      }
                    }
                    this.tableDataAcount = this.tableDataAcount + 1;
                }
            },
            buttonClick(val) {
                ///Check
                if (val === 'save') {
                    this.$refs['refform'].validate(valid => {
                        if (valid) {
                        } else {
                            return false;
                        }
                    });
                    if (!this.refform.group_id) {
                        Message({
                            message: this.$t('normal.error_09') +
                                this.$t('label.PFANS1039FORMVIEW_GROUP'),
                            type: 'error',
                            duration: 5 * 1000,
                        });
                        return false;
                    }
                }
                this.loading = true;
                this.baseInfo = this.tableDataA;
                for (let i = 0; i < this.baseInfo.length; i++) {
                  if (!this.baseInfo[i].themename) {
                    Message({
                      message: this.$t('normal.error_08') +
                        this.$t('label.PFANS1039FORMVIEW_THEME'),
                      type: 'error',
                      duration: 5 * 1000,
                    });
                    this.loading = false;
                    return false;
                  }
                  this.baseInfo[i].themeplan_id = this.refform.themeplan_id === '' ? '' : this.refform.themeplan_id;
                  this.baseInfo[i].year = this.refform.year;
                  this.baseInfo[i].group_id = this.refform.group_id;
                  this.baseInfo[i].center_id = this.refform.center_id;
                  if(this.baseInfo[i].month){
                      this.baseInfo[i].month = moment(this.baseInfo[i].month).format('MM')
                  }
                  if(this.workflowCode === 'W0053'){
                      this.baseInfo[i].status = this.status;
                  }
                    if(this.baseInfo[i].children.length > 0){
                        for (let j = 0; j < this.baseInfo[i].children.length; j++) {
                            if(this.workflowCode === 'W0052'){
                                if(this.baseInfo[i].children[j].status != '4'){
                                    this.baseInfo[i].children[j].status = this.status;
                                }
                            }
                            if(this.baseInfo[i].children[j].month){
                                this.baseInfo[i].children[j].month = moment(this.baseInfo[i].children[j].month).format('MM')
                            }
                        }
                    }
                }
                this.$refs['refform'].validate(valid => {
                    if (valid) {
                        let requestUrl;
                        // if (this.$route.params._id) {//编辑
                        //   requestUrl = 'PFANS1040Store/update';
                        // } else {//新建
                        //   requestUrl = 'PFANS1040Store/insert';
                        // }
                        requestUrl = 'PFANS1040Store/inserttheme';
                        this.$store
                            .dispatch(requestUrl, this.baseInfo).then(response => {
                            this.data = response;
                            // this.loadingflg = '1';
                            // if (this.activeName === 'plan') {
                            //   this.getdata(this.year, '');
                            // } else {
                            //   this.getdata('', this.months);
                            // }
                            this.loading = false;
                            if (val !== 'update') {
                                Message({
                                    message: this.$t('normal.success_03'),
                                    type: 'success',
                                    duration: 5 * 1000,
                                });
                            }
                            this.$router.push({
                                name: 'PFANS1040View',
                            });
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
                        this.loading = false;
                        Message({
                            message: this.$t('normal.error_12'),
                            type: 'error',
                            duration: 5 * 1000,
                        });
                    }
                });
            },
            getHeaderClass({row, column, rowIndex, columnIndex}) {
                if (column.level === 1 && columnIndex >= 10 && columnIndex <= 12) {
                    return {
                        color: 'white',
                        background: '#7A7A7A',
                        border: '1px solid white',
                    };
                } else if (column.level === 2 && columnIndex <= 5) {
                    return {
                        color: 'white',
                        background: '#7A7A7A',
                        border: '1px solid white',
                    };
                } else {
                    return {
                        color: 'white',
                        background: '#005BAA',
                        border: '1px solid white',
                    };
                }
            },
            //审批颜色提醒
            rowClass({row, rowIndex}) {
                if(row.status === '5'){
                    return 'row1';
                }
            },
        },
    };
</script>

<style rel="stylesheet/scss" lang="scss">
  .el-table {
    overflow-x: auto;
  }

  .el-table__header-wrapper,
  .el-table__body-wrapper,
  .el-table__footer-wrapper {

  }

  .el-table::after {
    position: relative;
  }

  .el-table--scrollable-x .el-table__body-wrapper {

  }

  .tableClass {
    .el-table__fixed-right {
      height: 100% !important;
    }
  }

  .el-table__body .el-table__row.hover-row td {
    background-color: #fafafa;
  }
  .el-table .row1 {
    background: #ebb563;

  }
  /*.sub_bg_color_gray {*/
  /*  background-color: #666666 !important;*/
  /*  height: 40px;*/
  /*  padding: 0px;*/
  /*  color: white;*/
  /*  font-size: 0.8rem;*/
  /*  text-align: center;*/
  /*}*/

</style>
