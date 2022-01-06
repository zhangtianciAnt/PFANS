<template>
  <div style="min-height: 100%">
    <EasyNormalContainer ref="container" v-loading="loading" :buttonList="buttonList"
                         :noback="noback" :title="title" @buttonClick="buttonClick" @disabled="setdisabled">
      <div slot="customize">
        <el-form ref="refform" :model="form" label-position="top" label-width="8vw"
                 style="padding: 2vw">
          <el-dialog :visible.sync="daoru" width="50%">
            <div>
              <div style="margin-top: 1rem;margin-left: 28%">
                <el-upload
                  ref="uploader"
                  :action="postAction"
                  :before-upload="handleChange"
                  :headers="authHeader"
                  :limit=1
                  :on-remove="this.clear"
                  :on-success="handleSuccess"
                  drag
                  multiple
                >
                  <i class="el-icon-upload"></i>
                  <div>{{ $t('label.PFANS2005FORMVIEW_MBYQ') }}</div>
                </el-upload>
              </div>
              <el-row>
                <span v-if="this.resultShow">{{ $t('label.PFANS2005FORMVIEW_CG') }}{{ this.successCount }}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                <span v-if="this.resultShow"
                >{{ $t('label.PFANS2005FORMVIEW_SB') }}{{ this.errorCount }}</span>
              </el-row>
              <span v-if="this.Message">{{ this.cuowu }}</span>
              <div v-if="this.result">
                <el-table :data="message">
                  <el-table-column :label="$t('label.PFANS2017VIEW_CUHS')" align="center" prop="hang" width="120%">
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS2017VIEW_ERROR')" align="center" prop="error">
                  </el-table-column>
                </el-table>
                <!--         region add_qhr_20210831   dialoge中导完数据显示分页-->
                <div class="pagination-container" style="padding-top: 2rem">
                  <el-pagination :current-page.sync="listQuery.page" :page-size="listQuery.limit"
                                 :page-sizes="[5,10,20,30,50]" :total="total" layout="slot,sizes, ->,prev, pager, next, jumper"
                                 @current-change="handleCurrentChange" @size-change="handleSizeChange">
                    <slot><span class="front Content_front"
                                style="padding-right: 0.5rem;font-weight: 400">{{ $t('table.pagesize') }}</span></slot>
                  </el-pagination>
                </div>
                <!--            endregion add_qhr_20210831   dialoge中导完数据显示分页-->
              </div>
            </div>
          </el-dialog>
          <el-dialog :visible.sync="pop_download" destroy-on-close width="50%">
            <el-table
              :data="downtypes"
              style="width: 100%">
              <el-table-column
                :label="$t('label.ASSETS1001VIEW_FILENAME')"
                prop="name"
              >
              </el-table-column>

              <el-table-column :label="$t('label.operation')">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleDownload(scope.row)"
                  >{{ $t('button.download2') }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-dialog>
          <el-row style="padding-bottom: 2%">
            <el-col :span="8">
              <el-date-picker
                v-model="years"
                :placeholder="$t('label.PFANSUSERFORMVIEW_SELECTIONDATE')"
                format="yyyy"
                type="year"
                @change="yearChange">
              </el-date-picker>
            </el-col>
          </el-row>
          <el-row>
            <el-table :data="tableD" header-cell-class-name="sub_bg_color_blue" stripe tooltip-effect="dark"
                      @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column :label="$t('label.PFANS2006VIEW_NO')" align="center" prop="content"
                               type="index" width="50"></el-table-column>
              <!--            <el-table-column :label="$t('label.PFANS2007VIEW_YEAR')" align="center" width="150">-->
              <!--                <template slot-scope="scope">-->
              <!--                  <el-input :disabled="!disabled1" maxlength="20" :no="scope.row" v-model="scope.row.years">-->
              <!--                  </el-input>-->
              <!--                </template>-->
              <!--            </el-table-column>-->
              <!--            update_qhr_20210830  修改显示列为姓名-->
              <el-table-column :label="$t('label.user_name')" align="center" prop="username" width="150">
                <!--<template slot-scope="scope">-->
                <!--<el-input :disabled="!disabled1" maxlength="20" :no="scope.row" v-model="scope.row.jobnumber">-->
                <!--</el-input>-->
                <!--</template>-->
              </el-table-column>
              <el-table-column :label="$t('label.PFANS2007VIEW_GOLDLEAF')" align="center" width="200">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.totalbonus1" :disabled="!disabled" :max="9999999" :min="0" :no="scope.row"
                                   :precision="2" controls-position="right">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS2007VIEW_TAXMETHOD')" align="center" width="200">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.method" :disabled="!disabled" :no="scope.row" maxlength="20">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS2007VIEW_COMBINEDTAX')" align="center" width="200">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.taxable" :disabled="!disabled" :max="9999999" :min="0"
                                   :no="scope.row" :precision="2" controls-position="right" maxlength="20">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS2007VIEW_KOZO')" align="center" width="200">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.amount" :disabled="!disabled" :max="9999999" :min="0"
                                   :no="scope.row" :precision="2" controls-position="right" maxlength="20">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS2007VIEW_TAX')" align="center" width="200">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.payable" :disabled="!disabled" :max="9999999" :min="0"
                                   :no="scope.row" :precision="2" controls-position="right" maxlength="20">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS2007VIEW_THEFIRST')" align="center" width="270">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.income" :disabled="!disabled" :max="9999999" :min="0"
                                   :no="scope.row" :precision="2" controls-position="right" maxlength="20">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS2007VIEW_CASH')" align="center" width="200">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.taxrate" :disabled="!disabled" :max="1" :min="0"
                                   :no="scope.row" :precision="2" controls-position="right" maxlength="20">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS2007VIEW_ARITHMETIC')" align="center" width="200">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.deductions" :disabled="!disabled" :max="9999999" :min="0"
                                   :no="scope.row" :precision="2" controls-position="right" maxlength="20">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS2007VIEW_GOLD')" align="center" width="200">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.bonustax" :disabled="!disabled" :max="9999999" :min="0"
                                   :no="scope.row" :precision="2" controls-position="right" maxlength="20">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS2007VIEW_IEMIKANE')" align="center" width="200">
                <template slot-scope="scope">
                  <el-input-number v-model="scope.row.received" :disabled="!disabled" :max="9999999" :min="0"
                                   :no="scope.row" :precision="2" controls-position="right" maxlength="20">
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.remarks')" align="center" width="200">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.remarks" :disabled="!disabled" :no="scope.row" maxlength="20"
                            type="textarea">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS2007VIEW_SEND')" align="center" prop="sent" width="140">
                <!--<template slot-scope="scope">-->
                <!--<el-input :disabled="!disabled1" maxlength="20" :no="scope.row" v-model="scope.row.send">-->
                <!--</el-input>-->
                <!--</template>-->
              </el-table-column>
            </el-table>
          </el-row>
          <div class="pagination-container" style="padding-top: 2rem">
            <!--            region update_qhr_20210831  修改tableD的分页的参数-->
            <el-pagination :current-page.sync="listQueryD.page" :page-size="listQueryD.limit"
                           :page-sizes="[5,10,20,30,50]" :total="totalD" layout="slot,sizes, ->,prev, pager, next, jumper"
                           @current-change="handleCurrentChangeD" @size-change="handleSizeChangeD">
              <!--              endregion update_qhr_20210831  修改tableD的分页的参数-->
              <slot><span class="front Content_front"
                          style="padding-right: 0.5rem;font-weight: 400"></span></slot>
            </el-pagination>
          </div>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
