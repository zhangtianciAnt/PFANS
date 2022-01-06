<template>
  <div style="min-height: 100%">
    <EasyNormalContainer ref="container" v-loading="loading"
                         :buttonList="buttonList" :title="title" @buttonClick="buttonClick">
      <div slot="customize">
        <el-form label-position="top" label-width="8vw" style="padding-top: 25px">
          <el-form-item>
            <el-row>
              <div style="height: calc(100vh - 230px - 2rem);width: 100%">
                <el-table
                  ref="eltable"
                  :data="data"
                  :element-loading-text="$t('normal.waiting')"
                  :height-change="false"
                  :pagination-show="false"
                  :row-height="40"
                  :summary-method="getSummaries"
                  border
                  cell-class-name="row_height_left"
                  header-cell-class-name="sub_bg_color_blue"
                  header-row-class-name="height"
                  highlight-current-row
                  show-summary
                  stripe
                  style="width: 100%"
                  use-virtual
                >
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_NO')"
                    align="center"
                    fixed="left"
                    prop="no"
                    width="80"
                  >
                    <template slot-scope="scope">
                      <span style="color:blue">{{ scope.row.no }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_CLUB')"
                    align="center"
                    fixed="left"
                    prop="department_id"
                    width="120"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_LASTNAME')"
                    align="center"
                    fixed="left"
                    prop="user_name"
                    width="120"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_JOINED')"
                    align="center"
                    prop="workdate"
                    width="120"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_SEX')"
                    align="center"
                    prop="sex"
                    width="70"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_SINGLECHILD')"
                    align="center"
                    prop="onlychild"
                    width="120"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_ENTRYTYPE')"
                    align="center"
                    prop="type"
                    width="130"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_SCHOLARSHIP')"
                    align="center"
                    prop="bonus"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_SOCIETY')"
                    align="center"
                    prop="sociology"
                    width="160"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_REGISTER')"
                    align="center"
                    prop="registered"
                    width="100"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_YANGLAOJS')"
                    align="center"
                    prop="yanglaojs"
                    width="220"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_SHIYEJS')"
                    align="center"
                    prop="shiyejs"
                    width="220"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_GONGSHANGJS')"
                    align="center"
                    prop="gongshangjs"
                    width="220"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_YILIAOJS')"
                    align="center"
                    prop="yiliaojs"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_SHENGYUJS')"
                    align="center"
                    prop="shengyujs"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_HOUSINGFUNDBASE')"
                    align="center"
                    prop="accumulation"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_LASTMONTHBASIC')"
                    align="center"
                    prop="lastmonthbasic"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_LASTMONTHDUTY')"
                    align="center"
                    prop="lastmonthduty"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_BASETHISMONTHBASIC')"
                    align="center"
                    prop="basethismonthbasic"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_THISMONTHDUTY')"
                    align="center"
                    prop="thismonthduty"
                    width="150"
                  ></el-table-column>
                  <el-table-column :label="$t('label.PFANS2005FORMVIEW_RANK')" align="center" prop="rnbasesalary"
                                   width="150"></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_BIRTHDAYREST')"
                    align="center"
                    prop="birthrest"
                    width="200"
                  ></el-table-column>
                  <!--region add_qhr_20210730 隐藏本月入/退職/産休基本工资、本月入/退職/産休基本給列-->
                  <el-table-column v-if="false"
                                   :label="$t('label.PFANS2006VIEW_THISMONTHBASICBASIC')"
                                   align="center"
                                   prop="thismonthbasicbasic"
                                   width="200"
                  ></el-table-column>
                  <!--endregion add_qhr_20210730 隐藏本月入/退職/産休基本工资、本月入/退職/産休基本給列-->
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_MONTHLYPOSTALTEMPORARY')"
                    align="center"
                    prop="thismonthbasic"
                    width="200"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_SHORTDURATIONTIME')"
                    align="center"
                    prop="shortillness"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_LONGDURATIONTIME')"
                    align="center"
                    prop="longillness"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_ABSENCETIME')"
                    align="center"
                    prop="owediligence"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_ABSENCEOFWORK')"
                    align="center"
                    prop="owingcontrol"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_THISMONTHBASICGEI')"
                    align="center"
                    prop="thismonthbasicgei"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_THISMONTHDUTYGEI')"
                    align="center"
                    prop="thismonthdutygei"
                    width="150"
                  ></el-table-column>
                  <!-- 一括补助基本 -->
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_YKBZJB')"
                    align="center"
                    prop="ykbzjs"
                    width="150"
                  ></el-table-column>
                  <!-- 一括补助 -->
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_YKBZ')"
                    align="center"
                    prop="ykbz"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_KASUKE')"
                    align="center"
                    prop="overtimesubsidy"
                    width="150"
                  ></el-table-column>
                  <!-- 小计1(基本給+补助) -->
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_SUBTOTAL1')"
                    align="center"
                    prop="total1"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_OTHER2')"
                    align="center"
                    prop="other2"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_MONTHLYBONUS')"
                    align="center"
                    prop="appreciation"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_OTHER3')"
                    align="center"
                    prop="other3"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_SUBTOTAL2')"
                    align="center"
                    prop="total2"
                    width="150"
                  ></el-table-column>
                  <!-- </el-table-column> -->

                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_INDUSTRY')"
                    align="center"
                    prop="taxestotal"
                    width="150"
                  ></el-table-column>

                  <!-- <el-table-column :label="$t('label.PFANS2005FORMVIEW_MS')" align="center"> -->
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_HEATING')"
                    align="center"
                    prop="heating"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_OLONECHILD')"
                    align="center"
                    prop="onlychildmoney"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_SUBTOTAL3')"
                    align="center"
                    prop="total3"
                    width="150"
                  ></el-table-column>
                  <!-- </el-table-column> -->

                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_ARSENAL')"
                    align="center"
                    prop="totalwages"
                    width="150"
                  ></el-table-column>

                  <!-- <el-table-column :label="$t('label.PFANS2006VIEW_SECURITY')" align="center"> -->
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_OLD')"
                    align="center"
                    prop="endowmentinsurance"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_MEDICAL')"
                    align="center"
                    prop="medicalinsurance"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_UNEMPLOYMENT')"
                    align="center"
                    prop="unemploymentinsurance"
                    width="150"
                  ></el-table-column>
                  <!-- </el-table-column> -->

                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_SOCIALSECURITY')"
                    align="center"
                    prop="socialinsurance"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_PUBLICMONEY')"
                    align="center"
                    prop="accumulationfund"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_SECURITYMON')"
                    align="center"
                    prop="disciplinarycontrol"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    v-if="false"
                    :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                    align="center"
                    prop="disciplinary_total"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    v-if="false"
                    :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                    align="center"
                    prop="comprehensive_yearstotal12"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    v-if="false"
                    :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                    align="center"
                    prop="dic_ljynssdecs"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    v-if="false"
                    :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                    align="center"
                    prop="dic_0je"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    v-if="false"
                    :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                    align="center"
                    prop="dic_1je"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    v-if="false"
                    :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                    align="center"
                    prop="dic_0sl"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    v-if="false"
                    :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                    align="center"
                    prop="dic_1sl"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    v-if="false"
                    :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                    align="center"
                    prop="dic_2sl"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    v-if="false"
                    :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                    align="center"
                    prop="dic_3sl"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    v-if="false"
                    :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                    align="center"
                    prop="dic_4sl"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    v-if="false"
                    :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                    align="center"
                    prop="dic_5sl"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    v-if="false"
                    :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                    align="center"
                    prop="dic_6sl"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    v-if="false"
                    :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                    align="center"
                    prop="dic_0sskc"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    v-if="false"
                    :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                    align="center"
                    prop="dic_1sskc"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    v-if="false"
                    :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                    align="center"
                    prop="dic_2sskc"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    v-if="false"
                    :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                    align="center"
                    prop="dic_3sskc"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    v-if="false"
                    :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                    align="center"
                    prop="dic_4sskc"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    v-if="false"
                    :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                    align="center"
                    prop="dic_5sskc"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    v-if="false"
                    :label="$t('label.PFANS2005FORMVIEW_ADJUSTMENTNUMBER')"
                    align="center"
                    prop="dic_6sskc"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_EXCLUSIVE')"
                    align="center"
                    prop="thismonthterm"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_ACCUMULATED')"
                    align="center"
                    prop="thismonthadditional"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_UNACCUMULATED')"
                    align="center"
                    prop="thismonthdutyfree"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_ANNUAL')"
                    align="center"
                    prop="lastdutyfree"
                    width="150"
                  ></el-table-column>

                  <!-- <el-table-column :label="$t('label.PFANS2006VIEW_ONLYTAX')" align="center"> -->
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_RESIDENTIALTAX')"
                    align="center"
                    prop="housingmoneys"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_COMPANYBOSS')"
                    align="center"
                    prop="other4"
                    width="230"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_OTHER5')"
                    align="center"
                    prop="other5"
                    width="150"
                  ></el-table-column>
                  <!-- </el-table-column> -->

                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_RESPONSIBLE')"
                    align="center"
                    prop="shouldwages"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_CUMULATIVE')"
                    align="center"
                    prop="shouldcumulative"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_INCOME')"
                    align="center"
                    prop="shouldpaytaxes"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_THISMONTH')"
                    align="center"
                    prop="thismonthadjustment"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005VIEW_ACTUAL')"
                    align="center"
                    prop="realwages"
                    width="150"
                  ></el-table-column>

                  <!-- <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_COMPANYSUPPORT')"
                    align="center"
                  >-->
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_OLD')"
                    align="center"
                    prop="comendowmentinsurance"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_MEDICAL')"
                    align="center"
                    prop="commedicalinsurance"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2006VIEW_UNEMPLOYMENT')"
                    align="center"
                    prop="comunemploymentinsurance"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_EMPLOYMENTINJURYINSURANCE')"
                    align="center"
                    prop="cominjuryinsurance"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_COMBIRTHINSURANCE')"
                    align="center"
                    prop="combirthinsurance"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_HEATINGCOST')"
                    align="center"
                    prop="comheating"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_HOUSINGPROVIDENTFUND')"
                    align="center"
                    prop="comaccumulationfund"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_TOTAL')"
                    align="center"
                    prop="total"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_LABORUNIONFUNDBASE')"
                    align="center"
                    prop="labourunionbase"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2009VIEW_INDUSTRIALPARTY')"
                    align="center"
                    prop="labourunionfunds"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_TOTALWAGES')"
                    align="center"
                    prop="comtotalwages"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_NJJY')"
                    align="center"
                    prop="njjy"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_GAUGE')"
                    align="center"
                    prop="bonusmoney"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_TOTALGAUGE')"
                    align="center"
                    prop="totalbonus"
                    width="150"
                  ></el-table-column>
                  <el-table-column
                    :label="$t('label.PFANS2005FORMVIEW_OTHER6')"
                    align="center"
                    prop="other6"
                    width="150"
                  ></el-table-column>
                </el-table>
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
import moment from 'moment';
import {getUserInfo} from '@/utils/customize';

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
            response[i].workdate = moment(response[i].workdate).format('YYYY-MM-DD');
            if (i === 0) {
              response[i].no = this.$t('label.PFANS2034VIEW_ESTIMATE');
            } else {
              response[i].no = this.$t('label.PFANS2006VIEW_ACTUAL');
            }
            if (this.$i18n) {
              response[i].sex = response[i].sex === 'PR019001' ? this.$t('label.PFANS2002FORMVIEW_BOY') : this.$t('label.PFANS2002FORMVIEW_GRIL');
              response[i].onlychild = response[i].onlychild === '1' ? this.$t('label.yes') : '-';
              response[i].type =
                response[i].type === '1'
                  ? '入職'
                  : response[i].type === '2'
                  ? '女産休'
                  : response[i].type === '4'
                    ? '退職'
                    : '-';
              response[i].bonus = response[i].bonus === '2' ? this.$t('label.PFANSUSERFORMVIEW_OLDSTAFF') : this.$t('label.PFANSUSERFORMVIEW_NEWSTAFF');
              response[i].sociology = response[i].sociology === '1' ? this.$t('label.yes') : '-';
              response[i].registered = response[i].registered === '1' ? this.$t('label.yes') : '-';
            }
          }
          this.data = response;
          this.loading = false;
        });
    },
    buttonClick(val) {

    },
    getSummaries(param) {
      const {columns, data} = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = this.$t('label.PFANS2006VIEW_DIFF');
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = this.setScale2(parseFloat(values[1]) - parseFloat(values[0]));
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
    },
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

.el-table--scrollable-x .el-table__body-wrapper {
  z-index: 1;
}
</style>
