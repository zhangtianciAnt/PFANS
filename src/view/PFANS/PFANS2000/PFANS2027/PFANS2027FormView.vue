<template>
  <div style="min-height: 100%">
    <EasyNormalContainer ref="container"
                         :title="title"
                         @buttonClick="buttonClick"
                         v-loading="loading"
                         :buttonList="buttonList">
      <div slot="customize">
        <el-form :model="form" label-width="8vw" label-position="top" style="padding: 2vw"
                 ref="refform">

          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2007VIEW_YEAR')" v-show="show">
                <el-date-picker type="year" style="width: 10rem" v-model="form1.evaluationday"
                @change="changeEvaluationday"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2027VIEW_CATEGORY')">
                <!--<dicselect
                  :code="code13"
                  :data="category"
                  @change="changeCategory"
                  style="width: 10rem"
                  :disabled="disabled">
                </dicselect>-->
                <el-select v-model="name" style="width: 10rem" @change="changeExamination">
                  <el-option v-for="(item,index) in examinationobjects" :key="index" :value="item.name">
                    {{item.name}}
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2027VIEW_COMMENTARYMONTHS')"  v-show="show">
                <dicselect
                  :code="code14"
                  :data="form1.subjectmon"
                  @change="changecommentarymonths"
                  style="width: 10rem"
                >
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2027VIEW_EVALUATIONTIME')" v-show="show">
                <dicselect
                  :code="code15"
                  :data="form1.evaluatenum"
                  @change="changeevaluationtime"
                  style="width: 10rem"
                >
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>


          <el-table :data="form.tabledata" stripe border header-cell-class-name="sub_bg_color_blue" :header-cell-style="getRowClass" @selection-change="handleSelectionChange" >

            <el-table-column :label="$t('label.PFANS2006VIEW_NO')" align="center" prop="content"
                             type="index" width="50"></el-table-column>
            <!--氏名:prop="'form.tabledata.' + scope.$index + '.user_id'"-->
            <el-table-column :label="$t('label.PFANS2027VIEW_NAME')" align="center" width="200">
              <template slot-scope="scope">
                <el-form-item>
                  <el-input v-model="scope.row.user_id" :disabled="true" style="width: 11rem" maxlength='36'></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <!--RN-->
            <el-table-column :label="$t('label.PFANS2027VIEW_RN')" align="center" width="200">
              <template slot-scope="scope">
                <el-form-item>
                  <el-input  :disabled="true" style="width: 11rem" maxlength='36' v-model="scope.row.rn"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <!--入社日-->
            <el-table-column :label="$t('label.PFANS2027VIEW_DATE')" align="center" width="200">
              <template slot-scope="scope">
                <el-form-item>
                  <el-input  :disabled="true" style="width: 11rem" maxlength='36' v-model="scope.row.enterday"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <!--グループ-->
            <el-table-column :label="$t('label.PFANS2027VIEW_GROUP2')" align="center" width="200">
              <template slot-scope="scope">
                <el-form-item>
                  <el-input  :disabled="true" style="width: 11rem" maxlength='36' v-model="scope.row.group_id"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <!--チーム-->
            <el-table-column :label="$t('label.PFANS2027VIEW_TEAM')" align="center" width="200">
              <template slot-scope="scope">
                <el-form-item>
                  <el-input  :disabled="true" style="width: 11rem" maxlength='36'  v-model="scope.row.team_id"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <!--入社形式-->
            <el-table-column :label="$t('label.PFANS2027VIEW_FORM')" align="center" width="200">
              <template slot-scope="scope">
                <el-form-item>
                  <el-input  :disabled="true" style="width: 11rem" maxlength='36' v-model="scope.row.difference"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <!--基本給-->
            <el-table-column :label="$t('label.PFANS2027VIEW_GIVE')" align="center" width="200">
              <template slot-scope="scope">
                <el-form-item>
                  <el-input  :disabled="true" style="width: 11rem" maxlength='36' v-model="scope.row.salary"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <!--出勤率-->
            <el-table-column :label="$t('label.PFANS2027VIEW_ATTENDANCE')" align="center" width="200">
              <template slot-scope="scope">
                <el-form-item>
                  <el-input v-model="scope.row.workrate" :disabled="true" style="width: 11rem" maxlength='36'></el-input>
                </el-form-item>
              </template>
            </el-table-column>
           <!-- 2018年-->
            <el-table-column :label="$t('label.PFANS2027VIEW_2018YEAR')" align="center" width="200">
              <template slot-scope="scope">
                <el-form-item>
                  <el-input v-model="scope.row.bonussign" :disabled="true" style="width: 11rem" maxlength='36'></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <!--前回-->
            <el-table-column :label="$t('label.PFANS2027VIEW_LASTMONTHS')" align="center" width="200">
              <template slot-scope="scope">
                <el-form-item>
                  <el-input v-model="scope.row.lastsymbol" :disabled="true" style="width: 11rem" maxlength='36'></el-input>
                </el-form-item>
              </template>
            </el-table-column>
