<template>
  <div>
    <el-menu :active-text-color="activeTextColor" :default-active="activeIndex" menu-trigger="click"
             mode="horizontal" style="border-bottom: none" unique-opened
             @select="handleSelect">
      <el-submenu v-for="(ob, index) in data"
                  v-if="ob.child.length > 0 && Object.keys(ob.child[0]).length > 0"
                  :key="ob._id" :index="ob._id">
        <template slot="title">
          <i v-if="ob.appicon" :class="ob.appicon"></i>
          <span>{{ ob.appname }}</span>
        </template>
        <el-menu-item v-for="cob in ob.child" :key="cob._id" :index="cob._id"><i v-if="cob.appicon"
                                                                                 :class="cob.appicon"></i>
          <span>{{ cob.appname }}</span></el-menu-item>
      </el-submenu>
      <el-menu-item v-else-if="index < 5" :index="ob._id"><i v-if="ob.appicon" :class="ob.appicon"></i>
        <span>{{ ob.appname }}</span></el-menu-item>
      <el-submenu v-if="data.length >= 5" index="more">
        <template slot="title">
          <i class="el-icon-more"></i>
          <span>更多</span>
        </template>
        <el-menu-item v-for="(ob, index) in data" v-if="index >= 5" :key="ob._id" :index="ob._id">
          <i v-if="ob.appicon" :class="ob.appicon"></i>
          <span>{{ ob.appname }}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>

export default {
  name: 'horizontal',
  components: {},
  data() {
    return {
      isCollapse: true,
    };
  },
  props: {
    activeTextColor: {
      type: String,
      default: '#409EFF',
    },
    data: {
      type: Array,
      default: function() {
        return [];
      },

    },
    handleSelect: {
      type: Function,
      default: function() {

      },
    },
    activeIndex: {
      type: String,
      default: '0',
    },
  },
  methods: {},
  mounted() {
  },
  watch: {},
};
</script>
<style lang='scss'>

</style>
