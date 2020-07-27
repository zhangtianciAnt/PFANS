<template>
  <el-drawer append-to-body destroy-on-close custom-class="custimize_drawer" @close="close"
             :visible.sync="open" :show-close="false" :withHeader="false"
             size="70%">
    <PFANS6002FormView v-show="url === 'PFANS6002FormView'" ref="child"></PFANS6002FormView>
    <PFANS1032FormView ref="child" v-show="url === 'PFANS1032FormView'"></PFANS1032FormView>
    <PFANS1031FormView ref="child" v-show="url === 'PFANS1031FormView'"></PFANS1031FormView>
    <PFANS1025FormView ref="child" v-show="url === 'PFANS1025FormView'"></PFANS1025FormView>
    <PFANS1006FormView ref="child" v-show="url === 'PFANS1006FormView'"></PFANS1006FormView>
    <PFANS1047FormView ref="child" v-show="url === 'PFANS1047FormView'"></PFANS1047FormView>
    <PFANS1035FormView ref="child" v-show="url === 'PFANS1035FormView'"></PFANS1035FormView>
    <PFANS1002FormView ref="child" v-show="url === 'PFANS1002FormView'"></PFANS1002FormView>
  </el-drawer>
</template>

<script>
  import PFANS6002FormView from '@/view/PFANS/PFANS6000/PFANS6002/PFANS6002FormView.vue';
  import PFANS1032FormView from '@/view/PFANS/PFANS1000/PFANS1032/PFANS1032FormView.vue';
  import PFANS1031FormView from '@/view/PFANS/PFANS1000/PFANS1031/PFANS1031FormView.vue';
  import PFANS1025FormView from '@/view/PFANS/PFANS1000/PFANS1025/PFANS1025FormView.vue';
  import PFANS1006FormView from '@/view/PFANS/PFANS1000/PFANS1006/PFANS1006FormView.vue';
  import PFANS1047FormView from '@/view/PFANS/PFANS1000/PFANS1047/PFANS1047FormView.vue';
  import PFANS1035FormView from '@/view/PFANS/PFANS1000/PFANS1035/PFANS1035FormView.vue';
  import PFANS1002FormView from '@/view/PFANS/PFANS1000/PFANS1002/PFANS1002FormView.vue';

  export default {
    name: 'index',
    components: {
      PFANS6002FormView,
      PFANS1032FormView,
      PFANS1031FormView,
      PFANS1025FormView,
      PFANS1006FormView,
      PFANS1047FormView,
      PFANS1035FormView,
      PFANS1002FormView,
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
