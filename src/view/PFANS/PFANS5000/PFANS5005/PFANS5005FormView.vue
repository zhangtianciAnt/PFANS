<template>
  <div>
    <EasyNormalContainer
      :buttonList="buttonList"
      :title="title"
      @buttonClick="buttonClick"
      @end="end"
      @start="start"
      @workflowState="workflowState"
      ref="container"
      v-loading="loading"
    >
      <div slot="customize">
        <el-form
          :model="form"
          :rules="rules"
          label-position="top"
          label-width="8vw"
          ref="reff"
          style="padding: 2vw"
        >
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane :label="$t('label.PFANS5004VIEW_CLOSEAPPLICAT')" name="first">
              <div>
                <el-collapse>
                  <el-collapse-item>
                    <template slot="title">
                      <span class="collapse_Title">{{$t('label.PFANS5004VIEW_CLOSEAPPLICAT')}}</span>
                    </template>
                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS5004VIEW_PROJECTNAMW')">
                          <el-input :disabled="true" style="width:20vw" v-model="form.project_name"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS5001FORMVIEW_PROJECTTYPE')">
                          <dicselect
                            :code="code2"
                            :data="form.projecttype"
                            :disabled="true"
                            :multiple="multiple"
                            style="width: 20vw"
                          ></dicselect>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS5001FORMVIEW_FIELD')">
                          <dicselect
                            :code="code3"
                            :data="form.field"
                            :disabled="true"
                            :multiple="multiple"
                            style="width: 20vw"
                          ></dicselect>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS5001FORMVIEW_MANAGERID')">
                          <!--<el-input :disabled="true" style="width:20vw" v-model="form.managerid"></el-input>-->
                          <user
                            :disabled="true"
                            :error="errorManager"
                            :userlist="userlist"
                            @getUserids="getUserids"
                            style="width: 20vw"
                          ></user>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS5001FORMVIEW_STARTDATE')" prop="startdate">
                          <el-date-picker
                            :disabled="true"
                            style="width: 20vw"
                            type="date"
                            v-model="form.startdate"
                          ></el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS5001FORMVIEW_ENDDATE')" prop="enddate">
                          <el-date-picker
                            :disabled="true"
                            style="width: 20vw"
                            type="date"
                            v-model="form.enddate"
                          ></el-date-picker>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-collapse-item>
                </el-collapse>
                <el-collapse>
                  <el-collapse-item>
                    <template slot="title">
                      <span class="collapse_Title">{{$t('label.PFANS5004VIEW_RESULT')}}</span>
                    </template>
                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS5004VIEW_ASSETADDRESS')" prop="assetaddress">
                          <el-input :disabled="!disable" style="width:72vw" type="textarea"
                                    v-model="form.assetaddress"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANSUSERFORMVIEW_EXPLAIN')">
                          <el-input :disabled="!disable" style="width:72vw" type="textarea"
                                    v-model="form.instructions"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS5004VIEW_EXPRENCE')">
                          <el-input :disabled="!disable" style="width:72vw" type="textarea"
                                    v-model="form.exprence"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS5004VIEW_ADVISE')">
                          <el-input :disabled="!disable" style="width:72vw" type="textarea"
                                    v-model="form.advise"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.remarks')">
                          <el-input :disabled="!disable" style="width:72vw" type="textarea"
                                    v-model="form.note"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS5004VIEW_MESSAGE')">
                          <el-input :disabled="!disable" style="width:72vw" type="textarea"
                                    v-model="form.message"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.PFANS5004VIEW_UPLOADFILE')">
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
                            <div class="el-upload__text">
                              {{$t('label.enclosurecontent')}}<em>{{$t('normal.info_09')}}</em></div>
                          </el-upload>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-collapse-item>
                </el-collapse>
              </div>
            </el-tab-pane>

            <el-tab-pane :label="$t('label.PFANS5004VIEW_PROJECTSECORE')" name="second">
              <el-table :data="source"
                        border
                        header-cell-class-name="sub_bg_color_blue" stripe>
                <el-table-column :label="$t('label.PFANS5001FORMVIEW_NUMBERS')" align="center" width="100">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" maxlength="20" v-model="scope.row.number"></el-input>
                  </template>
                </el-table-column>
                <!--姓名-->
                <el-table-column :label="$t('label.user_name')" align="center" width="100">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" maxlength="20" v-model="scope.row.name"></el-input>
                  </template>
                </el-table-column>
                <!--社员外协-->
                <el-table-column :label="$t('label.PFANS5004VIEW_COMMUNE')" align="center" width="100">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" maxlength="20" v-model="scope.row.commune"></el-input>
                  </template>
                  <!--稼働率-->
                </el-table-column>
                <el-table-column :label="$t('label.PFANS5004VIEW_CROPRATE')" align="center" width="100">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" maxlength="20" v-model="scope.row.croprate"></el-input>
                  </template>
                </el-table-column>
                <!--PJ稼働率-->
                <el-table-column :label="$t('label.PFANS5004VIEW_PJCROPRATE')" align="center" width="100">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" maxlength="20" v-model="scope.row.pjcroprate"></el-input>
                  </template>
                </el-table-column>
                <!--直接稼働率-->
                <el-table-column :label="$t('label.PFANS5004VIEW_DICROPRATE')" align="center" width="100">
                  <template slot-scope="scope">
                    <el-input :disabled="!disable" maxlength="20" v-model="scope.row.dicroprate"></el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>


            <!--<el-tab-pane :label="$t('label.PFANS5004VIEW_STAGENEWS')" name="third"  >-->
            <!--<el-table :data="stage"-->
            <!--header-cell-class-name="sub_bg_color_blue"-->
            <!--show-summary stripe border style="width: 70vw">-->
            <!--&lt;!&ndash;工作阶段&ndash;&gt;-->
            <!--<el-table-column :label="$t('label.PFANS5004VIEW_WORKSTAGE')" align="center" width="150">-->
            <!--<template slot-scope="scope">-->
            <!--<dicselect :code="code1"-->
            <!--:data="scope.row.workstage"-->
            <!--:disabled="!disable"-->
            <!--:multiple="multiple"-->
            <!--:no="scope.row"-->
            <!--@change="getworkstage" style="width: 100%">-->
            <!--</dicselect>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <!--&lt;!&ndash;阶段成果物&ndash;&gt;-->
            <!--<el-table-column :label="$t('label.PFANS5004VIEW_STAGETHING')" align="center" width="150">-->
            <!--<template slot-scope="scope">-->
            <!--<dicselect :code="code2"-->
            <!--:data="scope.row.stagething"-->
            <!--:disabled="!disable"-->
            <!--:multiple="multiple"-->
            <!--:no="scope.row"-->
            <!--@change="setstagething"-->
            <!--style="width: 100%" v-show="scope.row.showrow1">-->
            <!--</dicselect>-->
            <!--<dicselect :code="code3"-->
            <!--:data="scope.row.stagething"-->
            <!--:disabled="!disable"-->
            <!--:multiple="multiple"-->
            <!--:no="scope.row"-->
            <!--@change="setstagething"-->
            <!--style="width: 100%" v-show="scope.row.showrow2">-->
            <!--</dicselect>-->
            <!--<dicselect :code="code4"-->
            <!--:data="scope.row.stagething"-->
            <!--:disabled="!disable"-->
            <!--:multiple="multiple"-->
            <!--:no="scope.row"-->
            <!--@change="setstagething"-->
            <!--style="width: 100%" v-show="scope.row.showrow3">-->
            <!--</dicselect>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <!--&lt;!&ndash;预计工数（人月）&ndash;&gt;-->
            <!--<el-table-column :label="$t('label.PFANS5004VIEW_PREDICTNUKMBER')" align="center" width="150">-->
            <!--<template slot-scope="scope">-->
            <!--<el-input :disabled="!disable" maxlength="20"  v-model="scope.row.commune"></el-input>-->
            <!--</template>-->
            <!--&lt;!&ndash;起止时间&ndash;&gt;-->
            <!--</el-table-column> <el-table-column :label="$t('label.PFANS5004VIEW_DATETIME2')" align="center" width="150">-->
            <!--<template slot-scope="scope">-->
            <!--<el-input :disabled="!disable" maxlength="20"  v-model="scope.row.stdatetime"></el-input>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <!--&lt;!&ndash;备注&ndash;&gt;-->
            <!--<el-table-column :label="$t('label.PFANS5004VIEW_NOTE')" align="center" width="150">-->
            <!--<template slot-scope="scope">-->
            <!--<el-input :disabled="!disable" maxlength="20"  v-model="scope.row.note1"></el-input>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <!--&lt;!&ndash;完成时间&ndash;&gt;-->
            <!--<el-table-column :label="$t('label.PFANS5004VIEW_FINSHTIME')" align="center" width="150">-->
            <!--<template slot-scope="scope">-->
            <!--<el-input :disabled="!disable" maxlength="20"  v-model="scope.row.finshtime"></el-input>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <!--</el-table>-->

            <!--</el-tab-pane>-->

            <el-tab-pane :label="$t('label.PFANS5004VIEW_STAGENEWS')" name="third">
              <el-form-item>
                <el-row>
                  <el-col :span="24">
                    <el-table :data="stage" border header-cell-class-name="sub_bg_color_blue" stripe
                              style="width: 70vw">
                      <el-table-column :label="$t('label.PFANS5009FORMVIEW_PHASE')" align="center">
                        <template slot-scope="scope">
                          <dicselect
                            :code="code1"
                            :data="scope.row.phase"
                            :disabled="!disable"
                            :multiple="multiple"
                            :no="scope.row"
                          ></dicselect>
                        </template>
                      </el-table-column>
                      <el-table-column
                        :label="$t('label.PFANS5009FORMVIEW_STAGEPRODUCT')"
                        align="center"
                      >
                        <template slot-scope="scope">
                          <dicselect
                            :code="code5"
                            :data="scope.row.stageproduct"
                            :disabled="!disable"
                            :multiple="multiple"
                            :no="scope.row"
                          ></dicselect>
                        </template>
                      </el-table-column>
                      <el-table-column
                        :label="$t('label.PFANS5009FORMVIEW_ESTIMATEDWORK')"
                        align="center">
                        <template slot-scope="scope">
                          <el-input
                            :disabled="!disable"
                            :no="scope.row"
                            style="width: 100%"
                            v-model="scope.row.estimatedwork">
                          </el-input>
                        </template>
                      </el-table-column>
                      <el-table-column
                        :label="$t('label.PFANS5009FORMVIEW_ESTIMATEDSTARTTIME')"
                        align="center"
                        width="160vm"
                      >
                        <template slot-scope="scope">
                          <el-date-picker
                            :disabled="!disable"
                            style="width: 100%"
                            type="date"
                            v-model="scope.row.estimatedstarttime"
                          ></el-date-picker>
                        </template>
                      </el-table-column>

                      <el-table-column
                        :label="$t('label.PFANS5009FORMVIEW_ESTIMATEDENDTIME')"
                        align="center"
                        width="160vm"
                      >
                        <template slot-scope="scope">
                          <el-date-picker
                            :disabled="!disable"
                            style="width: 100%"
                            type="date"
                            v-model="scope.row.estimatedendtime"
                          >
                          </el-date-picker>
                        </template>
                      </el-table-column>
                      <el-table-column
                        :label="$t('label.PFANS5009FORMVIEW_REMARKS')"
                        align="center">
                        <template slot-scope="scope">
                          <el-input
                            :disabled="!disable"
                            :no="scope.row"
                            style="width: 100%"
                            v-model="scope.row.remarks">
                          </el-input>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>
