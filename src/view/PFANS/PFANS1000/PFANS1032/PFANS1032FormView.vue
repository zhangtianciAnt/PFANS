<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :canStart="canStart" :title="title" @buttonClick="buttonClick"
                         @end="end"
                         @start="start" @workflowState="workflowState" ref="container" v-loading="loading">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="left" label-width="8rem" ref="reff" style="padding: 2rem">
          <el-row>
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.PFANS1032FORMVIEW_CONTRACTNUMBER')">
                <el-input :disabled="true" maxlength="20" style="width: 11rem" v-model="form.contractnumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1024FORMVIEW_CONTRACTTYPE')">
                <el-input :disabled="true" maxlength="20" style="width: 11rem" v-model="form.contracttype"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1032FORMVIEW_DEPOSITARYENGLISH')">
                <el-input :disabled="true" maxlength="20" style="width: 11rem" v-model="form.depositaryenglish"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.PFANS1032FORMVIEW_DEPOSITARYCHINESE')">
                <el-input :disabled="true" maxlength="20" style="width: 11rem" v-model="form.depositarychinese"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1032FORMVIEW_PRINCIPALPERSON')">
                <el-input :disabled="true" maxlength="20" style="width: 11rem" v-model="form.principalperson"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1032FORMVIEW_PRINCIPALPLACEENGLISH')">
                <el-input :disabled="true" maxlength="20" style="width: 11rem" v-model="form.principalplaceenglish"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.PFANS1032FORMVIEW_PRINCIPALPLACECHINESE')">
                <el-input :disabled="true" maxlength="20" style="width: 11rem" v-model="form.principalplacechinese"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1024FORMVIEW_PJNAMEJAPANESE')">
                <el-input :disabled="true" maxlength="20" style="width: 11rem" v-model="form.pjnamejapanese"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1024FORMVIEW_PJNAMECHINESE')">
                <el-input :disabled="true" maxlength="20" style="width: 11rem" v-model="form.pjnamechinese"></el-input>
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
              <el-form-item :label="$t('label.PFANS1032FORMVIEW_BUSINESSCODE')">
                <el-input :disabled="true" maxlength="20" style="width: 11rem" v-model="form.businesscode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.PFANS1032FORMVIEW_DELIVERYDATE')">
                <el-input :disabled="true" maxlength="20" style="width: 11rem" v-model="form.deliverydate"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1024FORMVIEW_CLAIMAMOUNT')">
                <el-input :disabled="true" maxlength="20" style="width: 11rem" v-model="form.claimamount"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1032FORMVIEW_DEPOSITARYPHONE')">
                <el-input :disabled="true" maxlength="20" style="width: 11rem" v-model="form.depositaryphone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.PFANS1032FORMVIEW_CLAIMNUMBER')">
                <el-input :disabled="true" maxlength="20" style="width: 11rem" v-model="form.claimnumber"></el-input>
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
              <el-form-item :label="$t('label.PFANS1032FORMVIEW_CURRENCYFORMAT')">
                <el-input :disabled="true" maxlength="20" style="width: 11rem" v-model="form.currencyformat"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
</template>

<script>
  import EasyNormalContainer from "@/components/EasyNormalContainer";
  import user from "../../../components/user.vue";
  import {Message} from 'element-ui'
  import {getUserInfo} from '@/utils/customize'

    export default {
        name: "PFANS1032FormView",
      components: {
        EasyNormalContainer, user,
      },
    data(){
          return{
            title: "title.PFANS1032VIEW",
            buttonList: [
              {
                key: "save",
                name: "button.save",
                disabled: false,
                icon: "el-icon-check"
              }
            ],
            form: {
              principalplaceenglish:'',
              principalplacechinese:'',
              pjnamejapanese:'',
              pjnamechinese:'',
              openingdate:'',
              enddate:'',
              businesscode:'',
              deliverydate:'',
              claimamount:'',
              depositaryphone:'',
              claimnumber:'',
              claimtype:'',
              currencyformat:'',
            },
            disable: false,
            rules: {
              user_name: [{
                required: true,
                validator: checkuser,
                trigger: 'change'
              }],
            },
            canStart: false
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





    }
</script>

<style scoped>

</style>
