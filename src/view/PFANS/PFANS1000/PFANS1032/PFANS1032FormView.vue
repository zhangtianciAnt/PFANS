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
              <el-form-item :label="$t('label.PFANS1032FORMVIEW_CONTRACTNUMBER')">
                <el-input :disabled="true" maxlength="20" style="width:20vw" v-model="form.contractnumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1024VIEW_CONTRACTTYPE')">
                <dicselect :code="code1"
                           :data="form.contracttype"
                           :disabled="true"
                           style="width:20vw">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1032FORMVIEW_DEPOSITARYENGLISH')">
                <el-input :disabled="true" maxlength="20" style="width:20vw" v-model="form.custoenglish"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1032FORMVIEW_DEPOSITARYCHINESE')">
                <el-input :disabled="true" maxlength="20" style="width:20vw" v-model="form.custochinese"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1032FORMVIEW_PRINCIPALPERSON')">
                <el-input :disabled="true" maxlength="20" style="width:20vw" v-model="form.responerglish"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1032FORMVIEW_PRINCIPALPLACEENGLISH')">
                <el-input :disabled="true" maxlength="20" style="width:20vw" v-model="form.placeenglish"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1032FORMVIEW_PRINCIPALPLACECHINESE')">
                <el-input :disabled="true" maxlength="20" style="width:20vw" v-model="form.placechinese"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1025VIEW_PJNAMEJAPANESE')">
                <el-input :disabled="true" maxlength="20" style="width:20vw" v-model="form.pjnamejapanese"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1025VIEW_PJNAMECHINESE')">
                <el-input :disabled="true" maxlength="20" style="width:20vw" v-model="form.pjnamechinese"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1025VIEW_OPENINGDATE')">
                <el-date-picker
                  :disabled="true"
                  style="width:20vw"
                  type="date"
                  v-model="form.openingdate">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1025VIEW_ENDDATE')">
                <el-date-picker
                  :disabled="true"
                  style="width:20vw"
                  type="date"
                  v-model="form.enddate">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1024VIEW_BUSINESSCODE')">
                <el-input :disabled="true" maxlength="20" style="width:20vw" v-model="form.businesscode"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1024VIEW_DELIVERYFINSHDATE')">
                <el-date-picker
                  :disabled="true"
                  style="width:20vw"
                  type="date"
                  v-model="form.deliveryfinshdate">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')">
                <el-input :disabled="true" maxlength="20" style="width:20vw" v-model="form.claimamount"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1032FORMVIEW_DEPOSITARYPHONE')">
                <el-input :disabled="true" maxlength="20" style="width:20vw" v-model="form.responphone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1032FORMVIEW_CLAIMNUMBER')">
                <el-input :disabled="true" maxlength="20" style="width:20vw" v-model="form.claimnumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1032FORMVIEW_CLAIMTYPE')">
                <el-input :disabled="true" maxlength="20" style="width:20vw" v-model="form.claimtype"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1025VIEW_CURRENCYFORMAT')">
                <dicselect :code="code2"
                           :data="form.currencyposition"
                           :disabled="true"
                           style="width:20vw">
                </dicselect>
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
  import {Message} from 'element-ui'
  import dicselect from '../../../components/dicselect';
  import {getDictionaryInfo} from '@/utils/customize'

  export default {
    name: "PFANS1032FormView",
    components: {
      EasyNormalContainer, dicselect,
    },
    data() {
      return {
        title: "title.PFANS1032VIEW",
        buttonList: [
          {
            key: 'export1',
            name: 'button.exportQingQiuShu_GuoNei',
            disabled: false,
          },
        ],
        loading: false,
        disabled: true,
        code1: 'HT008',
        code2: 'HT006',
        error: '',
        form: {
          contractnumber: '',
          contracttype: '',
          custoenglish: '',
          custochinese: '',
          responerglish: '',
          placeenglish: '',
          placechinese: '',
          pjnamejapanese: '',
          pjnamechinese: '',
          openingdate: '',
          enddate: '',
          businesscode: '',
          deliveryfinshdate: '',
          claimamount: '',
          responphone: '',
          claimnumber: '',
          claimtype: '',
          currencyposition: '',
          claimdatetime: [],
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
            this.form = response;
            if (response.claimdatetime !== null && response.claimdatetime !== "") {
              this.form.openingdate = this.form.claimdatetime.slice(0, 10);
              this.form.enddate = this.form.claimdatetime.slice(this.form.claimdatetime.length - 10);
            }
            this.loading = false;
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
            this.loading = false;
          })
      }
    },
    created() {
      if (!this.$route.params.disabled) {
        this.buttonList = [];
      }
      this.disable = this.$route.params.disabled;
    },
    methods: {
      buttonClick(val) {
        // this.$refs["reff"].validate(valid =>{
        //   if(valid){
        //     this.loading = true;
        //     if(this.$route.params._id){     //编辑
        //       this.$store
        //         .dispatch('PFANS1032Store/update',this.form)
        //         .then(response =>{
        //           this.data=response;
        //           this.loading=false;
        //           if( val !== "update"){
        //             Message({
        //               message: this.$t('normal.success_02'),
        //               type: 'success',
        //               duration: 5 * 1000,
        //             });
        //             if(this.$store.getters.historyUrl) {
        //               this.$router.push(this.$store.getters.historyUrl);
        //             }
        //           }
        //         })
        //         .catch(error => {
        //           Message({
        //             message: error,
        //             type: 'error',
        //             duration: 5 * 1000,
        //           });
        //           this.loading=false;
        //         })
        //     }
        //   }
        // })
        if (val === 'export1') {
          this.loading = true;
          this.$store
            .dispatch('PFANS1032Store/downLoad', this.form)
            .then(response => {
              this.loading = false;
            })
            .catch(error => {
              Message({
                message: error,
                type: 'error',
                duration: 5 * 1000,
              });
              this.loading = false;
            })
        }
      }
    }
  }
</script>

<style scoped>

</style>
