<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList"
                         :title="title"
                         @buttonClick="buttonClick"
                         :canStart="canStart"
                         @end="end" @start="start"
                         @workflowState="workflowState"
                         ref="container" v-loading="loading">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="left" label-width="8rem" ref="reff" style="padding: 20px">
          <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('label.PFANS1025VIEW_FIRSTDETAILS')" name="first">
              <div>
                 <span
                   class="Title_front main_color"
                   style="float:left"
                 >{{$t('label.PFANS1025VIEW_FIRSTDETAILS')}}</span>
                <el-row></el-row>
               <el-row>
                 <el-col :span="8">
                   <el-form-item :label="$t('label.PFANS1024VIEW_CONTRACTNUMBER')">
                     <el-input  :disabled="!disable"style="width:11rem" v-model="form.contractnumber"></el-input>
                   </el-form-item>
                 </el-col>
                 <el-col :span="8">
                   <el-form-item :label="$t('label.PFANS1024VIEW_CONTRACTTYPE')">
                     <dicselect :code="code1"
                                :data="form.contracttype"
                                :disabled="!disable"
                                :multiple="multiple"
                                @change="getcontracttype"
                                style="width: 11rem">
                     </dicselect>
                   </el-form-item>
                 </el-col>
                 <el-col :span="8">
                   <el-form-item :label="$t('label.PFANS1025VIEW_ENTRUSTJAPANESE')">
                     <el-input  :disabled="!disable" style="width:11rem" v-model="form.entrustjapanese"></el-input>
                   </el-form-item>
                 </el-col>
               </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_ENTRUSTCHINESE')">
                      <el-input  :disabled="!disable"style="width:11rem" v-model="form.entrustchinese"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_ENPLACEJAPANESE')">
                      <el-input  :disabled="!disable" style="width:11rem" v-model="form.enplacejapanese"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_ENPLACECHINESE')">
                      <el-input  :disabled="!disable" style="width:11rem" v-model="form.enplacechinese"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1024VIEW_DEPLOYMENT')">
                      <el-input  :disabled="!disable"style="width:11rem" v-model="form.deployment"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_PJNAMEJAPANESE')">
                      <el-input  :disabled="!disable" style="width:11rem" v-model="form.pjnamejapanese"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_PJNAMECHINESE')">
                      <el-input  :disabled="!disable" style="width:11rem" v-model="form.pjnamechinese"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">

                    <el-form-item :label="$t('label.PFANS1025VIEW_DEVELOPDATE')" >
                      <el-date-picker
                        v-model="form.developdate"
                        type="daterange"
                        :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                        :start-placeholder="$t('label.startdate')"
                        :end-placeholder="$t('label.enddate')"
                        style="width: 20rem">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1024VIEW_DELIVERYDATE')">
                      <el-date-picker :disabled="!disable" style="width: 11rem" v-model="form.deliverydate">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_CURRENCYFORMAT')">
                      <dicselect :code="code2"
                                 :data="form.currencyformat"
                                 :disabled="!disable"
                                 :multiple="multiple"
                                 @change="getcurrencyformat"
                                 style="width: 11rem">
                      </dicselect>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')">
                      <el-input  :disabled="!disable" style="width:11rem" v-model="form.claimamount"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <div>



              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1025VIEW_SECONDDETAILS')" name="second">
              <div>
                 <span
                   class="Title_front main_color"
                   style="float:left"
                 >{{$t('label.PFANS1025VIEW_SECONDDETAILS')}}</span>
                <el-row></el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1008FORMVIEW_INITIATOR')" :error="error" prop="user_id">
                      <user :disabled="!disable" :error="error" :selectType="selectType" :userlist="userlist"
                            @getUserids="getUserids" style="width: 10.2rem" v-model="form.user_id"></user>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_EXTRINSIC')">
                      <dicselect :code="code1"
                                 :data="form.extrinsic"
                                 :disabled="!disable"
                                 :multiple="multiple"
                                 @change="getextrinsic"
                                 style="width: 11rem">
                      </dicselect>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_TELEPHONE')" prop="telephone">
                      <el-input  :disabled="!disable" style="width:11rem" v-model="form.telephone"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_EQUIPMENT')">
                      <el-input  :disabled="!disable"style="width:11rem" v-model="form.equipment"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_COMMDEPARTMENT')">
                      <el-input  :disabled="!disable"style="width:11rem" v-model="form.commdepartment"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_COMMISSION')">
                      <el-input  :disabled="!disable" style="width:11rem" v-model="form.commission"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1004VIEW_CAREERPLAN')"   prop="careerplan">
                      <span style="margin-right: 1rem ">{{$t('label.PFANS1004VIEW_OUTER')}}</span>
                      <el-switch
                        :disabled="!disabled"
                        v-model="form.plan"
                        active-value="1"
                        inactive-value="0"
                        @change="radiochange">
                      </el-switch>
                      <span style="margin-left: 1rem ">{{$t('label.PFANS1004VIEW_INSIDE')}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_VALUATION')">
                      <dicselect :code="code2"
                                 :data="form.valuation"
                                 :disabled="!disable"
                                 :multiple="multiple"
                                 @change="getvaluation"
                                 style="width: 11rem">
                      </dicselect>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_INDIVIDUAL')">
                      <dicselect :code="code2"
                                 :data="form.individual"
                                 :disabled="!disable"
                                 :multiple="multiple"
                                 @change="getindividual"
                                 style="width: 11rem">
                      </dicselect>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_PLANNUMBER')">
                      <el-input  :disabled="!disable"style="width:11rem" v-model="form.plannumber"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_VALUATIONNUMBER')">
                      <el-input  :disabled="!disable" style="width:11rem" v-model="form.valuationnumber"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_CONTRACTNUMBER')">
                      <el-input  :disabled="!disable" style="width:11rem" v-model="form.contractnumber"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1017FORMVIEW_PREPAREFOR')">
                      <el-input  :disabled="!disable" style="width:11rem" v-model="form.remarks"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <el-table :data="tableT" :summary-method="getTsummaries" header-cell-class-name="sub_bg_color_grey height"
                        show-summary>
                <el-table-column :label="$t('label.PFANS1025VIEW_BUDGETCODE')" align="center" width="150">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" maxlength="20" style="width: 100%" v-model="scope.row.budgetcode">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1025VIEW_DEPART')" align="center" width="170" :error="errorgroup" >
                  <template slot-scope="scope">
                    <org  :orglist="scope.row.grouporglist" orgtype="1" :disabled="!disabled" :error="errorgroup" style="width: 9rem" @getOrgids="getGroupId"></org>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1025VIEW_MEMBER')" align="center" width="150" prop="member">
                  <template slot-scope="scope">
                    <el-input-number
                      :disabled="!disable"
                      :max="1000000000"
                      :min="0"
                      :no="scope.row"
                      :precision="2"
                      controls-position="right"
                      style="width: 100%"
                      v-model="scope.row.member"
                    ></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1025VIEW_COMMUNITY')" align="center"width="150">
                  <template slot-scope="scope">
                    <el-input-number
                      :disabled="!disable"
                      :max="1000000000"
                      :min="0"
                      :no="scope.row"
                      controls-position="right"
                      style="width: 100%"
                      v-model="scope.row.community"
                    ></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1025VIEW_OUTSOURCE')" align="center"  width="150"  prop="outsource">
                  <template slot-scope="scope">
                    <el-input-number
                      :disabled="!disable"
                      :max="1000000000"
                      :min="0"
                      :no="scope.row"
                      :precision="2"
                      controls-position="right"
                      style="width: 100%"
                      v-model="scope.row.outsource"
                    ></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1025VIEW_OUTCOMMUNITY')" align="center"  width="150">
                  <template slot-scope="scope">
                    <el-input-number
                      :disabled="!disable"
                      :max="1000000000"
                      :min="0"
                      :no="scope.row"
                      controls-position="right"
                      style="width: 100%"
                      v-model="scope.row.outcommunity"
                    ></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1025VIEW_WORKNUMBER')" align="center" prop="worknumber" width="150">
                  <template slot-scope="scope">
                    <el-input-number
                      :disabled="!disable"
                      :max="1000000000"
                      :min="0"
                      :no="scope.row"
                      :precision="2"
                      controls-position="right"
                      style="width: 100%"
                      v-model="scope.row.worknumber"
                    ></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1025VIEW_AWARDMONEY')" align="center" prop="awardmoney" width="150">
                  <template slot-scope="scope">
                    <el-input-number
                      :disabled="!disable"
                      :max="1000000000"
                      :min="0"
                      :no="scope.row"
                      :precision="2"
                      controls-position="right"
                      style="width: 100%"
                      v-model="scope.row.awardmoney"
                    ></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.operation')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-button
                      :disabled="!disable"
                      @click.native.prevent="deleteRow(scope.$index, tableT)"
                      plain
                      size="small"
                      type="danger"
                    >{{$t('button.delete')}}
                    </el-button>
                    <el-button
                      :disabled="!disable"
                      @click="addRow()"
                      plain
                      size="small"
                      type="primary"
                    >{{$t('button.insert')}}
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
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
  import dicselect from '../../../components/dicselect';
  import org from "../../../components/org";


    export default {
      name: "PFANS1025FormView",
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
          disabled: true,
          error: '',
          userlist: '',
          code1: 'PJ010',
          code2: 'HT005',
          baseInfo: {},
          form: {
            contractnumber: '',
            contracttype: '',
            entrustjapanese: '',
            entrustchinese: '',
            enplacejapanese: '',
            enplacechinese: '',
            deployment: '',
            pjnamejapanese: '',
            pjnamechinese: '',
            developdate:'',
            enddate: '',
            firstdetails: '',
            deliverydate: '',
            currencyformat: '',
            claimamount: '',
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
          },
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
        if (this.$route.params._id) {
          this.loading = true;
          this.$store
            .dispatch('PFANS1025tore/selectById', {'award_id': this.$route.params._id})
            .then(response => {
              this.form = response.award;
              if (response.awarddetail.length > 0) {
                this.tableT = response.awarddetail
              }
              this.userlist = this.form.user_id;
              this.baseInfo.award = JSON.parse(JSON.stringify(this.form));
              this.baseInfo.awarddetail = JSON.parse(JSON.stringify(this.tableT));
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
        } else {
          this.userlist = this.$store.getters.userinfo.userid;
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
        getcurrencyformat(val) {
          this.form.currencyformat = val;
        },
        getextrinsic(val) {
          thhis.form.extrinsic = val;
        },
        getvaluation(val) {
          this.form.valuation = val;
        },
        getindividual(val) {
          this.form.individual = val;
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
        getsummaries(param) {
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
            } else {
              sums[index] = '--'
            }
          });
          this.gettotal(sums);
          return sums;
        },
        buttonClick(val) {
          this.$refs["reff"].validate(valid =>{
            if(valid){
              this.baseInfo={};
              this.form.user_id=this.userlist;
              this.baseInfo.award=JSON.parse(JSON.stringify(this.form));
              this.baseInfo.awarddetail=[];
              for(let i=0;i<this.tableT.length;i++){
                if(this.tableT[i].budgetcode!==""||this.tableT[i].depart!==""||this.tableT[i].member!==""||this.tableT[i].community!==""
                  ||this.tableT[i].outsource!==""||this.tableT[i].outcommunity!==""||this.tableT[i].worknumber!==""||this.tableT[i].awardmoney!==""){
                  this.baseInfo.awarddetail.push({
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
            }
          });
          if(this.$route.params._id){     //编辑
            this.baseInfo.award.award_id = this.$route.params._id;
          this.$store
            .dispatch('PFANS1025Store/update',this.baseInfo)
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
      }
    }
</script>

<style scoped>

</style>
