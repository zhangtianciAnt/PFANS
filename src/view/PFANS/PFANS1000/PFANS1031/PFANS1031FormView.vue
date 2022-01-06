<template>
  <div style="min-height: 100%">
    <EasyNormalContainer ref="container" v-loading="loading" :buttonList="buttonList" :canStart="canStart"
                         :title="title" @buttonClick="buttonClick">
      <div slot="customize">
        <el-form ref="refform" :model="form" :rules="rules" label-position="top" label-width="8vw"
                 style="padding:2rem">
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1032FORMVIEW_CONTRACTNUMBER')">
                <el-input v-model="form.contractnumber" :disabled="true" maxlength="20" style="width:20vw"></el-input>
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
                <el-input v-model="form.depositjapanese" :disabled="disable" maxlength="20"
                          style="width:20vw"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1032FORMVIEW_DEPOSITARYENGLISH')">
                <el-input v-model="form.depositenglish" :disabled="disable" maxlength="20"
                          style="width:20vw"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1031FORMVIEW_ENTRUSTMENT')">
                <el-input v-model="form.entrustment" :disabled="disable" maxlength="20" style="width:20vw"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1024VIEW_DEPLOYMENT')">
                <el-input v-model="form.deployment" :disabled="disable" maxlength="20" style="width:20vw"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1025VIEW_PJNAMEJAPANESE')">
                <el-input v-model="form.pjnamejapanese" :disabled="disable" maxlength="20"
                          style="width:20vw"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1025VIEW_PJNAMECHINESE')">
                <el-input v-model="form.pjnamechinese" :disabled="disable" maxlength="20" style="width:20vw"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1025VIEW_OPENINGDATE')">
                <el-date-picker
                  v-model="form.openingdate"
                  :disabled="disable"
                  style="width:20vw"
                  type="date">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1025VIEW_ENDDATE')">
                <el-date-picker
                  v-model="form.enddate"
                  :disabled="disable"
                  style="width:20vw"
                  type="date">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1032FORMVIEW_CLAIMNUMBER')">
                <el-input v-model="form.claimnumber" :disabled="disable" maxlength="20" style="width:20vw"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1032FORMVIEW_CLAIMTYPE')">
                <!--                <dicselect :code="code2"-->
                <!--                           :data="form.claimtype"-->
                <!--                           :disabled="disable"-->
                <!--                           :multiple="multiple"-->
                <!--                           style="width:20vw">-->
                <!--                </dicselect>-->
                <el-input v-model="form.claimtype" :disabled="disable" maxlength="20" style="width:20vw"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1024VIEW_DELIVERYFINSHDATE')">
                <el-date-picker
                  v-model="form.deliveryfinshdate"
                  :disabled="disable"
                  style="width:20vw"
                  type="date">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1024VIEW_DELIVERYDATE')">
                <el-date-picker
                  v-model="form.deliverydate"
                  :disabled="disable"
                  style="width:20vw"
                  type="date">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1024VIEW_COMPLETIONDATE')">
                <el-date-picker
                  v-model="form.completiondate"
                  :disabled="disable"
                  style="width:20vw"
                  type="date">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1025VIEW_CURRENCYFORMAT')">
                <!--                      add-ws-12/10-汇率字典-->
                <!--                <dicselect :code="code3"-->
                <!--                           :data="form.currencyformat"-->
                <!--                           :disabled="disable"-->
                <!--                           :multiple="multiple"-->
                <!--                           style="width:20vw">-->
                <!--                </dicselect>-->
                <monthlyrate :data="form.currencyformat"
                             :disabled="disable"
                             :month="month3"
                             :multiple="multiple"
                             style="width:20vw">
                </monthlyrate>
                <!--                      add-ws-12/10-汇率字典-->
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')">
                <el-input-number v-model="form.claimamount" :disabled="disable" :precision="2" controls-position="right"
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
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1024VIEW_CLAIMDATE')">
                <el-date-picker
                  v-model="form.claimdate"
                  :disabled="disable"
                  style="width:20vw"
                  type="date">
                </el-date-picker>
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
import {getOrgInfoByUserId, getUserInfo} from '@/utils/customize';
import dicselect from '../../../components/dicselect.vue';
import moment from 'moment';
import monthlyrate from '../../../components/monthlyrate';