<script>
  import EasyNormalContainer from "@/components/EasyNormalContainer";
  import dicselect from "../../../components/dicselect.vue";
  import { uploadUrl } from "@/utils/customize";
  import {getUserInfo} from '@/utils/customize'
  import { Message } from "element-ui";
  import user from "../../../components/user.vue";
  import {getOrgInfoByUserId} from '@/utils/customize';
  import org from "../../../components/org";

  export default {
    name: "PFANS5005FormView",
    components: {
      dicselect,
      EasyNormalContainer,
      getOrgInfoByUserId,
      user,
      org
    },
    data() {
      return {
        disabled: true,
        activeName: "first",
        errorManager: "",
        userlist:"",
        buttonList: [  {
          key: "save",
          name: "button.save"
        }],
        source: [{
          projectsecoreid: '',
          closeapplicatid: '',
          number: '',
          name: '',
          commune: '',
          croprate: '',
          pjcroprate: '',
          dicroprate: '',
          rowindex: "",
        }],
        stage: [{
          stageinformation_id: "",
          companyprojects_id: "",
          phase: "",
          stageproduct: "",
          estimatedwork: "",
          estimatedstarttime: "",
          estimatedendtime: "",
          remarks: ''
        }],
        data: [],
        loading: false,
        title: "title.PFANS5005VIEW",
        rules: {
          assetaddress: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS5004VIEW_ASSETADDRESS'),
            trigger: 'blur',
          }]
        },
        baseInfo: {},
        form: {
          project_name: "",
          managerid: "",
          projecttype: "",
          field: "",
          startdate: "",
          enddate: "",
          assetaddress: '',
          instructions: '',
          exprence: '',
          advise: '',
          note: '',
          message: '',
          uploadfile: '',

        },
        code1: 'PP012',
        code2: "PP001",
        code3: "PP002",
        code5: 'PP013',
        code6: 'PP014',
        code4: 'PP015',
        multiple: false,
        showrow1: true,
        showrow2: false,
        showrow3: false,
        canStart: false,
        fileList: [],
        upload: uploadUrl()
      };
    },
    mounted() {
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch("PFANS5001Store/selectById", {companyprojectsid: this.$route.params._id})
          .then(response => {
            this.form = response.companyprojects;
            this.userlist = this.form.managerid;
            /*项目资源*/
            if (response.projectsystem.length > 0) {
              this.source = response.projectsystem;
            }
            /*阶段信息*/
            if (response.stageinformation.length > 0) {
              this.stage = response.stageinformation;
            }
            if(this.form.uploadfile != null){
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
            this.loading = false;
          })
          .catch(error => {
            Message({
              message: error,
              type: "error",
              duration: 5 * 1000
            });

            this.loading = false;
          });
      }
    },
    created() {
      if (!this.$route.params.disabled) {
        this.buttonList = [];
      }
      this.disable = this.$route.params.disabled;
    },
    methods: {
      getUserids(val) {
        this.userlist = val;
        this.form.managerid = val;
        if (
          !this.form.managerid ||
          this.form.managerid === "" ||
          val === "undefined"
        ) {
          this.errorManager =
            this.$t("normal.error_08") +
            this.$t("label.PFANS5001FORMVIEW_MANAGERID");
        } else {
          this.errorManager = "";
        }
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
      fileError(err, file, fileList) {
        Message({
          message: this.$t("normal.error_04"),
          type: "error",
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
          this.form.uploadfile += item.name + "," + item.url + ";";
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
          this.form.uploadfile += o.name + "," + o.url + ";";
        }
      },
      buttonClick(val) {
        this.$refs["reff"].validate(valid => {
          if (valid) {
            this.loading = true;
            this.baseInfo = {};
            this.baseInfo.companyprojects = JSON.parse(JSON.stringify(this.form));
            if (this.$route.params._id) {
              this.baseInfo.companyprojects.companyprojects_id = this.$route.params._id;
              this.$store
                .dispatch("PFANS5001Store/update", this.baseInfo)
                .then(response => {
                  this.data = response;
                  this.loading = false;
                  if (val !== "update") {
                    Message({
                      message: this.$t("normal.success_02"),
                      type: "success",
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
                    type: "error",
                    duration: 5 * 1000
                  });
                  this.loading = false;
                });
            }
          }
        });
      }
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss">
  .el-table {
    overflow-x: auto;
  }

  .el-table__header-wrapper,
  .el-table__body-wrapper,
  .el-table__footer-wrapper {
    overflow: visible;
  }

  .el-table::after {
    position: relative;
  }

  .el-table--scrollable-x .el-table__body-wrapper {
    overflow: visible;
  }
</style>

