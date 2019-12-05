<template>
  <div style="min-height: 100%">
    <EasyNormalContainer ref="container" :title="title" @buttonClick="buttonClick" v-loading="loading" :buttonList="buttonList"
                         @workflowState="workflowState" :canStart="canStart" @start="start" @end="end">
      <div slot="customize">
        <el-form :model="form" label-width="8rem" label-position="left" style="padding: 2rem" :rules="rules"
                 ref="refform">
          <el-row>
            <el-col :span="8">
              <el-form-item  :label="$t('label.center')">
                <el-input v-model="form.center_id" :disabled="true" style="width: 11rem" maxlength='36'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')">
                <el-input v-model="form.group_id" :disabled="true" style="width: 11rem" maxlength='36'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')">
                <el-input v-model="form.team_id" :disabled="true" style="width: 11rem" maxlength='36'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :error="erroruser"  :label="$t('label.applicant')" prop="user_id">
                <user :disabled="!disabled" :error="erroruser" :selectType="selectType" :userlist="userlist"
                      @getUserids="getUserids" style="width: 10.15rem"></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.pfanstype')" prop="type">
                <el-input v-model="form.type" :disabled="!disabled" style="width: 11rem" maxlength='20'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.application_date')" prop="application" >
                <el-date-picker :disabled="!disabled" type="date" v-model="form.application" style="width: 11rem" ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.持出機器媒体')" prop="machinemedia">
                <dicselect
                  :code="code"
                  :data="form.machinemedia"
                  :multiple="multiple"
                  @change="getMachinemedia"
                  style="width: 11rem"
                  :disabled="!disabled">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.資産管理番号')" prop="management">
                <el-input v-model="form.management" :disabled="!disabled" style="width: 11rem" maxlength='20'></el-input>
              </el-form-item>
            </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item :label="$t('label.持出し適合シール')" prop="compatibleseal">
                  <el-radio-group v-model="radio" @change="getCompatibleseal">
                    <el-radio :label="1" :disabled="!disabled">{{$t('label.yes')}}</el-radio>
                    <el-radio :label="2" :disabled="!disabled">{{$t('label.no')}}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('label.持出日付')" prop="exportdate" >
                  <el-date-picker :disabled="!disabled" type="date" v-model="form.exportdate" style="width: 11rem" ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('label.返却予定日付')" prop="returndate" >
                  <el-date-picker :disabled="!disabled" type="date" v-model="form.returndate" style="width: 11rem" ></el-date-picker>
                </el-form-item>
              </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.持出場所')" prop="holdingplace">
                <el-input v-model="form.holdingplace" :disabled="!disabled" style="width: 11rem" maxlength='50'></el-input>
              </el-form-item>
            </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item :label="$t('label.持出理由')" prop="holdoutreason">
                  <el-input v-model="form.holdoutreason" type="textarea" :disabled="!disabled" style="width: 57.7rem"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                  <div class="sub_color_blue" >{{$t('label.格納データ内容')}}</div>
              </el-col>
            </el-row>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
  import EasyNormalContainer from "@/components/EasyNormalContainer";
  import dicselect from "../../../components/dicselect.vue";
  import user from "../../../components/user.vue";
  import { Message } from 'element-ui'
  import {getOrgInfoByUserId} from '@/utils/customize';
  import org from "../../../components/org";
  import moment from "moment";

  export default {
    name: 'PFANS1023FormView',
    components: {
        EasyNormalContainer,
        getOrgInfoByUserId,
        dicselect,
        user,
        org
    },
    data() {
      var checkuser = (rule, value, callback) => {
        if(!value || value === '' || value ==="undefined"){
          this.erroruser = this.$t('normal.error_09') + this.$t('label.applicant');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.applicant')));
        }else{
          this.erroruser = "";
          return callback();
        }

      };
      return {
          radio: 1,
          userlist: "",
          loading: false,
          erroruser: '',
          selectType: "Single",
          title: 'title.PFANS1023VIEW',
          buttonList: [],
          multiple: false,
        form: {
            center_id: '',
            group_id: '',
            team_id: '',
            user_id: '',
            type: '',
            machinemedia: '',
            management: '',
            application: moment(new Date()).format("YYYY-MM-DD"),
            exportdate: moment(new Date()).format("YYYY-MM-DD"),
            returndate: moment(new Date()).format("YYYY-MM-DD"),
            holdingplace: '',
            compatibleseal: '',
            holdoutreason: '',
            company: '',
            secret: '',
            information: '',
            intelligence: '',
            confidential: '',
        },
          code: 'PJ028',
          disabled: false,
          menuList: [],
        rules: {
          user_id: [
            {
              required: true,
              validator: checkuser,
              trigger: 'change'
            },
          ],
            machinemedia: [
                {
                    required: true,
                    message: this.$t('normal.error_08') + this.$t('label.PFASN1023FORMVIEW_MACHINEMEDIA'),
                    trigger: 'change'
                },
            ],
            management: [
                {
                    required: true,
                    message: this.$t('normal.error_08') + this.$t('label.PFASN1023FORMVIEW_MANAGEMENT'),
                    trigger: 'change'
                },
            ],
            compatibleseal: [
                {
                    required: true,
                    message: this.$t('normal.error_08') + this.$t('label.PFASN1023FORMVIEW_COMPATIBLESEAL'),
                    trigger: 'change'
                },
            ],
            application: [
                {
                    required: true,
                    message: this.$t('normal.error_09') + this.$t('label.application_date'),
                    trigger: 'change'
                },
            ],
            exportdate: [
                {
                    required: true,
                    message: this.$t('normal.error_08') + this.$t('label.PFASN1023FORMVIEW_EXPORTDATE'),
                    trigger: 'change'
                },
            ],
            returndate: [
                {
                    required: true,
                    message: this.$t('normal.error_08') + this.$t('label.PFASN1023FORMVIEW_RETURNDATE'),
                    trigger: 'change'
                },
            ],
            holdingplace: [
                {
                    required: true,
                    message: this.$t('normal.error_08') + this.$t('label.PFASN1023FORMVIEW_HOLDINGPLACE'),
                    trigger: 'change'
                },
            ],
            holdoutreason: [
                {
                    required: true,
                    message: this.$t('normal.error_08') + this.$t('label.PFASN1023FORMVIEW_HOLDOUTREASON'),
                    trigger: 'change'
                },
            ],
        },
          canStart:false,
      };
    },

    mounted() {
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1023Store/selectById', {"confidentialid": this.$route.params._id})
          .then(response => {
            this.form = response;
            this.userlist = this.form.user_id;
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
        if (this.userlist !== null && this.userlist !== '') {
        let lst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
        this.form.center_id = lst.centerNmae;
        this.form.group_id = lst.groupNmae;
        this.form.team_id = lst.teamNmae;
        this.form.user_id = this.$store.getters.userinfo.userid;
        }
        this.loading = false;
      }
    },
    created() {
      this.disabled = this.$route.params.disabled;
      if (this.disabled) {
        this.buttonList = [
          {
            key: "save",
            name: "button.save",
            disabled: false,
            icon: "el-icon-check"
          }
        ];
      }
    },
    methods: {
      getUserids(val) {
        this.userlist = val;
        this.form.user_id = val;
        let lst = getOrgInfoByUserId(val);
        this.form.center_id = lst.centerNmae;
        this.form.group_id = lst.groupNmae;
        this.form.team_id = lst.teamNmae;
        if (!this.form.user_id || this.form.user_id === '' || val === "undefined") {
          this.erroruser = this.$t('normal.error_09') + this.$t('label.applicant');
        } else {
          this.erroruser = "";
        }
      },
        getMachinemedia(val) {
            this.form.machinemedia = val;
      },
        getCompatibleseal(val){
            this.form.compatibleseal = val;
        },
        getFabuilding(val) {
            this.form.fabuilding = val;
      },
        getSubtype(val) {
            this.form.subtype = val;
        },
        getFbbuilding(val) {
            this.form.fbbuilding = val;
        },
      workflowState(val) {
        if (val.state === '1') {
          this.form.status = '3';
        } else if (val.state === '2') {
          this.form.status = '4';
        }
        this.buttonClick("update");
      },
      start() {
        this.form.status = '2';
        this.buttonClick("update");
      },
      end() {
        this.form.status = '0';
        this.buttonClick("update");
      },
      buttonClick(val) {
          this.$refs["refform"].validate(valid => {
            if (valid) {
              this.loading = true;
              this.form.application = moment(this.form.application).format('YYYY-MM-DD');
              if (this.$route.params._id) {
                this.form.confidentialid = this.$route.params._id;
                this.$store
                  .dispatch('PFANS1023Store/updateConfidential', this.baseInfo)
                  .then(response => {
                    this.data = response;
                    this.loading = false;
                      if(val !== "update") {
                          Message({
                              message: this.$t("normal.success_02"),
                              type: 'success',
                              duration: 5 * 1000
                          });
                      }
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
                this.$store
                  .dispatch('PFANS1023Store/createConfidential', this.baseInfo)
                  .then(response => {
                    this.data = response;
                    this.loading = false;
                    Message({
                      message: this.$t("normal.success_01"),
                      type: 'success',
                      duration: 5 * 1000
                    });
                  })
                  .catch(error => {
                    Message({
                      message: error,
                      type: 'error',
                      duration: 5 * 1000
                    });
                    this.loading = false;
                  })
              }
            }
          });
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
