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
              <el-form-item :label="$t('label.team')" prop="team_id">
                <el-input v-model="form.team_id" :disabled="true" style="width: 11rem" maxlength='36'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :error="error"  :label="$t('label.applicant')" prop="user_id">
                <user :disabled="!disabled" :error="error" :selectType="selectType" :userlist="userlist"
                      @getUserids="getUserids" style="width: 10.15rem"></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.pfanstype')" prop="type">
                <dicselect
                  :code="code"
                  :data="form.type"
                  :multiple="multiple"
                  @change="getType"
                  style="width: 11rem"
                  :disabled="!disabled">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.subtype')" prop="subtype">
                <dicselect
                  :code="code1"
                  :data="form.subtype"
                  :multiple="multiple"
                  @change="getSubtype"
                  style="width: 11rem"
                  :disabled="!disabled">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.application_date')" prop="application" >
                <el-date-picker :disabled="!disabled" type="date" v-model="form.application" style="width: 11rem" ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1017FORMVIEW_EXTENSION')" prop="extension">
                <el-input v-model="form.extension" :disabled="!disabled" style="width: 11rem" maxlength='20'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item :label="$t('label.email')" prop="email">
                <el-input v-model="form.email" type="textarea" :disabled="!disabled" style="width: 34rem" maxlength='50'></el-input>
              </el-form-item>
            </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS1021FORMVIEW_REASON')" prop="reason">
                  <el-input v-model="form.reason" type="textarea" :disabled="!disabled" style="width: 57rem"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          <el-row>
            <el-table :data="tableD" header-cell-class-name="sub_bg_color_grey height">
              <el-table-column :label="$t('label.PFANS2006VIEW_NO')" align="center" fixed prop="content"
                               type="index"></el-table-column>
              <el-table-column :label="$t('label.applicant')" align="center" prop="title" width="165">
                <template slot-scope="scope">
                  <el-input :disabled="!disabled" maxlength="20" v-model="scope.row.title">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.center')" align="center" prop="detailcenter" width="165" :error="errordetailcenter">
                <template slot-scope="scope">
                  <org  :orglist="detailcenterorglist" :error="errordetailcenter" orgtype="1" :disabled="!disabled" style="width: 9rem" @getOrgids="getCenterId"></org>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.group')" align="center" prop="detailgroup" width="165" :error="errordetailgroup">
                <template slot-scope="scope">
                  <org  :orglist="detailgrouporglist" :error="errordetailgroup" orgtype="1" :disabled="!disabled" style="width: 9rem" @getOrgids="getGroupId"></org>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.team')" align="center" prop="detailteam" width="165" :error="errordetailteam">
                <template slot-scope="scope">
                  <org  :orglist="detailteamorglist" :error="errordetailteam" orgtype="1" :disabled="!disabled" style="width: 9rem" @getOrgids="getTeamId"></org>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1021FORMVIEW_PHONENUMBER')" align="center" prop="phonenumber"  width="165">
                <template slot-scope="scope">
                  <el-input :disabled="!disabled" maxlength="20" v-model="scope.row.phonenumber">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.email')" align="center" prop="emaildetail"  width="165">
                <template slot-scope="scope">
                  <el-input :disabled="!disabled" maxlength="20" v-model="scope.row.emaildetail">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1021FORMVIEW_STARTDATE')" align="center" prop="startdate"  width="165">
                <template slot-scope="scope">
                  <el-date-picker :disabled="!disabled" type="date" v-model="form.startdate" style="width: 11rem" ></el-date-picker>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1021FORMVIEW_FABUILDING')" align="center" prop="fabuilding"  width="165">
                <template slot-scope="scope">
                  <dicselect
                    :code="code2"
                    :data="form.fabuilding"
                    :multiple="multiple"
                    @change="getFabuilding"
                    style="width: 11rem"
                    :disabled="!disabled">
                  </dicselect>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1021FORMVIEW_FBBUILDING')" align="center" prop="fbbuilding"  width="165">
                <template slot-scope="scope">
                  <dicselect
                    :code="code3"
                    :data="form.fbbuilding"
                    :multiple="multiple"
                    @change="getFbbuilding"
                    style="width: 11rem"
                    :disabled="!disabled">
                  </dicselect>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1021FORMVIEW_ENTRYMANAGER')" align="center" prop="entrymanager" :errorentrymanager="errorentrymanager" width="165">
                <template slot-scope="scope">
                  <user :disabled="!disabled" :errorentrymanager="errorentrymanager" :selectType="selectType" :userlist="userlist1"
                        @getUserids="getUserids1" style="width: 10.15rem"></user>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.operation')" align="center" width="180">
                <template slot-scope="scope">
                  <el-button
                    :disabled="!disabled"
                    @click.native.prevent="deleteRow(scope.$index, tableD)"
                    plain
                    size="small"
                    type="danger"
                  >{{$t('button.delete')}}
                  </el-button>
                  <el-button
                    :disabled="!disabled"
                    @click="addRow()"
                    plain
                    size="small"
                    type="primary"
                  >{{$t('button.insert')}}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
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
  import {getDictionaryInfo} from "../../../../utils/customize";
  import moment from "moment";

  export default {
    name: 'PFANS1021FormView',
    components: {
      EasyNormalContainer,
      getOrgInfoByUserId,
      dicselect,
      user
    },
    data() {
      var checkuser = (rule, value, callback) => {
        if(!value || value === '' || value ==="undefined"){
          this.error = this.$t('normal.error_09') + this.$t('label.applicant');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.applicant')));
        }else{
          this.error = "";
          return callback();
        }

      };
      return {
        userlist: "",
        loading: false,
        error: '',
        selectType: "Single",
        title: 'title.PFANS1021VIEW',
        buttonList: [],
        multiple: false,
        form: {
            center_id: '',
            group_id: '',
            team_id: '',
            user_id: '',
            type: '',
            subtype: '',
            application: moment(new Date()).format("YYYY-MM-DD"),
            extension: '',
            email: '',
            reason: '',
        },
          code: 'PR002',
          code1: 'PR003',
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
            reason: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1021FORMVIEW_REASON'),
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
          .dispatch('PFANS1004Store/getJudgementOne', {"judgementid": this.$route.params._id})
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
        }else if (this.form.decisive === "PJ011002") {
            this.show4 = true;
            this.show5 = false;
            this.show6 = true;
            this.rules.startdate[0].required = false;
            this.rules.enddate[0].required = false;
        }else if (this.form.decisive === "PJ011003") {
            this.show4 = false;
            this.show5 = true;
            this.show6 = false;
            this.rules.startdate[0].required = true;
            this.rules.enddate[0].required = true;
            this.rules.period[0].required = false;
        }else if (this.form.decisive === "PJ011004") {
            this.show4 = false;
            this.show5 = false;
            this.show6 = false;
            this.rules.startdate[0].required = false;
            this.rules.enddate[0].required = false;
            this.rules.period[0].required = false;
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
          this.error = this.$t('normal.error_09') + this.$t('label.applicant');
        } else {
          this.error = "";
        }
      },
      getType(val) {
        this.form.type = val;
      },
        getSubtype(val) {
        this.form.subtype = val;
      },
      getAddbook(val) {
        this.form.addbook = val;
        if (val === "PJ010001") {
          this.show3 = true;
        }else if (val === "PJ010002") {
          this.show3 = false;
        }
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
            }else if (val === "PJ011002") {
                this.show4 = true;
                this.show5 = false;
                this.show6 = true;
                this.rules.startdate[0].required = false;
                this.rules.enddate[0].required = false;
                if (dictionaryInfo) {
                    this.form.period = dictionaryInfo.value2;
                }
            }else if (val === "PJ011003") {
                this.show4 = true;
                this.show5 = false;
                this.show6 = true;
                this.rules.startdate[0].required = false;
                this.rules.enddate[0].required = false;
                if (dictionaryInfo) {
                    this.form.period = dictionaryInfo.value2;
                }
            }else if (val === "PJ011004") {
                this.show4 = false;
                this.show5 = true;
                this.show6 = false;
                this.rules.startdate[0].required = true;
                this.rules.enddate[0].required = true;
                this.rules.period[0].required = false;
                if (dictionaryInfo) {
                    this.form.period = dictionaryInfo.value2;
                }
            }else if (val === "PJ011005") {
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
        }else if (val === "PJ013001") {
          this.show2 = true;
        }else if (val === "PJ013003") {
          this.show2 = true;
        }
      },
      radiochange(val){
          this.form.careerplan = val;
        if (val === '1') {
          this.show = true;
          this.show1 = false;
          if(this.form.businessplantype === 'PR002005'){
              this.show1 = true;
              this.rules.classificationtype[0].required = true;
          }
          this.rules.businessplantype[0].required = true;
          this.rules.businessplanbalance[0].required = true;
        }else {
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
      paramsTitle(){
        this.$router.push({
          name: 'PFANS1001FormView',
          params: {
            title: 4,
          },
        });
      },
      buttonClick(val) {
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
                if (this.form.decisive === 'PJ011004') {
                    this.form.startdate = "";
                    this.form.enddate = "";
                }
              this.form.scheduleddate = moment(this.form.scheduleddate).format('YYYY-MM-DD');
              this.form.equipment = "0";
              if (this.$route.params._id) {
                this.form.judgementid = this.$route.params._id;
                this.$store
                  .dispatch('PFANS1004Store/updateJudgement', this.form)
                  .then(response => {
                    this.data = response;
                    this.loading = false;
                      if(val !== "update") {
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
                  .dispatch('PFANS1004Store/createJudgement', this.form)
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
          });
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
