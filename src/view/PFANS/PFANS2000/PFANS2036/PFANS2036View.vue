<template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row" :title="title"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading" :showSelection="isShow">
  </EasyNormalTable>
</template>
<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  let moment = require('moment')
  import {Message} from 'element-ui';
  import {getDepartmentById, getOrgInfoByUserId, getStatus, getUserInfo} from '@/utils/customize';

  export default {
    name: 'PFANS2036View',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        loading: false,
        title: 'title.PFANS2036View',
        data: [],
        selectedlist: [],
        columns: [
          {
            code: 'years',
            label: 'label.PFANS2036VIEW_YEARS',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'updatetime',
            label: 'label.PFANS2036VIEW_UPDATETIME',
            width: 150,
            fix: false,
            filter: true,
          },
        ],
        buttonList: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          //{'key': 'generate', 'name': 'button.generate', 'disabled': false, 'icon': 'el-icon-plus'},
          {'key': 'update', 'name': 'button.update', 'disabled': false, 'icon': 'el-icon-edit'},
          // {'key': 'import', 'name': 'button.import', 'disabled': false, 'icon': 'el-icon-upload2'},
          // {'key': 'export', 'name': 'button.export', 'disabled': false, 'icon': 'el-icon-download'},
        ],
        rowid: '',
        row: 'yearsantid',
        years: '',
        isShow: true,
        //year: '2020',
      };
    },
    mounted() {
      this.getYears();
    },
    methods: {
      rowClick(row) {
        this.rowid = row.yearsantid,
        this.years = row.years
      },
      buttonClick(val) {
        this.$store.commit('global/SET_HISTORYURL', this.$route.path);
        if (val === 'view') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.$router.push({
            name: 'PFANS2036FormView',
            params: {
              _id: this.rowid,
              disabled: false,
              years:this.years,
            },
          });
        }else if (val === 'update') {
          if (this.rowid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          this.$router.push({
            name: 'PFANS2036FormView',
            params: {
              _id: this.rowid,
              disabled: true,
              years:this.years,
            },
          });
        }else if(val === 'export'){
          if (this.$refs.roletable.selectedList.length === 0) {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000
            });
            return;
          }else if(this.$refs.roletable.selectedList.length > 1){
            Message({
              message: this.$t('normal.info_20'),
              type: 'info',
              duration: 2 * 1000
            });
            return;
          }else{
            this.selectedlist = this.$refs.roletable.selectedList;
            import('@/vendor/Export2Excel').then(excel => {
              const tHeader = [
                this.$t('label.PFANS2036VIEW_NAME'), //姓名
                this.$t('label.PFANS2036VIEW_BMJC'), //部门简称
                this.$t('label.PFANS2036VIEW_PFYF'), //配付与否
                this.$t('label.PFANS2036VIEW_NEWPERSONALDATE'), //新人入社预定月
                this.$t('label.PFANS2036VIEW_EXRANK'), //升格前Rn
                this.$t('label.PFANS2036VIEW_CHANGERANK'), //是否升格升号
                this.$t('label.PFANS2036VIEW_LTRANK'), //升格后Rn
                this.$t('label.PFANS2036VIEW_JBG'), //基本给
                this.$t('label.PFANS2036VIEW_ZZG'), //职责给
                this.$t('label.PFANS2036VIEW_YGZ'), //月工资
                this.$t('label.PFANS2036VIEW_YKBT'), //一括补贴
                this.$t('label.PFANS2036VIEW_TZXBTY'), //拓展项补贴1（备份）
                this.$t('label.PFANS2036VIEW_TZXBTE'), //拓展项补贴2（备份）
                this.$t('label.PFANS2036VIEW_DSZNF'), //独生子女费
                this.$t('label.PFANS2036VIEW_QNBUAJ'), //取暖补贴
                this.$t('label.PFANS2036VIEW_BTZJ'), //补贴总计
                this.$t('label.PFANS2036VIEW_YDJJYS'), //月度奖金月数
                this.$t('label.PFANS2036VIEW_YDJJ'), //月度奖金
                this.$t('label.PFANS2036VIEW_NDJJYS'), //年度奖金月数
                this.$t('label.PFANS2036VIEW_NDJJ'), //年度奖金
                this.$t('label.PFANS2036VIEW_GZZE'), //工资总额
                this.$t('label.PFANS2036VIEW_GHJF'), //工会经费
                this.$t('label.PFANS2036VIEW_JBFSG'), //加班费时给
                this.$t('label.PFANS2036VIEW_SFDLHJ'), //是否大连户籍
                this.$t('label.PFANS2036VIEW_OLDYLBXJAJ'), //养老保险基
                this.$t('label.PFANS2036VIEW_LOSSYBXJAJ'), //失业保险基
                this.$t('label.PFANS2036VIEW_GSBXJAJ'), //工伤保险基
                this.$t('label.PFANS2036VIEW_YLBXJAJ'), //医疗保险基
                this.$t('label.PFANS2036VIEW_SYBXJAJ'), //生育保险基
                this.$t('label.PFANS2036VIEW_GJJJSAJ'), //公积金基数
                this.$t('label.PFANS2036VIEW_SBQYAJ'), //社保企业
                this.$t('label.PFANS2036VIEW_DBXAJ'), //大病险
                this.$t('label.PFANS2036VIEW_SBGSAJ'), //社保公司
                this.$t('label.PFANS2036VIEW_GJJGSFDAJ'), //公积金公司负担
                this.$t('label.PFANS2036VIEW_APTOJU'), //4月-6月
                this.$t('label.PFANS2036VIEW_OLDYLBXJJM'), //养老保险基
                this.$t('label.PFANS2036VIEW_LOSSYBXJJM'), //失业保险基
                this.$t('label.PFANS2036VIEW_GSBXJJM'), //工伤保险基
                this.$t('label.PFANS2036VIEW_YLBXJJM'), //医疗保险基
                this.$t('label.PFANS2036VIEW_SYBXJJM'), //生育保险基
                this.$t('label.PFANS2036VIEW_GJJJSJM'), //公积金基数
                this.$t('label.PFANS2036VIEW_SBQYJM'), //社保企业
                this.$t('label.PFANS2036VIEW_DBXJM'), //大病险
                this.$t('label.PFANS2036VIEW_SBGSJM'), //社保公司
                this.$t('label.PFANS2036VIEW_GJJGSFDJM'), //公积金公司负担
                this.$t('label.PFANS2036VIEW_JUTOMA'), //7月-3月
              ];
              const filterVal = [
                'username', //姓名
                'departshort', //部门简称
                'allotment', //配付与否
                'newpersonaldate', //新人入社预定月
                'exrank', //升格前Rn
                'changerank', //是否升格升号
                'ltrank', //升格后Rn
                'basicallyant', //基本给
                'responsibilityant', //职责给
                'monthlysalary', //月工资
                'allowanceant', //一括补贴
                'otherantone', //拓展项补贴1（备份）
                'otheranttwo', //拓展项补贴2（备份）
                'onlychild', //独生子女费
                'qnbt', //取暖补贴
                'totalsubsidies', //补贴总计
                'monthlybonusmonths', //月度奖金月数
                'monthlybonus', //月度奖金
                'annualbonusmonths', //年度奖金月数
                'annualbonus', //年度奖金
                'totalwages', //工资总额
                'tradeunionfunds', //工会经费
                'overtimepay', //加班费时给
                'indalian', //是否大连户籍
                'oldylbxjaj', //养老保险基
                'lossybxjaj', //失业保险基
                'gsbxjaj', //工伤保险基
                'ylbxjaj', //医疗保险基
                'sybxjaj', //生育保险基
                'gjjjsaj', //公积金基数
                'sbqyaj', //社保企业
                'dbxaj', //大病险
                'sbgsaj', //社保公司
                'gjjgsfdaj', //公积金公司负担
                'aptoju', //4月-6月
                'oldylbxjjm', //养老保险基
                'lossybxjjm', //失业保险基
                'gsbxjjm', //工伤保险基
                'ylbxjjm', //医疗保险基
                'sybxjjm', //生育保险基
                'gjjjsjm', //公积金基数
                'sbqyjm', //社保企业
                'dbxjm', //大病险
                'sbgsjm', //社保公司
                'gjjgsfdjm', //公积金公司负担
                'jutoma', //7月-3月
              ];
              const list = this.selectedlist;
              for (let h = 0; h < list.length; h++) {
                // 配付与否
                let allotmentinfo = getDictionaryInfo(list[h].allotment);
                if (allotmentinfo) {
                  list[h].allotment = allotmentinfo.value1;
                }
                // 升格前Rn
                let exrankinfo = getDictionaryInfo(list[u].exrank);
                if (exrankinfo != null) {
                  list[u].exrank = exrankinfo.value1;
                }
                // 是否升格升号
                let changerankinfo = getDictionaryInfo(list[h].changerank);
                if (changerankinfo) {
                  list[h].changerank = changerankinfo.value1;
                }
                // 升格后Rn
                let ltrankinfo = getDictionaryInfo(list[u].ltrank);
                if (ltrankinfo != null) {
                  list[u].ltrank = ltrankinfo.value1;
                }
              }
              const data = this.formatJson(filterVal, list);
              excel.export_json_to_excel(tHeader, data, this.$t('menu.PFANS2036'));
            });
          }
        }
        // if (val === 'generate') {
        //   this.loading = true;
        //   this.$store
        //     .dispatch('PFANS2036Store/insertPenalcost',this.year)
        //     .then(response => {
        //       Message({
        //         message: this.$t("normal.success_03"),
        //         type: "success",
        //         duration: 5 * 1000
        //       });
        //       this.loading = false;
        //     })
        //     .catch(error => {
        //       Message({
        //         message: error,
        //         type: 'error',
        //         duration: 5 * 1000,
        //       });
        //       this.loading = false;
        //     });
        // }
      },
      getYears(){
        this.loading = true;
        this.$store
          .dispatch('PFANS2036Store/getYears')
          .then(response => {
            for (let j = 0; j < response.length; j++) {
              if (response[j].updatetime !== null && response[j].updatetime !== '') {
                response[j].updatetime = moment(response[j].updatetime).format('YYYY-MM-DD');
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
      }
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
