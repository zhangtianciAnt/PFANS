<template>
  <div style="min-height: 100%">
    <EasyNormalContainer
      v-loading="loading">
      <div slot="customize">
        <div v-html="this.form.richtext" style="overflow: auto"/>
        <el-form :model="form" label-position="top" label-width="8vw" ref="form" style="padding: 2vw">
          <el-form-item :label="$t('label.enclosure')" prop="enclosurecontent">
            <el-upload
              :disabled="true"
              :action="upload"
              :file-list="fileList"
              :on-preview="fileDownload"
              :on-remove="fileRemove"
              class="upload-demo"
              ref="upload">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">{{$t('label.PFANSFORMVIEW_DOWNLOAD')}}
              </div>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>
<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import {Message} from 'element-ui';
  import {downLoadUrl, uploadUrl} from '../../../../utils/customize';
  export default {
    name: "PFANS8003FormView",
    components: {
      EasyNormalContainer
    },
    data() {
      return {
        upload: uploadUrl(),
        fileList: [],
        loading: false,
        _id: '',
        form: {
          richtext: "",
          uploadfile: '',
        },
        noback: true,
      }
    },
    mounted() {
      this._id = this.$route.params._id;
      this.getOneInformation(this._id);
    },
    methods: {
      // fileSuccess(response, file, fileList) {
      //   if (response.data == "upload_success") {
      //     this.fileList = [];
      //     this.form.uploadfile = '';
      //     for (var item of fileList) {
      //       let o = {};
      //       o.name = item.name;
      //       if (!item.url) {
      //         o.url = item.response.info;
      //       } else {
      //         o.url = item.url;
      //       }
      //       this.fileList.push(o);
      //       this.form.uploadfile += o.name + ',' + o.url + ';';
      //     }
      //   } else {
      //     Message({
      //       message: this.$t('label.PFANS2016FORMVIEW_FILEERROR'),
      //       type: 'error',
      //       duration: 5 * 1000,
      //     });
      //     this.form.uploadfile =''
      //     this.$refs.upload.clearFiles();
      //   }
      // },
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
      // fileError(err, file, fileList) {
      //   Message({
      //     message: this.$t('normal.error_04'),
      //     type: 'error',
      //     duration: 5 * 1000,
      //   });
      // },
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
                richtext
              } = response[0];
              this.form = {
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
    }

  }
</script>

<style lang="scss" scoped>
  .upload-demo /deep/ .el-upload{
    display: none;
    text-align: center;
    cursor: pointer;
    outline: 0;
  }
</style>
