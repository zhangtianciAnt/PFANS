<template>
  <div style="min-height: 100%" class="personalCenter_baseInfo" v-loading="loading">
    <EasyNormalContainer ref="container" :title="title" @buttonClick="buttonClick" :buttonList="buttonList">
      <div slot="customize">
      <el-form  :model="baseInfoForm" ref="baseInfoForm"
                style="width:80%;margin:5% auto" label-width="8rem" >
        <el-form-item label="姓名:" prop="customername">
          <el-input
            name="customername"
            type="text" v-model="baseInfoForm.customername"/>
        </el-form-item>
        <el-form-item label="性别:">
          <el-radio-group v-model="radio">
            <el-radio :label="0">男</el-radio>
            <el-radio :label="1">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="办公电话:" prop="tel">
          <el-input
            name="tel"
            type="text" v-model="baseInfoForm.tel"/>
        </el-form-item>
        <el-form-item label="密码:">
          <el-button type="primary" icon="el-icon-edit" @click="showPsw=true" plain>修改密码</el-button>
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <span>{{this.baseInfoForm.email}}</span>
        </el-form-item>
        <el-form-item label="手机:" prop="mobilenumber">
          <span>{{this.baseInfoForm.mobilenumber}}</span>
        </el-form-item>
        <el-form-item label="账号创建时间:" prop="createon">
          <span  style="width: 30%">{{this.baseInfoForm.accCreatedon}}</span>
        </el-form-item>
        <el-form-item label="工号:" prop="jobnumber">
          <span >{{this.baseInfoForm.jobnumber}}&nbsp;</span>
        </el-form-item>
        <el-form-item label="部门:" prop="departmentid">
          <org :orglist="this.orglist" :orgtype="orgtype" :disabled="disabledConfirm"></org>
        </el-form-item>
        <el-form-item label="系统角色:" prop="roleinstacename">
          <span >{{baseInfoForm.accRoles}}&nbsp;</span>
        </el-form-item>
        <!--<el-form-item label="账号状态" prop="status">-->
          <!--<el-switch-->
            <!--v-model="status"-->
            <!--active-color="#13ce66"-->
            <!--inactive-color="#ff4949"-->
            <!--active-value="0"-->
            <!--inactive-value="1"-->
            <!--:width=60-->
            <!--@change="formcommit"-->
          <!--&gt;-->
          <!--</el-switch>-->
        <!--</el-form-item>-->
      </el-form>
      </div>
    </EasyNormalContainer>
    <el-dialog title="修改密码" :visible.sync="showPsw" width="40%" @close="closeDialog" v-loading="loading">
      <el-form class="dialogform" :model="ruleFormNew" status-icon :rules="rulesNew" ref="ruleFormNew" label-position="right"  label-width="8rem">
        <el-form-item label="原密码:" prop="password">
          <el-input name="password"   v-model="ruleFormNew.password" autoComplete="off"/>
        </el-form-item>
        <el-form-item label="新密码:" prop="newpsw">
          <el-input name="newpsw"  v-model="ruleFormNew.newpsw" autoComplete="off" />
        </el-form-item>
        <el-form-item label="确认密码:" prop="confirmPsw">
          <el-input name="confirmPsw"  v-model="ruleFormNew.confirmPsw" autoComplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button @click="resetForm('ruleFormNew')">重置</el-button>
          <el-button type="primary" @click="submitForm('ruleFormNew')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import EasyNormalContainer from "@/components/EasyNormalContainer";
