<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :title="title" @buttonClick="buttonClick"
                         ref="container" v-loading="loading">
      <div slot="customize">
        <el-form :model="form" label-position="top" label-width="8vw" ref="reff" style="padding: 2vw">
          <el-form-item >
              <el-table :data="tableData" border stripe :header-cell-style="getRowClass" style="width: 100%">
                <!-- 序号-->
                <el-table-column
                  :label="$t('label.PFANS2026FORMVIEW_ORDERNUMBER')"
                  align="center"
                  type="index"
                  width="80">
                </el-table-column>
                <!-- 名前-->
                <el-table-column
                  :label="$t('label.PFANS2007VIEW_NAME')"
                  align="center"
                  width="120">
                  <template slot-scope="scope">
                    <el-input
                      :no="scope.row"
                      :disabled="!disabled"
                      v-model="scope.row.user_id"
                      style="width: 100%">
                    </el-input>
                  </template>
                </el-table-column>
                <!-- 卒業年-->
                <el-table-column
                  :label="$t('label.PFANS2024VIEW_GRADUATIONYEAR')"
                  align="center"
                  width="160">
                  <template slot-scope="scope">
                  <el-date-picker
                    :no="scope.row"
                    :disabled="!disabled"
                    type="year"
                    style="width: 100%"
                    v-model="scope.row.graduation"
                  ></el-date-picker>
                  </template>
                </el-table-column>
                <!-- 会社名-->
                <el-table-column
                  :label="$t('label.PFANS1036FORMVIEW_CLUBNAME')"
                  align="center"
                  prop="company"
                  width="150">
                  <template slot-scope="scope">
                  <el-input
                    :no="scope.row"
                    :disabled="!disabled"
                    v-model="scope.row.company"
                    style="width: 100%">
                  </el-input>
                  </template>
                </el-table-column>
                <!-- 查定时间-->
                <el-table-column
                  :label="$t('label.PFANS6005VIEW_CHECKTIME')"
                  align="center"
                  width="200">
                  <template slot-scope="scope">
                    <el-date-picker
                      style="width:12vw"
                      :disabled="!disabled"
                      v-model="scope.row.assesstime"
                      type="datetime"
                      placeholder="选择日期时间">
                    </el-date-picker>
                  </template>
                </el-table-column>
                <!-- 技術スキル-->
                <el-table-column
                  :label="$t('label.PFANS6005FORMVIEW_TECHNOLOGY')"
                  align="center"
                  width="150">
                  <template slot-scope="scope">
                    <dicselect
                      :no="scope.row"
                      :code="code1"
                      :data="scope.row.technical"
                      :disabled="!disabled"
                      @change="(val)=>{changetechnical(val,scope.$index)}"
                      style="width: 100%"
                    ></dicselect>
                  </template>
                </el-table-column>
                <!-- 技術価値-->
                <el-table-column
                  :label="$t('label.PFANS6005FORMVIEW_TECHNOLOGYVALUE')"
                  align="center"
                  prop="technology"
                  width="150">
                  <template slot-scope="scope">
                    <el-input
                      :no="scope.row"
                      :disabled="disabled2"
                      v-model="scope.row.technology"
                      style="width: 100%">
                    </el-input>
                  </template>
                </el-table-column>
                <!-- 管理スキル-->
                <el-table-column
                  :label="$t('label.PFANS6005FORMVIEW_MANAGEMENTSKILLS')"
                  align="center"
                  prop="management"
                  width="150">
                  <template slot-scope="scope">
                    <dicselect
                      :no="scope.row"
                      :code="code2"
                      :data="scope.row.management"
                      :disabled="!disabled"
                      @change="(val)=>{changemanagement(val,scope.$index)}"
                      style="width: 100%"
                    ></dicselect>
                  </template>
                </el-table-column>
                <!-- 管理価値-->
                <el-table-column
                  :label="$t('label.PFANS6005FORMVIEW_MANAGEMENTVALUE')"
                  align="center"
                  prop="value"
                  width="150">
                  <template slot-scope="scope">
                    <el-input
                      :no="scope.row"
                      :disabled="disabled2"
                      v-model="scope.row.value"
                      style="width: 100%">
                    </el-input>
                  </template>
                </el-table-column>
                <!--   分野スキル-->
                <el-table-column
                  :label="$t('label.PFANS2026FORMVIEW_FIELDSKILLS')"
                  align="center"
                  prop="fieldskills"
                  width="150">
                  <template slot-scope="scope">
                    <dicselect
                      :no="scope.row"
                      :code="code3"
                      :data="scope.row.fieldskills"
                      :disabled="!disabled"
                      @change="(val)=>{changefieldskills(val,scope.$index)}"
                      style="width: 100%"
                    ></dicselect>
                  </template>
                </el-table-column>
                <!-- 分野価値-->
                <el-table-column
                  :label="$t('label.PFANS6005FORMVIEW_FIELDVALUE')"
                  align="center"
                  prop="field"
                  width="150">
                  <template slot-scope="scope">
                    <el-input
                      :no="scope.row"
                      :disabled="disabled2"
                      v-model="scope.row.field"
                      style="width: 100%">
                    </el-input>
                  </template>
                </el-table-column>
                <!-- 語学スキル-->
                <el-table-column
                  :label="$t('label.PFANS6005FORMVIEW_LANGUAGESKILLS')"
                  align="center"
                  prop="language"
                  width="150">
                  <template slot-scope="scope">
                    <dicselect
                      :no="scope.row"
                      :code="code4"
                      :data="scope.row.language"
                      :disabled="!disabled"
                      @change="((val)=>{changelanguage(val,scope.$index)})"
                      style="width: 100%"
                    ></dicselect>
                  </template>
                </el-table-column>
                <!--  語学価値-->
                <el-table-column
                  :label="$t('label.PFANS2026FORMVIEW_LANGUAGEVALUE')"
                  align="center"
                  prop="languagevalue"
                  width="150">
                  <template slot-scope="scope">
                    <el-input
                      :no="scope.row"
                      :disabled="disabled2"
                      v-model="scope.row.languagevalue"
                      style="width: 100%">
                    </el-input>
                  </template>
                </el-table-column>
                <!-- 勤務スキル-->
                <el-table-column
                  :label="$t('label.PFANS6005FORMVIEW_JOBSKILLS')"
                  align="center"
                  prop="workskills"
                  width="150">
                  <template slot-scope="scope">
                    <dicselect
                      :no="scope.row"
                      :code="code5"
                      :data="scope.row.workskills"
                      :disabled="!disabled"
                      @change="(val)=>{changeworkskills(val,scope.$index)}"
                      style="width: 100%"
                    ></dicselect>
                  </template>
                </el-table-column>
                <!--  勤務価値-->
                <el-table-column
                  :label="$t('label.PFANS6005FORMVIEW_WORKVALUE')"
                  align="center"
                  prop="service"
                  width="150">
                  <template slot-scope="scope">
                    <el-input
                      :no="scope.row"
                      :disabled="disabled2"
                      v-model="scope.row.service"
                      style="width: 100%">
                    </el-input>
                  </template>
                </el-table-column>
                <!-- 勤続評価-->
                <el-table-column
                  :label="$t('label.PFANS6005FORMVIEW_WORKTIME')"
                  align="center"
                  prop="evaluation"
                  width="150">
                  <template slot-scope="scope">
                    <dicselect
                      :no="scope.row"
                      :code="code6"
                      :data="scope.row.evaluation"
                      :disabled="!disabled"
                      @change="(val)=>{changeevaluation(val,scope.$index)}"
                      style="width: 100%"
                    ></dicselect>
                  </template>
                </el-table-column>
                <!--  勤続価値-->
                <el-table-column
                  :label="$t('label.PFANS6005FORMVIEW_WORKVALUE1')"
                  align="center"
                  prop="rvicevalue"
                  width="150">
                  <template slot-scope="scope">
                    <el-input
                      :no="scope.row"
                      :disabled="disabled2"
                      v-model="scope.row.rvicevalue"
                      style="width: 100%">
                    </el-input>
                  </template>
                </el-table-column>
                <!-- 責任者激励-->
                <el-table-column
                  :label="$t('label.PFANS6005FORMVIEW_INCENTIVELEADER')"
                  align="center"
                  width="150">
                  <!-- PSDCD駐在規模-->
                  <el-table-column
                    :label="$t('label.PFANS6005FORMVIEW_SERVINGSIZE')"
                    align="center"
                    prop="psdcdscale"
                    width="150">
                    <template slot-scope="scope">
                      <dicselect
                        :no="scope.row"
                        :code="code7"
                        :data="scope.row.psdcdscale"
                        :disabled="!disabled"
                        @change="(val)=>{changepsdcdscale(val,scope.$index)}"
                        style="width: 100%"
                      ></dicselect>
                    </template>
                  </el-table-column>
                <!-- 規模価値-->
                  <el-table-column
                    :label="$t('label.PFANS6005FORMVIEW_SIZEVALUE')"
                    align="center"
                    prop="scalevalue"
                    width="150">
                    <template slot-scope="scope">
                      <el-input
                        :no="scope.row"
                        :disabled="disabled2"
                        v-model="scope.row.scalevalue"
                        style="width: 100%">
                      </el-input>
                    </template>
                  </el-table-column>
                <!-- 貢献評価-->
                  <el-table-column
                    :label="$t('label.PFANS6005FORMVIEW_CONEVALUATION')"
                    align="center"
                    prop="contribution"
                    width="150">
                    <template slot-scope="scope">
                      <dicselect
                        :no="scope.row"
                        :code="code8"
                        :data="scope.row.contribution"
                        :disabled="!disabled"
                        @change="(val)=>{changecontribution(val,scope.$index)}"
                        style="width: 100%"
                      ></dicselect>
                    </template>
                  </el-table-column>
                <!-- 貢献係数-->
                  <el-table-column
                    :label="$t('label.PFANS6005FORMVIEW_CONCOEFFICIENT')"
                    align="center"
                    prop="coefficient"
                    width="150">
                    <template slot-scope="scope">
                      <el-input
                        :no="scope.row"
                        :disabled="disabled2"
                        v-model="scope.row.coefficient"
                        style="width: 100%">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <!--  出向者激励-->
                <el-table-column
                  :label="$t('label.PFANS6005FORMVIEW_OUTBOUNDMOTIVATION')"
                  align="center"
                  width="150">
                <!--出项者PSDCD相当ランク-->
                  <el-table-column
                    :label="$t('label.PFANS6005FORMVIEW_LEVELVALUE')"
                    align="center"
                    prop="staffpsdcdrank"
                    width="150">
                    <template slot-scope="scope">
                      <dicselect
                        :no="scope.row"
                        :code="code9"
                        :data="scope.row.staffpsdcdrank"
                        :disabled="!disabled"
                        @change="(val)=>{changestaffpsdcdrank(val,scope.$index)}"
                        style="width: 100%"
                      ></dicselect>
                    </template>
                  </el-table-column>
                  <!--  ランク価値-->
                  <el-table-column
                    :label="$t('label.PFANS6005FORMVIEW_LEVELVALUE')"
                    align="center"
                    prop="rankvalue"
                    width="150">
                    <template slot-scope="scope">
                      <el-input
                        :no="scope.row"
                        :disabled="disabled2"
                        v-model="scope.row.rankvalue"
                        style="width: 100%">
                      </el-input>
                    </template>
                  </el-table-column>
                <!--  貢献評価-->
                  <el-table-column
                    :label="$t('label.PFANS6005FORMVIEW_CONCOEFFICIENT')"
                    align="center"
                    prop="butionevaluation"
                    width="150">
                    <template slot-scope="scope">
                      <dicselect
                        :no="scope.row"
                        :code="code8"
                        :data="scope.row.butionevaluation"
                        :disabled="!disabled"
                        @change="(val)=>{changebutionevaluation(val,scope.$index)}"
                        style="width: 100%"
                      ></dicselect>
                    </template>
                  </el-table-column>
                <!-- 貢献係数-->
                  <el-table-column
                    :label="$t('label.PFANS6005FORMVIEW_SIZEVALUE')"
                    align="center"
                    prop="butioncoefficient"
                    width="150">
                    <template slot-scope="scope">
                      <el-input
                        :no="scope.row"
                        :disabled="disabled2"
                        v-model="scope.row.butioncoefficient"
                        style="width: 100%">
                      </el-input>
                    </template>
                  </el-table-column>
                </el-table-column>
                <!-- 開発単価微調整-->
                <el-table-column
                  :label="$t('label.PFANS6005VIEW_PRICEADJUST')"
                  align="center"
                  prop="unitprice"
                  width="150">
                  <template slot-scope="scope">
                    <el-input
                      :no="scope.row"
                      :disabled="!disabled"
                      v-model="scope.row.unitprice"
                      @blur="unitpriceBuler(scope.$index)"
                      style="width: 100%">
                    </el-input>
                  </template>
                </el-table-column>
                <!-- 開発総単価-->
                <el-table-column
                  :label="$t('label.PFANS6005VIEW_SUMPRICE')"
                  align="center"
                  prop="totalunit"
                  width="150">
                  <template slot-scope="scope">
                    <el-input
                      :no="scope.row"
                      :disabled="disabled2"
                      v-model="scope.row.totalunit"
                      style="width: 100%">
                    </el-input>
                  </template>
                </el-table-column>
                <!-- 共通費用-->
                <el-table-column
                  :label="$t('label.PFANS6005FORMVIEW_COMMONCOST')"
                  align="center"
                  prop="common"
                  width="150">
                  <template slot-scope="scope">
                    <el-input
                      :no="scope.row"
                      :disabled="disabled2"
                      v-model="scope.row.common"
                      style="width: 100%">
                    </el-input>
                  </template>
                </el-table-column>
                <!-- PSDCD相当ランク-->
                <el-table-column
                  :label="$t('label.PFANS6005VIEW_PSDCDGRADE')"
                  align="center"
                  prop="psdcdrank"
                  width="150">
                  <template slot-scope="scope">
                    <dicselect
                      :no="scope.row"
                      :code="code9"
                      :data="scope.row.psdcdrank"
                      :disabled="!disabled"
                      @change="(val)=>{changepsdcdrank(val,scope.$index)}"
                      style="width: 100%"
                    ></dicselect>
                  </template>
                </el-table-column>
                <!--  備考-->
                <el-table-column
                  :label="$t('label.PFANS6007VIEW_REMARKS')"
                  align="center"
                  prop="remarks"
                  width="150">
                  <template slot-scope="scope">
                    <el-input
                      :no="scope.row"
                      :disabled="!disabled"
                      v-model="scope.row.remarks"
                      style="width: 100%">
                    </el-input>
                  </template>
                </el-table-column>
                <!-- 前年単価-->
                <el-table-column
                  :label="$t('label.PFANS6005VIEW_LASTYEARPRICE')"
                  align="center"
                  prop="yearunit"
                  width="150">
                  <template slot-scope="scope">
                    <el-input
                      :no="scope.row"
                      plain
                      :disabled="disabled2"
                      v-model="scope.row.yearunit"
                      style="width: 100%">
                    </el-input>
                  </template>
                </el-table-column>
              </el-table>
          </el-form-item>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
    import EasyNormalContainer from '@/components/EasyNormalContainer';
    import dicselect from '../../../components/dicselect.vue';
    import {Message} from 'element-ui';
    import user from '../../../components/user.vue';
    import {getOrgInfoByUserId} from '@/utils/customize';
    import {validateEmail} from '@/utils/validate';
    import moment from 'moment';
    import {getDictionaryInfo, getStatus, getUserInfo} from '@/utils/customize';
    export default {
      name: "PFANS6005FormView",
      components: {
        dicselect,
        EasyNormalContainer,
        user,
        validateEmail,
      },
      data() {
        return {
          loading: false,
          buttonList: [],
          baseInfo: {},
          scope: '',
          row: '',
          arr: [],//二维数组初始化变量服务于更改和计算
          tableData: [{
            pricesetid: '',
            user_id: '',
            graduation: '',
            company: '',
            assesstime: '',
            technical: '',
            technology: '',
            management: '',
            value: '',
            fieldskills: '',
            field: '',
            language: '',
            languagevalue: '',
            workskills: '',
            service: '',
            evaluation: '',
            rvicevalue: '',
            psdcdscale: '',
            scalevalue: '',
            contribution: '',
            coefficient: '',
            staffpsdcdrank: '',
            rankvalue: '',
            butionevaluation: '',
            butioncoefficient: '',
            unitprice: '',
            totalunit: '',
            common: '',
            psdcdrank: '',
            remarks: '',
            yearunit: '',
            year: '',
          }
          ],
          form: {
          //   pricesetid: '',
          //   user_id: '',
          //   graduation: '',
          //   company: '',
          //   assesstime: '',
          //   technical: '',
          //   technology: '',
          //   management: '',
          //   value: '',
          //   fieldskills: '',
          //   field: '',
          //   language: '',
          //   languagevalue: '',
          //   workskills: '',
          //   service: '',
          //   evaluation: '',
          //   rvicevalue: '',
          //   psdcdscale: '',
          //   scalevalue: '',
          //   contribution: '',
          //   coefficient: '',
          //   staffpsdcdrank: '',
          //   rankvalue: '',
          //   butionevaluation: '',
          //   butioncoefficient: '',
          //   unitprice: '',
          //   totalunit: '',
          //   common: '',
          //   psdcdrank: '',
          //   remarks: '',
          //   yearunit: '',
          //   year: '',
          },
          code1: 'BP015',
          code2: 'BP016',
          code3: 'BP017',
          code4: 'BP018',
          code5: 'BP019',
          code6: 'BP020',
          code7: 'BP021',
          code8: 'BP022',
          code9: 'BP023',
          data: [],
          title: 'title.PFANS6005VIEW',
          disabled: false,
          disabled2: true,
          buttonList: [
            {
              key: 'save',
              name: 'button.save',
              disabled: false,
              icon: 'el-icon-check',
            },
          ],
        };
      },
      mounted() {
        this.getpriceset();
      },
      created() {
        this.disabled = this.$route.params.disabled;
        if (this.disable) {
          this.buttonList = [
            {
              key: 'save',
              name: 'button.save',
              disabled: false,
              icon: 'el-icon-check',
            },
          ];
        }
      },

      methods: {
        countTotalunit(index){
                let sum = 0;
                for(let i=0 ; i<6;i++){
                    if(this.arr[index][i] !== "" && this.arr[index][i] !== null)
                    sum += this.arr[index][i];
                }
            this.tableData[index].totalunit = sum+(this.arr[index][8]*this.arr[index][9])+this.arr[index][10];
            this.tableData[index].common = this.arr[index][6]*this.arr[index][7];
        },
        unitpriceBuler(index){
            if(this.tableData[index].unitprice !== '' && this.tableData[index].unitprice !== null){
                this.arr[index][10] = parseInt(this.tableData[index].unitprice);
                this.countTotalunit(index);
            }else{
                this.arr[index][10] = 0;
                this.countTotalunit(index);
            }

        },
        getRowClass({row, column, rowIndex, columnIndex}) {
          if (column.level === 2 && columnIndex >= 0 && columnIndex < 4) {
            return {
              color: 'white',
              background: '#99CCFF',
              'border-bottom': '1px solid #99CCFF',
              'border-right': '1px solid #73B9FF',
            };
          }
          if (column.level === 2 && columnIndex >= 4 && columnIndex < 8) {
            return {
              color: 'white',
              background: '#99CC99',
              'border-bottom': '1px solid #99CCFF',
              'border-right': '1px solid #73CC73',
            };
          }
          if (column.level === 1 && columnIndex >= 0 && columnIndex < 25) {
            return {
              color: 'white',
              background: '#005BAA',
            };
          }
        },
        getpriceset() {
          this.loading = true;
          this.$store
            .dispatch('PFANS6005Store/getpriceset', {})
            .then(response => {
              for (let j = 0; j < response.length; j++) {
                response[j].assesstime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
                    this.arr[j] = [];
                    this.arr[j][0] = parseInt(response[j].technology==null?0:response[j].technology)
                    this.arr[j][1] = parseInt(response[j].value==null?0:response[j].value)
                    this.arr[j][2] = parseInt(response[j].field==null?0:response[j].field)
                    this.arr[j][3] = parseInt(response[j].languagevalue==null?0:response[j].languagevalue)
                    this.arr[j][4] = parseInt(response[j].service==null?0:response[j].service)
                    this.arr[j][5] = parseInt(response[j].rvicevalue==null?0:response[j].rvicevalue)
                    this.arr[j][6] = parseInt(response[j].scalevalue==null?0:response[j].scalevalue)
                    this.arr[j][7] = parseFloat(response[j].coefficient==null?0:response[j].coefficient)
                    this.arr[j][8] = parseInt(response[j].rankvalue==null?0:response[j].rankvalue)
                    this.arr[j][9] = parseFloat(response[j].butioncoefficient==null?0:response[j].butioncoefficient)
                    this.arr[j][10] = parseInt(response[j].unitprice==null?0:response[j].unitprice)
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
        },
        updatepriceset() {
          this.loading = true;
          this.$store
            .dispatch('PFANS6005Store/updatepriceset', this.tableData)
            .then(response => {
              Message({
                message: this.$t("normal.success_02"),
                type: "success",
                duration: 5 * 1000
              });
              this.data = response;
              this.loading = false;
              this.getpriceset();
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
        buttonClick(val) {
          if (val === 'save') {
            this.updatepriceset();
            this.getpriceset();
          }
        },
        changetechnical(val,index){
          this.tableData[index].technical = val;
          let dictionaryInfo = getDictionaryInfo(val);
          if (dictionaryInfo) {
            this.tableData[index].technology = dictionaryInfo.value2;
          }
          this.arr[index][0] = parseInt(this.tableData[index].technology);
          this.countTotalunit(index);
        },
        changemanagement(val,index){
          this.tableData[index].management = val;
          let dictionaryInfo = getDictionaryInfo(val);
          if (dictionaryInfo) {
            this.tableData[index].value = dictionaryInfo.value2;
          }
            this.arr[index][1] = parseInt(this.tableData[index].value);
            this.countTotalunit(index);
        },
        changefieldskills(val,index){
          this.tableData[index].fieldskills = val;
          let dictionaryInfo = getDictionaryInfo(val);
          if (dictionaryInfo) {
            this.tableData[index].field = dictionaryInfo.value2;
          }
            this.arr[index][2] = parseInt(this.tableData[index].field);
            this.countTotalunit(index);
        },
        changelanguage(val,index){
          this.tableData[index].language = val;
          let dictionaryInfo = getDictionaryInfo(val);
          if (dictionaryInfo) {
            this.tableData[index].languagevalue = dictionaryInfo.value2;
          }
            this.arr[index][3] = parseInt(this.tableData[index].languagevalue);
            this.countTotalunit(index);
        },
        changeworkskills(val,index){
          this.tableData[index].workskills = val;
          let dictionaryInfo = getDictionaryInfo(val);
          if (dictionaryInfo) {
            this.tableData[index].service = dictionaryInfo.value2;
          }
            this.arr[index][4] = parseInt(this.tableData[index].service);
            this.countTotalunit(index);
        },
        changeevaluation(val,index){
          this.tableData[index].evaluation = val;
          let dictionaryInfo = getDictionaryInfo(val);
          if (dictionaryInfo) {
            this.tableData[index].rvicevalue = dictionaryInfo.value2;
          }
            this.arr[index][5] = parseInt(this.tableData[index].rvicevalue);
            this.countTotalunit(index);
        },
        changepsdcdscale(val,index){
          this.tableData[index].psdcdscale = val;
          let dictionaryInfo = getDictionaryInfo(val);
          if (dictionaryInfo) {
            this.tableData[index].scalevalue = dictionaryInfo.value2;
          }
            this.arr[index][6] = parseInt(this.tableData[index].scalevalue);
        },
        changecontribution(val,index){
          this.tableData[index].contribution = val;
          let dictionaryInfo = getDictionaryInfo(val);
          if (dictionaryInfo) {
            this.tableData[index].coefficient = dictionaryInfo.value2;
          }
            this.arr[index][7] = parseFloat(this.tableData[index].coefficient);
            this.countTotalunit(index);
        },
        changestaffpsdcdrank(val,index){
          this.tableData[index].staffpsdcdrank = val;
          let dictionaryInfo = getDictionaryInfo(val);
          if (dictionaryInfo) {
            this.tableData[index].rankvalue = dictionaryInfo.value2;
          }
            this.arr[index][8] = parseInt(this.tableData[index].rankvalue);
        },
        changebutionevaluation(val,index){
          this.tableData[index].butionevaluation = val;
          let dictionaryInfo = getDictionaryInfo(val);
          if (dictionaryInfo) {
            this.tableData[index].butioncoefficient = dictionaryInfo.value2;
          }
            this.arr[index][9] = parseFloat(this.tableData[index].butioncoefficient);
            this.countTotalunit(index);
        },
        changepsdcdrank(val,index){
          this.tableData[index].psdcdrank = val;
          let dictionaryInfo = getDictionaryInfo(val);
          if (dictionaryInfo) {
            this.tableData[index].psdcdrank = dictionaryInfo.value2;
          }
        },
      },
    }
</script>

<style scoped>

</style>
