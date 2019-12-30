<template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row" :title="title"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
  </EasyNormalTable>
</template>

<script>
  import EasyNormalTable from "@/components/EasyNormalTable";
  import {Message} from 'element-ui';
  import moment from "moment";
  import {getUserInfo,getDictionaryInfo} from '@/utils/customize';
  export default {
    name: 'PFANS6007View',
    components: {
      EasyNormalTable
    },
    data() {
      return {
        loading: false,
        title: "title.PFANS6007VIEW_TITLE",
        data: [],
        columns: [
          {
            code: 'year',
            label: 'label.PFANS2023VIEW_YEARS',
            width: 90,
            fix: false,
            filter: true,
          },
          {
            code: 'psdcdwindow',
            label: 'label.PFANS6007VIEW_PSDCDWINDOW',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'bpplayer',
            label: 'label.PFANS6007VIEW_BPPLAYER',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'bpclubname',
            label: 'label.PFANS6007VIEW_BPCLUBNAME',
            width: 100,
            fix: false,
            filter: true,
          },
          {
            code: 'plmonthplan',
            label: 'label.PFANS6007VIEW_PLMONTHPLAN',
            width: 140,
            fix: false,
            filter: true,
          },
          {
            code: 'typeoffees',
            label: 'label.PFANS6007VIEW_TYPEOFFEES',
            width: 100,
            fix: false,
            filter: true,
          },
          {
            code: 'payment',
            label: 'label.PFANS6007VIEW_PAYMENT',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'remarks',
            label: 'label.PFANS6007VIEW_REMARKS',
            width: 100,
            fix: false,
            filter: true,
          }
        ],
        buttonList: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'insert', 'name': 'button.insert', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'}
        ],
        rowid: '',
        row: 'variousfunds_id'
      };
    },
    mounted() {
      this.loading = true;
      this.$store
        .dispatch('PFANS6007Store/getvariousfunds')
        .then(response => {
          for (let j = 0; j < response.length; j++) {
            if (response[j].year !== null && response[j].year !== "") {
              response[j].year = moment(response[j].year).format("YYYY");
            }
            if (response[j].psdcdwindow !== null && response[j].psdcdwindow !== "") {
              let psdcdwindow = getUserInfo(response[j].psdcdwindow);
              if (psdcdwindow) {
                response[j].psdcdwindow = user.userinfo.customername;
              }

            }
            if (response[j].bpplayer !== null && response[j].bpplayer !== "") {
              let bpplayer = getUserInfo(response[j].bpplayer);
              if (bpplayer) {
                response[j].bpplayer = user.userinfo.customername;
              }
            }
            if (response[j].bpclubname !== null && response[j].bpclubname !== "") {
              let bpclubname = getUserInfo(response[j].bpclubname);
              if (bpclubname) {
                response[j].bpclubname = user.userinfo.customername;
              }
            }
            if (response[j].plmonthplan !== null && response[j].plmonthplan !== "") {
              let plmonthplan = getDictionaryInfo(response[j].plmonthplan);
              if (plmonthplan != null) {
                response[j].plmonthplan = plmonthplan.value1;
              }
            }
            if (response[j].typeoffees !== null && response[j].typeoffees !== "") {
              let typeoffees = getDictionaryInfo(response[j].typeoffees);
              if (typeoffees != null) {
                response[j].typeoffees = typeoffees.value1;
              }
            }
            if (response[j].payment !== null && response[j].payment !== "") {
              let payment = getUserInfo(response[j].payment);
              if (payment) {
                response[j].payment = user.userinfo.customername;
              }
            }
            if (response[j].remarks !== null && response[j].remarks !== "") {
              let remarks = getUserInfo(response[j].remarks);
              if (remarks != null) {
                response[j].remarks = user.userinfo.customername;
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
          this.loading = false
        })
    },
    methods: {
      rowClick(row) {
        this.rowid = row.variousfunds_id;
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
            name: 'PFANS6007FormView',
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
            name: 'PFANS6007FormView',
            params: {
              _id: this.rowid,
              disabled: false
            }
          })
        }
        if (val === 'insert') {
            this.$router.push({
              name: 'PFANS6007FormView',
              params: {
                _id: '',
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
