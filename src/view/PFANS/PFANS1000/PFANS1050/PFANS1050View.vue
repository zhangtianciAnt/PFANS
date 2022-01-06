<template>
  <div>
    <EasyNormalContainer ref="container" v-loading="loading"
                         :buttonList="buttonList" :noback="noback"
                         :showSelection="isShow" :title="title"
                         @buttonClick="buttonClick">
      <div slot="customize" style="width: 100%">
        <el-form ref="refform" :model="refform" employedref="refform" label-position="top" label-width="8vw"
                 style="padding: 0.5vw">
          <el-row style="padding-top: 3%">
            <el-col :span="6">
              <el-form-item :label="$t('label.PFANS6011VIEW_YEARS')">
                <el-date-picker
                  v-model="refform.year"
                  :disabled="true"
                  :placeholder="$t('normal.error_09')"
                  style="width:10vw"
                  type="year"
                  @change="changeYear">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('label.PFANS2036VIEW_DEPARTMENT')" prop="group_id">
                <el-select v-model="refform.group_id" :disabled="false" style="width: 20vw"
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
            <el-table :data="tableData" :span-method="this.listSpanMethod" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" border
                      default-expand-all
                      header-cell-class-name="sub_bg_color_blue" height="540" highlight-current-row
                      row-key="wai_id" style="margin-top: 1%;font-size: 13px" @current-change="handleCurrentChange">
              <el-table-column
                :label="$t('label.PFANS1050FORMVIEW_THEMENAME')"
                prop="themename"
                show-overflow-tooltip
                width="120">
              </el-table-column>
              <el-table-column
                :label="$t('label.PFANS1050FORMVIEW_DIVIDE')"
                prop="divide"
                show-overflow-tooltip
                width="120">
              </el-table-column>
              <el-table-column
                :label="$t('label.PFANS1050FORMVIEW_TOOLSORGS')"
                prop="toolsorgs"
                show-overflow-tooltip
                width="120">
              </el-table-column>
              <el-table-column
                :label="$t('label.PFANS1050FORMVIEW_CONTRACTNUMBER')"
                align="left"
                prop="contractnumber"
                show-overflow-tooltip
                width="240">
              </el-table-column>
              <el-table-column
                :label="$t('label.PFANS1050FORMVIEW_CLAIMAMOUNT')"
                align="center"
                prop="claimamount"
                show-overflow-tooltip
                width="120">
              </el-table-column>
              <el-table-column
                :label="$t('label.PFANS1050FORMVIEW_NUMBERS')"
                align="center"
                prop="numbers"
                width="130">
              </el-table-column>
              <el-table-column
                :label="$t('label.PFANS1050FORMVIEW_STAFFNUM')"
                align="center"
                prop="staffnum"
                width="120">
              </el-table-column>
              <el-table-column
                :label="$t('label.PFANS1050FORMVIEW_OUTSTAFFNUM')"
                align="center"
                prop="outstaffnum"
                width="100">
              </el-table-column>
              <el-table-column
                :label="$t('label.PFANS1050FORMVIEW_OUTCOMPANY')"
                align="left"
                prop="outcompany"
                width="230">
              </el-table-column>
              <el-table-column
                :label="$t('label.PFANS1050FORMVIEW_STAFFCUST04')"
                align="center"
                prop="staffcust04"
                width="100">
              </el-table-column>
              <el-table-column
                :label="$t('label.PFANS1050FORMVIEW_STAFFCUST05')"
                align="center"
                prop="staffcust05"
                width="100">
              </el-table-column>
              <el-table-column
                :label="$t('label.PFANS1050FORMVIEW_STAFFCUST06')"
                align="center"
                prop="staffcust06"
                width="100">
              </el-table-column>
              <el-table-column
                :label="$t('label.PFANS1050FORMVIEW_STAFFCUST07')"
                align="center"
                prop="staffcust07"
                width="100">
              </el-table-column>
              <el-table-column
                :label="$t('label.PFANS1050FORMVIEW_STAFFCUST08')"
                align="center"
                prop="staffcust08"
                width="100">
              </el-table-column>
              <el-table-column
                :label="$t('label.PFANS1050FORMVIEW_STAFFCUST09')"
                align="center"
                prop="staffcust09"
                width="100">
              </el-table-column>
              <el-table-column
                :label="$t('label.PFANS1050FORMVIEW_STAFFCUST10')"
                align="center"
                prop="staffcust10"
                width="100">
              </el-table-column>
              <el-table-column
                :label="$t('label.PFANS1050FORMVIEW_STAFFCUST11')"
                align="center"
                prop="staffcust11"
                width="100">
              </el-table-column>
              <el-table-column
                :label="$t('label.PFANS1050FORMVIEW_STAFFCUST12')"
                align="center"
                prop="staffcust12"
                width="110">
              </el-table-column>
              <el-table-column
                :label="$t('label.PFANS1050FORMVIEW_STAFFCUST01')"
                align="center"
                prop="staffcust01"
                width="110">
              </el-table-column>
              <el-table-column
                :label="$t('label.PFANS1050FORMVIEW_STAFFCUST02')"
                align="center"
                prop="staffcust02"
                width="110">
              </el-table-column>
              <el-table-column
                :label="$t('label.PFANS1050FORMVIEW_STAFFCUST03')"
                align="center"
                prop="staffcust03"
                width="110">
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
import {getCurrentRoleNew, getDictionaryInfo, getOrgInfo} from '../../../../utils/customize';
import moment from 'moment';
import {Message} from 'element-ui';

