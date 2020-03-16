<template>
  <div style="min-height: 100%">
    <EasyNormalContainer
      :buttonList="buttonList"
      :canStart="canStart"
      v-loading="loading"
      :title="title"
      @buttonClick="buttonClick"
      ref="container"
    >
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" employedref="refform"
                 style="padding: 2vw">
          <el-row v-show="false">
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1036FORMVIEW_CENTER')">
                <el-input :disabled="true" style="width:20vw" v-model="form.centerid"></el-input>
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
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_PERSONNELPLAN')" style="margin-top: 2%" name="first">
              <div>
                <el-tabs v-model="activeName2" type="border-card">
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_TOTAL')" name="first" >
                    <el-table :data="tableA" header-cell-class-name="sub_bg_color_blue"  stripe style="margin-top: 2%">
                      <el-table-column>
                        <el-table-column align="center" width="120" prop="total1" :formatter="formatterColumn" :label="$t('label.PFANS1036FORMVIEW_TOTALPLAN')">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.April')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amount4">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghour4">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.May')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amount5">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghour5">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.June')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amount6">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghour6">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.July')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amount7">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghour7">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.August')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amount8">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghour8">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.September')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amount9">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghour9">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amountfirst">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghourfirst">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.October')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amount10">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghour10">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.November')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amount11">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghour11">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.December')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amount12">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghour12">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.January')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amount1">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghour1">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.February')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amount2">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghour2">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.March')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amount3">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghour3">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amountsecond">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghoursecond">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amounttotal">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghourtotal">
                        </el-table-column>
                      </el-table-column>
                    </el-table>
                    <el-table :data="tableB" header-cell-class-name="sub_bg_color_blue" :summary-method="getPrecent" show-summary style="padding-top: 4%"  stripe>
                      <el-table-column>
                        <el-table-column align="center" width="120" prop="total1" :formatter="formatterColumn" :label="$t('label.PFANS1036FORMVIEW_TOTALPLAN')">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.April')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="pay4">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="giving4">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.May')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="pay5">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="giving5">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.June')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="pay6">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="giving6">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.July')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="pay7">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="giving7">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.August')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="pay8">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="giving8">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.September')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="pay9">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="giving9">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="payfirst">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="givingfirst">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.October')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="pay10">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="giving10">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.November')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="pay11">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="giving11">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.December')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="pay12">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="giving12">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.January')" align="center" width="110" >
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="pay1">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="giving1">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.February')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="pay2">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="giving2">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.March')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="pay3">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="giving3">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="paysecond">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="givingsecond">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="paytotal">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="givingtotal">
                        </el-table-column>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_CURRENTPERSONNEL')" name="second">
                    <el-table :data="tableC" :summary-method="val => getSummaries(val,'C')" show-summary stripe
                              header-cell-class-name="sub_bg_color_blue">
                      <el-table-column align="center" width="110" :formatter="formatterColumn" prop="type">
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_RANK')" align="center" width="110" :formatter="formatterColumn" prop="level">
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_MONEY46')" align="center" width="120" prop="money46">
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_MONEY73')" align="center" width="120" prop="money73">
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAYHOUR')" align="center" width="110" prop="payhour">
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEHOUR')" align="center" width="110" prop="overtimehour">
                      </el-table-column>
                      <el-table-column :label="$t('label.April')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amount4">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghour4">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="pay4">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="giving4">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.May')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amount5">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghour5">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="pay5">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="giving5">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.June')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amount6">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghour6">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="pay6">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="giving6">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.July')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amount7">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghour7">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="pay7">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="giving7">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.August')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amount8">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghour8">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="pay8">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="giving8">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.September')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amount9">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghour9">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="pay9">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="giving9">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amountfirst">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghourfirst">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="payfirst">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="givingfirst">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.October')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amount10">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghour10">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="pay10">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="giving10">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.November')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amount11">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghour11">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="pay11">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="giving11">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.December')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amount12">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghour12">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="pay12">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="giving12">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.January')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amount1">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghour1">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="pay1">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="giving1">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.February')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amount2">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghour2">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="pay2">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="giving2">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.March')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amount3">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghour3">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="pay3">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="giving3">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amountsecond">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghoursecond">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="paysecond">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="givingsecond">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amounttotal">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghourtotal">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="paytotal">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="givingtotal">
                        </el-table-column>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_CAREER')" name="third">
                    <el-table :data="tableD" :summary-method="val => getSummaries(val,'D')" show-summary stripe
                              header-cell-class-name="sub_bg_color_blue">
                      <el-table-column align="center" width="110" :formatter="formatterColumn" prop="type">
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_RANK')" align="center" width="110" :formatter="formatterColumn" prop="level">
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_MONEY46')" align="center" width="120" prop="money46">
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_MONEY73')" align="center" width="120" prop="money73">
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAYHOUR')" align="center" width="110" prop="payhour">
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEHOUR')" align="center" width="110" prop="overtimehour">
                      </el-table-column>
                      <el-table-column :label="$t('label.April')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amount4">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghour4">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="pay4">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="giving4">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.May')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amount5">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghour5">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="pay5">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="giving5">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.June')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amount6">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghour6">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="pay6">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="giving6">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.July')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amount7">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghour7">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="pay7">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="giving7">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.August')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amount8">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghour8">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="pay8">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="giving8">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.September')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amount9">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghour9">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="pay9">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="giving9">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amountfirst">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghourfirst">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="payfirst">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="givingfirst">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.October')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amount10">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghour10">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="pay10">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="giving10">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.November')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amount11">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghour11">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="pay11">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="giving11">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.December')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amount12">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghour12">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="pay12">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="giving12">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.January')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amount1">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghour1">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="pay1">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="giving1">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.February')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amount2">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghour2">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="pay2">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="giving2">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.March')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amount3">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghour3">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="pay3">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="giving3">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amountsecond">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghoursecond">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="paysecond">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="givingsecond">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')" align="center" width="110" prop="amounttotal">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_WORKINGHOURS')" align="center" width="110" prop="workinghourtotal">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="paytotal">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="givingtotal">
                        </el-table-column>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_EQUIPMENTINVESTMENT')" style="margin-top: 2%" name="second">
              <div>
                <AssetsComponent :tableNewYear="assets_newyear" :tableLastYear="assets_lastyear" @assets="Assets"></AssetsComponent>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_SOFTWAREINVESTMENT')" style="margin-top: 2%" name="third">
              <div>
                <AssetsComponent :tableNewYear="equipment_newyear" :tableLastYear="equipment_lastyear" @assets="Assets1"></AssetsComponent>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_TRAVELEXPENSES')" style="margin-top: 2%" name="forth">
                <BussinessComponent :tableBusiness="business"></BussinessComponent>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_PROJECTPLAN')" style="margin-top: 2%" name="fifth">
              <div>
                <el-tabs v-model="activeName6" type="border-card">
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_TOTAL')" name="first">
                    <el-table :data="tableSZTotal" header-cell-class-name="sub_bg_color_blue" stripe>
                      <el-table-column>
                        <el-table-column align="center" width="170" prop="total5" :formatter="formatterColumn">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_1Q')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110" prop="number1">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110" prop="money1">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_2Q')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110" prop="number2">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110" prop="money2">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110" prop="numberfirst">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110" prop="moneyfirst">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_3Q')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110" prop="number3">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110" prop="money3">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_4Q')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110" prop="number4">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110" prop="money4">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110" prop="numbersecond">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110" prop="moneysecond">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="110" prop="numbertotal">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="110" prop="moneytotal">
                        </el-table-column>
                      </el-table-column>
                    </el-table>
                  </el-tab-pane>
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_A1')" name="sixth">
                    <TrustA1Component :tableTrustA1="groupA1" @sum="getSumA1"></TrustA1Component>
                  </el-tab-pane>
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_A2')" name="seventh">
                    <TrustComponent :tableTrust="groupA2" @sum="getSumA2"></TrustComponent>
                  </el-tab-pane>
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_B1')" name="second">
                    <TrustComponent :tableTrust="groupB1" @sum="getSumB1"></TrustComponent>
                  </el-tab-pane>
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_B2')" name="third">
                    <TrustComponent :tableTrust="groupB2" @sum="getSumB2"></TrustComponent>
                  </el-tab-pane>
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_B3')" name="forth">
                    <TrustComponent :tableTrust="groupB3" @sum="getSumB3"></TrustComponent>
                  </el-tab-pane>
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_B4')" name="fifth">
                    <TrustComponent :tableTrust="groupC" @sum="getSumC"></TrustComponent>
                  </el-tab-pane>

                </el-tabs>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_VARIOUSFUNDS')" style="margin-top: 2%" name="sixth">
              <div>
                <el-tabs v-model="activeName7" type="border-card">
                  <el-table :data="tableO" :summary-method="(val) => getSummaries(val,1)" show-summary stripe
                            header-cell-class-name="sub_bg_color_blue">
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_NO')" align="center" width="110" type="index" fixed>
                      </el-table-column>
                    <el-table-column width="150" :label="$t('label.PFANS1036FORMVIEW_CONTENTTHOUSAND')" align="center" prop="programme">
                          <template slot-scope="scope">
                            <el-input size="small"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.programme"></el-input>
                          </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1036FORMVIEW_SMALLPROJECT')" align="center" width="150" prop="sprogramme">
                          <template slot-scope="scope">
                            <el-input size="small"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.sprogramme"></el-input>
                          </template>
                    </el-table-column>
                    <el-table-column  width="135" :label="$t('label.PFANS1036FORMVIEW_UNITPRICE')" align="center" prop="price">
                      <template slot-scope="scope">
                        <el-input-number size="small" style="width:7vw"   :min="0" controls-position="right" :precision="1" @change="changeSum(scope.row)" :step="1000"
                                         v-model.trim="scope.row.price"></el-input-number>
                      </template>
                    </el-table-column>
                    <el-table-column  :label="$t('label.PFANS1036FORMVIEW_TYPE')" align="center" width="135" prop="type">
                          <template slot-scope="scope">
                            <dicselect
                              :data="scope.row.type"
                              @change="changeType"
                              code="PJ102"
                              style="width:7vw"
                              :no="scope.row"
                              size="small"
                            ></dicselect>
                          </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                      <el-table-column :label="$t('label.April')" align="center" width="130">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130">
                          <template slot-scope="scope">
                            <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,4)" :step="1"
                                             v-model.trim="scope.row.number4">
                            </el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money4">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.May')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130">
                          <template slot-scope="scope">
                            <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1" @change="changeSum(scope.row,5)" :step="1"
                                             v-model.trim="scope.row.number5"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money5">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.June')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130">
                          <template slot-scope="scope">
                            <el-input-number size="small" style="width:6vw"  :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,6)" :step="1"
                                             v-model.trim="scope.row.number6"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money6">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.July')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130">
                          <template slot-scope="scope">
                            <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,7)" :step="1"
                                             v-model.trim="scope.row.number7"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money7">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.August')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130">
                          <template slot-scope="scope">
                            <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,8)" :step="1"
                                             v-model.trim="scope.row.number8"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money8">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.September')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130">
                          <template slot-scope="scope">
                            <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,9)" :step="1"
                                             v-model.trim="scope.row.number9"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money9">
                        </el-table-column>
                      </el-table-column>
                    </el-table-column>
                    <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                      <el-table-column :label="$t('label.October')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130">
                          <template slot-scope="scope">
                            <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,10)" :step="1"
                                             v-model.trim="scope.row.number10"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money10">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.November')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130">
                          <template slot-scope="scope">
                            <el-input-number size="small" style="width:6vw"  :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,11)" :step="1"
                                             v-model.trim="scope.row.number11"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money11">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.December')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130">
                          <template slot-scope="scope">
                            <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,12)" :step="1"
                                             v-model.trim="scope.row.number12"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money12">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.January')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130">
                          <template slot-scope="scope">
                            <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,1)" :step="1"
                                             v-model.trim="scope.row.number1"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money1">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.February')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130">
                          <template slot-scope="scope">
                            <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,2)" :step="1"
                                             v-model.trim="scope.row.number2"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money2">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.March')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130">
                          <template slot-scope="scope">
                            <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,3)" :step="1"
                                             v-model.trim="scope.row.number3"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money3">
                        </el-table-column>
                      </el-table-column>
                    </el-table-column>
                    <el-table-column :label="$t('label.totalyear')" align="center" width="110">
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="numbertotal">
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="moneytotal">
                      </el-table-column>
                    </el-table-column>
                    <el-table-column :label="$t('label.operation')" align="center" width="200" fixed="right">
                      <template slot-scope="scope" >
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
                          @click="addRow()"
                          plain
                          size="small"
                          type="primary"
                        >{{$t('button.insert')}}
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-tabs>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_PL')" style="margin-top: 2%" name="seventh">
              <div class="test">
                    <el-table :data="tableTotal" header-cell-class-name="sub_bg_color_blue" stripe :span-method="objectSpanMethod" :row-style="changeColor" height="800">
                          <el-table-column prop="name" :formatter="formatterDir" align="center" width="70" fixed>
                      </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_CONTENT')" align="center" width="250" prop="name1" :formatter="formatterDir" fixed>
                      </el-table-column>
                      <el-table-column align="center" width="130" prop="name2" :formatter="formatterDir" fixed>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.April')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110" prop="money4">
                            <template slot-scope="scope">
                            <el-input-number size="small" v-model="scope.row.money4" :controls="false"  :min="0"  style="width:5vw" v-if="scope.$index >= 54 && scope.$index <= 57"></el-input-number>
                              <span v-else>{{scope.row.money4}}</span>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.May')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110" prop="money5">
                            <template slot-scope="scope">
                            <el-input-number size="small" v-model="scope.row.money5" :controls="false"  :min="0"  style="width:5vw" v-if="scope.$index >= 54 && scope.$index <= 57"></el-input-number>
                            <span v-else>{{scope.row.money5}}</span>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.June')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110" prop="money6">
                            <template slot-scope="scope">
                            <el-input-number size="small" v-model="scope.row.money6" :controls="false"  :min="0"  style="width:5vw" v-if="scope.$index >= 54 && scope.$index <= 57"></el-input-number>
                            <span v-else>{{scope.row.money6}}</span>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.July')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110" prop="money7">
                            <template slot-scope="scope">
                            <el-input-number size="small" v-model="scope.row.money7" :controls="false"  :min="0"  style="width:5vw" v-if="scope.$index >= 54 && scope.$index <= 57"></el-input-number>
                            <span v-else>{{scope.row.money7}}</span>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.August')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110" prop="money8">
                            <template slot-scope="scope">
                            <el-input-number size="small" v-model="scope.row.money8" :controls="false"  :min="0"  style="width:5vw" v-if="scope.$index >= 54 && scope.$index <= 57"></el-input-number>
                            <span v-else>{{scope.row.money8}}</span>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.September')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110" prop="money9">
                            <template slot-scope="scope">
                            <el-input-number size="small" v-model="scope.row.money9" :controls="false"  :min="0"  style="width:5vw" v-if="scope.$index >= 54 && scope.$index <= 57"></el-input-number>
                            <span v-else>{{scope.row.money9}}</span>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                          </el-table-column>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.October')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110" prop="money10">
                            <template slot-scope="scope">
                            <el-input-number size="small" v-model="scope.row.money10" :controls="false"  :min="0"  style="width:5vw" v-if="scope.$index >= 54 && scope.$index <= 57"></el-input-number>
                            <span v-else>{{scope.row.money10}}</span>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.November')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110" prop="money11">
                            <template slot-scope="scope">
                            <el-input-number size="small" v-model="scope.row.money11" :controls="false"  :min="0"  style="width:5vw" v-if="scope.$index >= 54 && scope.$index <= 57"></el-input-number>
                            <span v-else>{{scope.row.money11}}</span>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.December')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110" prop="money12">
                            <template slot-scope="scope">
                            <el-input-number size="small" v-model="scope.row.money12" :controls="false"  :min="0"  style="width:5vw" v-if="scope.$index >= 54 && scope.$index <= 57"></el-input-number>
                            <span v-else>{{scope.row.money12}}</span>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.January')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110" prop="money1">
                            <template slot-scope="scope">
                            <el-input-number size="small" v-model="scope.row.money1" :controls="false"  :min="0"  style="width:5vw" v-if="scope.$index >= 54 && scope.$index <= 57"></el-input-number>
                            <span v-else>{{scope.row.money1}}</span>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center" width="110">

                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.February')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110" prop="money2">
                            <template slot-scope="scope">
                            <el-input-number size="small" v-model="scope.row.money2" :controls="false"  :min="0"  style="width:5vw" v-if="scope.$index >= 54 && scope.$index <= 57"></el-input-number>
                            <span v-else>{{scope.row.money2}}</span>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.March')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110" prop="money3">
                            <template slot-scope="scope">
                            <el-input-number size="small" v-model="scope.row.money3" :controls="false"  :min="0"  style="width:5vw" v-if="scope.$index >= 54 && scope.$index <= 57"></el-input-number>
                            <span v-else>{{scope.row.money3}}</span>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                          </el-table-column>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.totalyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_TOTAL')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                          </el-table-column>
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
  import {getOrgInfoByUserId,getDictionaryInfo} from '@/utils/customize';
  import dicselect from '../../../components/dicselect';
  import AssetsComponent from './AssetsComponent';
  import TrustComponent from './TrustComponent';
  import BussinessComponent from "./BussinessComponent";
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
      TrustA1Component
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
        month:"",
        arr:[4,5,6,7,8,9,10,11,12,1,2,3],
        groupA1:[],
        groupA2:[],
        groupB3:[],
        groupB1:[],
        groupB2:[],
        groupC:[{groupname:"PJ088001"},{groupname:"PJ088001"},{groupname:"PJ088001"},{groupname:"PJ088001"},{groupname:"PJ088001"},{groupname:"PJ088001"},{groupname:"PJ088002"}],
        sumA1:[],
        sumA2:[],
        sumB1:[],
        sumB2:[],
        sumB3:[],
        sumC1:[],
        personTable:[],
        assets1:[],
        assets2:[],
        business:[{assetstype:"0"}, {assetstype:"1"},{assetstype:"0"}, {assetstype:"1"},{assetstype:"0"}, {assetstype:"1"},{assetstype:"0"}, {assetstype:"1"}],
        equipment_newyear: [{assetstype:"0"},{assetstype:"1"}],
        equipment_lastyear: [{assetstype:"0"},{assetstype:"1"}],
        assets_newyear: [{assetstype:"0"},{assetstype:"1"}],
        assets_lastyear: [{assetstype:"0"},{assetstype:"1"}],
        error: '',
        options: [],
        selectType: 'Single',
        title: 'title.PFANS1036VIEW',
        userlist: '',
        activeName: 'first',
        activeName2: 'first',
        activeName6: 'first',
        activeName7: 'first',
        loading: false,
        disable: false,
        disablecurr: false,
        buttonList: [
          {
            key: 'save',
            name: 'button.save',
            disabled: false,
            icon: 'el-icon-check',
          },
        ],
        tableA: [], //1
        tableB: [],//2
        tableC: [],//3
        tableD: [],//4
        tableK: [{},{},{},{},{},{}],
        tableO: [
          {
            programme:'',
            sprogramme:'',
            price:'',
            type:'',
              number4:'',
              money4:'',
              number5:'',
              money5:'',
              number6:'',
              money6:'',
              number7:'',
              money7:'',
              number8:'',
              money8:'',
              number9:'',
              money9:'',
              number10:'',
              money10:'',
              number11:'',
              money11:'',
              number12:'',
              money12:'',
              number1:'',
              money1:'',
              number2:'',
              money2:'',
              number3:'',
              money3:'',
              numberfirsthalf:'',
              moneyfirsthalf:'',
              numbersecondhalf:'',
              moneysecondhalf:'',
              numberAnnual:'',
              moneyAnnual:'',
          },
        ],
          tableP: [{name1:"PJ086001"},{name1:"PJ086002"},{name1:"PJ086003"},{name1:this.$t('label.PFANS1036FORMVIEW_TAB1VALUE2')},{name1:this.$t('label.PFANS1036FORMVIEW_TAB1VALUE3')}
        ,{name1:this.$t('label.PFANS1036FORMVIEW_TAB1VALUE4')},{name1:"PJ073001"},{name1:"-"},{name1:"-"},{name1:"-"},{name1:"-"},{name1:"PJ073002"},{name1:"-"},{name1:"PJ073"},{name1:"PJ074001"},{name1:"PJ074002"},{name1:"PJ074003"},
            {name1:"PJ074004"},{name1:"PJ074005"},{name1:"PJ074006"},{name1:"PJ074"},{name1:"PJ075001"},{name1:"PJ075002"},{name1:"PJ075003"},{name1:"PJ075004"},{name1:"PJ075005"},
            {name1:"PJ075"},{name1:"PJ076001"},{name1:"PJ076002"},{name1:"PJ076003"},{name1:"PJ076"},{name1:"PJ077001"},{name1:"PJ077002"},{name1:"PJ077003"},{name1:"PJ077004"},{name1:"PJ077005"},
            {name1:"PJ077006"},{name1:"PJ077007"},{name1:"PJ077008"},{name1:"PJ077009"},{name1:"PJ077010"},{name1:"PJ077"},{name1:this.$t('label.PFANS2005FORMVIEW_TOTAL')},{},{name1:this.$t('label.PFANS1036FORMVIEW_TAB3VALUE2')}
            ,{name1:this.$t('label.PFANS1036FORMVIEW_TAB3VALUE3')},{name1:this.$t('label.PFANS1036FORMVIEW_TAB3VALUE4')},{},{},{},{},{name1:this.$t('label.PFANS1036FORMVIEW_TAB8VALUE2')},
            {name1:this.$t('label.PFANS1036FORMVIEW_TAB8VALUE3')},{name1:this.$t('label.PFANS1036FORMVIEW_TAB8VALUE4')},
            {name1:this.$t('label.PFANS1036FORMVIEW_TAB9VALUE2')},{name1:this.$t('label.PFANS1036FORMVIEW_TAB9VALUE3')},{name1:this.$t('label.PFANS1036FORMVIEW_TAB9VALUE4')},{name1:this.$t('label.PFANS1036FORMVIEW_TAB9VALUE5')},
            {name1:this.$t('label.PFANS1036FORMVIEW_TAB10VALUE2')},{name1:this.$t('label.PFANS1036FORMVIEW_TAB10VALUE3')},{name1:this.$t('label.PFANS1036FORMVIEW_TAB10VALUE4')},{name1:this.$t('label.PFANS1036FORMVIEW_TAB10VALUE5')},{name1:this.$t('label.PFANS1036FORMVIEW_TAB10VALUE6')},{name1:this.$t('label.PFANS1036FORMVIEW_TAB10VALUE9')}
            ],
        baseInfo: {},
        form: {
          centerid: '',
          groupid: '',
          user_id: '',
        },
        rules: {
          user_id: [{
            required: true,
            validator: checkuser,
            trigger: 'change',
          }],
        },
        multiple: false,
        canStart: false,
        sumC:[],
        sumD:[]
      };
    },
    created() {
      if (!this.$route.params.disabled) {
        this.buttonList = [];
      }
      this.disable = this.$route.params.disabled;
    },
    mounted(){
      this.loading = true;
      if (this.$route.params._id) {
        this.$store
          .dispatch('PFANS1036Store/selectById', {'businessplanid': this.$route.params._id})
          .then(response => {
              this.form = response;
              this.equipment_newyear = JSON.parse(this.form.equipment_newyear);
              this.equipment_lastyear = JSON.parse(this.form.equipment_lastyear);
              this.assets_newyear = JSON.parse(this.form.assets_newyear);
              this.assets_lastyear = JSON.parse(this.form.assets_lastyear);
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

        if(this.$store.getters.orgGroupList.length > 0 ){
          this.groupA2 = this.$store.getters.orgGroupList.map(
            group => {
              return {groupid:group.groupid,groupname:group.companyen}
            }
          )
          this.groupB3 = this.$store.getters.orgGroupList.map(
            group => {
              return {groupid:group.groupid,groupname:group.companyen}
            }
          );
        }
        if (this.userlist !== null && this.userlist !== '') {
          let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
          this.form.centerid = rst.centerNmae||"";
          this.form.center_id = rst.centerId||"";
          this.form.groupid = rst.groupNmae||"";
          this.form.group_id = rst.groupId||"";
          this.form.teamid = rst.teamNmae||"";
          this.form.user_id = this.$store.getters.userinfo.userid;
          this.getGroupB1(this.form.group_id);
        }
      }
        this.$store
          .dispatch('PFANS1036Store/getPersonPlan', {'groupid': '2BD452FF945B318992D198D7B7C5D159ED67','year':2019})
        .then( response => {
          if(JSON.parse(response[0]))  this.tableC = JSON.parse(response[0]);
            if(JSON.parse(response[1]))  this.tableD = JSON.parse(response[1]);
            this.tableA = [JSON.parse(response[2])];
            this.tableB = [JSON.parse(response[2])];
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
    computed:{
      tableTotal:function(){
        let tableOTotal = {};
        let tableOTotal1 = {};
        let tableOTotal2 = {};
        let tableOTotal3 = {};
        let tableOTotal4 = {};
        let tableOtotal5 = {};
        let tableOtotal6 = {};
        this.tableO.forEach(
          val => {
            if(val.type === "PJ102012"){
              for(let i = 1; i<= 12; i++){
                tableOTotal["money" + i] = (tableOTotal["money" + i]||0) + (val["money" + i]||0);
              }
            } if(val.type === "PJ102008"){
              for(let i = 1; i<= 12; i++){
                tableOTotal1["money" + i] = (tableOTotal1["money" + i]||0) + (val["money" + i]||0);
              }
            }if(val.type === "PJ102006"){
              for(let i = 1; i<= 12; i++){
                tableOTotal2["money" + i] = (tableOTotal2["money" + i]||0) + (val["money" + i]||0);
              }
            }if(val.type === "PJ102003"){
              for(let i = 1; i<= 12; i++){
                tableOTotal3["money" + i] = (tableOTotal3["money" + i]||0) + (val["money" + i]||0);
              }
            }if(val.type === "PJ102007"){
              for(let i = 1; i<= 12; i++){
                tableOTotal4["money" + i] = (tableOTotal4["money" + i]||0) + (val["money" + i]||0);
              }
            }if(val.type === "PJ102009"){
              for(let i = 1; i<= 12; i++){
                tableOtotal5["money" + i] = (tableOtotal5["money" + i]||0) + (val["money" + i]||0);
              }
            }if(val.type === "PJ102010"){
              for(let i = 1; i<= 12; i++){
                tableOtotal6["money" + i] = (tableOtotal6["money" + i]||0) + (val["money" + i]||0);
              }
            }
          })
        for(let i = 0; i < this.arr.length ; i++){
          if(this.sumB2.length > 0){
            if(i<=5){
            this.tableP[51]["money" + this.arr[i]] = Number(this.sumB2[ 2 * i + 2 ]||0).toFixed(2);
            }else{
              this.tableP[51]["money" + this.arr[i]] = Number(this.sumB2[ 2 * i + 4 ]||0).toFixed(2);
            }
          } if(this.sumB1.length > 0){
            if(i<=5){
            this.tableP[52]["money" + this.arr[i]] = Number(this.sumB1[ 2 * i + 2 ]||0).toFixed(2);
            }else{
              this.tableP[52]["money" + this.arr[i]] = Number(this.sumB1[ 2 * i + 4 ]||0).toFixed(2);
            }
          }
          if(this.tableA.length > 0){
              this.tableP[53]["money" + this.arr[i]] = Number(this.tableA[0][ "amount" + this.arr[i] ]||0).toFixed(2);
          }
        if(this.groupA1.length > 0){
          this.tableP[0]["money" + this.arr[i]] = Number(this.groupA1[0]["money" + this.arr[i]]||0).toFixed(2);
          this.tableP[1]["money" + this.arr[i]] = Number(this.groupA1[1]["money" + this.arr[i]]||0).toFixed(2);
          this.tableP[2]["money" + this.arr[i]] = Number(this.groupA1[2]["money" + this.arr[i]]||0).toFixed(2);
        }else{
          this.tableP[0]["money" + this.arr[i]] = "0.00";
          this.tableP[1]["money" + this.arr[i]] = "0.00";
          this.tableP[2]["money" + this.arr[i]] = "0.00";
        }
        if(this.sumA2.length > 0){
          if(i<=5){
          this.tableP[3]["money" + this.arr[i]] = Number(this.sumA2[3 + 2 * i ]||0).toFixed(2);
          }else{
            this.tableP[3]["money" + this.arr[i]] = Number(this.sumA2[5 + 2 * i ]||0).toFixed(2);
          }
        }else{
          this.tableP[3]["money" + this.arr[i]] = "0.00";
        }
          this.tableP[4]["money" + this.arr[i]] = (Number(this.tableP[0]["money" + this.arr[i]]) + Number(this.tableP[1]["money" + this.arr[i]]) +  Number(this.tableP[2]["money" + this.arr[i]]) + Number(this.tableP[3]["money" + this.arr[i]])).toFixed(2);
          this.tableP[5]["money" + this.arr[i]] = (Number(this.tableP[4]["money" + this.arr[i]]) - (Number(this.tableP[1]["money" + this.arr[i]]) * Number(getDictionaryInfo("PJ086002").value2) + Number(this.tableP[2]["money" + this.arr[i]]) * Number(getDictionaryInfo("PJ086003").value2))).toFixed(2);

        if(this.personTable.length > 0){
          if(i<=5){
            this.tableP[6]["money" + this.arr[i]] = (Number(this.personTable[2*i + 1]) + Number(this.personTable[2*i + 2])).toFixed(2);
          }else{
            this.tableP[6]["money" + this.arr[i]] = (Number(this.personTable[2*i + 3]) + Number(this.personTable[2*i + 4])).toFixed(2);
          }
        } else {
          this.tableP[6]["money" + this.arr[i]] = "0.00";
        }

          this.tableP[7]["money" + this.arr[i]] = "0.00";
          this.tableP[8]["money" + this.arr[i]] = "0.00";
          this.tableP[9]["money" + this.arr[i]] = "0.00";
          this.tableP[10]["money" + this.arr[i]] = "0.00";

          if(this.assets1.length > 0){
            this.tableP[14]["money" + this.arr[i]] = (Number(this.assets1[0]["money" + this.arr[i]]||0)).toFixed(2);
          }else{
            this.tableP[14]["money" + this.arr[i]] = "0.00";
          }
          if(this.assets2.length > 0){
            this.tableP[15]["money" + this.arr[i]] = (Number(this.assets2[0]["money" + this.arr[i]]||0)).toFixed(2);
          }else{
            this.tableP[15]["money" + this.arr[i]] = "0.00";
          }
          this.tableP[16]["money" + this.arr[i]] =  Number(tableOTotal["money" + this.arr[i]]||0).toFixed(2);
          this.tableP[17]["money" + this.arr[i]] =  Number(tableOTotal1["money" + this.arr[i]]||0).toFixed(2);
          this.tableP[18]["money" + this.arr[i]] =  Number(tableOTotal2["money" + this.arr[i]]||0).toFixed(2);
          this.tableP[19]["money" + this.arr[i]] =  Number(tableOTotal3["money" + this.arr[i]]||0).toFixed(2);
          this.tableP[20]["money" + this.arr[i]] = (Number(this.tableP[14]["money" + this.arr[i]]) + Number(this.tableP[15]["money" + this.arr[i]]) + Number(this.tableP[16]["money" + this.arr[i]])+ Number(this.tableP[17]["money" + this.arr[i]])+ Number(this.tableP[18]["money" + this.arr[i]])+ Number(this.tableP[19]["money" + this.arr[i]])).toFixed(2);

          if(this.sumC1.length > 0){
            if(i<=5){
              this.tableP[21]["money" + this.arr[i]] = Number(this.sumC1[3 + 2 * i ]||0).toFixed(2);
            }else{
              this.tableP[21]["money" + this.arr[i]] = Number(this.sumC1[5 + 2 * i ]||0).toFixed(2);
            }
          }else{
            this.tableP[21]["money" + this.arr[i]] = "0.00";
          }
          this.tableP[22]["money" + this.arr[i]] = "0.00";
          if(this.sumB3.length > 0){
            if(i<=5){
              this.tableP[23]["money" + this.arr[i]] = Number(this.sumB3[3 + 2 * i ]||0).toFixed(2);
            }else{
              this.tableP[23]["money" + this.arr[i]] = Number(this.sumB3[5 + 2 * i ]||0).toFixed(2);
            }
          }else{
            this.tableP[23]["money" + this.arr[i]] = "0.00";
          }
          if(this.sumB1.length > 0 && this.sumB2.length > 0){
            if(i<=5){
            this.tableP[24]["money" + this.arr[i]] = (Number(this.sumB1[3 + 2 * i ]||0) + Number(this.sumB2[3 + 2 * i ]||0)).toFixed(2)
            }else{
              this.tableP[24]["money" + this.arr[i]] = (Number(this.sumB1[5 + 2 * i ]||0) + Number(this.sumB2[5 + 2 * i ]||0)).toFixed(2)
            }
          }else{
            this.tableP[24]["money" + this.arr[i]] = "0.00";
          }
          this.tableP[25]["money" + this.arr[i]] = "0.00";
          this.tableP[26]["money" + this.arr[i]] = (Number(this.tableP[21]["money" + this.arr[i]]) + Number(this.tableP[22]["money" + this.arr[i]]) + Number(this.tableP[23]["money" + this.arr[i]])+ Number(this.tableP[24]["money" + this.arr[i]])+ Number(this.tableP[25]["money" + this.arr[i]])).toFixed(2);
          this.tableP[28]["money" + this.arr[i]] = "0.00";
          this.tableP[29]["money" + this.arr[i]] = "0.00";

          this.tableP[31]["money" + this.arr[i]] = Number(tableOTotal4["money" + this.arr[i]]||0).toFixed(2);




          this.tableP[36]["money" + this.arr[i]] = Number(tableOtotal5["money" + this.arr[i]]||0).toFixed(2);
          this.tableP[58]["money" + this.arr[i]] = Math.round(Number(this.tableP[54]["money" + this.arr[i]]||0)/(Number(this.tableP[51]["money" + this.arr[i]]) + Number(this.tableP[52]["money" + this.arr[i]]))* 100) + "%";
          this.tableP[59]["money" + this.arr[i]] = Math.round(Number(this.tableP[55]["money" + this.arr[i]]||0)/(Number(this.tableP[51]["money" + this.arr[i]]) + Number(this.tableP[52]["money" + this.arr[i]]))* 100) + "%";
          this.tableP[60]["money" + this.arr[i]] = Math.round(Number(this.tableP[56]["money" + this.arr[i]]||0)/Number(this.tableP[53]["money" + this.arr[i]])* 100) + "%";
          this.tableP[61]["money" + this.arr[i]] = Math.round(Number(this.tableP[57]["money" + this.arr[i]]||0)/Number(this.tableP[53]["money" + this.arr[i]])* 100) + "%";
          this.tableP[62]["money" + this.arr[i]] = Math.round((Number(this.tableP[57]["money" + this.arr[i]]||0) + Number(this.tableP[54]["money" + this.arr[i]]||0))/(Number(this.tableP[51]["money" + this.arr[i]]) + Number(this.tableP[52]["money" + this.arr[i]]) + Number(this.tableP[53]["money" + this.arr[i]]))* 100) + "%";
          this.tableP[63]["money" + this.arr[i]] = Math.round((Number(this.tableP[57]["money" + this.arr[i]]||0) + Number(this.tableP[55]["money" + this.arr[i]]||0))/(Number(this.tableP[51]["money" + this.arr[i]]) + Number(this.tableP[52]["money" + this.arr[i]]) + Number(this.tableP[53]["money" + this.arr[i]]))* 100) + "%";
        }
        return this.tableP;
      },
        tableSZTotal:function(){
        debugger
        if(this.sumA2.length > 0){
          this.tableK[0].number1 = Number(this.sumA2[2]||0) + Number(this.sumA2[4]||0) + Number(this.sumA2[6]||0);
          this.tableK[0].money1 = Number(this.sumA2[3]||0) + Number(this.sumA2[5]||0) + Number(this.sumA2[7]||0);
          this.tableK[0].number2 = Number(this.sumA2[8]||0) + Number(this.sumA2[10]||0) + Number(this.sumA2[12]||0);
          this.tableK[0].money2 = Number(this.sumA2[9]||0) + Number(this.sumA2[11]||0) + Number(this.sumA2[13]||0);
          // this.tableK[0].first = Number(this.sumA2[14]||0);
          // this.tableK[0].money3 = Number(this.sumA1[15]||0);
          // this.tableK[0] = Number(this.sumA2[16]||0) + Number(this.sumA2[18]||0) + Number(this.sumA2[20]||0);
          // this.tableK[0] = Number(this.sumA2[17]||0) + Number(this.sumA2[19]||0) + Number(this.sumA2[21]||0);
          // this.tableK[0] = Number(this.sumA2[22]||0) + Number(this.sumA2[24]||0) + Number(this.sumA2[26]||0);
          // this.tableK[0] = Number(this.sumA2[23]||0) + Number(this.sumA2[25]||0) + Number(this.sumA2[27]||0);
          // this.tableK[0] = Number(this.sumA2[28]||0);
          // this.tableK[0] = Number(this.sumA1[29]||0);
          // this.tableK[0] = Number(this.sumA2[30]||0);
          // this.tableK[0] = Number(this.sumA1[31]||0);
        }
      }
    },
    methods: {
      getSumA1(val){
        this.sumA1 = val;
      },
      getSumB1(val){
        this.sumB1 = val;
      },
      getSumB2(val){
        this.sumB2 = val;
      },
      getSumB3(val){
        this.sumB3 = val;
      },
      getSumC(val){
        this.sumC1 = val;
      },
      Assets1(val){
        this.assets2 = val;
      },
      Assets(val){
        this.assets1 = val;
      },
      getSumA2(val){
        this.sumA2 =  val;
      },
      changeColor({ row, column, rowIndex, columnIndex }){
        if (columnIndex === 1) {
          if (rowIndex === 0) {
            return {
              backgroundColor: 'red'
            };
          } else if (rowIndex === 6) {
            return {
              backgroundColor: '#74979c'
            }
          } else if ( [43,47,48,49,50].includes(rowIndex)) {
            return {
              backgroundColor: '#dc9986'
            }
          } else if ([44,45,46].includes(rowIndex)) {
            return {
              backgroundColor: '#8bbba5'
            }
          } else if (rowIndex === 51) {
            return {
              backgroundColor: '#de7557'
            }
          } else if (rowIndex === 54) {
            return {
              backgroundColor: '#e6d67d'
            }
          } else if (rowIndex === 58) {
            return {
              backgroundColor: '#729d71'
            }
          } else {
            return {
              backgroundColor: '#7084a4'
            };
          }
        }
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex === 0) {
            return {
              rowspan: 6,
              colspan: 1
            };
          } else if (rowIndex === 6) {
            return {
              rowspan: 37,
              colspan: 1
            }
          } else if ( [43,47,48,49,50].includes(rowIndex)) {
            return {
              rowspan: 1,
              colspan: 2
            }
          } else if ([44,45,46].includes(rowIndex)) {
            return {
              rowspan: 1,
              colspan: 1
            }
          } else if (rowIndex === 51) {
            return {
              rowspan: 3,
              colspan: 1
            }
          } else if (rowIndex === 54) {
            return {
              rowspan: 4,
              colspan: 1
            }
          } else if (rowIndex === 58) {
            return {
              rowspan: 6,
              colspan: 1
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
        },
      formatterDir(row,column,cellValue,index){
         if(column.property === "name"){
             if([0,1,2,3,4,5].includes(index)) {
               return this.$t('label.PFANS1036FORMVIEW_TAB1VALUE1');
             }else if(index === 6){
               return this.$t('label.PFANS1036FORMVIEW_TAB2VALUE1');
             }else if(index === 43){
               return this.$t('label.PFANS1036FORMVIEW_TAB3VALUE1');
             }else if(index === 47){
               return this.$t('label.PFANS1036FORMVIEW_TAB4VALUE1');
             }else if(index === 48){
               return this.$t('label.PFANS1036FORMVIEW_TAB5VALUE1');
             }else if(index === 49){
               return this.$t('label.PFANS1036FORMVIEW_TAB6VALUE1');
             }else if(index === 50){
               return this.$t('label.PFANS1036FORMVIEW_TAB7VALUE1');
             }else if(index === 51){
               return this.$t('label.PFANS1036FORMVIEW_TAB8VALUE1');
             }else if(index === 54){
               return this.$t('label.PFANS1036FORMVIEW_TAB9VALUE1');
             }else if(index === 58){
               return this.$t('label.PFANS1036FORMVIEW_TAB10VALUE1');
             }
              }else if(column.property === "name1"){
                  if(getDictionaryInfo(row[column.property])){
                       return getDictionaryInfo(row[column.property]).value1;
                  }else{
                    return row[column.property];
                  }
            }
         },
      getGroupB1(id){
        this.$store
          .dispatch('PFANS1036Store/getPlan', {"years":2019,"groupid":id})
          .then(response => {
            if(response.length > 0){
              let arr = [4,5,6,7,8,9,10,11,12,1,2,3];
              let count1 = 0;
              let count2 = 0;
              let count = 0;
            let supplierinfoList =  this.$store.getters.supplierinforList.map(list => {return {"supplierinfor_id":list.supplierinfor_id,"groupname":list.supchinese}});
            let supplierinfoList2 =  this.$store.getters.supplierinforList.map(list => {return {"supplierinfor_id":list.supplierinfor_id,"groupname":list.supchinese}});
            let outside = response.filter(res => res.type === 1);
            let employed = JSON.parse(outside[0].employed);
            let newentry = JSON.parse(outside[0].newentry);
            let inside = response.filter(res => res.type === 0);
            let inemployed = JSON.parse(inside[0].employed);
            let innewentry = JSON.parse(inside[0].newentry);
            if(newentry.length > 0){
              newentry.forEach(
                val => {
                  if(val.name){
                    count1 += 1;
                  }
                }
              )
            }
            if(innewentry.length > 0){
              innewentry.forEach(
                     val => {
                       if(val.name){
                         count2 += 1;
                       }
                     }
                  )
            }
            count = employed.length + inemployed.length + count1 + count2;
            let money = (Number(getDictionaryInfo("PJ087001").value1) * count / 12).toFixed(3);
           this.groupA1 = [{money1:money,money2:money,money3:money,money4:money,money5:money,money6:money,money7:money,money8:money,money9:money,money10:money,money11:money,money12:money,
               name1:"PJ086001",name2:"PJ086001"},
             {name1:"PJ086002",name2:"PJ086002"},{name1:"PJ086003",name2:"PJ086003"}]
              supplierinfoList.forEach(
                   list => {
                     employed.forEach(
                       em => {
                         if( list.supplierinfor_id === em.suppliernameid && em.entermouth !== "BP025004"){
                           for (let i = 1; i <= 12; i++) {
                             list["number"+ i ] = (list["number"+ i ]||0) + 1;
                           }
                         }
                       }
                     )
                     newentry.forEach(
                       em => {
                         if( list.supplierinfor_id === em.supchinese && em.isoutside === false ){
                         let index = arr.indexOf(Number(moment(em.entermouth).month()) === 12 ? 1 : Number(moment(em.entermouth).month()) + 1);
                           for (let i = index; i < arr.length; i++) {
                             list["number"+ arr[i]] = (list["number"+ arr[i] ]||0) + 1;
                           }
                         }
                       }
                     )
                   }
              )
              supplierinfoList2.forEach(
                list => {
                  employed.forEach(
                    em => {
                      if( list.supplierinfor_id === em.suppliernameid && em.entermouth === "BP025004"){
                        for (let i = 1; i <= 12; i++) {
                          list["number"+ i ] = (list["number"+ i ]||0) + 1;
                        }
                      }
                    }
                  )
                  newentry.forEach(
                    em => {
                      if( list.supplierinfor_id === em.supchinese && em.isoutside === true ){
                        let index = arr.indexOf(Number(moment(em.entermouth).month()) === 12 ? 1 : Number(moment(em.entermouth).month()) + 1);
                        for (let i = index; i < arr.length; i++) {
                          list["number"+ arr[i]] = (list["number"+ arr[i] ]||0) + 1;
                        }
                      }
                    }
                  )
                }
              )

              this.groupB1 = supplierinfoList;
              this.groupB2 = supplierinfoList2;
            }

          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
          });
      },
      formatterColumn(row,column,cellValue, index){
        if(column.property === "total1"){
       if(index === 0){
            return this.$t('label.PFANS1036FORMVIEW_SUBTOTAL');
           }else if(index === 1){
              return this.$t('label.PFANS1036FORMVIEW_SUBTOTALTHOUSAND')
           }
        }
        if(column.property === "total5"){
          if(index === 0){
             return this.$t('label.PFANS1036FORMVIEW_A1');
          }else if(index === 1){
             return this.$t('label.PFANS1036FORMVIEW_A2');
          }else if(index === 2){
             return  this.$t('label.PFANS1036FORMVIEW_B1');
          }else if(index === 3){
             return  this.$t('label.PFANS1036FORMVIEW_B2');
          }else if(index === 4){
             return  this.$t('label.PFANS1036FORMVIEW_B3');
          }else if(index === 5){
             return  this.$t('label.PFANS1036FORMVIEW_B4');
          }
        }
        if(column.property === "type"){
          if(index === 0){
            return this.$t('label.PFANS1013FORMVIEW_CHUXIANGZHE');
          }else if(index === 2){
            return this.$t('label.PFANSUSERVIEW_MEMBERS');
          }
        }else if(column.property === "level"){
          if(index === 0){
            return "参事以上";
          }else if(index === 1){
            return "主事以下";
          }else if(index === 2){
            return "R11A";
          }else if(index === 3){
            return "R11B";
          }else if(index === 4){
            return "R10";
          }else if(index === 5){
            return "R9A";
          }else if(index === 6){
            return "R9B";
          }else if(index === 7){
            return "R8A";
          }else if(index === 8){
            return "R8B";
          }else if(index === 9){
            return "R8C";
          }else if(index === 10){
            return "R7";
          }else if(index === 11){
            return "R6";
          }else if(index === 12){
            return "R5";
          }else if(index === 13){
            return "R4";
          }else if(index === 14){
            return "R3";
          }
        }
      },
      getPrecent(param){
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
                return (prev + curr)/1000;
              } else {
                return prev/1000;
              }
            }, 0);
          } else {
            sums[index] = '';
          }
        });
        this.personTable = sums;
        return sums;
      },
      getSummaries(param,table) {
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = this.$t('label.PFANS1036FORMVIEW_TOTAL');
            return;
          }else if([1,2,3,4,5].includes(index) && table !== 1){
             sums[index] = "-";
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
            sums[index] = '';
          }
        });
        return sums;
      },
      getUserids(val) {
        this.userlist = val;
        this.form.user_id = val;
        let rst = getOrgInfoByUserId(val);
        this.form.centerid = rst.centerNmae;
        this.form.groupid = rst.groupNmae;
        this.form.teamid = rst.teamNmae;
        if (!this.form.user_id || this.form.user_id === '' || typeof val == 'undefined') {
          this.error = this.$t('normal.error_08') + this.$t('label.applicant');
        } else {
          this.error = '';
        }
      },
      changeSum(scope, index) {

        if (scope.price > 0) {
          scope["money" + index] = (scope.price * scope["number" + index]/1000).toFixed(2);
          if (index >= 4 && index <= 9) {
            scope.numberfirst = ((scope.number4 || 0) + (scope.number5 || 0) + (scope.number6 || 0) + (scope.number7 || 0) + (scope.number8 || 0) + (scope.number9 || 0)).toFixed(1);
            scope.moneyfirst = (Number(scope.money4 || 0) + Number(scope.money5 || 0) + Number(scope.money6 || 0) + Number(scope.money7 || 0) + Number(scope.money8 || 0) + Number(scope.money9 || 0)).toFixed(2);
          } else if ((index >= 10 && index <= 12) || (index >= 1 && index <= 3)) {
            scope.numbersecond = ((scope.number10 || 0) + (scope.number11 || 0) + (scope.number12 || 0) + (scope.number1 || 0) + (scope.number2 || 0) + (scope.number3 || 0)).toFixed(1);
            scope.moneysecond = (Number(scope.money10 || 0) + Number(scope.money11 || 0) + Number(scope.money12 || 0) + Number(scope.money1 || 0) + Number(scope.money2 || 0) + Number(scope.money3 || 0)).toFixed(2);
          } else {
            for (let par in scope) {
              if (par.substring(0, 5) === "money") {
                scope[par] = ((scope.price * scope["number" + (par.length > 6 ? par.slice(par.length -2) : par.slice(par.length - 1))])/1000).toFixed(2);
              }
            }
            scope.numberfirst = ((scope.number4 || 0) + (scope.number5 || 0) + (scope.number6 || 0) + (scope.number7 || 0) + (scope.number8 || 0) + (scope.number9 || 0)).toFixed(1);
            scope.moneyfirst = (Number(scope.money4 || 0) + Number(scope.money5 || 0) + Number(scope.money6 || 0) + Number(scope.money7 || 0) + Number(scope.money8 || 0) + Number(scope.money9 || 0)).toFixed(2);
            scope.numbersecond = ((scope.number10 || 0) + (scope.number11 || 0) + (scope.number12 || 0) + (scope.number1 || 0) + (scope.number2 || 0) + (scope.number3 || 0)).toFixed(1);
            scope.moneysecond = (Number(scope.money10 || 0) + Number(scope.money11 || 0) + Number(scope.money12 || 0) + Number(scope.money1 || 0) + Number(scope.money2 || 0) + Number(scope.money3 || 0)).toFixed(2);
          }
          scope.numbertotal = (Number(scope.numberfirst || 0) + Number(scope.numbersecond || 0)).toFixed(1);
          scope.moneytotal = (Number(scope.moneyfirst || 0) + Number(scope.moneysecond || 0)).toFixed(2);
        }
    },
      addRow() {
        this.tableO.push([{}]);
      },
      deleteRow(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        }
      },
      changeType(val,row){
        row.type = val;
      },
      buttonClick(val) {
        if (val === 'back') {
          this.$router.push({
            name: 'PFANS1036View',
            params: {},
          });
        }
        if (val === 'save') {
              this.form.user_id = this.userlist;
              this.form.equipment_newyear = JSON.stringify(this.equipment_newyear);
              this.form.equipment_lastyear = JSON.stringify(this.equipment_lastyear);
              this.form.assets_newyear = JSON.stringify(this.assets_newyear);
              this.form.assets_lastyear = JSON.stringify(this.assets_lastyear);
              if (this.$route.params._id) {
                this.baseInfo.businessplan.businessplanid = this.$route.params._id;
                this.$store
                  .dispatch('PFANS1036Store/updateBusinessplan', this.baseInfo)
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
      }
    },
  };
</script>
<style rel="stylesheet/scss" lang="scss">

  .el-table {

  }

  .el-table__header-wrapper,
  .el-table__body-wrapper,
  .el-table__footer-wrapper {

  }

  .el-table::after {
    position: relative;
  }

  .el-table--scrollable-x .el-table__body-wrapper {

  }

  .tableClass {
    .el-table__fixed-right {
      height: 100% !important;
    }
  }


</style>
