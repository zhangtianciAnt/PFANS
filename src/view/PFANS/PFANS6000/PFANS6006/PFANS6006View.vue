<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :noback="true" :title="title"
                         @buttonClick="buttonClick" ref="container" v-loading="loading">
      <div slot="customize">
        <el-form label-position="top" label-width="8vw" ref="reff" style="padding-top: 10px">
          <el-form-item>
            <el-row style="margin-top: 20px">
              <el-col :span="18">
                <div align="right">
                  <el-date-picker
                    :placeholder="$t('normal.error_09')"
                    @change="yearChange"
                    format="yyyy"
                    type="year"
                    v-model="year">
                  </el-date-picker>
                </div>
              </el-col>
              <el-col :span="6">
                <div align="right">
                  <el-select v-model="group_id" style="width: 20vw"
                             @change="changeGroup">
                    <el-option
                      v-for="item in optionsdata"
                      :key="item.value"
                      :label="item.lable"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding-top: 10px">
              <plx-table-grid :datas="tableData" :header-cell-style="getRowClass" border
                        header-cell-class-name="sub_bg_color_blue" stripe height="400" header-row-class-name="height"
                              use-virtual :pagination-show="paginationShow" big-data-checkbox highlight-current-row
                              style="width: 100%;height: calc(100vh - 200px - 2rem)" cell-class-name = "row_height_left" :row-height="rowheight"
                        @selection-change="handleSelectionChange" @row-click="handleRowClick">

                <!--checkbox-->
<!--                <plx-table-column-->
<!--                  width="55">-->
<!--                  <el-checkbox type="selection"-->
<!--                  ></el-checkbox>-->
<!--                </plx-table-column>-->

                <plx-table-column
                  type="selection"
                  width="40"
                  fixed="left">
                </plx-table-column>

                <!-- 序号-->
                <plx-table-column
                  :label="$t('label.PFANS2006VIEW_NO')"
                  align="center"
                  type="index"
                  width="50"
                  fixed="left">
                </plx-table-column>

                <!--              第一组-->
                <!--              基本情报-->
                <plx-table-column
                  :label="$t('label.PFANS2023FORMVIEW_INTELLIGENCE')"
                  align="center">
                  <!--                pj名-->
                  <plx-table-column
                    :label="$t('label.PFANS6007VIEW_PJNAME')"
                    prop="project_name"
                    align="center"
                    fixed="left"
                    width="120">
                  </plx-table-column>
                  <!--                窓口-->
                  <plx-table-column
                    :label="$t('label.PFANS6007VIEW_PSDCDWINDOW')"
                    align="center"
                    prop="managerid"
                    fixed="left"
                    width="80">
                  </plx-table-column>
                  <!--                BP会社名-->
                  <plx-table-column
                    :label="$t('label.PFANS6007VIEW_BPCLUBNAME')"
                    align="left"
                    prop="suppliername"
                    fixed="left"
                    width="120">
                  </plx-table-column>
                  <!--                BP名前-->
                  <plx-table-column
                    :label="$t('label.PFANS5001FORMVIEW_BPNAME')"
                    align="center"
                    prop="expname"
                    fixed="left"
                    width="80">
                  </plx-table-column>
                  <!--                入场时间-->
                  <plx-table-column
                    :label="$t('label.PFANS6004FORMVIEW_ADMISSIONTIME')"
                    align="center"
                    prop="admissiontime"
                    width="90">
                  </plx-table-column>
                  <!--                退场时间-->
                  <plx-table-column
                    :label="$t('label.PFANS6004FORMVIEW_EXITIME')"
                    align="center"
                    prop="exittime"
                    width="90">
                  </plx-table-column>
                  <!--                作業形態-->
                  <plx-table-column
                    :label="$t('label.PFANS6004FORMVIEW_OPERATIONFORM')"
                    align="center"
                    prop="operationform"
                    width="90">
                  </plx-table-column>
                  <!--                作業分類-->
                  <plx-table-column
                    :label="$t('label.PFANS6004FORMVIEW_JOBCLASSIFICATIONM')"
                    align="center"
                    prop="jobclassification"
                    width="90">
                  </plx-table-column>
                  <!--                配賦対象-->
