<template>
  <div style="width: 25%;position: absolute;top: 0;bottom: 0;left: 0;right: 0;margin: auto;height: 60%;">
    <el-form autoComplete="off" :model="registerForm" :rules="registerRules" ref="registerForm"
             label-position="left">
      <div>
        <el-row :gutter="24">
          <el-col :span="24"><h3>体 验 新 园 素</h3></el-col>
        </el-row>
      </div>
      <el-form-item prop="account">
        <el-input name="account" type="text" prefix-icon="el-icon-edit" v-model="registerForm.account"
                  autoComplete="off" placeholder="手机号">
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input name="password" prefix-icon="el-icon-share" :type="passwordType" v-model="registerForm.password"
                  autoComplete="off"
                  placeholder="密码">
        </el-input>
      </el-form-item>
      <el-form-item>
        <ConfirmSlider ref="confirmslider"></ConfirmSlider>
      </el-form-item>
      <el-form-item style="float: right">
        <el-button type="text" @click="$router.push('/')">返回登录</el-button>
      </el-form-item>
      <el-button type="primary" style="width:100%;margin-bottom:20px;font-size:18px" :loading="loading"
                 @click.native.prevent="handleLogin">立即体验
      </el-button>
    </el-form>


    <el-dialog :visible.sync="showSuccess" :append-to-body=true :show-close="false">
      <span style="font-size: x-large"><i class="el-icon-success"></i>我们已收到您的体验申请</span>
      <br/>
      <br/>
      <span style="font-size: larger">工作人员将于两个工作日之内与您联系沟通</span>
      <br/>
      <br/>
      <router-link to="/">
        <el-button type="info">返回</el-button>
      </router-link>
    </el-dialog>

  </div>
</template>

<script>
  import ConfirmSlider from '@/components/EasySliderConfirm'
  import {isvalidPhone} from '@/utils/validate.js'
  import {Message} from 'element-ui'

  export default {
    name: 'index',
    components: {ConfirmSlider},
    data() {

      const validatePassword = (rule, value, callback) => {
        if (value.length < 6 && value.length > 0) {
          callback(new Error('请输入最少6位密码'))
        } else if (value.length === 0) {
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      }

      const validatePhone = (rule, value, callback) => {
        if (value.length === 0) {
          callback(new Error('请输入手机号'))
        } else if (!isvalidPhone(value)) {
          callback(new Error('格式不正确'))
        } else {
          this.$store
            .dispatch("registerStore/GetCurrentUserAccount", {"account":value})
            .then(response => {
              if(response !== 0){

                callback('该账号已存在')
              }else{

                callback()
              }
            })
            .catch(error => {
              Message({
                message: error, //error.message,
                type: 'error',
                duration: 5 * 1000
              })
            });
        }
      }

      return {
        registerForm: {
          account: '',
          password: '',
          usertype: "0"
        },
        registerRules: {
          account: [
            {required: true, trigger: 'change', validator: validatePhone}
          ],
          password: [
            {required: true, trigger: 'change', validator: validatePassword}
          ]
        },
        passwordType: 'password',
        loading: false,
        showSuccess: false

      }
    },
    created() {

    },
    methods: {
      handleLogin() {
        this.loading = true;
        this.$refs.registerForm.validate(valid => {
          if (valid) {
            if (this.$refs.confirmslider.confirmSuccess !== true) {
              this.$message({
                message: '请拖动滑块完成验证后重新登陆！',
                type: 'warning'
              })
              this.loading = false;
              return false
            }
            this.$store
              .dispatch("registerStore/Register", this.registerForm)
              .then(() => {
                this.loading = false;
                this.showSuccess = true;
              })
              .catch(error => {
                this.loading = false;
                Message({
                  message: error, //error.message,
                  type: 'error',
                  duration: 5 * 1000
                })
              });
          } else {
            this.loading = false;
            return false
          }
        })
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
