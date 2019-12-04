<template>
  <div style="min-height: 100%" class="user_role_form">
    <EasyNormalTable :title="title" :columns="columns" :data="roleList" :buttonList="buttonList" ref="roletable"
                     @buttonClick="buttonClick" :showSelection="true" v-loading="loading"></EasyNormalTable>
  </div>
</template>
<script>
  import EasyNormalTable from "@/components/EasyNormalTable";
  import { Message } from 'element-ui'
  export default {
    name: 'usersToRoleView',
    components: {
      EasyNormalTable
    },
    data() {
      return{
        title: "角色",
        roleList: [],
        userHasRoles: [],
        loading: false,
        selectedlist: [],
        // 列属性
        columns: [
          {
            code: 'rolename',
            label: '角色名称',
            width: 200,
            fix: false,
            filter: true
          },
          {
            code: 'description',
            label: '描述',
            width: 200,
            fix: false,
            filter: false
          }
        ],
        buttonList:[
          { key: 'back', name: '返回' },
          { key: 'roleSave', name: '保存' }
        ]
      }
    },
    mounted() {
      this.getRoleList();
    },
    methods: {
      // 返回
      cancelForm() {
        if(this.$store.getters.historyUrl){
          this.$router.push(this.$store.getters.historyUrl);
        }
      },
      // 点击按钮事件
      buttonClick(val) {
        if(val === 'back') {
          this.cancelForm();
        }else if(val === 'roleSave') {
          this.userToRole();
        }
      },
      // 保存
      userToRole() {
        this.selectedlist = this.$refs.roletable.selectedList;
        console.log(this.selectedlist);
        let userAccount = {
          _id: this.$route.params._id,
          roles: this.selectedlist
        }
        this.$store.dispatch('usersStore/setRoleToUser', userAccount).then(response => {
          this.cancelForm();
        }).catch(err => {
          Message({
            message: err,
            type: 'error',
            duration: 5 * 1000
          })
        })
      },
      // 获取所有角色列表
      getRoleList() {
        this.loading = true;
        let data = {};
        this.$store.dispatch('usersStore/getRoleList', data).then(response => {
          this.roleList = response;
          this.getById(this.$route.params._id);
          this.loading = false;
        }).catch(err => {
          Message({
            message: err,
            type: 'error',
            duration: 5 * 1000
          })
          this.loading = false;
        })
      },
      // 获取当前用户有的角色
      getById(_id) {
        this.infoloading = true;
        let params = {
          userid: _id
        }
        this.$store.dispatch('usersStore/getById', params).then(response => {
          if(response.userAccount.roles) {
            this.userHasRoles = response.userAccount.roles;
            this.userHasRoles.forEach(item => {
              this.roleList.forEach(roleitem => {
                if(item._id === roleitem._id) {
                  this.$refs.roletable.$refs.eltable.toggleRowSelection(roleitem);
                }
              })
            })
          }
          this.infoloading = false;
        }).catch(err =>{
          Message({
            message: err,
            type: 'error',
            duration: 5 * 1000
          })
          this.infoloading = false;
        })
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .user_role_form {

  }
</style>

