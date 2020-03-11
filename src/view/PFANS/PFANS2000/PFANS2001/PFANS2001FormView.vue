<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :canStart="canStart" :title="title" @buttonClick="buttonClick"
                         @end="end"
                         @start="start" @workflowState="workflowState" ref="container" v-loading="loading">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="refform"
                 style="padding: 2rem">
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane :label="$t('label.PFANS2001VIEW_BASICINFORMATION')" name="first">
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.team')">
                    <org :disabled="!disabled" :orglist="form.team_id" @getOrgids="getTeamId" orgtype="3"
                         style="width:20vw"></org>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :error="errorgroup" :label="$t('label.group')" prop="group_id">
                    <org :disabled="!disabled" :error="errorgroup" :orglist="form.group_id" @getOrgids="getGroupId"
                         orgtype="2" style="width:20vw"></org>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :error="errorcenter" :label="$t('label.center')" prop="center_id">
                    <org :disabled="!disabled" :error="errorcenter" :orglist="form.center_id"
                         @getOrgids="getCenterId"
                         orgtype="1" style="width:20vw"></org>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2001VIEW_POSITIONTITLE')" prop="postname">
                    <el-input :disabled="!disabled" maxlength='20' style="width:20vw"
                              v-model="form.postname"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2001VIEW_PEOPLEREQUIRED')" prop="peoplerequired">
                    <el-input :disabled="!disabled" maxlength='5' style="width:20vw"
                              v-model="form.peoplerequired"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2001VIEW_WORKPLACE')" prop="workplace">
                    <el-input :disabled="!disabled" maxlength='50' style="width:20vw"
                              v-model="form.workplace"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.application_date')" prop="applicationtime">
                    <el-date-picker :disabled="!disabled" style="width:20vw" type="date"
                                    v-model="form.applicationtime"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2001VIEW_VIEWPROJECT')" prop="viewproject">
                    <el-select :disabled="!disabled" style="width:20vw" v-model="form.viewproject">
                      <el-option
                        :key="item.value"
                        :label="item.lable"
                        :value="item.value"
                        v-for="item in optionsdata">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2001VIEW_RECRUITMENTROUTE')" prop="recruitmentroute">
                    <dicselect
                      :code="code"
                      :data="form.recruitmentroute"
                      :disabled="!disabled"
                      :multiple="multiple1"
                      :selectType="selectType1"
                      @change="getRecruitmentroute"
                      style="width:20vw">
                    </dicselect>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2001VIEW_OTHERWAYS')" v-show="show1">
                    <el-input :disabled="!disabled" maxlength='20' style="width:20vw" v-model="form.other"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2001VIEW_JOBDEMAND')" prop="jobdemand">
                    <dicselect
                      :code="code1"
                      :data="form.jobdemand"
                      :disabled="!disabled"
                      :multiple="multiple"
                      @change="getJobdemand"
                      style="width:20vw">
                    </dicselect>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2001VIEW_NEEDTOTRAVEL')" prop="needtotravel">
                    <dicselect
                      :code="code2"
                      :data="form.needtotravel"
                      :disabled="!disabled"
                      :multiple="multiple"
                      @change="getNeedtotravel"
                      style="width:20vw">
                    </dicselect>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2001VIEW_DEMANDLEVEL')" prop="demandlevel">
                    <dicselect
                      :code="code3"
                      :data="form.demandlevel"
                      :disabled="!disabled"
                      :multiple="multiple"
                      @change="getDemandlevel"
                      style="width:20vw">
                    </dicselect>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2001VIEW_EXPECTEDARRIVALTIME')" prop="expectedarrivaltime">
                    <el-date-picker :disabled="!disabled" style="width:20vw" type="date"
                                    v-model="form.expectedarrivaltime"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2001VIEW_SUGGESTEDSALARY')">
                    <el-input-number :disabled="!disabled" :max="1000000000" :min="0"
                                     :precision="2" controls-position="right" style="width:9.5vw" v-model="form.suggestedsalary"></el-input-number>
                    <span>~</span>
                    <el-input-number :disabled="!disabled" :max="1000000000" :min="0"
                                     :precision="2" controls-position="right" style="width:9.5vw" v-model="form.turningday"></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2001VIEW_SKILLLEVEL')">
                    <dicselect
                      :code="code6"
                      :data="form.skilllevel"
                      :disabled="!disabled"
                      :multiple="multiple"
                      @change="getSkilllevel"
                      style="width:9.5vw">
                    </dicselect>
                    <span>~</span>
                    <dicselect
                      :code="code6"
                      :data="form.afterturningpositiv"
                      :disabled="!disabled"
                      :multiple="multiple"
                      @change="getAftert"
                      style="width:9.5vw">
                    </dicselect>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>

            <el-tab-pane :label="$t('label.PFANS2001VIEW_JOBREQUIREMENTS')" name="second">
              <el-collapse>
                  <el-collapse-item>
                    <template slot="title">
                      <span  class="collapse_Title">{{$t('label.PFANS2001VIEW_QUALIFICATIONS')}}</span>
                    </template>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2001VIEW_GENDERREQUIREMENTS')" prop="genderrequirements">
                        <dicselect
                          :code="code4"
                          :data="form.genderrequirements"
                          :disabled="!disabled"
                          :multiple="multiple"
                          @change="getGenderrequirements"
                          style="width:20vw">
                        </dicselect>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2001VIEW_AGEREQUIREMENT')" prop="agerequirement">
                        <el-input :disabled="!disabled" maxlength='20' style="width:20vw"
                                  v-model="form.agerequirement"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2001VIEW_REQUIREMENTS')" prop="requirements">
                        <dicselect
                          :code="code5"
                          :data="form.requirements"
                          :disabled="!disabled"
                          :multiple="multiple"
                          @change="getRequirements"
                          style="width:20vw">
                        </dicselect>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2001VIEW_OTHERQUALIFICATIONS')" v-show="show2">
                        <el-input :disabled="!disabled" maxlength='20' style="width:20vw"
                                  v-model="form.postother"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2001VIEW_PROFESSIONAL')" prop="professional">
                        <el-input :disabled="!disabled" style="width:20vw" v-model="form.professional"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2001VIEW_EXPERIENCE')" prop="experience">
                        <el-input :disabled="!disabled" style="width:20vw" v-model="form.experience"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="24">
                      <el-form-item :label="$t('label.PFANS2001VIEW_OTHERREQUIREMENTS')"
                                    prop="otherrequirements">
                        <el-input :disabled="!disabled" :rows="3" style="width:70vw" type="textarea"
                                  v-model="form.otherrequirements"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-collapse-item>
                <el-collapse-item>
                  <template slot="title">
                    <span  class="collapse_Title">{{$t('label.PFANS2001VIEW_RESPONSIBILITIES')}}</span>
                  </template>
                  <el-row>
                    <el-input :disabled="!disabled" style="width:70vw" type="textarea"
                              v-model="form.responsibilities"></el-input>
                  </el-row>
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
  import EasyNormalContainer from "@/components/EasyNormalContainer";
  import PFANS2001View from "../PFANS2001/PFANS2001View.vue";
  import dicselect from "../../../components/dicselect.vue";
  import user from "../../../components/user.vue";
  import {Message} from 'element-ui'
  import {getOrgInfoByUserId} from '@/utils/customize';
  import moment from "moment";
  import org from "../../../components/org";

  export default {
    name: 'PFANS2001FormView',
    components: {
      EasyNormalContainer,
      PFANS2001View,
      getOrgInfoByUserId,
      dicselect,
      user,
      org
    },
    data() {
      var centerId = (rule, value, callback) => {
        if (!this.form.center_id || this.form.center_id === "") {
          callback(new Error(this.$t("normal.error_08") + "center"));
          this.error = this.$t("normal.error_08") + "center";
        } else {
          callback();
        }
      };
      return {
        centerorglist: '',
        grouporglist: '',
        teamorglist: '',
        optionsdata: [],
        loading: false,
        errorcenter: '',
        errorgroup: '',
        activeName: 'first',
        checked: true,
        selectType1: "double",
        title: "title.PFANS2001VIEW",
        buttonList: [],
        tabIndex: 0,
        multiple: false,
        multiple1: true,
        form: {
          recruitid: '',
          postname: '',
          centername: "",
          groupname: "",
          teamname: "",
          center_id: '',
          group_id: '',
          team_id: '',
          experience: '',
          project_name: '',
          peoplerequired: '',
          workplace: '',
          applicationtime: moment(new Date()).format("YYYY-MM-DD"),
          viewproject: '',
          recruitmentroute: '',
          other: '',
          jobdemand: '',
          needtotravel: '',
          demandlevel: '',
          suggestedsalary: '',
          turningday: moment(new Date()).format("YYYY-MM-DD"),
          afterturningpositiv: '',
          expectedarrivaltime: moment(new Date()).format("YYYY-MM-DD"),
          skilllevel: '',
          genderrequirements: '',
          postother: '',
          agerequirement: '',
          requirements: '',
          professional: '',
          otherrequirements: '',
          responsibilities: '',
        },
        code: 'PR027',
        code1: 'PR028',
        code2: 'PR029',
        code3: 'PR030',
        code4: 'PR031',
        code5: 'PR032',
        code6: 'PR052',
        disabled: true,
        menuList: [],
        rules: {
          viewproject: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS2001VIEW_VIEWPROJECT'),
              trigger: 'change'
            },
          ],
          postname: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS2001VIEW_POSITIONTITLE'),
              trigger: 'change'
            },
          ],
          peoplerequired: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS2001VIEW_PEOPLEREQUIRED'),
              trigger: 'change'
            },
          ],
          workplace: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS2001VIEW_WORKPLACE'),
              trigger: 'change'
            },
          ],
          applicationtime: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.application_date'),
              trigger: 'change'
            },
          ],
          genderrequirements: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS2001VIEW_GENDERREQUIREMENTS'),
              trigger: 'change'
            },
          ],
          agerequirement: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS2001VIEW_AGEREQUIREMENT'),
              trigger: 'change'
            },
          ],
          requirements: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS2001VIEW_REQUIREMENTS'),
              trigger: 'change'
            },
          ],
          professional: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS2001VIEW_PROFESSIONAL'),
              trigger: 'change'
            },
          ],
          experience: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS2001VIEW_EXPERIENCE'),
              trigger: 'change'
            },
          ],
          otherrequirements: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS2001VIEW_OTHERREQUIREMENTS'),
              trigger: 'change'
            },
          ],
          center_id: [
            {
              required: true,
              validator: centerId,
              trigger: "blur"
            }
          ],
        },
        show1: false,
        show2: false,
        canStart: false,
      };
    },
    mounted() {
      if (this.$route.params._org) {
        ({
          centername: this.form.centername,
          groupname: this.form.groupname,
          teamname: this.form.teamname,
          center_id: this.form.center_id,
          group_id: this.form.group_id,
          team_id: this.form.team_id
        } = this.$route.params._org);
      }
      this.getCompanyProjectList();
      this.loading = true;
      if (this.$route.params._id) {
        this.$store
          .dispatch('PFANS2001Store/getRecruitOne', {"recruitid": this.$route.params._id})
          .then(response => {
            this.form = response;
            this.centerorglist = this.form.center_id;
            this.grouporglist = this.form.group_id;
            this.teamorglist = this.form.team_id;
            this.form.recruitmentroute = this.form.recruitmentroute.split(",");
            if (this.form.recruitmentroute === 'PR027004') {
              this.show1 = true;
            }
            if (this.form.requirements === 'PR032005') {
              this.show2 = true;
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
      checkRequire() {
        if (
          !this.form.center_id ||
          !this.form.group_id ||
          !this.form.postname ||
          !this.form.peoplerequired ||
          !this.form.workplace ||
          !this.form.applicationtime ||
          !this.form.viewproject
        ) {
          this.activeName = 'first';
        } else if (
          !this.form.genderrequirements ||
          !this.form.agerequirement ||
          !this.form.requirements ||
          !this.form.professional ||
          !this.form.experience
        ) {
          this.activeName = 'second';
        }
      },
      getCenterId(val) {
        this.getOrgInformation(val);
        if (!val || this.form.center_id === "") {
          this.errorcenter = this.$t("normal.error_08") + "center";
        } else {
          this.errorcenter = "";
        }
      },
      getGroupId(val) {
        this.getOrgInformation(val);
        if (this.form.center_id === "") {
          this.errorgroup = this.$t("normal.error_08") + "center";
        } else {
          this.errorgroup = "";
        }
      },
      getTeamId(val) {
        this.getOrgInformation(val);
        if (this.form.center_id === "") {
          this.errorgroup = this.$t("normal.error_08") + "center";
        } else {
          this.errorgroup = "";
        }
      },
      getOrgInformation(id) {
        let org = {};
        let treeCom = this.$store.getters.orgs;

        if (id && treeCom.getNode(id)) {
          let node = id;
          let type = treeCom.getNode(id).data.type || 0;
          for (let index = parseInt(type); index >= 1; index--) {
            if (parseInt(type) === index && ![1, 2].includes(parseInt(type))) {
              org.teamname = treeCom.getNode(node).data.departmentname;


              org.team_id = treeCom.getNode(node).data._id;
            }
            if (index === 2) {
              org.groupname = treeCom.getNode(node).data.departmentname;
              org.group_id = treeCom.getNode(node).data._id;
            }
            if (index === 1) {
              org.centername = treeCom.getNode(node).data.companyname;
              org.center_id = treeCom.getNode(node).data._id;
            }
            node = treeCom.getNode(node).parent.data._id;
          }
          ({
            centername: this.form.centername,
            groupname: this.form.groupname,
            teamname: this.form.teamname,
            center_id: this.form.center_id,
            group_id: this.form.group_id,
            team_id: this.form.team_id,
          } = org);
        }
      },

      getRecruitmentroute(val) {
        this.form.recruitmentroute = val;
        this.show1 = false;
        for (let i = 0; i < val.length; i++) {
          if (val[i] === 'PR027004') {
            this.show1 = true;
          }
        }
      },
      getJobdemand(val) {
        this.form.jobdemand = val;
      },
      getNeedtotravel(val) {
        this.form.needtotravel = val;
      },
      getDemandlevel(val) {
        this.form.demandlevel = val;
      },
      getGenderrequirements(val) {
        this.form.genderrequirements = val;
      },
      getSkilllevel(val) {
        this.form.skilllevel = val;
      },
      getAftert(val) {
        this.form.afterturningpositiv = val;
      },
      getRequirements(val) {
        this.form.requirements = val;
        if (val === "PR032005") {
          this.show2 = true;
        }
        if (val === "PR032001") {
          this.show2 = false;
        } else if (val === "PR032002") {
          this.show2 = false;
        } else if (val === "PR032003") {
          this.show2 = false;
        } else if (val === "PR032004") {
          this.show2 = false;
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
      getCompanyProjectList() {
        this.loading = true;
        this.$store
          .dispatch('PFANS2001Store/getCompanyProjectList', {})
          .then(response => {
            this.optionsdata = [];
            for (let i = 0; i < response.length; i++) {
              var vote = {};
              vote.value = response[i].companyprojects_id;
              vote.lable = response[i].project_name;
              this.optionsdata.push(vote)
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
      },
      buttonClick(val) {
        this.checkRequire();
        this.$refs["refform"].validate(valid => {
          if (valid) {
              this.form.recruitmentroute = this.form.recruitmentroute.join(",");
            if (this.$route.params._id) {
              this.form.recruitid = this.$route.params._id;
              this.form.center_id = this.centerorglist;
              this.form.group_id = this.grouporglist;
              this.form.team_id = this.teamorglist;
              this.form.applicationtime = moment(this.form.applicationtime).format('YYYY-MM-DD');
              this.form.turningday = moment(this.form.turningday).format('YYYY-MM-DD');
              this.form.expectedarrivaltime = moment(this.form.expectedarrivaltime).format('YYYY-MM-DD');
              this.loading = true;
              this.$store
                .dispatch('PFANS2001Store/updateRecruit', this.form)
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
              this.form.turningday = moment(this.form.turningday).format('YYYY-MM-DD');
              this.form.expectedarrivaltime = moment(this.form.expectedarrivaltime).format('YYYY-MM-DD');
              this.$store
                .dispatch('PFANS2001Store/createRecruit', this.form)
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
        });
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .width {
    width: 13rem;
  }

  .el-table__footer-wrapper tbody td, .el-table__header-wrapper tbody td {
    color: blue;
  }
</style>
