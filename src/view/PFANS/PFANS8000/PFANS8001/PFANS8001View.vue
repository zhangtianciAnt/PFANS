<template>
  <div style="min-height: 100%">
    <EasyNormalContainer ref="container" :title="title" @buttonClick="buttonClick" :buttonList="buttonList"
                         :noback="noback"
                         v-loading="loading">
      <div slot="customize" style="margin-top: 4rem;">
        <el-form ref="ruleFormNew" label-width="10rem" style="width:80%;margin:5% auto"
                 :rules="rulesNew" :model="ruleFormNew" :label-position="labelPosition">
          <el-form-item :label="$t('label.PFANS8001VIEW_PASSWORD')" prop="password" style="margin-left: 30%">
            <el-input v-model="ruleFormNew.password" autoComplete="off" style="width: 40%" show-password maxlength="16"></el-input>
          </el-form-item>
          <el-form-item :label="$t('label.PFANS8001VIEW_NEWPASSWORD')" prop="newpsw" style="margin-left: 30%">
            <el-input v-model="ruleFormNew.newpsw" autoComplete="off" style="width: 40%" show-password maxlength="16"></el-input>
          </el-form-item>
          <el-form-item :label="$t('label.PFANS8001VIEW_NPASSWORD')" prop="confirmPsw" style="margin-left: 30%">
            <el-input v-model="ruleFormNew.confirmPsw" autoComplete="off" style="width: 40%" show-password maxlength="16"></el-input>
          </el-form-item>
          <div class="sub_color_red" style="margin-left: 30%">
            {{$t('label.PFANS8001VIEW_TISHI')}}
          </div>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>
<script>
    import EasyNormalContainer from "@/components/EasyNormalContainer";
    import {Message} from 'element-ui'

    export default {
        name: "PFANS8001View.vue",
        components: {
            EasyNormalContainer,
        },
        data() {
            var validatePassword = (rule, value, callback) => {
                if (value.length < 8 && value.length > 0) {
                    callback(new Error(this.$t("label.PFANS8001VIEW_ERROR1")))
                } else if (value.length === 0) {
                    callback(new Error(this.$t('normal.error_08') + this.$t('label.PFANS8001VIEW_PASSWORD')))
                } else {
                    callback()
                }
            }
            var validatePass = (rule, value, callback) => {
                this.regExp = /(?!.*\s)(?!^[\u4e00-\u9fa5]+$)(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{8,16}$/;
                if (value === '') {
                    callback(this.$t('normal.error_08') + this.$t('label.PFANS8001VIEW_NEWPASSWORD'))
                } else if (!this.regExp.test((value))) {
                    callback(new Error(this.$t('label.PFANS8001VIEW_GESHI')))
                } else if (this.ruleFormNew.newpsw !== '' && value.length < 8) {
                    callback(new Error(this.$t("label.PFANS8001VIEW_ERROR1")))
                    this.$refs.ruleFormNew.validateField('confirmPsw')
                } else if (value == this.ruleFormNew.password) {
                    callback(new Error(this.$t("label.PFANS8001VIEW_ERROR4")))
                } else if (value.length < 8 && value.length > 0) {
                    callback(new Error(this.$t("label.PFANS8001VIEW_ERROR1")))
                }
                callback()
            }
            var validatePassNew = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(this.$t("label.PFANS8001VIEW_ERROR5")))
                } else if (value !== this.ruleFormNew.newpsw) {
                    callback(new Error(this.$t("label.PFANS8001VIEW_ERROR6")))
                } else if (value.length < 8 && value.length > 0) {
                    callback(new Error(this.$t("label.PFANS8001VIEW_ERROR1")))
                } else {
                    callback()
                }
            }
            return {
                noback: true,
                loading: false,
                labelPosition: "left",
                title: "title.PFANS8001VIEW",
                buttonList: [{
                    key: "save",
                    name: "button.save",
                    icon: "el-icon-check"
                }],
                regExp: [],
                ruleFormNew: {
                    password: '',
                    newpsw: '',
                    confirmPsw: ''
                },
                rulesNew: {
                    password: [
                        {
                            required: true,
                            trigger: 'blur',
                            message: this.$t('normal.error_08') + this.$t('label.PFANS8001VIEW_PASSWORD')
                        },
                        {validator: validatePassword, trigger: 'blur'}
                    ],
                    newpsw: [
                        {
                            required: true,
                            trigger: 'blur',
                            message: this.$t('normal.error_08') + this.$t('label.PFANS8001VIEW_NEWPASSWORD')
                        },
                        {validator: validatePass, trigger: 'blur'}],
                    confirmPsw: [
                        {
                            required: true,
                            trigger: 'blur',
                            message: this.$t('normal.error_08') + this.$t('label.PFANS8001VIEW_NPASSWORD')
                        },
                        {validator: validatePassNew, trigger: 'blur'}]
                }
            }
        },
        methods: {
            buttonClick(val) {
                this.$refs["ruleFormNew"].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        this.$store.dispatch('PFANS8001Store/Password', this.ruleFormNew)
                            .then(response => {
                                this.loading = false;
                                if (response.code === 0) {
                                    Message({
                                        message: this.$t("normal.success_password"),
                                        type: 'success',
                                        duration: 2 * 1000
                                    })
                                    this.$router.push('/')
                                } else {
                                    this.loading = false;
                                    Message({
                                        message: this.$t("normal.error_password"),
                                        type: 'error',
                                        duration: 2 * 1000
                                    })
                                }
                            }).catch(error => {
                            return false;
                        })
                    }
                });

            },
        }
    }
</script>
<style scoped>
</style>
