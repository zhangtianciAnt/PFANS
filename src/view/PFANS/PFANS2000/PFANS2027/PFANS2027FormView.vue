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


            <div>
              <el-container>
                <el-dialog   :visible.sync="dialogFormVisible">
                    <el-form-item :label="$t('label.PFANS2007VIEW_YEAR')" >
                      <el-date-picker type="year" style="width: 10rem" v-model="year"></el-date-picker>
                    </el-form-item>
                    <el-form-item :label="$t('label.PFANS2027VIEW_COMMENTARYMONTHS')">
                      <dicselect
                        :code="code14"
                        :data="form1.subjectmon"
                        @change="changecommentarymonths"
                        style="width: 10rem"
                        :disabled="disabled">
                      </dicselect>
                    </el-form-item>

                    <el-form-item :label="$t('label.PFANS2027VIEW_EVALUATIONTIME')">
                      <dicselect
                        :code="code15"
                        :data="form1.evaluatenum"
                        @change="changeevaluationtime"
                        style="width: 10rem"
                        :disabled="disabled">
                      </dicselect>
                    </el-form-item>
                  <div  class="dialog-footer" align="center">
                    <span slot="footer" class="dialog-footer">
                                <el-button type="primary" @click="click">{{$t('button.confirm')}}</el-button>
                    </span>
                  </div>
                </el-dialog>
              </el-container>
            </div>

          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2027VIEW_CATEGORY')">
                <dicselect
                  :code="code13"
                  :data="category"
                  @change="changeCategory"
                  style="width: 10rem"
                  :disabled="disabled">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2027VIEW_COMMENTARYMONTHS')"  v-show="show">
                <dicselect
                  :code="code14"
                  :data="form1.subjectmon"
                  @change="changecommentarymonths"
                  style="width: 10rem"
                  :disabled="disabled">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2027VIEW_COMMENTARYMONTHS')"  v-show="show">
                <dicselect
                  :code="code14"
                  :data="form1.subjectmon"
                  @change="changecommentarymonths"
                  style="width: 10rem"
                  :disabled="disabled">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>


          <el-table :data="form.tabledata" stripe border header-cell-class-name="sub_bg_color_blue" :header-cell-style="getRowClass" >
            <el-table-column :label="$t('label.PFANS2006VIEW_NO')" align="center" prop="content"
                             type="index" width="50"></el-table-column>
            <!--氏名-->
            <el-table-column :label="$t('label.PFANS2027VIEW_NAME')" align="center" width="200">
              <template slot-scope="scope">
                <el-form-item :prop="'tabledata.' + scope.$index + '.department'">
                  <el-input v-model="scope.row.user_id" :disabled="true" style="width: 11rem" maxlength='36'></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <!--RN-->
            <el-table-column :label="$t('label.PFANS2027VIEW_RN')" align="center" width="200">
              <template slot-scope="scope">
                <el-form-item :prop="'tabledata.' + scope.$index + '.department'">
                  <el-input  :disabled="true" style="width: 11rem" maxlength='36'></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <!--入社日-->
            <el-table-column :label="$t('label.PFANS2027VIEW_DATE')" align="center" width="200">
              <template slot-scope="scope">
                <el-form-item :prop="'tabledata.' + scope.$index + '.department'">
                  <el-input  :disabled="true" style="width: 11rem" maxlength='36'></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <!--グループ-->
            <el-table-column :label="$t('label.PFANS2027VIEW_GROUP2')" align="center" width="200">
              <template slot-scope="scope">
                <el-form-item :prop="'tabledata.' + scope.$index + '.department'">
                  <el-input  :disabled="true" style="width: 11rem" maxlength='36'></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <!--チーム-->
            <el-table-column :label="$t('label.PFANS2027VIEW_TEAM')" align="center" width="200">
              <template slot-scope="scope">
                <el-form-item :prop="'tabledata.' + scope.$index + '.department'">
                  <el-input  :disabled="true" style="width: 11rem" maxlength='36'></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <!--入社形式-->
            <el-table-column :label="$t('label.PFANS2027VIEW_FORM')" align="center" width="200">
              <template slot-scope="scope">
                <el-form-item :prop="'tabledata.' + scope.$index + '.department'">
                  <el-input  :disabled="true" style="width: 11rem" maxlength='36'></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <!--基本給-->
            <el-table-column :label="$t('label.PFANS2027VIEW_GIVE')" align="center" width="200">
              <template slot-scope="scope">
                <el-form-item :prop="'tabledata.' + scope.$index + '.department'">
                  <el-input  :disabled="true" style="width: 11rem" maxlength='36'></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <!--出勤率-->
            <el-table-column :label="$t('label.PFANS2027VIEW_ATTENDANCE')" align="center" width="200">
              <template slot-scope="scope">
                <el-form-item :prop="'tabledata.' + scope.$index + '.department'">
                  <el-input v-model="scope.row.workrate" :disabled="true" style="width: 11rem" maxlength='36'></el-input>
                </el-form-item>
              </template>
            </el-table-column>
           <!-- 2018年-->
            <el-table-column :label="$t('label.PFANS2027VIEW_2018YEAR')" align="center" width="200">
              <template slot-scope="scope">
                <el-form-item :prop="'tabledata.' + scope.$index + '.department'">
                  <el-input v-model="scope.row.bonussign" :disabled="true" style="width: 11rem" maxlength='36'></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <!--前回-->
            <el-table-column :label="$t('label.PFANS2027VIEW_LASTMONTHS')" align="center" width="200">
              <template slot-scope="scope">
                <el-form-item :prop="'tabledata.' + scope.$index + '.department'">
                  <el-input v-model="scope.row.lastsymbol" :disabled="true" style="width: 11rem" maxlength='36'></el-input>
                </el-form-item>
              </template>
            </el-table-column>
