<template>
  <div style="min-height: 100%">`
    <EasyNormalContainer :buttonList="buttonList" :title="title" @buttonClick="buttonClick" ref="container"
                         @workflowState="workflowState" v-loading="loading"
                         :canStart="canStart" @start="start" @end="end">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="left" label-width="8rem" ref="refform"
                 style="padding:2rem">
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.center')">
                <el-input :disabled="true" style="width:11rem" v-model="form.center_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')">
                <el-input :disabled="true" style="width:11rem" v-model="form.group_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')">
                <el-input :disabled="true" style="width:11rem" v-model="form.team_id"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.applicant')" prop="user_id">
                <user :disabled="!disable" :error="error" :selectType="selectType" :userlist="userlist"
                      style="width:10.14rem" @getUserids="getUserids"></user>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="30">
              <div class="sub_color_blue">{{$t('label.PFANS1010FORMVIEW_USERNAME')}}</div>
            </el-col>
          </el-row>


          <el-row style="padding-top:1.5rem">
            <el-table :data="tableT" header-cell-class-name="sub_bg_color_grey height">
              <el-table-column :label="$t('label.user_name')" align="center" width="400%">
                <template slot-scope="scope">
                  <el-form-item prop="">
                    <user
                      :disabled="!disable"
                      :no="scope.row"
                      @getUserids="getuserid"
                      :userlist="scope.row.user"
                      selectType="Single"
                      style="width:70%"
                    ></user>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1010FORMVIEW_JOINREASON')" align="center">
                <template slot-scope="scope">
                  <el-form-item prop="">
                    <el-input :disabled="!disable" v-model="scope.row.reason" style="width: 18rem">
                    </el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.operation')" width="200" align="center">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="deleteRow1(scope.$index, tableT)"
                    type="danger"
                    size="small"
                    plain
                    :disabled="!disable"
                  >{{$t('button.delete')}}
                  </el-button>
                  <el-button
                    @click="addRow1()"
                    type="primary"
                    size="small"
                    plain
                    :disabled="!disable"
                  >{{$t('button.insert')}}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination-container" style="padding-top: 20px">
              <el-pagination :current-page.sync="listQuery.page" :page-size="listQuery.limit"
                             :page-sizes="[5,10,20,30,50]" :total="total" @current-change="handleCurrentChange"
                             @size-change="handleSizeChange" layout="slot,sizes, ->,prev, pager, next, jumper">
                <slot><span class="front Content_front"
                            style="padding-right: 5px;font-weight: 400">{{$t('table.pagesize')}}</span></slot>
              </el-pagination>
            </div>
          </el-row>
          <el-row style="padding-top:1.5rem">
            <el-col :span="8">
              <el-form-item :label="$t('label.remarks')">
                <el-input :disabled="!disable" type="textarea" style="width:57.1rem" v-model="form.remarks"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1010FORMVIEW_DATEOFUSE')" prop="usedate">
                <el-date-picker
                  :disabled="!disable"
                  style="width:11rem"
                  type="date"
                  v-model="form.usedate">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="30">
              <div class="sub_color_blue">{{$t('label.PFANS1010FORMVIEW_OPPOSITEUNIT')}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1010FORMVIEW_COMPANYNAME')" prop="company">
                <el-input :disabled="!disable" style="width:11rem" v-model="form.company" maxlength='36'></el-input>
              </el-form-item>
            </el-col>
          </el-row>


          <el-row style="width: 800px" align="right">
            <el-table :data="tableP" header-cell-class-name="sub_bg_color_grey height">
              <el-table-column :label="$t('label.PFANS1010FORMVIEW_PARTICIPANTS')" align="center">
                <template slot-scope="scope">
                  <el-input :disabled="!disable" v-model="scope.row.participants" style="width: 20rem">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.operation')" width="200" align="center">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="deleteRow2(scope.$index, tableP)"
                    type="danger"
                    size="small"
                    plain
                    :disabled="!disable"
                  >{{$t('button.delete')}}
                  </el-button>
                  <el-button
                    @click="addRow2()"
                    type="primary"
                    size="small"
                    plain
                    :disabled="!disable"
                  >{{$t('button.insert')}}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination-container" style="padding-top: 20px">
              <el-pagination :current-page.sync="listQuerytwo.page" :page-size="listQuerytwo.limit"
                             :page-sizes="[5,10,20,30,50]" :total="total2" @current-change="handleCurrentChangetwo"
                             @size-change="handleSizeChangetwo" layout="slot,sizes, ->,prev, pager, next, jumper">
                <slot><span class="front Content_front"
                            style="padding-right: 5px;font-weight: 400">{{$t('table.pagesize')}}</span></slot>
              </el-pagination>
            </div>
          </el-row>


          <el-row style="padding-top:1.5rem">
            <el-col :span="30">
              <div class="sub_color_blue">{{$t('label.PFANS1010FORMVIEW_AMOUNTUSED')}}</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1010FORMVIEW_SCHEDULEDAMOUNT')" prop="moneys">
                <el-input-number v-model="form.moneys"
                                 controls-position="right"
                                 :disabled="!disable"
                                 :min="0"
                                 :max="1000000000"
                                 :precision="2"
                                 style="width:11rem"
                ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1010FORMVIEW_PERCAPITA')" prop="percapita">
                <el-input-number v-model="form.percapita"
                                 controls-position="right"
                                 :disabled="!disable"
                                 :min="0"
                                 :max="1000000000"
                                 :precision="2"
                                 style="width:11rem"
                ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.budgetunit')" prop="budgetunit">
                <dicselect
                  :code="code1"
                  :data="form.budgetunit"
                  :disabled="!disable"
                  :multiple="multiple"
                  style="width: 11rem"
                  @change="getbudgetunit">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1010FORMVIEW_PURPOSEOFUSE')">
                <el-input :disabled="!disable" type="textarea" style="width:57.1rem"
                          v-model="form.objective"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1010FORMVIEW_RECEPTIONPLACE')">
                <el-input :disabled="!disable" type="textarea" style="width:57.1rem" v-model="form.place"></el-input>
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
    import {Message} from 'element-ui'
    import user from "../../../components/user.vue";
    import {getOrgInfoByUserId} from '@/utils/customize';

    export default {
        name: 'PFANS1010FormView',
        components: {
            EasyNormalContainer,
            dicselect,
            user
        },
        data() {
            var validateUserid = (rule, value, callback) => {
                if (!value || value === '' || value === "undefined") {
                    callback(new Error(this.$t('normal.error_08') + this.$t('label.applicant')));
                    this.error = this.$t('normal.error_08') + this.$t('label.applicant');
                } else {
                    callback();
                    this.error = '';
                }
            };
            return {
                totaldata: [],
                totaldatatwo: [],
                listQuery: {
                    page: 1,
                    limit: 5
                },
                listQuerytwo: {
                    page: 1,
                    limit: 5
                },
                total: 0,
                total2: 0,
                tableT: [{
                    user: "",
                    reason: "",
                }],
                tableP: [{
                    participants: "",
                }],
                error: '',
                loading: false,
                selectType: "Single",
                title: "title.PFANS1010VIEW",
                buttonList: [],
                editableTabsValue: '0',
                editableTabs: [],
                tabIndex: 0,
                multiple: false,
                userlist: '',
                form: {
                    center_id: '',
                    group_id: '',
                    team_id: '',
                    user_id: '',
                    reason: '',
                    participants: '',
                    remarks: '',
                    usedate: '',
                    company: '',
                    moneys: '',
                    percapita: '',
                    budgetunit: '',
                    objective: '',
                    place: '',
                    nodeList: []
                },
                code1: 'PG001',
                menuList: [],
                disabled: false,
                rules: {
                    user_id: [{
                        required: true,
                        validator: validateUserid,
                        trigger: 'change',
                    }],
                    usedate: [{
                        required: true,
                        message: this.$t('normal.error_09') + this.$t('label.PFANS1010FORMVIEW_DATEOFUSE'),
                        trigger: 'change',
                    }],
                    company: [{
                        required: true,
                        message: this.$t('normal.error_08') + this.$t('label.PFANS1010FORMVIEW_COMPANYNAME'),
                        trigger: 'change',
                    }],
                    moneys: [{
                        required: true,
                        message: this.$t('normal.error_08') + this.$t('label.PFANS1010FORMVIEW_SCHEDULEDAMOUNT'),
                        trigger: 'change',
                    }],
                    percapita: [{
                        required: true,
                        message: this.$t('normal.error_08') + this.$t('label.PFANS1010FORMVIEW_PERCAPITA'),
                        trigger: 'change',
                    }],
                    budgetunit: [{
                        required: true,
                        message: this.$t('normal.error_09') + this.$t('label.budgetunit'),
                        trigger: 'change',
                    }],
                },
                canStart: false,
            };
        },
        created() {
            this.disable = this.$route.params.disabled;
            if (this.disable) {
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
                this.loading = true
                this.$store
                    .dispatch('PFANS1010Store/getCommunicationOne', {"communication_id": this.$route.params._id})
                    .then(response => {
                        if (response.status === '2') {
                            this.disable = false;
                        }
                        this.userlist = response.user_id;
                        let lettableT = [];
                        let letreason = response.reason.split(";");
                        if (letreason.length > 0) {
                            for (var i = 0; i <= letreason.length - 1; i++) {
                                let letuser = letreason[i].split(",");
                                lettableT.push({
                                    user: letuser[0],
                                    reason: letuser[1]
                                })
                            }
                        }
                        let lettableP = [];
                        let letresponse = response.participants.split(";");
                        if (letresponse.length > 0) {
                            for (var i = 0; i <= letresponse.length - 1; i++) {
                                lettableP.push({
                                    participants: letresponse[i]
                                })
                            }
                        }
                        this.tableT = lettableT;
                        this.totaldata = lettableT;
                        this.getList();
                        this.tableP = lettableP;
                        this.totaldatatwo = lettableP;
                        this.getTwo();
                        this.form = response;
                        this.loading = false;
                    })
                    .catch(error => {
                        Message({
                            message: error,
                            type: 'error',
                            duration: 5 * 1000
                        });
                        this.loading = false
                    })
            } else {
                this.userlist = this.$store.getters.userinfo.userid;
                if (this.userlist !== null && this.userlist !== '') {
                    this.form.user_id = this.$store.getters.userinfo.userid;
                    let lst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
                    this.form.center_id = lst.centerNmae;
                    this.form.group_id = lst.groupNmae;
                    this.form.team_id = lst.teamNmae;
                }
            }
        },
        methods: {
            handleSizeChange(val) {
                this.listQuery.limit = val
                this.getList()
            },
            handleCurrentChange(val) {
                this.listQuery.page = val
                this.getList()
            },
            getList() {
                debugger;
                this.loading = true
                let start = (this.listQuery.page - 1) * this.listQuery.limit
                let end = this.listQuery.page * this.listQuery.limit
                if (this.totaldata) {
                    debugger;
                    let pList = this.totaldata.slice(start, end)
                    this.tableT = pList
                    this.total = this.totaldata.length
                }
                this.loading = false
            },
            handleSizeChangetwo(val) {
                this.listQuery.limit = val
                this.getTwo()
            },
            handleCurrentChangetwo(val) {
                this.listQuery.page = val
                this.getTwo()
            },
            getTwo() {
                this.loading = true
                let start = (this.listQuery.page - 1) * this.listQuery.limit
                let end = this.listQuery.page * this.listQuery.limit
                if (this.totaldatatwo) {
                    let pList = this.totaldatatwo.slice(start, end)
                    this.tableP = pList
                    this.total2 = this.totaldatatwo.length
                }
                this.loading = false
            },
            deleteRow1(index, rows) {
                if (rows.length > 1) {
                    rows.splice(index, 1);
                }
            },
            deleteRow2(index, rows) {
                if (rows.length > 1) {
                    rows.splice(index, 1);
                }
            },
            addRow1() {

                this.tableT.push({
                    user: "",
                    reason: "",
                });

                debugger
                for (let a = 0; a < this.tableT.length; a++) {
                    if (a === this.listQuery.limit) {
                        this.totaldata = this.tableT
                        this.getList();
                    }
                }
            },
            addRow2() {
                this.tableP.push({
                    participants: "",
                });
            },
            getuserid(userlist, row) {
                row.user = userlist;
            },
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
            getbudgetunit(val) {
                this.form.budgetunit = val;
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
            paramsTitle() {
                this.$router.push({
                    name: 'PFANS1001FormView',
                    params: {
                        title: 10,
                    },
                });
            },
            buttonClick(val) {
                if (val === 'back') {
                    this.paramsTitle();
                } else {
                    this.$refs["refform"].validate(valid => {
                        if (valid) {
                            this.loading = true
                            let letreason = '';
                            for (let i = 0; i <= this.tableT.length - 1; i++) {
                                if (this.tableT[i].user.trim() === '' && this.tableT[i].reason.trim() === '') {
                                } else {
                                    letreason = letreason + this.tableT[i].user + "," + this.tableT[i].reason + ";";
                                }
                            }
                            letreason = letreason.substring(0, letreason.length - 1).replace("undefined", "").trim();
                            if (letreason.replace(";", "").replace("undefined", "").replace(",", "").trim() === '') {
                                letreason = '';
                            }
                            this.form.reason = letreason;
                            let letparticipants = '';
                            for (var j = 0; j <= this.tableP.length - 1; j++) {
                                if (this.tableP[j].participants.trim() != '') {
                                    letparticipants = letparticipants + this.tableP[j].participants + ";"
                                }
                            }
                            letparticipants = letparticipants.substring(0, letparticipants.length - 1);
                            if (this.form.participants.replace(";", "").trim() === '') {
                                this.form.participants = '';
                            }
                            this.form.participants = letparticipants;
                            if (this.$route.params._id) {
                                this.form.communication_id = this.$route.params._id;
                                this.$store
                                    .dispatch('PFANS1010Store/updateCommunication', this.form)
                                    .then(response => {
                                        this.data = response;
                                        this.loading = false
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
                                        this.loading = false
                                    })
                            } else {
                                this.loading = true
                                this.$store
                                    .dispatch('PFANS1010Store/createCommunication', this.form)
                                    .then(response => {
                                        this.data = response;
                                        this.loading = false
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
                                        this.loading = false
                                    })
                            }
                        }
                    });
                }
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
