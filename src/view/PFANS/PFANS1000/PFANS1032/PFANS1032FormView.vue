<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList"
                         :title="title"
                         @buttonClick="buttonClick"
                         ref="container"
                         v-loading="loading">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="reff" style="padding: 3vw">
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
              <el-form-item :label="$t('label.PFANS1024VIEW_CLAIMDATE')">
                <el-date-picker
                  :disabled="true"
                  style="width:20vw"
                  type="date"
                  v-model="form.claimdate">
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
              <el-form-item :label="$t('label.PFANS1025VIEW_CURRENCYFORMAT')">
                <!--                      add-ws-12/10-汇率字典-->
<!--                <dicselect :code="code2"-->
<!--                           :data="form.currencyposition"-->
<!--                           :disabled="true"-->
<!--                           style="width:20vw">-->
<!--                </dicselect>-->
                <monthlyrate :month="month2"
                             :data="form.currencyposition"
                             :disabled="true"
                             style="width:20vw">
                </monthlyrate>
                <!--                      add-ws-12/10-汇率字典-->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1024VIEW_REMARKS')">
                <el-input :disabled="true" :rows="3" style="width:71vw" type="textarea"
                          v-model="form.remarks"></el-input>
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
    import moment from "moment";
  import dicselect from '../../../components/dicselect';
    import {getOrgInfoByUserId} from '@/utils/customize';
    import monthlyrate from '../../../components/monthlyrate';
  export default {
      name: "PFANS1032FormView",
    components: {
      EasyNormalContainer, dicselect,monthlyrate
    },
    data() {
      return {
          title: "title.PFANS1032VIEW",
        buttonList: [],
        loading: false,
        disabled: true,
        code1: 'HT008',
        //add-ws-12/10-汇率字典
        // code2: 'PG019',
        month2: moment(new Date()).format('YYYY-MM'),
        //add-ws-12/10-汇率字典
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
            claimdate: '',
          claimamount: '',
          responphone: '',
          claimnumber: '',
          claimtype: '',
          currencyposition: '',
          // claimdatetime: [],
          remarks: '',
        },
        rules: {},
      };
    },
    mounted() {
      if (this.$route.params._id) {
          this.loading = true;
        this.$store
          .dispatch('PFANS1032Store/one', {'petition_id': this.$route.params._id})
          .then(response => {
              if (response !== undefined) {
                  this.form = response;
                  if (this.form.claimdatetime !== null && this.form.claimdatetime !== '') {
                      this.form.openingdate = this.form.claimdatetime.slice(0, 10);
                      this.form.enddate = this.form.claimdatetime.slice(this.form.claimdatetime.length - 10);
                  }
              }
            this.loading = false;
          })
          .catch(error => {
            this.$message.error({
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
        this.buttonList = [
          {
            key: 'export1',
            name: 'button.generate',
            disabled: false,
          },
            // {
            //     key: 'submyin',
            //     name: 'button.submyin',
            //     disabled: false,
            // },
        ];
        this.disabled = true;
      }
      this.disable = this.$route.params.disabled;
    },
    methods: {
      //add-ws-6/22-禅道152任务
      checkparamsTitle() {
        let id = this.$route.params._checkid;
        let disable = this.$route.params._checkdisable;
        this.$router.push({
          name: 'PFANS1026FormView',
          params: {
            _id: id,
            disabled: disable,
          },
        });
      },

      paramsTitle() {
        this.$router.push({
          name: 'PFANS1032View',
        });
      },
      //add-ws-6/22-禅道152任务
      buttonClick(val) {
        if (this.form.openingdate !== '' && this.form.enddate !== '') {
          this.form.claimdatetime = moment(this.form.openingdate).format('YYYY-MM-DD') + ' ~ ' + moment(this.form.enddate).format('YYYY-MM-DD');
        }
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
        //           this.$message.error({
        //             message: error,
        //             type: 'error',
        //             duration: 5 * 1000,
        //           });
        //           this.loading=false;
        //         })
        //     }
        //   }
        // })
        //add-ws-6/22-禅道152任务
        if (val === 'back') {
          if (this.$route.params._check != null && this.$route.params._check != '' && this.$route.params._check != undefined) {
            if (this.$route.params._check) {
              this.checkparamsTitle();
            }
          } else {
            this.paramsTitle();
          }
          //add-ws-6/22-禅道152任务
        } else if (val === 'export1') {
          this.loading = true;
          this.$store
            .dispatch('PFANS1032Store/downLoad', this.form)
            .then(response => {
              this.loading = false;
            })
            .catch(error => {
              this.$message.error({
                message: error,
                type: 'error',
                duration: 5 * 1000,
              });
              this.loading = false;
            })
        } else if (val === 'submyin') {
            //add_fjl_添加合同回款相关  start
            if (moment(this.form.claimdate).format("YYYY-MM") !== new moment().format("YYYY-MM")) {
                Message({
                    message: this.$t('label.PFANS1032FORMVIEW_ERRORDATE'),
                    type: 'error',
                    duration: 5 * 1000,
                });
                return;
            }
            if (this.form.sealstatus !== null && this.form.sealstatus !== '') {
                Message({
                    message: this.$t('label.PFANS1032FORMVIEW_ERRORDIFF'),
                    type: 'error',
                    duration: 5 * 1000,
                });
                return;
            }
            let bookid = "";
            if (this.$route.params._id) {
                bookid = '6,' + this.$route.params._id;
            }
            let crePe = {};
            let centerid = "";
            let groupid = "";
            let teamid = "";
            let userid = "";
            let filetype = 'PC002004';//请求书
            if (this.$store.getters.userinfo.userid !== null && this.$store.getters.userinfo.userid !== '') {
                let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
                if (rst) {
                    centerid = rst.centerId;
                    groupid = rst.groupId;
                    teamid = rst.teamId;
                }
                userid = this.$store.getters.userinfo.userid;
            }
            crePe.userid = userid;
            crePe.centerid = centerid;
            crePe.groupid = groupid;
            crePe.teamid = teamid;
            crePe.filetype = filetype;
            crePe.bookid = bookid;
            crePe.application_date = moment(new Date()).format("YYYY-MM-DD");
            this.loading = true;
            this.$store
                .dispatch('PFANS4001Store/createbook', crePe)
                .then(response => {
                    let peid = response.sealid;
                    this.$store.commit('global/SET_OPERATEID', peid);
                    this.$router.push({
                        name: 'PFANS4001FormView',
                        params: {
                            _id: peid,
                            disabled: true,
                            // petdata: this.selectedlist,
                        },
                    });
                    this.loading = false;
                })
                .catch(error => {
                    this.$message.error({
                        message: error,
                        type: 'error',
                        duration: 5 * 1000,
                    });
                    this.loading = false;
                });
            //add_fjl_添加合同回款相关  end
        }
      },
    },
  };
</script>

<style scoped>

</style>