<!-- 経営・運営成果-->
            <el-table-column :label="$t('label.PFANS2027VIEW_RESULT')" align="center">

              <el-table-column :label="$t('label.PFANS2027VIEW_PLAN')" align="center" width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.deliverycondition'">
                    <dicselect
                      :code="code1"
                      :data="scope.row.tatebai"
                      :no="scope.row"
                      @change="(val)=>{changeTatebai(val,scope.$index)}"
                      style="width: 11rem"
                      :disabled="disabled">
                    </dicselect>
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column :label="$t('label.PFANS2027VIEW_SECURITY')" align="center" width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.deliverycondition'">
                    <dicselect
                      :code="code2"
                      :data="scope.row.satoshi"
                      :no="scope.row"
                      @change="(val)=>{changeSatoshi(val,scope.$index)}"
                      style="width: 11rem"
                      :disabled="disabled">
                    </dicselect>
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column :label="$t('label.PFANS2027VIEW_CREATE')" align="center" width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.deliverycondition'">
                    <dicselect
                      :code="code3"
                      :data="scope.row.organization"
                      :no="scope.row"
                      @change="(val)=>{changeOrganization(val,scope.$index)}"
                      style="width: 11rem"
                      :disabled="disabled">
                    </dicselect>
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column :label="$t('label.PFANS2027VIEW_TALENT')" align="center" width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.deliverycondition'">
                    <dicselect
                      :code="code4"
                      :data="scope.row.systematics"
                      :no="scope.row"
                      @change="(val)=>{changeSystematics(val,scope.$index)}"
                      style="width: 11rem"
                      :disabled="disabled">
                    </dicselect>
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column :label="$t('label.PFANS2027VIEW_RATIO')" align="center" width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.deliverycondition'">
                    <el-input :disabled="true"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table-column>
<!-- PJ成果-->
            <el-table-column :label="$t('label.PFANS2027VIEW_PJRESULT')" align="center" >

              <el-table-column :label="$t('label.PFANS2027VIEW_DIFFICULTYLEVEL')" align="center" width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.deliverycondition'">
                    <dicselect
                      :code="code5"
                      :data="scope.row.manpower"
                      :no="scope.row"
                      @change="(val)=>{changeManpower(val,scope.$index)}"
                      style="width: 11rem"
                      :disabled="disabled">
                    </dicselect>
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column :label="$t('label.PFANS2027VIEW_ISSUE')" align="center" width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.deliverycondition'">
                    <dicselect
                      :code="code6"
                      :data="scope.row.scale"
                      :no="scope.row"
                      @change="(val)=>{changeScale(val,scope.$index)}"
                      style="width: 11rem"
                      :disabled="disabled">
                    </dicselect>
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column :label="$t('label.PFANS2027VIEW_QCD')" align="center" width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.deliverycondition'">
                    <dicselect
                      :code="code7"
                      :data="scope.row.achievement"
                      :no="scope.row"
                      @change="(val)=>{changeAchievement(val,scope.$index)}"
                      style="width: 11rem"
                      :disabled="disabled">
                    </dicselect>
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column :label="$t('label.PFANS2027VIEW_NANYI')" align="center" width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.deliverycondition'">
                    <dicselect
                      :code="code8"
                      :data="scope.row.degree"
                      :no="scope.row"
                      @change="(val)=>{changeDegree(val,scope.$index)}"
                      style="width: 11rem"
                      :disabled="disabled">
                    </dicselect>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS2027VIEW_RATIO')" align="center" width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.deliverycondition'">
                    <el-input :disabled="true"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table-column>
