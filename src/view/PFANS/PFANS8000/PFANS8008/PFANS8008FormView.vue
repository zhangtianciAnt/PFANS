<template>
  <EasyNormalContainer
    :buttonList="buttonList"
    :title="titles"
    @buttonClick="buttonClick"
    ref="container"
    v-loading="loading"
  >
    <div slot="customize" style="margin-top:2rem">
      <el-form :model="form" :rules="rules" label-position="left" label-width="100px" ref="form">
        <el-form-item :label="$t('label.PFANS8008VIEW_MESSAGE_HEADER')" prop="title">
          <el-input :disabled="!disable" class="width" maxlength="50" v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item :label="$t('label.PFANS8008VIEW_AVAILABLESTATE')">
          <el-radio
            :disabled="!disable"
            label="0"
            v-model="form.availablestate"
          >{{this.$t('label.PFANS8008FORMVIEW_EFFECTIVE')}}</el-radio>
          <el-radio
            :disabled="!disable"
            label="1"
            v-model="form.availablestate"
          >{{this.$t('label.PFANS8008FORMVIEW_INVALID')}}</el-radio>
        </el-form-item>
        <el-form-item :label="$t('label.PFANS8008FORMVIEW_RICHTEXT')">
          <tinymce :height="300" :readonly="readonly" id="mytinymce" v-model="form.richtext"></tinymce>
        </el-form-item>
      </el-form>
    </div>
  </EasyNormalContainer>
</template>

<script>
  import EasyNormalContainer from "@/components/EasyNormalContainer";
  import tinymce from "./index";
  import {Message} from 'element-ui';

  export default {
    name: "PFANS8008FormView",
    components: { EasyNormalContainer, tinymce },
    data() {
      return {
        loading: false,
        disbaled: false,
        titles: "title.PFANS8008VIEW",
        form: {
          informationid: "",
          title: "",
          availablestate: "0",
          richtext: ""
        },
        disable: false,
        buttonList: [],
        rules: {
          title: [
            {
              required: true,
              message: this.$t("normal.error_10"),
              trigger: "blur"
            }
          ]
        }
      };
    },
    computed: {
      readonly: function() {
        return this.$route.params.readonly;
      }
    },
    created() {
      this.disable = this.$route.params.disabled;
      if (this.disable) {
        this.buttonList = [
          {
            key: "save",
            name: "button.save",
            icon: "el-icon-check"
          }
        ];
      }
    },
    mounted() {
      if (this.$route.params._id) {
        this.getOneInformation(this.$route.params._id);
      }
    },
    methods: {
      getOneInformation(information) {
        this.loading = true;
        this.$store
          .dispatch("PFANS8008Store/getOneInformation", information)
          .then(response => {
            if (response) {
              const {
                title,
                informationid,
                availablestate,
                richtext
              } = response[0];
              this.form = {
                title,
                informationid,
                availablestate,
                richtext
              };
            }
            this.loading = false;
          })
          .catch(err => {
            Message({
              message: err,
              type: "error",
              duration: 5 * 1000
            });
            this.loading = false;
          });
      },
      buttonClick(val) {
        this.$refs["form"].validate(valid => {
          if (valid) {
            this.loading = true;
            if (!this.$route.params._id) {
              this.$store
                .dispatch("PFANS8008Store/insertInformation", this.form)
                .then(response => {
                  this.loading = false;
                  this.$message({
                    message: this.$t("normal.success_01"),
                    type: "success"
                  });
                  if (this.$store.getters.historyUrl) {
                    this.$router.push(this.$store.getters.historyUrl);
                  }
                })
                .catch(err => {
                  this.loading = false;
                  Message({
                    message: err,
                    type: "error",
                    duration: 5 * 1000
                  });
                });
            } else {
              this.loading = true;
              this.$store
                .dispatch("PFANS8008Store/updateInformation", this.form)
                .then(response => {
                  this.loading = false;
                  this.$message({
                    message: this.$t("normal.success_02"),
                    type: "success"
                  });
                  if (val !== "update") {
                    if (this.$store.getters.historyUrl) {
                      this.$router.push(this.$store.getters.historyUrl);
                    }
                  }
                })
                .catch(err => {
                  this.loading = false;
                  Message({
                    message: err,
                    type: "error",
                    duration: 5 * 1000
                  });
                });
            }
          }
        });
      }
    }
  };
</script>

<style scoped>
  .width {
    width: 40%;
  }
</style>
