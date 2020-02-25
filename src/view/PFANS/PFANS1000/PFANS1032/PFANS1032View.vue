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
  import {Message} from "element-ui";
  import moment from "moment";
  import {getDictionaryInfo} from '@/utils/customize';

  export default {
    name: "PFANS1032View",
    components: {
      EasyNormalTable
    },
    data(){
      return {
        loading: false,
        title: "title.PFANS1032VIEW",
        data: [],
        columns: [
          {
            code: 'contractnumber',
            label: 'label.PFANS1032FORMVIEW_CONTRACTNUMBER',
            width: 120,
            fix: false,
            filter: true
          },
          {
            code: 'contracttype',
            label: 'label.PFANS1024VIEW_CONTRACTTYPE',
            width: 120,
            fix: false,
            filter: true
          },
          {
            code: 'custochinese',
            label: 'label.PFANS1032FORMVIEW_DEPOSITARY',
            width: 130,
            fix: false,
            filter: true
          },
          {
            code: 'businesscode',
            label: 'label.PFANS1024VIEW_BUSINESSCODE',
            width: 140,
            fix: false,
            filter: true
          },
          {
            code: 'pjnamechinese',
            label: 'label.PFANS1032FORMVIEW_PJNAME',
            width: 100,
            fix: false,
            filter: true
          },
          {
            code: 'claimnumber',
            label: 'label.PFANS1032FORMVIEW_CLAIMNUMBER',
            width: 130,
            fix: false,
            filter: true
          },
          {
            code: 'claimtype',
            label: 'label.PFANS1032FORMVIEW_CLAIMTYPE',
            width: 130,
            fix: false,
            filter: true
          },
          {
            code: 'claimdatetime',
            label: 'label.PFANS1025VIEW_DEVELOPDATE',
            width: 170,
            fix: false,
            filter: true
          },
          {
            code: 'deliverydate',
            label: 'label.PFANS1024VIEW_DELIVERYFINSHDATE',
            width: 130,
            fix: false,
            filter: true
          }
        ],
        buttonList: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'update', 'name': 'button.update', 'disabled': false, "icon": 'el-icon-edit'}
        ],
        rowid: '',
        row_id: 'contractapplication_id'
      }
    },
    mounted() {
      this.loading = true;
      this.$store
        .dispatch('PFANS1026Store/get',{'type': '1'})
        .then(response => {
          debugger
          for (let j = 0; j < response.length; j++) {

            if(response[j].contracttype !== null && response[j].contracttype !== ""){
              response[j].contracttype = getDictionaryInfo(response[j].contracttype).value1;
            }
            if (response[j].deliverydate !== null && response[j].deliverydate !== "") {
              response[j].deliverydate = moment(response[j].deliverydate).format("YYYY-MM-DD");
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
        this.rowid = row.contractapplication_id;
      },
      buttonClick(val) {
        this.$store.commit('global/SET_HISTORYURL', this.$route.path);
        if (val === "view") {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000
            });
            return;
          }
          this.$router.push({
            name: 'PFANS1032FormView',
            params: {
              _id: this.rowid,
              disabled: false
            }
          })
        }else if (val === "update") {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000
            });
            return;
          }
          this.$router.push({
            name: 'PFANS1032FormView',
            params: {
              _id: this.rowid,
              disabled: true
            }
          })
        }
      }
    }
    }
</script>

<style scoped>

</style>
