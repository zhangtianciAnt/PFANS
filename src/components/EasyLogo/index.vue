<template>
  <div :class="logoclass" @click="click" style="cursor: pointer">
    <el-row :style="{height:maxheight,width:maxwidth}">
      <el-col :span="24" :style="{height:maxheight,textAlign: 'left',verticalAlign:'middle'}">
        <el-col :span="8" :style="{height:maxheight,textAlign: 'center',verticalAlign:'middle'}">
          <img :src="logo" style="height: 100%">
        </el-col>
        <el-col :span="16" :style="{height:maxheight,textAlign: 'left',display: 'table'}" class="front System_front">
          <div style="display: table-cell;vertical-align: middle;">{{title}}</div>
        </el-col>
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
      logo: {
        type: String
      },
      title: {
        type: String
      },
      maxheight: {
        type: String
      },
      maxwidth: {
        type: String
      },
      logoclass: {
        type: Object
      },
      mainPage: {
        type: String,
        default: "/index"
      }
    },
    methods: {
      click() {
        this.$emit("ToIndex", this.mainPage);
      }
    },
    mounted() {

    },
    watch: {}
  }
</script>
<style lang='scss'>

</style>
