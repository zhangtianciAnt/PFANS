<template>
  <div>
    <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row_id" :title="title"
                     @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
    </EasyNormalTable>
  </div>
</template>
<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import {Message} from 'element-ui';
  import moment from 'moment';
  import {getStatus, getUserInfo} from '@/utils/customize';

  export default {
    name: 'PFANS2005View',
    components: {
      EasyNormalContainer,
      EasyNormalTable,
    },
    data() {
      return {
        loading: false,
        title: 'title.PFANS2005VIEW',
        data: [],
        form: {
          generationdate: '',
          generation: '',
        },
        columns: [
          {
            code: 'generationdate',
            label: 'label.date',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'generation',
            label: 'label.PFANS2005VIEW_SCFS',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'user_id',
            label: 'label.PFANS2005VIEW_CJZ',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'createon',
            label: 'label.information_start',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'status',
            label: 'label.approval_status',
            width: 120,
            fix: false,
            filter: true,
          },
        ],
        buttonList: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'generate', 'name': 'button.generate', 'disabled': false},
        ],
        rowid: '',
        row_id: 'giving_id',
      };
    },
    mounted() {
      this.getGivingList();
    },
    methods: {
      getGivingList() {
        this.loading = true;
        this.$store
          .dispatch('PFANS2005Store/getDataList', {})
          .then(response => {
            for (let j = 0; j < response.length; j++) {
              if (response[j].generation === '0') {
                if (this.$i18n) {

                  response[j].generation = this.$t('label.PFANS2005VIEW_SG');
                }
              } else if (response[j].generation === '1') {
                if (this.$i18n) {

                  response[j].generation = this.$t('label.PFANS2005VIEW_XTFW');
                }
              }
              if (response[j].createby !== null && response[j].createby !== '') {
                let rst = getUserInfo(response[j].createby);
                if (rst) {
                  response[j].user_id = rst.userinfo.customername;
                }
              }
              if (response[j].generationdate !== null && response[j].generationdate !== '') {
                response[j].generationdate = moment(response[j].generationdate).format('YYYY-MM');
              }
              if (response[j].status !== null && response[j].status !== '') {
                response[j].status = getStatus(response[j].status);
              }
              if (response[j].createon !== null && response[j].createon !== '') {

                response[j].createon = moment(response[j].createon).format('YYYY-MM-DD HH:mm:ss');
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
      rowClick(row) {
        this.rowid = row.giving_id;
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
            name: 'PFANS2005FormView',
            params: {
              _id: this.rowid,
              disabled: false,
            },
          });
        }
        if (val === 'generate') {
          this.loading = true;
          this.$store
            .dispatch('PFANS2005Store/creategiving', {"generation": "0"})
            .then(response => {
              this.getGivingList();
            })
            .catch(error => {
              Message({
                message: error,
                type: 'error',
                duration: 5 * 1000,
              });
              this.loading = false;
            });
        }
      },
    },
  };
</script>
<style lang="scss" rel="stylesheet/scss">
</style>
