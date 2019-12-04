<template>
  <div style="background-color: white">
    <el-row style="padding: 20px;cursor: pointer">
      <el-col v-for="item in data" :key="item.label" :span="item.col">
        <el-row class="front Sub_Content_front">{{item.label}}</el-row>
        <el-row class="front System_front" style="padding-top: 10px"><b>{{item.value}}</b></el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {}
    },
    methods: {

    },
    props: {
      data: {
        type: Array,
        default: function () {
          return [
            {"label": "楼宇数量", "value": "17","col":4},
            {"label": "建筑面积（m2）", "value": "27,100","col":4},
            {"label": "运营面积（m2）", "value": "17,616","col":4},
            {"label": "已租面积（m2）", "value": "12,116","col":4},
            {"label": "空置面积（m2）", "value": "5,500","col":4},
            {"label": "在租合同份数", "value": "29","col":4}
          ];
        }
      }
    }
  }
</script>

<style lang='scss'>

</style>
