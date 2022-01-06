<template>
  <div>
    <EasyNormalContainer ref="container" v-loading="loading"
                         :buttonList="buttonList" :noback="noback"
                         :showSelection="isShow" :title="title"
                         @buttonClick="buttonClick">
      <div slot="customize" style="width: 100%">
        <el-row style="margin-top: 2rem">
          <el-col :span="18">
            <el-date-picker
              v-model="month"
              :placeholder="$t('normal.error_09')"
              style="width:10vw"
              type="month"
              @change="changeYear">
            </el-date-picker>
          </el-col>
          <el-col :span="6">
            <el-input v-model="filterName" :placeholder="$t('label.PFANS2006VIEW_EMPLOYEESNAME')"
                      style="width: 20vw">
              <el-button slot="append" icon="el-icon-search" plain type="primary" @click="inputChange"></el-button>
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-form ref="refform" employedref="refform" label-position="top" label-width="8vw"
                   style="padding: 0.5vw">
            <!--          <el-row style="padding-top: 3%">-->
            <!--            <el-col :span="6">-->
            <!--              <el-form-item :label="$t('label.PFANS5016VIEW_YEARS')">-->
            <!--                <el-date-picker-->
            <!--                  :placeholder="$t('normal.error_09')"-->
            <!--                  @change="changeYear"-->
            <!--                  type="month"-->
            <!--                  v-model="month"-->
            <!--                  style="width:10vw">-->
            <!--                </el-date-picker>-->
            <!--              </el-form-item>-->
            <!--            </el-col>-->
            <!--            <el-col :span="6">-->
            <!--              <el-form-item :label="$t('label.PFANS2036VIEW_DEPARTMENT')" >-->
            <!--                <el-select v-model="groupid" style="width: 20vw" :disabled="false"-->
            <!--                           @change="groupChange">-->
            <!--                  <el-option-->
            <!--                    v-for="item in grp_options"-->
            <!--                    :key="item.groupid"-->
            <!--                    :label="item.groupname"-->
            <!--                    :value="item.groupid">-->
            <!--                  </el-option>-->
            <!--                </el-select>-->
            <!--              </el-form-item>-->
            <!--            </el-col>-->
            <!--            <div style="margin-top: 28px; margin-left: 800px" >-->
            <!--              <el-col :span="6" align="right">-->

            <el-row style="padding-bottom: 0.5%">
              <el-table :data="tableData" :default-expand-all="false" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" border
                        header-cell-class-name="sub_bg_color_blue"
                        height="540" highlight-current-row row-key="wai_id"
                        style="margin-top: 1%;font-size: 13px" @current-change="handleCurrentChange">
                <el-table-column
                  :label="$t('label.PFANS5016FORMVIEW_NAME')"
                  prop="username"
                  show-overflow-tooltip
                  width="100px"
                >
                </el-table-column>
                <el-table-column
                  :label="$t('label.PFANS5016FORMVIEW_DEPART')"
                  align="center"
                  prop="groupname"
                  show-overflow-tooltip
                  width="200px"
                >
                </el-table-column>
                <el-table-column
                  :label="$t('label.PFANS5016FORMVIEW_COMPANY')"
                  align="center"
                  prop="company"
                  show-overflow-tooltip
                  width="150px"
                >
                </el-table-column>
                <el-table-column
                  :label="$t('label.PFANS5016FORMVIEW_RATIO')"
                  align="center"
                  prop="ratio"
                  show-overflow-tooltip
                  width="100px"
                >
                </el-table-column>
                <el-table-column
                  :label="$t('label.PFANS5016FORMVIEW_PROJECT')"
                  align="center"
                  prop="project"
                >
                </el-table-column>
                <el-table-column
                  :label="$t('label.PFANS5016FORMVIEW_GENERAL')"
                  align="center"
                  prop="general"
                  width="120px">
                </el-table-column>
                <el-table-column :label="$t('label.PFANS5016FORMVIEW_TIMETOADJUST')" align="center" prop="adjust"
                                 width="150px">
                  <template slot-scope="scope">
                    <el-input-number v-show="scope.row.project != '—'" v-model="scope.row.adjust" :disabled="fillIn()"
                                     :max="1000000000"
                                     :min="0" :precision="2" controls-position="right" style="width:9vw"
                                     @change="changeAdj(scope.row)"></el-input-number>
                    <el-input v-show="scope.row.project == '—'" v-model="scope.row.change" :disabled="true"
                              style="width:9vw"></el-input>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
          </el-form>
        </el-row>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
import EasyNormalContainer from '@/components/EasyNormalContainer';
import {accAdd, getDictionaryInfo, getOrgInfo} from '../../../../utils/customize';
import moment from 'moment';
import {Message} from 'element-ui';

