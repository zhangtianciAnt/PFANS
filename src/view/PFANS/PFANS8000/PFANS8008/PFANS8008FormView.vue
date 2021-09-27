<template>
  <EasyNormalContainer
    :buttonList="buttonList"
    :title="titles" @disabled="setdisabled"
    @buttonClick="buttonClick"
    ref="container"
    v-loading="loading"
  >
    <div slot="customize" style="margin-top:2rem">
      <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="form" style="padding: 2vw">
        <el-form-item :label="$t('label.PFANS8008VIEW_MESSAGE_HEADER')" prop="title">
          <el-input :disabled="!disable" class="width" maxlength="50" v-model="form.title" style="width:20vw"></el-input>
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
        <el-form-item :label="$t('label.enclosure')" prop="enclosurecontent">
          <el-upload
            :action="upload"
            :file-list="fileList"
            :on-error="fileError"
            :on-preview="fileDownload"
            :on-remove="fileRemove"
            :on-success="fileSuccess"
            class="upload-demo"
            drag
            ref="upload">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">{{$t('label.PFANSFORMVIEW_DOWNLOAD')}}<em>{{$t('normal.info_09')}}</em>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item :label="$t('label.PFANS8008FORMVIEW_RICHTEXT')">
          <!--<tinymce :height="300" :readonly="readonly" id="mytinymce" v-model="form.richtext"></tinymce>-->
          <quill-editor v-model="form.richtext" ref="myQuillEditor" style="height: 300px;" :options="editorOption">
          </quill-editor>
        </el-form-item>
      </el-form>
    </div>
  </EasyNormalContainer>
</template>

<script>
  import EasyNormalContainer from "@/components/EasyNormalContainer";
  import tinymce from "./index";
  import {Message} from 'element-ui';
  import {
    quillEditor
  } from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import {downLoadUrl, uploadUrl} from '../../../../utils/customize';

  export default {
    name: "PFANS8008FormView",
    components: { EasyNormalContainer, quillEditor },
    data() {
      return {
        upload: uploadUrl(),
        fileList: [],
        editorOption: {},
        loading: false,
        disbaled: false,
        titles: "title.PFANS8008VIEW",
        form: {
          informationid: "",
          title: "",
          availablestate: "0",
          richtext: "",
          uploadfile: '',
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
      fileSuccess(response, file, fileList) {
        if (response.data == "upload_success") {
          this.fileList = [];
          this.form.uploadfile = '';
          for (var item of fileList) {
            let o = {};
            o.name = item.name;
            if (!item.url) {
              o.url = item.response.info;
            } else {
              o.url = item.url;
            }
            this.fileList.push(o);
            this.form.uploadfile += o.name + ',' + o.url + ';';
          }
        } else {
          Message({
            message: this.$t('label.PFANS2016FORMVIEW_FILEERROR'),
            type: 'error',
            duration: 5 * 1000,
          });
          this.form.uploadfile =''
          this.$refs.upload.clearFiles();
        }
      },
      fileRemove(file, fileList) {
        this.fileList = [];
        this.form.uploadfile = '';
        for (var item of fileList) {
          let o = {};
          o.name = item.name;
          o.url = item.url;
          this.fileList.push(o);
          this.form.uploadfile += item.name + ',' + item.url + ';';
        }
      },
      fileDownload(file) {
        if (file.url) {
          file.url = file.url.replace("%","%25");
          file.url = file.url.replace("#","%23");
          file.url = file.url.replace("&","%26");
          file.url = file.url.replace("+","%2B");
          file.url = file.url.replace("=","%3D");
          file.url = file.url.replace("?","%3F");
          var url = downLoadUrl(file.url);
          window.open(url);
        }
      },
      fileError(err, file, fileList) {
        Message({
          message: this.$t('normal.error_04'),
          type: 'error',
          duration: 5 * 1000,
        });
      },
      setdisabled(val){
        if(this.$route.params.disabled){
          this.disabled = val;
        }
      },
      getOneInformation(information) {
        this.loading = true;
        this.$store
          .dispatch("PFANS8008Store/getOneInformation", information)
          .then(response => {
            if (response) {
              this.form = response[0];
              if (this.form.uploadfile != '' && this.form.uploadfile != null) {
                let uploadfile = this.form.uploadfile.split(';');
                for (var i = 0; i < uploadfile.length; i++) {
                  if (uploadfile[i].split(',')[0] != '') {
                    let o = {};
                    o.name = uploadfile[i].split(',')[0];
                    o.url = uploadfile[i].split(',')[1];
                    this.fileList.push(o);
                  }
                }
              }
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
            this.$message.error({
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
                  this.$message.error({
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
                  this.$message.error({
                    message: err,
                    type: "error",
                    duration: 5 * 1000
                  });
                });
            }
          }
          else{
              Message({
                  message: this.$t("normal.error_12"),
                  type: 'error',
                  duration: 5 * 1000
              });
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
