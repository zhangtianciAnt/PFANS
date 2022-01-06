<template>
  <el-drawer :show-close="false" :visible.sync="open" :withHeader="false" append-to-body
             custom-class="custimize_drawer" destroy-on-close size="70%"
             @close="close">
    <PFANS1012FormView v-show="url === 'PFANS1012FormView'" ref="child"></PFANS1012FormView>
  </el-drawer>
</template>

<script>

import PFANS1012FormView from '@/view/PFANS/PFANS1000/PFANS1012/PFANS1012FormView.vue';

export default {
  name: 'PFANS1012Pop',
  components: {
    PFANS1012FormView,
  },
  data() {
    return {
      open: false,
      bkParams: {},
    };
  },
  props: {
    url: {
      type: String,
      default: '',
    },
    params: {
      // update gbb 20210316 NT_PFANS_20210227_BUG_033 pop画面传值类型修改 start
      //type: String,
      type: Object,
      // update gbb 20210316 NT_PFANS_20210227_BUG_033 pop画面传值类型修改 end
      default: {},
    },
  },
  methods: {
    close() {
      for (let key in this.$route.params) {
        this.$route.params[key] = '';
      }
      for (let key in this.bkParams) {
        this.$route.params[key] = this.bkParams[key];
      }
      this.$refs.child.$refs.container.Pop = false;
      this.bkParams = {};
    },
  },
  watch: {
    open(val) {
      if (val) {
        this.bkParams = [...this.$route.params];
        for (let key in this.params) {
          this.$route.params[key] = this.params[key];
        }
        this.$nextTick(function() {
          this.$refs.child.$refs.container.Pop = true;
        });

      }
    },
  },
};
</script>

<style lang='scss'>
.custimize_drawer {
  -webkit-box-sizing: border-box;
  overflow: auto !important;
}
</style>
