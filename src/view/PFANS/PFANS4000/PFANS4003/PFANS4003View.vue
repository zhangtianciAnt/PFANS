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
                  :disabled="false"
                  :placeholder="$t('normal.error_09')"
                  style="width:10vw"
                  type="year"
                  value-format="yyyy"
                  @change="changeYear">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('label.PFANS2036VIEW_DEPARTMENT')" prop="groupid">
                <el-select v-model="refform.groupid" :disabled="false" style="width: 20vw"
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
            <el-table :data="tableData" border default-expand-all header-cell-class-name="sub_bg_color_blue"
                      height="540"
                      highlight-current-row row-key="peoplewareid"
                      style="margin-top: 1%;font-size: 13px" @current-change="handleCurrentChange">
              <el-table-column
                :label="$t('label.PFANS4003VIEW_RANK')"
                prop="ranks"
                show-overflow-tooltip
                width="120">
              </el-table-column>
              <el-table-column
                :label="$t('label.PFANS1050FORMVIEW_STAFFCUST04')"
                align="center"
                prop="month4"
                width="100">
              </el-table-column>
              <el-table-column
                :label="$t('label.PFANS1050FORMVIEW_STAFFCUST05')"
                align="center"
                prop="month5"
                width="100">
              </el-table-column>
              <el-table-column
                :label="$t('label.PFANS1050FORMVIEW_STAFFCUST06')"
                align="center"
                prop="month6"
                width="100">
              </el-table-column>
              <el-table-column
                :label="$t('label.PFANS1050FORMVIEW_STAFFCUST07')"
                align="center"
                prop="month7"
                width="100">
              </el-table-column>
              <el-table-column
                :label="$t('label.PFANS1050FORMVIEW_STAFFCUST08')"
                align="center"
                prop="month8"
                width="100">
              </el-table-column>
              <el-table-column
                :label="$t('label.PFANS1050FORMVIEW_STAFFCUST09')"
                align="center"
                prop="month9"
                width="100">
              </el-table-column>
              <el-table-column
                :label="$t('label.PFANS1050FORMVIEW_STAFFCUST10')"
                align="center"
                prop="month10"
                width="100">
              </el-table-column>
              <el-table-column
                :label="$t('label.PFANS1050FORMVIEW_STAFFCUST11')"
                align="center"
                prop="month11"
                width="100">
              </el-table-column>
              <el-table-column
                :label="$t('label.PFANS1050FORMVIEW_STAFFCUST12')"
                align="center"
                prop="month12"
                width="110">
              </el-table-column>
              <el-table-column
                :label="$t('label.PFANS1050FORMVIEW_STAFFCUST01')"
                align="center"
                prop="month1"
                width="110">
              </el-table-column>
              <el-table-column
                :label="$t('label.PFANS1050FORMVIEW_STAFFCUST02')"
                align="center"
                prop="month2"
                width="110">
              </el-table-column>
              <el-table-column
                :label="$t('label.PFANS1050FORMVIEW_STAFFCUST03')"
                align="center"
                prop="month3"
                width="110">
              </el-table-column>
            </el-table>
          </el-row>
        </el-form>
        <el-dialog :visible.sync="daoru" width="50%" @close="refresh">
          <div>
            <div style="margin-top: 1rem;margin-left: 28%">
              <el-upload
                ref="uploader"
                :action="postAction"
                :before-upload="handleChange"
                :headers="authHeader"
                :limit="1"
                :on-remove="this.clear"
                :on-success="handleSuccess"
                drag
                multiple
              >
                <i class="el-icon-upload"></i>
                <div>{{ $t('label.PFANS2005FORMVIEW_MBYQ') }}</div>
              </el-upload>
            </div>
            <el-row>
              <span v-if="this.resultShow">{{ $t('label.PFANS2005FORMVIEW_CG') }}{{ this.successCount }}</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span
                v-if="this.resultShow"
              >{{ $t('normal.info') }}{{ this.errorCount }}</span>
            </el-row>
            <span v-if="this.Message">{{ this.cuowu }}</span>
            <div v-if="this.result">
              <el-table :data="message">
                <el-table-column
                  :label="$t('label.PFANS2017VIEW_CUHS')"
                  align="center"
                  prop="hang"
                  width="120%"
                ></el-table-column>
                <el-table-column
                  :label="$t('label.PFANS2017VIEW_ERROR')"
                  align="center"
                  prop="error"
                ></el-table-column>
              </el-table>
            </div>
          </div>
        </el-dialog>
        <el-dialog :visible.sync="pop_download" destroy-on-close width="50%">
          <el-table :data="downtypes" style="width: 100%; height: auto">
            <el-table-column :label="$t('label.ASSETS1001VIEW_FILENAME')" prop="name"></el-table-column>
            <el-table-column :label="$t('label.operation')">
              <template slot-scope="scope">
                <el-button size="mini" @click="handleDownload(scope.row)">{{ $t('button.download2') }}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
