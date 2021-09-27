<template>
  <div>
    <EasyNormalTable :buttonList="buttonList"
                     :columns="columns"
                     :data="data"
                     :title="title"
                     v-loading="loading">
      <!--add scc-->
      <el-select
        v-model="enterOrleave"
        :placeholder="$t('normal.error_09')"
        slot="customize"
        style="margin-right:1vw"
        @change="filterInfo"
        clearable
      >
        <el-option
          v-for="item in optionsForel"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <!--add scc-->
    </EasyNormalTable>
  </div>
</template>

<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {getUserInfo, getOrgInfoByUserId} from '@/utils/customize';
  import {Message} from 'element-ui';
  import moment from "moment";
  //region scc add 角色判断 from
  import {getCurrentRole6} from "../../../../utils/customize";
  //endregion scc add 角色判断 to

  export default {
    name: 'PFANS2013View',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        loading: false,
        title: 'title.PFANS2013VIEW',
        //region scc 9/1 add 在职离职状态 from
        enterOrleave: "0",
        data1: [],
        optionsForel: [
          {
            value: "0",
            label: this.$t("label.USERSVIEW_ENTER")
          },
          {
            value: "1",
            label: this.$t("label.USERSVIEW_LEAVE")
          },
        ],
        //endregion scc 9/1 add 在职离职状态 to
        // 表格数据源
        data: [],
        //region scc add 9/2 不同年休列 from
        columsCopy: [
          {
            code: 'user_name',
            label: 'label.user_name',
            width: 50,
            fix: false,
            filter: false,
          },
          {
            code: 'center_name',
            label: 'label.center',
            width: 80,
            fix: false,
            filter: false,
          },
          {
            code: 'group_name',
            label: 'label.group',
            width: 80,
            fix: false,
            filter: false,
          },
          {
            code: 'team_name',
            label: 'label.team',
            width: 80,
            fix: false,
            filter: false,
          },
          {
            code: 'enterday',
            label: 'label.PFANS2013VIEW_ENTERDAY',
            width: 70,
            fix: false,
            filter: false,
          },
          {
            code: 'workday',
            label: 'label.PFANS2013VIEW_WORKDAY',
            width: 80,
            fix: false,
            filter: false,
          },
          {
            code: 'enddate',
            label: 'label.PFANS2013VIEW_ENTRYDAY',
            width: 70,
            fix: false,
            filter: false,
          },
          //region scc 9/3 除总经理，人事部长，工资计算担当的其他人看到的年休，为上年度中剩余法定年休 from
          {
            code: 'last_year',
            label: 'label.PFANS2013VIEW_LASTYEAR',
            child: [
              {
                code: 'annual_leave',
                label: 'label.PFANS2013VIEW_ANNUALLEAVE',
                child: [
                  {
                    code: 'remaining_annual_leave_lastyear',
                    label: 'label.PFANS2013VIEW_REMAINING',
                    labelClass: 'pfans2013view_column_5',
                    width: 60,
                    fix: false,
                    filter: false,
                  },
                ],
                width: 65,
                fix: false,
                filter: false,
              },
            ],
            width: 60,
            fix: false,
            filter: false,
          },
          //endregion scc 9/3 除总经理，人事部长，工资计算担当的其他人看到的年休，为上年度中剩余法定年休 to
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
                    width: 50,
                    fix: false,
                    filter: false,
                  },
                  {
                    code: 'deduct_annual_leave_thisyear',
                    label: 'label.PFANS2013VIEW_DEDUCT',
                    labelClass: 'pfans2013view_column_11',
                    width: 50,
                    fix: false,
                    filter: false,
                  },
                  {
                    code: 'remaining_annual_leave_thisyear',
                    label: 'label.PFANS2013VIEW_REMAINING',
                    labelClass: 'pfans2013view_column_11',
                    width: 50,
                    fix: false,
                    filter: false,
                  },
                  {
                    code: 'annual_leave_shenqingzhong',
                    label: 'label.PFANS2013VIEW_SHENQINGZHONG',
                    labelClass: 'pfans2013view_column_11',
                    width: 70,
                    fix: false,
                    filter: false,
                  },
                  {
                    code: 'annual_avg_remaining',
                    label: 'label.PFANS2013VIEW_AVG',
                    labelClass: 'pfans2013view_column_11',
                    width: 100,
                    fix: false,
                    filter: false,
                  },
                ],
                width: 350,
                fix: false,
                filter: false,
              },
            ],
            width: 250,
            fix: false,
            filter: false,
          },
        ],
        //endregion scc add 9/2 不同年休列 to
        //region scc add 9/2 判断用户角色 from
        roleBility: '',
        //endregion scc add 9/2 判断用户角色 to
        // 列属性
        columns: [
          {
            code: 'user_name',
            label: 'label.user_name',
            width: 50,
            fix: false,
            filter: false,
          },
          {
            code: 'center_name',
            label: 'label.center',
            width: 80,
            fix: false,
            filter: false,
          },
          {
            code: 'group_name',
            label: 'label.group',
            width: 80,
            fix: false,
            filter: false,
          },
          {
            code: 'team_name',
            label: 'label.team',
            width: 80,
            fix: false,
            filter: false,
          },
          {
            code: 'enterday',
            label: 'label.PFANS2013VIEW_ENTERDAY',
            width: 70,
            fix: false,
            filter: false,
          },
          {
            code: 'workday',
            label: 'label.PFANS2013VIEW_WORKDAY',
            width: 80,
            fix: false,
            filter: false,
          },
          {
            code: 'enddate',
            label: 'label.PFANS2013VIEW_ENTRYDAY',
            width: 70,
            fix: false,
            filter: false,
          },
          {
            code: 'last_year',
            label: 'label.PFANS2013VIEW_LASTYEAR',
            child: [
              //region scc del 总经理，人事部长，工资计算担当，不需要看到的年休列，为上年度剩余法定年休 from
              // {
              //   code: 'annual_leave',
              //   label: 'label.PFANS2013VIEW_ANNUALLEAVE',
              //   child: [
              //     // {
              //     //   code: 'annual_leave_lastyear',
              //     //   label: 'label.PFANS2013VIEW_BEGINNING',
              //     //   labelClass: 'pfans2013view_column_5',
              //     //   width: 90,
              //     //   fix: false,
              //     //   filter: true,
              //     // },
              //     // {
              //     //   code: 'deduct_annual_leave_lastyear',
              //     //   label: 'label.PFANS2013VIEW_DEDUCT',
              //     //   labelClass: 'pfans2013view_column_5',
              //     //   width: 90,
              //     //   fix: false,
              //     //   filter: true,
              //     // },
              //     {
              //       code: 'remaining_annual_leave_lastyear',
              //       label: 'label.PFANS2013VIEW_REMAINING',
              //       labelClass: 'pfans2013view_column_5',
              //       width: 60,
              //       fix: false,
              //       filter: false,
              //     },
              //   ],
              //   width: 65,
              //   fix: false,
              //   filter: false,
              // },
              //endregion scc del 总经理，人事部长，工资计算担当，不需要看到的年休列，为上年度剩余法定年休 to
              //region scc add 总经理，人事部长，工资计算担当能看到的年休列，为上年度中剩余福利年休 from
              {
                code: 'gannual_leave',
                label: 'label.PFANS2013VIEW_ANNUALLEAVE',
                child: [
                  {
                    code: 'remaining_paid_leave_lastyear',
                    label: 'label.PFANS2013VIEW_REMAINING',
                    labelClass: 'pfans2013view_column_5',
                    width: 60,
                    fix: false,
                    filter: false,
                  },
                ],
                width: 65,
                fix: false,
                filter: false,
              },
              //endregion scc add 总经理，人事部长，工资计算担当能看到的年休列，为上年度中剩余福利年休 to
              // {
              //   code: 'paid_leave',
              //   label: 'label.PFANS2013VIEW_PAIDLEAVE',
              //   child: [
              //     {
              //       code: 'paid_leave_lastyear',
              //       label: 'label.PFANS2013VIEW_BEGINNING',
              //       labelClass: 'pfans2013view_column_8',
              //       width: 90,
              //       fix: false,
              //       filter: true,
              //     },
              //     {
              //       code: 'deduct_paid_leave_lastyear',
              //       label: 'label.PFANS2013VIEW_DEDUCT',
              //       labelClass: 'pfans2013view_column_8',
              //       width: 90,
              //       fix: false,
              //       filter: true,
              //     },
              //     {
              //       code: 'remaining_paid_leave_lastyear',
              //       label: 'label.PFANS2013VIEW_REMAINING',
              //       labelClass: 'pfans2013view_column_8',
              //       width: 90,
              //       fix: false,
              //       filter: true,
              //     },
              //   ],
              //   width: 270,
              //   fix: false,
              //   filter: true,
              // },
            ],
            width: 60,
            fix: false,
            filter: false,
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
                    width: 50,
                    fix: false,
                    filter: false,
                  },
                  {
                    code: 'deduct_annual_leave_thisyear',
                    label: 'label.PFANS2013VIEW_DEDUCT',
                    labelClass: 'pfans2013view_column_11',
                    width: 50,
                    fix: false,
                    filter: false,
                  },
                  {
                    code: 'remaining_annual_leave_thisyear',
                    label: 'label.PFANS2013VIEW_REMAINING',
                    labelClass: 'pfans2013view_column_11',
                    width: 50,
                    fix: false,
                    filter: false,
                  },
                  {
                    code: 'annual_leave_shenqingzhong',
                    label: 'label.PFANS2013VIEW_SHENQINGZHONG',
                    labelClass: 'pfans2013view_column_11',
                    width: 70,
                    fix: false,
                    filter: false,
                  },
                  {
                    code: 'annual_avg_remaining',
                    label: 'label.PFANS2013VIEW_AVG',
                    labelClass: 'pfans2013view_column_11',
                    width: 100,
                    fix: false,
                    filter: false,
                  },
                ],
                width: 350,
                fix: false,
                filter: false,
              },
              // {
              //   code: 'paid_leave',
              //   label: 'label.PFANS2013VIEW_PAIDLEAVE',
              //   child: [
              //     {
              //       code: 'paid_leave_thisyear',
              //       label: 'label.PFANS2013VIEW_BEGINNING',
              //       labelClass: 'pfans2013view_column_14',
              //       width: 90,
              //       fix: false,
              //       filter: true,
              //     },
              //     {
              //       code: 'deduct_paid_leave_thisyear',
              //       label: 'label.PFANS2013VIEW_DEDUCT',
              //       labelClass: 'pfans2013view_column_14',
              //       width: 90,
              //       fix: false,
              //       filter: true,
              //     },
              //     {
              //       code: 'remaining_paid_leave_thisyear',
              //       label: 'label.PFANS2013VIEW_REMAINING',
              //       labelClass: 'pfans2013view_column_14',
              //       width: 90,
              //       fix: false,
              //       filter: true,
              //     },
              //   ],
              //   width: 270,
              //   fix: false,
              //   filter: true,
              // },
            ],
            width: 250,
            fix: false,
            filter: false,
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

                if (_tableList[j].enterday !== null && _tableList[j].enterday !== "") {
                  _tableList[j].enterday = moment(_tableList[j].enterday).format("YYYY-MM-DD");
                }
                if (_tableList[j].workday !== null && _tableList[j].workday !== "") {
                  _tableList[j].workday = moment(_tableList[j].workday).format("YYYY-MM-DD");
                }
                if (_tableList[j].enddate !== null && _tableList[j].enddate !== "") {
                  _tableList[j].enddate = moment(_tableList[j].enddate).format("YYYY-MM-DD");
                }
                //region scc add 9/1 获取离职日 from
                if(_tableList[j].resignation_date !== null && _tableList[j].resignation_date !== ""){
                  _tableList[j].resignation_date = moment(_tableList[j].resignation_date).format("YYYY-MM-DD");
                }
                //endregion scc add 9/1 获取离职日 to
                //剩余数据处理
                // _tableList[j].remaining_annual_leave_lastyear =
                //   (parseFloat(_tableList[j].annual_leave_lastyear)
                //   - parseFloat(Math.abs(_tableList[j].deduct_annual_leave_lastyear))).toFixed(1);
                // _tableList[j].remaining_paid_leave_lastyear =
                //   (parseFloat(_tableList[j].paid_leave_lastyear)
                //     - parseFloat(Math.abs(_tableList[j].deduct_paid_leave_lastyear))).toFixed(1);
                // _tableList[j].remaining_annual_leave_thisyear =
                //   (parseFloat(_tableList[j].annual_leave_thisyear)
                //     - parseFloat(Math.abs(_tableList[j].deduct_annual_leave_thisyear))).toFixed(1);
                // _tableList[j].remaining_paid_leave_thisyear =
                //   (parseFloat(_tableList[j].paid_leave_thisyear)
                //     - parseFloat(Math.abs(_tableList[j].deduct_paid_leave_thisyear))).toFixed(1);
              }
            }
            this.data = _tableList;
            //region scc add 9/1 页面默认初始值为在职 from
            this.data1 = _tableList;
            this.data = this.data1.filter(item => {
              return (
                item.resignation_date === null
                || item.resignation_date === ""
                ||moment(item.resignation_date).format('YYYY-MM-DD')
                >=moment(new Date()).format('YYYY-MM-DD'))
            });
            //endregion scc add 9/1 页面默认初始值为在职 to
            this.loading = false;
          })
          .catch(error => {
            this.$message.error({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
            this.loading = false;
          });
      },
      //region scc add 9/1 在职离职下拉框change事件 from
      filterInfo() {
        this.data = this.data1;
        if (this.data.length > 0) {
          if (this.enterOrleave !== "") {
            if (this.enterOrleave === "0") {//在职
              this.data = this.data1.filter(item => {
                return (
                  item.resignation_date === null
                  || item.resignation_date === ""
                  || moment(item.resignation_date).format('YYYY-MM-DD')
                  >= moment(new Date()).format('YYYY-MM-DD'))
              });
            } else if (this.enterOrleave === "1") {//离职
              this.data = this.data1.filter(item => {
                return ((
                  moment(item.resignation_date).format('YYYY-MM-DD')
                  < moment(new Date()).format('YYYY-MM-DD')))
              });
            }
          } else {
            this.data = this.data1//不选择为所有数据，在职+离职
          }
        }
      },
      //endregion scc add 9/1 在职离职下拉框change事件 to
    },
    mounted() {
      this.getDataList();
      this.$store.commit('global/SET_OPERATEID', '');
    },
    //region scc add 判断用户是否是总经理，人事部长，工资计算担当 from
    created() {
      this.roleBility = getCurrentRole6();
      if(this.roleBility !== '0'){
        this.columns = this.columsCopy;
      }
    },
    //endregion scc add 判断用户是否是总经理，人事部长，工资计算担当 to
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