export default {
  name: 'PFANS5016VIEW',
  components: {
    EasyNormalContainer,
  },
  data() {
    return {
      title: 'title.PFANS5016VIEW',
      month: moment(new Date()).format('YYYY-MM-DD'),
      currentRow: null,
      hasChildren: true,
      noback: true,
      loading: false,
      mergeLine: {},
      mergeIndex: {},
      filterName: '',
      tableData1: {},
      tableData2: {},
      grp_options: [],
      dictionaryDay: '',
      buttonList: [
        {'key': 'save', 'name': 'button.save', 'disabled': false, icon: 'el-icon-check'},
      ],
      isShow: false,
      tableData: [{
        wai_id: '1',
        logperson_id: '',
        username: '',
        groupname: '',
        company: '',
        ratio: '',
        project: '—',
        general: '',
        adjust: '',
        change: '',
        children: [{
          wai_id: '2',
          logperson_id: '',
          username: '',
          groupname: '',
          company: '',
          ratio: '',
          project: '',
          general: '',
          adjust: '',
        }],
      }],
    };
  },
  mounted() {
    this.remount();
    if (getDictionaryInfo('BP027001')) {
      this.dictionaryDay = Number(getDictionaryInfo('BP027001').value1);
    }
  },
  methods: {
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    getDepartInfo() {
      //region scc add 9/18 js精度，保留小数位
      // Math.formatFloat = function (f, digit) {  // 解决js精度丢失问题，保留小数
      //   var m = Math.pow(10, digit);
      //   return Math.round(f * m, 10) / m;
      // }
      this.loading = true;
      this.$store
        .dispatch('PFANS5016Store/getLogPerson', {'month': this.month})
        .then(response => {
          if (response.length > 0) {
            let m = 1;
            let c = 0;
            for (let i = 0; i < response.length; i++) {
              //region scc del 名字从后台获取 from
              // if (response[i].username) {
              //   let user = getUserInfo(response[i].username)
              //   if (user) {
              //     response[i].username = user.userinfo.customername;
              //   }
              // }
              //region scc del 名字从后台获取 from
              if (response[i].groupname) {
                let group = getOrgInfo(response[i].groupname);
                if (group) {
                  response[i].groupname = group.companyname;
                }
              }
            }
            this.tableData = response;
            for (let i = 0; i < this.tableData.length; i++) {
              this.tableData[i].children = this.tableData[i].logpersonstatistics;
              this.tableData[i].wai_id = m;
              let sum = 0.00;
              if (this.tableData[i].children !== undefined && this.tableData[i].children !== null) {
                for (let j = 0; j < this.tableData[i].children.length; j++) {
                  c += 1;
                  // this.tableData[i].children[j].children = this.tableData[i].children[j].logpersonstatistics;
                  this.tableData[i].children[j].project = this.tableData[i].children[j].project_name;
                  this.tableData[i].children[j].general = this.tableData[i].children[j].duration;
                  // this.tableData[i].change = Number(this.tableData[i].general) + Number(this.tableData[i].children[j].adjust) - Number(this.tableData[i].children[j].duration);
                  sum = accAdd(sum, Number(this.tableData[i].children[j].adjust));
                  this.tableData[i].children[j].wai_id = m + '.' + c;
                  this.tableData[i].children[j].username = '';
                  this.tableData[i].children[j].groupname = '';
                  this.tableData[i].children[j].company = '';
                }
              }
              this.tableData[i].change = sum;//保留两位小数
              m += 1;
            }
          } else {
            this.tableData = [];
          }
          this.tableData1 = JSON.parse(JSON.stringify(this.tableData));
          // this.copy();
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
    changeYear(val) {
      this.tableData = [];
      this.month = moment(val).format('YYYY-MM-DD');
      if (val) {
        this.getDepartInfo();
      }
    },
    changeAdj(val) {
      let _id = val.wai_id.split('.')[0].trim();
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].wai_id === Number(_id) || this.tableData[i].wai_id === _id) {
          let sum = 0;
          for (let j = 0; j < this.tableData[i].children.length; j++) {
            sum = accAdd(sum, Number(this.tableData[i].children[j].adjust));
          }
          // this.tableData[i].general = sum;
          this.tableData[i].change = sum;
        }
      }
    },
    buttonClick(val) {
      // Math.formatFloat = function (f, digit) {  // 解决js精度丢失问题，保留小数
      //   var m = Math.pow(10, digit);
      //   return Math.round(f * m, 10) / m;
      // }
      if (val === 'save') {
        if (this.tableData.length > 0 && this.tableData != null) {
          this.loading = true;
          this.$store
            .dispatch('PFANS5016Store/updateByVoId', this.tableData)
            .then(response => {
              // this.getDepartInfo();
              this.tableData2 = JSON.parse(JSON.stringify(this.tableData1));
              this.tableData1 = JSON.parse(JSON.stringify(this.tableData));
              for (let i = 0; i < this.tableData2.length; i++) {
                for (let j = 0; j < this.tableData1.length; j++) {
                  if (this.tableData2[i].username == this.tableData1[j].username) {
                    this.tableData2[i].children = this.tableData1[j].children;
                  }
                }
                let sum = 0.00;
                for (let k = 0; k < this.tableData2[i].children.length; k++) {
                  sum = accAdd(sum, Number(Number(this.tableData2[i].children[k].adjust)));
                }
                this.tableData2[i].change = sum;//保留两位小数
              }
              this.tableData1 = this.tableData2;
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
        } else {
          Message({
            message: this.$t('normal.info_16'),
            type: 'info',
            duration: 2 * 1000,
          });
        }
      }
    },
    inputChange() {
      if (this.filterName) {
        this.tableData = this.tableData1.filter(item => {
          if (item.username != null && item.username != '' && item.username != undefined) {
            if (item.username.indexOf(this.filterName) != -1) {
              return item;
            }
          }
        });
      } else {
        this.tableData = this.tableData1;
      }
    },
    remount() {
      this.getDepartInfo();
    },
    fillIn() {
      let tablemonth = Number(moment(this.month).format('M'));
      let month = Number(moment(new Date()).format('M'));
      let nowd = Number(moment(new Date()).format('D'));
      if (month - 1 === tablemonth) {
        if (nowd <= this.dictionaryDay) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
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
