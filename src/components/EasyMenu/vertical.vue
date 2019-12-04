<template>
  <div>
    <el-menu :default-active="Index" mode="vertical" @select="handleSelect" menu-trigger="click" unique-opened router :active-text-color="activeTextColor" :collapse="isCollapse">
      <el-submenu v-for="ob in data" v-if="ob && ob.children && ob.children.length > 0 && Object.keys(ob.children[0]).length > 0" :index="ob._id" :key="ob._id" >
        <template slot="title">
          <i :class="ob.menuicon" v-if="ob.menuicon"></i>
          <span>{{$t(ob.name)}}</span>
        </template>
        <el-submenu v-for="obi in ob.children" v-if="obi && obi.children && obi.children.length > 0 && Object.keys(obi.children[0]).length > 0" :index="obi._id" :key="obi._id" >
          <template slot="title">
            <i :class="obi.menuicon" v-if="obi.menuicon"></i>
            <span>{{$t(obi.name)}}</span>
          </template>
          <el-menu-item v-for="cobi in obi.children" v-if="cobi.menuvisible" :key="cobi._id" :index="cobi.menuurl">
            <i :class="cobi.menuicon" v-if="cobi.menuicon"></i>
            <span>{{$t(cobi.name)}}</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else :key="obi._id" :index="obi.menuurl">
          <i :class="obi.menuicon" v-if="obi.menuicon"></i>
          <span>{{$t(obi.name)}}</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item v-else :index="ob.menuurl">
        <i :class="ob.menuicon" v-if="ob.menuicon"></i>
        <span>{{$t(ob.name)}}</span>
      </el-menu-item>
      <!-- <div class="menu-footer" @click="isCollapse=!isCollapse">
        <div class="menu-trigger" :style="{transform:`rotateZ(${deg})`}">
          <i class="el-icon-arrow-left"></i>
        </div>
      </div> -->
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "vertical",
  components: {},
  data() {
    return {
      Index:"/index"
    };
  },
  computed: {
    deg() {
      return this.isCollapse === false ? "0deg" : "180deg";
    }
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: "#ffffff"
    },
    textColor: {
      type: String,
      default: "#303133"
    },
    activeTextColor: {
      type: String,
      default: "#005BAA"
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
      default:function () {

      }
    },
    activeIndex:{
      type:String,
      default:"/index"
    }
  },
  methods: {},
  mounted() {
  },
  watch: {
    activeIndex(val){
      this.$nextTick(function () {
        this.Index = val;
        this.$router.push(val);
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.menu-footer {
  height: 48px;
  line-height: 48px;
}

.menu-trigger {
  cursor: pointer;
  width: 90%;
  margin: 0 auto;
  text-align: center;
}
.el-menu-item{
  height: 38px;
  line-height: 38px;
  min-width: 120px;
  max-width: 200px;
  overflow-x: hidden;
  overflow-y:hidden;
}
/deep/ .el-submenu__title{
  height: 38px;
  line-height: 38px;
}
</style>
