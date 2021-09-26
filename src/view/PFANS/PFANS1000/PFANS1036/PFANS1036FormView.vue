<template>
  <div style="min-height: 100%">
    <EasyNormalContainer
      :buttonList="buttonList"
      :canStart="canStart"
      :title="title"
      @buttonClick="buttonClick"
      ref="container"
      @end="end" @start="start" @workflowState="workflowState" :workflowCode="workflowCode"
      v-loading="loading"
    >
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" employedref="refform" ref="form"
                 style="padding: 1.5vw">
          <el-row v-show="false">
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1036FORMVIEW_CENTER')">
                <el-input :disabled="true" style="width:20vw" v-model="form.center_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1036FORMVIEW_GROUP')">
                <el-input :disabled="true" style="width:20vw" v-model="form.groupid"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.PFANS1036FORMVIEW_APPLICANT')" prop="user_id">
                <user :disabled="!disable" :error="error" :selectType="selectType" :userlist="userlist"
                      @getUserids="getUserids" style="width: 20vw" v-model="form.user_id"></user>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="padding-top: 0.5%;padding-bottom: 1%">
            <el-col :span="6">
              <el-form-item :label="$t('label.PFANS1036FORMVIEW_BUSINESSYEAR')">
                <div class="block">
                  <el-date-picker
                    v-model="form.year"
                    type="year"
                    :disabled="true"
                    format="yyyy"
                    :placeholder="$t('normal.error_09')">
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('label.PFANS2036VIEW_DEPARTMENT')" prop="center_id">
                <el-select v-model="form.center_id" style="width: 20vw" :disabled="disabledC"
                           @change="groupChange">
                  <el-option
                    v-for="item in grp_options"
                    :key="item.value"
                    :label="item.lable"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <div style="padding-bottom: 0.5%;padding-left: 88%;width:20vw;margin-top: 2.5vw">
              <!--            <el-divider direction="vertical"></el-divider>-->
              <!--            <span style="color:#f47f31">{{this.form.year +' '+ this.$t('label.PFANS1036FORMVIEW_BUSINESSYEAR')}}</span>-->
              <!--            <el-divider direction="vertical"></el-divider>-->
              <span style="color:#f47f31">{{(this.redirict === '0' ? this.$t('label.PFANS1036FORMVIEW_ZJJJDEPARTMENT') : this.$t('label.PFANS1036FORMVIEW_JJDEPARTMENT'))||''}}</span>
              <el-divider direction="vertical"></el-divider>
              <span style="color:#f47f31">{{(this.companyen)||''}}</span>
              <!--<el-divider direction="vertical"></el-divider>-->
              </div>
            </el-col>
          </el-row>
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_PERSONNELPLAN')" style="margin-top: 2%" name="first">
              <div>
                <el-tabs v-model="activeName2" type="border-card">
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_TOTAL')" name="first">
                    <el-table :data="tableA" header-cell-class-name="sub_bg_color_blue" stripe style="margin-top: 2%">
                      <el-table-column>
                        <el-table-column align="center" width="120" prop="total1" :formatter="formatterColumn"
                                         :label="$t('label.PFANS1036FORMVIEW_TOTALPLAN')">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.April')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amount4">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="giving4">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghour4">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                                         prop="pay4">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.May')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amount5">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="giving5">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghour5">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                                         prop="pay5">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.June')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amount6">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="giving6">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghour6">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                                         prop="pay6">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.July')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amount7">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="giving7">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghour7">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                                         prop="pay7">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.August')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amount8">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="giving8">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghour8">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                                         prop="pay8">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.September')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amount9">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="giving9">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghour9">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                                         prop="pay9">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amountfirst">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="givingfirst">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghourfirst">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                                         prop="payfirst">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.October')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amount10">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="giving10">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghour10">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                                         prop="pay10">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.November')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amount11">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="giving11">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghour11">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                                         prop="pay11">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.December')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amount12">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="giving12">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghour12">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                                         prop="pay12">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.January')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amount1">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="giving1">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghour1">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                                         prop="pay1">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.February')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amount2">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="giving2">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghour2">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                                         prop="pay2">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.March')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amount3">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="giving3">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghour3">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                                         prop="pay3">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amountsecond">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="givingsecond">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghoursecond">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                                         prop="paysecond">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amounttotal">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="givingtotal">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghourtotal">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                                         prop="paytotal">
                        </el-table-column>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_CURRENTPERSONNEL')" name="second">
                    <el-table :data="tableC" :summary-method="val => getSummaries(val,'C')" show-summary stripe
                              header-cell-class-name="sub_bg_color_blue">
                      <el-table-column align="center" width="90" :formatter="formatterColumn" prop="type">
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_RANK')" align="center" width="60"
                                       :formatter="formatterColumn" prop="level">
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_SUMMERPLANPC')" align="center" width="120"
                                       prop="summerplanpc" >
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAYHOUR')" align="center" width="110"
                                       prop="payhour">
                        <template slot-scope="scope">
                          <el-input-number v-model="scope.row.payhour" controls-position="right"
                                           :min="0" style="width:7vw" size="small" :precision="2" @change="changeHour(scope.row)"></el-input-number>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEHOUR')" align="center" width="130"
                                       prop="overtimehour">
                        <template slot-scope="scope">
                          <el-input-number v-model="scope.row.overtimehour" controls-position="right"
                                           :min="0" style="width:7vw" size="small" :precision="2" @change="changeHour(scope.row)"></el-input-number>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.April')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amount4">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghour4">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                        prop="pay4">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="giving4">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.May')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amount5">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghour5">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                        prop="pay5">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="giving5">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.June')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amount6">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghour6">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                        prop="pay6">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="giving6">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.July')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amount7">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghour7">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                        prop="pay7">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="giving7">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.August')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amount8">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghour8">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                        prop="pay8">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="giving8">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.September')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amount9">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghour9">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                        prop="pay9">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="giving9">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amountfirst">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghourfirst">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                        prop="payfirst">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="givingfirst">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.October')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amount10">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghour10">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                        prop="pay10">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="giving10">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.November')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amount11">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghour11">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                        prop="pay11">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="giving11">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.December')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amount12">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghour12">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                        prop="pay12">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="giving12">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.January')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amount1">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghour1">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                        prop="pay1">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="giving1">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.February')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amount2">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghour2">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                        prop="pay2">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="giving2">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.March')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amount3">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghour3">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                        prop="pay3">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="giving3">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amountsecond">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghoursecond">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                        prop="paysecond">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="givingsecond">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amounttotal">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghourtotal">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                        prop="paytotal">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="givingtotal">
                        </el-table-column>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_CAREER')" name="third">
                    <el-table :data="tableD" :summary-method="val => getSummaries(val,'D')" show-summary stripe
                              header-cell-class-name="sub_bg_color_blue">
                      <el-table-column align="center" width="90" :formatter="formatterColumn" prop="type">
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_RANK')" align="center" width="60"
                                       :formatter="formatterColumn" prop="level">
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_SUMMERPLANPC')" align="center" width="120"
                                       prop="summerplanpc">
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAYHOUR')" align="center" width="110"
                                       prop="payhour">
                        <template slot-scope="scope">
                          <el-input-number v-model="scope.row.payhour" controls-position="right"
                                           :min="0" style="width:7vw" size="small" :precision="2" @change="changeHour(scope.row)"></el-input-number>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEHOUR')" align="center" width="130"
                                       prop="overtimehour">
                        <template slot-scope="scope">
                          <el-input-number v-model="scope.row.overtimehour" controls-position="right"
                                           :min="0" style="width:7vw" size="small" :precision="2" @change="changeHour(scope.row)"></el-input-number>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.April')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amount4">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghour4">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                        prop="pay4">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="giving4">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.May')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amount5">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghour5">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                        prop="pay5">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="giving5">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.June')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amount6">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghour6">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                        prop="pay6">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="giving6">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.July')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amount7">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghour7">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                        prop="pay7">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="giving7">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.August')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amount8">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghour8">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                        prop="pay8">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="giving8">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.September')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amount9">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghour9">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                        prop="pay9">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="giving9">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amountfirst">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghourfirst">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                        prop="payfirst">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="givingfirst">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.October')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amount10">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghour10">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                        prop="pay10">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="giving10">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.November')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amount11">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghour11">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                        prop="pay11">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="giving11">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.December')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amount12">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghour12">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                        prop="pay12">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="giving12">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.January')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amount1">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghour1">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                        prop="pay1">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="giving1">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.February')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amount2">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghour2">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                        prop="pay2">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="giving2">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.March')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amount3">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghour3">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                        prop="pay3">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="giving3">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amountsecond">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghoursecond">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                        prop="paysecond">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="givingsecond">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="50"
                                         prop="amounttotal">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110"
                        prop="workinghourtotal">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110"
                        prop="paytotal">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110"
                                         prop="givingtotal">
                        </el-table-column>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_EQUIPMENTINVESTMENT')" style="margin-top: 2%"
                         name="second">
              <div>
                <AssetsComponent :tableNewYear="assets_newyear" :tableLastYear="assets_lastyear"
                                 :tableLodYear="assets_lodyear"
                                 @assets="Assets"></AssetsComponent>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_SOFTWAREINVESTMENT')" style="margin-top: 2%" name="third">
              <div>
                <AssetsComponent :tableNewYear="equipment_newyear" :tableLastYear="equipment_lastyear"
                                 :tableLodYear="equipment_lodyear"
                                 @assets="Assetss"></AssetsComponent>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_TRAVELEXPENSES')" style="margin-top: 2%" name="forth">
              <BussinessComponent :tableBusiness="business" @travel="getTravel"></BussinessComponent>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_PROJECTPLAN')" style="margin-top: 2%" name="fifth">
              <div>
                <el-tabs v-model="activeName6" type="border-card">
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_TOTAL')" name="first">
                    <el-table :data="tableSZTotal" header-cell-class-name="sub_bg_color_blue" stripe>
                      <el-table-column>
                        <el-table-column align="center" width="220" prop="total5" :formatter="formatterColumn">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_1Q')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110"
                                         prop="number1">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110"
                                         prop="money1">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_2Q')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110"
                                         prop="number2">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110"
                                         prop="money2">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110"
                                         prop="numberfirst">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110"
                                         prop="moneyfirst">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_3Q')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110"
                                         prop="number3">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110"
                                         prop="money3">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_4Q')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110"
                                         prop="number4">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110"
                                         prop="money4">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110"
                                         prop="numbersecond">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110"
                                         prop="moneysecond">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110"
                                         prop="numbertotal">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110"
                                         prop="moneytotal">
                        </el-table-column>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_A1')" name="sixth">
                    <TrustA1Component :disabled="!disable" :tableTrustA1="groupA1" @sum="getSumA1"></TrustA1Component>
                  </el-tab-pane>
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_A2')" name="seventh">
                    <TrustComponent :disabled="true" :tableTrust="groupA2" @sum="getSumA2"></TrustComponent>
                  </el-tab-pane>
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_B1')" name="second">
                    <TrustComponent :disabled="true" :tableTrust="groupB1" @sum="getSumB1"></TrustComponent>
                  </el-tab-pane>
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_B2')" name="third">
                    <TrustComponent  :disabled="true"  :tableTrust="groupB2" @sum="getSumB2"></TrustComponent>
                  </el-tab-pane>
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_B3')" name="forth">
                    <TrustComponent :disabled="true" :tableTrust="groupB3" @sum="getSumB3"></TrustComponent>
                  </el-tab-pane>
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_B4')" name="fifth">
                    <TrustComponent :disabled="false" :tableTrust="groupC" @sum="getSumC" :check="false"></TrustComponent>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_VARIOUSFUNDS')" style="margin-top: 2%" name="sixth">
              <div>
                <el-tabs v-model="activeName7" type="border-card">
                  <el-tab-pane :label="$t('label.PFANS1036VIEW_COMMUNICATION')" name="first">
                    <el-table  :data="tableO1" :summary-method="(val) => getSummaries(val,'o1')" show-summary stripe
                              header-cell-class-name="sub_bg_color_blue">
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_NO')" align="center" width="110" type="index"
                                       fixed>
                      </el-table-column>
                      <el-table-column width="150" :label="$t('label.PFANS1036FORMVIEW_BIGPROJECT')" align="center"
                                       prop="programme">
                        <template slot-scope="scope">
                          <el-input size="small" maxlength="20" style="width: 100%;"
                                    v-model="scope.row.programme"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_SMALLPROJECT')" align="center" width="150"
                                       prop="sprogramme">
                        <template slot-scope="scope">
                          <el-input size="small" maxlength="20" style="width: 100%;"
                                    v-model="scope.row.sprogramme"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLANTYPE')" align="center" width="135"
                                       prop="type">
                        <template slot-scope="scope">
                          <dicselect
                            :data="scope.row.type"
                            @change="changeType"
                            code="PJ108"
                            style="width:7vw"
                            :no="scope.row"
                            size="small"
                          ></dicselect>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.April')" align="center" width="130">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money4">
                            <template slot-scope="scope">
                              <el-input-number
                                size="small"
                                controls-position="right"
                                @change="changeSum2(scope.row)"
                                :min="0"
                                style="width:7vw"
                                :step="1"
                                v-model="scope.row.money4">
                              </el-input-number>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.May')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money5">
                            <template slot-scope="scope">
                              <el-input-number
                                size="small"
                                controls-position="right"
                                @change="changeSum2(scope.row)"
                                :min="0"
                                style="width:7vw"
                                v-model="scope.row.money5">
                              </el-input-number>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.June')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money6">
                            <template slot-scope="scope">
                              <el-input-number
                                size="small"
                                controls-position="right"
                                @change="changeSum2(scope.row)"
                                :min="0"
                                :step="1"
                                style="width:7vw"
                                v-model="scope.row.money6">
                              </el-input-number>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.July')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money7">
                            <template slot-scope="scope">
                              <el-input-number
                                size="small"
                                controls-position="right"
                                @change="changeSum2(scope.row)"
                                :min="0"
                                :step="1"
                                style="width:7vw"
                                v-model="scope.row.money7">
                              </el-input-number>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.August')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money8">
                            <template slot-scope="scope">
                              <el-input-number
                                size="small"
                                controls-position="right"
                                @change="changeSum2(scope.row)"
                                :min="0"
                                :step="1"
                                style="width:7vw"
                                v-model="scope.row.money8">
                              </el-input-number>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.September')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money9">
                            <template slot-scope="scope">
                              <el-input-number
                                size="small"
                                controls-position="right"
                                @change="changeSum2(scope.row)"
                                :min="0"
                                :step="1"
                                style="width:7vw"
                                v-model="scope.row.money9">
                              </el-input-number>
                            </template>
                          </el-table-column>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.October')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money10">
                            <template slot-scope="scope">
                              <el-input-number
                                size="small"
                                controls-position="right"
                                @change="changeSum2(scope.row)"
                                :min="0"
                                :step="1"
                                style="width:7vw"
                                v-model="scope.row.money10">
                              </el-input-number>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.November')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money11">
                            <template slot-scope="scope">
                              <el-input-number
                                size="small"
                                controls-position="right"
                                @change="changeSum2(scope.row)"
                                :min="0"
                                :step="1"
                                style="width:7vw"
                                v-model="scope.row.money11">
                              </el-input-number>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.December')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money12">
                            <template slot-scope="scope">
                              <el-input-number
                                size="small"
                                controls-position="right"
                                @change="changeSum2(scope.row)"
                                :min="0"
                                :step="1"
                                style="width:7vw"
                                v-model="scope.row.money12">
                              </el-input-number>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.January')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money1">
                            <template slot-scope="scope">
                              <el-input-number
                                size="small"
                                controls-position="right"
                                @change="changeSum2(scope.row)"
                                :min="0"
                                :step="1"
                                style="width:7vw"
                                v-model="scope.row.money1">
                              </el-input-number>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.February')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money2">
                            <template slot-scope="scope">
                              <el-input-number
                                size="small"
                                controls-position="right"
                                @change="changeSum2(scope.row)"
                                :min="0"
                                :step="1"
                                style="width:7vw"
                                v-model="scope.row.money2">
                              </el-input-number>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.March')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money3">
                            <template slot-scope="scope">
                              <el-input-number
                                size="small"
                                controls-position="right"
                                @change="changeSum2(scope.row)"
                                :min="0"
                                :step="1"
                                style="width:7vw"
                                v-model="scope.row.money3">
                              </el-input-number>
                            </template>
                          </el-table-column>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.totalyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                         prop="moneytotal">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.operation')" align="center" width="200" fixed="right">
                        <template slot-scope="scope">
                          <el-button
                            :disabled="!disable"
                            @click.native.prevent="deleteRow(scope.$index, tableO1)"
                            plain
                            size="small"
                            type="danger"
                          >{{$t('button.delete')}}
                          </el-button>
                          <el-button
                            :disabled="!disable"
                            @click="addRow1()"
                            plain
                            size="small"
                            type="primary"
                          >{{$t('button.insert')}}
                          </el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane :label="$t('label.PFANS1036VIEW_USING')" name="second" v-if="this.role === '0'">
                    <el-table :data="tableO2" :summary-method="(val) => getSummaries(val,'o2')" show-summary stripe
                              header-cell-class-name="sub_bg_color_blue">
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_NO')" align="center" width="110" type="index"
                                       fixed>
                      </el-table-column>
                      <el-table-column width="150" :label="$t('label.PFANS1036FORMVIEW_BIGPROJECT')" align="center"
                                       prop="programme">
                        <template slot-scope="scope">
                          <el-input size="small" maxlength="20" style="width: 100%;"
                                    v-model="scope.row.programme"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_SMALLPROJECT')" align="center" width="150"
                                       prop="sprogramme">
                        <template slot-scope="scope">
                          <el-input size="small" maxlength="20" style="width: 100%;"
                                    v-model="scope.row.sprogramme"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column width="135" :label="$t('label.PFANS1036FORMVIEW_UNITPRICE')" align="center"
                                       prop="price" >
                        <template slot-scope="scope">
                          <el-input-number size="small" style="width:7vw" :min="0" controls-position="right"
                                           :precision="1" @change="changeSum(scope.row)" :step="1000"
                                           v-model="scope.row.price"></el-input-number>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLANTYPE')" align="center" width="135"
                                       prop="type">
                        <template slot-scope="scope">
                          <dicselect
                            :data="scope.row.type"
                            @change="changeType"
                            code="PJ107"
                            style="width:7vw"
                            :no="scope.row"
                            size="small"
                          ></dicselect>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.April')" align="center" width="130">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130"
                                           prop="number4">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw" :min="0" controls-position="right"
                                               :precision="1" @change="changeSum(scope.row,4)" :step="1"
                                               v-model="scope.row.number4">
                              </el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money4">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.May')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130"
                                           prop="number5">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw" :min="0" controls-position="right"
                                               :precision="1" @change="changeSum(scope.row,5)" :step="1"
                                               v-model="scope.row.number5"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money5">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.June')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130"
                                           prop="number6">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw" :min="0" controls-position="right"
                                               :precision="1" @change="changeSum(scope.row,6)" :step="1"
                                               v-model="scope.row.number6"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money6">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.July')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130"
                                           prop="number7">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw" :min="0" controls-position="right"
                                               :precision="1" @change="changeSum(scope.row,7)" :step="1"
                                               v-model="scope.row.number7"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money7">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.August')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130"
                                           prop="number8">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw" :min="0" controls-position="right"
                                               :precision="1" @change="changeSum(scope.row,8)" :step="1"
                                               v-model="scope.row.number8"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money8">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.September')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130"
                                           prop="number9">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw" :min="0" controls-position="right"
                                               :precision="1" @change="changeSum(scope.row,9)" :step="1"
                                               v-model="scope.row.number9"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money9">
                          </el-table-column>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.October')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130"
                                           prop="number10">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw" :min="0" controls-position="right"
                                               :precision="1" @change="changeSum(scope.row,10)" :step="1"
                                               v-model="scope.row.number10"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money10">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.November')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130"
                                           prop="number11">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw" :min="0" controls-position="right"
                                               :precision="1" @change="changeSum(scope.row,11)" :step="1"
                                               v-model="scope.row.number11"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money11">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.December')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130"
                                           prop="number12">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw" :min="0" controls-position="right"
                                               :precision="1" @change="changeSum(scope.row,12)" :step="1"
                                               v-model="scope.row.number12"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money12">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.January')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130"
                                           prop="number1">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw" :min="0" controls-position="right"
                                               :precision="1" @change="changeSum(scope.row,1)" :step="1"
                                               v-model="scope.row.number1"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money1">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.February')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130"
                                           prop="number2">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw" :min="0" controls-position="right"
                                               :precision="1" @change="changeSum(scope.row,2)" :step="1"
                                               v-model="scope.row.number2"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money2">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.March')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130"
                                           prop="number3">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw" :min="0" controls-position="right"
                                               :precision="1" @change="changeSum(scope.row,3)" :step="1"
                                               v-model="scope.row.number3"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money3">
                          </el-table-column>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.totalyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130"
                                         prop="numbertotal">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                         prop="moneytotal">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.operation')" align="center" width="200" fixed="right">
                        <template slot-scope="scope">
                          <el-button
                            :disabled="!disable"
                            @click.native.prevent="deleteRow(scope.$index, tableO2)"
                            plain
                            size="small"
                            type="danger"
                          >{{$t('button.delete')}}
                          </el-button>
                          <el-button
                            :disabled="!disable"
                            @click="addRow2()"
                            plain
                            size="small"
                            type="primary"
                          >{{$t('button.insert')}}
                          </el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane :label="$t('label.PFANS1036VIEW_TRAINING')" name="third" v-if="this.role === '0'">
                    <el-table :data="tableO3" :summary-method="(val) => getSummaries(val,'o3')" show-summary stripe
                              header-cell-class-name="sub_bg_color_blue">
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_NO')" align="center" width="110" type="index"
                                       fixed>
                      </el-table-column>
                      <el-table-column width="150" :label="$t('label.PFANS1036FORMVIEW_BIGPROJECT')" align="center"
                                       prop="programme">
                        <template slot-scope="scope">
                          <el-input size="small" maxlength="20" style="width: 100%;"
                                    v-model="scope.row.programme"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_SMALLPROJECT')" align="center" width="150"
                                       prop="sprogramme">
                        <template slot-scope="scope">
                          <el-input size="small" maxlength="20" style="width: 100%;"
                                    v-model="scope.row.sprogramme"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column width="135" :label="$t('label.PFANS1036FORMVIEW_UNITPRICE')" align="center"
                                       prop="price">
                        <template slot-scope="scope">
                          <el-input-number size="small" style="width:7vw" :min="0" controls-position="right"
                                           :precision="1" @change="changeSum(scope.row)" :step="1000"
                                           v-model="scope.row.price"></el-input-number>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLANTYPE')" align="center" width="135"
                                       prop="type">
                        <template slot-scope="scope">
                          <dicselect
                            :data="scope.row.type"
                            @change="changeType"
                            code="PJ106"
                            style="width:7vw"
                            :no="scope.row"
                            size="small"
                          ></dicselect>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.April')" align="center" width="130">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130"
                                           prop="number4">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw" :min="0" controls-position="right"
                                               :precision="1" @change="changeSum(scope.row,4)" :step="1"
                                               v-model="scope.row.number4">
                              </el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money4">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.May')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130"
                                           prop="number5">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw" :min="0" controls-position="right"
                                               :precision="1" @change="changeSum(scope.row,5)" :step="1"
                                               v-model="scope.row.number5"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money5">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.June')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130"
                                           prop="number6">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw" :min="0" controls-position="right"
                                               :precision="1" @change="changeSum(scope.row,6)" :step="1"
                                               v-model="scope.row.number6"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money6">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.July')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130"
                                           prop="number7">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw" :min="0" controls-position="right"
                                               :precision="1" @change="changeSum(scope.row,7)" :step="1"
                                               v-model="scope.row.number7"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money7">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.August')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130"
                                           prop="number8">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw" :min="0" controls-position="right"
                                               :precision="1" @change="changeSum(scope.row,8)" :step="1"
                                               v-model="scope.row.number8"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money8">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.September')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130"
                                           prop="number9">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw" :min="0" controls-position="right"
                                               :precision="1" @change="changeSum(scope.row,9)" :step="1"
                                               v-model="scope.row.number9"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money9">
                          </el-table-column>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.October')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130"
                                           prop="number10">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw" :min="0" controls-position="right"
                                               :precision="1" @change="changeSum(scope.row,10)" :step="1"
                                               v-model="scope.row.number10"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money10">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.November')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130"
                                           prop="number11">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw" :min="0" controls-position="right"
                                               :precision="1" @change="changeSum(scope.row,11)" :step="1"
                                               v-model="scope.row.number11"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money11">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.December')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130"
                                           prop="number12">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw" :min="0" controls-position="right"
                                               :precision="1" @change="changeSum(scope.row,12)" :step="1"
                                               v-model="scope.row.number12"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money12">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.January')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130"
                                           prop="number1">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw" :min="0" controls-position="right"
                                               :precision="1" @change="changeSum(scope.row,1)" :step="1"
                                               v-model="scope.row.number1"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money1">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.February')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130"
                                           prop="number2">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw" :min="0" controls-position="right"
                                               :precision="1" @change="changeSum(scope.row,2)" :step="1"
                                               v-model="scope.row.number2"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money2">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.March')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130"
                                           prop="number3">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw" :min="0" controls-position="right"
                                               :precision="1" @change="changeSum(scope.row,3)" :step="1"
                                               v-model="scope.row.number3"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money3">
                          </el-table-column>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.totalyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130"
                                         prop="numbertotal">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                         prop="moneytotal">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.operation')" align="center" width="200" fixed="right">
                        <template slot-scope="scope">
                          <el-button
                            :disabled="!disable"
                            @click.native.prevent="deleteRow(scope.$index, tableO3)"
                            plain
                            size="small"
                            type="danger"
                          >{{$t('button.delete')}}
                          </el-button>
                          <el-button
                            :disabled="!disable"
                            @click="addRow3()"
                            plain
                            size="small"
                            type="primary"
                          >{{$t('button.insert')}}
                          </el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_VARIOUSFUNDS')" name="fouth">
                    <el-table :data="tableO" :summary-method="(val) => getSummaries(val,'o4')" show-summary stripe
                              header-cell-class-name="sub_bg_color_blue">
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_NO')" align="center" width="110" type="index"
                                       fixed>
                      </el-table-column>
                      <el-table-column width="150" :label="$t('label.PFANS1036FORMVIEW_BIGPROJECT')" align="center"
                                       prop="programme">
                        <template slot-scope="scope">
                          <el-input size="small" maxlength="20" style="width: 100%;"
                                    v-model="scope.row.programme"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_SMALLPROJECT')" align="center" width="150"
                                       prop="sprogramme">
                        <template slot-scope="scope">
                          <el-input size="small" maxlength="20" style="width: 100%;"
                                    v-model="scope.row.sprogramme"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column  width="135" :label="$t('label.PFANS1036FORMVIEW_UNITPRICE')" align="center"
                                       prop="price" >
                        <template slot-scope="scope">
                          <el-input-number size="small" style="width:7vw" :min="0" controls-position="right"
                                           :precision="1" @change="changeSum(scope.row)" :step="1000"
                                           v-model="scope.row.price">
                          </el-input-number>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLANTYPE')" align="center" width="135"
                                       prop="type">
                        <template slot-scope="scope">
                          <dicselect
                            :data="scope.row.type"
                            @change="changeType"
                            code="PJ111"
                            style="width:7vw"
                            :no="scope.row"
                            size="small"
                          ></dicselect>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.April')" align="center" width="130">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130"
                                           prop="number4">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw" :min="0" controls-position="right"
                                               :precision="1" @change="changeSum(scope.row,4)" :step="1"
                                               v-model="scope.row.number4">
                              </el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money4">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.May')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130"
                                           prop="number5">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw" :min="0" controls-position="right"
                                               :precision="1" @change="changeSum(scope.row,5)" :step="1"
                                               v-model="scope.row.number5"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money5">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.June')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130"
                                           prop="number6">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw" :min="0" controls-position="right"
                                               :precision="1" @change="changeSum(scope.row,6)" :step="1"
                                               v-model="scope.row.number6"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money6">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.July')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130"
                                           prop="number7">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw" :min="0" controls-position="right"
                                               :precision="1" @change="changeSum(scope.row,7)" :step="1"
                                               v-model="scope.row.number7"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money7">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.August')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130"
                                           prop="number8">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw" :min="0" controls-position="right"
                                               :precision="1" @change="changeSum(scope.row,8)" :step="1"
                                               v-model="scope.row.number8"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money8">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.September')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130"
                                           prop="number9">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw" :min="0" controls-position="right"
                                               :precision="1" @change="changeSum(scope.row,9)" :step="1"
                                               v-model="scope.row.number9"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money9">
                          </el-table-column>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.October')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130"
                                           prop="number10">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw" :min="0" controls-position="right"
                                               :precision="1" @change="changeSum(scope.row,10)" :step="1"
                                               v-model="scope.row.number10"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money10">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.November')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130"
                                           prop="number11">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw" :min="0" controls-position="right"
                                               :precision="1" @change="changeSum(scope.row,11)" :step="1"
                                               v-model="scope.row.number11"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money11">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.December')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130"
                                           prop="number12">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw" :min="0" controls-position="right"
                                               :precision="1" @change="changeSum(scope.row,12)" :step="1"
                                               v-model="scope.row.number12"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money12">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.January')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130"
                                           prop="number1">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw" :min="0" controls-position="right"
                                               :precision="1" @change="changeSum(scope.row,1)" :step="1"
                                               v-model="scope.row.number1"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money1">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.February')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130"
                                           prop="number2">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw" :min="0" controls-position="right"
                                               :precision="1" @change="changeSum(scope.row,2)" :step="1"
                                               v-model="scope.row.number2"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money2">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.March')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130"
                                           prop="number3">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw" :min="0" controls-position="right"
                                               :precision="1" @change="changeSum(scope.row,3)" :step="1"
                                               v-model="scope.row.number3"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                           prop="money3">
                          </el-table-column>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.totalyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130"
                                         prop="numbertotal">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130"
                                         prop="moneytotal">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.operation')" align="center" width="200" fixed="right">
                        <template slot-scope="scope">
                          <el-button
                            :disabled="!disable"
                            @click.native.prevent="deleteRow(scope.$index, tableO)"
                            plain
                            size="small"
                            type="danger"
                          >{{$t('button.delete')}}
                          </el-button>
                          <el-button
                            :disabled="!disable"
                            @click="addRow4()"
                            plain
                            size="small"
                            type="primary"
                          >{{$t('button.insert')}}
                          </el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_PL')" style="margin-top: 2%" name="seventh">
              <div class="test">
                <el-table :data="tableP" header-cell-class-name="sub_bg_color_blue" :span-method="objectSpanMethod"
                          height="800" :row-class-name="rowClass">
                  <el-table-column prop="name" :formatter="formatterDir" align="center" width="70" fixed>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1036FORMVIEW_CONTENT')" align="center" width="250"
                                   prop="name1" :formatter="formatterDir" fixed>
                  </el-table-column>