export default {
  name: 'PFANS1031FormView',
  components: {
    monthlyrate,
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
      buttonList: [],
      form: {
        contractnumber: '',
        contracttype: '',
        depositjapanese: '',
        depositenglish: '',
        entrustment: '',
        deployment: '',
        pjnamejapanese: '',
        pjnamechinese: '',
        openingdate: '',
        enddate: '',
        claimnumber: '',
        claimtype: '',
        deliveryfinshdate: '',
        deliverydate: '',
        completiondate: '',
        currencyformat: '',
        claimamount: '',
        toto: '',
        loadingjudge: '',
        judgmentnumber: '',
        fulusi: '',
        takecharge: '',
        judgment: '',
        determination: '',
        conjapanese: '',
        claimdate: '',
      },
      code1: 'HT008',
      code2: 'PJ081',
      //add-ws-12/10-汇率字典
      // code3: 'PG019',
      month3: moment(new Date()).format('YYYY-MM'),
      //add-ws-12/10-汇率字典
      code4: 'HT012',
      code5: 'PJ082',
      disabled: true,
      rules: {},
      canStart: false,
    };
  },
  created() {
    this.disable = this.$route.params.disabled;
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
      this.disable = true;
    }
  },
  mounted() {
    if (this.$route.params._id) {
      this.loading = true;
      this.$store
        .dispatch('PFANS1031Store/one', {'napalm_id': this.$route.params._id})
        .then(response => {
          if (response !== undefined) {
            this.form = response;
            this.userlist = this.form.loadingjudge;
            if (this.form.claimdatetime !== '' && this.form.claimdatetime !== null && this.form.claimdatetime !== undefined) {
              this.form.openingdate = this.form.claimdatetime.slice(0, 10);
              this.form.enddate = this.form.claimdatetime.slice(this.form.claimdatetime.length - 10);
            }
            if (this.form.claimtype !== null && this.form.claimtype !== '') {
              // let checkclaimtype = getDictionaryInfo(this.form.claimtype);
              // if (checkclaimtype != null || checkclaimtype != '') {
              //     this.form.claimtype = checkclaimtype.value1;
              // }
              this.form.claimtype = this.$t('label.PFANS1026FORMVIEW_HE') + this.form.claimtype + this.$t('label.PFANS1026FORMVIEW_HUI');
            }

            if (response.depositjapanese !== null && response.depositjapanese !== '') {
              let letUser = getUserInfo(response.depositjapanese);
              if (letUser != null) {
                response.depositjapanese = letUser.userinfo.customername;
              }
            }
            this.userlist = this.form.loadingjudge;
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
        });
    }
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
        name: 'PFANS1031View',
      });
    },
    //add-ws-6/22-禅道152任务
    buttonClick(val) {
      if (this.form.openingdate !== '' && this.form.enddate !== '') {
        this.form.claimdatetime = moment(this.form.openingdate).format('YYYY-MM-DD') + ' ~ ' + moment(this.form.enddate).format('YYYY-MM-DD');
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
        let deposit = getUserInfo(this.form.depositjapanese);
        if (deposit) {
          this.form.depositjapanese = deposit.userinfo.customername;
        }
        let judge = getUserInfo(this.form.loadingjudge);
        if (judge) {
          this.form.loadingjudge = judge.userinfo.customername;
        }
        this.$store
          .dispatch('PFANS1031Store/downLoad', this.form)
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
          });
      } else if (val === 'submyin') {
        //add_fjl_添加合同回款相关  start
        if (moment(this.form.deliverydate).format('YYYY-MM') !== new moment().format('YYYY-MM')) {
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
        let bookid = '';
        if (this.$route.params._id) {
          bookid = '5,' + this.$route.params._id;
        }
        let crePe = {};
        let centerid = '';
        let groupid = '';
        let teamid = '';
        let userid = '';
        let filetype = 'PC002005';//纳品书
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
        crePe.application_date = moment(new Date()).format('YYYY-MM-DD');
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

<style lang="scss" rel="stylesheet/scss">

</style>
