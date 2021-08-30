<template>
  <div>
    <EasyNormalTable :buttonList="buttonList"
                     :columns="columns"
                     :data="data"
                     :title="title"
                     :rowid="row_id"
                     @buttonClick="buttonClick"
                     @rowClick="rowClick"
                     v-loading="loading"
                     :selectable="selectInit"
                     :handleShow="handleShow"
                     @handleEdit="handleEdit"
                     ref="roletable"
                     :showSelection="isShow">
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
  import {getDictionaryInfo, getStatus,getOrgInfoByUserId,getMonthlyrateInfo} from '@/utils/customize';
  import {Message} from 'element-ui';
  let moment = require('moment');
  import org from '@/view/components/org';

  export default {
    name: 'PFANS1047View',
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
        loading: false,
        title: 'title.PFANS1047VIEW',
        data: [],
        // groupid: '',
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
          // last_group_id: '',
          // last_team_id: '',
          new_center_id: '',
          // new_group_id: '',
          // new_team_id: '',
          org: '',
        },
        checkdata: [],
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
            code: 'deployment',
            label: 'label.PFANS1024VIEW_DEPLOYMENT',
            width: 150,
            fix: false,
            filter: true,
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
          {
            code: 'sealstatus',
            label: 'label.PFANS1024VIEW_SEALSTATUS',
            width: 120,
            fix: false,
            filter: true,
          },
        ],
        buttonList: [],
        buttonListAnt: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
          {'key': 'sealapp', 'name': 'button.sealapp', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'carryforward', 'name': 'button.carryforward', 'disabled': false, 'icon': 'el-icon-edit'}
        ],
        buttonListOld: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
          {'key': 'sealapp', 'name': 'button.sealapp', 'disabled': false, 'icon': 'el-icon-view'},
        ],
        selectedlist: [],
        rowid: '',
        mounth: '',
        date: '',
        row_id: 'award_id',
        pjnameflg: [],
        handleShow: true,
        isShow: true,
        dialogVisible: false,
      };
    },
    mounted() {
      this.getPjanme();
      this.getdateInfo();
    },
    methods: {
      getdateInfo(){
        this.mounth = new Date().getMonth() + 1;
        this.date = new Date().getDate();
        if(this.mounth === 4 && this.date >= 10 && this.date <= 30) {
          this.buttonList = this.buttonListAnt;
        }else{
          this.buttonList = this.buttonListOld;
        }
      },
      handleEdit(row) {
        if(row.sealstatus === this.$t('label.PFANS1032FORMVIEW_ENDSEAL') || row.sealstatus === this.$t('label.PFANS1032FORMVIEW_LOADINGSEAL'))
        {
          this.$router.push({
            name: 'PFANS4001FormView',
            params: {
              _id: row.sealid,
              disabled: false,
              check1: true,
            },
          });
        }
        else if (row.sealstatus === this.$t('label.PFANS1032FORMVIEW_NOTSTARTSEAL') )
        {
          this.$router.push({
            name: 'PFANS4001FormView',
            params: {
              _id: row.sealid,
              disabled: true,
              check1: true,
            },
          });
        }
      },
      selectInit(row, index) {
        if (this.$i18n) {
          return (row.status === this.$t("label.PFANS5004VIEW_OVERTIME") && (row.sealstatus === '' || row.sealstatus === null || row.sealstatus === undefined));
        }
      },
      getPjanme() {
        this.loading = true;
        this.$store
        //add-lyt-21/3/10-NT_PFANS_20210226_BUG_028-start
          .dispatch('PFANS1026Store/get', {'type': '2'})
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
            this.loading = true;
            this.$store
            //add-lyt-21/3/10-NT_PFANS_20210226_BUG_028-end
              .dispatch('PFANS1025Store/getList', {'maketype': '9'})
              .then(response => {
                //add-lyt-21/3/10-NT_PFANS_20210226_BUG_028-start
                const datated = [];
                for(let j = 0; j< this.checkdata.length; j++){
                  //add-lyt-21/3/10-NT_PFANS_20210226_BUG_028-end
                  for (let i = 0; i < response.length; i++)
                    //add-lyt-21/3/10-NT_PFANS_20210226_BUG_028-start
                    {
                    if(this.checkdata[j].contractnumber === response[i].contractnumber){
                      if (response[i].award_id !== null && response[i].award_id !== '')
                      //add-lyt-21/3/10-NT_PFANS_20210226_BUG_028-end
                      {
                        //契约种类
                        if (response[i].contracttype !== null && response[i].contracttype !== '') {
                          let letContracttype = getDictionaryInfo(response[i].contracttype);
                          if (letContracttype != null) {
                            response[i].contracttype = letContracttype.value1;
                          }
                        }
                        //审批状态
                        if (response[i].status !== null && response[i].status !== '') {
                          response[i].status = getStatus(response[i].status);
                        }
                        //通货形式
                        if (response[i].currencyposition !== null && response[i].currencyposition !== '') {
                          let letCurrencyposition = getMonthlyrateInfo(response[i].currencyposition);
                          if (letCurrencyposition != null) {
                            response[i].currencyposition = letCurrencyposition.currencyname;
                          }
                        }
                        //印章状态
                        if (this.$i18n) {
                          if (response[i].sealstatus === null || response[i].sealstatus === '') {
                            response[i].sealstatus = '';
                          } else if (response[i].sealstatus === '1') {
                            response[i].sealstatus = this.$t('label.PFANS1032FORMVIEW_NOTSTARTSEAL');
                          } else if (response[i].sealstatus === '2') {
                            response[i].sealstatus = this.$t('label.PFANS1032FORMVIEW_LOADINGSEAL');
                          } else if (response[i].sealstatus === '3') {
                            response[i].sealstatus = this.$t('label.PFANS1032FORMVIEW_ENDSEAL');
                            //add-lyt-21/3/10-NT_PFANS_20210226_BUG_028-start
                          }
                        }
                        datated.push({
                          contracttype: response[i].contracttype,
                          custochinese: response[i].custochinese,
                          modifyon: response[i].modifyon,
                          deployment: response[i].deployment,
                          pjnamechinese: response[i].pjnamechinese,
                          claimdatetime: response[i].claimdatetime,
                          contractnumber: response[i].contractnumber,
                          currencyposition: response[i].currencyposition,
                          claimamount: response[i].claimamount,
                          award_id: response[i].award_id,
                          status:response[i].status,
                          owner: response[i].owner,
                          sealstatus:response[i].sealstatus,
                          sealid:response[i].sealid,
                          contractnumber:response[i].contractnumber,
                          groupid:response[i].group_id,
                          maketype:response[i].maketype,
                        });
                      }
                    }
                  }
                  //add-lyt-21/3/10-NT_PFANS_20210226_BUG_028-end
                }
                //add-lyt-21/3/10-NT_PFANS_20210226_BUG_028-start
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
                        sealstatus:response[m].sealstatus,
                        sealid:response[m].sealid,
                        contractnumber:response[m].contractnumber,
                        groupid:response[m].group_id,
                        maketype:response[m].maketype,
                      });
                    }
                    //add-lyt-21/3/10-NT_PFANS_20210226_BUG_028-end
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
                //add-lyt-21/3/10-NT_PFANS_20210226_BUG_028-start
              });
            //add-lyt-21/3/10-NT_PFANS_20210226_BUG_028-end
          })
      },
      rowClick(row) {
        this.rowid = row.award_id;
        this.rows = row;
        this.department = row.deployment;
        // this.groupid = row.groupid;

      },
      getCenterid(val){
        this.form.new_center_id = val
      },
      // getGroupid(val){
      //   this.form.new_group_id = val
      // },
      // getTeamid(val){
      //   this.form.new_team_id = val
      // },
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
                this.getPjanme();
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
      },
      //获取组织信息
      // getOrgInformation(id) {
      //   let org = {};
      //   let treeCom = this.$store.getters.orgs;
      //   if (id && treeCom.getNode(id)) {
      //     let node = id;
      //     let type = treeCom.getNode(id).data.type || 0;
      //     for (let index = parseInt(type); index >= 1; index--) {
      //       if (parseInt(type) === index && ![1, 2].includes(parseInt(type))) {
      //         org.teamname = treeCom.getNode(node).data.departmentname;
      //       }
      //       if (index === 2) {
      //         org.groupname = treeCom.getNode(node).data.departmentname;
      //       }
      //       if (index === 1) {
      //         org.centername = treeCom.getNode(node).data.companyname;
      //       }
      //       node = treeCom.getNode(node).parent.data._id;
      //     }
      //     ({
      //       centername: this.form.last_center_id,
      //       groupname: this.form.last_group_id,
      //       teamname: this.form.last_team_id,
      //     } = org);
      //   }
      // },
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
            name: 'PFANS1047FormView',
            params: {
              _id: this.rowid,
              disabled: true,
            },
          });
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
            name: 'PFANS1047FormView',
            params: {
              _id: this.rowid,
              disabled: false,
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
        if (val === "sealapp") {
          this.selectedlist = this.$refs.roletable.selectedList;
          if (this.$refs.roletable.selectedList.length === 0) {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          //upd-ws-9/3-禅道任务493
          // let ppid = "";
          // let bookid = "";
          // if (this.selectedlist.length > 0) {
          //   for (let i = 0; i < this.selectedlist.length; i++) {
          //     ppid += this.selectedlist[i].award_id + ",";
          //   }
          //   if (ppid && ppid.length > 0) {
          //     bookid = "9," + ppid.substr(0, ppid.length - 1);
          //   }
          // }
          // let crePe = {};
          // let centerid = "";
          // let groupid = "";
          // let teamid = "";
          // let userid = "";
          // let filetype = 'PC002001';//合同
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
          // crePe.application_date = moment(new Date()).format("YYYY-MM-DD");
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
              bookid = "9," + ppid.substr(0, ppid.length - 1);
            }
          }
          let crePe = {};
          let filetype = 'PC002001';//合同
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
      },
    },
  };
</script>

<style scoped>

</style>