<!-- 経営・運営成果-->
            <el-table-column :label="$t('label.PFANS2027VIEW_RESULT')" align="center">

              <el-table-column :label="$t('label.PFANS2027VIEW_PLAN')" align="center" width="200">
                <template slot-scope="scope">
                  <el-form-item>
                    <dicselect
                      :code="code1"
                      :data="scope.row.tatebai"
                      :no="scope.row"
                      @change="(val)=>{changeTatebai(val,scope.$index)}"
                      style="width: 11rem"
                      :disabled="flag[0]">
                    </dicselect>
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column :label="$t('label.PFANS2027VIEW_SECURITY')" align="center" width="200">
                <template slot-scope="scope">
                  <el-form-item>
                    <dicselect
                      :code="code2"
                      :data="scope.row.satoshi"
                      :no="scope.row"
                      @change="(val)=>{changeSatoshi(val,scope.$index)}"
                      style="width: 11rem"
                      :disabled="flag[1]">
                    </dicselect>
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column :label="$t('label.PFANS2027VIEW_CREATE')" align="center" width="200">
                <template slot-scope="scope">
                  <el-form-item>
                    <dicselect
                      :code="code3"
                      :data="scope.row.organization"
                      :no="scope.row"
                      @change="(val)=>{changeOrganization(val,scope.$index)}"
                      style="width: 11rem"
                      :disabled="flag[2]">
                    </dicselect>
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column :label="$t('label.PFANS2027VIEW_TALENT')" align="center" width="200">
                <template slot-scope="scope">
                  <el-form-item>
                    <dicselect
                      :code="code4"
                      :data="scope.row.systematics"
                      :no="scope.row"
                      @change="(val)=>{changeSystematics(val,scope.$index)}"
                      style="width: 11rem"
                      :disabled="flag[3]">
                    </dicselect>
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column :label="$t('label.PFANS2027VIEW_RATIO')" align="center" width="200">
                <template slot-scope="scope">
                  <el-form-item>
                    <el-input :disabled="true" ></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table-column>
<!-- PJ成果-->
            <el-table-column :label="$t('label.PFANS2027VIEW_PJRESULT')" align="center" >

              <el-table-column :label="$t('label.PFANS2027VIEW_DIFFICULTYLEVEL')" align="center" width="200">
                <template slot-scope="scope">
                  <el-form-item>
                    <dicselect
                      :code="code5"
                      :data="scope.row.manpower"
                      :no="scope.row"
                      @change="(val)=>{changeManpower(val,scope.$index)}"
                      style="width: 11rem"
                      :disabled="flag[4]">
                    </dicselect>
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column :label="$t('label.PFANS2027VIEW_ISSUE')" align="center" width="200">
                <template slot-scope="scope">
                  <el-form-item>
                    <dicselect
                      :code="code6"
                      :data="scope.row.scale"
                      :no="scope.row"
                      @change="(val)=>{changeScale(val,scope.$index)}"
                      style="width: 11rem"
                      :disabled="flag[5]">
                    </dicselect>
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column :label="$t('label.PFANS2027VIEW_QCD')" align="center" width="200">
                <template slot-scope="scope">
                  <el-form-item>
                    <dicselect
                      :code="code7"
                      :data="scope.row.achievement"
                      :no="scope.row"
                      @change="(val)=>{changeAchievement(val,scope.$index)}"
                      style="width: 11rem"
                      :disabled="flag[6]">
                    </dicselect>
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column :label="$t('label.PFANS2027VIEW_NANYI')" align="center" width="200">
                <template slot-scope="scope">
                  <el-form-item>
                    <dicselect
                      :code="code8"
                      :data="scope.row.degree"
                      :no="scope.row"
                      @change="(val)=>{changeDegree(val,scope.$index)}"
                      style="width: 11rem"
                      :disabled="flag[7]">
                    </dicselect>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS2027VIEW_RATIO')" align="center" width="200">
                <template slot-scope="scope">
                  <el-form-item>
                    <el-input :disabled="true"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table-column>
