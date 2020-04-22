<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :canStart="canStart" :title="title" :workflowCode="workcode"
                         @buttonClick="buttonClick" @disabled="setdisabled"
                         @end="end" @start="start" @workflowState="workflowState" ref="container"
                         v-loading="loading">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="refform"
                 style="padding: 3vw">
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.center')">
                <el-input :disabled="true" style="width:20vw" v-model="centerid"></el-input>
                <el-input :disabled="true" maxlength='36' v-model="form.center_id" v-show='false'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')">
                <el-input :disabled="true" style="width:20vw" v-model="groupid"></el-input>
                <el-input :disabled="true" maxlength='36' v-model="form.group_id" v-show='false'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')" prop="team_id">
                <el-input :disabled="true" style="width:20vw" v-model="teamid"></el-input>
                <el-input :disabled="true" maxlength='36' v-model="form.team_id" v-show='false'></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.applicant')" prop="user_id">
                <user :disabled="true" :error="error" :selectType="selectType" :userlist="userlist"
                      @getUserids="getUserids" style="width: 20vw"></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1012VIEW_TELEPHONE')" prop="investigator">
                <el-input :disabled="!disabled" maxlength='20' style="width:20vw"
                          v-model="form.investigator"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004VIEW_SCHEDULEDDATE')" prop="scheduleddate">
                <el-date-picker :disabled="!disabled" style="width:20vw" type="date"
                                v-model="form.scheduleddate"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="16">
              <el-form-item :label="$t('label.PFANS1004VIEW_FILENAME')" prop="filename">
                <el-input :disabled="!disabled" :rows="1" maxlength='50' style="width:72vw" type="textarea"
                          v-model="form.filename"></el-input>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004VIEW_CAREERPLAN')" prop="careerplan">
                <span style="margin-right: 1rem ">{{$t('label.PFANS1004VIEW_OUTER')}}</span>
                <el-switch
                  :disabled="!disabled"
                  @change="radiochange"
                  active-value="1"
                  inactive-value="0"
                  v-model="form.careerplan">
                </el-switch>
                <span style="margin-left: 1rem ">{{$t('label.PFANS1004VIEW_INSIDE')}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004VIEW_BUSINESSPLANTYPE')" prop="businessplantype" v-show="show">
                <dicselect
                  :code="code"
                  :data="form.businessplantype"
                  :disabled="!disabled"
                  :multiple="multiple"
                  @change="getBusinessplantype"
                  style="width:20vw">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004VIEW_CLASSIFICATIONTYPE')" prop="classificationtype"
                            v-show="show1">
                <dicselect
                  :code="code1"
                  :data="form.classificationtype"
                  :disabled="!disabled"
                  :multiple="multiple"
                  @change="getClassificationtype"
                  style="width:20vw">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004VIEW_BUSINESSPLANBALANCE')" prop="businessplanbalance"
                            v-show="show">
                <el-input-number :disabled="!disabled" :max="1000000000000" :min="0"
                                 :precision="2" @change="moneyDiff" controls-position="right" style="width:20vw"
                                 v-model="form.businessplanbalance"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004VIEW_AMOUNTTOBEGIVEN')" prop="amounttobegiven">
                <el-input-number :disabled="!disabled" :max="1000000000" :min="0"
                                 :precision="2" @change="moneyDiff" controls-position="right" style="width:20vw"
                                 v-model="form.amounttobegiven"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004FORMVIEW_DECISIVE')" prop="decisive">
                <dicselect
                  :code="code4"
                  :data="form.decisive"
                  :disabled="!disabled"
                  :multiple="multiple"
                  @change="getDecisive"
                  style="width:20vw">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004FORMVIEW_PERIOD')" prop="period" v-show="show6">
                <el-input :disabled="true" style="width:20vw" v-model="form.period"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.startdate')" prop="startdate" v-show="show5">
                <el-date-picker :disabled="!disabled" style="width:20vw" type="date"
                                v-model="form.startdate"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.enddate')" prop="enddate" v-show="show5">
                <el-date-picker :disabled="!disabled" style="width:20vw" type="date"
                                v-model="form.enddate"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('label.PFANS1004VIEW_GIST')" prop="gist">
                <!--<tinymce :height="300" :readonly="readonly" id="mytinymce" v-model="form.gist" style="width: 72vw"></tinymce>-->
                <quill-editor :options="editorOption" ref="myQuillEditor" style="height: 300px;width: 72vw" v-model="form.gist">
                </quill-editor>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="padding-top: 100px">
            <el-col :span="24">
              <el-form-item :label="$t('label.PFANS1004VIEW_PURCHASSUPPORT')" prop="purchassupport">
                <el-input :disabled="!disabled" :rows="1" style="width:72vw" type="textarea"
                          v-model="form.purchassupport"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.numbers')" prop="numbers">
                <el-input-number :disabled="!disabled" :max="1000000000" :min="0"
                                 :precision="2" @change="changeTotal" controls-position="right" style="width:20vw"
                                 v-model="form.numbers"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004VIEW_UNITPRICE')" prop="unitprice">
                <el-input-number :disabled="!disabled" :max="1000000000" :min="0"
                                 :precision="2" @change="changeTotal" controls-position="right" style="width:20vw"
                                 v-model="form.unitprice"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004VIEW_AMOUNT')" prop="money">
                <el-input-number :controls="false" :disabled="true" :max="1000000000" :min="0" :precision="2"
                                 style="width:20vw" v-model="form.money"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1012FORMVIEW_BUDGET')" label-width="7rem" prop="thisproject">
                <!--                <el-input v-model="form.thisproject" :disabled="true" style="width: 20vw;" maxlength='20'></el-input>-->
                <el-select :disabled="!disabled" :placeholder="$t('normal.error_09')" clearable style="width: 20vw"
                           v-model="form.thisproject">
                  <el-option
                    :key="item.value"
                    :label="item.lable"
                    :value="item.value"
                    @change="changeBut"
                    v-for="item in options">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004VIEW_SETTINGPLACE')" label-width="6rem">
                <dicselect
                  :code="code5"
                  :data="form.settingplace"
                  :disabled="!disabled"
                  :multiple="multiple"
                  @change="getSettingplace"
                  style="width:20vw">
                </dicselect>
                <!--                <el-input v-model="form.settingplace" :disabled="!disabled" style="width: 20vw;" maxlength='20'></el-input>-->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004VIEW_ADDBOOK')">
                <dicselect
                  :code="code2"
                  :data="form.addbook"
                  :disabled="!disabled"
                  :multiple="multiple"
                  @change="getAddbook"
                  style="width:20vw">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004VIEW_SALEQUOTATION')" prop="salequotation">
                <dicselect
                  :code="code3"
                  :data="form.salequotation"
                  :disabled="!disabled"
                  :multiple="multiple"
                  @change="getSalequotation"
                  style="width:20vw">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('label.PFANS1004VIEW_REASONSFORQUOTATION')" label-width="6rem" v-show="show2">
                <el-input :disabled="!disabled" style="width: 70vw;" type="textarea"
                          v-model="form.reasonsforquotation"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.enclosure')" v-show="show3">
                <el-upload
                  :action="upload"
                  :file-list="fileList"
                  :on-error="fileError"
                  :on-preview="fileDownload"
                  :on-remove="fileRemove"
                  :on-success="fileSuccess"
                  class="upload-demo"
                  drag
                  ref="upload"
                  v-model="form.uploadfile">
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
  import dicselect from "../../../components/dicselect.vue";
  import user from "../../../components/user.vue";
  import {Message} from 'element-ui'
  import {
    downLoadUrl,
    getDictionaryInfo,
    getOrgInfo,
    getOrgInfoByUserId,
    getUserInfo,
    uploadUrl
  } from '@/utils/customize';
  import moment from "moment";
  import {quillEditor} from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

  export default {
    name: 'PFANS1004FormView',
    components: {
      EasyNormalContainer,
      getOrgInfoByUserId,
      dicselect,
      user,
      quillEditor
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
      var validateStartdate = (rule, value, callback) => {
        if (this.form.startdate !== null && this.form.startdate !== '') {
          if (moment(value).format('YYYY-MM-DD') > moment(this.form.enddate).format('YYYY-MM-DD')) {
            callback(new Error(this.$t('label.startdate') + this.$t('normal.error_checkTime2') + this.$t('label.enddate')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var validateEnddate = (rule, value, callback) => {
        if (this.form.enddate !== null && this.form.enddate !== '') {
          if (moment(value).format('YYYY-MM-DD') < moment(this.form.startdate).format('YYYY-MM-DD')) {
            callback(new Error(this.$t('label.enddate') + this.$t('normal.error_checkTime1') + this.$t('label.startdate')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };

      var CheckGiven = (rule, value, callback) => {
        if (this.form.careerplan === 0) {
          if (Number(this.form.amounttobegiven) > Number(this.form.businessplanbalance)) {
            callback(new Error(this.$t('label.PFANS1004VIEW_AMOUNTTOBEGIVEN') + this.$t('normal.error_checkTime2') + this.$t('label.PFANS1004VIEW_BUSINESSPLANBALANCE')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      return {
        editorOption: {},
        options: [],
        workcode: '',
        centerid: '',
        groupid: '',
        teamid: '',
        userlist: "",
        loading: false,
        error: '',
        selectType: "Single",
        title: 'title.PFANS1004VIEW',
        buttonList: [],
        multiple: false,
        form: {
          center_id: '',
          group_id: '',
          team_id: '',
          user_id: '',
          investigator: '',
          filename: '',
          scheduleddate: moment(new Date()).format("YYYY-MM-DD"),
          careerplan: true,
          businessplantype: '',
          classificationtype: '',
          businessplanbalance: 0,
          gist: '',
          purchassupport: '',
          numbers: '',
          unitprice: '',
          money: '',
          decisive: '',
          period: '',
          startdate: '',
          enddate: '',
          amounttobegiven: '',
          thisproject: '',
          settingplace: '',
          addbook: '',
          salequotation: '',
          reasonsforquotation: '',
          equipment: '',
          uploadfile: '',
          number: '',
        },
        code: 'PR002',
        code1: 'PR003',
        code2: 'PJ010',
        code3: 'PJ013',
        code4: 'PJ011',
        code5: 'PJ030',
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
          scheduleddate: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS1004VIEW_SCHEDULEDDATE'),
              trigger: 'change'
            },
          ],
          filename: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1004VIEW_FILENAME'),
              trigger: 'change'
            },
          ],
          amounttobegiven: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1004VIEW_AMOUNTTOBEGIVEN'),
            },
            {validator: CheckGiven, trigger: 'change'}
          ],
          gist: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1004VIEW_GIST'),
              trigger: 'change'
            },
          ],
          purchassupport: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1004VIEW_PURCHASSUPPORT'),
              trigger: 'change'
            },
          ],
          numbers: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.numbers'),
              trigger: 'change'
            },
          ],
          unitprice: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1004VIEW_UNITPRICE'),
              trigger: 'change'
            },
          ],
          money: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1004VIEW_AMOUNT'),
              trigger: 'change'
            },
          ],
          businessplantype: [
            {
              required: false,
              message: this.$t('normal.error_09') + this.$t('label.PFANS1004VIEW_BUSINESSPLANTYPE'),
              trigger: 'change'
            },
          ],
          classificationtype: [
            {
              required: false,
              message: this.$t('normal.error_09') + this.$t('label.PFANS1004VIEW_CLASSIFICATIONTYPE'),
              trigger: 'change'
            },
          ],
          businessplanbalance: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1004VIEW_BUSINESSPLANBALANCE'),
              trigger: 'change'
            },
          ],
          salequotation: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS1004VIEW_SALEQUOTATION'),
              trigger: 'change'
            },
          ],
          decisive: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS1004FORMVIEW_DECISIVE'),
              trigger: 'change'
            },
          ],
          period: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1004FORMVIEW_PERIOD'),
              trigger: 'change'
            },
          ],
          startdate: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.startdate'),
              trigger: 'change'
            }, {validator: validateStartdate, trigger: 'change'}
          ],
          enddate: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.enddate'),
              trigger: 'change'
            }, {validator: validateEnddate, trigger: 'change'}
          ],
        },
        show: true,
        show1: '',
        show2: false,
        show3: false,
        show4: false,
        show5: false,
        show6: true,
        canStart: false,
        fileList: [],
        upload: uploadUrl(),
      };
    },

    mounted() {
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1004Store/getJudgementOne', {"judgementid": this.$route.params._id})
          .then(response => {
            if (response) {
              this.form = response.judgement;
              if (response.judgement.businessplanbalance > 20000) {
                this.workcode = 'W0063'
              } else {
                this.workcode = 'W0011'
              }
              let rst = getOrgInfoByUserId(response.judgement.user_id);
              if (rst) {
                this.centerid = rst.centerNmae;
                this.groupid = rst.groupNmae;
                this.teamid = rst.teamNmae;
                // this.form.thisproject = rst.personalcode;
              }
              this.userlist = this.form.user_id;
                this.getBudt(this.userlist);
              this.getDecisive(this.form.decisive);
              this.getBusinessplantype(this.form.businessplantype);
              if (this.form.careerplan === '1') {
                this.show = true;
                this.rules.businessplantype[0].required = true;
                this.rules.businessplanbalance[0].required = true;
              } else {
                this.show = false;
                this.show1 = false;
                this.rules.businessplantype[0].required = false;
                this.rules.businessplanbalance[0].required = false;
                this.rules.classificationtype[0].required = false;
              }
              if (this.form.businessplantype === 'PR002005') {
                this.show1 = true;
              } else if (this.form.salequotation === 'PJ013001') {
                this.show2 = true;
              } else if (this.form.salequotation === 'PJ013003') {
                this.show2 = true;
              }
              if (this.form.addbook === "PJ010001") {
                this.show3 = true;
              } else if (this.form.addbook === "PJ010002") {
                this.show3 = false;
              }
              if (this.form.status === '2') {
                this.disable = false;
              }
              if (this.form.uploadfile != null) {
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
        let num = getUserInfo(this.$store.getters.userinfo.userid).userinfo.extension;
        if (num) {
          this.form.investigator = num;
        }
        if (this.userlist !== null && this.userlist !== '') {
          let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
          if (rst) {
            this.centerid = rst.centerNmae;
            this.groupid = rst.groupNmae;
            this.teamid = rst.teamNmae;
            this.form.center_id = rst.centerId;
            this.form.group_id = rst.groupId;
            this.form.team_id = rst.teamId;
            // this.form.thisproject = rst.personalcode;
          }
          this.form.user_id = this.$store.getters.userinfo.userid;
            this.getBudt(this.form.user_id);
        }
        // this.loading = false;
      }
    },
    computed: {
      readonly: function () {
        return this.$route.params.readonly;
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
      if (this.form.careerplan === '1') {
        this.show = true;
        this.show1 = false;
        this.rules.businessplantype[0].required = true;
        this.rules.businessplanbalance[0].required = true;
        this.rules.classificationtype[0].required = false;
        this.rules.startdate[0].required = false;
        this.rules.enddate[0].required = false;
      } else {
        this.show = false;
        this.show1 = false;
        this.rules.businessplantype[0].required = false;
        this.rules.businessplanbalance[0].required = false;
        this.rules.classificationtype[0].required = false;
        this.rules.startdate[0].required = false;
        this.rules.enddate[0].required = false;
      }
      if (this.form.decisive === "PJ011001") {
        this.show4 = false;
        this.show5 = false;
        this.show6 = true;
        this.rules.startdate[0].required = false;
        this.rules.enddate[0].required = false;
      } else if (this.form.decisive === "PJ011002") {
        this.show4 = true;
        this.show5 = false;
        this.show6 = true;
        this.rules.startdate[0].required = false;
        this.rules.enddate[0].required = false;
      } else if (this.form.decisive === "PJ011003") {
        this.show4 = false;
        this.show5 = true;
        this.show6 = false;
        this.rules.startdate[0].required = true;
        this.rules.enddate[0].required = true;
        this.rules.period[0].required = false;
      } else if (this.form.decisive === "PJ011004") {
        this.show4 = false;
        this.show5 = false;
        this.show6 = false;
        this.rules.startdate[0].required = false;
        this.rules.enddate[0].required = false;
        this.rules.period[0].required = false;
      }
    },
    methods: {
        getBudt(val){
            //ADD_FJL  修改人员预算编码
            if (getOrgInfo(getOrgInfoByUserId(val).groupId)) {
                let butinfo = getOrgInfo(getOrgInfoByUserId(val).groupId).encoding;
                let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'JY002');
                if(dic.length > 0){
                    for (let i = 0; i < dic.length; i++) {
                        if(butinfo === dic[i].value1){
                            this.options.push({
                                lable: dic[i].value2 +'_'+ dic[i].value3,
                                value: dic[i].code,
                            })
                        }
                    }
                }
            }
            //ADD_FJL  修改人员预算编码
        },
      setdisabled(val) {
        if (this.$route.params.disabled) {
          this.disabled = val;
        }
      },
      moneyDiff() {
        if (this.form.businessplanbalance > 0 && this.form.businessplanbalance < this.form.amounttobegiven) {
          this.show = false;
          this.form.careerplan = '0';
          this.form.amounttobegiven = 0;
        }
      },
      getUserids(val) {
        this.userlist = val;
        this.form.user_id = val;
        let rst = getOrgInfoByUserId(val);
        if (rst) {
          this.centerid = rst.centerNmae;
          this.groupid = rst.groupNmae;
          this.teamid = rst.teamNmae;
          this.form.center_id = rst.centerId;
          this.form.group_id = rst.groupId;
          this.form.team_id = rst.teamId;
        } else {
          this.centerid = '';
          this.groupid = '';
          this.teamid = '';
          this.form.center_id = '';
          this.form.group_id = '';
          this.form.team_id = '';
        }
        if (!this.form.user_id || this.form.user_id === '' || val === "undefined") {
          this.error = this.$t('normal.error_09') + this.$t('label.applicant');
        } else {
          this.error = "";
        }
      },
      changeBut(val) {
        this.form.thisproject = val;
      },
      getClassificationtype(val) {
        this.form.classificationtype = val;
      },
      getBusinessplantype(val) {
        this.form.businessplantype = val;
        if (val === "PR002006") {
          this.show1 = true;
          this.rules.classificationtype[0].required = true;
        } else if (val === "PR002001") {
          this.show1 = false;
          this.rules.classificationtype[0].required = false;
        } else if (val === "PR002002") {
          this.show1 = false;
          this.rules.classificationtype[0].required = false;
        } else if (val === "PR002003") {
          this.show1 = false;
          this.rules.classificationtype[0].required = false;
        } else if (val === "PR002004") {
          this.show1 = false;
          this.rules.classificationtype[0].required = false;
        } else if (val === "PR002005") {
          this.show1 = false;
          this.rules.classificationtype[0].required = false;
        }
      },
      getAddbook(val) {
        this.form.addbook = val;
        if (val === "PJ010001") {
          this.show3 = true;
        } else if (val === "PJ010002") {
          this.show3 = false;
        }
      },
      getSettingplace(val) {
        this.form.settingplace = val;
      },
      getDecisive(val) {
        this.form.decisive = val;
        let dictionaryInfo = getDictionaryInfo(val);
        if (val === "PJ011001") {
          this.show4 = false;
          this.show5 = false;
          this.show6 = true;
          this.rules.startdate[0].required = false;
          this.rules.enddate[0].required = false;
          if (dictionaryInfo) {
            this.form.period = dictionaryInfo.value2;
          }
        } else if (val === "PJ011002") {
          this.show4 = true;
          this.show5 = false;
          this.show6 = true;
          this.rules.startdate[0].required = false;
          this.rules.enddate[0].required = false;
          if (dictionaryInfo) {
            this.form.period = dictionaryInfo.value2;
          }
        } else if (val === "PJ011003") {
          this.show4 = true;
          this.show5 = false;
          this.show6 = true;
          this.rules.startdate[0].required = false;
          this.rules.enddate[0].required = false;
          if (dictionaryInfo) {
            this.form.period = dictionaryInfo.value2;
          }
        } else if (val === "PJ011004") {
          this.show4 = false;
          this.show5 = true;
          this.show6 = false;
          this.rules.startdate[0].required = true;
          this.rules.enddate[0].required = true;
          this.rules.period[0].required = false;
          if (dictionaryInfo) {
            this.form.period = dictionaryInfo.value2;
          }
        } else if (val === "PJ011005") {
          this.show4 = false;
          this.show5 = false;
          this.show6 = false;
          this.rules.startdate[0].required = false;
          this.rules.enddate[0].required = false;
          this.rules.period[0].required = false;
          if (dictionaryInfo) {
            this.form.period = dictionaryInfo.value2;
          }
        }
      },
      getSalequotation(val) {
        this.form.salequotation = val;
        if (val === "PJ013002") {
          this.show2 = false;
        } else if (val === "PJ013001") {
          this.show2 = true;
        } else if (val === "PJ013003") {
          this.show2 = true;
        }
      },
      radiochange(val) {
        this.form.careerplan = val;
        this.form.businessplantype = '';
        this.form.businessplanbalance = 0;
        if (val === '1') {
          this.show = true;
          this.show1 = false;
          if (this.form.businessplantype === 'PR002005') {
            this.show1 = true;
            this.rules.classificationtype[0].required = true;
          }
          this.rules.businessplantype[0].required = true;
          this.rules.businessplanbalance[0].required = true;
        } else {
          this.show = false;
          this.show1 = false;
          this.rules.businessplantype[0].required = false;
          this.rules.businessplanbalance[0].required = false;
          this.rules.classificationtype[0].required = false;
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
      start(val) {
        if (val.state === '0') {
          this.form.status = '2';
        } else if (val.state === '2') {
          this.form.status = '4';
        }
        // this.form.status = '2';
        this.buttonClick("update");
      },
      end() {
        this.form.status = '0';
        this.buttonClick("update");
      },
      fileError(err, file, fileList) {
        Message({
          message: this.$t("normal.error_04"),
          type: 'error',
          duration: 5 * 1000
        });
      },
      fileRemove(file, fileList) {
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
      paramsTitle() {
        this.$router.push({
          name: 'PFANS1001FormView',
          params: {
            title: 4,
          },
        });
      },
      changeTotal(val) {
        this.form.money = Number(this.form.unitprice) * Number(this.form.numbers);
      },
      buttonClick(val) {
        let JudgementVo = {};
        JudgementVo.judgement = this.form;
        if (val === 'back') {
          this.paramsTitle();
        } else {
          this.$refs["refform"].validate(valid => {
            if (valid) {
              this.loading = true;
              if (this.form.careerplan === '0') {
                this.form.businessplantype = "";
                this.form.businessplanbalance = "";
                this.form.classificationtype = "";
              }
              if (this.form.businessplantype === 'PR002001') {
                this.form.classificationtype = "";
              }
              if (this.form.businessplantype === 'PR002002') {
                this.form.classificationtype = "";
              }
              if (this.form.businessplantype === 'PR002003') {
                this.form.classificationtype = "";
              }
              if (this.form.businessplantype === 'PR002004') {
                this.form.classificationtype = "";
              }
              if (this.form.salequotation === 'PJ013001') {
                this.form.reasonsforquotation = "";
              }
              if (this.form.salequotation === 'PJ013003') {
                this.form.reasonsforquotation = "";
              }
              if (this.form.decisive === 'PJ011001') {
                this.form.startdate = "";
                this.form.enddate = "";
              }
              if (this.form.decisive === 'PJ011002') {
                this.form.startdate = "";
                this.form.enddate = "";
              }
              if (this.form.decisive === 'PJ011003') {
                this.form.startdate = "";
                this.form.enddate = "";
              }
              if (this.form.decisive === 'PJ011005') {
                this.form.startdate = "";
                this.form.enddate = "";
              }
              this.form.scheduleddate = moment(this.form.scheduleddate).format('YYYY-MM-DD');
              this.form.equipment = "0";
              let error = 0;
              //add-ws-4/22-实施计划金额不能大于事业计划余额check
              if (this.form.careerplan === '1') {
                  if(this.form.amounttobegiven>this.form.businessplanbalance){
                    error = error + 1;
                    Message({
                      message: this.$t("label.PFANS1004FORMVIEW_CHECKERROR"),
                      type: 'error',
                      duration: 5 * 1000
                    });
                    this.loading = false;
                  }
              }
              //add-ws-4/22-实施计划金额不能大于事业计划余额check
              if (this.form.amounttobegiven === 0) {
                error = error + 1;
                Message({
                  message: this.$t("label.PFANS1004VIEW_AMOUNTTOBEGIVEN") + this.$t("label.PFANS1004FORMVIEW_ERROR"),
                  type: 'error',
                  duration: 5 * 1000
                });
                this.loading = false;
              }
              if (error === 0) {
                if (this.$route.params._id) {
                  this.form.judgementid = this.$route.params._id;
                  this.$store
                    .dispatch('PFANS1004Store/updateJudgement', JudgementVo)
                    .then(response => {
                      this.data = response;
                      this.loading = false;
                      if (val !== "update") {
                        Message({
                          message: this.$t("normal.success_02"),
                          type: 'success',
                          duration: 5 * 1000
                        });
                        this.paramsTitle();
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
                    .dispatch('PFANS1004Store/createJudgement', JudgementVo)
                    .then(response => {
                      this.data = response;
                      this.loading = false;
                      Message({
                        message: this.$t("normal.success_01"),
                        type: 'success',
                        duration: 5 * 1000
                      });
                      this.paramsTitle();
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

            } else {
              Message({
                message: this.$t("normal.error_12"),
                type: 'error',
                duration: 5 * 1000
              });
            }
          });
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
