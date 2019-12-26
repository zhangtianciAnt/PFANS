
<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList"
                         :title="title"
                         @buttonClick="buttonClick"
                         ref="container"
                         v-loading="loading">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="left" label-width="8rem" ref="reff" style="padding: 20px">
          <el-row>
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.PFANS1032FORMVIEW_CONTRACTNUMBER')">
                <el-input  :disabled="!disable" maxlength="20" style="width: 11rem" v-model="form.contractnumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1024VIEW_CONTRACTTYPE')">
                <el-input   :disabled="!disable"maxlength="20" style="width: 11rem" v-model="form.contracttype"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1032FORMVIEW_DEPOSITARYENGLISH')">
                <el-input   :disabled="!disable" maxlength="20" style="width: 11rem" v-model="form.depositenglish"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.PFANS1032FORMVIEW_DEPOSITARYCHINESE')">
                <el-input   :disabled="!disable" maxlength="20" style="width: 11rem" v-model="form.depositchinese"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1032FORMVIEW_PRINCIPALPERSON')">
                <el-input   :disabled="!disable" maxlength="20" style="width: 11rem" v-model="form.dereenglish"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1032FORMVIEW_PRINCIPALPLACEENGLISH')">
                <el-input   :disabled="!disable" maxlength="20" style="width: 11rem" v-model="form.prplaceenglish"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.PFANS1032FORMVIEW_PRINCIPALPLACECHINESE')">
                <el-input   :disabled="!disable" maxlength="20" style="width: 11rem" v-model="form.prplacechinese"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1025VIEW_PJNAMEJAPANESE')">
                <el-input   :disabled="!disable" maxlength="20" style="width: 11rem" v-model="form.pjnamejapanese"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1025VIEW_PJNAMECHINESE')">
                <el-input   :disabled="!disable" maxlength="20" style="width: 11rem" v-model="form.pjnamechinese"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1025VIEW_DEVELOPDATE')" >
                <el-date-picker
                  v-model="form.developdate"
                  type="daterange"
                  :disabled="!disable"
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
              <el-form-item :label="$t('label.PFANS1024VIEW_BUSINESSCODE')">
                <el-input  :disabled="!disable" maxlength="20" style="width: 11rem" v-model="form.businesscode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.PFANS1024VIEW_DELIVERYFINSHDATE')">
                <el-input   :disabled="!disable" maxlength="20" style="width: 11rem" v-model="form.deliverydate"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')">
                <el-input  :disabled="!disable" maxlength="20" style="width: 11rem" v-model="form.claimoney"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1032FORMVIEW_DEPOSITARYPHONE')">
                <el-input  :disabled="!disable" maxlength="20" style="width: 11rem" v-model="form.depositphone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.PFANS1032FORMVIEW_CLAIMNUMBER')">
                <el-input  :disabled="!disable" maxlength="20" style="width: 11rem" v-model="form.claimnumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1032FORMVIEW_CLAIMTYPE')">
                <el-input :disabled="true" maxlength="20" style="width: 11rem" v-model="form.claimtype"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1025VIEW_CURRENCYFORMAT')">
                <el-input  :disabled="!disable" maxlength="20" style="width: 11rem" v-model="form.currencyformat"></el-input>
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
              depositenglish:'',
              depositchinese:'',
              dereenglish:'',
              prplaceenglish:'',
              prplacechinese:'',
              pjnamejapanese:'',
              pjnamechinese:'',
              developdate:[],
              businesscode:'',
              deliverydate:'',
              claimoney:'',
              depositphone:'',
              claimnumber:'',
              claimtype:'',
              currencyformat:'',
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
              this.form.deliverydate=moment(this.form.deliverydate).format('YYYY-MM-DD');
              if(this.form.developdate!=="" && this.form.developdate!==null){
                let sertdate=this.form.developdate.slice(0,10);
                let enddate =this.form.developdate.slice(this.form.developdate.length-10);
                this.form.developdate=[sertdate,enddate];
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
              this.form.deliverydate=moment(this.form.deliverydate).format('YYYY-MM-DD');
              this.form.developdate=moment(this.form.developdate[0]).format('YYYY-MM-DD')+" ~ "+moment(this.form.developdate[1]).format('YYYY-MM-DD');
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
