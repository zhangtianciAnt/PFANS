<template>
  <div>
    <EasyNormalContainer :buttonList="buttonList" :title="title"
                         ref="container" :showSelection="isShow"
                         @buttonClick="buttonClick" v-loading="loading"
                         :noback="noback">
      <div slot="customize" style="width: 100%">
        <el-row style="margin-top: 2rem">
          <el-col :span="18">
            <el-date-picker
              :placeholder="$t('normal.error_09')"
              @change="changeYear"
              type="month"
              v-model="month"
              style="width:10vw">
            </el-date-picker>
          </el-col>
          <el-col :span="6">
            <el-input :placeholder="$t('label.PFANS2006VIEW_EMPLOYEESNAME')" style="width: 20vw"
                      v-model="filterName">
              <el-button slot="append" icon="el-icon-search" type="primary" plain @click="inputChange"></el-button>
            </el-input>
          </el-col>
        </el-row>
        <el-row>
          <el-form label-position="top" label-width="8vw" employedref="refform" ref="refform"
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
              <el-table :data="tableData" border :default-expand-all="false" header-cell-class-name="sub_bg_color_blue"
                        style="margin-top: 1%;font-size: 13px"
                        row-key="wai_id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" height="540"
                        highlight-current-row @current-change="handleCurrentChange">
                <el-table-column
                  show-overflow-tooltip
                  prop="username"
                  :label="$t('label.PFANS5016FORMVIEW_NAME')"
                >
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  align="center"
                  prop="groupname"
                  :label="$t('label.PFANS5016FORMVIEW_DEPART')"
                >
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  align="center"
                  prop="company"
                  :label="$t('label.PFANS5016FORMVIEW_COMPANY')"
                >
                </el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  align="center"
                  prop="ratio"
                  :label="$t('label.PFANS5016FORMVIEW_RATIO')"
                >
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="project"
                  :label="$t('label.PFANS5016FORMVIEW_PROJECT')"
                >
                </el-table-column>
                <el-table-column
                  prop="general"
                  align="center"
                  :label="$t('label.PFANS5016FORMVIEW_GENERAL')">
                </el-table-column>
                <el-table-column :label="$t('label.PFANS5016FORMVIEW_TIMETOADJUST')" align="center" prop="adjust"
                                 width="190">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.adjust" controls-position="right" style="width: 11rem"
                                     :disabled="fillIn()"
                                     v-show=scope.row.adjust :min="0" :max="1000000000" :precision="2"
                                     @change="changeAdj(scope.row)"></el-input-number>
                    <el-input :disabled="true" style="width:13vw" v-model="scope.row.change"
                              v-show=!scope.row.adjust></el-input>
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
import {
  getCooperinterviewListByAccount,
  getCurrentRoleNew,
  getDepartmentById,
  getDictionaryInfo,
  getOrgInfo,
  getUserInfo
} from "../../../../utils/customize";
import moment from "moment";
import {Message} from "element-ui";

export default {
  name: "PFANS5016VIEW",
  components: {
    EasyNormalContainer,
  },
  data() {
    return {
      title: 'title.PFANS5016VIEW',
      month: moment(new Date()).format('YYYY-MM-DD'),
      groupid: '',
      export: true,
      disabled: false,
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
        }]
      }]
    }
  },
  mounted() {
    this.remount();
  },
  methods: {
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    getDepartInfo() {
      //region scc add 9/18 js精度，保留小数位
      Math.formatFloat = function (f, digit) {  // 解决js精度丢失问题，保留小数
        var m = Math.pow(10, digit);
        return Math.round(f * m, 10) / m;
      }
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
                  sum += Number(this.tableData[i].children[j].adjust);
                  this.tableData[i].children[j].wai_id = m + '.' + c;
                  this.tableData[i].children[j].username = '';
                  this.tableData[i].children[j].groupname = '';
                  this.tableData[i].children[j].company = '';
                }
              }
              this.tableData[i].change = Math.formatFloat(sum,2);//保留两位小数
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
          Message({
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
      let _id = val.wai_id.split(".")[0].trim();
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].wai_id === Number(_id) || this.tableData[i].wai_id === _id) {
          let sum = 0;
          for (let j = 0; j < this.tableData[i].children.length; j++) {
            sum += this.tableData[i].children[j].adjust;
          }
          // this.tableData[i].general = sum;
          this.tableData[i].change = sum;
        }
      }
    },
    buttonClick(val) {
      if (val === 'save') {
        this.loading = true;
        this.$store
          .dispatch('PFANS5016Store/updateByVoId', this.tableData)
          .then(response => {
            this.getDepartInfo();
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
    inputChange() {
      if (this.filterName) {
        this.tableData = this.tableData.filter(item => item.username === this.filterName)
      } else {
        this.tableData = this.tableData1;
      }
    },
    groupChange(val) {
      this.tableData.data = [];
      this.groupid = val;
      let data = this.grp_options.filter(item => (item.groupid == val));
      if (data.length > 0) {
        this.refform.encoding = data[0].encoding;
      }
      this.getDepartInfo();
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
                })
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
          || this.$store.getters.roles.indexOf("11") != -1 //总经理
          || this.$store.getters.roles.indexOf("16") != -1 //财务部长
          || this.$store.getters.roles.indexOf("26") != -1) //财务担当
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
            incfmyList.push(item.groupid)
          }
        }
        if (incfmyList.length > 0) {
          for (let item of incfmyList) {
            letoptionsdata = letoptionsdata.filter(letitem => letitem.groupid != item)
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
                groupid: item._id,
                groupname: item.title,
              },
            );
          }
        }
        //针对经营管理统计到group修改 end
        this.grp_options = letoptionsdata;
        if (this.grp_options.length > 0) {
          this.groupid = this.grp_options[0].groupid;
        }

        //UPD CCM 20210422
        resolve(this.grp_options)
      });
    },
    remount() {
      this.getorglistname().then(val => {
        this.getDepartInfo();
      });
    },
    fillIn() {
      let tablemonth = Number(moment(this.month).format("M"));
      let month = Number(moment(new Date()).format("M"));
      if (month - 1 === tablemonth) {
        return false;
      } else {
        return true;
      }
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
