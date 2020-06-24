<template>
  <el-drawer append-to-body destroy-on-close custom-class="custimize_drawer" @close="close"
    :visible.sync="open" :show-close="false" :withHeader="false"
             size="70%">
  <PFANS6002FormView v-if="url === 'PFANS6002FormView'"></PFANS6002FormView>

  </el-drawer>
</template>

<script>
  import PFANS6002FormView from '@/view/PFANS/PFANS6000/PFANS6002/PFANS6002FormView.vue'

  export default {
    name: "index",
    components: {
      PFANS6002FormView
    },
    data() {
      return {
        open: false,
        bkParams:{}
      };
    },
    props: {
      url: {
        type: String,
        default: ""
      },
      id: {
        type: String,
        default: ""
      }
    },
    methods: {
      close(){
        for(let key in this.$route.params){
          this.$route.params[key] = "";
        }
        for(let key in this.bkParams){
          this.$route.params[key] = this.bkParams[key];
        }

        this.bkParams = {};
      }
    },
    watch:{
      open(val){
        if(val){
          this.bkParams = [...this.$route.params];
          this.$route.params._id = this.id;

        }
      }
    }
  }
</script>

<style lang='scss'>
  .custimize_drawer {
    -webkit-box-sizing: border-box;
    overflow: auto;
  }
</style>
