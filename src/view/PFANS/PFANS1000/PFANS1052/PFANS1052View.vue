<template>
  <div>
    <EasyNormalContainer :buttonList="buttonList" :title="title"
                         ref="container" :showSelection="isShow"
                         @buttonClick="buttonClick" v-loading="loading"
                         :noback="noback">
      <div slot="customize" style="width: 100%">
        <el-form :model="refform" label-position="top" label-width="8vw" employedref="refform" ref="refform"
                 style="padding: 0.5vw">
          <el-row style="padding-top: 3%">
            <el-col :span="6">
              <el-form-item :label="$t('label.PFANS6011VIEW_YEARS')">
                <el-date-picker
                  :placeholder="$t('normal.error_09')"
                  @change="changeYear"
                  type="year"
                  :disabled="true"
                  v-model="refform.year"
                  style="width:10vw">
                </el-date-picker>
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
          <el-row style="padding-bottom: 0.5%">
            <el-table :data="tableData" border default-expand-all header-cell-class-name="sub_bg_color_blue" style="margin-top: 1%;font-size: 13px"
                      row-key="wai_id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" height="540"
                      highlight-current-row @current-change="handleCurrentChange" :span-method="this.listSpanMethod">
              <el-table-column
                show-overflow-tooltip
                prop="themename"
                :label="$t('label.PFANS1050FORMVIEW_THEMENAME')"
                width="120">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="divide"
                :label="$t('label.PFANS1050FORMVIEW_DIVIDE')"
                width="120">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                prop="toolsorgs"
                :label="$t('label.PFANS1050FORMVIEW_TOOLSORGS')"
                width="120">
              </el-table-column>
              <el-table-column
                align="left"
                show-overflow-tooltip
                prop="contractnumber"
                :label="$t('label.PFANS1050FORMVIEW_CONTRACTNUMBER')"
                width="240">
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                prop="claimamount"
                :label="$t('label.PFANS1050FORMVIEW_CLAIMAMOUNT')"
                width="120">
              </el-table-column>
              <el-table-column
                width="130"
                prop="numbers"
                align="center"
                :label="$t('label.PFANS1050FORMVIEW_NUMBERS')">
              </el-table-column>
              <el-table-column
                width="80"
                align="left"
                prop="staffrank"
                :label="$t('label.PFANS1052FORMVIEW_STAFFRANK')">
              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1051MONTH4')">
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_PLANAMOUNT')"
                  prop="staffcustplan04">
                </el-table-column>
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_AMOUNT')"
                  prop="staffcustactual04">
                </el-table-column>
              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1051MONTH5')">
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_PLANAMOUNT')"
                  prop="staffcustplan05">
                </el-table-column>
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_AMOUNT')"
                  prop="staffcustactual05">
                </el-table-column>
              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1051MONTH6')">
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_PLANAMOUNT')"
                  prop="staffcustplan06">
                </el-table-column>
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_AMOUNT')"
                  prop="staffcustactual06">
                </el-table-column>
              </el-table-column>
<!--              <el-table-column-->
<!--                :label = "$t('label.PFANS1052FORMVIEW_WORKDIFFERNT')"-->
<!--                prop="workdifferentfirst">-->
<!--              </el-table-column>-->
<!--              <el-table-column-->
<!--                width="150"-->
<!--                :label = "$t('label.PFANS1052FORMVIEW_RANKDIFFERNT')"-->
<!--                prop="rankdifferentfirst">-->
<!--              </el-table-column>-->
              <el-table-column
                :label = "$t('label.PFANS1051MONTH7')">
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_PLANAMOUNT')"
                  prop="staffcustplan07">
                </el-table-column>
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_AMOUNT')"
                  prop="staffcustactual07">
                </el-table-column>
              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1051MONTH8')">
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_PLANAMOUNT')"
                  prop="staffcustplan08">
                </el-table-column>
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_AMOUNT')"
                  prop="staffcustactual08">
                </el-table-column>
              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1051MONTH9')">
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_PLANAMOUNT')"
                  prop="staffcustplan09">
                </el-table-column>
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_AMOUNT')"
                  prop="staffcustactual09">
                </el-table-column>
              </el-table-column>
