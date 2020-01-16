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
            <el-tab-pane :label="$t('label.PFANS5001FORMVIEW_COMPANYPROJECTS')" name="first">
              <div>
                <el-form
                  :model="form"
                  :rules="rules"
                  label-position="top"
                  label-width="8vw"
                  ref="from1"
                >
                  <el-row>
                    <el-col :span="8">
                      <el-form-item
                        :label="$t('label.PFANS5001FORMVIEW_PROJECT_NAME')"
                        prop="project_name"
                      >
                        <el-input
                          :disabled="!disable"
                          maxlength="50"
                          style="width: 20vw"
                          v-model="form.project_name"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        :label="$t('label.PFANS5001FORMVIEW_PROJECT_NAMEJP')"
                        prop="project_namejp"
                      >
                        <el-input
                          :disabled="!disable"
                          maxlength="50"
                          style="width: 20vw"
                          v-model="form.project_namejp"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5001FORMVIEW_NUMBERS')" prop="numbers">
                        <el-input
                          :disabled="!disable"
                          maxlength="20"
                          style="width: 20vw"
                          v-model="form.numbers"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item
                        :label="$t('label.PFANS5001FORMVIEW_DEPARTMENTID')"
                        prop="departmentid"
                      >
                        <dicselect
                          :code="code"
                          :data="form.departmentid"
                          :disabled="!disable"
                          :multiple="multiple"
                          style="width: 20vw"
                          @change="getdepartmentid"
                        ></dicselect>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        :error="errorLeader"
                        :label="$t('label.PFANS5001FORMVIEW_LEADERID')"
                        prop="leaderid"
                      >
                        <user
                          :disabled="!disable"
                          :error="errorLeader"
                          :selectType="selectType"
                          :userlist="userlist"
                          @getUserids="getUserids"
                          style="width: 20vw"
                        ></user>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        :error="errorManager"
                        :label="$t('label.PFANS5001FORMVIEW_MANAGERID')"
                        prop="managerid"
                      >
                        <user
                          :disabled="!disable"
                          :error="errorManager"
                          :selectType="selectType"
                          :userlist="userlist1"
                          @getUserids="getUserids1"
                          style="width: 20vw"
                        ></user>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item
                        :label="$t('label.PFANS5001FORMVIEW_PROJECTTYPE')"
                        prop="projecttype"
                      >
                        <dicselect
                          :code="code1"
                          :data="form.projecttype"
                          :disabled="!disable"
                          :multiple="multiple"
                          style="width: 20vw"
                          @change="getprojecttype"
                        ></dicselect>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        :label="$t('label.PFANS5001FORMVIEW_FIELD')"
                        prop="field"
                      >
                        <dicselect
                          :code="code2"
                          :data="form.field"
                          :disabled="!disable"
                          :multiple="multiple"
                          style="width: 20vw"
                          @change="getfield"
                        ></dicselect>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        :label="$t('label.PFANS5001FORMVIEW_TECHNOLOGICAL')"
                        prop="technological"
                      >
                        <dicselect
                          :code="code3"
                          :data="form.technological"
                          :disabled="!disable"
                          :multiple="multiple"
                          style="width: 20vw"
                          @change="gettechnological"
                        ></dicselect>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item
                        :label="$t('label.PFANS5001FORMVIEW_STARTDATE')"
                        prop="startdate"
                      >
                        <el-date-picker
                          :disabled="!disable"
                          style="width: 20vw"
                          type="date"
                          v-model="form.startdate"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5001FORMVIEW_ENDDATE')" prop="enddate">
                        <el-date-picker
                          :disabled="!disable"
                          style="width: 20vw"
                          type="date"
                          v-model="form.enddate"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5001FORMVIEW_MANMONTH')" prop="manmonth">
                        <el-input-number
                          :disabled="!disable"
                          :max="1000000000"
                          :min="0"
                          :precision="2"
                          controls-position="right"
                          style="width: 20vw"
                          v-model="form.manmonth"
                        ></el-input-number>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5001FORMVIEW_COST')" prop="cost">
                        <el-input-number
                          :disabled="!disable"
                          :max="1000000000"
                          :min="0"
                          :precision="2"
                          controls-position="right"
                          style="width: 20vw"
                          v-model="form.cost"
                        ></el-input-number>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        :label="$t('label.PFANS5001FORMVIEW_SALESVOLUME')"
                        prop="salesvolume"
                      >
                        <el-input-number
                          :disabled="!disable"
                          :max="1000000000"
                          :min="0"
                          :precision="2"
                          controls-position="right"
                          style="width: 20vw"
                          v-model="form.salesvolume"
                        ></el-input-number>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="8">
                      <el-form-item
                        :label="$t('label.PFANS5001FORMVIEW_PROJECTALABEL')"
                        prop="projectalabel"
                      >
                        <el-input
                          :disabled="!disable"
                          maxlength="20"
                          style="width: 20vw"
                          v-model="form.projectalabel"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5001FORMVIEW_LANGUAGE')" prop="language">
                        <el-input
                          :disabled="!disable"
                          maxlength="20"
                          style="width: 20vw"
                          v-model="form.language"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item
                        :label="$t('label.PFANS5001FORMVIEW_SITUATION')"
                        prop="situation"
                      >
                        <dicselect
                          :code="code4"
                          :data="form.situation"
                          :disabled="!disable"
                          :multiple="multiple"
                          style="width: 20vw"
                          @change="getsituation"
                        ></dicselect>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        :label="$t('label.PFANS5001FORMVIEW_CONFIDENTIAL')"
                        prop="confidential"
                      >
                        <dicselect
                          :code="code5"
                          :data="form.confidential"
                          :disabled="!disable"
                          :multiple="multiple"
                          style="width: 20vw"
                          @change="getconfidential"
                        ></dicselect>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item
                        :label="$t('label.PFANS5001FORMVIEW_MANAGEMENTTOOL')"
                        prop="managementtool"
                      >
                        <dicselect
                          :code="code6"
                          :data="form.managementtool"
                          :disabled="!disable"
                          :multiple="multiple"
                          style="width: 70vw"
                          @change="getmanagementtool"
                        ></dicselect>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item
                        :label="$t('label.PFANS5001FORMVIEW_CUSTOMERNAME')"
                        prop="customername"
                      >
                        <dicselect
                          :code="code7"
                          :data="form.customername"
                          :disabled="!disable"
                          :multiple="multiple"
                          style="width: 20vw"
                          @change="getcustomername"
                        ></dicselect>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item
                        :label="$t('label.PFANS5001FORMVIEW_REPRESENTATIVE')"
                        prop="representative"
                      >
                        <el-input
                          :disabled="!disable"
                          maxlength="20"
                          style="width: 20vw"
                          v-model="form.representative"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item
                        :label="$t('label.PFANS5001FORMVIEW_BASICSITUATION')"
                        prop="basicsituation"
                      >
                        <el-input
                          :autosize="{ minRows: 3, maxRows: 4}"
                          :disabled="!disable"
                          style="width: 70vw"
                          type="textarea"
                          v-model="form.basicsituation"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item
                        :label="$t('label.PFANS5001FORMVIEW_BRIEFINTRODUCTION')"
                        prop="briefintroduction"
                      >
                        <el-input
                          :autosize="{ minRows: 3, maxRows: 4}"
                          :disabled="!disable"
                          style="width: 70vw"
                          type="textarea"
                          v-model="form.briefintroduction"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item
                        :label="$t('label.PFANS5001FORMVIEW_REQUIREMENT')"
                        prop="requirement"
                      >
                        <el-input
                          :autosize="{ minRows: 3, maxRows: 4}"
                          :disabled="!disable"
                          style="width: 70vw"
                          type="textarea"
                          v-model="form.requirement"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.enclosure')">
                        <el-upload
                          v-model="form.uploadfile"
                          :action="upload"
                          :file-list="fileList"
                          :on-remove="fileRemove"
                          :on-preview="fileDownload"
                          :on-success="fileSuccess"
                          :on-error="fileError"
                          class="upload-demo"
                          drag
                          ref="upload"
                        >
                          <i class="el-icon-upload"></i>
                          <div class="el-upload__text">
                            {{$t('label.enclosurecontent')}}
                            <em>{{$t('normal.info_09')}}</em>
                          </div>
                        </el-upload>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS5001FORMVIEW_TASKPLAN')" name="second">
              <el-form-item >
                <el-table :data="tableD" border stripe header-cell-class-name="sub_bg_color_blue">
                  <el-table-column
                    :label="$t('label.PFANS5001FORMVIEW_CUSTOMERNAME')"
                    align="center"
                    prop="plantype"
                  >
                    <template slot-scope="scope">
                      <el-select :disabled="!disable"
                                 :no="scope.row"
                                 v-model="scope.row.plantype">
                        <el-option
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                          v-for="item in customerinfor">
                        </el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS5001FORMVIEW_MANMONTH')"
                    align="center"
                    prop="user_id"
                  >
                    <template slot-scope="scope">
                      <el-input :disabled="!disable" maxlength="5" v-model="scope.row.numbers"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS5001FORMVIEW_STARTDATE')"
                    align="center"
                    prop
                  >
                    <template slot-scope="scope">
                      <el-date-picker
                        :disabled="!disable"
                        :no="scope.row"
                        style="width: 11rem"
                        type="date"
                        v-model="scope.row.starttime"
                      ></el-date-picker>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.end')" align="center" prop="remarks">
                    <template slot-scope="scope">
                      <el-date-picker
                        :disabled="!disable"
                        :no="scope.row"
                        style="width: 11rem"
                        type="date"
                        v-model="scope.row.endtime"
                      ></el-date-picker>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.operation')" align="center" width="200">
                    <template slot-scope="scope">
                      <el-button
                        :disabled="!disable"
                        @click.native.prevent="deleteRow(scope.$index, tableD)"
                        plain
                        size="small"
                        type="danger"
                      >{{$t('button.delete')}}</el-button>
                      <el-button
                        :disabled="!disable"
                        @click="addRow()"
                        plain
                        size="small"
                        type="primary"
                      >{{$t('button.insert')}}</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS5001FORMVIEW_PROJECTRESOURCES')" name="third">
              <el-form-item >
                <el-table :data="tableE" stripe border header-cell-class-name="sub_bg_color_blue">
                  <el-table-column
                    :label="$t('label.PFANS5001FORMVIEW_NUMBERS')"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <el-input :disabled="!disable" maxlength="7" v-model="scope.row.numbers"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.user_name')" align="center" prop="user_id">
                    <template slot-scope="scope">
                      <user
                        :disabled="!disable"
                        :no="scope.row"
                        :userlist="scope.row.user_id"
                        @getUserids="getCitationUserid"
                        selectType="Single"
                        style="width:90%"
                      ></user>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2003FORMVIEW_RN')"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <dicselect
                        :code="code8"
                        :data="scope.row.role"
                        :disabled="!disable"
                        :multiple="multiple"
                        :no="scope.row"
                        @change="getrole"
                      ></dicselect>
                    </template>
                  </el-table-column>

                  <el-table-column :label="$t('label.operation')" align="center" width="200">
                    <template slot-scope="scope">
                      <el-button
                        :disabled="!disable"
                        @click.native.prevent="deleteRow(scope.$index, tableE)"
                        plain
                        size="small"
                        type="danger"
                      >{{$t('button.delete')}}</el-button>
                      <el-button
                        :disabled="!disable"
                        @click="addRow()"
                        plain
                        size="small"
                        type="primary"
                      >{{$t('button.insert')}}</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS5001FORMVIEW_OUTSOURCE')" name="fourth">
              <el-form-item >
                <el-table :data="tableR"  border header-cell-class-name="sub_bg_color_blue">

                  <el-table-column
                    :label="$t('label.PFANS6007VIEW_BPCLUBNAME')"
                    align="center"
                    prop="bpcompany">
                    <template slot-scope="scope">
                      <el-input :disabled="true" maxlength="7"  :no="scope.row" v-model="scope.row.bpcompany"></el-input>
                    </template>
                  </el-table-column>

                  <el-table-column :label="$t('label.PFANS5001FORMVIEW_BPNAME')" align="center" prop="bpname">
                    <template slot-scope="scope">
                      <el-select :disabled="!disable" @change="getchange(scope.row)" v-model="scope.row.bpname">
                        <el-option
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                          v-for="item in expatriates">
                        </el-option>
                      </el-select>
                    </template>
                  </el-table-column>

             <!--     <el-table-column :label="$t('label.PFANS5001FORMVIEW_BPNAME')" align="center" prop="user_Bp">
                    <template slot-scope="scope">
                      <el-container>
                      <input class="content bg" v-model="form.suppliername" :error="errorsuppliername"
                             :disabled="true"></input>
                      <el-button :disabled="!disabled" icon="el-icon-search" @click="dialogTableVisible = true"
                                 size="small"></el-button>
                      <el-dialog :title="$t('title.PFANS6003VIEW')" :visible.sync="dialogTableVisible" center size="50%"
                                 top="8vh" lock-scroll
                                 append-to-body>
                        <div style="text-align: center">
                          <el-row style="text-align: center;height: 90%;overflow: hidden">
                            <el-table
                              :data="gridData.filter(data => !search || data.suppliername.toLowerCase().includes(search.toLowerCase()))"
                              height="500px" highlight-current-row style="width: 100%" tooltip-effect="dark"
                              :span-method="arraySpanMethod" @row-click="handleClickChange">
                              <el-table-column property="suppliername" :label="$t('label.PFANS6001VIEW_SUPPLIERNAME')"
                                               width="150"></el-table-column>
                              <el-table-column
                                align="right" width="230">
                                <template slot="header" slot-scope="scope">
                                  <el-input
                                    v-model="search"
                                    size="mini"
                                    placeholder="请输入供应商关键字搜索"/>
                                </template>
                              </el-table-column>
                            </el-table>
                          </el-row>
                          <span slot="footer" class="dialog-footer">
                          <el-button type="primary" @click="submit">{{$t("button.confirm")}}</el-button>
                        </span>
                        </div>
                      </el-dialog>
                      </el-container>
                    </template>
                  </el-table-column>

