<template>
  <div>
    <EasyNormalTable :buttonList="buttonList"
                     :columns="columns"
                     :data="data"
                     :title="title"
                     :rowid="row_id"
                     @buttonClick="buttonClick"
                     @rowClick="rowClick"
                     v-loading="loading">
      <el-form slot="search" label-position="top" label-width="8vw">
        <el-row>
          <el-col :span="5">
            <el-form-item :label="$t('label.PFANS1024VIEW_CONTRACTNUMBER')">
              <el-input v-model="retral.contractnumber" clearable style="width: 80%"/>
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
          <el-col :span="6">
            <el-form-item :label="$t('label.department')">
              <org :orglist="retral.group_id"
                   orgtype="4"
                   style="width: 90%"
                   @getOrgids="getGroupId"
              ></org>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item :label="$t('label.PFANS1025VIEW_ENTRUST')">
              <el-input v-model="retral.custochinese" clearable style="width: 80%"/>
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
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {getDictionaryInfo, getStatus,getMonthlyrateInfo} from '@/utils/customize';
  import {Message} from 'element-ui';
  let moment = require('moment');
  import org from '@/view/components/org';
  import dicselect from "../../../components/dicselect";

  export default {
    name: 'PFANS1025View',
    components: {
      EasyNormalTable,
      dicselect,
      org,
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
        title: 'title.PFANS1025VIEW',
        data: [],
        groupid: '',
        department: '',
        maketype: '',
        checkdata: [],
        error_group: '',
        error_center: '',
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
          contracttype: '',
          group_id: '',
          custochinese: '',
          type: '1',
        },
        columns: [
          {
            code: 'contractnumber',
            label: 'label.PFANS1024VIEW_CONTRACTNUMBER',
            width: 150,
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
          {
            code: 'custochinese',
            label: 'label.PFANS1025VIEW_ENTRUST',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'deployment',
            label: 'label.PFANS1024VIEW_DEPLOYMENT',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'pjnamechinese',
            label: 'label.PFANS1025VIEW_PJNAME',
            width: 120,
            fix: false,
            filter: false,
          },
          {
            code: 'claimdatetime',
            label: 'label.PFANS1024VIEW_DELIVERYDATE',
            width: 150,
            fix: false,
            filter: false,
          },
          {
            code: 'currencyposition',
            label: 'label.PFANS1025VIEW_CURRENCYFORMAT',
            width: 120,
            fix: false,
            filter: false,
          },
          {
            code: 'claimamount',
            label: 'label.PFANS1024VIEW_CLAIMAMOUNT',
            width: 120,
            fix: false,
            filter: false,
          },
          {
            code: 'status',
            label: 'label.approval_status',
            width: 120,
            fix: false,
            filter: true
          },
          //add-ws-4/17-添加审批时间
          {
            code: 'modifyon',
            label: 'label.PFANS1030FORMVIEW_TIEEEND',
            width: 150,
            fix: false,
            filter: true,
          },
          //add-ws-4/17-添加审批时间
        ],
        buttonList: [],
        buttonListAnt: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
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
        mounth: '',
        date: '',
        row_id: 'award_id',
        dialogVisible: false,
        pjnameflg: [],
      };
    },
    mounted() {
      this.getPjanme();
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
      getGroupId(val) {
        this.retral.group_id = val;
      },
      changeType(val) {
        this.retral.contracttype = val;
      },
      getPjanme() {
        this.loading = true;
        this.$store
          .dispatch('PFANS1026Store/get', this.retral)
          .then(response => {
            let data = [];
            for (let i = 0; i < response.contractapplication.length; i++) {
              if (response.contractapplication[i].state === '1' || response.contractapplication[i].state === this.$t('label.PFANS8008FORMVIEW_EFFECTIVE')) {
                data.push({
                  contractnumber: response.contractapplication[i].contractnumber,
                });
              }
            }
            // 添加筛选条件 ztc fr
            this.checkdata = data;
            // 添加筛选条件 ztc to
            this.$store
              .dispatch('PFANS5001Store/getFpans5001List', {})
              .then(response => {
                for (let j = 0; j < response.length; j++) {
                  this.pjnameflg.push({
                    pjcode: response[j].companyprojects_id,
                    pjname: response[j].project_name,
                  });
                }
                this.$store
                  .dispatch('PFANS1025Store/get', {'maketype': '4'})
                  .then(response => {
                    const datated = [];
                    for (let d = 0; d < this.checkdata.length; d++) {
                      for (let j = 0; j < response.length; j++) {
                        if (this.checkdata[d].contractnumber === response[j].contractnumber) {
                          if (response[j].award_id !== null && response[j].award_id !== '') {
                            if (response[j].contracttype !== null && response[j].contracttype !== '') {
                              let letContracttype = getDictionaryInfo(response[j].contracttype);
                              if (letContracttype != null) {
                                response[j].contracttype = letContracttype.value1;
                              }
                            }
                            if (response[j].currencyposition !== null && response[j].currencyposition !== '') {
                              let letCurrencyposition = getMonthlyrateInfo(response[j].currencyposition);
                              if (letCurrencyposition != null) {
                                response[j].currencyposition = letCurrencyposition.currencyname;
                              }
                            }
                            //add-ws-4/17-添加审批时间
                            if(response[j].status!='0'){
                              if (response[j].modifyon !== null && response[j].modifyon !== '') {
                                response[j].modifyon = moment(response[j].modifyon).format('YYYY-MM-DD');
                              }
                            }else{
                              response[j].modifyon = null;
                            }
                            //add-ws-4/17-添加审批时间
                            if (response[j].status !== null && response[j].status !== '') {
                              response[j].status = getStatus(response[j].status);
                            }
                            if (response[j].pjnamechinese !== null && response[j].pjnamechinese !== '') {
                              if (response[j].pjnamechinese.split(',').length > 1) {
                                let aa = [];
                                let bb = '';
                                aa = response[j].pjnamechinese.split(',');
                                for (let i = 1; i < aa.length; i++) {
                                  for (let j = 1; j < this.pjnameflg.length; j++) {
                                    if (aa[i] === this.pjnameflg[j].pjcode) {
                                      bb = bb + this.pjnameflg[j].pjname + ',';
                                    }
                                  }
                                }
                                if (bb !== '' && bb !== undefined) {
                                  response[j].pjnamechinese = bb.substring(0, bb.length - 1);
                                }
                              } else {
                                for (let i = 1; i < this.pjnameflg.length; i++) {
                                  if (this.pjnameflg[i].pjcode === response[j].pjnamechinese) {
                                    response[j].pjnamechinese = this.pjnameflg[i].pjname;
                                  }
                                }
                              }
                            }
                            datated.push({
                              contracttype: response[j].contracttype,
                              custochinese: response[j].custochinese,
                              modifyon: response[j].modifyon,
                              deployment: response[j].deployment,
                              pjnamechinese: response[j].pjnamechinese,
                              claimdatetime: response[j].claimdatetime,
                              contractnumber: response[j].contractnumber,
                              currencyposition: response[j].currencyposition,
                              claimamount: response[j].claimamount,
                              award_id: response[j].award_id,
                              status:response[j].status,
                              owner: response[j].owner,
                              maketype:response[j].maketype,
                            });
                          }
                        }
                      }
                    }
                    const datatade = [];
                    for (let m = 0; m < response.length; m++) {
                      for (let n = 0; n < datated.length; n++) {
                        if (datated[n].contractnumber === response[m].contractnumber) {
                          datatade.push({
                            contracttype: response[m].contracttype,
                            custochinese: response[m].custochinese,
                            modifyon: response[m].modifyon,
                            deployment: response[m].deployment,
                            pjnamechinese: response[m].pjnamechinese,
                            claimdatetime: response[m].claimdatetime,
                            contractnumber: response[m].contractnumber,
                            currencyposition: response[m].currencyposition,
                            claimamount: response[m].claimamount,
                            award_id: response[m].award_id,
                            status:response[m].status,
                            owner: response[m].owner,
                            maketype:response[m].maketype,
                          });
                        }
                      }
                    }
                    this.data = datatade;
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
              })
              .catch(error => {
                this.$message.error({
                  message: error,
                  type: 'error',
                  duration: 5 * 1000,
                });
                this.loading = false;
              });
          });
      },
      rowClick(row) {
        this.rowid = row.award_id;
        this.rows = row;
        this.groupid = row.groupid;
        this.department = row.deployment;


      },
      getCenterid(val){
        this.form.new_center_id = val
      },
      setOrg(val) {
        this.form.org = val;
      },
      buttonClick(val) {
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
            name: 'PFANS1030FormView',
            params: {
              _id: this.rowid,
              disabled: true,
            },
          });
        }
        if(val === 'carryforward'){
          if (this.rowid === '') {
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
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.$router.push({
            name: 'PFANS1030FormView',
            params: {
              _id: this.rowid,
              disabled: false,
            },
          });
        }
        // 添加筛选条件 ztc fr
        if (val === 'search') {
          this.getPjanme();
        }
        // 添加筛选条件 ztc to
      },
      submit(){
        this.loading = true;
        this.$refs['form'].validate(valid =>{
          if(valid){
            let parameter = {
              group_id: this.form.new_center_id,
              maketype: this.rows.maketype,
              award_id:this.rowid,
            };
            // console.log(parameter)
            this.$store
              .dispatch('PFANS1025Store/dataCarryover', parameter)
              .then(response => {
                this.getPjanme();
                Message({
                  message: this.$t('normal.success_07'),
                  type: 'success',
                  duration: 5 * 1000,
                });
                this.dialogVisible = false;
                this.form.new_center_id= '';
                this.form.new_group_id='';
                this.form.new_team_id= '';
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
      },
    },
  };
</script>

<style scoped>

</style>
