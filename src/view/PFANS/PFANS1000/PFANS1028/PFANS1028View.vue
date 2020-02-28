<template>
  <div>
    <EasyNormalTable :buttonList="buttonList"
                     :columns="columns"
                     :data="data"
                     :title="title"
                     :rowid="row_id"
                     @buttonClick="buttonClick"
                     @rowClick="rowClick"
                     v-loading="loading">
    </EasyNormalTable>
  </div>
</template>

<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {getDictionaryInfo} from '@/utils/customize';
  import {Message} from 'element-ui';


  export default {
    name: "PFANS1028View",
    components: {
      EasyNormalTable,
    },
    data(){
      return{
        loading: false,
        title: "title.PFANS1028VIEW",
        data: [],
        columns:[
          {
            code: 'decisionnumber',
            label: 'label.PFANS1028VIEW_NO',
            width: 150,
            fix: false,
            filter: true
          },
          {
            code: 'career',
            label: 'label.PFANS1028VIEW_CAREER',
            width: 120,
            fix: false,
            filter: true
          },
          {
            code: 'deployment',
            label: 'label.PFANS1028VIEW_ORGANIZATION',
            width: 120,
            fix: false,
            filter: true
          },
          {
            code: 'name',
            label: 'label.PFANS1028VIEW_NAME',
            width: 150,
            fix: false,
            filter: true
          },
          {
            code: 'custoenglish',
            label: 'label.PFANS1032FORMVIEW_DEPOSITARY',
            width: 150,
            fix: false,
            filter: true
          },
          {
            code: 'varto',
            label: 'label.PFANS1028VIEW_COUNTRY',
            width: 120,
            fix: false,
            filter: true
          },
          {
            code: 'review',
            label: 'label.PFANS1028VIEW_REVIEW',
            width: 200,
            fix: false,
            filter: true
          },

          {
            code: 'requirements',
            label: 'label.PFANS1028VIEW_REQUIREMENTS',
            width: 120,
            fix: false,
            filter: true
          },
          {
            code: 'claimdatetime',
            label: 'label.PFANS1028VIEW_PERIOD',
            width: 150,
            fix: false,
            filter: true
          },
          {
            code: 'technical',
            label: 'label.PFANS1028VIEW_TECHNICAL',
            width: 150,
            fix: false,
            filter: true
          }
        ],
        buttonList: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'update', 'name': 'button.update', 'disabled': false, "icon": 'el-icon-edit'}
        ],
        rowid: '',
        row_id: 'nonjudgment_id'
      }
    },
    mounted() {
      this.loading = true;
      this.$store
        .dispatch('PFANS1028Store/get',{})
        .then(response => {
          // for (let j = 0; j < response.length; j++) {
          //   if(response[j].contracttype !== null && response[j].contracttype !== ""){
          //     response[j].contracttype = getDictionaryInfo(response[j].contracttype).value1;
          //   }
          //
          //   if(response[j].currencyposition !== null && response[j].currencyposition !== ""){
          //     response[j].currencyposition = getDictionaryInfo(response[j].currencyposition).value1;
          //   }
          // }
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
        this.rowid = row.nonjudgment_id;
      },
      buttonClick(val) {
        this.$store.commit('global/SET_HISTORYURL', this.$route.path);
        if (val === 'update') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000
            });
            return;
          }
          this.$router.push({
            name: 'PFANS1028FormView',
            params: {
              _id: this.rowid,
              disabled: true
            }
          })
        }
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
            name: 'PFANS1028FormView',
            params: {
              _id: this.rowid,
              disabled: false
            }
          })
        }

      }
    }
  }
</script>

<style scoped>

</style>
