<template>
  <div style="min-height: 100%">
    <EasyNormalContainer ref="container" :title="title" @buttonClick="buttonClick" v-loading="loading" :buttonList="buttonList"
                         @workflowState="workflowState" :canStart="canStart" @start="start" @end="end">
      <div slot="customize">
        <el-form :model="form" label-width="8rem" label-position="left" style="padding: 2rem" :rules="rules"
                 ref="refform">
          <el-row>
            <el-col :span="8">
              <el-form-item  :label="$t('label.center')">
                <el-input v-model="form.center_id" :disabled="true" style="width: 11rem" maxlength='36'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.group')">
                <el-input v-model="form.group_id" :disabled="true" style="width: 11rem" maxlength='36'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.team')">
                <el-input v-model="form.team_id" :disabled="true" style="width: 11rem" maxlength='36'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :error="erroruser"  :label="$t('label.applicant')" prop="user_id">
                <user :disabled="!disabled" :error="erroruser" :selectType="selectType" :userlist="userlist"
                      @getUserids="getUserids" style="width: 10.15rem"></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.pfanstype')" prop="type">
                <el-input v-model="form.type" :disabled="disabled" style="width: 11rem" maxlength='20'></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.application_date')" prop="dailypayment" >
                <el-date-picker :disabled="!disabled" type="date" v-model="form.dailypayment" style="width: 11rem" ></el-date-picker>
              </el-form-item>
            </el-col>
              <el-col :span="8">
                <el-form-item :label="$t('label.PFANS1008FORMVIEW_INSIDENUMBER')" prop="extension">
                  <el-input v-model="form.extension" type="textarea" :disabled="!disabled" style="width: 57.7rem"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                  <div class="sub_color_blue" >{{$t('label.PFASN1023FORMVIEW_STOREDDATA')}}</div>
              </el-col>
            </el-row>
          <el-row>
            <el-table :data="tableD" header-cell-class-name="sub_bg_color_grey height">
              <el-table-column :label="$t('label.PFANS2006VIEW_NO')" align="center" fixed prop="content"
                               type="index"></el-table-column>
              <el-table-column :label="$t('label.applicant')" align="center" prop="application" width="175" :error="errorapplication">
                <template slot-scope="scope">
                  <user :disabled="!disabled" :error="errorapplication" :no="scope.row" :selectType="selectType" :userlist="userlist1"
                        @getUserids="getUserids1" style="width: 10.15rem"></user>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS1022FORMVIEW_KIND')" align="center" prop="kind"  width="175">
                <template slot-scope="scope">
                  <dicselect
                    :no="scope.row"
                    :code="code"
                    :data="form.kind"
                    :multiple="multiple"
                    @change="getFbbuilding"
                    style="width: 11rem"
                    :disabled="!disabled">
                  </dicselect>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.カード番号')" align="center" prop="cardnumber"  width="140">
                <template slot-scope="scope">
                  <el-input :disabled="!disabled" maxlength="20" :no="scope.row" v-model="scope.row.cardnumber">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.休日出勤日付')" align="center" prop="attendancedate"  width="140">
                <template slot-scope="scope">
                  <el-date-picker :disabled="!disabled" type="date" :no="scope.row" v-model="scope.row.attendancedate" style="width: 11rem" ></el-date-picker>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.休日出勤理由')" align="center" prop="workreasons"  width="140">
                <template slot-scope="scope">
                  <el-input :disabled="!disabled" maxlength="20" :no="scope.row" v-model="scope.row.workreasons">
                  </el-input>
                </template>
              </el-table-column>
              <el-table-column :label="$t('label.operation')" align="center" width="180">
                <template slot-scope="scope">
                  <el-button
                    :disabled="!disabled"
                    @click.native.prevent="deleteRow(scope.$index, tableD)"
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
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
  import EasyNormalContainer from "@/components/EasyNormalContainer";
  import dicselect from "../../../components/dicselect.vue";
  import user from "../../../components/user.vue";
  import { Message } from 'element-ui'
  import {getOrgInfoByUserId} from '@/utils/customize';
  import org from "../../../components/org";
  import moment from "moment";

  export default {
    name: 'PFANS1022FormView',
    components: {
        EasyNormalContainer,
        getOrgInfoByUserId,
        dicselect,
        user,
        org
    },
    data() {
      var checkuser = (rule, value, callback) => {
        if(!value || value === '' || value ==="undefined"){
          this.erroruser = this.$t('normal.error_09') + this.$t('label.applicant');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.applicant')));
        }else{
          this.erroruser = "";
          return callback();
        }

      };
      return {
          baseInfo: {},
          radio: 1,
          userlist: "",
          userlist1: "",
          loading: false,
          erroruser: '',
          errorapplication: '',
          selectType: "Single",
          title: 'title.PFANS1022VIEW',
          buttonList: [],
          multiple: false,
        form: {
            center_id: '',
            group_id: '',
            team_id: '',
            user_id: '',
            type: this.$t('menu.PFANS1022'),
            dailypayment: moment(new Date()).format("YYYY-MM-DD"),
            extension: '',
        },
          tableD: [
              {
                  holidaydetailid: '',
                  holidayid: '',
                  application:'',
                  kind:'',
                  cardnumber:'',
                  attendancedate: moment(new Date()).format("YYYY-MM-DD"),
                  workreasons:'',
                  startdate: moment(new Date()).format("YYYY-MM-DD"),
                  enddate: moment(new Date()).format("YYYY-MM-DD"),
              },
          ],
          code: 'PJ028',
          disabled: false,
          menuList: [],
        rules: {
          user_id: [
            {
              required: true,
              validator: checkuser,
              trigger: 'change'
            },
          ],
            machinemedia: [
                {
                    required: true,
                    message: this.$t('normal.error_08') + this.$t('label.PFASN1023FORMVIEW_MACHINEMEDIA'),
                    trigger: 'change'
                },
            ],
            management: [
                {
                    required: true,
                    message: this.$t('normal.error_08') + this.$t('label.PFASN1023FORMVIEW_MANAGEMENT'),
                    trigger: 'change'
                },
            ],
            compatibleseal: [
                {
                    required: true,
                    message: this.$t('normal.error_08') + this.$t('label.PFASN1023FORMVIEW_COMPATIBLESEAL'),
                    trigger: 'change'
                },
            ],
            application: [
                {
                    required: true,
                    message: this.$t('normal.error_09') + this.$t('label.application_date'),
                    trigger: 'change'
                },
            ],
            exportdate: [
                {
                    required: true,
                    message: this.$t('normal.error_08') + this.$t('label.PFASN1023FORMVIEW_EXPORTDATE'),
                    trigger: 'change'
                },
            ],
            returndate: [
                {
                    required: true,
                    message: this.$t('normal.error_08') + this.$t('label.PFASN1023FORMVIEW_RETURNDATE'),
                    trigger: 'change'
                },
            ],
            holdingplace: [
                {
                    required: true,
                    message: this.$t('normal.error_08') + this.$t('label.PFASN1023FORMVIEW_HOLDINGPLACE'),
                    trigger: 'change'
                },
            ],
            holdoutreason: [
                {
                    required: true,
                    message: this.$t('normal.error_08') + this.$t('label.PFASN1023FORMVIEW_HOLDOUTREASON'),
                    trigger: 'change'
                },
            ],
        },
          canStart:false,
      };
    },

    mounted() {
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS1022Store/selectById', {"holidayid": this.$route.params._id})
          .then(response => {
            this.form = response;
            this.userlist = this.form.user_id;
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
            key: "save",
            name: "button.save",
            disabled: false,
            icon: "el-icon-check"
          }
        ];
      }
    },
    methods: {
      getUserids(val) {
        this.userlist = val;
        this.form.user_id = val;
        let lst = getOrgInfoByUserId(val);
        this.form.center_id = lst.centerNmae;
        this.form.group_id = lst.groupNmae;
        this.form.team_id = lst.teamNmae;
        if (!this.form.user_id || this.form.user_id === '' || val === "undefined") {
          this.erroruser = this.$t('normal.error_09') + this.$t('label.applicant');
        } else {
          this.erroruser = "";
        }
      },
        getUserids1(val,row) {
            this.userlist1 = val;
            row.application = val;
            if (!this.form.application || this.form.application === '' || val === "undefined") {
                this.errorapplication = this.$t('normal.error_09') + this.$t('label.applicant');
            } else {
                this.errorapplication = "";
            }
        },
        getMachinemedia(val) {
            this.form.machinemedia = val;
      },
        getCompatibleseal(val){
            this.form.compatibleseal = val;
        },
        getFabuilding(val) {
            this.form.fabuilding = val;
      },
        getSubtype(val) {
            this.form.subtype = val;
        },
        getFbbuilding(val) {
            this.form.fbbuilding = val;
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
        deleteRow(index, rows) {
            if (rows.length > 1) {
                rows.splice(index, 1);
            }
        },
        addRow() {
            this.tableD.push({
                holidaydetailid: '',
                holidayid: '',
                application:'',
                kind:'',
                cardnumber:'',
                attendancedate: moment(new Date()).format("YYYY-MM-DD"),
                workreasons:'',
                startdate: moment(new Date()).format("YYYY-MM-DD"),
                enddate: moment(new Date()).format("YYYY-MM-DD"),
            });
        },
      buttonClick(val) {
          this.$refs["refform"].validate(valid => {
            if (valid) {
              this.loading = true;
              this.baseInfo = {};
              this.baseInfo.holiday = JSON.parse(JSON.stringify(this.form));
              this.baseInfo.holidaydetail = [];
                for (let i = 0; i < this.tableD.length; i++) {
                    if (this.tableD[i].application !== '' || this.tableD[i].kind !== '' || this.tableD[i].cardnumber !== '' ||
                        this.tableD[i].attendancedate !== '' || this.tableD[i].workreasons !== '' || this.tableD[i].startdate !== ''
                        || this.tableD[i].enddate !== '') {
                        this.baseInfo.notification.push(
                            {
                                holidaydetailid: this.tableD[i].holidaydetailid,
                                holidayid: this.tableD[i].holidayid,
                                application: this.tableD[i].application,
                                kind: this.tableD[i].kind,
                                cardnumber: this.tableD[i].cardnumber,
                                attendancedate: this.tableD[i].attendancedate,
                                workreasons: this.tableD[i].workreasons,
                                startdate: this.tableD[i].startdate,
                                enddate: this.tableD[i].enddate,
                            },
                        );
                    }
                }
              if (this.$route.params._id) {
                this.form.holidayid = this.$route.params._id;
                this.$store
                  .dispatch('PFANS1022Store/updateHoliday', this.baseInfo)
                  .then(response => {
                    this.data = response;
                    this.loading = false;
                      if(val !== "update") {
                          Message({
                              message: this.$t("normal.success_02"),
                              type: 'success',
                              duration: 5 * 1000
                          });
                      }
                  })
                  .catch(error => {
                    Message({
                      message: error,
                      type: 'error',
                      duration: 5 * 1000
                    });
                    this.loading = false;
                  })

              } else {
                this.$store
                  .dispatch('PFANS1022Store/createHoliday', this.baseInfo)
                  .then(response => {
                    this.data = response;
                    this.loading = false;
                    Message({
                      message: this.$t("normal.success_01"),
                      type: 'success',
                      duration: 5 * 1000
                    });
                  })
                  .catch(error => {
                    Message({
                      message: error,
                      type: 'error',
                      duration: 5 * 1000
                    });
                    this.loading = false;
                  })
              }
            }
          });
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
