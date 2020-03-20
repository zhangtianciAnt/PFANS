<template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row" :title="title"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
  </EasyNormalTable>
</template>

<script>
  import EasyNormalTable from "@/components/EasyNormalTable";
  import {Message} from 'element-ui';
  import moment from "moment";
  import {getDictionaryInfo, getCooperinterviewList} from '@/utils/customize';

  export default {
    name: "PFANS6005View",
    components: {
      EasyNormalTable
    },
    data() {
      return {
        loading: false,
        title: "title.PFANS6005VIEW",
        data: [],
        columns: [
          {
            //査定時間
            code: 'assesstime',
            label: 'label.PFANS6005VIEW_CHECKTIME',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            //单价设定姓名
            code: 'user_id',
            label: 'label.PFANS2007VIEW_NAME',
            width: 80,
            fix: false,
            filter: true,
          },
          {
            //卒業年
            code: 'graduation',
            label: 'label.PFANS2024VIEW_GRADUATIONYEAR',
            width: 90,
            fix: false,
            filter: true,
          },
          {
            //会社名
            code: 'company',
            label: 'label.PFANS1036FORMVIEW_CLUBNAME',
            width: 80,
            fix: false,
            filter: true,
          },
          {
            //開発単価微調整（开发单价微调）
            code: 'unitprice',
            label: 'label.PFANS6005VIEW_PRICEADJUST',
            width: 130,
            fix: false,
            filter: true,
          },
          {
            //開発総単価(开发总单价)
            code: 'totalunit',
            label: 'label.PFANS6005VIEW_SUMPRICE',
            width: 110,
            fix: false,
            filter: true,
          },
          {
            //PSDCD相当ランク
            code: 'psdcdrank',
            label: 'label.PFANS6005VIEW_PSDCDGRADE',
            width: 140,
            fix: false,
            filter: true,
          },
          {
            //前年単価
            code: 'yearunit',
            label: 'label.PFANS6005VIEW_LASTYEARPRICE',
            width: 90,
            fix: false,
            filter: true,
          },
          {
            //前年差
            code: 'year',
            label: 'label.PFANS6005FORMVIEW_LASTYEARPOOR',
            width: 80,
            fix: false,
            filter: true,
          },
          {
            //备考
            code: 'remarks',
            label: 'label.PFANS6005FORMVIEW_NOTE',
            width: 70,
            fix: false,
            filter: true,
          },
        ],
        buttonList: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          // {'key': 'generate', 'name': 'button.generate', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'}
        ],
        rowid: '',
        row: 'priceset_id'
      };
    },
    mounted() {
      this.loading = true;
      this.$store
        .dispatch('PFANS6005Store/getpriceset', {})
        .then(response => {
          console.log(response)
          for (let j = 0; j < response.length; j++) {
            if(response[j].user_id !== null && response[j].user_id !== ""){
              let userInfo = getCooperinterviewList(response[j].user_id);
              if(userInfo){
                response[j].user_id = userInfo.expname;
              }
            }
            // 技術スキル
            if (response[j].technical !== null && response[j].technical !== "" ) {
              let technical = getDictionaryInfo(response[j].technical);
              let technology = getDictionaryInfo(response[j].technology);
              if (technical != null) {
                response[j].technical = technical.value1;
              }
            }
            // <!-- 管理スキル-->
            if (response[j].management !== null && response[j].management !== "") {
              let management = getDictionaryInfo(response[j].management);
              if (management != null) {
                response[j].management = management.value1;
              }
            }
            // <!-- 分野スキル-->
            if (response[j].fieldskills !== null && response[j].fieldskills !== "") {
              let fieldskills = getDictionaryInfo(response[j].fieldskills);
              if (fieldskills != null) {
                response[j].fieldskills = fieldskills.value1;
              }
            }
            // 語学スキル
            if (response[j].language !== null && response[j].language !== "") {
              let language = getDictionaryInfo(response[j].language);
              if (language != null) {
                response[j].language = language.value1;
              }
            }
            // 勤務スキル
            if (response[j].workskills !== null && response[j].workskills !== "") {
              let workskills = getDictionaryInfo(response[j].workskills);
              if (workskills != null) {
                response[j].workskills = workskills.value1;
              }
            }
            // 勤続評価
            if (response[j].evaluation !== null && response[j].evaluation !== "") {
              let evaluation = getDictionaryInfo(response[j].evaluation);
              if (evaluation != null) {
                response[j].evaluation = evaluation.value1;
              }
            }
            // PSDCD駐在規模
            if (response[j].psdcdscale !== null && response[j].psdcdscale !== "") {
              let psdcdscale = getDictionaryInfo(response[j].psdcdscale);
              if (psdcdscale != null) {
                response[j].psdcdscale = psdcdscale.value1;
              }
            }
            // 貢献評価
            if (response[j].contribution !== null && response[j].contribution !== "") {
              let contribution = getDictionaryInfo(response[j].contribution);
              if (contribution != null) {
                response[j].contribution = contribution.value1;
              }
            }
            // PSDCD相当ランク
            if (response[j].staffpsdcdrank !== null && response[j].staffpsdcdrank !== "") {
              let staffpsdcdrank = getDictionaryInfo(response[j].staffpsdcdrank);
              if (staffpsdcdrank != null) {
                response[j].staffpsdcdrank = staffpsdcdrank.value1;
              }
            }
            if (response[j].graduation !== null && response[j].graduation !== "") {
              response[j].graduation = moment(response[j].graduation).format("YYYY");
            }
            // 貢献評価
            if (response[j].butionevaluation !== null && response[j].butionevaluation !== "") {
              let butionevaluation = getDictionaryInfo(response[j].butionevaluation);
              if (butionevaluation != null) {
                response[j].butionevaluation = butionevaluation.value1;
              }
            }
            // PSDCD相当ランク
            if (response[j].psdcdrank !== null && response[j].psdcdrank !== "") {
              let psdcdrank = getDictionaryInfo(response[j].psdcdrank);
              if (psdcdrank != null) {
                response[j].psdcdrank = psdcdrank.value1;
              }
            }
              response[j].assesstime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
          }
          this.data=response;
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
        this.rowid = row.priceset_id;
      },
      buttonClick(val) {
        this.$store.commit('global/SET_HISTORYURL', this.$route.path);
        if (val === 'update') {
          this.$router.push({
            name: 'PFANS6005FormView',
            params: {
              _id: this.rowid,
              disabled: true
            }
          })
        }
        if (val === 'view') {
          this.$router.push({
            name: 'PFANS6005FormView',
            params: {
              _id: this.rowid,
              disabled: false
            }
          })
        }
        if (val === 'generate') {
          this.$router.push({
            name: 'PFANS6005View',
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

<style scoped>

</style>
