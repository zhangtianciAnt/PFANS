<template>
  <div style="min-height: 100%">
    <EasyNormalContainer
      :buttonList="buttonList"
      :canStart="canStart"
      v-loading="loading"
      :title="title" @disabled="setdisabled"
      @buttonClick="buttonClick"
      @end="end"
      @start="start"
      @workflowState="workflowState"
      :enableSave="enableSave"
      ref="container"
    >
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="refform"
                 style="padding: 3vw">
          <!--            start  fjl 2020/04/08  添加总务担当的受理功能-->
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3001FORMVIEW_ACCEPTSTATUS')">
                <el-select clearable style="width: 20vw" v-model="form.acceptstatus" :disabled="acceptShow"
                           :placeholder="$t('normal.error_09')" @change="changeAcc">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3006VIEW_ACCEPTTIME')">
                <el-date-picker :disabled="acceptShow" style="width:20vw" type="date"
                                v-model="form.findate"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8" v-show="refuseShow">
              <el-form-item :label="$t('label.PFANS3007FORMVIEW_REFUSEREASON')">
                <el-input :disabled="acceptShow" maxlength="100" style="width:20vw"
                          v-model="form.refusereason"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!--            end  fjl 2020/04/08  添加总务担当的受理功能-->
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.center')" prop="centerid">
                <el-input :disabled="disable2" style="width:20vw" v-model="centerid"></el-input>
                <el-input v-show='false' :disabled="true" style="width:20vw" v-model="form.centerid"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')" prop="groupid">
                <el-input :disabled="disable2" style="width:20vw" v-model="groupid"></el-input>
                <el-input v-show='false' :disabled="true" style="width:20vw" v-model="form.groupid"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')" prop="teamid">
                <el-input :disabled="disable2" style="width:20vw" v-model="teamid"></el-input>
                <el-input v-show='false' :disabled="true" style="width:20vw" v-model="form.teamid"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.applicant')" prop="userid">
                <user :disabled="true" :error="error" :selectType="selectType" :userlist="userlist"
                      @getUserids="getUserids" style="width: 20vw"></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1012FORMVIEW_BUDGET')">
                <!--                <el-input :disabled="true" maxlength="20" style="width:20vw"-->
                <!--                          v-model="form.company"></el-input>-->
                <el-select clearable style="width: 20vw" v-model="form.company" :disabled="!disable"
                           :placeholder="$t('normal.error_09')">
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.lable"
                    :value="item.value"
                    @change="getBudgetunit">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.application_date')" prop="applicationdate">
                <div class="block">
                  <el-date-picker
                    :disabled="true"
                    style="width:20vw"
                    type="date"
                    v-model="form.applicationdate">
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-table :data="tableD" header-cell-class-name="sub_bg_color_blue" border stripe style="width: 70vw"
                        :summary-method="getSummaries" show-summary>
                <el-table-column :label="$t('label.PFANS3004VIEW_TYPE')" align="center" prop="stationerytype"
                                 width="250">
                  <template slot-scope="scope">
                    <dicselect
                      :code="code2"
                      :data="scope.row.stationerytype"
                      :disabled="!disable"
                      :multiple="multiple"
                      :no="scope.row"
                      @change="change2"
                      style="width: 80%">
                    </dicselect>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS3004VIEW_NAME')" align="center" prop="footname" width="250">
                  <template slot-scope="scope">
                    <el-select clearable style="width: 80%" v-model="scope.row.footname" :disabled="!disable"
                               :no="scope.row" :placeholder="$t('normal.error_09')">
                      <el-option
                        v-for="item in optionsname"
                        :key="item.value"
                        :label="item.lable"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.numbers')" align="center" prop="numbers"
                                 width="250">
                  <template slot-scope="scope">
                    <el-input-number :disabled="!disable" controls-position="right" :precision="0" :step="1" :min="1"
                                     :max="9999999999" style="width: 80%" :no="scope.row" v-model="scope.row.numbers">
                    </el-input-number>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1012VIEW_TELEPHONE')" align="center"
                                 width="200">
                  <template slot-scope="scope">
                      <el-input v-model="scope.row.investigator" :disabled="!disable" style="width:15vw" maxlength='20'></el-input>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.operation')" align="center" width="205">
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
            </el-col>
          </el-row>
          <!--          <el-row >-->
          <!--            <el-col :span="8">-->
          <!--              <template>-->
          <!--                <el-form-item-->
          <!--                  :label="$t('label.PFANS3004VIEW_TYPE')" prop="stationerytype">-->
          <!--                  <dicselect-->
          <!--                    :code="code2"-->
          <!--                    :data="form.stationerytype"-->
          <!--                    :disabled="!disable"-->
          <!--                    :multiple="multiple"-->
          <!--                    @change="change2"-->
          <!--                    style="width:20vw"-->
          <!--                  >-->
          <!--                  </dicselect>-->
          <!--                </el-form-item>-->
          <!--              </template>-->
          <!--            </el-col>-->
          <!--            <el-col :span="8">-->
          <!--              <el-form-item :label="$t('label.PFANS3004VIEW_NAME')" prop="name">-->
          <!--                <el-input :disabled="!disable" maxlength="20" style="width:20vw" v-model="form.name"></el-input>-->
          <!--              </el-form-item>-->
          <!--            </el-col>-->
          <!--            <el-col :span="8">-->
          <!--              <el-form-item :label="$t('label.numbers')" prop="numbers">-->
          <!--                <el-input-number :disabled="!disable" controls-position="right" :precision="0" :step="1" :min="0"-->
          <!--                                 :max="9999999999" style="width:20vw"-->
          <!--                                 v-model="form.numbers"></el-input-number>-->
          <!--              </el-form-item>-->
          <!--            </el-col>-->
          <!--          </el-row>-->
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('label.remarks')" prop="remarks">
                <el-input :disabled="!disable" style="width:70vw" type="textarea" v-model="form.remarks"></el-input>
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
    import PFANS3004View from '../PFANS3004/PFANS3004View.vue';
    import dicselect from "../../../components/dicselect.vue";
    import moment from "moment";
    import {Message} from 'element-ui';
    import user from "../../../components/user.vue";
    import {getOrgInfoByUserId, getOrgInfo, getCurrentRole2} from '@/utils/customize'

    export default {
        name: "PFANS3004FormView",
        components: {
            EasyNormalContainer,
            PFANS3004View,
            getOrgInfoByUserId,
            dicselect,
            user
        },

        data() {
            var validateUserid = (rule, value, callback) => {
                if (!value || value === '' || value === "undefined") {
                    callback(new Error(this.$t('normal.error_09') + this.$t('label.applicant')));
                    this.error = this.$t('normal.error_09') + this.$t('label.applicant');
                } else {
                    callback();
                    this.error = '';
                }
            };
            return {
                options1: [],
                optionsname: [],
                centerid: '',
                groupid: '',
                teamid: '',
                loading: false,
                canStart: false,
                selectType: "Single",
                userlist: "",
                error: '',
                title: "title.PFANS3004VIEW",
                buttonList: [],
                options: [
                    {
                        value: '0',
                        label: this.$t('label.PFANS3006VIEW_ACCEPT'),
                    },
                    {
                        value: '1',
                        label: this.$t('label.PFANS3006VIEW_REFUSE'),
                    },
                    {
                        value: '2',
                        label: this.$t('label.PFANS3006VIEW_CARRYOUT'),
                    },
                ],
                acceptShow: true,
                refuseShow: false,
                enableSave: false,
                tableD: [
                    {
                        stationerytype: '',
                        footname: '',
                        numbers: '',
                        investigator:'',
                    },
                ],
                form: {
                    centerid: '',
                    groupid: '',
                    teamid: '',
                    userid: '',
                    company: '',
                    applicationdate: moment(new Date()).format("YYYY-MM-DD"),
                    stationerytype: '',
                    name: '',
                    size: '',
                    numbers: '',
                    remarks: '',
                    accept: '0',
                    acceptstatus: '',
                    findate: '',
                    refusereason: '',
                    investigator:'',
                },
                rules: {
                    userid: [{
                        required: true,
                        validator: validateUserid,
                        trigger: 'change'
                    }],
                    applicationdate: [{
                        required: true,
                        message: this.$t("normal.error_09") + this.$t("label.application_date"),
                        trigger: "change"
                    }],
                    // stationerytype: [{
                    //     required: true,
                    //     message: this.$t("normal.error_09") + this.$t("label.PFANS3004VIEW_TYPE"),
                    //     trigger: "change"
                    // }],
                    // name: [{
                    //     required: true,
                    //     message: this.$t('normal.error_08') + this.$t('label.PFANS3004VIEW_NAME'),
                    //     trigger: 'blur'
                    // }],
                    // size: [{
                    //     required: true,
                    //     message: this.$t('normal.error_08') + this.$t('label.PFANS3004VIEW_SIZE'),
                    //     trigger: 'blur'
                    // }],
                },
                code: 'PG001',
                code2: 'PR004',
                code3: 'PR004',
                multiple: false,
                disable: false,
                disable2: true,
                arrD: [],
            };
        },
        mounted() {
            if (this.$route.params._id) {
                this.loading = true;
                this.$store
                    .dispatch('PFANS3004Store/getStationeryOne', {"stationeryid": this.$route.params._id})
                    .then(response => {
                        this.form = response;
                        //add_fjl 类型的明细
                        if (this.form.stationerytype !== '' && this.form.stationerytype !== null) {
                            let stationerytype = JSON.parse(response.stationerytype);
                            this.tableD = [];
                            for (let i = 0; i < stationerytype.length; i++) {
                                let typeflg = {};
                                typeflg.stationerytype = stationerytype[i].stationerytype;
                                typeflg.footname = stationerytype[i].footname;
                                typeflg.numbers = stationerytype[i].numbers;
                                typeflg.investigator = stationerytype[i].investigator;
                                this.tableD.push(typeflg);
                            }
                        }
                        for (let j = 0; j < this.tableD.length; j++) {
                            let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'RS001');
                            if (dic.length > 0) {
                                for (let i = 0; i < dic.length; i++) {
                                    if (this.tableD[j].stationerytype === dic[i].value1) {
                                        this.optionsname.push({
                                            lable: dic[i].value2,
                                            value: dic[i].code,
                                        });
                                    }
                                }
                            }
                        }
                        //add_fjl 类型的明细
                        if (this.form.acceptstatus === '1') {
                            this.refuseShow = true;
                        } else {
                            this.refuseShow = false;
                        }
                        let rst = getOrgInfoByUserId(response.userid);
                        if (rst) {
                            this.centerid = rst.centerNmae;
                            this.groupid = rst.groupNmae;
                            this.teamid = rst.teamNmae;
                        }
                        this.userlist = this.form.userid;
                        this.getBudt(this.userlist);
                        if (this.form.status === '2') {
                            this.disable = false;
                        }
                      //start(添加角色权限，只有总务的人才可以进行受理)  fjl 2020/04/08
                      let role = getCurrentRole2();
                      if (role === '0') {
                        if (this.form.status === '4') {
                          this.enableSave = true;
                          if (this.disable) {
                            this.form.findate = moment(new Date()).format("YYYY-MM-DD")
                            this.acceptShow = false;
                          } else {
                            this.acceptShow = true;
                          }
                        } else {
                          this.acceptShow = true;
                          this.enableSave = false;
                        }
                      }
                      //end(添加角色权限，只有总务的人才可以进行受理)  fjl 2020/04/08
                        this.loading = false;
                    })
                    .catch(error => {
                        Message({
                            message: error,
                            type: 'error',
                            duration: 5 * 1000
                        })
                        this.loading = false;
                    })
            } else {
                this.userlist = this.$store.getters.userinfo.userid;
                if (this.userlist !== null && this.userlist !== '') {
                    let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
                    // if(getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId)){
                    //     this.form.company = getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId).encoding;
                    // }
                    if (rst) {
                        this.centerid = rst.centerNmae;
                        this.groupid = rst.groupNmae;
                        this.teamid = rst.teamNmae;
                        this.form.centerid = rst.centerId;
                        this.form.groupid = rst.groupId;
                        this.form.teamid = rst.teamId;
                    }
                    this.form.userid = this.$store.getters.userinfo.userid;
                    this.getBudt(this.form.userid);
                }
            }
        },
        created() {
            this.disable = this.$route.params.disabled;
            if (this.disable) {
                this.buttonList = [
                    {
                        key: "save",
                        name: "button.save",
                        icon: "el-icon-check",
                        disabled: false
                    }
                ];
            }
        },
        methods: {
            //change受理状态  add_fjl
            changeAcc(val) {
                this.form.acceptstatus = val;
                if (val === '1') {
                    this.refuseShow = true;
                } else {
                    this.refuseShow = false;
                }
            },
            getBudt(val) {
                //ADD_FJL  修改人员预算编码
                if (getOrgInfo(getOrgInfoByUserId(val).groupId)) {
                    let butinfo = getOrgInfo(getOrgInfoByUserId(val).groupId).encoding;
                    let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'JY002');
                    if (dic.length > 0) {
                        for (let i = 0; i < dic.length; i++) {
                            if (butinfo === dic[i].value1) {
                                this.options1.push({
                                    lable: dic[i].value2 + '_' + dic[i].value3,
                                    value: dic[i].code,
                                })
                            }
                        }
                    }
                }
                //ADD_FJL  修改人员预算编码
            },
            getBudgetunit(val) {
                this.form.company = val;
            },
            setdisabled(val) {
                if (this.$route.params.disabled) {
                    this.disabled = val;
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
            start(val) {
                if (val.state === '0') {
                    this.form.status = '2';
                } else if (val.state === '2') {
                    this.form.status = '4';
                }
                // this.form.status = '2';
                this.buttonClick("update");
            },
            end(val) {
                this.form.status = '0';
                this.buttonClick("update");
            },
            //add_fjl
            getSummaries(param) {
                const {columns, data} = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = this.$t('label.PFANS1012VIEW_ACCOUNT');
                        return;
                    } else if ([1].includes(index)) {
                        sums[index] = '--';
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
                        if (index === 2) {
                            sums[index] = Math.round((sums[index]) * 100) / 100;
                        }
                    }
                });
                return sums;
            },
            deleteRow(index, rows) {
                if (rows.length > 1) {
                    rows.splice(index, 1);
                } else {
                    this.tableD = [{
                        stationerytype: '',
                        footname: '',
                        numbers: '',
                        investigator:'',
                    }];
                }
            },
            addRow() {
                this.tableD.push({
                    stationerytype: '',
                    footname: '',
                    numbers: '',
                    investigator:'',
                });
            },
            //add_fjl
            getUserids(val) {
                this.form.userid = val;
                this.userlist = val;
                let rst = getOrgInfoByUserId(val);
                // if(getOrgInfo(getOrgInfoByUserId(val).groupId)){
                //     this.form.company = getOrgInfo(getOrgInfoByUserId(val).groupId).encoding;
                // }
                if (rst) {
                    this.centerid = rst.centerNmae;
                    this.groupid = rst.groupNmae;
                    this.teamid = rst.teamNmae;
                    this.form.centerid = rst.centerId;
                    this.form.groupid = rst.groupId;
                    this.form.teamid = rst.teamId;
                } else {
                    this.centerid = '';
                    this.groupid = '';
                    this.teamid = '';
                    this.form.centerid = '';
                    this.form.teamid = '';
                    this.form.groupid = '';
                }
                if (!this.form.userid || this.form.userid === '' || val === "undefined") {
                    this.error = this.$t('normal.error_09') + this.$t('label.applicant');
                } else {
                    this.error = "";
                }
            },
            //add_fjl 类型的明细
            change2(val, row) {
                this.optionsname = [];
                row.footname = '';
                row.stationerytype = val;
                let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'RS001');
                if (dic.length > 0) {
                    for (let i = 0; i < dic.length; i++) {
                        if (val === dic[i].value1) {
                            this.optionsname.push({
                                lable: dic[i].value2,
                                value: dic[i].code,
                            });
                        }
                    }
                }
            },
            //add_fjl 类型的明细
            buttonClick(val) {
                this.$refs["refform"].validate(valid => {
                    if (valid) {
                      this.loading = true;
                      let sumchek = 0;
                      for (let i = 0; i < this.tableD.length; i++)
                      {
                        if (this.tableD[i].investigator === '' || !this.tableD[i].investigator || this.tableD[i].investigator === "undefined") {
                           sumchek=sumchek+1;
                          Message({
                            message: this.$t('normal.error_08') + this.$t('label.PFANS1012VIEW_TELEPHONE'),
                            type: 'error',
                            duration: 5 * 1000
                          });
                          this.loading = false;
                          break;
                        }
                      }
                        //add_fjl 类型的明细
                        this.form.stationerytype = JSON.stringify(this.tableD);
                        //add_fjl 类型的明细

                        this.form.userid = this.userlist;
                        if (sumchek===0){
                          if (this.$route.params._id) {
                            this.form.applicationdate = moment(this.form.applicationdate).format('YYYY-MM-DD')
                            this.loading = true;
                            this.$store
                              .dispatch('PFANS3004Store/updateStationery', this.form)
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
                                })
                                this.loading = false;
                              })
                          }
                          else {
                            this.form.applicationdate = moment(this.form.applicationdate).format('YYYY-MM-DD')
                            this.loading = true;
                            this.$store
                              .dispatch('PFANS3004Store/createStationery', this.form)
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

                    } else {
                        Message({
                            message: this.$t("normal.error_12"),
                            type: 'error',
                            duration: 5 * 1000
                        });
                    }
                });
            }
        }
    }

</script>

<style scoped>

</style>
