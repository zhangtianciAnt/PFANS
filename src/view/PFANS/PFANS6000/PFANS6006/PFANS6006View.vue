<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :noback="true" :title="title"
                         @buttonClick="buttonClick" ref="container" v-loading="loading">
      <div slot="customize">
        <el-form label-position="top" label-width="8vw" ref="reff"  style="padding-top: 10px">
          <el-form-item>
            <el-row>
              <el-col :span="24">
                <div class="block">
                  <el-date-picker
                    :placeholder="$t('normal.error_09')"
                    @change="yearChange"
                    format="yyyy"
                    type="year"
                    v-model="years">
                  </el-date-picker>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding-top: 10px">
              <el-table :data="tableData" :header-cell-style="getRowClass" border header-cell-class-name="sub_bg_color_blue" stripe height="400"
                        style="width: 100%">
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
                        v-model="scope.row.company">
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
                        v-model="scope.row.suppliernameid">
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
                        v-model="scope.row.exitime">
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
                  <el-table-column
                    :label="$t('label.PFANS6005VIEW_PFDX')"
                    align="center"
                    width="120">
                    <template slot-scope="scope">
                      <el-input
                        :disabled="!disabled"
                        :no="scope.row"
                        style="width: 100%"
                        v-model="scope.row.distriobjects">
                      </el-input>
                    </template>
                  </el-table-column>
                  <!--                構内対象-->
                  <el-table-column
                    :label="$t('label.PFANS6005VIEW_SNDX')"
                    align="center"
                    width="120">
                    <template slot-scope="scope">
                      <el-input
                        :disabled="!disabled"
                        :no="scope.row"
                        style="width: 100%"
                        v-model="scope.row.venuetarget">
                      </el-input>
                    </template>
                  </el-table-column>
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
                    width="170">
                    <template slot-scope="scope">
                      <el-input-number
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
                        :disabled="!disabled"
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
  import {getDictionaryInfo, getSupplierinfor} from '../../../../utils/customize';

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
        years: moment(new Date()).format("YYYY"),
        row: '',
        tableData: [{
          project_name: '',
          managerid: '',
          company: '',
          suppliernameid: '',
          admissiontime: '',
          exitime: '',
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
        title: 'title.PFANS6006VIEW_TITLE',
        disabled: false,
        buttonList: [
          {
            'key': 'save',
            'name': 'button.save',
            'disabled': false,
          },
          // {
          //   'key': 'generate',
          //   'name': 'button.generate',
          //   'disabled': false
          // },
        ],
      };
    },
    methods: {
      yearChange(value) {
        this.years = moment(value).format('YYYY');
        // this.getDelegainformation(value);
      },
      buttonClick(val) {
        if (val === 'save') {
          this.updateexpatriatesinfor();
        }
        if (val === 'generate') {
          this.getexpatriatesinforthisyear();
        }
      },
      updateexpatriatesinfor() {
        this.loading = true;
        this.$store
          .dispatch('PFANS6004Store/updateexpatriatesinfor', this.tableData)
          .then(response => {
            Message({
              message: this.$t("normal.success_02"),
              type: "success",
              duration: 5 * 1000
            });
            this.data = response;
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
      getRowClass({row, column, rowIndex, columnIndex}) {
        if (column.level === 2 && columnIndex >= 0 && columnIndex < 10) {
          return {
            color: 'white',
            background: '#99CCFF !important',
            'border-bottom': '1px solid #99CCFF',
            'border-right': '1px solid #73B9FF',
          };
        }
        if (column.level === 2 && columnIndex >= 4 && columnIndex < 24) {
          return {
            color: 'white',
            background: '#99CC99 !important',
            'border-bottom': '1px solid #99CCFF',
            'border-right': '1px solid #73CC73',
          };
        }
        if (column.level === 2 && columnIndex >= 24 && columnIndex < 29) {
          return {
            color: 'white',
            background: '#99CCFF',
            'border-bottom': '1px solid #99CCFF',
            'border-right': '1px solid #73CC73',
          };
        }
        if (column.level === 1 && columnIndex >= 0 && columnIndex < 25) {
          return {
            color: 'white',
            background: '#005BAA !important',
          };
        }
      },
      getDelegainformation() {
        this.loading = true;
        this.$store
          .dispatch('PFANS6006Store/getDelegainformation', {})
          .then(response => {
            for (let j = 0; j < response.length; j++) {
              if (response[j].suppliernameid !== null && response[j].suppliernameid !== '') {
                let supplierInfo = getSupplierinfor(response[j].suppliernameid);
                if (supplierInfo) {
                  response[j].suppliernameid = supplierInfo.supchinese;
                }
              }
              if (response[j].admissiontime !== null && response[j].admissiontime !== '') {
                response[j].admissiontime = moment(response[j].admissiontime).format('YYYY-MM-DD');
              }
              if (response[j].exitime !== null && response[j].exitime !== '') {
                response[j].exitime = moment(response[j].exitime).format('YYYY-MM-DD');
              }
              if (response[j].jobclassification !== null && response[j].jobclassification !== '') {
                let letStage = getDictionaryInfo(response[j].jobclassification);
                if (letStage != null) {
                  response[j].jobclassification = letStage.value1;
                }
              }
              if (response[j].operationform !== null && response[j].operationform !== '') {
                let letStage = getDictionaryInfo(response[j].operationform);
                if (letStage != null) {
                  response[j].operationform = letStage.value1;
                }
              }
              if (response[j].distriobjects !== null && response[j].distriobjects !== '') {
                let letStage = getDictionaryInfo(response[j].distriobjects);
                if (letStage != null) {
                  response[j].distriobjects = letStage.value1;
                }
              }
              if (response[j].alltechnology !== null && response[j].alltechnology !== '') {
                let letStage = getDictionaryInfo(response[j].alltechnology);
                if (letStage != null) {
                  response[j].alltechnology = letStage.value1;
                }
              }
              if (response[j].sitevaluation !== null && response[j].sitevaluation !== '') {
                let letStage = getDictionaryInfo(response[j].sitevaluation);
                if (letStage != null) {
                  response[j].sitevaluation = letStage.value1;
                }
              }
              if (response[j].exitreason !== null && response[j].exitreason !== '') {
                let letStage = getDictionaryInfo(response[j].exitreason);
                if (letStage != null) {
                  response[j].exitreason = letStage.value1;
                }
              }
              if (response[j].businessimpact !== null && response[j].businessimpact !== '') {
                let letStage = getDictionaryInfo(response[j].businessimpact);
                if (letStage != null) {
                  response[j].businessimpact = letStage.value1;
                }
              }
              if (response[j].countermeasure !== null && response[j].countermeasure !== '') {
                let letStage = getDictionaryInfo(response[j].countermeasure);
                if (letStage != null) {
                  response[j].countermeasure = letStage.value1;
                }
              }
            }
            this.tableData = response;
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
      }
    },
    mounted() {
      this.getDelegainformation();
    },
  }
</script>

<style scoped>

</style>
