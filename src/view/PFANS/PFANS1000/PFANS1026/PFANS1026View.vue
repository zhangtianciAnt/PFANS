<template>
  <div>
  <EasyNormalTable :title="title" :columns="columns" :data="data" :rowid="row" :buttonList="buttonList" @reget="load"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading" :showSelectBySearch="false">
<!--    检索画面样式调整并取消共通检索 ztc-->
    <el-form slot="search" label-position="top" label-width="8vw">
      <el-row>
        <el-col :span="5">
          <el-form-item :label="$t('label.PFANS1024VIEW_CONTRACTNUMBER')">
            <el-input v-model="retral.contractnumber" clearable style="width: 80%"/>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="$t('label.applicant')">
            <user :disabled="false" :selectType="selectType" :userlist="userlist"
                  style="width: 67%" @getUserids="getUserids"></user>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :label="$t('label.department')">
            <org :orglist="retral.group_id"
                 orgtype="4"
                 style="width: 90%"
                 @getOrgids="getGroupId"
            ></org>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item :label="$t('label.PFANS1024VIEW_CONTRACTTYPE')">
            <dicselect
              :data="retral.contracttype"
              code="HT008"
              style="width: 14vw"
              @change="changeType"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </EasyNormalTable>
    <el-container>
      <el-dialog center
                 :visible.sync="dialogVisible"
                 :title="$t('button.carryforward')"
                 width="22%">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="form" style="padding: 0.1vw;margin-top: -2vw">
          <el-row>
            <div style=
                   "font-family: Helvetica Neue;color: #005BAA;font-size: 0.8rem;font-weight: bold;margin-left: -1vw">{{$t('label.PFANS3005VIEW_OLDORGANIZATION')}}</div>
          </el-row>
          <el-row>
            <el-col :span="15" style="margin-left: 2vw">
              <el-form-item :label="$t('label.center')">
                <el-input :disabled="true" style="width:17vw" v-model="department"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <div style=
                   "font-family: Helvetica Neue;color: #005BAA;font-size: 0.8rem;font-weight: bold;margin-left: -1vw">{{$t('label.PFANS3005VIEW_NEWORGANIZATION')}}</div>
          </el-row>
          <el-row>
            <el-col :span="15" style="margin-left: 2vw; margin-bottom: -1vw;">
              <el-form-item :label="$t('label.center')" prop="new_center_id"
                            :error="error_center">
                <org :orglist="form.new_center_id"
                     orgtype="4"
                     style="width: 17vw"
                     @getOrgids="getCenterid"
                     :error="error_center"
                ></org>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submit">{{$t('button.confirm')}}</el-button>
          </span>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
import EasyNormalTable from "@/components/EasyNormalTable";
import {Message} from 'element-ui'
import moment from "moment";
import {getDictionaryInfo, getOrgInfo, getStatus, getUserInfo, getMonthlyrateInfo} from '@/utils/customize';
import org from '@/view/components/org';
import dicselect from "../../../components/dicselect";
import user from "../../../components/user";

