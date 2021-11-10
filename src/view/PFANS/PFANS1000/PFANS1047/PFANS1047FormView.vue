<template>
  <div>
    <EasyNormalContainer :buttonList="buttonList"
                         :title="title"
                         :enableSave="enableSave"
                         @StartWorkflow="buttonClick"
                         :defaultStart="defaultStart"
                         @buttonClick="buttonClick"
                         @end="end" @start="start"
                         @workflowState="workflowState"
                         @disabled="setdisabled"
                         ref="container"
                         :workflowCode="workflowCode"
                         v-loading="loading">
      <div slot="customize">
      <!--  scc add 样式变更  from  -->
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vm" ref="reff" style="padding: 2vw;height: auto">
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane :label="$t('label.PFANS1025VIEW_FIRSTDETAILS')" name="first">
              <div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1024VIEW_CONTRACTNUMBER')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.contractnumber"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1024VIEW_CONTRACTTYPE')">
                      <dicselect :code="code1"
                                 :data="form.contracttype"
                                 :disabled="true"
                                 :multiple="multiple"
                                 style="width:20vw">
                      </dicselect>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_ENTRUSTJAPANESE')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.custojapanese"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_ENTRUSTCHINESE')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.custochinese"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_PJNAMEJAPANESE')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.pjnamejapanese"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_PJNAMECHINESE')">
                      <el-input :disabled="true" style="width:20vw" v-model="form.pjnamechinese"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
