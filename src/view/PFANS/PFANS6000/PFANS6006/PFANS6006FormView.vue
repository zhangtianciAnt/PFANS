<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :title="title" @buttonClick="buttonClick"
                         ref="container" v-loading="loading">
      <div slot="customize">
        <el-form :model="form" label-position="top" label-width="8vw" ref="reff" style="padding: 2vw">
          <el-form-item>
            <el-row style="padding-top: 1%;padding-bottom: 2%">
              <el-col :span="8">
                <div class="block">
                  <el-date-picker
                    v-model="years"
                    type="year"
                    @change="yearChange"
                    format="yyyy"
                    :placeholder="$t('normal.error_09')">
                  </el-date-picker>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="block">
                  <el-date-picker
                    v-model="years"
                    type="year"
                    @change="yearChange"
                    format="yyyy"
                    :placeholder="$t('normal.error_09')">
                  </el-date-picker>
                </div>
              </el-col>
            </el-row>
            <el-table :data="tableData" border stripe :header-cell-style="getRowClass" style="width: 100%">
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
                align="center"
                width="150">
                <!--                pj名-->
                <el-table-column
                  :label="$t('label.PFANS6007VIEW_PJNAME')"
                  align="center"
                  width="80">
                  <template slot-scope="scope">
                    <el-input
                      :no="scope.row"
                      :disabled="!disabled"
                      v-model="scope.row.project_name"
                      style="width: 100%">
                    </el-input>
                  </template>
                </el-table-column>
                <!--                窓口-->
                <el-table-column
                  :label="$t('label.PFANS6007VIEW_PSDCDWINDOW')"
                  align="center"
                  width="80">
                  <template slot-scope="scope">
                    <el-input
                      :no="scope.row"
                      :disabled="!disabled"
                      v-model="scope.row.managerid"
                      style="width: 100%">
                    </el-input>
                  </template>
                </el-table-column>
                <!--                BP会社名-->
                <el-table-column
                  :label="$t('label.PFANS6007VIEW_BPCLUBNAME')"
                  align="center"
                  width="80">
                  <template slot-scope="scope">
                    <el-input
                      :no="scope.row"
                      :disabled="!disabled"
                      v-model="scope.row.suppliername"
                      style="width: 100%">
                    </el-input>
                  </template>
                </el-table-column>
                <!--                BP名前-->
                <el-table-column
                  :label="$t('label.PFANS5001FORMVIEW_BPNAME')"
                  align="center"
                  width="80">
                  <template slot-scope="scope">
                    <el-input
                      :no="scope.row"
                      :disabled="!disabled"
                      v-model="scope.row.expname"
                      style="width: 100%">
                    </el-input>
                  </template>
                </el-table-column>
                <!--                入场时间-->
                <el-table-column
                  :label="$t('label.PFANS6004FORMVIEW_ADMISSIONTIME')"
                  align="center"
                  width="80">
                  <template slot-scope="scope">
                    <el-input
                      :no="scope.row"
                      :disabled="!disabled"
                      v-model="scope.row.admissiontime"
                      style="width: 100%">
                    </el-input>
                  </template>
                </el-table-column>
                <!--                退场时间-->
                <el-table-column
                  :label="$t('label.PFANS6004FORMVIEW_EXITIME')"
                  align="center"
                  width="80">
                  <template slot-scope="scope">
                    <el-input
                      :no="scope.row"
                      :disabled="!disabled"
                      v-model="scope.row.exitime"
                      style="width: 100%">
                    </el-input>
                  </template>
                </el-table-column>
                <!--                作業形態-->
                <el-table-column
                  :label="$t('label.PFANS6004FORMVIEW_OPERATIONFORM')"
                  align="center"
                  width="80">
                  <template slot-scope="scope">
                    <el-input
                      :no="scope.row"
                      :disabled="!disabled"
                      v-model="scope.row.operationform"
                      style="width: 100%">
                    </el-input>
                  </template>
                </el-table-column>
                <!--                作業分類-->
                <el-table-column
                  :label="$t('label.PFANS6004FORMVIEW_JOBCLASSIFICATIONM')"
                  align="center"
                  width="80">
                  <template slot-scope="scope">
                    <el-input
                      :no="scope.row"
                      :disabled="!disabled"
                      v-model="scope.row.jobclassification"
                      style="width: 100%">
                    </el-input>
                  </template>
                </el-table-column>
                <!--                配賦対象-->
                <el-table-column
                  :label="$t('label.PFANS6005VIEW_PFDX')"
                  align="center"
                  width="130">
                  <template slot-scope="scope">
                    <el-input
                      :no="scope.row"
                      :disabled="!disabled"
                      v-model="scope.row.distributionobj"
                      style="width: 100%">
                    </el-input>
                  </template>
                </el-table-column>
                <!--                構内対象-->
                <el-table-column
                  :label="$t('label.PFANS6005VIEW_SNDX')"
                  align="center"
                  width="130">
                  <template slot-scope="scope">
                    <el-input
                      :no="scope.row"
                      :disabled="!disabled"
                      v-model="scope.row.venuetarget"
                      style="width: 100%">
                    </el-input>
                  </template>
                </el-table-column>
              </el-table-column>


              <!--              第二组-->
              <!--活用状况-->
              <el-table-column
                :label="$t('label.PFANS2023FORMVIEW_INTELLIGENCE')"
                align="center"
                width="150">

                <!--四月-->
                <el-table-column
                  :label="$t('label.April')"
                  align="center"
                  width="80">
                  <template slot-scope="scope">
                    <el-input-number
                      style="width:20vw"
                      controls-position="right"
                      :max="9999999999"
                      :min="0"
                      :step="1"
                      :precision="2"
                      v-model="scope.row.april">
                    </el-input-number>
                  </template>
                </el-table-column>
                <!--五月-->
                <el-table-column
                  :label="$t('label.May')"
                  align="center"
                  width="80">
                  <template slot-scope="scope">
                    <el-input-number
                      style="width:20vw"
                      controls-position="right"
                      :max="9999999999"
                      :min="0"
                      :step="1"
                      :precision="2"
                      v-model="scope.row.may">
                    </el-input-number>
                  </template>
                </el-table-column>
                <!--六月-->
                <el-table-column
                  :label="$t('label.June')"
                  align="center"
                  width="80">
                  <template slot-scope="scope">
                    <el-input-number
                      style="width:20vw"
                      controls-position="right"
                      :max="9999999999"
                      :min="0"
                      :step="1"
                      :precision="2"
                      v-model="scope.row.june">
                    </el-input-number>
                  </template>
                </el-table-column>
                <!--七月-->
                <el-table-column
                  :label="$t('label.July')"
                  align="center"
                  width="80">
                  <template slot-scope="scope">
                    <el-input-number
                      style="width:20vw"
                      controls-position="right"
                      :max="9999999999"
                      :min="0"
                      :step="1"
                      :precision="2"
                      v-model="scope.row.july">
                    </el-input-number>
                  </template>
                </el-table-column>
                <!--八月-->
                <el-table-column
                  :label="$t('label.August')"
                  align="center"
                  width="80">
                  <template slot-scope="scope">
                    <el-input-number
                      style="width:20vw"
                      controls-position="right"
                      :max="9999999999"
                      :min="0"
                      :step="1"
                      :precision="2"
                      v-model="scope.row.august">
                    </el-input-number>
                  </template>
                </el-table-column>
                <!--九月-->
                <el-table-column
                  :label="$t('label.September')"
                  align="center"
                  width="80">
                  <template slot-scope="scope">
                    <el-input-number
                      style="width:20vw"
                      controls-position="right"
                      :max="9999999999"
                      :min="0"
                      :step="1"
                      :precision="2"
                      v-model="scope.row.september">
                    </el-input-number>
                  </template>
                </el-table-column>
                <!--十月-->
                <el-table-column
                  :label="$t('label.October')"
                  align="center"
                  width="80">
                  <template slot-scope="scope">
                    <el-input-number
                      style="width:20vw"
                      controls-position="right"
                      :max="9999999999"
                      :min="0"
                      :step="1"
                      :precision="2"
                      v-model="scope.row.october">
                    </el-input-number>
                  </template>
                </el-table-column>
                <!--十一月-->
                <el-table-column
                  :label="$t('label.November')"
                  align="center"
                  width="80">
                  <template slot-scope="scope">
                    <el-input-number
                      style="width:20vw"
                      controls-position="right"
                      :max="9999999999"
                      :min="0"
                      :step="1"
                      :precision="2"
                      v-model="scope.row.november">
                    </el-input-number>
                  </template>
                </el-table-column>
                <!--十二月-->
                <el-table-column
                  :label="$t('label.December')"
                  align="center"
                  width="80">
                  <template slot-scope="scope">
                    <el-input-number
                      style="width:20vw"
                      controls-position="right"
                      :max="9999999999"
                      :min="0"
                      :step="1"
                      :precision="2"
                      v-model="scope.row.december">
                    </el-input-number>
                  </template>
                </el-table-column>
                <!--一月-->
                <el-table-column
                  :label="$t('label.January')"
                  align="center"
                  width="80">
                  <template slot-scope="scope">
                    <el-input-number
                      style="width:20vw"
                      controls-position="right"
                      :max="9999999999"
                      :min="0"
                      :step="1"
                      :precision="2"
                      v-model="scope.row.january">
                    </el-input-number>
                  </template>
                </el-table-column>
                <!--二月-->
                <el-table-column
                  :label="$t('label.February')"
                  align="center"
                  width="80">
                  <template slot-scope="scope">
                    <el-input-number
                      style="width:20vw"
                      controls-position="right"
                      :max="9999999999"
                      :min="0"
                      :step="1"
                      :precision="2"
                      v-model="scope.row.february">
                    </el-input-number>
                  </template>
                </el-table-column>
                <!--三月-->
                <el-table-column
                  :label="$t('label.March')"
                  align="center"
                  width="80">
                  <template slot-scope="scope">
                    <el-input-number
                      style="width:20vw"
                      controls-position="right"
                      :max="9999999999"
                      :min="0"
                      :step="1"
                      :precision="2"
                      v-model="scope.row.march">
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
                      :no="scope.row"
                      :disabled="!disabled"
                      v-model="scope.row.monthlength"
                      style="width: 100%">
                    </el-input>
                  </template>
                </el-table-column>
                <!--備考-->
                <el-table-column
                  :label="$t('label.PFANS6007VIEW_REMARKS')"
                  align="center"
                  width="80">
                  <template slot-scope="scope">
                    <el-input
                      :disabled="!disabled"
                      :rows="2"
                      style="width: 72vw"
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
                align="center"
                width="150">
                <!--                所有情报-->
                <el-table-column
                  :label="$t('label.PFANS6004FORMVIEW_ALLTECHNOLOGY')"
                  align="center"
                  width="80">
                  <template slot-scope="scope">
                    <el-input
                      :no="scope.row"
                      :disabled="!disabled"
                      v-model="scope.row.alltechnology"
                      style="width: 100%">
                    </el-input>
                  </template>
                </el-table-column>
                <!--                現場評価-->
                <el-table-column
                  :label="$t('label.PFANS6004FORMVIEW_SITEVALUATION')"
                  align="center"
                  width="80">
                  <template slot-scope="scope">
                    <el-input
                      :no="scope.row"
                      :disabled="!disabled"
                      v-model="scope.row.sitevaluation"
                      style="width: 100%">
                    </el-input>
                  </template>
                </el-table-column>
                <!--                退場理由-->
                <el-table-column
                  :label="$t('label.PFANS6004FORMVIEW_EXITREASON')"
                  align="center"
                  width="80">
                  <template slot-scope="scope">
                    <el-input
                      :no="scope.row"
                      :disabled="!disabled"
                      v-model="scope.row.exitreason"
                      style="width: 100%">
                    </el-input>
                  </template>
                </el-table-column>
                <!--                業務影響-->
                <el-table-column
                  :label="$t('label.PFANS6004FORMVIEW_BUSINESSIMPACT')"
                  align="center"
                  width="80">
                  <template slot-scope="scope">
                    <el-input
                      :no="scope.row"
                      :disabled="!disabled"
                      v-model="scope.row.businessimpact"
                      style="width: 100%">
                    </el-input>
                  </template>
                </el-table-column>
                <!--                対策-->
                <el-table-column
                  :label="$t('label.PFANS6004FORMVIEW_COUNTERMEASURE')"
                  align="center"
                  width="80">
                  <template slot-scope="scope">
                    <el-input
                      :no="scope.row"
                      :disabled="!disabled"
                      v-model="scope.row.countermeasure"
                      style="width: 100%">
                    </el-input>
                  </template>
                </el-table-column>
              </el-table-column>
            </el-table>
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
    import {getDictionaryInfo} from '@/utils/customize';

    export default {
        name: "PFANS6006FormView",
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
                row: '',
                years: moment(new Date()).format("YYYY"),
                tableData: [{
                    project_name: '',
                    managerid: '',
                    suppliername: '',
                    expname: '',
                    admissiontime: '',
                    exitime: '',
                    operationform: '',
                    jobclassification: '',
                    distributionobj: '',
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
                }
                ],
                data: [],
                title: 'title.PFANS6006VIEW'
                disabled: false,
                buttonList: [
                    {
                        'key': 'save',
                        'name': 'button.save',
                        'disabled': false,
                    },
                    {
                        'key': 'generate',
                        'name': 'button.generate',
                        'disabled': false,
                    },
                ],
            };
        },
        methods: {
            yearChange(value) {
                this.years = moment(value).format('YYYY');
                // this.selectData(value);
            },
            getexpatriatesinfor() {
                this.loading = true;
                this.$store
                    .dispatch('PFANS6004Store/getexpatriatesinfor', {})
                    .then(response => {
                        let _tableList = response;
                        for (let j = 0; j < _tableList.length; j++) {
                            if (_tableList[j].expname !== null && _tableList[j].expname !== "") {
                                let expname = getUserInfo(_tableList[j].expname);
                                if (expname) {
                                    _tableList[j].expname = user.userinfo.customername;
                                }
                            }
                            if (_tableList[j].suppliername !== null && _tableList[j].suppliername !== "") {
                                let suppliername = getUserInfo(_tableList[j].suppliername);
                                if (suppliername) {
                                    _tableList[j].suppliername = user.userinfo.customername;
                                }
                            }
                            if (_tableList[j].admissiontime !== null && _tableList[j].admissiontime !== "") {
                                _tableList[j].admissiontime = moment(_tableList[j].admissiontime).format("YYYY-MM-DD");
                            }
                            if (_tableList[j].exitime !== null && _tableList[j].exitime !== "") {
                                _tableList[j].exitime = moment(_tableList[j].exitime).format("YYYY-MM-DD");
                            }
                            if (_tableList[j].operationform !== null && _tableList[j].operationform !== "") {
                                let operationform = getDictionaryInfo(_tableList[j].operationform);
                                if (operationform != null) {
                                    _tableList[j].operationform = operationform.value1;
                                }
                            }
                            if (_tableList[j].jobclassification !== null && _tableList[j].jobclassification !== "") {
                                let jobclassification = getDictionaryInfo(_tableList[j].jobclassification);
                                if (jobclassification != null) {
                                    _tableList[j].jobclassification = jobclassification.value1;
                                }
                            }
                            if (_tableList[j].alltechnology !== null && _tableList[j].alltechnology !== "") {
                                let alltechnology = getUserInfo(_tableList[j].alltechnology);
                                if (alltechnology) {
                                    _tableList[j].alltechnology = user.userinfo.customername;
                                }
                            }
                            if (_tableList[j].sitevaluation !== null && _tableList[j].sitevaluation !== "") {
                                let sitevaluation = getDictionaryInfo(_tableList[j].sitevaluation);
                                if (sitevaluation != null) {
                                    _tableList[j].sitevaluation = sitevaluation.value1;
                                }
                            }
                            if (_tableList[j].exitreason !== null && _tableList[j].exitreason !== "") {
                                let exitreason = getDictionaryInfo(_tableList[j].exitreason);
                                if (exitreason != null) {
                                    _tableList[j].exitreason = exitreason.value1;
                                }
                            }
                            if (_tableList[j].businessimpact !== null && _tableList[j].businessimpact !== "") {
                                let businessimpact = getDictionaryInfo(_tableList[j].businessimpact);
                                if (businessimpact != null) {
                                    _tableList[j].businessimpact = businessimpact.value1;
                                }
                            }
                            if (_tableList[j].countermeasure !== null && _tableList[j].countermeasure !== "") {
                                let countermeasure = getDictionaryInfo(_tableList[j].countermeasure);
                                if (countermeasure != null) {
                                    _tableList[j].countermeasure = countermeasure.value1;
                                }
                            }
                        }
                        this.data = _tableList;
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
            this.getexpatriatesinfor();
        },
    }
</script>

<style scoped>

</style>
