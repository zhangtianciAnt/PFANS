<template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row_id"
                   :title="title" @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
  </EasyNormalTable>
</template>

<script>
    import EasyNormalTable from "@/components/EasyNormalTable";
    import {Message} from 'element-ui';

    export default {
        name: "PFANS2018View",
        components: {
            EasyNormalTable
        },
        data() {
            return {
                loading: false,
                title: 'title.PFANS2018VIEW',
                data: [],
                columns: [
                    {
                        code: 'workshift',
                        label: 'label.PFANS2018VIEW_WORKSHIFT',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'closingtime',
                        label: 'label.PFANS2018VIEW_CLOSINGTIME',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'lunchbreak',
                        label: 'label.PFANS2018VIEW_LUNCHBREAK',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'nightshift',
                        label: 'label.PFANS2018VIEW_NIGHTSHIFT',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'weekdaysovertime',
                        label: 'label.PFANS2018VIEW_WEEKDAYSOVERTIME',
                        width: 200,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'compassionateleave',
                        label: 'label.PFANS2018VIEW_COMPASSIONATELEAVE',
                        width: 200,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'lateearlyleave',
                        label: 'label.PFANS2018VIEW_LATEEARLYLEAVE',
                        width: 210,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'absenteeism',
                        label: 'label.PFANS2018VIEW_ABSENTEEISM',
                        width: 200,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'overtime',
                        label: 'label.PFANS2018VIEW_OVERTIME',
                        width: 200,
                        fix: false,
                        filter: true
                    }
                ],
                buttonList: [
                    {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
                    {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
                    {'key': 'edit', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'}
                ],
                rowid: '',
                row_id: 'attendancesetting_id'
            }
        },
        mounted() {
            this.loading = true;
            this.$store
                .dispatch('PFANS2018Store/getFpans2018List', {})
                .then(response => {
                    if (response.length > 0) {
                        this.buttonList[1].disabled = true;
                    }
                    for (let j = 0; j < response.length; j++) {
                        if (response[j].workshift_start !== null && response[j].workshift_start !== "" &&
                            response[j].workshift_end !== null && response[j].workshift_end !== "") {
                            response[j].workshift = response[j].workshift_start + '~' + response[j].workshift_end;
                        }
                        if (response[j].closingtime_start !== null && response[j].closingtime_start !== "" &&
                            response[j].closingtime_end !== null && response[j].closingtime_end !== "") {
                            response[j].closingtime = response[j].closingtime_start + '~' + response[j].closingtime_end;
                        }
                        if (response[j].lunchbreak_start !== null && response[j].lunchbreak_start !== "" &&
                            response[j].lunchbreak_end !== null && response[j].lunchbreak_end !== "") {
                            response[j].lunchbreak = response[j].lunchbreak_start + '~' + response[j].lunchbreak_end;
                        }
                        if (response[j].nightshift_start !== null && response[j].nightshift_start !== "" &&
                            response[j].nightshift_end !== null && response[j].nightshift_end !== "") {
                            response[j].lunchbreak = response[j].nightshift_start + '~' + response[j].nightshift_end;
                        }
                        if (this.$i18n) {
                            response[j].weekdaysovertime = response[j].weekdaysovertime + 'h';
                            response[j].compassionateleave = response[j].compassionateleave + 'h';
                            response[j].lateearlyleave = response[j].lateearlyleave + 'h';
                            response[j].absenteeism = response[j].absenteeism + 'h';
                            response[j].overtime = response[j].overtime + 'h';
                        }
                    }
                    this.data = response;
                    this.loading = false;
                })
                .catch(error => {
                    Message({
                        message: error,
                        type: 'error',
                        duration: 5 * 1000
                    });
                    this.loading = false;
                })
        },
        methods: {
            rowClick(row) {
                this.rowid = row.attendancesetting_id;
            },
            buttonClick(val) {
                this.$store.commit('global/SET_HISTORYURL', this.$route.path);
                if (val === 'view') {
                    if (this.rowid === '') {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000
                        });
                        return;
                    }
                    this.$router.push({
                        name: 'PFANS2018FormView',
                        params: {
                            _id: this.rowid,
                            disabled: false
                        }
                    })
                }
                if (val === 'insert') {
                    this.$router.push({
                        name: 'PFANS2018FormView',
                        params: {
                            _id: '',
                            disabled: true
                        }
                    })
                }
                if (val === 'edit') {
                    if (this.rowid === '') {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000
                        });
                        return;
                    }
                    this.$router.push({
                        name: 'PFANS2018FormView',
                        params: {
                            _id: this.rowid,
                            disabled: true
                        }
                    })
                }
            },
        }
    }

</script>

<style lang="scss" rel="stylesheet/scss">

</style>
