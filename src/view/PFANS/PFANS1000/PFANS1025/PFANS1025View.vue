<template>
  <div>
    <EasyNormalTable :buttonList="buttonList"
                     :columns="columns"
                     :data="data"
                     :title="title"
                     :selectable="selectInit"
                     ref="roletable"
                     :showSelection="isShow"
                     :rowid="row_id"
                     @buttonClick="buttonClick"
                     @rowClick="rowClick"
                     v-loading="loading"
                     :psearchValue="search">
    </EasyNormalTable>
    <el-container>
      <el-dialog center
                 :visible.sync="dialogVisible"
                 width="30%">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="form" style="padding: 2vw">
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.center')">
                <el-input :disabled="true" style="width:13vw" v-model="department"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.center')" prop="new_center_id"
                            :error="error_center">
                <org :orglist="form.new_center_id"
                     orgtype="4"
                     style="width: 10vw"
                     @getOrgids="getCenterid"
                     :error="error_center"
                ></org>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submit">确 定</el-button>
          </span>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {getDictionaryInfo, getStatus, getOrgInfoByUserId,getMonthlyrateInfo} from '@/utils/customize';
  import {Message} from 'element-ui';
  import moment from 'moment';
  import org from '@/view/components/org';

  export default {
    name: 'PFANS1025View',
    components: {
      EasyNormalTable,
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
        //add-ws-7/20-禅道任务342
        selectedlist: [],
        listjudgement: [],
        search: '',
        rowsealid: '',
        isShow: true,
        //add-ws-7/20-禅道任务342
        loading: false,
        title: 'title.PFANS1025VIEW',
        data: [],
        checkdata: [],
        groupid: '',
        department: '',
        maketype: '',
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
        columns: [
          {
            code: 'contractnumber',
            label: 'label.PFANS1024VIEW_CONTRACTNUMBER',
            width: 150,
            fix: false,
            filter: false,
          },
          //add-ws-8/19-禅道470任务
          {
            code: 'loanapno',
            label: 'label.PFANS1006FORMVIEW_LOANAPNO',
            width: 130,
            fix: false,
            filter: true,
          },
          //add-ws-8/19-禅道470任务
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
            label: 'label.PFANS1025VIEW_DEVELOPDATE',
            width: 200,
            fix: false,
            filter: false,
          },

          /* {
             code: 'deliverydate',
             label: 'label.PFANS1024VIEW_DELIVERYDATE',
             width: 150,
             fix: false,
             filter: true
           },*/
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
            filter: true,
          },
          //add-ws-4/17-添加审批时间
          {
            code: 'modifyon',
            label: 'label.PFANS1030FORMVIEW_TIEEEND',
            width: 150,
            fix: false,
            filter: false,
          },
          //add-ws-4/17-添加审批时间
          //add-ws-7/20-禅道任务342
          {
            code: 'sealstatus',
            label: 'label.PFANS1024VIEW_SEALSTATUS',
            width: 170,
            fix: false,
            filter: false,
          },
          // {
          //   code: 'statuspublic',
          //   label: 'label.PFANS1030FORMVIEW_STATUSPUBLIC',
          //   width: 150,
          //   fix: false,
          //   filter: false,
          // },

          //add-ws-7/20-禅道任务342
        ],
        buttonList: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
          {'key': 'sealapp', 'name': 'button.sealapp', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'viewseal', 'name': 'button.viewseal', 'disabled': true, 'icon': 'el-icon-view'},
          {'key': 'pubilc', 'name': 'button.actuarial', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'temLoanApp', 'name': 'button.temLoanApp', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'carryforward', 'name': 'button.carryforward', 'disabled': false, 'icon': 'el-icon-edit'}
        ],
        status: '',
        rowid: '',
        sealstatus: '',
        row_id: 'award_id',
        dialogVisible: false,
        pjnameflg: [],
      };
    },
    mounted() {
      //add-ws-7/20-禅道任务342
      this.check();
      //add-ws-7/20-禅道任务342
      this.getPjanme();
    },
    methods: {
      //add-ws-7/20-禅道任务342
      check() {
        if (this.$route.params._id) {
          this.search = this.$route.params._id;
        }
      },
      selectInit(row, index) {
        if (row.status === this.$t('label.PFANS5004VIEW_OVERTIME')) {
          return row;
        }
      },
      //add-ws-7/20-禅道任务342
      getPjanme() {
        this.loading = true;
        this.$store
          .dispatch('PFANS1026Store/get', {'type': '0'})
          .then(response => {
            let data = [];
            for (let i = 0; i < response.contractapplication.length; i++) {
              if (response.contractapplication[i].state === '1' || response.contractapplication[i].state === this.$t('label.PFANS8008FORMVIEW_EFFECTIVE')) {
                data.push({
                  contractnumber: response.contractapplication[i].contractnumber,
                });
                this.checkdata = data;
              }
            }
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
                  .dispatch('PFANS1025Store/get', {'maketype': '7'})
                  .then(response => {
                    const datated = [];
                    for (let d = 0; d < this.checkdata.length; d++) {
                      for (let j = 0; j < response.length; j++) {
                        if (this.checkdata[d].contractnumber === response[j].contractnumber) {
                          if (response[j].award_id !== null && response[j].award_id !== '') {

                            if (response[j].deliverydate !== null && response[j].deliverydate !== '') {
                              response[j].deliverydate = moment(response[j].deliverydate).format('YYYY-MM-DD');
                            }
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
                            if (response[j].status != '0') {
                              if (response[j].modifyon !== null && response[j].modifyon !== '') {
                                response[j].modifyon = moment(response[j].modifyon).format('YYYY-MM-DD');
                              }
                            } else {
                              response[j].modifyon = null;
                            }
                            //add-ws-4/17-添加审批时间
                            if (response[j].status !== null && response[j].status !== '') {
                              response[j].status = getStatus(response[j].status);
                            }
                            if (response[j].remarks == null ) {
                              response[j].remarks ="";
                            }
                            //add-ws-7/20-禅道任务342
                            if (this.$i18n) {
                              if (response[j].sealstatus === null || response[j].sealstatus === '') {
                                response[j].sealstatus = '';
                              } else if (response[j].sealstatus === '1') {
                                response[j].sealstatus = this.$t('label.PFANS1032FORMVIEW_NOTSTARTSEAL');
                              } else if (response[j].sealstatus === '2') {
                                response[j].sealstatus = this.$t('label.PFANS1032FORMVIEW_LOADINGSEAL');
                              } else if (response[j].sealstatus === '3') {
                                response[j].sealstatus = this.$t('label.PFANS1032FORMVIEW_ENDSEAL');
                              }
                            }
                            // if (response[j].statuspublic !== null && response[j].statuspublic !== '') {
                            //   if (response[j].statuspublic === '0') {
                            //     response[j].statuspublic = this.$t('label.PFANS1026VIEW_WSTATUS');
                            //   } else if (response[j].statuspublic === '2') {
                            //     response[j].statuspublic = this.$t('label.PFANS1032FORMVIEW_LOADINGSEAL');
                            //   } else if (response[j].statuspublic === '3') {
                            //     response[j].statuspublic = this.$t('label.node_step2');
                            //   } else if (response[j].statuspublic === '4') {
                            //     response[j].statuspublic = this.$t('label.PFANS5004VIEW_OVERTIME');
                            //   }
                            // }
                            //add-ws-7/20-禅道任务342
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
                              contractnumber: response[j].contractnumber,
                              contracttype: response[j].contracttype,
                              custochinese: response[j].custochinese,
                              modifyon: response[j].modifyon,
                              deployment: response[j].deployment,
                              pjnamechinese: response[j].pjnamechinese,
                              claimdatetime: response[j].claimdatetime,
                              deliverydate: response[j].deliverydate,
                              currencyposition: response[j].currencyposition,
                              claimamount: response[j].claimamount,
                              status: response[j].status,
                              award_id: response[j].award_id,
                              owner: response[j].owner,
                              //add-ws-7/20-禅道任务342
                              sealid: response[j].sealid,
                              sealstatus: response[j].sealstatus,
                              // statuspublic: response[j].statuspublic,
                              //add-ws-7/20-禅道任务342
                              remarks: response[j].remarks,
                              loanapno: response[j].loanapno,
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
                            contractnumber: response[m].contractnumber,
                            contracttype: response[m].contracttype,
                            custochinese: response[m].custochinese,
                            modifyon: response[m].modifyon,
                            deployment: response[m].deployment,
                            pjnamechinese: response[m].pjnamechinese,
                            claimdatetime: response[m].claimdatetime,
                            deliverydate: response[m].deliverydate,
                            currencyposition: response[m].currencyposition,
                            claimamount: response[m].claimamount,
                            status: response[m].status,
                            award_id: response[m].award_id,
                            owner: response[m].owner,
                            //add-ws-7/20-禅道任务342
                            sealid: response[m].sealid,
                            sealstatus: response[m].sealstatus,
                            // statuspublic: response[m].statuspublic,
                            //add-ws-7/20-禅道任务342
                            remarks: response[m].remarks,
                            loanapno: response[m].loanapno,
                            maketype:response[m].maketype,
                          });
                        }
                      }
                    }
                    this.data = datatade;
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
              })
              .catch(error => {
                Message({
                  message: error,
                  type: 'error',
                  duration: 5 * 1000,
                });
                this.loading = false;
              });
          });
      },
      rowClick(row) {
        this.rows = row;
        this.groupid = row.groupid;
        this.department = row.deployment;
        //add-ws-9/25-禅道567
        this.status = row.status;
        //add-ws-9/25-禅道567
        this.rowid = row.award_id;
        //add-ws-7/20-禅道任务342
        this.rowsealid = row.sealid;
        this.buttonList[3].disabled = true;
        if (row.sealid) {
          this.buttonList[3].disabled = false;
        }
        //add-ws-7/20-禅道任务342
      },
      getCenterid(val){
        this.form.new_center_id = val
      },
      setOrg(val) {
        this.form.org = val;
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
            this.$store
              .dispatch('PFANS1025Store/dataCarryover', parameter)
              .then(response => {
                // this.check();
                Message({
                  message: this.$t('normal.success_07'),
                  type: 'success',
                  duration: 5 * 1000,
                });
                this.dialogVisible = false;
                this.form.new_center_id= '';
                this.form.new_group_id='';
                this.form.new_team_id= '';
                this.loading = false;
                this.check();
                this.getPjanme();
              })
              .catch(error => {
                Message({
                  message: error,
                  type: 'error',
                  duration: 5 * 1000,
                });
                this.loading = false;
              });
          }else{
            Message({
              message: this.$t('normal.error_12'),
              type: 'error',
              duration: 5 * 1000,
            });
            this.loading = false;
          }
        });
      },
      buttonClick(val) {
        // this.$store.commit('global/SET_HISTORYURL', this.$route.path);
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
            name: 'PFANS1025FormView',
            params: {
              _status:this.status,
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
            name: 'PFANS1025FormView',
            params: {
              _status:this.status,
              _id: this.rowid,
              disabled: false,
            },
          });
        }
        //add-ws-7/20-禅道任务342
        if (val === 'sealapp') {
          let checktableD = '';
          let error = 0;
          this.selectedlist = this.$refs.roletable.selectedList;
          if (this.$refs.roletable.selectedList.length === 0) {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          } else {
            for (let i = 0; i < this.selectedlist.length; i++) {
              if (this.selectedlist[i].status != this.$t('label.PFANS5004VIEW_OVERTIME')) {
                Message({
                  message: this.$t('label.PFANS1025VIEW_PUBLIC3'),
                  type: 'info',
                  duration: 2 * 1000,
                });
                return;
              }
            }
            for (let i = 0; i < this.selectedlist.length; i++) {
              if (this.selectedlist[i].sealstatus != ''&&this.selectedlist[i].sealstatus != null&&this.selectedlist[i].sealstatus != undefined) {
                error = error + 1;
                let sealtypeList = this.selectedlist[i].contractnumber;
                checktableD = checktableD + sealtypeList + ',';
              }
            }
            if (error != 0) {
              let img = checktableD.substring(0, checktableD.length - 1);
              Message({
                message: this.$t('label.PFANS1025VIEW_SEALCHECK') + img + this.$t('label.PFANS1025VIEW_SEALCHECK2'),
                type: 'info',
                duration: 3 * 1000,
              });
              return;
            }
          }
          //upd-ws-9/3-禅道任务493
          // let ppid = '';
          // let bookid = '';
          // if (this.selectedlist.length > 0) {
          //   for (let i = 0; i < this.selectedlist.length; i++) {
          //     ppid += this.selectedlist[i].award_id + ',';
          //   }
          //   if (ppid && ppid.length > 0) {
          //     bookid = '7,' + ppid.substr(0, ppid.length - 1);
          //   }
          // }
          // let crePe = {};
          // let centerid = '';
          // let groupid = '';
          // let teamid = '';
          // let userid = '';
          // let filetype = 'PC002006';//委托决裁
          // if (this.$store.getters.userinfo.userid !== null && this.$store.getters.userinfo.userid !== '') {
          //   let rst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
          //   if (rst) {
          //     centerid = rst.centerId;
          //     groupid = rst.groupId;
          //     teamid = rst.teamId;
          //   }
          //   userid = this.$store.getters.userinfo.userid;
          // }
          // crePe.userid = userid;
          // crePe.centerid = centerid;
          // crePe.groupid = groupid;
          // crePe.teamid = teamid;
          // crePe.filetype = filetype;
          // crePe.bookid = bookid;
          // crePe.application_date = moment(new Date()).format('YYYY-MM-DD');
          // this.loading = true;
          // this.$store
          //   .dispatch('PFANS4001Store/createbook', crePe)
          //   .then(response => {
          //     let peid = response.sealid;
          //     this.$store.commit('global/SET_OPERATEID', peid);
          //     this.$router.push({
          //       name: 'PFANS4001FormView',
          //       params: {
          //         _id: peid,
          //         disabled: true,
          //         check2: true,
          //       },
          //     });
          //     this.loading = false;
          //   })
          //   .catch(error => {
          //     Message({
          //       message: error,
          //       type: 'error',
          //       duration: 5 * 1000,
          //     });
          //     this.loading = false;
          //   });
          let ppid = "";
          let bookid = "";
          if (this.selectedlist.length > 0) {
            for (let i = 0; i < this.selectedlist.length; i++) {
              ppid += this.selectedlist[i].award_id + ",";
            }
            if (ppid && ppid.length > 0) {
              bookid = "7," + ppid.substr(0, ppid.length - 1);
            }
          }
          let crePe = {};
          let filetype = 'PC002006';//合同
          crePe.filetype = filetype;
          crePe.bookid = bookid;
          this.$router.push({
            name: 'PFANS4001FormView',
            params: {
              _id: '',
              _crePe:crePe,
              disabled: true,
            },
          });
          //upd-ws-9/3-禅道任务493
        }
        if (val === 'pubilc') {
          this.selectedlist = this.$refs.roletable.selectedList;
          if (this.$refs.roletable.selectedList.length === 0) {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          } else {
            let n = 0;
            let checksum =  this.selectedlist.length;
            for (let i = 0; i <  this.selectedlist.length; i++) {
              if ( this.selectedlist[i].loanapno == null ||  this.selectedlist[i].loanapno == ''||  this.selectedlist[i].loanapno == undefined ) {
                n = n + 1
              }
            }
            if(n!=checksum){
              if(n!=0){
                Message({
                  message: this.$t('label.PFANS1001FORMVIEW_CHECKSUM'),
                  type: 'info',
                  duration: 2 * 1000
                });
                return;
              }
            }
            for (let i = 0; i < this.selectedlist.length; i++) {
              if (this.selectedlist[i].status != this.$t('label.PFANS5004VIEW_OVERTIME')) {
                Message({
                  message: this.$t('label.PFANS1025VIEW_PUBLIC4'),
                  type: 'info',
                  duration: 2 * 1000,
                });
                return;
              }
            }
            for (let i = 0; i < this.selectedlist.length; i++) {
              if (this.selectedlist[i].statuspublic === this.$t('label.PFANS5004VIEW_OVERTIME')) {
                Message({
                  message: this.$t('label.PFANS1025VIEW_CHECKPUBLICERROR'),
                  type: 'info',
                  duration: 2 * 1000,
                });
                return;
              }
            }
            let chek = this.selectedlist;
            for (let citem of this.selectedlist) {
              chek = chek.filter(item => citem.custochinese == item.custochinese);
            }
            if (chek.length != this.selectedlist.length) {
              Message({
                message: this.$t('label.PFANS1025VIEW_PUBLIC2'),
                type: 'info',
                duration: 2 * 1000,
              });
              return;
            }
          }
          for (let i = 0; i < this.selectedlist.length; i++) {
            var vote = {};
            vote.value = this.selectedlist[i].award_id;
            vote.label = this.selectedlist[i].contractnumber;
            vote.remarks = this.selectedlist[i].remarks;
            vote.judgements_moneys = this.selectedlist[i].claimamount;
            if (this.$i18n) {
              vote.judgements_type = this.$t('label.PFANS1012VIEW_CHECKLIST');
            }
            this.listjudgement.push(vote);
          }
          this.$router.push({
            name: 'PFANS1012FormView',
            params: {
              _name: this.listjudgement,
              _type: 'PJ001002',
              disabled: true,
            },
          });
        }
        if (val === 'viewseal') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          if (this.sealstatus === this.$t('label.PFANS1032FORMVIEW_ENDSEAL')) {
            this.$router.push({
              name: 'PFANS4001FormView',
              params: {
                _id: this.rowsealid,
                disabled: false,
              },
            });
          } else {
            this.$router.push({
              name: 'PFANS4001FormView',
              params: {
                _id: this.rowsealid,
                disabled: true,
              },
            });
          }
        }
        //add-ws-7/20-禅道任务342
        if (val === 'temLoanApp') {
          if (this.$refs.roletable.selectedList.length === 0) {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000
            });
            return;
          }
          this.selectedlist = [];
          this.selectedlist = this.$refs.roletable.selectedList;
          let _judgement = '';
          let _judgement_name = '';
          let _judgements_moneys = '';
          let _remarks = '';
          let str = '';
          for (let i = 0; i < this.selectedlist.length; i++) {
            _judgement += this.selectedlist[i].award_id + ',';
            _judgement_name += this.selectedlist[i].contractnumber + ',';
            _judgements_moneys += this.selectedlist[i].claimamount + ',';
            _remarks += this.selectedlist[i].remarks + '^';
            //check是否存在暂借款
            if (this.selectedlist[i].loanapno != null && this.selectedlist[i].loanapno != '' && this.selectedlist[i].loanapno != undefined) {
              str += this.selectedlist[i].contractnumber + ' , ';
            }
          }
          //del ccm 0813 决裁到暂借款，精算  check去掉
          //   if (str === '') {
          //del ccm 0813 决裁到暂借款，精算  check去掉
          this.$router.push({
            name: 'PFANS1006FormView',
            params: {
              _id: '',
              _judgement: _judgement,
              _judgement_name: _judgement_name,
              _judgements_moneys: _judgements_moneys,
              _remarks: _remarks,
              _judgements_type: this.$t('label.PFANS1012VIEW_CHECKLIST'),
              disabled: true,
            },
          });
          //del ccm 0813 决裁到暂借款，精算  check去掉
          // } else {
          //     Message({
          //         message: this.$t('label.PFANS3005VIEW_NUMBERS') + ' : ' + str + ' ' + this.$t('label.PFANS3005VIEW_LOANAPP'),
          //         type: 'info',
          //         duration: 3 * 1000,
          //     });
          //     return;
          // }
          //del ccm 0813 决裁到暂借款，精算  check去掉
        }
      },
    },
  };
</script>

<style scoped>

</style>
