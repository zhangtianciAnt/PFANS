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
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="refform"
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
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="pay4">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="giving4">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.May')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="pay5">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="giving5">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.June')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="pay6">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="giving6">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.July')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="pay7">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="giving7">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.August')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="pay8">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="giving8">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.September')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="pay9">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="giving9">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="payfirst">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="givingfirst">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.October')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="pay10">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="giving10">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.November')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="pay11">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="giving11">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.December')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="pay12">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="giving12">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.January')" align="center" width="110" >
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="pay1">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="giving1">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.February')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="pay2">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="giving2">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.March')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="pay3">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="giving3">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="paysecond">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="givingsecond">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_PAY')" align="center" width="110" prop="paytotal">
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_OVERTIMEPAY')" align="center" width="110" prop="givingtotal">
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
                <AssetsComponent :tableNewYear="assets_newyear" :tableLastYear="assets_lastyear"></AssetsComponent>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_SOFTWAREINVESTMENT')" style="margin-top: 2%" name="third">
              <div>
                <AssetsComponent :tableNewYear="equipment_newyear" :tableLastYear="equipment_lastyear"></AssetsComponent>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_TRAVELEXPENSES')" style="margin-top: 2%" name="forth">
                <BussinessComponent></BussinessComponent>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_PROJECTPLAN')" style="margin-top: 2%" name="fifth">
              <div>
                <el-tabs v-model="activeName6" type="border-card">
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_TOTAL')" name="first">
                    <el-table :data="tableK" header-cell-class-name="sub_bg_color_blue" stripe>
                      <el-table-column>
                        <el-table-column align="center" width="130" prop="total5" :formatter="formatterColumn">
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
                  </el-tab-pane>
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_A2')" name="seventh">
                    <TrustComponent :tableTrust="groupA2"></TrustComponent>
                  </el-tab-pane>
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_B1')" name="second">

                  </el-tab-pane>
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_B2')" name="third">
                    <el-table :data="tableM" :summary-method="getSummaries" show-summary stripe
                              header-cell-class-name="sub_bg_color_blue">
                      <el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_CLUBNAME')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="false"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.companyname"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNTENTRUSTED')" align="center"
                                         width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false" :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)"
                                             :step="1" v-model.trim="scope.row.commission" :no="scope.row" ></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.April')" align="center" width="210">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1"
                                             v-model.trim="scope.row.number4" :no="scope.row" >
                            </el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money4"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.May')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number5"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money5"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.June')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number6"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money6"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.July')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number7"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money7"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.August')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number8"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money8"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.September')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number9"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money9"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" @change="changeSum(scope.row)" :no="scope.row"
                                             v-model.trim="scope.row.numberfirsthalf"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.moneyfirsthalf"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.October')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number10"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money10"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.November')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number11"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money11"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.December')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number12"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money12"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.January')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number1"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money1"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.February')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number2"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money2"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.March')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number3"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money3"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.numbersecondhalf"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;"
                                             v-model.trim="scope.row.moneysecondhalf"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;"
                                             v-model.trim="scope.row.numberAnnual"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;"
                                             v-model.trim="scope.row.moneyAnnual"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.operation')" align="center" width="200">
                        <template slot-scope="scope">
                          <el-button
                            :disabled="!disable"
                            @click.native.prevent="deleteRowN(scope.$index, tableN)"
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
                  </el-tab-pane>
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_B3')" name="forth">
                    <el-table :data="tableN" :summary-method="getSummaries" show-summary stripe
                              header-cell-class-name="sub_bg_color_blue">
                      <el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_BUSHU')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="false"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.companyname"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNTENTRUSTED')" align="center"
                                         width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false" :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)"
                                             :step="1" v-model.trim="scope.row.commission" :no="scope.row" ></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.April')" align="center" width="210">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1"
                                      v-model.trim="scope.row.number4" :no="scope.row" >
                            </el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money4"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.May')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                      v-model.trim="scope.row.number5"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                      v-model.trim="scope.row.money5"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.June')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                      v-model.trim="scope.row.number6"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                      v-model.trim="scope.row.money6"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.July')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                      v-model.trim="scope.row.number7"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                      v-model.trim="scope.row.money7"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.August')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                      v-model.trim="scope.row.number8"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                      v-model.trim="scope.row.money8"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.September')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                      v-model.trim="scope.row.number9"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                      v-model.trim="scope.row.money9"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" @change="changeSum(scope.row)" :no="scope.row"
                                      v-model.trim="scope.row.numberfirsthalf"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                      v-model.trim="scope.row.moneyfirsthalf"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.October')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                      v-model.trim="scope.row.number10"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                      v-model.trim="scope.row.money10"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.November')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                      v-model.trim="scope.row.number11"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                      v-model.trim="scope.row.money11"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.December')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                      v-model.trim="scope.row.number12"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                      v-model.trim="scope.row.money12"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.January')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                      v-model.trim="scope.row.number1"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                      v-model.trim="scope.row.money1"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.February')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                      v-model.trim="scope.row.number2"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                      v-model.trim="scope.row.money2"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.March')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                      v-model.trim="scope.row.number3"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                      v-model.trim="scope.row.money3"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                      v-model.trim="scope.row.numbersecondhalf"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.moneysecondhalf"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.numberAnnual"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.moneyAnnual"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.operation')" align="center" width="200">
                        <template slot-scope="scope">
                          <el-button
                            :disabled="!disable"
                            @click.native.prevent="deleteRow(scope.$index, tableN)"
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
                  </el-tab-pane>
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_B4')" name="fifth">
                    <el-table :data="tableO" :summary-method="getSummaries" show-summary stripe
                              header-cell-class-name="sub_bg_color_blue">
                      <el-table-column>
                        <el-table-column :label="$t('label.PFANS5008VIEW_PROGRAM')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input :disabled="false"  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.companyname"></el-input>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNTENTRUSTED')" align="center"
                                         width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false" :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)"
                                             :step="1" v-model.trim="scope.row.commission" :no="scope.row" ></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.April')" align="center" width="210">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1"
                                             v-model.trim="scope.row.number4" :no="scope.row" >
                            </el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money4"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.May')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number5"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money5"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.June')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number6"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money6"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.July')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number7"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money7"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.August')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number8"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money8"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.September')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number9"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money9"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" @change="changeSum(scope.row)" :no="scope.row"
                                             v-model.trim="scope.row.numberfirsthalf"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.moneyfirsthalf"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.October')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number10"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money10"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.November')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number11"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money11"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.December')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number12"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money12"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.January')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number1"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money1"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.February')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number2"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money2"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.March')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="false"  :min="0" :precision="0" :max="99999" @change="changeSum(scope.row)" :step="1" :no="scope.row"
                                             v-model.trim="scope.row.number3"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.money3"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;" :no="scope.row"
                                             v-model.trim="scope.row.numbersecondhalf"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;"
                                             v-model.trim="scope.row.moneysecondhalf"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;"
                                             v-model.trim="scope.row.numberAnnual"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="210">
                          <template slot-scope="scope">
                            <el-input-number :disabled="true"  maxlength="20" style="width: 100%;"
                                             v-model.trim="scope.row.moneyAnnual"></el-input-number>
                          </template>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.operation')" align="center" width="200">
                        <template slot-scope="scope">
                          <el-button
                            :disabled="!disable"
                            @click.native.prevent="deleteRow(scope.$index, tableN)"
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
                  </el-tab-pane>

                </el-tabs>
              </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_VARIOUSFUNDS')" style="margin-top: 2%" name="sixth">
              <div>
                <el-tabs v-model="activeName7" type="border-card">
                  <el-table :data="tableO" :summary-method="(val) => getSummaries(val,1)" show-summary stripe
                            header-cell-class-name="sub_bg_color_blue">
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_NO')" align="center" width="110" type="index">
                      </el-table-column>
                    <el-table-column width="140" :label="$t('label.PFANS1036FORMVIEW_CONTENTTHOUSAND')" align="center">
                          <template slot-scope="scope">
                            <el-input  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.programme"></el-input>
                          </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1036FORMVIEW_SMALLPROJECT')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.sprogramme"></el-input>
                          </template>
                    </el-table-column>
                    <el-table-column  width="135" :label="$t('label.PFANS1036FORMVIEW_UNITPRICE')" align="center">
                      <template slot-scope="scope">
                        <el-input-number size="small" style="width:7vw"   :min="0" controls-position="right" :precision="1" @change="changeSum(scope.row)" :step="1000"
                                         v-model.trim="scope.row.price"></el-input-number>
                      </template>
                    </el-table-column>
                    <el-table-column  :label="$t('label.PFANS1036FORMVIEW_TYPE')" align="center" width="110">
                          <template slot-scope="scope">
                            <el-input  maxlength="20" style="width: 100%;"
                                      v-model.trim="scope.row.type"></el-input>
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
                    <el-table-column :label="$t('label.operation')" align="center" width="200">
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
              <div>
                    <el-table :data="tableP" header-cell-class-name="sub_bg_color_blue" stripe>
                      <el-table-column >
                        <el-table-column >
                          <el-table-column prop="name" :formatter="formatterDir" align="center" width="110">
                          </el-table-column>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_CONTENT')" align="center" width="110">
                          <el-table-column>
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.April')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.May')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.June')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.July')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.August')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.September')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.October')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.November')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.December')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.January')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.February')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.March')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.totalyear')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_TOTAL')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"
                                           width="110">
                            <template slot-scope="scope">
                              <el-input :disabled="true" maxlength="20" style="width: 100%;"
                                        v-model.trim="scope.row.place"></el-input>
                            </template>
                          </el-table-column>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.operation')" align="center" width="200">
                        <template slot-scope="scope">
                          <el-button
                            :disabled="!disable"
                            @click.native.prevent="deleteRow(scope.$index, tableP)"
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
  import {getOrgInfoByUserId} from '@/utils/customize';
  import dicselect from '../../../components/dicselect';
  import AssetsComponent from './AssetsComponent';
  import TrustComponent from './TrustComponent';
  import BussinessComponent from "./BussinessComponent";
  import moment from 'moment';
  export default {
    name: 'PFANS1012FormView',
    components: {
      dicselect,
      EasyNormalContainer,
      user,
      AssetsComponent,
      TrustComponent,
      BussinessComponent
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
        groupA2:[],
        equipment_newyear: [{assetstype:"0"},{assetstype:"1"}],
        equipment_lastyear: [{assetstype:"0"},{assetstype:"1"}],
        assets_newyear: [{assetstype:"0"},{assetstype:"1"}],
        assets_lastyear: [{assetstype:"0"},{assetstype:"1"}],
        tableTValue: '',
        tablePValue: '',
        tableZValue: '',
        tableYValue: '',
        error: '',
        options: [],
        selectType: 'Single',
        title: 'title.PFANS1036VIEW',
        userlist: '',
        activeName: 'first',
        activeName2: 'first',
        activeName3: 'first',
        activeName4: 'first',
        activeName5: 'first',
        activeName6: 'first',
        activeName7: 'first',
        activeName8: 'first',
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
        tableA:[],
        tableB: [],
        tableC: [
        ],
        tableD: [
        ],
        tableE: [
          {
            aaa: this.$t('label.PFANS1036FORMVIEW_TOTALDEPRECIATION'),
            bbb: this.$t('label.PFANS1036FORMVIEW_PLAN'),
          },
          {
            bbb: this.$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS'),
          },
        ],
        tableE2: [
          {
            aaa: this.$t('label.PFANS1036FORMVIEW_TOTALDEPRECIATION'),
            bbb: this.$t('label.PFANS1036FORMVIEW_PLAN'),
          },
          {
            bbb: this.$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS'),
          },
        ],
        tableF: [

        ],
        tableF2: [
          {assetstype:"0"},
          {assetstype:"1"}
        ],
        tableI2: [
          {
            aaa: this.$t('label.PFANS1036FORMVIEW_SUBTOTALDEPRECIATION'),
            bbb: this.$t('label.PFANS1036FORMVIEW_PLAN'),
          },
          {
            bbb: this.$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS'),
          },
        ],
        tableJ: [
        ],
        tableK: [
          {},
          {},
          {},
        ],
        tableL: [
          {},
        ],
        tableM: [
          {},
        ],
        tableN: [
          {
              businessplan_id:'',
              companyname:'',
              commission:'',
              prices:'',
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
        tableO: [
          {
              businessplandet_id:'',
              businessplan_id:'',
              plantype:'4',
              companyname:'',
              commission:'',
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
        tableP: [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],
        tableQ: [
        ],
        tableR: [
          {},
          {},
          {},
        ],
        baseInfo: {},
        arrayMonth: [],
        form: {
          centerid: '',
          groupid: '',
          user_id: '',
          trustb3: '',
        },
        rules: {
          user_id: [{
            required: true,
            validator: checkuser,
            trigger: 'change',
          }],
        },
        code1: '',
        code2: '',
        code3: '',
        code4: '',
        code5: '',
        code6: '',
        code7: '',
        code8: '',
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
            debugger
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
          this.groupA2  =  this.$store.getters.orgGroupList.map(
             group => {
               return {groupid:group.groupid,groupname:group.companyen}
             }
          )
        }
        if (this.userlist !== null && this.userlist !== '') {
          let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
          this.form.centerid = rst.centerNmae;
          this.form.center_id = rst.centerId;
          this.form.groupid = rst.groupNmae;
          this.form.group_id = rst.groupId;
          this.form.teamid = rst.teamNmae;
          this.form.user_id = this.$store.getters.userinfo.userid;
          this.getGroupB2(this.form.group_id);
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
      }
    },
    methods: {
      formatterDir(row,column,cellValue,index){
        debugger
         if(column.property === "name"){
              switch (index) {
                 case 1:
                   return this.$t('PFANS1036FORMVIEW_TAB1VALUE1');
                   break;
                 case 2:
                   return this.$t('PFANS1036FORMVIEW_TAB2VALUE1');
                   break;
                 case 3:
                   return this.$t('PFANS1036FORMVIEW_TAB3VALUE1');
                   break;
                 case 7:
                  return this.$t('PFANS1036FORMVIEW_TAB4VALUE1');
                  break;
                 case 8:
                  return this.$t('PFANS1036FORMVIEW_TAB5VALUE1');
                  break;
                 case 9:
                  return this.$t('PFANS1036FORMVIEW_TAB6VALUE1');
                  break;
                 case 10:
                  return this.$t('PFANS1036FORMVIEW_TAB7VALUE1');
                  break;
                 case 11:
                  return this.$t('PFANS1036FORMVIEW_TAB8VALUE1');
                  break;
                 case 12:
                  return this.$t('PFANS1036FORMVIEW_TAB9VALUE5');
                  break;
                 case 13:
                  return this.$t('PFANS1036FORMVIEW_TAB10VALUE1');
                  break;
              }
         }
      },
      getGroupB2(id){
        this.$store
          .dispatch('PFANS1036Store/getPlan', {"years":2019,"groupid":id})
          .then(response => {
            if(response){
              let arr = [4,5,6,7,8,9,10,11,12,1,2,3];
            let supplierinfoList =  this.$store.getters.supplierinforList.map(list => {return {"supplierinfor_id":list.supplierinfor_id,"supchinese":list.supchinese}});
            let outside = response.filter(res => res.type === 1);
            let employed = JSON.parse(outside[0].employed);
            let newentry = JSON.parse(outside[0].newentry);
              supplierinfoList.forEach(
                   list => {
                     employed.forEach(
                       em => {
                         if( list.supplierinfor_id === em.suppliernameid ){
                           debugger
                           for (let i = 1; i <= 12; i++) {
                             list["number"+ i ] = (list["number"+ i ]||0) + 1;
                           }
                         }
                       }
                     )
                     newentry.forEach(
                       em => {
                         if( list.supplierinfor_id === em.supchinese && em.isoutside === false ){
                         debugger
                           console.log(moment(em.entermouth).month());
                         let index = arr.indexOf(Number(moment(em.entermouth).month()));
                           for (let i = index; i < arr.length; i++) {
                             list["number"+ arr[i] ] = (list["number"+ arr[i] ]||0) + 1;
                           }
                         }
                       }
                     )
                   }
              )

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
             return this.$t('label.PFANS1036FORMVIEW_B1');
          }else if(index === 1){
             return this.$t('label.PFANS1036FORMVIEW_B2');
          }else if(index === 2){
             return  this.$t('label.PFANS1036FORMVIEW_B3');
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
        debugger
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
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss">
  .el-table {
    overflow-x: auto;
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