<!--                  <el-table-column align="center" width="130" prop="name2" :formatter="formatterDir" fixed>-->
<!--                  </el-table-column>-->
                  <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                    <el-table-column :label="$t('label.April')" align="center" width="110">
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110"
                                       prop="money4">
                        <template slot-scope="scope">
                          <el-input-number :precision="2" size="small" v-model="scope.row.money4" :controls="false"
                                           :min="0" style="width:5vw"
                                           v-if="[40,44,45,48,54,55,56,57,58].includes(scope.$index)"
                                           @change="computedSum"></el-input-number>
                          <span v-else>{{scope.row.money4}}</span>
                        </template>
                      </el-table-column>
<!--                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center" width="110"-->
<!--                                       prop="actual4">-->
<!--                        <template slot-scope="scope">-->
<!--                          <el-input-number :precision="2" size="small" v-model="scope.row.actual4" :controls="false"-->
<!--                                           :min="0" style="width:5vw"-->
<!--                                           v-if="[40,44,45,48,54,55,56,57].includes(scope.$index)"-->
<!--                                           @change="computedSum"></el-input-number>-->
<!--                          <span v-else>{{scope.row.actual4}}</span>-->
<!--                        </template>-->
<!--                      </el-table-column>-->
                    </el-table-column>
                    <el-table-column :label="$t('label.May')" align="center" width="110">
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110"
                                       prop="money5">
                        <template slot-scope="scope">
                          <el-input-number :precision="2" size="small" v-model="scope.row.money5" :controls="false"
                                           :min="0" style="width:5vw"
                                           v-if="[40,44,45,48,54,55,56,57,58].includes(scope.$index)"
                                           @change="computedSum"></el-input-number>
                          <span v-else>{{scope.row.money5}}</span>
                        </template>
                      </el-table-column>
<!--                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center" width="110"-->
<!--                                       prop="actual5">-->
<!--                        <template slot-scope="scope">-->
<!--                          <el-input-number :precision="2" size="small" v-model="scope.row.actual5" :controls="false"-->
<!--                                           :min="0" style="width:5vw"-->
<!--                                           v-if="[40,44,45,48,54,55,56,57].includes(scope.$index)"-->
<!--                                           @change="computedSum"></el-input-number>-->
<!--                          <span v-else>{{scope.row.actual5}}</span>-->
<!--                        </template>-->
<!--                      </el-table-column>-->
                    </el-table-column>
                    <el-table-column :label="$t('label.June')" align="center" width="110">
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110"
                                       prop="money6">
                        <template slot-scope="scope">
                          <el-input-number :precision="2" size="small" v-model="scope.row.money6" :controls="false"
                                           :min="0" style="width:5vw"
                                           v-if="[40,44,45,48,54,55,56,57,58].includes(scope.$index)"
                                           @change="computedSum"></el-input-number>
                          <span v-else>{{scope.row.money6}}</span>
                        </template>
                      </el-table-column>
<!--                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center" width="110"-->
<!--                                       prop="actual6">-->
<!--                        <template slot-scope="scope">-->
<!--                          <el-input-number :precision="2" size="small" v-model="scope.row.actual6" :controls="false"-->
<!--                                           :min="0" style="width:5vw"-->
<!--                                           v-if="[40,44,45,48,54,55,56,57].includes(scope.$index)"-->
<!--                                           @change="computedSum"></el-input-number>-->
<!--                          <span v-else>{{scope.row.actual6}}</span>-->
<!--                        </template>-->
<!--                      </el-table-column>-->
                    </el-table-column>
                    <el-table-column :label="$t('label.July')" align="center" width="110">
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110"
                                       prop="money7">
                        <template slot-scope="scope">
                          <el-input-number :precision="2" size="small" v-model="scope.row.money7" :controls="false"
                                           :min="0" style="width:5vw"
                                           v-if="[40,44,45,48,54,55,56,57,58].includes(scope.$index)"
                                           @change="computedSum"></el-input-number>
                          <span v-else>{{scope.row.money7}}</span>
                        </template>
                      </el-table-column>
<!--                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center" width="110"-->
<!--                                       prop="actual7">-->
<!--                        <template slot-scope="scope">-->
<!--                          <el-input-number :precision="2" size="small" v-model="scope.row.actual7" :controls="false"-->
<!--                                           :min="0" style="width:5vw"-->
<!--                                           v-if="[40,44,45,48,54,55,56,57].includes(scope.$index)"-->
<!--                                           @change="computedSum"></el-input-number>-->
<!--                          <span v-else>{{scope.row.actual7}}</span>-->
<!--                        </template>-->
<!--                      </el-table-column>-->
                    </el-table-column>
                    <el-table-column :label="$t('label.August')" align="center" width="110">
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110"
                                       prop="money8">
                        <template slot-scope="scope">
                          <el-input-number :precision="2" size="small" v-model="scope.row.money8" :controls="false"
                                           :min="0" style="width:5vw"
                                           v-if="[40,44,45,48,54,55,56,57,58].includes(scope.$index)"
                                           @change="computedSum"></el-input-number>
                          <span v-else>{{scope.row.money8}}</span>
                        </template>
                      </el-table-column>
<!--                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center" width="110"-->
<!--                                       prop="actual8">-->
<!--                        <template slot-scope="scope">-->
<!--                          <el-input-number :precision="2" size="small" v-model="scope.row.actual8" :controls="false"-->
<!--                                           :min="0" style="width:5vw"-->
<!--                                           v-if="[40,44,45,48,54,55,56,57].includes(scope.$index)"-->
<!--                                           @change="computedSum"></el-input-number>-->
<!--                          <span v-else>{{scope.row.actual8}}</span>-->
<!--                        </template>-->
<!--                      </el-table-column>-->
                    </el-table-column>
                    <el-table-column :label="$t('label.September')" align="center" width="110">
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110"
                                       prop="money9">
                        <template slot-scope="scope">
                          <el-input-number :precision="2" size="small" v-model="scope.row.money9" :controls="false"
                                           :min="0" style="width:5vw"
                                           v-if="[40,44,45,48,54,55,56,57,58].includes(scope.$index)"
                                           @change="computedSum"></el-input-number>
                          <span v-else>{{scope.row.money9}}</span>
                        </template>
                      </el-table-column>
<!--                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center" width="110"-->
<!--                                       prop="actual9">-->
<!--                        <template slot-scope="scope">-->
<!--                          <el-input-number :precision="2" size="small" v-model="scope.row.actual9" :controls="false"-->
<!--                                           :min="0" style="width:5vw"-->
<!--                                           v-if="[40,44,45,48,54,55,56,57].includes(scope.$index)"-->
<!--                                           @change="computedSum"></el-input-number>-->
<!--                          <span v-else>{{scope.row.actual9}}</span>-->
<!--                        </template>-->
<!--                      </el-table-column>-->
                    </el-table-column>
                  </el-table-column>
                  <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                    <el-table-column :label="$t('label.October')" align="center" width="110">
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110"
                                       prop="money10">
                        <template slot-scope="scope">
                          <el-input-number :precision="2" size="small" v-model="scope.row.money10" :controls="false"
                                           :min="0" style="width:5vw"
                                           v-if="[40,44,45,48,54,55,56,57,58].includes(scope.$index)"
                                           @change="computedSum"></el-input-number>
                          <span v-else>{{scope.row.money10}}</span>
                        </template>
                      </el-table-column>