export default {
  name: 'PFANS1026View',
  components: {
    EasyNormalTable,
    dicselect,
    org,
    user,
  },
  data() {
      var centerId = (rule, value, callback) => {
        if (!this.form.new_center_id || this.form.new_center_id === '') {
          callback(new Error(this.$t('normal.error_08') + this.$t('label.center')));
          this.error_center = this.$t('normal.error_08') + this.$t('label.center');
        } else {
          callback();
        }
      };
      return {
        loading: false,
        title: "title.PFANS1026VIEW",
        contractnumbercount: '',
        data: [],
        groupid: '',
        department: '',
        maketype: '',
        error_group: '',
        error_center: '',
        userlist: '',
        selectType: 'Single',
        rows: {},
        rules: {
          new_center_id: [
            {
              required: true,
              validator: centerId,
              trigger: 'blur',
            }
          ],
        },
        form: {
          last_center_id: '',
          last_group_id: '',
          last_team_id: '',
          new_center_id: '',
          new_group_id: '',
          new_team_id: '',
          org: '',
        },
        retral: {
          contractnumber: '',
          user_id: '',
          group_id: '',
          contracttype: '',
          type: '1',
        },
        columns: [
          {
            code: 'user_id',
            label: 'label.applicant',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'deployment',
            label: 'label.department',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'contractnumber',
            label: 'label.PFANS1024VIEW_CONTRACTNUMBER',
            width: 140,
            fix: false,
            filter: false,
          },
          {
            code: 'contracttype',
            label: 'label.PFANS1024VIEW_CONTRACTTYPE',
            width: 120,
            fix: false,
            filter: true,
          },
          //add-ws-6/16-禅道任务135和057
          {
            code: 'entrycondition',
            label: 'label.PFANS1024VIEW_ENTRYCONDITION',
            width: 140,
            fix: false,
            filter: true,
          },
          //add-ws-6/16-禅道任务135和057
          //
          {
            code: 'custochinese',
            label: 'label.PFANS1010FORMVIEW_COMPANYNAME',
            width: 300,
            fix: false,
            filter: true,
          },
          {
            code: 'businesscode',
            label: 'label.PFANS1024VIEW_BUSINESSCODE',
            width: 140,
            fix: false,
            filter: true,
          },
          {
            code: 'currencyposition',
            label: 'label.PFANS1024VIEW_CURRENCYPOSITION',
            width: 140,
            fix: false,
            filter: false,
          },
          {
            code: 'claimamount',
            label: 'label.PFANS1024VIEW_CLAIMAMOUNT',
            width: 140,
            fix: false,
            filter: false,
          },
          //
          {
            code: 'applicationdate',
            label: 'label.PFANS1024VIEW_APPLICATIONDATE',
            width: 120,
            fix: false,
            filter: true,
          },
          // 禅道70 start
          {
            code: 'getprojectnumber',
            label: 'label.PFANS5004VIEW_PROJECTNUMBER',
            width: 280,
            fix: false,
            filter: false,
          },
          {
            code: 'conchinese',
            label: 'label.PFANS6007VIEW_PJNAME',
            width: 280,
            fix: false,
            filter: false,
          },
          // 禅道70 end
          {
            code: 'state',
            label: 'label.PFANS1024VIEW_STATE',
            width: 120,
            fix: false,
            filter: true,
          }
        ],
        buttonList: [],
        buttonListAnt: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
          {'key': 'carryforward', 'name': 'button.carryforward', 'disabled': false, 'icon': 'el-icon-edit'},
          // 添加筛选条件 ztc fr
          {
            key: 'search',
            name: 'button.search',
            disabled: false,
            icon: 'el-icon-search'
          },
        ],
        buttonListOld: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
          // 添加筛选条件 ztc fr
          {
            key: 'search',
            name: 'button.search',
            disabled: false,
            icon: 'el-icon-search'
          },
        ],
        rowid: '',
        contractnumber: '',
        mounth: '',
        date: '',
        state: '',
        row: 'contractnumber',//update   ml   20210716   主键改为合同号
        dialogVisible: false
      };
    },
    mounted() {
      this.load();
      this.getdateInfo();
    },
    methods: {
      getdateInfo() {
        this.mounth = new Date().getMonth() + 1;
        this.date = new Date().getDate();
        if (this.mounth === 4 && this.date >= 10 && this.date <= 30) {
          this.buttonList = this.buttonListAnt;
        } else {
          this.buttonList = this.buttonListOld;
        }
      },
      getUserids(val) {
        this.userlist = val;
        this.retral.user_id = val;
      },
      getGroupId(val) {
        this.retral.group_id = val;
      },
      changeType(val) {
        this.retral.contracttype = val;
      },
      load() {
        this.loading = true;
        this.$store
          .dispatch('PFANS1026Store/getCotSearch', this.retral)
          .then(response => {
            for (let i = 0; i < response.length; i++) {
              //add-ws-6/16-禅道任务135和057
              if (response[i].entrycondition !== null && response[i].entrycondition !== '') {
                let letbudge = getDictionaryInfo(response[i].entrycondition);
                if (letbudge) {
                  response[i].entrycondition = letbudge.value1;
                }
              }
              //add-ws-6/16-禅道任务135和057
              if (response[i].currencyposition !== null && response[i].currencyposition !== '') {
                let letcurrencyposition = getMonthlyrateInfo(response[i].currencyposition);
                if (letcurrencyposition) {
                  response[i].currencyposition = letcurrencyposition.currencyname;
                }
              }
              response[i].status = getStatus(response[i].status);
              let user = getUserInfo(response[i].user_id);
              if (user) {
                response[i].user_id = getUserInfo(response[i].user_id).userinfo.customername;
              }
              if (response[i].applicationdate !== null && response[i].applicationdate !== "") {
                response[i].applicationdate = moment(response[i].applicationdate).format("YYYY-MM-DD");
              }
              if (response[i].contracttype !== null && response[i].contracttype !== "") {
                let letContracttype = getDictionaryInfo(response[i].contracttype);
                if (letContracttype != null) {
                  response[i].contracttype = letContracttype.value1;
                }
              }
              if (response[i].state === '1' && this.$i18n) {
                response[i].state = this.$t("label.PFANS8008FORMVIEW_EFFECTIVE");
              } else if (response[i].state === '0' && this.$i18n) {
                response[i].state = this.$t("label.PFANS8008FORMVIEW_INVALID");
              }
            }
            this.data = response;
            // let letcontractnumber = [];
            // let tabledata = response.contractapplication;
            // for (let i = 0; i < tabledata.length; i++) {
            //   //add-ws-6/16-禅道任务135和057
            //   if (tabledata[i].entrycondition !== null && tabledata[i].entrycondition !== '') {
            //     let letbudge = getDictionaryInfo(tabledata[i].entrycondition);
            //     if (letbudge) {
            //       tabledata[i].entrycondition = letbudge.value1;
            //     }
            //   }
            //   //add-ws-6/16-禅道任务135和057
            //   if (tabledata[i].currencyposition !== null && tabledata[i].currencyposition !== '') {
            //     let letcurrencyposition = getMonthlyrateInfo(tabledata[i].currencyposition);
            //     if (letcurrencyposition) {
            //       tabledata[i].currencyposition = letcurrencyposition.currencyname;
            //     }
            //   }
            //   tabledata[i].status = getStatus(tabledata[i].status);
            //   let user = getUserInfo(tabledata[i].user_id);
            //   if (user) {
            //     tabledata[i].user_id = getUserInfo(tabledata[i].user_id).userinfo.customername;
            //   }
            //   if (tabledata[i].applicationdate !== null && tabledata[i].applicationdate !== "") {
            //     tabledata[i].applicationdate = moment(tabledata[i].applicationdate).format("YYYY-MM-DD");
            //   }
            //   if (tabledata[i].contracttype !== null && tabledata[i].contracttype !== "") {
            //     let letContracttype = getDictionaryInfo(tabledata[i].contracttype);
            //     if (letContracttype != null) {
            //       tabledata[i].contracttype = letContracttype.value1;
            //     }
            //   }
            //   if (tabledata[i].contractnumber != "") {
            //     letcontractnumber.push(tabledata[i].contractnumber);
            //   }
            //   if (tabledata[i].state === '1' && this.$i18n) {
            //     tabledata[i].state = this.$t("label.PFANS8008FORMVIEW_EFFECTIVE");
            //   } else if (tabledata[i].state === '0' && this.$i18n) {
            //     tabledata[i].state = this.$t("label.PFANS8008FORMVIEW_INVALID");
            //   }
            // }
            // var arr = new Array();
            // this.data = [];
            // let o;
            // for (var i = 0; i < letcontractnumber.length; i++) {
            //   if (arr.indexOf(letcontractnumber[i]) == -1) {
            //     arr.push(letcontractnumber[i]);
            //     o = Object.assign([], tabledata[i]);
            //     this.data.push(o);
            //   }
            // }
            // this.contractnumbercount = (letcontractnumber.length + 1);
            this.loading = false;
          })
          .catch(error => {
            this.$message.error({
              message: error,
              type: 'error',
              duration: 5 * 1000
            });
            this.loading = false
          })
      },
      rowClick(row) {
        this.contractnumber = row.contractnumber;
        this.state = row.state;
        this.rows = row;
        this.groupid = row.group_id;
        this.department = row.deployment;
      },
      getCenterid(val){
        this.form.new_center_id = val
      },
      setOrg(val) {
        this.form.org = val;
      },
      //update   ml   20210716   主键判断改为合同号判断  from
      buttonClick(val) {
        this.$store.commit('global/SET_HISTORYURL', this.$route.path);
        if (val === 'update') {
          if (this.contractnumber === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000
            });
            return;
          }
          //region scc add 一览获取数据状态到详细 from
          let status = '';
          if(this.rows.status === '未开始'){
            status = '0';
          }else if(this.rows.status === '驳回'){
            status = '3';
          }
          //endregion scc add 一览获取数据状态到详细 to
          this.$router.push({
            name: 'PFANS1026FormView',
            params: {
              _id: this.contractnumber,
              contractnumbercount: this.contractnumbercount,
              state: this.state,
              disabled: true,
              _status: status,
            }
          })
        }
        if(val === 'carryforward'){
          if (this.contractnumber === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.dialogVisible = true;
          this.form.new_center_id= '';
        }
        if (val === 'view') {
          if (this.contractnumber === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000
            });
            return;
          }
          this.$router.push({
            name: 'PFANS1026FormView',
            params: {
              _id: this.contractnumber,
                state: this.state,
              disabled: false
            }
          })
        }
        if (val === 'insert') {
          this.$router.push({
            name: 'PFANS1026FormView',
            params: {
              _id: '',
              contractnumbercount: this.contractnumbercount,
              disabled: true
            }
          })
        }
        // 添加筛选条件 ztc fr
        if (val === 'search') {
          this.load();
        }
        // 添加筛选条件 ztc to
      },
      //update   ml   20210716   主键判断改为合同号判断  to
      submit(){
        this.loading = true;
        this.$refs['form'].validate(valid =>{
          if(valid){
            let parameter = {
              group_id: this.form.new_center_id,
              contractapplication_id:this.rowid,
            };
            this.$store
              .dispatch('PFANS1026Store/dataCarryover', parameter)
              .then(response => {
                this.load();
                Message({
                  message: this.$t('normal.success_07'),
                  type: 'success',
                  duration: 5 * 1000,
                });
                this.dialogVisible = false;
                this.form.new_center_id= '';
                // this.form.new_group_id='';
                // this.form.new_team_id= '';
              })
          }else{
            Message({
              message: this.$t('normal.error_12'),
              type: 'error',
              duration: 5 * 1000,
            });
          }
        });
        this.loading = false;
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
