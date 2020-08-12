<template>
  <el-drawer append-to-body destroy-on-close custom-class="custimize_drawer" @close="close"
             :visible.sync="open" :show-close="false" :withHeader="false"
             size="70%">
    <PFANS6002FormView ref="child" v-if="url === 'PFANS6002FormView'"></PFANS6002FormView>
    <PFANS1032FormView ref="child" v-else-if="url === 'PFANS1032FormView'"></PFANS1032FormView>
    <PFANS1031FormView ref="child" v-else-if="url === 'PFANS1031FormView'"></PFANS1031FormView>
    <PFANS1025FormView ref="child" v-else-if="url === 'PFANS1025FormView'"></PFANS1025FormView>
    <PFANS1006FormView ref="child" v-else-if="url === 'PFANS1006FormView'"></PFANS1006FormView>
    <PFANS1047FormView ref="child" v-else-if="url === 'PFANS1047FormView'"></PFANS1047FormView>
    <PFANS1035FormView ref="child" v-else-if="url === 'PFANS1035FormView'"></PFANS1035FormView>
    <PFANS1002FormView ref="child" v-else-if="url === 'PFANS1002FormView'"></PFANS1002FormView>
    <PFANS1004FormView ref="child" v-else-if="url === 'PFANS1004FormView'"></PFANS1004FormView>
    <PFANS1012FormView ref="child" v-else-if="url === 'PFANS1012FormView'"></PFANS1012FormView>
    <PFANS1045FormView ref="child" v-else-if="url === 'PFANS1045FormView'"></PFANS1045FormView>
    <PFANS3005FormView ref="child" v-else-if="url === 'PFANS3005FormView'"></PFANS3005FormView>
    <PFANS1003FormView ref="child" v-else-if="url === 'PFANS1003FormView'"></PFANS1003FormView>
    <PFANS1005FormView ref="child" v-else-if="url === 'PFANS1005FormView'"></PFANS1005FormView>
    <PFANS1010FormView ref="child" v-else-if="url === 'PFANS1010FormView'"></PFANS1010FormView>
    <PFANS2026FormView ref="child" v-else-if="url === 'PFANS2026FormView'"></PFANS2026FormView>
    <PFANS2032FormView ref="child" v-else-if="url === 'PFANS2032FormView'"></PFANS2032FormView>
    <PFANS4001FormView ref="child" v-else-if="url === 'PFANS4001FormView'"></PFANS4001FormView>
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
  import PFANS1004FormView from '@/view/PFANS/PFANS1000/PFANS1004/PFANS1004FormView.vue';
  import PFANS1012FormView from '@/view/PFANS/PFANS1000/PFANS1012/PFANS1012FormView.vue';
  import PFANS1045FormView from '@/view/PFANS/PFANS1000/PFANS1045/PFANS1045FormView.vue';
  import PFANS3005FormView from '@/view/PFANS/PFANS3000/PFANS3005/PFANS3005FormView.vue';
  import PFANS1005FormView from '@/view/PFANS/PFANS1000/PFANS1005/PFANS1005FormView.vue';
  import PFANS1003FormView from '@/view/PFANS/PFANS1000/PFANS1003/PFANS1003FormView.vue';
  import PFANS1010FormView from '@/view/PFANS/PFANS1000/PFANS1010/PFANS1010FormView.vue';
  import PFANS2026FormView from '@/view/PFANS/PFANS2000/PFANS2026/PFANS2026FormView.vue';
  import PFANS2032FormView from '@/view/PFANS/PFANS2000/PFANS2032/PFANS2032FormView.vue';
  import PFANS4001FormView from '@/view/PFANS/PFANS4000/PFANS4001/PFANS4001FormView.vue';
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
      PFANS1004FormView,
      PFANS1012FormView,
        PFANS1045FormView,
        PFANS3005FormView,
        PFANS1005FormView,
        PFANS1003FormView,
        PFANS1010FormView,
      PFANS2026FormView,
      PFANS2032FormView,
      PFANS4001FormView
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
              // this.$refs.child1.$refs.container.Pop = true;
              // this.$refs.child2.$refs.container.Pop = true;
              // this.$refs.child3.$refs.container.Pop = true;
              // this.$refs.child4.$refs.container.Pop = true;
              // this.$refs.child5.$refs.container.Pop = true;
              // this.$refs.child6.$refs.container.Pop = true;
              // this.$refs.child7.$refs.container.Pop = true;
              // this.$refs.child8.$refs.container.Pop = true;
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
