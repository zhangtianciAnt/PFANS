<template>
  <div>
    <EasyNormalContainer :buttonList="buttonList" :title="title" @buttonClick="buttonClick"
                         @end="end" @start="start" @workflowState="workflowState" ref="container" v-loading="loading">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="left" label-width="8rem" ref="reff" style="padding: 20px">
          <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('label.PFANS5001FORMVIEW_COMPANYPROJECTS')" name="first">
              <div>
                <el-form :model="form" :rules="rules" label-position="left" label-width="8rem" ref="from1">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5001FORMVIEW_PROJECT_NAME')" prop="project_name">
                        <el-input :disabled="!disable" maxlength="50" style="width: 11rem"
                                  v-model="form.project_name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5001FORMVIEW_PROJECT_NAMEJP')" prop="project_namejp">
                        <el-input :disabled="!disable" maxlength="50" style="width: 11rem"
                                  v-model="form.project_namejp"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5001FORMVIEW_NUMBERS')" prop="numbers">
                        <el-input :disabled="!disable" maxlength="20" style="width: 11rem"
                                  v-model="form.numbers"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5001FORMVIEW_DEPARTMENTID')" prop="departmentid"
                                    style="width: 19rem">
                        <dicselect
                          :code="code"
                          :data="form.departmentid"
                          :disabled="!disable"
                          :multiple="multiple"
                          @change="getdepartmentid">
                        </dicselect>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :error="errorLeader" :label="$t('label.PFANS5001FORMVIEW_LEADERID')" prop="leaderid"
                                    style="width: 19rem">
                        <user :disabled="!disable" :error="errorLeader" :selectType="selectType"
                              :userlist="userlist" @getUserids="getUserids" style="width:10.1rem"></user>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :error="errorManager" :label="$t('label.PFANS5001FORMVIEW_MANAGERID')"
                                    prop="managerid" style="width: 19rem">
                        <user :disabled="!disable" :error="errorManager" :selectType="selectType"
                              :userlist="userlist1" @getUserids="getUserids1" style="width:10.1rem"></user>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5001FORMVIEW_PROJECTTYPE')" prop="projecttype"
                                    style="width: 19rem">
                        <dicselect
                          :code="code1"
                          :data="form.projecttype"
                          :disabled="!disable"
                          :multiple="multiple"
                          @change="getprojecttype">
                        </dicselect>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5001FORMVIEW_FIELD')" prop="field" style="width: 19rem">
                        <dicselect
                          :code="code2"
                          :data="form.field"
                          :disabled="!disable"
                          :multiple="multiple"
                          @change="getfield">
                        </dicselect>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5001FORMVIEW_TECHNOLOGICAL')" prop="technological"
                                    style="width: 19rem">
                        <dicselect
                          :code="code3"
                          :data="form.technological"
                          :disabled="!disable"
                          :multiple="multiple"
                          @change="gettechnological">
                        </dicselect>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5001FORMVIEW_STARTDATE')" prop="startdate">
                        <el-date-picker :disabled="!disable" style="width: 11rem" type="date"
                                        v-model="form.startdate"></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5001FORMVIEW_ENDDATE')" prop="enddate">
                        <el-date-picker :disabled="!disable" style="width: 11rem" type="date"
                                        v-model="form.enddate"></el-date-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5001FORMVIEW_MANMONTH')" prop="manmonth">
                        <el-input-number :disabled="!disable" :max="1000000000" :min="0" :precision="2"
                                         controls-position="right" style="width: 11rem" v-model="form.manmonth"></el-input-number>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5001FORMVIEW_COST')" prop="cost">
                        <el-input-number :disabled="!disable" :max="1000000000" :min="0" :precision="2"
                                         controls-position="right" style="width: 11rem" v-model="form.cost"></el-input-number>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5001FORMVIEW_SALESVOLUME')" prop="salesvolume">
                        <el-input-number :disabled="!disable" :max="1000000000" :min="0"
                                         :precision="2" controls-position="right" style="width: 11rem"
                                         v-model="form.salesvolume"></el-input-number>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5001FORMVIEW_PROJECTALABEL')" prop="projectalabel">
                        <el-input :disabled="!disable" maxlength="20" style="width: 11rem"
                                  v-model="form.projectalabel"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5001FORMVIEW_LANGUAGE')" prop="language">
                        <el-input :disabled="!disable" maxlength="20" style="width: 11rem"
                                  v-model="form.language"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5001FORMVIEW_SITUATION')" prop="situation"
                                    style="width: 19rem">
                        <dicselect
                          :code="code4"
                          :data="form.situation"
                          :disabled="!disable"
                          :multiple="multiple"
                          @change="getsituation">
                        </dicselect>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5001FORMVIEW_CONFIDENTIAL')" prop="confidential"
                                    style="width: 19rem">
                        <dicselect
                          :code="code5"
                          :data="form.confidential"
                          :disabled="!disable"
                          :multiple="multiple"
                          @change="getconfidential">
                        </dicselect>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5001FORMVIEW_MANAGEMENTTOOL')" prop="managementtool"
                                    style="width: 19rem">
                        <dicselect
                          :code="code6"
                          :data="form.managementtool"
                          :disabled="!disable"
                          :multiple="multiple"
                          @change="getmanagementtool">
                        </dicselect>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5001FORMVIEW_CUSTOMERNAME')" prop="customername"
                                    style="width: 19rem">
                        <dicselect
                          :code="code7"
                          :data="form.customername"
                          :disabled="!disable"
                          :multiple="multiple"
                          @change="getcustomername">
                        </dicselect>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5001FORMVIEW_REPRESENTATIVE')" prop="representative">
                        <el-input :disabled="!disable" maxlength="20" style="width: 11rem"
                                  v-model="form.representative"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5001FORMVIEW_BASICSITUATION')" prop="basicsituation">
                        <el-input :autosize="{ minRows: 3, maxRows: 4}" :disabled="!disable"
                                  style="width: 56.3rem" type="textarea" v-model="form.basicsituation"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5001FORMVIEW_BRIEFINTRODUCTION')" prop="briefintroduction">
                        <el-input :autosize="{ minRows: 3, maxRows: 4}" :disabled="!disable"
                                  style="width: 56.3rem" type="textarea" v-model="form.briefintroduction"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item :label="$t('label.PFANS5001FORMVIEW_REQUIREMENT')" prop="requirement">
                        <el-input :autosize="{ minRows: 3, maxRows: 4}" :disabled="!disable"
                                  style="width: 56.3rem" type="textarea" v-model="form.requirement"></el-input>
                      </el-form-item>
                    </el-col>
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
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS5001FORMVIEW_TASKPLAN')" name="second">
              <el-form-item :label="$t('label.PFANS5001FORMVIEW_TASKPLAN')">
                <el-table :data="tableD" header-cell-class-name="sub_bg_color_grey height">
                  <el-table-column :label="$t('label.PFANS5001FORMVIEW_CUSTOMERNAME')" align="center" prop="plantype">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code8"
                        :data="scope.row.plantype"
                        :disabled="!disable"
                        :multiple="multiple"
                        :no="scope.row"
                        @change="getplantype">
                      </dicselect>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS5001FORMVIEW_MANMONTH')" align="center" prop="user_id">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable" maxlength="5" v-model="scope.row.numbers">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS5001FORMVIEW_STARTDATE')" align="center" prop="">
                    <template slot-scope="scope">
                      <el-date-picker :disabled="!disable" :no="scope.row" style="width: 11rem" type="date"
                                      v-model="scope.row.starttime"></el-date-picker>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.end')" align="center" prop="remarks">
                    <template slot-scope="scope">
                      <el-date-picker :disabled="!disable" :no="scope.row" style="width: 11rem" type="date"
                                      v-model="scope.row.endtime"></el-date-picker>
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
                      >{{$t('button.delete')}}
                      </el-button>
                      <el-button
                        :disabled="!disable"
                        @click="addRow()"
                        plain
                        size="small"
                        type="primary"
                      >{{$t('button.insert')}}
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS5001FORMVIEW_PROJECTRESOURCES')" name="third">

              <el-form-item :label="$t('label.PFANS5001FORMVIEW_NUMBERS')">
                <el-table :data="tableE" header-cell-class-name="sub_bg_color_grey height">
                  <el-table-column :label="$t('label.PFANS5001FORMVIEW_NUMBERS')" align="center" prop="plantype">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable" maxlength="7" v-model="scope.row.numbers">
                      </el-input>
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
                  <el-table-column :label="$t('label.PFANS5001FORMVIEW_ROLE')" align="center" prop="remarks">
                    <template slot-scope="scope">
                      <dicselect
                        :code="code8"
                        :data="scope.row.role"
                        :disabled="!disable"
                        :multiple="multiple"
                        :no="scope.row"
                        @change="getrole">
                      </dicselect>
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
                      >{{$t('button.delete')}}
                      </el-button>
                      <el-button
                        :disabled="!disable"
                        @click="addRow()"
                        plain
                        size="small"
                        type="primary"
                      >{{$t('button.insert')}}
                      </el-button>
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
    import {uploadUrl} from '@/utils/customize';
    import {Message} from 'element-ui';

    export default {
        name: 'PFANS5001FormView',
        components: {
            dicselect,
            EasyNormalContainer,
            user
        },
        data() {
            var validateUserid = (rule, value, callback) => {

                if (!value || value === '' || value === "undefined") {
                    callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS5001FORMVIEW_LEADERID')));
                    this.errorLeader = this.$t('normal.error_08') + this.$t('label.PFANS5001FORMVIEW_LEADERID');
                } else {
                    callback();
                    this.errorLeader = '';
                }
            };
            var validateUserid1 = (rule, value, callback) => {

                if (!value || value === '' || value === "undefined") {
                    callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS5001FORMVIEW_MANAGERID')));
                    this.errorManager = this.$t('normal.error_08') + this.$t('label.PFANS5001FORMVIEW_MANAGERID');
                } else {
                    callback();
                    this.errorManager = '';
                }
            };
            return {
                disable: false,
                error: "",
                errorLeader: "",
                errorManager: "",
                selectType: "Single",
                userlist: "",
                userlist1: "",
                activeName: 'first',
                buttonList: [],
                tableD: [
                    {
                        projectplan_id: "",
                        companyprojects_id: "",
                        plantype: "",
                        numbers: "",
                        starttime: "",
                        endtime: "",
                    }
                ],
                tableE: [
                    {
                        projectresources_id: "",
                        companyprojects_id: "",
                        numbers: "",
                        user_id: "",
                        role: "",
                    }
                ],
                data: [],
                loading: false,
                title: "title.PFANS5001VIEW",
                rules: {
                    leaderid: [{
                        required: true,
                        validator: validateUserid,
                        trigger: 'change',
                    }],
                    managerid: [{
                        required: true,
                        validator: validateUserid1,
                        trigger: 'change',
                    }],
                    project_name: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS5001FORMVIEW_PROJECT_NAME'),
                            trigger: 'blur'
                        }
                    ],
                    project_namejp: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS5001FORMVIEW_PROJECT_NAMEJP'),
                            trigger: 'blur'
                        }
                    ],
                    numbers: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS5001FORMVIEW_NUMBERS'),
                            trigger: 'blur'
                        }
                    ],
                    projecttype: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS5001FORMVIEW_PROJECTTYPE'),
                            trigger: 'change'
                        }
                    ],
                    field: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS5001FORMVIEW_FIELD'),
                            trigger: 'change'
                        }
                    ],
                    startdate: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS5001FORMVIEW_STARTDATE'),
                            trigger: 'blur'
                        }
                    ],
                    enddate: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS5001FORMVIEW_ENDDATE'),
                            trigger: 'blur'
                        }
                    ],
                    manmonth: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS5001FORMVIEW_MANMONTH'),
                            trigger: 'blur'
                        }
                    ],
                    salesvolume: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS5001FORMVIEW_SALESVOLUME'),
                            trigger: 'blur'
                        }
                    ],
                    cost: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS5001FORMVIEW_COST'),
                            trigger: 'blur'
                        }
                    ],
                    projectalabel: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS5001FORMVIEW_PROJECTALABEL'),
                            trigger: 'blur'
                        }
                    ],
                    customername: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS5001FORMVIEW_CUSTOMERNAME'),
                            trigger: 'change'
                        }
                    ],
                    briefintroduction: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS5001FORMVIEW_BRIEFINTRODUCTION'),
                            trigger: 'blur'
                        }
                    ],
                },
                baseInfo: {},
                form: {
                    leaderid: '',
                    managerid: '',
                    project_name: '',
                    project_namejp: '',
                    numbers: '',
                    departmentid: '',
                    projecttype: '',
                    field: '',
                    technological: '',
                    startdate: '',
                    enddate: '',
                    manmonth: '',
                    cost: '',
                    salesvolume: '',
                    projectalabel: '',
                    language: '',
                    situation: '',
                    confidential: '',
                    managementtool: '',
                    customername: '',
                    representative: '',
                    basicsituation: '',
                    briefintroduction: '',
                    requirement: '',
                },
                multiple: false,
                code: 'PP006',
                code1: 'PP001',
                code2: 'PP002',
                code3: 'PP003',
                code4: 'PP004',
                code5: 'PP005',
                code6: 'PP007',
                code7: 'PG017',
                code8: 'PG017',
                fileList: [],
                upload: uploadUrl(),
            }
        },
        mounted() {
            if (this.$route.params._id) {
                this.loading = true;
                this.$store
                    .dispatch('PFANS5001Store/selectById', {"companyprojectsid": this.$route.params._id})
                    .then(response => {
                        this.form = response.companyprojects;
                        this.userlist = this.form.leaderid;
                        this.userlist1 = this.form.managerid;
                        if (response.projectplan.length > 0) {
                            this.tableD = response.projectplan
                        }
                        if (response.projectresources.length > 0) {
                            this.tableE = response.projectresources
                        }
                        this.loading = false;
                    })
                    .catch(error => {
                        Message({
                            message: error,
                            type: 'error',
                            duration: 5 * 1000,
                        });
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
                    });

            } else {
                this.userlist = this.$store.getters.userinfo.userid;
                this.userlist1 = this.$store.getters.userinfo.userid;


            }
        },
        created() {
            this.disable = this.$route.params.disabled;
            if (this.disable) {
                this.buttonList = [
                    {
                        key: "save",
                        name: "button.save",
                    }
                ];
            }
        },
        methods: {
            getUserids(val) {
                this.userlist = val;
                this.form.leaderid = val;
                if (!this.form.leaderid || this.form.leaderid === '' || val === "undefined") {
                    this.errorLeader = this.$t('normal.error_08') + this.$t('label.PFANS5001FORMVIEW_LEADERID');
                } else {
                    this.errorLeader = "";
                }
            },
            getUserids1(val) {
                this.userlist1 = val;
                this.form.managerid = val;
                if (!this.form.managerid || this.form.managerid === '' || val === "undefined") {
                    this.errorManager = this.$t('normal.error_08') + this.$t('label.PFANS5001FORMVIEW_MANAGERID');
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
                    endtime: "",
                });
                this.tableE.push({
                    projectresources_id: "",
                    companyprojects_id: "",
                    numbers: "",
                    user_id: "",
                    role: "",
                });
            },
            buttonClick(val) {
                this.form.leaderid = this.userlist;
                this.form.managerid = this.userlist1;
                this.$refs['from1'].validate(valid => {
                    if (valid) {
                        this.loading = true;
                        this.baseInfo = {};
                        this.baseInfo.companyprojects = JSON.parse(JSON.stringify(this.form));
                        this.baseInfo.projectplan = [];
                        this.baseInfo.projectresources = [];
                        for (let i = 0; i < this.tableD.length; i++) {
                            if (this.tableD[i].plantype !== "" || this.tableD[i].numbers !== "" || this.tableD[i].starttime !== "" || this.tableD[i].endtime !== "") {
                                this.baseInfo.projectplan.push(
                                    {
                                        projectplan_id: this.tableD[i].projectplan_id,
                                        companyprojects_id: this.tableD[i].companyprojects_id,
                                        plantype: this.tableD[i].plantype,
                                        numbers: this.tableD[i].numbers,
                                        starttime: this.tableD[i].starttime,
                                        endtime: this.tableD[i].endtime,
                                    }
                                );
                            }
                        }
                        for (let i = 0; i < this.tableE.length; i++) {
                            if (this.tableE[i].numbers !== "" || this.tableE[i].user_id !== "" || this.tableE[i].role !== "") {
                                this.baseInfo.projectresources.push(
                                    {
                                        projectresources_id: this.tableE[i].projectresources_id,
                                        companyprojects_id: this.tableE[i].companyprojects_id,
                                        numbers: this.tableE[i].numbers,
                                        user_id: this.tableE[i].user_id,
                                        role: this.tableE[i].role,
                                    }
                                );
                            }
                        }
                        if (this.$route.params._id) {
                            this.baseInfo.companyprojects.companyprojects_id = this.$route.params._id;
                            this.$store
                                .dispatch('PFANS5001Store/update', this.baseInfo)
                                .then(response => {
                                    this.data = response;
                                    this.loading = false;
                                        if(val !== "update"){
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
                                        duration: 5 * 1000,
                                    });
                                    this.loading = false;
                                });
                        } else {
                            this.$store
                                .dispatch('PFANS5001Store/insert', this.baseInfo)
                                .then(response => {
                                    this.data = response;
                                    this.loading = false;
                                    this.$message({
                                        message: this.$t('normal.success_01'),
                                        type: 'success',
                                    });
                                        if (this.$store.getters.historyUrl) {
                                            this.$router.push(this.$store.getters.historyUrl);
                                        }

                                })
                                .catch(error => {
                                    Message({
                                        message: error,
                                        type: 'error',
                                        duration: 5 * 1000,
                                    });
                                    this.loading = false;
                                });
                        }
                    }
                });
            },
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
</style>
