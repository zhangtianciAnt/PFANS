<template>
  <div class="easy_sider" :style="{width:siderWidth,height:`calc(100vh - ${siderHeight})`}">
    <div class="sider-avatar" :style="{height:avatarHeight}">
      <slot name="avatar"></slot>
    </div>
    <div class="sider-content" :style="{height:`calc(100% - ${avatarHeight})`}">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Sider",
    components: {},
    data() {
      return {
        avatarHeight: "0%"
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
    .sider-content {
      overflow-y: auto;
    }
    .el-menu {
      border-right: 0px !important;
    }
  }
</style>

