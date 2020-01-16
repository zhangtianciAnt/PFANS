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
    <div slot="customize" style="margin-top:2vw">
      <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="form">
        <el-tabs v-model="activeName" type="border-card">
          <el-tab-pane
            :label="$t('label.PFANS2002FORMVIEW_ORGIN')"
            name="first"
            style="padding-top:1%"
          >
            <el-row>
              <el-col :span="8">
                <el-form-item
                  :label="$t('label.PFANS2002VIEW_NAME')"
                  prop="name"
                >
                  <el-input :disabled="disabled" class="width" maxlength="20" style="width:20vw" v-model="form.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('label.sex')" prop="sex">
                  <el-select
                    :disabled="disabled"
                    :placeholder="$t('normal.error_09')"
                    class="width"
                    v-model="form.sex"
                    style="width:20vw"
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
                  prop="birthday"
                >
                  <el-date-picker
                    :disabled="disabled"
                    :placeholder="$t('normal.error_09')"
                    class="width"
                    type="date"
                    style="width:20vw"
                    v-model="form.birthday"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
              <el-table
                :data="tableData3"
                style="width:46vw;margin-top:1%"
                border stripe
                header-cell-class-name="sub_bg_color_blue"
              >
                <el-table-column
                  :label="$t('label.PFANS2002VIEW_EDUCATION')"
                  prop="education"
                  align="center"
                >
                  <template slot-scope="scope">
                    <dicselect
                      :data="scope.row.education"
                      :disabled="disabled"
                      @change="((val)=>{changeEducation(val,scope.$index)})"
                      class="width"
                      code="PR022"
                      style="width:100%"
                    ></dicselect>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('label.PFANS2002FORMVIEW_SPECIALTY')"
                  prop="specialty"
                  align="center"
                >
                  <template slot-scope="scope">
                    <el-input :disabled="disabled" class="width" v-model="scope.row.specialty" maxlength="20" style="width:100%"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('label.PFANS2002FORMVIEW_QUITYEAR')"
                  prop="quityear"
                  align="center">
                  <template slot-scope="scope">
                    <el-date-picker
                      :disabled="disabled"
                      :placeholder="$t('normal.error_09')"
                      class="width"
                      type="date"
                      style="width:100%"
                      v-model="scope.row.quityear"
                    ></el-date-picker>
                  </template>
                </el-table-column>
              </el-table>
              </el-col>
            </el-row>
          </el-tab-pane>
          <!--第二个tab-->
          <el-tab-pane :label="$t('label.PFANS2002FORMVIEW_MATERIAL')" name="second">
            <el-collapse>
              <el-collapse-item>
                <template slot="title">
                <span
                  class="collapse_Title"
                  style="margin-left:0.5%;color:#005BAA"
                >{{$t('label.PFANS2002FORMVIEW_ONESELF')}}</span>
                </template>
                <div style="margin-left:5%;margin-top:0%">
                  <el-row>
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

                  <el-row>
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

                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2002FORMVIEW_OTHER1_1')">
                        <el-switch :disabled="disabled" v-model="form.other1"></el-switch>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2002FORMVIEW_OTHER2_1')">
                        <el-switch :disabled="disabled" v-model="form.other2"></el-switch>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2002FORMVIEW_ENGLISH')" maxlength="10">
                        <dicselect
                          :data="form.english"
                          :disabled="disabled"
                          @change="changeEnglish"
                          class="width"
                          code="PR053"
                          style="width:20vw"
                        ></dicselect>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        :label="$t('label.PFANS2002FORMVIEW_ENGLISHDETAIL')"
                        prop="english_detail"
                        v-show="english_show"
                      >
                        <el-input :disabled="disabled" class="width" maxlength="20" style="width:20vw" v-model="form.english_detail"></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS2002FORMVIEW_JANPANESE')" maxlength="10">
                        <dicselect
                          :data="form.janpanese"
                          :disabled="disabled"
                          @change="changeJanpanese"
                          class="width"
                          code="PR054"
                          style="width:20vw"
                        ></dicselect>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        :label="$t('label.PFANS2002FORMVIEW_JANPANESEDETAIL')"
                        prop="janpanese_detail"
                        v-show="janpanese_show"
                      >
                        <el-input :disabled="disabled" class="width" maxlength="20" style="width:20vw" v-model="form.janpanese_detail"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col>
                      <!--手动说明备注项-->
                      <el-form-item :label="$t('label.PFANS2002FORMVIEW_REMARK')">
                        <el-input type="textarea" v-model="form.remark"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </el-collapse-item>
              <el-collapse-item>
                <template slot="title">
                  <span class="collapse_Title" style="margin-left:0.5%;color:#005BAA">{{$t('label.PFANS2002FORMVIEW_CLUB')}}</span>
                </template>
                <div style="margin-left:5%;margin-top:0%">
                  <el-row>
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
              </el-collapse-item>
              <el-collapse-item>
                <template slot="title">
                  <span class="collapse_Title" style="margin-left:0.5%;color:#005BAA">{{$t('label.enclosure')}}</span>
                </template>
                <div style="margin-left:5%;margin-top:1%">
                  <el-row>
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
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
          <el-tab-pane
            :label="$t('label.PFANS2002FORMVIEW_INTERVIEW')"
            name="third"
            style="padding-top:10px;padding-left:10px"
          >
            <el-row >
              <el-col :span="24">
            <el-table
              :data="tableData"
              :summary-method="getAverage"
              border stripe
              show-summary
              style="width:46vw"
              header-cell-class-name="sub_bg_color_blue"
            >
              <el-table-column
                :label="$t('label.PFANS2002FORMVIEW_INTERVIEWER')"
                align="center"
                prop="interviewer"
              >
                <template slot-scope="scope">
                  <user
                    :disabled="disabled"
                    :no="scope.row"
                    :userlist="scope.row.interviewer"
                    @getUserids="getInterviewerids"
                    selectType="Single"
                    style="width:100%"
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
                    style="width:100%"
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
                  >{{$t('button.delete')}}
                  </el-button>
                  <el-button
                    :disabled="disabled"
                    @click="addRow()"
                    plain
                    size="small"
                    type="primary"
                  >{{$t('button.insert')}}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
              </el-col>
            </el-row>
          </el-tab-pane>

          <el-tab-pane
            :label="$t('label.PFANS2002FORMVIEW_ATTACH')"
            name="fouth"
            style="padding-top:1%"
          >
            <el-row>
              <el-col :span="8">
                <el-form-item :label="$t('label.center')" >
                  <org
                    :disabled="disabled"
                    :orglist="form.center_id"
                    @getOrgids="getCenterId"
                    orgtype="1"
                    selectType="Single"
                    style="width:20vw"
                  ></org>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('label.group')" >
                  <org
                    :disabled="disabled"
                    :orglist="form.group_id"
                    @getOrgids="getGroupId"
                    orgtype="2"
                    selectType="Single"
                    style="width:20vw"
                  ></org>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('label.team')" >
                  <org
                    :disabled="disabled"
                    :orglist="form.team_id"
                    @getOrgids="getTeamId"
                    orgtype="3"
                    selectType="Single"
                    style="width:20vw"
                  ></org>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS2002FORMVIEW_LEVEL')">
                  <dicselect
                    :data="form.level"
                    :disabled="disabled"
                    @change="changeLevel"
                    class="width"
                    code="PR021"
                    style="width:20vw"
                  ></dicselect>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS2002FORMVIEW_GIVING')" >
                  <el-input-number
                    :disabled="disabled"
                    :max="1000000"
                    :min="0"
                    :precision="2"
                    :step="100"
                    class="width"
                    style="width:20vw"
                    v-model="form.giving"
                  ></el-input-number>
                  <span style="margin-left:3%">{{$t('label.PFANS2002FORMVIEW_YUAN')}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <!--採用ルート-->
            <el-row>
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS2002FORMVIEW_ADOPTION')" >
                  <dicselect
                    :data="form.adoption"
                    :disabled="disabled"
                    @change="changeUsing"
                    class="width"
                    code="PR051"
                    style="width:20vw"
                  ></dicselect>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  :label="$t('label.PFANS2002FORMVIEW_OTHER3')"
                  prop="other3"
                  v-show="other3_show"
                >
                  <el-input :disabled="disabled" class="width" maxlength="20" style="width:20vw" v-model="form.other3"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="display">
                <el-form-item :label="$t('label.PFANS2002FORMVIEW_OTHERS')">
                  <user
                    :disabled="disabled"
                    :userlist="form.others"
                    @getUserids="getUserids"
                    selectType="Single"
                    style="width:20vw"
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
    import {uploadUrl} from '../../../../utils/customize';
    import {Message} from 'element-ui';

    export default {
        name: "PFANS2002FormView",
        components: {EasyNormalContainer, dicselect, user, org},
        data() {
            return {
                loading: false,
                display: false,
                disabled: false,
                english_show: false,
                janpanese_show: false,
                other3_show: false,
                num: 0,
                activeName: "first",
                sex_options: [
                    {value: "1", label: this.$t("label.PFANS2002FORMVIEW_BOY")},
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
                tableData3: [
                    {
                        education: "",
                        specialty: "",
                        quityear: "",
                    },
                    {
                        education: "",
                        specialty: "",
                        quityear: "",
                    },
                    {
                        education: "",
                        specialty: "",
                        quityear: "",
                    }
                ],
                form: {
                    entry_enclosure: "",
                    name: "",
                    sex: "",
                    birthday: "",

                    education1: "",
                    specialty1: "",
                    quityear1: "",
                    education2: "",
                    specialty2: "",
                    quityear2: "",
                    education3: "",
                    specialty3: "",
                    quityear3: "",

                    remark: "",
                    center_id: "",
                    group_id: "",
                    team_id: "",
                    level: "",
                    english: "",
                    english_detail: "",
                    janpanese: "",
                    janpanese_detail: "",
                    other1: false,
                    other2: false,
                    other3: "",
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
                    status: "0"
                },
                disable: false,
                buttonList: [],
                fileList: [],
                upload: uploadUrl(),
                rules: {
                    name: [{required: true, message: this.$t("normal.error_08")}],
                    sex: [{required: true, message: this.$t("normal.error_08")}],
                    birthday: [{required: true, message: this.$t("normal.error_08")}],
                    education: [{required: true, message: this.$t("normal.error_08")}],
                    specialty: [{required: true, message: this.$t("normal.error_08")}],
                    quityear: [{required: true, message: this.$t("normal.error_08")}]
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
        },

        methods: {
            changeEnglish(val){
                if(val === 'PR053004'){
                    this.form.english = val
                    this.english_show = true
                }else{
                    this.form.english = val
                    this.english_show = false
                }
            },
            changeJanpanese(val){
                if(val === 'PR054005'){
                    this.form.janpanese = val
                    this.janpanese_show = true
                }else{
                    this.form.janpanese = val
                    this.janpanese_show = false
                }
            },
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
                        console.log(response[0]);
                        if (response) {
                            this.form = response[0];
                            this.changeOption(this.form, "view");
                            this.tableData = this.form.interview;
                            this.tableData3[0].education=response[0].education1;
                            this.tableData3[0].specialty=response[0].specialty1;
                            this.tableData3[0].quityear=response[0].quityear1;
                            this.tableData3[1].education=response[0].education2;
                            this.tableData3[1].specialty=response[0].specialty2;
                            this.tableData3[1].quityear=response[0].quityear2;
                            this.tableData3[2].education=response[0].education3;
                            this.tableData3[2].specialty=response[0].specialty3;
                            this.tableData3[2].quityear=response[0].quityear3;
                            this.changeUsing(this.form.adoption);
                            if (this.form.entry_enclosure != "") {
                                let uploadfile = this.form.entry_enclosure.split(";");
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
            changeEducation(val,index) {
                this.tableData3[index].education = val;
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
                if(val === "PR051005"){
                    this.other3_show = true
                }else{
                    this.other3_show = false
                }
            },
            changeLevel(val) {
                this.form.level = val;
            },
            getAverage(param) {
                this.form.interview = JSON.stringify(this.tableData);
                const {columns, data} = param;
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
                sums[1] = Math.round(sums[1] / param.data.length * 100) / 100;
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
            fileError(err, file, fileList) {
                Message({
                    message: this.$t("normal.error_04"),
                    type: 'error',
                    duration: 5 * 1000
                });
            },
            fileRemove(file, fileList) {
                this.fileList = [];
                this.form.entry_enclosure = "";
                for (var item of fileList) {
                    let o = {};
                    o.name = item.name;
                    o.url = item.url;
                    this.fileList.push(o);
                    this.form.entry_enclosure += item.name + "," + item.url + ";"
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
                this.form.entry_enclosure = "";
                for (var item of fileList) {
                    let o = {};
                    o.name = item.name;
                    if (!item.url) {
                        o.url = item.response.info;
                    } else {
                        o.url = item.url;
                    }
                    this.fileList.push(o);
                    this.form.entry_enclosure += o.name + "," + o.url + ";"
                }
            },

            buttonClick(val) {
                this.$refs["form"].validate(valid => {
                    if (valid) {
                        this.loading = true;
                        if (!this.$route.params._id) {
                            this.changeOption(this.form, "save");
                            this.form.education1 = this.tableData3[0].education;
                            this.form.quityear1 = this.tableData3[0].quityear;
                            this.form.specialty1 = this.tableData3[0].specialty;

                            this.form.education2 = this.tableData3[1].education;
                            this.form.quityear2 = this.tableData3[1].quityear;
                            this.form.specialty2 = this.tableData3[1].specialty;

                            this.form.education3 = this.tableData3[2].education;
                            this.form.quityear3 = this.tableData3[2].quityear;
                            this.form.specialty3 = this.tableData3[2].specialty;

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
    width: 11vw;
  }
</style>
