<template>
  <EasyNormalContainer ref="container" v-loading="loading"
                       :buttonList="buttonList"
                       :title="title" @buttonClick="buttonClick"> l
    <div slot="customize">
      <el-form ref="reff" :model="form" :rules="rules" label-position="top" label-width="8vw" style="padding: 2vw">
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('label.center')">
              <org :disabled="true"
                   :orglist="form.centerid"
                   orgtype="1"
                   style="width: 20vw"
              ></org>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('label.group')">
              <org :disabled="true"
                   :orglist="form.groupid"
                   orgtype="2"
                   style="width: 20vw"
              ></org>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('label.PFANS1043FORMVIEW_YEAR')" prop="year">
              <el-date-picker
                v-model="form.year"
                :disabled="!disable"
                style="width: 20vw"
                type="year">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('label.applicant')">
              <user v-model="form.user_id" :disabled="true" :selectType="selectType"
                    :userlist="userlist" style="width: 20vw"></user>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('label.date')">
              <el-date-picker v-model="form.data" :disabled="!disable" style="width:20vw">
              </el-date-picker>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('label.PFANS1043FORMVIEW_THEMENAME')" prop="themename">
              <el-input v-model="form.themename" :disabled="!disable"
                        style="width:20vw"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('label.PFANS1039FORMVIEW_TEAM')" prop="divide">
              <dicselect :code="code1"
                         :data="form.divide"
                         :disabled="!disable"
                         :multiple="multiple"
                         style="width:20vw"
                         @change="getdivide">
              </dicselect>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('label.PFANS1043FORMVIEW_CONTRACT')" prop="contract">
              <dicselect :code="code2"
                         :data="form.contract"
                         :disabled="!disable"
                         :multiple="multiple"
                         style="width:20vw"
                         @change="getcontract">
              </dicselect>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('label.PFANS8011VIEW_CURRENCY')" prop="currency">
              <dicselect :code="code3"
                         :data="form.currency"
                         :disabled="!disable"
                         :multiple="multiple"
                         style="width:20vw"
                         @change="getcurrency">
              </dicselect>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item v-show="show1"
                          :label="$t('label.PFANS5001FORMVIEW_ENTRUST')" prop="toolsorgs">
              <div class="dpSupIndex" style="width: 20vw">
                <el-container>
                  <el-input v-model="form.toolsorgs"
                            :disabled="true"
                            style="width: 20vw">
                  </el-input>
                  <el-button :disabled="!disable" icon="el-icon-search" size="small"
                             @click="dialogTableVisible2 = true"></el-button>
                  <el-dialog :visible.sync="dialogTableVisible2"
                             append-to-body
                             center
                             lock-scroll size="50%"
                             top="8vh">
                    <div style="text-align: center">
                      <el-row style="text-align: center;height: 90%;overflow: hidden">
                        <el-table
                          :data="gridData2.filter(data => !search2 || data.custchinese.toLowerCase().includes(search2.toLowerCase())
                          || data.thecompany.toLowerCase().includes(search2.toLowerCase())
                          )"
                          height="500px" highlight-current-row style="width: 100%" tooltip-effect="dark"
                          @row-click="handleClickChange2">
                          <el-table-column :label="$t('label.PFANS5001FORMVIEW_CUSTOMERNAME')" property="custchinese"
                                           show-overflow-tooltip width="120"></el-table-column>
                          <el-table-column :label="$t('label.PFANS6003FORMVIEW_THECOMPANY')" property="thecompany"
                                           show-overflow-tooltip width="120"></el-table-column>
                          <el-table-column :label="$t('label.ASSETS1002VIEW_USERID')" property="liableperson"
                                           show-overflow-tooltip width="120"></el-table-column>
                          <el-table-column :label="$t('label.PFANS6002FORMVIEW_PROJECTPERSON')" property="prochinese"
                                           show-overflow-tooltip width="120"></el-table-column>
                          <el-table-column :label="$t('label.PFANS2003FORMVIEW_CONTACTINFORMATION')"
                                           property="protelephone"
                                           show-overflow-tooltip width="120"></el-table-column>
                          <el-table-column
                            align="right" width="230">
                            <template slot="header" slot-scope="scope">
                              <el-input
                                v-model="search2"
                                :placeholder="$t('label.PFANS1012FORMVIEW_USERNAME2')"
                                size="mini"/>
                            </template>
                          </el-table-column>
                        </el-table>
                      </el-row>
                      <span slot="footer" class="dialog-footer">
                          <el-button type="primary" @click="submit2">{{ $t('button.confirm') }}</el-button>
                        </span>
                    </div>
                  </el-dialog>
                </el-container>
              </div>
            </el-form-item>
            <el-form-item v-show="show2"
                          :label="$t('label.PFANS5001FORMVIEW_ENTRUST')" prop="toolsorgs">
              <div class="dpSupIndex" style="width: 20vw">
                <el-container>
                  <input v-model="form.toolsorgs" :disabled="true"
                         style="width: 20vw">
                  <el-button :disabled="!disable" icon="el-icon-search" size="small"
                             @click="dialogTableVisible = true"></el-button>
                  <el-dialog :title="$t('title.PFANS6003VIEW')" :visible.sync="dialogTableVisible" append-to-body
                             center
                             lock-scroll size="50%"
                             top="8vh">
                    <div style="text-align: center">
                      <el-row style="text-align: center;height: 90%;overflow: hidden">
                        <el-table
                          :data="gridData.filter(data => !search || data.suppliername.toLowerCase().includes(search.toLowerCase()))"
                          height="500px" highlight-current-row style="width: 100%" tooltip-effect="dark"
                          @row-click="handleClickChange">
                          <el-table-column :label="$t('label.PFANS6001VIEW_SUPPLIERNAME')"
                                           property="suppliername"
                                           show-overflow-tooltip width="120"></el-table-column>
                          <el-table-column :label="$t('label.PFANS1012VIEW_PAYEENAME')"
                                           property="payeename"
                                           show-overflow-tooltip width="120"></el-table-column>
                          <el-table-column :label="$t('label.PFANS1012VIEW_FOREIGNPAYEECODE')"
                                           property="vendornum"
                                           show-overflow-tooltip width="120"></el-table-column>
                          <el-table-column :label="$t('label.PFANS1012VIEW_PAYEEBANKNUMBER')"
                                           property="payeebankaccountnumber"
                                           show-overflow-tooltip width="120"></el-table-column>
                          <el-table-column :label="$t('label.PFANS1012VIEW_PAYEEBANKACCOUNT')"
                                           property="payeebankaccount"
                                           show-overflow-tooltip width="120"></el-table-column>
                          <el-table-column
                            align="right" width="230">
                            <template slot="header" slot-scope="scope">
                              <el-input
                                v-model="search"
                                :placeholder="$t('label.PFANS1012FORMVIEW_USERNAME')"
                                size="mini"/>
                            </template>
                          </el-table-column>
                        </el-table>
                      </el-row>
                      <span slot="footer" class="dialog-footer">
                          <el-button type="primary" @click="submit">{{ $t('button.confirm') }}</el-button>
                        </span>
                    </div>
                  </el-dialog>
                </el-container>
              </div>
            </el-form-item>
            <el-form-item v-show="show3" :error="errorgroup" :label="$t('label.PFANS5001FORMVIEW_ENTRUST')"
                          prop="toolsorgs">
              <org :disabled="!disable" :error="errorgroup" :orglist="form.toolsorgs" orgtype="4"
                   style="width:20vw"
                   @getOrgids="setToolsorgs"></org>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('label.PFANS2002FORMVIEW_OTHER1')">
              <dicselect :code="code4"
                         :data="form.otherone"
                         :disabled="!disable"
                         :multiple="multiple"
                         style="width:20vw"
                         @change="getotherone">
              </dicselect>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('label.PFANS2002FORMVIEW_OTHER2')">
              <dicselect :code="code5"
                         :data="form.othertwo"
                         :disabled="!disable"
                         :multiple="multiple"
                         style="width:20vw"
                         @change="getothertwo">
              </dicselect>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('label.PFANS2002FORMVIEW_OTHER3')">
              <dicselect :code="code6"
                         :data="form.otherthree"
                         :disabled="!disable"
                         :multiple="multiple"
                         style="width:20vw"
                         @change="getotherthree">
              </dicselect>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item :label="$t('label.PFANS1012VIEW_ABSTRACT')">
            <el-input v-model="form.remark" :disabled="!disable" style="width: 72vw"
                      type="textarea">
            </el-input>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
  </EasyNormalContainer>
