<template>
  <el-drawer append-to-body destroy-on-close custom-class="custimize_drawer" @close="close"
             :visible.sync="open" :show-close="false" :withHeader="false"
             size="70%">
    <PFANS1012FormView ref="child" v-show="url === 'PFANS1012FormView'"></PFANS1012FormView>
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
        type: String,
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
        debugger
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
    overflow: auto;
  }
</style>
