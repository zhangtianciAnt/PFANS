<template>
  <div>
    <el-table ref="table" :data="tableBusiness" class="tableClass" header-cell-class-name="sub_bg_color_blue"
              style="width: 100%">
      <el-table-column>
        <el-table-column :formatter="formatterDir" :label="$t('label.PFANS1036FORMVIEW_CONTENT')" align="center"
                         prop="name" width="110">
        </el-table-column>
      </el-table-column>
      <el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_UNITPRICETHOUSAND')" align="center" prop="prices"
                         width="120">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.prices" :controls="false" :disabled="true" :min="0"
                             size="small" style="width:4.5vw" @change="handleChange(scope.row)"></el-input-number>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column>
        <el-table-column :formatter="formatterDir" align="center" prop="assetstype" width="110">
        </el-table-column>
      </el-table-column>
      <el-table-column :label="$t('label.April')" align="center" width="150">
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number4" width="130">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.number4" :disabled="disabled" :min="0" controls-position="right"
                             size="small" style="width:6vw" @change="handleChange(scope.row,4)"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money4" width="130">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.money4" :controls="false" :disabled="true" :min="0" size="small"
                             style="width:6vw"></el-input-number>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column :label="$t('label.May')" align="center" width="150">
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number5" width="130">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.number5" :disabled="disabled" :min="0" controls-position="right"
                             size="small" style="width:6vw" @change="handleChange(scope.row,5)"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money5" width="130">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.money5" :controls="false" :disabled="true" :min="0" size="small"
                             style="width:6vw"></el-input-number>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column :label="$t('label.June')" align="center" width="150">
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number6" width="130">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.number6" :disabled="disabled" :min="0" controls-position="right"
                             size="small" style="width:6vw" @change="handleChange(scope.row,6)"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money6" width="130">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.money6" :controls="false" :disabled="true" :min="0" size="small"
                             style="width:6vw"></el-input-number>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column :label="$t('label.July')" align="center" width="150">
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number7" width="130">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.number7" :disabled="disabled" :min="0" controls-position="right"
                             size="small" style="width:6vw" @change="handleChange(scope.row,7)"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money7" width="130">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.money7" :controls="false" :disabled="true" :min="0" size="small"
                             style="width:6vw"></el-input-number>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column :label="$t('label.August')" align="center" width="150">
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number8" width="130">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.number8" :disabled="disabled" :min="0" controls-position="right"
                             size="small" style="width:6vw" @change="handleChange(scope.row,8)"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money8" width="130">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.money8" :controls="false" :disabled="true" :min="0" size="small"
                             style="width:6vw"></el-input-number>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column :label="$t('label.September')" align="center" width="150">
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number9" width="130">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.number9" :disabled="disabled" :min="0" controls-position="right"
                             size="small" style="width:6vw" @change="handleChange(scope.row,9)"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money9" width="130">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.money9" :controls="false" :disabled="true" :min="0" size="small"
                             style="width:6vw"></el-input-number>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="150">
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="numberfirsthalf"
                         width="130">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.numberfirsthalf" :controls="false" :disabled="true" :min="0"
                             size="small" style="width:6vw"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="moneyfirsthalf" width="130">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.moneyfirsthalf" :controls="false" :disabled="true" :min="0"
                             size="small" style="width:6vw"></el-input-number>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column :label="$t('label.October')" align="center" width="150">
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number10" width="130">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.number10" :disabled="disabled" :min="0" controls-position="right"
                             size="small" style="width:6vw" @change="handleChange(scope.row,10)"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money10" width="130">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.money10" :controls="false" :disabled="true" :min="0" size="small"
                             style="width:6vw"></el-input-number>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column :label="$t('label.November')" align="center" width="150">
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number11" width="130">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.number11" :disabled="disabled" :min="0" controls-position="right"
                             size="small" style="width:6vw" @change="handleChange(scope.row,11)"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money11" width="130">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.money11" :controls="false" :disabled="true" :min="0" size="small"
                             style="width:6vw"></el-input-number>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column :label="$t('label.December')" align="center" width="150">
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number12" width="130">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.number12" :disabled="disabled" :min="0" controls-position="right"
                             size="small" style="width:6vw" @change="handleChange(scope.row,12)"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money12" width="130">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.money12" :controls="false" :disabled="true" :min="0" size="small"
                             style="width:6vw"></el-input-number>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column :label="$t('label.January')" align="center" width="150">
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number1" width="130">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.number1" :disabled="disabled" :min="0" controls-position="right"
                             size="small" style="width:6vw" @change="handleChange(scope.row,1)"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money1" width="130">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.money1" :controls="false" :disabled="true" :min="0" size="small"
                             style="width:6vw"></el-input-number>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column :label="$t('label.February')" align="center" width="150">
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number2" width="130">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.number2" :disabled="disabled" :min="0" controls-position="right"
                             size="small" style="width:6vw" @change="handleChange(scope.row,2)"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money2" width="130">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.money2" :controls="false" :disabled="true" :min="0" size="small"
                             style="width:6vw"></el-input-number>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column :label="$t('label.March')" align="center" width="150">
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number3" width="130">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.number3" :disabled="disabled" :min="0" controls-position="right"
                             size="small" style="width:6vw" @change="handleChange(scope.row,3)"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money3" width="130">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.money3" :controls="false" :disabled="true" :min="0" size="small"
                             style="width:6vw"></el-input-number>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="150">
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="numbersecondhalf"
                         width="130">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.numbersecondhalf" :controls="false" :disabled="true" :min="0"
                             size="small" style="width:6vw"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="moneysecondhalf"
                         width="130">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.moneysecondhalf" :controls="false" :disabled="true" :min="0"
                             size="small" style="width:6vw"></el-input-number>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="150">
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="numberAnnual" width="130">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.numberAnnual" :controls="false" :disabled="true" :min="0" size="small"
                             style="width:6vw"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="moneyAnnual" width="130">
          <template slot-scope="scope">
            <el-input-number v-model="scope.row.moneyAnnual" :controls="false" :disabled="true" :min="0" size="small"
                             style="width:6vw"></el-input-number>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <el-table :data="tableNewYearTotal" header-cell-class-name="sub_bg_color_blue" stripe style="padding-top: 2%">
      <el-table-column>
        <el-table-column :formatter="formatterDir" align="center" prop="total" width="110">
        </el-table-column>
      </el-table-column>
      <el-table-column>
        <el-table-column :formatter="formatterDir" align="center" prop="type" width="110">
        </el-table-column>
      </el-table-column>
      <el-table-column :label="$t('label.April')" align="center" width="110">
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number4" width="110">
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money4" width="110">
        </el-table-column>
      </el-table-column>
      <el-table-column :label="$t('label.May')" align="center" width="110">
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number5" width="110">
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money5" width="110">
        </el-table-column>
      </el-table-column>
      <el-table-column :label="$t('label.June')" align="center" width="110">
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number6" width="110">
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money6" width="110">
        </el-table-column>
      </el-table-column>
      <el-table-column :label="$t('label.July')" align="center" width="110">
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number7" width="110">
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money7" width="110">
        </el-table-column>
      </el-table-column>
      <el-table-column :label="$t('label.August')" align="center" width="110">
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number8" width="110">
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money8" width="110">
        </el-table-column>
      </el-table-column>
      <el-table-column :label="$t('label.September')" align="center" width="110">
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number9" width="110">
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money9" width="110">
        </el-table-column>
      </el-table-column>
      <el-table-column :label="$t('label.firsthalfyear')" align="center" width="110">
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="numberfirsthalf"
                         width="110">
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="moneyfirsthalf" width="110">
        </el-table-column>
      </el-table-column>
      <el-table-column :label="$t('label.October')" align="center" width="110">
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number10" width="110">
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money10" width="110">
        </el-table-column>
      </el-table-column>
      <el-table-column :label="$t('label.November')" align="center" width="110">
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number11" width="110">
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money11" width="110">
        </el-table-column>
      </el-table-column>
      <el-table-column :label="$t('label.December')" align="center" width="110">
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number12" width="110">
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money12" width="110">
        </el-table-column>
      </el-table-column>
      <el-table-column :label="$t('label.January')" align="center" width="110">
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number1" width="110">
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money1" width="110">
        </el-table-column>
      </el-table-column>
      <el-table-column :label="$t('label.February')" align="center" width="110">
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number2" width="110">
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money2" width="110">
        </el-table-column>
      </el-table-column>
      <el-table-column :label="$t('label.March')" align="center" width="110">
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="number3" width="110">
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="money3" width="110">
        </el-table-column>
      </el-table-column>
      <el-table-column :label="$t('label.secondhalfyear')" align="center" width="110">
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="numbersecondhalf"
                         width="110">
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="moneysecondhalf"
                         width="110">
        </el-table-column>
      </el-table-column>
      <el-table-column :label="$t('label.PFANS1036FORMVIEW_ANNUALTOTAL')" align="center" width="110">
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBERGS')" align="center" prop="numberAnnual" width="110">
        </el-table-column>
        <el-table-column :label="$t('label.PFANS1036FORMVIEW_AMOUNT')" align="center" prop="moneyAnnual" width="110">
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 事业计划交通费取自字典 ztc fr
import {getDictionaryInfo} from '@/utils/customize';