</template>

<script>
import EasyNormalContainer from '@/components/EasyNormalContainer';
import user from '../../../components/user.vue';
import dicselect from '../../../components/dicselect';
import {getDictionaryInfo, getOrgInfoByUserId, getUserInfo} from '@/utils/customize';
import {Message} from 'element-ui';
import moment from 'moment';
import org from '../../../components/org';

export default {
  name: 'PFANS1043FormView',
  components: {
    dicselect,
    EasyNormalContainer,
    getOrgInfoByUserId,
    user,
    org,
  },
  data() {
    return {
      errorgroup: '',
      search: '',
      search2: '',
      dialogTableVisible: false,
      dialogTableVisible2: false,
      gridData: [],
      gridData2: [],
      show1: false,
      show2: false,
      show3: false,
      userlist: '',
      selectType: 'Single',
      title: 'title.PFANS1043VIEW',
      loading: false,
      form: {
        themename: '',
        centerid: '',
        groupid: '',
        year: parseInt(moment(new Date()).format('MM')) >= 4 ? parseInt(moment(new Date()).format('YYYY')) + 1 + '' : moment(new Date()).format('YYYY'),
        user_id: '',
        data: '',
        divide: '',
        otherone: '',
        othertwo: '',
        otherthree: '',
        remark: '',
        contract: '',
        currency: '',
        toolsorgs: '',
        supplierinfor_id: '',
        customerinfor_id: '',
      },
      disable: true,
      rules: {
        toolsorgs: [{
          required: true,
          message: this.$t('normal.error_09') + this.$t('label.PFANS5001FORMVIEW_ENTRUST'),
          trigger: 'change',
        }],
        contract: [{
          required: true,
          message: this.$t('normal.error_09') + this.$t('label.PFANS1043FORMVIEW_CONTRACT'),
          trigger: 'change',
        }],
        currency: [{
          required: true,
          message: this.$t('normal.error_09') + this.$t('label.PFANS8011VIEW_CURRENCY'),
          trigger: 'change',
        }],
        divide: [{
          required: true,
          message: this.$t('normal.error_09') + this.$t('label.PFANS1039FORMVIEW_TEAM'),
          trigger: 'change',
        }],
        themename: [{
          required: true,
          message: this.$t('normal.error_08') + this.$t('label.PFANS1043FORMVIEW_THEMENAME'),
          trigger: 'change',
        }],
        year: [{
          required: true,
          message: this.$t('normal.error_08') + this.$t('label.PFANS1043FORMVIEW_YEAR'),
          trigger: 'change',
        }],
      },
      multiple: false,
      code1: 'PJ063',
      code2: 'PJ142',
      code3: 'PG019',
      code4: 'PJ143',
      code5: 'PJ144',
      code6: 'PJ145',
      currentRow: '',
      currentRow2: '',
      buttonList: [
        {
          key: 'save',
          name: 'button.save',
          disabled: false,
          icon: 'el-icon-check',
        },
      ],
    };
  },
  created() {
    this.disable = this.$route.params.disabled;
  },
  mounted() {
    this.getsupplierinfor();
    this.getcustomerinfor();
    if (this.$route.params._id) {
      this.loading = true;
      this.$store
        .dispatch('PFANS1043Store/getPfans1043One', {'themeinfor_id': this.$route.params._id})
        .then(response => {
          this.form = response;
          this.userlist = response.user_id;
          if (this.form.contract == 'PJ142001' || this.form.contract == 'PJ142002' || this.form.contract == 'PJ142003') {
            this.show1 = true;
          } else if (this.form.contract == 'PJ142006' || this.form.contract == 'PJ142007') {
            this.show2 = true;
          } else if (this.form.contract == 'PJ142008' || this.form.contract == 'PJ142009' || this.form.contract == 'PJ142004' || this.form.contract == 'PJ142005') {
            this.show3 = true;
          }
          if (this.$route.params.type) {
            //upd ccm 20210601 年度转换 fr
            // this.form.year = moment(new Date()).add(1, 'y').format('YYYY');
            this.form.year = parseInt(moment(new Date()).format('MM')) >= 4 ? parseInt(moment(new Date()).format('YYYY')) + 1 + '' : moment(new Date()).format('YYYY');
            //upd ccm 20210601 年度转换 to
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
    } else {
      this.form.user_id = this.$store.getters.userinfo.userid;
      this.userlist = this.$store.getters.userinfo.userid;
      if (this.userlist !== null && this.userlist !== '') {
        let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
        if (rst) {
          this.form.centerid = rst.centerId;
          this.form.groupid = rst.groupId;
        }
      }
    }
  },
  methods: {
    buttonClick(val) {
      this.$refs['reff'].validate(valid => {
        if (valid) {
          //add ccm 20210601 年度转格式 fr
          this.form.year = moment(this.form.year).format('YYYY');
          //add ccm 20210601 年度转格式 to
          if (this.$route.params._id) {
            if (this.$route.params.type) {
              this.$store
                .dispatch('PFANS1043Store/createPfans1043', this.form)
                .then(response => {
                  this.data = response;
                  this.loading = false;
                  Message({
                    message: this.$t('normal.success_01'),
                    type: 'success',
                    duration: 5 * 1000,
                  });
                  this.$router.push({
                    name: 'PFANS1043View',
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
              this.form.policycontract_id = this.$route.params._id;
              this.$store
                .dispatch('PFANS1043Store/updatePfans1043', this.form)
                .then(response => {
                  this.data = response;
                  this.loading = false;
                  Message({
                    message: this.$t('normal.success_02'),
                    type: 'success',
                    duration: 5 * 1000,
                  });
                  this.$router.push({
                    name: 'PFANS1043View',
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
            }
          } else {
            this.$store
              .dispatch('PFANS1043Store/createPfans1043', this.form)
              .then(response => {
                this.data = response;
                this.loading = false;
                Message({
                  message: this.$t('normal.success_01'),
                  type: 'success',
                  duration: 5 * 1000,
                });
                this.$router.push({
                  name: 'PFANS1043View',
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

          }
        } else {
          Message({
            message: this.$t('normal.error_12'),
            type: 'error',
            duration: 5 * 1000,
          });
        }
      });
    },
    getcustomerinfor() {
      this.loading = true;
      this.$store
        .dispatch('PFANS6002Store/getcustomerinfor2')
        .then(response => {
          for (let j = 0; j < response.length; j++) {
            if (response[j].custchinese !== null && response[j].custchinese !== '') {
              let custchinese = getUserInfo(response[j].custchinese);
              if (custchinese) {
                response[j].custchinese = user.userinfo.customername;
              }
            }
            if (response[j].liableperson !== null && response[j].liableperson !== '') {
              let liableperson = getUserInfo(response[j].liableperson);
              if (liableperson) {
                response[j].liableperson = user.userinfo.customername;
              }
            }
            if (response[j].prochinese !== null && response[j].prochinese !== '') {
              let prochinese = getUserInfo(response[j].prochinese);
              if (prochinese) {
                response[j].prochinese = user.userinfo.customername;
              }
            }
            if (response[j].protelephone !== null && response[j].protelephone !== '') {
              let protelephone = getUserInfo(response[j].protelephone);
              if (protelephone) {
                response[j].protelephone = user.userinfo.customername;
              }
            }
            if (response[j].commontperson !== null && response[j].commontperson !== '') {
              let commontperson = getUserInfo(response[j].commontperson);
              if (commontperson) {
                response[j].commontperson = user.userinfo.customername;
              }
            }
            if (response[j].comtelephone !== null && response[j].comtelephone !== '') {
              let comtelephone = getUserInfo(response[j].comtelephone);
              if (comtelephone) {
                response[j].comtelephone = user.userinfo.customername;
              }
            }
            if (response[j].addchinese !== null && response[j].addchinese !== '') {
              let addchinese = getUserInfo(response[j].addchinese);
              if (addchinese) {
                response[j].addchinese = user.userinfo.customername;
              }
            }
            if (response[j].perscale !== null && response[j].perscale !== '') {
              let perscale = getDictionaryInfo(response[j].perscale);
              if (perscale != null) {
                response[j].perscale = perscale.value1;
              }
            }
          }
          this.gridData2 = response;
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
    setToolsorgs(val) {
      this.form.toolsorgs = val;
      if (this.form.toolsorgs === '') {
        this.errorgroup = this.$t('normal.error_08') + this.$t('label.PFANS5001FORMVIEW_ENTRUST');
      } else {
        this.errorgroup = '';
      }
    },
    handleClickChange(val) {
      this.currentRow = val.suppliername;
      this.form.supplierinfor_id = val.supplierinfor_id;
    },
    submit() {
      this.form.toolsorgs = this.currentRow;
      this.dialogTableVisible = false;
    },
    handleClickChange2(val) {
      this.currentRow2 = val.custchinese;
      this.form.customerinfor_id = val.customerinfor_id;
    },
    submit2() {
      this.form.toolsorgs = this.currentRow2;
      this.dialogTableVisible2 = false;
    },
    getsupplierinfor() {
      this.loading = true;
      this.$store
        .dispatch('PFANS6003Store/getsupplierinfor2')
        .then(response => {
          for (let i = 0; i < response.length; i++) {
            var vote = {};
            vote.supplierinfor_id = response[i].supplierinfor_id;
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
          this.$message.error({
            message: error,
            type: 'error',
            duration: 5 * 1000,
          });
          this.loading = false;
        });
    },
    getotherthree(val) {
      this.form.otherthree = val;
    },
    getothertwo(val) {
      this.form.othertwo = val;
    },
    getotherone(val) {
      this.form.otherone = val;
    },
    getcurrency(val) {
      this.form.currency = val;
    },
    getcontract(val) {
      this.form.contract = val;
      if (this.form.contract == 'PJ142001' || this.form.contract == 'PJ142002' || this.form.contract == 'PJ142003') {
        this.show1 = true;
        this.show2 = false;
        this.show3 = false;
        this.form.toolsorgs = '';
      } else if (this.form.contract == 'PJ142006' || this.form.contract == 'PJ142007') {
        this.show1 = false;
        this.show2 = true;
        this.show3 = false;
        this.form.toolsorgs = '';
      } else if (this.form.contract == 'PJ142008' || this.form.contract == 'PJ142009' || this.form.contract == 'PJ142004' || this.form.contract == 'PJ142005') {
        this.show1 = false;
        this.show2 = false;
        this.show3 = true;
        this.form.toolsorgs = '';
      }
    },
    getdivide(val) {
      this.form.divide = val;
    },
  },

};
</script>

<style lang="scss" rel="stylesheet/scss">
.dpSupIndex {
  .content {
    height: 34px;
    min-width: 80%;
    border: 0.1rem solid #ebeef5;
    overflow-y: scroll;
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
