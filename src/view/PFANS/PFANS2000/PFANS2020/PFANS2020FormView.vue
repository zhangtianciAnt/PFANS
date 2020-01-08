<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :canStart="canStart" :title="title" @buttonClick="buttonClick"
                         @end="end"
                         @start="start" @workflowState="workflowState" ref="container" v-loading="loading">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="left" label-width="8rem" ref="reff" style="padding: 2rem">
          <el-row>
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.user_name')" prop="user_name">
                <user :disabled="!disable" :error="error" :selectType="selectType" :userlist="userlist"
                      @getUserids="getUserids" style="width: 9.2rem"></user>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2020VIEW_JOBNUMBER')">
                <el-input :disabled="true" maxlength="20" style="width: 11rem" v-model="form.jobnumber"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.PFANS2020VIEW_JOB')">
                <el-input :disabled="true" maxlength="20" style="width: 11rem" v-model="form.job"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-col :span="24">
            <el-row>
              <el-form-item :label="$t('label.cause')">
                <el-input :disabled="!disable" style="width: 42.5rem"  type="textarea"
                          v-model="form.reason"></el-input>
              </el-form-item>
            </el-row>
          </el-col>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>
<script>
  import EasyNormalContainer from "@/components/EasyNormalContainer";
  import user from "../../../components/user.vue";
  import {Message} from 'element-ui'
  import {getUserInfo} from '@/utils/customize'


  export default {
    name: 'PFANS2020FormVIEW',
    components: {
      EasyNormalContainer, user,
    },
    data() {
      var checkuser = (rule, value, callback) => {
        if (!this.form.user_id || this.form.user_id === '') {
          this.error = this.$t('normal.error_09') + this.$t('label.user_name');
          return callback(new Error(this.$t('normal.error_09') + this.$t('label.user_name')));
        } else {
          this.error = "";
          return callback();
        }
      };
      return {
        selectType: "Single",
        error: '',
        loading: false,
        userlist: "",
        title: "title.PFANS2020VIEW",
        buttonList: [
          {
            key: "save",
            name: "button.save",
            disabled: false,
            icon: "el-icon-check"
          }
        ],
        form: {
          user_id: '',
          jobnumber: '',
          job: '',
          reason: '',
        },
        disable: false,
        rules: {
          user_name: [{
            required: true,
            validator: checkuser,
            trigger: 'change'
          }],
        },
        canStart: false
      };
    },
    mounted() {
      this.loading = true;
      if (this.$route.params._id) {
        this.$store
          .dispatch('PFANS2020Store/getIrregulartimingOne', {"irregulartiming_id": this.$route.params._id})
          .then(response => {
            this.form = response;
            this.userlist = this.form.user_id;
            if (this.form.status === '2') {
              this.disable = false;
            }
            this.loading = false;
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000
            });
            this.loading = false;
          })
      } else {
        this.userlist = this.$store.getters.userinfo.userid;
        this.form.user_id = this.userlist;
        if (this.userlist !== null && this.userlist !== "") {
          let lst = getUserInfo(this.$store.getters.userinfo.userid);
          this.form.jobnumber = lst.userinfo.jobnumber;
          this.form.job = lst.userinfo.post;
          this.loading = false;
        }
      }
    },
    created() {
      if (!this.$route.params.disabled) {
        this.buttonList = [];
      }
      this.disable = this.$route.params.disabled;
    },
    methods: {
      getUserids(val) {
        this.userlist = val;
        this.form.user_id = val;
        let lst = getUserInfo(val);
        if(lst){
          this.form.jobnumber = lst.userinfo.jobnumber;
          this.form.job = lst.userinfo.post;
        }
        else{
          this.form.jobnumber  = '';
          this.form.job = '';
        }
        if (!this.form.user_id || this.form.user_id === '' || val === "undefined") {
          this.error = this.$t('normal.error_08') + this.$t('label.node_operate_user');
        } else {
          this.error = "";
        }
      },
      workflowState(val) {
        if (val.state === '1') {
          this.form.status = '3';
        } else if (val.state === '2') {
          this.form.status = '4';
        }
        this.buttonClick("update");
      },
      start() {
        this.form.status = '2';
        this.buttonClick("update");
      },
      end() {
        this.form.status = '0';
        this.buttonClick("update");
      },
      buttonClick(val) {
        this.$refs["reff"].validate(valid => {
          if (valid) {
            this.loading = true;
            if (this.$route.params._id) {
              this.form.user_id = this.userlist;
              this.$store
                .dispatch('PFANS2020Store/updateIrregulartiming', this.form)
                .then(response => {
                  this.data = response;
                  this.loading = false;
                  if(val !== "update") {
                    Message({
                      message: this.$t('normal.success_02'),
                      type: 'success',
                      duration: 5 * 1000
                    });
                    if (this.$store.getters.historyUrl) {
                      this.$router.push(this.$store.getters.historyUrl);
                    }
                  }
                })
                .catch(error => {
                  Message({
                    message: error,
                    type: 'error',
                    duration: 5 * 1000
                  });
                  this.loading = false;
                })
            } else {
              this.form.user_id = this.userlist;
              this.$store
                .dispatch('PFANS2020Store/insertIrregulartiming', this.form)
                .then(response => {
                  this.data = response;
                  this.loading = false;
                  Message({
                    message: this.$t('normal.success_01'),
                    type: 'success',
                    duration: 5 * 1000
                  });
                  if (this.$store.getters.historyUrl) {
                    this.$router.push(this.$store.getters.historyUrl);
                  }
                })
                .catch(error => {
                  Message({
                    message: error,
                    type: 'error',
                    duration: 5 * 1000
                  });
                  this.loading = false;
                })
            }
          }
        })
      }
    }
  }


</script>

<style rel="stylesheet/scss" lang="scss">

</style>
