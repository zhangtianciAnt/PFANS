<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :title="title" @buttonClick="buttonClick" ref="container"
                         @workflowState="workflowState" v-loading="loading" @disabled="setdisabled"
                         :enableSave="enableSave"
                         :canStart="canStart" @start="start" @end="end">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="refform"
                 style="padding:3vw">
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
              <el-form-item :error="erroruser" :label="$t('label.applicant')" prop="user_id">
                <user :disabled="true" :error="erroruser" :selectType="selectType" :userlist="userlist"
                      @getUserids="getUserids" style="width: 20vw"></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.application_date')" prop="application_date">
                <el-date-picker
                  :disabled="true"
                  style="width:20vw"
                  type="date"
                  v-model="form.application_date">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3005VIEW_LINENUMBER')" prop="linenumber">
                <el-input :disabled="!disable" maxlength="20" style="width:20vw"
                          v-model="form.linenumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3005VIEW_SETPLACE')" prop="setplace">
                <el-input :disabled="!disable" style="width:20vw" maxlength='20'
                          v-model="form.setplace"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :error="errorcontroller" :label="$t('label.PFANS3005VIEW_CONTROLLER')" prop="controller">
                <user :disabled="!disable" :error="errorcontroller" :selectType="selectType" :userlist="controllerlist"
                      style="width:20vw" v-model="form.controller"
                      @getUserids="getController"></user>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :error="errorusername" :label="$t('label.PFANS3005VIEW_USER')" prop="username">
                <user :disabled="!disable" :error="errorusername" :selectType="selectType" :userlist="usernamelist"
                      style="width:20vw" v-model="form.username"
                      @getUserids="getUsername"></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1012FORMVIEW_BUDGET')">
                <!--                <el-input :disabled="true" maxlength="20" style="width:20vw"-->
                <!--                          v-model="form.budgetnumber"></el-input>-->
                <el-select clearable style="width: 20vw" v-model="form.budgetnumber" :disabled="!disable"
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
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3005FORMVIEW_CAREERPLAN')" prop="careerplan">
                <span style="margin-right: 1rem ">{{$t('label.PFANS1004VIEW_OUTER')}}</span>
                <el-switch
                  :disabled="!disable"
                  v-model="form.careerplan"
                  active-value="1"
                  inactive-value="0"
                  @change="radiochange">
                </el-switch>
                <span style="margin-left: 1rem ">{{$t('label.PFANS1004VIEW_INSIDE')}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3005FORMVIEW_BUSINESSPLANTYPE')" prop="businessplantype"
                            v-show="show1">
                <dicselect
                  :code="code1"
                  :data="form.businessplantype"
                  :disabled="!disable"
                  :multiple="multiple"
                  style="width:20vw"
                  @change="getBusinessplantype"
                  v-model="form.businessplantype">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3003FORMVIEW_CLASSIFICATION')" prop="classificationtype"
                            v-show="show2">
                <dicselect
                  :code="code2"
                  :data="form.classificationtype"
                  :disabled="!disable"
                  :multiple="multiple"
                  style="width:20vw"
                  @change="getClassificationtype">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3005FORMVIEW_BUSINESSPLANBALANCE')" prop="businessplanbalance"
                            v-show="show3">
                <el-input-number v-model="form.businessplanbalance"
                                 controls-position="right"
                                 :disabled="!disable"
                                 :min="0"
                                 :max="1000000000"
                                 :precision="2"
                                 style="width:20vw"
                ></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3005VIEW_BUSINESSPLANAMOUNT')" prop="businessplanamount">
                <el-input-number v-model="form.businessplanamount"
                                 controls-position="right"
                                 :disabled="!disable"
                                 :min="0"
                                 :max="1000000000"
                                 :precision="2"
                                 style="width:20vw"
                ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3005VIEW_PURCHASEPURPOSE')" prop="purchasepurpose">
                <el-input :disabled="!disable" style="width:20vw" v-model="form.purchasepurpose"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3005VIEW_PROCUREMENTPROJECT')" prop="procurementproject">
                <dicselect
                  :code="code3"
                  :data="form.procurementproject"
                  :disabled="!disable"
                  :multiple="multiple"
                  style="width:20vw"
                  @change="getprocurementproject">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3005FORMVIEW_FIXEDASSETSNO')" v-show="show5" prop="fixedassetsno">
                <el-input :disabled="!disable" style="width:20vw" maxlength='20'
                          v-model="form.fixedassetsno"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3005FORMVIEW_OUTASSETSNO')" v-show="show4" prop="outassetsno">
                <el-input :disabled="!disable" style="width:20vw" maxlength='20'
                          v-model="form.fixedassetsno"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3005VIEW_PROCUREMENTDETAILS')">
                <el-input :disabled="!disable" style="width:20vw" v-model="form.procurementdetails"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.remarks')">
                <el-input :disabled="!disable" type="textarea" style="width:72vw" v-model="form.remarks"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3005VIEW_BRANDNAME')">
                <el-input :disabled="!disable" style="width:20vw" maxlength='20' v-model="form.brandname"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3005VIEW_MODEL')">
                <el-input :disabled="!disable" style="width:20vw" maxlength='20' v-model="form.model"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3005VIEW_EQUIPMENTURL')">
                <el-input :disabled="!disable" style="width:20vw" maxlength='50'
                          v-model="form.equipmenturl"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3005VIEW_QUANTITY')" prop="quantity">
                <el-input-number v-model="form.quantity"
                                 controls-position="right"
                                 :disabled="!disable"
                                 :min="0"
                                 :max="1000000000"
                                 :step="1"
                                 style="width:20vw"
                                 @change="changeSum"
                ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3005VIEW_UNITPRICE')" prop="unitprice">
                <el-input-number v-model="form.unitprice"
                                 @change="changeSum"
                                 controls-position="right"
                                 :disabled="!disable"
                                 :min="0"
                                 :max="1000000000"
                                 :precision="2"
                                 style="width:20vw"

                ></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3005VIEW_TOTALAMOUNT')" prop="totalamount">
                <el-input-number :disabled="true" :precision="2" style="width:20vw" controls-position="right"
                                 v-model="form.totalamount">
                </el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3005VIEW_STORAGEDATE')">
                <el-date-picker
                  startDate
                  :disabled="!disable"
                  style="width:20vw"
                  type="date"
                  v-model="form.storagedate">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3005VIEW_COLLECTIONDAY')">
                <el-date-picker
                  startDate
                  :disabled="!disable"
                  style="width:20vw"
                  type="date"
                  v-model="form.collectionday">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :errorrecipients="errorrecipients" :label="$t('label.PFANS3005VIEW_RECIPIENTS')"
                            prop="recipients">
                <user :disabled="!disable" :errorrecipients="errorrecipients" :selectType="selectType"
                      :userlist="recipientslist"
                      style="width:20vw" v-model="form.recipients"
                      @getUserids="getRecipientslist"></user>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3005VIEW_ACTUARIALDATE')">
                <el-date-picker
                  startDate
                  :disabled="!disable"
                  style="width:20vw"
                  type="date"
                  v-model="form.actuarialdate">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3005VIEW_ACTUARIALAMOUNT')">
                <el-input-number v-model="form.actuarialamount"
                                 controls-position="right"
                                 :disabled="!disable"
                                 :min="0"
                                 :max="1000000000"
                                 :precision="2"
                                 style="width:20vw"
                ></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>
<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import PFANS3005View from '../PFANS3005/PFANS3005View.vue';
  import {Message} from 'element-ui';
  import user from '../../../components/user.vue';
  import {getOrgInfoByUserId, getOrgInfo, getCurrentRole2} from '@/utils/customize';
  import moment from 'moment';
  import dicselect from '../../../components/dicselect.vue';

  export default {
    name: 'PFANS3005FormView',
    components: {
      EasyNormalContainer,
      dicselect,
      getOrgInfoByUserId,
      PFANS3005View,
      user,
    },
    data() {
      var checkuser = (rule, value, callback) => {
        if (!value || value === '' || value === 'undefined') {
          this.erroruser = this.$t('normal.error_09') + this.$t('label.applicant');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.applicant')));
        } else {
          this.erroruser = '';
          return callback();
        }
      };
      var checkcontroller = (rule, value, callback) => {
        if (!value || value === '' || value === 'undefined') {
          this.errorcontroller = this.$t('normal.error_09') + this.$t('label.PFANS3005VIEW_CONTROLLER');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS3005VIEW_CONTROLLER')));
        } else {
          this.errorcontroller = '';
          return callback();
        }
      };
      return {
        options1: [],
        centerid: '',
        groupid: '',
        teamid: '',
        regExp: [],
        multiple: false,
        loading: false,
        erroruser: '',
        errorusername: '',
        errorcontroller: '',
        errorrecipients: '',
        selectType: 'Single',
        userlist: '',
        controllerlist: '',
        usernamelist: '',
        recipientslist: '',
        title: 'title.PFANS3005VIEW',
        enableSave: false,
        buttonList: [],
        editableTabsValue: '0',
        editableTabs: [],
        tabIndex: 0,
        refuseShow: false,
        form: {
          careerplan: true,
          businessplantype: '',
          classificationtype: '',
          businessplanbalance: '',
          procurementproject: '',
          user_id: '',
          center_id: '',
          group_id: '',
          team_id: '',
          setplace: '',
          linenumber: '',
          controller: '',
          user: '',
          budgetnumber: '',
          businessplanamount: '',
          purchasepurpose: '',
          fixedassetsno: '',
          outassetsno: '',
          procurementdetails: '',
          brandname: '',
          model: '',
          equipmenturl: '',
          quantity: '',
          unitprice: '',
          totalamount: '',
          storagedate: '',
          collectionday: '',
          recipients: '',
          actuarialdate: '',
          actuarialamount: '',
          application_date: moment(new Date()).format('YYYY-MM-DD'),
          nodeList: [],
          accept: '0',
          acceptstatus: '',
          findate: '',
          refusereason: '',
        },
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
        code1: 'PR002',
        code2: 'PR003',
        code3: 'PJ005',
        show1: true,
        show2: false,
        show3: true,
        show4: false,
        show5: true,
        menuList: [],
        disabled: false,
        rules: {
          user_id: [{
            required: true,
            validator: checkuser,
            trigger: 'change',
          }],
          application_date: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.application_date'),
              trigger: 'change',
            },
          ],
          linenumber: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS3005VIEW_LINENUMBER'),
              trigger: 'change',
            }],
          setplace: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS3005VIEW_SETPLACE'),
              trigger: 'change',
            },
          ],
          controller: [
            {
              required: true,
              validator: checkcontroller,
              trigger: 'change',
            },
          ],
          businessplantype: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS3005FORMVIEW_BUSINESSPLANTYPE'),
              trigger: 'change',
            },
          ],
          businessplanbalance: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS3005FORMVIEW_BUSINESSPLANBALANCE'),
              trigger: 'change',
            },
          ],
          classificationtype: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS3003FORMVIEW_CLASSIFICATION'),
              trigger: 'change',
            },
          ],
          businessplanamount: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS3005VIEW_BUSINESSPLANAMOUNT'),
              trigger: 'change',
            },
          ],
          purchasepurpose: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS3005VIEW_PURCHASEPURPOSE'),
              trigger: 'change',
            },
          ],
          procurementproject: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS3005VIEW_PROCUREMENTPROJECT'),
              trigger: 'change',
            },
          ],
          quantity: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS3005VIEW_QUANTITY'),
              trigger: 'change',
            },
          ],
          unitprice: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS3005VIEW_UNITPRICE'),
              trigger: 'change',
            },
          ],
          totalamount: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS3005VIEW_TOTALAMOUNT'),
              trigger: 'change',
            },
          ],
        },
        canStart: false,
      };
    },
    mounted() {
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS3005Store/getPurchaseOne', {'purchase_id': this.$route.params._id})
          .then(response => {
            this.form = response;
            if (this.form.acceptstatus === '1') {
              this.refuseShow = true;
            } else {
              this.refuseShow = false;
            }
            if (this.form.status === '4') {
              //start(添加角色权限，只有总务的人才可以进行受理)  fjl 2020/04/08
              let role = getCurrentRole2();
              if (role === '0') {
                if (this.disable) {
                  this.form.findate = moment(new Date()).format('YYYY-MM-DD');
                  this.acceptShow = false;
                } else {
                  this.acceptShow = true;
                }
              } else {
                this.acceptShow = true;
              }
              //end(添加角色权限，只有总务的人才可以进行受理)  fjl 2020/04/08
              this.enableSave = true;
            } else {
              this.enableSave = false;
            }
            let rst = getOrgInfoByUserId(response.user_id);
            if (rst) {
              this.centerid = rst.centerNmae;
              this.groupid = rst.groupNmae;
              this.teamid = rst.teamNmae;
            }
            if (this.form.careerplan === '1') {
              this.show3 = true;
              this.show1 = true;
              this.rules.businessplantype[0].required = true;
              this.rules.businessplanbalance[0].required = true;
            } else {
              this.show3 = false;
              this.show2 = false;
              this.show1 = false;
              this.rules.businessplantype[0].required = false;
              this.rules.businessplanbalance[0].required = false;
              this.rules.classificationtype[0].required = false;
            }
            if (this.form.businessplantype === 'PR002005') {
              this.show2 = true;
            } else if (this.form.businessplantype === 'PR002001') {
              this.show2 = false;
            } else if (this.form.businessplantype === 'PR002002') {
              this.show2 = false;
            } else if (this.form.businessplantype === 'PR002003') {
              this.show2 = false;
            } else if (this.form.businessplantype === 'PR002004') {
              this.show2 = false;
            }
            if (this.form.procurementproject === 'PJ005001') {
              this.show5 = true;
              this.show4 = false;
            } else if (this.form.procurementproject === 'PJ005002') {
              this.show4 = true;
              this.show5 = false;
            } else if (this.form.procurementproject === 'PJ005003') {
              this.show4 = true;
              this.show5 = false;
            } else if (this.form.procurementproject === 'PJ005004') {
              this.show4 = true;
              this.show5 = false;
            } else if (this.form.procurementproject === 'PJ005005') {
              this.show4 = true;
              this.show5 = false;
            } else if (this.form.procurementproject === 'PJ005006') {
              this.show4 = true;
              this.show5 = false;
            }
            this.userlist = this.form.user_id;
            this.controllerlist = this.form.controller;
            this.usernamelist = this.form.username;
            this.recipientslist = this.form.recipients;
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
          let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
          // if(getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId)){
          //     this.form.budgetnumber = getOrgInfo(getOrgInfoByUserId(this.$store.getters.userinfo.userid).groupId).encoding;
          // }
          if (rst) {
            this.centerid = rst.centerNmae;
            this.groupid = rst.groupNmae;
            this.teamid = rst.teamNmae;
            this.form.center_id = rst.centerId;
            this.form.group_id = rst.groupId;
            this.form.team_id = rst.teamId;
          }
          this.form.user_id = this.$store.getters.userinfo.userid;
          this.getBudt(this.form.user_id);
        }
      }
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
      if (this.form.careerplan === '1') {
        this.show3 = true;
        this.show1 = true;
        this.rules.businessplantype[0].required = true;
        this.rules.businessplanbalance[0].required = true;
      } else {
        this.show3 = false;
        this.show1 = false;
        this.rules.businessplantype[0].required = false;
        this.rules.businessplanbalance[0].required = false;
        this.rules.classificationtype[0].required = false;
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
                });
              }
            }
          }
        }
        //ADD_FJL  修改人员预算编码
      },
      getBudgetunit(val) {
        this.form.budgetnumber = val;
      },
      setdisabled(val) {
        if (this.$route.params.disabled) {
          this.disable = val;
        }
      },
      changeSum() {
        this.form.totalamount = this.form.quantity * this.form.unitprice;
      },
      getUserids(val) {
        this.form.user_id = val;
        this.userlist = val;
        let rst = getOrgInfoByUserId(val);
        // if(getOrgInfo(getOrgInfoByUserId(val).groupId)){
        //     this.form.budgetnumber = getOrgInfo(getOrgInfoByUserId(val).groupId).encoding;
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
          this.erroruser = this.$t('normal.error_09') + this.$t('label.applicant');
        } else {
          this.erroruser = '';
        }
      },
      getController(val) {
        this.form.controller = val;
        this.controllerlist = val;
        if (!this.form.controller || this.form.controller === '' || val === 'undefined') {
          this.errorcontroller = this.$t('normal.error_09') + this.$t('label.PFANS3005VIEW_CONTROLLER');
        } else {
          this.errorcontroller = '';
        }
      },
      radiochange(val) {
        this.form.careerplan = val;
        if (val === '1') {
          this.show1 = true;
          this.show3 = true;
          if (this.form.businessplantype === 'PR002005') {
            this.show2 = true;
            this.rules.classificationtype[0].required = true;
          }
          this.rules.businessplantype[0].required = true;
          this.rules.businessplanbalance[0].required = true;
        } else {
          this.show1 = false;
          this.show2 = false;
          this.show3 = false;
          this.rules.businessplantype[0].required = false;
          this.rules.businessplanbalance[0].required = false;
          this.rules.classificationtype[0].required = false;
        }
      },
      getBusinessplantype(val) {
        this.form.businessplantype = val;
        if (val === 'PR002005') {
          this.show2 = true;
          this.rules.classificationtype[0].required = true;
        } else if (val === 'PR002001') {
          this.show2 = false;
          this.rules.classificationtype[0].required = false;
        } else if (val === 'PR002002') {
          this.show2 = false;
          this.rules.classificationtype[0].required = false;
        } else if (val === 'PR002003') {
          this.show2 = false;
          this.rules.classificationtype[0].required = false;
        } else if (val === 'PR002004') {
          this.show2 = false;
          this.rules.classificationtype[0].required = false;
        }
      },
      getClassificationtype(val) {
        this.form.classificationtype = val;
      },
      getprocurementproject(val) {
        this.form.procurementproject = val;
        if (val === 'PJ005001') {
          this.show5 = true;
          this.show4 = false;
        } else if (val === 'PJ005002') {
          this.show4 = true;
          this.show5 = false;
        } else if (val === 'PJ005003') {
          this.show4 = true;
          this.show5 = false;
        } else if (val === 'PJ005004') {
          this.show4 = true;
          this.show5 = false;
        } else if (val === 'PJ005005') {
          this.show4 = true;
          this.show5 = false;
        } else if (val === 'PJ005006') {
          this.show4 = true;
          this.show5 = false;
        }
      },
      getUsername(val) {
        this.form.username = val;
        this.usernamelist = val;
        if (!this.form.username || this.form.username === '' || val === 'undefined') {
        } else {
          this.errorusername = '';
        }
      },
      getRecipientslist(val) {
        this.form.recipients = val;
        this.recipientslist = val;
        if (!this.form.recipients || this.form.recipients === '' || val === 'undefined') {
          this.errorrecipients = this.$t('normal.error_08') + this.$t('label.PFANS3005VIEW_RECIPIENTS');
        } else {
          this.errorrecipients = '';
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
      start(val) {
        if (val.state === '0') {
          this.form.status = '2';
        } else if (val.state === '2') {
          this.form.status = '4';
        }
        // this.form.status = '2';
        this.buttonClick('update');
      },
      end() {
        this.form.status = '0';
        this.buttonClick('update');
      },
      //add-ws-4/28-精算中，点击决裁，跳转画面
      checkparamsTitle() {
        let id = this.$route.params._checkid;
        this.$router.push({
          name: 'PFANS1012FormView',
          params: {
            _id: id,
          },
        });
      },

      paramsTitle() {
        this.$router.push({
          name: 'PFANS3005View',
        });
      },
      //add-ws-4/28-精算中，点击决裁，跳转画面
      buttonClick(val) {
        if (val === 'back') {
          //add-ws-4/28-精算中，点击决裁，跳转画面
          if (this.$route.params._check != null && this.$route.params._check != '' && this.$route.params._check != undefined) {
            if (this.$route.params._check) {
              this.checkparamsTitle();
            }
          } else {
            this.paramsTitle();
          }
          //add-ws-4/28-精算中，点击决裁，跳转画面
        } else {
          this.$refs['refform'].validate(valid => {
            if (valid) {
              this.loading = true;
              if (this.form.careerplan === '0') {
                this.form.businessplantype = '';
                this.form.businessplanbalance = '';
                this.form.classificationtype = '';
              }
              if (this.form.businessplantype === 'PR002001') {
                this.form.classificationtype = '';
              } else if (this.form.businessplantype === 'PR002002') {
                this.form.classificationtype = '';
              } else if (this.form.businessplantype === 'PR002003') {
                this.form.classificationtype = '';
              } else if (this.form.businessplantype === 'PR002004') {
                this.form.classificationtype = '';
              }
              if (this.$route.params._id) {
                this.form.purchase_id = this.$route.params._id;
                this.$store
                  .dispatch('PFANS3005Store/updatePurchase', this.form)
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
                this.$store
                  .dispatch('PFANS3005Store/createPurchase', this.form)
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
            } else {
              Message({
                message: this.$t('normal.error_12'),
                type: 'error',
                duration: 5 * 1000,
              });
            }
          });
        }
      },
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
