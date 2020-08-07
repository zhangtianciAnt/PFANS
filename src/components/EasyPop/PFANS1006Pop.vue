<template>
  <el-drawer append-to-body destroy-on-close custom-class="custimize_drawer" @close="close"
             :visible.sync="open" :show-close="false" :withHeader="false"
             size="70%">
    <PFANS1006FormView ref="child" v-if="url === 'PFANS1006FormView'"></PFANS1006FormView>
  </el-drawer>
</template>

<script>

  import PFANS1006FormView from '@/view/PFANS/PFANS1000/PFANS1006/PFANS1006FormView.vue';

  export default {
    name: 'PFANS1006Pop',
    components: {
      PFANS1006FormView,
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
