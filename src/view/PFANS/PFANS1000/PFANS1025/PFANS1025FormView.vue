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
                    <el-form-item :label="$t('label.PFANS1025VIEW_OPENINGDATE')">
                      <el-date-picker :disabled="!disable" style="width: 11rem" v-model="form.openingdate">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_ENDDATE')">
                      <el-date-picker :disabled="!disable" style="width: 11rem" v-model="form.enddate">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1024VIEW_DELIVERYDATE')">
                      <el-date-picker :disabled="!disable" style="width: 11rem" v-model="form.deliverydate">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
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
                    <el-form-item :label="$t('label.PFANS1025VIEW_REMARKS')">
                      <el-input  :disabled="!disable" style="width:11rem" v-model="form.remarks"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

              </div>
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


    export default {
        name: "PFANS1025FormView",
      components: {
        EasyNormalContainer,
        user,
        dicselect
      },
      data(){
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
          return{
            activeName: 'first',
            diable:false,
            error: '',
            userlist: '',
            code1:'PJ010',
            code2:'HT005',

            form:{
              contractnumber:'',
              contracttype:'',
              entrustjapanese:'',
              entrustchinese:'',
              enplacejapanese:'',
              enplacechinese:'',
              deployment:'',
              pjnamejapanese:'',
              pjnamechinese:'',
              enddate:'',
              firstdetails:'',
              deliverydate:'',
              currencyformat:'',
              claimamount:'',
              user_id:'',
              extrinsic:'',
              equipment:'',
              telephone:'',
              commdepartment:'',
              commission:'',
              plan:'',
              valuation:'',
              individual:'',
              plannumber:'',
              valuationnumber:'',
              remarks:'',
            },
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
            }
          }
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
        getcurrencyformat(val){
          this.form.currencyformat=val;
        },
        getextrinsic(val){
          thhis.form.extrinsic=val;
        },
        getvaluation(val){
          this.form.valuation=val;
        },
        getindividual(val){
          this.form.individual=val;
        },
      }
    }
</script>

<style scoped>

</style>
