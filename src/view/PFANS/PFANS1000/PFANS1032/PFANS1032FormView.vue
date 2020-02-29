
<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList"
                         :title="title"
                         @buttonClick="buttonClick"
                         ref="container"
                         v-loading="loading">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="reff" style="padding: 2vw">
          <el-row>
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.PFANS1032FORMVIEW_CONTRACTNUMBER')">
                <el-input  :disabled="!disable" maxlength="20" style="width:20vw" v-model="form.contractnumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1024VIEW_CONTRACTTYPE')">
                <el-input   :disabled="!disable"maxlength="20" style="width:20vw" v-model="form.contracttype"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1032FORMVIEW_DEPOSITARYENGLISH')">
                <el-input   :disabled="!disable" maxlength="20" style="width:20vw" v-model="form.custoenglish"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.PFANS1032FORMVIEW_DEPOSITARYCHINESE')">
                <el-input   :disabled="!disable" maxlength="20" style="width:20vw" v-model="form.custochinese"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1032FORMVIEW_PRINCIPALPERSON')">
                <el-input   :disabled="!disable" maxlength="20" style="width:20vw" v-model="form.responerglish"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1032FORMVIEW_PRINCIPALPLACEENGLISH')">
                <el-input   :disabled="!disable" maxlength="20" style="width:20vw" v-model="form.placeenglish"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.PFANS1032FORMVIEW_PRINCIPALPLACECHINESE')">
                <el-input   :disabled="!disable" maxlength="20" style="width:20vw" v-model="form.placechinese"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1025VIEW_PJNAMEJAPANESE')">
                <el-input   :disabled="!disable" maxlength="20" style="width:20vw" v-model="form.pjnamejapanese"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1025VIEW_PJNAMECHINESE')">
                <el-input   :disabled="!disable" maxlength="20" style="width:20vw" v-model="form.pjnamechinese"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1025VIEW_DEVELOPDATE')" >
                <el-date-picker
                  v-model="form.claimdatetime"
                  type="daterange"
                  :disabled="!disable"
                  :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                  :start-placeholder="$t('label.startdate')"
                  :end-placeholder="$t('label.enddate')"
                  style="width:20vw">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1024VIEW_BUSINESSCODE')">
                <el-input  :disabled="!disable" maxlength="20" style="width:20vw" v-model="form.businesscode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.PFANS1024VIEW_DELIVERYFINSHDATE')">
                <el-input   :disabled="!disable" maxlength="20" style="width:20vw" v-model="form.deliveryfinshdate"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')">
                <el-input  :disabled="!disable" maxlength="20" style="width:20vw" v-model="form.claimamount"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1032FORMVIEW_DEPOSITARYPHONE')">
                <el-input  :disabled="!disable" maxlength="20" style="width:20vw" v-model="form.responphone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.PFANS1032FORMVIEW_CLAIMNUMBER')">
                <el-input  :disabled="!disable" maxlength="20" style="width:20vw" v-model="form.claimnumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1032FORMVIEW_CLAIMTYPE')">
                <el-input :disabled="true" maxlength="20" style="width:20vw" v-model="form.claimtype"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1025VIEW_CURRENCYFORMAT')">
                <el-input  :disabled="!disable" maxlength="20" style="width:20vw" v-model="form.currencyposition"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>



<script>
  import EasyNormalContainer from "@/components/EasyNormalContainer";
  import user from "../../../components/user.vue";
  import {Message} from 'element-ui'
  import moment from "moment";
  import {getUserInfo} from '@/utils/customize'

  export default {
    name: "PFANS1032FormView",
    components: {
      EasyNormalContainer, user,
    },
    data(){
      return{
        title: "title.PFANS1032VIEW",
        buttonList: [],
        loading: false,
        disabled: true,
        error: '',
        form: {
          contractnumber:'',
          contracttype:'',
          custoenglish:'',
          custochinese:'',
          responerglish:'',
          placeenglish:'',
          placechinese:'',
          pjnamejapanese:'',
          pjnamechinese:'',
        claimdatetime:[],
          businesscode:'',
        deliveryfinshdate:'',
      claimamount:'',
      responphone:'',
      claimnumber:'',
          claimtype:'',
        currencyposition:'',
        },
        rules: {},
      }
    },
    mounted() {
      this.loading = true;
      if (this.$route.params._id) {
        this.$store
          .dispatch('PFANS1032Store/one', {"petition_id": this.$route.params._id})
          .then(response => {
            this.form=response;
            this.form.deliveryfinshdate=moment(this.form.deliveryfinshdate).format('YYYY-MM-DD');
            if(this.form.claimdatetime!=="" && this.form.claimdatetime!==null){
              let sertdate=this.form.claimdatetime.slice(0,10);
              let enddate =this.form.claimdatetime.slice(this.form.developdate.length-10);
              this.form.claimdatetime=[sertdate,enddate];
            }
            this.loading=false;
          })
          .catch(error=>{
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
            this.loading=false;
          })
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
      buttonClick(val) {
        this.$refs["reff"].validate(valid =>{
          if(valid){
            this.loading = true;
            this.form.deliveryfinshdate=moment(this.form.deliveryfinshdate).format('YYYY-MM-DD');
            this.form.claimdatetime=moment(this.form.claimdatetime[0]).format('YYYY-MM-DD')+" ~ "+moment(this.form.claimdatetime[1]).format('YYYY-MM-DD');
            if(this.$route.params._id){     //编辑
              this.$store
                .dispatch('PFANS1032Store/update',this.form)
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
        })
      }
    }
  }
</script>

<style scoped>

</style>
