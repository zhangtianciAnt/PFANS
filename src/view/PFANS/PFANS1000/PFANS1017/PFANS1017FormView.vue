<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :title="title" @buttonClick="buttonClick" ref="container"
                         @workflowState="workflowState" v-loading="loading"
                         :canStart="canStart" @start="start" @end="end" :enableSave="enableSave">
      <!--//start(添加角色权限，只有IT担当的人才可以进行受理)  ztc 2020/05/09-->
      <!--:enableSave="enableSave"-->
      <!--//end(添加角色权限，只有IT担当的人才可以进行受理)  ztc 2020/05/09-->
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="refform"
                 style="padding:3vw">
          <!--//start(添加角色权限，只有IT担当的人才可以进行受理)  ztc 2020/05/09-->
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1016FORMVIEW_CORRESPONDING')" prop='corresponding'>
                <span style="margin-right: 1vw ">{{$t('label.PFANS1016FORMVIEW_INCOMPLETE')}}</span>
                <el-switch
                  :disabled="acceptShow"
                  @change="getcorresponding"
                  active-value="1"
                  inactive-value="0"
                  v-model="form.corresponding"
                ></el-switch>
                <span style="margin-left: 1vw ">{{$t('label.PFANS1016FORMVIEW_COMPLETE')}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <!--//end(添加角色权限，只有IT担当的人才可以进行受理)  ztc 2020/05/09-->
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.center')">
                <el-input :disabled="true" style="width:20vw" v-model="centerid"></el-input>
                <el-input v-show='false' :disabled="false" style="width:20vw" v-model="form.center_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')">
                <el-input :disabled="true" style="width:20vw" v-model="groupid"></el-input>
                <el-input v-show='false' :disabled="false" style="width:20vw" v-model="form.group_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')">
                <el-input :disabled="true" style="width:20vw" v-model="teamid"></el-input>
                <el-input v-show='false' :disabled="false" style="width:20vw" v-model="form.team_id"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.applicant')" prop="user_id">
                <user :disabled="true"
                      :error="error"
                      :selectType="selectType"
                      :userlist="userlist"
                      @getUserids="getUserids"
                      style="width:20vw"
                      v-model="form.user_id"
                ></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.pfanstype')">
                <el-input :disabled="true"
                          style="width:20vw"
                          v-model="form.type"
                          maxlength='36'
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.subtype')" prop="subtype">
                <dicselect :code="code1"
                           :data="form.subtype"
                           :disabled="!disable"
                           :multiple="multiple"
                           @change="changesubtype"
                           style="width:20vw">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.application')" prop="application">
                <el-date-picker :disabled="true"
                                style="width:20vw"
                                type="date"
                                v-model="form.application"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.email')" prop="email">
                <el-input :disabled="!disable"
                          maxlength="50"
                          style="width:20vw"
                          v-model="form.email"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1017FORMVIEW_EXTENSION')" prop="extension">
                <el-input :disabled="!disable"
                          style="width:20vw"
                          v-model="form.extension"
                          maxlength="20"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1017FORMVIEW_IDTYPE')" prop="idtype">
                <dicselect :code="code2"
                           :data="form.idtype"
                           :disabled="!disable"
                           :multiple="multiple"
                           @change="changeidtype"
                           style="width:20vw">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS6005FORMVIEW_NOTE')">
                <el-input :disabled="!disable"
                          style="width:72vw"
                          type="textarea"
                          v-model="form.remark"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="30">
              <div class="sub_color_blue">{{$t('label.PFANS1017VIEW_MINGXI')}}</div>
            </el-col>
          </el-row>
          <el-row style="padding-top:1.5rem">
            <el-col :span="24">
              <el-table :data="tableT" stripe border header-cell-class-name="sub_bg_color_blue" style="width: 72vw">
                <el-table-column :label="$t('label.PFANS2007VIEW_NUMBER')" align="center" fixed prop="content"
                                 type="index"></el-table-column>
                <!--<el-table-column :label="$t('label.PFANS1017FORMVIEW_USERTYPE')" align="center" width="150">-->
                <!--<template slot-scope="scope">-->
                <!--<dicselect-->
                <!--:no="scope.row"-->
                <!--:code="code3"-->
                <!--:data="scope.row.usertype"-->
                <!--:disabled="!disable"-->
                <!--:multiple="multiple"-->
                <!--@change="changeusertype"-->
                <!--style="width: 100%"-->
                <!--&gt;</dicselect>-->
                <!--</template>-->
                <!--</el-table-column>-->
                <el-table-column :label="$t('label.PFANS1017FORMVIEW_USERNAME')" align="center" width="150">
                  <template slot-scope="scope">
                    <el-input :no="scope.row" :disabled="!disable" v-model="scope.row.username" maxlength="20"
                              style="width: 100%">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1017FORMVIEW_SURNAME')" align="center" width="130">
                  <template slot-scope="scope">
                    <el-input :no="scope.row" :disabled="!disable" v-model="scope.row.surname" maxlength="20"
                              style="width: 100%">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1017FORMVIEW_MING')" align="center" width="130">
                  <template slot-scope="scope">
                    <el-input :no="scope.row" :disabled="!disable" v-model="scope.row.ming" maxlength="20"
                              style="width: 100%">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1017FORMVIEW_ACCOUNTTYPE')" align="center" width="150">
                  <template slot-scope="scope">
                    <dicselect
                      :no="scope.row"
                      :code="code7"
                      :data="scope.row.accounttype"
                      :disabled="!disable"
                      :multiple="multiple"
                      @change="changeaccounttype"
                      style="width: 100%"
                    ></dicselect>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1017FORMVIEW_ACCOUNT')" align="center" width="160">
                  <template slot-scope="scope">
                    <el-input :no="scope.row" :disabled="!disable" v-model="scope.row.account" maxlength="20"
                              style="width: 100%">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1017FORMVIEW_TRANSMISSION')" align="center" width="150">
                  <template slot-scope="scope">
                    <dicselect
                      :no="scope.row"
                      :code="code4"
                      :data="scope.row.transmission"
                      :disabled="!disable"
                      :multiple="multiple"
                      @change="changetransmission"
                      style="width: 100%"
                    ></dicselect>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1017FORMVIEW_WAITFORTIME')" align="center" width="160">
                  <template slot-scope="scope">
                    <el-date-picker
                      :no="scope.row"
                      :disabled="!disable"
                      style="width: 100%"
                      type="date"
                      v-model="scope.row.waitfortime"
                    ></el-date-picker>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1012FORMVIEW_BUDGET')" align="center" width="150">
                  <template slot-scope="scope">
<!--                    <el-input :disabled="true" style="width:20vw" v-model="scope.row.budgetunit"></el-input>-->
                    <el-select clearable style="width: 100%" v-model="scope.row.budgetunit" :disabled="!disable"
                               :placeholder="$t('normal.error_09')">
                      <el-option
                        v-for="item in options1"
                        :key="item.value"
                        :label="item.lable"
                        :value="item.value"
                        @change="getBudgetunit">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1017FORMVIEW_CYBOZU')" align="center" width="150">
                  <template slot-scope="scope">
                    <dicselect
                      :no="scope.row"
                      :code="code5"
                      :data="scope.row.cybozu"
                      :disabled="!disable"
                      :multiple="multiple"
                      @change="changecybozu"
                      style="width: 100%"
                    ></dicselect>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1017FORMVIEW_WAITFORTIME')" align="center" width="160">
                  <template slot-scope="scope">
                    <el-date-picker
                      :no="scope.row"
                      :disabled="!disable"
                      style="width: 100%"
                      type="date"
                      v-model="scope.row.expecttime"
                    ></el-date-picker>
                  </template>
                </el-table-column>
                <!--                del_fjl_06/02  --与前两列重复 start 课题票NO.275-->
                <!--                <el-table-column :label="$t('label.PFANS1017FORMVIEW_DOMAINACCOUNT')" align="center" width="150">-->
                <!--                  <template slot-scope="scope">-->
                <!--                    <dicselect-->
                <!--                      :no="scope.row"-->
                <!--                      :code="code5"-->
                <!--                      :data="scope.row.domainaccount"-->
                <!--                      :disabled="!disable"-->
                <!--                      :multiple="multiple"-->
                <!--                      @change="changedomainaccount"-->
                <!--                      style="width: 100%"-->
                <!--                    ></dicselect>-->
                <!--                  </template>-->
                <!--                </el-table-column>-->
                <!--                <el-table-column :label="$t('label.PFANS1017FORMVIEW_WAITFORTIME')" align="center" width="160">-->
                <!--                  <template slot-scope="scope">-->
                <!--                    <el-date-picker-->
                <!--                      :no="scope.row"-->
                <!--                      :disabled="!disable"-->
                <!--                      style="width: 100%"-->
                <!--                      type="date"-->
                <!--                      v-model="scope.row.forwardtime"-->
                <!--                    ></el-date-picker>-->
                <!--                  </template>-->
                <!--                </el-table-column>-->
                <!--                del_fjl_06/02  --与前两列重复 start-->
                <el-table-column :label="$t('label.PFANS1017FORMVIEW_PREPAREFOR')" align="center" width="150">
                  <template slot-scope="scope">
                    <el-input :no="scope.row" :disabled="!disable" v-model="scope.row.preparefor" style="width: 100%">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.operation')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, tableT)"
                      type="danger"
                      size="small"
                      plain
                      :disabled="!disable"
                    >{{$t('button.delete')}}
                    </el-button>
                    <el-button
                      @click="addRow()"
                      type="primary"
                      size="small"
                      plain
                      :disabled="!disable"
                    >{{$t('button.insert')}}
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>
<script>
    import EasyNormalContainer from '@/components/EasyNormalContainer';
    import dicselect from '../../../components/dicselect.vue';
    import {Message} from 'element-ui';
    import user from '../../../components/user.vue';
    import {getCurrentRole4, getOrgInfoByUserId, getOrgInfo} from '@/utils/customize';
    import {validateEmail} from '@/utils/validate';
    import moment from 'moment';

    export default {
        name: 'PFANS1017FormView',
        components: {
            EasyNormalContainer,
            dicselect,
            user,
        },
        data() {
            var validateUserid = (rule, value, callback) => {
                if (!value || value === '' || value === 'undefined') {
                    callback(new Error(this.$t('normal.error_08') + this.$t('label.applicant')));
                    this.error = this.$t('normal.error_08') + this.$t('label.applicant');
                } else {
                    callback();
                    this.error = '';
                }
            };
            var checkemail = (rule, value, callback) => {
                if (this.form.email !== null && this.form.email !== '') {
                    if (!validateEmail(value)) {
                        callback(new Error(this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.email')));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            return {
                options1:[],
                centerid: '',
                groupid: '',
                teamid: '',
                buttonList: [],
                baseInfo: {},
                multiple: false,
              //start(添加角色权限，只有IT担当的人才可以进行受理)  ztc 2020/05/09
              acceptShow: 'true',
              enableSave: false,
              //end(添加角色权限，只有IT担当的人才可以进行受理)  ztc 2020/05/09
                loading: false,
                selectType: 'Single',
                error: '',
                title: 'title.PFANS1017VIEW',
                userlist: '',
                tabIndex: 0,
                form: {
                    center_id: '',
                    group_id: '',
                    team_id: '',
                    user_id: '',
                    type: this.$t('menu.PFANS1017'),
                    subtype: '',
                  //start(添加角色权限，只有IT担当的人才可以进行受理)  ztc 2020/05/09
                  corresponding: '',
                  //end(添加角色权限，只有IT担当的人才可以进行受理)  ztc 2020/05/09
                    application: moment(new Date()).format('YYYY-MM-DD'),
                    email: '',
                  remark: '',
                    extension: '',
                    idtype: '',
                },
                tableT: [{
                    number: '',
                  // usertype: '',
                    username: '',
                    surname: '',
                    ming: '',
                    account: '',
                    transmission: '',
                  accounttype: '',
                    waitfortime: '',
                    budgetunit: '',
                    cybozu: '',
                    expecttime: '',
                    domainaccount: '',
                    forwardtime: '',
                    preparefor: '',
                }],
                code1: 'PJ037',
                code2: 'PJ038',
              // code3: 'PJ039',
                code4: 'PJ040',
                code5: 'PJ041',
                code6: 'PG001',
              // 邮箱类型
              code7: 'PJ046',
                disabled: false,
                rules: {
                    user_id: [{
                        required: true,
                        validator: validateUserid,
                        trigger: 'change',
                    }],
                    subtype: [{
                        required: true,
                        message: this.$t('normal.error_09') + this.$t('label.subtype'),
                        trigger: 'change',
                    }],
                    application: [{
                        required: true,
                        message: this.$t('normal.error_09') + this.$t('label.application'),
                        trigger: 'change',
                    }],
                    email: [
                        {validator: checkemail, trigger: 'change'}],
                    extension: [
                        {
                            required: true,
                            message: this.$t('normal.error_08') + this.$t('label.PFANS3001VIEW_EXTENSIONNUMBER'),
                            trigger: 'change'
                        }],
                    idtype: [{
                        required: true,
                        message: this.$t('normal.error_09') + this.$t('label.PFANS1017FORMVIEW_IDTYPE'),
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
                        key: 'save',
                        name: 'button.save',
                        disabled: false,
                        icon: 'el-icon-check',
                    },
                ];
            }
        },
        mounted() {
            if (this.$route.params._id) {
                this.loading = true;
                this.$store
                    .dispatch('PFANS1017Store/selectById', {'psdcd_id': this.$route.params._id})
                    .then(response => {
                        let rst = getOrgInfoByUserId(response.psdcd.user_id);
                        if (rst) {
                            this.centerid = rst.centerNmae;
                            this.groupid = rst.groupNmae;
                            this.teamid = rst.teamNmae;
                        }
                        if (this.form.status === '2') {
                            this.disable = false;
                        }
                        this.userlist = response.user_id;
                        this.form = response.psdcd;
                        if (response.psdcddetail.length > 0) {
                            this.tableT = response.psdcddetail;
                        }
                      //start(添加角色权限，只有IT担当的人才可以进行受理)  ztc 2020/05/09
                      let role = getCurrentRole4();
                      if (role === '0') {
                        if (this.form.status === '4') {
                          this.enableSave = true;
                          if (this.disable) {
                            this.acceptShow = false;
                          } else {
                            this.acceptShow = true;
                          }
                        } else {
                          this.acceptShow = true;
                          this.enableSave = false;
                        }
                      }
                      //end(添加角色权限，只有IT担当的人才可以进行受理)  ztc 2020/05/09
                        this.userlist = this.form.user_id;
                        this.getBudt(this.userlist);
                        this.loading = false;
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
                this.userlist = this.$store.getters.userinfo.userid;
                if (this.userlist !== null && this.userlist !== '') {
                    this.form.user_id = this.$store.getters.userinfo.userid;
                    let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
                    // if(getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId)){
                    //     this.tableT[0].budgetunit = getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId).encoding;
                    // }
                    if (rst) {
                        this.centerid = rst.centerNmae;
                        this.groupid = rst.groupNmae;
                        this.teamid = rst.teamNmae;
                        this.form.center_id = rst.centerId;
                        this.form.group_id = rst.groupId;
                        this.form.team_id = rst.teamId;
                    }
                    this.getBudt(this.form.user_id);
                }
            }
        },
        methods: {
            getBudt(val){
                //ADD_FJL  修改人员预算编码
                if (getOrgInfo(getOrgInfoByUserId(val).groupId)) {
                    let butinfo = getOrgInfo(getOrgInfoByUserId(val).groupId).encoding;
                    let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'JY002');
                    if(dic.length > 0){
                        for (let i = 0; i < dic.length; i++) {
                            if(butinfo === dic[i].value1){
                                this.options1.push({
                                    lable: dic[i].value2 +'_'+ dic[i].value3,
                                    value: dic[i].code,
                                })
                            }
                        }
                    }
                }
                //ADD_FJL  修改人员预算编码
            },
          // <!--//start(添加角色权限，只有IT担当的人才可以进行受理)  ztc 2020/05/09-->
          getcorresponding(val) {
            this.form.corresponding = val;
          },
          //<!--//start(添加角色权限，只有IT担当的人才可以进行受理)  ztc 2020/05/09-->
            getUserids(val) {
                this.form.user_id = val;
                let rst = getOrgInfoByUserId(val);
                // if(getOrgInfo(getOrgInfoByUserId(val).groupId)){
                //     this.form.budgetunit = getOrgInfo(getOrgInfoByUserId(val).groupId).encoding;
                // }
                if (rst) {
                    this.centerid = rst.centerNmae;
                    this.groupid = rst.groupNmae;
                    this.teamid = rst.teamNmae;
                    this.form.center_id = rst.centerId;
                    this.form.group_id = rst.groupId;
                    this.form.team_id = rst.teamId;
                } else {
                    this.centerid = '';
                    this.groupid = '';
                    this.teamid = '';
                    this.form.center_id = '';
                    this.form.group_id = '';
                    this.form.team_id = '';
                }
                if (!this.form.user_id || this.form.user_id === '' || val === 'undefined') {
                    this.error = this.$t('normal.error_08') + this.$t('label.applicant');
                } else {
                    this.error = '';
                }
            },
            workflowState(val) {
                if (val.state === '1') {
                    this.form.status = '3';
                } else if (val.state === '2') {
                    this.form.status = '4';
                }
                this.buttonClick('update');
            },
          //upd 审批流程 fr
          // start(val) {
          //   this.form.status = '2';
          //   this.buttonClick("update");
          // },
          start(val) {
            if (val.state === '0') {
              this.form.status = '2';
            }else if (val.state === '2') {
              this.form.status = '4';
            }
            this.buttonClick('update');
          },
          //upd 审批流程 to
            end() {
                this.form.status = '0';
                this.buttonClick('update');
            },
            changesubtype(val) {
                this.form.subtype = val;
            },
            changeidtype(val) {
                this.form.idtype = val;
            },
          // changeusertype(val, row) {
          //     row.usertype = val;
          // },
          changeaccounttype(val, row) {
            row.accounttype = val;
            },
            changetransmission(val, row) {
                row.transmission = val;
            },
            changecybozu(val, row) {
                row.cybozu = val;
            },
            getBudgetunit(val, row) {
                row.budgetunit = val;
            },
            changedomainaccount(val, row) {
                row.domainaccount = val;
            },
            deleteRow(index, rows) {
                if (rows.length > 1) {
                    rows.splice(index, 1);
                } else {
                    this.tableT = [{
                        psdcddetail_id: '',
                        psdcd_id: '',
                      // usertype: ' ',
                        username: '',
                        surname: '',
                        ming: '',
                        account: '',
                        transmission: ' ',
                      accounttype: ' ',
                        waitfortime: '',
                        budgetunit: ' ',
                        cybozu: ' ',
                        expecttime: '',
                        domainaccount: ' ',
                        forwardtime: '',
                        preparefor: '',
                    }]
                }
            },
            addRow() {
                this.tableT.push({
                    psdcddetail_id: '',
                    psdcd_id: '',
                  // usertype: '',
                    username: '',
                    surname: '',
                    ming: '',
                    account: '',
                    transmission: '',
                  accounttype: '',
                    waitfortime: '',
                    budgetunit: '',
                    cybozu: '',
                    expecttime: '',
                    domainaccount: '',
                    forwardtime: '',
                    preparefor: '',
                    rowindex: '',
                });
            },
            buttonClick(val) {
                this.$refs['refform'].validate(valid => {
                    if (valid) {
                        this.loading = true;
                        this.baseInfo = {};
                        this.form.application = moment(this.form.application).format('YYYY-MM-DD');
                        this.baseInfo.psdcd = JSON.parse(JSON.stringify(this.form));
                        this.baseInfo.psdcddetail = [];
                        for (let i = 0; i < this.tableT.length; i++) {
                            if (this.tableT[i].number !== '' || this.tableT[i].usertype !== '' || this.tableT[i].username !== '' ||
                                this.tableT[i].surname !== '' || this.tableT[i].ming !== '' || this.tableT[i].account !== '' ||
                              this.tableT[i].transmission !== '' || this.tableT[i].accounttype !== '' || this.tableT[i].waitfortime !== '' || this.tableT[i].budgetunit !== '' ||
                                this.tableT[i].cybozu !== '' || this.tableT[i].expecttime !== '' || this.tableT[i].domainaccount !== '' ||
                                this.tableT[i].forwardtime !== '' || this.tableT[i].preparefor !== '') {
                                this.baseInfo.psdcddetail.push(
                                    {
                                        psdcddetail_id: this.tableT[i].psdcddetail_id,
                                        psdcd_id: this.tableT[i].psdcd_id,
                                        number: this.tableT[i].number,
                                      // usertype: this.tableT[i].usertype,
                                        username: this.tableT[i].username,
                                        surname: this.tableT[i].surname,
                                        ming: this.tableT[i].ming,
                                        account: this.tableT[i].account,
                                        transmission: this.tableT[i].transmission,
                                      accounttype: this.tableT[i].accounttype,
                                        waitfortime: this.tableT[i].waitfortime,
                                        budgetunit: this.tableT[i].budgetunit,
                                        cybozu: this.tableT[i].cybozu,
                                        expecttime: this.tableT[i].expecttime,
                                        domainaccount: this.tableT[i].domainaccount,
                                        forwardtime: this.tableT[i].forwardtime,
                                        preparefor: this.tableT[i].preparefor,
                                    },
                                );
                            }
                        }
                        if (this.$route.params._id) {
                            this.form.psdcd_id = this.$route.params._id;
                            this.$store
                                .dispatch('PFANS1017Store/update', this.baseInfo)
                                .then(response => {
                                    this.data = response;
                                    this.loading = false;
                                    if (val !== 'update') {
                                        Message({
                                            message: this.$t('normal.success_02'),
                                            type: 'success',
                                            duration: 5 * 1000,
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
                            this.loading = true;
                            this.$store
                                .dispatch('PFANS1017Store/insert', this.baseInfo)
                                .then(response => {
                                    this.data = response;
                                    this.loading = false;
                                    Message({
                                        message: this.$t('normal.success_01'),
                                        type: 'success',
                                        duration: 5 * 1000,
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
                    else{
                        Message({
                            message: this.$t("normal.error_12"),
                            type: 'error',
                            duration: 5 * 1000
                        });
                    }
                });
            },
        },
    };
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
