<template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row_id" :title="title"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
  </EasyNormalTable>
</template>

<script>
  import EasyNormalTable from "@/components/EasyNormalTable";
  import {Message} from "element-ui";
  import moment from "moment";

    export default {
        name: "PFANS5004View",
      components: {
        EasyNormalTable
      },
      data(){
          return {
            loading:false,
            title:"title.PFANS5004VIEW",
            data:[],
            PFANS5004VIEW_PROJECTNUMBER:'项目编号',
            PFANS5004VIEW_PROJECTNAMW:'项目名称',
            PFANS5004VIEW_PROJECTSTYPE:'项目类型',
            PFANS5004VIEW_PROJECTSTATUS:'项目状态',

            columns:[
              {
                code: 'user_id',
                label: 'label.PFANS5004VIEW_PROJECTNUMBER',
                width: 120,
                fix: false,
                filter: true
              },
              {
                code: 'user_id',
                label: 'label.PFANS5004VIEW_PROJECTNAMW',
                width: 120,
                fix: false,
                filter: true
              },
              {
                code: 'user_id',
                label: 'label.PFANS5001FORMVIEW_PROJECTTYPE',
                width: 120,
                fix: false,
                filter: true
              },
              {
                code: 'startdate',
                label: 'label.startdate',
                width: 120,
                fix: false,
                filter: true
              },
              {
                code: 'status',
                label: 'label.PFANS5004VIEW_PROJECTSTATUS',
                width: 120,
                fix: false,
                filter: true
              },
            ],
            buttonList: [
              {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
              {'key': 'insert', 'name': 'button.insert', 'disabled': false, "icon": "el-icon-plus"},
              {'key': 'update', 'name': 'button.update', 'disabled': false, "icon": 'el-icon-edit'}
            ],
            rowid: '',
            row_id: 'closeapplicatid'
          }
      },
      // mounted() {
      //   this.loading = true;
      //   this.$store
      //     .dispatch('PFANS5004Store/get', {})
      //     .then(response => {
      //       for (let j = 0; j < response.length; j++) {
      //         if (response[j].user_id !== null && response[j].user_id !== "") {
      //
      //           if (response[j].status !== null && response[j].status !== "") {
      //             response[j].status = getStatus(response[j].status);
      //           }
      //           if (response[j].startdate !== null && response[j].startdate !== "") {
      //             response[j].startdate = moment(response[j].startdate).format("YYYY-MM-DD");
      //           }
      //         }
      //       }
      //       this.data = response;
      //       this.loading = false;
      //     })
      //     .catch(error => {
      //       Message({
      //         message: error,
      //         type: 'error',
      //         duration: 5 * 1000
      //       });
      //       this.loading = false;
      //     })
      // },
      // methods: {
      //   rowClick(row) {
      //     this.rowid = row.closeapplicatid;
      //   },
      //   buttonClick(val) {
      //     this.$store.commit('global/SET_HISTORYURL', this.$route.path);
      //     if (val === 'insert') {
      //       this.$router.push({
      //         name: 'PFANS5004FormView',
      //         params: {
      //           _id: '',
      //           disabled: true,
      //         }
      //       })
      //     }
      //     if (val === 'update') {
      //       if (this.rowid === '') {
      //         Message({
      //           message: this.$t('normal.info_01'),
      //           type: 'info',
      //           duration: 2 * 1000
      //         });
      //         return;
      //       }
      //       this.$router.push({
      //         name: 'PFANS5004FormView',
      //         params: {
      //           _id: this.rowid,
      //           disabled: true
      //         }
      //       })
      //     }
      //     if (val === 'view') {
      //       if (this.rowid === '') {
      //         Message({
      //           message: this.$t('normal.info_01'),
      //           type: 'info',
      //           duration: 2 * 1000
      //         });
      //         return;
      //       }
      //       this.$router.push({
      //         name: 'PFANS5004FormView',
      //         params: {
      //           _id: this.rowid,
      //           disabled: false
      //         }
      //       })
      //     }
      //
      //   }
      // }


    }
</script>

<style scoped>

</style>
