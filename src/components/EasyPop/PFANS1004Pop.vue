<template>
  <el-drawer :show-close="false" :visible.sync="open" :withHeader="false" @close="close"
             append-to-body custom-class="custimize_drawer" destroy-on-close
             size="70%">
    <PFANS1004FormView ref="child" v-show="url === 'PFANS1004FormView'"></PFANS1004FormView>
  </el-drawer>
</template>

<script>

    import PFANS1004FormView from '@/view/PFANS/PFANS1000/PFANS1004/PFANS1004FormView.vue';

    export default {
        name: 'PFANS1004Pop',
        components: {
            PFANS1004FormView,
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
