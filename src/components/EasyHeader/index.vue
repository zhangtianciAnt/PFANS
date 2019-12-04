<template>
  <div :class="headerclass">
    <el-row :style="{height:maxheight}">
      <el-col :span="19" :style="{height:maxheight,textAlign: 'left'}">
        <slot name="menu"></slot>
      </el-col>
      <el-col :span="5" :style="{height:maxheight,textAlign: 'center',display: 'table'}">
        <slot name="customize"></slot>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "index",
    components: {},
    data() {
      return {};
    },
    props: {
      maxheight: {
        type: String
      },
      headerclass: {
        type: Object
      }
    },
    methods: {},
    mounted() {

    },
    watch: {}
  }
</script>
<style lang='scss'>

</style>