export default {
  name: 'BussinessComponent',
  // 事业计划交通费取自字典 ztc to
  components: {},
  data() {
    return {
      activeName: 'first',
      tableNewYearTotal: [{assetstype: '0'}],
    };
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    tableBusiness: {
      type: Array,
      default: function() {
        return [{}];
      },
    },
  },
  mounted() {

  },
  methods: {
    formatterDir(row, column, cellValue, index) {
      if (column.property === 'name') {
        if (index === 0) {
          // 事业计划交通费取自字典 ztc fr
          // return this.$t("label.PFANS1036FORMVIEW_DOMESTICTRAVEL");
          return getDictionaryInfo('PJ149001').value1;
        } else if (index === 1) {
          // return this.$t('label.PFANS1036FORMVIEW_JAPANBUSINESSTRAVEL');
          return getDictionaryInfo('PJ149002').value1;
        } else if (index === 2) {
          // return this.$t('label.PFANS1036FORMVIEW_BUSINESSTRAVEL');
          return getDictionaryInfo('PJ149003').value1;
        } else if (index === 3) {
          // return  this.$t('label.PFANS1036FORMVIEW_LOCALTRANSPORT');
          return getDictionaryInfo('PJ149004').value1;
        }
        // 事业计划交通费取自字典 ztc to
      }
      if (column.property === 'assetstype') {
        if (row[column.property] === '0') {
          return this.$t('label.PFANS1036FORMVIEW_PLAN');
        }
      }
      if (column.property === 'total') {
        if (index === 0) {
          return this.$t('label.PFANS1036FORMVIEW_TOTAL');
        }
      }
      if (column.property === 'type') {
        if (index === 0) {
          return this.$t('label.PFANS1036FORMVIEW_PLAN');
        }
      }
    },
    handleChange(scope, index) {
      if (scope.prices > 0) {
        scope['money' + index] = (scope.prices * scope['number' + index]).toFixed(3);
        if (index >= 4 && index <= 9) {
          scope.numberfirsthalf = ((scope.number4 || 0) + (scope.number5 || 0) + (scope.number6 || 0) + (scope.number7 || 0) + (scope.number8 || 0) + (scope.number9 || 0)).toFixed(1);
          scope.moneyfirsthalf = ((Number(scope.money4) || 0) + (Number(scope.money5) || 0) + (Number(scope.money6) || 0) + (Number(scope.money7) || 0) + (Number(scope.money8) || 0) + (Number(scope.money9) || 0)).toFixed(3);
        } else if ((index >= 10 && index <= 12) || (index >= 1 && index <= 3)) {
          scope.numbersecondhalf = ((scope.number10 || 0) + (scope.number11 || 0) + (scope.number12 || 0) + (scope.number1 || 0) + (scope.number2 || 0) + (scope.number3 || 0)).toFixed(1);
          scope.moneysecondhalf = ((Number(scope.money10) || 0) + (Number(scope.money11) || 0) + (Number(scope.money12) || 0) + (Number(scope.money1) || 0) + (Number(scope.money2) || 0) + (Number(scope.money3) || 0)).toFixed(3);
        } else {
          for (let par in scope) {
            if (par.substring(0, 5) === 'money') {
              let number = 'number' + (par.length > 6 ? par.slice(par.length - 2) : par.slice(par.length - 1));
              scope[par] = Number((scope.prices * (scope[number] || 0)).toFixed(3));
            }
          }
          scope.numberfirsthalf = ((scope.number4 || 0) + (scope.number5 || 0) + (scope.number6 || 0) + (scope.number7 || 0) + (scope.number8 || 0) + (scope.number9 || 0)).toFixed(1);
          scope.moneyfirsthalf = ((Number(scope.money4) || 0) + (Number(scope.money5) || 0) + (Number(scope.money6) || 0) + (Number(scope.money7) || 0) + (Number(scope.money8) || 0) + (Number(scope.money9) || 0)).toFixed(3);
          scope.numbersecondhalf = ((scope.number10 || 0) + (scope.number11 || 0) + (scope.number12 || 0) + (scope.number1 || 0) + (scope.number2 || 0) + (scope.number3 || 0)).toFixed(1);
          scope.moneysecondhalf = ((Number(scope.money10) || 0) + (Number(scope.money11) || 0) + (Number(scope.money12) || 0) + (Number(scope.money1) || 0) + (Number(scope.money2) || 0) + (Number(scope.money3) || 0)).toFixed(3);
        }
        scope.numberAnnual = ((scope.numberfirsthalf || 0) + (scope.numbersecondhalf || 0)).toFixed(1);
        scope.moneyAnnual = (Number((scope.moneyfirsthalf || 0)) + Number((scope.moneysecondhalf || 0))).toFixed(3);
        this.getSummaries(this.tableBusiness);
      }
    },
    getSummaries(table) {
      let totalExpect = {};
      table.forEach(
        row => {
          let sum = 0;
          for (let i = 1; i <= 12; i++) {
            if (row.assetstype === '0') {
              totalExpect['money' + i] = (row['money' + i] || 0) + (totalExpect['money' + i] || 0);
              totalExpect['number' + i] = (row['number' + i] || 0) + (totalExpect['number' + i] || 0);
            }
          }
          if (row.assetstype === '0') {
            totalExpect.numberfirsthalf = (row.numberfirsthalf || 0) + (totalExpect.numberfirsthalf || 0);
            totalExpect.numbersecondhalf = (row.numbersecondhalf || 0) + (totalExpect.numbersecondhalf || 0);
            totalExpect.numberAnnual = (row.numberAnnual || 0) + (totalExpect.numberAnnual || 0);
            totalExpect.moneyfirsthalf = (row.moneyfirsthalf || 0) + (totalExpect.moneyfirsthalf || 0);
            totalExpect.moneysecondhalf = (row.moneysecondhalf || 0) + (totalExpect.moneysecondhalf || 0);
            totalExpect.moneyAnnual = (row.moneyAnnual || 0) + (totalExpect.moneyAnnual || 0);
          }
        },
      );
      totalExpect.moneyfirsthalf = (totalExpect.moneyfirsthalf || 0).toFixed(3);
      totalExpect.moneysecondhalf = (totalExpect.moneysecondhalf || 0).toFixed(3);
      totalExpect.moneyAnnual = ((parseFloat(totalExpect.moneyfirsthalf) + parseFloat(totalExpect.moneysecondhalf))).toFixed(3);
      for (let k = 1; k <= 12; k++) {
        totalExpect['money' + k] = totalExpect['money' + k].toFixed(3) || 0;
        totalExpect['number' + k] = totalExpect['number' + k].toFixed(1) || 0;
      }
      this.tableNewYearTotal = [totalExpect];
      this.$emit('travel', this.tableNewYearTotal);
    },
    deleteRowF2(index, rows) {
      if (rows.length > 2) {
        rows.splice(index, 2);
      }
    },
    addRowF2(val) {
      if (val === 0) {
        this.tableNewYear.push({assetstype: '0'});
      } else {
        this.tableLastYear.push({assetstype: '0'});
      }
    },
  },
  watch: {
    tableBusiness: {
      handler(newValue, oldValue) {
        // 事业计划交通费取自字典 ztc fr
        if (newValue.length > 0) {
          newValue[0].prices = getDictionaryInfo('PJ149001').value4;
          newValue[1].prices = getDictionaryInfo('PJ149002').value4;
          newValue[2].prices = getDictionaryInfo('PJ149003').value4;
          newValue[3].prices = getDictionaryInfo('PJ149004').value4;
        }
        // 事业计划交通费取自字典 ztc to
        this.tableNewYear = newValue;
        this.getSummaries(newValue);
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss" rel="stylesheet/scss">
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

.el-table__body .el-table__row.hover-row td {
  background-color: #fafafa;
}

</style>