import { Message } from 'element-ui'
import org from "@/view/components/org.vue";
import { parseTime } from '@/utils/customize'
export default {
  name: 'personalCenterView',
  components: {
    EasyNormalContainer,
    org
  },
  data () {
    var validatePassword = (rule, value, callback) => {
      if (value.length < 6 && value.length > 0) {
        callback(new Error('请输入最少6位密码'))
      } else if (value.length === 0) {
        callback(new Error('请输入密码'))
      }else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else if (this.ruleFormNew.newpsw !== '' && value.length < 6 ) {
          callback(new Error('请输入最少6位密码'))
          this.$refs.ruleFormNew.validateField('confirmPsw')
        } else if (value == this.ruleFormNew.password  ) {
          callback(new Error('新密码与原密码不可相同'))
        } else if (value.length < 6 && value.length > 0) {
          callback(new Error('请输入最少6位密码'))
        }
        callback()
      }
    var validatePassNew = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      }else if (value !== this.ruleFormNew.newpsw) {
        callback(new Error('两次输入密码不一致!'))
      }  else if (value.length < 6 && value.length > 0) {
        callback(new Error('请输入最少6位密码'))
      } else {
        callback()
      }
    }
    return {
      disabledConfirm: true,
      //status:true,
      title:"基本信息",
      orglist:"",
      loading: false,
      orgtype:"2",
      buttonList:[
        { key: 'userSave', name: '保存' },
      ],
      baseInfoForm: {
        userinfo:"",
        createon:"",
        roles:""
       },
      custominfo: {
        userinfo: {
          tel: '',
          customername: ''
        }
      },
      radio: 1,
      showPsw: false,
      ruleFormNew: {
        password: '',
        newpsw: '',
        confirmPsw: ''
      },
      rulesNew: {
        password: [
          { required: true, trigger: 'blur', message: '请输入原密码' },
          { validator: validatePassword, trigger: 'blur' }
        ],
        newpsw: [
          { required: true, trigger: 'blur', message: '请输入新密码' },
          { validator: validatePass, trigger: 'blur' }],
        confirmPsw: [
          { required: true, trigger: 'blur', message: '请输入确认密码' },
          { validator: validatePassNew, trigger: 'blur' }]
      }
    }
  },
  mounted () {
    this.onLoad();
  },
  methods: {
    //修改密码点击确定
    submitForm(ruleFormNew) {
      this.loading=true;
      this.$refs[ruleFormNew].validate((valid) => {
        if (valid) {
          this.$store.dispatch('personalCenterStore/Password', this.ruleFormNew)
            .then(response => {
              if(response.code === 0)
              {
                Message({
                  message: response.message,
                  type: 'success',
                  duration: 2 *  1000
                })
                this.showPsw=false;
              }
              else {
                Message({
                  message: "原密码错误",
                  type: 'error',
                  duration: 2 *  1000
                })
              }
              this.loading=false;
            }).catch(error => {
            return false;
          })
        }
      });
    },
    buttonClick(val) {
      if(val === 'userSave') {
        // 保存按钮
        this.saveInfo();
      }else {
        this.cancelForm();
      }
    },
    //账号状态按钮
    // formcommit(val){
    //   this.loading = true;
    //   let params = {
    //     userid: this.custominfo.userid,
    //     status:  val==="0" ? "1":"0"
    //   }
    //   this.$store.dispatch('usersStore/disableUser', params).then(response => {
    //     this.loading = false;
    //   }).catch(err => {
    //     Message({
    //       message: err,
    //       type: 'error',
    //       duration: 5 * 1000
    //     })
    //     this.loading = false;
    //   })
    // },
    // 关闭画面
    closeDialog () {
      this.showPsw = false
      this.resetForm('ruleFormNew')
      this.$store.dispatch('CloseDialog')
    },
    // 清空表单
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    //保存信息
    saveInfo(){
      this.custominfo.userinfo.tel = this.baseInfoForm.tel;
      this.custominfo.userinfo.customername = this.baseInfoForm.customername;
      this.custominfo.userinfo.sex = this.radio
      this.$store
        .dispatch('personalCenterStore/savePersonal',this.custominfo)
        .then(response =>{
          if(response.code === 0)
          {
            Message({
              message: response.message,
              type: 'success',
              duration: 1 *  1000
            })
            this.$store.commit('global/SET_NAME', this.custominfo.userinfo.customername)
            // this.$router.push({
            //   name: 'logIn'
            // })
          }
          else {
            Message({
              message: response.message,
              type: 'error',
              duration: 1 *  1000
            })
          }
        })
        .catch(error => {
        })
    },
    cancelForm() {
      this.$router.push({
        name: 'index'
      })
    },
    //获取基本信息
    onLoad(){
      this.loading = true;
      this.$store
        .dispatch('personalCenterStore/getPersonalCenter',this.baseInfoForm)
        .then(response => {
          if(response.customerInfo) {
            this.custominfo = response.customerInfo;
            if(response.customerInfo.userinfo.departmentid) {
              this.orglist = response.customerInfo.userinfo.departmentid.join();
            }
            this.radio = parseInt(response.customerInfo.userinfo.sex);//性别
            this.baseInfoForm = response.customerInfo.userinfo;//个人信息
            this.baseInfoForm.accCreatedon = parseTime(response.customerInfo.createon, '{y}-{m}-{d}');
          }
          this.status = response.userAccount.status;//账号状态
          let roles = response.userAccount.roles;//系统角色
          let rolename = '';
          if (roles && roles.length > 0)
          {
            roles.map(item => {
              rolename = rolename + item.rolename + ",";
            });
            if(rolename.endsWith(',')){
              rolename = rolename.substring(0, rolename.length - 2);
            }
          }
          this.baseInfoForm.accRoles = rolename;
          this.baseInfoForm.mobilenumber = response.userAccount.account;
          this.loading = false;
        }).catch(err => {
        Message({
          message: err,
          type: 'error',
          duration: 5 * 1000
        })
      })
    }
 }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    .el-input--medium .el-input__inner {
      border: none;
    }
    a {
      cursor: pointer;
      background: transparent;
      color: #5d9cec;
      text-decoration: none;
    }
    a:hover {
      color: #fb6e52;
      text-decoration: underline;
    }
</style>

