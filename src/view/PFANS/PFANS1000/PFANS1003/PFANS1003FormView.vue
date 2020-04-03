<template>
  <div style="min-height: 100%">
    <EasyNormalContainer ref="container" :title="title" @buttonClick="buttonClick" v-loading="loading" :buttonList="buttonList"
                         @workflowState="workflowState" :canStart="canStart" @start="start" @end="end">
      <div slot="customize">
        <el-form :model="form" label-width="8vw" label-position="top" style="padding: 3vw" :rules="rules"
                 ref="refform">
          <el-row>
            <el-col :span="8">
              <el-form-item  :label="$t('label.center')">
                <el-input :disabled="true" style="width:20vw" v-model="centerid"></el-input>
                <el-input v-show='false' v-model="form.center_id" :disabled="true" style="width:20vw"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')">
                <el-input :disabled="true" style="width:20vw" v-model="groupid"></el-input>
                <el-input v-show='false' v-model="form.group_id" :disabled="true" style="width:20vw"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')" prop="team_id">
                <el-input :disabled="true" style="width:20vw" v-model="teamid"></el-input>
                <el-input v-show='false' v-model="form.team_id" :disabled="true" style="width:20vw"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :error="error"  :label="$t('label.applicant')" prop="user_id">
                <user :disabled="true" :error="error" :selectType="selectType" :userlist="userlist"
                      @getUserids="getUserids" style="width: 20vw"></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1012VIEW_TELEPHONE')" prop="investigator">
                <el-input v-model="form.investigator" :disabled="!disabled" style="width:20vw" maxlength='20'></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004VIEW_SCHEDULEDDATE')" prop="scheduleddate" >
                <el-date-picker :disabled="!disabled" type="date" v-model="form.scheduleddate" style="width:20vw" ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004VIEW_FILENAME')" prop="filename">
                <el-input v-model="form.filename" :disabled="!disabled" style="width: 20vw" maxlength='50'></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004VIEW_CAREERPLAN')"   prop="careerplan">
                <span style="margin-right: 1vw ">{{$t('label.PFANS1004VIEW_OUTER')}}</span>
                <el-switch
                  :disabled="!disabled"
                  v-model="form.careerplan"
                  active-value="1"
                  inactive-value="0"
                  @change="radiochange">
                </el-switch>
                <span style="margin-left: 1vw ">{{$t('label.PFANS1004VIEW_INSIDE')}}</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004VIEW_BUSINESSPLANTYPE')" prop="businessplantype" v-show="show">
                <dicselect
                  :code="code"
                  :data="form.businessplantype"
                  :multiple="multiple"
                  @change="getBusinessplantype"
                  style="width:20vw"
                  :disabled="!disabled">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004VIEW_CLASSIFICATIONTYPE')" prop="classificationtype"  v-show="show1">
                <dicselect
                  :code="code1"
                  :data="form.classificationtype"
                  :multiple="multiple"
                  @change="getClassificationtype"
                  style="width:20vw"
                  :disabled="!disabled">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004VIEW_BUSINESSPLANBALANCE')" prop="businessplanbalance" v-show="show">
                <el-input-number v-model="form.businessplanbalance" @change="moneyDiff" controls-position="right" style="width:20vw" :disabled="!disabled" :min="0" :max="1000000000" :precision="2"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004VIEW_AMOUNTTOBEGIVEN')" prop="amounttobegiven">
                <el-input-number v-model="form.amounttobegiven" @change="moneyDiff" controls-position="right" style="width:20vw" :disabled="!disabled" :min="0" :max="1000000000" :precision="2"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004FORMVIEW_FREEDEVICE')" prop="freedevice">
                <el-radio-group v-model="radio1" @change="radio1change">
                  <el-radio :label="1" :disabled="!disabled">{{$t('label.yes')}}</el-radio>
                  <el-radio :label="2" :disabled="!disabled">{{$t('label.no')}}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item :label="$t('label.PFANS1004VIEW_GIST')" prop="gist">
              <el-switch
                v-model="value1"
                :active-text='$t("label.PFANS1004FORMVIEW_FREEBORROWING")'
                :inactive-text='$t("label.PFANS1004FORMVIEW_FREEOFCHARGE")'
                @change="value1change"
                :disabled="!disabled"
                v-show="show4">
              </el-switch>
                <el-input v-model="form.gist" type="textarea" :disabled="!disabled" :rows="16" style="width: 72vw"></el-input>
              </el-form-item>
          </el-row>

