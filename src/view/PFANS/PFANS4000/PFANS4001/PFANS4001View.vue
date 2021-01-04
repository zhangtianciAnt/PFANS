<template>
  <div>
    <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row_id"
                     :title="title" @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading"
                     @handleacceptstate="handleacceptstate" :handles="handles"  @handleacceptstate1="handleacceptstate1"
    >
      <span slot="customize">{{$t('label.PFANS4001FORMVIEW_SEALDETAILNAME') +':'}}</span>
      <span slot="customize" class="sub_color_red">{{this.user}}</span>
      <span slot="customize">{{$t('label.PFANS4001FORMVIEW_SEALDETAILDATE') +':'}}</span>
      <span slot="customize" class="sub_color_red">{{this.sealdetail}}</span>
    </EasyNormalTable>
    <!--    add-ws-12/21-印章盖印-->
    <el-drawer :visible.sync="insertnamedialog" size="40%" :show-close="false" :withHeader="false" append-to-body>
      <el-form label-position="top" label-width="8vw" ref="reff" style="padding: 2vw">
        <el-row>
          <el-form-item :error="error" :label="$t('label.PFANS4001FORMVIEW_SEALDETAILNAME')">
            <user :disabled="false" :error="error" :selectType="selectType" :userlist="userlist"
                  @getUserids="getUserids" style="width:20vw"></user>
          </el-form-item>
        </el-row>
        <div></div>
        <el-row>
          <el-form-item :label="$t('label.PFANS4001FORMVIEW_SEALDETAILDATE')">
            <el-date-picker
              v-model="sealdetaildate"
              type="daterange"
              :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
              :start-placeholder="$t('label.startdate')"
              :end-placeholder="$t('label.enddate')">
            </el-date-picker>
          </el-form-item>
        </el-row>
      </el-form>
    </el-drawer>
    <!--    add-ws-12/21-印章盖印-->
  </div>