<!--              <el-table-column-->
<!--                :label = "$t('label.PFANS1052FORMVIEW_WORKDIFFERNT')"-->
<!--                prop="workdifferentsecond">-->
<!--              </el-table-column>-->
<!--              <el-table-column-->
<!--                width="150"-->
<!--                :label = "$t('label.PFANS1052FORMVIEW_RANKDIFFERNT')"-->
<!--                prop="rankdifferentsecond">-->
<!--              </el-table-column>-->
              <el-table-column
                :label = "$t('label.PFANS1051MONTH10')">
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_PLANAMOUNT')"
                  prop="staffcustplan10">
                </el-table-column>
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_AMOUNT')"
                  prop="staffcustactual10">
                </el-table-column>
              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1051MONTH11')">
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_PLANAMOUNT')"
                  prop="staffcustplan11">
                </el-table-column>
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_AMOUNT')"
                  prop="staffcustactual11">
                </el-table-column>
              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1051MONTH12')">
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_PLANAMOUNT')"
                  prop="staffcustplan12">
                </el-table-column>
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_AMOUNT')"
                  prop="staffcustactual12">
                </el-table-column>
              </el-table-column>
<!--              <el-table-column-->
<!--                :label = "$t('label.PFANS1052FORMVIEW_WORKDIFFERNT')"-->
<!--                prop="workdifferentthird">-->
<!--              </el-table-column>-->
<!--              <el-table-column-->
<!--                width="150"-->
<!--                :label = "$t('label.PFANS1052FORMVIEW_RANKDIFFERNT')"-->
<!--                prop="rankdifferentthird">-->
<!--              </el-table-column>-->
              <el-table-column
                :label = "$t('label.PFANS1051MONTH1')">
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_PLANAMOUNT')"
                  prop="staffcustplan01">
                </el-table-column>
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_AMOUNT')"
                  prop="staffcustactual01">
                </el-table-column>
              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1051MONTH2')">
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_PLANAMOUNT')"
                  prop="staffcustplan02">
                </el-table-column>
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_AMOUNT')"
                  prop="staffcustactual02">
                </el-table-column>
              </el-table-column>
              <el-table-column
                :label = "$t('label.PFANS1051MONTH3')">
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_PLANAMOUNT')"
                  prop="staffcustplan03">
                </el-table-column>
                <el-table-column
                  :label = "$t('label.PFANS1049FORMVIEW_AMOUNT')"
                  prop="staffcustactual03">
                </el-table-column>
              </el-table-column>
<!--              <el-table-column-->
<!--                :label = "$t('label.PFANS1052FORMVIEW_WORKDIFFERNT')"-->
<!--                prop="workdifferentfourth">-->
<!--              </el-table-column>-->
<!--              <el-table-column-->
<!--                width="150"-->
<!--                :label = "$t('label.PFANS1052FORMVIEW_RANKDIFFERNT')"-->
<!--                prop="rankdifferentfourth">-->
<!--              </el-table-column>-->
              <el-table-column
                :label = "$t('label.PFANS1051OFYEAR')">
                <el-table-column
                  :label = "$t('label.PFANS1052FORMVIEW_WORKDIFFERNT')"
                  prop="workdifferentofyear">
                </el-table-column>
                <el-table-column
                  width="150"
                  :label = "$t('label.PFANS1052FORMVIEW_RANKDIFFERNT')"
                  prop="rankdifferentofyear">
                </el-table-column>
              </el-table-column>
            </el-table>
          </el-row>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
import EasyNormalContainer from '@/components/EasyNormalContainer';
import {getCurrentRoleNew, getDepartmentById, getDictionaryInfo, getOrgInfo} from "../../../../utils/customize";
import moment from "moment";
import {Message} from "element-ui";

