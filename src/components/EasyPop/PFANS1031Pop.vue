<template>
  <el-drawer append-to-body destroy-on-close custom-class="custimize_drawer" @close="close"
             :visible.sync="open" :show-close="false" :withHeader="false"
             size="70%">
    <PFANS1031FormView ref="child" v-show="url === 'PFANS1031FormView'"></PFANS1031FormView>
  </el-drawer>
</template>

<script>

    import PFANS1031FormView from '@/view/PFANS/PFANS1000/PFANS1031/PFANS1031FormView.vue';

    export default {
        name: 'PFANS1031Pop',
        components: {
            PFANS1031FormView,
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