<!--意欲-->
            <el-table-column :label="$t('label.PFANS2027VIEW_MEAN')" align="center" >

              <el-table-column :label="$t('label.PFANS2027VIEW_KETI')" align="center" width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.deliverycondition'">
                    <dicselect
                      :code="code9"
                      :data="scope.row.assignment"
                      :no="scope.row"
                      @change="(val)=>{changeAssignmenti(val,scope.$index)}"
                      style="width: 11rem"
                      :disabled="disabled">
                    </dicselect>
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column :label="$t('label.PFANS2027VIEW_TEAMWORK')" align="center" width="250">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.deliverycondition'">
                    <dicselect
                      :code="code10"
                      :data="scope.row.teamwork"
                      :no="scope.row"
                      @change="(val)=>{changeTeamwork(val,scope.$index)}"
                      style="width: 11rem"
                      :disabled="disabled">
                    </dicselect>
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column :label="$t('label.PFANS2027VIEW_RENCAI')" align="center" width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.deliverycondition'">
                    <dicselect
                      :code="code11"
                      :data="scope.row.humandevelopment"
                      :no="scope.row"
                      @change="(val)=>{changeHumandevelopment(val,scope.$index)}"
                      style="width: 11rem"
                      :disabled="disabled">
                    </dicselect>
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column :label="$t('label.PFANS2027VIEW_MICROWAVE')" align="center" width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.deliverycondition'">
                    <dicselect
                      :code="code12"
                      :data="scope.row.workattitude"
                      :no="scope.row"
                      @change="(val)=>{changeWorkattitude(val,scope.$index)}"
                      style="width: 11rem"
                      :disabled="disabled">
                    </dicselect>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS2027VIEW_RATIO')" align="center" width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.deliverycondition'">
                    <el-input :disabled="true"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table-column>
<!--評価-->
            <el-table-column :label="$t('label.PFANS2027VIEW_EVALUATION')" align="center">

              <el-table-column :label="$t('label.PFANS2027VIEW_COMPOSITESCORES')" align="center" width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.deliverycondition'">
                    <el-input :disabled="true" :data="scope.row.overallscore"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column :label="$t('label.PFANS2027VIEW_ESTIMATETIME')" align="center" width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.deliverycondition'">
                    <el-input :disabled="true" :data="scope.row.commentaryreturns"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column :label="$t('label.PFANS2027VIEW_ESTIMATERESULT')" align="center" width="200">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.deliverycondition'">
                    <el-input :disabled="true" :data="scope.row.commentaryresult"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>

            </el-table-column>
<!--総合所見【1】-->
            <el-table-column :label="$t('label.PFANS2027VIEW_COMPOSITE1')" align="center">

              <el-table-column :label="$t('label.PFANS2027VIEW_COMPOSITEEVALUATION')" align="center" width="270">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.deliverycondition'">
                    <el-input :data="scope.row.comprehensiveone"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table-column>
