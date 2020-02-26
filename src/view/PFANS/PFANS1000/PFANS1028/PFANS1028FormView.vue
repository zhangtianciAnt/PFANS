<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList"
                         :title="title"
                         @buttonClick="buttonClick"
                         :canStart="canStart"
                         @end="end" @start="start"
                         @workflowState="workflowState"
                         ref="container"
                         v-loading="loading">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="reff" style="padding: 2vw">
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane :label="$t('label.PFANS1028VIEW_JUDGE')" name="first">
              <div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1028VIEW_CAREER')">
                      <el-input  :disabled="!disable" style="width:20vw" v-model="form.career"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :error="errorgroup" :label="$t('label.PFANS1028VIEW_ORGANIZATION')" prop="group_id">
                      <org :disabled="!disable" :error="errorgroup" :orglist="grouporglist" @getOrgids="getGroupId"
                           orgtype="2" style="width:20vw"></org>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <!--取契约番号，do-->
                    <el-form-item :label="$t('label.PFANS1028VIEW_NO')">
                      <el-select :disabled="!disable" style="width:20vw" v-model="form.contractnumber">
                        <el-option
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                          v-for="item in options">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <!--取契约番号-->
                    <el-form-item :label="$t('label.PFANS1028VIEW_JAPANNO')">
                      <el-select :disabled="!disable" style="width:20vw" v-model="form.contractnumber">
                        <el-option
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                          v-for="item in options">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <!--带出PJ名-->
                    <el-form-item :label="$t('label.PFANS1028VIEW_NAME')">
                      <el-input  :disabled="!disable" style="width:20vw" v-model="form.placejapanese"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1032FORMVIEW_DEPOSITARY')">
                      <el-input  :disabled="!disable" style="width:20vw" v-model="form.depositary"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <!--写达到TO-->
                    <el-form-item :label="$t('label.PFANS1028VIEW_COUNTRY')">
                      <el-input  :disabled="!disable"style="width:20vw" v-model="form.varto"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>


                <!--关联-->
                <el-row>
                  <el-col :span="24">
                      <el-form-item
                        :label="$t('label.PFANS1028VIEW_REVIEW')">
                        <el-checkbox-group v-model="checkList">
                          <el-checkbox  :label="$t('label.PFANS1028VIEW_REQUIREMENTS1')"></el-checkbox>
                          <el-checkbox  :label="$t('label.PFANS1028VIEW_REQUIREMENTS3')"></el-checkbox>
                          <el-checkbox  :label="$t('label.PFANS1028VIEW_REQUIREMENTS2')"></el-checkbox>
                        </el-checkbox-group>
                      </el-form-item>
                  </el-col>
                </el-row>

                <!--关联-->
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1028VIEW_REQUIREMENTS')"   prop="careerplan">
                      <span style="margin-right: 1vw ">{{$t('label.PFANS1028VIEW_NOT')}}</span>
                      <el-switch
                        :disabled="!disabled"
                        v-model="form.careerplan"
                        active-value="1"
                        inactive-value="0"
                        @change="radiochange">
                      </el-switch>
                      <span style="margin-left: 1vw ">{{$t('label.PFANS1028VIEW_YES')}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>



               <!--開発開始日-->
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1028VIEW_PERIOD')" >
                      <el-date-picker
                        v-model="form.claimdatetime"
                        :disabled="!disable"
                        type="daterange"
                        :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                        :start-placeholder="$t('label.startdate')"
                        :end-placeholder="$t('label.enddate')"
                        style="width:20vw">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item :label="$t('label.PFANS1028VIEW_TECHNICAL')">
                      <el-input  :disabled="!disable"  v-model="form.technical"  style="width: 70vw" type="textarea"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item
                      :label="$t('label.PFANS1028VIEW_POSSIBLE')">
                      <el-checkbox-group v-model="checkList">
                        <el-checkbox  :label="$t('label.PFANS1028VIEW_BOOKS')"></el-checkbox>
                        <el-checkbox  :label="$t('label.PFANS1028VIEW_SOFTWARE')"></el-checkbox>
                        <el-checkbox  :label="$t('label.PFANS1028VIEW_MAIL')"></el-checkbox>
                        <el-checkbox  :label="$t('label.PFANS1028VIEW_SERVER')"></el-checkbox>
                        <el-checkbox  :label="$t('label.PFANS1028VIEW_MEETING')"></el-checkbox>
                        <el-checkbox  :label="$t('label.PFANS1028VIEW_COUNTRY2')"></el-checkbox>
                        <el-checkbox  :label="$t('label.PFANS1028VIEW_OTHERC')"></el-checkbox>
                        <el-checkbox  :label="$t('label.PFANS1028VIEW_OVERSEA')"></el-checkbox>
                        <el-checkbox  :label="$t('label.PFANS1028VIEW_COUNTRY3')"></el-checkbox>
                        <el-checkbox  :label="$t('label.PFANS1028VIEW_OTHERC2')"></el-checkbox>
                        <el-checkbox  :label="$t('label.PFANS1028VIEW_OTHER')"></el-checkbox>
                      </el-checkbox-group>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-collapse>
                  <el-collapse-item>
                    <template slot="title">
                      <span class="collapse_Title">{{$t('label.PFANS1028VIEW_DETERMINE')}}</span>
                    </template>
                    <el-row>
                      <el-col :span="12">

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
                    <el-form-item :label="$t('label.PFANS1028VIEW_JUDGENO')" :error="error" >
                      <el-select :disabled="!disable" style="width:20vw" v-model="form.contractnumber">
                        <el-option
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                          v-for="item in options">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1028VIEW_JAPANNO')">
                      <el-select :disabled="!disable" style="width:20vw" v-model="form.contractnumber">
                        <el-option
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                          v-for="item in options">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <!--带出PJ名-->
                    <el-form-item :label="$t('label.PFANS1028VIEW_NAME')">
                      <el-input  :disabled="!disable" style="width:20vw" v-model="form.placejapanese"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :error="errorgroup" :label="$t('label.PFANS1028VIEW_ORGANIZATION')" prop="group_id">
                      <org :disabled="!disable" :error="errorgroup" :orglist="grouporglist" @getOrgids="getGroupId"
                           orgtype="2" style="width:20vw"></org>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1028VIEW_TODAY')">
                      <div class="block">
                        <el-date-picker
                          :disabled="!disable"
                          style="width: 20vw"
                          type="date"
                          v-model="form.today">
                        </el-date-picker>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>

                <div>
                  <el-tabs v-model="activeName2" type="border-card">
                    <el-tab-pane :label="$t('label.PFANS1028VIEW_COMMUNICATION')" name="first">
                      <el-table
                        :data="tableS1"
                        border
                        stripe
                        header-cell-class-name="sub_bg_color_blue"
                        style="width: 70vw">
                        <el-table-column
                          :label="$t('label.PFANS1028VIEW_TECHNICALNUMBER')"
                          align="center"
                          prop="technicalnumber">
                        </el-table-column>
                        <el-table-column
                          :label="$t('label.PFANS1028VIEW_GRADE')"
                          align="center"
                          prop="grade"
                          width="200">
                        </el-table-column>
                        <el-table-column
                          :label="$t('label.PFANS1028VIEW_TECHNICALNAME')"
                          align="center"
                          prop="technicalname"
                          width="450">
                        </el-table-column>
                        <el-table-column
                          :label="$t('label.PFANS1028VIEW_JUDGMENT1')"
                          align="center"
                          prop="judgment1">
                        </el-table-column>
                        <el-table-column
                          :label="$t('label.PFANS1028VIEW_POINTS')"
                          align="center"
                          prop="points">
                        </el-table-column>
                        <el-table-column
                          :label="$t('label.PFANS1028VIEW_JUDGMENT2')"
                          align="center"
                          prop="judgment2">
                        </el-table-column>
                      </el-table>


                          <!--<el-table :data="tableB" stripe border header-cell-class-name="sub_bg_color_blue"-->
                                    <!--style="width: 80vw">-->
                            <!--&lt;!&ndash;                      编号&ndash;&gt;-->
                            <!--<el-table-column-->
                              <!--:label="$t('label.PFANS5001FORMVIEW_NUMBERS')"-->
                              <!--align="center"-->
                              <!--width="130">-->
                              <!--<template slot-scope="scope">-->
                                <!--<el-input-->
                                  <!--:no="scope.row"-->
                                  <!--:disabled="true"-->
                                  <!--v-model="scope.row.number"-->
                                  <!--style="width: 100%">-->
                                <!--</el-input>-->
                              <!--</template>-->
                            <!--</el-table-column>-->
                            <!--&lt;!&ndash;                    姓名&ndash;&gt;-->
                            <!--<el-table-column-->
                              <!--:label="$t('label.PFANSUSERFORMVIEW_CUSTOMERNAME')"-->
                              <!--align="center"-->
                              <!--width="290">-->
                              <!--<template slot-scope="scope">-->

                              <!--</template>-->
                            <!--</el-table-column>-->
                            <!--&lt;!&ndash;                    職務&ndash;&gt;-->
                            <!--<el-table-column-->
                              <!--:label="$t('label.PFANSUSERVIEW_POST')"-->
                              <!--align="center"-->
                              <!--width="120">-->
                              <!--<template slot-scope="scope">-->
                                <!--<el-input-->
                                  <!--:no="scope.row"-->
                                  <!--:disabled="true"-->
                                  <!--v-model="scope.row.position"-->
                                  <!--style="width: 100%">-->
                                <!--</el-input>-->
                              <!--</template>-->
                            <!--</el-table-column>-->
                            <!--&lt;!&ndash;                入场时间&ndash;&gt;-->
                            <!--<el-table-column-->
                              <!--:label="$t('label.PFANS6004FORMVIEW_ADMISSIONTIME')"-->
                              <!--align="center"-->
                              <!--prop="admissiontime"-->
                              <!--width="180">-->
                              <!--<template slot-scope="scope">-->
                                <!--<el-date-picker-->
                                  <!--:disabled="!disable"-->
                                  <!--type="date"-->
                                  <!--:no="scope.row"-->
                                  <!--v-model="scope.row.admissiontime"-->
                                  <!--style="width: 9rem">-->
                                <!--</el-date-picker>-->
                              <!--</template>-->
                            <!--</el-table-column>-->
                            <!--&lt;!&ndash;                退场时间&ndash;&gt;-->
                            <!--<el-table-column-->
                              <!--:label="$t('label.PFANS6004FORMVIEW_EXITIME')"-->
                              <!--align="center"-->
                              <!--prop="exittime"-->
                              <!--width="180">-->
                              <!--<template slot-scope="scope">-->
                                <!--<el-date-picker-->
                                  <!--:disabled="!disable"-->
                                  <!--type="date"-->
                                  <!--:no="scope.row"-->
                                  <!--v-model="scope.row.exittime"-->
                                  <!--style="width: 9rem">-->
                                <!--</el-date-picker>-->
                              <!--</template>-->
                            <!--</el-table-column>-->
                            <!--<el-table-column :label="$t('label.operation')" align="center" width="200">-->
                              <!--<template slot-scope="scope">-->
                                <!--<el-button-->
                                  <!--:disabled="!disable"-->
                                  <!--@click.native.prevent="deleteRow1(scope.$index, tableB)"-->
                                  <!--plain-->
                                  <!--size="small"-->
                                  <!--type="danger"-->
                                <!--&gt;{{$t('button.delete')}}-->
                                <!--</el-button>-->
                                <!--<el-button-->
                                  <!--:disabled="!disable"-->
                                  <!--@click="addRow1()"-->
                                  <!--plain-->
                                  <!--size="small"-->
                                  <!--type="primary"-->
                                <!--&gt;{{$t('button.insert')}}-->
                                <!--</el-button>-->
                              <!--</template>-->
                            <!--</el-table-column>-->
                          <!--</el-table>-->


                    </el-tab-pane>
                    <el-tab-pane :label="$t('label.PFANS1028VIEW_DELIVERY')" name="second">
                    </el-tab-pane>
                    <el-tab-pane :label="$t('label.PFANS1028VIEW_COMPUTERS')" name="third">
                    </el-tab-pane>
                    <el-tab-pane :label="$t('label.PFANS1028VIEW_JASOFTWARE')" name="fourth">
                    </el-tab-pane>
                    <el-tab-pane :label="$t('label.PFANS1028VIEW_GATETECHNOLOGY')" name="fifth">
                    </el-tab-pane>
                    <el-tab-pane :label="$t('label.PFANS1028VIEW_JUDGMENTRESULT')" name="sixth">
                    </el-tab-pane>

                  </el-tabs>
                </div>



              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1028VIEW_OUTPUTSUPPLIE')" name="third">
              <el-tabs v-model="activeName3" type="border-card">
                <el-tab-pane :label="$t('label.PFANS2023FORMVIEW_INTELLIGENCE')" name="first">

                  <el-row>
                    <!--取契约书番号-->
                    <el-col :span="12">
                      <el-form-item :label="$t('label.PFANS1028VIEW_JUDGENO')" :error="error" >
                        <el-select :disabled="!disable" style="width:20vw" v-model="form.contractnumber">
                          <el-option
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            v-for="item in options">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item :label="$t('label.PFANS1028VIEW_JAPANNO')">
                        <el-select :disabled="!disable" style="width:20vw" v-model="form.contractnumber">
                          <el-option
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                            v-for="item in options">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <!--带出PJ名-->
                      <el-form-item :label="$t('label.PFANS1028VIEW_NAME')">
                        <el-input  :disabled="!disable" style="width:20vw" v-model="form.placejapanese"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item  :label="$t('label.PFANS1028VIEW_EXPORT')" >
                        <el-input  :disabled="!disable" style="width:20vw" v-model="form.export"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item :error="errorgroup" :label="$t('label.PFANS1028VIEW_ORGANIZATION')" prop="group_id">
                        <org :disabled="!disable" :error="errorgroup" :orglist="grouporglist" @getOrgids="getGroupId"
                             orgtype="2" style="width:20vw"></org>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item :label="$t('label.PFANS1028VIEW_TODAY')">
                        <div class="block">
                          <el-date-picker
                            :disabled="!disable"
                            style="width: 20vw"
                            type="date"
                            v-model="form.today">
                          </el-date-picker>
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-row>

                </el-tab-pane>
                <el-tab-pane :label="$t('label.PFANS1028VIEW_ELECTRONIC')" name="second">
                </el-tab-pane>
                <el-tab-pane :label="$t('label.PFANS1028VIEW_COM')" name="third">
                </el-tab-pane>
                <el-tab-pane :label="$t('label.PFANS1028VIEW_SOF')" name="fourth">
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
  import user from "../../../components/user.vue";
  import {Message} from 'element-ui';
  import dicselect from '../../../components/dicselect';
  import moment from "moment";
  import org from "../../../components/org";
  import {getDictionaryInfo} from '@/utils/customize';


  export default {
    name: "PFANS1028FormView",
    components: {
      EasyNormalContainer,
      user,
      org,
      dicselect
    },
    data() {
      var checkuser = (rule, value, callback) => {
        if (!this.form.user_id || this.form.user_id === '' || this.form.user_id === "undefined") {
          this.error = this.$t('normal.error_09') + this.$t('label.user_name');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.user_name')));
        } else {
          this.error = "";
          return callback();
        }
      };
      var checktele = (rule, value, callback) => {
        this.regExp = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{0,20}$/;
        if (this.form.telephone !== null && this.form.telephone !== '') {
          if (!this.regExp.test(value)) {
            callback(new Error(this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS1012VIEW_TELEPHONE')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      return {
        activeName: 'first',
        activeName2: 'first',
        activeName3: 'first',
        disabled: true,

        errorgroup: '',
        grouporglist: '',
        options:[],
        checkList: [],

        tableAValue:'',
        error: '',
        userlist: '',
        code1: 'PJ010',
        code2: 'HT005',
        selectType: "Single",
        loading: false,
        title: "title.PFANS1028VIEW",
        canStart: false,
        multiple: false,
        orglist:'',
        baseInfo: {},
        form: {
          contractnumber:'',
          contracttype:'',
          deployment:'',
          claimdatetime:[],
          claimamount:'',
          currencyposition:'',
          custojapanese: '',
          custochinese: '',


          placejapanese: '',
          placechinese: '',


          pjnamejapanese: '',
          pjnamechinese: '',
          enddate: '',
          firstdetails: '',
          deliverydate: '',
          currencyformat: '',

          user_id: '',
          extrinsic: '',
          equipment: '',
          telephone: '',
          commdepartment: '',
          commission: '',
          plan: '',
          valuation: '',
          individual: '',
          plannumber: '',
          valuationnumber: '',
          remarks: '',



          /*third*/
          total: '',
          number: '',
          price: '',
          rate: ''
        },

        tableData: [{
          technicalnumber: '技術名称番号',
         grade: '制御等級',
         technicalname: '技術名称',
         judgment1: '判定対象①',
          points: '規制要点',
         judgment2: '判定対象②',
        },],



          tableT: [{
          awarddetail_id: '',
          award_id: '',
          budgetcode: '',
          depart: '',
          member: '',
          community: '',
          outsource: '',
          outcommunity: '',
          worknumber: '',
          awardmoney: '',
          rowindex: '',
        }],

        tableD:[{
          attf: 'R11B',
          attfmoth: '',
          attfnumber: ''
        },
          {
            attf: 'R11A',
            attfmoth: '',
            attfnumber: ''
          },
          {
            attf: 'R10',
            attfmoth: '',
            attfnumber: ''
          },
          {
            attf: 'R9B',
            attfmoth: '',
            attfnumber: ''
          },
          {
            attf: 'R9A',
            attfmoth: '',
            attfnumber: ''
          },
          {
            attf: 'R8C',
            attfmoth: '',
            attfnumber: ''
          },
          {
            attf: 'R8B',
            attfmoth: '',
            attfnumber: ''
          },
          {
            attf: 'R8A',
            attfmoth: '',
            attfnumber: ''
          },
          {
            attf: 'R7',
            attfmoth: '',
            attfnumber: ''
          },
          {
            attf: 'R6',
            attfmoth: '',
            attfnumber: ''
          },
          {
            attf: 'R5',
            attfmoth: '',
            attfnumber: ''
          },
          {
            attf: 'R4',
            attfmoth: '',
            attfnumber: ''
          },
          {
            attf: 'R3',
            attfmoth: '',
            attfnumber: ''
          },

        ],

        rules: {
          user_id: [{
            required: true,
            validator: checkuser,
            trigger: 'change'
          }],
          telephone: [{
            validator: checktele,
            trigger: 'change'
          }],
        },
        buttonList: []
      }
    },
    mounted() {
      this.loading = true;
      if (this.$route.params._id) {
        this.$store
          .dispatch('PFANS1026Store/get', {"contractapplication_id": this.$route.params._id})
          .then(response => {
            this.form = response;
            this.grouporglist = this.form.group_id;
            if (response.length > 0) {
              for (let i = 0; i < response.length; i++) {
                if(response[i].contracttype !== null && response[i].contracttype !== ""){
                  this.form.contracttype = getDictionaryInfo(response[i].contracttype).value1;
                }
                this.form.contractnumber= response[i].contractnumber;
                this.form.deployment= response[i].deployment;
                this.form.claimamount= response[i].claimamount;
                this.form.currencyposition= response[i].currencyposition;
                this.form.custojapanese= response[i].custojapanese;
                this.form.placejapanese= response[i].placejapanese;
                this.form.placechinese= response[i].placechinese;
                if(response[i].currencyposition !== null && response[i].currencyposition !== ""){
                  this.form.currencyposition= getDictionaryInfo(response[i].currencyposition).value1;
                }

                if(this.form.claimdatetime!=="" && this.form.claimdatetime!==null){
                  let repair = response[i].claimdatetime;
                  let serdate = repair.slice(0, 10);
                  let serdate1 = repair.slice(repair.length - 10);
                  this.form.claimdatetime = [serdate, serdate1];
                }

              }
            }
            // if (response.awardDetail.length > 0) {
            //   this.tableT = response.awardDetail
            //   for (var i = 0; i < this.tableT.length; i++) {
            //     this.orglist=this.tableT[i].depart;
            //   }
            // }
            this.userlist = this.form.user_id;
            this.baseInfo.award = JSON.parse(JSON.stringify(this.form));
            this.baseInfo.awardDetail = JSON.parse(JSON.stringify(this.tableT));
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
    created(){
      if(!this.$route.params.disabled){
        this.buttonList=[
          {
            key: 'generate',
            name: 'button.generate',
            disabled: false,
          }
        ]
      }else {
        this.buttonList=[
          {
            key: 'save',
            name: 'button.save',
            disabled: false,
            icon: 'el-icon-check',
          },
        ]
      }
      this.disable = this.$route.params.disabled;
    },
    methods: {
      getUserids(val) {
        this.userlist = val;
        this.form.user_id = val;
        if (!this.form.user_id || this.form.user_id === '' || typeof val == "undefined") {
          this.error = this.$t('normal.error_08') + this.$t('label.user_name');
        } else {
          this.error = '';
        }
      },
      getGroupId(val) {
        this.form.group_id = val;
        this.grouporglist = val;
        if (!this.form.group_id || this.form.group_id === '' || val === 'undefined') {
          this.errorgroup = this.$t('normal.error_09') + this.$t('label.group');
        } else {
          this.errorgroup = '';
        }
      },







      getcontracttype(val){
        this.form.contracttype=val;
      },
      getcurrencyformat(val) {
        this.form.currencyformat = val;
      },
      getextrinsic(val) {
        this.form.extrinsic = val;
      },
      getvaluation(val) {
        this.form.valuation = val;
      },
      getindividual(val) {
        this.form.individual = val;
      },
      getGroupId(orglist,row) {
        row.depart=orglist;
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
      deleteRow(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        } else {
          this.tableT = [{
            budgetcode: '',
            depart: '',
            member: '',
            community: '',
            outsource: '',
            outcommunity: '',
            worknumber: '',
            awardmoney: '',
          }]
        }
      },
      addRow() {
        this.tableT.push({
          awarddetail_id: '',
          award_id: '',
          budgetcode: '',
          depart: '',
          member: '',
          community: '',
          outsource: '',
          outcommunity: '',
          worknumber: '',
          awardmoney: '',
          rowindex: '',
        })
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
            if (index == 2) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
            if (index == 4) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
            if (index == 6) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
            if (index == 7) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
          } else {
            sums[index] = '--'
          }
        });
        return sums;
      },

      gettotal(val){
        this.form.total= this.form.number*this.form.price;
      },



      buttonClick(val) {
        if(val==="save"){
          this.$refs["reff"].validate(valid =>{
            if(valid){
              this.loading = true;
              this.baseInfo={};
              this.form.user_id=this.userlist;
              this.form.deliverydate=moment(this.form.deliverydate).format('YYYY-MM-DD');
              this.form.developdate=moment(this.form.developdate[0]).format('YYYY-MM-DD')+" ~ "+moment(this.form.developdate[1]).format('YYYY-MM-DD');
              this.baseInfo.award=JSON.parse(JSON.stringify(this.form));
              this.baseInfo.awardDetail=[];
              for(let i=0;i<this.tableT.length;i++){
                if(this.tableT[i].budgetcode!==""||this.tableT[i].depart!==""||this.tableT[i].member>"0" ||this.tableT[i].community>"0"
                  ||this.tableT[i].outsource>"0"||this.tableT[i].outcommunity>"0"||this.tableT[i].worknumber>"0"||this.tableT[i].awardmoney>"0"){
                  this.baseInfo.awardDetail.push({
                    awarddetail_id:this.tableT[i].awarddetail_id,
                    award_id:this.tableT[i].award_id,
                    budgetcode:this.tableT[i].budgetcode,
                    depart:this.tableT[i].depart,
                    member:this.tableT[i].member,
                    community:this.tableT[i].community,
                    outsource:this.tableT[i].outsource,
                    outcommunity:this.tableT[i].outcommunity,
                    worknumber:this.tableT[i].worknumber,
                    awardmoney:this.tableT[i].awardmoney,
                    rowindex:this.tableT[i].rowindex,
                  })
                }
              }
              if(this.$route.params._id){     //编辑
                this.baseInfo.award.award_id = this.$route.params._id;
                this.$store
                  .dispatch('PFANSStore/update',this.baseInfo)
                  .then(response =>{
                    this.data=response;
                    this.loading=false;
                    if( val !== "update"){
                      Message({
                        message: this.$t('normal.success_02'),
                        type: 'success',
                        duration: 5 * 1000,
                      });
                      if(this.$store.getters.historyUrl) {
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
                    this.loading=false;
                  })
              }
            }
          });
        }
      }
    }
  }
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