<!--          //表格-->

          <el-row>
            <el-col :span="22">
              <el-table :data="tableA" stripe border header-cell-class-name="sub_bg_color_blue"
                        style="width: 90vw">
                <el-table-column
                  :label="$t('label.PFANS1004VIEW_DEVICENAME')"
                  align="center" >
                  <template slot-scope="scope">
                    <el-input
                      :no="scope.row"
                      :disabled="!disabled"
                      v-model="scope.row.devicename"
                      style="width: 100%">
                    </el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('label.PFANS3005VIEW_QUANTITY')"
                  align="center">
                  <template slot-scope="scope">
                    <el-input-number
                      v-model="scope.row.quantity"
                      controls-position="right"
                      style="width:12vw"
                      :disabled="!disabled"
                      :min="0" :max="1000000000"
                      @change="changeSum(scope.row)"
                      :precision="2"></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('label.PFANS1004VIEW_UNPRICE')"
                  align="center">
                  <template slot-scope="scope">
                    <el-input-number
                      v-model="scope.row.unitprice"
                      controls-position="right"
                      style="width:12vw"
                      :disabled="!disabled"
                      :min="0" :max="1000000000"
                      @change="changeSum(scope.row)"
                      :precision="2"></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column
                  :label="$t('label.PFANS1004VIEW_PRICE')"
                  align="center">
                  <template slot-scope="scope">
                    <el-input-number
                      v-model="scope.row.price"
                      controls-position="right"
                      style="width:12vw"
                      :disabled="true"
                      :min="0" :max="1000000000"
                      :precision="2"></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.operation')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-button
                      :disabled="!disabled"
                      @click.native.prevent="deleteRow(scope.$index, tableA)"
                      plain
                      size="small"
                      type="danger"
                    >{{$t('button.delete')}}
                    </el-button>
                    <el-button
                      :disabled="!disabled"
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

          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004VIEW_PURCHASSUPPORT')" prop="purchassupport">
                <el-input v-model="form.purchassupport" type="textarea" :rows="3" :disabled="!disabled" style="width: 72vw"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.numbers')" prop="numbers">
                <el-input-number v-model="form.numbers" controls-position="right" style="width:20vw" :disabled="!disabled" :min="0" :max="1000000000" :precision="2"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004VIEW_UNITPRICE')" prop="unitprice">
                <el-input-number
                  v-model="form.unitprice"
                  controls-position="right"
                  style="width:20vw"
                  :disabled="!disabled"
                  :min="0" :max="1000000000"
                  :precision="2"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004VIEW_AMOUNT')" prop="money">
                <el-input-number v-model="form.money" controls-position="right" style="width:20vw" :disabled="!disabled" :min="0" :max="1000000000" :precision="2"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1012FORMVIEW_BUDGET')" prop="thisproject">
                <el-input v-model="form.thisproject" :disabled="true" style="width: 20vw" maxlength='20'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004VIEW_SETTINGPLACE')">
                <dicselect
                  :code="code4"
                  :data="form.settingplace"
                  :multiple="multiple"
                  @change="getSettingplace"
                  style="width:20vw"
                  :disabled="!disabled">
                </dicselect>