export default {
  name: "PFANS1052VIEW",
  components: {
    EasyNormalContainer,
  },
  data () {
    return {
      title: 'title.PFANS1052VIEW',
      refform: {
        year:parseInt(moment(new Date()).format('MM')) >= 4 ? moment(new Date()).format('YYYY') : parseInt(moment(new Date()).format('YYYY')) - 1 + '',
        group_id: '',
      },
      //region scc 8/30 单元格合并 from
      mergeAnt:false,
      unmerge:['小计'],
      merge:[3,4,5],//合同号，合同金额，pj起案
      //endregion scc 8/30 单元格合并 to
      currentRow: null,
      hasChildren: true,
      noback: true,
      loading: false,
      grp_options: [],
      mergeLine: {},
      mergeIndex: {},
      buttonList: [
        {key: 'export', name: 'button.export', disabled: false, icon: 'el-icon-download'},
      ],
      isShow: false,
      //region scc del 8/30 from
      // merge: ['contractnumber','claimamount','numbers','staffnum'],
      //endregion scc del 8/30 to
      tableData: [{
        wai_id: '1',
        themename: '',
        divide: '',
        toolsorgs: '',
        contractnumber: '—',
        claimamount: '—',
        numbers: '—',
        staffrank: '—',
        staffcustplan04: '—',
        staffcustactual04: '—',
        staffcustplan05: '—',
        staffcustactual05: '—',
        staffcustplan06: '—',
        staffcustactual06: '—',
        // workdifferentfirst: '—',
        // rankdifferentfirst: '—',
        staffcustplan07: '—',
        staffcustactual07: '—',
        staffcustplan08: '—',
        staffcustactual08: '—',
        staffcustplan09: '—',
        staffcustactual09: '—',
        // workdifferentsecond: '—',
        // rankdifferentsecond: '—',
        staffcustplan10: '—',
        staffcustactual10: '—',
        staffcustplan11: '—',
        staffcustactual11: '—',
        staffcustplan12: '—',
        staffcustactual12: '—',
        // workdifferentthird: '—',
        // rankdifferentthird: '—',
        staffcustplan01: '—',
        staffcustactual01: '—',
        staffcustplan02: '—',
        staffcustactual02: '—',
        staffcustplan03: '—',
        staffcustactual03: '—',
        // workdifferentfourth: '—',
        // rankdifferentfourth: '—',
        workdifferentofyear: '—',
        rankdifferentofyear: '—',
        children: [{
          wai_id: '2',
          themename: '',
          divide: '',
          toolsorgs: '',
          contractnumber: ' ',
          claimamount: ' ',
          numbers: ' ',
          staffrank: ' ',
          staffcustplan04: ' ',
          staffcustactual04: ' ',
          staffcustplan05: ' ',
          staffcustactual05: ' ',
          staffcustplan06: ' ',
          staffcustactual06: ' ',
          // workdifferentfirst: ' ',
          // rankdifferentfirst: ' ',
          staffcustplan07: ' ',
          staffcustactual07: ' ',
          staffcustplan08: ' ',
          staffcustactual08: ' ',
          staffcustplan09: ' ',
          staffcustactual09: ' ',
          // workdifferentsecond: ' ',
          // rankdifferentsecond: ' ',
          staffcustplan10: ' ',
          staffcustactual10: ' ',
          staffcustplan11: ' ',
          staffcustactual11: ' ',
          staffcustplan12: ' ',
          staffcustactual12: ' ',
          // workdifferentthird: ' ',
          // rankdifferentthird: ' ',
          staffcustplan01: ' ',
          staffcustactual01: ' ',
          staffcustplan02: ' ',
          staffcustactual02: ' ',
          staffcustplan03: ' ',
          staffcustactual03: ' ',
          // workdifferentfourth: ' ',
          // rankdifferentfourth: ' ',
          workdifferentofyear: ' ',
          rankdifferentofyear: ' ',
        }]
      }]
    }
  },
  mounted() {
    this.getorglistname().then(val =>{
      this.getDepartInfo();
    });
  },
  methods: {
    //region scc add 根据数据情况合并table from
    //合并合同号
    flitterData(){
      let spanOneArr = [];
      let concatOne = 1;
      let conlength = 0;
      let spanOne = [];
      this.tableData.forEach((list) => {
        spanOneArr = [];
        spanOneArr.push(1);//列数为1代表此列不合并，2，0或3，0，0时代表合并，数字和0数量对应
        // concatOne = concatOne + conlength;
        concatOne = conlength + 1;
        // conlength = row.children.length
          if(list.themename !== '合计') {
            list.children.forEach((item, index) => {
              if (index === 0) {
                spanOneArr.push(1)
                concatOne = 1;
              } else {
                if (this.unmerge.indexOf(item.themename) < 0) {
                  if (item.contractnumber.trim() === list.children[index - 1].contractnumber.trim()) {
                    spanOneArr[concatOne] += 1
                    spanOneArr.push(0)
                  } else {
                    spanOneArr.push(1);
                    concatOne = index + 1;
                  }
                } else {
                  spanOneArr.push(1)
                  concatOne++
                }
              }
            })
          }
          spanOne.push.apply(spanOne, spanOneArr);//拼接
      })
      // spanOne.push(1);//合计不合并
      spanOne.push.apply(spanOne, [1]);
      return spanOne;
    },
    //合并合同金额
    flitterData1(){
      let spanOneArr = [];
      let concatOne = 1;
      let conlength = 0;
      let spanOne = [];
      this.tableData.forEach((list) => {
        spanOneArr = [];
        spanOneArr.push(1);
        // concatOne = concatOne + conlength;
        concatOne = conlength + 1;
        // conlength = row.children.length
        if(list.themename !== '合计') {
          list.children.forEach((item, index) => {
            if (index === 0) {
              spanOneArr.push(1)
              concatOne = 1;
            } else {
              if (this.unmerge.indexOf(item.themename) < 0) {
                if (item.contractnumber.split("-")[0].trim() === list.children[index - 1].contractnumber.split("-")[0].trim()) {
                  spanOneArr[concatOne] += 1
                  spanOneArr.push(0)
                } else {
                  spanOneArr.push(1);
                  concatOne = index + 1;
                }
              } else {
                spanOneArr.push(1)
                concatOne++
              }
            }
          })
        }
        spanOne.push.apply(spanOne, spanOneArr);
      })
      // spanOne.push(1);//合计不合并
      spanOne.push.apply(spanOne, [1]);
      return spanOne;
    },
    //合并pj起案
    flitterData2(){
      let spanOneArr = [];
      let concatOne = 1;
      let conlength = 0;
      let spanOne = [];
      this.tableData.forEach((list) => {
        spanOneArr = [];
        spanOneArr.push(1);
        // concatOne = concatOne + conlength;
        concatOne = conlength + 1;
        // conlength = row.children.length
        if(list.themename !== '合计') {
          list.children.forEach((item, index) => {
            if (index === 0) {
              spanOneArr.push(1)
              concatOne = 1;
            } else {
              if (this.unmerge.indexOf(item.themename) < 0) {
                if ((item.numbers === list.children[index - 1].numbers) && (item.contractnumber.split("-")[0].trim() === list.children[index - 1].contractnumber.split("-")[0].trim())) {
                  spanOneArr[concatOne] += 1
                  spanOneArr.push(0)
                } else {
                  spanOneArr.push(1);
                  concatOne = index + 1;
                }
              } else {
                spanOneArr.push(1)
                concatOne++
              }
            }
          })
        }
        spanOne.push.apply(spanOne, spanOneArr);
      })
      // spanOne.push(1);//合计不合并
      spanOne.push.apply(spanOne, [1]);
      return spanOne;
    },
    listSpanMethod ({ row, column, rowIndex, columnIndex }) {
      if(!this.mergeAnt)return
      if(this.merge[0] === columnIndex) {//合并合同号
        const _row = this.flitterData(this.tableData)[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
      if(this.merge[1] === columnIndex) {//合并合同金额
        const _row = this.flitterData1(this.tableData)[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
      if(this.merge[2] === columnIndex) {//合并pj起案
        const _row = this.flitterData2(this.tableData)[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
    },
    //endregion scc add 根据数据情况合并table to
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    getDepartInfo() {
      this.loading = true;
      this.tableData = [];
      this.$store
        .dispatch('PFANS1052Store/getDepartmentalInsert',{'year': this.refform.year, 'group_id': this.refform.group_id})
        .then(response => {
          if (response.length > 0) {
            let m = 0.01;
            // let n = 2;
            let c = 0.1;
            for (let i = 0; i < response.length; i++) {
              if (response[i].divide !== null && response[i].divide !== '') {
                let divide = getDictionaryInfo(response[i].divide);
                if (divide != null) {
                  response[i].divide = divide.value1;
                }
              }
            }
            this.tableData = response;
            for (let i = 0; i < this.tableData.length; i++) {
              this.tableData[i].children = this.tableData[i].departmentalInsideList;
              this.tableData[i].wai_id = m;
              m += 1;
              if (this.tableData[i].children !== undefined && this.tableData[i].children !== null) {
                for (let j = 0; j < this.tableData[i].children.length; j++) {
                  c += 1;
                  this.tableData[i].children[j].children = this.tableData[i].children[j].departmentalInsideList;
                  this.tableData[i].children[j].wai_id = this.tableData[i].children[j].themeinfor_id + c;
                  this.tableData[i].children[j].themename = '';
                  this.tableData[i].children[j].toolsorgs = '';
                  this.tableData[i].children[j].divide = '';
                }
                //theme合计
                this.tableData[i].children[this.tableData[i].children.length - 1].themename = '小计';
                this.tableData[i].children[this.tableData[i].children.length - 1].wai_id = this.tableData[i].children[this.tableData[i].children.length - 1].themeinfor_id + 1;
              }
            }
            // theme总计
            this.tableData[this.tableData.length - 1].wai_id = m + "a";
          } else {
            this.tableData = [];
          }
          this.mergeAnt = true;
          this.loading = false
        })
        .catch(error => {
          this.$message.error({
            message: error,
            type: 'error',
            duration: 5 * 1000
          });
          this.loading = false
        })
    },
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
    changeYear(val) {
      this.tableData.data = [];
      this.refform.years = val;
      this.getDepartInfo();
    },
    groupChange(val) {
      this.tableData.data = [];
      this.refform.group_id = val;
      let data = this.grp_options.filter(item => (item.groupid == val));
      if (data.length > 0) {
        this.refform.encoding = data[0].encoding;
      }
      this.getDepartInfo();
    },
    buttonClick(val) {
      //region scc 21/9/1 upd 积木报表 from
      if (val === 'export') {
        if (this.tableData.length === 0) {
          Message({
            message: this.$t('normal.info_16'),
            type: 'info',
            duration: 2 * 1000,
          });
          return;
        }
        let winopen =  'http://localhost:8085/jmreport/view/592585397002903552?';
        winopen = winopen + 'year=' + this.refform.year + '&group_id=' + this.refform.group_id
        window.open(winopen,'_blank');
      }
      //endregion scc 21/9/1 upd 积木报表 to
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-table {
  overflow-x: auto;
  overflow-y: auto;
  height:600px;
}

.el-table__header-wrapper,
.el-table__body-wrapper,
.el-table__footer-wrapper {

}

.el-table::after {
//position: relative;
}

.el-table--scrollable-x .el-table__body-wrapper {

}

.tableClass {
  .el-table__fixed-right {
    height: 100% !important;
  }
}

</style>
