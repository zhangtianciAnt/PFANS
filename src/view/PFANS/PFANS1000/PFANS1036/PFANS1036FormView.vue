<template>
  <div style="min-height: 100%">
    <EasyNormalContainer
      :buttonList="buttonList"
      :canStart="canStart"
      :title="title"
      @buttonClick="buttonClick"
      ref="container"
    >
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" employedref="refform"
                 style="padding: 1.5vw">
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
          <div style="padding-bottom: 0.5%;padding-left: 73%">
            <el-divider direction="vertical"></el-divider>
            <span style="color:#f47f31">{{this.form.year + " " + this.$t('label.PFANS1036FORMVIEW_BUSINESSYEAR')}}</span>
            <el-divider direction="vertical"></el-divider>
            <span style="color:#f47f31">{{(this.org.redirict === 0 ? this.$t('label.PFANS1036FORMVIEW_ZJJJDEPARTMENT') : this.$t('label.PFANS1036FORMVIEW_JJDEPARTMENT'))||""}}</span>
            <el-divider direction="vertical"></el-divider>
            <span style="color:#f47f31">{{(this.org.companyen)||""}}</span>
            <el-divider direction="vertical"></el-divider>
          </div>
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
                    <TrustComponent :tableTrust="groupB1" @sum="getSumB1" :disabled="true"></TrustComponent>
                  </el-tab-pane>
                  <el-tab-pane :label="$t('label.PFANS1036FORMVIEW_B2')" name="third">
                    <TrustComponent :tableTrust="groupB2" @sum="getSumB2" :disabled="true"></TrustComponent>
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
                  <el-tab-pane :label="$t('label.PFANS1036VIEW_COMMUNICATION')" name="first">
                    <el-table :data="tableO1" :summary-method="(val) => getSummaries(val,'o1')" show-summary stripe
                              header-cell-class-name="sub_bg_color_blue">
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_NO')" align="center" width="110" type="index" fixed>
                      </el-table-column>
                      <el-table-column width="150" :label="$t('label.PFANS1036FORMVIEW_CONTENTTHOUSAND')" align="center" prop="programme">
                        <template slot-scope="scope">
                          <el-input size="small"  maxlength="20" style="width: 100%;"
                                    v-model="scope.row.programme"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_SMALLPROJECT')" align="center" width="150" prop="sprogramme">
                        <template slot-scope="scope">
                          <el-input size="small"  maxlength="20" style="width: 100%;"
                                    v-model="scope.row.sprogramme"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column  width="135" :label="$t('label.PFANS1036FORMVIEW_UNITPRICE')" align="center" prop="price">
                        <template slot-scope="scope">
                          <el-input-number size="small" style="width:7vw"   :min="0" controls-position="right" :precision="1" @change="changeSum(scope.row)" :step="1000"
                                           v-model="scope.row.price"></el-input-number>
                        </template>
                      </el-table-column>
                      <el-table-column  :label="$t('label.PFANS1036FORMVIEW_TYPE')" align="center" width="135" prop="type">
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
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number4">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw"  :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,4)" :step="1"
                                               v-model="scope.row.number4">
                              </el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money4">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.May')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number5">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1" @change="changeSum(scope.row,5)" :step="1"
                                               v-model="scope.row.number5"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money5">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.June')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number6">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw"  :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,6)" :step="1"
                                               v-model="scope.row.number6"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money6">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.July')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number7">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,7)" :step="1"
                                               v-model="scope.row.number7"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money7">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.August')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number8">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,8)" :step="1"
                                               v-model="scope.row.number8"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money8">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.September')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number9">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,9)" :step="1"
                                               v-model="scope.row.number9"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money9">
                          </el-table-column>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.October')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number10">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,10)" :step="1"
                                               v-model="scope.row.number10"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money10">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.November')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number11">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw"  :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,11)" :step="1"
                                               v-model="scope.row.number11"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money11">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.December')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number12">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,12)" :step="1"
                                               v-model="scope.row.number12"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money12">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.January')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number1">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,1)" :step="1"
                                               v-model="scope.row.number1"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money1">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.February')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number2">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,2)" :step="1"
                                               v-model="scope.row.number2"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money2">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.March')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number3">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,3)" :step="1"
                                               v-model="scope.row.number3"></el-input-number>
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
                  <el-tab-pane :label="$t('label.PFANS1036VIEW_USING')" name="second">
                    <el-table :data="tableO2" :summary-method="(val) => getSummaries(val,'o2')" show-summary stripe
                              header-cell-class-name="sub_bg_color_blue">
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_NO')" align="center" width="110" type="index" fixed>
                      </el-table-column>
                      <el-table-column width="150" :label="$t('label.PFANS1036FORMVIEW_CONTENTTHOUSAND')" align="center" prop="programme">
                        <template slot-scope="scope">
                          <el-input size="small"  maxlength="20" style="width: 100%;"
                                    v-model="scope.row.programme"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_SMALLPROJECT')" align="center" width="150" prop="sprogramme">
                        <template slot-scope="scope">
                          <el-input size="small"  maxlength="20" style="width: 100%;"
                                    v-model="scope.row.sprogramme"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column  width="135" :label="$t('label.PFANS1036FORMVIEW_UNITPRICE')" align="center" prop="price">
                        <template slot-scope="scope">
                          <el-input-number size="small" style="width:7vw"   :min="0" controls-position="right" :precision="1" @change="changeSum(scope.row)" :step="1000"
                                           v-model="scope.row.price"></el-input-number>
                        </template>
                      </el-table-column>
                      <el-table-column  :label="$t('label.PFANS1036FORMVIEW_TYPE')" align="center" width="135" prop="type">
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
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number4">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,4)" :step="1"
                                               v-model="scope.row.number4">
                              </el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money4">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.May')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number5">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1" @change="changeSum(scope.row,5)" :step="1"
                                               v-model="scope.row.number5"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money5">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.June')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number6">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw"  :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,6)" :step="1"
                                               v-model="scope.row.number6"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money6">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.July')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number7">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,7)" :step="1"
                                               v-model="scope.row.number7"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money7">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.August')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number8">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,8)" :step="1"
                                               v-model="scope.row.number8"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money8">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.September')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number9">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,9)" :step="1"
                                               v-model="scope.row.number9"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money9">
                          </el-table-column>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.October')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number10">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,10)" :step="1"
                                               v-model="scope.row.number10"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money10">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.November')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number11">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw"  :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,11)" :step="1"
                                               v-model="scope.row.number11"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money11">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.December')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number12">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,12)" :step="1"
                                               v-model="scope.row.number12"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money12">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.January')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number1">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,1)" :step="1"
                                               v-model="scope.row.number1"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money1">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.February')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number2">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,2)" :step="1"
                                               v-model="scope.row.number2"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money2">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.March')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number3">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,3)" :step="1"
                                               v-model="scope.row.number3"></el-input-number>
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
                  <el-tab-pane :label="$t('label.PFANS1036VIEW_TRAINING')" name="third">
                    <el-table :data="tableO3" :summary-method="(val) => getSummaries(val,'o3')" show-summary stripe
                              header-cell-class-name="sub_bg_color_blue">
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_NO')" align="center" width="110" type="index" fixed>
                      </el-table-column>
                      <el-table-column width="150" :label="$t('label.PFANS1036FORMVIEW_CONTENTTHOUSAND')" align="center" prop="programme">
                        <template slot-scope="scope">
                          <el-input size="small"  maxlength="20" style="width: 100%;"
                                    v-model="scope.row.programme"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_SMALLPROJECT')" align="center" width="150" prop="sprogramme">
                        <template slot-scope="scope">
                          <el-input size="small"  maxlength="20" style="width: 100%;"
                                    v-model="scope.row.sprogramme"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column  width="135" :label="$t('label.PFANS1036FORMVIEW_UNITPRICE')" align="center" prop="price">
                        <template slot-scope="scope">
                          <el-input-number size="small" style="width:7vw"   :min="0" controls-position="right" :precision="1" @change="changeSum(scope.row)" :step="1000"
                                           v-model="scope.row.price"></el-input-number>
                        </template>
                      </el-table-column>
                      <el-table-column  :label="$t('label.PFANS1036FORMVIEW_TYPE')" align="center" width="135" prop="type">
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
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number4">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,4)" :step="1"
                                               v-model="scope.row.number4">
                              </el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money4">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.May')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number5">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1" @change="changeSum(scope.row,5)" :step="1"
                                               v-model="scope.row.number5"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money5">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.June')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number6">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw"  :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,6)" :step="1"
                                               v-model="scope.row.number6"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money6">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.July')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number7">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,7)" :step="1"
                                               v-model="scope.row.number7"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money7">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.August')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number8">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,8)" :step="1"
                                               v-model="scope.row.number8"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money8">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.September')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number9">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,9)" :step="1"
                                               v-model="scope.row.number9"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money9">
                          </el-table-column>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.October')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number10">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,10)" :step="1"
                                               v-model="scope.row.number10"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money10">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.November')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number11">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw"  :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,11)" :step="1"
                                               v-model="scope.row.number11"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money11">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.December')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number12">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,12)" :step="1"
                                               v-model="scope.row.number12"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money12">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.January')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number1">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,1)" :step="1"
                                               v-model="scope.row.number1"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money1">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.February')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number2">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,2)" :step="1"
                                               v-model="scope.row.number2"></el-input-number>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money2">
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.March')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number3">
                            <template slot-scope="scope">
                              <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,3)" :step="1"
                                               v-model="scope.row.number3"></el-input-number>
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
                      <el-table-column :label="$t('label.PFANS1036FORMVIEW_NO')" align="center" width="110" type="index" fixed>
                      </el-table-column>
                    <el-table-column width="150" :label="$t('label.PFANS1036FORMVIEW_CONTENTTHOUSAND')" align="center" prop="programme">
                          <template slot-scope="scope">
                            <el-input size="small"  maxlength="20" style="width: 100%;"
                                      v-model="scope.row.programme"></el-input>
                          </template>
                    </el-table-column>
                    <el-table-column :label="$t('label.PFANS1036FORMVIEW_SMALLPROJECT')" align="center" width="150" prop="sprogramme">
                          <template slot-scope="scope">
                            <el-input size="small"  maxlength="20" style="width: 100%;"
                                      v-model="scope.row.sprogramme"></el-input>
                          </template>
                    </el-table-column>
                    <el-table-column  width="135" :label="$t('label.PFANS1036FORMVIEW_UNITPRICE')" align="center" prop="price">
                      <template slot-scope="scope">
                        <el-input-number size="small" style="width:7vw"   :min="0" controls-position="right" :precision="1" @change="changeSum(scope.row)" :step="1000"
                                         v-model="scope.row.price"></el-input-number>
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
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number4">
                          <template slot-scope="scope">
                            <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,4)" :step="1"
                                             v-model="scope.row.number4">
                            </el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money4">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.May')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number5">
                          <template slot-scope="scope">
                            <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1" @change="changeSum(scope.row,5)" :step="1"
                                             v-model="scope.row.number5"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money5">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.June')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number6">
                          <template slot-scope="scope">
                            <el-input-number size="small" style="width:6vw"  :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,6)" :step="1"
                                             v-model="scope.row.number6"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money6">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.July')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number7">
                          <template slot-scope="scope">
                            <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,7)" :step="1"
                                             v-model="scope.row.number7"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money7">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.August')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number8">
                          <template slot-scope="scope">
                            <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,8)" :step="1"
                                             v-model="scope.row.number8"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money8">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.September')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number9">
                          <template slot-scope="scope">
                            <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,9)" :step="1"
                                             v-model="scope.row.number9"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money9">
                        </el-table-column>
                      </el-table-column>
                    </el-table-column>
                    <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                      <el-table-column :label="$t('label.October')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number10">
                          <template slot-scope="scope">
                            <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,10)" :step="1"
                                             v-model="scope.row.number10"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money10">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.November')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number11">
                          <template slot-scope="scope">
                            <el-input-number size="small" style="width:6vw"  :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,11)" :step="1"
                                             v-model="scope.row.number11"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money11">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.December')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number12">
                          <template slot-scope="scope">
                            <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,12)" :step="1"
                                             v-model="scope.row.number12"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money12">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.January')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number1">
                          <template slot-scope="scope">
                            <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,1)" :step="1"
                                             v-model="scope.row.number1"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money1">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.February')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number2">
                          <template slot-scope="scope">
                            <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,2)" :step="1"
                                             v-model="scope.row.number2"></el-input-number>
                          </template>
                        </el-table-column>
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" width="130" prop="money2">
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.March')" align="center" width="110">
                        <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')" align="center" width="130" prop="number3">
                          <template slot-scope="scope">
                            <el-input-number size="small" style="width:6vw"   :min="0" controls-position="right" :precision="1"  @change="changeSum(scope.row,3)" :step="1"
                                             v-model="scope.row.number3"></el-input-number>
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
                    <el-table :data="tableP" header-cell-class-name="sub_bg_color_blue" :span-method="objectSpanMethod"  height="800" :row-class-name="rowClass">
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
                            <el-input-number :precision="2"  size="small" v-model="scope.row.money4" :controls="false"  :min="0"  style="width:5vw" v-if="[40,44,45,48,54,55,56,57].includes(scope.$index)" @change="computedSum"></el-input-number>
                              <span v-else>{{scope.row.money4}}</span>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center"  width="110" prop="actual4">
                            <template slot-scope="scope">
                              <el-input-number :precision="2" size="small" v-model="scope.row.actual4" :controls="false"  :min="0"  style="width:5vw" v-if="[40,44,45,48,54,55,56,57].includes(scope.$index)" @change="computedSum"></el-input-number>
                              <span  v-else>{{scope.row.actual4}}</span>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.May')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110" prop="money5">
                            <template slot-scope="scope">
                            <el-input-number :precision="2" size="small" v-model="scope.row.money5" :controls="false"  :min="0"  style="width:5vw" v-if="[40,44,45,48,54,55,56,57].includes(scope.$index)" @change="computedSum"></el-input-number>
                            <span v-else>{{scope.row.money5}}</span>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center" width="110" prop="actual5">
                            <template slot-scope="scope">
                              <el-input-number :precision="2" size="small" v-model="scope.row.actual5" :controls="false"  :min="0"  style="width:5vw" v-if="[40,44,45,48,54,55,56,57].includes(scope.$index)" @change="computedSum"></el-input-number>
                              <span v-else>{{scope.row.actual5}}</span>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.June')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110" prop="money6">
                            <template slot-scope="scope">
                            <el-input-number :precision="2" size="small" v-model="scope.row.money6" :controls="false"  :min="0"  style="width:5vw" v-if="[40,44,45,48,54,55,56,57].includes(scope.$index)" @change="computedSum"></el-input-number>
                            <span v-else>{{scope.row.money6}}</span>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center" width="110" prop="actual6">
                            <template slot-scope="scope">
                              <el-input-number :precision="2" size="small" v-model="scope.row.actual6" :controls="false"  :min="0"  style="width:5vw" v-if="[40,44,45,48,54,55,56,57].includes(scope.$index)" @change="computedSum"></el-input-number>
                              <span v-else>{{scope.row.actual6}}</span>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.July')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110" prop="money7">
                            <template slot-scope="scope">
                            <el-input-number :precision="2" size="small" v-model="scope.row.money7" :controls="false"  :min="0"  style="width:5vw" v-if="[40,44,45,48,54,55,56,57].includes(scope.$index)" @change="computedSum"></el-input-number>
                            <span v-else>{{scope.row.money7}}</span>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center" width="110" prop="actual7">
                            <template slot-scope="scope">
                              <el-input-number :precision="2" size="small" v-model="scope.row.actual7" :controls="false"  :min="0"  style="width:5vw" v-if="[40,44,45,48,54,55,56,57].includes(scope.$index)" @change="computedSum"></el-input-number>
                              <span v-else>{{scope.row.actual7}}</span>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.August')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110" prop="money8">
                            <template slot-scope="scope">
                            <el-input-number :precision="2" size="small" v-model="scope.row.money8" :controls="false"  :min="0"  style="width:5vw" v-if="[40,44,45,48,54,55,56,57].includes(scope.$index)" @change="computedSum"></el-input-number>
                            <span v-else>{{scope.row.money8}}</span>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center" width="110" prop="actual8">
                            <template slot-scope="scope">
                              <el-input-number :precision="2" size="small" v-model="scope.row.actual8" :controls="false"  :min="0"  style="width:5vw" v-if="[40,44,45,48,54,55,56,57].includes(scope.$index)" @change="computedSum"></el-input-number>
                              <span v-else>{{scope.row.actual8}}</span>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.September')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110" prop="money9">
                            <template slot-scope="scope">
                            <el-input-number :precision="2" size="small" v-model="scope.row.money9" :controls="false"  :min="0"  style="width:5vw" v-if="[40,44,45,48,54,55,56,57].includes(scope.$index)" @change="computedSum"></el-input-number>
                            <span v-else>{{scope.row.money9}}</span>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center" width="110" prop="actual9">
                            <template slot-scope="scope">
                              <el-input-number :precision="2" size="small" v-model="scope.row.actual9" :controls="false"  :min="0"  style="width:5vw" v-if="[40,44,45,48,54,55,56,57].includes(scope.$index)" @change="computedSum"></el-input-number>
                              <span v-else>{{scope.row.actual9}}</span>
                            </template>
                          </el-table-column>
                        </el-table-column>
                      </el-table-column>
                      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
                        <el-table-column :label="$t('label.October')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110" prop="money10">
                            <template slot-scope="scope">
                            <el-input-number :precision="2" size="small" v-model="scope.row.money10" :controls="false"  :min="0"  style="width:5vw" v-if="[40,44,45,48,54,55,56,57].includes(scope.$index)" @change="computedSum"></el-input-number>
                            <span v-else>{{scope.row.money10}}</span>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center" width="110" prop="actual10">
                            <template slot-scope="scope">
                              <el-input-number :precision="2" size="small" v-model="scope.row.actual10" :controls="false"  :min="0"  style="width:5vw" v-if="[40,44,45,48,54,55,56,57].includes(scope.$index)" @change="computedSum"></el-input-number>
                              <span v-else>{{scope.row.actual10}}</span>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.November')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110" prop="money11">
                            <template slot-scope="scope">
                            <el-input-number :precision="2" size="small" v-model="scope.row.money11" :controls="false"  :min="0"  style="width:5vw" v-if="[40,44,45,48,54,55,56,57].includes(scope.$index)" @change="computedSum"></el-input-number>
                            <span v-else>{{scope.row.money11}}</span>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center" width="110" prop="actual11">
                            <template slot-scope="scope">
                              <el-input-number :precision="2" size="small" v-model="scope.row.actual11" :controls="false"  :min="0"  style="width:5vw" v-if="[40,44,45,48,54,55,56,57].includes(scope.$index)" @change="computedSum"></el-input-number>
                              <span v-else>{{scope.row.actual11}}</span>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.December')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110" prop="money12">
                            <template slot-scope="scope">
                            <el-input-number :precision="2" size="small" v-model="scope.row.money12" :controls="false"  :min="0"  style="width:5vw" v-if="[40,44,45,48,54,55,56,57].includes(scope.$index)" @change="computedSum"></el-input-number>
                            <span v-else>{{scope.row.money12}}</span>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center" width="110" prop="actual12">
                            <template slot-scope="scope">
                              <el-input-number :precision="2" size="small" v-model="scope.row.actual12" :controls="false"  :min="0"  style="width:5vw" v-if="[40,44,45,48,54,55,56,57].includes(scope.$index)" @change="computedSum"></el-input-number>
                              <span v-else>{{scope.row.actual12}}</span>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.January')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110" prop="money1">
                            <template slot-scope="scope">
                            <el-input-number :precision="2" size="small" v-model="scope.row.money1" :controls="false"  :min="0"  style="width:5vw" v-if="[40,44,45,48,54,55,56,57].includes(scope.$index)" @change="computedSum"></el-input-number>
                            <span v-else>{{scope.row.money1}}</span>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center" width="110" prop="actual1">
                            <template slot-scope="scope">
                              <el-input-number :precision="2" size="small" v-model="scope.row.actual1" :controls="false"  :min="0"  style="width:5vw" v-if="[40,44,45,48,54,55,56,57].includes(scope.$index)" @change="computedSum"></el-input-number>
                              <span v-else>{{scope.row.actual1}}</span>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.February')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110" prop="money2">
                            <template slot-scope="scope">
                            <el-input-number :precision="2" size="small" v-model="scope.row.money2" :controls="false"  :min="0"  style="width:5vw" v-if="[40,44,45,48,54,55,56,57].includes(scope.$index)" @change="computedSum"></el-input-number>
                            <span v-else>{{scope.row.money2}}</span>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center" width="110" prop="actual2">
                            <template slot-scope="scope">
                              <el-input-number :precision="2" size="small" v-model="scope.row.actual2" :controls="false"  :min="0"  style="width:5vw" v-if="[40,44,45,48,54,55,56,57].includes(scope.$index)" @change="computedSum"></el-input-number>
                              <span v-else>{{scope.row.actual2}}</span>
                            </template>
                          </el-table-column>
                        </el-table-column>
                        <el-table-column :label="$t('label.March')" align="center" width="110">
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_PLAN')" align="center" width="110" prop="money3">
                            <template slot-scope="scope">
                            <el-input-number :precision="2" size="small" v-model="scope.row.money3" :controls="false"  :min="0"  style="width:5vw" v-if="[40,44,45,48,54,55,56,57].includes(scope.$index)" @change="computedSum"></el-input-number>
                            <span v-else>{{scope.row.money3}}</span>
                            </template>
                          </el-table-column>
                          <el-table-column :label="$t('label.PFANS1036FORMVIEW_ACHIEVEMENTS')" align="center" width="110" prop="actual3">
                            <template slot-scope="scope">
                              <el-input-number :precision="2" size="small" v-model="scope.row.actual3" :controls="false"  :min="0"  style="width:5vw" v-if="[40,44,45,48,54,55,56,57].includes(scope.$index)" @change="computedSum"></el-input-number>
                              <span v-else>{{scope.row.actual3}}</span>
                            </template>
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
        org:[],
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
        sumO1:[],
        sumO2:[],
        sumO3:[],
        sumO4:[],
        personTable:[],
        assets1:[],
        assets2:[],
        travel:[],
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
        tableO1:[{}],
        tableO2:[{}],
        tableO3:[{}],
        tableO: [{}],
          tableP: [{name1:"PJ086001"},{name1:"PJ086002"},{name1:"PJ086003"},{name1:this.$t('label.PFANS1036FORMVIEW_TAB1VALUE2')},{name1:this.$t('label.PFANS1036FORMVIEW_TAB1VALUE3')}
        ,{name1:this.$t('label.PFANS1036FORMVIEW_TAB1VALUE4')},{name1:"PJ073001"},{name1:"-"},{name1:"-"},{name1:"-"},{name1:"-"},{name1:"PJ073002"},{name1:"-"},{name1:"PJ073"},{name1:"PJ074001"},{name1:"PJ074002"},{name1:"PJ074003"},
            {name1:"PJ074004"},{name1:"PJ074005"},{name1:"PJ074006"},{name1:"PJ074"},{name1:"PJ075001"},{name1:"PJ075002"},{name1:"PJ075003"},{name1:"PJ075004"},{name1:"PJ075005"},
            {name1:"PJ075"},{name1:"PJ076001"},{name1:"PJ076002"},{name1:"PJ076003"},{name1:"PJ076"},{name1:"PJ077001"},{name1:"PJ077002"},{name1:"PJ077003"},{name1:"PJ077004"},{name1:"PJ077005"},
            {name1:"PJ077006"},{name1:"PJ077007"},{name1:"PJ077008"},{name1:"PJ077009"},{name1:"PJ077010",type:40},{name1:"PJ077"},{name1:this.$t('label.PFANS2005FORMVIEW_TOTAL')},{},{name1:this.$t('label.PFANS1036FORMVIEW_TAB3VALUE2'),type:44}
            ,{name1:this.$t('label.PFANS1036FORMVIEW_TAB3VALUE3'),type:45},{name1:this.$t('label.PFANS1036FORMVIEW_TAB3VALUE4')},{},{type:48},{},{},{name1:this.$t('label.PFANS1036FORMVIEW_TAB8VALUE2')},
            {name1:this.$t('label.PFANS1036FORMVIEW_TAB8VALUE3')},{name1:this.$t('label.PFANS1036FORMVIEW_TAB8VALUE4')},
            {name1:this.$t('label.PFANS1036FORMVIEW_TAB9VALUE2'),type:54},{name1:this.$t('label.PFANS1036FORMVIEW_TAB9VALUE3'),type:55},{name1:this.$t('label.PFANS1036FORMVIEW_TAB9VALUE4'),type:56},{name1:this.$t('label.PFANS1036FORMVIEW_TAB9VALUE5'),type:57},
            {name1:this.$t('label.PFANS1036FORMVIEW_TAB10VALUE2')},{name1:this.$t('label.PFANS1036FORMVIEW_TAB10VALUE3')},{name1:this.$t('label.PFANS1036FORMVIEW_TAB10VALUE4')},{name1:this.$t('label.PFANS1036FORMVIEW_TAB10VALUE5')},{name1:this.$t('label.PFANS1036FORMVIEW_TAB10VALUE6')},{name1:this.$t('label.PFANS1036FORMVIEW_TAB10VALUE9')}
            ],
        baseInfo: {},
        form: {
          center_id: '',
          group_id: '',
          user_id: '',
          year:'',
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
              this.org = this.$store.getters.orgGroupList.filter(val => val.groupid === this.form.group_id)[0];
              this.equipment_newyear = JSON.parse(this.form.equipment_newyear);
              this.equipment_lastyear = JSON.parse(this.form.equipment_lastyear);
              this.assets_newyear = JSON.parse(this.form.assets_newyear);
              this.assets_lastyear = JSON.parse(this.form.assets_lastyear);
              let table_p = JSON.parse(this.form.tableP);
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
              table_p.forEach(
                val => {
                  this.tableP[val.type] = val;
                }
              )
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
        this.getPersonTable(this.$route.params.groupid,this.$route.params.year);
      } else {
        this.form.year = moment().subtract(3,'months').year();
        let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
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
          this.form.center_id = rst.centerId||"";
          this.form.group_id = rst.groupId||"";
          this.form.user_id = this.$store.getters.userinfo.userid;
          this.org = this.$store.getters.orgGroupList.filter(val => val.groupid === this.form.group_id)[0];
          this.getGroupB1(this.form.group_id);
          this.getPersonTable(rst.groupId,this.form.year);
      }
    },
    computed:{
        tableSZTotal:function(){
          if(this.sumA1.length > 0){
            this.tableK[0].number1 = "0.00";
            this.tableK[0].money1 = (Number(this.sumA1[2]||0) + Number(this.sumA1[3]||0) + Number(this.sumA1[4]||0)).toFixed(2);
            this.tableK[0].number2 = "0.00";
            this.tableK[0].money2 = (Number(this.sumA1[5]||0) + Number(this.sumA1[6]||0) + Number(this.sumA1[7]||0)).toFixed(2);
            this.tableK[0].numberfirst = "0.00";
            this.tableK[0].moneyfirst = (Number(this.tableK[0].money1) + Number(this.tableK[0].money2)).toFixed(2);
            this.tableK[0].number3 = "0.00";
            this.tableK[0].money3 = (Number(this.sumA1[9]||0) + Number(this.sumA1[10]||0) + Number(this.sumA1[11]||0)).toFixed(2);
            this.tableK[0].number4 = "0.00";
            this.tableK[0].money4 = (Number(this.sumA1[12]||0) + Number(this.sumA1[13]||0) + Number(this.sumA1[14]||0)).toFixed(2);
            this.tableK[0].numbersecond = "0.00";
            this.tableK[0].moneysecond = (Number(this.tableK[0].money3) + Number(this.tableK[0].money4)).toFixed(2);
            this.tableK[0].numbertotal =  "0.00";
            this.tableK[0].moneytotal = (Number(this.tableK[0].moneyfirst) + Number(this.tableK[0].moneysecond)).toFixed(2);
          }
          ["sumA2","sumB1","sumB2","sumB3","sumC1"].forEach(
            (val,index) => {
              if(this[val].length > 0){
                this.tableK[index + 1].number1 = (Number(this[val][2]||0) + Number(this[val][4]||0) + Number(this[val][6]||0)).toFixed(2);
                this.tableK[index + 1].money1 = (Number(this[val][3]||0) + Number(this[val][5]||0) + Number(this[val][7]||0)).toFixed(2);
                this.tableK[index + 1].number2 = (Number(this[val][8]||0) + Number(this[val][10]||0) + Number(this[val][12]||0)).toFixed(2);
                this.tableK[index + 1].money2 = (Number(this[val][9]||0) + Number(this[val][11]||0) + Number(this[val][13]||0)).toFixed(2);
                this.tableK[index + 1].numberfirst = (Number(this.tableK[index + 1].number1) + Number(this.tableK[index + 1].number2)).toFixed(2);
                this.tableK[index + 1].moneyfirst = (Number(this.tableK[index + 1].money1) + Number(this.tableK[index + 1].money2)).toFixed(2);
                this.tableK[index + 1].number3 = (Number(this[val][16]||0) + Number(this[val][18]||0) + Number(this[val][20]||0)).toFixed(2);
                this.tableK[index + 1].money3 = (Number(this[val][17]||0) + Number(this[val][19]||0) + Number(this[val][21]||0)).toFixed(2);
                this.tableK[index + 1].number4 = (Number(this[val][22]||0) + Number(this[val][24]||0) + Number(this[val][26]||0)).toFixed(2);
                this.tableK[index + 1].money4 = (Number(this[val][23]||0) + Number(this[val][25]||0) + Number(this[val][27]||0)).toFixed(2);
                this.tableK[index + 1].numbersecond = (Number(this.tableK[index + 1].number3) + Number(this.tableK[index + 1].number4)).toFixed(2);
                this.tableK[index + 1].moneysecond = (Number(this.tableK[index + 1].money3) + Number(this.tableK[index + 1].money4)).toFixed(2);
                this.tableK[index + 1].numbertotal =  (Number(this.tableK[index + 1].numberfirst) + Number(this.tableK[index + 1].numbersecond)).toFixed(2);
                this.tableK[index + 1].moneytotal = (Number(this.tableK[index + 1].moneyfirst) + Number(this.tableK[index + 1].moneysecond)).toFixed(2);
              }
            }
          )
        return this.tableK;
      }
    },
    methods: {
      getPersonTable(groupid,year){
        this.$store
          .dispatch('PFANS1036Store/getPersonPlan', {'groupid':groupid,'year':year})
          .then( response => {
            if(response[0])  this.tableC = JSON.parse(response[0]);
            if(response[1])  this.tableD = JSON.parse(response[1]);
            if(response[2]) this.tableA = [JSON.parse(response[2])];
            if(response[2])  this.tableB = [JSON.parse(response[2])];
            let actual = JSON.parse(response[3]);
            console.log(this.tableP)
            actual.forEach(
              val => {
                if(val.code === "PJ111001"){
                  Object.assign(this.tableP[11],val)
                }else if(val.code === "PJ111002"){
                  Object.assign(this.tableP[16],val)
                }else if(val.code === "PJ111003"){
                  Object.assign(this.tableP[17],val)
                }else if(val.code === "PJ111004"){
                  Object.assign(this.tableP[18],val)
                }else if(val.code === "PJ111005"){
                  Object.assign(this.tableP[19],val)
                }else if(val.code === "PJ111006"){
                  Object.assign(this.tableP[21],val)
                }else if(val.code === "PJ111007"){
                  Object.assign(this.tableP[31],val)
                }else if(val.code === "PJ111008"){
                  Object.assign(this.tableP[32],val)
                }else if(val.code === "PJ111009"){
                  Object.assign(this.tableP[33],val)
                }else if(val.code === "PJ111010"){
                  Object.assign(this.tableP[34],val)
                }else if(val.code === "PJ111011"){
                  Object.assign(this.tableP[35],val)
                }else if(val.code === "PJ111012"){
                  Object.assign(this.tableP[36],val)
                }else if(val.code === "PJ111013"){
                  Object.assign(this.tableP[37],val)
                }else if(val.code === "PJ111014"){
                  Object.assign(this.tableP[38],val)
                }else if(val.code === "HT008006"){
                  Object.assign(this.tableP[0],val)
                }else if(val.code === "HT008007"){
                  Object.assign(this.tableP[1],val)
                }else if(val.code === "HT008008"){
                  Object.assign(this.tableP[2],val)
                }else if(val.code === "neibu"){
                  Object.assign(this.tableP[3],val);
                  Object.assign(this.tableP[23],val);
                }else if(val.code === "neibuhetong"){
                  Object.assign(this.tableP[24],val)
                }else if(val.code === "worktime"){
                  Object.assign(this.tableP[51],val)
                }else if(val.code === "worktime0"){
                  Object.assign(this.tableP[52],val)
                }else if(val.code === "worktime1"){
                  Object.assign(this.tableP[53],val)
                }
              }
            )
            console.log(this.tableP)
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
      computedSum(){
        let tableOTotal = {};
        let tableOTotal1 = {};
        let tableOTotal2 = {};
        let tableOTotal3 = {};
        let tableOTotal4 = {};
        let tableOtotal5 = {};
        let tableOtotal6 = {};
        let tableOtotal7 = {}; //消耗品费
        let _tableO3 = {}; //交通费
        let _tableO2 = {};
        let _tableO1 = {};
        let _travel = {};
        this.tableO3.forEach(
          val => {
            if(val.type === "PJ108001"){
              for(let i = 1; i<= 12; i++) {
                _tableO3["money" + i] = Number(_tableO3["money" + i] || 0) + Number(val["money" + i] || 0);
              }
            }
          }
        )
        this.tableO1.forEach(
          val => {
            if(val.type === "PJ106001"){
              for(let i = 1; i<= 12; i++) {
                _tableO1["money" + i] = Number(_tableO1["money" + i] || 0) + Number(val["money" + i] || 0);
              }
            }
          }
        )
        if(this.travel.length > 0){
          for(let i = 1; i<= 12; i++) {
            _travel["money" + i] = Number(_travel["money" + i]||0) + Number(this.travel[0]["money" + i] || 0);
          }
        }
        this.tableO2.forEach(
          val => {
            if(val.type === "PJ107001"){
              for(let i = 1; i<= 12; i++){
                _travel["money" + i] = Number(_travel["money" + i]||0) + Number(val["money" + i]||0);
              }
            } if(val.type === "PJ107002"){
              for(let i = 1; i<= 12; i++){
                _tableO2["money" + i] = Number(_tableO2["money" + i]||0) + Number(val["money" + i]||0);
              }
            }
          }
        )
        this.tableO.forEach(
          val => {
            if(val.type === "PJ102012"){
              for(let i = 1; i<= 12; i++){
                tableOTotal["money" + i] = Number(tableOTotal["money" + i]||0) + Number(val["money" + i]||0);
              }
            } if(val.type === "PJ102008"){
              for(let i = 1; i<= 12; i++){
                tableOTotal1["money" + i] = Number(tableOTotal1["money" + i]||0) + Number(val["money" + i]||0);
              }
            }if(val.type === "PJ102006"){
              for(let i = 1; i<= 12; i++){
                tableOTotal2["money" + i] = Number(tableOTotal2["money" + i]||0) + Number(val["money" + i]||0);
              }
            }if(val.type === "PJ102003"){
              for(let i = 1; i<= 12; i++){
                tableOTotal3["money" + i] = Number(tableOTotal3["money" + i]||0) + Number(val["money" + i]||0);
              }
            }if(val.type === "PJ102007"){
              for(let i = 1; i<= 12; i++){
                tableOTotal4["money" + i] = Number(tableOTotal4["money" + i]||0) + Number(val["money" + i]||0);
              }
            }if(val.type === "PJ102009"){
              for(let i = 1; i<= 12; i++){
                tableOtotal5["money" + i] = Number(tableOtotal5["money" + i]||0) + Number(val["money" + i]||0);
              }
            }if(val.type === "PJ102010"){
              for(let i = 1; i<= 12; i++){
                tableOtotal6["money" + i] = Number(tableOtotal6["money" + i]||0) + Number(val["money" + i]||0);
              }
            }if(val.type === "PJ102001"){ //消耗品费
              for(let i = 1; i<= 12; i++){
                tableOtotal7["money" + i] = Number(tableOtotal7["money" + i]||0) + Number(val["money" + i]||0);
              }
            }if(val.type === "PJ102011"){
              for(let i = 1; i<= 12; i++){
                _tableO1["money" + i] = Number(_tableO1["money" + i]||0) + Number(val["money" + i]||0);
              }
            }if(val.type === "PJ102005"){
              for(let i = 1; i<= 12; i++){
                _tableO3["money" + i] = Number(_tableO3["money" + i]||0) + Number(val["money" + i]||0);
              }
            }if(val.type === "PJ102002"){
              for(let i = 1; i<= 12; i++){
                _travel["money" + i] = Number(_travel["money" + i]||0) + Number(val["money" + i]||0);
              }
            }if(val.type === "PJ102004"){
              for(let i = 1; i<= 12; i++){
                _tableO2["money" + i] = Number(_tableO2["money" + i]||0) + Number(val["money" + i]||0);
              }
            }
          })
        for(let i = 0; i < this.arr.length ; i++){
          this.$set(this.tableP[51],"actual" + this.arr[i],this.tableP[51]["actual" + this.arr[i]] || "0.00");
          if(this.sumB2.length > 0){
            if(i<=5){
              this.$set(this.tableP[51],"money" + this.arr[i],Number(this.sumB2[ 2 * i + 2 ]||0).toFixed(2));
            }else{
              this.$set(this.tableP[51],"money" + this.arr[i],Number(this.sumB2[ 2 * i + 4 ]||0).toFixed(2));
            }
          }
          this.tableP[52]["actual" + this.arr[i]] = this.tableP[52]["actual" + this.arr[i]] || "0.00";
          if(this.sumB1.length > 0){
            if(i<=5){
              this.$set(this.tableP[52],"money" + this.arr[i],Number(this.sumB1[ 2 * i + 2 ]||0).toFixed(2));
            }else{
              this.$set(this.tableP[52],"money" + this.arr[i],Number(this.sumB1[ 2 * i + 4 ]||0).toFixed(2));
            }
          }
          this.$set(this.tableP[53],"actual" + this.arr[i],this.tableP[53]["actual" + this.arr[i]] || "0.00");
          if(this.tableA.length > 0){
            this.$set(this.tableP[53],"money" + this.arr[i],Number(this.tableA[0][ "amount" + this.arr[i] ]||0).toFixed(2));
          }else{
            this.$set(this.tableP[53],"money" + this.arr[i],"0.00");
          }
          this.$set(this.tableP[0],"actual" + this.arr[i], this.tableP[0]["actual" + this.arr[i]] || "0.00");
          this.$set(this.tableP[1],"actual" + this.arr[i], this.tableP[1]["actual" + this.arr[i]] || "0.00");
          this.$set(this.tableP[2],"actual" + this.arr[i], this.tableP[2]["actual" + this.arr[i]] || "0.00");
          if(this.groupA1.length > 0){
            this.$set(this.tableP[0],"money" + this.arr[i] , Number(this.groupA1[0]["money" + this.arr[i]]||0).toFixed(2));
            this.$set(this.tableP[1],"money" + this.arr[i] , Number(this.groupA1[1]["money" + this.arr[i]]||0).toFixed(2));
            this.$set(this.tableP[2],"money" + this.arr[i] , Number(this.groupA1[2]["money" + this.arr[i]]||0).toFixed(2));
          }else{
            this.$set(this.tableP[0],"money" + this.arr[i] , "0.00");
            this.$set(this.tableP[1],"money" + this.arr[i] , "0.00");
            this.$set(this.tableP[2],"money" + this.arr[i] , "0.00");
          }
          this.$set(this.tableP[3],"actual" + this.arr[i] , this.tableP[3]["actual" + this.arr[i]] || "0.00");
          if(this.sumA2.length > 0){
            if(i<=5){
              this.$set(this.tableP[3],"money" + this.arr[i] , Number(this.sumA2[3 + 2 * i ]||0).toFixed(2));
            }else{
              this.$set(this.tableP[3],"money" + this.arr[i] , Number(this.sumA2[5 + 2 * i ]||0).toFixed(2));
            }
          }else{
            this.$set(this.tableP[3],"money" + this.arr[i], "0.00");
          }
          this.$set(this.tableP[4],"money" + this.arr[i],(Number(this.tableP[0]["money" + this.arr[i]]) + Number(this.tableP[1]["money" + this.arr[i]]) +  Number(this.tableP[2]["money" + this.arr[i]]) + Number(this.tableP[3]["money" + this.arr[i]])).toFixed(2));
          this.$set(this.tableP[4],"actual" + this.arr[i], (Number(this.tableP[0]["actual" + this.arr[i]]) + Number(this.tableP[1]["actual" + this.arr[i]]) +  Number(this.tableP[2]["actual" + this.arr[i]]) + Number(this.tableP[3]["actual" + this.arr[i]])).toFixed(2));
          this.$set(this.tableP[5],"money" + this.arr[i], (Number(this.tableP[4]["money" + this.arr[i]]) - (Number(this.tableP[1]["money" + this.arr[i]]) * Number(getDictionaryInfo("PJ086002").value2) + Number(this.tableP[2]["money" + this.arr[i]]) * Number(getDictionaryInfo("PJ086003").value2))).toFixed(2));
          this.$set(this.tableP[5],"actual" + this.arr[i], (Number(this.tableP[4]["actual" + this.arr[i]]) - (Number(this.tableP[1]["actual" + this.arr[i]]) * Number(getDictionaryInfo("PJ086002").value2) + Number(this.tableP[2]["actual" + this.arr[i]]) * Number(getDictionaryInfo("PJ086003").value2))).toFixed(2));

          this.$set(this.tableP[6],"actual" + this.arr[i], this.tableP[6]["actual" + this.arr[i]] || "0.00");
          if(this.tableB.length > 0){
            this.$set(this.tableP[6],"money" + this.arr[i],((Number(this.tableB[0]["pay" + this.arr[i]]) + Number(this.tableB[0]["giving" + this.arr[i]]))/1000).toFixed(2));
          } else {
            this.$set(this.tableP[6],"money" + this.arr[i],"0.00");
          }
          this.$set(this.tableP[7],"money" + this.arr[i], "0.00");
          this.$set(this.tableP[7],"actual" + this.arr[i], "0.00");
          this.$set(this.tableP[8],"actual" + this.arr[i], "0.00");
          this.$set(this.tableP[8],"money" + this.arr[i], "0.00");
          this.$set(this.tableP[9],"money" + this.arr[i], "0.00");
          this.$set(this.tableP[9],"actual" + this.arr[i], "0.00");
          this.$set(this.tableP[10],"money" + this.arr[i], "0.00");
          this.$set(this.tableP[10],"actual" + this.arr[i], "0.00");
          this.$set(this.tableP[11],"actual" + this.arr[i], "0.00");
          if(i === 0){
            this.tableP[11]["money" + this.arr[i]]  = (Number(getDictionaryInfo("PJ109001").value2) * Number(this.tableP[53]["money" + this.arr[i]])).toFixed(2);
          }else{
             if(i === 4){
               this.tableP[11]["money" + this.arr[i]] = (Number(getDictionaryInfo("PJ109001").value2) * (Number(this.tableP[53]["money" + this.arr[i]]) - Number(this.tableP[53]["money" + this.arr[i - 1]])) + Number(this.tableP[53]["money" + this.arr[i]] * Number(getDictionaryInfo("PJ109002").value2))).toFixed(2);
             }else{
               this.tableP[11]["money" + this.arr[i]] = (Number(getDictionaryInfo("PJ109001").value2) * (Number(this.tableP[53]["money" + this.arr[i]]) - Number(this.tableP[53]["money" + this.arr[i - 1]]))).toFixed(2);
             }
          }
          this.$set(this.tableP[12],"money" + this.arr[i] , "0.00");
          this.$set(this.tableP[12],"actual" + this.arr[i] , "0.00");
          this.$set(this.tableP[13],"actual" + this.arr[i] , (Number(this.tableP[6]["actual" + this.arr[i]]) + Number(this.tableP[11]["actual" + this.arr[i]])).toFixed(2));
          this.$set(this.tableP[13],"money" + this.arr[i] , (Number(this.tableP[6]["money" + this.arr[i]]) + Number(this.tableP[11]["money" + this.arr[i]])).toFixed(2));
          this.$set(this.tableP[14],"actual" + this.arr[i] , this.tableP[14]["actual" + this.arr[i]] || "0.00");
          if(this.assets1.length > 0){
            this.$set(this.tableP[14],"money" + this.arr[i], (Number(this.assets1[0]["money" + this.arr[i]]||0)).toFixed(2));
          }else{
            this.$set(this.tableP[14],"money" + this.arr[i], "0.00");
          }
          this.$set(this.tableP[15],"actual" + this.arr[i], this.tableP[15]["actual" + this.arr[i]] || "0.00");
          if(this.assets2.length > 0){
            this.$set(this.tableP[15],"money" + this.arr[i], (Number(this.assets2[0]["money" + this.arr[i]]||0)).toFixed(2));
          }else{
            this.$set(this.tableP[15],"money" + this.arr[i], "0.00");
          }
          this.$set(this.tableP[16],"actual" + this.arr[i], this.tableP[16]["actual" + this.arr[i]] || "0.00");
          this.$set(this.tableP[16],"money" + this.arr[i],  Number(tableOTotal["money" + this.arr[i]]||0).toFixed(2));
          this.$set(this.tableP[17],"actual" + this.arr[i], this.tableP[17]["actual" + this.arr[i]] || "0.00");
          this.$set(this.tableP[17],"money" + this.arr[i],  Number(tableOTotal1["money" + this.arr[i]]||0).toFixed(2));
          this.$set(this.tableP[18],"actual" + this.arr[i], this.tableP[18]["actual" + this.arr[i]] || "0.00");
          this.$set(this.tableP[18],"money" + this.arr[i],  Number(tableOTotal2["money" + this.arr[i]]||0).toFixed(2));
          this.$set(this.tableP[19],"actual" + this.arr[i], this.tableP[19]["actual" + this.arr[i]] || "0.00");
          this.$set(this.tableP[19],"money" + this.arr[i],  Number(tableOTotal3["money" + this.arr[i]]||0).toFixed(2));
          this.$set(this.tableP[20],"money" + this.arr[i], (Number(this.tableP[14]["money" + this.arr[i]]) + Number(this.tableP[15]["money" + this.arr[i]]) + Number(this.tableP[16]["money" + this.arr[i]])+ Number(this.tableP[17]["money" + this.arr[i]])+ Number(this.tableP[18]["money" + this.arr[i]])+ Number(this.tableP[19]["money" + this.arr[i]])).toFixed(2));
          this.$set(this.tableP[20],"actual" + this.arr[i], (Number(this.tableP[14]["actual" + this.arr[i]]) + Number(this.tableP[15]["actual" + this.arr[i]]) + Number(this.tableP[16]["actual" + this.arr[i]])+ Number(this.tableP[17]["actual" + this.arr[i]])+ Number(this.tableP[18]["actual" + this.arr[i]])+ Number(this.tableP[19]["actual" + this.arr[i]])).toFixed(2));
          this.$set(this.tableP[21],"actual" + this.arr[i], this.tableP[21]["actual" + this.arr[i]] || "0.00");
          if(this.sumC1.length > 0){
            if(i<=5){
              this.$set(this.tableP[21],"money" + this.arr[i], Number(this.sumC1[3 + 2 * i ]||0).toFixed(2));
            }else{
              this.$set(this.tableP[21],"money" + this.arr[i], Number(this.sumC1[5 + 2 * i ]||0).toFixed(2));
            }
          }else{
            this.$set(this.tableP[21],"money" + this.arr[i],"0.00");
          }
          this.$set(this.tableP[22],"money" + this.arr[i], "0.00");
          this.$set(this.tableP[22],"actual" + this.arr[i], "0.00");
          this.$set(this.tableP[23],"actual" + this.arr[i],this.tableP[23]["actual" + this.arr[i]] || "0.00");
          if(this.sumB3.length > 0){
            if(i<=5){
              this.$set(this.tableP[23],"money" + this.arr[i], Number(this.sumB3[3 + 2 * i ]||0).toFixed(2));
            }else{
              this.$set(this.tableP[23],"money" + this.arr[i], Number(this.sumB3[5 + 2 * i ]||0).toFixed(2));
            }
          }else{
            this.$set(this.tableP[23],"money" + this.arr[i], "0.00");
          }
          this.$set(this.tableP[24],"actual" + this.arr[i], this.tableP[24]["actual" + this.arr[i]] || "0.00");
          if(this.sumB1.length > 0 && this.sumB2.length > 0){
            if(i<=5){
              this.$set(this.tableP[24],"money" + this.arr[i], (Number(this.sumB1[3 + 2 * i ]||0) + Number(this.sumB2[3 + 2 * i ]||0)).toFixed(2));
            }else{
              this.$set(this.tableP[24],"money" + this.arr[i], (Number(this.sumB1[5 + 2 * i ]||0) + Number(this.sumB2[5 + 2 * i ]||0)).toFixed(2));
            }
          }else{
            this.$set(this.tableP[24],"money" + this.arr[i], "0.00");
          }
          this.$set(this.tableP[25],"actual" + this.arr[i], "0.00");
          this.$set(this.tableP[25],"money" + this.arr[i], "0.00");
          this.$set(this.tableP[26],"money" + this.arr[i], (Number(this.tableP[21]["money" + this.arr[i]]) + Number(this.tableP[22]["money" + this.arr[i]]) + Number(this.tableP[23]["money" + this.arr[i]])+ Number(this.tableP[24]["money" + this.arr[i]])+ Number(this.tableP[25]["money" + this.arr[i]])).toFixed(2));
          this.$set(this.tableP[26],"actual" + this.arr[i], (Number(this.tableP[21]["actual" + this.arr[i]]) + Number(this.tableP[22]["actual" + this.arr[i]]) + Number(this.tableP[23]["actual" + this.arr[i]])+ Number(this.tableP[24]["actual" + this.arr[i]])+ Number(this.tableP[25]["actual" + this.arr[i]])).toFixed(2));
          this.$set(this.tableP[27],"money" + this.arr[i], (Number(getDictionaryInfo("PJ110001").value2) * Number(this.tableP[51]["money" + this.arr[i]]) + Number(getDictionaryInfo("PJ110002").value2) * Number(this.tableP[52]["money" + this.arr[i]]) + Number(getDictionaryInfo("PJ110003").value2) * Number(this.tableP[53]["money" + this.arr[i]])).toFixed(2));
          this.$set(this.tableP[27],"actual" + this.arr[i], (Number(getDictionaryInfo("PJ110001").value2) * Number(this.tableP[51]["actual" + this.arr[i]]) + Number(getDictionaryInfo("PJ110002").value2) * Number(this.tableP[52]["actual" + this.arr[i]]) + Number(getDictionaryInfo("PJ110003").value2) * Number(this.tableP[53]["actual" + this.arr[i]])).toFixed(2));
          this.$set(this.tableP[28],"money" + this.arr[i],"0.00");
          this.$set(this.tableP[28],"actual" + this.arr[i], "0.00");
          this.$set(this.tableP[29],"money" + this.arr[i], "0.00");
          this.$set(this.tableP[29],"actual" + this.arr[i], "0.00");
          this.$set(this.tableP[30],"money" + this.arr[i], this.tableP[27]["money" + this.arr[i]]);
          this.$set(this.tableP[30],"actual" + this.arr[i], this.tableP[27]["money" + this.arr[i]]);
          this.$set(this.tableP[31],"money" + this.arr[i], Number(tableOTotal4["money" + this.arr[i]]||0).toFixed(2));
          this.$set(this.tableP[31],"actual" + this.arr[i], this.tableP[31]["actual" + this.arr[i]] || "0.00");
          this.$set(this.tableP[32],"money" + this.arr[i], Number(_travel["money" + this.arr[i]]||0).toFixed(2));
          this.$set(this.tableP[32],"actual" + this.arr[i], this.tableP[32]["actual" + this.arr[i]] || "0.00");
          this.$set(this.tableP[33],"money" + this.arr[i], Number(_tableO3["money" + this.arr[i]]||0).toFixed(2));
          this.$set(this.tableP[33],"actual" + this.arr[i], this.tableP[33]["actual" + this.arr[i]] || "0.00");
          this.$set(this.tableP[34],"money" + this.arr[i], Number(tableOtotal7["money" + this.arr[i]]||0).toFixed(2));
          this.$set(this.tableP[34],"actual" + this.arr[i], this.tableP[34]["actual" + this.arr[i]] || "0.00");
          this.$set(this.tableP[35],"money" + this.arr[i], Number(_tableO1["money" + this.arr[i]]||0).toFixed(2));
          this.$set(this.tableP[35],"actual" + this.arr[i],this.tableP[35]["actual" + this.arr[i]] || "0.00");
          this.$set(this.tableP[36],"money" + this.arr[i], Number(tableOtotal5["money" + this.arr[i]]||0).toFixed(2));
          this.$set(this.tableP[36],"actual" + this.arr[i], this.tableP[36]["actual" + this.arr[i]] || "0.00");
          this.$set(this.tableP[37],"money" + this.arr[i], Number(tableOtotal6["money" + this.arr[i]]||0).toFixed(2));
          this.$set(this.tableP[37],"actual" + this.arr[i], this.tableP[37]["actual" + this.arr[i]] || "0.00");
          this.$set(this.tableP[38],"money" + this.arr[i], Number(_tableO2["money" + this.arr[i]]||0).toFixed(2));
          this.$set(this.tableP[38],"actual" + this.arr[i], this.tableP[38]["actual" + this.arr[i]] || "0.00");
          ["money","actual"].forEach(
            val => {
              this.$set(this.tableP[39],val + this.arr[i], (0 - Number(this.tableP[13][val + this.arr[i]]) - Number(this.tableP[20][val + this.arr[i]]) - Number(this.tableP[26][val + this.arr[i]]) + Number(this.tableP[31][val + this.arr[i]]) + Number(this.tableP[32][val + this.arr[i]]) +
                Number(this.tableP[33][val + this.arr[i]]) + Number(this.tableP[34][val + this.arr[i]]) + Number(this.tableP[35][val + this.arr[i]]) +Number(this.tableP[36][val + this.arr[i]]) +Number(this.tableP[37][val + this.arr[i]]) + Number(this.tableP[38][val + this.arr[i]]) + Number(this.tableP[5][val + this.arr[i]])*0.75).toFixed(2));

              this.$set(this.tableP[41],val + this.arr[i],(Number(this.tableP[31][val + this.arr[i]]) + Number(this.tableP[32][val + this.arr[i]]) +
                Number(this.tableP[33][val + this.arr[i]]) + Number(this.tableP[34][val + this.arr[i]]) + Number(this.tableP[35][val + this.arr[i]]) +Number(this.tableP[36][val + this.arr[i]]) +Number(this.tableP[37][val + this.arr[i]]) + Number(this.tableP[38][val + this.arr[i]]) + Number(this.tableP[39][val + this.arr[i]]) + Number(this.tableP[40][val + this.arr[i]]||0)).toFixed(2));
              this.$set(this.tableP[42],val + this.arr[i],(Number(this.tableP[13][val + this.arr[i]]) + Number(this.tableP[20][val + this.arr[i]]) + Number(this.tableP[26][val + this.arr[i]]) + Number(this.tableP[30][val + this.arr[i]]) + Number(this.tableP[41][val + this.arr[i]])).toFixed(2)); //合计

              this.$set(this.tableP[43],val + this.arr[i], (Number(this.tableP[5][val + this.arr[i]]) - Number(this.tableP[42][val + this.arr[i]])).toFixed(2));
              this.$set(this.tableP[46],val + this.arr[i], (Number(this.tableP[44][val + this.arr[i]]||0) + Number(this.tableP[45][val + this.arr[i]]||0)).toFixed(2));
              this.$set(this.tableP[47],val + this.arr[i],(Number(this.tableP[43][val + this.arr[i]]||0) - Number(this.tableP[46][val + this.arr[i]]||0)).toFixed(2));
              this.$set(this.tableP[49],val + this.arr[i], (Number(this.tableP[47][val + this.arr[i]]) - Number(this.tableP[48][val + this.arr[i]]||0)).toFixed(2));

              if(Number(this.tableP[51][val + this.arr[i]]||0) + Number(this.tableP[52][val + this.arr[i]]||0) > 0){
                this.$set(this.tableP[58],val + this.arr[i], Math.round(Number(this.tableP[54][val + this.arr[i]]||0)/(Number(this.tableP[51][val + this.arr[i]]||0) + Number(this.tableP[52][val + this.arr[i]]||0))* 100) + "%");
              }else{
                this.$set(this.tableP[58],val + this.arr[i], "0%");
              }

              if(Number(this.tableP[51][val + this.arr[i]]||0) + Number(this.tableP[52][val + this.arr[i]]||0) > 0){
                this.$set(this.tableP[59],val + this.arr[i], Math.round(Number(this.tableP[55][val + this.arr[i]]||0)/(Number(this.tableP[51][val + this.arr[i]]||0) + Number(this.tableP[52][val + this.arr[i]]||0))* 100) + "%");
              }else{
                this.$set(this.tableP[59],val + this.arr[i], "0%");
              }
              if(Number(this.tableP[53][val + this.arr[i]]) > 0){
                this.$set(this.tableP[60],val + this.arr[i], Math.round(Number(this.tableP[56][val + this.arr[i]]||0)/Number(this.tableP[53][val + this.arr[i]])* 100) + "%");
              }else{
                this.$set(this.tableP[60],val + this.arr[i], "0%");
              }
              if(Number(this.tableP[53][val + this.arr[i]]) > 0){
                this.$set(this.tableP[61],val + this.arr[i], Math.round(Number(this.tableP[57][val + this.arr[i]]||0)/Number(this.tableP[53][val + this.arr[i]])* 100) + "%");
              }else{
                this.$set(this.tableP[61],val + this.arr[i], "0%");
              }
              if(Number(this.tableP[51][val + this.arr[i]]||0) + Number(this.tableP[52][val + this.arr[i]]) + Number(this.tableP[53][val + this.arr[i]]||0) > 0){
                this.$set(this.tableP[62],val + this.arr[i], Math.round((Number(this.tableP[57][val + this.arr[i]]||0) + Number(this.tableP[54][val + this.arr[i]]||0))/(Number(this.tableP[51][val + this.arr[i]]||0) + Number(this.tableP[52][val + this.arr[i]]) + Number(this.tableP[53][val + this.arr[i]]||0))* 100) + "%");
              }else{
                this.$set(this.tableP[62],val + this.arr[i], "0%");
              }
              if(Number(this.tableP[51][val + this.arr[i]]||0) + Number(this.tableP[52][val + this.arr[i]]) + Number(this.tableP[53][val + this.arr[i]]||0) > 0){
                this.$set(this.tableP[63],val + this.arr[i], Math.round((Number(this.tableP[57][val + this.arr[i]]||0) + Number(this.tableP[55][val + this.arr[i]]||0))/(Number(this.tableP[51][val + this.arr[i]]||0) + Number(this.tableP[52][val + this.arr[i]]) + Number(this.tableP[53][val + this.arr[i]]||0))* 100) + "%");
              }else{
                this.$set(this.tableP[63],val + this.arr[i], "0%");
              }
            }
          )
        }
        if((Number(this.tableP[5]["actual4"]) + Number(this.tableP[5]["actual5"]) + Number(this.tableP[5]["actual6"])) !== 0){
          this.$set(this.tableP[50],"actual6", ((Number(this.tableP[43]["actual4"]) + Number(this.tableP[43]["actual5"]) + Number(this.tableP[43]["actual6"]))/(Number(this.tableP[5]["actual4"]) + Number(this.tableP[5]["actual5"]) + Number(this.tableP[5]["actual6"]))).toFixed(2));
        }else{
          this.$set(this.tableP[50],"actual6","0.00");
        }
        if((Number(this.tableP[5]["actual7"]) + Number(this.tableP[5]["actual8"]) + Number(this.tableP[5]["actual9"])) !== 0){
          this.$set(this.tableP[50],"actual9", ((Number(this.tableP[43]["actual7"]) + Number(this.tableP[43]["actual8"]) + Number(this.tableP[43]["actual9"]))/(Number(this.tableP[5]["actual7"]) + Number(this.tableP[5]["actual8"]) + Number(this.tableP[5]["actual9"]))).toFixed(2));
        }else{
          this.$set(this.tableP[50],"actual9","0.00");
        }
        if((Number(this.tableP[5]["actual10"]) + Number(this.tableP[5]["actual11"]) + Number(this.tableP[5]["actual12"])) !==  0){
          this.$set(this.tableP[50],"actual12", ((Number(this.tableP[43]["actual10"]) + Number(this.tableP[43]["actual11"]) + Number(this.tableP[43]["actual12"]))/(Number(this.tableP[5]["actual10"]) + Number(this.tableP[5]["actual11"]) + Number(this.tableP[5]["actual12"]))).toFixed(2));
        }else{
          this.$set(this.tableP[50],"actual12","0.00");
        }
        if((Number(this.tableP[5]["actual1"]) + Number(this.tableP[5]["actual2"]) + Number(this.tableP[5]["actual3"])) !== 0){
          this.$set(this.tableP[50],"actual3", ((Number(this.tableP[43]["actual1"]) + Number(this.tableP[43]["actual2"]) + Number(this.tableP[43]["actual3"]))/(Number(this.tableP[5]["actual1"]) + Number(this.tableP[5]["actual2"]) + Number(this.tableP[5]["actual3"]))).toFixed(2));
        }else{
          this.$set(this.tableP[50],"actual3","0.00");
        }

        this.$set(this.tableP[50],"money6", ((Number(this.tableP[43]["money4"]) + Number(this.tableP[43]["money5"]) + Number(this.tableP[43]["money6"]))/(Number(this.tableP[5]["money4"]) + Number(this.tableP[5]["money5"]) + Number(this.tableP[5]["money6"]))).toFixed(2));
        this.$set(this.tableP[50],"money9", ((Number(this.tableP[43]["money7"]) + Number(this.tableP[43]["money8"]) + Number(this.tableP[43]["money9"]))/(Number(this.tableP[5]["money7"]) + Number(this.tableP[5]["money8"]) + Number(this.tableP[5]["money9"]))).toFixed(2));
        this.$set(this.tableP[50],"money12", ((Number(this.tableP[43]["money10"]) + Number(this.tableP[43]["money11"]) + Number(this.tableP[43]["money12"]))/(Number(this.tableP[5]["money10"]) + Number(this.tableP[5]["money11"]) + Number(this.tableP[5]["money12"]))).toFixed(2));
        this.$set(this.tableP[50],"money3", ((Number(this.tableP[43]["money1"]) + Number(this.tableP[43]["money2"]) + Number(this.tableP[43]["money3"]))/(Number(this.tableP[5]["money1"]) + Number(this.tableP[5]["money2"]) + Number(this.tableP[5]["money3"]))).toFixed(2));

      },
      getTravel(val){
        this.travel = val;
      },
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
      rowClass({row, rowIndex}){
          if ([4,5,13,20,26,30,41].includes(rowIndex)) {
            return  'row1';
          }
       else if ([42].includes(rowIndex)) {
          return  'row2';
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
        else if(columnIndex === 1){
         if ( [43,47,48,49,50].includes(rowIndex)) {
            return {
              rowspan: 0,
              colspan: 0
            }
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
            return this.$t('label.PFANS1036FORMVIEW_COUNSELORUP');
          }else if(index === 1){
            return this.$t('label.PFANS1036FORMVIEW_CHANCELLORDOWN');
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
          }else if([1,2,3,4,5].includes(index) && ["C","D"].includes(table)){
             sums[index] = "-";
            return;
          }else if([1,2,3,4].includes(index) && ["o1","o2","o3","o4"].includes(table)){
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
      addRow1() {
        this.tableO1.push([{}]);
      },
      addRow2() {
        this.tableO2.push([{}]);
      },
      addRow3() {
        this.tableO3.push([{}]);
      },
      addRow4() {
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
              this.form.equipment_newyear = JSON.stringify(this.equipment_newyear);
              this.form.equipment_lastyear = JSON.stringify(this.equipment_lastyear);
              this.form.assets_newyear = JSON.stringify(this.assets_newyear);
              this.form.assets_lastyear = JSON.stringify(this.assets_lastyear);
              this.form.tableP = JSON.stringify([this.tableP[40],this.tableP[44],this.tableP[45],this.tableP[48],this.tableP[54],this.tableP[55],this.tableP[56],this.tableP[57]]);
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
      }
    },
    watch: {
      tableO: {
        handler(newValue, oldValue) {
          this.computedSum();
        },
        deep: true
      },
      tableO1: {
        handler(newValue, oldValue) {
          this.computedSum();
        },
        deep: true
      },
      tableO2: {
        handler(newValue, oldValue) {
          this.computedSum();
        },
        deep: true
      },
      tableO3: {
        handler(newValue, oldValue) {
          this.computedSum();
        },
        deep: true
      },
      tableO4: {
        handler(newValue, oldValue) {
          this.computedSum();
        },
        deep: true
      },
      tableA: {
        handler(newValue, oldValue) {
          this.computedSum();
        },
        deep: true
      },
      tableB: {
        handler(newValue, oldValue) {
          this.computedSum();
        },
        deep: true
      },
      tableC: {
        handler(newValue, oldValue) {
          this.computedSum();
        },
        deep: true
      },
      tableD: {
        handler(newValue, oldValue) {
          this.computedSum();
        },
        deep: true
      },
      assets1: {
        handler(newValue, oldValue) {
          this.computedSum();
        },
        deep: true
      },
      assets2: {
        handler(newValue, oldValue) {
          this.computedSum();

        },
        deep: true
      },
      travel: {
        handler(newValue, oldValue) {
          this.computedSum();
        },
        deep: true
      },
      sumA1: {
        handler(newValue, oldValue) {
          this.computedSum();
        },
        deep: true
      },
      sumA2: {
        handler(newValue, oldValue) {
          this.computedSum();
        },
        deep: true
      },
      sumB1: {
        handler(newValue, oldValue) {
          this.computedSum();
        },
        deep: true
      },
      sumB2: {
        handler(newValue, oldValue) {
          this.computedSum();
        },
        deep: true
      },
      sumB3: {
        handler(newValue, oldValue) {
          this.computedSum();
        },
        deep: true
      },
      sumC1: {
        handler(newValue, oldValue) {
          this.computedSum();
        },
        deep: true
      },
    }
  };
</script>


<style rel="stylesheet/scss" lang="scss">

  .el-table .row1 {
    color: #6d9fd1;
  }

  .el-table .row2 {
    color: red;
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