</template>
<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {Message} from 'element-ui';
  import moment from 'moment';
  import {getDictionaryInfo, getStatus, getUserInfo, getOrgInfoByUserId, getCurrentRole17} from '@/utils/customize';
  import user from '../../../components/user.vue';

  export default {
    name: 'PFANS4001View',
    components: {
      user,
      EasyNormalTable,
    },
    data() {
      return {
        checklist: [],
        spanshow: true,
        handles: true,
        userlist: '',
        error: '',
        selectType: 'Single',
        sealdetaildate: '',
        insertnamedialog: false,
        loading: false,
        title: 'title.PFANS4001VIEW',
        data: [],
        columns: [
          {
            code: 'username',
            label: 'label.applicant',
            width: 130,
            fix: false,
            filter: true,
          },
          {
            code: 'centername',
            label: 'label.center',
            width: 160,
            fix: false,
            filter: true,
          },
          {
            code: 'groupname',
            label: 'label.group',
            width: 160,
            fix: false,
            filter: true,
          },
          {
            code: 'teamname',
            label: 'label.team',
            width: 160,
            fix: false,
            filter: true,
          },
          {
            code: 'filename',
            label: 'label.PFANS1034VIEW_FILENAME',
            width: 130,
            fix: false,
            filter: false,
          },
          {
            code: 'sealtype',
            label: 'label.PFANS4001FORMVIRW_YYLX',
            width: 130,
            fix: false,
            filter: false,
          },
          {
            code: 'usedate',
            label: 'label.PFANS4001FORMVIEW_YYRQ',
            width: 130,
            fix: false,
            filter: false,
          },
          {
            code: 'status',
            label: 'label.PFANS8008VIEW_AVAILABLESTATE',
            width: 100,
            fix: false,
            filter: true,
          },
          //add-ws-12/21-印章盖印
          {
            code: 'acceptor',
            label: 'label.PFANS4001FORMVIEW_ACCEPTOR',
            width: 130,
            fix: false,
            filter: true,
          },
          //add-ws-12/21-印章盖印
        ],
        buttonList: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'edit', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
          //add-ws-12/21-印章盖印
          {'key': 'insertname', 'name': 'button.insertname', 'disabled': true, 'icon': 'el-icon-plus'},
          {'key': 'recognition', 'name': 'button.recognition', 'disabled': true, 'icon': 'el-icon-check'},
          //add-ws-12/21-印章盖印
        ],
        rowid: '',
        row_id: 'sealid',
        handlsealid: '',
      };
    },
    //add-ws-12/21-印章盖印
    watch: {
      insertnamedialog: {
        handler(newValue, oldValue) {
          this.insertnamedialogs();
        },
        deep: true,
      },
    },
    //add-ws-12/21-印章盖印
    mounted() {
      this.getList();
    },
    methods: {
      //add-ws-12/21-印章盖印
      getList() {
        this.loading = true;
        this.$store
          .dispatch('PFANS4001Store/getFpans4001List', {})
          .then(response => {
            //add-ws-12/21-印章盖印
            let roles = getCurrentRole17();
            if (response.sealdetail.length > 0) {
              this.userlist = response.sealdetail[0].sealdetailname;
              if (getUserInfo(response.sealdetail[0].sealdetailname)) {
                this.user = getUserInfo(response.sealdetail[0].sealdetailname).userinfo.customername;
              }
              if (response.sealdetail[0].sealdetaildate !== '' && response.sealdetail[0].sealdetaildate !== null) {
                let claimdatetime = response.sealdetail[0].sealdetaildate;
                let claimdatetim = claimdatetime.slice(0, 10);
                let claimdatetime1 = claimdatetime.slice(claimdatetime.length - 10);
                this.sealdetaildate = [claimdatetim, claimdatetime1];
                this.sealdetail = claimdatetim + '~' + claimdatetime1;
                if (moment(claimdatetim).format('YYYY-MM-DD') > moment(new Date()).format('YYYY-MM-DD') || moment(new Date()).format('YYYY-MM-DD') > moment(claimdatetime1).format('YYYY-MM-DD')) {
                  this.userlist = this.$store.getters.userinfo.userid;
                  if (getUserInfo(this.$store.getters.userinfo.userid)) {
                    this.user = getUserInfo(this.$store.getters.userinfo.userid).userinfo.customername;
                  }
                  let claimdatetim = moment(new Date()).format('YYYY-MM-DD');
                  let claimdatetime1 = moment(new Date()).add(1, 'y').format('YYYY');
                  let claimdatetime2 = claimdatetime1 + '-03-31';
                  this.sealdetaildate = [claimdatetim, claimdatetime2];
                  this.sealdetail = claimdatetim + '~' + claimdatetime1;
                }
              }
            }
            if (this.userlist === this.$store.getters.userinfo.userid) {
              this.buttonList[4].disabled = false;

            }
            if (roles === '0') {
              this.buttonList[3].disabled = false;
              this.buttonList[4].disabled = false;

            }
            //add-ws-12/21-印章盖印
            for (let j = 0; j < response.seal.length; j++) {
              let user = getUserInfo(response.seal[j].userid);
              let nameflg = getOrgInfoByUserId(response.seal[j].userid);
              if (nameflg) {
                response.seal[j].centername = nameflg.centerNmae;
                response.seal[j].groupname = nameflg.groupNmae;
                response.seal[j].teamname = nameflg.teamNmae;
              }
              if (user) {
                response.seal[j].username = user.userinfo.customername;
              }
              if (response.seal[j].status !== null && response.seal[j].status !== '') {
                response.seal[j].status = getStatus(response.seal[j].status);
              }
              if (response.seal[j].usedate !== null && response.seal[j].usedate !== '') {
                response.seal[j].usedate = moment(response.seal[j].usedate).format('YYYY-MM-DD');
              }
              //add-ws-4/22-多个印章时出现问题修改
              let checktableD = '';
              if (response.seal[j].sealtype !== '' && response.seal[j].sealtype !== null && response.seal[j].sealtype !== undefined) {
                let letstaff = response.seal[j].sealtype.split(',');
                for (let a = 0; a < letstaff.length; a++) {
                  let letErrortype = getDictionaryInfo(letstaff[a]);
                  if (letErrortype != null) {
                    let sealtypeList = letErrortype.value1;
                    checktableD = checktableD + sealtypeList + ',';
                  }
                }
              }
              response.seal[j].sealtype = checktableD.substring(0, checktableD.length - 1);
              //add-ws-4/22-多个印章时出现问题修改
              //add-ws-12/21-印章盖印
              if (response.seal[j].acceptor != null && response.seal[j].acceptor !== '') {
                response.seal[j].acceptor = getUserInfo(response.seal[j].acceptor).userinfo.customername;
              }
              if (response.seal[j].regulator != null && response.seal[j].regulator !== '') {
                response.seal[j].regulator = getUserInfo(response.seal[j].regulator).userinfo.customername;
              }

              if (response.seal[j].acceptstate === 'true') {
                response.seal[j].acceptstate = true;
              }
              if (response.seal[j].regulatorstate === 'true') {
                response.seal[j].regulatorstate = true;
              }
              response.seal[j].modifyon = true;
              response.seal[j].modifyby = true;

              if (this.userlist === this.$store.getters.userinfo.userid) {
                response.seal[j].modifyon = true;
                if (response.seal[j].acceptstate === true) {
                  response.seal[j].modifyby = false;
                } else {
                  response.seal[j].modifyby = true;
                }
              }
              if (roles === '0' && response.seal[j].status == this.$t('label.PFANS5004VIEW_OVERTIME')) {
                response.seal[j].modifyon = false;
                if (this.userlist === this.$store.getters.userinfo.userid) {
                  response.seal[j].modifyby = false;
                }
                if (response.seal[j].acceptstate === true) {
                  response.seal[j].modifyon = true;
                }
                if (response.seal[j].regulatorstate === true) {
                  response.seal[j].modifyby = true;
                }
              }
              //add-ws-12/21-印章盖印
            }
            this.data = response.seal;
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
      handleacceptstate1(row) {

        if (row.regulatorstate) {
          if (this.handlsealid != '') {
            this.handlsealid = this.handlsealid + ',' + row.sealid;
          } else {
            this.handlsealid = row.sealid;
          }
          this.checklist = this.handlsealid.split(',');
        } else {
          if (this.handlsealid !== null && this.handlsealid !== '') {
            for (let a = 0; a < this.checklist.length; a++) {
              if (row.sealid === this.checklist[a]) {
                this.checklist.splice(a, 1);
              }
            }
            let checktableD = '';
            for (let c = 0; c < this.checklist.length; c++) {
              checktableD = checktableD + this.checklist[c] + ',';
            }
            this.handlsealid = '';
            this.handlsealid = checktableD.substring(0, checktableD.length - 1);
          }
        }

      },
      handleacceptstate(row) {
        if (row.acceptstate) {
          if (this.handlsealid != '') {
            this.handlsealid = this.handlsealid + ',' + row.sealid;
          } else {
            this.handlsealid = row.sealid;
          }
          this.checklist = this.handlsealid.split(',');
        } else {
          if (this.handlsealid !== null && this.handlsealid !== '') {
            for (let a = 0; a < this.checklist.length; a++) {
              if (row.sealid === this.checklist[a]) {
                this.checklist.splice(a, 1);
              }
            }
            let checktableD = '';
            for (let c = 0; c < this.checklist.length; c++) {
              checktableD = checktableD + this.checklist[c] + ',';
            }
            this.handlsealid = '';
            this.handlsealid = checktableD.substring(0, checktableD.length - 1);
          }
        }


      },
      getsealdetaildate(sealdetaildate) {
        if (sealdetaildate != null) {
          if (sealdetaildate.length > 0) {
            return moment(sealdetaildate[0]).format('YYYY-MM-DD') + ' ~ ' + moment(sealdetaildate[1]).format('YYYY-MM-DD');
          } else {
            return '';
          }
        } else {
          return '';
        }
      },
      insertnamedialogs() {
        if (!this.insertnamedialog) {
          if (this.sealdetaildate == '') {
            Message({
              message: this.$t('label.PFANS4001FORMVIRW_RRROR2'),
              type: 'error',
              duration: 5 * 1000,
            });
            return;
          }
          if (this.userlist == '') {
            Message({
              message: this.$t('label.PFANS4001FORMVIRW_ERROR1'),
              type: 'error',
              duration: 5 * 1000,
            });
            return;
          }
          let sealdetaildate = this.getsealdetaildate(this.sealdetaildate);
          let parameter = {
            sealdetaildate: sealdetaildate,
            sealdetailname: this.userlist,
          };
          this.loading = true;
          this.$store
            .dispatch('PFANS4001Store/insertnamedialog', parameter)
            .then(response => {
              Message({
                message: this.$t('normal.success_02'),
                type: 'success',
                duration: 5 * 1000,
              });
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
          {
            this.loading = true;
            this.$store
              .dispatch('PFANS4001Store/selectcognition')
              .then(response => {
                if (response.length > 0) {
                  this.userlist = response[0].sealdetailname;
                  if (getUserInfo(response[0].sealdetailname)) {
                    this.user = getUserInfo(response[0].sealdetailname).userinfo.customername;
                  }
                  if (response[0].sealdetaildate !== '' && response[0].sealdetaildate !== null) {
                    let claimdatetime = response[0].sealdetaildate;
                    let claimdatetim = claimdatetime.slice(0, 10);
                    let claimdatetime1 = claimdatetime.slice(claimdatetime.length - 10);
                    this.sealdetaildate = [claimdatetim, claimdatetime1];
                    this.sealdetail = claimdatetim + '~' + claimdatetime1;
                    if (moment(claimdatetim).format('YYYY-MM-DD') > moment(new Date()).format('YYYY-MM-DD') || moment(new Date()).format('YYYY-MM-DD') > moment(claimdatetime1).format('YYYY-MM-DD')) {
                      this.userlist = this.$store.getters.userinfo.userid;
                      if (getUserInfo(this.$store.getters.userinfo.userid)) {
                        this.user = getUserInfo(this.$store.getters.userinfo.userid).userinfo.customername;
                      }
                      let claimdatetim = moment(new Date()).format('YYYY-MM-DD');
                      let claimdatetime1 = moment(new Date()).add(1, 'y').format('YYYY');
                      let claimdatetime2 = claimdatetime1 + '-03-31';
                      this.sealdetaildate = [claimdatetim, claimdatetime2];
                      this.sealdetail = claimdatetim + '~' + claimdatetime1;
                    }
                  }
                }
                this.loading = false;
              });
          }
        }
      },
      getUserids(val) {
        this.sealdetailname = val;
        this.userlist = val;
        if (getUserInfo(val)) {
          this.user = getUserInfo(val).userinfo.customername;
        }
      },
      //add-ws-12/21-印章盖印
      rowClick(row) {
        this.rowid = row.sealid;
      },
      buttonClick(val) {
        this.$store.commit('global/SET_HISTORYURL', this.$route.path);
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
            name: 'PFANS4001FormView',
            params: {
              _id: this.rowid,
              disabled: false,
            },
          });
        }
        if (val === 'insert') {
          this.$router.push({
            name: 'PFANS4001FormView',
            params: {
              _id: '',
              disabled: true,
            },
          });
        }
        if (val === 'edit') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.$router.push({
            name: 'PFANS4001FormView',
            params: {
              _id: this.rowid,
              disabled: true,
            },
          });
        }
        if (val === 'insertname') {
          this.insertnamedialog = true;
        }
        if (val === 'recognition') {
          if (this.handlsealid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.loading = true;
          this.$store
            .dispatch('PFANS4001Store/insertrecognition', {'sealid': this.handlsealid})
            .then(response => {
              this.getList();
              Message({
                message: this.$t('normal.success_02'),
                type: 'success',
                duration: 5 * 1000,
              });
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

        }
      },
    },
  };
</script>
<style scoped>
</style>