<!--意欲-->
            <el-table-column :label="$t('label.PFANS2027VIEW_MEAN')" align="center" >

              <el-table-column :label="$t('label.PFANS2027VIEW_KETI')" align="center" width="200">
                <template slot-scope="scope">
                  <el-form-item>
                    <dicselect
                      :code="code9"
                      :data="scope.row.assignment"
                      :no="scope.row"
                      @change="(val)=>{changeAssignmenti(val,scope.$index)}"
                      style="width: 11rem"
                      :disabled="flag[8]">
                    </dicselect>
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column :label="$t('label.PFANS2027VIEW_TEAMWORK')" align="center" width="250">
                <template slot-scope="scope">
                  <el-form-item>
                    <dicselect
                      :code="code10"
                      :data="scope.row.teamwork"
                      :no="scope.row"
                      @change="(val)=>{changeTeamwork(val,scope.$index)}"
                      style="width: 11rem"
                      :disabled="flag[9]">
                    </dicselect>
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column :label="$t('label.PFANS2027VIEW_RENCAI')" align="center" width="200">
                <template slot-scope="scope">
                  <el-form-item>
                    <dicselect
                      :code="code11"
                      :data="scope.row.humandevelopment"
                      :no="scope.row"
                      @change="(val)=>{changeHumandevelopment(val,scope.$index)}"
                      style="width: 11rem"
                      :disabled="flag[10]">
                    </dicselect>
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column :label="$t('label.PFANS2027VIEW_MICROWAVE')" align="center" width="200">
                <template slot-scope="scope">
                  <el-form-item>
                    <dicselect
                      :code="code12"
                      :data="scope.row.workattitude"
                      :no="scope.row"
                      @change="(val)=>{changeWorkattitude(val,scope.$index)}"
                      style="width: 11rem"
                      :disabled="flag[11]">
                    </dicselect>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS2027VIEW_RATIO')" align="center" width="200">
                <template slot-scope="scope">
                  <el-form-item>
                    <el-input :disabled="true"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table-column>
<!--評価-->
            <el-table-column :label="$t('label.PFANS2027VIEW_EVALUATION')" align="center">

              <el-table-column :label="$t('label.PFANS2027VIEW_COMPOSITESCORES')" align="center" width="200">
                <template slot-scope="scope">
                  <el-form-item>
                    <el-input :disabled="true" :data="scope.row.overallscore" v-model="scope.row.overallscore"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column :label="$t('label.PFANS2027VIEW_ESTIMATETIME')" align="center" width="200">
                <template slot-scope="scope">
                  <el-form-item>
                    <el-input :disabled="true" :data="scope.row.commentaryreturns" v-model="scope.row.commentaryreturns"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column :label="$t('label.PFANS2027VIEW_ESTIMATERESULT')" align="center" width="200">
                <template slot-scope="scope">
                  <el-form-item>
                    <el-input :disabled="true" :data="scope.row.commentaryresult" v-model="scope.row.commentaryresult"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>

            </el-table-column>
<!--総合所見【1】-->
            <el-table-column :label="$t('label.PFANS2027VIEW_COMPOSITE1')" align="center">

              <el-table-column :label="$t('label.PFANS2027VIEW_COMPOSITEEVALUATION')" align="center" width="270">
                <template slot-scope="scope">
                  <el-form-item>
                    <el-input :data="scope.row.comprehensiveone" v-model="scope.row.comprehensiveone"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table-column>
