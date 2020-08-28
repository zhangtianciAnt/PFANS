<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" v-loading="loading" :title="title" @buttonClick="buttonClick"
                         @end="end" @start="start" @workflowState="workflowState" ref="container"
                         :workflowCode="workflowCode"
                         :defaultStart="defaultStart" :enableSave="enableSave" @StartWorkflow="buttonClick"
                         @disabled="setdisabled">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="ruleForm"
                 style="padding: 3vw">
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.center')" prop="centerid">
                <el-input :disabled="true" style="width:20vw" v-model="centerid"></el-input>
                <el-input v-show='false' :disabled="true" style="width:20vw" v-model="form.centerid"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')" prop="groupid">
                <el-input :disabled="true" style="width:20vw" v-model="groupid"></el-input>
                <el-input v-show='false' :disabled="true" style="width:20vw" v-model="form.groupid"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')" prop="teamid">
                <el-input :disabled="true" style="width:20vw" v-model="teamid"></el-input>
                <el-input v-show='false' :disabled="true" style="width:20vw" v-model="form.teamid"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.applicant')" prop="userid">
                <user :disabled="true" :error="error" :selectType="selectType" :userlist="userlist"
                      @getUserids="getUserids" style="width:20vw"></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.application_date')" prop="application_date">
                <el-date-picker
                  v-model="form.application_date"
                  :disabled="true"
                  type="date"
                  style="width:20vw"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS4001FORMVIEW_YYRQ')" prop="usedate">
                <el-date-picker
                  v-model="form.usedate"
                  :disabled="!disable"
                  type="date"
                  style="width:20vw"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS4001FORMVIRW_WJLX')" prop="filetype">
                <dicselect
                  :disabled="!disable"
                  :code="code"
                  :multiple="multiple"
                  :data="form.filetype"
                  style="width:20vw"
                  @change="wjlx">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS4001FORMVIRW_YYLX')" prop="sealtype">
                <dicselect
                  :disabled="!disable"
                  :code="code2"
                  :multiple="multiple2"
                  :data="form.sealtype"
                  style="width:20vw"
                  @change="yilx">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS4001FORMVIRW_KH')" prop="client">
                <!--                <dicselect-->
                <!--                  :disabled="!disable"-->
                <!--                  :code="code3"-->
                <!--                  :multiple="multiple3"-->
                <!--                  :data="form.client"-->
                <!--                  style="width:20vw"-->
                <!--                  @change="kh">-->
                <!--                </dicselect>-->
                <el-input v-model="form.client" :disabled="!disable" style="width:20vw" maxlength='20'></el-input>

              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS4001FORMVIRW_YYFS')" prop="printscore">
                <el-input-number :disabled="!disable" :min="0" :step="1" :max="9999999999" :precision="0"
                                 style="width:20vw"
                                 v-model="form.printscore"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1034VIEW_FILENAME')" prop="filename">
                <el-input v-model="form.filename" :disabled="!disable" style="width:20vw" maxlength='20'></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item :label="$t('label.remarks')" prop="remarks">
              <el-input
                :disabled="!disable"
                type="textarea"
                :rows="3"
                v-model="form.remarks"
                style="width: 72vw">
              </el-input>
            </el-form-item>
          </el-row>
          <el-row>
            <el-table :data="tableD" @selection-change="handleSelectionChange" border
                      header-cell-class-name="sub_bg_color_blue"
                      stripe>
              <el-table-column :label="$t('label.PFANS1032FORMVIEW_CONTRACTNUMBER')" align="center"
                               prop="contractnumber" width="220">
                <template slot-scope="scope">
                  <span>{{scope.row.contractnumber}}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1024VIEW_CONTRACTTYPE')" align="center" prop="contracttype"
                               width="200">
                <template slot-scope="scope">
                  <span>{{scope.row.contracttype}}</span>
                </template>
              </el-table-column>
              <!--              <el-table-column :label="$t('label.PFANS1032FORMVIEW_DEPOSITARY')" align="center" prop="custochinese"-->
              <!--                               width="200">-->
              <!--                <template slot-scope="scope">-->
              <!--                  <span>{{scope.row.custochinese}}</span>-->
              <!--                </template>-->
              <!--              </el-table-column>-->
              <el-table-column :label="$t('label.PFANS1032FORMVIEW_PJNAME')" align="center" prop="pjnamejapanese"
                               v-if="awardable" width="200">
                <template slot-scope="scope">
                  <span>{{scope.row.pjnamejapanese}}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1032FORMVIEW_CLAIMNUMBER')" align="center" prop="claimnumber"
                               v-if="awardable" width="200">
                <template slot-scope="scope">
                  <span>{{scope.row.claimnumber}}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1024VIEW_CLAIMDATE')" align="center" prop="claimdate"
                               v-if="this.form.filetype === 'PC002004'" width="200">
                <template slot-scope="scope">
                  <span>{{scope.row.claimdate}}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1024VIEW_DELIVERYDATE')" align="center" prop="deliverydate"
                               v-if="this.form.filetype === 'PC002005'" width="200">
                <template slot-scope="scope">
                  <span>{{scope.row.deliverydate}}</span>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.operation')" align="center" width="200">
                <template slot-scope="scope">
                  <el-button
                    :disabled="!disable"
                    @click.native.prevent="viewBook(scope.row)"
                    plain
                    size="small"
                    type="primary"
                  >{{$t('button.view')}}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-form>
      </div>
    </EasyNormalContainer>
    <PFANS1032Pop :params="urlparams" ref="PFANS1032Pop" :url="url"></PFANS1032Pop>
    <PFANS1031Pop :params="urlparams" ref="PFANS1031Pop" :url="url"></PFANS1031Pop>
    <PFANS1025Pop :params="urlparams" ref="PFANS1025Pop" :url="url"></PFANS1025Pop>
    <PFANS1047Pop :params="urlparams" ref="PFANS1047Pop" :url="url"></PFANS1047Pop>
  </div>
