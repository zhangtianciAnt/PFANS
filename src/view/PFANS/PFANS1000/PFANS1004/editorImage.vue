<template>
  <div class="upload-container">
    <!-- readonly:String, -->
    <el-button icon="upload" :disabled="disabled" @click=" dialogVisible=true" type="primary">{{this.$t('normal.info_10')}}</el-button>
    <el-dialog :visible.sync="dialogVisible" append-to-body center>
      <el-upload
        class="editor-slide-upload"
        action="https://httpbin.org/post"
        :multiple="true"
        :file-list="fileList"
        :show-file-list="true"
        list-type="picture-card"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
      >
        <el-button size="small" type="primary">{{this.$t('normal.info_09')}}</el-button>
      </el-upload>
      <div slot="footer">
        <el-button @click="dialogVisible = false">{{this.$t('button.cancel')}}</el-button>
        <el-button type="primary" @click="handleSubmit">{{this.$t('button.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { getToken } from 'api/qiniu'

export default {
  name: "editorSlideUpload",
  props: {
    color: {
      type: String,
      default: "#20a0ff"
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: []
    };
  },
  methods: {
    checkAllSuccess() {
      return Object.keys(this.listObj).every(
        item => this.listObj[item].hasSuccess
      );
    },
    handleSubmit() {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v]);
      if (!this.checkAllSuccess()) {
        this.$message(
          this.$t('normal.info_11')
        );
        return;
      }
      console.log("handleSubmit", arr);
      this.$emit("successCBK", arr);
      this.listObj = {};
      this.fileList = [];
      this.dialogVisible = false;
    },
    handleSuccess(response, file) {
      const uid = file.uid;
      const objKeyArr = Object.keys(this.listObj);
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          this.listObj[objKeyArr[i]].url = response.files.file;
          this.listObj[objKeyArr[i]].hasSuccess = true;
          return;
        }
      }
    },
    handleRemove(file) {
      const uid = file.uid;
      const objKeyArr = Object.keys(this.listObj);
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]];
          return;
        }
      }
    },
    beforeUpload(file) {
      const _self = this;
      const _URL = window.URL || window.webkitURL;
      const fileName = file.uid;
      this.listObj[fileName] = {};
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = _URL.createObjectURL(file);
        img.onload = function() {
          _self.listObj[fileName] = {
            hasSuccess: false,
            uid: file.uid,
            width: this.width,
            height: this.height
          };
        };
        resolve(true);
      });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.upload-container {
  .editor-slide-upload {
    margin-bottom: 20px;
  }
}
</style>
