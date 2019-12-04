<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :canStart="canStart" :title="title" @buttonClick="buttonClick"
                         @end="end" @start="start" @workflowState="workflowState" ref="container"
                         v-loading="loading">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="left" label-width="8rem" ref="refform"
                 style="padding: 2rem">
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.center')">
                <el-input :disabled="true" maxlength='36' style="width: 11rem" v-model="form.center_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')">
                <el-input :disabled="true" maxlength='36' style="width: 11rem" v-model="form.group_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')">
                <el-input :disabled="true" maxlength='36' style="width: 11rem" v-model="form.team_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.applicant')" prop="user_id">
                <user :disabled="!disabled" :error="error" :selectType="selectType" :userlist="userlist"
                      @getUserids="getUserids" style="width: 10.15rem"></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.application_date')" prop="application_date">
                <el-date-picker :disabled="!disabled" style="width: 11rem" type="date"
                                v-model="form.application_date"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2022VIEW_STAIR')" prop="firstclass">
                <dicselect
                  :code="code"
                  :data="form.firstclass"
                  :disabled="!disabled"
                  :multiple="multiple"
                  @change="getfirstclass"
                  style="width: 11rem">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2022VIEW_SECONDARY')" prop="twoclass">
                <dicselect
                  :code="code1"
                  :data="form.twoclass"
                  :disabled="!disable"
                  :multiple="multiple"
                  @change="gettwoclass"
                  style="width: 11rem">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2022VIEW_NOMINEES')" v-show="show1">
                <user :disabled="!disabled" :selectType="selectType" :userlist="userlist1" @getUserids="getUserids"
                      style="width: 9.2rem"></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2022VIEW_NOMINEERELATIONSHIP')" v-show="show1">
                <el-input :disabled="!disabled" maxlength='20' style="width: 11rem"
                          v-model="form.nomineerelationship"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2022VIEW_JOININGDAY')" prop="joiningday" v-show="show1">
                <el-date-picker :disabled="!disabled" style="width: 11rem" type="date"
                                v-model="form.joiningday"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2022VIEW_ENTERINGFORM')" v-show="show1">
                <dicselect
                  :code="code3"
                  :data="form.enteringform"
                  :disabled="!disabled"
                  :multiple="multiple"
                  @change="getenteringform"
                  style="width: 11rem">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2022VIEW_RECOMMENDATIONDAY')" prop="recommendationday"
                            v-show="show1">
                <el-date-picker :disabled="!disabled" style="width: 11rem" type="date"
                                v-model="form.recommendationday"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2022VIEW_REGINSTRATIONDAY')" prop="reginstrationday" v-show="show1">
                <el-date-picker :disabled="!disabled" style="width: 11rem" type="date"
                                v-model="form.reginstrationday"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2022VIEW_QUALIFICATION')" prop="qualifications" v-show="show">
                <div class="block">
                  <dicselect
                    :code="code2"
                    :data="form.qualifications"
                    :disabled="!disabled"
                    :multiple="multiple"
                    @change="getqualifications"
                    style="width: 11rem">
                  </dicselect>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2022VIEW_AMOUNT')">
                <el-input :disabled="true" maxlength="10" style="width: 11rem" v-model="form.amoutmoney"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2022VIEW_WEDDINGDAY')" prop="weddingday" v-show="show2">
                <el-date-picker :disabled="!disabled" style="width: 11rem" type="date"
                                v-model="form.weddingday"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2022VIEW_SPOUSENAME')" prop="spousename" v-show="show2">
                <el-input :disabled="!disabled" maxlength='20' style="width: 11rem"
                          v-model="form.spousename"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item :label="$t('label.remarks')" v-show="show3">
              <el-input :disabled="!disabled" style="width: 57rem" type="textarea" v-model="form.remarks"></el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.enclosure')">
                <el-upload
                  :action="upload"
                  :file-list="fileList"
                  :on-remove="fileRemove"
                  :on-preview="fileDownload"
                  :on-success="fileSuccess"
                  :on-error="fileError"
                  class="upload-demo"
                  drag
                  ref="upload">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">{{$t('label.enclosurecontent')}}<em>{{$t('normal.info_09')}}</em></div>
                </el-upload>
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
  import PFANS2022View from "../PFANS2022/PFANS2022View.vue";
  import dicselect from "../../../components/dicselect.vue";
  import {Message} from 'element-ui'
  import {downLoadUrl, getDictionaryInfo, getOrgInfoByUserId, uploadUrl} from '@/utils/customize';
  import moment from "moment";

  export default {
    name: 'PFANS2022FormView',
    components: {
      EasyNormalContainer,
      PFANS2022View,
      user,
      getOrgInfoByUserId,
      dicselect
    },
    data() {
      var checkuser = (rule, value, callback) => {
        if (!value || value === '' || value === "undefined") {
          this.error = this.$t('normal.error_09') + this.$t('label.applicant');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.applicant')));
        } else {
          this.error = "";
          return callback();
        }

      };
      return {
        loading: false,
        error: '',
        selectType: "Single",
        userlist: "",
        userlist1: "",
        title: "title.PFANS2022VIEW",
        editableTabsValue: '0',
        editableTabs: [],
        buttonList: [],
        tabIndex: 0,
        multiple: false,
        form: {
          casgiftapplyid: '',
          firstclass: '',
          twoclass: '',
          team_id: '',
          center_id: '',
          group_id: '',
          user_id: '',
          nomineerelationship: '',
          joiningday: moment(new Date()).format("YYYY-MM-DD"),
          enteringform: '',
          recommendationday: moment(new Date()).format("YYYY-MM-DD"),
          reginstrationday: moment(new Date()).format("YYYY-MM-DD"),
          qualifications: '',
          weddingday: moment(new Date()).format("YYYY-MM-DD"),
          spousename: '',
          application_date: moment(new Date()).format("YYYY-MM-DD"),
          amoutmoney: '',
          remarks: '',
          uploadfile: '',
          payment: '0',
        },
        code: 'PR024',
        code1: ' ',
        code2: 'PR026',
        code3: 'PR039',
        disable: false,
        disabled: true,
        menuList: [],
        rules: {
          user_id: [
            {
              required: true,
              validator: checkuser,
              trigger: 'change'
            },
          ],
          firstclass: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS2022VIEW_STAIR'),
              trigger: 'change'
            },
          ],
          twoclass: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS2022VIEW_SECONDARY'),
              trigger: 'change'
            },
          ],
          application_date: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.application_date'),
              trigger: 'change'
            },
          ],
          qualifications: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS2022VIEW_QUALIFICATION'),
              trigger: 'change'
            },
          ],
          weddingday: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS2022VIEW_WEDDINGDAY'),
              trigger: 'change'
            },
          ],
          spousename: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS2022VIEW_SPOUSENAME'),
              trigger: 'change'
            },
          ],
        },
        show: false,
        show1: false,
        show2: false,
        show3: false,
        canStart: false,
        twoclass: '',
        qualifications: '',
        fileList: [],
        upload: uploadUrl(),
      };
    },
    mounted() {
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS2022Store/getCasgiftApplyOne', {"casgiftapplyid": this.$route.params._id})
          .then(response => {
            this.form = response;
            this.getfirstclass(this.form.firstclass);
            this.userlist = this.form.user_id;

            if (this.form.firstclass === 'PR024002') {
              this.show = true;
            }
            if (this.form.firstclass === 'PR024004') {
              this.show2 = true;
            }
            if (this.form.firstclass === 'PR024003') {
              this.show1 = true;
            }
            if (this.form.firstclass === 'PR024001') {
              this.show3 = true;
            }
            if (this.form.firstclass === 'PR024002') {
              this.show3 = true;
            }
            if (this.form.firstclass === 'PR024004') {
              this.show3 = true;
            }
            if (this.form.firstclass === 'PR024005') {
              this.show3 = true;
            }
            if (this.form.firstclass === 'PR024006') {
              this.show3 = true;
            }
            if (this.form.firstclass === 'PR024007') {
              this.show3 = true;
            }
            if (this.form.status === '2' || !this.disabled) {
              this.disable = false;
            } else {
              this.disable = true;
            }
            if (this.form.status === '3' || this.disabled) {
              this.disable = true;
            }
            if (this.form.uploadfile != "") {
              let uploadfile = this.form.uploadfile.split(";");
              for (var i = 0; i < uploadfile.length; i++) {
                if (uploadfile[i].split(",")[0] != "") {
                  let o = {};
                  o.name = uploadfile[i].split(",")[0];
                  o.url = uploadfile[i].split(",")[1];
                  this.fileList.push(o)
                }
              }
            }
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
        this.form.user_id = val;
        let lst = getOrgInfoByUserId(val);
        this.form.center_id = lst.centerNmae;
        this.form.group_id = lst.groupNmae;
        this.form.team_id = lst.teamNmae;
        if (!this.form.user_id || this.form.user_id === '' || val === "undefined") {
          this.error = this.$t('normal.error_08') + this.$t('label.applicant');
        } else {
          this.error = "";
        }
      },
      getfirstclass(val) {
        this.form.firstclass = val;
        if (val === "PR024001") {
          this.code1 = 'PR025';
          this.gettwoclass("PR025001");
          this.disable = true;
          this.show = false;
          this.show1 = false;
          this.show2 = false;
          this.show3 = true;
          this.rules.qualifications[0].required = false;
          this.rules.weddingday[0].required = false;
          this.rules.spousename[0].required = false;
        } else if (val === "PR024002") {
          this.code1 = 'PR040';
          this.gettwoclass("PR040001");
          this.disable = true;
          this.show = true;
          this.show1 = false;
          this.show2 = false;
          this.show3 = true;
          this.rules.qualifications[0].required = true;
          this.rules.weddingday[0].required = false;
          this.rules.spousename[0].required = false;
        } else if (val === "PR024003") {
          this.code1 = 'PR034';
          this.gettwoclass("PR034001");
          this.disable = true;
          this.show = false;
          this.show1 = true;
          this.show2 = false;
          this.show3 = false;
          this.rules.qualifications[0].required = false;
          this.rules.weddingday[0].required = false;
          this.rules.spousename[0].required = false;
        } else if (val === "PR024004") {
          this.code1 = 'PR035';
          this.gettwoclass("PR035001");
          this.disable = true;
          this.show = false;
          this.show1 = false;
          this.show2 = true;
          this.show3 = true;
          this.rules.qualifications[0].required = false;
          this.rules.weddingday[0].required = true;
          this.rules.spousename[0].required = true;
        } else if (val === "PR024005") {
          this.code1 = 'PR036';
          this.gettwoclass("PR036001");
          this.disable = true;
          this.show = false;
          this.show1 = false;
          this.show2 = false;
          this.show3 = true;
          this.rules.qualifications[0].required = false;
          this.rules.weddingday[0].required = false;
          this.rules.spousename[0].required = false;
        } else if (val === "PR024006") {
          this.code1 = 'PR037';
          this.gettwoclass("PR037001");
          this.disable = true;
          this.show = false;
          this.show1 = false;
          this.show2 = false;
          this.show3 = true;
          this.rules.qualifications[0].required = false;
          this.rules.weddingday[0].required = false;
          this.rules.spousename[0].required = false;
        } else if (val === "PR024007") {
          this.code1 = 'PR038';
          this.gettwoclass("PR038001");
          this.disable = true;
          this.show = false;
          this.show1 = false;
          this.show2 = false;
          this.show3 = true;
          this.rules.qualifications[0].required = false;
          this.rules.weddingday[0].required = false;
          this.rules.spousename[0].required = false;
        }
      },
      gettwoclass(val) {
        this.form.twoclass = val;
        let dictionaryInfo = getDictionaryInfo(val);
        if (dictionaryInfo) {
          this.twoclass = dictionaryInfo.value2;
          this.form.amoutmoney = dictionaryInfo.value2;
        }
      },
      getenteringform(val) {
        this.form.enteringform = val;
      },
      getqualifications(val) {
        this.form.qualifications = val;
        let dictionaryInfo = getDictionaryInfo(val);
        if (dictionaryInfo) {
          this.qualifications = dictionaryInfo.value2;
        }
        if (this.qualifications > 0) {
          if ((parseInt(this.twoclass) - parseInt(this.qualifications)) > 0) {
            this.form.amoutmoney = (parseInt(this.twoclass) - parseInt(this.qualifications));
          } else {
            this.form.amoutmoney = 0;
          }
        }
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
      fileError(err, file, fileList){
        Message({
          message: this.$t("normal.error_04"),
          type: 'error',
          duration: 5 * 1000
        });
      },
      fileRemove(file, fileList){
        this.fileList = [];
        this.form.uploadfile = "";
        for (var item of fileList) {
          let o = {};
          o.name = item.name;
          o.url = item.url;
          this.fileList.push(o);
          this.form.uploadfile += item.name + "," + item.url + ";"
        }
      },
      fileDownload(file) {
        if (file.url) {
          var url = downLoadUrl(file.url);
          window.open(url);
        }

      },
      fileSuccess(response, file, fileList) {
        this.fileList = [];
        this.form.uploadfile = "";
        for (var item of fileList) {
          let o = {};
          o.name = item.name;
          if (!item.url) {
            o.url = item.response.info;
          } else {
            o.url = item.url;
          }
          this.fileList.push(o);
          this.form.uploadfile += o.name + "," + o.url + ";"
        }
      },
      buttonClick(val) {
        this.$refs["refform"].validate(valid => {
          if (valid) {
            if (this.$route.params._id) {
              this.form.casgiftapplyid = this.$route.params._id;
              this.form.application_date = moment(this.form.application_date).format('YYYY-MM-DD');
              this.loading = true;
              this.$store
                .dispatch('PFANS2022Store/updateCasgiftApply', this.form)
                .then(response => {
                  this.data = response;
                  this.loading = false;
                  if (val !== "update") {
                    Message({
                      message: this.$t("normal.success_02"),
                      type: 'success',
                      duration: 5 * 1000
                    });
                    if (this.$store.getters.historyUrl) {
                      this.$router.push(this.$store.getters.historyUrl);
                    }
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
              this.form.application_date = moment(this.form.application_date).format('YYYY-MM-DD');
              this.loading = true;
              this.$store
                .dispatch('PFANS2022Store/createCasgiftApply', this.form)
                .then(response => {
                  this.data = response;
                  this.loading = false;
                  Message({
                    message: this.$t("normal.success_01"),
                    type: 'success',
                    duration: 5 * 1000
                  });
                  if (this.$store.getters.historyUrl) {
                    this.$router.push(this.$store.getters.historyUrl);
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
            }
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
