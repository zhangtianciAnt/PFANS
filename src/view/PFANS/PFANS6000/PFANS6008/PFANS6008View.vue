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
      ref="roletable"
      v-loading="loading">
    </EasyNormalTable>
  </div>
</template>

<script>
  import EasyNormalTable from "@/components/EasyNormalTable";
  import {Message} from 'element-ui';
  import moment from "moment";
  import {getUserInfo,getDictionaryInfo} from '@/utils/customize';
  export default {
    name: 'PFANS6008View',
    components: {
      EasyNormalTable
    },
    data() {
      return {
        loading: false,
        title: "title.PFANS6008VIEW",
        data: [],
        columns: [
          {
            code: 'bpname',
            label: 'label.PFANS6008VIEW_BPNAME',
            width: 150,
            fix: false,
            filter: true,
          },
          {
            code: 'bpcompany',
            label: 'label.PFANS6008VIEW_BPCOMPANY',
            width: 120,
            fix: false,
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
                filter: true,
              },
              {
                code: 'manhour4',
                label: 'label.PFANS6008VIEW_MANHOUR',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'cost4',
                label: 'label.PFANS6008VIEW_COST',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'support6',
                label: 'label.PFANS6008VIEW_SUPPORT',
                width: 90,
                fix: false,
                filter: true,
              }
            ],
            width: 540,
            fix: false,
            filter: true,
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
                filter: true,
              },
              {
                code: 'manhour5',
                label: 'label.PFANS6008VIEW_MANHOUR',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'cost5',
                label: 'label.PFANS6008VIEW_COST',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'support6',
                label: 'label.PFANS6008VIEW_SUPPORT',
                width: 90,
                fix: false,
                filter: true,
              }
            ],
            width: 540,
            fix: false,
            filter: true,
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
                filter: true,
              },
              {
                code: 'manhour6',
                label: 'label.PFANS6008VIEW_MANHOUR',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'cost6',
                label: 'label.PFANS6008VIEW_COST',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'support6',
                label: 'label.PFANS6008VIEW_SUPPORT',
                width: 90,
                fix: false,
                filter: true,
              }
            ],
            width: 540,
            fix: false,
            filter: true,
          },
          {
            code: 'sixtotal',
            label: 'label.PFANS6008VIEW_SIX',
            child: [
              {
                code: 'totalmanhours6',
                label: 'label.PFANS6008VIEW_TOTALMANHOURS',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'totalcost6',
                label: 'label.PFANS6008VIEW_TOTALCOST',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'expense6',
                label: 'label.PFANS6008VIEW_EXPENSE',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'contract6',
                label: 'label.PFANS6008VIEW_CONTRACT',
                width: 90,
                fix: false,
                filter: true,
              }
            ],
            width: 540,
            fix: false,
            filter: true,
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
                filter: true,
              },
              {
                code: 'manhour7',
                label: 'label.PFANS6008VIEW_MANHOUR',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'cost7',
                label: 'label.PFANS6008VIEW_COST',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'support9',
                label: 'label.PFANS6008VIEW_SUPPORT',
                width: 90,
                fix: false,
                filter: true,
              }
            ],
            width: 540,
            fix: false,
            filter: true,
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
                filter: true,
              },
              {
                code: 'manhour8',
                label: 'label.PFANS6008VIEW_MANHOUR',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'cost8',
                label: 'label.PFANS6008VIEW_COST',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'support9',
                label: 'label.PFANS6008VIEW_SUPPORT',
                width: 90,
                fix: false,
                filter: true,
              }
            ],
            width: 540,
            fix: false,
            filter: true,
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
                filter: true,
              },
              {
                code: 'manhour9',
                label: 'label.PFANS6008VIEW_MANHOUR',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'cost9',
                label: 'label.PFANS6008VIEW_COST',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'support9',
                label: 'label.PFANS6008VIEW_SUPPORT',
                width: 90,
                fix: false,
                filter: true,
              }
            ],
            width: 540,
            fix: false,
            filter: true,
          },
          {
            code: 'ninetotal',
            label: 'label.PFANS6008VIEW_NINE',
            child: [
              {
                code: 'totalmanhours9',
                label: 'label.PFANS6008VIEW_TOTALMANHOURS',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'totalcost9',
                label: 'label.PFANS6008VIEW_TOTALCOST',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'expense9',
                label: 'label.PFANS6008VIEW_EXPENSE',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'contract9',
                label: 'label.PFANS6008VIEW_CONTRACT',
                width: 90,
                fix: false,
                filter: true,
              }
            ],
            width: 540,
            fix: false,
            filter: true,
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
                filter: true,
              },
              {
                code: 'manhour10',
                label: 'label.PFANS6008VIEW_MANHOUR',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'cost10',
                label: 'label.PFANS6008VIEW_COST',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'support12',
                label: 'label.PFANS6008VIEW_SUPPORT',
                width: 90,
                fix: false,
                filter: true,
              }
            ],
            width: 540,
            fix: false,
            filter: true,
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
                filter: true,
              },
              {
                code: 'manhour11',
                label: 'label.PFANS6008VIEW_MANHOUR',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'cost11',
                label: 'label.PFANS6008VIEW_COST',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'support12',
                label: 'label.PFANS6008VIEW_SUPPORT',
                width: 90,
                fix: false,
                filter: true,
              }
            ],
            width: 540,
            fix: false,
            filter: true,
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
                filter: true,
              },
              {
                code: 'manhour12',
                label: 'label.PFANS6008VIEW_MANHOUR',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'cost12',
                label: 'label.PFANS6008VIEW_COST',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'support12',
                label: 'label.PFANS6008VIEW_SUPPORT',
                width: 90,
                fix: false,
                filter: true,
              }
            ],
            width: 540,
            fix: false,
            filter: true,
          },
          {
            code: 'twelvetotal',
            label: 'label.PFANS6008VIEW_TWELVE',
            child: [
              {
                code: 'totalmanhours12',
                label: 'label.PFANS6008VIEW_TOTALMANHOURS',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'totalcost12',
                label: 'label.PFANS6008VIEW_TOTALCOST',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'expense12',
                label: 'label.PFANS6008VIEW_EXPENSE',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'contract12',
                label: 'label.PFANS6008VIEW_CONTRACT',
                width: 90,
                fix: false,
                filter: true,
              }
            ],
            width: 540,
            fix: false,
            filter: true,
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
                filter: true,
              },
              {
                code: 'manhour1',
                label: 'label.PFANS6008VIEW_MANHOUR',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'cost1',
                label: 'label.PFANS6008VIEW_COST',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'support3',
                label: 'label.PFANS6008VIEW_SUPPORT',
                width: 90,
                fix: false,
                filter: true,
              }
            ],
            width: 540,
            fix: false,
            filter: true,
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
                filter: true,
              },
              {
                code: 'manhour2',
                label: 'label.PFANS6008VIEW_MANHOUR',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'cost2',
                label: 'label.PFANS6008VIEW_COST',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'support3',
                label: 'label.PFANS6008VIEW_SUPPORT',
                width: 90,
                fix: false,
                filter: true,
              }
            ],
            width: 540,
            fix: false,
            filter: true,
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
                filter: true,
              },
              {
                code: 'manhour3',
                label: 'label.PFANS6008VIEW_MANHOUR',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'cost3',
                label: 'label.PFANS6008VIEW_COST',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'support3',
                label: 'label.PFANS6008VIEW_SUPPORT',
                width: 90,
                fix: false,
                filter: true,
              }
            ],
            width: 540,
            fix: false,
            filter: true,
          },
          {
            code: 'threetotal',
            label: 'label.PFANS6008VIEW_THREE',
            child: [
              {
                code: 'totalmanhours3',
                label: 'label.PFANS6008VIEW_TOTALMANHOURS',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'totalcost3',
                label: 'label.PFANS6008VIEW_TOTALCOST',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'expense3',
                label: 'label.PFANS6008VIEW_EXPENSE',
                width: 90,
                fix: false,
                filter: true,
              },
              {
                code: 'contract3',
                label: 'label.PFANS6008VIEW_CONTRACT',
                width: 90,
                fix: false,
                filter: true,
              }
            ],
            width: 540,
            fix: false,
            filter: true,
          }
        ],
        buttonList: [
          {'key': 'view', 'name': 'button.view', 'disabled': false, 'icon': 'el-icon-view'},
          {'key': 'export', 'name': 'button.export', 'disabled': false, 'icon': 'el-icon-download'}
        ],
        rowid: '',
        isShow: true,
        selectedlist: [],
      };
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.loading = true;
        this.$store
          .dispatch('PFANS6008Store/getCostList')
          .then(response => {
            for (let j = 0; j < response.length; j++) {
              if(response[j].bpname !== null && response[j].bpname !== "") {
                let user = getUserInfo(response[j].bpname);
                if (user) {
                  response[j].bpname = user.userinfo.customername;
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
      buttonClick(val) {
        // todo 先用查看按钮做生成数据，之后再删除
        if(val === 'view') {
          this.loading = true;
          this.$store
            .dispatch('PFANS6008Store/insertCoststatistics')
            .then(response => {
              this.loading = false;
            })
            .catch(error => {
              this.loading = false
            })
        }

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
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
