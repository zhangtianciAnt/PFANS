<template>
  <EasyNormalTable
    :buttonList="buttonList"
    :columns="columns"
    :data="data"
    :rowid="row"
    :title="title"
    @buttonClick="buttonClick"
    @rowClick="rowClick"
    v-loading="loading">
  </EasyNormalTable>
</template>
<script>
  import EasyNormalTable from '@/components/EasyNormalTable'
  import {Message} from 'element-ui'
  import moment from 'moment'
  import {getStatus, getUserInfo} from '@/utils/customize'

  export default {
    name: 'PFANS1031View',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        loading: false,
        title: 'title.PFANS1031VIEW',
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
            code: 'depositchinese',
            label: 'label.PFANS1032FORMVIEW_DEPOSITARY',
            width: 130,
            fix: false,
            filter: true
          },
          {
            code: 'entrustment',
            label: 'label.PFANS1031FORMVIEW_ENTRUSTMENT',
            width: 140,
            fix: false,
            filter: true
          },
          {
            code: 'deployment',
            label: 'label.PFANS1024VIEW_DEPLOYMENT',
            width: 140,
            fix: false,
            filter: true
          },
          {
            code: 'pjnamejapanese',
            label: 'label.PFANS1025VIEW_PJNAME',
            width: 140,
            fix: false,
            filter: true
          },
          {
            code: 'openingdate',
            label: 'label.PFANS1025VIEW_OPENINGDATE',
            width: 140,
            fix: false,
            filter: true
          },
          {
            code: 'enddate',
            label: 'label.PFANS1025VIEW_ENDDATE',
            width: 140,
            fix: false,
            filter: true
          },
          {
            code: 'deliveryfinshdate',
            label: 'label.PFANS1024VIEW_DELIVERYFINSHDATE',
            width: 140,
            fix: false,
            filter: true
          },
          {
            code: 'claimamount',
            label: 'label.PFANS1024VIEW_CLAIMAMOUNT',
            width: 140,
            fix: false,
            filter: true
          },
          {
            code: 'claimnumber',
            label: 'label.PFANS1032FORMVIEW_CLAIMNUMBER',
            width: 140,
            fix: false,
            filter: true
          },
          {
            code: 'claimtype',
            label: 'label.PFANS1032FORMVIEW_CLAIMTYPE',
            width: 140,
            fix: false,
            filter: true
          },
          {
            code: 'toto',
            label: 'label.PFANS1031FORMVIEW_TOTO',
            width: 100,
            fix: false,
            filter: true
          },
        ],
        buttonList: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'}
        ],
        rowid: '',
        row: 'napalm_id',
      }
    },
    mounted() {
      this.loading = true;
      this.$store
        .dispatch('PFANS1031Store/get',{})
        .then(response => {
          this.data = response;
          this.loading = false
        })
        .catch(error => {
          Message({
            message: error,
            type: 'error',
            duration: 5 * 1000
          });
          this.loading = false
        })
    },
    methods: {
      rowClick(row) {
        this.rowid = row.napalm_id
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
            return
          }
          this.$router.push({
            name: 'PFANS1031FormView',
            params: {
              _id: this.rowid,
              disabled: false
            }
          })
        }
        if (val === 'update') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'error',
              duration: 2 * 1000
            });
            return
          }
          this.$router.push({
            name: 'PFANS1031FormView',
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