<!--                  <el-col :span="8">-->
<!--                    <el-form-item :label="$t('label.PFANS1024VIEW_DEPLOYMENT')"-->
<!--                                  prop="deployment">-->
<!--                      <el-input :disabled="true" style="width:20vw" v-model="form.deployment"></el-input>-->
<!--                    </el-form-item>-->
<!--                  </el-col>-->
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')"
                                  prop="claimamount">
                      <el-input :disabled="true" style="width:20vw" v-model="form.claimamount"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_CURRENCYFORMAT')"
                                  prop="currencyposition">
                      <monthlyrate :month="month3"
                                   :data="form.currencyposition"
                                   :disabled="true"
                                   :multiple="multiple"
                                   @change="getcurrencyformat"
                                   style="width:20vw">
                      </monthlyrate>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <el-row>
                <el-col :span="24">
                  <el-table :data="tableS" header-cell-class-name="sub_bg_color_blue" stripe style="width: 70vw" border>
                    <el-table-column
                      prop="claimtype"
                      :label="$t('label.PFANS1024VIEW_NUMBER')" align="center" width="150"/>
                    <el-table-column
                      prop="deliverydate"
                      :label="$t('label.PFANS1024VIEW_DELIVERYDATE')" align="center" width="170"/>
                    <el-table-column
                      prop="completiondate"
                      :label="$t('label.PFANS1024VIEW_COMPLETIONDATE')" align="center" width="150"/>
                    <el-table-column
                      prop="claimdate" :label="$t('label.PFANS1024VIEW_CLAIMDATE')" align="center" width="150"/>
                    <el-table-column
                      prop="supportdate" :label="$t('label.PFANS1024VIEW_SUPPORTDATE')" align="center" width="150"/>
                    <el-table-column
                      prop="claimamount" :label="$t('label.PFANS1024VIEW_CLAIMAMOUNT')" align="center" />
                    <el-table-column
                      prop="purnumbers" :label="$t('label.PFANS3005VIEW_NUMBERS')" align="center"  v-if="showCG"/>

                  </el-table>
                </el-col>
              </el-row>
            </el-tab-pane>

            <el-tab-pane :label="$t('label.PFANS1025VIEW_SECONDDETAILS')" name="second">
              <div>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1008FORMVIEW_INITIATOR')" :error="error" prop="user_id">
                      <user :error="error" :selectType="selectType" :userlist="userlist"
                            @getUserids="getUserids" style="width:20vw" v-model="form.user_id"></user>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_TELEPHONE')" prop="telephone">
                      <el-input :disabled="true" style="width:20vw" v-model="form.telephone"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025FORMVIEW_DRAFTINGDATE')">
                      <el-date-picker
                        v-model="form.draftingdate"
                        :disabled="true"
                        type="date"
                        style="width:20vw">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1004VIEW_CAREERPLAN')" prop="careerplan">
                      <span>{{$t('label.PFANS1004VIEW_INSIDE')}}</span>
                      <el-switch
                        :disabled="!disable"
                        v-model="form.plan"
                        active-value="1"
                        inactive-value="0">
                      </el-switch>
                      <span>{{$t('label.PFANS1004VIEW_OUTER')}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025FORMVIEW_SCHEDULEDDATE')">
                      <el-date-picker
                        v-model="form.scheduleddate"
                        :disabled="true"
                        type="date"
                        style="width:20vw">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_VALUATION')" prop="valuation">
                      <dicselect :code="code2"
                                 :data="form.valuation"
                                 :disabled="!disable"
                                 :multiple="multiple"
                                 @change="getvaluation"
                                 style="width:20vw">
                      </dicselect>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1025VIEW_PLANNUMBER')">
                      <el-input :disabled="!disable" style="width:20vw" v-model="form.plannumber"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item :label="$t('label.PFANS1017FORMVIEW_PREPAREFOR')">
                      <el-input :disabled="!disable" style="width:70vw" v-model="form.remarks"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <el-table :data="tableT" :summary-method="getTsummaries"
                        border
                        show-summary
                        style="width: 70vw"
                        header-cell-class-name="sub_bg_color_blue" stripe>
                <el-table-column :label="$t('label.PFANS1012FORMVIEW_BUDGET')" align="center" width="200">
                  <template slot-scope="scope">
                    <el-select clearable style="width: 100%" v-model="scope.row.budgetcode" :disabled="!disable"
                               :placeholder="$t('normal.error_09')" :no="scope.row" @change="getBudgetunit">
                      <el-option
                        v-for="item in scope.row.options1"
                        :key="item.value"
                        :label="item.lable"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1025VIEW_DEPART')" align="center"
                                 :error="errorgroup" prop="depart">
                  <template slot-scope="scope">
                    <!--   add_qhr_20210721 修改权限 可以随意更改-->
                    <org :orglist="scope.row.depart"
                         orgtype="4"
                         :disabled="false"
                         :error="errorgroup"

                         :no="scope.row"
                         @getOrgids="getGroupId"></org>
                  </template>
                </el-table-column>
                <!--     region   add_qhr_20210722 修改【部门】栏宽度-->
                <el-table-column :label="$t('label.PFANS5008VIEW_PROGRAM')" align="center" width="200">
                  <!--     endregion   add_qhr_20210722 修改【部门】栏宽度-->
                  <template slot-scope="scope">
                    <!--   add_qhr_20210721 修改权限 可以随意更改-->
                    <project :disabled="false"
                             style="width: 100%" :date="scope.row.projects" :no="scope.row"
                             @change="changePro">
                    </project>
                  </template>
                </el-table-column>
                <!--  region   add_qhr_20210721 隐藏表格项目列-->
                <el-table-column :label="$t('label.PFANS5008VIEW_PROGRAM')" align="center" width="600" v-if="false">
                  <!--  endregion   add_qhr_20210721 隐藏表格项目列-->
                  <el-table-column :label="$t('label.PFANS1025VIEW_MEMBER')" align="center"  prop="member"
                                   v-if="checkdisable">
                    <template slot-scope="scope">
                      <el-input-number
                        :disabled="scope.row.budgetcode ===$t('label.PFANS1025FORMVIEW_CHECKERROR')?true:!disable"
                        :max="1000000000"
                        :min="0"
                        :no="scope.row"
                        :precision="2"
                        controls-position="right"
                        style="width: 100%"
                        v-model="scope.row.member"
                      ></el-input-number>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1025VIEW_COMMUNITY')" align="center"
                                   v-if="checkdisable">
                    <template slot-scope="scope">
                      <el-input-number
                        :disabled="scope.row.budgetcode ===$t('label.PFANS1025FORMVIEW_CHECKERROR')?true:!disable"
                        :max="1000000000"
                        :min="0"
                        :no="scope.row"
                        controls-position="right"
                        style="width: 100%"
                        v-model="scope.row.community"
                      ></el-input-number>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1025VIEW_OUTSOURCE')" align="center"
                                   prop="outsource">
                    <template slot-scope="scope">
                      <el-input-number
                        :disabled="scope.row.budgetcode ===$t('label.PFANS1025FORMVIEW_CHECKERROR')?true:!disable"
                        :max="1000000000"
                        :min="0"
                        :no="scope.row"
                        :precision="2"
                        controls-position="right"
                        style="width: 100%"
                        v-model="scope.row.outsource"
                        @change="changeSum(scope.row)"
                      ></el-input-number>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1025VIEW_OUTCOMMUNITY')" align="center" >
                    <template slot-scope="scope">
                      <el-input-number
                        :disabled="scope.row.budgetcode ===$t('label.PFANS1025FORMVIEW_CHECKERROR')?true:!disable"
                        :max="1000000000"
                        :min="0"
                        :no="scope.row"
                        controls-position="right"
                        style="width: 100%"
                        v-model="scope.row.outcommunity"
                        @change="changeSum(scope.row)"
                      ></el-input-number>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1025VIEW_AWARDMONEY')" align="center" prop="awardmoney" width="160">
                  <template slot-scope="scope">
                    <!--   add_qhr_20210721 修改权限 可以随意更改-->
                    <el-input-number
                      :disabled="false"
                      :max="1000000000"
                      :min="0"
                      :no="scope.row"
                      :precision="2"
                      controls-position="right"
                      style="width: 100%"
                      v-model="scope.row.awardmoney"
                    ></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('label.operation')" align="center" width="160">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, tableT)"
                      plain
                      size="small"
                      type="danger"
                    >{{$t('button.delete')}}
                    </el-button>
                    <el-button
                      :disabled="scope.row.budgetcode ===$t('label.PFANS1025FORMVIEW_CHECKERROR')?true:!disable"
                      @click="addRow()"
                      plain
                      size="small"
                      type="primary"
                    >{{$t('button.insert')}}
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <el-tab-pane :label="$t('label.PFANS2022VIEW_UPDATINGFILES')" name="third">
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.enclosure')" prop="enclosurecontent" :error="errorfile">
                    <el-upload
                      :action="upload"
                      :disabled="!disable"
                      :file-list="fileList"
                      :on-error="fileError"
                      :on-preview="fileDownload"
                      :on-remove="fileRemove"
                      :on-success="fileSuccess"
                      :on-change="filechange"
                      class="upload-demo"
                      drag
                      ref="upload"
                      v-model="form.uploadfile">
                      <i class="el-icon-upload"></i>
                      <div class="el-upload__text">{{$t('label.enclosurecontent')}}<em>{{$t('normal.info_09')}}</em>
                      </div>
                    </el-upload>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
          <!--  scc add 样式变更  to  -->
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import user from '../../../components/user.vue';
  import {Message} from 'element-ui';
  import dicselect from '../../../components/dicselect';
  import moment from 'moment';
  import org from '../../../components/org';
  import {getDictionaryInfo, getUserInfo, getOrgInfo,uploadUrl,downLoadUrl} from '@/utils/customize';

  import project from '../../../components/project';
  import monthlyrate from '../../../components/monthlyrate';
  export default {
    name: 'PFANS1025FormView',
    components: {
      monthlyrate,
      EasyNormalContainer,
      user,
      org,
      dicselect,
      project,
    },
    data() {
      //region scc add 9/27 起案者，报价单，邮件必填认证 from
      var checkuser = (rule, value, callback) => {
        if (!this.form.user_id || this.form.user_id === '' || this.form.user_id === 'undefined') {
          this.error = this.$t('normal.error_09') + this.$t('label.user_name');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.user_name')));
        } else {
          this.error = '';
          return callback();
        }
      };
      var checkvaluation = (rule, value, callback) => {
        if (!this.form.valuation || this.form.valuation === '' || this.form.valuation === 'undefined') {
          this.errorvaluation = this.$t('normal.error_09') + this.$t('label.PFANS1025VIEW_VALUATION');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.PFANS1025VIEW_VALUATION')));
        } else {
          this.errorvaluation = '';
          return callback();
        }
      };
      var checkuploadfile = (rule, value, callback) => {
        if (!this.form.uploadfile || this.form.uploadfile === '' || this.form.uploadfile === 'undefined') {
          this.errorfile = this.$t('normal.error_16') + this.$t('label.enclosure');
          return callback(new Error(this.$t('normal.error_16') + this.$t('label.enclosure')));
        } else {
          this.errorfile = '';
          return callback();
        }
      };
      //endregion scc add 9/27 起案者，报价单，邮件必填认证 to
      return {
        //region scc add 其他契约书样式变更对应 from
        activeName: 'first',
        errorfile: '',
        fileList: [],
        upload: uploadUrl(),
        code2: 'HT005',
        //endregion scc add 其他契约书样式变更对应 to
        //region scc add 9/27 起案者，报价单，邮件必填认证 from
        rules: {
          user_id: [{
            required: true,
            validator: checkuser,
            trigger: 'change',
          }],
          valuation: [{
            required: true,
            validator: checkvaluation,
            trigger: 'change',
          }],
          enclosurecontent: [{
            required: true,
            validator: checkuploadfile,
            trigger: 'change',
          }],
        },
        //endregion scc add 9/27 起案者，报价单，邮件必填认证 to
        showCG:false,
        defaultStart: false,
        enableSave: false,
        moneysum: '',
        workflowCode: 'W0090',
        disable: false,
        error: '',
        userlist: '',
        code1: 'HT015',
        //add-ws-12/10-汇率字典
        // code3: 'PG019',
        month3: moment(new Date()).format('YYYY-MM'),
        //add-ws-12/10-汇率字典
        sumAwardmoney: '',
        errorgroup: '',
        selectType: 'Single',
        loading: false,
        title: 'title.PFANS1030VIEW',
        multiple: false,
        orglist: '',
        baseInfo: {},
        groupN: '',
        form: {
          group_id: '',
          draftingdate: '',
          scheduleddate: '',
          number: '',
          sarmb: '',
          exchangerate: '',
          contractnumber: '',
          contracttype: '',
          deployment: '',
          deliverydate: '',
          currencyposition: 'PG019003',
          claimamount: '',
          user_id: '',
          //region scc add 其他契约书样式变更对应 from
          maketype: '',
          uploadfile: '',
          custojapanese: '',
          custochinese: '',
          pjnamejapanese: '',
          pjnamechinese: '',
          telephone: '',
          plan: '',
          valuation: '',
          plannumber: '',
          remarks: '',
          //endregion scc add 其他契约书样式变更对应 to
        },
        //region scc add 基本情报2table from
        tableT: [{
          budgetcode: '',
          depart: '',
          member: '',
          community: '',
          outsource: '',
          outcommunity: '',
          awardmoney: '',
          rowindex: '',
        },
        //   {
        //   awarddetail_id: '',
        //   award_id: '',
        //   budgetcode:this.$t('label.PFANS1025FORMVIEW_DETAIL'),
        //   depart: '',
        //   member: '',
        //   community: '',
        //   outsource: '',
        //   outcommunity: '',
        //   awardmoney: '',
        //   rowindex: '',
        // }
        ],
        //endregion scc add 基本情报2table to
        tableS: [],
        tableD: [],
        buttonList: [],
        flowData:[],
      };
    },
    mounted() {
      this.loading = true;
      if (this.$route.params._id) {
        this.$store
          .dispatch('PFANS1025Store/selectById', {'award_id': this.$route.params._id})
          .then(response => {
            if (response.award != null) {
              this.form = response.award;
              //region scc add  9/27 页面初始化 from
              if (this.$store.getters.userinfo.userid) {//起案者内线
                this.form.telephone = getUserInfo(this.$store.getters.userinfo.userid).userinfo.extension;
              }
              this.form.draftingdate = moment(new Date()).format('YYYY-MM-DD');//初始化起案日
              var myDate = new Date();
              myDate.setDate(myDate.getDate() + 2);
              this.form.scheduleddate = moment(myDate).format('YYYY-MM-DD');//实施预定日
              if (response.awardDetail.length > 0) {
                let check = 0;
                let data = [];
                for (let i = 0; i < response.awardDetail.length; i++) {//基本情报2table
                  if (response.awardDetail[i].budgetcode === this.$t('label.PFANS1025FORMVIEW_CHECKERROR')) {
                    check = check + 1;
                    break;
                  }
                }
                if (check === 0) {
                  this.tableT.push({
                    budgetcode: this.$t('label.PFANS1025FORMVIEW_CHECKERROR'),
                    depart: '',
                    member: '',
                    community: '',
                    outsource: '',
                    outcommunity: '',
                    worknumber: '',
                    awardmoney: '',
                    rowindex: '',
                  });
                  this.tableT = data.concat(response.awardDetail);
                } else {
                  this.tableT = response.awardDetail;
                }
                for (var i = 0; i < this.tableT.length; i++) {
                  this.orglist = this.tableT[i].depart;
                  if (this.tableT[i].depart !== '' && this.tableT[i].depart !== null && this.tableT[i].depart !== undefined) {
                    //ADD_FJL
                    this.tableT[i].options1 = [];
                    if (getOrgInfo(this.tableT[i].depart)) {
                      let butinfo = (getOrgInfo(this.tableT[i].depart).encoding).substring(0, 3);
                      let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'JY002');
                      if (dic.length > 0) {
                        for (let j = 0; j < dic.length; j++) {
                          if (butinfo === (dic[j].value1).substring(0, 3)) {
                            this.tableT[i].options1.push({
                              lable: dic[j].value2 + '_' + dic[j].value3,
                              value: dic[j].code,
                            });
                          }
                        }
                      }
                    }
                  }
                }
              }
              //endregion scc add  9/27 页面初始化 to
              if (this.form.status === '4' || this.form.status === '2') {
                this.enableSave = false;
              } else {
                this.enableSave = true;
              }
              let aa = 0;

              if (response.numbercounts.length > 0) {
                for (let i = 0; i < response.numbercounts.length; i++) {

                  let deliverydate = response.numbercounts[i].deliverydate;
                  let completiondate = response.numbercounts[i].completiondate;
                  let claimdate = response.numbercounts[i].claimdate;
                  let supportdate = response.numbercounts[i].supportdate;

                  if (deliverydate !== '' && deliverydate != null) {
                    response.numbercounts[i].deliverydate = moment(deliverydate).format('YYYY-MM-DD');
                  }
                  if (completiondate !== '' && completiondate != null) {
                    response.numbercounts[i].completiondate = moment(completiondate).format('YYYY-MM-DD');
                  }
                  if (claimdate !== '' && claimdate != null) {
                    response.numbercounts[i].claimdate = moment(claimdate).format('YYYY-MM-DD');
                  }
                  if (supportdate !== '' && supportdate != null) {
                    response.numbercounts[i].supportdate = moment(supportdate).format('YYYY-MM-DD');
                  }
                  if (response.numbercounts[i].claimamount) {
                    let claimamount = response.numbercounts[i].claimamount;
                    aa = Number(claimamount) + aa;
                  }
                }
              }
              this.form.claimamount = aa;
              if (response.numbercounts[0].purnumbers === '' || response.numbercounts[0].purnumbers === null)
              {
                this.showCG = false;
              }
              else {
                this.showCG = true;
              }
              this.tableS = response.numbercounts;
              this.userlist = this.form.user_id;
              this.baseInfo.award = JSON.parse(JSON.stringify(this.form));
            }
            //采购业务数据流程查看详情
            this.$store
              .dispatch('PFANS1026Store/getworkfolwPurchaseData', {'award_id': this.$route.params._id})
              .then(response3 => {
                if (response3 !== null && response3 !== '' && response3 !== undefined) {

                  if (response3["purchase"]!=undefined)
                  {
                    let purlist = response3["purchase"].split(';');
                    let setpurlist = new Set(purlist);
                    for (let i of setpurlist)
                    {
                      let pur = i.split(',');
                      let statu = pur[1] === '4' ? 'normal.done' : (pur[1] === '2' ? 'normal.doing' : 'normal.todo')
                      this.flowData.push(
                        {
                          No:this.flowData.length + 1,
                          Name: '采购决裁',
                          Status: statu,
                          url: 'PFANS3005FormView',
                          params: {'_id':pur[0]}
                        })
                    }
                  }
                  if (response3["award"]!=undefined)
                  {
                    let awlist = response3["award"].split(';');
                    let setawlist = new Set(awlist);
                    for (let i of setawlist)
                    {
                      let aw = i.split(',');
                      let statu = aw[1] === '4' ? 'normal.done' : (aw[1] === '2' ? 'normal.doing' : 'normal.todo')
                      this.flowData.push(
                        {
                          No:this.flowData.length + 1,
                          Name: '合同决裁',
                          Status: statu,
                          url: 'PFANS1047FormView',
                          params: {'_id':aw[0]}
                        })
                    }
                  }
                  if (response3["seal"]!=undefined)
                  {
                    let seallist = response3["seal"].split(';');
                    let setseallist = new Set(seallist);
                    for (let i of setseallist)
                    {
                      let seal = i.split(',');
                      if (seal[0]!='undefined' && seal[0]!='null' && seal[0]!='')
                      {
                        let statu = seal[1] === '3' ? 'normal.done' : (seal[1] === '2' ? 'normal.doing' : 'normal.todo')
                        this.flowData.push(
                          {
                            No:this.flowData.length + 1,
                            Name: '印章申请',
                            Status: statu,
                            url: 'PFANS4001FormView',
                            params: {'_id':seal[0]}
                          })
                      }
                    }
                  }
                  // if (response3["loanApplication"]!=undefined)
                  // {
                  //   let loanapplist = response3["loanApplication"].split(';');
                  //   let setloanapplist = new Set(loanapplist);
                  //   for (let i of setloanapplist)
                  //   {
                  //     let loanapp = i.split(',');
                  //     let statu = loanapp[1] === '4' ? 'normal.done' : (loanapp[1] === '2' ? 'normal.doing' : 'normal.todo')
                  //     this.flowData.push(
                  //       {
                  //         No:this.flowData.length + 1,
                  //         Name: '暂借款申请',
                  //         Status: statu,
                  //         url: 'PFANS1006FormView',
                  //         params: {'_id':loanapp[0]}
                  //       })
                  //   }
                  // }
                  // if (response3["publicExpense"]!=undefined)
                  // {
                  //   let publist = response3["publicExpense"].split(';');
                  //   let setpublist = new Set(publist);
                  //   for (let i of setpublist)
                  //   {
                  //     let pub = i.split(',');
                  //     let statu = pub[1] === '4' ? 'normal.done' : (pub[1] === '2' ? 'normal.doing' : 'normal.todo')
                  //     this.flowData.push(
                  //       {
                  //         No:this.flowData.length + 1,
                  //         Name: '公共费用精算',
                  //         Status: statu,
                  //         url: 'PFANS1012FormView',
                  //         params: {'_id':pub[0]}
                  //       })
                  //   }
                  // }
                  this.$emit('showPop',this.flowData);
                }
              })
            //采购业务数据流程查看详情
            //region scc add 9/27 添加上传附件功能 from
            if (this.form.uploadfile != '' && this.form.uploadfile != null) {
              let uploadfile = this.form.uploadfile.split(';');
              for (var i = 0; i < uploadfile.length; i++) {
                if (uploadfile[i].split(',')[0] != '') {
                  let o = {};
                  o.name = uploadfile[i].split(',')[0];
                  o.url = uploadfile[i].split(',')[1];
                  this.fileList.push(o);
                }
              }
            }
            //endregion scc add 9/27 添加上传附件功能 to
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
      }
    },
    created() {
      this.$store.commit('global/SET_WORKFLOWURL', '/PFANS1047View');
      this.disable = this.$route.params.disabled;
      if (this.$route.params.disabled) {
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
    methods: {
      setdisabled(val) {
        if (this.$route.params.disabled) {
          this.disabled = val;
        }
      },
      getcurrencyformat(val) {
        this.form.currencyposition = val;
      },
      workflowState(val) {
        if (val.state === '1') {
          this.form.status = '3';
          this.enableSave = true;
        } else if (val.state === '2') {
          this.form.status = '4';
          this.enableSave = false;
        }
        this.buttonClick2();
      },
      start(val) {
        if (val.state === '0') {
          this.form.status = '2';
        } else if (val.state === '2') {
          this.form.status = '4';
        }
        this.enableSave = false;
        this.buttonClick2();
      },
      end() {
        this.form.status = '0';
        this.enableSave = true;
        this.buttonClick2();
      },
      buttonClick2() {
        this.form.maketype = '9',
          this.baseInfo = {};
        this.form.user_id = this.userlist;
        this.baseInfo.groupN = this.$store.getters.orgGroupList;
        //region scc add 9/27 更新基本情报2 from
        this.baseInfo.awardDetail = [];
        for (let i = 0; i < this.tableT.length; i++) {
          if (this.tableT[i].budgetcode !== '' || this.tableT[i].depart !== '' || this.tableT[i].member > '0' || this.tableT[i].community > '0'
            || this.tableT[i].outsource > '0' || this.tableT[i].outcommunity > '0' ||this.tableT[i].awardmoney > '0') {
            this.baseInfo.awardDetail.push({
              awarddetail_id: this.tableT[i].awarddetail_id,
              award_id: this.tableT[i].award_id,
              budgetcode: this.tableT[i].budgetcode,
              depart: this.tableT[i].depart,
              member: this.tableT[i].member,
              projects: this.tableT[i].projects,
              community: this.tableT[i].community,
              outsource: this.tableT[i].outsource,
              outcommunity: this.tableT[i].outcommunity,
              worknumber: this.tableT[i].worknumber,
              awardmoney: this.tableT[i].awardmoney,
              rowindex: this.tableT[i].rowindex,
            });
          }
        }
        //endregion scc add 9/27 更新基本情报2 to
        this.loading = true;
        this.baseInfo.award = JSON.parse(JSON.stringify(this.form));
        this.$store
          .dispatch('PFANS1025Store/update', this.baseInfo)
          .then(response => {
            //事业计划相关 修改返回messaage 1103 fr
            this.data = response.data;
            //事业计划相关 修改返回messaage 1103 to
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
      },
      checkparamsTitle() {
        let id = this.$route.params._checkid;
        let disable = this.$route.params._checkdisable;
        this.$router.push({
          name: 'PFANS1033FormView',
          params: {
            _id: id,
            disabled: disable,
          },
        });
      },
      paramsTitle() {
        this.$router.push({
          name: 'PFANS1047View',
        });
      },
      buttonClick(val) {
        this.form.maketype = '9',
          this.baseInfo = {};
        this.form.user_id = this.userlist;
        this.baseInfo.groupN = this.$store.getters.orgGroupList;
        if (val === 'back') {
          if (this.$route.params._check != null && this.$route.params._check != '' && this.$route.params._check != undefined) {
            if (this.$route.params._check) {
              this.checkparamsTitle();
            }
          } else {
            this.paramsTitle();
          }
        } else if (val === 'save' || val === 'StartWorkflow') {
          this.$refs['reff'].validate(valid => {
            if (valid) {
              //region scc add 9/27 更新基本情报2 from
              this.baseInfo.awardDetail = [];
              for (let i = 0; i < this.tableT.length; i++) {
                if (this.tableT[i].budgetcode !== '' || this.tableT[i].depart !== '' || this.tableT[i].member > '0' || this.tableT[i].community > '0'
                  || this.tableT[i].outsource > '0' || this.tableT[i].outcommunity > '0' ||this.tableT[i].awardmoney > '0') {
                  this.baseInfo.awardDetail.push({
                    awarddetail_id: this.tableT[i].awarddetail_id,
                    award_id: this.tableT[i].award_id,
                    budgetcode: this.tableT[i].budgetcode,
                    depart: this.tableT[i].depart,
                    member: this.tableT[i].member,
                    projects: this.tableT[i].projects,
                    community: this.tableT[i].community,
                    outsource: this.tableT[i].outsource,
                    outcommunity: this.tableT[i].outcommunity,
                    worknumber: this.tableT[i].worknumber,
                    awardmoney: this.tableT[i].awardmoney,
                    rowindex: this.tableT[i].rowindex,
                  });
                }
              }
              //endregion scc add 9/27 更新基本情报2 to
              this.loading = true;
              this.baseInfo.award = JSON.parse(JSON.stringify(this.form));
              if (this.$route.params._id) {     //编辑
                this.baseInfo.award.award_id = this.$route.params._id;
                this.$store
                  .dispatch('PFANS1025Store/update', this.baseInfo)
                  .then(response => {
                    //事业计划相关 修改返回messaage 1103 fr
                    this.data = response.data;
                    //事业计划相关 修改返回messaage 1103 to
                    this.loading = false;
                    Message({
                      message: this.$t('normal.success_02'),
                      type: 'success',
                      duration: 5 * 1000,
                    });
                    if (val !== 'save' && val !== 'StartWorkflow') {
                      if (this.$store.getters.historyUrl) {
                        this.$router.push(this.$store.getters.historyUrl);
                      }
                    }
                    if (val === 'StartWorkflow') {
                      this.$refs.container.$refs.workflow.startWorkflow();
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
      //region scc add 样式变更对应添加的方法 from
      deleteRow(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        } else {
          this.tableT = [{
            budgetcode: '',
            depart: '',
            member: '',
            community: '',
            outsource: '',
            outcommunity: '',
            awardmoney: '',
          }];
        }
      },
      addRow() {
        this.tableT.push({
          awarddetail_id: '',
          award_id: '',
          budgetcode: '',
          depart: '',
          member: '',
          community: '',
          outsource: '',
          outcommunity: '',
          awardmoney: '',
          rowindex: '',
        });
      },
      changeSum(row) {
        row.worknumber = row.outsource;
        row.awardmoney = row.outsource * row.outcommunity;
      },
      changePro(val, row) {
        row.projects = val.companyprojects_id;
      },
      getGroupId(orglist, row) {
        row.depart = orglist;
        //ADD_FJL
        row.options1 = [];
        row.budgetcode = '';
        if(getOrgInfo(row.depart)){
          let butinfo = (getOrgInfo(row.depart).encoding).substring(0,3);
          let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'JY002');
          if (dic.length > 0) {
            for (let i = 0; i < dic.length; i++) {
              if (butinfo === (dic[i].value1).substring(0,3)) {
                row.options1.push({
                  lable: dic[i].value2 + '_' + dic[i].value3,
                  value: dic[i].code,
                });
              }
            }
          }
        }
      },
      getBudgetunit(val, row) {
        row.budgetcode = val;
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
              // update gbb 20210311 PSDCD_PFANS_20210225_BUG_022 保留两位小数 start
              if (!isNaN(value)) {
                return Math.round((prev + curr) * 100) / 100;
              } else {
                return Math.round(prev * 100) / 100;
              }
              // update gbb 20210311 PSDCD_PFANS_20210225_BUG_022 保留两位小数 end
            }, 0);
            if (index == 1) {
              sums[index] = '--';
            }
            if (index == 3) {
              sums[index] = Math.round((sums[index]) * 100) / 100;
            }
          } else {
            sums[index] = '--';
          }
        });
        return sums;
      },
      getvaluation(val) {
        this.form.valuation = val;
      },
      getUserids(val) {
        this.userlist = val;
        this.form.user_id = val;
        if (!this.form.user_id || this.form.user_id === '' || typeof val == 'undefined') {
          this.error = this.$t('normal.error_08') + this.$t('label.user_name');
        } else {
          this.error = '';
        }
      },
      fileError(err, file, fileList) {
        Message({
          message: this.$t('normal.error_04'),
          type: 'error',
          duration: 5 * 1000,
        });
      },
      fileDownload(file) {
        if (file.url) {
          file.url = file.url.replace('%', '%25');
          file.url = file.url.replace('#', '%23');
          file.url = file.url.replace('&', '%26');
          file.url = file.url.replace('+', '%2B');
          file.url = file.url.replace('=', '%3D');
          file.url = file.url.replace('?', '%3F');
          var url = downLoadUrl(file.url);
          window.open(url);
        }
      },
      fileRemove(file, fileList) {
        this.fileList = [];
        this.form.uploadfile = '';
        for (var item of fileList) {
          let o = {};
          o.name = item.name;
          o.url = item.url;
          this.fileList.push(o);
          this.form.uploadfile += item.name + ',' + item.url + ';';
        }
      },
      fileSuccess(response, file, fileList) {
        if (response.data == 'upload_success') {
          this.fileList = [];
          this.form.uploadfile = '';
          for (var item of fileList) {
            let o = {};
            o.name = item.name;
            if (!item.url) {
              o.url = item.response.info;
            } else {
              o.url = item.url;
            }
            this.fileList.push(o);
            this.form.uploadfile += o.name + ',' + o.url + ';';
          }
        } else {
          Message({
            message: this.$t('label.PFANS2016FORMVIEW_FILEERROR'),
            type: 'error',
            duration: 5 * 1000,
          });
          this.form.uploadfile = '';
          this.$refs.upload.clearFiles();
        }
      },
      filechange(file, fileList) {
        this.$refs.reff.validateField('enclosurecontent');
      },
      //endregion scc add 样式变更对应添加的方法 to
    },
  };
</script>

<style scoped rel="stylesheet/scss" lang="scss">
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