<!-- 総合所見【2】-->
            <el-table-column :label="$t('label.PFANS2027VIEW_COMPOSITE2')" align="center">

              <el-table-column :label="$t('label.PFANS2027VIEW_FIRSTEVALUATION')" align="center" width="270">
                <template slot-scope="scope">
                  <el-form-item>
                    <el-input :data="scope.row.comprehensivetwo" v-model="scope.row.comprehensivetwo"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table-column>

            <el-table-column :label="$t('label.PFANS2027VIEW_ONEMONTH')" align="center" width="270">
              <template slot-scope="scope">
                <el-form-item>
                  <el-input :data="scope.row.firstmonth" v-model="scope.row.firstmonth"></el-input>
                </el-form-item>
              </template>
            </el-table-column>

            <el-table-column :label="$t('label.PFANS2027VIEW_TOWMONTH')" align="center" width="270">
              <template slot-scope="scope">
                <el-form-item>
                  <el-input :data="scope.row.secondmonth" v-model="scope.row.secondmonth"></el-input>
                </el-form-item>
              </template>
            </el-table-column>

            <el-table-column :label="$t('label.PFANS2027VIEW_THREMONTH')" align="center" width="270">
              <template slot-scope="scope">
                <el-form-item>
                  <el-input :data="scope.row.thirdmonth" v-model="scope.row.thirdmonth"></el-input>
                </el-form-item>
              </template>
            </el-table-column>

          </el-table>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
    import EasyNormalTable from '@/components/EasyNormalTable';
    import {Message} from 'element-ui';
    import {getOrgInfo,getDictionaryInfo,getUserInfo} from '@/utils/customize';
    import user from '../../../components/user.vue';
    import moment from "moment";
    import EasyNormalContainer from '@/components/EasyNormalContainer';
    import dicselect from '../../../components/dicselect';
    export default {
        name: "PFANS2027FormView",
        components: {
            dicselect,
            EasyNormalContainer,
        },
        data() {
            return {
                show: false,
                loading: false,
                year: new Date(),
                multipleSelection:[],
                flag: [true],
                form1:{
                    evaluationday: new Date(),
                    evaluatenum:'PJ104',
                    subjectmon:'PJ103',
                    subject:'',
                    examinationobject_id: '',
                    user_id: this.$store.getters.userinfo.userid,
                },
                examinationobjects: [],
               /* category: '',*/
                titleType:'',
                title: "title.PFANS2027VIEW_VIEW",
                buttonList: [],
                disabled: false,
                lunardetailid:{
                    // lunardetail_id: '',
                    lunarbonus_id: '',
                    examinationobject_id: '1'
                },
                lunardetail:{
                    lunardetail_id: '',
                    lunarbonus_id: '',
                    user_id: '',
                    rn: '',
                    enterday: '',
                    group_id: '',
                    team_id: '',
                    salary: '',
                    workrate: '',
                    bonussign: '',
                    lastsymbol: '',
                    tatebai: '',
                    satoshi: '',
                    organization: '',
                    systematics: '',
                    manpower: '',
                    scale: '',
                    achievement: '',
                    degree: '',
                    assignment: '',
                    teamwork: '',
                    humandevelopment: '',
                    workattitude: '',
                    overallscore: '',
                    commentaryreturns: '',
                    commentaryresult: '',
                    comprehensiveone: '',
                    comprehensivetwo: '',
                    firstmonth: '',
                    secondmonth: '',
                    thirdmonth: '',
                    subjectmon: '',
                    evaluatenum: '',
                    difference: '',
                    evaluationday: '',
                },
                form: {
                    tabledata: []
                },
                code1: 'PJ089',
                code2: 'PJ090',
                code3: 'PJ091',
                code4: 'PJ092',
                code5: 'PJ093',
                code6: 'PJ094',
                code7: 'PJ095',
                code8: 'PJ096',
                code9: 'PJ097',
                code10: 'PJ098',
                code11: 'PJ099',
                code12: 'PJ100',
                code13: 'PJ101',
                code14: 'PJ103',
                code15: 'PJ104',
            }
        },
        created() {
            this.disabled = this.$route.params.disabled;
            if (this.disabled) {
                this.buttonList = [
                    {
                        key: "save",
                        name: "button.save",
                        disabled: false,
                        icon: "el-icon-check"
                    }
                ];
            }
        },
        mounted(){
            //let lst = getUserInfo(this.$store.getters.userinfo.userid);//获取当前user
            this.loading = true;
            if (this.$route.params._id) {
                if(this.$route.params.show){//view
                    this.view();
                }else{//update
                    this.update();
                }
            }

        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            getRowClass({row, column, rowIndex, columnIndex}) {
                if (column.level === 2 && columnIndex >= 0 && columnIndex < 10) {
                    return {
                        color: 'white',
                        background: '#99CCFF',
                        'border-bottom': '1px solid #99CCFF',
                        'border-right': '1px solid #73B9FF',
                    };
                }
            },

            view(){
                this.show = this.$route.params.show;
                this.disabled = true;
                this.lunardetailid.lunarbonus_id = this.$route.params._id;
                console.log(this.$route.params._id);
                this.$store
                    .dispatch("PFANS2027Store/getLunardetails", this.lunardetailid)
                    .then(response => {
                        debugger;
                        console.log(response);
                        if(response){
                            for(let i=0;i < response.length;i++){

                                if (response[i].tatebai !== null && response[i].tatebai !== "") {
                                    let temp = getDictionaryInfo(response[i].tatebai);
                                    if (temp) {
                                        response[i].tatebai = temp.value1;
                                    }
                                }

                                if (response[i].satoshi !== null && response[i].satoshi !== "") {
                                    let temp = getDictionaryInfo(response[i].satoshi);
                                    if (temp) {
                                        response[i].satoshi = temp.value1;
                                    }
                                }

                                if (response[i].organization !== null && response[i].organization !== "") {
                                    let temp = getDictionaryInfo(response[i].organization);
                                    if (temp) {
                                        response[i].organization = temp.value1;
                                    }
                                }

                                if (response[i].systematics !== null && response[i].systematics !== "") {
                                    let temp = getDictionaryInfo(response[i].systematics);
                                    if (temp) {
                                        response[i].systematics = temp.value1;
                                    }
                                }

                                if (response[i].manpower !== null && response[i].manpower !== "") {
                                    let temp = getDictionaryInfo(response[i].manpower);
                                    if (temp) {
                                        response[i].manpower = temp.value1;
                                    }
                                }

                                if (response[i].scale !== null && response[i].scale !== "") {
                                    let temp = getDictionaryInfo(response[i].scale);
                                    if (temp) {
                                        response[i].scale = temp.value1;
                                    }
                                }

                                if (response[i].achievement !== null && response[i].achievement !== "") {
                                    let temp = getDictionaryInfo(response[i].achievement);
                                    if (temp) {
                                        response[i].achievement = temp.value1;
                                    }
                                }

                                if (response[i].degree !== null && response[i].degree !== "") {
                                    let temp = getDictionaryInfo(response[i].degree);
                                    if (temp) {
                                        response[i].degree = temp.value1;
                                    }
                                }

                                if (response[i].assignment !== null && response[i].assignment !== "") {
                                    let temp = getDictionaryInfo(response[i].assignment);
                                    if (temp) {
                                        response[i].assignment = temp.value1;
                                    }
                                }

                                if (response[i].teamwork !== null && response[i].teamwork !== "") {
                                    let temp = getDictionaryInfo(response[i].teamwork);
                                    if (temp) {
                                        response[i].teamwork = temp.value1;
                                    }
                                }

                                if (response[i].humandevelopment !== null && response[i].humandevelopment !== "") {
                                    let temp = getDictionaryInfo(response[i].humandevelopment);
                                    if (temp) {
                                        response[i].humandevelopment = temp.value1;
                                    }
                                }

                                if (response[i].workattitude !== null && response[i].workattitude !== "") {
                                    let temp = getDictionaryInfo(response[i].workattitude);
                                    if (temp) {
                                        response[i].workattitude = temp.value1;
                                    }
                                }

                                this.form.tabledata.push(response[i]);
                            }

                        }
                        this.loading = false;
                    })
                    .catch(err => {
                        this.loading = false;
                        Message({
                            message: err,
                            type: "error",
                            duration: 5 * 1000
                        });
                    });
            },
            update(){
                this.show = this.$route.params.show;
                this.disabled = false;
                this.lunardetailid.lunarbonus_id = this.$route.params._id;
                console.log(this.$route.params._id);
                this.$store
                    .dispatch("PFANS2027Store/getLunardetails", this.lunardetailid)
                    .then(response => {
                        if(response){
                            for(let i=0;i < response.length;i++){
                                if (response[i].tatebai !== null && response[i].tatebai !== "") {
                                    let temp = getDictionaryInfo(response[i].tatebai);
                                    if (temp) {
                                        response[i].tatebai = temp.value1;
                                    }
                                }

                                if (response[i].satoshi !== null && response[i].satoshi !== "") {
                                    let temp = getDictionaryInfo(response[i].satoshi);
                                    if (temp) {
                                        response[i].satoshi = temp.value1;
                                    }
                                }

                                if (response[i].organization !== null && response[i].organization !== "") {
                                    let temp = getDictionaryInfo(response[i].organization);
                                    if (temp) {
                                        response[i].organization = temp.value1;
                                    }
                                }

                                if (response[i].systematics !== null && response[i].systematics !== "") {
                                    let temp = getDictionaryInfo(response[i].systematics);
                                    if (temp) {
                                        response[i].systematics = temp.value1;
                                    }
                                }

                                if (response[i].manpower !== null && response[i].manpower !== "") {
                                    let temp = getDictionaryInfo(response[i].manpower);
                                    if (temp) {
                                        response[i].manpower = temp.value1;
                                    }
                                }

                                if (response[i].scale !== null && response[i].scale !== "") {
                                    let temp = getDictionaryInfo(response[i].scale);
                                    if (temp) {
                                        response[i].scale = temp.value1;
                                    }
                                }

                                if (response[i].achievement !== null && response[i].achievement !== "") {
                                    let temp = getDictionaryInfo(response[i].achievement);
                                    if (temp) {
                                        response[i].achievement = temp.value1;
                                    }
                                }

                                if (response[i].degree !== null && response[i].degree !== "") {
                                    let temp = getDictionaryInfo(response[i].degree);
                                    if (temp) {
                                        response[i].degree = temp.value1;
                                    }
                                }

                                if (response[i].assignment !== null && response[i].assignment !== "") {
                                    let temp = getDictionaryInfo(response[i].assignment);
                                    if (temp) {
                                        response[i].assignment = temp.value1;
                                    }
                                }

                                if (response[i].teamwork !== null && response[i].teamwork !== "") {
                                    let temp = getDictionaryInfo(response[i].teamwork);
                                    if (temp) {
                                        response[i].teamwork = temp.value1;
                                    }
                                }

                                if (response[i].humandevelopment !== null && response[i].humandevelopment !== "") {
                                    let temp = getDictionaryInfo(response[i].humandevelopment);
                                    if (temp) {
                                        response[i].humandevelopment = temp.value1;
                                    }
                                }

                                if (response[i].workattitude !== null && response[i].workattitude !== "") {
                                    let temp = getDictionaryInfo(response[i].workattitude);
                                    if (temp) {
                                        response[i].workattitude = temp.value1;
                                    }
                                }
                                this.form.tabledata.push(response[i]);
                            }
                        }
                        this.loading = false;
                    })
                    .catch(err => {
                        this.loading = false;
                        Message({
                            message: err,
                            type: "error",
                            duration: 5 * 1000
                        });
                    });
                this.$store
                    .dispatch("PFANS2027Store/getStatus", this.lunardetailid.examinationobject_id)
                    .then(response => {
                      for(let i=0;i<response.length;i++){
                         if(response[i].state === '1'){
                             this.flag.put(false);
                         }else{
                             this.flag.put(true);
                         }
                      }
                    })
                    .catch(err => {
                    this.loading = false;
                    Message({
                        message: err,
                        type: "error",
                        duration: 5 * 1000
                    });
                });
            },
            changeEvaluationday(val){
                this.form1.evaluationday = val;
                this.$store
                    .dispatch("PFANS2027Store/getLunardetails", this.form1)
                    .then(response => {
                        if(response){
                            for(let i=0;i < response.length;i++){
                                if (response[i].tatebai !== null && response[i].tatebai !== "") {
                                    let temp = getDictionaryInfo(response[i].tatebai);
                                    if (temp) {
                                        response[i].tatebai = temp.value1;
                                    }
                                }

                                if (response[i].satoshi !== null && response[i].satoshi !== "") {
                                    let temp = getDictionaryInfo(response[i].satoshi);
                                    if (temp) {
                                        response[i].satoshi = temp.value1;
                                    }
                                }

                                if (response[i].organization !== null && response[i].organization !== "") {
                                    let temp = getDictionaryInfo(response[i].organization);
                                    if (temp) {
                                        response[i].organization = temp.value1;
                                    }
                                }

                                if (response[i].systematics !== null && response[i].systematics !== "") {
                                    let temp = getDictionaryInfo(response[i].systematics);
                                    if (temp) {
                                        response[i].systematics = temp.value1;
                                    }
                                }

                                if (response[i].manpower !== null && response[i].manpower !== "") {
                                    let temp = getDictionaryInfo(response[i].manpower);
                                    if (temp) {
                                        response[i].manpower = temp.value1;
                                    }
                                }

                                if (response[i].scale !== null && response[i].scale !== "") {
                                    let temp = getDictionaryInfo(response[i].scale);
                                    if (temp) {
                                        response[i].scale = temp.value1;
                                    }
                                }

                                if (response[i].achievement !== null && response[i].achievement !== "") {
                                    let temp = getDictionaryInfo(response[i].achievement);
                                    if (temp) {
                                        response[i].achievement = temp.value1;
                                    }
                                }

                                if (response[i].degree !== null && response[i].degree !== "") {
                                    let temp = getDictionaryInfo(response[i].degree);
                                    if (temp) {
                                        response[i].degree = temp.value1;
                                    }
                                }

                                if (response[i].assignment !== null && response[i].assignment !== "") {
                                    let temp = getDictionaryInfo(response[i].assignment);
                                    if (temp) {
                                        response[i].assignment = temp.value1;
                                    }
                                }

                                if (response[i].teamwork !== null && response[i].teamwork !== "") {
                                    let temp = getDictionaryInfo(response[i].teamwork);
                                    if (temp) {
                                        response[i].teamwork = temp.value1;
                                    }
                                }

                                if (response[i].humandevelopment !== null && response[i].humandevelopment !== "") {
                                    let temp = getDictionaryInfo(response[i].humandevelopment);
                                    if (temp) {
                                        response[i].humandevelopment = temp.value1;
                                    }
                                }

                                if (response[i].workattitude !== null && response[i].workattitude !== "") {
                                    let temp = getDictionaryInfo(response[i].workattitude);
                                    if (temp) {
                                        response[i].workattitude = temp.value1;
                                    }
                                }
                                this.form.tabledata.push(response[i]);
                            }
                        }
                        this.loading = false;
                    })
                    .catch(err => {
                        this.loading = false;
                        Message({
                            message: err,
                            type: "error",
                            duration: 5 * 1000
                        });
                    });
            },
            changeExamination(val){
                for(let i=0;i<this.examinationobjects.length;i++)
                {
                    if(val === this.examinationobjects[i].name){
                        this.form1.examinationobject_id = this.examinationobjects[i].examinationobject_id;
                        //类别改变
                        this.$store
                            .dispatch("PFANS2027Store/getLunardetails", this.form1)
                            .then(response => {
                                if(response){
                                    for(let i=0;i < response.length;i++){
                                        if (response[i].tatebai !== null && response[i].tatebai !== "") {
                                            let temp = getDictionaryInfo(response[i].tatebai);
                                            if (temp) {
                                                response[i].tatebai = temp.value1;
                                            }
                                        }

                                        if (response[i].satoshi !== null && response[i].satoshi !== "") {
                                            let temp = getDictionaryInfo(response[i].satoshi);
                                            if (temp) {
                                                response[i].satoshi = temp.value1;
                                            }
                                        }

                                        if (response[i].organization !== null && response[i].organization !== "") {
                                            let temp = getDictionaryInfo(response[i].organization);
                                            if (temp) {
                                                response[i].organization = temp.value1;
                                            }
                                        }

                                        if (response[i].systematics !== null && response[i].systematics !== "") {
                                            let temp = getDictionaryInfo(response[i].systematics);
                                            if (temp) {
                                                response[i].systematics = temp.value1;
                                            }
                                        }

                                        if (response[i].manpower !== null && response[i].manpower !== "") {
                                            let temp = getDictionaryInfo(response[i].manpower);
                                            if (temp) {
                                                response[i].manpower = temp.value1;
                                            }
                                        }

                                        if (response[i].scale !== null && response[i].scale !== "") {
                                            let temp = getDictionaryInfo(response[i].scale);
                                            if (temp) {
                                                response[i].scale = temp.value1;
                                            }
                                        }

                                        if (response[i].achievement !== null && response[i].achievement !== "") {
                                            let temp = getDictionaryInfo(response[i].achievement);
                                            if (temp) {
                                                response[i].achievement = temp.value1;
                                            }
                                        }

                                        if (response[i].degree !== null && response[i].degree !== "") {
                                            let temp = getDictionaryInfo(response[i].degree);
                                            if (temp) {
                                                response[i].degree = temp.value1;
                                            }
                                        }

                                        if (response[i].assignment !== null && response[i].assignment !== "") {
                                            let temp = getDictionaryInfo(response[i].assignment);
                                            if (temp) {
                                                response[i].assignment = temp.value1;
                                            }
                                        }

                                        if (response[i].teamwork !== null && response[i].teamwork !== "") {
                                            let temp = getDictionaryInfo(response[i].teamwork);
                                            if (temp) {
                                                response[i].teamwork = temp.value1;
                                            }
                                        }

                                        if (response[i].humandevelopment !== null && response[i].humandevelopment !== "") {
                                            let temp = getDictionaryInfo(response[i].humandevelopment);
                                            if (temp) {
                                                response[i].humandevelopment = temp.value1;
                                            }
                                        }

                                        if (response[i].workattitude !== null && response[i].workattitude !== "") {
                                            let temp = getDictionaryInfo(response[i].workattitude);
                                            if (temp) {
                                                response[i].workattitude = temp.value1;
                                            }
                                        }
                                        this.form.tabledata.push(response[i]);
                                    }
                                }
                                this.loading = false;
                            })
                            .catch(err => {
                                this.loading = false;
                                Message({
                                    message: err,
                                    type: "error",
                                    duration: 5 * 1000
                                });
                            });
                    }
                }

            },
            changecommentarymonths(val){
                this.form1.subjectmon = val;
                this.form1.subject = val;
                this.$store
                    .dispatch("PFANS2027Store/getLunardetails", this.form1)
                    .then(response => {
                        if(response){
                            for(let i=0;i < response.length;i++){
                                if (response[i].tatebai !== null && response[i].tatebai !== "") {
                                    let temp = getDictionaryInfo(response[i].tatebai);
                                    if (temp) {
                                        response[i].tatebai = temp.value1;
                                    }
                                }

                                if (response[i].satoshi !== null && response[i].satoshi !== "") {
                                    let temp = getDictionaryInfo(response[i].satoshi);
                                    if (temp) {
                                        response[i].satoshi = temp.value1;
                                    }
                                }

                                if (response[i].organization !== null && response[i].organization !== "") {
                                    let temp = getDictionaryInfo(response[i].organization);
                                    if (temp) {
                                        response[i].organization = temp.value1;
                                    }
                                }

                                if (response[i].systematics !== null && response[i].systematics !== "") {
                                    let temp = getDictionaryInfo(response[i].systematics);
                                    if (temp) {
                                        response[i].systematics = temp.value1;
                                    }
                                }

                                if (response[i].manpower !== null && response[i].manpower !== "") {
                                    let temp = getDictionaryInfo(response[i].manpower);
                                    if (temp) {
                                        response[i].manpower = temp.value1;
                                    }
                                }

                                if (response[i].scale !== null && response[i].scale !== "") {
                                    let temp = getDictionaryInfo(response[i].scale);
                                    if (temp) {
                                        response[i].scale = temp.value1;
                                    }
                                }

                                if (response[i].achievement !== null && response[i].achievement !== "") {
                                    let temp = getDictionaryInfo(response[i].achievement);
                                    if (temp) {
                                        response[i].achievement = temp.value1;
                                    }
                                }

                                if (response[i].degree !== null && response[i].degree !== "") {
                                    let temp = getDictionaryInfo(response[i].degree);
                                    if (temp) {
                                        response[i].degree = temp.value1;
                                    }
                                }

                                if (response[i].assignment !== null && response[i].assignment !== "") {
                                    let temp = getDictionaryInfo(response[i].assignment);
                                    if (temp) {
                                        response[i].assignment = temp.value1;
                                    }
                                }

                                if (response[i].teamwork !== null && response[i].teamwork !== "") {
                                    let temp = getDictionaryInfo(response[i].teamwork);
                                    if (temp) {
                                        response[i].teamwork = temp.value1;
                                    }
                                }

                                if (response[i].humandevelopment !== null && response[i].humandevelopment !== "") {
                                    let temp = getDictionaryInfo(response[i].humandevelopment);
                                    if (temp) {
                                        response[i].humandevelopment = temp.value1;
                                    }
                                }

                                if (response[i].workattitude !== null && response[i].workattitude !== "") {
                                    let temp = getDictionaryInfo(response[i].workattitude);
                                    if (temp) {
                                        response[i].workattitude = temp.value1;
                                    }
                                }
                                this.form.tabledata.push(response[i]);
                            }
                        }
                        this.loading = false;
                    })
                    .catch(err => {
                        this.loading = false;
                        Message({
                            message: err,
                            type: "error",
                            duration: 5 * 1000
                        });
                    });
            },

            changeevaluationtime(val){
                this.form1.evaluatenum = val;
                this.$store
                    .dispatch("PFANS2027Store/getLunardetails", this.form1)
                    .then(response => {

                    })
                    .catch(err => {
                        this.loading = false;
                        Message({
                            message: err,
                            type: "error",
                            duration: 5 * 1000
                        });
                    });
            },

            changeTatebai(val, index){
                this.form.tabledata[index].tatebai = val;
            },
            changeSatoshi(val, index){
                this.form.tabledata[index].satoshi = val;
            },
            changeOrganization(val, index){
                this.form.tabledata[index].organization = val;
            },
            changeSystematics(val, index){
                this.form.tabledata[index].systematics = val;
            },
            changeManpower(val, index){
                this.form.tabledata[index].manpower = val;
            },
            changeScale(val, index){
                this.form.tabledata[index].scale = val;
            },
            changeAchievement(val, index){
                this.form.tabledata[index].achievement = val;
            },
            changeDegree(val, index){
                this.form.tabledata[index].degree = val;
            },
            changeAssignment(val, index){
                this.form.tabledata[index].assignment = val;
            },
            changeTeamwork(val, index){
                this.form.tabledata[index].teamwork = val;
            },
            changeHumandevelopment(val, index){
                this.form.tabledata[index].humandevelopment = val;
            },
            changeWorkattitude(val, index){
                this.form.tabledata[index].workattitude = val;
            },

            buttonClick(val) {
                debugger
                if (this.$route.params._id) {
                    this.$store
                        .dispatch('PFANS2027Store/update', this.form.tabledata)
                        .then(response => {
                            this.data = response;
                            this.loading = false;
                            if (val !== "save") {
                                Message({
                                    message: this.$t("normal.success_02"),
                                    type: 'success',
                                    duration: 5 * 1000
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
                        });
                    this.update();
                }
            }

        }
    }
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
