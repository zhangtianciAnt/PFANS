<template>
  <div>
    <EasyNormalTable :title="title" :columns="columns" :data="data" :buttonList="buttonList" ref="roletable"
                     @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading" :rowid="row_id">
      <el-date-picker
        v-model="months"
        slot="customize"
        type="month"
        style="width:11vw"
        @change="changed"
        :placeholder="$t('normal.error_09')">
      </el-date-picker>
    </EasyNormalTable>
  </div>
</template>
<script>
  import EasyNormalTable from "@/components/EasyNormalTable";
  import {Message} from 'element-ui';
  import {getUserInfo} from "../../../../utils/customize";
  import moment from 'moment';
  export default {
    name: 'PFANS5012View',
    components: {
      EasyNormalTable
    },
    data() {
      return {
        totaldata: [],
        months:moment(new Date()).format("YYYY-MM"),
        total: 0,
        checkTableData: [],
        addActionUrl: '',
        resultShow: false,
        file: null,
        loading: false,
        title: "title.PFANS5012View",
        data: [],
        transferData: [],
        selectedlist: [],
        columns: [
          {
            code: 'centername',
            label: 'label.center',
            width: 140,
            fix: false,
            filter: true
          },
          {
            code: 'groupname',
            label: 'label.group',
            width: 140,
            fix: false,
            filter: true
          },
          // {
          //   code: 'numbers',
          //   label: 'label.PFANS2009VIEW_JUNE',
          //   width: 140,
          //   fix: false,
          //   filter: true
          // },
          {
            code: 'confirm',
            label: 'label.PFANS1036FORMVIEW_JOBNUMBER',
            width: 140,
            fix: false,
            filter: true
          },
          {
            code: 'status',
            label: 'label.status',
            width: 140,
            fix: false,
            filter: true
          },
        ],
        buttonList: [
          {'key': 'handle', 'name': 'button.handle', 'disabled': false, 'icon': 'el-icon-view'},
        ],
        rowid: '',
        row_id: 'projectname'
      };
    },
    mounted() {
      let groupid;
      let groupuserlist = [];
      let groupcooperinterview = [];
      let user = getUserInfo(this.$store.getters.userinfo.userid);
      if (user) {
        groupid = user.userinfo.groupid;
        let userinfo =  this.$store.getters.userList;
        for (let i = 0;i < userinfo.length; i ++){
          if(userinfo[i].userinfo.groupid === groupid){
            groupuserlist.push(userinfo[i].userid);
          }
        }
      }
      // let cooperinterviewList =  this.$store.getters.cooperinterviewList;
      // for (let i = 0;i < cooperinterviewList.length; i ++){
      //   if(cooperinterviewList[i].groupid === groupid){
      //     groupcooperinterview.push({
      //       username: groupcooperinterview[i].customername
      //     });
      //   }
      // }
      //
      let letorgGroupList = this.$store.getters.orgGroupList;
      for (let i = 0;i < letorgGroupList.length; i ++){
        if(letorgGroupList[i].groupid === groupid){
          let group = {};
          group.centername = letorgGroupList[i].centername;
          group.groupname = letorgGroupList[i].groupname;
          group.groupid = groupid;
          group.confirm = '0';
          group.status = '';
          group.groupuserlist = groupuserlist;
          group.cooperinterviewList = groupcooperinterview;
          this.data.push(group);
        }
      }
      this.getProjectList();
    },
    methods: {
      rowClick(row) {
        this.rowid = row.groupuserlist;
      },
      changed(val){
        this.months = moment(val).format('YYYY-MM');
        this.getProjectList();
      },
      getProjectList(){
        this.loading = true;
        this.$store
          .dispatch('PFANS5001Store/getProjectList', {StrFlg:"2",StrDate:this.months})
          .then(response => {
            for (let i = 0;i < this.data.length; i ++){
              let status;
              let groupuserlist = this.data[i].groupuserlist;
              let confirm = 0;
              if (this.$i18n) {
                 status = this.$t('label.PFANS5012VIEW_CONFIRM');
              }
              for (let j = 0;j < response.length; j ++){
                for (let x = 0;x < groupuserlist.length; x ++){
                  if(response[j].projectid === groupuserlist[x]){
                    let letconfirm = response[j].confirm === null || response[j].confirm === "" ? 0 : Number(response[j].confirm);
                    confirm = Number(confirm) + Number(letconfirm);
                    if (this.$i18n) {
                      if(response[j].unconfirm != null){
                        if(Number(response[j].unconfirm) > 0){
                            if (this.$i18n) {
                                status = this.$t('label.PFANS5012VIEW_UNCONFIRM');
                            }
                        }
                      }
                    }
                  }
                }
              }
              this.data[i].confirm = confirm;
              this.data[i].status = status;
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

      buttonClick(val) {
        this.$store.commit('global/SET_HISTORYURL', this.$route.path);
        if (val === 'handle') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000
            });
            return;
          }
          this.$router.push({
            name: 'PFANS5012FormView',
            params: {
              _id: this.rowid,
              disabled: false
            }
          })
        }
      }
    }

  }
</script>
<style rel="stylesheet/scss" lang="scss">
</style>
