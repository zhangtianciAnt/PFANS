<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :title="title"
                         @buttonClick="buttonClick" ref="container" v-loading="loading" >
      <div slot="customize">
        <el-form label-position="top" label-width="8vw" style="padding-top: 25px">
          <el-form-item>
            <el-row>
              <div style="height: calc(100vh - 230px - 2rem);width: 100%">
                <plx-table-grid
                :datas="data"
                :element-loading-text="$t('normal.waiting')"
                header-cell-class-name="sub_bg_color_blue"
                header-row-class-name="height"
                :pagination-show="false"
                :height-change="false"
                highlight-current-row
                ref="eltable"
                stripe
                border
                use-virtual
                style="width: 100%"
                cell-class-name="row_height_left"
                :row-height="40"
              >
                <plx-table-column
                  prop="no"
                  :label="$t('label.PFANS2006VIEW_NO')"
                  width="50"
                  align="center"
                  fixed="left"
                >
                  <template slot-scope="scope">
                    <span style="color:blue">{{ scope.row.no }}</span>
                  </template>
                </plx-table-column>
                <plx-table-column
                  prop="department_id"
                  :label="$t('label.PFANS2006VIEW_CLUB')"
                  width="120"
                  align="center"
                  fixed="left"
                ></plx-table-column>
                <plx-table-column
                  prop="user_name"
                  :label="$t('label.PFANS2006VIEW_LASTNAME')"
                  width="120"
                  align="center"
                  fixed="left"
                ></plx-table-column>
                <plx-table-column
                  prop="workdate"
                  :label="$t('label.PFANS2006VIEW_JOINED')"
                  width="120"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="sex"
                  :label="$t('label.PFANS2006VIEW_SEX')"
                  width="70"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="onlychild"
                  :label="$t('label.PFANS2006VIEW_SINGLECHILD')"
                  width="120"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="type"
                  :label="$t('label.PFANS2006VIEW_ENTRYTYPE')"
                  width="130"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="bonus"
                  :label="$t('label.PFANS2006VIEW_SCHOLARSHIP')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="sociology"
                  :label="$t('label.PFANS2006VIEW_SOCIETY')"
                  width="160"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="registered"
                  :label="$t('label.PFANS2006VIEW_REGISTER')"
                  width="100"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="yanglaojs"
                  :label="$t('label.PFANS2005FORMVIEW_YANGLAOJS')"
                  width="220"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="shiyejs"
                  :label="$t('label.PFANS2005FORMVIEW_SHIYEJS')"
                  width="220"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="gongshangjs"
                  :label="$t('label.PFANS2005FORMVIEW_GONGSHANGJS')"
                  width="220"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="yiliaojs"
                  :label="$t('label.PFANS2005FORMVIEW_YILIAOJS')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="shengyujs"
                  :label="$t('label.PFANS2005FORMVIEW_SHENGYUJS')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="accumulation"
                  :label="$t('label.PFANS2005FORMVIEW_HOUSINGFUNDBASE')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="lastmonthbasic"
                  :label="$t('label.PFANS2005FORMVIEW_LASTMONTHBASIC')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="lastmonthduty"
                  :label="$t('label.PFANS2005FORMVIEW_LASTMONTHDUTY')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="basethismonthbasic"
                  :label="$t('label.PFANS2005FORMVIEW_BASETHISMONTHBASIC')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="thismonthduty"
                  :label="$t('label.PFANS2005FORMVIEW_THISMONTHDUTY')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column prop="rnbasesalary" label="RN" width="150" align="center"></plx-table-column>
                <plx-table-column
                  prop="birthrest"
                  :label="$t('label.PFANS2005FORMVIEW_BIRTHDAYREST')"
                  width="200"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="thismonthbasicbasic"
                  :label="$t('label.PFANS2006VIEW_THISMONTHBASICBASIC')"
                  width="200"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="thismonthbasic"
                  :label="$t('label.PFANS2005FORMVIEW_MONTHLYPOSTALTEMPORARY')"
                  width="200"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="shortillness"
                  :label="$t('label.PFANS2005FORMVIEW_SHORTDURATIONTIME')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="longillness"
                  :label="$t('label.PFANS2005FORMVIEW_LONGDURATIONTIME')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="owediligence"
                  :label="$t('label.PFANS2005FORMVIEW_ABSENCETIME')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="owingcontrol"
                  :label="$t('label.PFANS2005FORMVIEW_ABSENCEOFWORK')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="thismonthbasicgei"
                  :label="$t('label.PFANS2006VIEW_THISMONTHBASICGEI')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="thismonthdutygei"
                  :label="$t('label.PFANS2006VIEW_THISMONTHDUTYGEI')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <!-- 一括补助基本 -->
                <plx-table-column
                  prop="ykbzjs"
                  :label="$t('label.PFANS2006VIEW_YKBZJB')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <!-- 一括补助 -->
                <plx-table-column
                  prop="ykbz"
                  :label="$t('label.PFANS2006VIEW_YKBZ')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="overtimesubsidy"
                  :label="$t('label.PFANS2006VIEW_KASUKE')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <!-- 小计1(基本給+补助) -->
                <plx-table-column
                  prop="total1"
                  :label="$t('label.PFANS2006VIEW_SUBTOTAL1')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="other2"
                  :label="$t('label.PFANS2006VIEW_OTHER2')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="appreciation"
                  :label="$t('label.PFANS2006VIEW_MONTHLYBONUS')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="other3"
                  :label="$t('label.PFANS2006VIEW_OTHER3')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="total2"
                  :label="$t('label.PFANS2006VIEW_SUBTOTAL2')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <!-- </plx-table-column> -->

                <plx-table-column
                  prop="taxestotal"
                  :label="$t('label.PFANS2006VIEW_INDUSTRY')"
                  width="150"
                  align="center"
                ></plx-table-column>

                <!-- <plx-table-column :label="$t('label.PFANS2005FORMVIEW_MS')" align="center"> -->
                <plx-table-column
                  prop="heating"
                  :label="$t('label.PFANS2006VIEW_HEATING')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="onlychildmoney"
                  :label="$t('label.PFANS2006VIEW_OLONECHILD')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="total3"
                  :label="$t('label.PFANS2006VIEW_SUBTOTAL3')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <!-- </plx-table-column> -->

                <plx-table-column
                  prop="totalwages"
                  :label="$t('label.PFANS2006VIEW_ARSENAL')"
                  width="150"
                  align="center"
                ></plx-table-column>

                <!-- <plx-table-column :label="$t('label.PFANS2006VIEW_SECURITY')" align="center"> -->
                <plx-table-column
                  prop="endowmentinsurance"
                  :label="$t('label.PFANS2006VIEW_OLD')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="medicalinsurance"
                  :label="$t('label.PFANS2006VIEW_MEDICAL')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="unemploymentinsurance"
                  :label="$t('label.PFANS2006VIEW_UNEMPLOYMENT')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <!-- </plx-table-column> -->

                <plx-table-column
                  prop="socialinsurance"
                  :label="$t('label.PFANS2006VIEW_SOCIALSECURITY')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="accumulationfund"
                  :label="$t('label.PFANS2006VIEW_PUBLICMONEY')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="disciplinarycontrol"
                  :label="$t('label.PFANS2006VIEW_SECURITYMON')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="disciplinary_total"
                  :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                  width="150"
                  align="center"
                  v-if="false"
                ></plx-table-column>
                <plx-table-column
                  prop="comprehensive_yearstotal12"
                  :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                  width="150"
                  align="center"
                  v-if="false"
                ></plx-table-column>
                <plx-table-column
                  prop="dic_ljynssdecs"
                  :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                  width="150"
                  align="center"
                  v-if="false"
                ></plx-table-column>
                <plx-table-column
                  prop="dic_0je"
                  :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                  width="150"
                  align="center"
                  v-if="false"
                ></plx-table-column>
                <plx-table-column
                  prop="dic_1je"
                  :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                  width="150"
                  align="center"
                  v-if="false"
                ></plx-table-column>
                <plx-table-column
                  prop="dic_0sl"
                  :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                  width="150"
                  align="center"
                  v-if="false"
                ></plx-table-column>
                <plx-table-column
                  prop="dic_1sl"
                  :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                  width="150"
                  align="center"
                  v-if="false"
                ></plx-table-column>
                <plx-table-column
                  prop="dic_2sl"
                  :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                  width="150"
                  align="center"
                  v-if="false"
                ></plx-table-column>
                <plx-table-column
                  prop="dic_3sl"
                  :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                  width="150"
                  align="center"
                  v-if="false"
                ></plx-table-column>
                <plx-table-column
                  prop="dic_4sl"
                  :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                  width="150"
                  align="center"
                  v-if="false"
                ></plx-table-column>
                <plx-table-column
                  prop="dic_5sl"
                  :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                  width="150"
                  align="center"
                  v-if="false"
                ></plx-table-column>
                <plx-table-column
                  prop="dic_6sl"
                  :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                  width="150"
                  align="center"
                  v-if="false"
                ></plx-table-column>
                <plx-table-column
                  prop="dic_0sskc"
                  :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                  width="150"
                  align="center"
                  v-if="false"
                ></plx-table-column>
                <plx-table-column
                  prop="dic_1sskc"
                  :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                  width="150"
                  align="center"
                  v-if="false"
                ></plx-table-column>
                <plx-table-column
                  prop="dic_2sskc"
                  :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                  width="150"
                  align="center"
                  v-if="false"
                ></plx-table-column>
                <plx-table-column
                  prop="dic_3sskc"
                  :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                  width="150"
                  align="center"
                  v-if="false"
                ></plx-table-column>
                <plx-table-column
                  prop="dic_4sskc"
                  :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                  width="150"
                  align="center"
                  v-if="false"
                ></plx-table-column>
                <plx-table-column
                  prop="dic_5sskc"
                  :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                  width="150"
                  align="center"
                  v-if="false"
                ></plx-table-column>
                <plx-table-column
                  prop="dic_6sskc"
                  :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                  width="150"
                  align="center"
                  v-if="false"
                ></plx-table-column>
                <plx-table-column
                  prop="thismonthterm"
                  :label="$t('label.PFANS2006VIEW_EXCLUSIVE')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="thismonthadditional"
                  :label="$t('label.PFANS2006VIEW_ACCUMULATED')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="thismonthdutyfree"
                  :label="$t('label.PFANS2006VIEW_UNACCUMULATED')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="lastdutyfree"
                  :label="$t('label.PFANS2006VIEW_ANNUAL')"
                  width="150"
                  align="center"
                ></plx-table-column>

                <!-- <plx-table-column :label="$t('label.PFANS2006VIEW_ONLYTAX')" align="center"> -->
                <plx-table-column
                  prop="housingmoneys"
                  :label="$t('label.PFANS2006VIEW_RESIDENTIALTAX')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="other4"
                  :label="$t('label.PFANS2006VIEW_COMPANYBOSS')"
                  width="230"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="other5"
                  :label="$t('label.PFANS2006VIEW_OTHER5')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <!-- </plx-table-column> -->

                <plx-table-column
                  prop="shouldwages"
                  :label="$t('label.PFANS2006VIEW_RESPONSIBLE')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="shouldcumulative"
                  :label="$t('label.PFANS2006VIEW_CUMULATIVE')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="shouldpaytaxes"
                  :label="$t('label.PFANS2006VIEW_INCOME')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="thismonthadjustment"
                  :label="$t('label.PFANS2006VIEW_THISMONTH')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="realwages"
                  :label="$t('label.PFANS2006VIEW_ACTUAL')"
                  width="150"
                  align="center"
                ></plx-table-column>

                <!-- <plx-table-column
                  :label="$t('label.PFANS2005FORMVIEW_COMPANYSUPPORT')"
                  align="center"
                >-->
                <plx-table-column
                  prop="comendowmentinsurance"
                  :label="$t('label.PFANS2006VIEW_OLD')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="commedicalinsurance"
                  :label="$t('label.PFANS2006VIEW_MEDICAL')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="comunemploymentinsurance"
                  :label="$t('label.PFANS2006VIEW_UNEMPLOYMENT')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="cominjuryinsurance"
                  :label="$t('label.PFANS2005FORMVIEW_EMPLOYMENTINJURYINSURANCE')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="combirthinsurance"
                  :label="$t('label.PFANS2005FORMVIEW_COMBIRTHINSURANCE')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="comheating"
                  :label="$t('label.PFANS2005FORMVIEW_HEATINGCOST')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="comaccumulationfund"
                  :label="$t('label.PFANS2005FORMVIEW_HOUSINGPROVIDENTFUND')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="total"
                  :label="$t('label.PFANS2005FORMVIEW_TOTAL')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="labourunionbase"
                  :label="$t('label.PFANS2005FORMVIEW_LABORUNIONFUNDBASE')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="labourunionfunds"
                  :label="$t('label.PFANS2009VIEW_INDUSTRIALPARTY')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="comtotalwages"
                  :label="$t('label.PFANS2005FORMVIEW_TOTALWAGES')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="njjy"
                  :label="$t('label.PFANS2005FORMVIEW_NJJY')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="bonusmoney"
                  :label="$t('label.PFANS2005FORMVIEW_GAUGE')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="totalbonus"
                  :label="$t('label.PFANS2005FORMVIEW_TOTALGAUGE')"
                  width="150"
                  align="center"
                ></plx-table-column>
                <plx-table-column
                  prop="other6"
                  :label="$t('label.PFANS2005FORMVIEW_OTHER6')"
                  width="150"
                  align="center"
                ></plx-table-column>
              </plx-table-grid>
              </div>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import {Message} from 'element-ui';
  import moment from 'moment';
  import {getUserInfo,getCurrentRolegongzijisuan} from '@/utils/customize';

  export default {
    name: 'PFANS2034View',
    components: {
      EasyNormalContainer,
    },
    data() {
      return {
        loading: false,
        title: 'title.PFANS2034VIEW',
        data: [],
        buttonList: [],
      };
    },
    methods: {
      getWagesByResign() {
        this.loading = true;
        this.$store
          .dispatch('PFANS2005Store/getWagesByResign', {user_id: this.$route.params.userid})
          .then(response => {
            for (let i = 0; i < response.length; i++) {
              let user = getUserInfo(response[i].user_id);
              if (user) {
                  response[i].user_name = user.userinfo.customername;
                  response[i].department_id = user.userinfo.budgetunit;
              }
              //入社时间
              response[i].workdate = moment(response[i].workdate).format('YYYY-MM-DD')
              if(i === 0){
                  response[i].no = this.$t("label.PFANS2034VIEW_ESTIMATE")
              }
              else{
                  response[i].no = this.$t("label.PFANS2006VIEW_ACTUAL")
              }
              if (this.$i18n) {
                  response[i].sex = response[i].sex === "PR019001" ? this.$t("label.PFANS2002FORMVIEW_BOY") : this.$t("label.PFANS2002FORMVIEW_GRIL");
                  response[i].onlychild = response[i].onlychild === "1" ? this.$t("label.yes") : "-";
                  response[i].type =
                      response[i].type === "1"
                          ? "入職"
                          : response[i].type === "2"
                          ? "女産休"
                          : response[i].type === "4"
                              ? "退職"
                              : "-";
                  response[i].bonus = response[i].bonus === "2" ? this.$t("label.PFANSUSERFORMVIEW_OLDSTAFF") : this.$t("label.PFANSUSERFORMVIEW_NEWSTAFF");
                  response[i].sociology = response[i].sociology === "1" ? this.$t("label.yes") : "-";
                  response[i].registered = response[i].registered === "1" ? this.$t("label.yes") : "-";
              }
            }
            this.data = response;
            this.loading = false;
          });
      },
      buttonClick(val) {

      },
      getSummaries(param) {
          const { columns, data } = param;
          const sums = [];
          columns.forEach((column, index) => {
              if (index === 0) {
                  sums[index] = '差额';
                  return;
              }
              const values = data.map(item => Number(item[column.property]));
              if (!values.every(value => isNaN(value))) {
                  sums[index] = values.reduce((prev, curr) => {
                      console.log(prev + "--" + curr)
                      const value = Number(curr);
                      if (!isNaN(value)) {
                          console.log(prev + "--" + curr)
                          return this.setScale2(parseFloat(prev) - parseFloat(curr));
                      } else {
                          console.log(prev + "--" + curr)
                          return this.setScale2(parseFloat(prev));
                      }
                  }, 0);
                  sums[index] += '';
              } else {
                  sums[index] = '';
              }
          });

          return sums;
      },
      //数值小数位数控制
      setScale2(val) {
          if (val) {
              return Math.round(val * 100) / 100;
          } else {
              return 0;
          }
      }
    },
    mounted() {
      this.getWagesByResign();
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .row_height_left {
    font-size: 0.75rem;
    padding: 0px;
    text-align: left;
    background-color: transparent !important;
  }
</style>
