<template>
  <div
    :style="{maxHeight:maxheight,minHeight:minheight,overflowY:'auto'}"
    class="easy_tree"
    :element-loading-text="$t('normal.waiting')"
    v-loading="loading"
  >
    <el-input
      :placeholder="$t('normal.search')"
      v-if="showFilter"
      v-model="filterText"
    >
    </el-input>

    <el-tree
      :check-strictly="checktrictly"
      :data="defaultlist"
      :default-expand-all="true"
      :expand-on-click-node="false"
      :filter-node-method="filterNode"
      :load="loadNode"
      :node-key="nodeid"
      :props="defaultProps"
      :show-checkbox="showCheckbox"
      @node-click="nodeClick"
      class="filter-tree"
      ref="treeCom"
      style="margin-top:10px"
    >
    </el-tree>
  </div>
</template>

<script>
export default {
  name: "Tree",
  components: {},
  data() {
    return {
      filterText: "",
      loading: false
    };
  },
  props: {
    //是否显示检索框
    showFilter: {
      type: Boolean,
      default: true
    },
    //是否显示checkbox
    showCheckbox: {
      type: Boolean,
      default: true
    },
    defaultProps: {
      type: Object
    },
    checktrictly: {
      type: Boolean,
      default: false
    },
    defaultlist: {
      type: Array,
      default: function() {
        return [];
      }
    },
    loadNode: {
      type: Function,
      default: function(node, resolve) {
        if (node.level === 0) {
          return resolve([{ label: "region" }]);
        }
        if (node.level > 1) return resolve([]);

        setTimeout(() => {
          const data = [
            {
              label: "leaf",
              isLeaf: true
            },
            {
              label: "zone"
            }
          ];

          resolve(data);
        }, 500);
      }
    },
    // 节点id
    nodeid: {
      type: String,
      default: "_id"
    },
    maxheight: {
      type: String
    },
    minheight: {
      type: String
    },
    renderContent: {
      type: Function,
      default: function(h, { node, data, store }) {
        return <span style="font-size:14px">{node.label}</span>;
      }
    },
    checkedList: {
      type: Array
    }
  },
  watch: {
    filterText(val) {
      this.$refs.treeCom.filter(val);
    },
    checkedList(val) {
      if (val) {
        this.$refs.treeCom.setCheckedKeys(val, true);
        // this.$nextTick(function () {
        let list = [];
        for (let i = 0; i < val.length; i++) {
          let node = this.$refs.treeCom.getNode(val[i]);
          if (node) {
            node.title = node.label;
            list.push(node);
          }
        }
        this.$emit("InitData", list);
        // })
      }
    }
  },
  updated() {
    this.$nextTick(function() {
      if (this.$refs.treeCom.getCheckedNodes().length > 0) {
        this.$emit("InitData", this.$refs.treeCom.getCheckedNodes());
      }
    });
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data[this.defaultProps.label].indexOf(value) !== -1;
    },
    nodeClick(node) {
      // if (this.$store.getters.operateId === node[this.nodeid]) {
      //   return;
      // }
      this.$store.commit("global/SET_OPERATEID", node[this.nodeid]);
      this.$emit("nodeClick", node);
    },
    getData() {
      return this.$refs.treeCom.data;
    }
  }
};
</script>

<style lang="scss">
$bg: #fff;
.easy_tree {
  background-color: $bg;
  padding: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>

