<template>
  <EasyNormalContainer
    :buttonList="buttonList"
    :title="titles"
    @buttonClick="buttonClick"
    @end="end"
    @start="start"
    @workflowState="workflowState"
    ref="container"
    v-loading="loading"
  >
    <div slot="customize" style="margin-top:2rem">
      <el-form :model="form" :rules="rules" label-position="left" ref="form">
        <el-tabs v-model="activeName">
          <el-tab-pane
            :label="$t('label.PFANS2002FORMVIEW_ORGIN')"
            name="first"
            style="padding-top:1%;padding-left:3%"
          >
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item
                  :label="$t('label.PFANS2002VIEW_NAME')"
                  label-width="6rem"
                  prop="name"
                >
                  <el-input :disabled="disabled" class="width" maxlength="20" v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('label.sex')" label-width="6rem" prop="sex">
                  <el-select
                    :disabled="disabled"
                    :placeholder="$t('normal.error_09')"
                    class="width"
                    v-model="form.sex"
                  >
                    <el-option
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      v-for="item in sex_options"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  :label="$t('label.PFANS2002VIEW_BIRTHDAY')"
                  label-width="6rem"
                  prop="birthday"
                >
                  <el-date-picker
                    :disabled="disabled"
                    :placeholder="$t('normal.error_09')"
                    class="width"
                    type="date"
                    v-model="form.birthday"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item
                  :label="$t('label.PFANS2002VIEW_EDUCATION')"
                  label-width="6rem"
                  prop="education"
                >
                  <dicselect
                    :data="form.education"
                    :disabled="disabled"
                    @change="changeEducation"
                    class="width"
                    code="PR022"
                  ></dicselect>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  :label="$t('label.PFANS2002FORMVIEW_SPECIALTY')"
                  label-width="6rem"
                  prop="specialty"
                >
                  <el-input
                    :disabled="disabled"
                    class="width"
                    maxlength="20"
                    v-model="form.specialty"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  :label="$t('label.PFANS2002FORMVIEW_QUITYEAR')"
                  label-width="6rem"
                  prop="quityear"
                >
                  <el-date-picker
                    :disabled="disabled"
                    :placeholder="$t('normal.error_09')"
                    class="width"
                    type="year"
                    v-model="form.quityear"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>

          <el-tab-pane :label="$t('label.PFANS2002FORMVIEW_MATERIAL')" name="second">
            <el-row>
              <el-col>
                <span
                  style="margin-left:0.5%;color:#005BAA"
                >{{$t('label.PFANS2002FORMVIEW_ONESELF')}}</span>
              </el-col>
            </el-row>
            <div style="margin-left:5%;margin-top:0%">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2002FORMVIEW_RESUME')">
                    <el-switch :disabled="disabled" v-model="form.resume"></el-switch>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2002FORMVIEW_IDENTITY')">
                    <el-switch :disabled="disabled" v-model="form.identity"></el-switch>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2002FORMVIEW_DIPLOMA')">
                    <el-switch :disabled="disabled" v-model="form.diploma"></el-switch>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2002FORMVIEW_EXPERIENCE')">
                    <el-switch :disabled="disabled" v-model="form.experience"></el-switch>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2002FORMVIEW_ENTRY')">
                    <el-switch :disabled="disabled" v-model="form.entry"></el-switch>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2002FORMVIEW_REPORT')">
                    <el-switch :disabled="disabled" v-model="form.report"></el-switch>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2002FORMVIEW_OTHER1')">
                    <el-switch :disabled="disabled" v-model="form.other1"></el-switch>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2002FORMVIEW_OTHER2')">
                    <el-switch :disabled="disabled" v-model="form.other2"></el-switch>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2002FORMVIEW_ENGLISH')" maxlength="10">
                    <el-input
                      :disabled="disabled"
                      class="width"
                      maxlength="10"
                      style="width:50%"
                      v-model="form.english"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2002FORMVIEW_JANPANESE')" maxlength="10">
                    <el-input
                      :disabled="disabled"
                      class="width"
                      maxlength="10"
                      style="width:50%"
                      v-model="form.janpanese"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <el-row>
              <el-col>
                <span style="margin-left:0.5%;color:#005BAA">{{$t('label.PFANS2002FORMVIEW_CLUB')}}</span>
              </el-col>
            </el-row>
            <div style="margin-left:5%;margin-top:0%">
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2002FORMVIEW_TICKET')">
                    <el-switch :disabled="disabled" v-model="form.ticket"></el-switch>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS2002FORMVIEW_HEALTH')">
                    <el-switch :disabled="disabled" v-model="form.health"></el-switch>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <el-row>
              <el-col>
                <span style="margin-left:0.5%;color:#005BAA">{{$t('label.enclosure')}}</span>
              </el-col>
            </el-row>
            <div style="margin-left:5%;margin-top:0%">
              <el-row :gutter="20">
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
              </el-row>
            </div>
          </el-tab-pane>
          <el-tab-pane
            :label="$t('label.PFANS2002FORMVIEW_INTERVIEW')"
            name="third"
            style="padding-top:10px;padding-left:10px"
          >
            <el-table
              :data="tableData"
              :summary-method="getAverage"
              border
              show-summary
              style="width: 60%;margin-left:15%"
            >
              <el-table-column
                :label="$t('label.PFANS2002FORMVIEW_INTERVIEWER')"
                align="center"
                fixed
                prop="interviewer"
              >
                <template slot-scope="scope">
                  <user
                    :disabled="disabled"
                    :no="scope.row"
                    :userlist="scope.row.interviewer"
                    @getUserids="getInterviewerids"
                    selectType="Single"
                    style="width:70%;margin-left:10%"
                  ></user>
                </template>
              </el-table-column>
              <el-table-column
                :label="$t('label.PFANS2002FORMVIEW_SCORE')"
                align="center"
                prop="score"
              >
                <template slot-scope="scope">
                  <el-input-number
                    :disabled="disabled"
                    :max="10"
                    :min="0"
                    :precision="1"
                    :step="0.1"
                    v-model="scope.row.score"
                  ></el-input-number>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.operation')" align="center" width="200">
                <template slot-scope="scope">
                  <el-button
                    :disabled="disabled"
                    @click.native.prevent="deleteRow(scope.$index, tableData)"
                    plain
                    size="small"
                    type="danger"
                  >{{$t('button.delete')}}</el-button>
                  <el-button
                    :disabled="disabled"
                    @click="addRow()"
                    plain
                    size="small"
                    type="primary"
                  >{{$t('button.insert')}}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>

          <el-tab-pane
            :label="$t('label.PFANS2002FORMVIEW_ATTACH')"
            name="fouth"
            style="padding-top:1%"
          >
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item :label="$t('label.center')" label-width="8.8rem">
                  <org
                    :disabled="disabled"
                    :orglist="form.center_id"
                    @getOrgids="getCenterId"
                    orgtype="1"
                    selectType="Single"
                    style="width:8rem"
                  ></org>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('label.group')" label-width="8.8rem">
                  <org
                    :disabled="disabled"
                    :orglist="form.group_id"
                    @getOrgids="getGroupId"
                    orgtype="2"
                    selectType="Single"
                    style="width:8rem"
                  ></org>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('label.team')" label-width="8.8rem">
                  <org
                    :disabled="disabled"
                    :orglist="form.team_id"
                    @getOrgids="getTeamId"
                    orgtype="3"
                    selectType="Single"
                    style="width:8rem"
                  ></org>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS2002FORMVIEW_LEVEL')" label-width="8rem">
                  <dicselect
                    :data="form.level"
                    :disabled="disabled"
                    @change="changeLevel"
                    class="width"
                    code="PR021"
                  ></dicselect>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS2002FORMVIEW_GIVING')" label-width="8rem">
                  <el-input-number
                    :disabled="disabled"
                    :max="1000000"
                    :min="0"
                    :precision="2"
                    :step="100"
                    class="width"
                    v-model="form.giving"
                  ></el-input-number>
                  <span style="margin-left:3%">{{$t('label.PFANS2002FORMVIEW_YUAN')}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS2002FORMVIEW_ADOPTION')" label-width="8rem">
                  <dicselect
                    :data="form.adoption"
                    :disabled="disabled"
                    @change="changeUsing"
                    class="width"
                    code="PR051"
                  ></dicselect>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="display">
                <el-form-item :label="$t('label.PFANS2002FORMVIEW_OTHERS')" label-width="8.8rem">
                  <user
                    :disabled="disabled"
                    :userlist="form.others"
                    @getUserids="getUserids"
                    selectType="Single"
                    style="width:9.2rem"
                  ></user>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </div>
  </EasyNormalContainer>
</template>

<script>
  import EasyNormalContainer from "@/components/EasyNormalContainer";
  import dicselect from "../../../components/dicselect";
  import user from "../../../components/user";
  import org from "../../../components/org";
  import {uploadUrl} from '@/utils/customize';
  import {Message} from 'element-ui';

  export default {
    name: "PFANS2002FormView",
    components: { EasyNormalContainer, dicselect, user, org },
    data() {
      return {
        loading: false,
        display: false,
        disbaled: false,
        num: 0,
        activeName: "first",
        sex_options: [
          { value: "1", label: this.$t("label.PFANS2002FORMVIEW_BOY") },
          {
            value: "2",
            label: this.$t("label.PFANS2002FORMVIEW_GRIL")
          }
        ],
        tableData: [
          {
            interviewer: "",
            score: 0
          }
        ],
        titles: "label.PFANS2002FORMVIEW",
        form: {
          name: "",
          sex: "",
          birthday: "",
          education: "",
          specialty: "",
          quityear: "",
          center_id: "",
          group_id: "",
          team_id: "",
          level: "",
          english: "",
          janpanese: "",
          other1: false,
          other2: false,
          resume: false,
          identity: false,
          diploma: false,
          experience: false,
          entry: false,
          report: false,
          ticket: false,
          health: false,
          interview: "",
          giving: "0",
          adoption: "",
          others: "",
          status: "0",
            uploadfile: '',
        },
          disable: false,
          buttonList: [],
          fileList: [],
          upload: uploadUrl(),
        rules: {
          name: [{ required: true, message: this.$t("normal.error_08") }],
          sex: [{ required: true, message: this.$t("normal.error_08") }],
          birthday: [{ required: true, message: this.$t("normal.error_08") }],
          education: [{ required: true, message: this.$t("normal.error_08") }],
          specialty: [{ required: true, message: this.$t("normal.error_08") }],
          quityear: [{ required: true, message: this.$t("normal.error_08") }]
        }
      };
    },

    created() {
      this.disabled = this.$route.params.disabled;
      if (!this.disabled) {
        this.buttonList = [
          {
            key: "save",
            name: "button.save",
            icon: "el-icon-check"
          }
        ];
      }
    },
    mounted() {
      if (this.$route.params._id) {
        this.getOne(this.$route.params._id);
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
    },

    methods: {
      changeOption(form, method) {
        let arr = [
          "other1",
          "other2",
          "resume",
          "identity",
          "diploma",
          "experience",
          "entry",
          "report",
          "ticket",
          "health"
        ];
        if (method === "save") {
          for (var i in form) {
            if (arr.includes(i)) {
              debugger
              form[i] = form[i] === true ? "0" : "1";
            }
          }
        } else if (method === "view") {
          for (var i in form) {
            if (i === "interview") {
              form[i] = JSON.parse(form[i]);
            }
            if (arr.includes(i)) {
              form[i] = form[i] === "0" ? true : false;
            }
          }
        }
      },
      getOne(id) {
        this.loading = true;
        this.$store
          .dispatch("PFANS2002Store/getOne", id)
          .then(response => {
            if (response) {
              this.form = response[0];
              this.changeOption(this.form, "view");
              this.tableData = this.form.interview;
              this.changeUsing(this.form.adoption);
              this.loading = false;
            }
          })
          .catch(error => {
            Message({
              message: error,
              type: "error",
              duration: 5 * 1000
            });
            this.loading = false;
          });
      },
      getInterviewerids(userlist, row) {
        row.interviewer = userlist;
      },
      getCenterId(val) {
        this.form.center_id = val;
      },
      getGroupId(val) {
        this.form.group_id = val;
      },
      getTeamId(val) {
        this.form.team_id = val;
      },
      getUserids(val) {
        this.form.others = val;
      },
      changeEducation(val) {
        this.form.education = val;
      },
      workflowState(val) {
        if (val.state === "1") {
          this.form.status = "3";
        } else if (val.state === "2") {
          this.form.status = "4";
        }
        this.buttonClick("update");
      },
      start() {
        this.form.status = "2";
        this.buttonClick("update");
      },
      end() {
        this.form.status = "0";
        this.buttonClick("update");
      },
      changeUsing(val) {
        if (val === "PR051004") {
          this.display = true;
        } else {
          this.display = false;
          this.form.others = "";
        }
        this.form.adoption = val;
      },
      changeLevel(val) {
        this.form.level = val;
      },
      getAverage(param) {
        this.form.interview = JSON.stringify(this.tableData);
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = this.$t("label.PFANS2002FORMVIEW_AVESCORE");
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          } else {
            sums[index] = "";
          }
        });

        let summaryvalue = sums[1] / param.data.length;
        sums[1] = Math.round(summaryvalue * 10) / 10;
        return sums;
      },

      deleteRow(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        } else {
          this.tableData[0].interviewer = "";
          this.tableData[0].score = 0;
        }
      },
      addRow() {
        this.tableData.push({
          interviewer: "",
          score: 0
        });
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
        this.$refs["form"].validate(valid => {
          if (valid) {
            this.loading = true;
            if (!this.$route.params._id) {
              this.changeOption(this.form, "save");
              this.$store
                .dispatch("PFANS2002Store/insert", this.form)
                .then(response => {
                  this.loading = false;
                  this.$message({
                    message: this.$t("normal.success_01"),
                    type: "success"
                  });
                  if (this.$store.getters.historyUrl) {
                    this.$router.push(this.$store.getters.historyUrl);
                  }
                })
                .catch(err => {
                  this.loading = false;
                  Message({
                    message: err,
                    type: "error",
                    duration: 5 * 1000
                  });
                });
            } else {
              debugger
              this.loading = true;
              this.changeOption(this.form, "save");
              this.$store
                .dispatch("PFANS2002Store/update", this.form)
                .then(response => {
                  this.loading = false;
                  this.$message({
                    message: this.$t("normal.success_02"),
                    type: "success"
                  });
                  if (val !== "update") {
                    if (this.$store.getters.historyUrl) {
                      this.$router.push(this.$store.getters.historyUrl);
                    }
                  }
                })
                .catch(err => {
                  this.loading = false;
                  Message({
                    message: err,
                    type: "error",
                    duration: 5 * 1000
                  });
                });
            }
          } else {
            this.activeName = "first";
          }
        });
      }
    }
  };
</script>

<style scoped>
  .width {
    width: 11rem;
  }
</style>
