<template>
  <div style="min-height: 100%">

    <EasyNormalTable
      :buttonList="buttonList"
      :columns="columns"
      :data="table"
      :title="title"
      v-loading="loading"
    >
    </EasyNormalTable>
  </div>
</template>
<script>
    import EasyNormalTable from '@/components/EasyNormalTable';
    import {Message} from 'element-ui';
    let moment = require('moment');

    export default {
        name: "PFANS8010View.vue",
        components: {
            EasyNormalTable
        },
        data() {
            return {
                title: 'title.PFANS8010VIEW',
                table: [],
                status: '',
                loading: false,
                data: [],
                buttonList: [],
                columns: [
                    {
                        code: 'ip',
                        label: 'label.PFANS8010VIEW_IP',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'createon',
                        label: 'label.PFANS8010VIEW_DATE',
                        width: 150,
                        fix: false,
                        filter: true
                    },
                ],
            };
        },
        mounted() {
            this.getStatus();
        },
        methods: {
            getStatus() {
                this.loading = true;
                this.$store
                    .dispatch('usersStore/getSigninlog')
                    .then(response => {
                        //重庆时区
                        var moment = require('moment-timezone');
                        moment.tz.setDefault("Asia/Chongqing");
                        for (let j = 0; j < response.length; j++) {
                            response[j].createon = moment(response[j].createon).format('YYYY-MM-DD HH:mm:ss');
                        }
                        this.table = response;
                        this.loading = false;
                    })
                    .catch(err => {
                        this.loading = false;
                        this.$message.error({
                            message: err,
                            type: "error",
                            duration: 5 * 1000
                        });
                    });
            },
        }
    }
</script>
<style scoped>
</style>
