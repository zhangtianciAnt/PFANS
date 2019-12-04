<template>
  <div style="min-height: 100%">`
    <EasyNormalContainer :buttonList="buttonList" :title="title" @buttonClick="buttonClick" ref="container"
                         @workflowState="workflowState"  v-loading="loading"
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
                <user :disabled="!disable"
                      :error="error"
                      :selectType="selectType"
                      :userlist="userlist"
                      @getUserids="getUserids"
                      style="width: 9.2rem"
                      v-model="form.user_id"
                ></user></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.pfanstype')">
                <el-input :disabled="!disable"
                          style="width:11rem"
                          v-model="form.type"
                ></el-input></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.subtype')" >
                <dicselect :code="code1"
                           :data="form.subtype"
                           :disabled="!disable"
                           :multiple="multiple"
                           @change="changesubtype"
                           style="width: 11rem">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.application')">
                <el-date-picker :disabled="!disable"
                                style="width:11rem"
                                type="date"
                                v-model="form.application"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.email')">
                <el-input :disabled="!disable"
                          maxlength="20"
                          style="width: 11rem"
                          v-model="form.email"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1017FORMVIEW_EXTENSION')">
                <el-input :disabled="!disable"
                          style="width: 11rem"
                          v-model="form.extension"
                          maxlength="11"
                ></el-input></el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1017FORMVIEW_IDTYPE')" >
                <dicselect :code="code"
                           :data="form.idtype"
                           :disabled="!disable"
                           :multiple="multiple"
                           @change="changeidtype"
                           style="width: 11rem">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="30">
              <div class="sub_color_blue" >{{$t('label.PFANS1017FORMVIEW_NEW')}}</div>
            </el-col>
          </el-row>




<!---->
          <el-row style="padding-top:1.5rem" >
            <el-table :data="tableT" header-cell-class-name="sub_bg_color_grey height">
              <el-table-column :label="$t('label.PFANS2007VIEW_NUMBER')" align="center"  width="150" >
                <template slot-scope="scope">
                  <el-input :disabled="!disable" v-model="scope.row.number" style="width: 100%">
                  </el-input>
                </template>
              </el-table-column >
              <el-table-column :label="$t('label.PFANS1017FORMVIEW_USERTYPE')" align="center"  width="150">
                <template slot-scope="scope">
                  <dicselect
                      :code="code"
                      :data="form.usertype"
                      :disabled="!disable"
                      :multiple="multiple"
                      @change="changeusertype"
                      style="width: 100%"
                  ></dicselect>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1017FORMVIEW_USERNAME')" align="center" width="150">
                <template slot-scope="scope">
                  <el-input :disabled="!disable" v-model="scope.row.username" style="width: 100%">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1017FORMVIEW_SURNAME')" align="center" width="130">
                <template slot-scope="scope">
                  <el-input :disabled="!disable" v-model="scope.row.surname" style="width: 100%">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1017FORMVIEW_MING')" align="center" width="130">
                <template slot-scope="scope">
                  <el-input :disabled="!disable" v-model="scope.row.ming" style="width: 100%">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1017FORMVIEW_ACCOUNT')" align="center" width="160">
                <template slot-scope="scope">
                    <el-input :disabled="!disable" v-model="scope.row.account" style="width: 100%">
                    </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1017FORMVIEW_TRANSMISSION')" align="center" width="150">
                <template slot-scope="scope">
                    <dicselect
                      :code="code"
                      :data="form.transmission"
                      :disabled="!disable"
                      :multiple="multiple"
                      @change="changetransmission"
                      style="width: 100%"
                    ></dicselect>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1017FORMVIEW_WAITFORTIME')" align="center" width="150">
                <template slot-scope="scope">
                  <el-date-picker :disabled="!disable"
                                    style="width: 100%"
                                    type="date"
                                    v-model="form.waitfortime"
                  ></el-date-picker>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.budgetunit')" align="center" width="150">
                <template slot-scope="scope">
                  <dicselect
                    :code="code"
                    :data="form.budgetunit"
                    :disabled="!disable"
                    :multiple="multiple"
                    @change="changebudgetunit"
                    style="width: 100%"
                  ></dicselect>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1017FORMVIEW_CYBOZU')" align="center" width="150">
                <template slot-scope="scope">
                  <dicselect
                    :code="code"
                    :data="form.cybozu"
                    :disabled="!disable"
                    :multiple="multiple"
                    @change="changecybozu"
                    style="width: 8rem"
                  ></dicselect>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1017FORMVIEW_WAITFORTIME')" align="center" width="150">
                <template slot-scope="scope">
                  <el-date-picker :disabled="!disable"
                                  style="width: 100%"
                                    type="date"
                                    v-model="form.expecttime"
                  ></el-date-picker>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1017FORMVIEW_DOMAINACCOUNT')" align="center" width="150">
                <template slot-scope="scope">
                  <dicselect
                      :code="code"
                      :data="form.domainaccount"
                      :disabled="!disable"
                      :multiple="multiple"
                      @change="changedomainaccount"
                      style="width: 100%"
                  ></dicselect>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1017FORMVIEW_WAITFORTIME')" align="center" width="150">
                <template slot-scope="scope">
                  <el-date-picker :disabled="!disable"
                                  style="width: 100%"
                                    type="date"
                                    v-model="form.forwardtime"
                  ></el-date-picker>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1017FORMVIEW_PREPAREFOR')" align="center" width="150">
                <template slot-scope="scope">
                  <el-input :disabled="!disable" v-model="scope.row.preparefor" style="width: 100%">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.operation')" align="center" width="150">
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
          </el-row>
<!---->



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
    import {getOrgInfoByUserId} from '@/utils/customize'
    import moment from "moment";

    export default {
        name: 'PFANS1017FormView',
        components: {
            EasyNormalContainer,
            dicselect,
            user
        },
        data() {
            return {
                multiple: false,
                selectType: "Single",
                error: '',
                title: "title.PFANS1017VIEW",
                tabIndex: 0,
                form: {
                    center_id: '',
                    group_id: '',
                    team_id: '',
                    user_id: '',
                    type: '',
                    subtype: '',
                    application: '',
                    email: '',
                    extension: '',
                    idtype: '',
                },
                tableT: [{
                    number: "",
                    usertype: "",
                    username: "",
                    surname: "",
                    ming: "",
                    account: "",
                    transmission: "",
                    waitfortime: "",
                    budgetunit: "",
                    cybozu: "",
                    expecttime: "",
                    domainaccount: "",
                    forwardtime: "",
                    preparefor: "",
                }],
                disabled: false,
                rules: {},
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
                    .dispatch('PFANS1017Store/getPsdcdOne', {"psdcd_id": this.$route.params._id})
                    .then(response => {
                        this.form = response;
                        this.userlist = this.form.user_id;
                        if (this.form.status === '2') {
                            this.disable = false;
                        }
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
            // paramsTitle(){
            //     this.$router.push({
            //         name: 'PFANS1001FormView',
            //         params: {
            //             title: 6,
            //         },
            //     });
            // },
            addRow1() {
                this.tableT.push({
                    user: "",
                    reason: "",
                });
            },
            buttonClick(val) {
                if (val === 'back') {
                    this.paramsTitle();
                } else {
                    this.$refs["refform"].validate(valid => {
                        if (valid) {
                            this.loading = true
                            if (this.$route.params._id) {
                                this.form.psdcd_id = this.$route.params._id;
                                this.$store
                                    .dispatch('PFANS1017Store/updatePsdcd', this.form)
                                    .then(response => {
                                        this.data = response;
                                        this.loading = false
                                        if(val !== "update"){
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
                                    .dispatch('PFANS1017Store/createPsdcd', this.form)
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
