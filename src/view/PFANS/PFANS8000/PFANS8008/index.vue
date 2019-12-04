<template>
  <div class="tinymce-container editor-container">
    <el-input type="textarea" :id="tinymceId"></el-input>
    <div class="editor-custom-btn-container">
      <editorImage
        :readonly="readonly"
        :disabled="disabled"
        color="#20a0ff"
        class="editor-upload-btn"
        @successCBK="imageSuccessCBK"
      ></editorImage>
    </div>
  </div>
</template>

<script>
import editorImage from "./editorImage";

export default {
  name: "tinymce",
  components: { editorImage },
  props: {
    id: {
      type: String
    },
    value: {
      type: String,
      default: ""
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return [
          "fontsizeselect |  undo redo |  bullist numlist | outdent indent | forecolor | fullscreen code",
          "bold italic blockquote removeformat | alignleft aligncenter alignright"
        ];
      }
    },
    menubar: {
      default: ""
    },
    height: {
      type: Number,
      required: false,
      default: 360
    },
    readonly:{
      type: Number,
       default: 0
    }
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id || "vue-tinymce-" + +new Date(),
      disable:true
    };
  },
  computed: {
    disabled: function() {
      debugger;
      return this.readonly === 1 ? true : false;
    }
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() =>
          window.tinymce.get(this.tinymceId).setContent(val)
        );
      }
    }
  },
  mounted() {
    this.initTinymce();
  },
  activated() {
    this.initTinymce();
  },
  deactivated() {
    this.destroyTinymce();
  },
  methods: {
    initTinymce() {
      const _this = this;
      window.tinymce.init({
        readonly: this.readonly, //富文本 0：启用，1：禁用
        selector: `#${this.tinymceId}`,
        height: this.height,
        body_class: "panel-body ",
        object_resizing: false,
        toolbar: this.toolbar,
        menubar: this.menubar,
        language: "zh_CN",
        plugins:
          "advlist,autolink,code,paste,textcolor, colorpicker,fullscreen,link,lists,media,wordcount, imagetools",
        end_container_on_empty_block: true,
        powerpaste_word_import: "clean",
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: "square",
        advlist_number_styles: "default",
        imagetools_cors_hosts: ["wpimg.wallstcn.com", "wallstreetcn.com"],
        imagetools_toolbar: "watermark",
        default_link_target: "_blank",
        fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
        link_title: false,
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value);
          }
          _this.hasInit = true;
          editor.on("NodeChange Change KeyUp", () => {
            this.hasChange = true;
            // this.$emit('input', editor.getContent({ format: 'raw' }))
            this.$emit("input", editor.getContent());
          });
        }
      });
    },
    destroyTinymce() {
      if (window.tinymce.get(this.tinymceId)) {
        window.tinymce.get(this.tinymceId).destroy();
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value);
    },
    getContent() {
      window.tinymce.get(this.tinymceId).getContent();
    },
    imageSuccessCBK(arr) {
      const _this = this;
      arr.forEach(v => {
        window.tinymce
          .get(_this.tinymceId)
          .insertContent(`<img class="wscnph" src="${v.url}" >`);
      });
    }
  },
  destroyed() {
    this.destroyTinymce();
  }
};
</script>

<style scoped>
.tinymce-container {
  position: relative;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 15px;
  /*z-index: 2005;*/
  top: 18px;
}
.editor-upload-btn {
  display: inline-block;
}
</style>
