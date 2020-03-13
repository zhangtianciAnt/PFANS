<template>
  <div>
    <EasyNormalTable :buttonList="buttonList"
                     :columns="columns"
                     :data="data"
                     :title="title"
                     v-loading="loading">
    </EasyNormalTable>
  </div>
</template>

<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {getUserInfo, getOrgInfoByUserId} from '@/utils/customize';
  import {Message} from 'element-ui';

  export default {
    name: 'PFANS2013View',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        loading: false,
        title: 'title.PFANS2013VIEW',

        // 表格数据源
        data: [],
        // 列属性
        columns: [
          {
            code: 'user_name',
            label: 'label.user_name',
            width: 100,
            fix: false,
            filter: true,
          },
          {
            code: 'center_name',
            label: 'label.center',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'group_name',
            label: 'label.group',
            width: 120,
            fix: false,
            filter: true,
          },
          {
            code: 'team_name',
            label: 'label.team',
            width: 100,
            fix: false,
            filter: true,
          },
          {
            code: 'last_year',
            label: 'label.PFANS2013VIEW_LASTYEAR',
            child: [
              {
                code: 'annual_leave',
                label: 'label.PFANS2013VIEW_ANNUALLEAVE',
                child: [
                  {
                    code: 'annual_leave_lastyear',
                    label: 'label.PFANS2013VIEW_BEGINNING',
                    labelClass: 'pfans2013view_column_5',
                    width: 90,
                    fix: false,
                    filter: true,
                  },
                  {
                    code: 'deduct_annual_leave_lastyear',
                    label: 'label.PFANS2013VIEW_DEDUCT',
                    labelClass: 'pfans2013view_column_5',
                    width: 90,
                    fix: false,
                    filter: true,
                  },
                  {
                    code: 'remaining_annual_leave_lastyear',
                    label: 'label.PFANS2013VIEW_REMAINING',
                    labelClass: 'pfans2013view_column_5',
                    width: 90,
                    fix: false,
                    filter: true,
                  },
                ],
                width: 270,
                fix: false,
                filter: true,
              },
              {
                code: 'paid_leave',
                label: 'label.PFANS2013VIEW_PAIDLEAVE',
                child: [
                  {
                    code: 'paid_leave_lastyear',
                    label: 'label.PFANS2013VIEW_BEGINNING',
                    labelClass: 'pfans2013view_column_8',
                    width: 90,
                    fix: false,
                    filter: true,
                  },
                  {
                    code: 'deduct_paid_leave_lastyear',
                    label: 'label.PFANS2013VIEW_DEDUCT',
                    labelClass: 'pfans2013view_column_8',
                    width: 90,
                    fix: false,
                    filter: true,
                  },
                  {
                    code: 'remaining_paid_leave_lastyear',
                    label: 'label.PFANS2013VIEW_REMAINING',
                    labelClass: 'pfans2013view_column_8',
                    width: 90,
                    fix: false,
                    filter: true,
                  },
                ],
                width: 270,
                fix: false,
                filter: true,
              },
            ],
            width: 540,
            fix: false,
            filter: true,
          },
          {
            code: 'this_year',
            label: 'label.PFANS2013VIEW_THISYEAR',
            child: [
              {
                code: 'annual_leave',
                label: 'label.PFANS2013VIEW_ANNUALLEAVE',
                child: [
                  {
                    code: 'annual_leave_thisyear',
                    label: 'label.PFANS2013VIEW_BEGINNING',
                    labelClass: 'pfans2013view_column_11',
                    width: 90,
                    fix: false,
                    filter: true,
                  },
                  {
                    code: 'deduct_annual_leave_thisyear',
                    label: 'label.PFANS2013VIEW_DEDUCT',
                    labelClass: 'pfans2013view_column_11',
                    width: 90,
                    fix: false,
                    filter: true,
                  },
                  {
                    code: 'remaining_annual_leave_thisyear',
                    label: 'label.PFANS2013VIEW_REMAINING',
                    labelClass: 'pfans2013view_column_11',
                    width: 90,
                    fix: false,
                    filter: true,
                  },
                ],
                width: 270,
                fix: false,
                filter: true,
              },
              {
                code: 'paid_leave',
                label: 'label.PFANS2013VIEW_PAIDLEAVE',
                child: [
                  {
                    code: 'paid_leave_thisyear',
                    label: 'label.PFANS2013VIEW_BEGINNING',
                    labelClass: 'pfans2013view_column_14',
                    width: 90,
                    fix: false,
                    filter: true,
                  },
                  {
                    code: 'deduct_paid_leave_thisyear',
                    label: 'label.PFANS2013VIEW_DEDUCT',
                    labelClass: 'pfans2013view_column_14',
                    width: 90,
                    fix: false,
                    filter: true,
                  },
                  {
                    code: 'remaining_paid_leave_thisyear',
                    label: 'label.PFANS2013VIEW_REMAINING',
                    labelClass: 'pfans2013view_column_14',
                    width: 90,
                    fix: false,
                    filter: true,
                  },
                ],
                width: 270,
                fix: false,
                filter: true,
              },
            ],
            width: 540,
            fix: false,
            filter: true,
          },
        ],
        buttonList: [],
      };
    },
    methods: {
      getDataList() {
        this.loading = true;
        this.$store
          .dispatch('PFANS2013Store/getDataList', {})
          .then(response => {
            let _tableList = response;
            for (let j = 0; j < _tableList.length; j++) {
              if (_tableList[j].user_id !== null && _tableList[j].user_id !== '') {
                let lst1 = getUserInfo(_tableList[j].user_id);
                if (lst1 !== null) {
                  _tableList[j].user_name = lst1.userinfo.customername;
                }

                let lst2 = getOrgInfoByUserId(_tableList[j].user_id);
                if (lst2 !== null) {
                  _tableList[j].center_name = lst2.centerNmae;
                  _tableList[j].group_name = lst2.groupNmae;
                  _tableList[j].team_name = lst2.teamNmae;
                }
                //剩余数据处理
                _tableList[j].remaining_annual_leave_lastyear =
                  (parseFloat(_tableList[j].annual_leave_lastyear)
                  - parseFloat(Math.abs(_tableList[j].deduct_annual_leave_lastyear))).toFixed(1);
                _tableList[j].remaining_paid_leave_lastyear =
                  (parseFloat(_tableList[j].paid_leave_lastyear)
                    - parseFloat(Math.abs(_tableList[j].deduct_paid_leave_lastyear))).toFixed(1);
                _tableList[j].remaining_annual_leave_thisyear =
                  (parseFloat(_tableList[j].annual_leave_thisyear)
                    - parseFloat(Math.abs(_tableList[j].deduct_annual_leave_thisyear))).toFixed(1);
                _tableList[j].remaining_paid_leave_thisyear =
                  (parseFloat(_tableList[j].paid_leave_thisyear)
                    - parseFloat(Math.abs(_tableList[j].deduct_paid_leave_thisyear))).toFixed(1);
              }
            }
            this.data = _tableList;
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
    },
    mounted() {
      this.getDataList();
      this.$store.commit('global/SET_OPERATEID', '');
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .pfans2013view_column_5 {
    background: #99CCFF;
    color: #ffffff;
  }

  .pfans2013view_column_8 {
    background: #99CC99;
    color: #ffffff;
  }

  .pfans2013view_column_11 {
    background: #CC99FF;
    color: #ffffff;
  }

  .pfans2013view_column_14 {
    background: #CC9999;
    color: #ffffff;
  }
</style>

