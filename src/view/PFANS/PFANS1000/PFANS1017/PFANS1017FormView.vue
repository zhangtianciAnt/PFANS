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
                <user :disabled="!disable" :error="error" :selectType="selectType" :userlist="userlist"
                      @getUserids="getUserids" style="width: 9.2rem" v-model="form.user_id"></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.pfanstype')">
                <el-input :disabled="!disable" style="width:11rem" v-model="form.stype"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.subtype')" >
                <dicselect :code="code1"
                           :data="form.subtype"
                           :disabled="!disable"
                           :multiple="multiple"
                           @change="changecurrencychoice"
                           style="width: 11rem">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :error="errorapplicationdate" :label="$t('label.application_date')" prop="application_date">
                <el-date-picker
                  :disabled="!disable"
                  :error="errorapplicationdate"
                  style="width:11rem"
                  type="date"
                  v-model="form.application_date">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.email')" prop="email">
                <el-input
                  :disabled="!disable" maxlength="20" style="width: 11rem"
                  v-model="form.email"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1017FORMVIEW_EXTENSION')">
                <el-input :disabled="!disable" style="width: 11rem" v-model="form.extension" maxlength="11" ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1017FORMVIEW_IDTYPE')" >
                <dicselect :code="code1"
                           :data="form.idtype"
                           :disabled="!disable"
                           :multiple="multiple"
                           @change="changecurrencychoice"
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
                title: "title.PFANS1017VIEW",
                tabIndex: 0,
                form: {
                    center_id: '',
                    group_id: '',
                    team_id: '',
                },
                tableT: [{
                    publicexpenseid: "",
                    trafficdetails_id: "",
                    trafficdate: "",
                    region: "",
                    vehicle: "",
                    startingpoint: "",
                    rmb: "",
                    foreigncurrency: "",
                    annexno: "",
                    rowindex: "",
                    display: true,
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
            addRow() {
                this.tableT.push({
                    trafficdetails_id: "",
                    publicexpenseid: "",
                    trafficdate: "",
                    region: "",
                    vehicle: "",
                    startingpoint: "",
                    rmb: "",
                    foreigncurrency: "",
                    annexno: "",
                    rowindex: "",
                    display: true
                });
            },
            getTsummaries(param) {
                const {columns, data} = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = this.$t('label.PFANS1012VIEW_ACCOUNT');
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
                        sums[index] = '--'
                    }
                });
                this.getMoney(sums);
                this.getforeigncurrency(sums);
                this.getValue(sums);
                return sums;
            },
            buttonClick(val) {
                if (val === 'back') {
                    this.paramsTitle();
                } else {
                    this.$refs["refform"].validate(valid => {
                        if (valid) {
                            this.loading = true
                            if (this.$route.params._id) {
                                this.form.loanapplication_id = this.$route.params._id;
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
