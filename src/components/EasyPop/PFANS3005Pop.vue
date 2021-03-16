<template>
  <el-drawer :show-close="false" :visible.sync="open" :withHeader="false" @close="close"
             append-to-body custom-class="custimize_drawer" destroy-on-close
             size="70%">
    <PFANS3005FormView ref="child" v-show="url === 'PFANS3005FormView'"></PFANS3005FormView>
  </el-drawer>
</template>

<script>

    import PFANS3005FormView from '@/view/PFANS/PFANS3000/PFANS3005/PFANS3005FormView.vue';

    export default {
        name: 'PFANS3005Pop',
        components: {
            PFANS3005FormView,
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
