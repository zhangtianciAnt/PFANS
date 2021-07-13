<template>
  <div style="min-height: 100%">
    <EasyNormalTable :buttonList="buttonList" :columns="columns" :title="title"
                     ref="container" :showSelection="isShow"
                     @buttonClick="buttonClick" v-loading="loading">
      <div slot="customize">
        <el-form label-position="top" label-width="8vw" ref="reff" style="padding: 1.5vw">
          <el-form-item>
            <el-row style="margin-top: 20px">
              <div align="right">
                <el-col :span="12">
                  <el-date-picker
                    :placeholder="$t('normal.error_09')"
                    @change="changeYear"
                    format="yyyy"
                    type="year"
                    slot="customize"
                    v-model="form.year" style="width:8vw ">
                  </el-date-picker>
                </el-col>
                <el-col :span="6">
                  <el-select v-model="form.group_id" style="width: 13vw"
                         @change="changeGroup">
                    <el-option
                      v-for="item in optionsdata"
                      :key="item.value"
                      :label="item.lable"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-col>
              </div>
            </el-row>
            <el-row style="margin-top: 0px">
              <plx-table-grid
                :data="tableData"
                style="width: 100%;margin-bottom: 20px;"
                row-key="1"
                border
                default-expand-all
                :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
                <plx-table-column
                  prop="theme"
                  :label="$t('label.PFANS6011VIEW_THEME')"
                  sortable
                  width="180">
                </plx-table-column>
                <plx-table-column
                  prop="entrusttype"
                  :label="$t('label.PFANS6011VIEW_ENTRUSTTYPE')"
                  sortable
                  width="180">
                </plx-table-column>
                <plx-table-column
                  prop="entrust"
                  :label="$t('label.PFANS6011VIEW_ENTRUST')">
                </plx-table-column>
                <plx-table-column
                  prop="pj"
                  :label="$t('label.PFANS6011VIEW_PJ')">
                </plx-table-column>
                <plx-table-column
                  prop="sscompany"
                  :label="$t('label.PFANS6011VIEW_SSCOMPANY')">
                </plx-table-column>
                <plx-table-column
                  prop="april"
                  :label="$t('label.PFANS6011VIEW_APRIL')">
                </plx-table-column>
                <plx-table-column
                  prop="may"
                  :label="$t('label.PFANS6011VIEW_MAY')">
                </plx-table-column>
                <plx-table-column
                  prop="june"
                  :label="$t('label.PFANS6011VIEW_JUNE')">
                </plx-table-column>
                <plx-table-column
                  prop="july"
                  :label="$t('label.PFANS6011VIEW_JULY')">
                </plx-table-column>
                <plx-table-column
                  prop="august"
                  :label="$t('label.PFANS6011VIEW_AUGUST')">
                </plx-table-column>
                <plx-table-column
                  prop="september"
                  :label="$t('label.PFANS6011VIEW_SEPTEMBER')">
                </plx-table-column>
                <plx-table-column
                  prop="october"
                  :label="$t('label.PFANS6011VIEW_OCTOBER')">
                </plx-table-column>
                <plx-table-column
                  prop="november"
                  :label="$t('label.PFANS6011VIEW_NOVEMBER')">
                </plx-table-column>
                <plx-table-column
                  prop="december"
                  :label="$t('label.PFANS6011VIEW_DECEMBER')">
                </plx-table-column>
                <plx-table-column
                  prop="january"
                  :label="$t('label.PFANS6011VIEW_JANUARY')">
                </plx-table-column>
                <plx-table-column
                  prop="febtuary"
                  :label="$t('label.PFANS6011VIEW_FEBTUARY')">
                </plx-table-column>
                <plx-table-column
                  prop="march"
                  :label="$t('label.PFANS6011VIEW_MARCH')">
                </plx-table-column>
                <plx-table-column
                  prop="total"
                  :label="$t('label.PFANS6011VIEW_TOTAL')">
                </plx-table-column>
              </plx-table-grid>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
    </EasyNormalTable>
  </div>
</template>

