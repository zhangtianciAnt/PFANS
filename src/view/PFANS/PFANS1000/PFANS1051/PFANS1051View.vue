<template>
  <div>
    <EasyNormalContainer
      :buttonList="buttonList"
      v-loading="loading"
      :title="title"
      @buttonClick="buttonClick"
      ref="container"
      :noback="noback"
    >
      <div slot="customize">
        <el-form label-position="top" label-width="8vw" ref="refform" :model="refform"
                 style="padding: 2vw">
          <el-row style="padding-top: 0.5%;padding-bottom: 0.5%">
            <el-col :span="6">
              <el-form-item :label="$t('label.PFANS1036FORMVIEW_BUSINESSYEAR')" prop="year">
                <div class="block">
                  <el-date-picker
                    type="year"
                    :disabled="true"
                    style="width: 15vw"
                    v-model="refform.year">
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('label.PFANS2036VIEW_DEPARTMENT')" prop="group_id">
                <el-select v-model="refform.group_id" style="width: 20vw" :disabled="false"
                           @change="groupChange">
                  <el-option
                    v-for="item in grp_options"
                    :key="item.groupid"
                    :label="item.groupname"
                    :value="item.groupid">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <!--            ztc 根据数据情况合并table 功能  fr-->
            <el-table :data="datatotal" border default-expand-all
                      header-cell-class-name="sub_bg_color_blue"  height="85vh" width="100%"
                      row-key="wai_id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
                      @current-change="handleCurrentChange" highlight-current-row :span-method="this.listSpanMethod"
            >
              <!--            ztc 根据数据情况合并table 功能  to-->
              <el-table-column
                :label = "$t('label.PFANS1051THEMENAME')"
                prop="themename"
                width="150px"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1051TOOLSTYPE')"
                prop="contract"
                width="100px"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1051TOOLS')"
                prop="toolsorgs"
                width="240px"
                show-overflow-tooltip
              >

              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1051CONTRACTMOUNT')"
                prop="amount"
                width="200px"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1051MONTH4')"
              >
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_PLANAMOUNT')"
                  prop="moneyplan4"
                >

                </el-table-column>
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_AMOUNT')"
                  prop="moneyactual4">

                </el-table-column>
              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1051MONTH5')"
              >
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_PLANAMOUNT')"
                  prop="moneyplan5"
                >

                </el-table-column>
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_AMOUNT')"
                    prop="moneyactual5">

                </el-table-column>
              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1051MONTH6')"
              >
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_PLANAMOUNT')"
                  prop="moneyplan6"
                >

                </el-table-column>
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_AMOUNT')"
                  prop="moneyactual6">

                </el-table-column>
              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1045VIEW_CYCLE3')"
                prop="totalactual1q">
              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1051MONTH7')"
              >
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_PLANAMOUNT')"
                  prop="moneyplan7"
                >

                </el-table-column>
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_AMOUNT')"
                  prop="moneyactual7">

                </el-table-column>
              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1051MONTH8')"
              >
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_PLANAMOUNT')"
                  prop="moneyplan8"
                >

                </el-table-column>
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_AMOUNT')"
                  prop="moneyactual8">

                </el-table-column>
              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1051MONTH9')"
              >
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_PLANAMOUNT')"
                  prop="moneyplan9"
                >

                </el-table-column>
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_AMOUNT')"
                  prop="moneyactual9">

                </el-table-column>
              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1045VIEW_CYCLE4')"
                prop="totalactual2q">

              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1051MONTH10')"
              >
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_PLANAMOUNT')"
                  prop="moneyplan10"
                >

                </el-table-column>
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_AMOUNT')"
                  prop="moneyactual10">

                </el-table-column>
              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1051MONTH11')"
              >
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_PLANAMOUNT')"
                  prop="moneyplan11"
                >

                </el-table-column>
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_AMOUNT')"
                  prop="moneyactual11">

                </el-table-column>
              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1051MONTH12')"
              >
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_PLANAMOUNT')"
                  prop="moneyplan12"
                >

                </el-table-column>
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_AMOUNT')"
                  prop="moneyactual12">

                </el-table-column>
              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1045VIEW_CYCLE5')"
                prop="totalactual3q">
              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1051MONTH1')"
              >
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_PLANAMOUNT')"
                  prop="moneyplan1">

                </el-table-column>
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_AMOUNT')"
                  prop="moneyactual1">

                </el-table-column>
              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1051MONTH2')"
              >
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_PLANAMOUNT')"
                  prop="moneyplan2">

                </el-table-column>
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_AMOUNT')"
                  prop="moneyactual2">

                </el-table-column>
              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1051MONTH3')"
              >
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_PLANAMOUNT')"
                  prop="moneyplan3"
                >

                </el-table-column>
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_AMOUNT')"
                  prop="moneyactual3">

                </el-table-column>
              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1045VIEW_CYCLE6')"
                prop="totalactual4q">

              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1051TOTAL')"
                prop="totalactual">

              </el-table-column>
            </el-table>
          </el-row>
          <el-row>
            <el-col>
              <div class="sub_color_red" style="margin-top: 5px">
                {{$t('label.PFANS1051MES')}}
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import {getDictionaryInfo,getOrgInfo, getUserInfo,getCurrentRoleNew} from '@/utils/customize';
  import {Message} from 'element-ui';

  let moment = require('moment');
  export default {
    name: 'PFANS1051View',
    components: {
      EasyNormalContainer,
    },
    data() {
      return {
        // ztc 根据数据情况合并table 功能  fr
        mergeAnt:false,
        unmerge:['收入合计','员工工数(人月)','员工支出','外注工数(人月)','外注支出','经费','差旅费','边界利润率'],
        merge:[4,6,8,11,13,15,18,20,22,25,27,29],
        hasChildren: true,
        currentRow: null,
        // ztc 根据数据情况合并table 功能  to
        noback:true,
        loading:false,
        title: 'title.PFANS1051VIEW',
        // ztc 根据数据情况合并table 功能  fr
        datatotal: [{
          wai_id: '1',
          themename: '',
          contract: '',
          toolsorgs: '',
          amount: '—',
          moneyplan4: '—',
          moneyactual4: '—',
          moneyplan5: '—',
          moneyactual5: '—',
          moneyplan6: '—',
          moneyactual6: '—',
          totalactual1q: '—',
          moneyplan7: '—',
          moneyactual7: '—',
          moneyplan8: '—',
          moneyactual8: '—',
          moneyplan9: '—',
          moneyactual9: '—',
          totalactual2q: '—',
          moneyplan10: '—',
          moneyactual10: '—',
          moneyplan11: '—',
          moneyactual11: '—',
          moneyplan12: '—',
          moneyactual12: '—',
          totalactual3q: '—',
          moneyplan1: '—',
          moneyactual1: '—',
          moneyplan2: '—',
          moneyactual2: '—',
          moneyplan3: '—',
          moneyactual3: '—',
          totalactual4q: '—',
          totalactual: '—',
          // ztc 根据数据情况合并table 功能  to
          children:[{
            wai_id: '2',
            themename: '',
            contract: '',
            toolsorgs: '',
            amount: '',
            moneyplan4: '',
            moneyactual4: '',
            moneyplan5: '',
            moneyactual5: '',
            moneyplan6: '',
            moneyactual6: '',
            totalactual1q: '',
            moneyplan7: '',
            moneyactual7: '',
            moneyplan8: '',
            moneyactual8: '',
            moneyplan9: '',
            moneyactual9: '',
            totalactual2q: '',
            moneyplan10: '',
            moneyactual10: '',
            moneyplan11: '',
            moneyactual11: '',
            moneyplan12: '',
            moneyactual12: '',
            totalactual3q: '',
            moneyplan1: '',
            moneyactual1: '',
            moneyplan2: '',
            moneyactual2: '',
            moneyplan3: '',
            moneyactual3: '',
            totalactual4q: '',
            totalactual: '',
          }]
        }],
        buttonList: [
          {'key': 'export', 'name': 'button.export', 'disabled': false, icon: 'el-icon-upload2'},
        ],
        grp_options: [],
        refform:{
          year:parseInt(moment(new Date()).format('MM')) >= 4 ? moment(new Date()).format('YYYY') : parseInt(moment(new Date()).format('YYYY')) - 1 + '',
          group_id:'',
        },
      };
    },
    mounted() {
      this.getorglistname().then(val =>{
        this.selectBygroupid();
      });
    },
    methods: {
      // ztc 根据数据情况合并table 功能  fr
      flitterData(){
        let spanOneArr = []
        let concatOne = 1
        let conlength = 0
        this.datatotal.forEach((list) => {
          spanOneArr.push(1)
          concatOne = concatOne + conlength
          if(list.themename !== '部门共通') {
            conlength = list.children.length
            list.children.forEach((item, index) => {
              debugger
              if (index === 0) {
                spanOneArr.push(1)
              } else {
                if (this.unmerge.indexOf(item.amount) < 0) {
                  if (item.moneyplan1 === list.children[index - 1].moneyplan1) {
                    if(index === 1 && spanOneArr.length > 2){
                      concatOne++
                    }
                    spanOneArr[concatOne] += 1
                    spanOneArr.push(0)
                  }
                }else{
                  spanOneArr.push(1)
                }
              }
            })
          }else{
            for(let i = 0; i < this.unmerge.length; i++){
              spanOneArr.push(1)
            }
          }
        })
        debugger
        return spanOneArr;
      },
      listSpanMethod ({ row, column, rowIndex, columnIndex }) {
        if(!this.mergeAnt)return
        if(this.merge.includes(columnIndex)) {
          const _row = this.flitterData(this.datatotal)[rowIndex]
          const _col = _row > 0 ? 1 : 0
          return {
            rowspan: _row,
            colspan: _col
          }
        }
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      // ztc 根据数据情况合并table 功能  to
      getorglistname() {
        return new Promise((resolve, reject) => {

          let role = getCurrentRoleNew();
          const vote = [];

          if (role === '3') {//CENTER
            vote.push(
              {
                groupid: this.$store.getters.userinfo.userinfo.centerid,
                groupname: this.$store.getters.userinfo.userinfo.centername,
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
                          groupid: item.centerid,
                          groupname: item.centername,
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
                    groupid: item.centerid,
                    groupname: item.centername,
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
                          groupid: item.centerid,
                          groupname: item.centername,
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
                    groupid: this.$store.getters.userinfo.userinfo.groupid,
                    groupname: this.$store.getters.userinfo.userinfo.groupname,
                  },
                );
              }
            }
          }
          const vote1 = [];
          if (this.$store.getters.useraccount._id === '5e78b17ef3c8d71e98a2aa30'//管理员
            || this.$store.getters.roles.indexOf("11") != -1 //总经理
            || this.$store.getters.roles.indexOf("16") != -1 //财务部长
            || this.$store.getters.roles.indexOf("18") != -1) //企划部长部长
          {
            this.$store.getters.orgGroupList.filter((item) => {
              vote1.push(
                {
                  groupid: item.centerid,
                  groupname: item.centername,
                },
              );
            })
            this.grp_options = vote1;
          }
          else
          {
            this.grp_options = vote;
          }
          //去重
          let letoptionsdata = [];
          let arrId = [];
          for(var item of this.grp_options){
            if(arrId.indexOf(item['groupname']) == -1){
              arrId.push(item['groupname']);
              letoptionsdata.push(item);
            }
          }
          //针对经营管理统计到group修改 start
          let incfmyList = [];
          for(let item of letoptionsdata){
            if(getOrgInfo(item.groupid).encoding == ''){
              incfmyList.push(item.groupid)
            }
          }
          if(incfmyList.length > 0){
            for(let item of incfmyList){
              letoptionsdata = letoptionsdata.filter(letitem => letitem.groupid != item)
            }
            let orgInfo = [];
            for(let item of incfmyList){
              if(item){
                if(getOrgInfo(item).orgs.length != 0){
                  orgInfo.push(getOrgInfo(item).orgs)
                }
              }
            }
            let groInfo = orgInfo[0].filter(item => item.type == '2');
            for(let item of groInfo){
              letoptionsdata.push(
                {
                  groupid: item._id,
                  groupname: item.title,
                },
              );
            }
          }
          //针对经营管理统计到group修改 end
          this.grp_options = letoptionsdata;
          if (this.grp_options.length > 0)
          {
            this.refform.group_id = this.grp_options[0].groupid;
          }

          //UPD CCM 20210422
          resolve(this.grp_options)
        });
      },
      selectBygroupid(){
        return new Promise((resolve, reject) => {
          let parameter = {
            groupid: this.refform.group_id,
            year: this.refform.year
          };
          this.loading = true;
          this.$store
            .dispatch('PFANS1051Store/selectBygroupid',parameter)
            .then(response => {
              // ztc 根据数据情况合并table 功能  fr
              if (response.length > 0) {
                let m = 1;
                let c = 0.1;
                this.datatotal = response;
                console.log(this.datatotal)
                  for (let i = 0; i < this.datatotal.length; i++) {
                    this.datatotal[i].children = this.datatotal[i].departmentAccountList;
                    this.datatotal[i].wai_id = m;
                    m += 1;
                    if (this.datatotal[i].children !== undefined && this.datatotal[i].children !== null) {
                      for (let j = 0; j < this.datatotal[i].children.length; j++) {
                        c += 1
                        this.datatotal[i].children[j].children = this.datatotal[i].children[j].departmentAccountList;
                        this.datatotal[i].children[j].wai_id = this.datatotal[i].children[j].theme_id + c;
                        this.datatotal[i].children[j].themename = '';
                        this.datatotal[i].children[j].contract = '';
                        this.datatotal[i].children[j].toolsorgs = '';
                      }
                    }
                  }
              }else{
                this.datatotal = [];
              }
              this.mergeAnt = true;
              // ztc 根据数据情况合并table 功能  to
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
          resolve(this.datatotal)
        });
      },
      groupChange(val) {
        this.refform.group_id = val;
        let data = this.grp_options.filter(item => (item.groupid == val));
        if (data.length > 0) {
          this.refform.encoding = data[0].encoding;
        }
        this.selectBygroupid();
      },
      buttonClick(val) {
        if (val === 'export')
        {
          if (this.datatotal.length === 0) {
            Message({
              message: this.$t('normal.info_16'),
              type: 'info',
              duration: 2 * 1000,
            });
            return;
          }
          let winopen =  'http://localhost:8085/jmreport/view/f4cddd854f8c4aebb74332ee7f1efa39?';
          winopen = winopen + 'year=' + this.refform.year + '&department=' + this.refform.group_id
          window.open(winopen,'_blank');
        }
      }
    },
  };
</script>

<style lang='scss'>
  .custimize_drawer {
    -webkit-box-sizing: border-box;
    overflow: auto !important;
  }
</style>