<!--                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center" width="110"-->
<!--                                       prop="actual10">-->
<!--                        <template slot-scope="scope">-->
<!--                          <el-input-number :precision="2" size="small" v-model="scope.row.actual10" :controls="false"-->
<!--                                           :min="0" style="width:5vw"-->
<!--                                           v-if="[40,44,45,48,54,55,56,57].includes(scope.$index)"-->
<!--                                           @change="computedSum"></el-input-number>-->
<!--                          <span v-else>{{scope.row.actual10}}</span>-->
<!--                        </template>-->
<!--                      </el-table-column>-->
                    </el-table-column>
                    <el-table-column :label="$t('label.November')" align="center" width="110">
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110"
                                       prop="money11">
                        <template slot-scope="scope">
                          <el-input-number :precision="2" size="small" v-model="scope.row.money11" :controls="false"
                                           :min="0" style="width:5vw"
                                           v-if="[40,44,45,48,54,55,56,57,58].includes(scope.$index)"
                                           @change="computedSum"></el-input-number>
                          <span v-else>{{scope.row.money11}}</span>
                        </template>
                      </el-table-column>
<!--                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center" width="110"-->
<!--                                       prop="actual11">-->
<!--                        <template slot-scope="scope">-->
<!--                          <el-input-number :precision="2" size="small" v-model="scope.row.actual11" :controls="false"-->
<!--                                           :min="0" style="width:5vw"-->
<!--                                           v-if="[40,44,45,48,54,55,56,57].includes(scope.$index)"-->
<!--                                           @change="computedSum"></el-input-number>-->
<!--                          <span v-else>{{scope.row.actual11}}</span>-->
<!--                        </template>-->
<!--                      </el-table-column>-->
                    </el-table-column>
                    <el-table-column :label="$t('label.December')" align="center" width="110">
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110"
                                       prop="money12">
                        <template slot-scope="scope">
                          <el-input-number :precision="2" size="small" v-model="scope.row.money12" :controls="false"
                                           :min="0" style="width:5vw"
                                           v-if="[40,44,45,48,54,55,56,57,58].includes(scope.$index)"
                                           @change="computedSum"></el-input-number>
                          <span v-else>{{scope.row.money12}}</span>
                        </template>
                      </el-table-column>
<!--                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center" width="110"-->
<!--                                       prop="actual12">-->
<!--                        <template slot-scope="scope">-->
<!--                          <el-input-number :precision="2" size="small" v-model="scope.row.actual12" :controls="false"-->
<!--                                           :min="0" style="width:5vw"-->
<!--                                           v-if="[40,44,45,48,54,55,56,57].includes(scope.$index)"-->
<!--                                           @change="computedSum"></el-input-number>-->
<!--                          <span v-else>{{scope.row.actual12}}</span>-->
<!--                        </template>-->
<!--                      </el-table-column>-->
                    </el-table-column>
                    <el-table-column :label="$t('label.January')" align="center" width="110">
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110"
                                       prop="money1">
                        <template slot-scope="scope">
                          <el-input-number :precision="2" size="small" v-model="scope.row.money1" :controls="false"
                                           :min="0" style="width:5vw"
                                           v-if="[40,44,45,48,54,55,56,57,58].includes(scope.$index)"
                                           @change="computedSum"></el-input-number>
                          <span v-else>{{scope.row.money1}}</span>
                        </template>
                      </el-table-column>
<!--                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center" width="110"-->
<!--                                       prop="actual1">-->
<!--                        <template slot-scope="scope">-->
<!--                          <el-input-number :precision="2" size="small" v-model="scope.row.actual1" :controls="false"-->
<!--                                           :min="0" style="width:5vw"-->
<!--                                           v-if="[40,44,45,48,54,55,56,57].includes(scope.$index)"-->
<!--                                           @change="computedSum"></el-input-number>-->
<!--                          <span v-else>{{scope.row.actual1}}</span>-->
<!--                        </template>-->
<!--                      </el-table-column>-->
                    </el-table-column>
                    <el-table-column :label="$t('label.February')" align="center" width="110">
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110"
                                       prop="money2">
                        <template slot-scope="scope">
                          <el-input-number :precision="2" size="small" v-model="scope.row.money2" :controls="false"
                                           :min="0" style="width:5vw"
                                           v-if="[40,44,45,48,54,55,56,57,58].includes(scope.$index)"
                                           @change="computedSum"></el-input-number>
                          <span v-else>{{scope.row.money2}}</span>
                        </template>
                      </el-table-column>
<!--                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center" width="110"-->
<!--                                       prop="actual2">-->
<!--                        <template slot-scope="scope">-->
<!--                          <el-input-number :precision="2" size="small" v-model="scope.row.actual2" :controls="false"-->
<!--                                           :min="0" style="width:5vw"-->
<!--                                           v-if="[40,44,45,48,54,55,56,57].includes(scope.$index)"-->
<!--                                           @change="computedSum"></el-input-number>-->
<!--                          <span v-else>{{scope.row.actual2}}</span>-->
<!--                        </template>-->
<!--                      </el-table-column>-->
                    </el-table-column>
                    <el-table-column :label="$t('label.March')" align="center" width="110">
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110"
                                       prop="money3">
                        <template slot-scope="scope">
                          <el-input-number :precision="2" size="small" v-model="scope.row.money3" :controls="false"
                                           :min="0" style="width:5vw"
                                           v-if="[40,44,45,48,54,55,56,57,58].includes(scope.$index)"
                                           @change="computedSum"></el-input-number>
                          <span v-else>{{scope.row.money3}}</span>
                        </template>
                      </el-table-column>
