<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :title="title" @buttonClick="buttonClick"
                          ref="container" v-loading="loading" :noback="noback">
      <div slot="customize">
        <el-form :model="form" label-position="top" label-width="8vw" ref="refform"
                 style="padding: 2vw">
      <el-dialog :visible.sync="daoru" width="50%">
        <div>
          <div style="margin-top: 1rem;margin-left: 28%">
            <el-upload
              drag
              ref="uploader"
              :action="postAction"
              :on-success="handleSuccess"
              :before-upload="handleChange"
              :headers="authHeader"
              :limit=1
              :on-remove="this.clear"
              multiple
            >
              <i class="el-icon-upload"></i>
              <div>{{$t('label.PFANS2005FORMVIEW_MBYQ')}}</div>
            </el-upload>
          </div>
          <el-row>
            <span v-if="this.resultShow">{{$t('label.PFANS2005FORMVIEW_CG')}}{{this.successCount}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span v-if="this.resultShow"
            >{{$t('label.PFANS2005FORMVIEW_SB')}}{{this.errorCount}}</span>
          </el-row>
          <span v-if="this.Message">{{this.cuowu}}</span>
          <div v-if="this.result">
            <el-table :data="message">
              <el-table-column :label="$t('label.PFANS2017VIEW_CUHS')" align="center" width="120%" prop="hang">
              </el-table-column>
              <el-table-column :label="$t('label.PFANS2017VIEW_ERROR')" align="center" prop="error">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-dialog>
          <el-row style="padding-top: 2%;padding-bottom: 2%">
            <el-col :span="8">
              <el-date-picker
                v-model="years"
                type="year"
                @change="yearChange"
                format="yyyy"
                :placeholder="$t('label.PFANSUSERFORMVIEW_SELECTIONDATE')">
              </el-date-picker>
            </el-col>
          </el-row>
          <el-row>
          <el-table :data="tableD" stripe header-cell-class-name="sub_bg_color_blue"tooltip-effect="dark" @selection-change="handleSelectionChange">
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
            <el-table-column :label="$t('label.PFANS2020VIEW_JOBNUMBER')" align="center" width="150">
              <template slot-scope="scope">
                <el-input :disabled="!disabled1" maxlength="20" :no="scope.row" v-model="scope.row.jobnumber">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS2007VIEW_GOLDLEAF')" align="center" width="200">
              <template slot-scope="scope">
                <el-input :disabled="!disabled" maxlength="20" :no="scope.row" v-model="scope.row.totalbonus1">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS2007VIEW_TAXMETHOD')" align="center" width="200">
              <template slot-scope="scope">
                <el-input :disabled="!disabled" maxlength="20" :no="scope.row" v-model="scope.row.method">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS2007VIEW_COMBINEDTAX')" align="center" width="200">
              <template slot-scope="scope">
                <el-input :disabled="!disabled" maxlength="20" :no="scope.row" v-model="scope.row.taxable">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS2007VIEW_KOZO')" align="center" width="200">
              <template slot-scope="scope">
                <el-input :disabled="!disabled" maxlength="20" :no="scope.row" v-model="scope.row.amount">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS2007VIEW_TAX')" align="center" width="200">
              <template slot-scope="scope">
                <el-input :disabled="!disabled" maxlength="20" :no="scope.row" v-model="scope.row.payable">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS2007VIEW_THEFIRST')" align="center" width="270">
              <template slot-scope="scope">
                <el-input :disabled="!disabled" maxlength="20" :no="scope.row" v-model="scope.row.income">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS2007VIEW_CASH')" align="center" width="200">
              <template slot-scope="scope">
                <el-input :disabled="!disabled" maxlength="20" :no="scope.row" v-model="scope.row.taxrate">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS2007VIEW_ARITHMETIC')" align="center" width="200">
              <template slot-scope="scope">
                <el-input :disabled="!disabled" maxlength="20" :no="scope.row" v-model="scope.row.deductions">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS2007VIEW_GOLD')" align="center" width="200">
              <template slot-scope="scope">
                <el-input :disabled="!disabled" maxlength="20" :no="scope.row" v-model="scope.row.bonustax">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS2007VIEW_IEMIKANE')" align="center" width="200">
              <template slot-scope="scope">
                <el-input :disabled="!disabled" maxlength="20" :no="scope.row" v-model="scope.row.received">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.remarks')" align="center" width="200">
              <template slot-scope="scope">
                <el-input :disabled="!disabled" maxlength="20" :no="scope.row" v-model="scope.row.remarks">
                </el-input>
              </template>
            </el-table-column>
            <el-table-column :label="$t('label.PFANS2007VIEW_SEND')" align="center" width="140">
              <template slot-scope="scope">
                <el-input :disabled="!disabled1" maxlength="20" :no="scope.row" v-model="scope.row.send">
                </el-input>
              </template>
            </el-table-column>
          </el-table>
          </el-row>
          <div class="pagination-container" style="padding-top: 2rem">
            <el-pagination :current-page.sync="listQuery.page" :page-size="listQuery.limit"
                           :page-sizes="[5,10,20,30,50]" :total="total" @current-change="handleCurrentChange"
                           @size-change="handleSizeChange" layout="slot,sizes, ->,prev, pager, next, jumper">
              <slot><span class="front Content_front"
                          style="padding-right: 0.5rem;font-weight: 400">{{$t('table.pagesize')}}</span></slot>
            </el-pagination>
          </div>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
    import {getToken} from '@/utils/auth'
    import EasyNormalContainer from "@/components/EasyNormalContainer";
    import user from "../../../components/user.vue";
    import dicselect from "../../../components/dicselect.vue";
    import {Message} from 'element-ui'
    import moment from "moment";

    export default {
        name: 'PFANS2007FormView',
        components: {
            EasyNormalContainer,
            user,
            dicselect
        },
        data() {
            return {
                totaldata: [],
                listQuery: {
                  page: 1,
                  limit: 5
                },
                total: 0,
                baseInfo: {},
                years: moment(new Date()).format("YYYY"),
                daoru: false,
                loading: false,
                selectType: "Single",
                title: "title.PFANS2007VIEW",
                tabIndex: 0,
                multiple: false,
                form: {},
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
                tableD:[
                  {
                  bonussend_id: '',
                  years: moment(new Date()).format('YYYY'),
                  jobnumber:'',
                  user_id:'',
                  username:'',
                  totalbonus1:'',
                  method:'',
                  taxable:'',
                  amount:'',
                  payable:'',
                  income:'',
                  taxrate:'',
                  deductions:'',
                  bonustax:'',
                  received:'',
                  remarks:'',
                  sent:'1',
                },
                ],
                buttonList: [
                  {
                    key: 'import',
                    name: 'button.import',
                    disabled: false,
                    icon: 'el-icon-upload2'
                  },
                  {
                    key: 'deliver',
                    name: 'button.deliver',
                    disabled: false,
                    icon: 'el-icon-edit'
                  },
                  {
                    key: 'save',
                    name: 'button.save',
                    disabled: false,
                    icon: "el-icon-check"
                  },
                ],
              rowid: '',
              row : 'bonussend_id'
            };
        },
        mounted() {
          // this.getList();
          this.getList(this.years);
        },
        methods: {
          yearChange(value){
            this.years = moment(value).format('YYYY');
            this.getList(value);
          },
          rowClick(row) {
            this.rowid = row.bonussend_id;
            this.user_id = row.user_id;
          },
          getList(year) {
            let datainfo = {};
            if(year != ''){
              datainfo = {'years': year};
            }
            this.loading = true;
            this.$store
              .dispatch('PFANS2007Store/getList', datainfo)
              .then(response => {
                if (response.length > 0) {
                  if(year != ''){
                    this.tableD = response;
                  }
                }
                // this.tableD = response;
                this.loading = false;
              })
              .catch(error => {
                Message({
                  message: error,
                  type: 'error',
                  duration: 5 * 1000
                });
                this.loading = false;
              })
          },
          handleChange(file, fileList) {
            this.clear(true);
          },
          handleSizeChange(val) {
            this.listQuery.limit = val;
            this.getList1()
          },
          handleCurrentChange(val) {
            this.listQuery.page = val;
            this.getList1()
          },
          getList1() {
            this.loading = true;
            let start = (this.listQuery.page - 1) * this.listQuery.limit;
            let end = this.listQuery.page * this.listQuery.limit;
            if (this.totaldata) {
              let pList = this.totaldata.slice(start, end);
              this.message = pList;
              this.total = this.totaldata.length
            }
            this.loading = false
          },
          handleSuccess(response, file, fileList) {
            if (response.code !== 0) {
              this.cuowu = response.message;
              this.Message = true;
            } else {
              let datalist = [];
              for (let c = 0; c < response.data.length; c++) {
                let error = response.data[c];
                error = error.substring(0, 3);
                if (this.$i18n) {
                  if (error === this.$t("label.PFANS2005FORMVIEW_SB")) {
                    this.errorCount = response.data[c].substring(4);
                    this.resultShow = true;
                  }
                  if (error === this.$t("label.PFANS2005FORMVIEW_CG")) {
                    this.successCount = response.data[c].substring(4);
                    this.resultShow = true;
                  }
                  if (error === this.$t("label.PFANS2017VIEW_D")) {
                    let obj = {};
                    var str = response.data[c];
                    var aPos = str.indexOf(this.$t("label.PFANS2017VIEW_BAN"));
                    var bPos = str.indexOf(this.$t("label.PFANS2017VIEW_DE"));
                    var r = str.substr(aPos + 1, bPos - aPos - 1);
                    obj.hang = r;
                    obj.error = response.data[c].substring(6);
                    datalist[c] = obj;
                  }
                }
                this.message = datalist;
                this.totaldata = this.message;
                if (this.errorCount === "0") {
                  this.result = false;
                } else {
                  this.result = true;
                }
                this.getList1();
                this.getList();
              }
            }
          },
          clear(safe) {
            this.file = null;
            this.resultShow = false;
            this.Message = false;
            this.result = false;
            if (!safe) {
              if(this.$refs.uploader != undefined){
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
          update(){
            this.loading = true;
            this.baseInfo = {};
            this.bonussend = [];
            for (let i = 0; i < this.tableD.length; i++) {
              if (this.tableD[i].years !== '' || this.tableD[i].jobnumber !== '' || this.tableD[i].totalbonus1 !== '' ||
                this.tableD[i].method !== '' || this.tableD[i].taxable !== '' || this.tableD[i].amount !== '' || this.tableD[i].payable !== ''
                || this.tableD[i].income !== '' || this.tableD[i].taxrate !== '' || this.tableD[i].deductions !== '' || this.tableD[i].bonustax !== ''
                || this.tableD[i].received !== '' || this.tableD[i].remarks !== ''
              ) {
                this.bonussend.push(
                  {
                    bonussend_id: this.tableD[i].bonussend_id,
                    years: this.tableD[i].years,
                    jobnumber: this.tableD[i].jobnumber,
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
                    message: this.$t("normal.success_02"),
                    type: 'success',
                    duration: 5 * 1000
                  });
                this.$router.push({
                  name: 'PFANS2007FormView',
                });
                this.loading = false;
              })
              .catch(error => {
                Message({
                  message: error,
                  type: 'error',
                  duration: 5 * 1000
                });
                this.loading = false;
              })
          },
            buttonClick(val) {
                      if (val === 'save') {
                           this.update();
                        }
                      if (val === 'deliver') {
                        let toDoNotice = {};
                        toDoNotice.type = '2';
                        if(this.i18n){
                          toDoNotice.title =  this.$t('normal.error_bonus');
                        }
                        toDoNotice.dataid = this.rowid;
                        toDoNotice.url = this.$route.path;
                        toDoNotice.initiator = this.$store.getters.userinfo.userid;
                        toDoNotice.owner = this.user_id;
                        this.$store
                          .dispatch('PFANS2007Store/inserttodo', toDoNotice)
                          .then(response => {
                            this.loading = false;
                          })
                          .catch(error => {
                            Message({
                              message: error,
                              type: 'error',
                              duration: 5 * 1000,
                            });
                            this.loading = false;
                          })
                      }
                      if (val === 'import') {
                        this.daoru = true;
                        this.clear(false);
                      }
                //     }
                // })
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
