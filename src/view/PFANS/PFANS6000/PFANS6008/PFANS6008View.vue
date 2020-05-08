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
      <div slot="search">
        <el-form label-position="top" label-width="8vw" ref="reff" style="padding-top: 10px">
          <el-form-item>
            <el-row style="padding-top: 10px">
              <el-col :span="6">
                <el-form-item :label="$t('label.PFANS1039FORMVIEW_GROUP')">
                  <el-select v-model="form.group_id" style="width: 20vw"
                             @change="changeGroup">
                    <el-option
                      v-for="item in optionsdata"
                      :key="item.value"
                      :label="item.lable"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </div>
    </EasyNormalTable>
  </div>
</template>

<script>
  import EasyNormalTable from "@/components/EasyNormalTable";
  import {Message} from 'element-ui';
  import moment from "moment";
  import {getCooperinterviewList,getDictionaryInfo,getSupplierinfor,getCurrentRole,getDownOrgInfo} from '@/utils/customize';
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
        },
        optionsdata: [],
        columns: [
          {
            code: 'bpname',
            label: 'label.PFANS6008VIEW_BPNAME',
            width: 120,
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
                width: 100,
                fix: false,
                filter: false,
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
                width: 100,
                fix: false,
                filter: false,
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
                width: 100,
                fix: false,
                filter: false,
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
                labelClass: 'sixbackcolor',
                width: 105,
                fix: false,
                filter: true,
              },
              {
                code: 'totalcost6',
                label: 'label.PFANS6008VIEW_TOTALCOST',
                labelClass: 'sixbackcolor',
                width: 105,
                fix: false,
                filter: true,
              },
              {
                code: 'expense6',
                label: 'label.PFANS6008VIEW_EXPENSE',
                labelClass: 'sixbackcolor',
                width: 80,
                fix: false,
                filter: true,
              },
              {
                code: 'contract6',
                label: 'label.PFANS6008VIEW_CONTRACT',
                labelClass: 'sixbackcolor',
                width: 105,
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
                width: 100,
                fix: false,
                filter: false,
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
                width: 100,
                fix: false,
                filter: false,
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
                width: 100,
                fix: false,
                filter: false,
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
                labelClass: 'sixbackcolor',
                width: 105,
                fix: false,
                filter: true,
              },
              {
                code: 'totalcost9',
                label: 'label.PFANS6008VIEW_TOTALCOST',
                labelClass: 'sixbackcolor',
                width: 105,
                fix: false,
                filter: true,
              },
              {
                code: 'expense9',
                label: 'label.PFANS6008VIEW_EXPENSE',
                labelClass: 'sixbackcolor',
                width: 80,
                fix: false,
                filter: true,
              },
              {
                code: 'contract9',
                label: 'label.PFANS6008VIEW_CONTRACT',
                labelClass: 'sixbackcolor',
                width: 105,
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
                width: 100,
                fix: false,
                filter: false,
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
                width: 100,
                fix: false,
                filter: false,
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
                width: 100,
                fix: false,
                filter: false,
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
                labelClass: 'sixbackcolor',
                width: 105,
                fix: false,
                filter: true,
              },
              {
                code: 'totalcost12',
                label: 'label.PFANS6008VIEW_TOTALCOST',
                labelClass: 'sixbackcolor',
                width: 105,
                fix: false,
                filter: true,
              },
              {
                code: 'expense12',
                label: 'label.PFANS6008VIEW_EXPENSE',
                labelClass: 'sixbackcolor',
                width: 80,
                fix: false,
                filter: true,
              },
              {
                code: 'contract12',
                label: 'label.PFANS6008VIEW_CONTRACT',
                labelClass: 'sixbackcolor',
                width: 105,
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
                width: 100,
                fix: false,
                filter: false,
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
                width: 100,
                fix: false,
                filter: false,
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
                width: 100,
                fix: false,
                filter: false,
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
                labelClass: 'sixbackcolor',
                width: 100,
                fix: false,
                filter: true,
              },
              {
                code: 'totalcost3',
                label: 'label.PFANS6008VIEW_TOTALCOST',
                labelClass: 'sixbackcolor',
                width: 100,
                fix: false,
                filter: true,
              },
              {
                code: 'expense3',
                label: 'label.PFANS6008VIEW_EXPENSE',
                labelClass: 'sixbackcolor',
                width: 80,
                fix: false,
                filter: true,
              },
              {
                code: 'contract3',
                label: 'label.PFANS6008VIEW_CONTRACT',
                labelClass: 'sixbackcolor',
                width: 100,
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
        let params = {
          groupid: groupid
        }
        this.$store
          .dispatch('PFANS6008Store/getCostBygroupid', params)
          .then(response => {
            for (let j = 0; j < response.length; j++) {
              if (response[j].bpname !== null && response[j].bpname !== "") {
                let user = getCooperinterviewList(response[j].bpname);
                if (user) {
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
          this.loading = true;
          this.$store
            .dispatch('PFANS6008Store/insertCoststatistics')
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
        let role = getCurrentRole();
        const vote = [];
        if (role === '3') {
          vote.push(
            {
              value: this.$store.getters.userinfo.userinfo.groupid,
              lable: this.$store.getters.userinfo.userinfo.groupname,
            },
          );
        } else if (role === '2') {
          let centerId = this.$store.getters.userinfo.userinfo.centerid;
          let orgs = getDownOrgInfo(centerId);
          if (orgs){
            for (let org of orgs) {
              console.log(org)
              vote.push(
                {
                  value: org._id,
                  lable: org.companyname,
                },
              );
            }
          }

        } else if (role === '1') {
          let centerId = this.$store.getters.userinfo.userinfo.centerid;
          let orgs = getDownOrgInfo(centerId);
          if (orgs){
            for (let center of orgs) {
              let centers = getDownOrgInfo(center._id);
              if (centers){
                for (let group of centers) {
                  vote.push(
                    {
                      value: group._id,
                      lable: group.companyname,
                    },
                  );
                }
              }

            }
          }
        }
        const vote1 = [];
        if (this.$store.getters.userinfo.userid ==='5e78fefff1560b363cdd6db7'
          || this.$store.getters.userinfo.userid ==='5e78b2254e3b194874180f31'
          || this.$store.getters.userinfo.userid ==='5e78b2004e3b194874180e21'
          || this.$store.getters.userinfo.userid ==='5e78b2064e3b194874180e4d')
        {
          let centerId = '5e7858a08f4316308435112c';
          let orgs = getDownOrgInfo(centerId);
          if (orgs){
            for (let center of orgs) {
              let centers = getDownOrgInfo(center._id);
              if (centers){
                for (let group of centers) {
                  vote1.push(
                    {
                      value: group._id,
                      lable: group.companyname,
                    },
                  );
                }
              }
            }
          }
          this.optionsdata = vote1;
        }
        else
        {
          this.optionsdata = vote;
        }
        this.form.group_id = this.optionsdata[0].value;
        if (this.form.group_id) {
          this.init();
        }
        this.loading = false;
      },
      changeGroup(val) {
        this.form.group_id = val;
        if (this.form.group_id) {
          //this.getList(this.form.group_id, this.form.year, this.form.region);
          this.init();
        }
      },
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