<!--                  <plx-table-column-->
<!--                    :label="$t('label.PFANS6005VIEW_PFDX')"-->
<!--                    align="center"-->
<!--                    width="120">-->
<!--                    <template slot-scope="scope">-->
<!--                      <el-input-->
<!--                        :disabled="!disabled"-->
<!--                        :no="scope.row"-->
<!--                        style="width: 100%"-->
<!--                        v-model="scope.row.distriobjects">-->
<!--                      </el-input>-->
<!--                    </template>-->
<!--                  </plx-table-column>-->
<!--                  &lt;!&ndash;                構内対象&ndash;&gt;-->
<!--                  <plx-table-column-->
<!--                    :label="$t('label.PFANS6005VIEW_SNDX')"-->
<!--                    align="center"-->
<!--                    width="120">-->
<!--                    <template slot-scope="scope">-->
<!--                      <el-input-->
<!--                        :disabled="!disabled"-->
<!--                        :no="scope.row"-->
<!--                        style="width: 100%"-->
<!--                        v-model="scope.row.venuetarget">-->
<!--                      </el-input>-->
<!--                    </template>-->
<!--                  </plx-table-column>-->
                </plx-table-column>
                <!--              第二组-->
                <!--活用状况-->
                <plx-table-column
                  :label="$t('label.PFANS2023FORMVIEW_INTELLIGENCE')"
                  align="center">
                  <!--四月-->
                  <plx-table-column
                    :label="$t('label.April')"
                    align="center"
                    width="130"
                    prop="april">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        :disabled="false"
                        v-if="scope.row.type == '1'"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.april">
                      </el-input-number>
                      <el-input-number
                        size="mini"
                        :disabled="true"
                        v-if="scope.row.type == '0'"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.april">
                      </el-input-number>

                    </template>
                  </plx-table-column>
                  <!--五月-->
                  <plx-table-column
                    :label="$t('label.May')"
                    align="center"
                    width="130">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        v-if="scope.row.type == '1'"
                        :disabled="false"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.may">
                      </el-input-number>
                      <el-input-number
                        size="mini"
                        v-if="scope.row.type == '0'"
                        :disabled="true"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.may">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                  <!--六月-->
                  <plx-table-column
                    :label="$t('label.June')"
                    align="center"
                    width="130">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        v-if="scope.row.type == '0'"
                        :disabled="true"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.june">
                      </el-input-number>
                      <el-input-number
                        size="mini"
                        v-if="scope.row.type == '1'"
                        :disabled="false"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.june">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                  <!--七月-->
                  <plx-table-column
                    :label="$t('label.July')"
                    align="center"
                    width="130">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        v-if="scope.row.type == '0'"
                        :disabled="true"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.july">
                      </el-input-number>
                      <el-input-number
                        size="mini"
                        v-if="scope.row.type == '1'"
                        :disabled="false"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.july">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                  <!--八月-->
                  <plx-table-column
                    :label="$t('label.August')"
                    align="center"
                    width="130">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        v-if="scope.row.type == '1'"
                        :disabled="false"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.august">
                      </el-input-number>
                      <el-input-number
                        size="mini"
                        v-if="scope.row.type == '0'"
                        :disabled="true"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.august">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                  <!--九月-->
                  <plx-table-column
                    :label="$t('label.September')"
                    align="center"
                    width="130">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        v-if="scope.row.type == '0'"
                        :disabled="true"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.september">
                      </el-input-number>
                      <el-input-number
                        size="mini"
                        v-if="scope.row.type == '1'"
                        :disabled="false"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.september">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                  <!--十月-->
                  <plx-table-column
                    :label="$t('label.October')"
                    align="center"
                    width="130">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        v-if="scope.row.type == '1'"
                        :disabled="false"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.october">
                      </el-input-number>
                      <el-input-number
                        size="mini"
                        v-if="scope.row.type == '0'"
                        :disabled="true"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.october">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                  <!--十一月-->
                  <plx-table-column
                    :label="$t('label.November')"
                    align="center"
                    width="130">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        v-if="scope.row.type == '0'"
                        :disabled="true"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.november">
                      </el-input-number>
                      <el-input-number
                        size="mini"
                        v-if="scope.row.type == '1'"
                        :disabled="false"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.november">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                  <!--十二月-->
                  <plx-table-column
                    :label="$t('label.December')"
                    align="center"
                    width="130">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        v-if="scope.row.type == '1'"
                        :disabled="false"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.december">
                      </el-input-number>
                      <el-input-number
                        size="mini"
                        v-if="scope.row.type == '0'"
                        :disabled="true"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.december">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                  <!--一月-->
                  <plx-table-column
                    :label="$t('label.January')"
                    align="center"
                    width="130">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        v-if="scope.row.type == '0'"
                        :disabled="true"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.january">
                      </el-input-number>
                      <el-input-number
                        size="mini"
                        v-if="scope.row.type == '1'"
                        :disabled="false"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.january">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                  <!--二月-->
                  <plx-table-column
                    :label="$t('label.February')"
                    align="center"
                    width="130">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        v-if="scope.row.type == '1'"
                        :disabled="false"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.february">
                      </el-input-number>
                      <el-input-number
                        size="mini"
                        v-if="scope.row.type == '0'"
                        :disabled="true"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.february">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                  <!--三月-->
                  <plx-table-column
                    :label="$t('label.March')"
                    align="center"
                    width="130">
                    <template slot-scope="scope">
                      <el-input-number
                        size="mini"
                        v-if="scope.row.type == '0'"
                        :disabled="true"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.march">
                      </el-input-number>
                      <el-input-number
                        size="mini"
                        v-if="scope.row.type == '1'"
                        :disabled="false"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:90%"
                        v-model.trim="scope.row.march">
                      </el-input-number>
                    </template>
                  </plx-table-column>
                  <!--勤続月数-->
                  <plx-table-column
                    :label="$t('label.PFANS6005VIEW_KQYS')"
                    align="center"
                    width="80">
                    <template slot-scope="scope">
                      <el-input
                        size="mini"
                        :disabled="!disabled"
                        :no="scope.row"
                        style="width: 100%"
                        v-model="scope.row.monthlength">
                      </el-input>
                    </template>
                  </plx-table-column>
                  <!--備考-->
                  <plx-table-column
                    :label="$t('label.PFANS6007VIEW_REMARKS')"
                    align="center"
                    width="200">
                    <template slot-scope="scope">
                      <el-input
                        size="mini"
                        v-if="scope.row.type == '1'"
                        :disabled="false"
                        :rows="1"
                        style="width: 10vw"
                        type="textarea"
                        v-model="scope.row.remarks">
                      </el-input>
                      <el-input
                        size="mini"
                        v-if="scope.row.type == '0'"
                        :disabled="true"
                        :rows="1"
                        style="width: 10vw"
                        type="textarea"
                        v-model="scope.row.remarks">
                      </el-input>
                    </template>
                  </plx-table-column>
                </plx-table-column>

                <!--              第三组-->
                <!--              退场情报-->
                <plx-table-column
                  :label="$t('label.PFANS6004VIEW_EXINTELLIGENCE')"
                  align="center">
                  <!--                所有情报-->
                  <plx-table-column
                    :label="$t('label.PFANS6004FORMVIEW_ALLTECHNOLOGY')"
                    align="center"
                    prop="alltechnology"
                    width="120">
                  </plx-table-column>
                  <!--                現場評価-->
                  <plx-table-column
                    :label="$t('label.PFANS6004FORMVIEW_SITEVALUATION')"
                    align="center"
                    prop="sitevaluation"
                    width="120">
                  </plx-table-column>
                  <!--                退場理由-->
                  <plx-table-column
                    :label="$t('label.PFANS6004FORMVIEW_EXITREASON')"
                    align="center"
                    prop="exitreason"
                    width="120">
                  </plx-table-column>
                  <!--                業務影響-->
                  <plx-table-column
                    :label="$t('label.PFANS6004FORMVIEW_BUSINESSIMPACT')"
                    align="center"
                    prop="businessimpact"
                    width="120">
                  </plx-table-column>
                  <!--                対策-->
                  <plx-table-column
                    :label="$t('label.PFANS6004FORMVIEW_COUNTERMEASURE')"
                    align="center"
                    prop="countermeasure"
                    width="120">
                  </plx-table-column>
                </plx-table-column>
              </plx-table-grid>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
  import EasyNormalContainer from "@/components/EasyNormalContainer";
  import moment from "moment";
  import {Message} from 'element-ui';
  import user from "../../../components/user.vue";
  import {getDictionaryInfo, getSupplierinfor, getUserInfo,
      getCurrentRole,getDownOrgInfo,getorgGroupList} from '../../../../utils/customize';

  export default {
    name: "PFANS6006View",
    components: {
      EasyNormalContainer,
      user,
    },
    data() {
      return {
        paginationShow:false,
        loading: false,
        buttonList: [],
        baseInfo: {},
        scope: '',
        year: moment(new Date()).format('MM') < 4 ? moment(new Date()).add(-1, 'y').format("YYYY") : moment(new Date()).format('YYYY'),
        group_id:'',
        row: '',
        tableData: [{
          delegainformation_id: '',
          companyprojects_id:'',
          projectsystem_id:'',
          type: '1',
          project_name: '',
          group_id: '',
          account: '',
          managerid: '',
          expname: '',
          suppliername: '',
          admissiontime: '',
          exittime: '',
          operationform: '',
          jobclassification: '',
          distriobjects: '',
          venuetarget: '',
          january: '',
          february: '',
          march: '',
          april: '',
          may: '',
          june: '',
          july: '',
          august: '',
          september: '',
          october: '',
          november: '',
          december: '',
          monthlength: '',
          remarks: '',
          alltechnology: '',
          sitevaluation: '',
          exitreason: '',
          businessimpact: '',
          countermeasure: '',
        }],
        data: [],
        multipleSelection: [],
        userlist: "",
        title: 'title.PFANS6006VIEW_TITLE',
        disabled: false,
        disable: true,
        buttonList: [
          {
            'key': 'save',
            'name': 'button.save',
            'disabled': false,
          },
        ],
        optionsdata: [],
      };
    },
    methods: {
      getList() {
        this.loading = true;
        this.$store
          .dispatch('PFANS6006Store/getYears', {'year': this.year,'group_id': this.group_id})
          .then(response => {
              let tabledate = [];
            for (let j = 0; j < response.length; j++) {
              if (response[j].managerid !== null && response[j].managerid !== '') {
                let rst = getUserInfo(response[j].managerid)
                if (rst) {
                  response[j].managerid = rst.userinfo.customername;
                }
              }

              //region 无用代码
                // if (response[j].admissiontime !== null && response[j].admissiontime !== '') {
                //   response[j].admissiontime = moment(response[j].admissiontime).format('YYYY-MM-DD');
                // }
                // if (response[j].exittime !== null && response[j].exittime !== '') {
                //   response[j].exittime = moment(response[j].exittime).format('YYYY-MM-DD');
                // }
                // if (response[j].jobclassification !== null && response[j].jobclassification !== '') {
                //   let letStage = getDictionaryInfo(response[j].jobclassification);
                //   if (letStage != null) {
                //     response[j].jobclassification = letStage.value1;
                //   }
                // }
                // if (response[j].operationform !== null && response[j].operationform !== '') {
                //   let letStage = getDictionaryInfo(response[j].operationform);
                //   if (letStage != null) {
                //     response[j].operationform = letStage.value1;
                //   }
                // }
                // if (response[j].alltechnology !== null && response[j].alltechnology !== '') {
                //   let letStage = getDictionaryInfo(response[j].alltechnology);
                //   if (letStage != null) {
                //     response[j].alltechnology = letStage.value1;
                //   }
                // }
                // if (response[j].sitevaluation !== null && response[j].sitevaluation !== '') {
                //   let letStage = getDictionaryInfo(response[j].sitevaluation);
                //   if (letStage != null) {
                //     response[j].sitevaluation = letStage.value1;
                //   }
                // }
                // if (response[j].exitreason !== null && response[j].exitreason !== '') {
                //   let letStage = getDictionaryInfo(response[j].exitreason);
                //   if (letStage != null) {
                //     response[j].exitreason = letStage.value1;
                //   }
                // }
                // if (response[j].businessimpact !== null && response[j].businessimpact !== '') {
                //   let letStage = getDictionaryInfo(response[j].businessimpact);
                //   if (letStage != null) {
                //     response[j].businessimpact = letStage.value1;
                //   }
                // }
                // if (response[j].countermeasure !== null && response[j].countermeasure !== '') {
                //   let letStage = getDictionaryInfo(response[j].countermeasure);
                //   if (letStage != null) {
                //     response[j].countermeasure = letStage.value1;
                //   }
                // }
                // if (response[j].distriobjects !== null && response[j].distriobjects !== '') {
                //   if (response[j].distriobjects = 0) {
                //     response[j].distriobjects = "是";
                //   } else if (response[j].distriobjects = 1) {
                //     response[j].distriobjects = "否";
                //   }
                // }
                // if (response[j].venuetarget !== null && response[j].venuetarget !== '') {
                //   if (response[j].venuetarget = 0) {
                //     response[j].venuetarget = "是";
                //   } else if (response[j].venuetarget = 1) {
                //     response[j].venuetarget = "否";
                //   }
                // }
                //endregion

              if (response[j].venuetarget == 0) {
                let arr = [
                  response[j].april,
                  response[j].may,
                  response[j].june,
                  response[j].july,
                  response[j].august,
                  response[j].september,
                  response[j].october,
                  response[j].november,
                  response[j].december,
                  response[j].january,
                  response[j].february,
                  response[j].march
                ];
                var h = 0;
                for (let i = 0; i < arr.length; i++) {
                  if (arr[i] != null && arr[i] != "0.00" && arr[i] != "0") {
                    h++;
                  }
                }
                response[j].monthlength = h;
              }
              tabledate.push({
                  delegainformation_id: response[j].delegainformation_id,
                  companyprojects_id: response[j].companyprojects_id,
                  projectsystem_id: response[j].projectsystem_id,
                  year: response[j].year,
                  supplierinfor_id: response[j].supplierinfor_id,
                  type: 1,
                  project_name: response[j].project_name,
                  group_id: response[j].group_id,
                  account: response[j].account,
                  managerid: response[j].managerid,
                  expname: response[j].expname,
                  suppliername: response[j].suppliername,
                  admissiontime: response[j].admissiontime,
                  exittime: response[j].exittime,
                  operationform: response[j].operationform,
                  jobclassification: response[j].jobclassification,
                  distriobjects: response[j].distriobjects,
                  venuetarget: response[j].venuetarget,
                  january: response[j].january,
                  february: response[j].february,
                  march: response[j].march,
                  april: response[j].april,
                  may: response[j].may,
                  june: response[j].june,
                  july: response[j].july,
                  august: response[j].august,
                  september: response[j].september,
                  october: response[j].october,
                  november: response[j].november,
                  december: response[j].december,
                  monthlength: response[j].monthlength,
                  remarks: response[j].remarks,
                  alltechnology: response[j].alltechnology,
                  sitevaluation: response[j].sitevaluation,
                  exitreason: response[j].exitreason,
                  businessimpact:response[j].businessimpact,
                  countermeasure: response[j].countermeasure,
              })
            }
            this.tableData = tabledate;
            this.loading = false;
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000
            });
            this.loading = false;
          })
      },
      getById() {
            this.loading = true;
            let role = getCurrentRole();
            const vote = [];
            if (role === '3') {
                vote.push(
                    {
                        value: this.$store.getters.userinfo.userinfo.groupid,
                        lable: this.$store.getters.userinfo.userinfo.groupname,
                    },
                );
                this.group_id = this.$store.getters.userinfo.userinfo.groupid;
            } else if (role === '2') {
                let centerId = this.$store.getters.userinfo.userinfo.centerid;
                let orgs = getDownOrgInfo(centerId);
                if (orgs){
                    if(orgs.length > 0){
                        this.group_id = orgs[0]._id;
                    }
                    for (let org of orgs) {
                        console.log(org)
                        vote.push(
                            {
                                value: org._id,
                                lable: org.companyname,
                            },
                        );
                    }
                }

            } else if (role === '1') {
                let centerId = this.$store.getters.userinfo.userinfo.centerid;
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
                                vote.push(
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
                this.optionsdata = vote1;
            }
            else
            {
                this.optionsdata = vote;
            }
            this.loading = false;
        },
      changeGroup(val) {
            this.group_id = val;
            if (this.group_id) {
                this.getList();
            }
        },
      handleRowClick(row) {
         //row.type='1'
      },
      yearChange(value) {
        this.year = moment(value).format('YYYY');
        this.getList();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      buttonClick(val) {
        if(this.multipleSelection.length === 0){
            Message({
                message: this.$t('normal.info_01'),
                type: 'info',
                duration: 2 * 1000
            });
            return;
        }
        if (val === 'save') {
          this.loading = true;
          this.$store
            .dispatch('PFANS6006Store/updateDeleginformation', this.multipleSelection)
            .then(response => {
              this.data = response;
              this.loading = false;
              //this.getList(this.year);
              Message({
                message: this.$t("normal.success_02"),
                type: "success",
                duration: 5 * 1000
              });
              // this.$router.push({
              //   name: 'PFANS6006View',
              // });
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
      getRowClass({row, column, rowIndex, columnIndex}) {
          if (column.level === 2 && columnIndex >= 0 && columnIndex < 8) {
              return {
                  color: 'white',
                  background: '#99CCFF !important',
                  border: '1px solid white',
              };
          }
          if (column.level === 2 && columnIndex >= 4 && columnIndex < 22) {
              return {
                  color: 'white',
                  background: '#99CC99 !important',
                border: '1px solid white',
              };
          }
          if (column.level === 2 && columnIndex >= 22 && columnIndex < 27) {
          return {
            color: 'white',
            background: '#99CCFF',
            border: '1px solid white',
          };
        }
        if (column.level === 1 && columnIndex >= 0 && columnIndex < 23) {
          return {
            color: 'white',
            background: '#005BAA !important',
            border: '1px solid white',
          };
        }
      },

    },
    mounted() {
      this.getById();
      this.getList();
    },
  }
</script>

<style lang="scss">
  .row_height_left {
    font-size: 0.75rem;
    padding: 0px;
    text-align: left;
    background-color: transparent !important;
  }
  .el-table /deep/ .current-row{
    background-color: #BDD8EE;
  }
</style>
