<template>
  <div>
    <EasyNormalTable
      :buttonList="buttonList"
      :columns="columns"
      :data="data"
      :title="title"
      :rowid="row_id"
      @rowClick="rowClick"
      @buttonClick="buttonClick"
      v-loading="loading">
      <el-select @change="changed" slot="customize" v-model="region">
        <el-option :label="$t('label.PFANS2006VIEW_WAGES')" value="1"></el-option>
        <el-option :label="$t('label.PFANS2006VIEW_BONUS')" value="2"></el-option>
      </el-select>
    </EasyNormalTable>
  </div>
</template>

<script>
    import EasyNormalTable from '@/components/EasyNormalTable';
    import {Message} from 'element-ui'
    import {getUserInfo} from "@/utils/customize";
    export default {
        name: 'PFANS2010View',
        components: {
            EasyNormalTable,
        },
        data() {
            return {
                region: '1',
                loading: false,
                title: 'title.PFANS2010VIEW',
                data: [],
                buttonList: [
                    {
                        key: 'view',
                        name: 'button.view',
                        disabled: false,
                        icon: 'el-icon-view'
                    },
                ],
                columns: [
                    {
                        code: 'user_name',
                        label: 'label.user_name',
                        width: 80,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'user_id',
                    },
                    {
                        code: 'center_id',
                        label: 'label.center',
                        width: 100,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'group_id',
                        label: 'label.group',
                        width: 100,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'team_id',
                        label: 'label.team',
                        width: 80,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'years',
                        label: 'label.year',
                        width: 40,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'months',
                        label: 'label.month',
                        width: 40,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'recognitionstate',
                        label: 'label.PFANS2010VIEW_RECOGNITION',
                        width: 60,
                        fix: false,
                        filter: true
                    },
                ],
                row_id: 'attendance_id',
                user_id: '',
                years: '',
                months: '',
            };
        },
        mounted() {
            this.loading = true;
            this.$store
                .dispatch('PFANS2010Store/getlist', {})
                .then(response => {
                    for (let j = 0; j < response.length; j++) {
                        let user = getUserInfo(response[j].user_id);
                        if (user) {
                            response[j].user_name = getUserInfo(response[j].user_id).userinfo.customername;
                        }
                        if(response[j].recognitionstate === "0"){
                            if (this.$i18n) {
                                response[j].recognitionstate = this.$t('label.PFANS2010VIEW_RECOGNITION0');
                            }
                        }
                        else{
                            if (this.$i18n) {
                                response[j].recognitionstate = this.$t('label.PFANS2010VIEW_RECOGNITION1');
                            }
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
                this.userid = row.user_id;
                this.years = row.years;
                this.months = row.months;
            },
            buttonClick(val) {
                this.$store.commit('global/SET_HISTORYURL', this.$route.path);
                if (val === 'view') {
                    if (this.rowid === '') {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'error',
                            duration: 2 * 1000
                        });
                        return;
                    }
                    this.$router.push({
                        name: 'PFANS2010FormView',
                        params: {
                            userid: this.userid,
                            years: this.years,
                            months: this.months,
                            disabled: false
                        }
                    })
                }
            },
            changed(){

            },
        },
    };
</script>

<style scoped>

</style>