import {getToken} from '@/utils/auth';
import EasyNormalContainer from '@/components/EasyNormalContainer';
import user from '../../../components/user.vue';
import dicselect from '../../../components/dicselect.vue';
import {Message} from 'element-ui';
import moment from 'moment';
import {Decrypt, getCurrentRole6} from '@/utils/customize';

export default {
  name: 'PFANS2007FormView',
  components: {
    EasyNormalContainer,
    user,
    dicselect,
  },
  data() {
    return {
      roles: '',
      // update gbb 20210311 NT_PFANS_20210305_BUG_130 点击送信时判断是否选择了数据 start
      multipleSelection: [],
      // update gbb 20210311 NT_PFANS_20210305_BUG_130 点击送信时判断是否选择了数据 end
      totaldata: [],
      listQuery: {
        page: 1,
        limit: 5,
      },
      //add_qhr_20210831 tableD中分页的属性
      listQueryD: {
        page: 1,
        limit: 5,
      },
      total: 0,
      totalD: 0,
      baseInfo: {},
      pop_download: false,
      years: moment(new Date()).format('YYYY'),
      daoru: false,
      loading: false,
      selectType: 'Single',
      title: 'title.PFANS2007VIEW',
      tabIndex: 0,
      multiple: false,
      form: {
        years: '',
      },
      disabled: true,
      disabled1: false,
      menuList: [],
      rules: {},
      qualifications: '',
      addActionUrl: '',
      resultShow: false,
      Message: false,
      result: false,
      file: null,
      successCount: 0,
      errorCount: 0,
      user_id: '',
      authHeader: {'x-auth-token': getToken()},
      postAction: process.env.BASE_API + '/bonussend/importUser',
      cuowu: '',
      noback: true,
      data: [],
      tableD: [],
      tableDCopy: [],
      buttonList: [
        {
          key: 'import',
          name: 'button.import',
          disabled: false,
          icon: 'el-icon-upload2',
        },
        {
          key: 'deliver',
          name: 'button.deliver',
          disabled: false,
          icon: 'el-icon-edit',
        },
        {
          key: 'save',
          name: 'button.save',
          disabled: false,
          icon: 'el-icon-check',
        },
        {
          key: 'export2',
          name: 'button.download2',
          disabled: false,
          icon: 'el-icon-download',
        },
      ],
      rowid: '',
      row: 'bonussend_id',
    };
  },
  mounted() {
    this.roles = getCurrentRole6();
    // this.getList();
    //只有张建波、冷美琴、康奕凝
    // if(this.$store.getters.userinfo.userid === "5e78fefff1560b363cdd6db7"
    //   || this.$store.getters.userinfo.userid === "5e78b22c4e3b194874180f5f"
    //   || this.$store.getters.userinfo.userid === "5e78b2034e3b194874180e37")
    if (this.roles === '0') {
      this.getList(this.years);
    }
  },
  computed: {
    downtypes() {
      return [
        {name: this.$t('menu.PFANS2007'), type: 0},
      ];
    },
  },
  methods: {
    // region add_qhr_20210831  添加tableD的分页方法
    cutList() {
      let start = (this.listQueryD.page - 1) * this.listQueryD.limit;
      let end = this.listQueryD.page * this.listQueryD.limit;
      let pList = this.tableDCopy.slice(start, end);
      this.tableD = pList;
      this.totalD = this.tableDCopy.length;
    },
    // endregion add_qhr_20210831  添加tableD的分页方法
    handleDownload(row) {
      this.loading = true;
      this.$store
        .dispatch('PFANS2007Store/download', {'type': row.type})
        .then(response => {
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
    setdisabled(val) {
      if (this.$route.params.disabled) {
        this.disabled = val;
      }
    },
    yearChange(value) {
      this.years = moment(value).format('YYYY');
      this.getList(this.years);
    },
    rowClick(row) {
      this.rowid = row.bonussend_id;
      this.user_id = row.user_id;
    },
    getList(year) {
      this.loading = true;
      this.$store
        .dispatch('PFANS2007Store/getList', {years: year})
        .then(response => {
          this.tableD = response;
          for (let item of response) {
            if (item.sent === '1') {
              if (this.$i18n) {
                item.sent = this.$t('normal.error_sent');
              }
            } else {
              if (this.$i18n) {
                item.sent = this.$t('normal.error_nosent');
              }
            }
          }
          //region add_qhr_20210831  添加tableD的分页方法
          this.tableDCopy = response;
          this.cutList();
          // endregion add_qhr_20210831  添加tableD的分页方法
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
    handleChange(file, fileList) {
      this.clear(true);
    },
    //region add_qhr_20210831  添加tableD的分页方法
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList1();
    },
    handleSizeChangeD(val) {
      this.listQueryD.limit = val;
      this.cutList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList1();
    },
    handleCurrentChangeD(val) {
      this.listQueryD.page = val;
      this.cutList();
    },
    // endregion add_qhr_20210831  添加tableD的分页方法
    getList1() {
      this.loading = true;
      let start = (this.listQuery.page - 1) * this.listQuery.limit;
      let end = this.listQuery.page * this.listQuery.limit;
      if (this.totaldata) {
        let pList = this.totaldata.slice(start, end);
        this.message = pList;
        this.total = this.totaldata.length;
      }
      this.loading = false;
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
          if (this.$i18n) {
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
          }
          this.message = datalist;
          this.totaldata = this.message;
          if (this.errorCount === '0') {
            this.result = false;
          } else {
            this.result = true;
          }
          this.getList1();
        }
        //update_qhr_20210831 修改方法调用位置
        this.getList(this.years); //add_qhr_20210830 添加方法调用参数
      }
    },
    clear(safe) {
      this.file = null;
      this.resultShow = false;
      this.Message = false;
      this.result = false;
      if (!safe) {
        if (this.$refs.uploader != undefined) {
          this.$refs.uploader.clearFiles();
        }
      }
    },
    // handleSave(value){
    //   let baseInfo = {};
    //   baseInfo.bonussend = [];
    //   for(let i = 0;i < this.tableD.length; i++){
    //     let o = {};
    //     Object.assign(o, this.tableD[i]);
    //     baseInfo.bonussend.push(o)
    //   }
    // },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    update() {
      this.loading = true;
      this.baseInfo = {};
      this.bonussend = [];
      for (let i = 0; i < this.tableD.length; i++) {
        //update_qhr_20210830 添加检查项
        if (this.tableD[i].years !== '' || this.tableD[i].jobnumber !== '' || this.tableD[i].user_id !== '' || this.tableD[i].username !== '' || this.tableD[i].totalbonus1 !== '' ||
          this.tableD[i].method !== '' || this.tableD[i].taxable !== '' || this.tableD[i].amount !== '' || this.tableD[i].payable !== ''
          || this.tableD[i].income !== '' || this.tableD[i].taxrate !== '' || this.tableD[i].deductions !== '' || this.tableD[i].bonustax !== ''
          || this.tableD[i].received !== '' || this.tableD[i].remarks !== ''
        ) {
          this.bonussend.push(
            {
              bonussend_id: this.tableD[i].bonussend_id,
              years: this.tableD[i].years,
              jobnumber: this.tableD[i].jobnumber,
              //region add_qhr_20210830 添加更新项
              user_id: this.tableD[i].user_id,
              username: this.tableD[i].username,
              //endregion add_qhr_20210830 添加更新项
              totalbonus1: this.tableD[i].totalbonus1,
              method: this.tableD[i].method,
              taxable: this.tableD[i].taxable,
              amount: this.tableD[i].amount,
              payable: this.tableD[i].payable,
              income: this.tableD[i].income,
              taxrate: this.tableD[i].taxrate,
              deductions: this.tableD[i].deductions,
              bonustax: this.tableD[i].bonustax,
              received: this.tableD[i].received,
              remarks: this.tableD[i].remarks,
            },
          );
        }
      }
      this.$store
        .dispatch('PFANS2007Store/update', this.bonussend)
        .then(response => {
          this.data = response;
          this.getList(this.years);
          Message({
            message: this.$t('normal.success_02'),
            type: 'success',
            duration: 5 * 1000,
          });
          this.$router.push({
            name: 'PFANS2007FormView',
          });
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
    buttonClick(val) {
      if (val === 'save') {
        this.update();
      }
      if (val === 'export2') {
        this.pop_download = true;
      }
      if (val === 'deliver') {
        // update gbb 20210311 NT_PFANS_20210305_BUG_130 点击送信时判断是否选择了数据 start
        if (this.multipleSelection.length === 0) {
          Message({
            message: this.$t('normal.info_01'),
            type: 'info',
            duration: 2 * 1000,
          });
          return;
        }
        this.loading = true;
        let bonussend = this.multipleSelection;
        this.$store
          .dispatch('PFANS2007Store/inserttodo', bonussend)
          .then(response => {
            this.getList(this.years);
            Message({
              message: this.$t('normal.success_03'),
              type: 'success',
              duration: 5 * 1000,
            });
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
        // for(let i of this.multipleSelection){
        //   let toDoNotice = {};
        //   toDoNotice.type = '2';
        //   if(this.i18n){
        //     toDoNotice.title = this.$t('normal.error_bonus');
        //   }
        //   toDoNotice.dataid = i.bonussend_id;
        //   toDoNotice.url = this.$route.path;
        //   toDoNotice.initiator = this.$store.getters.userinfo.userid;
        //   toDoNotice.owner = this.user_id;
        //   this.$store
        //     .dispatch('PFANS2007Store/inserttodo', bonussend)
        //     .then(response => {
        //       this.getList(this.years);
        //       Message({
        //         message: this.$t("normal.success_03"),
        //         type: 'success',
        //         duration: 5 * 1000
        //       });
        //       this.loading = false;
        //     })
        //     .catch(error => {
        //       this.$message.error({
        //         message: error,
        //         type: 'error',
        //         duration: 5 * 1000,
        //       });
        //       this.loading = false;
        //     })
        // }
        // update gbb 20210311 NT_PFANS_20210305_BUG_130 点击送信时判断是否选择了数据 end

      }
      if (val === 'import') {
        this.daoru = true;
        this.clear(false);
      }
      //     }
      // })
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
