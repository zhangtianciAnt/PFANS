<template>
  <div style="min-height: 100%">
    <EasyNormalContainer
      :buttonList="buttonList"
      :title="title"
      @buttonClick="buttonClick"
      :canStart="canStart"
      @StartWorkflow="buttonClick"
      :defaultStart="defaultStart"
      @end="end" @start="start" @workflowState="workflowState"
      ref="container"
      v-loading="loading"
      @disabled="setdisabled"
      :workflowCode="workflowCode"
    >
      <div slot="customize">
        <el-form :model="form" label-position="top" label-width="8vw" ref="reff" :rules="rules"
                 style="padding: 2vw">
          <el-tabs type="border-card" v-model="activeName">
            <el-tab-pane :label="$t('label.PFANS2023FORMVIEW_INTELLIGENCE')" name="first">
              <el-row>
                <el-col :span="8">
                  <el-form-item :error="error" :label="$t('label.applicant')" prop="user_id">
                    <user :disabled="true" :error="error" :selectType="selectType" :userlist="userlist"
                          @getUserids="getUserids" style="width: 20vw" v-model="form.user_id"></user>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1045VIEW_OUTSOURCINGCOMPANY')"
                                prop="outsourcingcompany">
                    <div class="dpSupIndex" style="width: 20vw">
                      <el-container>
                        <input class="content bg" v-model="form.outsourcingcompany"
                               :disabled="true">
                        <el-button :disabled="!disable" icon="el-icon-search" @click="dialogTableVisible = true"
                                   size="small"></el-button>
                        <el-dialog :title="$t('title.PFANS6003VIEW')" :visible.sync="dialogTableVisible" center
                                   size="50%"
                                   top="8vh" lock-scroll
                                   append-to-body>
                          <div style="text-align: center">
                            <el-row style="text-align: center;height: 90%;overflow: hidden">
                              <el-table
                                :data="gridData.filter(data => !search || data.suppliername.toLowerCase().includes(search.toLowerCase()))"
                                height="500px" highlight-current-row style="width: 100%" tooltip-effect="dark"
                                @row-click="handleClickChange">
                                <el-table-column property="suppliername"
                                                 :label="$t('label.PFANS6001VIEW_SUPPLIERNAME')"
                                                 width="150"></el-table-column>
                                <el-table-column property="payeename"
                                                 :label="$t('label.PFANS1012VIEW_PAYEENAME')"
                                                 width="150"></el-table-column>
                                <el-table-column property="vendornum"
                                                 :label="$t('label.PFANS1012VIEW_FOREIGNPAYEECODE')"
                                                 width="100"></el-table-column>
                                <el-table-column property="payeebankaccountnumber"
                                                 :label="$t('label.PFANS1012VIEW_PAYEEBANKNUMBER')"
                                                 width="150"></el-table-column>
                                <el-table-column property="payeebankaccount"
                                                 :label="$t('label.PFANS1012VIEW_PAYEEBANKACCOUNT')"
                                                 width="150"></el-table-column>
                                <el-table-column
                                  align="right" width="230">
                                  <template slot="header" slot-scope="scope">
                                    <el-input
                                      v-model="search"
                                      size="mini"
                                      :placeholder="$t('label.PFANS1012FORMVIEW_USERNAME')"/>
                                  </template>
                                </el-table-column>
                              </el-table>
                            </el-row>
                            <span slot="footer" class="dialog-footer">
                          <el-button type="primary" @click="submit">{{$t('button.confirm')}}</el-button>
                        </span>
                          </div>
                        </el-dialog>
                      </el-container>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1002VIEW_CURRENCY')" prop="currency">
                    <!--                      add-ws-12/10-汇率字典-->
                    <!--                    <dicselect :code="code7"-->
                    <!--                               :data="form.currency"-->
                    <!--                               :disabled="true"-->
                    <!--                               :multiple="multiple"-->
                    <!--                               style="width: 20vw">-->
                    <!--                    </dicselect>-->
                    <monthlyrate :month="month7"
                                 :data="form.currency"
                                 :disabled="true"
                                 :multiple="multiple"
                                 style="width: 20vw">
                    </monthlyrate>
                    <!--                      add-ws-12/10-汇率字典-->
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1045VIEW_AMOUNTCASE')">
                    <el-input-number
                      :disabled="this.form.type === '1' ?true:!disable"
                      :max="999999999"
                      :min="0"
                      :precision="2"
                      :step="1"
                      @change="getamountcase"
                      controls-position="right"
                      style="width: 19.4vw"
                      v-model="form.amountcase">
                    </el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1045VIEW_MODIFIEDAMOUNT')">
                    <el-input-number
                      :disabled="true"
                      :max="999999999"
                      :min="0"
                      :precision="2"
                      :step="1"
                      controls-position="right"
                      style="width: 19.4vw"
                      v-model="form.modifiedamount">
                    </el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1045VIEW_NEWAMOUNTCASE')">
                    <el-input-number
                      :disabled="true"
                      :max="999999999"
                      :min="0"
                      :precision="2"
                      :step="1"
                      controls-position="right"
                      style="width: 20vw"
                      v-model="form.newamountcase">
                    </el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1025FORMVIEW_DRAFTINGDATE')">
                    <div class="block">
                      <el-date-picker
                        :disabled="true"
                        style="width: 20vw"
                        type="date"
                        v-model="form.applicationdate">
                      </el-date-picker>
                    </div>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1045VIEW_SUMMONET')">
                    <el-input-number
                      :disabled="true"
                      :max="999999999"
                      :min="0"
                      :precision="2"
                      :step="1"
                      controls-position="right"
                      style="width: 20vw"
                      v-model="form.summonet">
                    </el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <!--               UPD-ws-02/06-PSDCD_PFANS_20210205_XQ_078-from -->
                <!--                <el-col :span="8">-->
                <!--                  <el-form-item :label="$t('label.fiscal_year')" prop="yearss">-->
                <!--                    <div class="block">-->
                <!--                      <el-date-picker-->
                <!--                        :disabled="!disable"-->
                <!--                        style="width: 20vw"-->
                <!--                        type="year"-->
                <!--                        v-model="form.yearss"-->
                <!--                        @change="showData">>-->
                <!--                      </el-date-picker>-->
                <!--                    </div>-->
                <!--                  </el-form-item>-->
                <!--                </el-col>-->
                <el-col :span="8">
                  <el-form-item :label="$t('label.PFANS1045VIEW_CYCLE')" prop="yearss">
                    <!--                    NT_PFANS_20210304_BUG_090 更改组件活性-->
                    <el-date-picker
                      :disabled="!disable"
                      unlink-panels
                      class="bigWidth"
                      v-model="form.yearss"
                      style="margin-right:1vw"
                      type="monthrange"
                      :end-placeholder="$t('label.enddate')"
                      :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                      :start-placeholder="$t('label.startdate')"
                      @change="filterInfo"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <!--                UPD-ws-02/06-PSDCD_PFANS_20210205_XQ_078-to -->
                <!--                DEL-ws-02/06-PSDCD_PFANS_20210205_XQ_078-from -->
                <!--                <el-col :span="8">-->
                <!--                  <el-form-item :label="$t('label.PFANS1045VIEW_CYCLE')" prop="cycle">-->
                <!--                    <el-select v-model="form.cycle" :disabled="!disable" style="width: 19.5vw" clearable-->
                <!--                               @change="changeAcc">-->
                <!--                      <el-option-->
                <!--                        v-for="item in options"-->
                <!--                        :key="item.value"-->
                <!--                        :label="item.label"-->
                <!--                        :value="item.value">-->
                <!--                      </el-option>-->
                <!--                    </el-select>-->
                <!--                  </el-form-item>-->
                <!--                </el-col>-->
                <!--                DEL-ws-02/06-PSDCD_PFANS_20210205_XQ_078-to -->
              </el-row>
              <el-row>
                <el-form-item :label="$t('label.PFANS1012VIEW_ABSTRACT')" prop="remark">
                  <el-input :disabled="!disable" style="width: 72.5vw" type="textarea"
                            v-model="form.remark">
                  </el-input>
                </el-form-item>
              </el-row>
              <el-row v-if="this.form.type === '1'?true:false">
                <span class="collapse_Title">{{$t('label.PFANS1045VIEW_INFORMATION')}}</span>
                <el-table :data="tableF" :summary-method="getFsummaries" show-summary
                          header-cell-class-name="sub_bg_color_blue" stripe border style="width: 72.5vw">
                  <el-table-column :label="$t('label.PFANS1012FORMVIEW_INVOICEN')" align="center" width="200">
                    <template slot-scope="scope">
                      <el-input :disabled="true" style="width: 100%" v-model="scope.row.invoicenumber">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS5001FORMVIEW_CONTRACTREQUESTAMOUNT')" align="center"
                                   width="300" prop="money"
                  >
                    <template slot-scope="scope">
                      <el-input-number
                        :disabled="!disable2"
                        :min="0" :precision="2"
                        :max="999999999"
                        controls-position="right"
                        :no="scope.row"
                        :step="1"
                        @change="changeSum(scope.row)"
                        v-model="scope.row.money"
                        style="width: 100%">
                      </el-input-number>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.PFANS1017FORMVIEW_PREPAREFOR')" align="center" width="445">
                    <template slot-scope="scope">
                      <el-input :disabled="!disable2" style="width: 100%" v-model="scope.row.remark">
                      </el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('label.operation')" align="center" width="500">
                    <template slot-scope="scope">
                      <el-button
                        :disabled="!disable2"
                        @click.native.prevent="deleteRow7(scope.$index, tableF)"
                        plain
                        size="small"
                        type="danger"
                      >{{$t('button.delete')}}
                      </el-button>
                      <el-button
                        :disabled="!disable2"
                        @click="addRow7()"
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

            <el-tab-pane :label="$t('label.PFANS1002FORMVIEW_NUBERSGLJC')" name="second" v-if="this.$route.params._id">
              <el-row>
                <el-table
                  :data="DataList"
                  :summary-method="getDsummaries" show-summary
                  style="width: 1150px"
                  header-cell-class-name="sub_bg_color_blue" stripe border
                >
                  <el-table-column
                    align="center"
                    prop="contractnumber"
                    :label="$t('label.judgement')"
                    width="315px">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="claimamount"
                    :label="$t('label.PFANS1045VIEW_MONEYS')"
                    width="315px">
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="status"
                    :label="$t('label.PFANS1045VIEW_STATUS')"
                    width="315px">
                  </el-table-column>
                  <el-table-column :label="$t('label.operation')" align="center" width="200">
                    <template slot-scope="scope">
                      <el-button
                        @click.native.prevent="viewdata(scope.row)"
                        plain
                        :disabled="show10"
                        size="small"
                        type="primary"
                      >{{$t('button.viewdetails')}}
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-row>
            </el-tab-pane>

            <el-tab-pane :label="$t('label.PFANS2022VIEW_UPDATINGFILES')" name="thrid">
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.enclosure')">
                    <!--                    NT_PFANS_20210304_BUG_090 更改组件活性-->
                    <el-upload
                      :disabled="!disable"
                      :action="upload"
                      :file-list="fileList"
                      :on-error="fileError"
                      :on-preview="fileDownload"
                      :on-remove="fileRemove"
                      :on-success="fileSuccess"
                      class="upload-demo"
                      drag
                      ref="upload"
                      v-model="form.uploadfile">
                      <i class="el-icon-upload"></i>
                      <div class="el-upload__text">{{$t('label.enclosurecontent')}}<em>{{$t('normal.info_09')}}</em>
                      </div>
                    </el-upload>
                  </el-form-item>
                </el-col>
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
  import user from '../../../components/user.vue';
  import project from '../../../components/project.vue';
  import {Message} from 'element-ui';
  import dicselect from '../../../components/dicselect';
  import {
    downLoadUrl,
    getStatus,
    uploadUrl,
  } from '@/utils/customize';
  import monthlyrate from '../../../components/monthlyrate';
  import moment from 'moment';

  export default {
    name: 'PFANS1045FormView',
    components: {
      monthlyrate,
      dicselect,
      EasyNormalContainer,
      user,
      project,
    },
    data() {
      return {
        defaultStart: false,
        workflowCode: 'W0095',
        //ADD-ws-02/06-PSDCD_PFANS_20210205_XQ_078-from
        checkstatus: '',
        working: '',
        starttime: '',
        endTime: '',
        //ADD-ws-02/06-PSDCD_PFANS_20210205_XQ_078-to
        checkcycle: 0,
        show10: true,
        canStart: true,
        //add-ws-12/10-汇率字典
        // code7: 'PG019',
        month7: moment(new Date()).format('YYYY-MM'),
        //add-ws-12/10-汇率字典
        disablecheck: '',
        upload: uploadUrl(),
        fileList: [],
        disable2: false,
        multiple: false,
        disable: false,
        dialogTableVisible: false,
        loading: false,
        gridData: [],
        DataList: [],
        tableF: [
          {
            invoicenumber: this.$t('label.PFANS1045VIEW_JUE') + 1,
            money: '',
            remark: '',
          },
        ],
        //DEL-ws-02/06-PSDCD_PFANS_20210205_XQ_078-from
        // options: [{
        //   value: '0',
        //   label: this.$t('label.PFANS2007VIEW_YEAR'),
        // }, {
        //   value: '1',
        //   label: this.$t('label.PFANS1045VIEW_CYCLE1'),
        // }, {
        //   value: '2',
        //   label: this.$t('label.PFANS1045VIEW_CYCLE2'),
        // }, {
        //   value: '3',
        //   label: this.$t('label.PFANS1045VIEW_CYCLE3'),
        // }, {
        //   value: '4',
        //   label: this.$t('label.PFANS1045VIEW_CYCLE4'),
        // }, {
        //   value: '5',
        //   label: this.$t('label.PFANS1045VIEW_CYCLE5'),
        // }, {
        //   value: '6',
        //   label: this.$t('label.PFANS1045VIEW_CYCLE6'),
        // }],
        //DEL-ws-02/06-PSDCD_PFANS_20210205_XQ_078-to
        search: '',
        currentRow: '',
        formLabelWidth: '120px',
        userlist: '',
        form: {
          //UPD-ws-02/06-PSDCD_PFANS_20210205_XQ_078-from
          // yearss: parseInt(moment(new Date()).format('MM')) >= 4 ? moment(new Date()).format('YYYY') : moment(new Date()).subtract(1, 'y').format('YYYY'),
          yearss: '',
          //UPD-ws-02/06-PSDCD_PFANS_20210205_XQ_078-to
          summonet: '',
          remark: '',
          //DEL-ws-02/06-PSDCD_PFANS_20210205_XQ_078-from
          // cycle: '',
          //DEL-ws-02/06-PSDCD_PFANS_20210205_XQ_078-to
          applicationdate: new Date(),
          amountcase: '',
          modifiedamount: '',
          newamountcase: '',
          user_id: '',
          outsourcingcompany: '',
          currency: 'PG019003',
          policynumbers: '',
          uploadfile: '',
          type: '0',
        },
        buttonList: [
          {
            key: 'save',
            name: 'button.save',
            disabled: false,
            icon: 'el-icon-check',
          },
        ],
        selectType: 'Single',
        error: '',
        title: 'title.PFANS1045VIEW',
        activeName: 'first',
        IDname: '',
        rules: {
          outsourcingcompany: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1045VIEW_OUTSOURCINGCOMPANY'),
            trigger: 'change',
          }],
          yearss: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS1045VIEW_CYCLE'),
            trigger: 'prop',
          }],
          //DEL-ws-02/06-PSDCD_PFANS_20210205_XQ_078-from
          // cycle: [{
          //   required: true,
          //   message: this.$t('normal.error_09') + this.$t('label.PFANS1045VIEW_CYCLE'),
          //   trigger: 'change',
          // }],
          //DEL-ws-02/06-PSDCD_PFANS_20210205_XQ_078-to
        },

      };
    },
    mounted() {
      this.getaward();
      this.getsupplierinfor();
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1006Store/getpolicycontractOne', {'policycontract_id': this.$route.params._id})
          .then(response => {
            this.form = response.policycontract;

            if (response.policycontractdetails.length > 0) {
              this.tableF = response.policycontractdetails;
            }
            if (this.disable) {
              this.show10 = true;
            } else {
              this.show10 = false;
            }
            if (this.form.uploadfile != null && this.form.uploadfile != '' && this.form.uploadfile != undefined) {
              let uploadfile = this.form.uploadfile.split(';');
              for (var i = 0; i < uploadfile.length; i++) {
                if (uploadfile[i].split(',')[0] != '') {
                  let o = {};
                  o.name = uploadfile[i].split(',')[0];
                  o.url = uploadfile[i].split(',')[1];
                  console.log(o);
                  this.fileList.push(o);
                }
              }
            }
            if (this.form.status === '4') {
              this.disable = false;
              if (this.disablecheck) {
                this.disable2 = true;
              } else {
                this.disable2 = false;
              }
            }
            this.userlist = this.form.user_id;
            //ADD-ws-02/06-PSDCD_PFANS_20210205_XQ_078-from
            if (this.form.yearss !== '' && this.form.yearss !== null) {
              let claimdatetime = this.form.yearss;
              let claimdatetim = claimdatetime.slice(0, 7);
              let claimdatetime1 = claimdatetime.slice(claimdatetime.length - 7);
              this.form.yearss = [claimdatetim, claimdatetime1];
            }
            //ADD-ws-02/06-PSDCD_PFANS_20210205_XQ_078-to
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
        if (this.$store.getters.userinfo) {
          this.userlist = this.$store.getters.userinfo.userid;
        }
      }
    },
    created() {
      this.IDname = this.$route.params._id;
      this.disablecheck = this.$route.params.disabled;
      this.disable = this.$route.params.disabled;
      this.disable2 = this.$route.params.disabled;
    },
    methods: {
      //ADD-ws-02/06-PSDCD_PFANS_20210205_XQ_078-from
      filterInfo() {
        this.working = this.getworkinghours(this.form.yearss);
        if (this.working === '') {
          this.starttime = moment(new Date()).startOf('month').format('YYYY-MM');
          this.endTime = moment(new Date()).endOf('month').format('YYYY-MM');
          this.changeAcc();
        } else {
          this.starttime = this.working.substring(0, 7);
          this.endTime = this.working.substring(10, 17);
          this.changeAcc();
        }
      },
      getworkinghours(workinghours) {
        if (workinghours != null) {
          if (workinghours.length > 0) {
            return (
              moment(workinghours[0]).format('YYYY-MM') +
              ' ~ ' +
              moment(workinghours[1]).format('YYYY-MM')
            );
          } else {
            return '';
          }
        } else {
          return '';
        }
      },
      //ADD-ws-02/06-PSDCD_PFANS_20210205_XQ_078-to
      //DEL-ws-02/06-PSDCD_PFANS_20210205_XQ_078-from
      // showData() {
      //   this.form.yearss = moment(this.form.yearss).format('YYYY');
      // },
      //DEL-ws-02/06-PSDCD_PFANS_20210205_XQ_078-to
      viewdata(row) {
        this.$store.commit('global/SET_HISTORYURL', '');
        this.$store.commit('global/SET_WORKFLOWURL', '/FFFFF1012FormView');
        this.$router.push({
          name: 'PFANS1025FormView',
          params: {
            _checkdisable: this.disable,
            _checkid: this.IDname,
            checkname: true,
            _contractnumber: this.form.policynumbers,
            _id: row.award_id,
            disabled: false,
          },
        });
      },
      changeSum(row) {
        for (let i = 0; i < this.tableF.length; i++) {
          this.form.modifiedamount = this.tableF[i].money;
        }
      },
      getamountcase(val) {
        this.form.modifiedamount = val;
      },
      setdisabled(val) {
        if (this.$route.params.disabled) {
          this.disable = val;
        }
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
          file.url = file.url.replace('%', '%25');
          file.url = file.url.replace('#', '%23');
          file.url = file.url.replace('&', '%26');
          file.url = file.url.replace('+', '%2B');
          file.url = file.url.replace('=', '%3D');
          file.url = file.url.replace('?', '%3F');
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
      getaward() {
        this.DataList = [];
        this.loading = true;
        this.$store
          .dispatch('PFANS1006Store/getaward')
          .then(response => {
              for (let i = 0; i < response.length; i++) {
                if (response[i].policycontract_id === this.$route.params._id) {
                  if (response[i].status !== null && response[i].status !== '') {
                    response[i].status = getStatus(response[i].status);
                  }
                  this.DataList.push({
                    award_id: response[i].award_id,
                    claimamount: response[i].claimamount,
                    contractnumber: response[i].contractnumber,
                    status: response[i].status,
                  });
                }
              }
              this.loading = false;
            },
          ).catch(error => {
          Message({
            message: error,
            type: 'error',
            duration: 5 * 1000,
          });
          this.loading = false;
        });
      },
      getDsummaries(param) {
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = this.$t('label.PFANS1012VIEW_ACCOUNT');
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
                // update gbb 20210311 PSDCD_PFANS_20210225_BUG_022 保留两位小数 start
              if (!isNaN(value)) {
                return Math.round((prev + curr) * 100) / 100;
              } else {
                return Math.round(prev * 100) / 100;
              }
                // update gbb 20210311 PSDCD_PFANS_20210225_BUG_022 保留两位小数 end
            }, 0);
          } else {
            sums[index] = '--';
          }
        });
        sums[1] = Math.round(sums[1] * 100) / 100;
        this.getMoney2(sums);
        return sums;
      },
      getFsummaries(param) {
        const {columns, data} = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = this.$t('label.PFANS1012VIEW_ACCOUNT');
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
                // update gbb 20210311 PSDCD_PFANS_20210225_BUG_022 保留两位小数 start
              if (!isNaN(value)) {
                return Math.round((prev + curr) * 100) / 100;
              } else {
                return Math.round(prev * 100) / 100;
              }
                // update gbb 20210311 PSDCD_PFANS_20210225_BUG_022 保留两位小数 end
            }, 0);
          } else {
            sums[index] = '--';
          }
        });
        sums[1] = Math.round(sums[1] * 100) / 100;
        return sums;
      },
      getMoney2(sums) {
        this.form.summonet = sums[1];
      },
      addRow7() {
        let b;
        let c;
        if (this.tableF.length > 0) {
          b = this.tableF.length + 1;
          c = this.$t('label.PFANS1045VIEW_JUE') + b;
        }
        this.tableF.push({
          invoicenumber: c,
          remark: '',
          money: '',
        });
      },
      deleteRow7(index, rows) {
        if (rows.length > 1) {
          rows.splice(index, 1);
        } else {
          this.tableF = [{
            invoicenumber: this.$t('label.PFANS1045VIEW_JUE') + 1,
            money: '',
            remark: '',
          }];
        }
      },
      workflowState(val) {
        //ADD-ws-02/06-PSDCD_PFANS_20210205_XQ_078-from
        this.checkstatus = 1;
        //ADD-ws-02/06-PSDCD_PFANS_20210205_XQ_078-to
        if (val.state === '1') {
          this.form.status = '3';
        } else if (val.state === '2') {
          this.form.status = '4';
        }
        //UPD-ws-02/06-PSDCD_PFANS_20210205_XQ_078-from
        // this.buttonClick("save");
        this.buttonClick2();
        //UPD-ws-02/06-PSDCD_PFANS_20210205_XQ_078-to
      },
      start(val) {
        //ADD-ws-02/06-PSDCD_PFANS_20210205_XQ_078-from
        this.checkstatus = 0;
        //ADD-ws-02/06-PSDCD_PFANS_20210205_XQ_078-to
        if (val.state === '0') {
          this.form.status = '2';
        } else if (val.state === '2') {
          this.form.status = '4';
        }
        //UPD-ws-02/06-PSDCD_PFANS_20210205_XQ_078-from
        // this.buttonClick("save");
        this.buttonClick2();
        //UPD-ws-02/06-PSDCD_PFANS_20210205_XQ_078-to
      },
      //upd 审批流程 to
      end() {
        //ADD-ws-02/06-PSDCD_PFANS_20210205_XQ_078-from
        this.checkstatus = 1;
        //ADD-ws-02/06-PSDCD_PFANS_20210205_XQ_078-to
        this.form.status = '0';
        //UPD-ws-02/06-PSDCD_PFANS_20210205_XQ_078-from
        // this.buttonClick("save");
        this.buttonClick2();
        //UPD-ws-02/06-PSDCD_PFANS_20210205_XQ_078-to
      },
      //ADD-ws-02/06-PSDCD_PFANS_20210205_XQ_078-from
      buttonClick2() {
        this.form.user_id = this.userlist;
        if (this.checkstatus == 1) {
          this.form.yearss = this.getworkinghours(this.form.yearss);
        }
        this.baseInfo = {};
        this.baseInfo.policycontract = [];
        this.baseInfo.policycontractdetails = [];
        this.baseInfo.policycontract = JSON.parse(JSON.stringify(this.form));
        for (let i = 0; i < this.tableF.length; i++) {
          this.baseInfo.policycontractdetails.push({
            invoicenumber: this.tableF[i].invoicenumber,
            money: this.tableF[i].money,
            remark: this.tableF[i].remark,
          });
        }
        this.loading = true;
        if (this.$route.params._id) {
          this.form.policycontract_id = this.$route.params._id;
          this.$store
            .dispatch('PFANS1006Store/updatepolicycontract', this.baseInfo)
            .then(response => {
              this.data = response;
              this.loading = false;
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
        } else {
          this.$store
            .dispatch('PFANS1006Store/createpolicycontract', this.baseInfo)
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
      },
      //ADD-ws-02/06-PSDCD_PFANS_20210205_XQ_078-to
      //UPD-ws-02/06-PSDCD_PFANS_20210205_XQ_078-from
      // changeAcc(val) {
      //   if (this.form.outsourcingcompany === '') {
      //     this.form.cycle = '';
      //     Message({
      //       message: this.$t('label.PFANS1045VIEW_CHECK3'),
      //       type: 'error',
      //       duration: 5 * 1000,
      //     });
      //     return;
      //   }
      //   this.checkcycle = 0;
      //   this.form.cycle = val;
      //   this.loading = true;
      //   this.$store
      //     .dispatch('PFANS1006Store/chackcycle', this.form)
      //     .then(response => {
      //       if (response.length > 4) {
      //         this.checkcycle = 1;
      //         Message({
      //           message: this.$t('label.PFANS1045VIEW_CHECK2'),
      //           type: 'error',
      //           duration: 5 * 1000,
      //         });
      //         this.loading = false;
      //       } else {
      //         this.loading = false;
      //       }
      //     }).catch(error => {
      //     Message({
      //       message: error,
      //       type: 'error',
      //       duration: 5 * 1000,
      //     });
      //     this.loading = false;
      //   });
      // },
      changeAcc() {
        if (this.form.outsourcingcompany === '') {
          this.form.yearss = '';
          Message({
            message: this.$t('label.PFANS1045VIEW_CHECK3'),
            type: 'error',
            duration: 5 * 1000,
          });
          return;
        }
        this.checkcycle = 0;
        let parameter = {
          outsourcingcompany: this.form.outsourcingcompany,
          cycle: this.starttime,
          yearss: this.endTime,
        };
        this.loading = true;
        this.$store
          .dispatch('PFANS1006Store/chackcycle', parameter)
          .then(response => {
            if (!response) {
              this.checkcycle = 1;
              Message({
                message: this.$t('label.PFANS1045VIEW_CHECK2'),
                type: 'error',
                duration: 5 * 1000,
              });
              this.loading = false;
            } else {
              this.loading = false;
            }
          }).catch(error => {
          Message({
            message: error,
            type: 'error',
            duration: 5 * 1000,
          });
          this.loading = false;
        });
      },
      //UPD-ws-02/06-PSDCD_PFANS_20210205_XQ_078-to
      paramsTitle() {
        this.$router.push({
          name: 'PFANS1045View',
        });
      },

      buttonClick(val) {
        if (val === 'back') {
          this.paramsTitle();
        } else {
          this.$refs['reff'].validate(valid => {
            if (valid) {
              if (this.form.amountcase === 0) {
                Message({
                  message: this.$t('label.PFANS1045VIEW_CHECK4'),
                  type: 'error',
                  duration: 5 * 1000,
                });
                return;
              }
              if (this.form.status === '4') {
                let ckecksum = 0;
                for (let i = 0; i < this.tableF.length; i++) {
                  ckecksum = this.tableF[i].money;
                }
                if (ckecksum < (Number(this.form.summonet) - Number(this.form.newamountcase))) {
                  Message({
                    message: this.$t('label.PFANS1045VIEW_CHECK6'),
                    type: 'error',
                    duration: 5 * 1000,
                  });
                  return;
                }
              }
              this.form.user_id = this.userlist;
              //ADD-ws-02/06-PSDCD_PFANS_20210205_XQ_078-from
              this.form.yearss = this.getworkinghours(this.form.yearss);
              //ADD-ws-02/06-PSDCD_PFANS_20210205_XQ_078-to
              this.baseInfo = {};
              this.baseInfo.policycontract = [];
              this.baseInfo.policycontractdetails = [];
              this.baseInfo.policycontract = JSON.parse(JSON.stringify(this.form));
              for (let i = 0; i < this.tableF.length; i++) {
                this.baseInfo.policycontractdetails.push({
                  invoicenumber: this.tableF[i].invoicenumber,
                  money: this.tableF[i].money,
                  remark: this.tableF[i].remark,
                });

              }
              this.loading = true;

              if (this.checkcycle === 0) {

                if (this.$route.params._id) {
                  this.form.policycontract_id = this.$route.params._id;
                  this.$store
                    .dispatch('PFANS1006Store/updatepolicycontract', this.baseInfo)
                    .then(response => {
                      this.data = response;
                      this.loading = false;
                      //UPD-ws-02/06-PSDCD_PFANS_20210205_XQ_078-from
                      // if (val !== 'update') {
                      //   Message({
                      //     message: this.$t('normal.success_02'),
                      //     type: 'success',
                      //     duration: 5 * 1000,
                      //   });
                      //   this.paramsTitle();
                      // }
                      if (val !== 'update') {
                        Message({
                          message: this.$t('normal.success_02'),
                          type: 'success',
                          duration: 5 * 1000,
                        });
                        if (this.$store.getters.historyUrl && val != 'StartWorkflow') {
                          this.paramsTitle();
                        }
                        if (val === 'StartWorkflow') {
                          this.$refs.container.$refs.workflow.startWorkflow();
                        }
                      }
                      //UPD-ws-02/06-PSDCD_PFANS_20210205_XQ_078-to
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
                    .dispatch('PFANS1006Store/createpolicycontract', this.baseInfo)
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
              } else {
                Message({
                  message: this.$t('label.PFANS1045VIEW_CHECK5'),
                  type: 'error',
                  duration: 5 * 1000,
                });
                this.loading = false;
              }
            } else {
              Message({
                message: this.$t('normal.error_12'),
                type: 'error',
                duration: 5 * 1000,
              });
            }
          });
        }
      },
      getsupplierinfor() {
        this.loading = true;
        this.$store
          .dispatch('PFANS6003Store/getsupplierinfor2')
          .then(response => {
            this.gridData = [];
            for (let i = 0; i < response.length; i++) {
              var vote = {};
              vote.suppliername = response[i].supchinese;
              vote.payeename = response[i].payeename;
              vote.suppliercode = response[i].suppliercode;
              vote.payeebankaccountnumber = response[i].payeebankaccountnumber;
              vote.payeebankaccount = response[i].payeebankaccount;
              this.gridData.push(vote);
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
      },

      handleClickChange(val) {
        this.currentRow = val.suppliername;
      },
      submit() {
        let val = this.currentRow;
        this.dialogTableVisible = false;
        this.form.outsourcingcompany = val;
      },
      getUserids(val) {
        this.userlist = val;
        this.form.user_id = val;
        if (!this.form.user_id || this.form.user_id === '' || typeof val == 'undefined') {
          this.error = this.$t('normal.error_08') + this.$t('label.applicant');
        } else {
          this.error = '';
        }
      },
    },
  };
</script>

<style rel="stylesheet/scss" lang="scss">
  .dpSupIndex {
    .content {
      height: 34px;
      min-width: 80%;
      border: 0.1rem solid #ebeef5;
      overflow-x: hidden;
      line-height: 34px;
      padding: 0.1rem 0.5rem 0.2rem 0.5rem;
    }

    .bg {
      background: white;
      border-width: 1px;
    }
  }
</style>






