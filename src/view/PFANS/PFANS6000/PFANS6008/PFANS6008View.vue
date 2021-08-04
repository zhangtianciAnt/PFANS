<template>
  <div id="PFANS6008">
    <EasyNormalTable
      :buttonList="buttonList"
      :columns="columns"
      :data="data"
      :title="title"
      :showSelection="isShow"
      :showIndex="isShow"
      @buttonClick="buttonClick"
      ref="roletable" :rowClassName="rowClassName"
      v-loading="loading">
<!--      ADD CCM 20210330 费用统计添加年度筛选 fr-->
                  <el-date-picker
                    :placeholder="$t('normal.error_09')"
                    @change="yearChange"
                    format="yyyy"
                    type="year"
                    v-model="form.year" slot="customize">
                  </el-date-picker>
<!--      ADD CCM 20210330 费用统计添加年度筛选 to-->
                  <el-select v-model="form.group_id" style="width: 20vw"
                             @change="changeGroup" slot="customize">
                    <el-option
                      v-for="item in optionsdata"
                      :key="item.value"
                      :label="item.lable"
                      :value="item.value">
                    </el-option>
                  </el-select>
    </EasyNormalTable>
  </div>
</template>

<script>
  import EasyNormalTable from "@/components/EasyNormalTable";
  import {Message} from 'element-ui';
  import moment from "moment";
  import {getCooperinterviewList,getDictionaryInfo,getSupplierinfor,getCurrentRoleNew} from '@/utils/customize';
  import {getCurrentRole9, getOrgInfo} from "../../../../utils/customize";
  export default {
    name: 'PFANS6008View',
    components: {
      EasyNormalTable
    },
    data() {
      return {
        rowheight:40,
        loading: false,
        title: "title.PFANS6008VIEW",
        data: [],
        form: {
          group_id: '',
          // ADD CCM 20210330 费用统计添加年度筛选 fr
          year:moment(new Date()).format('MM') < 4 ? moment(new Date()).add(-1, 'y').format("YYYY") : moment(new Date()).format('YYYY'),
          // ADD CCM 20210330 费用统计添加年度筛选 to
        },
        optionsdata: [],
        columns: [
          {
            code: 'bpname',
            label: 'label.PFANS6008VIEW_BPNAME',
            width: 120,
            fix: true,
            filter: true,
          },
          {
            code: 'bpcompany',
            label: 'label.PFANS6008VIEW_BPCOMPANY',
            width: 120,
            fix: true,
            filter: true,
          },
          {
            code: 'four',
            label: 'label.PFANS6008VIEW_FOUR',
            child: [
              {
                code: 'price4',
                label: 'label.PFANS6008VIEW_UNITPRICE',
                width: 90,
                fix: false,
                filter: false,
              },
              {
                code: 'manhour4',
                label: 'label.PFANS6008VIEW_MANHOUR',
                width: 90,
                fix: false,
                filter: false,
              },
              {
                code: 'cost4',
                label: 'label.PFANS6008VIEW_COST',
                width: 90,
                fix: false,
                filter: false,
              },
              {
                code: 'support6',
                label: 'label.PFANS6008VIEW_SUPPORT',
                width: 100,
                fix: false,
                filter: false,
              }
            ],
            width: 540,
            fix: false,
            filter: false,
          },
          {
            code: 'five',
            label: 'label.PFANS6008VIEW_FIVE',
            child: [
              {
                code: 'price5',
                label: 'label.PFANS6008VIEW_UNITPRICE',
                width: 90,
                fix: false,
                filter: false,
              },
              {
                code: 'manhour5',
                label: 'label.PFANS6008VIEW_MANHOUR',
                width: 90,
                fix: false,
                filter: false,
              },
              {
                code: 'cost5',
                label: 'label.PFANS6008VIEW_COST',
                width: 90,
                fix: false,
                filter: false,
              },
              {
                code: 'support6',
                label: 'label.PFANS6008VIEW_SUPPORT',
                width: 100,
                fix: false,
                filter: false,
              }
            ],
            width: 540,
            fix: false,
            filter: false,
          },
          {
            code: 'six',
            label: 'label.PFANS6008VIEW_SIX',
            child: [
              {
                code: 'price6',
                label: 'label.PFANS6008VIEW_UNITPRICE',
                width: 90,
                fix: false,
                filter: false,
              },
              {
                code: 'manhour6',
                label: 'label.PFANS6008VIEW_MANHOUR',
                width: 90,
                fix: false,
                filter: false,
              },
              {
                code: 'cost6',
                label: 'label.PFANS6008VIEW_COST',
                width: 90,
                fix: false,
                filter: false,
              },
              {
                code: 'support6',
                label: 'label.PFANS6008VIEW_SUPPORT',
                width: 100,
                fix: false,
                filter: false,
              }
            ],
            width: 540,
            fix: false,
            filter: false,
          },
          {
            code: 'sixtotal',

            label: 'label.PFANS6008VIEW_SUPPORT6',
            child: [
              {
                code: 'totalmanhours6',
                label: 'label.PFANS6008VIEW_TOTALMANHOURS',
                labelClass: 'sixbackcolor',
                width: 105,
                fix: false,
                filter: false,
              },
              {
                code: 'totalcost6',
                label: 'label.PFANS6008VIEW_TOTALCOST',
                labelClass: 'sixbackcolor',
                width: 105,
                fix: false,
                filter: false,
              },
              {
                code: 'expense6',
                label: 'label.PFANS6008VIEW_EXPENSE',
                labelClass: 'sixbackcolor',
                width: 80,
                fix: false,
                filter: false,
              },
              {
                code: 'contract6',
                label: 'label.PFANS6008VIEW_CONTRACT',
                labelClass: 'sixbackcolor',
                width: 105,
                fix: false,
                filter: false,
              }
            ],
            width: 540,
            fix: false,
            filter: false,
          },
          {
            code: 'seven',
            label: 'label.PFANS6008VIEW_SEVEN',
            child: [
              {
                code: 'price7',
                label: 'label.PFANS6008VIEW_UNITPRICE',
                width: 90,
                fix: false,
                filter: false,
              },
              {
                code: 'manhour7',
                label: 'label.PFANS6008VIEW_MANHOUR',
                width: 90,
                fix: false,
                filter: false,
              },
              {
                code: 'cost7',
                label: 'label.PFANS6008VIEW_COST',
                width: 90,
                fix: false,
                filter: false,
              },
              {
                code: 'support9',
                label: 'label.PFANS6008VIEW_SUPPORT',
                width: 100,
                fix: false,
                filter: false,
              }
            ],
            width: 540,
            fix: false,
            filter: false,
          },
          {
            code: 'eight',
            label: 'label.PFANS6008VIEW_EIGHT',
            child: [
              {
                code: 'price8',
                label: 'label.PFANS6008VIEW_UNITPRICE',
                width: 90,
                fix: false,
                filter: false,
              },
              {
                code: 'manhour8',
                label: 'label.PFANS6008VIEW_MANHOUR',
                width: 90,
                fix: false,
                filter: false,
              },
              {
                code: 'cost8',
                label: 'label.PFANS6008VIEW_COST',
                width: 90,
                fix: false,
                filter: false,
              },
              {
                code: 'support9',
                label: 'label.PFANS6008VIEW_SUPPORT',
                width: 100,
                fix: false,
                filter: false,
              }
            ],
            width: 540,
            fix: false,
            filter: false,
          },
          {
            code: 'nine',
            label: 'label.PFANS6008VIEW_NINE',
            child: [
              {
                code: 'price9',
                label: 'label.PFANS6008VIEW_UNITPRICE',
                width: 90,
                fix: false,
                filter: false,
              },
              {
                code: 'manhour9',
                label: 'label.PFANS6008VIEW_MANHOUR',
                width: 90,
                fix: false,
                filter: false,
              },
              {
                code: 'cost9',
                label: 'label.PFANS6008VIEW_COST',
                width: 90,
                fix: false,
                filter: false,
              },
              {
                code: 'support9',
                label: 'label.PFANS6008VIEW_SUPPORT',
                width: 100,
                fix: false,
                filter: false,
              }
            ],
            width: 540,
            fix: false,
            filter: false,
          },
          {
            code: 'ninetotal',
            label: 'label.PFANS6008VIEW_SUPPORT9',
            child: [
              {
                code: 'totalmanhours9',
                label: 'label.PFANS6008VIEW_TOTALMANHOURS',
                labelClass: 'sixbackcolor',
                width: 105,
                fix: false,
                filter: false,
              },
              {
                code: 'totalcost9',
                label: 'label.PFANS6008VIEW_TOTALCOST',
                labelClass: 'sixbackcolor',
                width: 105,
                fix: false,
                filter: false,
              },
              {
                code: 'expense9',
                label: 'label.PFANS6008VIEW_EXPENSE',
                labelClass: 'sixbackcolor',
                width: 80,
                fix: false,
                filter: false,
              },
              {
                code: 'contract9',
                label: 'label.PFANS6008VIEW_CONTRACT',
                labelClass: 'sixbackcolor',
                width: 105,
                fix: false,
                filter: false,
              }
            ],
            width: 540,
            fix: false,
            filter: false,
          },
          {
            code: 'ten',
            label: 'label.PFANS6008VIEW_TEN',
            child: [
              {
                code: 'price10',
                label: 'label.PFANS6008VIEW_UNITPRICE',
                width: 90,
                fix: false,
                filter: false,
              },
              {
                code: 'manhour10',
                label: 'label.PFANS6008VIEW_MANHOUR',
                width: 90,
                fix: false,
                filter: false,
              },
              {
                code: 'cost10',
                label: 'label.PFANS6008VIEW_COST',
                width: 90,
                fix: false,
                filter: false,
              },
              {
                code: 'support12',
                label: 'label.PFANS6008VIEW_SUPPORT',
                width: 100,
                fix: false,
                filter: false,
              }
            ],
            width: 540,
            fix: false,
            filter: false,
          },
          {
            code: 'eleven',
            label: 'label.PFANS6008VIEW_ELEVEN',
            child: [
              {
                code: 'price11',
                label: 'label.PFANS6008VIEW_UNITPRICE',
                width: 90,
                fix: false,
                filter: false,
              },
              {
                code: 'manhour11',
                label: 'label.PFANS6008VIEW_MANHOUR',
                width: 90,
                fix: false,
                filter: false,
              },
              {
                code: 'cost11',
                label: 'label.PFANS6008VIEW_COST',
                width: 90,
                fix: false,
                filter: false,
              },
              {
                code: 'support12',
                label: 'label.PFANS6008VIEW_SUPPORT',
                width: 100,
                fix: false,
                filter: false,
              }
            ],
            width: 540,
            fix: false,
            filter: false,
          },
          {
            code: 'twelve',
            label: 'label.PFANS6008VIEW_TWELVE',
            child: [
              {
                code: 'price12',
                label: 'label.PFANS6008VIEW_UNITPRICE',
                width: 90,
                fix: false,
                filter: false,
              },
              {
                code: 'manhour12',
                label: 'label.PFANS6008VIEW_MANHOUR',
                width: 90,
                fix: false,
                filter: false,
              },
              {
                code: 'cost12',
                label: 'label.PFANS6008VIEW_COST',
                width: 90,
                fix: false,
                filter: false,
              },
              {
                code: 'support12',
                label: 'label.PFANS6008VIEW_SUPPORT',
                width: 100,
                fix: false,
                filter: false,
              }
            ],
            width: 540,
            fix: false,
            filter: false,
          },
          {
            code: 'twelvetotal',
            label: 'label.PFANS6008VIEW_SUPPORT12',
            child: [
              {
                code: 'totalmanhours12',
                label: 'label.PFANS6008VIEW_TOTALMANHOURS',
                labelClass: 'sixbackcolor',
                width: 105,
                fix: false,
                filter: false,
              },
              {
                code: 'totalcost12',
                label: 'label.PFANS6008VIEW_TOTALCOST',
                labelClass: 'sixbackcolor',
                width: 105,
                fix: false,
                filter: false,
              },
              {
                code: 'expense12',
                label: 'label.PFANS6008VIEW_EXPENSE',
                labelClass: 'sixbackcolor',
                width: 80,
                fix: false,
                filter: false,
              },
              {
                code: 'contract12',
                label: 'label.PFANS6008VIEW_CONTRACT',
                labelClass: 'sixbackcolor',
                width: 105,
                fix: false,
                filter: false,
              }
            ],
            width: 540,
            fix: false,
            filter: false,
          },
          {
            code: 'one',
            label: 'label.PFANS6008VIEW_ONE',
            child: [
              {
                code: 'price1',
                label: 'label.PFANS6008VIEW_UNITPRICE',
                width: 90,
                fix: false,
                filter: false,
              },
              {
                code: 'manhour1',
                label: 'label.PFANS6008VIEW_MANHOUR',
                width: 90,
                fix: false,
                filter: false,
              },
              {
                code: 'cost1',
                label: 'label.PFANS6008VIEW_COST',
                width: 90,
                fix: false,
                filter: false,
              },
              {
                code: 'support3',
                label: 'label.PFANS6008VIEW_SUPPORT',
                width: 100,
                fix: false,
                filter: false,
              }
            ],
            width: 540,
            fix: false,
            filter: false,
          },
          {
            code: 'two',
            label: 'label.PFANS6008VIEW_TWO',
            child: [
              {
                code: 'price2',
                label: 'label.PFANS6008VIEW_UNITPRICE',
                width: 90,
                fix: false,
                filter: false,
              },
              {
                code: 'manhour2',
                label: 'label.PFANS6008VIEW_MANHOUR',
                width: 90,
                fix: false,
                filter: false,
              },
              {
                code: 'cost2',
                label: 'label.PFANS6008VIEW_COST',
                width: 90,
                fix: false,
                filter: false,
              },
              {
                code: 'support3',
                label: 'label.PFANS6008VIEW_SUPPORT',
                width: 100,
                fix: false,
                filter: false,
              }
            ],
            width: 540,
            fix: false,
            filter: false,
          },
          {
            code: 'three',
            label: 'label.PFANS6008VIEW_THREE',
            child: [
              {
                code: 'price3',
                label: 'label.PFANS6008VIEW_UNITPRICE',
                width: 90,
                fix: false,
                filter: false,
              },
              {
                code: 'manhour3',
                label: 'label.PFANS6008VIEW_MANHOUR',
                width: 90,
                fix: false,
                filter: false,
              },
              {
                code: 'cost3',
                label: 'label.PFANS6008VIEW_COST',
                width: 90,
                fix: false,
                filter: false,
              },
              {
                code: 'support3',
                label: 'label.PFANS6008VIEW_SUPPORT',
                width: 100,
                fix: false,
                filter: false,
              }
            ],
            width: 540,
            fix: false,
            filter: false,
          },
          {
            code: 'threetotal',
            label: 'label.PFANS6008VIEW_SUPPORT3',
            child: [
              {
                code: 'totalmanhours3',
                label: 'label.PFANS6008VIEW_TOTALMANHOURS',
                labelClass: 'sixbackcolor',
                width: 100,
                fix: false,
                filter: false,
              },
              {
                code: 'totalcost3',
                label: 'label.PFANS6008VIEW_TOTALCOST',
                labelClass: 'sixbackcolor',
                width: 100,
                fix: false,
                filter: false,
              },
              {
                code: 'expense3',
                label: 'label.PFANS6008VIEW_EXPENSE',
                labelClass: 'sixbackcolor',
                width: 80,
                fix: false,
                filter: false,
              },
              {
                code: 'contract3',
                label: 'label.PFANS6008VIEW_CONTRACT',
                labelClass: 'sixbackcolor',
                width: 100,
                fix: false,
                filter: false,
              }
            ],
            width: 540,
            fix: false,
            filter: false,
          }
        ],
        buttonList: [
//          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'export', 'name': 'button.export', 'disabled': false, 'icon': 'el-icon-download'},
          {'key': 'generate', 'name': 'button.generate', 'disabled': false},
        ],
        rowid: '',
        isShow: true,
        selectedlist: [],
      };
    },
    mounted() {
      this.getById();
    },
    methods: {
      init() {
        let groupid ='';
        this.loading = true;
        if (this.form.group_id)
        {
          groupid = this.form.group_id;
        }
        // ADD CCM 20210330 费用统计添加年度筛选 fr
        let yearnomal = '';
        if (this.form.year)
        {
          yearnomal = moment(this.form.year).format('YYYY');
        }
        // ADD CCM 20210330 费用统计添加年度筛选 to
        let params = {
          groupid: groupid,
          // ADD CCM 20210330 费用统计添加年度筛选 fr
          year:yearnomal
          // ADD CCM 20210330 费用统计添加年度筛选 to
        }
        this.$store
          .dispatch('PFANS6008Store/getCostBygroupid', params)
          .then(response => {
            for (let j = 0; j < response.length; j++) {
              if (response[j].bpname !== null && response[j].bpname !== "") {
                let user = getCooperinterviewList(response[j].bpname);
                if (user) {
                  response[j].exitime = user.exitime;
                  response[j].bpname = user.expname;
                }
              }
              if (response[j].bpcompany !== null && response[j].bpcompany !== "") {
                let supplierInfor = getSupplierinfor(response[j].bpcompany);
                if (supplierInfor) {
                  response[j].bpcompany = supplierInfor.supchinese;
                }
              }
              if (response[j].manhour1 !== null && response[j].manhour1!== "")
              {
                response[j].manhour1 = Number(parseFloat(response[j].manhour1)) === 0 ? 0: Number(parseFloat(response[j].manhour1)).toFixed(2);
              }
              if (response[j].manhour2 !== null && response[j].manhour2!== "")
              {
                response[j].manhour2 = Number(parseFloat(response[j].manhour2)) === 0 ? 0: Number(parseFloat(response[j].manhour2)).toFixed(2);
              }
              if (response[j].manhour3 !== null && response[j].manhour3!== "")
              {
                response[j].manhour3 = Number(parseFloat(response[j].manhour3)) === 0 ? 0: Number(parseFloat(response[j].manhour3)).toFixed(2);
              }
              if (response[j].manhour4 !== null && response[j].manhour4!== "")
              {
                response[j].manhour4 = Number(parseFloat(response[j].manhour4)) === 0 ? 0: Number(parseFloat(response[j].manhour4)).toFixed(2);
              }
              if (response[j].manhour5 !== null && response[j].manhour5!== "")
              {
                response[j].manhour5 = Number(parseFloat(response[j].manhour5)) === 0 ? 0: Number(parseFloat(response[j].manhour5)).toFixed(2);
              }
              if (response[j].manhour6 !== null && response[j].manhour6!== "")
              {
                response[j].manhour6 = Number(parseFloat(response[j].manhour6)) === 0 ? 0: Number(parseFloat(response[j].manhour6)).toFixed(2);
              }
              if (response[j].manhour7 !== null && response[j].manhour7!== "")
              {
                response[j].manhour7 = Number(parseFloat(response[j].manhour7)) === 0 ? 0: Number(parseFloat(response[j].manhour7)).toFixed(2);
              }
              if (response[j].manhour8 !== null && response[j].manhour8!== "")
              {
                response[j].manhour8 = Number(parseFloat(response[j].manhour8)) === 0 ? 0: Number(parseFloat(response[j].manhour8)).toFixed(2);
              }
              if (response[j].manhour9 !== null && response[j].manhour9!== "")
              {
                response[j].manhour9 = Number(parseFloat(response[j].manhour9)) === 0 ? 0: Number(parseFloat(response[j].manhour9)).toFixed(2);
              }
              if (response[j].manhour10 !== null && response[j].manhour10!== "")
              {
                response[j].manhour10 = Number(parseFloat(response[j].manhour10)) === 0 ? 0: Number(parseFloat(response[j].manhour10)).toFixed(2);
              }
              if (response[j].manhour11 !== null && response[j].manhour11!== "")
              {
                response[j].manhour11 = Number(parseFloat(response[j].manhour11)) === 0 ? 0: Number(parseFloat(response[j].manhour11)).toFixed(2);
              }
              if (response[j].manhour12 !== null && response[j].manhour12!== "")
              {
                response[j].manhour12 = Number(parseFloat(response[j].manhour12)) === 0 ? 0: Number(parseFloat(response[j].manhour12)).toFixed(2);
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
      buttonClick(val) {
        if (val === 'export') {
          this.selectedlist = this.$refs.roletable.selectedList;
          if(this.selectedlist.length === 0){
            Message({
              message: this.$t("normal.info_01"),
              type: 'info',
              duration: 2 * 1000
            });
          }else{
            let selectedList = this.selectedlist;
            this.export(selectedList);
          }
        }
        if (val === 'generate')
        {
          let groupid ='';
          this.loading = true;
          if (this.form.group_id)
          {
            groupid = this.form.group_id;
          }
          // ADD CCM 20210330 费用统计添加年度筛选 fr
          let yearnomal = '';
          if (this.form.year)
          {
            yearnomal = moment(this.form.year).format('YYYY');
          }
          let monthAnt = moment(new Date().setMonth(new Date().getMonth() - 1)).format('MM');
          // ADD CCM 20210330 费用统计添加年度筛选 to
          let params = {
            groupid: groupid,
            // ADD CCM 20210330 费用统计添加年度筛选 fr
            year:yearnomal + '-' + monthAnt,
            // ADD CCM 20210330 费用统计添加年度筛选 to
          }
          this.$store
            .dispatch('PFANS6008Store/insertCoststatistics',params)
            .then(response => {
              this.init();
              Message({
                message: this.$t("normal.success_04"),
                type: "success",
                duration: 5 * 1000
              });
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
        }
      },
      export(selectedList){
        this.$store
          .dispatch("PFANS6008Store/downloadExcel", { coststatistics: selectedList })
          .then(response => {
            this.download(response, "费用集计一览")
          })
          .catch(() => {
            console.log("no");
          });
      },
      download(data, filename) {
        if("msSaveOrOpenBlob" in navigator){
          window.navigator.msSaveOrOpenBlob(
            new Blob([data],{type: 'application/vnd.ms-excel;charset=utf-8'}),
            decodeURI(filename) + ".xlsx"
          );
        }else {
          var blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'}); //application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
          var downloadElement = document.createElement('a');
          var href = window.URL.createObjectURL(blob); //创建下载的链接
          downloadElement.href = href;
          downloadElement.download = decodeURI(filename) + '.xlsx'; //下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
          window.URL.revokeObjectURL(href); //释放掉blob对象
        }
      },
      getById() {
        this.loading = true;
        //update gbb 20210401 2021组织架构变更-group下拉变为center下拉 start
        let role = getCurrentRoleNew();
        const vote = [];
        if (role === '3') {//CENTER
            vote.push(
                {
                    value: this.$store.getters.userinfo.userinfo.centerid,
                    lable: this.$store.getters.userinfo.userinfo.centername,
                },
            );
            //add ccm 0112 兼职部门
            if (this.$store.getters.userinfo.userinfo.otherorgs)
            {
                for(let others of this.$store.getters.userinfo.userinfo.otherorgs)
                {
                    if (others.centerid)
                    {
                        this.$store.getters.orgGroupList.filter((item) => {
                            if (item.centerid === others.centerid) {
                                vote.push(
                                    {
                                        value: item.centerid,
                                        lable: item.centername,
                                    },
                                );
                            }
                        })
                    }
                }
            }
            //add ccm 0112 兼职部门
        } else if (role === '2') {//副总经理
            this.$store.getters.orgGroupList.filter((item) => {
                if (item.virtualuser === this.$store.getters.userinfo.userid) {
                    vote.push(
                        {
                            value: item.centerid,
                            lable: item.centername,
                        },
                    );
                }
            })
            //add ccm 0112 兼职部门
            if (this.$store.getters.userinfo.userinfo.otherorgs)
            {
                for(let others of this.$store.getters.userinfo.userinfo.otherorgs)
                {
                    if (others.centerid)
                    {
                        this.$store.getters.orgGroupList.filter((item) => {
                            if (item.centerid === others.centerid) {
                                vote.push(
                                    {
                                        value: item.centerid,
                                        lable: item.centername,
                                    },
                                );
                            }
                        })
                    }
                }
            }
            //add ccm 0112 兼职部门
        }
        else if (role === '4') //GM
        {
          let centers = getOrgInfo(this.$store.getters.userinfo.userinfo.centerid);
          if (centers)
          {
            if (centers.encoding === null || centers.encoding === '' || centers.encoding === undefined)
            {
              vote.push(
                {
                  value: this.$store.getters.userinfo.userinfo.groupid,
                  lable: this.$store.getters.userinfo.userinfo.groupname,
                },
              );
            }
          }
        }
        const vote1 = [];
        if (this.$store.getters.useraccount._id === '5e78b17ef3c8d71e98a2aa30'//管理员
            || this.$store.getters.roles.indexOf("11") != -1 //总经理
            || this.$store.getters.roles.indexOf("16") != -1 //财务部长
            || this.$store.getters.roles.indexOf("18") != -1//企划部长
            || this.$store.getters.roles.indexOf("22") != -1)//外注管理担当
        {
            this.$store.getters.orgGroupList.filter((item) => {
                vote1.push(
                    {
                        value: item.centerid,
                        lable: item.centername,
                    },
                );
            })
            this.optionsdata = vote1;
        }
        else
        {
            this.optionsdata = vote;
        }
        //去重
        let letoptionsdata = [];
        let arrId = [];
        for(var item of this.optionsdata){
            if(arrId.indexOf(item['lable']) == -1){
                arrId.push(item['lable']);
                letoptionsdata.push(item);
            }
        }
        //针对经营管理统计到group修改 start
        let incfmyList = [];
        for(let item of letoptionsdata){
          if(getOrgInfo(item.value).encoding == ''){
            incfmyList.push(item.value)
          }
        }
        if(incfmyList.length > 0) {
          for (let item of incfmyList) {
            letoptionsdata = letoptionsdata.filter(letitem => letitem.value != item)
          }
          let orgInfo = [];
          for (let item of incfmyList) {
            if (item) {
              if (getOrgInfo(item).orgs.length != 0) {
                orgInfo.push(getOrgInfo(item).orgs)
              }
            }
          }
          let groInfo = orgInfo[0].filter(item => item.type == '2');
          for (let item of groInfo) {
            letoptionsdata.push(
              {
                value: item._id,
                lable: item.title,
              },
            );
          }
        }
        //针对经营管理统计到group修改 end
        this.optionsdata = letoptionsdata;
        if(this.optionsdata.length > 0){
            this.form.group_id = this.optionsdata[0].value;
        }
        //update gbb 20210401 2021组织架构变更-group下拉变为center下拉 end
        if (this.form.group_id) {
          this.init();
        }
        this.loading = false;
      },
      changeGroup(val) {
        this.form.group_id = val;
        if (this.form.group_id) {
          //this.getList(this.form.group_id, this.form.year, this.form.region);
          this.$refs.roletable.$refs.eltable.clearSelection();
          this.init();
        }
      },
      // ADD CCM 20210330 费用统计添加年度筛选 fr
      yearChange(value) {
        this.year = moment(value).format('YYYY');
        this.$refs.roletable.$refs.eltable.clearSelection();
        this.init();
      },
      // ADD CCM 20210330 费用统计添加年度筛选 fr
      //add-退场人员信息背景色
      rowClassName({row, rowIndex}) {
        if (row.exitime !==null && row.exitime !=='' && row.exitime !==undefined)
        {
          if (moment(new Date()).format('YYYY-MM') >= moment(row.exitime).add(2, 'months').format('YYYY-MM'))
          {
            return "sub_bg_color_Darkgrey";
          }
        }
      },
      //add-退场人员信息背景色
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .sixbackcolor {
    background: #99CCFF;
    color: #ffffff;
    height: 40px;
    font-size: 0.8rem;
  }
</style>