export default {
  name: 'PFANS1050View',
  components: {
    EasyNormalContainer,
  },
  data() {
    return {
      title: 'title.PFANS1050VIEW',
      refform: {
        year: parseInt(moment(new Date()).format('MM')) >= 4 ? moment(new Date()).format('YYYY') : parseInt(moment(new Date()).format('YYYY')) - 1 + '',
        group_id: '',
      },
      currentRow: null,
      hasChildren: true,
      noback: true,
      loading: false,
      grp_options: [],
      mergeLine: {},
      mergeIndex: {},
      buttonList: [
        {'key': 'export', 'name': 'button.export', 'disabled': false, icon: 'el-icon-download'},
      ],
      isShow: false,
      merge: [3, 4, 5, 6],
      unmerge: ['合计'],
      mergeAnt: false,
      tableData: [{
        wai_id: '1',
        themename: '',
        divide: '',
        toolsorgs: '',
        contractnumber: '—',
        claimamount: '—',
        numbers: '—',
        staffnum: '—',
        outstaffnum: '—',
        staffcust04: '—',
        staffcust05: '—',
        staffcust06: '—',
        staffcust07: '—',
        staffcust08: '—',
        staffcust09: '—',
        staffcust10: '—',
        staffcust11: '—',
        staffcust12: '—',
        staffcust01: '—',
        staffcust02: '—',
        staffcust03: '—',
        children: [{
          wai_id: '2',
          themename: '',
          divide: '',
          toolsorgs: '',
          contractnumber: '',
          claimamount: '',
          numbers: '',
          staffnum: '',
          themeinfor_id: '',
          outstaffnum: '',
          staffcust04: '',
          staffcust05: '',
          staffcust06: '',
          staffcust07: '',
          staffcust08: '',
          staffcust09: '',
          staffcust10: '',
          staffcust11: '',
          staffcust12: '',
          staffcust01: '',
          staffcust02: '',
          staffcust03: '',
        }],
      }],
    };
  },
  mounted() {
    this.getorglistname().then(val => {
      this.getDepartInfo();
    });
  },
  methods: {
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    getDepartInfo() {
      this.loading = true;
      this.$store
        .dispatch('PFANS1050Store/getDepartmental', {'years': this.refform.year, 'group_id': this.refform.group_id})
        .then(response => {
          if (response.length > 0) {
            let m = 1;
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
            console.log(this.tableData);
            for (let i = 0; i < this.tableData.length; i++) {
              this.tableData[i].children = this.tableData[i].departmentalList;
              this.tableData[i].wai_id = m;
              m += 1;
              if (this.tableData[i].children !== undefined && this.tableData[i].children !== null) {
                for (let j = 0; j < this.tableData[i].children.length; j++) {
                  c += 1;
                  this.tableData[i].children[j].children = this.tableData[i].children[j].departmentalList;
                  this.tableData[i].children[j].wai_id = this.tableData[i].children[j].themeinfor_id + c;
                  this.tableData[i].children[j].themename = '';
                  this.tableData[i].children[j].toolsorgs = '';
                  this.tableData[i].children[j].divide = '';
                }
                //theme合计
                this.tableData[i].children[this.tableData[i].children.length - 1].themename = '合计';
                this.tableData[i].children[this.tableData[i].children.length - 1].wai_id = this.tableData[i].children[this.tableData[i].children.length - 1].themeinfor_id + 1;
              }
            }
            // theme总计
            this.tableData[this.tableData.length - 1].wai_id = m + 'a';
          } else {
            this.tableData = [];
          }
          this.mergeAnt = true;
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
    flitterData() {
      let spanOneArr = [];
      let concatOne = 1;
      let conlength = 0;
      let spanOne = [];
      this.tableData.forEach((list) => {
        spanOneArr = [];
        spanOneArr.push(1);
        concatOne = conlength + 1;
        if (list.themename !== '合计') {
          list.children.forEach((item, index) => {
            if (index === 0) {
              spanOneArr.push(1);
              concatOne = 1;
            } else {
              if (this.unmerge.indexOf(item.themename) < 0) {
                if (item.contractnumber.trim() === list.children[index - 1].contractnumber.trim()) {
                  spanOneArr[concatOne] += 1;
                  spanOneArr.push(0);
                } else {
                  spanOneArr.push(1);
                  concatOne = index + 1;
                }
              } else {
                spanOneArr.push(1);
                concatOne++;
              }
            }
          });
        }
        spanOne.push.apply(spanOne, spanOneArr);
      });
      // spanOne.push(1);//合计不合并
      spanOne.push.apply(spanOne, [1]);
      return spanOne;
    },
    flitterData1() {
      let spanOneArr = [];
      let concatOne = 1;
      let conlength = 0;
      let spanOne = [];
      this.tableData.forEach((list) => {
        spanOneArr = [];
        spanOneArr.push(1);
        concatOne = conlength + 1;
        if (list.themename !== '合计') {
          list.children.forEach((item, index) => {
            if (index === 0) {
              spanOneArr.push(1);
              concatOne = 1;
            } else {
              if (this.unmerge.indexOf(item.themename) < 0) {
                if (item.claimamount.trim() === list.children[index - 1].claimamount.trim()
                  && (item.contractnumber.split('-')[0].trim() === list.children[index - 1].contractnumber.split('-')[0].trim())) {
                  spanOneArr[concatOne] += 1;
                  spanOneArr.push(0);
                } else {
                  spanOneArr.push(1);
                  concatOne = index + 1;
                }
              } else {
                spanOneArr.push(1);
                concatOne++;
              }
            }
          });
        }
        spanOne.push.apply(spanOne, spanOneArr);
      });
      // spanOne.push(1);//合计不合并
      spanOne.push.apply(spanOne, [1]);
      return spanOne;
    },
    flitterData2() {
      let spanOneArr = [];
      let concatOne = 1;
      let conlength = 0;
      let spanOne = [];
      this.tableData.forEach((list) => {
        spanOneArr = [];
        spanOneArr.push(1);
        concatOne = conlength + 1;
        if (list.themename !== '合计') {
          list.children.forEach((item, index) => {
            if (index === 0) {
              spanOneArr.push(1);
              concatOne = 1;
            } else {
              if (this.unmerge.indexOf(item.themename) < 0) {
                if (item.numbers.trim() === list.children[index - 1].numbers.trim()
                  && (item.contractnumber.split('-')[0].trim() === list.children[index - 1].contractnumber.split('-')[0].trim())) {
                  spanOneArr[concatOne] += 1;
                  spanOneArr.push(0);
                } else {
                  spanOneArr.push(1);
                  concatOne = index + 1;
                }
              } else {
                spanOneArr.push(1);
                concatOne++;
              }
            }
          });
        }
        spanOne.push.apply(spanOne, spanOneArr);
      });
      // spanOne.push(1);//合计不合并
      spanOne.push.apply(spanOne, [1]);
      return spanOne;
    },
    flitterData3() {
      let spanOneArr = [];
      let concatOne = 1;
      let conlength = 0;
      let spanOne = [];
      this.tableData.forEach((list) => {
        spanOneArr = [];
        spanOneArr.push(1);
        concatOne = conlength + 1;
        if (list.themename !== '合计') {
          list.children.forEach((item, index) => {
            if (index === 0) {
              spanOneArr.push(1);
              concatOne = 1;
            } else {
              if (this.unmerge.indexOf(item.themename) < 0) {
                if (item.staffnum.trim() === list.children[index - 1].staffnum.trim()
                  && (item.contractnumber.split('-')[0].trim() === list.children[index - 1].contractnumber.split('-')[0].trim())) {
                  spanOneArr[concatOne] += 1;
                  spanOneArr.push(0);
                } else {
                  spanOneArr.push(1);
                  concatOne = index + 1;
                }
              } else {
                spanOneArr.push(1);
                concatOne++;
              }
            }
          });
        }
        spanOne.push.apply(spanOne, spanOneArr);
      });
      // spanOne.push(1);//合计不合并
      spanOne.push.apply(spanOne, [1]);
      return spanOne;
    },
    listSpanMethod({row, column, rowIndex, columnIndex}) {
      if (!this.mergeAnt) return;
      if (this.merge[0] === columnIndex) {//合并合同号
        const _row = this.flitterData(this.tableData)[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
      if (this.merge[1] === columnIndex) {
        const _row = this.flitterData1(this.tableData)[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
      if (this.merge[2] === columnIndex) {
        const _row = this.flitterData2(this.tableData)[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
      if (this.merge[3] === columnIndex) {
        const _row = this.flitterData3(this.tableData)[rowIndex];
        const _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
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
          if (this.$store.getters.userinfo.userinfo.otherorgs) {
            for (let others of this.$store.getters.userinfo.userinfo.otherorgs) {
              if (others.centerid) {
                this.$store.getters.orgGroupList.filter((item) => {
                  if (item.centerid === others.centerid) {
                    vote.push(
                      {
                        groupid: item.centerid,
                        groupname: item.centername,
                      },
                    );
                  }
                });
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
          });
          //add ccm 0112 兼职部门
          if (this.$store.getters.userinfo.userinfo.otherorgs) {
            for (let others of this.$store.getters.userinfo.userinfo.otherorgs) {
              if (others.centerid) {
                this.$store.getters.orgGroupList.filter((item) => {
                  if (item.centerid === others.centerid) {
                    vote.push(
                      {
                        groupid: item.centerid,
                        groupname: item.centername,
                      },
                    );
                  }
                });
              }
            }
          }
          //add ccm 0112 兼职部门
        } else if (role === '4') //GM
        {
          let centers = getOrgInfo(this.$store.getters.userinfo.userinfo.centerid);
          if (centers) {
            if (centers.encoding === null || centers.encoding === '' || centers.encoding === undefined) {
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
          || this.$store.getters.roles.indexOf('11') != -1 //总经理
          || this.$store.getters.roles.indexOf('16') != -1 //财务部长
          || this.$store.getters.roles.indexOf('18') != -1) //企划部长部长
        {
          this.$store.getters.orgGroupList.filter((item) => {
            vote1.push(
              {
                groupid: item.centerid,
                groupname: item.centername,
              },
            );
          });
          this.grp_options = vote1;
        } else {
          this.grp_options = vote;
        }
        //去重
        let letoptionsdata = [];
        let arrId = [];
        for (var item of this.grp_options) {
          if (arrId.indexOf(item['groupname']) == -1) {
            arrId.push(item['groupname']);
            letoptionsdata.push(item);
          }
        }
        //针对经营管理统计到group修改 start
        let incfmyList = [];
        for (let item of letoptionsdata) {
          if (getOrgInfo(item.groupid).encoding == '') {
            incfmyList.push(item.groupid);
          }
        }
        if (incfmyList.length > 0) {
          for (let item of incfmyList) {
            letoptionsdata = letoptionsdata.filter(letitem => letitem.groupid != item);
          }
          let orgInfo = [];
          for (let item of incfmyList) {
            if (item) {
              if (getOrgInfo(item).orgs.length != 0) {
                orgInfo.push(getOrgInfo(item).orgs);
              }
            }
          }
          let groInfo = orgInfo[0].filter(item => item.type == '2');
          for (let item of groInfo) {
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
        if (this.grp_options.length > 0) {
          this.refform.group_id = this.grp_options[0].groupid;
        }

        //UPD CCM 20210422
        resolve(this.grp_options);
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
      if (val === 'export') {
        if (this.tableData.length === 0) {
          Message({
            message: this.$t('normal.info_16'),
            type: 'info',
            duration: 2 * 1000,
          });
          return;
        }
        let winopen = 'http://localhost:8085/jmreport/view/759fe240f53a47a38f8c6b0dd8b7b545?';
        winopen = winopen + 'year=' + this.refform.year + '&department=' + this.refform.group_id;
        window.open(winopen, '_blank');
      }
    },
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.el-table {
  overflow-x: auto;
  overflow-y: auto;
  height: 600px;
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
