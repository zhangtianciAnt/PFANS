<template>
  <EasyNormalTable
    :title="title"
    :columns="columns"
    :data="data"
    @buttonClick="buttonClick"
    @rowClick="rowClick"
    :buttonList="buttonList"
    v-loading="loading"
    :rowid="rowid"
  ></EasyNormalTable>
</template>

<script>
    import EasyNormalTable from "@/components/EasyNormalTable";
    import {getUserInfo} from "../../../../utils/customize";
    import {Message} from 'element-ui';

    let moment = require("moment");
    export default {
        name: "PFANS8008View",
        components: {
            EasyNormalTable
        },

        data() {
            return {
                availablestate: '',
                loading: false,
                data: [],
                title: "title.PFANS8008VIEW",
                buttonList: [
                    {
                        key: "view",
                        name: "button.view",
                        disabled: false,
                        icon: "el-icon-search"
                    },
                    {
                        key: "new",
                        name: "button.insert",
                        disabled: false,
                        icon: "el-icon-plus"
                    },
                    {
                        key: "update",
                        name: "button.update",
                        disabled: false,
                        icon: "el-icon-edit"
                    }
                ],

                columns: [
                    {
                        code: "title",
                        label: "label.PFANS8008VIEW_MESSAGE_HEADER",
                        width: 200,
                        fix: false,
                        filter: true
                    },
                    {
                        code: "availablestatename",
                        label: "label.PFANS8008VIEW_AVAILABLESTATE",
                        width: 200,
                        fix: false,
                        filter: true
                    },
                    {
                        code: "createbyname",
                        label: "label.PFANS8008VIEW_CREATEBY",
                        width: 200,
                        fix: false,
                        filter: true
                    },
                    {
                        code: "createon",
                        label: "label.PFANS8008VIEW_RELEASETIME",
                        width: 200,
                        fix: false,
                        filter: true
                    }
                ],
                _id: "",
                rowid: "informationid"
            };
        },
        mounted() {
            this.availablestate = this.$route.params.availablestate;
            if (this.availablestate) {
                this.buttonList = [
                    {
                        key: "view",
                        name: "button.view",
                        disabled: false,
                        icon: "el-icon-search"
                    },
                ];
                this.loading = true;
                this.$store.dispatch("PFANS8008Store/getListType").then(response => {
                    this.data = response;
                    for (let j = 0; j < response.length; j++) {
                        if (response[j].availablestate === "0") {
                            response[j].createbyname = getUserInfo(
                                response[j].createby
                            ).userinfo.customername;
                            response[j].availablestatename = this.$t("label.PFANS8008FORMVIEW_EFFECTIVE")
                            if (response[j].createon !== null && response[j].createon !== '') {
                                response[j].createon = moment(response[j].createon).format('YYYY-MM-DD HH:mm:ss');
                            }

                        }

                    }
                    this.loading = false;
                }).catch(error => {
                    this.loading = false;
                    Message({
                        message: err,
                        type: 'error',
                        duration: 5 * 1000
                    })
                });
            }else{
                this.loading = true;
                this.$store.dispatch("PFANS8008Store/getInformation").then(response => {
                    this.data = response;
                    for (let j = 0; j < this.data.length; j++) {
                        this.data[j].createbyname = getUserInfo(
                            this.data[j].createby
                        ).userinfo.customername;
                        this.data[j].availablestatename =
                            this.data[j].availablestate === "0"
                                ? this.$t("label.PFANS8008FORMVIEW_EFFECTIVE")
                                : this.$t("label.PFANS8008FORMVIEW_INVALID");
                        this.data[j].createon = moment(this.data[j].createon).format(
                            "YYYY-MM-DD HH:mm:ss"
                        );
                    }
                    this.loading = false;
                }).catch(error => {
                    Message({
                        message: err,
                        type: 'error',
                        duration: 5 * 1000
                    })
                });
            }

        },
        methods: {
            rowClick(row) {
                this._id = row.informationid;
            },
            buttonClick(val) {
                this.$store.commit("global/SET_HISTORYURL", this.$route.path);
                if ("update" === val) {
                    if (!this._id) {
                        this.$message.error(this.$t("normal.info_01"));
                        return;
                    }
                    this.$router.push({
                        name: "PFANS8008FormView",
                        params: {
                            _id: this._id,
                            disabled: true,
                            readonly: 0
                        }
                    });
                } else if ("view" === val) {
                    if (!this._id) {
                        this.$message.error(this.$t("normal.info_01"));
                        return;
                    }
                    this.$router.push({
                        name: "PFANS8008FormView",
                        params: {
                            _id: this._id,
                            disabled: false,
                            readonly: 1
                        }
                    });
                } else if ("new" === val) {
                    this.$router.push({
                        name: "PFANS8008FormView",
                        params: {
                            _id: "",
                            disabled: true,
                            readonly: 0
                        }
                    });
                }
            }
        }
    };
</script>

<style scoped>
</style>
