<template>
  <div>
    <!--境外出差申请 境内出差申請-->
    <EasyNormalTable :title="title" :columns="columns" :data="data" :rowid="row" :buttonList="buttonListAnt"
                     :showSelection="isShow" ref="roletable5" :selectable="selectInit"
                     @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading" v-show="this.showTable===1">
    </EasyNormalTable>
    <!--    ADD-WS-决裁编号添加 无偿设备 其他业务决裁-->
    <EasyNormalTable :buttonList="buttonListAnt" :columns="columns2" :data="data" :rowid="row" :selectable="selectInit1"
                     :showSelection="isShow" :title="title" @buttonClick="buttonClick" @rowClick="rowClick"
                     ref="roletable3" v-loading="loading" v-show="this.showTable===2">
    </EasyNormalTable>
    <!--    ADD-WS-决裁编号添加-->
    <!--    ADD-WS-费用编号添加 千元以下费用申请-->
    <EasyNormalTable :buttonList="buttonListAnt" :columns="columns3" :data="data" :rowid="row" :selectable="selectInit"
                     :showSelection="isShow" :title="title" @buttonClick="buttonClick" @rowClick="rowClick"
                     ref="roletable2" v-loading="loading" v-show="this.showTable===3">
    </EasyNormalTable>
    <!--    ADD-WS-费用编号添加 暂借款申请单-->
    <!--    add_fjl_05/27  添加暂借款申请编号的列表-->
    <EasyNormalTable :buttonList="buttonListAnt" :columns="columns4" :data="data" :rowid="row" :selectable="selectInit"
                     :showSelection="isShow" :title="title" @buttonClick="buttonClick" @rowClick="rowClick"
                     ref="roletable4" v-loading="loading" v-show="this.showTable===4">
    </EasyNormalTable>
    <!--    add_fjl_05/27  添加暂借款申请编号的列表-->
    <!--    add-ws-5/27-No.170 交际费事前决裁-->
    <EasyNormalTable :buttonList="buttonListAnt" :columns="columns5" :data="data" :rowid="row" :selectable="selectInit"
                     :showSelection="isShow" :title="title" @buttonClick="buttonClick" @rowClick="rowClick"
                     ref="roletable1" v-loading="loading" v-show="this.showTable===5">
    </EasyNormalTable>
    <!--  add-ws-5/27-No.170 事前面谈票-->
    <EasyNormalTable :buttonList="buttonList" :columns="columns6" :data="data" :title="title" v-loading="loading"
                     v-show="this.showTable===6" @buttonClick="buttonClick" @rowClick="rowClick" :rowid="row">
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
  import {
    getDictionaryInfo,
    getOrgInfoByUserId,
    getStatus,
    getUserInfo,
    getOrgInfo,
    getDepartmentById,
    getUserInfoName,
  } from '@/utils/customize';
  import moment from 'moment';

  export default {
    name: 'PFANS1001FormView',
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
        selectedlist: [],
        options: [],
        showTable: '',
        loading: false,
        isShow: true,
        title: '',
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
              trigger: 'change'
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
        // 表格数据源
        data: [],
        //ADD-WS-费用编号添加
        columns3: [
          {
            code: 'purchasenumbers',
            label: 'label.PFANS1005VIEW_NUMBERS',
            width: 120,
            fix: false,
            filter: true,
          },
          //add-ws-8/19-禅道470任务
          {
            code: 'loanapno',
            label: 'label.PFANS1006FORMVIEW_LOANAPNO',
            width: 130,
            fix: false,
            filter: true,
          },
          //add-ws-8/19-禅道470任务
          {
            code: 'remarks',
            label: 'label.PFANS1012VIEW_ABSTRACT',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'user_id',
            label: 'label.applicant',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'center_id',
            label: 'label.center',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'group_id',
            label: 'label.group',
            width: 130,
            fix: false,
            filter: true,
          },
          {
            code: 'team_id',
            label: 'label.team',
            width: 120,
            fix: false,
            filter: true,
          },
          //region scc add 千元以下费用申请,事业计划类型 from
          {
            code: 'plantempp',
            label: 'label.PFANS3003FORMVIEW_TYPE',
            width: 150,
            fix: false,
            filter: true,
          },
          //endregion scc add 千元以下费用申请,事业计划类型 to
          {
            code: 'status',
            label: 'label.approval_status',
            width: 120,
            fix: false,
            filter: true,
          },
        ],
        //ADD-WS-费用编号添加
        //ADD-WS-决裁编号添加
        columns2: [
          {
            code: 'judgnumbers',
            label: 'label.PFANS1001FORMVIEW_NUMBERS',
            width: 120,
            fix: false,
            filter: true,
          },
          //add-ws-8/19-禅道470任务
          {
            code: 'loanapno',
            label: 'label.PFANS1006FORMVIEW_LOANAPNO',
            width: 130,
            fix: false,
            filter: true,
          },
          //add-ws-8/19-禅道470任务
          {
            code: 'filename',
            label: 'label.PFANS1012VIEW_ABSTRACT',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'user_id',
            label: 'label.applicant',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'center_id',
            label: 'label.center',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'group_id',
            label: 'label.group',
            width: 130,
            fix: false,
            filter: true,
          },
          {
            code: 'team_id',
            label: 'label.team',
            width: 120,
            fix: false,
            filter: true,
          },
          //region scc add 其他业务决裁,事业计划 from
          {
            code: 'careerplantempp',
            label: 'label.PFANS3003FORMVIEW_TYPE',
            width: 150,
            fix: false,
            filter: true,
          },
          //endregion scc add 其他业务决裁,事业计划 to
          {
            code: 'status',
            label: 'label.approval_status',
            width: 120,
            fix: false,
            filter: true,
          },
        ],
        //ADD-WS-决裁编号添加
        // 列属性
        columns: [
          // ztc 禅道No.61-增加编号（日期加序列号）start
          {
            code: 'business_number',
            label: 'label.PFANS1001FORMVIEW_BUSINESS_NUMBER',
            width: 120,
            fix: false,
            filter: true,
          },
          // ztc 禅道No.61-增加编号（日期加序列号 end
          //add-ws-8/19-禅道470任务
          {
            code: 'loanapno',
            label: 'label.PFANS1006FORMVIEW_LOANAPNO',
            width: 130,
            fix: false,
            filter: true,
          },
          //add-ws-8/19-禅道470任务
          {
            code: 'user_id',
            label: 'label.applicant',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'center_id',
            label: 'label.center',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'group_id',
            label: 'label.group',
            width: 130,
            fix: false,
            filter: true,
          },
          {
            code: 'team_id',
            label: 'label.team',
            width: 120,
            fix: false,
            filter: true,
          },
// ztc 禅道No.61-增加出差地、出差日期 start
          {
            code: 'regioncity',
            label: 'label.PFANS3001VIEW_TRIPPOINT',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'date',
            label: 'label.PFANS1013VIEW_DATE',
            width: 170,
            fix: false,
            filter: true,
          },
// ztc 禅道No.61-增加出差地、出差日期 end
          //region scc add 出差，事业计划 from
          {
            code: 'plantempp',
            label: 'label.PFANS3003FORMVIEW_TYPE',
            width: 120,
            fix: false,
            filter: true,
          },
          //endregion scc add 出差，事业计划 to
          {
            code: 'status',
            label: 'label.approval_status',
            width: 120,
            fix: false,
            filter: true,
          },
        ],

//        add_fjl_05/27  --添加暂借款申请单列表
        columns4: [
          //add-ws-8/19-禅道470任务
          {
            code: 'loanapno',
            label: 'label.PFANS1006FORMVIEW_LOANAPNO',
            width: 130,
            fix: false,
            filter: true,
          },
          //add-ws-8/19-禅道470任务
          {
            code: 'user_id',
            label: 'label.applicant',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'moneys',
            label: 'label.PFANS1004VIEW_AMOUNT',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'remark',
            label: 'label.PFANS1012VIEW_ABSTRACT',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'status',
            label: 'label.approval_status',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'modifyon',
            label: 'label.PFANS1030FORMVIEW_TIEEEND',
            width: 120,
            fix: false,
            filter: true,
          },

          {
            code: 'canafver',
            label: 'label.PFANS1030FORMVIEW_CANAFVER',
            width: 130,
            fix: false,
            filter: true,
          },
          {
            code: 'canafvermoney',
            label: 'label.PFANS1030FORMVIEW_CANAFVERMONEY',
            width: 130,
            fix: false,
            filter: true,
          },
          {
            code: 'processingstatus',
            label: 'label.status',
            width: 130,
            fix: false,
            filter: true,
          },
          {
            code: 'center_id',
            label: 'label.center',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'group_id',
            label: 'label.group',
            width: 130,
            fix: false,
            filter: true,
          },
          {
            code: 'team_id',
            label: 'label.team',
            width: 120,
            fix: false,
            filter: true,
          },
        ],
//        add_fjl_05/27  --添加暂借款申请单列表
        //       add-ws-5/27-No.170
        columns5: [
          {
            code: 'numbercation',
            label: 'label.PFANS1006FORMVIEW_NUMBERCATION',
            width: 130,
            fix: false,
            filter: true,
          },
          //add-ws-8/19-禅道470任务
          {
            code: 'loanapno',
            label: 'label.PFANS1006FORMVIEW_LOANAPNO',
            width: 130,
            fix: false,
            filter: true,
          },
          //add-ws-8/19-禅道470任务
          {
            code: 'company',
            label: 'label.PFANS1010FORMVIEW_OPPOSITEUNIT',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'user_id',
            label: 'label.applicant',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'center_id',
            label: 'label.center',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'group_id',
            label: 'label.group',
            width: 130,
            fix: false,
            filter: true,
          },
          {
            code: 'team_id',
            label: 'label.team',
            width: 120,
            fix: false,
            filter: true,
          },
          //region scc add 交际费事前决裁,事业计划 from
          {
            code: 'plantempp',
            label: 'label.PFANS3003FORMVIEW_TYPE',
            width: 150,
            fix: false,
            filter: true,
          },
          //endregion scc add 交际费事前决裁,事业计划 to
          {
            code: 'status',
            label: 'label.approval_status',
            width: 120,
            fix: false,
            filter: true,
          },
        ],
//       add-ws-5/27-No.170

        columns6: [
          {
            code: 'user_id',
            label: 'label.applicant',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'center_id',
            label: 'label.center',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'group_id',
            label: 'label.group',
            width: 130,
            fix: false,
            filter: true,
          },
          {
            code: 'team_id',
            label: 'label.team',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'status',
            label: 'label.approval_status',
            width: 120,
            fix: false,
            filter: true,
          },
        ],
        buttonListAnt:[],
        buttonList: [ //事前面谈票
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
        ],
        //add_fjl  start
        buttonList4: [ //暂借款申请单
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          // {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
          {'key': 'export1', 'name': 'button.printing', 'disabled': false, 'icon': 'el-icon-upload2'},
        ],
        buttonListCarry4: [ //暂借款申请单
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          // {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
          {'key': 'export1', 'name': 'button.printing', 'disabled': false, 'icon': 'el-icon-upload2'},
          // add-ztc  数据转结 fr
          {'key': 'carryforward', 'name': 'button.carryforward', 'disabled': false, 'icon': 'el-icon-edit'},
          // add-ztc  数据转结 to
        ],
        buttonList3: [ //千元以下费用申请
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
          {'key': 'actuarial', 'name': 'button.actuarial', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'temLoanApp', 'name': 'button.temLoanApp', 'disabled': false, 'icon': 'el-icon-plus'},
          //region scc add 10/28 千元以下费用申请,删除按钮 from
          {'key': 'delete', 'name': 'button.delete', 'disabled': true, 'icon': 'el-icon-delete'},
          //endregion scc add 10/28 千元以下费用申请,删除按钮 to
        ],
        buttonListCarry3: [ //千元以下费用申请
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
          {'key': 'actuarial', 'name': 'button.actuarial', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'temLoanApp', 'name': 'button.temLoanApp', 'disabled': false, 'icon': 'el-icon-plus'},
          //region scc add 10/28 千元以下费用申请,删除按钮 from
          {'key': 'delete', 'name': 'button.delete', 'disabled': true, 'icon': 'el-icon-delete'},
          //endregion scc add 10/28 千元以下费用申请,删除按钮 to
          // add-ztc  数据转结 fr
          {'key': 'carryforward', 'name': 'button.carryforward', 'disabled': false, 'icon': 'el-icon-edit'},
          // add-ztc  数据转结 to
        ],
        //add_fjl  end
        //add-ws-7/7-禅道247
        buttonList2: [ //境外出差申请 境内出差申請
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
          {'key': 'qxch', 'name': 'button.qxch', 'disabled': true, 'icon': 'el-icon-edit'},
          {'key': 'actuarial', 'name': 'button.actuarial', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'temLoanApp', 'name': 'button.temLoanApp', 'disabled': false, 'icon': 'el-icon-plus'},
          //region scc add 10/28 境外出差申请,删除按钮 from
          {'key': 'delete', 'name': 'button.delete', 'disabled': true, 'icon': 'el-icon-delete'},
          //endregion scc add 10/28 境外出差申请,删除按钮 to
        ],
        buttonListCarry2: [ //境外出差申请 境内出差申請
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
          {'key': 'qxch', 'name': 'button.qxch', 'disabled': true, 'icon': 'el-icon-edit'},
          {'key': 'actuarial', 'name': 'button.actuarial', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'temLoanApp', 'name': 'button.temLoanApp', 'disabled': false, 'icon': 'el-icon-plus'},
          //region scc add 10/28 境外出差申请,删除按钮 from
          {'key': 'delete', 'name': 'button.delete', 'disabled': true, 'icon': 'el-icon-delete'},
          //endregion scc add 10/28 境外出差申请,删除按钮 to
          // add-ztc  数据转结 fr
          {'key': 'carryforward', 'name': 'button.carryforward', 'disabled': false, 'icon': 'el-icon-edit'},
          // add-ztc  数据转结 to
        ],
        //add-ws-7/7-禅道247
        rowid: '',
        statuss: '',
        check: false,
        row: '_id',
        url: '',
        flagChange: '',
        mounth: '',
        date: '',
        //region scc add 存出差地国家・城市字段 from
        toCity: '',
        //endregion scc add 存出差地国家・城市字段 to
      };
    },
    mounted() {
      this.getCompanyProjectList(this.$route.params.title);
      this.getdateInfo();
      //region scc add 无偿设备，无事业计划列 from
      if(this.$route.params.title === 3){
        this.columns2 = this.columns2.filter(item => item.code !== 'careerplantempp');
      }
      //endregion scc add 无偿设备，无事业计划列 to
    },
    methods: {
      // add-ztc  数据转结 fr
      getdateInfo(){
        this.mounth = new Date().getMonth() + 1;
        this.date = new Date().getDate();
        if(this.mounth === 4 && this.date >= 10 && this.date <= 30) {
          if (this.showTable === 1) {
            this.buttonListAnt = this.buttonListCarry2;
          } else if (this.showTable === 2 || this.showTable === 3 || this.showTable === 5) {
            this.buttonListAnt = this.buttonListCarry3;
          }else if (this.showTable === 4) {
            this.buttonListAnt = this.buttonListCarry4;
          }else if (this.showTable === 6) {
            this.buttonListAnt = this.buttonList;
          }
        }else{
          if (this.showTable === 1) {
            this.buttonListAnt = this.buttonList2;
          } else if (this.showTable === 2 || this.showTable === 3 || this.showTable === 5) {
            this.buttonListAnt = this.buttonList3;
          }else if (this.showTable === 4) {
            this.buttonListAnt = this.buttonList4;
          }else if (this.showTable === 6) {
            this.buttonListAnt = this.buttonList;
          }
        }
      },
      submit(){
        this.loading = true;
        this.$refs['form'].validate(valid =>{
          if(valid){
            let parameter = {
              center_id: this.form.new_center_id,
              group_id: this.form.new_group_id,
              team_id:this.form.new_team_id,
              budgetunit:this.form.new_budgetunit,
              change_id:this.rowid,
              flag:this.flagChange,
            };
            this.$store
              .dispatch('PFANS1001Store/change', parameter)
              .then(response => {
                this.getCompanyProjectList(this.$route.params.title);
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
      // add-ztc  数据转结 to
      // // add-ws-7/14-禅道144任务
      // check() {
      //   if (this.$route.params.check) {
      //     this.search = this.$route.params.check;
      //   }
      // },
      // // add-ws-7/14-禅道144任务
      selectInit(row, index) {
        // if(row.judgnumbers) {
        if (row.status === this.$t('label.PFANS5004VIEW_OVERTIME')) {
          return row;
          // }
        }
      },
      selectInit1(row, index) {
        if (row.judgnumbers) {
          if (row.status === this.$t('label.PFANS5004VIEW_OVERTIME') && row.judgnumbers.indexOf('_') == -1) {
            return row;
          }
        }
      },
      getCompanyProjectList(val) {
        if (val === 1) {
          this.flagChange = '1';
          //ADD-WS-决裁编号添加
          this.showTable = 1;
          //ADD-WS-决裁编号添加
          this.row = 'business_id';
          this.title = 'title.PFANS1002VIEW';
          let businesstype = {'businesstype': '0'};
          this.dispatchparameter('PFANS1001Store/getBusiness', businesstype);
        } else if (val === 2) {
          this.flagChange = '2';
          //ADD-WS-决裁编号添加
          this.showTable = 1;
          //ADD-WS-决裁编号添加
          this.row = 'business_id';
          this.title = 'title.PFANS1035VIEW';
          let businesstype = {'businesstype': '1'};
          this.dispatchparameter('PFANS1001Store/getBusiness', businesstype);
        } else if (val === 3) {
          this.flagChange = '3';
          //ADD-WS-决裁编号添加
          this.showTable = 2;
          //ADD-WS-决裁编号添加
          this.row = 'judgementid';
          this.title = 'title.PFANS1003VIEW';
          let letequipment = {'equipment': '1'};
          this.dispatchparameter('PFANS1001Store/getJudgement', letequipment);
        } else if (val === 4) {
          this.flagChange = '4';
          //ADD-WS-决裁编号添加
          this.showTable = 2;
          //ADD-WS-决裁编号添加
          this.row = 'judgementid';
          this.title = 'title.PFANS1004VIEW';
          let letequipment = {'equipment': '0'};
          this.dispatchparameter('PFANS1001Store/getJudgement', letequipment);
        } else if (val === 5) {
          this.flagChange = '5';
          //ADD-WS-费用编号添加
          this.showTable = 3;
          //ADD-WS-费用编号添加
          this.row = 'purchaseapply_id';
          this.title = 'title.PFANS1005VIEW';
          this.dispatch('PFANS1001Store/getpurchaseApply');
        } else if (val === 6) {
          this.flagChange = '6';
          //ADD-WS-决裁编号添加
          this.showTable = 4;
          //ADD-WS-决裁编号添加
          this.row = 'loanapplication_id';
          this.title = 'title.PFANS1006VIEW';
          this.dispatch('PFANS1001Store/getLoanapplication');
        } else if (val === 10) {
          this.flagChange = '10';
          //ADD-WS-决裁编号添加
          this.showTable = 5;
          //ADD-WS-决裁编号添加
          this.row = 'communication_id';
          this.title = 'title.PFANS1010VIEW';
          this.dispatch('PFANS1001Store/getCommunication');
        } else if (val === 11) {
          this.flagChange = '11';
          //ADD-WS-决裁编号添加
          this.showTable = 6;
          //ADD-WS-决裁编号添加
          this.row = 'offshore_id';
          this.title = 'title.PFANS1011VIEW';
          this.dispatch('PFANS1001Store/getOffshore');
        }
      },
      dispatch(val) {
        this.data = [];
        this.loading = true;
        this.$store
          .dispatch(val)
          .then(response => {
            //region scc add 页面初始加载事业计划类型 from
            for(let i = 0; i < response.length; i++){

              if(this.$route.params.title === 5 || this.$route.params.title === 10){//千元以下费用-----交际费
                if (response[i].plan === '1') {
                  if (this.$i18n) {
                    response[i].plantempp = this.$t('label.PFANS1004VIEW_INSIDE');
                  }
                } else {
                  if (this.$i18n) {
                    response[i].plantempp = this.$t('label.PFANS1004VIEW_OUTER');
                  }
                }
              }

            }
            //endregion scc add 页面初始加载事业计划类型 to
            this.data = this.setuser(response);
            this.loading = false;
          });
      },
      dispatchparameter(val, letequipment) {
        this.data = [];
        this.loading = true;
        this.$store
          .dispatch(val, letequipment)
          .then(response => {
            //region scc add 页面初始加载事业计划类型 from
            for(let i = 0; i < response.length; i++){

              if(this.$route.params.title === 4){//其他决裁
                if (response[i].careerplan === '1') {
                  if (this.$i18n) {
                    response[i].careerplantempp = this.$t('label.PFANS1004VIEW_INSIDE');
                  }
                } else {
                  if (this.$i18n) {
                    response[i].careerplantempp = this.$t('label.PFANS1004VIEW_OUTER');
                  }
                }
              }

              if(this.$route.params.title === 1 || this.$route.params.title === 2){//出差
                if (response[i].plan === '1') {
                  if (this.$i18n) {
                    response[i].plantempp = this.$t('label.PFANS1004VIEW_INSIDE');
                  }
                } else {
                  if (this.$i18n) {
                    response[i].plantempp = this.$t('label.PFANS1004VIEW_OUTER');
                  }
                }
              }

            }
            //endregion scc add 页面初始加载事业计划类型 to
            this.data = this.setuser(response);
            this.loading = false;
          });
      },
      setuser(response) {
        for (let j = 0; j < response.length; j++) {
          // let nameflg = getOrgInfoByUserId(response[j].user_id);
          // if (nameflg) {
          //   response[j].center_id = nameflg.centerNmae;
          //   // response[j].group_id = nameflg.groupNmae;
          //   response[j].team_id = nameflg.teamNmae;
          // }
          //add_fjl_0806
          if (response[j].center_id !== null && response[j].center_id !== '' && response[j].center_id !== undefined) {
            response[j].center_id = getDepartmentById(response[j].center_id);
          }
          if (response[j].group_id !== null && response[j].group_id !== '' && response[j].group_id !== undefined) {
            response[j].group_id = getDepartmentById(response[j].group_id);
          }
          //add_fjl_0806
          let user = getUserInfo(response[j].user_id);
          if (user) {
            response[j].user_id = getUserInfo(response[j].user_id).userinfo.customername;
          }
          if (response[j].status !== null && response[j].status !== '') {
            response[j].status = getStatus(response[j].status);
          }
          //        add_fjl_05/27  --添加审批时间
          if (response[j].status != '0') {
            if (response[j].modifyon !== null && response[j].modifyon !== '') {
              response[j].modifyon = moment(response[j].modifyon).format('YYYY-MM-DD');
            }
          } else {
            response[j].modifyon = null;
          }
          //        add_fjl_05/27  --添加审批时间
          // ztc 禅道No.61-增加编号（日期加序列号）start
          if (response[j].businesstype == '1' && response[j].city != null && response[j].city != '') {
            let letcity = getDictionaryInfo(response[j].city);
            if (letcity != null) {
              response[j].regioncity = letcity.value1;
            }
          } else if (response[j].businesstype == '0' && response[j].city != null && response[j].city != '') {
            let letregion = getDictionaryInfo(response[j].region);
            {
              if (letregion != null) {
                response[j].regioncity = letregion.value1 + response[j].city;
              }
            }
          }
          if (response[j].startdate != null && response[j].startdate != '') {
            response[j].date = moment(response[j].startdate).format('YYYY-MM-DD') + '~' + moment(response[j].enddate).format('YYYY-MM-DD');
          }
          // add-ws-8/12-禅道任务446
          if (response[j].processingstatus != null && response[j].processingstatus != '') {
            if (this.$i18n) {
              if (response[j].processingstatus === '0') {
                response[j].processingstatus = this.$t('label.PFANS1006FORMVIEW_OPTIONS1');
              } else if (response[j].processingstatus === '1') {
                response[j].processingstatus = this.$t('label.PFANS1006FORMVIEW_OPTIONS2');
              } else if (response[j].processingstatus === '2') {
                response[j].processingstatus = this.$t('label.PFANS1006FORMVIEW_OPTIONS3');
              }
            }
          }
          // add-ws-8/12-禅道任务446
          if (response[j].canafver != null && response[j].canafver != '') {
            if (response[j].canafver == 1) {
              response[j].canafver = this.$t('label.PFANS1030FORMVIEW_YCANAFVER');
            } else {
              response[j].canafver = this.$t('label.PFANS1030FORMVIEW_NCANAFVER');
            }
          }
          // ztc 禅道No.61-增加编号（日期加序列号）end
          // add ccm 0731 fr  境内外出差
          if (response[j].businesstype == '1' && response[j].objectivetype != null && response[j].objectivetype != '') {
            let letcity = getDictionaryInfo(response[j].objectivetype);
            if (letcity != null) {
              response[j].objectivetype1 = letcity.value1;
            }
          } else if (response[j].businesstype == '0' && response[j].objectivetype != null && response[j].objectivetype != '') {
            let letregion = getDictionaryInfo(response[j].objectivetype);
            {
              if (letregion != null) {
                response[j].objectivetype1 = letregion.value1;
              }
            }
          }
          // add ccm 0731 to 境内外出差
        }
        return response;
        this.loading = false;
      },
      rowClick(row) {
        if (this.$route.params.title === 1) {
          //add-ws-7/7-禅道247
          this.buttonList2[3].disabled = true;
          this.rowid = row.business_id;
          this.statuss = row;
          if (row.status === this.$t('label.PFANS5004VIEW_OVERTIME')) {
            if (row.region == 'PJ017001' || row.region == 'PJ017002') {
              if (row.accommodation == 'PJ035002') {
                this.check = true;
              }
            }
          }
          if (moment(row.startdate).format('YYYY-MM-DD') > moment(new Date()).format('YYYY-MM-DD') && row.checkch == '0' && row.status === this.$t('label.PFANS5004VIEW_OVERTIME')) {
            this.buttonList2[3].disabled = false;
          }
          //add-ws-7/7-禅道247
          //region scc add 10/28 境外出差,行点击 from
          let user = getUserInfo(this.$store.getters.userinfo.userid);
          if (user)
          {
            if((row.status.indexOf(this.$t('normal.todo')) !== -1 || row.status.indexOf(this.$t('label.node_step2')) !== -1) && row.user_id === user.userinfo.customername){
              this.buttonListAnt[6].disabled = false;
            }else{
              this.buttonListAnt[6].disabled = true;
            }
          }
          else
          {
            if(row.status.indexOf(this.$t('normal.todo')) !== -1 || row.status.indexOf(this.$t('label.node_step2')) !== -1){
              this.buttonListAnt[6].disabled = false;
            }else{
              this.buttonListAnt[6].disabled = true;
            }
          }
          //endregion scc add 10/28 境外出差,行点击 to
        } else if (this.$route.params.title === 2) {
          //add-ws-7/7-禅道247
          this.buttonList2[3].disabled = true;
          this.rowid = row.business_id;
          this.statuss = row;
          if (moment(row.startdate).format('YYYY-MM-DD') > moment(new Date()).format('YYYY-MM-DD') && row.checkch == '0' && row.status === this.$t('label.PFANS5004VIEW_OVERTIME')) {
            this.buttonList2[3].disabled = false;
          }
          //add-ws-7/7-禅道247
          //region scc add 10/28 境内出差,行点击 from
          let user = getUserInfo(this.$store.getters.userinfo.userid);
          if (user)
          {
            if((row.status.indexOf(this.$t('normal.todo')) !== -1 || row.status.indexOf(this.$t('label.node_step2')) !== -1) && row.user_id === user.userinfo.customername){
              this.buttonListAnt[6].disabled = false;
            }else{
              this.buttonListAnt[6].disabled = true;
            }
          }
          else
          {
            if(row.status.indexOf(this.$t('normal.todo')) !== -1 || row.status.indexOf(this.$t('label.node_step2')) !== -1){
              this.buttonListAnt[6].disabled = false;
            }else{
              this.buttonListAnt[6].disabled = true;
            }
          }
          //endregion scc add 10/28 境内出差,行点击 to
        } else if (this.$route.params.title === 3) {
          this.rowid = row.judgementid;
        } else if (this.$route.params.title === 4) {
          this.rowid = row.judgementid;
          this.statuss = row;
          if (row.judgnumbers.indexOf('_') != -1) {
            this.judgnumberscheck = true;
          } else {
            this.judgnumberscheck = false;
          }
          //region scc add 10/28 其他决裁,行点击 from
          let user = getUserInfo(this.$store.getters.userinfo.userid);
          if (user)
          {
            if((row.status.indexOf(this.$t('normal.todo')) !== -1 || row.status.indexOf(this.$t('label.node_step2')) !== -1) && row.user_id === user.userinfo.customername){
              this.buttonListAnt[5].disabled = false;
            }else{
              this.buttonListAnt[5].disabled = true;
            }
          }
          else
          {
            if(row.status.indexOf(this.$t('normal.todo')) !== -1 || row.status.indexOf(this.$t('label.node_step2')) !== -1){
              this.buttonListAnt[5].disabled = false;
            }else{
              this.buttonListAnt[5].disabled = true;
            }
          }
          //endregion scc add 10/28 其他决裁,行点击 to
        } else if (this.$route.params.title === 5) {
          this.rowid = row.purchaseapply_id;
          //region scc add 10/28 千元以下费用申请,行点击 from
          let user = getUserInfo(this.$store.getters.userinfo.userid);
          if (user)
          {
            if((row.status.indexOf(this.$t('normal.todo')) !== -1 || row.status.indexOf(this.$t('label.node_step2')) !== -1) && row.user_id === user.userinfo.customername){
              this.buttonListAnt[5].disabled = false;
            }else{
              this.buttonListAnt[5].disabled = true;
            }
          }
          else
          {
            if(row.status.indexOf(this.$t('normal.todo')) !== -1 || row.status.indexOf(this.$t('label.node_step2')) !== -1){
              this.buttonListAnt[5].disabled = false;
            }else{
              this.buttonListAnt[5].disabled = true;
            }
          }
          //endregion scc add 10/28 千元以下费用申请,行点击 to
        } else if (this.$route.params.title === 6) {
          //ADD_FJL_0906  添加workfolwurl start
          this.$store.commit('global/SET_WORKFLOWURL', '/PFANS1006FormView');
          this.statuss = row;
          //ADD_FJL_0906  添加workfolwurl end
          this.rowid = row.loanapplication_id;
        } else if (this.$route.params.title === 10) {
          this.rowid = row.communication_id;
          //region scc add 10/28 交际费事前决裁,行点击 from
          let user = getUserInfo(this.$store.getters.userinfo.userid);
          if (user)
          {
            if((row.status.indexOf(this.$t('normal.todo')) !== -1 || row.status.indexOf(this.$t('label.node_step2')) !== -1) && row.user_id === user.userinfo.customername){
              this.buttonListAnt[5].disabled = false;
            }else{
              this.buttonListAnt[5].disabled = true;
            }
          }
          else
          {
            if(row.status.indexOf(this.$t('normal.todo')) !== -1 || row.status.indexOf(this.$t('label.node_step2')) !== -1){
              this.buttonListAnt[5].disabled = false;
            }else{
              this.buttonListAnt[5].disabled = true;
            }
          }
          //endregion scc add 10/28 交际费事前决裁,行点击 to
        } else if (this.$route.params.title === 11) {
          this.rowid = row.offshore_id;
          this.statuss = row;
        }
        this.rowInfo = row;
      },
      //add_fjl_0725  添加暂借款打印功能  start
      export1(val) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1006Store/exportjs', {loanapplicationid: this.$refs.roletable4.selectedList[val].loanapplication_id})
          .then(response => {
            this.loading = false;
            if (val < this.$refs.roletable4.selectedList.length - 1) {
              val = val + 1;
              this.export1(val);
            }
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
      //add_fjl_0725  添加暂借款打印功能  end
      buttonClick(val) {
        let letname;
        if (this.$route.params.title === 1) {
          letname = 'PFANS1002FormView';
        } else if (this.$route.params.title === 2) {
          letname = 'PFANS1035FormView';
        } else if (this.$route.params.title === 3) {
          letname = 'PFANS1003FormView';
        } else if (this.$route.params.title === 4) {
          letname = 'PFANS1004FormView';
        } else if (this.$route.params.title === 5) {
          letname = 'PFANS1005FormView';
        } else if (this.$route.params.title === 6) {
          letname = 'PFANS1006FormView';
        } else if (this.$route.params.title === 10) {
          letname = 'PFANS1010FormView';
        } else if (this.$route.params.title === 11) {
          letname = 'PFANS1011FormView';
        }
        this.$store.commit('global/SET_HISTORYURL', '');
        // add-ztc  数据转结 fr
        if(val === 'carryforward'){
          this.form.new_center_id = '';
          this.form.new_group_id = '';
          this.form.new_team_id = '';
          this.form.new_budgetunit = '';
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }else{
            if(this.showTable===1){
              // 出差
              this.form.last_center_id = this.rowInfo.center_id;
              this.form.last_group_id = this.rowInfo.group_id;
              this.form.last_team_id = this.rowInfo.team_id;
              let letbartype1 = getDictionaryInfo(this.rowInfo.budgetunit);
              if (letbartype1 != null) {
                this.form.last_budgetunit = letbartype1.value1;
              }
            }else if(this.showTable===2){
              // '无偿设备 其他业务决裁'
              this.form.last_center_id = this.rowInfo.center_id;
              this.form.last_group_id = this.rowInfo.group_id;
              this.form.last_team_id = this.rowInfo.team_id;
              let letbartype1 = getDictionaryInfo(this.rowInfo.thisproject);
              if (letbartype1 != null) {
                this.form.last_budgetunit = letbartype1.value1;
              }
            }else if(this.showTable===3){
              // 千元以下费用申请
              this.form.last_center_id = this.rowInfo.center_id;
              this.form.last_group_id = this.rowInfo.group_id;
              this.form.last_team_id = this.rowInfo.team_id;
              let letbartype1 = getDictionaryInfo(this.rowInfo.budgetunit);
              if (letbartype1 != null) {
                this.form.last_budgetunit = letbartype1.value1;
              }
            }else if(this.showTable===4){
              // '暂借款申请单'
              this.form.last_center_id = this.rowInfo.center_id;
              this.form.last_group_id = this.rowInfo.group_id;
              this.form.last_team_id = this.rowInfo.team_id;
              let letbartype1 = getDictionaryInfo(this.rowInfo.budgetunit);
              if (letbartype1 != null) {
                this.form.last_budgetunit = letbartype1.value1;
              }
            }else if(this.showTable===5){
              // '交际费事前决裁'
              this.form.last_center_id = this.rowInfo.center_id;
              this.form.last_group_id = this.rowInfo.group_id;
              this.form.last_team_id = this.rowInfo.team_id;
              let letbartype1 = getDictionaryInfo(this.rowInfo.budgetunit);
              if (letbartype1 != null) {
                this.form.last_budgetunit = letbartype1.value1;
              }
            }
          }
          this.dialogVisible = true;
        }
        // add-ztc  数据转结 to
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
            name: letname,
            params: {
              _id: this.rowid,
              _type: 2,
              _check: this.check,
              statuss: this.statuss.status,
              userid: this.statuss.user_id,
              _supplementary: this.statuss.supplementary,
              _judgnumberscheck: this.judgnumberscheck,
              disabled: true,
            },
          });
        }
        if (val === 'view') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
            });
            return;
          }
          this.$router.push({
            name: letname,
            params: {
              _type: 2,
              _id: this.rowid,
              disabled: false,
            },
          });
        }
        if (val === 'insert') {
          this.$router.push({
            name: letname,
            params: {
              _type: 2,
              _id: '',
              disabled: true,
            },
          });
        }
        //add-ws-7/7-禅道247
        if (val === 'qxch') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.$router.push({
            name: letname,
            params: {
              _id: this.rowid,
              _type: 3,
              _check: this.check,
              statuss: this.statuss.status,
              disabled: true,
            },
          });
        }
        //add-ws-7/7-禅道247
        //add_fjl_0724   添加跳转申请精算与暂借款  start
        if (val === 'actuarial' || val === 'temLoanApp') {
          let plantemp = false;//事业计划形同check
          let _judgement = '';
          let _judgement_name = '';
          let _judgements_moneys = '';
          let _remarks = '';
          this.selectedlist = [];
          let loan = '';
          let loanid = '';
          let str = '';
          //add-lyt-2/7-控制此单是否可以申请多次暂借款-start
          let enableduplicateloan = [];
          //add-lyt-2/7-控制此单是否可以申请多次暂借款-end
          // 交际费事前决裁 ztc 精算后为冲销暂借款
          if (this.$route.params.title === 10) {
            if (this.$refs.roletable1.selectedList.length === 0) {
              Message({
                message: this.$t('normal.info_01'),
                type: 'info',
                duration: 2 * 1000,
              });
              return;
            }
            //add-ws-8/19-禅道470任务
            else {
              if (val === 'actuarial')
              {
                let selectedlist = this.$refs.roletable1.selectedList;
                let n = 0;
                let checksum = selectedlist.length;
                //region scc add 交际费，同事业计划内或外进行精算check from
                let ny = 0;
                for (let i = 0; i < selectedlist.length; i++) {
                  if (selectedlist[i].loanapno == null || selectedlist[i].loanapno == '' || selectedlist[i].loanapno == undefined) {
                    n = n + 1;
                  }
                  if (selectedlist[i].plan === '1') {//事业计划内
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
                  plantemp = true;
                }
                //endregion scc add 交际费，同事业计划内或外进行精算check to
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
              }
            }
            //add-ws-8/19-禅道470任务
            this.selectedlist = this.$refs.roletable1.selectedList;
            let optionsSEL = [];
            for (let i = 0; i < this.selectedlist.length; i++) {
              let user = getUserInfo(this.selectedlist[i].user_id);
              if (user) {
                this.selectedlist[i].user_id = getUserInfo(this.selectedlist[i].user_id).userinfo.customername;
              }
              var vote = {};
              vote.user_id = this.selectedlist[i].user_id;
              vote.remarks = this.selectedlist[i].remarks;
              vote.numbers = this.selectedlist[i].numbercation;
              vote.value = this.selectedlist[i].communication_id;
              vote.label = this.selectedlist[i].numbercation;
              vote.judgements_moneys = this.selectedlist[i].moneys;
              if (this.$i18n) {
                vote.judgements_type = this.$t('menu.PFANS1010');
              }
              optionsSEL.push(vote);
              _judgement += this.selectedlist[i].communication_id + ',';
              _judgement_name += this.selectedlist[i].numbercation + ',';
              _judgements_moneys += this.selectedlist[i].moneys + ',';
              _remarks += this.selectedlist[i].remarks + '^';
              if (this.selectedlist[i].loanapno != null && this.selectedlist[i].loanapno != '' && this.selectedlist[i].loanapno != undefined) {
                loan += this.selectedlist[i].numbercation + ' , ';
              }
              if (this.selectedlist[i].invoiceno != null && this.selectedlist[i].invoiceno != '' && this.selectedlist[i].invoiceno != undefined) {
                str += this.selectedlist[i].numbercation + ' , ';
              }
              if (this.selectedlist[i].loanapno != null && this.selectedlist[i].loanapno != '' && this.selectedlist[i].loanapno != undefined) {
                loanid += this.selectedlist[i].loanapplication_id + ',';
              }
              //add-lyt-2/7-控制此单是否可以申请多次暂借款-start
              if (this.selectedlist[i].loanapno != null && this.selectedlist[i].loanapno != '' && this.selectedlist[i].loanapno != undefined) {
                enableduplicateloan.push(this.selectedlist[i].enableduplicateloan);
              }
              //add-lyt-2/7-控制此单是否可以申请多次暂借款-end
            }
            if (val === 'actuarial') {
              //del ccm 0813 决裁到暂借款，精算  check去掉
              // if (str !== '') {
              //   Message({
              //     message: str + ' ' + this.$t('label.PFANS3005VIEW_INVOICENO'),
              //     type: 'info',
              //     duration: 3 * 1000,
              //   });
              //   return;
              // } else {
              //del ccm 0813 决裁到暂借款，精算  check去掉
              if (loan != null && loan != '' && loan != undefined) {
                loan = loan.substring(0, loan.length - 1);
                if (loan != null && loan != '' && loan != undefined) {
                  this.$router.push({
                    name: 'PFANS1012FormView',
                    params: {
                      _name: optionsSEL,
                      _type: 'PJ001002',
                      _haveLoanapp: loanid,
                      disabled: true,
                      _careerplan : plantemp,//scc add 交际费---精算路由，事业计划类型
                    },
                  });
                } else {
                  this.$router.push({
                    name: 'PFANS1012FormView',
                    params: {
                      _name: optionsSEL,
                      _type: 'PJ001002',
                      disabled: true,
                      _careerplan : plantemp,//scc add 交际费---精算路由，事业计划类型
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
                    _careerplan : plantemp,//scc add 交际费---精算路由，事业计划类型
                  },
                });
              }
              //del ccm 0813 决裁到暂借款，精算  check去掉
              // }
              //del ccm 0813 决裁到暂借款，精算  check去掉
            } else {
              //add ztc 1201 决裁到暂借款check
              if (loan !== '') {
                Message({
                  message: loan + ' ' + this.$t('label.PFANS3005VIEW_LOANAPP'),
                  type: 'info',
                  duration: 3 * 1000,
                });
                return;
              }
              //add ztc 1201 决裁到暂借款check
              this.$router.push({
                name: 'PFANS1006FormView',
                params: {
                  _id: '',
                  _judgement: _judgement,
                  _judgement_name: _judgement_name,
                  _judgements_moneys: _judgements_moneys,
                  _remarks: _remarks,
                  _judgements_type: this.$t('menu.PFANS1010'),
                  disabled: true,
                },
              });
            }
          }
          // 无偿设备 其他决裁 ztc 精算后为冲销暂借款
          else if (this.$route.params.title === 3 || this.$route.params.title === 4) {
            if (this.$refs.roletable3.selectedList.length === 0) {
              Message({
                message: this.$t('normal.info_01'),
                type: 'info',
                duration: 2 * 1000,
              });
              return;
            }//add-ws-8/19-禅道470任务
            else {
              if (val === 'actuarial')
              {
                let selectedlist = this.$refs.roletable3.selectedList;
                let n = 0;
                let checksum = selectedlist.length;
                for (let i = 0; i < selectedlist.length; i++) {
                  if (selectedlist[i].loanapno == null || selectedlist[i].loanapno == '' || selectedlist[i].loanapno == undefined) {
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
                //region scc add 其他决裁，事业计划相同check from
                if(this.$route.params.title === 4) {
                  let ny = 0;
                  for (let i = 0; i < selectedlist.length; i++) {
                    if (selectedlist[i].careerplan === '1') {//事业计划内
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
                  } else {
                    plantemp = true;
                  }
                }
                //endregion scc add 其他决裁，事业计划相同check to
              }
            }
            //add-ws-8/19-禅道470任务
            this.selectedlist = this.$refs.roletable3.selectedList;
            let optionsSEL = [];
            let judname = '';
            for (let i = 0; i < this.selectedlist.length; i++) {
              let user = getUserInfo(this.selectedlist[i].user_id);
              if (user) {
                this.selectedlist[i].user_id = getUserInfo(this.selectedlist[i].user_id).userinfo.customername;
              }
              var vote = {};
              vote.user_id = this.selectedlist[i].user_id;
              vote.remarks = this.selectedlist[i].filename;
              vote.numbers = this.selectedlist[i].judgnumbers;
              vote.value = this.selectedlist[i].judgementid;
              vote.label = this.selectedlist[i].judgnumbers;
              vote.judgements_moneys = this.selectedlist[i].money;
              if (this.$route.params.title === 4) {
                if (this.$i18n) {
                  vote.judgements_type = this.$t('title.PFANS1004VIEW');
                }
              } else {
                if (this.$i18n) {
                  vote.judgements_type = this.$t('label.PFANS1012VIEW_PURCHASSESWC');
                }
              }
              optionsSEL.push(vote);
              _judgement += this.selectedlist[i].judgementid + ',';
              _judgement_name += this.selectedlist[i].judgnumbers + ',';
              _judgements_moneys += this.selectedlist[i].money + ',';
              _remarks += this.selectedlist[i].filename + '^';
              if (this.selectedlist[i].loanapno != null && this.selectedlist[i].loanapno != '' && this.selectedlist[i].loanapno != undefined) {
                loan += this.selectedlist[i].judgnumbers + ' , ';
              }
              if (this.selectedlist[i].invoiceno != null && this.selectedlist[i].invoiceno != '' && this.selectedlist[i].invoiceno != undefined) {
                str += this.selectedlist[i].judgnumbers + ' , ';
              }
              if (this.selectedlist[i].loanapno != null && this.selectedlist[i].loanapno != '' && this.selectedlist[i].loanapno != undefined) {
                loanid += this.selectedlist[i].loanapplication_id + ',';
              }
            }
            if (val === 'actuarial') {
              //del ccm 0813 决裁到暂借款，精算  check去掉
              // if (str !== '') {
              //   Message({
              //     message: str + ' ' + this.$t('label.PFANS3005VIEW_INVOICENO'),
              //     type: 'info',
              //     duration: 3 * 1000,
              //   });
              //   return;
              // } else {
                //del ccm 0813 决裁到暂借款，精算  check去掉
                if (loan != null && loan != '' && loan != undefined) {
                  loan = loan.substring(0, loan.length - 1);
                  if (loan != null && loan != '' && loan != undefined) {
                    this.$router.push({
                      name: 'PFANS1012FormView',
                      params: {
                        _name: optionsSEL,
                        _type: 'PJ001002',
                        _haveLoanapp: loanid,
                        disabled: true,
                        _careerplan : plantemp,//scc add 其他决裁---精算路由，事业计划类型
                      },
                    });
                  } else {
                    this.$router.push({
                      name: 'PFANS1012FormView',
                      params: {
                        _name: optionsSEL,
                        _type: 'PJ001002',
                        disabled: true,
                        _careerplan : plantemp,//scc add 其他决裁---精算路由，事业计划类型
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
                      _careerplan : plantemp,//scc add 其他决裁---精算路由，事业计划类型
                    },
                  });
                }
                //del ccm 0813 决裁到暂借款，精算  check去掉
              // }
              //del ccm 0813 决裁到暂借款，精算  check去掉
            } else {
              //del ccm 0813 决裁到暂借款，精算  check去掉\
              let judloan = '';
              for(let k=0;k<enableduplicateloan.length;k++) {
                if (enableduplicateloan[k].loanapno !== '' && enableduplicateloan[k].enableduplicateloan === 'PJ055002') {
                  judloan = judloan + enableduplicateloan[k].judgnumbers + ' , ';
                }
              }
              if (judloan.length > 0)
              {
                Message({
                  message: judloan + this.$t('label.PFANS3005VIEW_LOANAPP'),
                  type: 'info',
                  duration: 3 * 1000,
                });
                return;
              }
              //del ccm 0813 决裁到暂借款，精算  check去掉
              if (this.$route.params.title === 4) {
                if (this.$i18n) {
                  judname = this.$t('title.PFANS1004VIEW');
                }
              } else {
                if (this.$i18n) {
                  judname = this.$t('label.PFANS1012VIEW_PURCHASSESWC');
                }
              }
              this.$router.push({
                name: 'PFANS1006FormView',
                params: {
                  _id: '',
                  _judgement: _judgement,
                  _judgement_name: _judgement_name,
                  _judgements_moneys: _judgements_moneys,
                  _remarks: _remarks,
                  _judgements_type: judname,
                  disabled: true,
                },
              });
            }
          }
          // 千元以下费用申请 ztc 精算后为冲销暂借款
          else if (this.$route.params.title === 5) {
            if (this.$refs.roletable2.selectedList.length === 0) {
              Message({
                message: this.$t('normal.info_01'),
                type: 'info',
                duration: 2 * 1000,
              });
              return;
            }//add-ws-8/19-禅道470任务
            else {
              if (val === 'actuarial')
              {
                let selectedlist = this.$refs.roletable2.selectedList;
                let n = 0;
                let checksum = selectedlist.length;
                //region scc add 千元以下，相同事业计划类型check from
                let ny = 0;
                for (let i = 0; i < selectedlist.length; i++) {
                  if (selectedlist[i].loanapno == null || selectedlist[i].loanapno == '' || selectedlist[i].loanapno == undefined) {
                    n = n + 1;
                  }
                  if (selectedlist[i].plan === '1') {//事业计划内
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
                  plantemp = true;
                }
                //endregion scc add 千元以下，相同事业计划类型check to
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
              }
            }
            //add-ws-8/19-禅道470任务
            this.selectedlist = this.$refs.roletable2.selectedList;
            let optionsSEL = [];
            for (let i = 0; i < this.selectedlist.length; i++) {
              let user = getUserInfo(this.selectedlist[i].user_id);
              if (user) {
                this.selectedlist[i].user_id = getUserInfo(this.selectedlist[i].user_id).userinfo.customername;
              }
              var vote = {};
              vote.user_id = this.selectedlist[i].user_id;
              vote.remarks = this.selectedlist[i].remarks;
              vote.numbers = this.selectedlist[i].purchasenumbers;
              vote.value = this.selectedlist[i].purchaseapply_id;
              vote.label = this.selectedlist[i].purchasenumbers;
              vote.judgements_moneys = this.selectedlist[i].summoney;
              if (this.$i18n) {
                vote.judgements_type = this.$t('menu.PFANS1005');
              }
              optionsSEL.push(vote);
              _judgement += this.selectedlist[i].purchaseapply_id + ',';
              _judgement_name += this.selectedlist[i].purchasenumbers + ',';
              _judgements_moneys += this.selectedlist[i].summoney + ',';
              _remarks += this.selectedlist[i].remarks + '^';
              if (this.selectedlist[i].loanapno != null && this.selectedlist[i].loanapno != '' && this.selectedlist[i].loanapno != undefined) {
                loan += this.selectedlist[i].purchasenumbers + ' , ';
              }
              if (this.selectedlist[i].invoiceno != null && this.selectedlist[i].invoiceno != '' && this.selectedlist[i].invoiceno != undefined) {
                str += this.selectedlist[i].purchasenumbers + ' , ';
              }
              if (this.selectedlist[i].loanapno != null && this.selectedlist[i].loanapno != '' && this.selectedlist[i].loanapno != undefined) {
                loanid += this.selectedlist[i].loanapplication_id + ',';
              }
            }
            //精算
            if (val === 'actuarial') {
              //del ccm 0813 决裁到暂借款，精算  check去掉
              // if (str !== '') {
              //   Message({
              //     message: str + ' ' + this.$t('label.PFANS3005VIEW_INVOICENO'),
              //     type: 'info',
              //     duration: 3 * 1000,
              //   });
              //   return;
              // } else {
              //del ccm 0813 决裁到暂借款，精算  check去掉
              if (loan != null && loan != '' && loan != undefined) {
                loan = loan.substring(0, loan.length - 1);
                if (loan != null && loan != '' && loan != undefined) {
                  this.$router.push({
                    name: 'PFANS1012FormView',
                    params: {
                      _name: optionsSEL,
                      _type: 'PJ001002',
                      _haveLoanapp: loanid,
                      disabled: true,
                      _careerplan : plantemp,//scc add 千元以下---精算路由，事业计划类型
                    },
                  });
                } else {
                  this.$router.push({
                    name: 'PFANS1012FormView',
                    params: {
                      _name: optionsSEL,
                      _type: 'PJ001002',
                      disabled: true,
                      _careerplan : plantemp,//scc add 千元以下---精算路由，事业计划类型
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
                    _careerplan : plantemp,//scc add 千元以下---精算路由，事业计划类型
                  },
                });
              }
              //del ccm 0813 决裁到暂借款，精算  check去掉
              // }
              //del ccm 0813 决裁到暂借款，精算  check去掉
            } else {
              //del ccm 0813 决裁到暂借款，精算  check去掉

              if (loan !== '') {
                Message({
                  message: loan + ' ' + this.$t('label.PFANS3005VIEW_LOANAPP'),
                  type: 'info',
                  duration: 3 * 1000,
                });
                return;
              }
              //del ccm 0813 决裁到暂借款，精算  check去掉
              this.$router.push({
                name: 'PFANS1006FormView',
                params: {
                  _id: '',
                  _judgement: _judgement,
                  _judgement_name: _judgement_name,
                  _judgements_moneys: _judgements_moneys,
                  _remarks: _remarks,
                  _judgements_type: this.$t('menu.PFANS1005'),
                  disabled: true,
                },
              });
            }
          }
          // 境内外出差申請 ztc 精算后为冲销暂借款
          else if (this.$route.params.title === 1 || this.$route.params.title === 2) {
            if (this.$refs.roletable5.selectedList.length === 0) {
              Message({
                message: this.$t('normal.info_01'),
                type: 'info',
                duration: 2 * 1000,
              });
              return;
            }//add-ws-8/19-禅道470任务
            else {
              if (val === 'actuarial')
              {
                let selectedlist = this.$refs.roletable5.selectedList;
                let n = 0;
                let checksum = selectedlist.length;
                //region scc add 出差，同事业计划内或外进行精算check from
                let ny = 0;
                for (let i = 0; i < selectedlist.length; i++) {
                  if (selectedlist[i].loanapno == null || selectedlist[i].loanapno == '' || selectedlist[i].loanapno == undefined) {
                    n = n + 1;
                  }
                  if (selectedlist[i].plan === '1') {//事业计划内
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
                  plantemp = true;
                }
                //endregion scc add 出差，同事业计划内或外进行精算check to
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
              }
            }
            //add-ws-8/19-禅道470任务
            this.selectedlist = this.$refs.roletable5.selectedList;
            let optionsSEL = [];
            let judname = '';
            for (let i = 0; i < this.selectedlist.length; i++) {
              let user = getUserInfo(this.selectedlist[i].user_id);
              if (user) {
                this.selectedlist[i].user_id = getUserInfo(this.selectedlist[i].user_id).userinfo.customername;
              }
              var vote = {};
              vote.user_id = this.selectedlist[i].user_id;
              vote.remarks = this.selectedlist[i].regioncity + ' ' + this.selectedlist[i].objectivetype1;
              vote.numbers = this.selectedlist[i].business_number;
              vote.value = this.selectedlist[i].business_id;
              vote.label = this.selectedlist[i].business_number;
              vote.judgements_moneys = this.selectedlist[i].loanmoney;
              if (this.$route.params.title === 1) {
                if (this.$i18n) {
                  vote.judgements_type = this.$t('title.PFANS1002VIEW');
                }
              } else {
                if (this.$i18n) {
                  vote.judgements_type = this.$t('title.PFANS1035VIEW');
                }
              }
              optionsSEL.push(vote);
              _judgement += this.selectedlist[i].business_id + ',';
              _judgement_name += this.selectedlist[i].business_number + ',';
              _judgements_moneys += this.selectedlist[i].loanmoney + ',';
              _remarks += this.selectedlist[i].regioncity + ' ' + this.selectedlist[i].objectivetype1 + '^';
              if (this.selectedlist[i].loanapno != null && this.selectedlist[i].loanapno != '' && this.selectedlist[i].loanapno != undefined) {
                loan += this.selectedlist[i].business_number + ' , ';
              }
              if (this.selectedlist[i].invoiceno != null && this.selectedlist[i].invoiceno != '' && this.selectedlist[i].invoiceno != undefined) {
                str += this.selectedlist[i].business_number + ' , ';
              }
              if (this.selectedlist[i].loanapno != null && this.selectedlist[i].loanapno != '' && this.selectedlist[i].loanapno != undefined) {
                loanid += this.selectedlist[i].loanapplication_id + ',';
              }
            }
            if (val === 'actuarial') {
              //add-ws-8/29-禅道bug066
              if (this.selectedlist.length > 1) {
                Message({
                  message: this.$t('label.PFANS1001FORMVIEW_CHECKERROR'),
                  type: 'info',
                  duration: 2 * 1000,
                });
                return;
              } else {
                //region scc add 存出差地国家・城市字段 from
                this.toCity = this.selectedlist[0].city;
                //endregion scc add 存出差地国家・城市字段 to
                if (getUserInfoName(this.selectedlist[0].user_id) !== '-1') {
                  let userid = getUserInfoName(this.selectedlist[0].user_id).userid;
                  if (userid != this.$store.getters.userinfo.userid) {
                    Message({
                      message: this.$t('label.PFANS1001FORMVIEW_CHECKERROR1'),
                      type: 'info',
                      duration: 2 * 1000,
                    });
                    return;
                  }
                }
              }
              let type = "";
              if (this.$route.params.title === 1) {
                type = true
              } else if (this.$route.params.title === 2) {
                type = false
              }
              //add-ws-8/29-禅道bug066
              //del ccm 0813 决裁到暂借款，精算  check去掉
              // if (str !== '') {
              //   Message({
              //     message: str + ' ' + this.$t('label.PFANS3005VIEW_INVOICENO'),
              //     type: 'info',
              //     duration: 3 * 1000,
              //   });
              //   return;
              // } else {
              //del ccm 0813 决裁到暂借款，精算  check去掉
              if (loan != null && loan != '' && loan != undefined) {
                loan = loan.substring(0, loan.length - 1);
                let loanmoneyAnt = 0
                if(this.selectedlist[0].loanmoney != null && this.selectedlist[0].loanmoney != ''
                  && this.selectedlist[0].loanmoney != undefined){
                  loanmoneyAnt = this.selectedlist[0].loanmoney
                }
                if (loan != null && loan != '' && loan != undefined) {
                  this.$router.push({
                    name: 'PFANS1013FormView',
                    params: {
                      _name: optionsSEL,
                      _typecheck: type,
                      _haveLoanapp: loanid,
                      _loanmoney: loanmoneyAnt,
                      disabled: true,
                      _careerplan : plantemp,//scc add 出差---精算路由，事业计划类型
                      _city: this.toCity,//scc add 出差--精算精算，出差地国家・城市字段
                    },
                  });
                } else {
                  this.$router.push({
                    name: 'PFANS1013FormView',
                    params: {
                      _name: optionsSEL,
                      _typecheck: type,
                      disabled: true,
                      _careerplan : plantemp,//scc add 出差---精算路由，事业计划类型
                      _city: this.toCity,//scc add 出差--精算精算，出差地国家・城市字段
                    },
                  });
                }
              } else {
                this.$router.push({
                  name: 'PFANS1013FormView',
                  params: {
                    _name: optionsSEL,
                    _typecheck: type,
                    disabled: true,
                    _careerplan : plantemp,//scc add 出差---精算路由，事业计划类型
                    _city: this.toCity,//scc add 出差--精算精算，出差地国家・城市字段
                  },
                });
              }
              //del ccm 0813 决裁到暂借款，精算  check去掉
              // }
              //del ccm 0813 决裁到暂借款，精算  check去掉
            } else {
              //del ccm 0813 决裁到暂借款，精算  check去掉
              if (loan !== '') {
                Message({
                  message: loan + ' ' + this.$t('label.PFANS3005VIEW_LOANAPP'),
                  type: 'info',
                  duration: 3 * 1000,
                });
                return;
              }
              //del ccm 0813 决裁到暂借款，精算  check去掉
              if (this.$route.params.title === 1) {
                if (this.$i18n) {
                  judname = this.$t('title.PFANS1002VIEW');
                }
              } else {
                if (this.$i18n) {
                  judname = this.$t('title.PFANS1035VIEW');
                }
              }
              this.$router.push({
                name: 'PFANS1006FormView',
                params: {
                  _id: '',
                  _judgement: _judgement,
                  _judgement_name: _judgement_name,
                  _judgements_moneys: _judgements_moneys,
                  _remarks: _remarks,
                  _judgements_type: judname,
                  disabled: true,
                },
              });
            }
          }
        }
        //add_fjl_0724   添加跳转申请精算与暂借款  end
        //add_fjl_0725  添加暂借款打印功能  start
        if (val === 'export1') {
          if (this.$refs.roletable4.selectedList.length === 0) {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.selectedlist = this.$refs.roletable4.selectedList;
          this.export1(0);
        }
        //add_fjl_0725  添加暂借款打印功能  end
        if(val === 'delete'){
          if(this.rowid){
            //region scc add 10/28 决裁逻辑删除 from
            if(this.$route.params.title === 5){//千元以下费用申请逻辑删除
              this.loading = true;
              this.$confirm(this.$t('normal.info_02'), this.$t('normal.info'), {
                confirmButtonText: this.$t('button.confirm'),
                cancelButtonText: this.$t('button.cancel'),
                type: 'warning',
                center: true,
              }).then(() => {
              this.$store
                .dispatch('PFANS1001Store/purdelete', this.rowInfo)
                .then(response => {
                  this.dispatch('PFANS1001Store/getpurchaseApply');
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

            if(this.$route.params.title === 10){//交际费事前决裁删除
              this.loading = true;
              this.$confirm(this.$t('normal.info_02'), this.$t('normal.info'), {
                confirmButtonText: this.$t('button.confirm'),
                cancelButtonText: this.$t('button.cancel'),
                type: 'warning',
                center: true,
              }).then(() => {
              this.$store
                .dispatch('PFANS1001Store/comdelete', this.rowInfo)
                .then(response => {
                  this.dispatch('PFANS1001Store/getCommunication');
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

            if(this.$route.params.title === 1 || this.$route.params.title === 2){//境内外出差
              this.loading = true;
              this.$confirm(this.$t('normal.info_02'), this.$t('normal.info'), {
                confirmButtonText: this.$t('button.confirm'),
                cancelButtonText: this.$t('button.cancel'),
                type: 'warning',
                center: true,
              }).then(() => {
              this.$store
                .dispatch('PFANS1001Store/busdelete', this.rowInfo)
                .then(response => {
                  if (this.$route.params.title === 1)
                  {
                    let businesstype = {'businesstype': '0'};
                    this.dispatchparameter('PFANS1001Store/getBusiness', businesstype);
                  }
                  else
                  {
                    let businesstype = {'businesstype': '1'};
                    this.dispatchparameter('PFANS1001Store/getBusiness', businesstype);
                  }
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

            if(this.$route.params.title === 4){//其他业务决裁
              this.loading = true;
              this.$confirm(this.$t('normal.info_02'), this.$t('normal.info'), {
                confirmButtonText: this.$t('button.confirm'),
                cancelButtonText: this.$t('button.cancel'),
                type: 'warning',
                center: true,
              }).then(() => {
              this.$store
                .dispatch('PFANS1001Store/juddelete', this.rowInfo)
                .then(response => {
                  let letequipment = {'equipment': '0'};
                  this.dispatchparameter('PFANS1001Store/getJudgement', letequipment);
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
            //endregion scc add 10/28 决裁逻辑删除 to
          }
        }
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
