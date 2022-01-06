<template>
  <div class="main_bg_color" style="overflow-x: hidden">
    <el-menu :active-text-color="activeTextColor" :collapse="isCollapse" :default-active="Index" active-text-color="#005BAA" menu-trigger="click" mode="vertical"
             router unique-opened @close="openExpalin" @open="openExpalin"
             @select="handleSelect">
      <el-submenu v-for="ob in data"
                  v-if="ob && ob.children && ob.children.length > 0 && Object.keys(ob.children[0]).length > 0"
                  v-show="ob.menuvisible" :key="ob._id" :index="ob._id" class="title1">
        <template slot="title">
          <!--<i :class="ob.menuicon" v-if="ob.menuicon"></i>-->
          <span>{{ $t(ob.name) }}</span>
        </template>
        <el-submenu v-for="obi in ob.children"
                    v-if="obi && obi.children && obi.children.length > 0 && Object.keys(obi.children[0]).length > 0"
                    v-show="obi.menuvisible" :key="obi._id" :index="obi._id" class="title2">
          <template slot="title">
            <!--<i :class="obi.menuicon" v-if="obi.menuicon"></i>-->
            <span style="color: black">{{ $t(obi.name) }}</span>
          </template>

          <el-submenu v-for="cobi in obi.children"
                      v-if="cobi && cobi.children && cobi.children.length > 0 && Object.keys(cobi.children[0]).length > 0"
                      v-show="cobi.menuvisible" :key="cobi._id" :index="cobi._id" class="title2">
            <template slot="title">
              <!--<i :class="cobi.menuicon" v-if="cobi.menuicon"></i>-->
              <span style="color: black">{{ $t(cobi.name) }}</span>
            </template>
            <el-menu-item v-for="cobii in cobi.children" v-if="cobii.menuvisible" v-show="cobii.menuvisible"
                          :key="cobii._id" :index="cobii.menuurl" class="title3">
              <el-tooltip v-if="$t(cobii.name).length > 6" :content="$t(cobii.name)" class="item" effect="dark"
                          placement="right-end">
                <span>{{ $t(cobii.name).substr(0, 6) + '..' }}</span>
              </el-tooltip>
              <span v-else>{{ $t(cobii.name) }}</span>
              <!--<i class="el-icon-right"></i>-->
            </el-menu-item>
          </el-submenu>
          <el-menu-item v-else v-show="cobi.menuvisible" :key="cobi._id" :index="cobi.menuurl" class="title3">
            <el-tooltip v-if="$t(cobi.name).length > 7" :content="$t(cobi.name)" class="item" effect="dark"
                        placement="right-end">
              <span>{{ $t(cobi.name).substr(0, 7) + '..' }}</span>
            </el-tooltip>
            <span v-else>{{ $t(cobi.name) }}</span>
            <!--<i class="el-icon-right"></i>-->
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else v-show="obi.menuvisible" :key="obi._id" :index="obi.menuurl" class="title3">
          <span>{{ $t(obi.name) }}</span>
          <!--<i class="el-icon-right"></i>-->
        </el-menu-item>
      </el-submenu>
      <el-menu-item v-else v-show="ob.menuvisible" :index="ob.menuurl" class="title3">
        <span>{{ $t(ob.name) }}</span>
        <!--<i class="el-icon-right"></i>-->
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
  name: 'vertical',
  components: {},
  data() {
    return {
      Index: '/index',
    };
  },
  computed: {
    deg() {
      return this.isCollapse === false ? '0deg' : '180deg';
    },
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
    backgroundColor: {
      type: String,
      default: '#ffffff',
    },
    textColor: {
      type: String,
      default: '#303133',
    },
    activeTextColor: {
      type: String,
      default: '#005BAA',
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
      default: '/index',
    },
  },
  methods: {
    openExpalin(index, indexPath) {
      let explainList = ['PERSONNELMATTERS', 'FINANCIAL', 'PFANSBP', 'MANAGEMENT'];
      if (explainList.indexOf(index) != -1) {
        this.$router.push({
          name: 'EasyExplain',
          query: {
            type: index,
          },
        });
      }

    },
  },
  mounted() {
  },
  watch: {
    activeIndex(val) {
      this.Index = val;
      this.$router.push(val);
      // this.$nextTick(function () {
      //   this.Index = val;
      //   this.$router.push(val);
      // });
    },
  },
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

/deep/ .el-menu-item {
  height: 38px !important;
  line-height: 38px !important;
  min-width: 120px;
  max-width: 200px;
  overflow-x: hidden;
  overflow-y: hidden;
  /*border: #005BAA 1px solid;*/
}

/deep/ .el-submenu__title {
  /*background-image: linear-gradient(to right, #005BAA , white);*/
  /*background-color: #005BAA;*/
  color: white;
  height: 38px;
  line-height: 38px;
  padding-left: 20px !important;
  border: #005BAA 1px solid;
}

/deep/ .el-submenu__title:hover {
  background-color: transparent;
}

.title1 {
  background-color: #005BAA;
}

.title2 {
  background-color: #BDD8EE !important;
  margin-left: 25px;
}

.title3 {
  margin-left: 25px;
  padding-left: 20px !important;
}
</style>
