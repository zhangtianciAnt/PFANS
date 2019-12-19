<template>
  <EasyNormalTable
    :title="title"
    :columns="columns"
    :data="data"
    :buttonList="buttonList"
    :rowid="row"
    @buttonClick="buttonClick"
    @rowClick="rowClick"
    v-loading="loading"
  ></EasyNormalTable>
</template>

<script>
    import EasyNormalTable from "@/components/EasyNormalTable";
    import { Message } from 'element-ui'
    export default {
        name: "BASF10110View",
        components: {
            EasyNormalTable
        },
        data(){
            return{
                loading: false,
                data: [],
                title:"menu.BASF10110",
                buttonList: [
                    {
                        key: 'view',
                        name: 'button.view',
                        disabled: false,
                        icon: 'el-icon-view'
                    },
                    {
                        key: 'insert',
                        name: 'button.insert',
                        disabled: false,
                        icon: 'el-icon-plus'
                    },
                    {
                        key: 'update',
                        name: 'button.update',
                        disabled: false,
                        icon: 'el-icon-edit'
                    }
                ],
                columns: [
                    {
                        //CODE
                        code: "code",
                        label: "CODE",
                        width: 200,
                        fix: false,
                        filter: false
                    },
                    {
                        //描述
                        code: "value1",
                        label: "label.BASF10110VIEW_VALUE1",
                        width: 200,
                        fix: false,
                        filter: false
                    }
                ],
                row:'code',
                rowid:''
            };
        },
        mounted() {
            this.loading = true;
            this.$store.commit("global/SET_OPERATEID", "");
            this.$store.dispatch("PFANS8009Store/bigList",{}).then(response => {
                response.map(item=>{})
                this.data = response;
                this.loading = false;
            })
        },
        methods: {
            rowClick(row) {
                this.rowid = row.code;
            },
            buttonClick(val) {
                this.$store.commit('global/SET_HISTORYURL', this.$route.path)
                if ("update" === val) {
                    if (!this.rowid) {
                        Message({
                            message: this.$t('normal.info_01'),
                            duration: 2 * 1000
                        });
                        return;
                    }
                    this.$router.push({
                        name: "BASF10110FormView",
                        params: {
                            _id: this.rowid,
                            readOnly: false,
                            type:'update'
                        }
                    });
                }
                else if ("view" === val) {
                    if (!this.rowid) {
                        Message({
                            message: this.$t('normal.info_01'),
                            duration: 2 * 1000
                        });
                        return;
                    }
                    this.$router.push({
                        name: "BASF10110FormView",
                        params: {
                            _id: this.rowid,
                            readOnly: true,
                            type:'view'
                        }
                    });
                }
                else if ("insert" === val) {
                    if (!this.rowid) {
                        Message({
                            message: this.$t('normal.info_01'),
                            duration: 2 * 1000
                        });
                        return;
                    }
                    this.$router.push({
                        name: "BASF10110FormView",
                        params: {
                            _id: this.rowid,
                            readOnly: false,
                            type:'insert'
                        }
                    });
                }

            }
        }

    }
</script>

<style scoped>

</style>
