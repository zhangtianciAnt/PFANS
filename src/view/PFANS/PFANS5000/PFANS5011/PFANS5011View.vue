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
            filter: true,
            december:true
          },
          //项目名称
          {
            code: 'projectname',
            label: 'label.PFANS5009VIEW_PROJECTNAME',
            width: 120,
            fix: false,
            filter: true
          },

          //工数
          {
            code: 'confirm',
            label: 'label.PFANS1036FORMVIEW_JOBNUMBER',
            width: 130,
            fix: false,
            filter: true
          },

          //状态
          {
              code: 'status',
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
        row_id: 'projectid'
      };
    },
    mounted(){
      this.getProjectList();
    },
    methods: {
      rowClick(row) {
        this.rowid = row.projectid
      },
      getProjectList(){
          this.loading = true;
          this.$store
            .dispatch('PFANS5001Store/getProjectList', {StrFlg:"1"})
            .then(response => {
              for (let i = 0;i < response.length; i ++){
                response[i].confirm = response[i].confirm === null ? 0 : Number(response[i].confirm);
                if (this.$i18n) {
                    response[i].status = this.$t('label.PFANS5012VIEW_UNCONFIRM');
                    if(response[i].unconfirm != null){
                      if(Number(response[i].unconfirm) > 0){
                        response[i].status = this.$t('label.PFANS5012VIEW_UNCONFIRM');
                      }
                    }
                    else{
                      if(response[i].confirm != null){
                        if(Number(response[i].confirm) > 0){
                          response[i].status = this.$t('label.PFANS5012VIEW_CONFIRM');
                        }
                      }
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
                duration: 5 * 1000,
              });
              this.loading = false;
            });
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
