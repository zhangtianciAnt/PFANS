<template>
  <div
    style="width: 25%;position: absolute;top: 0;bottom: 0;left: 0;right: 0;margin: auto;height: 60%;text-align: center"
  >
    <el-form
      autocomplete="off"
      :model="loginForm"
      :rules="loginRules"
      ref="loginForm"
      label-position="left"
      class="sub_bg_color_blue"
      style="height: 100%;background:rgba(0,91,170,0.4)"
    >
      <div>
        <el-row :gutter="24" style="text-align: center">
          <el-col :span="24" style="margin: 0 auto"><img :src="logo" style="height: 60px;width: auto;padding-top: 30px"/></el-col>

        </el-row>
      </div>
      <el-form-item prop="account" style="padding-top: 30px;width: 80%;margin: 0 auto">
        <el-input
          name="account"
          prefix-icon="el-icon-edit"
          type="text"
          v-model="loginForm.account"
          autocomplete="off"
          :placeholder="$t('login.name')"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password" style="padding-top: 25px;width: 80%;margin: 0 auto">
        <el-input
          name="password"
          prefix-icon="el-icon-share"
          :type="passwordType"
          v-model="loginForm.password"
          autocomplete="off"
          :placeholder="$t('login.password')"
          show-password
        ></el-input>
      </el-form-item>
      <!--<div style="margin-right: 10%;padding-top: 30px;float: right">-->
        <!--<el-row :gutter="24">-->
          <!--<el-col :span="24">-->
            <!--<EasyLocale style="width: 70px"></EasyLocale>-->
          <!--</el-col>-->
        <!--</el-row>-->
      <!--</div>-->

      <el-button
        type="primary"
        style="width:80%;margin-top:40px;font-size:18px"
        :loading="loading"
        @click="handleLogin"
      >{{$t('login.confirmbutton')}}</el-button>
    </el-form>
  </div>
</template>

<script>
import basselogo from "@/assets/png/panasonic_logo.png";
import ConfirmSlider from "@/components/EasySliderConfirm";
import { Message } from "element-ui";
import { setToken } from "@/utils/auth.js";
import { isvalidPhone } from "@/utils/validate.js";
import EasyLocale from "@/components/EasyLocale";
export default {
  name: "index",
  components: { ConfirmSlider,EasyLocale },
  data() {
    const validatePassword = (rule, value, callback) => {
      // if (value.length < 6 && value.length > 0) {
      //   callback(new Error(this.$t('login.error_001')));
      // } else
        if (value.length === 0) {
        callback(new Error(this.$t('login.error_002')));
      } else {
        callback();
      }
    };

    const validatePhone = (rule, value, callback) => {
      if (value.length === 0) {
        callback(new Error(this.$t('login.error_003')));
      }else{
        callback();
      }
      // else if (!isvalidPhone(value)) {
      //   callback(new Error(this.$t('login.error_004')));
      // }
      // else {
      //   this.$store
      //     .dispatch("registerStore/GetCurrentUserAccount", { account: value })
      //     .then(response => {
      //       if (response === 0) {
      //         callback(this.$t('login.error_005'));
      //       } else {
      //         callback();
      //       }
      //     })
      //     .catch(error => {
      //       Message({
      //         message: error, //error.message,
      //         type: "error",
      //         duration: 5 * 1000
      //       });
      //     });
      // }
    };

    return {
      loginForm: {
        account: "",
        password: ""
      },
      loginRules: {
        account: [
          { required: true, trigger: "change", validator: validatePhone }
        ],
        password: [
          { required: true, trigger: "change", validator: validatePassword }
        ]
      },
      passwordType: "password",
      loading: false
    };
  },
  props: {
    logo: {
      type: String,
      default: basselogo
    },
    title: {
      type: String,
      default: "EasyDEV"
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store
            .dispatch("registerStore/Login", this.loginForm)
            .then(response => {
              setToken(response.token);
              this.$router.push("/index");


            })
            .catch(error => {
              Message({
                message: error, //error.message,
                type: "error",
                duration: 5 * 1000
              });
            });
        } else {
          return false;
        }
      });
    }
  },
  mounted() {},
  watch: {}
};
</script>
<style rel="stylesheet/scss" lang="scss">
</style>

