<template>
  <el-drawer :show-close="false" :visible.sync="open" :withHeader="false" @close="close"
             append-to-body custom-class="custimize_drawer" destroy-on-close
             size="70%">
    <PFANS2013FormView ref="child" v-show="url === 'PFANS2013FormView'"></PFANS2013FormView>
  </el-drawer>
</template>

<script>

    import PFANS2013FormView from '@/view/PFANS/PFANS2000/PFANS2013/PFANS2013FormView.vue';

    export default {
        name: 'PFANS2013Pop',
        components: {
            PFANS2013FormView,
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
                type: Object,
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

                    this.$nextTick(function () {
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