<!-- 総合所見【2】-->
            <el-table-column :label="$t('label.PFANS2027VIEW_COMPOSITE2')" align="center">

              <el-table-column :label="$t('label.PFANS2027VIEW_FIRSTEVALUATION')" align="center" width="270">
                <template slot-scope="scope">
                  <el-form-item :prop="'tabledata.' + scope.$index + '.deliverycondition'">
                    <el-input :data="scope.row.comprehensivetwo"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table-column>

            <el-table-column :label="$t('label.PFANS2027VIEW_ONEMONTH')" align="center" width="270">
              <template slot-scope="scope">
                <el-form-item :prop="'tabledata.' + scope.$index + '.deliverycondition'">
                  <el-input :data="scope.row.firstmonth"></el-input>
                </el-form-item>
              </template>
            </el-table-column>

            <el-table-column :label="$t('label.PFANS2027VIEW_TOWMONTH')" align="center" width="270">
              <template slot-scope="scope">
                <el-form-item :prop="'tabledata.' + scope.$index + '.deliverycondition'">
                  <el-input :data="scope.row.secondmonth"></el-input>
                </el-form-item>
              </template>
            </el-table-column>

            <el-table-column :label="$t('label.PFANS2027VIEW_THREMONTH')" align="center" width="270">
              <template slot-scope="scope">
                <el-form-item :prop="'tabledata.' + scope.$index + '.deliverycondition'">
                  <el-input :data="scope.row.thirdmonth"></el-input>
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
                dialogFormVisible: false,
                year: new Date(),
                form1:{
                    evaluatenum:'',
                    subjectmon:'',
                    subject:'',
                    user_id: this.$store.getters.userinfo.userid,
                },

                category: '',
                titleType:'',
                title: "title.PFANS2027VIEW_VIEW",
                buttonList: [],
                disabled: false,

                form: {
                    tabledata: [{
                        lunardetail_id:'',
                        lunarbonus_id:'',
                        user_id:'',
                        workrate:'',
                        bonussign:'',
                        lastsymbol:'',
                        tatebai:'',
                        satoshi:'',
                        organization:'',
                        systematics:'',
                        manpower:'',
                        scale:'',
                        achievement:'',
                        degree:'',
                        assignment:'',
                        teamwork:'',
                        humandevelopment:'',
                        workattitude:'',
                        overallscore:'',
                        commentaryreturns:'',
                        commentaryresult:'',
                        comprehensiveone:'',
                        comprehensivetwo:'',
                        firstmonth:'',
                        secondmonth:'',
                        thirdmonth:'',
                        rn:'',
                    }]
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
        mounted(){
            //let lst = getUserInfo(this.$store.getters.userinfo.userid);//获取当前user
            this.loading = true;
            if (this.$route.params._id) {
                //this.dialogFormVisible = true;
                this.show = true;
            }else{//新建
                this.show = false;
                let month = new Date().getMonth() + 1;
                if(month >= 1 && month <=3){
                    this.form1.subjectmon = getDictionaryInfo('PJ103004').value1;
                }
                if(month >= 4 && month <=6){
                    this.form1.subjectmon = getDictionaryInfo('PJ103001').value1;
                }
                if(month >= 7 && month <=9){
                    this.form1.subjectmon = getDictionaryInfo('PJ103002').value1;
                }
                if(month >= 10 && month <=12){
                    this.form1.subjectmon = getDictionaryInfo('PJ103003').value1;
                }
                let user = getUserInfo(this.form1.user_id);
                console.log(user.userinfo.post);
                //获取本用户的职位
                let postcode = user.userinfo.post;
                if(postcode === 'PJ105005'){
                    this.form1.evaluatenum = getDictionaryInfo('PJ104001').value1;
                }
                if(postcode === 'PJ105003'){
                    this.form1.evaluatenum = getDictionaryInfo('PJ104002').value1;
                }
                if(postcode === 'PJ105002'){
                    this.form1.evaluatenum = getDictionaryInfo('PJ104003').value1;
                }

                this.dialogFormVisible = true;
            }

        },
        methods: {
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
            click(){
                // this.dialogFormVisible = false;
                // this.loading = false;
                console.log("aaa",this.form1);
                this.loading = true;
                this.$store
                    .dispatch("PFANS2027Store/insertLunarbonus", this.form1)
                    .then(response => {
                        this.loading = false;
                        this.$message({
                            message: this.$t("normal.success_01"),
                            type: "success"
                        });
                        if (this.$store.getters.historyUrl) {
                            this.$router.push(this.$store.getters.historyUrl);
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
                this.dialogFormVisible = false;

            },
            changeCategory(val){
                this.category = val;
            },

            changeevaluationtime(val){
                debugger;
                this.form1.evaluatenum = val;
            },

            changecommentarymonths(val){
                debugger;
                this.form1.subjectmon = val;
                this.form1.subject = val;
                // let cateVal = getDictionaryInfo(val);
                // if(cateVal){
                //     this.form1.subject = cateVal.value2;
                // }
            },

            changeTatebai(val, index){

            },
            changeSatoshi(val, index){

            },
            changeOrganization(val, index){

            },
            changeSystematics(val, index){

            },
            changeManpower(val, index){

            },
            changeScale(val, index){

            },
            changeAchievement(val, index){

            },
            changeDegree(val, index){

            },
            changeAssignment(val, index){

            },
            changeTeamwork(val, index){

            },
            changeHumandevelopment(val, index){

            },
            changeWorkattitude(val, index){

            },
            getDeliverycondition(){},
            multiple(){},
            // titleType(){},
            disabled3(){},
            buttonClick(val) {},

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