-->

                  <el-table-column
                    :label="$t('label.PFANS2003FORMVIEW_RN')"
                    align="center" prop="rn">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code9"
                        :data="scope.row.rn"
                        :disabled="!disable"
                        :multiple="multiple"
                        :no="scope.row"
                      ></dicselect>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.operation')" align="center" width="200">
                    <template slot-scope="scope">
                      <el-button
                        :disabled="!disable"
                        @click.native.prevent="deleteRow(scope.$index, tableR)"
                        plain
                        size="small"
                        type="danger"
                      >{{$t('button.delete')}}</el-button>
                      <el-button
                        :disabled="!disable"
                        @click="addRow()"
                        plain
                        size="small"
                        type="primary"
                      >{{$t('button.insert')}}</el-button>
                    </template>
                  </el-table-column>
                </el-table>
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
  import user from "../../../components/user.vue";
  import dicselect from "../../../components/dicselect.vue";
  import { uploadUrl } from "@/utils/customize";
  import { Message } from "element-ui";
  import moment from 'moment';

  export default {
    name: "PFANS5001FormView",
    components: {
      dicselect,
      EasyNormalContainer,
      user
    },
    data() {
      var validateUserid = (rule, value, callback) => {
        if (!value || value === "" || value === "undefined") {
          callback(
            new Error(
              this.$t("normal.error_08") +
              this.$t("label.PFANS5001FORMVIEW_LEADERID")
            )
          );
          this.errorLeader =
            this.$t("normal.error_08") +
            this.$t("label.PFANS5001FORMVIEW_LEADERID");
        } else {
          callback();
          this.errorLeader = "";
        }
      };
      var validateUserid1 = (rule, value, callback) => {
        if (!value || value === "" || value === "undefined") {
          callback(
            new Error(
              this.$t("normal.error_08") +
              this.$t("label.PFANS5001FORMVIEW_MANAGERID")
            )
          );
          this.errorManager =
            this.$t("normal.error_08") +
            this.$t("label.PFANS5001FORMVIEW_MANAGERID");
        } else {
          callback();
          this.errorManager = "";
        }
      };
      var valiresig = (rule, value, callback) => {
        if (this.form.startdate && this.form.enddate) {
          let startdate = moment(this.form.startdate).format("YYYY-MM-DD")
          let enddate = moment(this.form.enddate).format("YYYY-MM-DD")
          if (moment(enddate).isBefore(startdate)) {
            callback(
              new Error(
                this.$t("label.PFANS5001FORMVIEW_ENDDATE") +
                this.$t("normal.error_checkTime1") +
                this.$t("label.PFANS5001FORMVIEW_STARTDATE")
              )
            );
          } else {
            this.$refs["from1"].clearValidate();
            callback();
          }
        }else {
          this.$refs["from1"].clearValidate();
          callback();
        }
      };
      return {
        disable: false,
        customerinfor: [],
        expatriates:[],
        disabled: true,
        error: "",
        errorLeader: "",
        errorManager: "",
        selectType: "Single",
        userlist: "",
        userlist1: "",
        activeName: "first",
        buttonList: [],
        tableD: [
          {
            projectplan_id: "",
            companyprojects_id: "",
            plantype: "",
            numbers: "",
            starttime: "",
            endtime: ""
          }
        ],
        tableE: [
          {
            projectresources_id: "",
            companyprojects_id: "",
            numbers: "",
            user_id: "",
            role: ""
          }
        ],
        tableR: [
          {
            outsource_id:"",
            companyprojects_id:"",
            bpcompany: "",
            bpname: "",
            rn: "",
            rowindex:"",
          }
        ],
        data: [],
        loading: false,
        title: "title.PFANS5001VIEW",
        rules: {
          leaderid: [
            {
              required: true,
              validator: validateUserid,
              trigger: "change"
            }
          ],
          managerid: [
            {
              required: true,
              validator: validateUserid1,
              trigger: "change"
            }
          ],
          project_name: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANS5001FORMVIEW_PROJECT_NAME"),
              trigger: "blur"
            }
          ],
          project_namejp: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANS5001FORMVIEW_PROJECT_NAMEJP"),
              trigger: "blur"
            }
          ],
          numbers: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANS5001FORMVIEW_NUMBERS"),
              trigger: "blur"
            }
          ],
          projecttype: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANS5001FORMVIEW_PROJECTTYPE"),
              trigger: "change"
            }
          ],
          field: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANS5001FORMVIEW_FIELD"),
              trigger: "change"
            }
          ],
          startdate: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANS5001FORMVIEW_STARTDATE"),
              trigger: "blur"
            },{validator: valiresig, trigger: 'change'}
          ],
          enddate: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANS5001FORMVIEW_ENDDATE"),
              trigger: "blur"
            },{validator: valiresig, trigger: 'change'}
          ],
          manmonth: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANS5001FORMVIEW_MANMONTH"),
              trigger: "blur"
            }
          ],
          salesvolume: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANS5001FORMVIEW_SALESVOLUME"),
              trigger: "blur"
            }
          ],
          cost: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANS5001FORMVIEW_COST"),
              trigger: "blur"
            }
          ],
          projectalabel: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANS5001FORMVIEW_PROJECTALABEL"),
              trigger: "blur"
            }
          ],
          customername: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANS5001FORMVIEW_CUSTOMERNAME"),
              trigger: "change"
            }
          ],
          briefintroduction: [
            {
              required: true,
              message:
                this.$t("normal.error_08") +
                this.$t("label.PFANS5001FORMVIEW_BRIEFINTRODUCTION"),
              trigger: "blur"
            }
          ]
        },
        baseInfo: {},
        form: {
          leaderid: "",
          managerid: "",
          project_name: "",
          project_namejp: "",
          numbers: "",
          departmentid: "",
          projecttype: "",
          field: "",
          technological: "",
          startdate: "",
          enddate: "",
          manmonth: "",
          cost: "",
          salesvolume: "",
          projectalabel: "",
          language: "",
          situation: "",
          confidential: "",
          managementtool: "",
          customername: "",
          representative: "",
          basicsituation: "",
          briefintroduction: "",
          requirement: "",
          uploadfile: ''
        },
        multiple: false,
        code: "PP006",
        code1: "PP001",
        code2: "PP002",
        code3: "PP003",
        code4: "PP004",
        code5: "PP005",
        code6: "PP007",
        code7: "PG017",
        code8: "PR021",
        code9:"PR021",
        result: "",
        result1: "",
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
            this.userlist = this.form.leaderid;
            this.userlist1 = this.form.managerid;

            if (response.projectplan.length > 0) {
              this.tableD = response.projectplan;
            }
            if (response.outSources.length > 0) {
              this.tableR = response.outSources;
            }
            if (response.projectresources.length > 0) {
              this.tableE = response.projectresources;
            }
            this.baseInfo.companyprojects=JSON.parse(JSON.stringify(this.form));
            this.baseInfo.projectplan=JSON.parse(JSON.stringify(this.tableD));
            this.baseInfo.outSources=JSON.parse(JSON.stringify(this.tableR));
            this.baseInfo.projectresources=JSON.parse(JSON.stringify(this.tableE));
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
      } else {
        this.userlist = this.$store.getters.userinfo.userid;
        this.userlist1 = this.$store.getters.userinfo.userid;
      }
      this.$store
        .dispatch('PFANS5001Store/getcustomer', {})
        .then(response => {
          for (let i = 0; i < response.length; i++) {
            var vote = {};
            this.result1 = response;
            vote.value = response[i].customerinfor_id;
            vote.label =response[i].custchinese;
            this.customerinfor.push(vote)
          }
        });
      this.$store
        .dispatch('PFANS5001Store/getexpat', {})
        .then(response => {
          for (let i = 0; i < response.length; i++) {
            var vote = {};
            this.result = response;
            vote.value = response[i].expatriatesinfor_id;
            vote.label =response[i].expname;
            this.expatriates.push(vote)
          }
        })
    },

    created() {
      this.disable = this.$route.params.disabled;
      if (this.disable) {
        this.buttonList = [
          {
            key: "save",
            name: "button.save"
          }
        ];
      }
    },
    methods: {
      getUserids(val) {
        this.userlist = val;
        this.form.leaderid = val;
        if (
          !this.form.leaderid ||
          this.form.leaderid === "" ||
          val === "undefined"
        ) {
          this.errorLeader =
            this.$t("normal.error_08") +
            this.$t("label.PFANS5001FORMVIEW_LEADERID");
        } else {
          this.errorLeader = "";
        }
      },
      getUserids1(val) {
        this.userlist1 = val;
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
      getCitationUserid(userlist, row) {
        row.user_id = userlist;
      },
      getdepartmentid(val1) {
        this.form.departmentid = val1;
      },
      getprojecttype(val1) {
        this.form.projecttype = val1;
      },
      getfield(val1) {
        this.form.field = val1;
      },
      gettechnological(val1) {
        this.form.technological = val1;
      },
      getsituation(val1) {
        this.form.situation = val1;
      },
      getconfidential(val1) {
        this.form.confidential = val1;
      },
      getmanagementtool(val1) {
        this.form.managementtool = val1;
      },
      getcustomername(val1) {
        this.form.customername = val1;
      },
      getplantype(val1, row) {
        row.plantype = val1;
      },
      getrole(val1, row) {
        row.role = val1;
      },
      getchange(row){
        this.result.forEach(res=>{
          if(res.expatriatesinfor_id===row.bpname){
            row.bpcompany=res.suppliername;
           row.rn=res.rn;
          }
        })
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
      deleteRow(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        }
      },
      addRow() {
        this.tableD.push({
          projectplan_id: "",
          companyprojects_id: "",
          plantype: "",
          numbers: "",
          starttime: "",
          endtime: ""
        });
        this.tableE.push({
          projectresources_id: "",
          companyprojects_id: "",
          numbers: "",
          user_id: "",
          role: ""
        });
        this.tableR.push({
          outsource_id:"",
          companyprojects_id:"",
          bpcompany: "",
          bpname: "",
          rn: "",
          rowindex:"",
        });
      },
      buttonClick(val) {
        this.form.leaderid = this.userlist;
        this.form.managerid = this.userlist1;
        this.$refs["from1"].validate(valid => {
          if (valid) {
            this.loading = true;
            this.baseInfo = {};
            this.baseInfo.companyprojects = JSON.parse(JSON.stringify(this.form));
            this.baseInfo.projectplan = [];
            this.baseInfo.projectresources = [];
            this.baseInfo.outSources = [];
            for (let i = 0; i < this.tableD.length; i++) {
              if (
                this.tableD[i].plantype !== "" ||
                this.tableD[i].numbers !== "" ||
                this.tableD[i].starttime !== "" ||
                this.tableD[i].endtime !== ""
              ) {
                this.baseInfo.projectplan.push({
                  projectplan_id: this.tableD[i].projectplan_id,
                  companyprojects_id: this.tableD[i].companyprojects_id,
                  plantype: this.tableD[i].plantype,
                  numbers: this.tableD[i].numbers,
                  starttime: this.tableD[i].starttime,
                  endtime: this.tableD[i].endtime
                });
              }
            }
            for (let i = 0; i < this.tableE.length; i++) {
              if (
                this.tableE[i].numbers !== "" ||
                this.tableE[i].user_id !== "" ||
                this.tableE[i].role !== ""
              ) {
                this.baseInfo.projectresources.push({
                  projectresources_id: this.tableE[i].projectresources_id,
                  companyprojects_id: this.tableE[i].companyprojects_id,
                  numbers: this.tableE[i].numbers,
                  user_id: this.tableE[i].user_id,
                  role: this.tableE[i].role
                });
              }
            }
            for (let i = 0; i < this.tableR.length; i++) {
              if (
                this.tableR[i].bpcompany !== "" ||
                this.tableR[i].bpname !== "" ||
                this.tableR[i].rn !== ""
              ) {
                this.baseInfo.outSources.push({
                  outsource_id: this.tableR[i].outsource_id,
                  companyprojects_id: this.tableR[i].companyprojects_id,
                  bpcompany: this.tableR[i].bpcompany,
                  bpname: this.tableR[i].bpname,
                  rn: this.tableR[i].rn
                });
              }
            }

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
            } else {
              this.$store
                .dispatch("PFANS5001Store/insert", this.baseInfo)
                .then(response => {
                  this.data = response;
                  this.loading = false;
                  this.$message({
                    message: this.$t("normal.success_01"),
                    type: "success"
                  });
                  if (this.$store.getters.historyUrl) {
                    this.$router.push(this.$store.getters.historyUrl);
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
<style lang="scss" rel="stylesheet/scss">
</style>
