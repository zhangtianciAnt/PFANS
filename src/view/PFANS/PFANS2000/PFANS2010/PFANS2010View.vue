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
      <el-date-picker
        v-model="montvalue"
        type="month"
        @change="changed"
        slot="customize"
        placeholder="选择月">
      </el-date-picker>
    </EasyNormalTable>
  </div>
</template>

<script>
    import EasyNormalTable from '@/components/EasyNormalTable';
    import {Message} from 'element-ui'
    import {getUserInfo, getStatus} from "@/utils/customize";
    import moment from "moment";
    export default {
        name: 'PFANS2010View',
        components: {
            EasyNormalTable,
        },
        data() {
            return {
              workflow:[],
                montvalue:moment(new Date()).format("YYYY-MM"),
                region: '1',
                loading: false,
                title: 'title.PFANS2010VIEW',
                data: [],
                user_id: '',
                years: '',
                months: '',
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
                        width: 100,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'center_id',
                        label: 'label.center',
                        width: 120,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'group_id',
                        label: 'label.group',
                        width: 120,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'team_id',
                        label: 'label.team',
                        width: 100,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'years',
                        label: 'label.year',
                        width: 70,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'months',
                        label: 'label.month',
                        width: 70,
                        fix: false,
                        filter: true
                    },
                    {
                        code: 'recognitionstate',
                        label: 'label.PFANS2010VIEW_RECOGNITION',
                        width: 120,
                        fix: false,
                        filter: true
                    },

                  {
                    code: 'workflowstates',
                    label: 'label.approval_status',
                    width: 120,
                    fix: false,
                    filter: true
                  },
                ],
                row_id: 'rowid',
            };
        },
      mounted() {
          this.init();
        },
        methods: {
          async init(){
            await this.getWorkflow();
            await this.getlist();
          },
          getWorkflow(){
            this.$store
              .dispatch('workflowStore/allWorkFlowIns', {menuUrl:'/PFANS2010View'})
              .then(response => {
                this.workflow = response;
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
            getlist(){
                this.loading = true;
                var parameter = {};
                var varmontvalue = this.montvalue.split("-");
                if(varmontvalue.length > 0){
                    parameter = {
                        years:varmontvalue[0],
                        months:varmontvalue[1],
                    }
                }
                this.$store
                    .dispatch('PFANS2010Store/getlist', parameter)
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

                          response[j].owner = response[j].user_id;
                          response[j].rowid = response[j].user_id + "," + response[j].years + "," + response[j].months;
                          let jh = this.workflow.filter(item => item.dataid === response[j].rowid);
                          if(jh.length > 0){
                            response[j].workflowstates = jh[0].status;
                          }else{
                              response[j].workflowstates = getStatus('0');
                          }
                          //总经理承认不需要审批
                          if (response[j].recognitionstate === this.$t('label.PFANS2010VIEW_RECOGNITION0'))
                          {
                            if (response[j].user_id==='5e78fefff1560b363cdd6db7')
                            {
                              response[j].workflowstates = '进行中';
                            }
                          }
                          else
                          {
                            if (response[j].user_id==='5e78fefff1560b363cdd6db7')
                            {
                              response[j].workflowstates = '通过';
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
            rowClick(row) {
                this.user_id = row.rowid;
            },
            buttonClick(val) {
                this.$store.commit('global/SET_HISTORYURL', this.$route.path);
                if (val === 'view') {
                    if (this.user_id === '') {
                        Message({
                            message: this.$t('normal.info_01'),
                            type: 'info',
                            duration: 2 * 1000
                        });
                        return;
                    }
                    this.$router.push({
                        name: 'PFANS2010FormView',
                        params: {
                            _id:this.user_id,
                            // userid: this.user_id,
                            // years: this.years,
                            // months: this.months,
                            disabled: false
                        }
                    })
                }
            },
            changed(val){
                this.montvalue = moment(val).format("YYYY-MM");
                this.getlist();
            },
        },
    };
</script>

<style scoped>

</style>
