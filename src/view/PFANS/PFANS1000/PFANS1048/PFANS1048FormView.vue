<template>
  <div style="min-height: 100%">
    <EasyNormalContainer
      ref="container"
      v-loading="loading"
      :buttonList="buttonList"
      :title="title"
      @buttonClick="buttonClick"
    >
      <div slot="customize">
        <el-form ref="refform" :model="refform" :rules="rules" label-position="top" label-width="8vw"
                 style="padding: 2vw">
          <el-row style="padding-top: 0.5%;padding-bottom: 0.5%">
            <el-col :span="6">
              <el-form-item :label="$t('label.PFANS1036FORMVIEW_BUSINESSYEAR')" prop="year">
                <div class="block">
                  <el-date-picker
                    v-model="refform.year"
                    :disabled="true"
                    style="width: 15vw"
                    type="year"
                    @change="yearChange">
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('label.PFANS2009VIEW_JUNE')" prop="month">
                <div class="block">
                  <el-date-picker
                    v-model="refform.month"
                    :disabled="true"
                    style="width: 15vw"
                    type="month"
                    @change="monthChange">
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('label.PFANS2036VIEW_DEPARTMENT')" prop="group_id">
                <el-select v-model="refform.group_id" :disabled="departmentshow" style="width: 20vw"
                           @change="groupChange">
                  <el-option
                    v-for="item in grp_options"
                    :key="item.groupid"
                    :label="item.groupname"
                    :value="item.groupid">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item :label="$t('label.PFANS1045VIEW_SPAN18')">
                <el-input v-model="refform.sumtatole10" :disabled="true" maxlength="20"
                          style="width:15vw"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('label.PFANS1045VIEW_SPAN6')">
                <el-input v-model="refform.sumtatole1" :disabled="true" maxlength="20"
                          style="width:15vw"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('label.PFANS1045VIEW_SPAN7')">
                <el-input v-model="refform.sumtatole2" :disabled="true" maxlength="20"
                          style="width:15vw"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item :label="$t('label.PFANS1045VIEW_SPAN8')">
                <el-input v-model="refform.sumtatole3" :disabled="true" maxlength="15"
                          style="width:15vw"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('label.PFANS1045VIEW_SPAN9')">
                <el-input v-model="refform.sumtatole4" :disabled="true" maxlength="15"
                          style="width:15vw"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('label.PFANS1045VIEW_SPAN10')">
                <el-input v-model="refform.sumtatole5" :disabled="true" maxlength="15"
                          style="width:15vw"></el-input>
              </el-form-item>
            </el-col>

          </el-row>
          <el-row>
            <el-col :span="6">
              <el-form-item :label="$t('label.PFANS1045VIEW_SPAN11')">
                <el-input v-model="refform.sumtatole6" :disabled="true" maxlength="20"
                          style="width:15vw"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('label.PFANS1045VIEW_SPAN12')">
                <el-input v-model="refform.sumtatole7" :disabled="true" maxlength="20"
                          style="width:15vw"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('label.PFANS1045VIEW_SPAN13')">
                <el-input v-model="refform.sumtatole8" :disabled="true" maxlength="20"
                          style="width:15vw"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('label.PFANS1045VIEW_SPAN14')">
                <el-input v-model="refform.sumtatole9" :disabled="true" maxlength="20"
                          style="width:15vw"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-table ref="multipleTable" :data="dataNList" :span-method="objectSpanMethod"
                      border header-cell-class-name="sub_bg_color_blue" height="85vh"
                      width="100%"
            >
              <el-table-column :formatter="formatterDir" align="center" fixed prop="name1" width="80">
              </el-table-column>
              <el-table-column :formatter="formatterDir" :label="$t('label.user_name')" align="center"
                               fixed prop="name" width="180">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.name" :disabled="true" maxlength="100"
                            style="width: 100%"></el-input>
                </template>
              </el-table-column>
              <el-table-column :formatter="formatterDir" :label="$t('label.PFANS1045VIEW_SPAN2')" align="center"
                               fixed prop="money" width="180">
                <template slot-scope="scope">
                  <el-input-number v-if="(scope.row.type === '2')||(scope.row.nameid ==='111111')" v-model="scope.row.money" :max="9999999"
                                   :min="0" :no="scope.row"
                                   :precision="2"
                                   :step="1" controls-position="right" style="width: 100%"
                  ></el-input-number>
                  <el-input
                    v-else
                    v-model="scope.row.money"
                    :disabled="true"
                    :no="scope.row"
                    :type="passwordType"
                    autocomplete="off"
                    name="password"
                    prefix-icon="el-icon-share"
                    show-password
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column v-for="(item, index) in dataHeader" :key="index"
                               :label="$t(item.companyproject)" min-width="100">
                <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')"
                                 :property="`works${index}`"
                                 width="80"></el-table-column>
                <el-table-column :label="$t('label.PFANS1027FORMVIEW_COL5T0')"
                                 :property="`radio${index}`"
                                 width="80"></el-table-column>
                <el-table-column :label="$t('label.PFANS6008VIEW_COST')"
                                 :property="`cost${index}`"
                                 width="100"></el-table-column>
              </el-table-column>
            </el-table>
          </el-row>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
