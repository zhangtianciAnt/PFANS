<template>
  <!--<el-tooltip :content="$t('help.name')" placement="bottom" effect="light">-->
    <el-dropdown placement="bottom">
      <span class="el-dropdown-link">
        <el-avatar icon="el-icon-user-solid" size="medium" style="background-color: transparent"> </el-avatar>
      </span>
      <slot name="dropdown" slot="dropdown"></slot>
    </el-dropdown>

  <!--</el-tooltip>-->
</template>

<script>
    export default {
        name: "iconAvatar"
    }
</script>

<style scoped>

</style>