</template>
<script>
  import PFANS1032Pop from '@/components/EasyPop/PFANS1032Pop';
  import PFANS1031Pop from '@/components/EasyPop/PFANS1031Pop';
  import PFANS1025Pop from '@/components/EasyPop/PFANS1025Pop';
  import PFANS1047Pop from '@/components/EasyPop/PFANS1047Pop';
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import PFANS4001View from '../PFANS4001/PFANS4001View.vue';
  import {Message} from 'element-ui';
  import dicselect from '../../../components/dicselect.vue';
  import user from '../../../components/user.vue';
  import moment from 'moment';
  import {getOrgInfoByUserId, getDictionaryInfo} from '@/utils/customize';

  export default {
    name: 'PFANS4001FormView',
    components: {
      PFANS1032Pop,
      PFANS1031Pop,
      PFANS1025Pop,
      PFANS1047Pop,
      EasyNormalContainer,
      PFANS4001View,
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
        // flowContent: true,
        // flowData: [
        //     {
        //         'No': '1',
        //         'Name': '采购申请',
        //         'Status': 'normal.done',
        //         'url': 'PFANS4001FormView',
        //         'params': {'_id':'a081f533-8872-4d90-8719-8942ce2f568c'}
        //     },
        //     {
        //         'No': '2',
        //         'Name': '合同作成',
        //         'Status': 'normal.doing',
        //         'url': '',
        //         'params': {}
        //     }
        // ],
        checkparmers: 1,
        url: '',
        checkstatus: '',
        urlparams: '',
        centerid: '',
        groupid: '',
        teamid: '',
        awardable: true,
        error: '',
        workflowCode: '',
        tableD: [],
        chgesal: [],
        multipleSelection: [],
        loading: false,
        disable: false,
        dialogTableVisible2: false,
        selectType: 'Single',
        userlist: '',
        title: 'title.PFANS4001FORMVIEW',
        buttonList: [],
        form: {
          usedate: '',
          application_date: new Date(),
          remarks: '',
          client: '',
          sealtype: '',
          filetype: '',
          printscore: '',
          filename: '',
          centerid: '',
          groupid: '',
          teamid: '',
          userid: '',
          bookid: '',

        },
        enableSave: false,
        defaultStart: false,
        code: 'PC002',
        multiple: false,
        code2: 'PC001',
        multiple2: true,
        code3: 'PG017',
        multiple3: false,
        checkdata: [],
        rules: {
          userid: [
            {
              required: true,
              validator: checkuser,
              trigger: 'change',
            },
          ],
          application_date: [{
            required: true,
          },
          ],
          usedate: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.PFANS4001FORMVIEW_YYRQ'),
            trigger: 'change',
          },
          ],
          filename: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS1034VIEW_FILENAME'),
              trigger: 'blur',
            },
          ],
          printscore: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS4001FORMVIRW_YYFS'),
              trigger: 'blur',
            },
          ],
          filetype: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS4001FORMVIRW_WJLX'),
              trigger: 'change',
            },
          ],
          sealtype: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS4001FORMVIRW_YYLX'),
              trigger: 'blur',
            },
          ],
          client: [
            {
              required: true,
              message: this.$t('normal.error_08') + this.$t('label.PFANS4001FORMVIRW_KH'),
              trigger: 'change',
            },
          ],
        },
      };
    },
    mounted() {
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS4001Store/getPfans4001One', {'sealid': this.$route.params._id})
          .then(response => {
            if (response !== undefined) {
              this.form = response;
              if (this.form.userid === '5e78b2264e3b194874180f35') {
                this.workflowCode = 'W0117';
              } else {
                this.workflowCode = 'W0074';//其他
              }
              // add-ws-印章管理下拉多选
              if (this.form.sealtype != '' && this.form.sealtype != null && this.form.sealtype != undefined) {
                let letstaff = this.form.sealtype.split(',');
                this.form.sealtype = letstaff;
              }

              // add-ws-印章管理下拉多选
              let rst = getOrgInfoByUserId(response.userid);
              if (rst) {
                this.centerid = rst.centerNmae;
                this.groupid = rst.groupNmae;
                this.teamid = rst.teamNmae;
              }
              this.userlist = this.form.userid;
              if (this.form.status === '2') {
                this.disable = false;
              }
              //编辑进来去pop中的数据
              if (this.form.bookid !== null && this.form.bookid !== '') {
                let bokid = this.form.bookid.split(',');
                for (let i = 1; i < bokid.length; i++) {
                  if (bokid[0] === '6') {
                    this.pedata(bokid[i]);
                  } else if (bokid[0] === '5') {
                    this.npdata(bokid[i]);
                  } else if (bokid[0] === '7') {
                    this.award(bokid[i]);
                  } else if (bokid[0] === '9') {
                    this.awardable = false;
                    this.award3(bokid[i]);
                  }
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
          let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
          if (rst) {
            this.centerid = rst.centerNmae;
            this.groupid = rst.groupNmae;
            this.teamid = rst.teamNmae;
            this.form.centerid = rst.centerId;
            this.form.groupid = rst.groupId;
            this.form.teamid = rst.teamId;
          }
          this.form.userid = this.$store.getters.userinfo.userid;
        }
      }
    },
    created() {
      if (this.$route.params._disto === "1") {
        this.checkparmers = 0;
      } else {
        this.checkparmers = 1;
      }
      this.disable = this.$route.params.disabled;
      if (this.disable) {
        this.$store.commit('global/SET_WORKFLOWURL', '/PFANS4001View');
        this.buttonList = [
          {
            key: 'save',
            name: 'button.save',
            icon: 'el-icon-check',
          },
        ];
      }
    },
    methods: {
      //add_fjl_添加合同回款相关  start
      viewBook(row) {
        this.url = '';
        this.urlparams = '';
        if (this.form.filetype === 'PC002004') {
          this.url = 'PFANS1032FormView';
          this.urlparams = {'_id': row.petition_id};
          this.$refs.PFANS1032Pop.open = true;
        } else if (this.form.filetype === 'PC002005') {
          this.url = 'PFANS1031FormView';
          this.urlparams = {'_id': row.napalm_id};
          this.$refs.PFANS1031Pop.open = true;
        } else if (this.form.filetype === 'PC002006') {
          this.url = 'PFANS1025FormView';
          this.urlparams = {'_id': row.award_id};
          this.$refs.PFANS1025Pop.open = true;
        } else if (this.form.filetype === 'PC002001') {
          let bokid = this.form.bookid.split(',');
          if (bokid[0] === '9') {
            this.url = 'PFANS1047FormView';
            this.urlparams = {'_id': row.award_id};
            this.$refs.PFANS1047Pop.open = true;
          }
        }
      },
      selectInit(row, index) {
        return moment(row.claimdate).format('YYYY-MM') === new moment().format('YYYY-MM');
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      //add-ws-7/20-禅道任务342
      award(val) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1025Store/selectById', {'award_id': val})
          .then(response => {
            let resp_ = response.award;
            if (resp_ !== null && resp_ !== '' && resp_ !== undefined) {
              this.tableD.push({
                contracttype: getDictionaryInfo(resp_.contracttype).value1,
                businesscode: resp_.businesscode,
                pjnamejapanese: resp_.pjnamejapanese,
                claimnumber: resp_.claimnumber,
                claimdate: moment(resp_.claimdate).format('YYYY-MM-DD'),
                contractnumber: resp_.contractnumber,
                award_id: resp_.award_id,
              });
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
      //add-ws-7/20-禅道任务342

      //add ccm 0724
      award3(val) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1025Store/selectById', {'award_id': val})
          .then(response => {
            let resp_ = response.award;
            if (resp_ !== null && resp_ !== '' && resp_ !== undefined) {
              this.tableD.push({
                contracttype: getDictionaryInfo(resp_.contracttype).value1,
                businesscode: resp_.businesscode,
                pjnamejapanese: resp_.pjnamejapanese,
                claimnumber: resp_.claimnumber,
                claimdate: moment(resp_.claimdate).format('YYYY-MM-DD'),
                contractnumber: resp_.contractnumber,
                award_id: resp_.award_id,
              });
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
      //add ccm 0724

      pedata(val) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1032Store/one', {'petition_id': val})
          .then(response => {
            let resp_ = response;
            if (resp_ !== null && resp_ !== '' && resp_ !== undefined) {
              this.tableD.push({
                contracttype: getDictionaryInfo(resp_.contracttype).value1,
                // custochinese : resp_.custochinese,
                businesscode: resp_.businesscode,
                pjnamejapanese: resp_.pjnamejapanese,
                claimnumber: resp_.claimnumber,
                claimdate: moment(resp_.claimdate).format('YYYY-MM-DD'),
                contractnumber: resp_.contractnumber,
                petition_id: resp_.petition_id,
              });
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
      npdata(val) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1031Store/one', {'napalm_id': val})
          .then(response => {
            let resp_ = response;
            if (resp_ !== null && resp_ !== '' && resp_ !== undefined) {
              this.tableD.push({
                contracttype: getDictionaryInfo(resp_.contracttype).value1,
                businesscode: resp_.businesscode,
                pjnamejapanese: resp_.pjnamejapanese,
                claimnumber: resp_.claimnumber,
                deliverydate: moment(resp_.deliverydate).format('YYYY-MM-DD'),
                contractnumber: resp_.contractnumber,
                napalm_id: resp_.napalm_id,
              });
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
      //add_fjl_添加合同回款相关  end
      setdisabled(val) {
        if (this.$route.params.disabled) {
          this.disabled = val;
        }
      },
      wjlx(value1) {
        this.form.filetype = value1;
      },
      yilx(value2) {
        this.form.sealtype = value2;
      },
      kh(value3) {
        this.form.client = value3;
      },
      getUserids(val) {
        this.form.userid = val;
        this.userlist = val;
        let rst = getOrgInfoByUserId(val);
        if (rst) {
          this.centerid = rst.centerNmae;
          this.groupid = rst.groupNmae;
          this.teamid = rst.teamNmae;
          this.form.centerid = rst.centerId;
          this.form.groupid = rst.groupId;
          this.form.teamid = rst.teamId;
        } else {
          this.centerid = '';
          this.groupid = '';
          this.teamid = '';
          this.form.centerid = '';
          this.form.groupid = '';
          this.form.teamid = '';
        }
        if (!this.form.userid || this.form.userid === '' || val === 'undefined') {
          this.error = this.$t('normal.error_08') + this.$t('label.applicant');
        } else {
          this.error = '';
        }
      },
      workflowState(val) {
        if (val.state === '1') {
          this.form.status = '3';
        } else if (val.state === '2') {
          this.form.status = '4';
        }
        this.checkstatus = 1;
        this.buttonClick2();
      },
      start(val) {
        if (val.state === '0') {
          this.form.status = '2';
        } else if (val.state === '2') {
          this.form.status = '4';
        }
        this.checkstatus = 0;
        this.buttonClick2();
      },
      end() {
        this.form.status = '0';
        this.checkstatus = 1;
        this.buttonClick2();
      },
      buttonClick2() {
        if (this.checkstatus == 1) {
          if (this.form.sealtype != '' && this.form.sealtype != null && this.form.sealtype != undefined) {
            let checktlist = this.form.sealtype.splice(',');
            let checktableD = '';
            for (var m = 0; m < checktlist.length; m++) {
              checktableD = checktableD + checktlist[m] + ',';
            }
            this.form.sealtype = checktableD.substring(0, checktableD.length - 1);
          }
        }
        this.form.userid = this.userlist;
        this.form.sealid = this.$route.params._id;
        this.loading = true;
        this.$store
          .dispatch('PFANS4001Store/updatePfans4001', this.form)
          .then(response => {
            this.data = response;
            this.loading = false;
            if (this.checkparmers === 0) {
              this.$router.push({
                name: 'PFANS8002View',
              });
              this.$emit('changeMenu');
            } else if (this.checkparmers === 1) {
              this.paramsTitle()
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
      },
      paramsTitle() {
        this.$router.push({
          name: 'PFANS4001View',
        });
      },
      //add=ws=8/6-禅道任务388
      checkparamsTitle1() {
        this.$router.push({
          name: 'PFANS1047View',
        });
      },
      checkparamsTitle2() {
        this.$router.push({
          name: 'PFANS1025View',
        });
      },
      checkparamsTitle3() {
        this.$router.push({
          name: 'PFANS1031View',
        });
      },
      checkparamsTitle4() {
        this.$router.push({
          name: 'PFANS1032View',
        });
      },
      //add=ws=8/6-禅道任务388
      buttonClick(val) {
        if (val === 'back') {
          //add=ws=8/6-禅道任务388
          if (this.$route.params.check1 != null && this.$route.params.check1 != '' && this.$route.params.check1 != undefined) {
            if (this.$route.params.check1) {
              this.checkparamsTitle1();
            }
          } else if (this.$route.params.check2 != null && this.$route.params.check2 != '' && this.$route.params.check2 != undefined) {
            if (this.$route.params.check2) {
              this.checkparamsTitle2();
            }
          } else if (this.$route.params.check3 != null && this.$route.params.check3 != '' && this.$route.params.check3 != undefined) {
            if (this.$route.params.check3) {
              this.checkparamsTitle3();
            }
          } else if (this.$route.params.check4 != null && this.$route.params.check4 != '' && this.$route.params.check4 != undefined) {
            if (this.$route.params.check4) {
              this.checkparamsTitle4();
            }
          } else {
            this.paramsTitle();
          }
          //add=ws=8/6-禅道任务388
        } else {
          this.$refs['ruleForm'].validate(valid => {
            if (valid) {
              // add-ws-印章管理下拉多选
              if (this.form.sealtype != '' && this.form.sealtype != null && this.form.sealtype != undefined) {
                let checktlist = this.form.sealtype.splice(',');
                let checktableD = '';
                for (var m = 0; m < checktlist.length; m++) {
                  checktableD = checktableD + checktlist[m] + ',';
                }
                this.form.sealtype = checktableD.substring(0, checktableD.length - 1);
              }
              // add-ws-印章管理下拉多选
              if (this.$route.params._id) {
                this.loading = true;
                this.form.userid = this.userlist;
                this.form.sealid = this.$route.params._id;
                this.$store
                  .dispatch('PFANS4001Store/updatePfans4001', this.form)
                  .then(response => {
                    this.data = response;
                    this.loading = false;
                    if (val !== 'update') {
                      Message({
                        message: this.$t('normal.success_02'),
                        type: 'success',
                        duration: 5 * 1000,
                      });
                    }
                    if (val === 'StartWorkflow') {
                      this.$refs.container.$refs.workflow.startWorkflow();
                    } else {
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
                this.loading = true;
                this.form.userid = this.userlist;
                this.$store
                  .dispatch('PFANS4001Store/createPfans4001', this.form)
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
                message: this.$t('normal.error_12'),
                type: 'error',
                duration: 5 * 1000,
              });
            }
          });
        }

      },
    },
  };
</script>
<style lang="scss">
  .el-form-item__error {
    width: 15rem;
  }
</style>
