<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :noback="true" :title="title"
                         @buttonClick="buttonClick" ref="container" v-loading="loading">
      <div slot="customize">
        <el-form label-position="top" label-width="8vw" ref="reff" style="padding-top: 10px">

          <el-form-item>
            <el-row>
              <el-col :span="24">
                <div class="block">
                  <el-date-picker
                    :placeholder="$t('normal.error_09')"
                    @change="yearChange"
                    format="yyyy"
                    type="year"
                    v-model="year">
                  </el-date-picker>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding-top: 10px">
              <el-table :data="tableData" :header-cell-style="getRowClass" border
                        header-cell-class-name="sub_bg_color_blue" stripe height="400"
                        @selection-change="handleSelectionChange" @row-click="handleRowClick"
                        style="width: 100%">

                <!--checkbox-->
<!--                <el-table-column-->
<!--                  width="55">-->
<!--                  <el-checkbox type="selection"-->
<!--                  ></el-checkbox>-->
<!--                </el-table-column>-->

                <el-table-column
                  type="selection"
                  width="55">

                </el-table-column>

                <!-- 序号-->
                <el-table-column
                  :label="$t('label.PFANS2006VIEW_NO')"
                  align="center"
                  type="index"
                  width="80">
                </el-table-column>

                <!--              第一组-->
                <!--              基本情报-->
                <el-table-column
                  :label="$t('label.PFANS2023FORMVIEW_INTELLIGENCE')"
                  align="center">
                  <!--                部门名-->
<!--                  <el-table-column-->
<!--                    :label="$t('label.department')"-->
<!--                    align="center"-->
<!--                    width="200">-->
<!--                    <template slot-scope="scope">-->
<!--                      <el-input-->
<!--                        :disabled="!disabled"-->
<!--                        :no="scope.row"-->
<!--                        style="width: 100%"-->
<!--                        v-model="scope.row.group_id">-->
<!--                      </el-input>-->
<!--                    </template>-->
<!--                  </el-table-column>-->
                  <!--                pj名-->
                  <el-table-column
                    :label="$t('label.PFANS6007VIEW_PJNAME')"
                    align="center"
                    width="180">
                    <template slot-scope="scope">
                      <el-input
                        :disabled="!disabled"
                        :no="scope.row"
                        style="width: 100%"
                        v-model="scope.row.project_name">
                      </el-input>
                    </template>
                  </el-table-column>
                  <!--                窓口-->
                  <el-table-column
                    :label="$t('label.PFANS6007VIEW_PSDCDWINDOW')"
                    align="center"
                    width="120">
                    <template slot-scope="scope">
                      <el-input
                        :disabled="!disabled"
                        :no="scope.row"
                        style="width: 100%"
                        v-model="scope.row.managerid">
                      </el-input>
                    </template>
                  </el-table-column>
                  <!--                BP会社名-->
                  <el-table-column
                    :label="$t('label.PFANS6007VIEW_BPCLUBNAME')"
                    align="center"
                    width="150">
                    <template slot-scope="scope">
                      <el-input
                        :disabled="!disabled"
                        :no="scope.row"
                        style="width: 100%"
                        v-model="scope.row.suppliername">
                      </el-input>
                    </template>
                  </el-table-column>
                  <!--                BP名前-->
                  <el-table-column
                    :label="$t('label.PFANS5001FORMVIEW_BPNAME')"
                    align="center"
                    width="180">
                    <template slot-scope="scope">
                      <el-input
                        :disabled="!disabled"
                        :no="scope.row"
                        style="width: 100%"
                        v-model="scope.row.expname">
                      </el-input>
                    </template>
                  </el-table-column>
                  <!--                入场时间-->
                  <el-table-column
                    :label="$t('label.PFANS6004FORMVIEW_ADMISSIONTIME')"
                    align="center"
                    width="150">
                    <template slot-scope="scope">
                      <el-input
                        :disabled="!disabled"
                        :no="scope.row"
                        style="width: 100%"
                        v-model="scope.row.admissiontime">
                      </el-input>
                    </template>
                  </el-table-column>
                  <!--                退场时间-->
                  <el-table-column
                    :label="$t('label.PFANS6004FORMVIEW_EXITIME')"
                    align="center"
                    width="150">
                    <template slot-scope="scope">
                      <el-input
                        :disabled="!disabled"
                        :no="scope.row"
                        style="width: 100%"
                        v-model="scope.row.exittime">
                      </el-input>
                    </template>
                  </el-table-column>
                  <!--                作業形態-->
                  <el-table-column
                    :label="$t('label.PFANS6004FORMVIEW_OPERATIONFORM')"
                    align="center"
                    width="180">
                    <template slot-scope="scope">
                      <el-input
                        :disabled="!disabled"
                        :no="scope.row"
                        style="width: 100%"
                        v-model="scope.row.operationform">
                      </el-input>
                    </template>
                  </el-table-column>
                  <!--                作業分類-->
                  <el-table-column
                    :label="$t('label.PFANS6004FORMVIEW_JOBCLASSIFICATIONM')"
                    align="center"
                    width="150">
                    <template slot-scope="scope">
                      <el-input
                        :disabled="!disabled"
                        :no="scope.row"
                        style="width: 100%"
                        v-model="scope.row.jobclassification">
                      </el-input>
                    </template>
                  </el-table-column>
                  <!--                配賦対象-->
