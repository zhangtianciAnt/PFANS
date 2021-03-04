<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :title="title"
                         @buttonClick="buttonClick" ref="container" v-loading="loading">
      <div slot="customize">
        <el-form label-position="top" label-width="8vw" style="padding-top: 25px">
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2007VIEW_YEAR')">
                <el-date-picker
                  :disabled="true"
                  type="year"
                  v-model="year">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS5009FORMVIEW_MONTH')">
                <el-date-picker
                  :disabled="true"
                  type="month"
                  v-model="month">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-table :data="table" border
                      header-cell-class-name="sub_bg_color_blue"
                      stripe style="width: 100%">
              <el-table-column :label="$t('label.PFANS8011VIEW_CURRENCY')" align="center" width="200">
                <template slot-scope="scope">
                  <dicselect
                    :disabled="!disable"
                    :code="code1"
                    :data="scope.row.currency"
                    :no="scope.row"
                    :multiple="multiple"
                    @change="getcurrency"
                    style="width: 100%">
                  </dicselect>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS8011VIEW_BUSINESSPLANEXCHANGERATE')" align="center" width="150">
                <template slot-scope="scope">
                  <el-input-number
                    :disabled="isDisable"
                    :min="0" :precision="scope.row.precision"
                    :max="9999999"
                    controls-position="right"
                    :no="scope.row"
                    :step="1"
                    v-model="scope.row.businessplanexchangerate"
                    style="width: 100%">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS8011VIEW_ACCOUNTINGEXCHANGERATE')" align="center" width="150">
                <template slot-scope="scope">
                  <el-input-number
                    :disabled="!disable"
                    :min="0" :precision="scope.row.precision"
                    :max="9999999"
                    controls-position="right"
                    :no="scope.row"
                    :step="1"
                    v-model="scope.row.accountingexchangerate"
                    style="width: 100%">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS8011VIEW_EXCHANGERATE')" align="center" width="150">
                <template slot-scope="scope">
                  <el-input-number
                    :disabled="!disable"
                    :min="0" :precision="scope.row.precision"
                    :max="9999999"
                    controls-position="right"
                    :no="scope.row"
                    :step="1"
                    v-model="scope.row.exchangerate"
                    style="width: 100%">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.remarks')" align="center" width="200">
                <template slot-scope="scope">
                  <el-input :disabled="!disable" style="width: 100%" v-model="scope.row.rmarks">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.operation')" align="center" width="200">
                <template slot-scope="scope">
                  <el-button
                    :disabled="!disable"
                    @click.native.prevent="deleteRow(scope.$index, table)"
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
          </el-row>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import {Message} from 'element-ui';
  import dicselect from '../../../components/dicselect';
  import moment from 'moment';
  import {getDictionaryInfo,} from '../../../../utils/customize';
  export default {
    name: 'PFANS8011View',
    components: {
      dicselect,
      EasyNormalContainer,
    },
    data() {
      return {
        year: '',
        month: '',
        multiple: false,
        loading: false,
        title: 'title.PFANS8011VIEW',
        data: [],
        table: [
          {
            currency: '',
            currencyname: '',
            businessplanexchangerate: '',
            accountingexchangerate: '',
            exchangerate: '',
            rmarks: '',
          },
        ],
        disable: 'true',
        code1: 'PG019',
        buttonList: [
          {
            key: 'save',
            name: 'button.save',
            disabled: false,
            icon: 'el-icon-check',
          },
        ],
        isDisable: false
      };
    },
    created() {
      this.disable = this.$route.params.disabled;
      if (this.$route.params._id) {
        if(this.$route.params.disabled){
          var date = new Date();
          let c_month = date.getMonth();
          let c_year = date.getFullYear();
          if(c_year.toString().trim() === this.$route.params.year.trim() && c_month<=2){
            this.isDisable = false;
          }else {
            this.isDisable = true;
          }
        }else {
          this.isDisable = true;
        }
      }
    },
    methods: {
      getcurrency(val, row) {
        row.currency = val;
        row.currencyname = getDictionaryInfo(val).value1
      },
      addRow() {
        this.table.push({
          currency: '',
          businessplanexchangerate: '',
          accountingexchangerate: '',
          exchangerate: '',
          rmarks: '',
        });
      },
      deleteRow(index, rows, row) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        } else {
          this.table = [{
            currency: '',
            businessplanexchangerate: '',
            accountingexchangerate: '',
            exchangerate: '',
            rmarks: '',
          }];
        }
      },
      buttonClick(val) {
        let error = 0;
        for (let filterdata of this.table) {
         let data = this.table.filter(item => item.currency == filterdata.currency);
          if(data.length>1){
            Message({
              message: this.$t('label.PFANS8011FORMVIEW_MESSAGE'),
              type: 'error',
              duration: 5 * 1000,
            });
            return;
          }
        }
        for (let i = 0; i < this.table.length; i++) {
          if (this.table[i].currency === '') {
            error = error + 1;
            Message({
              message: this.$t('normal.error_08') + this.$t('label.PFANS8011VIEW_CURRENCY'),
              type: 'error',
              duration: 5 * 1000,
            });
            break;
          }
          if (this.table[i].businessplanexchangerate === '') {
            error = error + 1;
            Message({
              message: this.$t('normal.error_08') + this.$t('label.PFANS8011VIEW_BUSINESSPLANEXCHANGERATE'),
              type: 'error',
              duration: 5 * 1000,
            });
            break;
          }
          if (this.table[i].accountingexchangerate === '') {
            error = error + 1;
            Message({
              message: this.$t('normal.error_08') + this.$t('label.PFANS8011VIEW_ACCOUNTINGEXCHANGERATE'),
              type: 'error',
              duration: 5 * 1000,
            });
            break;
          }
          if (this.table[i].exchangerate === '') {
            error = error + 1;
            Message({
              message: this.$t('normal.error_08') + this.$t('label.PFANS8011VIEW_EXCHANGERATE'),
              type: 'error',
              duration: 5 * 1000,
            });
            break;
          }
        }
        this.baseInfo = {};
        this.baseInfo.monthlyrate = [];
        for (let i = 0; i < this.table.length; i++) {
          this.baseInfo.monthlyrate.push(
            {
              indexdata:i,
              currency: this.table[i].currency,
              businessplanexchangerate: this.table[i].businessplanexchangerate,
              accountingexchangerate: this.table[i].accountingexchangerate,
              exchangerate: this.table[i].exchangerate,
              rmarks: this.table[i].rmarks,
              month: this.month,
              year: this.year,
              currencyname:  this.table[i].currencyname,
            },
          );
        }
        if (error === 0) {
          if (this.$route.params._id) {
            this.loading = true;
            this.$store
              .dispatch('PFANS8011Store/update', this.baseInfo.monthlyrate)
              .then(response => {
                this.loading = false;
                Message({
                  message: this.$t('normal.success_01'),
                  type: 'success',
                  duration: 5 * 1000,
                });
                this.$router.push({
                  name: 'PFANS8011View',
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
          } else {
            this.loading = true;
            this.$store
              .dispatch('PFANS8011Store/create', this.baseInfo.monthlyrate)
              .then(response => {
                this.loading = false;
                Message({
                  message: this.$t('normal.success_01'),
                  type: 'success',
                  duration: 5 * 1000,
                });
                this.$router.push({
                  name: 'PFANS8011View',
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
      },
    },
    mounted() {
      if (this.$route.params._id) {
        let parameter = {
          year: this.$route.params.year,
          month: this.$route.params.month,
        };
        this.loading = true;
        this.$store
          .dispatch('PFANS8011Store/slectlist', parameter)
          .then(response => {
            this.table = response;
            response.forEach(function (item) {
              if(item.currency === 'PG019001' || item.currency === 'PG019004'){
                item.precision = 4
              }else if(item.currency === 'PG019002') {
                item.precision = 6
              }else if(item.currency === 'PG019003') {
                item.precision = 0
              }
            });
            this.year = response[0].year;
            this.month = response[0].month;
            this.loading = false;
          }).catch(err => {
          Message({
            message: err,
            type: 'error',
            duration: 5 * 1000,
          });
          this.loading = false;
        });
      } else {
        this.year = moment(new Date()).format('YYYY');
        this.month = moment(new Date()).format('YYYY-MM');
      }
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
