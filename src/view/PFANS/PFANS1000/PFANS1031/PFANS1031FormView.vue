<template>
  <div style="min-height: 100%">`
    <EasyNormalContainer :buttonList="buttonList" :title="title" @buttonClick="buttonClick" ref="container"
                         v-loading="loading" :canStart="canStart">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="refform"
                 style="padding:2rem">
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
                           :disabled="disable"
                           :multiple="multiple"
                           style="width:20vw">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1031FORMVIEW_DEPOSITJAPANESE')">
                <el-input :disabled="disable" maxlength="20" style="width:20vw"
                          v-model="form.depositjapanese"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1032FORMVIEW_DEPOSITARYENGLISH')">
                <el-input :disabled="disable" maxlength="20" style="width:20vw"
                          v-model="form.depositenglish"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1031FORMVIEW_ENTRUSTMENT')">
                <el-input :disabled="disable" maxlength="20" style="width:20vw" v-model="form.entrustment"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1024VIEW_DEPLOYMENT')">
                <el-input :disabled="disable" maxlength="20" style="width:20vw" v-model="form.deployment"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1025VIEW_PJNAMEJAPANESE')">
                <el-input :disabled="disable" maxlength="20" style="width:20vw"
                          v-model="form.pjnamejapanese"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1025VIEW_PJNAMECHINESE')">
                <el-input :disabled="disable" maxlength="20" style="width:20vw" v-model="form.pjnamechinese"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1025VIEW_OPENINGDATE')">
                <el-date-picker
                  :disabled="disable"
                  style="width:20vw"
                  type="date"
                  v-model="form.openingdate">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1025VIEW_ENDDATE')">
                <el-date-picker
                  :disabled="disable"
                  style="width:20vw"
                  type="date"
                  v-model="form.enddate">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1032FORMVIEW_CLAIMNUMBER')">
                <el-input :disabled="disable" maxlength="20" style="width:20vw" v-model="form.claimnumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1032FORMVIEW_CLAIMTYPE')">
                <dicselect :code="code2"
                           :data="form.claimtype"
                           :disabled="disable"
                           :multiple="multiple"
                           style="width:20vw">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1024VIEW_DELIVERYFINSHDATE')">
                <el-date-picker
                  :disabled="disable"
                  style="width:20vw"
                  type="date"
                  v-model="form.deliveryfinshdate">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1024VIEW_DELIVERYDATE')">
                <el-date-picker
                  :disabled="disable"
                  style="width:20vw"
                  type="date"
                  v-model="form.deliverydate">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1024VIEW_COMPLETIONDATE')">
                <el-date-picker
                  :disabled="disable"
                  style="width:20vw"
                  type="date"
                  v-model="form.completiondate">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1025VIEW_CURRENCYFORMAT')">
                <dicselect :code="code3"
                           :data="form.currencyformat"
                           :disabled="disable"
                           :multiple="multiple"
                           style="width:20vw">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')">
                <el-input-number :disabled="disable" :precision="2" controls-position="right" v-model="form.claimamount"
                                 style="width:20vw">
                </el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1031FORMVIEW_TOTO')">
                <dicselect :code="code4"
                           :data="form.toto"
                           :disabled="disable"
                           :multiple="multiple"
                           style="width:20vw">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
                <el-form-item :label="$t('label.PFANS1024VIEW_LOADINGJUDGE')" prop="loadingjudge">
                  <user :disabled="disable" :selectType="selectType" :userlist="userlist"
                        style="width:20vw"></user>
                </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>
<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import PFANS1031View from '../PFANS1031/PFANS1031View.vue';
  import {Message} from 'element-ui';
  import user from '../../../components/user.vue';
  import {getUserInfo} from '@/utils/customize';
  import dicselect from '../../../components/dicselect.vue';

  export default {
    name: 'PFANS1031FormView',
    components: {
      EasyNormalContainer,
      PFANS1031View,
      dicselect,
      user,
    },
    data() {
      return {
        multiple: false,
        loading: false,
        selectType: 'Single',
        userlist: '',
        title: 'title.PFANS1031VIEW',
        buttonList: [
        ],
        form: {
          contractnumber:'',
          contracttype:'',
          depositjapanese:'',
          depositenglish:'',
          entrustment:'',
          deployment:'',
          pjnamejapanese:'',
          pjnamechinese:'',
          openingdate:'',
          enddate:'',
          claimnumber:'',
          claimtype:'',
          deliveryfinshdate:'',
          deliverydate:'',
          completiondate:'',
          currencyformat:'',
          claimamount:'',
          toto:'',
          loadingjudge:'',
          judgmentnumber:'',
          fulusi:'',
          takecharge:'',
          judgment:'',
          determination:'',
          conjapanese:'',
        },
        code1: 'HT008',
        code2: 'PJ081',
        code3: 'HT006',
        code4: 'HT012',
        code5: 'PJ082',
        disabled: true,
        rules: {},
        canStart: false,
      };
    },
    created() {
      this.disable = this.$route.params.disabled;
      if(!this.$route.params.disabled){
        this.buttonList=[
          {
            key: 'export1',
            name: 'button.exportNaPinShu_ShouTuo',
            disabled: false,
          }
        ];
        this.disable = true;
      }
    },
    mounted() {
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1031Store/one', {'napalm_id': this.$route.params._id})
          .then(response => {
            this.form = response;
            if (this.form.claimdatetime !== null && this.form.claimdatetime !== "") {
              this.form.openingdate = this.form.claimdatetime.slice(0, 10);
              this.form.enddate = this.form.claimdatetime.slice(this.form.claimdatetime.length - 10);
            }
            if (response.depositjapanese !== null && response.depositjapanese !== "") {
              let letUser = getUserInfo(response.depositjapanese);
              if (letUser != null) {
                response.depositjapanese = letUser.userinfo.customername;
              }
            }
            this.userlist = this.form.loadingjudge;
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
    methods: {
      buttonClick(val) {
        if(this.form.openingdate!=="" && this.form.enddate!==""){
          this.form.claimdatetime=moment(this.form.openingdate).format('YYYY-MM-DD')+" ~ "+moment(this.form.enddate).format('YYYY-MM-DD');
        }
        // this.$refs['refform'].validate(valid => {
        //   if (valid) {
        //     this.loading = true;
        //     if (this.$route.params._id) {
        //       this.form.napalm_id = this.$route.params._id;
        //       this.$store
        //         .dispatch('PFANS1031Store/update', this.form)
        //         .then(response => {
        //           this.data = response;
        //           this.loading = false;
        //           if (val !== 'update') {
        //             Message({
        //               message: this.$t('normal.success_02'),
        //               type: 'success',
        //               duration: 5 * 1000,
        //             });
        //             if (this.$store.getters.historyUrl) {
        //               this.$router.push(this.$store.getters.historyUrl);
        //             }
        //           }
        //         })
        //     }
        //   }
        // });
        if (val === 'export1') {
          let deposit = getUserInfo(this.form.depositjapanese);
          if (deposit) {
            this.form.depositjapanese= deposit.userinfo.customername;
          }
          let judge = getUserInfo(this.form.loadingjudge);
          if (judge) {
            this.form.loadingjudge= judge.userinfo.customername;
          }
          this.$store
            .dispatch('PFANS1031Store/downLoad', this.form)
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
      },
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
