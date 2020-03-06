<template>
  <div>
    <EasyNormalTable :title="title" :columns="columns" :data="data" :buttonList="buttonList" ref="roletable"
                     @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading" :rowid="row_id" >
    </EasyNormalTable>
  </div>
</template>
<script>
  import EasyNormalTable from "@/components/EasyNormalTable";
  import {Message} from 'element-ui';
  import {getUserInfo} from "../../../../utils/customize";
  let moment = require("moment");
  export default {
    name: 'PFANS5012View',
    components: {
      EasyNormalTable
    },
    data() {
      return {
        totaldata: [],
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
      let groupuser = [];
      let groupcooperinterview = [];
      let user = getUserInfo(this.$store.getters.userinfo.userid);
      if (user) {
        groupid = user.userinfo.groupid;
        let userinfo =  this.$store.getters.userList;
        for (let i = 0;i < userinfo.length; i ++){
          if(userinfo[i].userinfo.groupid === groupid){
            groupuser.push(userinfo[i].userid);
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
          group.confirm = '';
          group.status = '';
          group.groupuser = groupuser;
          group.groupuserlist = groupuser;
          group.cooperinterviewList = groupcooperinterview;
          this.data.push(group);
        }
      }
      //group.groupuserlist = groupuser.join("','");
      this.getProjectList();
    },
    methods: {
      rowClick(row) {
        this.rowid = row.groupuserlist;
      },
      getProjectList(){
        this.loading = true;
        this.$store
          .dispatch('PFANS5001Store/getProjectList', {StrFlg:"2",StrDate:'2020-03'})
          .then(response => {
            for (let i = 0;i < this.data.length; i ++){
              let groupuser = this.data[i].groupuser;
              for (let j = 0;j < response.length; j ++){
                for (let x = 0;x < groupuser.length; x ++){
                  if(response[j].projectid === groupuser[x]){
                    let letdata = {};
                    this.data[i].confirm = response[i].confirm === null ? 0 : Number(response[i].confirm);
                    if (this.$i18n) {
                      this.data[i].status = this.$t('label.PFANS5012VIEW_UNCONFIRM');
                      if(response[i].unconfirm != null){
                        if(Number(response[i].unconfirm) > 0){
                          this.data[i].status = this.$t('label.PFANS5012VIEW_UNCONFIRM');
                        }
                      }
                      else{
                        if(response[i].confirm != null){
                          if(Number(response[i].confirm) > 0){
                            this.data[i].status = this.$t('label.PFANS5012VIEW_CONFIRM');
                          }
                        }
                      }
                    }
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
