<template>
  <div class="pfans3005view">
    <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row" :title="title"
                     @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading" :rowClassName="rowClassName"
                     :showSelection="isShow" ref="roletable" :selectable="selectInit">
    </EasyNormalTable>
    <el-dialog center
               :visible.sync="dialogVisible"
               :title="$t('button.carryforward')"
               width="50%">
      <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="form" style="padding: 0.1vw;margin-top: -2vw">
        <el-row>
          <div style=
                 "font-family: Helvetica Neue;color: #005BAA;font-size: 0.8rem;font-weight: bold;margin-left: -1vw">{{$t('label.PFANS3005VIEW_OLDORGANIZATION')}}</div>
        </el-row>
        <el-row>
          <el-col :span="6" style="margin-left: 0.5vw">
            <el-form-item :label="$t('label.center')">
              <el-input :disabled="true" style="width:11vw" v-model="form.last_center_id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('label.group')">
              <el-input :disabled="true" style="width:11vw" v-model="form.last_group_id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :label="$t('label.team')">
              <el-input :disabled="true" style="width:11vw" v-model="form.last_team_id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item :label="$t('label.budgetunit')" >
              <el-input :disabled="true" style="width:11vw" v-model="form.last_budgetunit"></el-input>

            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <div style=
          "font-family: Helvetica Neue;color: #005BAA;font-size: 0.8rem;font-weight: bold;margin-left: -1vw">{{$t('label.PFANS3005VIEW_NEWORGANIZATION')}}</div>
        </el-row>
        <el-row>
          <el-col :span="6" style="margin-left: 0.5vw; margin-bottom: -1vw;">
            <el-form-item :label="$t('label.center')" prop="new_center_id"
                          :error="error_center">
              <org :orglist="form.new_center_id"
                   orgtype="1"
                   style="width: 9vw"
                   @getOrgids="getCenterid"
                   :error="error_center"
              ></org>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="margin-bottom: -1vw;">
            <el-form-item :label="$t('label.group')">
              <org :orglist="form.new_group_id"
                   orgtype="2"
                   style="width: 9vw"
                   @getOrgids="getGroupid"
              ></org>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="margin-bottom: -1vw;">
            <el-form-item :label="$t('label.team')">
              <org :orglist="form.new_team_id"
                   orgtype="3"
                   style="width: 9vw"
                   @getOrgids="getTeamid"
                   :disabled="true"
              ></org>
            </el-form-item>
          </el-col>
          <el-col :span="5" style="margin-bottom: -1vw;">
            <el-form-item :label="$t('label.budgetunit')" prop="new_budgetunit">
              <el-select clearable style="width: 11vw" v-model="form.new_budgetunit"
                         :placeholder="$t('normal.error_09')">
                <el-option
                  v-for="item in new_options"
                  :key="item.value"
                  :label="item.lable"
                  :value="item.value"
                  @change="getNewbudgetunit">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submit">{{$t('button.confirm')}}</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
    import EasyNormalTable from '@/components/EasyNormalTable';
    import {Message} from 'element-ui';
    import org from '@/view/components/org';
    import moment from 'moment';
    import {getDepartmentById, getDictionaryInfo, getOrgInfoByUserId, getStatus, getUserInfo,getOrgInfo} from '@/utils/customize';

    export default {
        name: 'PFANS3005View',
        components: {
            EasyNormalTable,
            org,
        },
        data() {
            // add-ztc  数据转结 fr
            var centerId = (rule, value, callback) => {
              if (!this.form.new_center_id || this.form.new_center_id === '') {
                callback(new Error(this.$t('normal.error_08') + this.$t('label.center')));
                this.error_center = this.$t('normal.error_08') + this.$t('label.center');
              } else {
                callback();
              }
            };
            // var groupId = (rule, value, callback) => {
            //   if (!this.form.new_group_id || this.form.new_group_id === '') {
            //     callback(new Error(this.$t('normal.error_08') + this.$t('label.group')));
            //     this.error_group = this.$t('normal.error_08') + this.$t('label.group');
            //   } else {
            //     callback();
            //   }
            // };
            // var teamId = (rule, value, callback) => {
            //   if (!this.form.new_center_id || this.form.new_center_id === '') {
            //     callback(new Error(this.$t('normal.error_08') + this.$t('label.department')));
            //     this.error_team = this.$t('normal.error_08') + this.$t('label.department');
            //   } else {
            //     callback();
            //   }
            // };
            // add-ztc  数据转结 to
            return {
                loading: false,
                title: 'title.PFANS3005VIEW',
                data: [],
                selectedlist: [],
                purchasedetail: [],
                isShow: true,
                // add-ztc  数据转结 fr
                rowInfo:[],
                new_options:[],
                rules: {
                  new_center_id: [
                    {
                      required: true,
                      validator: centerId,
                      trigger: 'blur',
                    }
                  ],
                  // new_group_id: [
                  //   {
                  //     required: true,
                  //     validator: groupId,
                  //     trigger: 'blur',
                  //   }
                  // ],
                  // new_team_id: [
                  //   {
                  //     required: true,
                  //     validator: teamId,
                  //     trigger: 'blur',
                  //   }
                  // ],
                  new_budgetunit: [
                    {
                      required: true,
                      message: this.$t('normal.error_09') + this.$t('label.budgetunit'),
                      trigger: 'blur'
                    },
                  ],
                },
                form: {
                  last_center_id: '',
                  last_group_id: '',
                  last_team_id: '',
                  last_budgetunit: '',
                  new_center_id: '',
                  new_group_id: '',
                  new_team_id: '',
                  new_budgetunit: '',
                },
                dialogVisible: false,
                //error_group: '',
                error_center: '',
                // add-ztc  数据转结 to
                columns: [
                    {
                        code: 'purnumbers',
                        label: 'label.PFANS3005VIEW_NUMBERS',
                        width: 150,
                        fix: false,
                        filter: false,
                    },
                    {
                        code: 'status',
                        label: 'label.approval_status',
                        width: 150,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'acceptstatus',
                        label: 'label.PFANS3001FORMVIEW_CHULISTATUS',
                        width: 150,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'findate',
                        label: 'label.PFANS1016FORMVIEW_COMPLETEDATE',
                        width: 150,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'loanapno',
                        label: 'label.PFANS1012VIEW_TEMPORARYLOAN',
                        width: 150,
                        fix: false,
                        filter: false,
                    },
                    {
                        code: 'application_date',
                        label: 'label.application_date',
                        width: 150,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'user_id',
                        label: 'label.applicant',
                        width: 150,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'procurementdetails',
                        label: 'label.PFANS3005VIEW_PROCUREMENTDETAILS_NAME',
                        width: 150,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'storagedate',
                        label: 'label.PFANS3005VIEW_STORAGEDATE',
                        width: 150,
                        fix: false,
                        filter: false,
                    },
                    {
                        code: 'collectionday',
                        label: 'label.PFANS3005VIEW_COLLECTIONDAY',
                        width: 150,
                        fix: false,
                        filter: false,
                    },
                    {
                        code: 'recipients',
                        label: 'label.PFANS3005VIEW_RECIPIENTS',
                        width: 150,
                        fix: false,
                        filter: false,
                    },
                    {
                        code: 'actuarialdate',
                        label: 'label.PFANS3005VIEW_ACTUARIALDATE',
                        width: 150,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'actuarialamount',
                        label: 'label.PFANS3005VIEW_ACTUARIALAMOUNT',
                        width: 150,
                        fix: false,
                        filter: true,
                    },

                    {
                        code: 'center_id',
                        label: 'label.center',
                        width: 150,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'group_id',
                        label: 'label.group',
                        width: 150,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'team_id',
                        label: 'label.team',
                        width: 150,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'yusuanbuzu',
                        label: 'label.PFANS3007FORMVIEW_REFUSEREASON',
                        width: 150,
                        fix: false,
                        filter: false,
                    },
                    {
                        code: 'linenumber',
                        label: 'label.PFANS3005VIEW_LINENUMBER',
                        width: 150,
                        fix: false,
                        filter: false,
                    },
                    {
                        code: 'setplace',
                        label: 'label.PFANS3005VIEW_SETPLACE',
                        width: 150,
                        fix: false,
                        filter: false,
                    },
                    {
                        code: 'controller',
                        label: 'label.PFANS3005VIEW_CONTROLLER',
                        width: 150,
                        fix: false,
                        filter: false,
                    },
                    {
                        code: 'username',
                        label: 'label.PFANS3005VIEW_USER',
                        width: 150,
                        fix: false,
                        filter: false,
                    },
                    // ccm 使用期限
                    {
                        code: 'usertime',
                        label: 'label.PFANS3005VIEW_TIME',
                        width: 150,
                        fix: false,
                        filter: false,
                    },
                    // ccm 使用期限
                    {
                        code: 'budgetnumber',
                        label: 'label.budgetunit',
                        width: 150,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'careerplantemp',
                        label: 'label.PFANS3005FORMVIEW_CAREERPLAN',
                        width: 150,
                        fix: false,
                        filter: true,
                    },
                    {
                        code: 'businessplanamount',
                        label: 'label.PFANS3005FORMVIEW_CAREERPLANAMOUNT',
                        width: 150,
                        fix: false,
                        filter: false,
                    },
                    {
                        code: 'purchasepurpose',
                        label: 'label.PFANS3005VIEW_PURCHASEPURPOSE',
                        width: 150,
                        fix: false,
                        filter: false,
                    },
                    {
                        code: 'procurementproject',
                        label: 'label.PFANS3005VIEW_PROCUREMENTPROJECT',
                        width: 150,
                        fix: false,
                        filter: false,
                    },
                    {
                        code: 'remarks',
                        label: 'label.remarks',
                        width: 150,
                        fix: false,
                        filter: false,
                    },
                    {
                        code: 'brandname',
                        label: 'label.PFANS3005VIEW_BRANDNAME',
                        width: 150,
                        fix: false,
                        filter: false,
                    },
                    {
                        code: 'model',
                        label: 'label.PFANS3005VIEW_MODEL',
                        width: 150,
                        fix: false,
                        filter: false,
                    },
                    {
                        code: 'equipmenturl',
                        label: 'label.PFANS3005VIEW_EQUIPMENTURL',
                        width: 150,
                        fix: false,
                        filter: false,
                    },
                    {
                        code: 'quantity',
                        label: 'label.PFANS3005VIEW_QUANTITY',
                        width: 150,
                        fix: false,
                        filter: false,
                    },
                    {
                        code: 'unitprice',
                        label: 'label.PFANS3005VIEW_UNITPRICE',
                        width: 150,
                        fix: false,
                        filter: false,
                    },
                    {
                        code: 'totalamount',
                        label: 'label.PFANS3005VIEW_TOTALAMOUNT',
                        width: 150,
                        fix: false,
                        filter: false,
                    },
                  {
                    code: 'trashreason',
                    label: 'label.PFANS3005VIEW_TRASHREASON',
                    width: 150,
                    fix: false,
                    filter: false,
                  },
                ],
                buttonList:[],
                buttonListOld: [
                    {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
                    {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
                    {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
                  //NT_PFANS_20210308_BUG_151 ztc 导出图标更正 start
                  {
                    'key': 'export',
                    'name': 'button.generatearticle',
                    'disabled': false,
                    'icon': 'el-icon-edit-outline'
                  },
                  //NT_PFANS_20210308_BUG_151 ztc 导出图标更正 end
                    {'key': 'conapp', 'name': 'button.conapp', 'disabled': false, 'icon': 'el-icon-plus'},
                    {'key': 'temLoanApp', 'name': 'button.temLoanApp', 'disabled': false, 'icon': 'el-icon-plus'},
                    {'key': 'actuarial', 'name': 'button.actuarial', 'disabled': false, 'icon': 'el-icon-edit-outline'},
                  //NT_PFANS_20210308_BUG_151 ztc 导出图标更正 start
                  {'key': 'export2', 'name': 'button.export', 'disabled': false, 'icon': 'el-icon-download'},
                  //NT_PFANS_20210308_BUG_151 ztc 导出图标更正 end

                  //region scc add 10/28 购买决裁,删除按钮 from
                  {'key': 'delete', 'name': 'button.delete', 'disabled': true, 'icon': 'el-icon-delete'},
                  //endregion scc add 10/28 购买决裁,删除按钮 to

                ],
                buttonListAnt: [
                    {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
                    {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
                    {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
                  //NT_PFANS_20210308_BUG_151 ztc 导出图标更正 start
                  {'key': 'export', 'name': 'button.generatearticle', 'disabled': false, 'icon': 'el-icon-edit-outline'},
                  //NT_PFANS_20210308_BUG_151 ztc 导出图标更正 end
                    {'key': 'conapp', 'name': 'button.conapp', 'disabled': false, 'icon': 'el-icon-plus'},
                    {'key': 'temLoanApp', 'name': 'button.temLoanApp', 'disabled': false, 'icon': 'el-icon-plus'},
                    {'key': 'actuarial', 'name': 'button.actuarial', 'disabled': false, 'icon': 'el-icon-edit-outline'},
                  //NT_PFANS_20210308_BUG_151 ztc 导出图标更正 start
                  {'key': 'export2', 'name': 'button.export', 'disabled': false, 'icon': 'el-icon-download'},
                  //NT_PFANS_20210308_BUG_151 ztc 导出图标更正 end

                  //region scc add 10/28 购买决裁,删除按钮 from
                  {'key': 'delete', 'name': 'button.delete', 'disabled': true, 'icon': 'el-icon-delete'},
                  //endregion scc add 10/28 购买决裁,删除按钮 to

                  // add-ztc  数据转结 fr
                  {'key': 'carryforward', 'name': 'button.carryforward', 'disabled': false, 'icon': 'el-icon-edit'},
                  // add-ztc  数据转结 to
                ],
                rowid: '',
                mounth: '',
                date: '',
                row: 'purchase_id',
                caigouhetongTable: [],
            };
        },
        mounted() {
          this.selectInfo();
          this.getdateInfo();
        },
        methods: {
            getdateInfo(){
              this.mounth = new Date().getMonth() + 1;
              this.date = new Date().getDate();
              if(this.mounth === 4 && this.date >= 10 && this.date <= 30) {
                this.buttonList = this.buttonListAnt;
              }else{
                this.buttonList = this.buttonListOld;
              }
            },
            selectInfo(){
              this.loading = true;
              this.$store
                .dispatch('PFANS3005Store/getPurchase')
                .then(response => {
                  if (response.length > 0) {
                    let now = new Date();
                    now = moment(now.setMonth(now.getMonth() + 6)).format('YYYY-MM-DD');
                    let application_date = moment(response[0].application_date).format('YYYY-MM-DD');
                    if (application_date > now) {
                      this.buttonList[1].disabled = true;
                    }
                  }
                  for (let j = 0; j < response.length; j++) {
                    // let lst = getOrgInfoByUserId(response[j].user_id);
                    // if (lst) {
                    //   response[j].group_id1 = response[j].group_id;
                    //   response[j].center_id1 = response[j].center_id;
                    //   response[j].center_id = lst.centerNmae;
                    //   // response[j].group_id = lst.groupNmae;
                    //   response[j].team_id = lst.teamNmae;
                    // }
                    //add_fjl_0927
                    if (response[j].center_id !== null && response[j].center_id !== '' && response[j].center_id !== undefined) {
                      response[j].center_id = getDepartmentById(response[j].center_id);
                    }
                    //add_fjl_0927
                    //add_fjl_0927
                    if (response[j].group_id !== null && response[j].group_id !== '' && response[j].group_id !== undefined) {
                      response[j].group_id = getDepartmentById(response[j].group_id);
                    }
                    if (response[j].team_id !== null && response[j].team_id !== '' && response[j].team_id !== undefined) {
                      response[j].team_id = getDepartmentById(response[j].team_id);
                    }
                    //add_fjl_0927
                    if (response[j].procurementproject !== null && response[j].procurementproject !== '') {
                      let procurement = getDictionaryInfo(response[j].procurementproject);
                      if (procurement != null) {
                        response[j].procurementproject = procurement.value1;
                      }
                    }
                    if (response[j].budgetnumber !== null && response[j].budgetnumber !== '') {
                      let procurement = getDictionaryInfo(response[j].budgetnumber);
                      if (procurement != null) {
                        response[j].budgetnumber = procurement.value1;
                      }
                    }
                    if (response[j].application_date !== null && response[j].application_date !== '') {
                      response[j].application_date = moment(response[j].application_date).format('YYYY-MM-DD');
                    }
                    if (response[j].storagedate !== null && response[j].storagedate !== '') {
                      response[j].storagedate = moment(response[j].storagedate).format('YYYY-MM-DD');
                    }
                    if (response[j].collectionday !== null && response[j].collectionday !== '') {
                      response[j].collectionday = moment(response[j].collectionday).format('YYYY-MM-DD');
                    }
                    if (response[j].actuarialdate !== null && response[j].actuarialdate !== '') {
                      response[j].actuarialdate = moment(response[j].actuarialdate).format('YYYY-MM-DD');
                    }
                    let controller = getUserInfo(response[j].controller);
                    if (controller) {
                      response[j].controller = getUserInfo(response[j].controller).userinfo.customername;
                    }
                    let username = getUserInfo(response[j].username);
                    if (username) {
                      response[j].username = getUserInfo(response[j].username).userinfo.customername;
                    }
                    let recipients = getUserInfo(response[j].recipients);
                    if (recipients) {
                      response[j].recipients = getUserInfo(response[j].recipients).userinfo.customername;
                    }
                    let user = getUserInfo(response[j].user_id);
                    if (user) {
                      response[j].user_id = getUserInfo(response[j].user_id).userinfo.customername;
                    }
                    response[j].status = getStatus(response[j].status);
                    if (response[j].implement_date !== null && response[j].implement_date !== '') {
                      response[j].implement_date = moment(response[j].implement_date).format('YYYY-MM-DD');
                    }
                    if (response[j].careerplan === '1') {

                      if (this.$i18n) {
                        response[j].careerplantemp = this.$t('label.PFANS1004VIEW_INSIDE');
                      }
                    } else {
                      if (this.$i18n) {
                        response[j].careerplantemp = this.$t('label.PFANS1004VIEW_OUTER');
                      }
                    }
                    // ADD_FJL   (受理状态)
                    if (response[j].acceptstatus !== null && response[j].acceptstatus !== "") {
                      if (this.$i18n) {
                        if (response[j].acceptstatus === '0') {
                          response[j].acceptstatus = this.$t('label.PFANS3006VIEW_CARRYOUT');
                        } else if (response[j].acceptstatus === '1') {
                          response[j].acceptstatus = this.$t('label.PFANS3006VIEW_DUIYINGZHONG');
                        } else if (response[j].acceptstatus === '2') {
                          response[j].acceptstatus = this.$t('label.PFANS3006VIEW_WEIDUIYING');
                        }
                      }
                    }
                    // ADD_FJL   (受理时间)
                    if (response[j].findate !== null && response[j].findate !== "") {
                      response[j].findate = moment(response[j].findate).format('YYYY-MM-DD');
                    }
                  }
                  this.data = response;
                  this.loading = false;
                })
                .catch(error => {
                  this.$message.error({
                    message: error,
                    type: 'error',
                    duration: 5 * 1000,
                  });
                  this.loading = false;
                });
            },
            selectInit(row, index) {
                return row.status === this.$t('label.PFANS5004VIEW_OVERTIME');
            },
            //add_fjl_05/19  --设置受理状态和审批状态改变行的背景色
            rowClassName({row, rowIndex}) {
              if (row.acceptstatus === this.$t('label.PFANS3006VIEW_REFUSE') || row.status === this.$t('label.node_step2') || (row.trashreason != '' && row.trashreason != null)) {
                    return 'sub_bg_color_lightgray';
                }
                if (row.acceptstatus === this.$t('label.PFANS3006VIEW_CARRYOUT') || row.actuarialdate != null) {
                    return 'sub_bg_color_lightblue';
                }
            },
          // accAdd(arg1, arg2) {
          //   var r1, r2, m, c;
          //   try {
          //     r1 = arg1.toString().split(".")[1].length;
          //   }
          //   catch (e) {
          //     r1 = 0;
          //   }
          //   try {
          //     r2 = arg2.toString().split(".")[1].length;
          //   }
          //   catch (e) {
          //     r2 = 0;
          //   }
          //   c = Math.abs(r1 - r2);
          //   m = Math.pow(10, Math.max(r1, r2));
          //   if (c > 0) {
          //     var cm = Math.pow(10, c);
          //     if (r1 > r2) {
          //       arg1 = Number(arg1.toString().replace(".", ""));
          //       arg2 = Number(arg2.toString().replace(".", "")) * cm;
          //     } else {
          //       arg1 = Number(arg1.toString().replace(".", "")) * cm;
          //       arg2 = Number(arg2.toString().replace(".", ""));
          //     }
          //   } else {
          //     arg1 = Number(arg1.toString().replace(".", ""));
          //     arg2 = Number(arg2.toString().replace(".", ""));
          //   }
          //   return (arg1 + arg2) / m;
          // },
          submit(){
            this.loading = true;
            this.$refs['form'].validate(valid =>{
              if(valid){
                let parameter = {
                  center_id: this.form.new_center_id,
                  group_id: this.form.new_group_id,
                  team_id:this.form.new_team_id,
                  budgetnumber:this.form.new_budgetunit,
                  purchase_id:this.rowid,
                };
                this.$store
                  .dispatch('PFANS3005Store/change', parameter)
                  .then(response => {
                    // this.data = response;
                    this.selectInfo();
                    Message({
                      message: this.$t('normal.success_07'),
                      type: 'success',
                      duration: 5 * 1000,
                    });
                    this.dialogVisible = false;
                  })
              }else{
                Message({
                  message: this.$t('normal.error_12'),
                  type: 'error',
                  duration: 5 * 1000,
                });
              }
            });
            this.loading = false;
          },
          getCenterid(val){
            this.form.new_center_id = val;
            this.form.new_group_id = '';
            this.form.new_budgetunit = '';
            this.getBudt(val);
            if(val === ""){
              this.form.new_group_id = "";
            }
          },
          getGroupid(val){
            this.form.new_group_id = val;
            this.form.new_budgetunit = '';
            if(val != ""){
              this.getOrgInformation(val);
              this.getBudt(val);
            }else{
              this.getBudt(this.form.new_center_id);
            }
          },
          getTeamid(val){
            this.form.new_team_id = val
          },
          getOrgInformation(id) {
            let org = {};
            let treeCom = this.$store.getters.orgs;
            if (id && treeCom.getNode(id)) {
              let node = id;
              let type = treeCom.getNode(id).data.type || 0;
              for (let index = parseInt(type); index >= 1; index--) {
                if (index === 2) {
                  org.groupname = treeCom.getNode(node).data.departmentname;
                  org.group_id = treeCom.getNode(node).data._id;
                }
                if (index === 1) {
                  org.centername = treeCom.getNode(node).data.companyname;
                  org.center_id = treeCom.getNode(node).data._id;
                }
                node = treeCom.getNode(node).parent.data._id;
              }
              ({
                centername: this.form.centername,
                groupname: this.form.groupname,
                center_id: this.form.new_center_id,
                group_id: this.form.new_group_id,
              } = org);
            }
          },
          getNewbudgetunit(val) {
            this.form.new_budgetunit = val;
          },
          getBudt(val) {
            this.new_options = [];
            if (val === '' || val === null) {
              return;
            }
            //ADD_FJL  修改人员预算编码
            if(getOrgInfo(val)){
              let butinfo = (getOrgInfo(val).encoding).substring(0,3);
              let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'JY002');
              if (dic.length > 0) {
                for (let i = 0; i < dic.length; i++) {
                  if (butinfo === (dic[i].value1).substring(0,3)) {
                    this.new_options.push({
                      lable: dic[i].value2 + '_' + dic[i].value3,
                      value: dic[i].code,
                    });
                  }
                }
              }
              if(this.new_options.length === 0){
                let butinfo = (getOrgInfo(this.form.new_group_id).encoding).substring(0,3);
                let dic = this.$store.getters.dictionaryList.filter(item => item.pcode === 'JY002');
                if (dic.length > 0) {
                  for (let i = 0; i < dic.length; i++) {
                    if (butinfo === (dic[i].value1).substring(0,3)) {
                      this.new_options.push({
                        lable: dic[i].value2 + '_' + dic[i].value3,
                        value: dic[i].code,
                      });
                    }
                  }
                }
              }
            }
          },
            //add_fjl_05/19  --设置受理状态和审批状态改变行的背景色
            rowClick(row) {
              this.rowid = row.purchase_id;
              this.rowInfo = row;
              if(row.trashreason != "" && row.trashreason != null){
                this.buttonList[2].disabled = true;
              }else{
                this.buttonList[2].disabled = false;
              }
              //region scc add 10/28 购买决裁,删除状态 from
              let user = getUserInfo(this.$store.getters.userinfo.userid);
              if (user)
              {
                if((row.status.indexOf(this.$t('normal.todo')) !== -1 || row.status.indexOf(this.$t('label.node_step2')) !== -1) && row.user_id === user.userinfo.customername){
                  this.buttonList[8].disabled = false;
                }else{
                  this.buttonList[8].disabled = true;
                }
              }
              else
              {
                if(row.status.indexOf(this.$t('normal.todo')) !== -1 || row.status.indexOf(this.$t('label.node_step2')) !== -1){
                  this.buttonList[8].disabled = false;
                }else{
                  this.buttonList[8].disabled = true;
                }
              }

              //endregion scc add 10/28 购买决裁,删除状态 to
            },
            buttonClick(val) {
                this.$store.commit('global/SET_HISTORYURL', this.$route.path);
                if (val === 'view') {
                    if (this.rowid === '') {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000,
                        });
                        return;
                    }
                    this.$router.push({
                        name: 'PFANS3005FormView',
                        params: {
                            _id: this.rowid,
                            disabled: false,
                        },
                    });
                }
                if (val === 'insert') {
                    this.$router.push({
                        name: 'PFANS3005FormView',
                        params: {
                            _id: '',
                            disabled: true,
                        },
                    });
                }
                if (val === 'update') {
                    if (this.rowid === '') {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000,
                        });
                        return;
                    }
                    this.$router.push({
                        name: 'PFANS3005FormView',
                        params: {
                            _id: this.rowid,
                            disabled: true,
                        },
                    });
                }
                if (val === 'export') {
                    if (this.$refs.roletable.selectedList.length === 0) {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000,
                        });
                        return;
                    }
                    this.selectedlist = this.$refs.roletable.selectedList;
                    this.export1(this.selectedlist);
                }
                if(val === 'carryforward'){
                  if (this.rowid === '') {
                    Message({
                      message: this.$t('normal.info_01'),
                      type: 'info',
                      duration: 2 * 1000,
                    });
                    return;
                  }else{
                    this.form.last_center_id = this.rowInfo.center_id;
                    this.form.last_group_id = this.rowInfo.group_id;
                    this.form.last_team_id = this.rowInfo.team_id;
                    this.form.last_budgetunit = this.rowInfo.budgetnumber;
                  }
                  this.dialogVisible = true;
                  this.form.new_center_id = '';
                  this.form.new_group_id = '';
                  this.form.new_team_id = '';
                  this.form.new_budgetunit = '';
                }
                if (val === 'export2') {
                    if (this.$refs.roletable.selectedList.length === 0) {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000,
                        });
                        return;
                    }
                    this.selectedlist = this.$refs.roletable.selectedList;
                    import('@/vendor/Export2Excel').then(excel => {
                        const tHeader = [
                            this.$t('label.application'),//申请日
                            this.$t('label.department'),//部门
                            this.$t('label.applicant'),//申请者
                            this.$t('label.PFANS3005VIEW_LINENUMBER'),//内线号
                            this.$t('label.PFANS3005VIEW_SETPLACE'),//放置场所
                            this.$t('label.PFANS3005VIEW_CONTROLLER'),//管理者
                            this.$t('label.PFANS3005VIEW_USER'),//使用者
                            this.$t('label.PFANS1025VIEW_BUDGETCODE'),//预算编码
                            this.$t('label.PFANS3005FORMVIEW_CAREERPLAN'),//事业计划内外
                            this.$t('label.PFANS3005FORMVIEW_BUSINESSPLANBALANCE'),//事业计划余额
                            this.$t('label.PFANS3005VIEW_PURCHASEPURPOSE'),//购入目的
                            this.$t('label.PFANS3005VIEW_PROCUREMENTPROJECT'),//采购目的
                            this.$t('label.PFANS3005VIEW_PROCUREMENTDETAILS'),//采购明细
                            this.$t('label.remarks'),//备注
                            this.$t('label.PFANS3005VIEW_ITEMNAME'),//物品名称
                            this.$t('label.PFANS3005VIEW_BRANDNAME'),//品牌名
                            this.$t('label.PFANS3005VIEW_MODEL'),//型号
                            this.$t('label.PFANS3005VIEW_EQUIPMENTURL'),//设备url
                            this.$t('label.PFANS3005VIEW_QUANTITY'),//数量
                            this.$t('label.PFANS3005VIEW_UNITPRICE'),//单价
                            this.$t('label.PFANS3005VIEW_TOTALAMOUNT'),//总金额
                            this.$t('label.PFANS3005VIEW_STORAGEDATE'),//入库日
                            this.$t('label.PFANS3005VIEW_COLLECTIONDAY'),//领取日
                            this.$t('label.PFANS3005VIEW_RECIPIENTS'),//领取者
                            this.$t('label.PFANS3005VIEW_ACTUARIALDATE'),//精算日
                            this.$t('label.PFANS3005VIEW_ACTUARIALAMOUNT'),//精算金额
                        ];
                        const filterVal = [
                            'application_date',
                            'center_id',
                            'user_id',
                            'linenumber',
                            'setplace',
                            'controller',
                            'username',
                            'budgetnumber',
                            'careerplantemp',
                            'businessplanamount',
                            'purchasepurpose',
                            'procurementproject',
                            'procurementdetails',
                            'remarks',
                            'procurementdetails',
                            'brandname',
                            'model',
                            'equipmenturl',
                            'quantity',
                            'unitprice',
                            'totalamount',
                            'storagedate',
                            'collectionday',
                            'recipients',
                            'actuarialdate',
                            'actuarialamount',
                        ];
                        const list = this.selectedlist;
                        const data = this.formatJson(filterVal, list);
                        excel.export_json_to_excel(tHeader, data, this.$t('menu.PFANS3005') + '_' + this.$t(moment(new Date()).format('YYYY-MM-DD')));
                    });
                }

                //add_fjl_0724   添加跳转申请精算与暂借款  end
                let careerplantemp = false;
                if (val === 'actuarial' || val === 'temLoanApp') {
                    if (this.$refs.roletable.selectedList.length === 0) {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000,
                        });
                        return;
                    }//add-ws-8/19-禅道470任务
                    else {
                      if(val === 'actuarial')
                      {
                        let selectedlist = this.$refs.roletable.selectedList;
                        let n = 0;
                        let checksum = selectedlist.length;
                        for (let i = 0; i < selectedlist.length; i++) {
                          if (selectedlist[i].loanapno == null || selectedlist[i].loanapno == '') {
                            n = n + 1;
                          }
                        }
                        if (n != checksum) {
                          if (n != 0) {
                            Message({
                              message: this.$t('label.PFANS1001FORMVIEW_CHECKSUM'),
                              type: 'info',
                              duration: 2 * 1000,
                            });
                            return;
                          }
                        }

                        //add ccm 20211028 决裁精算时添加事业计划内外限制 fr
                        let ny = 0;
                        for (let i = 0; i < selectedlist.length; i++) {
                          if (selectedlist[i].careerplan === '1') {
                            //内
                            ny = ny + 1;
                          }
                        }
                        if (ny != checksum) {
                          if (ny != 0) {
                            Message({
                              message: this.$t('label.PFANS1001FORMVIEW_CHECKCAREERPLAN'),
                              type: 'info',
                              duration: 2 * 1000,
                            });
                            return;
                          }
                        }
                        else
                        {
                          careerplantemp = true;
                        }
                        //add ccm 20211028 决裁精算时添加事业计划内外限制 to
                      }
                    }
                    //add-ws-8/19-禅道470任务
                    this.selectedlist = [];
                    this.selectedlist = this.$refs.roletable.selectedList;
                    let optionsSEL = [];
                    let _judgement = '';
                    let _judgement_name = '';
                    let _judgements_moneys = '';
                    let _remarks = '';
                  //add-lyt-2/7-控制此单是否可以申请多次暂借款-start
                    let enableduplicateloan = [];
                  //add-lyt-2/7-控制此单是否可以申请多次暂借款-start
                    for (let i = 0; i < this.selectedlist.length; i++) {
                        let user = getUserInfo(this.selectedlist[i].user_id);
                        if (user) {
                            this.selectedlist[i].user_id = getUserInfo(this.selectedlist[i].user_id).userinfo.customername;
                        }
                        var vote = {};
                        vote.user_id = this.selectedlist[i].user_id;
                        vote.remarks = this.selectedlist[i].purchasepurpose;
                        vote.numbers = this.selectedlist[i].purnumbers;
                        vote.value = this.selectedlist[i].purchase_id;
                        vote.label = this.selectedlist[i].purnumbers;
                        vote.judgements_moneys = this.selectedlist[i].totalamount;
                        if (this.$i18n) {
                            vote.judgements_type = this.$t('label.PFANS1012VIEW_PURCHASSES');
                        }
                        optionsSEL.push(vote);
                        _judgement += this.selectedlist[i].purchase_id + ',';
                        _judgement_name += this.selectedlist[i].purnumbers + ',';
                        _judgements_moneys += this.selectedlist[i].totalamount + ',';
                        _remarks += this.selectedlist[i].purchasepurpose + '^';
                        //add-lyt-2/7-控制此单是否可以申请多次暂借款-start
                        enableduplicateloan= this.selectedlist[i].enableduplicateloan;
                         //add-lyt-2/7-控制此单是否可以申请多次暂借款-start
                    }

                    if (val === 'actuarial') {
                      //暂借款剩余可报销金额
                      // let selectedlistAnt = this.$refs.roletable.selectedList;
                      // let warnlist = '';
                      // let _surpubilcmoney = 0;
                      // for(let o = 0 ; o < selectedlistAnt.length; o ++) {
                      //   if(selectedlistAnt[o].surpubilcmoney != '' && selectedlistAnt[o].surpubilcmoney != null){
                      //     if (selectedlistAnt[o].surpubilcmoney <= 0) {
                      //       if (warnlist == '') {
                      //         warnlist = selectedlistAnt[o].purnumbers;
                      //       } else {
                      //         warnlist += ',' + selectedlistAnt[o].purnumbers
                      //       }
                      //     }else{
                      //       _surpubilcmoney = this.accAdd(_surpubilcmoney,parseFloat(selectedlistAnt[o].surpubilcmoney));
                      //     }
                      //   }
                      // }
                      // if(warnlist != ''){
                      //   Message({
                      //     message: warnlist + this.$t('normal.info_17'),
                      //     type: 'info',
                      //     duration: 2 * 1000,
                      //   });
                      //   return;
                      // }
                        //del ccm 0813 决裁到暂借款，精算  check去掉
                        // //是否已经精算
                        // let str = '';
                        // for (let i = 0; i < this.selectedlist.length; i++) {
                        //   if (this.selectedlist[i].invoiceno != null && this.selectedlist[i].invoiceno != '' && this.selectedlist[i].invoiceno != undefined) {
                        //     str += this.selectedlist[i].purnumbers + ' , ';
                        //   }
                        // }
                        //del ccm 0813 决裁到暂借款，精算  check去掉
                        //如果有暂借款，是否是相同的暂借款
                        let loan = '';
                        let loanmoney = '';
                        let k = 0;
                        for (let i = 0; i < this.selectedlist.length; i++) {
                            // if (k != 0)
                            // {
                            //   if (this.selectedlist[i].loanapno === gid)
                            //   {
                            //     continue;
                            //   }
                            //   else
                            //   {
                            //     Message({
                            //       message: this.$t('label.PFANS3005VIEW_MSG3'),
                            //       type: 'info',
                            //       duration: 3 * 1000,
                            //     });
                            //     return
                            //   }
                            // }
                            // k++;
                            // gid = this.selectedlist[i].loanapno;
                            if (this.selectedlist[i].loanapno != null && this.selectedlist[i].loanapno != '' && this.selectedlist[i].loanapno != undefined) {
                                loan += this.selectedlist[i].loanapplication_id + ',';
                            }
                        }
                        //del ccm 0813 决裁到暂借款，精算  check去掉
                        // if (str === '') {
                        //del ccm 0813 决裁到暂借款，精算  check去掉
                        if (loan != null && loan != '' && loan != undefined) {
                            loan = loan.substring(0, loan.length - 1);
                            if (loan != null && loan != '' && loan != undefined) {
                                this.$router.push({
                                    name: 'PFANS1012FormView',
                                    params: {
                                        _name: optionsSEL,
                                        _type: 'PJ001002',
                                        _haveLoanapp: loan,
                                        // _surpubilcmoney: _surpubilcmoney,
                                        disabled: true,
                                        _careerplan : careerplantemp,
                                    },
                                });
                            } else {
                                this.$router.push({
                                    name: 'PFANS1012FormView',
                                    params: {
                                        _name: optionsSEL,
                                        _type: 'PJ001002',
                                        // _surpubilcmoney: _surpubilcmoney,
                                        disabled: true,
                                        _careerplan : careerplantemp,
                                    },
                                });
                            }
                        } else {
                            this.$router.push({
                                name: 'PFANS1012FormView',
                                params: {
                                    _name: optionsSEL,
                                    _type: 'PJ001002',
                                    disabled: true,
                                    _careerplan : careerplantemp,
                                },
                            });
                        }
                        //del ccm 0813 决裁到暂借款，精算  check去掉
                        // } else {
                        //   Message({
                        //     message: this.$t('label.PFANS3005VIEW_NUMBERS') + ' : ' + str + ' ' + this.$t('label.PFANS3005VIEW_INVOICENO'),
                        //     type: 'info',
                        //     duration: 3 * 1000,
                        //   });
                        //   return
                        // }
                        //del ccm 0813 决裁到暂借款，精算  check去掉
                    }
                    else {
                      //暂借款剩余可借金额
                      // let selectedlistAnt = this.$refs.roletable.selectedList;
                      // let warnlist = '';
                      // let _surloappmoney = 0;
                      // for(let o = 0 ; o < selectedlistAnt.length; o ++) {
                      //   if(selectedlistAnt[o].surloappmoney != '' && selectedlistAnt[o].surloappmoney != null) {
                      //     if (selectedlistAnt[o].surloappmoney <= 0) {
                      //       if (warnlist == '') {
                      //         warnlist = selectedlistAnt[o].purnumbers;
                      //       } else {
                      //         warnlist += ',' + selectedlistAnt[o].purnumbers
                      //       }
                      //     } else {
                      //       _surloappmoney = this.accAdd(_surloappmoney, parseFloat(selectedlistAnt[o].surloappmoney));
                      //     }
                      //   }
                      // }
                      // if(warnlist != ''){
                      //   Message({
                      //     message: warnlist + this.$t('normal.info_19'),
                      //     type: 'info',
                      //     duration: 2 * 1000,
                      //   });
                      //   return;
                      // }else{
                      //
                      // }
                        //暂借款申请
                        //del ccm 0813 决裁到暂借款，精算  check去掉
                        // //check是否存在暂借款
                        let str = '';
                        for (let i = 0; i < this.selectedlist.length; i++) {
                          if (this.selectedlist[i].loanapno != null && this.selectedlist[i].loanapno != '' && this.selectedlist[i].loanapno != undefined && this.selectedlist[i].enableduplicateloan === 'PJ055002') {
                            str += this.selectedlist[i].purnumbers + ' , ';
                          }
                        }

                        if (str === '') {
                          //del ccm 0813 决裁到暂借款，精算  check去掉
                          this.$router.push({
                            name: 'PFANS1006FormView',
                            params: {
                              _id: '',
                              _judgement: _judgement,
                              _judgement_name: _judgement_name,
                              _judgements_moneys: _judgements_moneys,
                              _remarks: _remarks,
                              _judgements_type: this.$t('label.PFANS1012VIEW_PURCHASSES'),
                              disabled: true,
                            },
                          });
                          //del ccm 0813 决裁到暂借款，精算  check去掉
                        }
                         else{
                              Message({
                                message: this.$t('label.PFANS3005VIEW_NUMBERS') + ' : ' + str + ' ' + this.$t('label.PFANS3005VIEW_LOANAPP'),
                                type: 'info',
                                duration: 3 * 1000,
                              });
                          return
                        }
                        //del ccm 0813 决裁到暂借款，精算  check去掉
                    }
                }
                //add_fjl_0724   添加跳转申请精算与暂借款  end
                if (val === 'conapp') {
                    if (this.$refs.roletable.selectedList.length === 0) {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000,
                        });
                        return;
                    }
                    this.selectedlist = [];
                    this.selectedlist = this.$refs.roletable.selectedList;
                    let purnumberss = '';

                    this.caigouhetongTable = [];
                    for (let i = 0; i < this.selectedlist.length; i++) {
                        let o = [];
                        purnumberss += this.selectedlist[i].purnumbers + ',';
                        o.purnumbers = this.selectedlist[i].purnumbers;
                        o.totalamount = this.selectedlist[i].totalamount;
                        this.caigouhetongTable.push(o);
                    }
                    let gid = '';
                    let k = 0;
                    for (let i = 0; i < this.selectedlist.length; i++) {
                        if (gid != '') {
                            if (this.selectedlist[i].center_id1 === gid) {
                                continue;
                            } else {
                                Message({
                                    message: this.$t('label.PFANS3005VIEW_MSG2'),
                                    type: 'info',
                                    duration: 3 * 1000,
                                });
                                return;
                            }
                        }
                        k++;
                        gid = this.selectedlist[i].center_id1;
                    }
                    //采购合同重复check
                    this.$store
                        .dispatch('PFANS1026Store/purchaseExistCheck', {'purnumbers': purnumberss})
                        .then(response => {
                            if (response.length === 0) {
                                //合同号申请
                                this.$router.push({
                                    name: 'PFANS1033FormView',
                                    params: {
                                        _id: '',
                                        _applicantdeptcode: this.selectedlist[0].center_id1,
                                        _caigouhetongTable: this.caigouhetongTable,
                                        disabled: true,
                                    },
                                });
                            } else {
                                let jmsg = '';
                                for (let j = 0; j < response.length; j++) {
                                    jmsg += response[j].purnumbers + ' , ';
                                }
                                Message({
                                    message: this.$t('label.PFANS3005VIEW_NUMBERS') + ' : ' + jmsg + ' ' + this.$t('label.PFANS3005VIEW_MSG1'),
                                    type: 'info',
                                    duration: 3 * 1000,
                                });
                                return;
                            }
                            // if (this.$store.getters.historyUrl) {
                            //   this.$router.push(this.$store.getters.historyUrl);
                            // }
                            this.loading = false;
                        })
                        .catch(error => {
                            this.$message.error({
                                message: error,
                                type: 'error',
                                duration: 5 * 1000,
                            });
                            this.loading = false;
                        });
                }
                //region scc add 10/28 购买决裁逻辑删除 from
              if(val === 'delete'){
                if(this.rowid){
                  this.loading = true;
                  this.$confirm(this.$t('normal.info_02'), this.$t('normal.info'), {
                    confirmButtonText: this.$t('button.confirm'),
                    cancelButtonText: this.$t('button.cancel'),
                    type: 'warning',
                    center: true,
                  }).then(() => {
                  this.$store
                    .dispatch('PFANS3005Store/purchdelete', this.rowInfo)
                    .then(response => {
                      this.selectInfo();
                      this.$store.commit('global/SET_OPERATEID', '');
                      Message({
                        message: this.$t('normal.info_03'),
                        type: 'success',
                        duration: 2 * 1000,
                      });
                      this.loading = false;
                    })
                    .catch(error => {
                      this.$message.error({
                        message: error,
                        type: 'error',
                        duration: 5 * 1000,
                      });
                    });
                  }).catch(() => {
                    this.$message.info({
                      type: 'info',
                      message: this.$t('normal.info_04'),
                    });
                    this.loading = false;
                  });
                  this.loading = false;
                }
              }
              //endregion scc add 10/28 购买决裁逻辑删除 to
            },
            export1() {
                this.loading = true;
                this.$store
                    .dispatch('PFANS3005Store/downLoad', {purchase: this.selectedlist})
                    .then(response => {
                        this.loading = false;
                    })
                    .catch(error => {
                        this.$message.error({
                            message: error,
                            type: 'error',
                            duration: 5 * 1000,
                        });
                        this.loading = false;
                    });
            },
            formatJson(filterVal, jsonData) {
                return jsonData.map(v =>
                    filterVal.map(j => {
                        if (j === 'timestamp') {
                            return parseTime(v[j]);
                        } else {
                            return v[j];
                        }
                    }),
                );
            },
        },
    };
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
