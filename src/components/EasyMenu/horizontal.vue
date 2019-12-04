<template>
  <div>
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect"
             menu-trigger="click" unique-opened :active-text-color="activeTextColor"
    style="border-bottom: none">
      <el-submenu v-if="ob.child.length > 0 && Object.keys(ob.child[0]).length > 0"
                  :index="ob._id"
                  :key="ob._id" v-for="(ob, index) in data">
        <template slot="title">
          <i :class="ob.appicon" v-if="ob.appicon"></i>
          <span>{{ob.appname}}</span>
        </template>
        <el-menu-item v-for="cob in ob.child" :key="cob._id" :index="cob._id"><i :class="cob.appicon" v-if="cob.appicon"></i>
          <span>{{cob.appname}}</span></el-menu-item>
      </el-submenu>
      <el-menu-item :index="ob._id" v-else-if="index < 5"><i :class="ob.appicon" v-if="ob.appicon"></i>
        <span>{{ob.appname}}</span></el-menu-item>
      <el-submenu index="more" v-if="data.length >= 5">
          <template slot="title">
            <i class="el-icon-more"></i>
            <span>更多</span>
          </template>
          <el-menu-item v-for="(ob, index) in data" :index="ob._id" :key="ob._id" v-if="index >= 5">
            <i :class="ob.appicon" v-if="ob.appicon"></i>
            <span>{{ob.appname}}</span>
          </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>

  export default {
    name: "horizontal",
    components: {},
    data() {
      return {
        isCollapse: true
      };
    },
    props: {
      activeTextColor: {
        type: String,
        default: "#409EFF"
      },
      data: {
        type: Array,
        default: function () {
          return [
          ];
        }

      },
      handleSelect: {
        type: Function,
        default:function(){

        }
      },
      activeIndex:{
        type:String,
        default:"0"
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