import EasyNormalContainer from '@/components/EasyNormalContainer';
import EasyWorkFlow from '@/components/EasyWorkFlow';
import {Message} from 'element-ui';
import dicselect from '../../../components/dicselect';
import {getCurrentRoleNew, getOrgInfo} from '@/utils/customize';
import org from '../../../components/org';
import moment from 'moment';

export default {
  name: 'PFANS1048FormView',
  components: {
    EasyNormalContainer,
    EasyWorkFlow,
    dicselect,
    org,
  },
  data() {
    return {
      departmentshow: false,
      passwordType: 'password',
      project1: [],
      project2: [],
      project4: [],
      project5: [],
      objectSpan1: '',
      objectSpan2: '',
      objectSpan3: '',
      disabled: false,
      grp_options: [],
      dataHeader: [],
      dataList: [],
      dataNList: [],
      title: 'title.PFANS1048VIEW',
      loading: false,
      buttonList: [],
      rules: {
        year: [{
          required: true,
          message: this.$t('normal.error_09') + this.$t('label.PFANS1036FORMVIEW_BUSINESSYEAR'),
          trigger: 'change',
        }],
        month: [{
          required: true,
          message: this.$t('normal.error_08') + this.$t('label.PFANS2009VIEW_JUNE'),
          trigger: 'change',
        }],
        group_id: [{
          required: true,
          message: this.$t('normal.error_08') + this.$t('label.PFANS2036VIEW_DEPARTMENT'),
          trigger: 'blur',
        }],
      },
      refform: {
        year: parseInt(moment(new Date()).format('MM')) >= 4 ? moment(new Date()).format('YYYY') : parseInt(moment(new Date()).format('YYYY')) - 1 + '',
        month: moment(new Date().setMonth(new Date().getMonth() - 1)).format('YYYY-MM'),
        group_id: '',
        encoding: '',
        sumtatole1: '',
        sumtatole2: '',
        sumtatole3: '',
        sumtatole4: '',
        sumtatole5: '',
        sumtatole6: '',
        sumtatole7: '',
        sumtatole8: '',
        sumtatole9: '',
        sumtatole10: '',
      },
    };
  },
  created() {
    this.disabled = this.$route.params.disabled;
    if (this.disabled) {
      this.buttonList = [
        {
          key: 'save',
          name: 'button.save',
          disabled: false,
          icon: 'el-icon-check',
        },
      ];
    } else {
      this.buttonList = [
        {
          key: 'save',
          name: 'button.save',
          disabled: true,
          icon: 'el-icon-check',
        },
      ];
    }
  },
  mounted() {
    if (this.$route.params._id) {
      this.loading = true;
      this.$store
        .dispatch('PFANS1048Store/selectById', {'projectincomeid': this.$route.params._id})
        .then(response => {
          this.refform = response;
          this.project1 = JSON.parse(response.projectincomevo1);
          this.project2 = JSON.parse(response.projectincomevo2);
          this.project4 = JSON.parse(response.projectincomevo4);
          this.dataHeader = JSON.parse(response.projectincomevo1);
          this.dataList = JSON.parse(response.projectincomevo2);
          //经费
          this.objectSpan1 = this.dataList.filter(item => (item.type == '2'));
          //人件
          this.objectSpan2 = this.dataList.filter(item => (item.type == '1'));
          //外注
          this.objectSpan3 = this.dataList.filter(item => (item.type == '0'));
          this.grp_options = JSON.parse(response.projectincomevo4);
          this.dataNList = JSON.parse(response.projectincomevo5);
          this.departmentshow = true;
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
    } else {
      this.getorglistname();
      this.getprojects();
      this.departmentshow = false;
    }
  },
  watch: {
    dataNList: {
      handler(newValue, oldValue) {
        this.computedSum();
      },
      deep: true,
    },
    dataList: {
      handler(newValue, oldValue) {
        //经费
        this.objectSpan1 = this.dataList.filter(item => (item.type == '2'));
        //人件
        this.objectSpan2 = this.dataList.filter(item => (item.type == '1'));
        //外注
        this.objectSpan3 = this.dataList.filter(item => (item.type == '0'));

        this.computedSum2();
      },
      deep: true,
    },
  },
  methods: {
    computedSum2() {
      for (let i = 0; i < this.objectSpan1.length; i++) {
        this.$set(this.dataNList[i], 'money', this.objectSpan1[i].money || '0.00');
      }
    },
    computedSum() {
      let span1 = this.objectSpan1.length;
      let span2 = this.objectSpan2.length;
      let span3 = this.objectSpan3.length;
      let span4 = span1 + 1;
      let span5 = span1 + span2;
      let span6 = span1 + span2 - 1;
      let span7 = span1 + span2;
      let span8 = this.dataHeader.length - 1;
      let index = span1 + span2 + span3;
      let index1 = span1 + span2 + span3 + 1;
      let index2 = span1 + span2 + span3 + 2;
      let index3 = span1 + span2 + span3 + 3;
      let index4 = span1 + span2 + span3 + 4;
      let index5 = this.project5.length;
      //外注费合计
      if (span3 === 0) {
        for (let j = 0; j < this.dataHeader.length; j++) {
          this.$set(this.dataNList[index1], 'works' + [j], '0.00');
          this.$set(this.dataNList[index1], 'radio' + [j], '-');
          this.$set(this.dataNList[index1], 'cost' + [j], '0.00');
        }
      } else {
        for (let j = 0; j < this.dataHeader.length; j++) {
          let sumworks = 0;
          let sumcost = 0;
          for (let i = span7; i < index; i++) {
            sumworks += parseFloat(this.dataNList[i]['works' + j]);
            sumcost += parseFloat(this.dataNList[i]['cost' + j]);
          }
          this.$set(this.dataNList[index1], 'works' + [j], sumworks.toFixed(2) || '0.00');
          this.$set(this.dataNList[index1], 'radio' + [j], '-');
          this.$set(this.dataNList[index1], 'cost' + [j], sumcost.toFixed(2) || '0.00');
        }
      }
      //人件费合计
      for (let j = 0; j < this.dataHeader.length; j++) {
        let sumworks = 0;
        let sumcost = 0;
        for (let i = span4; i < span5; i++) {
          sumworks += parseFloat(this.dataNList[i]['works' + j]);
          sumcost += parseFloat(this.dataNList[i]['cost' + j]);
        }

        this.$set(this.dataNList[index], 'works' + [j], sumworks.toFixed(2) || '0.00');
        this.$set(this.dataNList[index], 'radio' + [j], '-');
        this.$set(this.dataNList[index], 'cost' + [j], sumcost.toFixed(2) || '0.00');
      }
      //经费比率
      let jfsumworks = 0;
      for (let j = 0; j < this.dataHeader.length; j++) {
        jfsumworks += parseFloat(this.dataNList[index]['works' + j]);
      }
      for (let j = 0; j < this.dataHeader.length; j++) {
        for (let i = 0; i < span1; i++) {
          let jfdsumworks = 0;
          jfdsumworks = this.dataNList[index]['works' + j];
          if (jfsumworks > 0) {
            let radio = Number(Number(jfdsumworks) / Number(jfsumworks) * 100).toFixed(2);
            let radios = radio + '%';
            this.$set(this.dataNList[i], 'radio' + [j], radios || '0.00%');
          } else {
            this.$set(this.dataNList[i], 'radio' + [j], '0.00%');
          }
        }
      }
      //经费费用
      for (let i = 0; i < span1; i++) {
        for (let j = 0; j < this.dataHeader.length; j++) {
          if (this.dataNList[i]['radio' + [j]] != '0.00%') {
            let cost = this.dataNList[i]['radio' + [j]].replace('%', '');
            let costs = Math.round(Number(this.dataNList[i].money) * Number(cost));
            Math.round(Number(this.dataNList[i].money) * Number(cost));
            let endcost = costs / 100;
            this.$set(this.dataNList[i], 'cost' + [j], endcost || '0.00');
          } else {
            this.$set(this.dataNList[i], 'cost' + [j], '0.00');
          }
        }
      }
      //经费合计
      for (let j = 0; j < this.dataHeader.length; j++) {
        let sumcost = 0;
        for (let i = 0; i < span1; i++) {
          sumcost += parseFloat(this.dataNList[i]['cost' + j]);
        }
        this.$set(this.dataNList[index2], 'works' + [j], '-');
        this.$set(this.dataNList[index2], 'radio' + [j], '-');
        this.$set(this.dataNList[index2], 'cost' + [j], sumcost.toFixed(2) || '0.00');
      }
      //合计支出
      for (let j = 0; j < this.dataHeader.length; j++) {
        let jsumcost = 0;
        let rsumcost = 0;
        let wsumcost = 0;
        //经费费用
        for (let i = 0; i < span1; i++) {
          jsumcost += parseFloat(this.dataNList[i]['cost' + j]);
        }
        //人件费费用
        for (let i = span4; i < span5; i++) {
          rsumcost += parseFloat(this.dataNList[i]['cost' + j]);
        }
        //外注费费用
        for (let i = span7; i < index; i++) {
          wsumcost += parseFloat(this.dataNList[i]['cost' + j]);
        }
        let costcum = Number(wsumcost) + Number(rsumcost) + Number(jsumcost);
        this.$set(this.dataNList[index3], 'works' + [j], '-');
        this.$set(this.dataNList[index3], 'radio' + [j], '-');
        this.$set(this.dataNList[index3], 'cost' + [j], costcum.toFixed(2) || '0.00');
      }
      //合计收入
      for (let j = 0; j < this.dataHeader.length; j++) {
        this.$set(this.dataNList[index4], 'works' + [j], '-');
        this.$set(this.dataNList[index4], 'radio' + [j], '-');
        this.$set(this.dataNList[index4], 'cost' + [j], Number(this.dataHeader[j].contractamount).toFixed(2) || '0.00');
      }

      //本月总成本
      let costsum = 0;
      for (let j = 0; j < this.dataHeader.length; j++) {
        costsum += parseFloat(this.dataNList[index3]['cost' + j]);
      }
      this.refform.sumtatole1 = costsum.toFixed(2);
      //本月共通结转
      let rcostsum = Number(this.dataNList[index]['cost' + span8]);
      let wcostsum = Number(this.dataNList[index1]['cost' + span8]);
      let jcostsum = Number(this.dataNList[index2]['cost' + span8]);
      let sumtotale = Number(rcostsum) + Number(wcostsum) + Number(jcostsum) - Number(this.dataNList[span6].money);
      this.refform.sumtatole2 = sumtotale.toFixed(2);

      //本月完工人件费，本月完工经费，本月完工外注费
      let rcostsum1 = 0;
      let wcostsum1 = 0;
      let jcostsum1 = 0;
      for (let j = 0; j < this.dataHeader.length; j++) {

        if (this.dataHeader[j].type === '0') {
          rcostsum1 += parseFloat(this.dataNList[index]['cost' + j]);
          wcostsum1 += parseFloat(this.dataNList[index1]['cost' + j]);
          jcostsum1 += parseFloat(this.dataNList[index2]['cost' + j]);
        }
      }
      this.refform.sumtatole3 = rcostsum1.toFixed(2);
      this.refform.sumtatole4 = wcostsum1.toFixed(2);
      this.refform.sumtatole5 = jcostsum1.toFixed(2);
      //本月完工成本
      this.refform.sumtatole6 = (Number(rcostsum1) + Number(wcostsum1) + Number(jcostsum1) + Number(sumtotale)).toFixed(2);
      //本月在库记上
      this.refform.sumtatole7 = (Number(this.refform.sumtatole1) - Number(this.refform.sumtatole6)).toFixed(2);
      //本月营业利润
      let contractamount = 0;
      for (let j = 0; j < this.dataHeader.length; j++) {
        if (this.dataHeader[j].type === '0') {
          contractamount += parseFloat(this.dataNList[index4]['cost' + j]);
        }
      }
      //本月完工收入
      this.refform.sumtatole10 = (Number(contractamount)).toFixed(2);
      //本月营业利润
      this.refform.sumtatole8 = (Number(contractamount) - Number(this.refform.sumtatole6)) < 0 ? '0.00' : (Number(contractamount) - Number(this.refform.sumtatole6)).toFixed(2);
      //本月完工PJ营业利润（配付除外）
      if (contractamount === 0) {
        this.refform.sumtatole9 = Number(0).toFixed(2) + '%';
      } else {
        this.refform.sumtatole9 = Math.round(Number(this.refform.sumtatole8) / Number(contractamount) * 100).toFixed(2) + '%';
      }
    },
    objectSpanMethod({row, column, rowIndex, columnIndex}) {
      let span1 = this.objectSpan1.length;
      let span2 = this.objectSpan2.length;
      let span3 = this.objectSpan3.length;
      let span4 = span1;
      let span5 = span1 + span2;
      let span6 = 0;
      if (span3 === 0) {
        span6 = span1 + span2;
      } else {
        span6 = span1 + span2 + span3;
      }
      let span7 = span6 + 1;
      let span8 = span7 + 1;
      let span9 = span8 + 1;
      let span10 = span9 + 1;

      if (columnIndex === 0) {
        if (span3 != 0) {
          if (rowIndex === span5) {
            return {
              rowspan: span3,
              colspan: 1,
            };
          }
        }
        if (rowIndex === 0) {
          return {
            rowspan: span1,
            colspan: 1,
          };
        } else if (rowIndex === span4) {
          return {
            rowspan: span2,
            colspan: 1,
          };
        } else if ([span6, span7, span8, span9, span10].includes(rowIndex)) {
          return {
            rowspan: 1,
            colspan: 3,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      } else if (columnIndex === 1) {
        if ([span6, span7, span8, span9, span10].includes(rowIndex)) {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      } else if (columnIndex === 2) {
        if ([span6, span7, span8, span9, span10].includes(rowIndex)) {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },
    formatterDir(row, column, cellValue, index) {
      let span1 = this.objectSpan1.length;
      let span2 = this.objectSpan2.length;
      let span3 = this.objectSpan3.length;
      let span6 = 0;
      if (span3 === 0) {
        span6 = span1 + span2;
      } else {
        span6 = span1 + span2 + span3;
      }
      let span4 = span1;
      let span5 = span1 + span2;
      let span7 = span6 + 1;
      let span8 = span7 + 1;
      let span9 = span8 + 1;
      let span10 = span9 + 1;
      if (column.property === 'name1') {
        if (span3 != 0) {
          if (index === span5) {
            return this.$t('label.PFANS1045VIEW_SPAN3');
          }
        }
        if (index === 0) {
          return this.$t('label.PFANS1045VIEW_SPAN1');
        } else if (index === span4) {
          return this.$t('label.PFANS1045VIEW_SPAN2');
        } else if (index === span6) {
          return this.$t('label.PFANS1045VIEW_SPAN15');
        } else if (index === span7) {
          return this.$t('label.PFANS1045VIEW_SPAN16');
        } else if (index === span8) {
          return this.$t('label.PFANS1045VIEW_SPAN17');
        } else if (index === span9) {
          return this.$t('label.PFANS1045VIEW_SPAN4');
        } else if (index === span10) {
          return this.$t('label.PFANS1045VIEW_SPAN5');
        }
      } else if (column.property === 'name') {
        return row[column.property];
      }
    },
    getprojects() {
      // if (this.refform.group_id === '') {
      //   this.refform.group_id = getOrgInfoByUserId(this.$store.getters.userinfo.userid).group_id || '';
      // }
      let parameter = {
        groupid: this.refform.group_id,
        userid: this.$store.getters.userinfo.userid,
        year: this.refform.year,
        month: this.refform.month,
      };
      this.loading = true;
      this.$store
        .dispatch('PFANS1048Store/getprojects', parameter)
        .then(response => {
          this.project1 = response.projectincomevo1;
          this.project2 = response.projectincomevo2;
          this.project4 = response.projectincomevo4;
          this.project5 = response.projectincomevo5;
          if (response.projectincomevo1.length > 0) {
            this.dataHeader = response.projectincomevo1;
          }
          if (response.projectincomevo2.length > 0) {
            this.dataList = response.projectincomevo2;
            //经费
            this.objectSpan1 = this.dataList.filter(item => (item.type == '2'));
            //人件
            this.objectSpan2 = this.dataList.filter(item => (item.type == '1'));
            //外注
            this.objectSpan3 = this.dataList.filter(item => (item.type == '0'));
          }
          if (response.projectincomevo4.length > 0) {
            const grp = [];
            for (let g = 0; g < this.grp_options.length; g++) {
              let grpli = response.projectincomevo4.filter(item => item.groupid == this.grp_options[g].groupid);
              if (grpli) {
                grp.push(grpli[0]);
              }
            }
            this.grp_options = grp;
            let grpliencoding = response.projectincomevo4.filter(item => item.groupid == this.refform.group_id);
            this.refform.encoding = grpliencoding[0].encoding;
            if (this.refform.group_id == '') {
              this.refform.group_id = response.projectincomevo4[0].groupid;
              this.refform.encoding = response.projectincomevo4[0].encoding;
            }
          }
          if (response.projectincomevo5.length > 0) {
            this.dataNList = [];
            this.dataNList = response.projectincomevo5;
          }
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
    getorglistname() {
      let role = getCurrentRoleNew();
      const vote = [];

      if (role === '3') {//CENTER
        vote.push(
          {
            groupid: this.$store.getters.userinfo.userinfo.centerid,
            groupname: this.$store.getters.userinfo.userinfo.centername,
          },
        );
        //add ccm 0112 兼职部门
        if (this.$store.getters.userinfo.userinfo.otherorgs) {
          for (let others of this.$store.getters.userinfo.userinfo.otherorgs) {
            if (others.centerid) {
              this.$store.getters.orgGroupList.filter((item) => {
                if (item.centerid === others.centerid) {
                  vote.push(
                    {
                      groupid: item.centerid,
                      groupname: item.centername,
                    },
                  );
                }
              });
            }
          }
        }
        //add ccm 0112 兼职部门
      } else if (role === '2') {//副总经理
        this.$store.getters.orgGroupList.filter((item) => {
          if (item.virtualuser === this.$store.getters.userinfo.userid) {
            vote.push(
              {
                groupid: item.centerid,
                groupname: item.centername,
              },
            );
          }
        });
        //add ccm 0112 兼职部门
        if (this.$store.getters.userinfo.userinfo.otherorgs) {
          for (let others of this.$store.getters.userinfo.userinfo.otherorgs) {
            if (others.centerid) {
              this.$store.getters.orgGroupList.filter((item) => {
                if (item.centerid === others.centerid) {
                  vote.push(
                    {
                      groupid: item.centerid,
                      groupname: item.centername,
                    },
                  );
                }
              });
            }
          }
        }
        //add ccm 0112 兼职部门
      } else if (role === '4') //GM
      {
        let centers = getOrgInfo(this.$store.getters.userinfo.userinfo.centerid);
        if (centers) {
          if (centers.encoding === null || centers.encoding === '' || centers.encoding === undefined) {
            vote.push(
              {
                groupid: this.$store.getters.userinfo.userinfo.groupid,
                groupname: this.$store.getters.userinfo.userinfo.groupname,
              },
            );
          }
        }
      }
      const vote1 = [];
      if (this.$store.getters.useraccount._id === '5e78b17ef3c8d71e98a2aa30'//管理员
        || this.$store.getters.roles.indexOf('11') != -1 //总经理
        || this.$store.getters.roles.indexOf('16') != -1) //财务部长
      {
        this.$store.getters.orgGroupList.filter((item) => {
          vote1.push(
            {
              groupid: item.centerid,
              groupname: item.centername,
            },
          );
        });
        this.grp_options = vote1;
      } else {
        this.grp_options = vote;
      }
      //去重
      let letoptionsdata = [];
      let arrId = [];
      for (var item of this.grp_options) {
        if (arrId.indexOf(item['groupname']) == -1) {
          arrId.push(item['groupname']);
          letoptionsdata.push(item);
        }
      }
      //针对经营管理统计到group修改 start
      let incfmyList = [];
      for (let item of letoptionsdata) {
        if (getOrgInfo(item.groupid).encoding == '') {
          incfmyList.push(item.groupid);
        }
      }
      if (incfmyList.length > 0) {
        for (let item of incfmyList) {
          letoptionsdata = letoptionsdata.filter(letitem => letitem.groupid != item);
        }
        let orgInfo = [];
        for (let item of incfmyList) {
          if (item) {
            if (getOrgInfo(item).orgs.length != 0) {
              orgInfo.push(getOrgInfo(item).orgs);
            }
          }
        }
        let groInfo = orgInfo[0].filter(item => item.type == '2');
        for (let item of groInfo) {
          letoptionsdata.push(
            {
              groupid: item._id,
              groupname: item.title,
            },
          );
        }
      }
      //针对经营管理统计到group修改 end
      this.grp_options = letoptionsdata;
      if (this.grp_options.length > 0) {
        this.refform.group_id = this.grp_options[0].groupid;
      }

      //UPD CCM 20210422
    },
    buttonClick(val) {
      this.$refs['refform'].validate(valid => {
        if (valid) {
          this.loading = true;
          for (let i = 0; i < this.project2.length; i++) {
            let pro2 = this.dataNList.filter(item => item.type != '3' && item.name === this.project2[i].name);
            if (pro2.length > 0) {
              this.project2[i].money = pro2[0].money;
            }
          }

          this.refform.projectincomevo1 = JSON.stringify(this.project1);
          this.refform.projectincomevo2 = JSON.stringify(this.project2);
          this.refform.projectincomevo4 = JSON.stringify(this.project4);
          this.refform.projectincomevo5 = JSON.stringify(this.dataNList);
          this.$store
            .dispatch('PFANS1048Store/insert', this.refform)
            .then(response => {
              this.data = response;
              this.loading = false;
              Message({
                message: this.$t('normal.success_02'),
                type: 'success',
                duration: 5 * 1000,
              });
              this.$router.push({
                name: 'PFANS1048View',
              });
            })
            .catch(error => {
              this.$message.error({
                message: error,
                type: 'error',
                duration: 5 * 1000,
              });
              this.loading = false;
            });
        } else {
          this.loading = false;
          Message({
            message: this.$t('normal.error_12'),
            type: 'error',
            duration: 5 * 1000,
          });
        }
      });
    },
    yearChange(value) {
      let val = value;
      if (value) {
        val = moment(value).format('YYYY');
      }
      this.refform.year = val;
      this.getprojects();
    },
    monthChange(value) {
      let val = value;
      if (value) {
        val = moment(value).format('YYYY-MM');
      }
      this.refform.month = val;
      this.getprojects();
    },
    groupChange(val) {
      this.refform.group_id = val;
      let data = this.grp_options.filter(item => (item.groupid == val));
      if (data.length > 0) {
        this.refform.encoding = data[0].encoding;
      }
      this.getprojects();
    },
  },
};
</script>

<style scoped>

</style>