<!--                <el-input v-model="form.settingplace" :disabled="!disabled" style="width: 20vw" maxlength='20'></el-input>-->
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004VIEW_ADDBOOK')">
                <dicselect
                  :code="code2"
                  :data="form.addbook"
                  :multiple="multiple"
                  @change="getAddbook"
                  style="width:20vw"
                  :disabled="!disabled">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004VIEW_SALEQUOTATION')" prop="salequotation">
                <dicselect
                  :code="code3"
                  :data="form.salequotation"
                  :multiple="multiple"
                  @change="getSalequotation"
                  style="width:20vw"
                  :disabled="!disabled">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1004VIEW_REASONSFORQUOTATION')" v-show="show2">
                <el-input v-model="form.reasonsforquotation" :disabled="!disabled" style="width: 72vw" type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.enclosure')" v-show="show3">
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
                  ref="upload">
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text">{{$t('label.enclosurecontent')}}<em>{{$t('normal.info_09')}}</em></div>
                </el-upload>
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
  import user from "../../../components/user.vue";
  import { Message } from 'element-ui'
  import {downLoadUrl,getOrgInfoByUserId, uploadUrl,getUserInfo} from '@/utils/customize';
  import moment from "moment";

  export default {
    name: 'PFANS1003FormView',
    components: {
      EasyNormalContainer,
      getOrgInfoByUserId,
      dicselect,
      user
    },
    data() {
      var validateinvestigator = (rule, value, callback) => {
        this.regExp =/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{0,20}$/
        if (this.form.investigator !== null && this.form.investigator !== '') {
          if (!this.regExp.test((value))) {
            callback(new Error(this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS1004VIEW_INVESTIGATOR')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var checkuser = (rule, value, callback) => {
        if(!value || value === '' || value ==="undefined"){
          this.error = this.$t('normal.error_09') + this.$t('label.applicant');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.applicant')));
        }else{
          this.error = "";
          return callback();
        }
      };
      return {
          centerid: '',
          groupid: '',
          teamid: '',
        value1: true,
        radio1: 1,
        userlist: '',
        optionsdata: [],
        loading: false,
        error: '',
        checked: true,
        selectType: "Single",
        title: "title.PFANS1003VIEW",
        buttonList: [],
        regExp: [],
        tabIndex: 0,
        multiple: false,
        form: {
          center_id: '',
          group_id: '',
          team_id: '',
          user_id: '',
          investigator: '',
          filename: '',
          scheduleddate: moment(new Date()).format("YYYY-MM-DD"),
          careerplan: true,
          freedevice: '',
          businessplantype: '',
          classificationtype: '',
          businessplanbalance: '',
          gist: this.$t('label.PFANS1004VIEW_FREEOFCHARGEGIST'),
          purchassupport: '',
          numbers: '',
          unitprice: '',
          money: '',
          amounttobegiven: '',
          thisproject: '',
          settingplace: '',
          addbook: '',
          salequotation: '',
          reasonsforquotation: '',
          turningday: moment(new Date()).format("YYYY-MM-DD"),
          afterturningpositiv: '',
          expectedarrivaltime: moment(new Date()).format("YYYY-MM-DD"),
          equipment:'',
          uploadfile: '',
        },
        baseInfo: {},
        tableA: [
          {
          unusedeviceid: '',
          judgementid: '',
          devicename: '',
          price: '',
          unitprice: '',
          quantity: '',
          rowindex: '',
        },
    ],
        code: 'PR002',
        code1: 'PR003',
        code2: 'PJ010',
        code3: 'PJ013',
        code4: 'PJ030',
        disabled: true,
        menuList: [],
        rules: {
          investigator: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1004VIEW_INVESTIGATOR'),
            trigger: 'blur',
          },
            {validator: validateinvestigator, trigger: 'blur'}],
          user_id: [
            {
              required: true,
              validator: checkuser,
              trigger: 'change'
            },
          ],
          scheduleddate: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS1004VIEW_SCHEDULEDDATE'),
              trigger: 'blur'
            },
          ],
          filename: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1004VIEW_FILENAME'),
              trigger: 'change'
            },
          ],
          amounttobegiven: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1004VIEW_AMOUNTTOBEGIVEN'),
              trigger: 'change'
            },
          ],
          gist: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1004VIEW_GIST'),
              trigger: 'change'
            },
          ],
          purchassupport: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1004VIEW_PURCHASSUPPORT'),
              trigger: 'change',
            },
          ],
          numbers: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.numbers'),
              trigger: 'change'
            },
          ],
          unitprice: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1004VIEW_UNITPRICE'),
              trigger: 'change'
            },
          ],
          money: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1004VIEW_AMOUNT'),
              trigger: 'change'
            },
          ],
          businessplantype: [
            {
              required:  false,
              message: this.$t('normal.error_09') + this.$t('label.PFANS1004VIEW_BUSINESSPLANTYPE'),
              trigger: 'change'
            },
          ],
          classificationtype: [
            {
              required:  false,
              message: this.$t('normal.error_09') + this.$t('label.PFANS1004VIEW_CLASSIFICATIONTYPE'),
              trigger: 'change'
            },
          ],
          businessplanbalance: [
            {
              required:  true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1004VIEW_BUSINESSPLANBALANCE'),
              trigger: 'change'
            },
          ],
          salequotation: [
            {
              required:  true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS1004VIEW_SALEQUOTATION'),
              trigger: 'change'
            },
          ],
        },
          show: false,
          show1: false,
          show2: false,
          show3: false,
          show4: true,
          canStart:false,
          fileList: [],
          upload: uploadUrl(),
      };
    },
    mounted() {
        this.loading = true;
      if (this.$route.params._id) {
        this.$store
          .dispatch('PFANS1003Store/getJudgementOne', {judgementid: this.$route.params._id})
          .then(response => {
            this.form = response.judgement;
              let rst = getOrgInfoByUserId(response.judgement.user_id);
              if(rst){
                  this.centerid = rst.centerNmae;
                  this.groupid= rst.groupNmae;
                  this.teamid= rst.teamNmae;
                  this.form.thisproject = rst.personalcode;
              }
            this.userlist = this.form.user_id;
            if(response.unusedevice.length > 0){
              this.tableA = response.unusedevice;
            }
              if (this.form.careerplan === '0'){
                  this.show = false;
                  this.show1 = false;
                  this.rules.businessplantype[0].required = false;
                  this.rules.businessplanbalance[0].required = false;
                  this.rules.classificationtype[0].required = false;
              }else if (this.form.careerplan === '1') {
                  this.show = true;
                  this.rules.businessplantype[0].required = true;
                  this.rules.businessplanbalance[0].required = true;
              }
            if (this.form.freedevice === '1') {
              this.show4 = true;
              this.radio1 = 1;
            }
            if (this.form.freedevice === '2') {
              this.show4 = false;
              this.radio1 = 2;
            }
            if (this.form.businessplantype === 'PR002006') {
              this.show1 = true;
            }
            if (this.form.salequotation === 'PJ013001') {
              this.show2 = true;
            }
            if (this.form.salequotation === 'PJ013003') {
              this.show2 = true;
            }
            if (this.form.status === '2') {
              this.disable = false;
            }
            if (this.form.addbook === "PJ010001") {
              this.show3 = true;
            }else if (this.form.addbook === "PJ010002") {
              this.show3 = false;
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
              type: 'error',
              duration: 5 * 1000
            });
            this.loading = false;
          })
      } else {
        if(this.value1 === true){
          this.form.gist = this.$t('label.PFANS1004VIEW_FREEOFCHARGEGIST');
        }else{
          this.form.gist = this.$t('label.PFANS1004VIEW_FREEBORROWINGGIST');
        }
          this.userlist = this.$store.getters.userinfo.userid;
          let num = getUserInfo(this.$store.getters.userinfo.userid).userinfo.extension;
          if(num){
              this.form.investigator = num;
          }
        if (this.userlist !== null && this.userlist !== '') {
          let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
            if(rst) {
                this.centerid = rst.centerNmae;
                this.groupid= rst.groupNmae;
                this.teamid= rst.teamNmae;
                this.form.center_id = rst.centerId;
                this.form.group_id = rst.groupId;
                this.form.team_id = rst.teamId;
                this.form.thisproject = rst.personalcode;
            }
          this.form.user_id = this.$store.getters.userinfo.userid;
        }
        this.loading = false;
      }
    },
    created() {
      this.disabled = this.$route.params.disabled;
      if (this.disabled) {
        this.buttonList = [
          {
            key: "save",
            name: "button.save",
            disabled: false,
            icon: "el-icon-check"
          }
        ];
      }
    },
    methods: {
      changeSum(row){
        row.price = row.unitprice * row.quantity;
      },
      getSettingplace(val){
        this.form.settingplace = val;
      },
      moneyDiff(){
        if(this.form.businessplanbalance > 0 && this.form.businessplanbalance < this.form.amounttobegiven){
          this.show = false;
          this.form.careerplan = '0';
          this.form.amounttobegiven = 0;
        }
      },
      //设备
      addRow() {
        this.tableA.push({
          unusedeviceid: '',
          judgementid: '',
          devicename: '',
          price: '',
          unitprice: '',
          quantity: '',
          rowindex: '',
        });
      },
      // 开发计划
      deleteRow(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        } else {
          this.tableA = [{
            unusedeviceid: '',
            judgementid: '',
            devicename: '',
            price: '',
            unitprice: '',
            quantity: '',
            rowindex: '',
          }];
        }
      },
      getUserids(val) {
        this.form.user_id = val;
        let rst = getOrgInfoByUserId(val);
          if(rst){
              this.centerid = rst.centerNmae;
              this.groupid = rst.groupNmae;
              this.teamid = rst.teamNmae;
              this.form.center_id = rst.centerId;
              this.form.group_id = rst.groupId;
              this.form.team_id = rst.teamId;
          }else{
              this.centerid =  '';
              this.groupid =  '';
              this.teamid =  '';
              this.form.center_id = '';
              this.form.group_id =  '';
              this.form.team_id =  '';
          }
        if (!this.form.user_id || this.form.user_id === '' || val === "undefined") {
          this.error = this.$t('normal.error_08') + this.$t('label.node_operate_user');
        } else {
          this.error = "";
        }
      },
      getClassificationtype(val) {
        this.form.classificationtype = val;
      },
      getBusinessplantype(val) {
        this.form.businessplantype = val;
        if (val === "PR002006") {
          this.show1 = true;
          this.rules.classificationtype[0].required = true;
        }else if (val === "PR002001") {
          this.show1 = false;
          this.rules.classificationtype[0].required = false;
        }else if (val === "PR002002") {
          this.show1 = false;
          this.rules.classificationtype[0].required = false;
        }else if (val === "PR002003") {
          this.show1 = false;
          this.rules.classificationtype[0].required = false;
        }else if (val === "PR002004") {
          this.show1 = false;
          this.rules.classificationtype[0].required = false;
        }else if (val === "PR002005") {
          this.show1 = false;
          this.rules.classificationtype[0].required = false;
        }
      },
      getAddbook(val) {
        this.form.addbook = val;
        if (val === "PJ010001") {
          this.show3 = true;
        }else if (val === "PJ010002") {
          this.show3 = false;
        }
      },
      getSalequotation(val) {
        this.form.salequotation = val;
        if (val === "PJ013002") {
          this.show2 = false;
        }else if (val === "PJ013001") {
          this.show2 = true;
        }else if (val === "PJ013003") {
          this.show2 = true;
        }
      },
      radiochange(val){
          this.form.careerplan = val;
          this.form.businessplantype = '';
          this.form.businessplanbalance = 0;
          if (val === '0'){
              this.show = false;
              this.show1 = false;
              this.rules.businessplantype[0].required = false;
              this.rules.businessplanbalance[0].required = false;
              this.rules.classificationtype[0].required = false;
          }else if (val === '1') {
              this.show = true;
              this.show1 = false;
              if(this.form.businessplantype === 'PR002005'){
                  this.show1 = true;
                  this.rules.classificationtype[0].required = true;
              }
              this.rules.businessplantype[0].required = true;
              this.rules.businessplanbalance[0].required = true;
          }
      },
      radio1change(val){
        if (val === 1) {
          this.show4 = true;
          this.form.gist = this.$t('label.PFANS1004VIEW_FREEOFCHARGEGIST');
          this.rules.gist[0].required = false;
        }else if (val === 2) {
          this.show4 = false;
          this.form.gist = "";
          this.rules.gist[0].required = true;
        }
      },
      value1change(val){
        if(val){
          this.form.gist = this.$t('label.PFANS1004VIEW_FREEOFCHARGEGIST');
          this.value = false;
        }
        else
        {
          this.form.gist = this.$t('label.PFANS1004VIEW_FREEBORROWINGGIST');
          this.value = true;
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
      paramsTitle(){
        this.$router.push({
          name: 'PFANS1001FormView',
          params: {
            title: 3,
          },
        });
      },
      buttonClick(val) {
        if (val === 'back') {
          this.paramsTitle();
        } else {
          this.$refs["refform"].validate(valid => {
            if (valid) {
                this.loading = true;
                this.baseInfo = {};
                if (this.form.careerplan === '0') {
                  this.form.businessplantype = "";
                  this.form.businessplanbalance = "";
                  this.form.classificationtype = "";
                  this.rules.businessplantype[0].required = false;
                }
                if (this.form.salequotation === 'PJ013001') {
                  this.form.reasonsforquotation = "";
                }
                if (this.form.salequotation === 'PJ013003') {
                  this.form.reasonsforquotation = "";
                }
                this.form.scheduleddate = moment(this.form.scheduleddate).format('YYYY-MM-DD');
                this.form.equipment = "1";
                this.form.freedevice = this.radio1;
                this.baseInfo.judgement = JSON.parse(JSON.stringify(this.form));
                this.baseInfo.unusedevice = [];
              //设备
              for (let i = 0; i < this.tableA.length; i++) {
                if (
                  this.tableA[i].devicename !== '' ||
                  this.tableA[i].price !== '' ||
                  this.tableA[i].unitprice !== '' ||
                  this.tableA[i].quantity !== ''
                ) {
                  this.baseInfo.unusedevice.push({
                    devicename: this.tableA[i].devicename,
                    price: this.tableA[i].price,
                    unitprice: this.tableA[i].unitprice,
                    quantity: this.tableA[i].quantity,
                  });
                }
              }

              if (this.$route.params._id) {
                this.form.judgementid = this.$route.params._id;
                this.$store
                  .dispatch('PFANS1003Store/updateJudgement', this.baseInfo)
                  .then(response => {
                    this.data = response;
                    this.loading = false;
                      if(val !== "update") {
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
                    this.loading = false;
                  })

              } else {
                this.$store
                  .dispatch('PFANS1003Store/createJudgement', this.baseInfo)
                  .then(response => {
                    this.data = response;
                    this.loading = false;
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
                    this.loading = false;
                  })
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
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