import {getToken} from '@/utils/auth';
import EasyNormalContainer from '@/components/EasyNormalContainer';
import {Decrypt, getCurrentRoleNew, getOrgInfo} from '../../../../utils/customize';
import moment from 'moment';

export default {
  name: 'PFANS4003View',
  components: {
    EasyNormalContainer,
  },
  data() {
    return {
      title: 'title.PFANS4003View',
      refform: {
        year: parseInt(moment(new Date()).format('MM')) >= 4 ? moment(new Date()).format('YYYY') : parseInt(moment(new Date()).format('YYYY')) - 1 + '',
        groupid: '',
      },
      currentRow: null,
      hasChildren: true,
      noback: true,
      loading: false,
      grp_options: [],
      buttonList: [
        {
          key: 'import',
          name: 'button.import',
          disabled: false,
          icon: 'el-icon-download',
        },
        {
          key: 'export2',
          name: 'button.download2',
          disabled: false,
          icon: 'el-icon-download',
        },
      ],
      cuowu: '',
      totaldata: [],
      successCount: 0,
      errorCount: '',
      daoru: false,
      pop_download: false,
      authHeader: {'x-auth-token': getToken()},
      postAction: process.env.BASE_API + '/peopleware/import',
      file: null,
      resultShow: false,
      message: [{hang: '', error: ''}],
      Message: false,
      result: false,
      isShow: false,
      tableData: [{
        peoplewareid: '1',
        ranks: '',
        month4: '',
        month5: '',
        month6: '',
        month7: '',
        month8: '',
        month9: '',
        month10: '',
        month11: '',
        month12: '',
        month1: '',
        month2: '',
        month3: '',
      }],
    };
  },
  mounted() {
    // this.getorglistname().then(val =>{
    //   this.getDepartInfo();
    // });
    this.remount();
  },
  computed: {
    downtypes() {
      return [{name: this.$t('menu.PFANS4003'), type: 0}];
    },
  },
  methods: {
    handleCurrentChange(val) {
      this.currentRow = val;
    },
    getDepartInfo() {
      this.tableData = [];
      Math.formatFloat = function(f, digit) {  // 解决js精度丢失问题
        var m = Math.pow(10, digit);
        return Math.round(f * m, 10) / m;
      };
      this.loading = true;
      let parameter = {
        year: this.refform.year,
        groupid: this.refform.groupid,
      };
      this.$store
        .dispatch('PFANS4003Store/getpeoplewareList', parameter)
        .then(res => {
          if (res.length > 0) {
            let month1 = 0, month2 = 0, month3 = 0, month4 = 0, month5 = 0, month6 = 0, month7 = 0, month8 = 0,
              month9 = 0, month10 = 0, month11 = 0, month12 = 0;
            for (let i = 0; i < res.length; i++) {
              month1 = Math.formatFloat(Number(month1) + Number(res[i].month1), 5);
              month2 = Math.formatFloat(month2 + Number(res[i].month2), 5);
              month3 = Math.formatFloat(month3 + Number(res[i].month3), 5);
              month4 = Math.formatFloat(month4 + Number(res[i].month4), 5);
              month5 = Math.formatFloat(month5 + Number(res[i].month5), 5);
              month6 = Math.formatFloat(month6 + Number(res[i].month6), 5);
              month7 = Math.formatFloat(month7 + Number(res[i].month7), 5);
              month8 = Math.formatFloat(month8 + Number(res[i].month8), 5);
              month9 = Math.formatFloat(month9 + Number(res[i].month9), 5);
              month10 = Math.formatFloat(month10 + Number(res[i].month10), 5);
              month11 = Math.formatFloat(month11 + Number(res[i].month11), 5);
              month12 = Math.formatFloat(month12 + Number(res[i].month12), 5);
              this.tableData = res;
            }
            let length = this.tableData.length;
            let item = {
              peoplewareid: '1',
              ranks: '部门平均',
              //region add scc 8/25 部门平均保留两位小数点 from
              month4: Math.formatFloat(month4 / length, 2),
              month5: Math.formatFloat(month5 / length, 2),
              month6: Math.formatFloat(month6 / length, 2),
              month7: Math.formatFloat(month7 / length, 2),
              month8: Math.formatFloat(month8 / length, 2),
              month9: Math.formatFloat(month9 / length, 2),
              month10: Math.formatFloat(month10 / length, 2),
              month11: Math.formatFloat(month11 / length, 2),
              month12: Math.formatFloat(month12 / length, 2),
              month1: Math.formatFloat(month1 / length, 2),
              month2: Math.formatFloat(month2 / length, 2),
              month3: Math.formatFloat(month3 / length, 2),
              //endregion add scc 8/25 部门平均保留两位小数点 to
            };
            this.tableData.push(item);
          }

        })
        .catch(error => {
          this.$message.error({
            message: error,
            type: 'error',
            duration: 5 * 1000,
          });
          this.loading = false;
        });
      this.loading = false;
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
          || this.$store.getters.roles.indexOf('26') != -1) //财务担当
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
          this.refform.groupid = this.grp_options[0].groupid;
        }

        //UPD CCM 20210422
        resolve(this.grp_options);
      });
    },
    changeYear(val) {
      this.tableData.data = [];
      this.getDepartInfo();
    },
    groupChange(val) {
      this.tableData.data = [];
      this.refform.groupid = val;
      let data = this.grp_options.filter(item => (item.groupid == val));
      if (data.length > 0) {
        this.refform.encoding = data[0].encoding;
      }
      this.getDepartInfo();
    },
    buttonClick(val) {
      if (val === 'import') {
        this.daoru = true;
        this.clear(false);
      }
      if (val === 'export2') {
        this.pop_download = true;
      }
    },
    handleDownload(row) {
      this.loading = true;
      this.$store
        .dispatch('PFANS4003Store/download', {type: row.type})
        .then(response => {
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
    handleChange(file, fileList) {
      this.clear(true);
    },
    clear(safe) {
      this.file = null;
      this.resultShow = false;
      this.Message = false;
      this.result = false;
      //region scc add 21/8/25 导入时清空上次提示信息 from
      this.errorCount = '';
      //endregion scc add 21/8/25 导入时清空上次提示信息 to
      if (!safe) {
        if (this.$refs.uploader != undefined) {
          this.$refs.uploader.clearFiles();
        }
      }
    },
    remount() {
      this.getorglistname().then(val => {
        this.getDepartInfo();
      });
    },
    refresh() {
      this.remount();
    },
    handleSuccess(response, file, fileList) {
      if (response.code !== 0) {
        this.cuowu = response.message;
        this.Message = true;
      } else {
        response.data = JSON.parse(Decrypt(response.data));
        let datalist = [];
        for (let c = 0; c < response.data.length; c++) {
          let error = response.data[c];
          error = error.substring(0, 3);
          if (this.$i18n) {
            if (error.indexOf((this.$t('normal.info')).toString()) !== -1) {
              this.errorCount = response.data[c].substring(2);
              this.resultShow = true;
            }
            // if (error === this.$t("normal.info")) {
            //   this.errorCount = response.data[c].substring(2);
            //   this.resultShow = true;
            // }
            if (error === this.$t('label.PFANS2005FORMVIEW_CG')) {
              this.successCount = response.data[c].substring(4);
              this.resultShow = true;
              this.errorCount = this.errorCount === '' ? '：无' : this.errorCount;
            }
            if (error === this.$t('label.PFANS2017VIEW_D')) {
              let obj = {};
              var str = response.data[c];
              var aPos = str.indexOf(this.$t('label.PFANS2017VIEW_BAN'));
              var bPos = str.indexOf(this.$t('label.PFANS2017VIEW_DE'));
              var r = str.substr(aPos + 1, bPos - aPos - 1);
              obj.hang = r;
              obj.error = response.data[c].substring(6);
              datalist[c] = obj;
            }
          }
          this.message = datalist;
          this.totaldata = this.message;
          // if (this.errorCount === "0") {
          //   this.result = false;
          // } else {
          //   this.result = true;
          // }
        }
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