<!--                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center" width="110"-->
<!--                                       prop="actual3">-->
<!--                        <template slot-scope="scope">-->
<!--                          <el-input-number :precision="2" size="small" v-model="scope.row.actual3" :controls="false"-->
<!--                                           :min="0" style="width:5vw"-->
<!--                                           v-if="[40,44,45,48,54,55,56,57].includes(scope.$index)"-->
<!--                                           @change="computedSum"></el-input-number>-->
<!--                          <span v-else>{{scope.row.actual3}}</span>-->
<!--                        </template>-->
<!--                      </el-table-column>-->
                    </el-table-column>
                  </el-table-column>
                </el-table>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import user from '../../../components/user.vue';
  import {Message} from 'element-ui';
  import {getOrgInfoByUserId, getDictionaryInfo, getOrgInfo, getCurrentRole14,getCurrentRoleNew,getDepartmentById} from '@/utils/customize';
  import dicselect from '../../../components/dicselect';
  import AssetsComponent from './AssetsComponent';
  import TrustComponent from './TrustComponent';
  import BussinessComponent from './BussinessComponent';
  import TrustA1Component from './TrustA1Component';
  import moment from 'moment';

  export default {
    name: 'PFANS1012FormView',
    components: {
      dicselect,
      EasyNormalContainer,
      user,
      AssetsComponent,
      TrustComponent,
      BussinessComponent,
      TrustA1Component,
    },
    data() {
      var checkuser = (rule, value, callback) => {
        if (!this.form.user_id || this.form.user_id === '' || this.form.user_id === 'undefined') {
          this.error = this.$t('normal.error_09') + this.$t('label.applicant');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.applicant')));
        } else {
          this.error = '';
          return callback();
        }
      };
      return {
        newentry: [],
        redirict:'',
        companyen:'',
        grp_options: [],
        disabledC:false,
        workflowCode: 'W0010',
        role: '',
        org: [],
        month: '',
        arr: [4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2, 3],
        groupA1: [],
        groupA2: [],
        groupB3: [],
        groupB1: [],
        groupB2: [],
        groupC: [
          {groupname: getDictionaryInfo('PJ088001').value1},
          {groupname: getDictionaryInfo('PJ088001').value1},
          {groupname: getDictionaryInfo('PJ088001').value1},
          {groupname: getDictionaryInfo('PJ088001').value1},
          {groupname: getDictionaryInfo('PJ088001').value1},
          {groupname: getDictionaryInfo('PJ088001').value1},
          {groupname: getDictionaryInfo('PJ088002').value1}],
        sumA1: [],
        sumA2: [],
        sumB1: [],
        sumB2: [],
        sumB3: [],
        sumC1: [],
        sumO1: [],
        sumO2: [],
        sumO3: [],
        sumO4: [],
        personTable: [],
        gnperson: [],
        gwperson: [],
        assets1: [],
        assets2: [],
        travel: [],
        business: [{assetstype: '0'}, {assetstype: '0'}, {assetstype: '0'}, {assetstype: '0'}],
        equipment_newyear: [{assetstype: '0'}],
        equipment_lastyear: [{assetstype: '0'}],
        equipment_lodyear: [],
        assets_newyear: [{assetstype: '0'}],
        assets_lastyear: [{assetstype: '0'}],
        assets_lodyear: [],
        error: '',
        selectType: 'Single',
        title: 'title.PFANS1036VIEW',
        userlist: '',
        activeName: 'first',
        activeName2: 'first',
        activeName6: 'first',
        activeName7: 'first',
        loading: false,
        disable: false,
        buttonList: [
          {
            key: 'save',
            name: 'button.save',
            disabled: false,
            icon: 'el-icon-check',
          },
        ],
        orgtree: [],
        tableA: [], //1
        // tableB: [],//2
        tableC: [],//3
        tableD: [],//4
        tableK: [{}, {}, {}, {}, {}, {}],
        //region add_qhr_20210910 添加新建初始值
        tableO1: [{
          programme: '',
          sprogramme: '',
          type: '',
          money4: '',
          money5: '',
          money6: '',
          money7: '',
          money8: '',
          money9: '',
          money10: '',
          money11: '',
          money12: '',
          money1: '',
          money2: '',
          money3: '',
          moneytotal: '',
        }],
        tableO2: [{
          programme: '',
          sprogramme: '',
          price: '',
          type: '',
          number4: '',
          number5: '',
          number6: '',
          number7: '',
          number8: '',
          number9: '',
          number10: '',
          number11: '',
          number12: '',
          number1: '',
          number2: '',
          number3: '',
          numbertotal: '',
          moneytotal: '',
        }],
        tableO3: [{
          programme: '',
          sprogramme: '',
          price: '',
          type: '',
          number4: '',
          number5: '',
          number6: '',
          number7: '',
          number8: '',
          number9: '',
          number10: '',
          number11: '',
          number12: '',
          number1: '',
          number2: '',
          number3: '',
          numbertotal: '',
          moneytotal: '',
        }],
        tableO: [{
          programme: '',
          sprogramme: '',
          price: '',
          type: '',
          number4: '',
          number5: '',
          number6: '',
          number7: '',
          number8: '',
          number9: '',
          number10: '',
          number11: '',
          number12: '',
          number1: '',
          number2: '',
          number3: '',
          numbertotal: '',
          moneytotal: '',
        }],
        //endregion add_qhr_20210910 添加新建初始值
        tablePall: [],
        tableP: [{name1: 'PJ086001'}, {name1: 'PJ086002'}, {name1: 'PJ086003'},
          {name1: this.$t('label.PFANS1036FORMVIEW_TAB1VALUE2')}, {name1: this.$t('label.PFANS1036FORMVIEW_TAB1VALUE3')}
          , {name1: this.$t('label.PFANS1036FORMVIEW_TAB1VALUE4')}, {name1: 'PJ073001'},
          {name1: '-'}, {name1: '-'}, {name1: '-'}, {name1: '-'},
          {name1: 'PJ073002'}, {name1: '-'}, {name1: 'PJ073'}, {name1: 'PJ074001'}, {name1: 'PJ074002'}, {name1: 'PJ074003'},
          {name1: 'PJ074004'}, {name1: 'PJ074005'}, {name1: 'PJ074006'},
          {name1: 'PJ074'}, {name1: 'PJ075001'}, {name1: 'PJ075002'}, {name1: 'PJ075003'}, {name1: 'PJ075004'}, {name1: 'PJ075005'},
          {name1: 'PJ075'}, {name1: 'PJ076001'},
          {name1: 'PJ076002'}, {name1: 'PJ076003'}, {name1: 'PJ076'}, {name1: 'PJ077001'},
          {name1: 'PJ077002'}, {name1: 'PJ077003'}, {name1: 'PJ077004'}, {name1: 'PJ077005'},
          {name1: 'PJ077006'}, {name1: 'PJ077007'}, {name1: 'PJ077008'}, {name1: 'PJ077009'},
          {
            name1: 'PJ077010',
            type: 40,
          },
          {name1: 'PJ077'}, {name1: this.$t('label.PFANS2005FORMVIEW_TOTAL')}, {},
          {
            name1: this.$t('label.PFANS1036FORMVIEW_TAB3VALUE2'),
            type: 44,
          },
          {
            name1: this.$t('label.PFANS1036FORMVIEW_TAB3VALUE3'),
            type: 45,
          },
          {name1: this.$t('label.PFANS1036FORMVIEW_TAB3VALUE4')}, {}, {type: 48}, {}, {},
          {name1: this.$t('label.PFANS1042FORMVIEW_BENEFITRATE')},
          {name1: this.$t('label.PFANS1036FORMVIEW_TAB8VALUE2')},
          {name1: this.$t('label.PFANS1036FORMVIEW_TAB8VALUE3')},
          {name1: this.$t('label.PFANS1036FORMVIEW_TAB8VALUE4')},
          {
            name1: this.$t('label.PFANS1036FORMVIEW_TAB9VALUE2'),
            type: 55,
          },
          {
            name1: this.$t('label.PFANS1036FORMVIEW_TAB9VALUE3'),
            type: 56,
          },
          {
            name1: this.$t('label.PFANS1036FORMVIEW_TAB9VALUE4'),
            type: 57,
          },
          {name1: this.$t('label.PFANS1036FORMVIEW_TAB9VALUE5'), type: 58},
          {name1: this.$t('label.PFANS1036FORMVIEW_TAB10VALUE2')},
          {name1: this.$t('label.PFANS1036FORMVIEW_TAB10VALUE3')},
          {name1: this.$t('label.PFANS1036FORMVIEW_TAB10VALUE4')},
          {name1: this.$t('label.PFANS1036FORMVIEW_TAB10VALUE5')},
          {name1: this.$t('label.PFANS1036FORMVIEW_TAB10VALUE6')},
          {name1: this.$t('label.PFANS1036FORMVIEW_TAB10VALUE9')},
        ],
        baseInfo: {},
        form: {
          center_id: '',
          group_id: '',
          user_id: '',
          year: '',
          encoding: '',
        },
        rules: {
          user_id: [{
            required: true,
            validator: checkuser,
            trigger: 'change',
          }],
          center_id: [
            {
              required: true,
              message:
                this.$t('normal.error_09') +
                this.$t('label.PFANS2036VIEW_DEPARTMENT'),
              trigger: 'blur',
            }],
        },
        multiple: false,
        canStart: false,
        checkList: [],
      };
    },

    created() {
      this.loading = true;
      if (!this.$route.params.disabled) {
        this.buttonList = [];
      }
      this.disable = this.$route.params.disabled;
    },
    mounted() {
      this.loading = true;
      this.role = getCurrentRole14();
      // if (this.roles === '0') {
      //   this.checkdisabled = false;
      // } else {
      //   this.checkdisabled = true;
      // }
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1036Store/selectById', {'businessplanid': this.$route.params._id})
          .then(response => {
            this.form = response;
            this.disabledC = true;
            let group = getOrgInfo(this.form.center_id);
            if (group) {
              this.redirict = group.redirict;
              this.companyen = group.companyen;
            }
            if (this.form.center_id)
            {
              this.grp_options = [];
              let user = getDepartmentById(this.form.center_id);
              if (user) {
                this.grp_options.push({
                  value: this.form.center_id,
                  lable: user,
                },)
              }
            }

            this.equipment_newyear = JSON.parse(this.form.equipment_newyear);
            this.equipment_lastyear = JSON.parse(this.form.equipment_lastyear);
            this.equipment_lodyear = JSON.parse(this.form.equipment_lodyear);
            this.assets_newyear = JSON.parse(this.form.assets_newyear);
            this.assets_lastyear = JSON.parse(this.form.assets_lastyear);
            this.assets_lodyear = JSON.parse(this.form.assets_lodyear);
            let table_p = JSON.parse(this.form.tableP);
            this.tablePall = JSON.parse(this.form.tableP);
            this.business = JSON.parse(this.form.business);
            this.groupA1 = JSON.parse(this.form.groupA1);
            this.groupA2 = JSON.parse(this.form.groupA2);
            this.groupB1 = JSON.parse(this.form.groupB1);
            this.groupB2 = JSON.parse(this.form.groupB2);
            this.groupB3 = JSON.parse(this.form.groupB3);
            this.groupC = JSON.parse(this.form.groupC);
            this.tableO1 = JSON.parse(this.form.tableO1);
            this.tableO2 = JSON.parse(this.form.tableO2);
            this.tableO3 = JSON.parse(this.form.tableO3);
            this.tableO = JSON.parse(this.form.tableO);

            this.tableA = JSON.parse(this.form.tableA);
            this.tableC = JSON.parse(this.form.tableC);
            this.tableD = JSON.parse(this.form.tableD);

            table_p.forEach(
              val => {
                this.tableP[val.type] = val;
              },
            );
            // this.getPersonTable(this.$route.params.center_id, this.$route.params.year);
            // add_qhr_20210910 添加画面初始计算
            this.computedSum();
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
      else {
        this.loading = true;
        this.buttonList[0].disabled = true;
        //todo niandu
        this.form.year = '2021';
        // this.form.year = parseInt(moment(new Date()).format('MM')) >= 4 ? parseInt(moment(new Date()).format('YYYY')) + 1 + '' : moment(new Date()).format('YYYY');
        // let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
        // this.form.center_id = rst.centerId || '';
        // this.form.group_id = rst.groupId || '';

        this.getorglistname();
        this.disabledC = false;
        let group = getOrgInfo(this.form.center_id);
        if (group) {
          this.redirict = group.redirict;
          this.companyen = group.companyen;
        }
        this.form.user_id = this.$store.getters.userinfo.userid;
        let parameter = {
          year: this.form.year,
          groupid: this.form.center_id
        };
        this.loading = true;
        this.$store
          .dispatch('PFANS1036Store/getgroupcompanyen', parameter)
          .then(response => {
            if (response) {
              this.org = response;
              if (this.org) {
                for (let i = 0; i < this.org.length; i++) {
                    this.form.encoding = this.org[i].encoding;
                }
              }
              // if (this.org[0].type === '1') {
              //   let data1 = JSON.parse(this.org[0].equipment_lodyear);
              //   let data2 = JSON.parse(this.org[0].assets_lodyear);
              //   let data3 = data1.filter(item => (item.companyen == this.org.companyen));
              //   let data4 = data2.filter(item => (item.companyen == this.org.companyen));
              //   this.equipment_lodyear = data3;
              //   this.assets_lodyear = data4;
              // } else {
              if (this.org.length > 0) {
                  for (let i = 0; i < this.org.length; i++) {
                    this.equipment_lodyear.push({
                      encoding: this.org[i].encoding,
                      companyen: this.org[i].companyen,
                      money4: 0,
                      money5: 0,
                      money6: 0,
                      money7: 0,
                      money8: 0,
                      money9: 0,
                      money10: 0,
                      money11: 0,
                      money12: 0,
                      money1: 0,
                      money2: 0,
                      money3: 0,
                    });
                    this.assets_lodyear.push({
                      encoding: this.org[i].encoding,
                      companyen: this.org[i].companyen,
                      money4: 0,
                      money5: 0,
                      money6: 0,
                      money7: 0,
                      money8: 0,
                      money9: 0,
                      money10: 0,
                      money11: 0,
                      money12: 0,
                      money1: 0,
                      money2: 0,
                      money3: 0,
                    });
                  }
                }
              // }
            }
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

        this.loading = true;
        if (this.form.center_id) {
          this.getgroupA1(this.form.center_id);
          this.getgroupA2(this.form.center_id);
          this.getgroupB1(this.form.center_id);
          this.getgroupB2(this.form.center_id);
          this.getgroupB3(this.form.center_id);
          this.getPersonTable(this.form.center_id, this.form.year);
        }
        // add_qhr_20210910 添加画面初始计算
        // this.computedSum();
        this.loading = false;
      }

    },
    computed: {
      tableSZTotal: function() {
        if (this.sumA1.length > 0) {
          this.tableK[0].number1 = '0.00';
          this.tableK[0].money1 = (Number(this.sumA1[2] || 0) + Number(this.sumA1[3] || 0) + Number(this.sumA1[4] || 0)).toFixed(3);
          this.tableK[0].number2 = '0.00';
          this.tableK[0].money2 = (Number(this.sumA1[5] || 0) + Number(this.sumA1[6] || 0) + Number(this.sumA1[7] || 0)).toFixed(3);
          this.tableK[0].numberfirst = '0.00';
          this.tableK[0].moneyfirst = (Number(this.tableK[0].money1) + Number(this.tableK[0].money2)).toFixed(3);
          this.tableK[0].number3 = '0.00';
          this.tableK[0].money3 = (Number(this.sumA1[9] || 0) + Number(this.sumA1[10] || 0) + Number(this.sumA1[11] || 0)).toFixed(3);
          this.tableK[0].number4 = '0.00';
          this.tableK[0].money4 = (Number(this.sumA1[12] || 0) + Number(this.sumA1[13] || 0) + Number(this.sumA1[14] || 0)).toFixed(3);
          this.tableK[0].numbersecond = '0.00';
          this.tableK[0].moneysecond = (Number(this.tableK[0].money3) + Number(this.tableK[0].money4)).toFixed(3);
          this.tableK[0].numbertotal = '0.00';
          this.tableK[0].moneytotal = (Number(this.tableK[0].moneyfirst) + Number(this.tableK[0].moneysecond)).toFixed(3);
        }
        ['sumA2', 'sumB1', 'sumB2', 'sumB3'].forEach(
          (val, index) => {
            if (this[val].length > 0) {
              this.tableK[index + 1].number1 = (Number(this[val][1] || 0) + Number(this[val][3] || 0) + Number(this[val][5] || 0)).toFixed(2);
              this.tableK[index + 1].money1 = (Number(this[val][2] || 0) + Number(this[val][4] || 0) + Number(this[val][6] || 0)).toFixed(3);
              this.tableK[index + 1].number2 = (Number(this[val][7] || 0) + Number(this[val][9] || 0) + Number(this[val][11] || 0)).toFixed(2);
              this.tableK[index + 1].money2 = (Number(this[val][8] || 0) + Number(this[val][10] || 0) + Number(this[val][12] || 0)).toFixed(3);
              this.tableK[index + 1].numberfirst = (Number(this.tableK[index + 1].number1) + Number(this.tableK[index + 1].number2)).toFixed(2);
              this.tableK[index + 1].moneyfirst = (Number(this.tableK[index + 1].money1) + Number(this.tableK[index + 1].money2)).toFixed(3);
              this.tableK[index + 1].number3 = (Number(this[val][15] || 0) + Number(this[val][17] || 0) + Number(this[val][19] || 0)).toFixed(2);
              this.tableK[index + 1].money3 = (Number(this[val][16] || 0) + Number(this[val][18] || 0) + Number(this[val][20] || 0)).toFixed(3);
              this.tableK[index + 1].number4 = (Number(this[val][21] || 0) + Number(this[val][23] || 0) + Number(this[val][25] || 0)).toFixed(2);
              this.tableK[index + 1].money4 = (Number(this[val][22] || 0) + Number(this[val][24] || 0) + Number(this[val][26] || 0)).toFixed(3);
              this.tableK[index + 1].numbersecond = (Number(this.tableK[index + 1].number3) + Number(this.tableK[index + 1].number4)).toFixed(2);
              this.tableK[index + 1].moneysecond = (Number(this.tableK[index + 1].money3) + Number(this.tableK[index + 1].money4)).toFixed(3);
              this.tableK[index + 1].numbertotal = (Number(this.tableK[index + 1].numberfirst) + Number(this.tableK[index + 1].numbersecond)).toFixed(2);
              this.tableK[index + 1].moneytotal = (Number(this.tableK[index + 1].moneyfirst) + Number(this.tableK[index + 1].moneysecond)).toFixed(3);
            }
          },
        );
        if (this.sumC1.length > 0) {
          this.tableK[5].number1 = '0.00';
          this.tableK[5].money1 = (Number(this.sumC1[1] || 0) + Number(this.sumC1[2] || 0) + Number(this.sumC1[3] || 0)).toFixed(3);
          this.tableK[5].number2 = '0.00';
          this.tableK[5].money2 = (Number(this.sumC1[4] || 0) + Number(this.sumC1[5] || 0) + Number(this.sumC1[6] || 0)).toFixed(3);
          this.tableK[5].numberfirst = '0.00';
          this.tableK[5].moneyfirst = (Number(this.tableK[5].money1) + Number(this.tableK[5].money2)).toFixed(3);
          this.tableK[5].number3 = '0.00';
          this.tableK[5].money3 = (Number(this.sumC1[8] || 0) + Number(this.sumC1[9] || 0) + Number(this.sumC1[10] || 0)).toFixed(3);
          this.tableK[5].number4 = '0.00';
          this.tableK[5].money4 = (Number(this.sumC1[11] || 0) + Number(this.sumC1[12] || 0) + Number(this.sumC1[13] || 0)).toFixed(3);
          this.tableK[5].numbersecond = '0.00';
          this.tableK[5].moneysecond = (Number(this.tableK[5].money3) + Number(this.tableK[5].money4)).toFixed(3);
          this.tableK[5].numbertotal = '0.00';
          this.tableK[5].moneytotal = (Number(this.tableK[5].moneyfirst) + Number(this.tableK[5].moneysecond)).toFixed(3);
        }
        return this.tableK;
      },
      wactValue:function () {
        let { tableO, tableO1,tableO2,tableO3,tableO4,tableA,tableC, tableD,assets1,assets2,travel,sumA1,sumA2,sumB1,sumB2,sumB3,sumC1} = this
        return { tableO, tableO1,tableO2,tableO3,tableO4,tableA,tableC, tableD,assets1,assets2,travel,sumA1,sumA2,sumB1,sumB2,sumB3,sumC1}
      }
    },
    methods: {
      changeHour(row)
      {
        row.workinghour4 = Number(row.amount4)*Number(row.overtimehour);//加班总工时
        row.pay4 = Number(Number(row.workinghour4)*Number(row.payhour)).toFixed(2);//加班总费

        row.workinghour5 = Number(row.amount5)*Number(row.overtimehour);//加班总工时
        row.pay5 = Number(Number(row.workinghour5)*Number(row.payhour)).toFixed(2);//加班总费

        row.workinghour6 = Number(row.amount6)*Number(row.overtimehour);//加班总工时
        row.pay6 = Number(Number(row.workinghour6)*Number(row.payhour)).toFixed(2);//加班总费

        row.workinghour7 = Number(row.amount7)*Number(row.overtimehour);//加班总工时
        row.pay7 = Number(Number(row.workinghour7)*Number(row.payhour)).toFixed(2);//加班总费

        row.workinghour8 = Number(row.amount8)*Number(row.overtimehour);//加班总工时
        row.pay8 = Number(Number(row.workinghour8)*Number(row.payhour)).toFixed(2);//加班总费

        row.workinghour9 = Number(row.amount9)*Number(row.overtimehour);//加班总工时
        row.pay9 = Number(Number(row.workinghour9)*Number(row.payhour)).toFixed(2);//加班总费

        row.workinghourfirst = Number(row.amountfirst)*Number(row.overtimehour);//加班总工时
        row.payfirst = Number(Number(row.workinghourfirst)*Number(row.payhour)).toFixed(2);//加班总费

        row.workinghour10 = Number(row.amount10)*Number(row.overtimehour);//加班总工时
        row.pay10 = Number(Number(row.workinghour10)*Number(row.payhour)).toFixed(2);//加班总费

        row.workinghour11 = Number(row.amount11)*Number(row.overtimehour);//加班总工时
        row.pay11 = Number(Number(row.workinghour11)*Number(row.payhour)).toFixed(2);//加班总费

        row.workinghour12 = Number(row.amount12)*Number(row.overtimehour);//加班总工时
        row.pay12 = Number(Number(row.workinghour12)*Number(row.payhour)).toFixed(2);//加班总费

        row.workinghour1 = Number(row.amount1)*Number(row.overtimehour);//加班总工时
        row.pay1 = Number(Number(row.workinghour1)*Number(row.payhour)).toFixed(2);//加班总费

        row.workinghour2 = Number(row.amount2)*Number(row.overtimehour);//加班总工时
        row.pay2 = Number(Number(row.workinghour2)*Number(row.payhour)).toFixed(2);//加班总费

        row.workinghour3 = Number(row.amount3)*Number(row.overtimehour);//加班总工时
        row.pay3 = Number(Number(row.workinghour3)*Number(row.payhour)).toFixed(2);//加班总费

        row.workinghoursecond = Number(row.amountsecond)*Number(row.overtimehour);//加班总工时
        row.paysecond = Number(row.workinghoursecond)*Number(row.payhour).toFixed(2);//加班总费

        row.workinghourtotal = Number(row.amounttotal)*Number(row.overtimehour);//加班总工时
        row.paytotal = Number(row.workinghourtotal)*Number(row.payhour).toFixed(2);//加班总费

        // this.tableA[0].

      },
      groupChange(val) {
        //region add_qhr_20210910 添加画面初始计算
        this.tableA = [];
        this.tableC = [];
        this.tableD = [];
        //endregion add_qhr_20210910 添加画面初始计算
        this.buttonList[0].disabled = true;
        this.form.center_id = val;
        let group = getOrgInfo(this.form.center_id);
        if (group) {
          this.redirict = group.redirict;
          this.companyen = group.companyen;
        }
        if (val) {
          this.groupA1 = [];
          this.groupA2 = [];
          this.groupB1 = [];
          this.groupB2 = [];
          this.groupB3 = [];
          this.getgroupA1(val);
          this.getgroupA2(val);
          this.getgroupB1(val);
          this.getgroupB2(val);
          this.getgroupB3(val);
        }
        this.getPersonTable(this.form.center_id, this.form.year);
      },
      getorglistname()
      {
        let role = getCurrentRoleNew();
        const vote = [];

        if (role === '3') {//CENTER
          vote.push(
            {
              value: this.$store.getters.userinfo.userinfo.centerid,
              lable: this.$store.getters.userinfo.userinfo.centername,
            },
          );
          //add ccm 0112 兼职部门
          if (this.$store.getters.userinfo.userinfo.otherorgs)
          {
            for(let others of this.$store.getters.userinfo.userinfo.otherorgs)
            {
              if (others.centerid)
              {
                this.$store.getters.orgGroupList.filter((item) => {
                  if (item.centerid === others.centerid) {
                    vote.push(
                      {
                        value: item.centerid,
                        lable: item.centername,
                      },
                    );
                  }
                })
              }
            }
          }
          //add ccm 0112 兼职部门
        } else if (role === '2') {//副总经理
          this.$store.getters.orgGroupList.filter((item) => {
            if (item.virtualuser === this.$store.getters.userinfo.userid) {
              vote.push(
                {
                  value: item.centerid,
                  lable: item.centername,
                },
              );
            }
          })
          //add ccm 0112 兼职部门
          if (this.$store.getters.userinfo.userinfo.otherorgs)
          {
            for(let others of this.$store.getters.userinfo.userinfo.otherorgs)
            {
              if (others.centerid)
              {
                this.$store.getters.orgGroupList.filter((item) => {
                  if (item.centerid === others.centerid) {
                    vote.push(
                      {
                        value: item.centerid,
                        lable: item.centername,
                      },
                    );
                  }
                })
              }
            }
          }
          //add ccm 0112 兼职部门
        }
        else if (role === '4') //GM
        {
          let centers = getOrgInfo(this.$store.getters.userinfo.userinfo.centerid);
          if (centers)
          {
            if (centers.encoding === null || centers.encoding === '' || centers.encoding === undefined)
            {
              vote.push(
                {
                  value: this.$store.getters.userinfo.userinfo.groupid,
                  lable: this.$store.getters.userinfo.userinfo.groupname,
                },
              );
            }
          }
        }
        const vote1 = [];
        if (this.$store.getters.useraccount._id === '5e78b17ef3c8d71e98a2aa30'//管理员
          || this.$store.getters.roles.indexOf("11") != -1 //总经理
          || this.$store.getters.roles.indexOf("16") != -1 //财务部长
          || this.$store.getters.roles.indexOf("18") != -1) //企划部长部长
        {
          this.$store.getters.orgGroupList.filter((item) => {
            vote1.push(
              {
                value: item.centerid,
                lable: item.centername,
              },
            );
          })
          this.grp_options = vote1;
        }
        else
        {
          this.grp_options = vote;
        }
        //去重
        let letoptionsdata = [];
        let arrId = [];
        for(var item of this.grp_options){
          if(arrId.indexOf(item['lable']) == -1){
            arrId.push(item['lable']);
            letoptionsdata.push(item);
          }
        }
        //针对经营管理统计到group修改 start
        let incfmyList = [];
        for(let item of letoptionsdata){
          if(getOrgInfo(item.value).encoding == ''){
            incfmyList.push(item.value)
          }
        }
        if(incfmyList.length > 0){
          for(let item of incfmyList){
            letoptionsdata = letoptionsdata.filter(letitem => letitem.value != item)
          }
          let orgInfo = [];
          for(let item of incfmyList){
            if(item){
              if(getOrgInfo(item).orgs.length != 0){
                orgInfo.push(getOrgInfo(item).orgs)
              }
            }
          }
          let groInfo = orgInfo[0].filter(item => item.type == '2');
          for(let item of groInfo){
            letoptionsdata.push(
              {
                value: item._id,
                lable: item.title,
              },
            );
          }
        }
        //针对经营管理统计到group修改 end
        this.grp_options = letoptionsdata;
        if (!this.form.center_id && this.grp_options.length > 0)
        {
          this.form.center_id = this.grp_options[0].value;
        }

        //UPD CCM 20210422
      },
      workflowState(val) {
        if (val.state === '1') {
          this.form.status = '3';
        } else if (val.state === '2') {
          this.form.status = '4';
        }
        this.buttonClick('save');
      },
      //add-ws-5-20-流程恒展开
      start(val) {
        if (val.state === '0') {
          this.form.status = '2';
        } else if (val.state === '2') {
          this.form.status = '4';
        }
        this.buttonClick('save');
      },
      //add-ws-5-20-流程恒展开
      end() {
        this.form.status = '0';
        this.buttonClick('save');
      },
      getPersonTable(groupid, year) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1036Store/getPersonPlan', {'groupid': groupid, 'year': year})
          .then(response => {

            if (response[0]) this.tableC = JSON.parse(response[0]);
            if (response[1]) this.tableD = JSON.parse(response[1]);
            if (response[2]) this.tableA = [JSON.parse(response[2])];
            // if (response[2]) this.tableB = [JSON.parse(response[2])];
            let actual = JSON.parse(response[3]);
            let gnpersonnel4 = Number.parseInt(response[4]);
            let gnpersonnel5 = Number.parseInt(response[4]);
            let gnpersonnel6 = Number.parseInt(response[4]);
            let gnpersonnel7 = Number.parseInt(response[4]);
            let gnpersonnel8 = Number.parseInt(response[4]);
            let gnpersonnel9 = Number.parseInt(response[4]);
            let gnpersonnel10 = Number.parseInt(response[4]);
            let gnpersonnel11 = Number.parseInt(response[4]);
            let gnpersonnel12 = Number.parseInt(response[4]);
            let gnpersonnel1 = Number.parseInt(response[4]);
            let gnpersonnel2 = Number.parseInt(response[4]);
            let gnpersonnel3 = Number.parseInt(response[4]);
            let gwpersonnel4 = Number.parseInt(response[5]);
            let gwpersonnel5 = Number.parseInt(response[5]);
            let gwpersonnel6 = Number.parseInt(response[5]);
            let gwpersonnel7 = Number.parseInt(response[5]);
            let gwpersonnel8 = Number.parseInt(response[5]);
            let gwpersonnel9 = Number.parseInt(response[5]);
            let gwpersonnel10 = Number.parseInt(response[5]);
            let gwpersonnel11 = Number.parseInt(response[5]);
            let gwpersonnel12 = Number.parseInt(response[5]);
            let gwpersonnel1 = Number.parseInt(response[5]);
            let gwpersonnel2 = Number.parseInt(response[5]);
            let gwpersonnel3 = Number.parseInt(response[5]);
            if (Number.parseInt(response[4]) > 0 || Number.parseInt(response[5]) > 0) {  //有外注返回
              this.newentry = JSON.parse(response[6]);//将外注人员转换
              if (this.newentry != null) {   //有新来的
                for (let i = 0; i < this.newentry.length; i++) {    //遍历外注人员
                  if (this.newentry[i].isoutside === false) {    //判断是构内
                    if (parseInt(moment(this.newentry[i].entermouth).format('MM')) == 1) {
                      gnpersonnel1 = gnpersonnel1 + 1;
                      gnpersonnel2 = gnpersonnel2 + 1;
                      gnpersonnel3 = gnpersonnel3 + 1;
                    } else if (parseInt(moment(this.newentry[i].entermouth).format('MM')) == 2) {
                      gnpersonnel2 = gnpersonnel2 + 1;
                      gnpersonnel3 = gnpersonnel3 + 1;
                    } else if (parseInt(moment(this.newentry[i].entermouth).format('MM')) == 3) {
                      gnpersonnel3 = gnpersonnel3 + 1;
                    } else if (parseInt(moment(this.newentry[i].entermouth).format('MM')) == 4) {
                      gnpersonnel4 = gnpersonnel4 + 1;
                      gnpersonnel5 = gnpersonnel5 + 1;
                      gnpersonnel6 = gnpersonnel6 + 1;
                      gnpersonnel7 = gnpersonnel7 + 1;
                      gnpersonnel8 = gnpersonnel8 + 1;
                      gnpersonnel9 = gnpersonnel9 + 1;
                      gnpersonnel10 = gnpersonnel10 + 1;
                      gnpersonnel11 = gnpersonnel11 + 1;
                      gnpersonnel12 = gnpersonnel12 + 1;
                      gnpersonnel1 = gnpersonnel1 + 1;
                      gnpersonnel2 = gnpersonnel2 + 1;
                      gnpersonnel3 = gnpersonnel3 + 1;
                    } else if (parseInt(moment(this.newentry[i].entermouth).format('MM')) == 5) {
                      gnpersonnel5 = gnpersonnel5 + 1;
                      gnpersonnel6 = gnpersonnel6 + 1;
                      gnpersonnel7 = gnpersonnel7 + 1;
                      gnpersonnel8 = gnpersonnel8 + 1;
                      gnpersonnel9 = gnpersonnel9 + 1;
                      gnpersonnel10 = gnpersonnel10 + 1;
                      gnpersonnel11 = gnpersonnel11 + 1;
                      gnpersonnel12 = gnpersonnel12 + 1;
                      gnpersonnel1 = gnpersonnel1 + 1;
                      gnpersonnel2 = gnpersonnel2 + 1;
                      gnpersonnel3 = gnpersonnel3 + 1;
                    } else if (parseInt(moment(this.newentry[i].entermouth).format('MM')) == 6) {
                      gnpersonnel6 = gnpersonnel6 + 1;
                      gnpersonnel7 = gnpersonnel7 + 1;
                      gnpersonnel8 = gnpersonnel8 + 1;
                      gnpersonnel9 = gnpersonnel9 + 1;
                      gnpersonnel10 = gnpersonnel10 + 1;
                      gnpersonnel11 = gnpersonnel11 + 1;
                      gnpersonnel12 = gnpersonnel12 + 1;
                      gnpersonnel1 = gnpersonnel1 + 1;
                      gnpersonnel2 = gnpersonnel2 + 1;
                      gnpersonnel3 = gnpersonnel3 + 1;
                    } else if (parseInt(moment(this.newentry[i].entermouth).format('MM')) == 7) {
                      gnpersonnel7 = gnpersonnel7 + 1;
                      gnpersonnel8 = gnpersonnel8 + 1;
                      gnpersonnel9 = gnpersonnel9 + 1;
                      gnpersonnel10 = gnpersonnel10 + 1;
                      gnpersonnel11 = gnpersonnel11 + 1;
                      gnpersonnel12 = gnpersonnel12 + 1;
                      gnpersonnel1 = gnpersonnel1 + 1;
                      gnpersonnel2 = gnpersonnel2 + 1;
                      gnpersonnel3 = gnpersonnel3 + 1;
                    } else if (parseInt(moment(this.newentry[i].entermouth).format('MM')) == 8) {
                      gnpersonnel8 = gnpersonnel8 + 1;
                      gnpersonnel9 = gnpersonnel9 + 1;
                      gnpersonnel10 = gnpersonnel10 + 1;
                      gnpersonnel11 = gnpersonnel11 + 1;
                      gnpersonnel12 = gnpersonnel12 + 1;
                      gnpersonnel1 = gnpersonnel1 + 1;
                      gnpersonnel2 = gnpersonnel2 + 1;
                      gnpersonnel3 = gnpersonnel3 + 1;
                    } else if (parseInt(moment(this.newentry[i].entermouth).format('MM')) == 9) {
                      gnpersonnel9 = gnpersonnel9 + 1;
                      gnpersonnel10 = gnpersonnel10 + 1;
                      gnpersonnel11 = gnpersonnel11 + 1;
                      gnpersonnel12 = gnpersonnel12 + 1;
                      gnpersonnel1 = gnpersonnel1 + 1;
                      gnpersonnel2 = gnpersonnel2 + 1;
                      gnpersonnel3 = gnpersonnel3 + 1;
                    } else if (parseInt(moment(this.newentry[i].entermouth).format('MM')) == 10) {
                      gnpersonnel10 = gnpersonnel10 + 1;
                      gnpersonnel11 = gnpersonnel11 + 1;
                      gnpersonnel12 = gnpersonnel12 + 1;
                      gnpersonnel1 = gnpersonnel1 + 1;
                      gnpersonnel2 = gnpersonnel2 + 1;
                      gnpersonnel3 = gnpersonnel3 + 1;
                    } else if (parseInt(moment(this.newentry[i].entermouth).format('MM')) == 11) {
                      gnpersonnel11 = gnpersonnel11 + 1;
                      gnpersonnel12 = gnpersonnel12 + 1;
                      gnpersonnel1 = gnpersonnel1 + 1;
                      gnpersonnel2 = gnpersonnel2 + 1;
                      gnpersonnel3 = gnpersonnel3 + 1;
                    } else if (parseInt(moment(this.newentry[i].entermouth).format('MM')) == 12) {
                      gnpersonnel12 = gnpersonnel12 + 1;
                      gnpersonnel1 = gnpersonnel1 + 1;
                      gnpersonnel2 = gnpersonnel2 + 1;
                      gnpersonnel3 = gnpersonnel3 + 1;
                    }
                  } else if (this.newentry[i].isoutside === true) {    //判断是构外
                    if (parseInt(moment(this.newentry[i].entermouth).format('MM')) == 1) {
                      gwpersonnel1 = gwpersonnel1 + 1;
                      gwpersonnel2 = gwpersonnel2 + 1;
                      gwpersonnel3 = gwpersonnel3 + 1;
                    } else if (parseInt(moment(this.newentry[i].entermouth).format('MM')) == 2) {
                      gwpersonnel2 = gwpersonnel2 + 1;
                      gwpersonnel3 = gwpersonnel3 + 1;
                    } else if (parseInt(moment(this.newentry[i].entermouth).format('MM')) == 3) {
                      gwpersonnel3 = gnpersonnel3 + 1;
                    } else if (parseInt(moment(this.newentry[i].entermouth).format('MM')) == 4) {
                      gwpersonnel4 = gwpersonnel4 + 1;
                      gwpersonnel5 = gwpersonnel5 + 1;
                      gwpersonnel6 = gwpersonnel6 + 1;
                      gwpersonnel7 = gwpersonnel7 + 1;
                      gwpersonnel8 = gwpersonnel8 + 1;
                      gwpersonnel9 = gwpersonnel9 + 1;
                      gwpersonnel10 = gwpersonnel10 + 1;
                      gwpersonnel11 = gwpersonnel11 + 1;
                      gwpersonnel12 = gwpersonnel12 + 1;
                      gwpersonnel1 = gwpersonnel1 + 1;
                      gwpersonnel2 = gwpersonnel2 + 1;
                      gwpersonnel3 = gwpersonnel3 + 1;
                    } else if (parseInt(moment(this.newentry[i].entermouth).format('MM')) == 5) {
                      gwpersonnel5 = gwpersonnel5 + 1;
                      gwpersonnel6 = gwpersonnel6 + 1;
                      gwpersonnel7 = gwpersonnel7 + 1;
                      gwpersonnel8 = gwpersonnel8 + 1;
                      gwpersonnel9 = gwpersonnel9 + 1;
                      gwpersonnel10 = gwpersonnel10 + 1;
                      gwpersonnel11 = gwpersonnel11 + 1;
                      gwpersonnel12 = gwpersonnel12 + 1;
                      gwpersonnel1 = gwpersonnel1 + 1;
                      gwpersonnel2 = gwpersonnel2 + 1;
                      gwpersonnel3 = gwpersonnel3 + 1;
                    } else if (parseInt(moment(this.newentry[i].entermouth).format('MM')) == 6) {
                      gwpersonnel6 = gwpersonnel6 + 1;
                      gwpersonnel7 = gwpersonnel7 + 1;
                      gwpersonnel8 = gwpersonnel8 + 1;
                      gwpersonnel9 = gwpersonnel9 + 1;
                      gwpersonnel10 = gwpersonnel10 + 1;
                      gwpersonnel11 = gwpersonnel11 + 1;
                      gwpersonnel12 = gwpersonnel12 + 1;
                      gwpersonnel1 = gwpersonnel1 + 1;
                      gwpersonnel2 = gwpersonnel2 + 1;
                      gwpersonnel3 = gwpersonnel3 + 1;
                    } else if (parseInt(moment(this.newentry[i].entermouth).format('MM')) == 7) {
                      gwpersonnel7 = gwpersonnel7 + 1;
                      gwpersonnel8 = gwpersonnel8 + 1;
                      gwpersonnel9 = gwpersonnel9 + 1;
                      gwpersonnel10 = gwpersonnel10 + 1;
                      gwpersonnel11 = gwpersonnel11 + 1;
                      gwpersonnel12 = gwpersonnel12 + 1;
                      gwpersonnel1 = gwpersonnel1 + 1;
                      gwpersonnel2 = gwpersonnel2 + 1;
                      gwpersonnel3 = gwpersonnel3 + 1;
                    } else if (parseInt(moment(this.newentry[i].entermouth).format('MM')) == 8) {
                      gwpersonnel8 = gwpersonnel8 + 1;
                      gwpersonnel9 = gwpersonnel9 + 1;
                      gwpersonnel10 = gwpersonnel10 + 1;
                      gwpersonnel11 = gwpersonnel11 + 1;
                      gwpersonnel12 = gwpersonnel12 + 1;
                      gwpersonnel1 = gwpersonnel1 + 1;
                      gwpersonnel2 = gwpersonnel2 + 1;
                      gwpersonnel3 = gwpersonnel3 + 1;
                    } else if (parseInt(moment(this.newentry[i].entermouth).format('MM')) == 9) {
                      gwpersonnel9 = gwpersonnel9 + 1;
                      gwpersonnel10 = gwpersonnel10 + 1;
                      gwpersonnel11 = gwpersonnel11 + 1;
                      gwpersonnel12 = gwpersonnel12 + 1;
                      gwpersonnel1 = gwpersonnel1 + 1;
                      gwpersonnel2 = gwpersonnel2 + 1;
                      gwpersonnel3 = gwpersonnel3 + 1;
                    } else if (parseInt(moment(this.newentry[i].entermouth).format('MM')) == 10) {
                      gwpersonnel10 = gwpersonnel10 + 1;
                      gwpersonnel11 = gwpersonnel11 + 1;
                      gwpersonnel12 = gwpersonnel12 + 1;
                      gwpersonnel1 = gwpersonnel1 + 1;
                      gwpersonnel2 = gwpersonnel2 + 1;
                      gwpersonnel3 = gwpersonnel3 + 1;
                    } else if (parseInt(moment(this.newentry[i].entermouth).format('MM')) == 11) {
                      gwpersonnel11 = gwpersonnel11 + 1;
                      gwpersonnel12 = gwpersonnel12 + 1;
                      gwpersonnel1 = gwpersonnel1 + 1;
                      gwpersonnel2 = gwpersonnel2 + 1;
                      gwpersonnel3 = gwpersonnel3 + 1;
                    } else if (parseInt(moment(this.newentry[i].entermouth).format('MM')) == 12) {
                      gwpersonnel12 = gwpersonnel12 + 1;
                      gwpersonnel1 = gwpersonnel1 + 1;
                      gwpersonnel2 = gwpersonnel2 + 1;
                      gwpersonnel3 = gwpersonnel3 + 1;
                    }
                  }
                }
              }
            }
            this.gnperson = [];
            this.gwperson = [];
            this.gnperson.push(gnpersonnel4);
            this.gnperson.push(gnpersonnel5);
            this.gnperson.push(gnpersonnel6);
            this.gnperson.push(gnpersonnel7);
            this.gnperson.push(gnpersonnel8);
            this.gnperson.push(gnpersonnel9);
            this.gnperson.push(gnpersonnel10);
            this.gnperson.push(gnpersonnel11);
            this.gnperson.push(gnpersonnel12);
            this.gnperson.push(gnpersonnel1);
            this.gnperson.push(gnpersonnel2);
            this.gnperson.push(gnpersonnel3);
            this.gwperson.push(gwpersonnel4);
            this.gwperson.push(gwpersonnel5);
            this.gwperson.push(gwpersonnel6);
            this.gwperson.push(gwpersonnel7);
            this.gwperson.push(gwpersonnel8);
            this.gwperson.push(gwpersonnel9);
            this.gwperson.push(gwpersonnel10);
            this.gwperson.push(gwpersonnel11);
            this.gwperson.push(gwpersonnel12);
            this.gwperson.push(gwpersonnel1);
            this.gwperson.push(gwpersonnel2);
            this.gwperson.push(gwpersonnel3);
            this.buttonList[0].disabled = false;
            this.loading = false;
          })
          .catch(error => {
            if(this.buttonList.length > 0)
            {
              this.buttonList[0].disabled = true;
            }
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });

            this.loading = false;
          });
      },
      computedSum() {
        this.loading = true;
        let tableOTotal = {}; //共同事務費
        let tableOTotal1 = {}; //オフィス家賃
        let tableOTotal2 = {}; // 研究材料费
        let tableOTotal3 = {};//リース費
        let tableOTotal4 = {};//原動費
        let tableOtotal5 = {};// 通信費
        let tableOtotal6 = {};//消耗品費
        let tableOtotal7 = {};//厚生費
        let tableOtotal8 = {};//その他(固定費)
        let tableOtotal9 = {};//出向者賃借料
        let tableOtotal10 = {};//ブランド使用料
        let _tableO3 = {}; // 通信
        let _tableO2 = {}; //その他(経費)
        let _tableO1 = {}; //研修
        let _travel = {}; //旅费交通费
        let _assets1 = {};//设备投资
        let _assets2 = {};//软件资产
        let _sumB = {};//外注费
        //通信
        debugger;
        this.tableO3.forEach(
          val => {
            if (val.type === 'PJ108001') {
              for (let i = 1; i <= 12; i++) {
                _tableO3['money' + i] = (Number(_tableO3['money' + i] || 0) + Number(val['money' + i] || 0)).toFixed(2);
              }
            }
          },
        );
        //研修
        this.tableO1.forEach(
          val => {
            if (val.type === 'PJ106001') {
              for (let i = 1; i <= 12; i++) {
                _tableO1['money' + i] = (Number(_tableO1['money' + i] || 0) + Number(val['money' + i] || 0)).toFixed(2);
              }
            }
          },
        );
        //旅费交通费下方合计
        if (this.travel.length > 0) {
          for (let i = 1; i <= 12; i++) {
            _travel['money' + i] = (Number(_travel['money' + i] || 0) + Number(this.travel[0]['money' + i] || 0)).toFixed(2);
          }
        }
        //设备投资下方合计
        if (this.assets1.length > 0) {
          for (let i = 1; i <= 12; i++) {
            _assets1['money' + i] = (Number(_assets1['money' + i] || 0) + Number(this.assets1[0]['money' + i] || 0)).toFixed(2);
          }
        }
        //旅费交通费软件资产下方合计
        if (this.assets2.length > 0) {
          for (let i = 1; i <= 12; i++) {
            _assets2['money' + i] = (Number(_assets2['money' + i] || 0) + Number(this.assets2[0]['money' + i] || 0)).toFixed(2);
          }
        }
        // 採用
        this.tableO2.forEach(
          val => {
            if (val.type === 'PJ107001') {
              for (let i = 1; i <= 12; i++) {
                _travel['money' + i] = (Number(_travel['money' + i] || 0) + Number(val['money' + i] || 0)).toFixed(2);
              }
            }
            //その他(経費)
            if (val.type === 'PJ107002') {
              for (let i = 1; i <= 12; i++) {
                _tableO2['money' + i] = (Number(_tableO2['money' + i] || 0) + Number(val['money' + i] || 0)).toFixed(2);
              }
            }
          },
        );
        //各种经费
        this.tableO.forEach(
          val => {
            //共同事務費
            if (val.type === 'PJ111012') {
              for (let i = 1; i <= 12; i++) {
                tableOTotal['money' + i] = (Number(tableOTotal['money' + i] || 0) + Number(val['money' + i] || 0)).toFixed(3);
              }
            }
            //旅费交通费
            if (val.type === 'PJ111008') {
              for (let i = 1; i <= 12; i++) {
                _travel['money' + i] = (Number(_travel['money' + i] || 0) + Number(val['money' + i] || 0)).toFixed(3);
              }
            }
            // 研究材料费
            if (val.type === 'PJ111006') {
              for (let i = 1; i <= 12; i++) {
                tableOTotal2['money' + i] = (Number(tableOTotal2['money' + i] || 0) + Number(val['money' + i] || 0)).toFixed(3);
              }
            }
            //リース費
            if (val.type === 'PJ111003') {
              for (let i = 1; i <= 12; i++) {
                tableOTotal3['money' + i] = (Number(tableOTotal3['money' + i] || 0) + Number(val['money' + i] || 0)).toFixed(3);
              }
            }
            //原動費
            if (val.type === 'PJ111007') {
              for (let i = 1; i <= 12; i++) {
                tableOTotal4['money' + i] = (Number(tableOTotal4['money' + i] || 0) + Number(val['money' + i] || 0)).toFixed(3);
              }
            }
            // 通信費
            if (val.type === 'PJ111009') {
              for (let i = 1; i <= 12; i++) {
                _tableO3['money' + i] = (Number(_tableO3['money' + i] || 0) + Number(val['money' + i] || 0)).toFixed(3);
              }
            }
            //消耗品費
            if (val.type === 'PJ111010') {
              for (let i = 1; i <= 12; i++) {
                tableOtotal6['money' + i] = (Number(tableOtotal6['money' + i] || 0) + Number(val['money' + i] || 0)).toFixed(3);
              }
            }
            //厚生費
            if (val.type === 'PJ111001') {
              for (let i = 1; i <= 12; i++) {
                tableOtotal7['money' + i] = (Number(tableOtotal7['money' + i] || 0) + Number(val['money' + i] || 0)).toFixed(3);
              }
            }
            //研修
            if (val.type === 'PJ111011') {
              for (let i = 1; i <= 12; i++) {
                _tableO1['money' + i] = (Number(_tableO1['money' + i] || 0) + Number(val['money' + i] || 0)).toFixed(3);
              }
            }
            //その他(固定費)
            if (val.type === 'PJ111005') {
              for (let i = 1; i <= 12; i++) {
                tableOtotal8['money' + i] = (Number(tableOtotal8['money' + i] || 0) + Number(val['money' + i] || 0)).toFixed(3);
              }
            }
            //オフィス家賃
            if (val.type === 'PJ111002') {
              for (let i = 1; i <= 12; i++) {
                tableOTotal1['money' + i] = (Number(tableOTotal1['money' + i] || 0) + Number(val['money' + i] || 0)).toFixed(3);
              }
            }
            //出向者賃借料
            if (val.type === 'PJ111004') {
              for (let i = 1; i <= 12; i++) {
                tableOtotal9['money' + i] = (Number(tableOtotal9['money' + i] || 0) + Number(val['money' + i] || 0)).toFixed(3);
              }
            }
            //その他経費
            if (val.type === 'PJ111014') {
              for (let i = 1; i <= 12; i++) {
                _tableO2['money' + i] = (Number(_tableO2['money' + i] || 0) + Number(val['money' + i] || 0)).toFixed(3);
              }
            }
            //ブランド使用料
            if (val.type === 'PJ111013') {
              for (let i = 1; i <= 12; i++) {
                tableOtotal10['money' + i] = (Number(tableOtotal10['money' + i] || 0) + Number(val['money' + i] || 0)).toFixed(3);
              }
            }
            //外注费
            if (val.type === 'PJ111015') {
              for (let i = 1; i <= 12; i++) {
                _sumB['money' + i] = (Number(_sumB['money' + i] || 0) + Number(val['money' + i] || 0)).toFixed(3);
              }
            }
          },
        );

        for (let i = 0; i < this.arr.length; i++) {

          //region 画面可编辑项，数据库保存
          //その他利益
          if (this.tableP[40]['money' + this.arr[i]] === undefined || this.tableP[40]['money' + this.arr[i]] === '0.00' || this.tableP[40]['money' + this.arr[i]] === 0) {
            this.$set(this.tableP[40], 'money' + this.arr[i], this.tablePall[0]['money' + this.arr[i]]);
          }
          //金利（損--マイナス）
          if (this.tableP[44]['money' + this.arr[i]] === undefined || this.tableP[44]['money' + this.arr[i]] === '0.00' || this.tableP[44]['money' + this.arr[i]] === 0) {
            this.$set(this.tableP[44], 'money' + this.arr[i], this.tablePall[1]['money' + this.arr[i]]);
          }
          //為替（損--マイナス）
          if (this.tableP[45]['money' + this.arr[i]] === undefined || this.tableP[45]['money' + this.arr[i]] === '0.00' || this.tableP[45]['money' + this.arr[i]] === 0) {
            this.$set(this.tableP[45], 'money' + this.arr[i], this.tablePall[2]['money' + this.arr[i]]);
          }
          //税金引当金
          if (this.tableP[48]['money' + this.arr[i]] === undefined || this.tableP[48]['money' + this.arr[i]] === '0.00' || this.tableP[48]['money' + this.arr[i]] === 0) {
            this.$set(this.tableP[48], 'money' + this.arr[i], this.tablePall[3]['money' + this.arr[i]]);
          }

          //社員（名）
          if (this.tableA.length > 0) {
            if (this.tableP[54]['money' + this.arr[i]] === undefined || this.tableP[54]['money' + this.arr[i]] === '0.00' || this.tableP[54]['money' + this.arr[i]] === 0) {
              this.$set(this.tableP[54], 'money' + this.arr[i], this.tablePall[4]['money' + this.arr[i]]);
            }
            this.$set(this.tableP[6], 'money' + this.arr[i], (Number(this.tableA[0]['giving' + this.arr[i]]) / 1000).toFixed(2));
          } else {
            this.$set(this.tableP[54], 'money' + this.arr[i], '0.00');
            this.$set(this.tableP[6], 'money' + this.arr[i], '0.00');
          }
          //外注PJ工数
          if (this.tableP[55]['money' + this.arr[i]] === undefined || this.tableP[55]['money' + this.arr[i]] === '0.00' || this.tableP[55]['money' + this.arr[i]] === 0) {
            this.$set(this.tableP[55], 'money' + this.arr[i], this.tablePall[5]['money' + this.arr[i]]);
          }
          //外注稼働工数
          if (this.tableP[56]['money' + this.arr[i]] === undefined || this.tableP[56]['money' + this.arr[i]] === '0.00' || this.tableP[56]['money' + this.arr[i]] === 0) {
            this.$set(this.tableP[56], 'money' + this.arr[i], this.tablePall[6]['money' + this.arr[i]]);
          }
          //社員PJ工数
          if (this.tableP[57]['money' + this.arr[i]] === undefined || this.tableP[57]['money' + this.arr[i]] === '0.00' || this.tableP[57]['money' + this.arr[i]] === 0) {
            this.$set(this.tableP[57], 'money' + this.arr[i], this.tablePall[7]['money' + this.arr[i]]);
          }
          //社員稼働工数
          if (this.tableP[58]['money' + this.arr[i]] === undefined || this.tableP[58]['money' + this.arr[i]] === '0.00' || this.tableP[58]['money' + this.arr[i]] === 0) {
            this.$set(this.tableP[58], 'money' + this.arr[i], this.tablePall[8]['money' + this.arr[i]]);
          }
          //endregion

          //構外外注(工数)
          if (this.tableP[52]['money' + this.arr[i]] === undefined || this.tableP[52]['money' + this.arr[i]] === '0.00' || this.tableP[52]['money' + this.arr[i]] === 0) {
            this.$set(this.tableP[52], 'money' + this.arr[i], this.tablePall[9]['money' + this.arr[i]]);
          }

          //構内外注（名）
          if (this.tableP[53]['money' + this.arr[i]] === undefined || this.tableP[53]['money' + this.arr[i]] === '0.00' || this.tableP[53]['money' + this.arr[i]] === 0) {
            this.$set(this.tableP[53], 'money' + this.arr[i], this.tablePall[10]['money' + this.arr[i]]);
          }

          //外部受託
          if (this.groupA1.length > 0) {
            this.$set(this.tableP[0], 'money' + this.arr[i], Number(this.groupA1[0]['money' + this.arr[i]] || 0).toFixed(2));
            this.$set(this.tableP[1], 'money' + this.arr[i], Number(this.groupA1[1]['money' + this.arr[i]] || 0).toFixed(2));
            this.$set(this.tableP[2], 'money' + this.arr[i], Number(this.groupA1[2]['money' + this.arr[i]] || 0).toFixed(2));
          } else {
            this.$set(this.tableP[0], 'money' + this.arr[i], '0.00');
            this.$set(this.tableP[1], 'money' + this.arr[i], '0.00');
            this.$set(this.tableP[2], 'money' + this.arr[i], '0.00');
          }
          //内部受託
          debugger;
          if (this.sumA2.length > 0) {
            if (i <= 5) {
              this.$set(this.tableP[3], 'money' + this.arr[i], Number(this.sumA2[2 + 2 * i] || 0).toFixed(2));
            } else {
              this.$set(this.tableP[3], 'money' + this.arr[i], Number(this.sumA2[4 + 2 * i] || 0).toFixed(2));
            }
          } else {
            this.$set(this.tableP[3], 'money' + this.arr[i], '0.00');
          }
          this.$set(this.tableP[4], 'money' + this.arr[i], (Number(this.tableP[0]['money' + this.arr[i]]) + Number(this.tableP[1]['money' + this.arr[i]]) + Number(this.tableP[2]['money' + this.arr[i]]) + Number(this.tableP[3]['money' + this.arr[i]])).toFixed(2));
          this.$set(this.tableP[5], 'money' + this.arr[i], (Number(this.tableP[4]['money' + this.arr[i]]) - (Number(this.tableP[1]['money' + this.arr[i]]) * Number(getDictionaryInfo('PJ086002').value2) + Number(this.tableP[2]['money' + this.arr[i]]) * Number(getDictionaryInfo('PJ086003').value2))).toFixed(2));
          //人员计划合计下半个
          if (this.tableA.length > 0) {
            this.$set(this.tableP[6], 'money' + this.arr[i], ((Number(this.tableA[0]['pay' + this.arr[i]]) + Number(this.tableA[0]['giving' + this.arr[i]])) / 1000).toFixed(2));
          } else {
            this.$set(this.tableP[6], 'money' + this.arr[i], '0.00');
          }
          this.$set(this.tableP[7], 'money' + this.arr[i], '0.00');
          this.$set(this.tableP[8], 'money' + this.arr[i], '0.00');
          this.$set(this.tableP[9], 'money' + this.arr[i], '0.00');
          this.$set(this.tableP[10], 'money' + this.arr[i], '0.00');
          //厚生费1
          this.$set(this.tableP[11], 'money' + this.arr[i], Number(tableOtotal7['money' + this.arr[i]] || 0).toFixed(2));
          this.$set(this.tableP[12], 'money' + this.arr[i], '0.00');
          this.$set(this.tableP[13], 'money' + this.arr[i], (Number(this.tableP[6]['money' + this.arr[i]]) + Number(this.tableP[11]['money' + this.arr[i]])).toFixed(2));
          //设备投资赏却合计
          debugger;
          // if (this.assets1.length > 0) {
          // this.$set(this.tableP[14], 'money' + this.arr[i], (Number(this.assets1[0]['money' + this.arr[i]] || 0)).toFixed(2));
          this.$set(this.tableP[14], 'money' + this.arr[i], Number(_assets1['money' + this.arr[i]] || 0).toFixed(3));
          // } else {
          //   this.$set(this.tableP[14], 'money' + this.arr[i], '0.00');
          // }
          //软件资产赏却合计
          // if (this.assets2.length > 0) {
          //   this.$set(this.tableP[15], 'money' + this.arr[i], (Number(this.assets2[0]['money' + this.arr[i]] || 0)).toFixed(2));
            this.$set(this.tableP[15], 'money' + this.arr[i], Number(_assets2['money' + this.arr[i]] || 0).toFixed(3));
          // } else {
          //   this.$set(this.tableP[15], 'money' + this.arr[i], '0.00');
          // }
          //オフィス家賃1
          this.$set(this.tableP[16], 'money' + this.arr[i], Number(tableOTotal1['money' + this.arr[i]] || 0).toFixed(2));
          //リース費1
          this.$set(this.tableP[17], 'money' + this.arr[i], Number(tableOTotal3['money' + this.arr[i]] || 0).toFixed(2));
          //出向者賃借料1
          this.$set(this.tableP[18], 'money' + this.arr[i], Number(tableOtotal9['money' + this.arr[i]] || 0).toFixed(2));
          //その他(固定費)1
          this.$set(this.tableP[19], 'money' + this.arr[i], Number(tableOtotal8['money' + this.arr[i]] || 0).toFixed(2));
          //固定資産費用小計
          this.$set(this.tableP[20], 'money' + this.arr[i], (Number(this.tableP[14]['money' + this.arr[i]]) + Number(this.tableP[15]['money' + this.arr[i]]) + Number(this.tableP[16]['money' + this.arr[i]]) + Number(this.tableP[17]['money' + this.arr[i]]) + Number(this.tableP[18]['money' + this.arr[i]]) + Number(this.tableP[19]['money' + this.arr[i]])).toFixed(2));
          //研究材料費1
          if (this.sumC1.length > 0) {
            if (i <= 5) {
              this.$set(this.tableP[21], 'money' + this.arr[i], Number(Number(this.sumC1[1 + i] || 0)+Number(tableOTotal2['money' + this.arr[i]] || 0)).toFixed(2));
            } else {
              this.$set(this.tableP[21], 'money' + this.arr[i], Number(Number(this.sumC1[3 + i] || 0)+Number(tableOTotal2['money' + this.arr[i]] || 0)).toFixed(2));
            }
          } else {
            this.$set(this.tableP[21], 'money' + this.arr[i], Number(tableOTotal2['money' + this.arr[i]] || 0).toFixed(2));
          }
          //調査費
          this.$set(this.tableP[22], 'money' + this.arr[i], '0.00');
          //内部委託支出
          if (this.sumB3.length > 0) {
            if (i <= 5) {
              this.$set(this.tableP[23], 'money' + this.arr[i], Number(this.sumB3[2 + 2 * i] || 0).toFixed(2));
            } else {
              this.$set(this.tableP[23], 'money' + this.arr[i], Number(this.sumB3[4 + 2 * i] || 0).toFixed(2));
            }
          } else {
            this.$set(this.tableP[23], 'money' + this.arr[i], '0.00');
          }
          //外注費
          if (this.sumB1.length > 0 && this.sumB2.length > 0) {
            if (i <= 5) {
              this.$set(this.tableP[24], 'money' + this.arr[i], (Number(this.sumB1[2 + 2 * i] || 0) + Number(this.sumB2[2 + 2 * i] || 0) + Number(_sumB['money' + this.arr[i]] || 0)).toFixed(2));
            } else {
              this.$set(this.tableP[24], 'money' + this.arr[i], (Number(this.sumB1[4 + 2 * i] || 0) + Number(this.sumB2[4 + 2 * i] || 0) + Number(_sumB['money' + this.arr[i]] || 0)).toFixed(2));
            }
          } else {
            this.$set(this.tableP[24], 'money' + this.arr[i], '0.00');
          }
          //その他(ソフト費)
          this.$set(this.tableP[25], 'money' + this.arr[i], '0.00');
          //研究開発費・ソフト費用小計
          this.$set(this.tableP[26], 'money' + this.arr[i], (Number(this.tableP[21]['money' + this.arr[i]]) + Number(this.tableP[22]['money' + this.arr[i]]) + Number(this.tableP[23]['money' + this.arr[i]]) + Number(this.tableP[24]['money' + this.arr[i]]) + Number(this.tableP[25]['money' + this.arr[i]])).toFixed(2));
          //管理・共通部門配賦
          this.$set(this.tableP[27], 'money' + this.arr[i], (Number(getDictionaryInfo('PJ110001').value2) || 0 * Number(this.tableP[52]['money' + this.arr[i]]) || 0 + Number(getDictionaryInfo('PJ110002').value2) || 0 * Number(this.tableP[53]['money' + this.arr[i]]) || 0 + Number(getDictionaryInfo('PJ110003').value2) || 0 * Number(this.tableP[54]['money' + this.arr[i]]) || 0).toFixed(2));
           //振替１
          this.$set(this.tableP[28], 'money' + this.arr[i], '0.00');
          //振替2
          this.$set(this.tableP[29], 'money' + this.arr[i], '0.00');
          //配賦部門費小計
          this.$set(this.tableP[30], 'money' + this.arr[i], this.tableP[27]['money' + this.arr[i]]);
          //原動費1
          this.$set(this.tableP[31], 'money' + this.arr[i], Number(tableOTotal4['money' + this.arr[i]] || 0).toFixed(3));
          //旅費交通費1
          this.$set(this.tableP[32], 'money' + this.arr[i], Number(_travel['money' + this.arr[i]] || 0).toFixed(3));
          //通信費1
          this.$set(this.tableP[33], 'money' + this.arr[i], Number(_tableO3['money' + this.arr[i]] || 0).toFixed(3));
          //消耗品費1
          this.$set(this.tableP[34], 'money' + this.arr[i], Number(tableOtotal6['money' + this.arr[i]] || 0).toFixed(3));
          //会議費/交際費/研修費1
          this.$set(this.tableP[35], 'money' + this.arr[i], Number(_tableO1['money' + this.arr[i]] || 0).toFixed(3));
          //共同事務費1
          this.$set(this.tableP[36], 'money' + this.arr[i], Number(tableOTotal['money' + this.arr[i]] || 0).toFixed(3));
          //ブランド使用料1
          this.$set(this.tableP[37], 'money' + this.arr[i], Number(tableOtotal10['money' + this.arr[i]] || 0).toFixed(3));
          //その他経費1
          this.$set(this.tableP[38], 'money' + this.arr[i], Number(_tableO2['money' + this.arr[i]] || 0).toFixed(3));

          ['money', 'actual'].forEach(
            val => {
              //仕掛品
              this.$set(this.tableP[39], val + this.arr[i], (0 - Number(this.tableP[13][val + this.arr[i]]) - Number(this.tableP[20][val + this.arr[i]]) - Number(this.tableP[26][val + this.arr[i]]) -(Number(this.tableP[31][val + this.arr[i]]) + Number(this.tableP[32][val + this.arr[i]]) +
                Number(this.tableP[33][val + this.arr[i]]) + Number(this.tableP[34][val + this.arr[i]]) + Number(this.tableP[35][val + this.arr[i]]) + Number(this.tableP[36][val + this.arr[i]]) + Number(this.tableP[37][val + this.arr[i]]) + Number(this.tableP[38][val + this.arr[i]])) + Number(this.tableP[5][val + this.arr[i]]) * 0.75).toFixed(2));

              //その他諸経費小計
              this.$set(this.tableP[41], val + this.arr[i], (Number(this.tableP[31][val + this.arr[i]]) + Number(this.tableP[32][val + this.arr[i]]) +
                Number(this.tableP[33][val + this.arr[i]]) + Number(this.tableP[34][val + this.arr[i]]) + Number(this.tableP[35][val + this.arr[i]]) + Number(this.tableP[36][val + this.arr[i]]) + Number(this.tableP[37][val + this.arr[i]]) + Number(this.tableP[38][val + this.arr[i]]) + Number(this.tableP[39][val + this.arr[i]]) + Number(this.tableP[40][val + this.arr[i]] || 0)).toFixed(2));
              //总计
              this.$set(this.tableP[42], val + this.arr[i], (Number(this.tableP[13][val + this.arr[i]]) + Number(this.tableP[20][val + this.arr[i]]) + Number(this.tableP[26][val + this.arr[i]]) + Number(this.tableP[30][val + this.arr[i]]) + Number(this.tableP[41][val + this.arr[i]])).toFixed(2)); //合计

              //営業利益
              this.$set(this.tableP[43], val + this.arr[i], (Number(this.tableP[5][val + this.arr[i]]) - Number(this.tableP[42][val + this.arr[i]])).toFixed(2));
              //営業外損益
              this.$set(this.tableP[46], val + this.arr[i], (Number(this.tableP[44][val + this.arr[i]] || 0) + Number(this.tableP[45][val + this.arr[i]] || 0)).toFixed(2));
              //税引前利益
              this.$set(this.tableP[47], val + this.arr[i], (Number(this.tableP[43][val + this.arr[i]] || 0) - Number(this.tableP[46][val + this.arr[i]] || 0)).toFixed(2));
              //税引後利益
              this.$set(this.tableP[49], val + this.arr[i], (Number(this.tableP[47][val + this.arr[i]]) - Number(this.tableP[48][val + this.arr[i]] || 0)).toFixed(2));
              //add
              //界线利益率
              if (Number(this.tableP[5][val + this.arr[i]] || 0) > 0) {
                this.$set(this.tableP[51], val + this.arr[i], ((Number(this.tableP[5][val + this.arr[i]] || 0) - Number(this.tableP[13][val + this.arr[i]] || 0) - Number(this.tableP[24][val + this.arr[i]] || 0) - Number(this.tableP[32][val + this.arr[i]] || 0) - Number(this.tableP[21][val + this.arr[i]] || 0)) / (Number(this.tableP[5][val + this.arr[i]] || 0))).toFixed(2));
              } else {
                this.$set(this.tableP[51], val + this.arr[i], '0.00');
              }
              //add
              //稼働率(%)
              // 外注PJ稼働率
              if (Number(this.tableP[52][val + this.arr[i]] || 0) + Number(this.tableP[53][val + this.arr[i]] || 0) > 0) {
                this.$set(this.tableP[59], val + this.arr[i], Math.round(Number(this.tableP[55][val + this.arr[i]] || 0) / Number((Number(this.tableP[52][val + this.arr[i]] || 0) + Number(this.tableP[53][val + this.arr[i]] || 0)) || 1) * 100) + '%');
              } else {
                this.$set(this.tableP[59], val + this.arr[i], '0%');
              }
              // 外注稼働率
              if (Number(this.tableP[52][val + this.arr[i]] || 0) + Number(this.tableP[53][val + this.arr[i]] || 0) > 0) {
                this.$set(this.tableP[60], val + this.arr[i], Math.round(Number(this.tableP[56][val + this.arr[i]] || 0) / Number((Number(this.tableP[52][val + this.arr[i]] || 0) + Number(this.tableP[53][val + this.arr[i]] || 0)) || 1) * 100) + '%');
              } else {
                this.$set(this.tableP[60], val + this.arr[i], '0%');
              }
              //社員PJ稼働率
              if (Number(this.tableP[54][val + this.arr[i]] || 0) > 0) {
                this.$set(this.tableP[61], val + this.arr[i], Math.round(Number(this.tableP[57][val + this.arr[i]] || 0) / Number(this.tableP[54][val + this.arr[i]] || 1) * 100) + '%');
              } else {
                this.$set(this.tableP[61], val + this.arr[i], '0%');
              }
              // 社員稼働率
              if (Number(this.tableP[54][val + this.arr[i]] || 0) > 0) {
                this.$set(this.tableP[62], val + this.arr[i], Math.round(Number(this.tableP[58][val + this.arr[i]] || 0) / Number(this.tableP[54][val + this.arr[i]] || 1) * 100) + '%');
              } else {
                this.$set(this.tableP[62], val + this.arr[i], '0%');
              }
              //全員PJ稼働率
              if (Number(this.tableP[52][val + this.arr[i]] || 0) + Number(this.tableP[53][val + this.arr[i]] || 0) + Number(this.tableP[54][val + this.arr[i]] || 0) > 0) {
                this.$set(this.tableP[63], val + this.arr[i], Math.round((Number(this.tableP[55][val + this.arr[i]] || 0) + Number(this.tableP[57][val + this.arr[i]] || 0)) / Number((Number(this.tableP[52][val + this.arr[i]] || 0) + Number(this.tableP[53][val + this.arr[i]] || 0) + Number(this.tableP[54][val + this.arr[i]] || 0)) || 1) * 100) + '%');
              } else {
                this.$set(this.tableP[63], val + this.arr[i], '0%');
              }
              //全員稼働率
              if (Number(this.tableP[52][val + this.arr[i]] || 0) + Number(this.tableP[53][val + this.arr[i]] || 0) + Number(this.tableP[54][val + this.arr[i]] || 0) > 0) {
                this.$set(this.tableP[64], val + this.arr[i], Math.round((Number(this.tableP[58][val + this.arr[i]] || 0) + Number(this.tableP[56][val + this.arr[i]] || 0)) / Number((Number(this.tableP[52][val + this.arr[i]] || 0) + Number(this.tableP[53][val + this.arr[i]] || 0) + Number(this.tableP[54][val + this.arr[i]] || 0)) || 1) * 100) + '%');
              } else {
                this.$set(this.tableP[64], val + this.arr[i], '0%');
              }
            },
          );
        }
        if ((Number(this.tableP[5]['money4']) + Number(this.tableP[5]['money5']) + Number(this.tableP[5]['money6'])) !== 0) {
          this.$set(this.tableP[50], 'money6', ((Number(this.tableP[43]['money4']) + Number(this.tableP[43]['money5']) + Number(this.tableP[43]['money6'])) / (Number(this.tableP[5]['money4']) + Number(this.tableP[5]['money5']) + Number(this.tableP[5]['money6']))).toFixed(2));
        } else {
          this.$set(this.tableP[50], 'money6', '0.00');
        }
        if ((Number(this.tableP[5]['money7']) + Number(this.tableP[5]['money8']) + Number(this.tableP[5]['money9'])) !== 0) {
          this.$set(this.tableP[50], 'money9', ((Number(this.tableP[43]['money7']) + Number(this.tableP[43]['money8']) + Number(this.tableP[43]['money9'])) / (Number(this.tableP[5]['money7']) + Number(this.tableP[5]['money8']) + Number(this.tableP[5]['money9']))).toFixed(2));
        } else {
          this.$set(this.tableP[50], 'money9', '0.00');
        }
        if ((Number(this.tableP[5]['money10']) + Number(this.tableP[5]['money11']) + Number(this.tableP[5]['money12'])) !== 0) {
          this.$set(this.tableP[50], 'money12', ((Number(this.tableP[43]['money10']) + Number(this.tableP[43]['money11']) + Number(this.tableP[43]['money12'])) / (Number(this.tableP[5]['money10']) + Number(this.tableP[5]['money11']) + Number(this.tableP[5]['money12']))).toFixed(2));
        } else {
          this.$set(this.tableP[50], 'money12', '0.00');
        }
        if ((Number(this.tableP[5]['money1']) + Number(this.tableP[5]['money2']) + Number(this.tableP[5]['money3'])) !== 0) {
          this.$set(this.tableP[50], 'money3', ((Number(this.tableP[43]['money1']) + Number(this.tableP[43]['money2']) + Number(this.tableP[43]['money3'])) / (Number(this.tableP[5]['money1']) + Number(this.tableP[5]['money2']) + Number(this.tableP[5]['money3']))).toFixed(2));
        } else {
          this.$set(this.tableP[50], 'money3', '0.00');
        }
        this.loading = false;

      },
      computedSumsave() {
        this.loading = true;
        for (let i = 0; i < this.arr.length; i++) {
            //region  社員（名）
            if (this.tableA.length > 0) {
              if (this.tableP[54]['money' + this.arr[i]] === undefined || this.tableP[54]['money' + this.arr[i]] === '0.00' || this.tableP[54]['money' + this.arr[i]] === 0) {
                this.$set(this.tableP[54], 'money' + this.arr[i], Number(this.tableA[0]['amount' + this.arr[i]] || 0).toFixed(2));
              }
              this.$set(this.tableP[6], 'money' + this.arr[i], (Number(this.tableA[0]['giving' + this.arr[i]]) / 1000).toFixed(2));
            } else {
              this.$set(this.tableP[54], 'money' + this.arr[i], '0.00');
              this.$set(this.tableP[6], 'money' + this.arr[i], '0.00');
            }
            //外注PJ工数
            if (this.tableP[55]['money' + this.arr[i]] === undefined || this.tableP[55]['money' + this.arr[i]] === '0.00' || this.tableP[55]['money' + this.arr[i]] === 0) {
              if (this.sumB1.length > 0 && this.sumB2.length > 0) {
                if (i <= 5) {
                  this.$set(this.tableP[55], 'money' + this.arr[i], Number(Number(this.sumB1[1+2*i] || 0) + Number(this.sumB2[1+2*i] || 0)).toFixed(2));
                } else {
                  this.$set(this.tableP[55], 'money' + this.arr[i], Number(Number(this.sumB1[3+2*i] || 0) + Number(this.sumB2[3+2*i] || 0)).toFixed(2));
                }
              } else {
                this.$set(this.tableP[55], 'money' + this.arr[i], '0.00');
              }
            }
            //外注稼働工数
            if (this.tableP[56]['money' + this.arr[i]] === undefined || this.tableP[56]['money' + this.arr[i]] === '0.00' || this.tableP[56]['money' + this.arr[i]] === 0) {
              if (this.sumB1.length > 0 && this.sumB2.length > 0) {
                if (i <= 5) {
                  this.$set(this.tableP[56], 'money' + this.arr[i], Number(Number(this.sumB1[1+2*i] || 0) + Number(this.sumB2[1+2*i] || 0)).toFixed(2));
                } else {
                  this.$set(this.tableP[56], 'money' + this.arr[i], Number(Number(this.sumB1[3+2*i] || 0) + Number(this.sumB2[3+2*i] || 0)).toFixed(2));
                }
              } else {
                this.$set(this.tableP[56], 'money' + this.arr[i], '0.00');
              }
            }
            //社員PJ工数
            if (this.tableP[57]['money' + this.arr[i]] === undefined || this.tableP[57]['money' + this.arr[i]] === '0.00' || this.tableP[57]['money' + this.arr[i]] === 0) {
              this.$set(this.tableP[57], 'money' + this.arr[i], '0.00');
            }
            //社員稼働工数
            if (this.tableP[58]['money' + this.arr[i]] === undefined || this.tableP[58]['money' + this.arr[i]] === '0.00' || this.tableP[58]['money' + this.arr[i]] === 0) {
              this.$set(this.tableP[58], 'money' + this.arr[i], '0.00');
            }
            //その他利益
            if (this.tableP[40]['money' + this.arr[i]] === undefined || this.tableP[40]['money' + this.arr[i]] === '0.00' || this.tableP[40]['money' + this.arr[i]] === 0) {
              this.$set(this.tableP[40], 'money' + this.arr[i], '0.00');
            }
            //金利（損--マイナス）
            if (this.tableP[44]['money' + this.arr[i]] === undefined || this.tableP[44]['money' + this.arr[i]] === '0.00' || this.tableP[44]['money' + this.arr[i]] === 0) {
              this.$set(this.tableP[44], 'money' + this.arr[i], '0.00');
            }
            //為替（損--マイナス）
            if (this.tableP[45]['money' + this.arr[i]] === undefined || this.tableP[45]['money' + this.arr[i]] === '0.00' || this.tableP[45]['money' + this.arr[i]] === 0) {
              this.$set(this.tableP[45], 'money' + this.arr[i], '0.00');
            }
            //税金引当金
            if (this.tableP[48]['money' + this.arr[i]] === undefined || this.tableP[48]['money' + this.arr[i]] === '0.00' || this.tableP[48]['money' + this.arr[i]] === 0) {
              this.$set(this.tableP[48], 'money' + this.arr[i], '0.00');
            }
            //構外外注(工数)
            if (this.gwperson.length > 0) {
              this.$set(this.tableP[52], 'money' + this.arr[i], this.gwperson[i] || 0).toFixed(2);
            }

            //構内外注（名）
            if (this.gnperson.length > 0) {
              this.$set(this.tableP[53], 'money' + this.arr[i], this.gnperson[i] || 0).toFixed(2);
            }
        }
        this.loading = false;
      },
      getTravel(val) {
        this.travel = val;
      },
      getSumA1(val) {
        this.sumA1 = val;
      },
      getSumB1(val) {
        this.sumB1 = val;
      },
      getSumB2(val) {
        this.sumB2 = val;
      },
      getSumB3(val) {
        this.sumB3 = val;
      },
      getSumC(val) {
        this.sumC1 = val;
      },
      Assetss(val) {
        this.assets2 = val;
      },
      Assets(val) {
        this.assets1 = val;
      },
      getSumA2(val) {
        this.sumA2 = val;
      },
      rowClass({row, rowIndex}) {
        if ([4, 5, 13, 20, 26, 30, 41].includes(rowIndex)) {
          return 'row3';
        } else if ([42].includes(rowIndex)) {
          return 'row2';
        }
      },
      objectSpanMethod({row, column, rowIndex, columnIndex}) {
        if (columnIndex === 0) {
          if (rowIndex === 0) {
            return {
              rowspan: 6,
              colspan: 1,
            };
          } else if (rowIndex === 6) {
            return {
              rowspan: 37,
              colspan: 1,
            };
          } else if ([43, 47, 48, 49, 50, 51].includes(rowIndex)) {
            return {
              rowspan: 1,
              colspan: 2,
            };
          } else if ([44, 45, 46].includes(rowIndex)) {
            return {
              rowspan: 1,
              colspan: 1,
            };
          } else if (rowIndex === 52) {
            return {
              rowspan: 3,
              colspan: 1,
            };
          } else if (rowIndex === 55) {
            return {
              rowspan: 4,
              colspan: 1,
            };
          } else if (rowIndex === 59) {
            return {
              rowspan: 6,
              colspan: 1,
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0,
            };
          }
        } else if (columnIndex === 1) {
          if ([43, 47, 48, 49, 50, 51].includes(rowIndex)) {
            return {
              rowspan: 0,
              colspan: 0,
            };
          }
        }
      },
      formatterDir(row, column, cellValue, index) {
        if (column.property === 'name') {
          if ([0, 1, 2, 3, 4, 5].includes(index)) {
            return this.$t('label.PFANS1036FORMVIEW_TAB1VALUE1');
          } else if (index === 6) {
            return this.$t('label.PFANS1036FORMVIEW_TAB2VALUE1');
          } else if (index === 43) {
            return this.$t('label.PFANS1036FORMVIEW_TAB3VALUE1');
          } else if (index === 47) {
            return this.$t('label.PFANS1036FORMVIEW_TAB4VALUE1');
          } else if (index === 48) {
            return this.$t('label.PFANS1036FORMVIEW_TAB5VALUE1');
          } else if (index === 49) {
            return this.$t('label.PFANS1036FORMVIEW_TAB6VALUE1');
          } else if (index === 50) {
            return this.$t('label.PFANS1036FORMVIEW_TAB7VALUE1');
          } else if (index === 51) {
            return this.$t('label.PFANS1036FORMVIEW_TAB7VALUE2');
          } else if (index === 52) {
            return this.$t('label.PFANS1036FORMVIEW_TAB8VALUE1');
          } else if (index === 55) {
            return this.$t('label.PFANS1036FORMVIEW_TAB9VALUE1');
          } else if (index === 59) {
            return this.$t('label.PFANS1036FORMVIEW_TAB10VALUE1');
          }
        } else if (column.property === 'name1') {
          if (getDictionaryInfo(row[column.property])) {
            return getDictionaryInfo(row[column.property]).value1;
          } else {
            return row[column.property];
          }
        }
      },
      getgroupA2(id) {
        let parameter = {
          year: this.form.year,
          type: 1,
          groupid: id,
        };
        this.$store
          .dispatch('PFANS1036Store/getgroup', parameter)
          .then(response => {
            this.groupA2 = response;
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
          });
      },
      getgroupB1(id) {
        let parameter = {
          year: this.form.year,
          type: 2,
          groupid: id,
        };
        this.$store
          .dispatch('PFANS1036Store/getgroup', parameter)
          .then(response => {
            this.groupB1 = response;
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
          });
      },
      getgroupB2(id) {
        let parameter = {
          year: this.form.year,
          type: 3,
          groupid: id,
        };
        this.$store
          .dispatch('PFANS1036Store/getgroup', parameter)
          .then(response => {
            this.groupB2 = response;
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
          });
      },
      getgroupB3(id) {
        let parameter = {
          year: this.form.year,
          type: 4,
          groupid: id,
        };
        this.$store
          .dispatch('PFANS1036Store/getgroup', parameter)
          .then(response => {
            this.groupB3 = response;
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
          });
      },
      getgroupA1(id) {
        let parameter = {
          year: this.form.year,
          groupid: id,
        };
        this.$store
          .dispatch('PFANS1036Store/getgroupA1', parameter)
          .then(response => {
            this.groupA1 = response;
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
          });
      },
      formatterColumn(row, column, cellValue, index) {
        if (column.property === 'total1') {
          if (index === 0) {
            return this.$t('label.PFANS1036FORMVIEW_SUBTOTAL');
          } else if (index === 1) {
            return this.$t('label.PFANS1036FORMVIEW_SUBTOTALTHOUSAND');
          }
        }
        if (column.property === 'total5') {
          if (index === 0) {
            return this.$t('label.PFANS1036FORMVIEW_A1');
          } else if (index === 1) {
            return this.$t('label.PFANS1036FORMVIEW_A2');
          } else if (index === 2) {
            return this.$t('label.PFANS1036FORMVIEW_B1');
          } else if (index === 3) {
            return this.$t('label.PFANS1036FORMVIEW_B2');
          } else if (index === 4) {
            return this.$t('label.PFANS1036FORMVIEW_B3');
          } else if (index === 5) {
            return this.$t('label.PFANS1036FORMVIEW_B4');
          }
        }
        if (column.property === 'type') {
          if (index === 0) {
            return this.$t('label.PFANSUSERVIEW_MEMBERS');
          }
        } else if (column.property === 'level') {
          if (row.code === 'PR021013')
          {
            return 'R11B';
          }
          else if (row.code === 'PR021012')
          {
            return 'R11A';
          }
          else if (row.code === 'PR021011')
          {
            return 'R10';
          }
          else if (row.code === 'PR021010')
          {
            return 'R9B';
          }
          else if (row.code === 'PR021009')
          {
            return 'R9A';
          }
          else if (row.code === 'PR021008')
          {
            return 'R8A';
          }
          else if (row.code === 'PR021007')
          {
            return 'R8B';
          }
          else if (row.code === 'PR021006')
          {
            return 'R8C';
          }
          else if (row.code === 'PR021005')
          {
            return 'R7';
          }
          else if (row.code === 'PR021004')
          {
            return 'R6';
          }
          else if (row.code === 'PR021003')
          {
            return 'R5';
          }
          else if (row.code === 'PR021002')
          {
            return 'R4';
          }
          else if (row.code === 'PR021001')
          {
            return 'R3';
          }
        }
      },
      getPrecent(param) {
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = this.$t('label.PFANS1036FORMVIEW_STOTAL');
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return (prev + curr) / 1000;
              } else {
                return prev / 1000;
              }
            }, 0);
          } else {
            sums[index] = '';
          }
        });
        this.personTable = sums;
        return sums;
      },
      getSummaries(param, table) {
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = this.$t('label.PFANS1036FORMVIEW_TOTAL');
            return;
          } else if ([1, 2, 3, 4, 5].includes(index) && ['C', 'D'].includes(table)) {
            sums[index] = '-';
            return;
          } else if ([1, 2, 3].includes(index) && ['o1', 'o2', 'o3', 'o4'].includes(table)) {
            sums[index] = '-';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
                // update gbb 20210311 PSDCD_PFANS_20210225_BUG_022 保留三位小数 start
              if (!isNaN(value)) {
                return Math.round((prev + curr) * 1000) / 1000;
              } else {
                return Math.round(prev * 1000) / 1000;
              }
                // update gbb 20210311 PSDCD_PFANS_20210225_BUG_022 保留三位小数 end
            }, 0);
          } else {
            sums[index] = '';
          }
        });
        return sums;
      },
      getUserids(val) {
        this.userlist = val;
        this.form.user_id = val;
        let rst = getOrgInfoByUserId(val);
        this.form.center_id = rst.centerNmae;
        this.form.groupid = rst.groupNmae;
        this.form.teamid = rst.teamNmae;
        if (!this.form.user_id || this.form.user_id === '' || typeof val == 'undefined') {
          this.error = this.$t('normal.error_08') + this.$t('label.applicant');
        } else {
          this.error = '';
        }
      },
      //add lsg 20210601 获取月份金额 start
      changeSum2(scope, index){
        if(index >= 4 && index <= 9){
          scope.moneyfirst = (Number(scope.money4 || 0) + Number(scope.money5 || 0) + Number(scope.money6 || 0) + Number(scope.money7 || 0) + Number(scope.money8 || 0) + Number(scope.money9 || 0)).toFixed(3);
        }
        else if ((index >= 10 && index <= 12) || (index >= 1 && index <= 3)) {
          scope.moneysecond = (Number(scope.money10 || 0) + Number(scope.money11 || 0) + Number(scope.money12 || 0) + Number(scope.money1 || 0) + Number(scope.money2 || 0) + Number(scope.money3 || 0)).toFixed(3);
        }
        scope.moneyfirst = (Number(scope.money4 || 0) + Number(scope.money5 || 0)
          + Number(scope.money6 || 0) + Number(scope.money7 || 0)
          + Number(scope.money8 || 0) + Number(scope.money9 || 0)).toFixed(3);
        scope.moneysecond = (Number(scope.money10 || 0) +
          Number(scope.money11 || 0) + Number(scope.money12 || 0)
          + Number(scope.money1 || 0) + Number(scope.money2 || 0)
          + Number(scope.money3 || 0)).toFixed(3);
        scope.moneytotal = (Number(scope.moneyfirst || 0) + Number(scope.moneysecond || 0)).toFixed(3);
      },
      //add lsg 20210601 获取月份金额 end
      changeSum(scope, index) {
      if (scope.price > 0) {
         scope['money' + index] = (scope.price * scope['number' + index] / 1000).toFixed(3);
          if (index >= 4 && index <= 9) {
            scope.numberfirst = ((scope.number4 || 0) + (scope.number5 || 0) + (scope.number6 || 0) + (scope.number7 || 0) + (scope.number8 || 0) + (scope.number9 || 0)).toFixed(1);
            scope.moneyfirst = (Number(scope.money4 || 0) + Number(scope.money5 || 0) + Number(scope.money6 || 0) + Number(scope.money7 || 0) + Number(scope.money8 || 0) + Number(scope.money9 || 0)).toFixed(3);
          } else if ((index >= 10 && index <= 12) || (index >= 1 && index <= 3)) {
            scope.numbersecond = ((scope.number10 || 0) + (scope.number11 || 0) + (scope.number12 || 0) + (scope.number1 || 0) + (scope.number2 || 0) + (scope.number3 || 0)).toFixed(1);
            scope.moneysecond = (Number(scope.money10 || 0) + Number(scope.money11 || 0) + Number(scope.money12 || 0) + Number(scope.money1 || 0) + Number(scope.money2 || 0) + Number(scope.money3 || 0)).toFixed(3);
          } else {
            for (let par in scope) {
              if (par.substring(0, 5) === 'money') {
                scope[par] = ((scope.price * scope['number' + (par.length > 6 ? par.slice(par.length - 2) : par.slice(par.length - 1))]) / 1000).toFixed(3);
              }
            }
            scope.numberfirst = ((scope.number4 || 0) + (scope.number5 || 0) + (scope.number6 || 0) + (scope.number7 || 0) + (scope.number8 || 0) + (scope.number9 || 0)).toFixed(1);
            scope.moneyfirst = (Number(scope.money4 || 0) + Number(scope.money5 || 0) + Number(scope.money6 || 0) + Number(scope.money7 || 0) + Number(scope.money8 || 0) + Number(scope.money9 || 0)).toFixed(3);
            scope.numbersecond = ((scope.number10 || 0) + (scope.number11 || 0) + (scope.number12 || 0) + (scope.number1 || 0) + (scope.number2 || 0) + (scope.number3 || 0)).toFixed(1);
            scope.moneysecond = (Number(scope.money10 || 0) + Number(scope.money11 || 0) + Number(scope.money12 || 0) + Number(scope.money1 || 0) + Number(scope.money2 || 0) + Number(scope.money3 || 0)).toFixed(3);
          }
          scope.numbertotal = (Number(scope.numberfirst || 0) + Number(scope.numbersecond || 0)).toFixed(1);
          scope.moneytotal = (Number(scope.moneyfirst || 0) + Number(scope.moneysecond || 0)).toFixed(3);
       }

      },
      addRow1() {
        this.tableO1.push({});
      },
      addRow2() {
        this.tableO2.push({});
      },
      addRow3() {
        this.tableO3.push({});
      },
      addRow4() {
        this.tableO.push({});
      },
      deleteRow(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        }
      },
      changeType(val, row) {
        row.type = val;
      },
      buttonClick(val) {
        if (val === 'back') {
          this.$router.push({
            name: 'PFANS1036View',
            params: {},
          });
        }
        this.$refs['form'].validate(valid => {
            if (valid) {
        if (val === 'save') {
          this.loading = true;
          this.form.equipment_newyear = JSON.stringify(this.equipment_newyear);
          this.form.equipment_lastyear = JSON.stringify(this.equipment_lastyear);
          this.form.equipment_lodyear = JSON.stringify(this.equipment_lodyear);
          this.form.assets_newyear = JSON.stringify(this.assets_newyear);
          this.form.assets_lastyear = JSON.stringify(this.assets_lastyear);
          this.form.assets_lodyear = JSON.stringify(this.assets_lodyear);
          this.tablePall = [];
          this.computedSumsave();
          this.tablePall.push(this.tableP[40]);
          this.tablePall.push(this.tableP[44]);
          this.tablePall.push(this.tableP[45]);
          this.tablePall.push(this.tableP[48]);
          this.tablePall.push(this.tableP[54]);
          this.tablePall.push(this.tableP[55]);
          this.tablePall.push(this.tableP[56]);
          this.tablePall.push(this.tableP[57]);
          this.tablePall.push(this.tableP[58]);
          this.tablePall.push(this.tableP[52]);
          this.tablePall.push(this.tableP[53]);
          this.form.tableP = JSON.stringify(this.tablePall);
          // this.form.tableP = JSON.stringify([this.tableP[40], this.tableP[44], this.tableP[45], this.tableP[48], this.tableP[55], this.tableP[56], this.tableP[57], this.tableP[58]]);
          // this.form.tableP = JSON.stringify([this.tableP[40], this.tableP[44], this.tableP[45], this.tableP[48], this.tableP[54], this.tableP[55], this.tableP[56], this.tableP[57]]);
          this.form.business = JSON.stringify(this.business);
          this.form.groupA1 = JSON.stringify(this.groupA1);
          this.form.groupA2 = JSON.stringify(this.groupA2);
          this.form.groupB1 = JSON.stringify(this.groupB1);
          this.form.groupB2 = JSON.stringify(this.groupB2);
          this.form.groupB3 = JSON.stringify(this.groupB3);
          this.form.groupC = JSON.stringify(this.groupC);
          this.form.tableO1 = JSON.stringify(this.tableO1);
          this.form.tableO2 = JSON.stringify(this.tableO2);
          this.form.tableO3 = JSON.stringify(this.tableO3);
          this.form.tableO = JSON.stringify(this.tableO);
          this.form.tableC = JSON.stringify(this.tableC);
          this.form.tableD = JSON.stringify(this.tableD);

          if (this.tableC.length > 0 || this.tableD.length > 0)
          {
            this.tableA[0].workinghour4 = 0;
            this.tableA[0].pay4 = 0;
            this.tableA[0].workinghour5 = 0;
            this.tableA[0].pay5 = 0;
            this.tableA[0].workinghour6 = 0;
            this.tableA[0].pay6 = 0;
            this.tableA[0].workinghour7 = 0;
            this.tableA[0].pay7 = 0;
            this.tableA[0].workinghour8 = 0;
            this.tableA[0].pay8 = 0;
            this.tableA[0].workinghour9 = 0;
            this.tableA[0].pay9 = 0;
            this.tableA[0].workinghourfirst = 0;
            this.tableA[0].payfirst = 0;
            this.tableA[0].workinghour10 = 0;
            this.tableA[0].pay10 = 0;
            this.tableA[0].workinghour11 = 0;
            this.tableA[0].pay11 = 0;
            this.tableA[0].workinghour12 = 0;
            this.tableA[0].pay12 = 0;
            this.tableA[0].workinghour1 = 0;
            this.tableA[0].pay1 = 0;
            this.tableA[0].workinghour2 = 0;
            this.tableA[0].pay2 = 0;
            this.tableA[0].workinghour3 = 0;
            this.tableA[0].pay3 = 0;
            this.tableA[0].workinghoursecond = 0;
            this.tableA[0].paysecond = 0;
            this.tableA[0].workinghourtotal = 0;
            this.tableA[0].paytotal = 0;
          }
          for (let i=0;i < this.tableC.length;i++)
          {
            this.tableA[0].workinghour4 = this.tableA[0].workinghour4 + this.tableC[i].workinghour4;
            this.tableA[0].pay4 = Number(Number(this.tableA[0].pay4) + Number(this.tableC[i].pay4)).toFixed(2);
            this.tableA[0].workinghour5 = this.tableA[0].workinghour5 + this.tableC[i].workinghour5;
            this.tableA[0].pay5 = Number(Number(this.tableA[0].pay5) + Number(this.tableC[i].pay5)).toFixed(2);
            this.tableA[0].workinghour6 = this.tableA[0].workinghour6 + this.tableC[i].workinghour6;
            this.tableA[0].pay6 = Number(Number(this.tableA[0].pay6) + Number(this.tableC[i].pay6)).toFixed(2);
            this.tableA[0].workinghour7 = this.tableA[0].workinghour7 + this.tableC[i].workinghour7;
            this.tableA[0].pay7 = Number(Number(this.tableA[0].pay7) + Number(this.tableC[i].pay7)).toFixed(2);
            this.tableA[0].workinghour8 = this.tableA[0].workinghour8 + this.tableC[i].workinghour8;
            this.tableA[0].pay8 = Number(Number(this.tableA[0].pay8) + Number(this.tableC[i].pay8)).toFixed(2);
            this.tableA[0].workinghour9 = this.tableA[0].workinghour9 + this.tableC[i].workinghour9;
            this.tableA[0].pay9 = Number(Number(this.tableA[0].pay9) + Number(this.tableC[i].pay9)).toFixed(2);
            this.tableA[0].workinghourfirst = this.tableA[0].workinghourfirst + this.tableC[i].workinghourfirst;
            this.tableA[0].payfirst = Number(Number(this.tableA[0].payfirst) + Number(this.tableC[i].payfirst)).toFixed(2);
            this.tableA[0].workinghour10 = this.tableA[0].workinghour10 + this.tableC[i].workinghour10;
            this.tableA[0].pay10 = Number(Number(this.tableA[0].pay10) + Number(this.tableC[i].pay10)).toFixed(2);
            this.tableA[0].workinghour11 = this.tableA[0].workinghour11 + this.tableC[i].workinghour11;
            this.tableA[0].pay11 = Number(Number(this.tableA[0].pay11) + Number(this.tableC[i].pay11)).toFixed(2);
            this.tableA[0].workinghour12 = this.tableA[0].workinghour12 + this.tableC[i].workinghour12;
            this.tableA[0].pay12 = Number(Number(this.tableA[0].pay12) + Number(this.tableC[i].pay12)).toFixed(2);
            this.tableA[0].workinghour1 = this.tableA[0].workinghour1 + this.tableC[i].workinghour1;
            this.tableA[0].pay1 = Number(Number(this.tableA[0].pay1) + Number(this.tableC[i].pay1)).toFixed(2);
            this.tableA[0].workinghour2 = this.tableA[0].workinghour2 + this.tableC[i].workinghour2;
            this.tableA[0].pay2 = Number(Number(this.tableA[0].pay2) + Number(this.tableC[i].pay2)).toFixed(2);
            this.tableA[0].workinghour3 = this.tableA[0].workinghour3 + this.tableC[i].workinghour3;
            this.tableA[0].pay3 = Number(Number(this.tableA[0].pay3) + Number(this.tableC[i].pay3)).toFixed(2);
            this.tableA[0].workinghoursecond = this.tableA[0].workinghoursecond + this.tableC[i].workinghoursecond;
            this.tableA[0].paysecond = Number(Number(this.tableA[0].paysecond) + Number(this.tableC[i].paysecond)).toFixed(2);
            this.tableA[0].workinghourtotal = this.tableA[0].workinghourtotal + this.tableC[i].workinghourtotal;
            this.tableA[0].paytotal = Number(Number(this.tableA[0].paytotal) + Number(this.tableC[i].paytotal)).toFixed(2);
          }
          for (let i=0;i < this.tableD.length;i++)
          {
            this.tableA[0].workinghour4 = this.tableA[0].workinghour4 + this.tableD[i].workinghour4;
            this.tableA[0].pay4 = Number(Number(this.tableA[0].pay4) + Number(this.tableD[i].pay4)).toFixed(2);
            this.tableA[0].workinghour5 = this.tableA[0].workinghour5 + this.tableD[i].workinghour5;
            this.tableA[0].pay5 = Number(Number(this.tableA[0].pay5) + Number(this.tableD[i].pay5)).toFixed(2);
            this.tableA[0].workinghour6 = this.tableA[0].workinghour6 + this.tableD[i].workinghour6;
            this.tableA[0].pay6 = Number(Number(this.tableA[0].pay6) + Number(this.tableD[i].pay6)).toFixed(2);
            this.tableA[0].workinghour7 = this.tableA[0].workinghour7 + this.tableD[i].workinghour7;
            this.tableA[0].pay7 = Number(Number(this.tableA[0].pay7) + Number(this.tableD[i].pay7)).toFixed(2);
            this.tableA[0].workinghour8 = this.tableA[0].workinghour8 + this.tableD[i].workinghour8;
            this.tableA[0].pay8 = Number(Number(this.tableA[0].pay8) + Number(this.tableD[i].pay8)).toFixed(2);
            this.tableA[0].workinghour9 = this.tableA[0].workinghour9 + this.tableD[i].workinghour9;
            this.tableA[0].pay9 = Number(Number(this.tableA[0].pay9) + Number(this.tableD[i].pay9)).toFixed(2);
            this.tableA[0].workinghourfirst = this.tableA[0].workinghourfirst + this.tableD[i].workinghourfirst;
            this.tableA[0].payfirst = Number(Number(this.tableA[0].payfirst) + Number(this.tableD[i].payfirst)).toFixed(2);
            this.tableA[0].workinghour10 = this.tableA[0].workinghour10 + this.tableD[i].workinghour10;
            this.tableA[0].pay10 = Number(Number(this.tableA[0].pay10) + Number(this.tableD[i].pay10)).toFixed(2);
            this.tableA[0].workinghour11 = this.tableA[0].workinghour11 + this.tableD[i].workinghour11;
            this.tableA[0].pay11 = Number(Number(this.tableA[0].pay11) + Number(this.tableD[i].pay11)).toFixed(2);
            this.tableA[0].workinghour12 = this.tableA[0].workinghour12 + this.tableD[i].workinghour12;
            this.tableA[0].pay12 = Number(Number(this.tableA[0].pay12) + Number(this.tableD[i].pay12)).toFixed(2);
            this.tableA[0].workinghour1 = this.tableA[0].workinghour1 + this.tableD[i].workinghour1;
            this.tableA[0].pay1 = Number(Number(this.tableA[0].pay1) + Number(this.tableD[i].pay1)).toFixed(2);
            this.tableA[0].workinghour2 = this.tableA[0].workinghour2 + this.tableD[i].workinghour2;
            this.tableA[0].pay2 = Number(Number(this.tableA[0].pay2) + Number(this.tableD[i].pay2)).toFixed(2);
            this.tableA[0].workinghour3 = this.tableA[0].workinghour3 + this.tableD[i].workinghour3;
            this.tableA[0].pay3 = Number(Number(this.tableA[0].pay3) + Number(this.tableD[i].pay3)).toFixed(2);
            this.tableA[0].workinghoursecond = this.tableA[0].workinghoursecond + this.tableD[i].workinghoursecond;
            this.tableA[0].paysecond = Number(Number(this.tableA[0].paysecond) + Number(this.tableD[i].paysecond)).toFixed(2);
            this.tableA[0].workinghourtotal = this.tableA[0].workinghourtotal + this.tableD[i].workinghourtotal;
            this.tableA[0].paytotal = Number(Number(this.tableA[0].paytotal) + Number(this.tableD[i].paytotal)).toFixed(2);
          }

          this.form.tableA = JSON.stringify(this.tableA);


          if (this.$route.params._id) {
            this.$store
              .dispatch('PFANS1036Store/updateBusinessplan', this.form)
              .then(response => {
                this.data = response;
                this.loading = false;
                if (val !== 'update') {
                  Message({
                    message: this.$t('normal.success_02'),
                    type: 'success',
                    duration: 5 * 1000,
                  });
                  this.$router.push({
                    name: 'PFANS1036View',
                  });
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
              .dispatch('PFANS1036Store/createBusinessplan', this.form)
              .then(response => {
                this.data = response;
                this.loading = false;
                Message({
                  message: this.$t('normal.success_01'),
                  type: 'success',
                  duration: 5 * 1000,
                });
                this.$router.push({
                  name: 'PFANS1036View',
                });
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
            }else {
              this.loading = false;
              Message({
                message: this.$t('normal.error_12'),
                type: 'error',
                duration: 5 * 1000,
              });
            }
        })
      },
    },
    watch: {
      //region add_qhr_20210910 取消画面实时计算
      // wactValue: {
      //   handler(newValue, oldValue) {
      //     this.computedSum();
      //   },
      //   deep: true,
      //   immediate: true
      // },
      // tableO1: {
      //   handler(newValue, oldValue) {
      //     this.tableO1 = newValue;
      //   },
      //   deep: true,
      // },
      // tableO2: {
      //   handler(newValue, oldValue) {
      //     this.tableO2 = newValue;
      //   },
      //   deep: true,
      // },
      // tableO3: {
      //   handler(newValue, oldValue) {
      //     this.tableO3 = newValue;
      //   },
      //   deep: true,
      // },
      // tableO: {
      //   handler(newValue, oldValue) {
      //     this.tableO = newValue;
      //   },
      //   deep: true,
      // },
      // tableA: {
      //   handler(newValue, oldValue) {
      //     this.computedSum();
      //   },
      //   deep: true,
      // },
      // // tableB: {
      // //   handler(newValue, oldValue) {
      // //     this.computedSum();
      // //   },
      // //   deep: true,
      // // },
      // tableC: {
      //   handler(newValue, oldValue) {
      //     this.computedSum();
      //   },
      //   deep: true,
      // },
      // tableD: {
      //   handler(newValue, oldValue) {
      //     this.computedSum();
      //   },
      //   deep: true,
      // },
      //endregion add_qhr_20210910 取消画面实时计算
      assets1: {
        handler(newValue, oldValue) {
          if (this.$route.params._id)
          {
            this.computedSum();
          }
        },
        deep: true,
      },
      assets2: {
        handler(newValue, oldValue) {
          if (this.$route.params._id)
          {
            this.computedSum();
          }
        },
        deep: true,
      },
      travel: {
        handler(newValue, oldValue) {
          if (this.$route.params._id)
          {
            this.computedSum();
          }
        },
        deep: true,
      },
      // sumA1: {
      //   handler(newValue, oldValue) {
      //     this.computedSum();
      //   },
      //   deep: true,
      // },
      sumA2: {
        handler(newValue, oldValue) {
          if (this.$route.params._id)
          {
            this.computedSum();
          }
        },
        deep: true,
      },
      sumB1: {
        handler(newValue, oldValue) {
          if (this.$route.params._id)
          {
            this.computedSum();
          }
        },
        deep: true,
      },
      sumB2: {
        handler(newValue, oldValue) {
          if (this.$route.params._id)
          {
            this.computedSum();
          }
        },
        deep: true,
      },
      sumB3: {
        handler(newValue, oldValue) {
          if (this.$route.params._id)
          {
            this.computedSum();
          }
        },
        deep: true,
      },
      sumC1: {
        handler(newValue, oldValue) {
          if (this.$route.params._id)
          {
            this.computedSum();
          }
        },
        deep: true,
      },
    },
  };
</script>


<style rel="stylesheet/scss" lang="scss">

  .el-table .row1 {
    color: #6d9fd1;
  }

  .el-table .row2 {
    color: red;
  }

  .el-table .row3 {
    color: #7465ff;
  }

  .el-table {
    overflow-x: auto;
  }

  .el-table__header-wrapper,
  .el-table__body-wrapper,
  .el-table__footer-wrapper {

  }

  .el-table::after {
    //position: relative;
  }

  .el-table--scrollable-x .el-table__body-wrapper {

  }

  .tableClass {
    .el-table__fixed-right {
      height: 100% !important;
    }
  }


</style>
