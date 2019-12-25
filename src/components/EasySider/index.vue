<template>
  <div class="easy_sider" :style="{width:siderWidth,height:`calc(100vh - ${siderHeight})`}">
    <div class="sider-avatar" :style="{height:avatarHeight}">
      <slot name="avatar"></slot>
    </div>
    <vue-scroll :ops="ops">
      <slot name="content"></slot>
    </vue-scroll>
  </div>
</template>

<script>
export default {
  name: "Sider",
  components: {},
  data() {
    return {
      avatarHeight: "0%",
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {
          opacity: 0,
          size: '6px',
          specifyBorderRadius: false,
          gutterOfEnds: null,
          gutterOfSide: '0',
          keepShow: false,
          border:'none'
        },
        bar: {
          onlyShowBarOnScroll: true,
          background: '#cecece',
          minSize: 0.3,
          size: '6px',
        }
      },
    };
  },
  props: {
    siderHeight: {
      type: String,
      default: "0px"
    },
    siderWidth: {
      type: String,
      default: "200px"
    }
  },
  mounted() {
    this.avatarHeight =
      document.querySelector(".easy_avatar") !== null ? "20%" : "0%";
  }
};
</script>

<style lang="scss">
$bg: #fff;
.easy_sider {
  min-height: 300px;
  background: $bg;
  .sider-avatar {
    overflow: hidden;
  }
  /*.sider-content {*/
    /*overflow-y: auto;*/
  /*}*/
  .el-menu {
    border-right: 0px !important;
  }
}
</style>

