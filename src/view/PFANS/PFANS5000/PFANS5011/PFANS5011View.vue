<template>
  <EasyNormalTable
    :buttonList="buttonList"
    :columns="columns"
    :data="data"
    :rowid="row_id"
    :title="title"
    @buttonClick="buttonClick"
    @rowClick="rowClick"
    v-loading="loading">
  </EasyNormalTable>
</template>

<script>
  import EasyNormalTable from "@/components/EasyNormalTable";
  import Message from 'element-ui/packages/message/src/main';
  import {getUserInfo} from '../../../../utils/customize';
  export default {
    name: 'PFANS5011View',
    components: {
      EasyNormalTable
    },
    data(){
      return {
        loading:false,
        title:"title.PFANS5011VIEW",
        data:[],
          time_start:'',
        columns:[
          //项目编号
          {
            code: 'numbers',
            label: 'label.PFANS5009VIEW_PROJECTNO',
            width: 120,
            fix: false,
            filter: true
          },
          //项目名称
          {
            code: 'project_name',
            label: 'label.PFANS5009VIEW_PROJECTNAME',
            width: 120,
            fix: false,
            filter: true
          },

          //工数
          {
            code: 'actualwork',
            label: 'label.PFANS1036FORMVIEW_JOBNUMBER',
            width: 130,
            fix: false,
            filter: true
          },

            //状态
            {
                code: 'manmonth',
                label: 'label.status',
                width: 130,
                fix: false,
                filter: true
            },
        ],
        buttonList: [
          {'key': 'handle', 'name': 'button.handle', 'disabled': false, 'icon': 'el-icon-view'},
        ],
        rowid: '',
        row_id: 'companyprojects_id'
      };
    },
    mounted(){
      this.loading = true;
      this.$store
        .dispatch('PFANS5011Store/getFpans5011List', {})
        .then(response => {
          this.data = response;
            console.log("response",response)
          this.loading = false;
        })
        .catch(error => {
          Message({
            message: error,
            type: 'error',
            duration: 5 * 1000,
          });
          this.loading = false;
        });
        for(let i =0; i<=this.data.length; i++ ){

            this.worktime(this.data[i].companyprojects_id);
        }


    },
    methods: {

        worktime(val){
            this.loading = true;
            this.$store
                .dispatch('PFANS5001Store/getFpans5001List', val)
                .then(response => {
                    this.data = response;
                    this.loading = false;
                })
                .catch(error => {
                    Message({
                        message: error,
                        type: 'error',
                        duration: 5 * 1000,
                    });
                    this.loading = false;
                });
        },

      rowClick(row) {
        this.rowid = row.companyprojects_id
      },
      buttonClick(val) {
        this.$store.commit('global/SET_HISTORYURL', this.$route.path);
        if (val === 'handle') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000
            });
            return;
          }
          this.$router.push({
            name: 'PFANS5011FormView',
            params: {
              _id: this.rowid,
              disabled: false
            }
          })
        }
      }
    }
  };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
