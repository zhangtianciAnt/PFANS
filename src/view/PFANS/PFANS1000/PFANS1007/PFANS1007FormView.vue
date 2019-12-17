<template>
  <div style="min-height: 100%">
    <EasyNormalContainer ref="container" :title="title" @buttonClick="buttonClick" v-loading="loading"
                         :buttonList="buttonList"
                         @workflowState="workflowState" :canStart="canStart" @start="start" @end="end">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="left" label-width="8rem" ref="refform"
                 style="padding: 2rem">
          <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('label.PFANS1007FORMVIEW_FIXEDASSETINFORMATION')" name="first">
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.center')">
                    <el-input v-model="form.center_id" :disabled="true" style="width: 11rem" maxlength='36'></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.group')">
                    <el-input v-model="form.group_id" :disabled="true" style="width: 11rem" maxlength='36'></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.team')" prop="team_id">
                    <el-input v-model="form.team_id" :disabled="true" style="width: 11rem" maxlength='36'></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :error="error" :label="$t('label.applicant')" prop="user_id">
                    <user :disabled="!disabled" :error="error" :selectType="selectType" :userlist="userlist"
                          @getUserids="getUserids" style="width: 10.2rem"></user>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1007FORMVIEW_FILENAME')" prop="filename">
                    <el-input :disabled="!disabled" type="textarea" style="width: 57rem"
                              v-model="form.filename"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1007FORMVIEW_SUMMARY')" prop="summary">
                    <el-input :disabled="!disabled" type="textarea" style="width: 57rem"
                              v-model="form.summary"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <div class="sub_color_blue">{{$t('label.PFANS1007FORMVIEW_SPECIFICCONTENTS')}}</div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1007FORMVIEW_PROCESSINGMETHOD')" prop="processingmethod">
                    <dicselect
                      :code="code1"
                      :data="form.processingmethod"
                      :multiple="multiple"
                      @change="getProcessingmethod"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1007FORMVIEW_SALECONTRACT')" prop="salecontract" v-show="show1">
                    <dicselect
                      :code="code2"
                      :data="form.salecontract"
                      :multiple="multiple"
                      @change="getSalecontract"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1007FORMVIEW_CONTRACTNO')" prop="contractno" v-show="show1">
                    <el-input :disabled="!disabled" style="width: 11rem" v-model="form.contractno"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.numbers')" prop="numbers">
                    <el-input-number v-model="form.numbers" controls-position="right" style="width: 11rem"
                                     :disabled="!disabled" :min="0" :max="1000000000"></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1007FORMVIEW_TOTALVALUE')" prop="totalvalue">
                    <el-input-number v-model="form.totalvalue" controls-position="right" style="width: 11rem"
                                     :disabled="!disabled" :min="0" :max="1000000000" :precision="2"></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1007FORMVIEW_TOTALNETWORTH')" prop="totalnetworth">
                    <el-input-number v-model="form.totalnetworth" controls-position="right" style="width: 11rem"
                                     :disabled="!disabled" :min="0" :max="1000000000" :precision="2"></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1007FORMVIEW_SALEQUOTATION')" prop="salequotation">
                    <dicselect
                      :code="code3"
                      :data="form.salequotation"
                      :multiple="multiple"
                      @change="getSalequotation"
                      style="width: 11rem"
                      :disabled="!disabled">
                    </dicselect>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1007FORMVIEW_REASONSFORQUOTATION')" label-width="6rem"
                                v-show="show">
                    <el-input v-model="form.reasonsforquotation" :disabled="!disabled"
                              style="width: 57rem;padding-left:2rem" type="textarea"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.enclosure')">
                    <el-upload
                      :action="upload"
                      :file-list="fileList"
                      :on-remove="fileRemove"
                      :on-preview="fileDownload"
                      :on-success="fileSuccess"
                      :on-error="fileError"
                      class="upload-demo"
                      drag
                      ref="upload">
                      <i class="el-icon-upload"></i>
                      <div class="el-upload__text">{{$t('label.enclosurecontent')}}<em>{{$t('normal.info_09')}}</em>
                      </div>
                    </el-upload>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1007FORMVIEW_SCRAPASSETDETAILS')" name="second">
              <el-row>
                <el-table :data="table1" header-cell-class-name="sub_bg_color_grey height">
                  <el-table-column :label="$t('label.PFANS2006VIEW_NO')" align="center" fixed type="index">
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1007FORMVIEW_FIXEDASSETNAME')" align="center"
                                   prop="fixedassetnam" width="200">
                    <template slot-scope="scope">
                      <el-input :no="scope.row" maxlength="20" :disabled="!disabled" v-model="scope.row.fixedassetnam">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1007FORMVIEW_MEGASNUMBER')" align="center" prop="megasnumber"
                                   width="200">
                    <template slot-scope="scope">
                      <el-input :no="scope.row" maxlength="20" :disabled="!disabled" v-model="scope.row.megasnumber">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1007FORMVIEW_FIXEDASSETTAGNUMBER')" align="center"
                                   prop="settagnumber" width="200">
                    <template slot-scope="scope">
                      <el-input :no="scope.row" maxlength="20" :disabled="!disabled" v-model="scope.row.settagnumber">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1007FORMVIEW_PURCHASETIME')" align="center"
                                   prop="purchasedate" width="200">
                    <template slot-scope="scope">
                      <el-date-picker :no="scope.row" style="width: 11rem" :disabled="!disabled" type="date"
                                      v-model="scope.row.purchasedate"></el-date-picker>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1007FORMVIEW_ORIGINALVALUE')" align="center"
                                   prop="originalvalue" width="200">
                    <template slot-scope="scope">
                      <el-input-number @change="change" :no="scope.row" :disabled="!disabled" :min="0" :precision="2"
                                       style="width: 11rem" :max="9999999" controls-position="right"
                                       v-model="scope.row.originalvalue">
                      </el-input-number>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1007FORMVIEW_YEARSOFUSE')" align="center" prop="yearsofuse"
                                   width="200">
                    <template slot-scope="scope">
                      <el-input-number @change="change" :no="scope.row" :disabled="!disabled" :min="0" :precision="2"
                                       style="width: 11rem" :max="9999999" controls-position="right"
                                       v-model="scope.row.yearsofuse">
                      </el-input-number>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1007FORMVIEW_NETWORTH')" align="center" prop="networth"
                                   width="200">
                    <template slot-scope="scope">
                      <el-input-number @change="change" :no="scope.row" :disabled="!disabled" :min="0" :precision="2"
                                       style="width: 11rem" :max="9999999" controls-position="right"
                                       v-model="scope.row.networth">
                      </el-input-number>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1007FORMVIEW_REASONFORSCRAPPING')" align="center"
                                   prop="scrapping" width="200">
                    <template slot-scope="scope">
                      <el-input :no="scope.row" v-model="scope.row.scrapping" :disabled="!disabled">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.remarks')" align="center" prop="remarks" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" :no="scope.row" v-model="scope.row.remarks">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.operation')" align="center" width="200">
                    <template slot-scope="scope">
                      <el-button
                        :disabled="!disabled"
                        @click.native.prevent="deleteRow(scope.$index, table1)"
                        plain
                        size="small"
                        type="danger"
                      >{{$t('button.delete')}}
                      </el-button>
                      <el-button
                        :disabled="!disabled"
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
            </el-tab-pane>
            <el-tab-pane :label="$t('label.PFANS1007FORMVIEW_SALESASSETDETAILS')" name="third">
              <el-row>
                <el-table :data="table2" header-cell-class-name="sub_bg_color_grey height">
                  <el-table-column :label="$t('label.PFANS2006VIEW_NO')" align="center" fixed prop="content"
                                   type="index"></el-table-column>
                  <el-table-column :label="$t('label.PFANS1007FORMVIEW_FIXEDASSETNAME')" align="center"
                                   prop="fixedassetnam" width="200">
                    <template slot-scope="scope">
                      <el-input maxlength="20" :disabled="!disabled" v-model="scope.row.fixedassetnam">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1007FORMVIEW_MEGASNUMBER')" align="center" prop="megasnumber"
                                   width="200">
                    <template slot-scope="scope">
                      <el-input maxlength="20" :disabled="!disabled" v-model="scope.row.megasnumber">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1007FORMVIEW_FIXEDASSETTAGNUMBER')" align="center"
                                   prop="settagnumber" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" maxlength="20" v-model="scope.row.settagnumber">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1007FORMVIEW_PURCHASETIME')" align="center"
                                   prop="purchasedate" width="200">
                    <template slot-scope="scope">
                      <el-date-picker :disabled="!disabled" style="width: 11rem" type="date"
                                      v-model="scope.row.purchasedate"></el-date-picker>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1007FORMVIEW_ORIGINALVALUE')" align="center"
                                   prop="originalvalue" width="200">
                    <template slot-scope="scope">
                      <el-input-number @change="change" :disabled="!disabled" :min="0" :precision="2"
                                       style="width: 11rem" :max="9999999" controls-position="right"
                                       v-model="scope.row.originalvalue">
                      </el-input-number>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1007FORMVIEW_NETWORTH')" align="center" prop="networth"
                                   width="200">
                    <template slot-scope="scope">
                      <el-input-number @change="change" :disabled="!disabled" :min="0" :precision="2"
                                       style="width: 11rem" :max="9999999" controls-position="right"
                                       v-model="scope.row.networth">
                      </el-input-number>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1007FORMVIEW_SELLINGPRICE')" align="center"
                                   prop="sellingprice" width="200">
                    <template slot-scope="scope">
                      <el-input-number @change="change" :disabled="!disabled" :min="0" :precision="2"
                                       style="width: 11rem" :max="9999999" controls-position="right"
                                       v-model="scope.row.sellingprice">
                      </el-input-number>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1007FORMVIEW_LOSS')" align="center" prop="loss" width="200">
                    <template slot-scope="scope">
                      <el-input-number @change="change" :disabled="!disabled" :min="0" :precision="2"
                                       style="width: 11rem" :max="9999999" controls-position="right"
                                       v-model="scope.row.loss">
                      </el-input-number>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1007FORMVIEW_REASONFORSCRAPPING')" align="center"
                                   prop="scrapping" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.scrapping">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.remarks')" align="center" prop="remarks" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="!disabled" v-model="scope.row.remarks">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.operation')" align="center" width="200">
                    <template slot-scope="scope">
                      <el-button
                        :disabled="!disabled"
                        @click.native.prevent="deleteRow1(scope.$index, table2)"
                        plain
                        size="small"
                        type="danger"
                      >{{$t('button.delete')}}
                      </el-button>
                      <el-button
                        :disabled="!disabled"
                        @click="addRow1()"
                        plain
                        size="small"
                        type="primary"
                      >{{$t('button.insert')}}
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import dicselect from '../../../components/dicselect.vue';
  import user from '../../../components/user.vue';
  import {Message} from 'element-ui';
  import {getOrgInfoByUserId, uploadUrl} from '@/utils/customize';
  import moment from 'moment';

  export default {
    name: 'PFANS1007FormView',
    components: {
      EasyNormalContainer,
      dicselect,
      user,
    },
    data() {
      var checkuser = (rule, value, callback) => {
        if (!value || value === '' || value === 'undefined') {
          this.error = this.$t('normal.error_09') + this.$t('label.applicant');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.applicant')));
        } else {
          this.error = '';
          return callback();
        }
      };
      return {
        userlist: '',
        error: '',
        activeName: 'first',
        loading: false,
        checked: true,
        selectType: 'Single',
        title: 'title.PFANS1007VIEW',
        tabIndex: 0,
        multiple: false,
        baseInfo: {},
        form: {
          center_id: '',
          group_id: '',
          team_id: '',
          user_id: '',
          filename: '',
          summary: '',
          processingmethod: '',
          salecontract: '',
          contractno: '',
          numbers: '',
          totalvalue: '',
          totalnetworth: '',
          salequotation: '',
          reasonsforquotation: '',
          uploadfile: '',
        },
        table1: [
          {
            scrapdetailsid: '',
            assetinformationid: '',
            fixedassetnam: '',
            megasnumber: '',
            settagnumber: '',
            purchasedate: '',
            originalvalue: '',
            yearsofuse: '',
            networth: '',
            scrapping: '',
            remarks: '',
          },
        ],
        table2: [
          {
            salesdetailsid: '',
            assetinformationid: '',
            fixedassetnam: '',
            megasnumber: '',
            settagnumber: '',
            purchasedate: '',
            originalvalue: '',
            networth: '',
            scrapping: '',
            remarks: '',
            sellingprice: '',
            loss: '',
          },
        ],
        code1: 'PJ012',
        code2: 'PJ010',
        code3: 'PJ013',
        disabled: true,
        menuList: [],
        buttonList: [],
        rules: {
          user_id: [
            {
              required: true,
              validator: checkuser,
              trigger: 'change',
            },
          ],
          processingmethod: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS1007FORMVIEW_PROCESSINGMETHOD'),
              trigger: 'change',
            },
          ],
          salecontract: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS1007FORMVIEW_SALECONTRACT'),
              trigger: 'change',
            },
          ],
          contractno: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1007FORMVIEW_CONTRACTNO'),
              trigger: 'change',
            },
          ],
          numbers: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.numbers'),
              trigger: 'change',
            },
          ],
          totalvalue: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1007FORMVIEW_TOTALVALUE'),
              trigger: 'change',
            },
          ],
          totalnetworth: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1007FORMVIEW_TOTALNETWORTH'),
              trigger: 'change',
            },
          ],
          salequotation: [
            {
              required: true,
              message: this.$t('normal.error_09') + this.$t('label.PFANS1007FORMVIEW_SALEQUOTATION'),
              trigger: 'change',
            },
          ],
        },
          show: false,
          show1: false,
          canStart: false,
          fileList: [],
          upload: uploadUrl(),
      };
    },
    mounted() {
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1007Store/selectById', {'assetinformationid': this.$route.params._id})
          .then(response => {
            this.form = response.assetinformation;
            this.userlist = this.form.user_id;
            if (this.form.salequotation === 'PJ013001') {
              this.show = true;
            } else if (this.form.salequotation === 'PJ013003') {
              this.show = true;
            }
            if (response.scrapdetails.length > 0) {
              this.table1 = response.scrapdetails;
            }
            if (response.salesdetails.length > 0) {
              this.table2 = response.salesdetails;
            }
            if (this.form.uploadfile != '') {
              let uploadfile = this.form.uploadfile.split(';');
              for (var i = 0; i < uploadfile.length; i++) {
                if (uploadfile[i].split(',')[0] != '') {
                  let o = {};
                  o.name = uploadfile[i].split(',')[0];
                  o.url = uploadfile[i].split(',')[1];
                  this.fileList.push(o);
                }
              }
            }
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
        if (this.userlist !== null && this.userlist !== '') {
          let lst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
          this.form.center_id = lst.centerNmae;
          this.form.group_id = lst.groupNmae;
          this.form.team_id = lst.teamNmae;
          this.form.user_id = this.$store.getters.userinfo.userid;
        }
        this.loading = false;
      }
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
      }
    },
    methods: {
      getUserids(val) {
        this.form.user_id = val;
        let lst = getOrgInfoByUserId(val);
        this.form.center_id = lst.centerNmae;
        this.form.group_id = lst.groupNmae;
        this.form.team_id = lst.teamNmae;
        if (!this.form.user_id || this.form.user_id === '' || val === 'undefined') {
          this.error = this.$t('normal.error_09') + this.$t('label.applicant');
        } else {
          this.error = '';
        }
      },
      change(val) {
        this.form.originalvalue = val;
        this.form.yearsofuse = val;
        this.form.networth = val;
      },
      getProcessingmethod(val) {
        this.form.processingmethod = val;
        if(val === 'PJ012001'){
            this.show1 = false;
            this.rules.salecontract[0].required = false;
            this.rules.contractno[0].required = false;
        }else if(val === 'PJ012002'){
            this.show1 = true;
            this.rules.salecontract[0].required = true;
            this.rules.contractno[0].required = true;
        }
      },
      getSalecontract(val) {
        this.form.salecontract = val;
      },
      getSalequotation(val) {
        this.form.salequotation = val;
        if (val === 'PJ013002') {
          this.show = false;
        } else if (val === 'PJ013001') {
          this.show = true;
        } else if (val === 'PJ013003') {
          this.show = true;
        }
      },
      workflowState(val) {
        if (val.state === '1') {
          this.form.status = '3';
        } else if (val.state === '2') {
          this.form.status = '4';
        }
        this.buttonClick('update');
      },
      start() {
        this.form.status = '2';
        this.buttonClick('update');
      },
      end() {
        this.form.status = '0';
        this.buttonClick('update');
      },
      deleteRow(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        }else{
            this.table1 = [
                {
                    scrapdetailsid: '',
                    assetinformationid: '',
                    fixedassetnam: '',
                    megasnumber: '',
                    settagnumber: '',
                    purchasedate: '',
                    originalvalue: '',
                    yearsofuse: '',
                    networth: '',
                    scrapping: '',
                    remarks: '',
                },
            ]
        }
      },
      deleteRow1(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        }else{
            this.table2 = [
                {
                    salesdetailsid: '',
                    assetinformationid: '',
                    fixedassetnam: '',
                    megasnumber: '',
                    settagnumber: '',
                    purchasedate: '',
                    originalvalue: '',
                    networth: '',
                    scrapping: '',
                    remarks: '',
                    sellingprice: '',
                    loss: '',
                },
            ]
        }
      },
      addRow() {
        this.table1.push({
          scrapdetailsid: '',
          assetinformationid: '',
          fixedassetnam: '',
          megasnumber: '',
          settagnumber: '',
          purchasedate: '',
          originalvalue: 0,
          yearsofuse: 0,
          networth: 0,
          scrapping: '',
          remarks: '',
        });
      },
      addRow1() {
        this.table2.push({
          salesdetailsid: '',
          assetinformationid: '',
          fixedassetnam: '',
          megasnumber: '',
          settagnumber: '',
          purchasedate: '',
          originalvalue: 0,
          networth: 0,
          sellingprice: 0,
          loss: 0,
          scrapping: '',
          remarks: '',
        });
      },
      fileError(err, file, fileList) {
        Message({
          message: this.$t('normal.error_04'),
          type: 'error',
          duration: 5 * 1000,
        });
      },
      fileRemove(file, fileList) {
        this.fileList = [];
        this.form.uploadfile = '';
        for (var item of fileList) {
          let o = {};
          o.name = item.name;
          o.url = item.url;
          this.fileList.push(o);
          this.form.uploadfile += item.name + ',' + item.url + ';';
        }
      },
      fileDownload(file) {
        if (file.url) {
          var url = downLoadUrl(file.url);
          window.open(url);
        }
      },
      fileSuccess(response, file, fileList) {
        this.fileList = [];
        this.form.uploadfile = '';
        for (var item of fileList) {
          let o = {};
          o.name = item.name;
          if (!item.url) {
            o.url = item.response.info;
          } else {
            o.url = item.url;
          }
          this.fileList.push(o);
          this.form.uploadfile += o.name + ',' + o.url + ';';
        }
      },
      paramsTitle() {
        this.$router.push({
          name: 'PFANS1001FormView',
          params: {
            title: 7,
          },
        });
      },
      buttonClick(val) {
        if (val === 'back') {
          this.paramsTitle();
        } else {
          this.$refs['refform'].validate(valid => {
            if (valid) {
              if (this.form.salequotation === 'PJ013002') {
                this.form.reasonsforquotation = ' ';
              }
              this.form.purchasedate = moment(this.form.purchasedate).format('YYYY-MM-DD');
              this.loading = true;
              this.baseInfo = {};
              this.baseInfo.assetinformation = JSON.parse(JSON.stringify(this.form));
              this.baseInfo.scrapdetails = [];
              for (let i = 0; i < this.table1.length; i++) {
                if (this.table1[i].fixedassetnam !== '' || this.table1[i].megasnumber !== '' || this.table1[i].settagnumber !== '' ||
                  this.table1[i].purchasedate !== '' || this.table1[i].originalvalue !== 0 || this.table1[i].yearsofuse !== 0 || this.table1[i].networth !== 0
                  || this.table1[i].scrapping !== '' || this.table1[i].remarks !== '') {
                  this.baseInfo.scrapdetails.push(
                    {
                      scrapdetailsid: this.table1[i].scrapdetailsid,
                      assetinformationid: this.table1[i].assetinformationid,
                      fixedassetnam: this.table1[i].fixedassetnam,
                      megasnumber: this.table1[i].megasnumber,
                      settagnumber: this.table1[i].settagnumber,
                      purchasedate: this.table1[i].purchasedate,
                      originalvalue: this.table1[i].originalvalue,
                      yearsofuse: this.table1[i].yearsofuse,
                      networth: this.table1[i].networth,
                      scrapping: this.table1[i].scrapping,
                      remarks: this.table1[i].remarks,
                    },
                  );
                }
              }
              this.baseInfo.salesdetails = [];
              for (let i = 0; i < this.table2.length; i++) {
                if (this.table2[i].fixedassetnam !== '' || this.table2[i].megasnumber !== '' || this.table2[i].settagnumber !== '' ||
                  this.table2[i].purchasedate !== '' || this.table2[i].originalvalue !== 0 || this.table2[i].networth !== 0 || this.table2[i].sellingprice !== 0
                  || this.table2[i].loss !== 0 || this.table2[i].scrapping !== '' || this.table2[i].remarks !== '') {
                  this.baseInfo.salesdetails.push(
                    {
                      salesdetailsid: this.table2[i].salesdetailsid,
                      assetinformationid: this.table2[i].assetinformationid,
                      fixedassetnam: this.table2[i].fixedassetnam,
                      megasnumber: this.table2[i].megasnumber,
                      settagnumber: this.table2[i].settagnumber,
                      purchasedate: this.table2[i].purchasedate,
                      originalvalue: this.table2[i].originalvalue,
                      networth: this.table2[i].networth,
                      sellingprice: this.table2[i].sellingprice,
                      loss: this.table2[i].loss,
                      scrapping: this.table2[i].scrapping,
                      remarks: this.table2[i].remarks,
                    },
                  );
                }
              }
              if (this.$route.params._id) {
                this.baseInfo.assetinformation.assetinformationid = this.$route.params._id;
                this.$store
                  .dispatch('PFANS1007Store/updateAssetinformation', this.baseInfo)
                  .then(response => {
                    this.data = response;
                    this.loading = false;
                    if (val !== 'update') {
                      Message({
                        message: this.$t('normal.success_02'),
                        type: 'success',
                        duration: 5 * 1000,
                      });
                      this.paramsTitle();
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
                  .dispatch('PFANS1007Store/insert', this.baseInfo)
                  .then(response => {
                    this.data = response;
                    this.loading = false;
                    Message({
                      message: this.$t('normal.success_01'),
                      type: 'success',
                      duration: 5 * 1000,
                    });
                    this.paramsTitle();
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
          });
        }
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