<script>
  import {getToken} from '@/utils/auth';
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {Message} from 'element-ui';
  import {getUserInfo, getDictionaryInfo, Decrypt} from '@/utils/customize';
  import moment from 'moment';
  import {getTableinfo} from './PFANS6011Api';

  export default {
    name: 'PFANS6011View',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        form: {
          year: moment(new Date()).format('YYYY'),
          group_id: '',
        },
        title: 'title.PFANS6011VIEW',
        optionsdata: [],
        buttonList: [
          // {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          // {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
          // {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
          // {'key': 'delete', 'name': 'button.delete', 'disabled': false, 'icon': 'el-icon-delete'},
          // {'key': 'import', 'name': 'button.import', 'disabled': false, icon: 'el-icon-download'},
          {'key': 'export', 'name': 'button.export', 'disabled': false, icon: 'el-icon-upload2'},
        ],
        rowid: '',
        row: '',
        isShow: false,
        tableData: [{
          children: [{
            id: 1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            id: 2,
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            id: 3,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄',
          },]
        }],
      };
    },
    mounted() {
      this.getTableinfo();
    },
    methods: {
      changeGroup(val) {
        this.form.group_id = val;
        this.getTableinfo();
      },
      getTableinfo() {
        this.loading = true;
        this.$store.dispatch('PFANS6011Store/getTableinfo', this.form)
          .then(response => {
          for (let j = 0; j < response.length; j++) {

          }
          this.data = response;
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
      handleChange(file, fileList) {
        this.clear(true);
      },
      handleSuccess(response, file, fileList) {
        if (response.code !== 0) {
          this.cuowu = response.message;
          this.Message = true;
        } else {
          response.data = JSON.parse(Decrypt(response.data));
          let datalist = [];
          for (let c = 0; c < response.data.length; c++) {
            let error = response.data[c];
            error = error.substring(0, 3);
            if (error === this.$t('label.PFANS2005FORMVIEW_SB')) {
              this.errorCount = response.data[c].substring(4);
              this.resultShow = true;
            }
            if (error === this.$t('label.PFANS2005FORMVIEW_CG')) {
              this.successCount = response.data[c].substring(4);
              this.resultShow = true;
            }
            if (error === this.$t('label.PFANS2017VIEW_D')) {
              let obj = {};
              var str = response.data[c];
              var aPos = str.indexOf(this.$t('label.PFANS2017VIEW_BAN'));
              var bPos = str.indexOf(this.$t('label.PFANS2017VIEW_DE'));
              var r = str.substr(aPos + 1, bPos - aPos - 1);
              obj.hang = r;
              obj.error = response.data[c].substring(6);
              datalist[c] = obj;
            }
            this.message = datalist;
            this.totaldata = this.message;
            if (this.errorCount === '0') {
              this.result = false;
            } else {
              this.result = true;
            }
            this.getList();
            this.getcommodity();
          }
        }
      },
      clear(safe) {
        this.file = null;
        this.resultShow = false;
        this.Message = false;
        this.result = false;
        if (!safe) {
          this.$refs.uploader.clearFiles();
        }
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        }));
      },
      buttonClick(val) {
        if (val === 'import') {
          this.daoru = true;
          this.clear(false);
        } else if (val === 'export') {
          if (this.$refs.roletable.selectedList.length === 0) {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.selectedlist = this.$refs.roletable.selectedList;
          import('@/vendor/Export2Excel').then(excel => {
            const tHeader = [
              this.$t('label.PFANS6011VIEW_CUSTCHINESE'),
              this.$t('label.PFANS6011VIEW_CUSTENGLISH'),
              this.$t('label.PFANS6011VIEW_ADDRESS'),
              this.$t('label.PFANS6011VIEW_SUPPLIER'),
              this.$t('label.PFANS6011VIEW_PURCHASETIME'),
              this.$t('label.PFANS6011VIEW_RELEASE1'),
              this.$t('label.PFANS6011VIEW_SALE'),
              this.$t('label.PFANS6011VIEW_REMARKS'),
              // this.$t('label.PFANS2003FORMVIEW_CONTACTINFORMATION'),
              // this.$t('label.PFANSUSERFORMVIEW_EMAILADDRESS'),
              // this.$t('label.PFANS6002VIEW_COMMONTPERSON'),
              // this.$t('label.PFANS2003FORMVIEW_CONTACTINFORMATION'),
              // this.$t('label.PFANSUSERFORMVIEW_EMAILADDRESS'),
              // this.$t('label.PFANS6002VIEW_ADDRESSC'),
              // this.$t('label.PFANS6002VIEW_ADDRESSJ'),
              // this.$t('label.PFANS6002VIEW_ADDRESSE'),
              // this.$t('label.PFANS6002VIEW_PERSCALE'),
              // this.$t('label.PFANS6003FORMVIEW_THECOMPANY'),
              // this.$t('label.PFANS1024VIEW_BUSINESSCODE'),
              // this.$t('label.PFANS6002FORMVIEW_WEBSITE'),
              // this.$t('label.remarks'),
            ];
            const filterVal = [
              'custchinese',
              'custenglish',
              'address',
              'supplier',
              'purchasetime',
              'release1',
              'sale',
              'remarks',
              // 'protelephone',
              // 'protemail',
              // 'commontperson',
              // 'comtelephone',
              // 'comnemail',
              // 'addchinese',
              // 'addjapanese',
              // 'addenglish',
              // 'perscale',
              // 'thecompany',
              // 'causecode',
              // 'website',
              // 'remarks'

            ];
            const list = this.selectedlist;
            const data = this.formatJson(filterVal, list);
            excel.export_json_to_excel(tHeader, data, this.$t('menu.PFANS6011'));
          });
        }
        this.$store.commit('global/SET_HISTORYURL', this.$route.path);
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
            name: 'PFANS6011FormView',
            params: {
              _id: this.rowid,
              disabled: true,
            },
          });
        }
        if (val === 'view') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.$router.push({
            name: 'PFANS6011FormView',
            params: {
              _id: this.rowid,
              disabled: false,
            },
          });
        }
        if (val === 'insert') {
          this.$router.push({
            name: 'PFANS6011FormView',
            params: {
              _id: '',
              disabled: true,
            },
          });
        }
        if (val === 'delete') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.delete();
        }
      },
    },
  };
</script>

<style lang="scss">
  .row_height_left {
    font-size: 0.75rem;
    padding: 0px;
    text-align: left;
    background-color: transparent !important;
  }
  .el-table /deep/ .current-row{
    background-color: #BDD8EE;
  }
  /*.current-row .arow--currentaa{*/
  /*  background-color: #E5575E;*/
  /*}*/
  /*.el-table .current-row{*/
  /*  background-color: #E5575E;*/
  /*}*/
  .sub_bg_color_Darkgreyaa{
    background-color: #CCCCCC !important;
  }
</style>