<!--                  <el-table-column-->
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
<!--                  </el-table-column>-->
<!--                  &lt;!&ndash;                構内対象&ndash;&gt;-->
<!--                  <el-table-column-->
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
<!--                  </el-table-column>-->
                </el-table-column>
                <!--              第二组-->
                <!--活用状况-->
                <el-table-column
                  :label="$t('label.PFANS2023FORMVIEW_INTELLIGENCE')"
                  align="center">
                  <!--四月-->
                  <el-table-column
                    :label="$t('label.April')"
                    align="center"
                    width="170"
                    prop="april">
                    <template slot-scope="scope">
                      <el-input-number
                        :disabled="false"
                        v-if="scope.row.type == '1'"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:8vw"
                        v-model.trim="scope.row.april">
                      </el-input-number>
                      <el-input-number
                        :disabled="true"
                        v-if="scope.row.type == '0'"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:8vw"
                        v-model.trim="scope.row.april">
                      </el-input-number>

                    </template>
                  </el-table-column>
                  <!--五月-->
                  <el-table-column
                    :label="$t('label.May')"
                    align="center"
                    width="170">
                    <template slot-scope="scope">
                      <el-input-number
                        v-if="scope.row.type == '1'"
                        :disabled="false"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:8vw"
                        v-model.trim="scope.row.may">
                      </el-input-number>
                      <el-input-number
                        v-if="scope.row.type == '0'"
                        :disabled="true"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:8vw"
                        v-model.trim="scope.row.may">
                      </el-input-number>
                    </template>
                  </el-table-column>
                  <!--六月-->
                  <el-table-column
                    :label="$t('label.June')"
                    align="center"
                    width="170">
                    <template slot-scope="scope">
                      <el-input-number
                        v-if="scope.row.type == '0'"
                        :disabled="true"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:8vw"
                        v-model.trim="scope.row.june">
                      </el-input-number>
                      <el-input-number
                        v-if="scope.row.type == '1'"
                        :disabled="false"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:8vw"
                        v-model.trim="scope.row.june">
                      </el-input-number>
                    </template>
                  </el-table-column>
                  <!--七月-->
                  <el-table-column
                    :label="$t('label.July')"
                    align="center"
                    width="170">
                    <template slot-scope="scope">
                      <el-input-number
                        v-if="scope.row.type == '0'"
                        :disabled="true"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:8vw"
                        v-model.trim="scope.row.july">
                      </el-input-number>
                      <el-input-number
                        v-if="scope.row.type == '1'"
                        :disabled="false"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:8vw"
                        v-model.trim="scope.row.july">
                      </el-input-number>
                    </template>
                  </el-table-column>
                  <!--八月-->
                  <el-table-column
                    :label="$t('label.August')"
                    align="center"
                    width="170">
                    <template slot-scope="scope">
                      <el-input-number
                        v-if="scope.row.type == '1'"
                        :disabled="false"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:8vw"
                        v-model.trim="scope.row.august">
                      </el-input-number>
                      <el-input-number
                        v-if="scope.row.type == '0'"
                        :disabled="true"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:8vw"
                        v-model.trim="scope.row.august">
                      </el-input-number>
                    </template>
                  </el-table-column>
                  <!--九月-->
                  <el-table-column
                    :label="$t('label.September')"
                    align="center"
                    width="170">
                    <template slot-scope="scope">
                      <el-input-number
                        v-if="scope.row.type == '0'"
                        :disabled="true"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:8vw"
                        v-model.trim="scope.row.september">
                      </el-input-number>
                      <el-input-number
                        v-if="scope.row.type == '1'"
                        :disabled="false"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:8vw"
                        v-model.trim="scope.row.september">
                      </el-input-number>
                    </template>
                  </el-table-column>
                  <!--十月-->
                  <el-table-column
                    :label="$t('label.October')"
                    align="center"
                    width="170">
                    <template slot-scope="scope">
                      <el-input-number
                        v-if="scope.row.type == '1'"
                        :disabled="false"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:8vw"
                        v-model.trim="scope.row.october">
                      </el-input-number>
                      <el-input-number
                        v-if="scope.row.type == '0'"
                        :disabled="true"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:8vw"
                        v-model.trim="scope.row.october">
                      </el-input-number>
                    </template>
                  </el-table-column>
                  <!--十一月-->
                  <el-table-column
                    :label="$t('label.November')"
                    align="center"
                    width="170">
                    <template slot-scope="scope">
                      <el-input-number
                        v-if="scope.row.type == '0'"
                        :disabled="true"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:8vw"
                        v-model.trim="scope.row.november">
                      </el-input-number>
                      <el-input-number
                        v-if="scope.row.type == '1'"
                        :disabled="false"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:8vw"
                        v-model.trim="scope.row.november">
                      </el-input-number>
                    </template>
                  </el-table-column>
                  <!--十二月-->
                  <el-table-column
                    :label="$t('label.December')"
                    align="center"
                    width="170">
                    <template slot-scope="scope">
                      <el-input-number
                        v-if="scope.row.type == '1'"
                        :disabled="false"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:8vw"
                        v-model.trim="scope.row.december">
                      </el-input-number>
                      <el-input-number
                        v-if="scope.row.type == '0'"
                        :disabled="true"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:8vw"
                        v-model.trim="scope.row.december">
                      </el-input-number>
                    </template>
                  </el-table-column>
                  <!--一月-->
                  <el-table-column
                    :label="$t('label.January')"
                    align="center"
                    width="170">
                    <template slot-scope="scope">
                      <el-input-number
                        v-if="scope.row.type == '0'"
                        :disabled="true"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:8vw"
                        v-model.trim="scope.row.january">
                      </el-input-number>
                      <el-input-number
                        v-if="scope.row.type == '1'"
                        :disabled="false"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:8vw"
                        v-model.trim="scope.row.january">
                      </el-input-number>
                    </template>
                  </el-table-column>
                  <!--二月-->
                  <el-table-column
                    :label="$t('label.February')"
                    align="center"
                    width="170">
                    <template slot-scope="scope">
                      <el-input-number
                        v-if="scope.row.type == '1'"
                        :disabled="false"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:8vw"
                        v-model.trim="scope.row.february">
                      </el-input-number>
                      <el-input-number
                        v-if="scope.row.type == '0'"
                        :disabled="true"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:8vw"
                        v-model.trim="scope.row.february">
                      </el-input-number>
                    </template>
                  </el-table-column>
                  <!--三月-->
                  <el-table-column
                    :label="$t('label.March')"
                    align="center"
                    width="170">
                    <template slot-scope="scope">
                      <el-input-number
                        v-if="scope.row.type == '0'"
                        :disabled="true"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:8vw"
                        v-model.trim="scope.row.march">
                      </el-input-number>
                      <el-input-number
                        v-if="scope.row.type == '1'"
                        :disabled="false"
                        :max="9999999999"
                        :min="0"
                        :precision="2"
                        :step="0.01"
                        controls-position="right"
                        style="width:8vw"
                        v-model.trim="scope.row.march">
                      </el-input-number>
                    </template>
                  </el-table-column>
                  <!--勤続月数-->
                  <el-table-column
                    :label="$t('label.PFANS6005VIEW_KQYS')"
                    align="center"
                    width="80">
                    <template slot-scope="scope">
                      <el-input
                        :disabled="!disabled"
                        :no="scope.row"
                        style="width: 100%"
                        v-model="scope.row.monthlength">
                      </el-input>
                    </template>
                  </el-table-column>
                  <!--備考-->
                  <el-table-column
                    :label="$t('label.PFANS6007VIEW_REMARKS')"
                    align="center"
                    width="200">
                    <template slot-scope="scope">
                      <el-input
                        v-if="scope.row.type == '1'"
                        :disabled="false"
                        :rows="1"
                        style="width: 10vw"
                        type="textarea"
                        v-model="scope.row.remarks">
                      </el-input>
                      <el-input
                        v-if="scope.row.type == '0'"
                        :disabled="true"
                        :rows="1"
                        style="width: 10vw"
                        type="textarea"
                        v-model="scope.row.remarks">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>

                <!--              第三组-->
                <!--              退场情报-->
                <el-table-column
                  :label="$t('label.PFANS6004VIEW_EXINTELLIGENCE')"
                  align="center">
                  <!--                所有情报-->
                  <el-table-column
                    :label="$t('label.PFANS6004FORMVIEW_ALLTECHNOLOGY')"
                    align="center"
                    width="120">
                    <template slot-scope="scope">
                      <el-input
                        :disabled="!disabled"
                        :no="scope.row"
                        style="width: 100%"
                        v-model="scope.row.alltechnology">
                      </el-input>
                    </template>
                  </el-table-column>
                  <!--                現場評価-->
                  <el-table-column
                    :label="$t('label.PFANS6004FORMVIEW_SITEVALUATION')"
                    align="center"
                    width="120">
                    <template slot-scope="scope">
                      <el-input
                        :disabled="!disabled"
                        :no="scope.row"
                        style="width: 100%"
                        v-model="scope.row.sitevaluation">
                      </el-input>
                    </template>
                  </el-table-column>
                  <!--                退場理由-->
                  <el-table-column
                    :label="$t('label.PFANS6004FORMVIEW_EXITREASON')"
                    align="center"
                    width="120">
                    <template slot-scope="scope">
                      <el-input
                        :disabled="!disabled"
                        :no="scope.row"
                        style="width: 100%"
                        v-model="scope.row.exitreason">
                      </el-input>
                    </template>
                  </el-table-column>
                  <!--                業務影響-->
                  <el-table-column
                    :label="$t('label.PFANS6004FORMVIEW_BUSINESSIMPACT')"
                    align="center"
                    width="120">
                    <template slot-scope="scope">
                      <el-input
                        :disabled="!disabled"
                        :no="scope.row"
                        style="width: 100%"
                        v-model="scope.row.businessimpact">
                      </el-input>
                    </template>
                  </el-table-column>
                  <!--                対策-->
                  <el-table-column
                    :label="$t('label.PFANS6004FORMVIEW_COUNTERMEASURE')"
                    align="center"
                    width="120">
                    <template slot-scope="scope">
                      <el-input
                        :disabled="!disabled"
                        :no="scope.row"
                        style="width: 100%"
                        v-model="scope.row.countermeasure">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
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
  import {getDictionaryInfo, getSupplierinfor, getUserInfo,getorgGroupList} from '../../../../utils/customize';

  export default {
    name: "PFANS6006View",
    components: {
      EasyNormalContainer,
      user,
    },
    data() {
      return {
        loading: false,
        buttonList: [],
        baseInfo: {},
        scope: '',
        year: moment(new Date()).format('MM') < 4 ? moment(new Date()).add(-1, 'y').format("YYYY") : moment(new Date()).format('YYYY'),
        row: '',
        form: {
          year: "",
        },
        tableData: [{
          delegainformation_id: '',
          companyprojects_id:'',
          projectsystem_id:'',
          type: '',
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
      };
    },
    methods: {
      getList() {
        this.loading = true;
        this.$store
          .dispatch('PFANS6006Store/getYears', {'year': this.year,'group_id': '6ED276094B952D25E106897F7726BB58F9F9'})
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
                  type: 0,
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
      handleRowClick(row) {
         row.type='1'
      },
      yearChange(value) {
        this.year = moment(value).format('YYYY');
        this.getList();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      buttonClick(val) {
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
        if (column.level === 2 && columnIndex >= 0 && columnIndex < 9) {
          return {
            color: 'white',
            background: '#99CCFF !important',
            'border-bottom': '1px solid #99CCFF',
            'border-right': '1px solid #73B9FF',
          };
        }
        if (column.level === 2 && columnIndex >= 9 && columnIndex < 23) {
          return {
            color: 'white',
            background: '#99CC99 !important',
            'border-bottom': '1px solid #99CCFF',
            'border-right': '1px solid #73CC73',
          };
        }
        if (column.level === 2 && columnIndex >= 23 && columnIndex < 28) {
          return {
            color: 'white',
            background: '#99CCFF',
            'border-bottom': '1px solid #99CCFF',
            'border-right': '1px solid #73CC73',
          };
        }
        if (column.level === 1 && columnIndex >= 0 && columnIndex < 23) {
          return {
            color: 'white',
            background: '#005BAA !important',
          };
        }
      },

    },
    mounted() {
      this.getList();
    },
  }
</script>

<style scoped>

</style>
