<template>
  <div style="min-height: 100%">`
    <EasyNormalContainer :buttonList="buttonList" :title="title" @buttonClick="buttonClick" ref="container"
                         @workflowState="workflowState"  v-loading="loading"
                         :canStart="canStart" @start="start" @end="end">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="left" label-width="8rem" ref="refform"
                 style="padding:2rem">
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.center')">
                <el-input :disabled="true" style="width:11rem" v-model="form.center_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')">
                <el-input :disabled="true" style="width:11rem" v-model="form.group_id"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')">
                <el-input :disabled="true" style="width:11rem" v-model="form.team_id"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.applicant')" prop="user_id">
                <user :disabled="!disable"
                      :error="error"
                      :selectType="selectType"
                      :userlist="userlist"
                      @getUserids="getUserids"
                      style="width: 9.2rem"
                      v-model="form.user_id"
                ></user></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.pfanstype')">
                <el-input :disabled="!disable"
                          style="width:11rem"
                          v-model="form.type"
                ></el-input></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1016FORMVIEW_TYPESOF')" >
                <dicselect :code="code1"
                           :data="form.typesof"
                           :disabled="!disable"
                           :multiple="multiple"
                           @change="changesubtype"
                           style="width: 11rem">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
<!--         操作種類:   -->
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1016FORMVIEW_OPERATIONTYPE')">
                <el-input :disabled="!disable"
                          style="width: 11rem"
                          v-model="form.operationtype"
                          maxlength="11"
                ></el-input></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.application')">
                <el-date-picker :disabled="!disable"
                                style="width:11rem"
                                type="date"
                                v-model="form.payment"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.email')" prop="email">
                <el-input :disabled="!disable"
                          maxlength="20"
                          style="width: 11rem"
                          v-model="form.email"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS3001VIEW_EXTENSIONNUMBER')" prop="extension">
                <el-input :disabled="!disable"
                          style="width: 11rem"
                          v-model="form.extension"
                          maxlength="20"
                ></el-input></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS1016FORMVIEW_MANAGER')" >
                <dicselect :code="code"
                           :data="form.manager"
                           :disabled="!disable"
                           :multiple="multiple"
                           @change="changeidtype"
                           style="width: 11rem">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANSUSERFORMVIEW_PERIOD')" prop="duringdate">
              <el-date-picker
                v-model="duringdate"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期 "
                end-placeholder="结束日期"
                :picker-options="pickerOptions">
              </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
                <el-form-item :label="$t('label.PFANS1016FORMVIEW_REASON')" prop="reason">
                  <el-input :disabled="!disable" :rows="2" type="textarea" style="width:57.1rem" v-model="form.reason">
                  </el-input>
                </el-form-item>
            </el-col>
          </el-row>



          <!---->
          <el-row style="padding-top:1.5rem" >
            <el-table :data="tableT" header-cell-class-name="sub_bg_color_grey height" style="width: 1040px">
              <el-table-column :label="$t('label.PFANS1016FORMVIEW_sourceipgroup')" align="center"  width="150">
                <template slot-scope="scope">
                  <dicselect
                    :code="code"
                    :data="form.sourceipgroup"
                    :disabled="!disable"
                    :multiple="multiple"
                    @change="changesourceipgroup"
                    style="width: 100%"
                  ></dicselect>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1016FORMVIEW_SOURCEIPADDRESS')" align="center"  width="150">
                <template slot-scope="scope">
                  <dicselect
                    :code="code"
                    :data="form.sourceipaddress"
                    :disabled="!disable"
                    :multiple="multiple"
                    @change="changesourceipgroup"
                    style="width: 100%"
                  ></dicselect>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1016FORMVIEW_COMMUNICATION')" align="center"  width="150">
                <template slot-scope="scope">
                  <dicselect
                    :code="code"
                    :data="form.communication"
                    :disabled="!disable"
                    :multiple="multiple"
                    @change="changesourceipgroup"
                    style="width: 100%"
                  ></dicselect>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1016FORMVIEW_DESTINATIONIPGROUP')" align="center"  width="150">
                <template slot-scope="scope">
                  <dicselect
                    :code="code"
                    :data="form.destinationipgroup"
                    :disabled="!disable"
                    :multiple="multiple"
                    @change="changesourceipgroup"
                    style="width: 100%"
                  ></dicselect>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1016FORMVIEW_DESTINATIONIPADDRESS')" align="center"  width="150">
                <template slot-scope="scope">
                  <dicselect
                    :code="code"
                    :data="form.destinationipaddress"
                    :disabled="!disable"
                    :multiple="multiple"
                    @change="changesourceipgroup"
                    style="width: 100%"
                  ></dicselect>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1016FORMVIEW_PROTOCOL')" align="center"  width="160">
                <template slot-scope="scope">
                  <dicselect
                    :code="code"
                    :data="form.protocol"
                    :disabled="!disable"
                    :multiple="multiple"
                    @change="changesourceipgroup"
                    style="width: 100%"
                  ></dicselect>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.operation')" align="center" width="150">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="deleteRow1(scope.$index, tableT)"
                    type="danger"
                    size="small"
                    plain
                    :disabled="!disable"
                  >{{$t('button.delete')}}
                  </el-button>
                  <el-button
                    @click="addRow1()"
                    type="primary"
                    size="small"
                    plain
                    :disabled="!disable"
                  >{{$t('button.insert')}}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <!---->

        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>
<script>
  import EasyNormalContainer from "@/components/EasyNormalContainer";
  import dicselect from "../../../components/dicselect.vue";
  import {Message} from 'element-ui'
  import user from "../../../components/user.vue";
  import {getOrgInfoByUserId} from '@/utils/customize'
  import {telephoneNumber,validateEmail} from '@/utils/validate';
  import moment from "moment";

  export default {
    name: 'PFANS1016FormView',
    components: {
      EasyNormalContainer,
      dicselect,
      user
    },
    data() {
      var checkemail = (rule, value, callback) => {
        if (this.form.email !== null && this.form.email !== '') {
          if (!validateEmail(value)) {
            callback(new Error(this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.email')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      var validateTel = (rule, value, callback) => {
        if (this.form.extension !== null && this.form.extension !== '') {
          if (telephoneNumber(value)) {
            callback(new Error(this.$t('normal.error_08') + this.$t('label.effective') + this.$t('label.PFANS3001VIEW_EXTENSIONNUMBER')));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      return {
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        duringdate: '',
        multiple: false,
        selectType: "Single",
        error: '',
        title: "title.PFANS1016VIEW",
        tabIndex: 0,
        form: {
          center_id: '',
          group_id: '',
          team_id: '',
          user_id: '',
          type: '',
          typesof: '',
          operationtype: '',
          payment: moment(new Date()).format("YYYY-MM-DD"),
          email: '',
          extension: '',
          manager: '',
          reason: '',
        },
        tableT: [{
          sourceipgroup: '',
          sourceipaddress: '',
          communication: '',
          destinationipgroup: '',
          destinationipaddress: '',
          protocol: '',
        }],
        disabled: false,
        rules: {
          email: [{
            required: true,
            message: this.$t("normal.error_08") + this.$t("label.email"),
            trigger: "blur"
          },
            {validator: checkemail, trigger: 'blur'}],
          extension: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS3001VIEW_EXTENSIONNUMBER'),
            trigger: "blur"
          },
            {validator: validateTel, trigger: 'blur'}],
          reason: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANS1016FORMVIEW_REASON'),
            trigger: "blur"
          }],
          duringdate: [{
            required: true,
            message: this.$t('normal.error_08') + this.$t('label.PFANSUSERFORMVIEW_PERIOD'),
            trigger: "change"
          }],
        },
        canStart: false,
      };
    },
    created() {
      this.disable = this.$route.params.disabled;
      if (this.disable) {
        this.buttonList = [
          {
            key: "save",
            name: "button.save",
            icon: "el-icon-check"
          }
        ];
      }
    },
    mounted() {
      if (this.$route.params._id) {
        this.loading = true
        this.$store
          .dispatch('PFANS1016Store/getRoutingOne', {"routing_id": this.$route.params._id})
          .then(response => {
            this.form = response;
            this.userlist = this.form.user_id;
            if (this.form.status === '2') {
              this.disable = false;
            }
            let lettableT = [];
            let letroutingdetail_id = response.reason.split(";");
            if (letreason.length > 0) {
              for (var i = 0; i <= letreason.length - 1; i++) {
                let letuser = letreason[i].split(",");
                lettableT.push({
                  user: letuser[0],
                  reason: letuser[1]
                })
              }
            }
            this.tableT = lettableT;
            this.totaldata = lettableT;
            this.getList();
            this.tableP = lettableP;
            this.totaldatatwo = lettableP;
            this.getTwo();
            this.form = response;






            this.loading = false;
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000
            });
            this.loading = false
          })
      } else {
        this.userlist = this.$store.getters.userinfo.userid;
        if (this.userlist !== null && this.userlist !== '') {
          this.form.user_id = this.$store.getters.userinfo.userid;
          let lst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
          this.form.center_id = lst.centerNmae;
          this.form.group_id = lst.groupNmae;
          this.form.team_id = lst.teamNmae;
        }
      }
    },
    methods: {
      getUserids(val) {
        this.form.user_id = val;
        let lst = getOrgInfoByUserId(val);
        this.form.center_id = lst.centerNmae;
        this.form.group_id = lst.groupNmae;
        this.form.team_id = lst.teamNmae;
        if (!this.form.user_id || this.form.user_id === '' || val === "undefined") {
          this.error = this.$t('normal.error_08') + this.$t('label.applicant');
        } else {
          this.error = "";
        }
      },
      workflowState(val) {
        if (val.state === '1') {
          this.form.status = '3';
        } else if (val.state === '2') {
          this.form.status = '4';
        }
        this.buttonClick("update");
      },
      start() {
        this.form.status = '2';
        this.buttonClick("update");
      },
      end() {
        this.form.status = '0';
        this.buttonClick("update");
      },
      // paramsTitle(){
      //     this.$router.push({
      //         name: 'PFANS1001FormView',
      //         params: {
      //             title: 6,
      //         },
      //     });
      // },
      buttonClick(val) {
        if (val === 'back') {
          this.paramsTitle();
        } else {
          this.$refs["refform"].validate(valid => {
            if (valid) {
              this.loading = true
              if (this.$route.params._id) {
                this.form.routing_id = this.$route.params._id;
                this.$store
                  .dispatch('PFANS1016Store/updateRouting', this.form)
                  .then(response => {
                  this.data = response;
                  this.loading = false
                  if(val !== "update"){
                    Message({
                      message: this.$t("normal.success_02"),
                      type: 'success',
                      duration: 5 * 1000
                    });
                    if (this.$store.getters.historyUrl) {
                      this.$router.push(this.$store.getters.historyUrl);
                    }
                  }
                })
                  .catch(error => {
                    Message({
                      message: error,
                      type: 'error',
                      duration: 5 * 1000
                    });
                    this.loading = false
                  })
              } else {
                this.loading = true
                this.$store
                  .dispatch('PFANS1016Store/createRouting', this.form)
                  .then(response => {
                    this.data = response;
                    this.loading = false
                    Message({
                      message: this.$t("normal.success_01"),
                      type: 'success',
                      duration: 5 * 1000
                    });
                    if (this.$store.getters.historyUrl) {
                      this.$router.push(this.$store.getters.historyUrl);
                    }
                  })
                  .catch(error => {
                    Message({
                      message: error,
                      type: 'error',
                      duration: 5 * 1000
                    });
                    this.loading = false
                  })
              }
            }
          });
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
