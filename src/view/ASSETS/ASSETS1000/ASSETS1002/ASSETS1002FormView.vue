<template>
  <div style="min-height: 100%" class="assets1002">
    <EasyNormalContainer :buttonList="buttonList" :title="title" @buttonClick="buttonClick" ref="container"
                         v-loading="loading">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="ruleForm"
                 style="padding: 2vw">
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('label.ASSETS1002VIEW_INVENTORYCYCLE')" prop="inventorycycle">
                <el-date-picker
                  :end-placeholder="$t('label.enddate')"
                  :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                  :start-placeholder="$t('label.startdate')"
                  style="width:20vw"
                  type="daterange"
                  v-model="form.inventorycycle">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :error="error" :label="$t('label.ASSETS1002VIEW_USERID')" prop="userid">
                <user :error="error" :selectType="selectType" :userlist="userlist"
                      @getUserids="getUserids" style="width:20vw"></user>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <!--<el-table :data="tableD" @selection-change="selectionChange" height="400" stripe border-->
                        <!--style="width: 70vw"-->
                        <!--header-cell-class-name="sub_bg_color_blue" @row-click="rowClick" cell-class-name="row_height">-->
                <!--<el-table-column type="selection" width="55"></el-table-column>-->
                <!--<el-table-column :label="$t('label.ASSETS1001VIEW_FILENAME')" align="center" prop="filename">-->
                <!--</el-table-column>-->
                <!--<el-table-column :label="$t('label.ASSETS1001VIEW_TYPEASSETS')" align="center" prop="typeassets">-->
                <!--</el-table-column>-->
                <!--<el-table-column :label="$t('label.ASSETS1001VIEW_PRINCIPAL')" align="center" prop="principal">-->
                <!--</el-table-column>-->
                <!--<el-table-column :label="$t('label.ASSETS1001VIEW_BARCODE')" align="center" prop="barcode">-->
                <!--</el-table-column>-->
              <!--</el-table>-->
              <EasyNormalTable :columns="columns" :data="tableD" :title="title1" :rowid="row_id" :buttonShow="buttonShow" :titleShow="titleShow"
                               :showSelection="showSelection" @rowClick="rowClick" :buttonList="buttonList"
                               ref="roletable">
                <el-select @change="changed" slot="customize" v-model="department">
                  <el-option
                    :key="item.code"
                    :label="item.code"
                    :value="item.code"
                    v-for="item in options">
                  </el-option>
                </el-select>
              </EasyNormalTable>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import EasyNormalTable from '@/components/EasyBigDataTable';
  import ASSETS1001View from '../ASSETS1001/ASSETS1001View.vue';
  import {Message} from 'element-ui';
  import dicselect from '../../../components/dicselect.vue';
  import user from '../../../components/user.vue';
  import moment from 'moment';
  import {getDictionaryInfo, getUserInfo} from '@/utils/customize';

  export default {
    name: 'ASSETS1002FormView',
    components: {
      EasyNormalContainer,
      EasyNormalTable,
      ASSETS1001View,
      dicselect,
      user,
    },
    data() {
      var validateUserid = (rule, value, callback) => {
        if (!value || value === '' || value === 'undefined') {
          callback(new Error(this.$t('normal.error_09') + this.$t('label.ASSETS1002VIEW_USERID')));
          this.error = this.$t('normal.error_09') + this.$t('label.ASSETS1002VIEW_USERID');
        } else {
          callback();
          this.error = '';
        }
      };
      var validateDate = (rule, value, callback) => {
        if (value && this.form) {
//          if (this.form.status !== '0') {
//            callback();
//          }
          this.$store
            .dispatch('ASSETS1002Store/check', {
              'inventorycycle': moment(this.form.inventorycycle[0]).format('YYYY-MM-DD') + ' ~ ' + moment(this.form.inventorycycle[1]).format('YYYY-MM-DD'),
              'inventoryplan_id': this.$route.params._id
            })
            .then(response => {
              this.data = response;
              if (this.data === 1) {
                callback(this.$t('normal.error_plandate'));
              } else {
                callback();
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
        } else {
          callback();
        }
      };
      return {
        department: '',
        options: [],
        idBack: '',
        buttonShow:false,
        titleShow:false,
        loading: false,
        error: '',
        row_id: 'assets_id',
        userlist: '',
        selectType: 'Single',
        title: 'title.ASSETS1002FORMVIEW',
        title1: 'title.ASSETS1001VIEW',
        buttonList: [],
        showSelection: true,
        form: {
          inventorycycle: [],
          userid: '',
          status: ''
        },
        tableD: [
        ],
        columns: [
          {
            code: 'filename',
            label: 'label.ASSETS1001VIEW_FILENAME',
            width: 120,
            fix: false,
            filter: false,
          },
          {
            code: 'typeassets',
            label: 'label.ASSETS1001VIEW_TYPEASSETS',
            width: 120,
            fix: false,
            filter: false,
          },
          {
            code: 'principal',
            label: 'label.ASSETS1001VIEW_PRINCIPAL',
            width: 120,
            fix: false,
            filter: false,
          },
          {
            code: 'barcode',
            label: 'label.ASSETS1001VIEW_BARCODE',
            width: 120,
            fix: false,
            filter: false,
          },
          {
            code: 'usedepartment',
            label: 'label.ASSETS1001VIEW_USEDEPARTMENT',
            width: 120,
            fix: false,
            filter: false,
          },
          {
            code: 'bartype',
            label: 'label.ASSETS1002VIEW_BARTYPE',
            width: 120,
            fix: false,
            filter: false,
          }
        ],
        buttonList:[],
        zichanlist:[],
        selectedList:[],
        multipleSelection: [],
        baseInfo: {},
        rules: {
          userid: [{
            required: true,
            validator: validateUserid,
            trigger: 'change',
          }],
          inventorycycle: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.ASSETS1002VIEW_INVENTORYCYCLE'),
            trigger: 'change',
          },
            {
              required: true,
              validator: validateDate,
              trigger: 'change',
            }],
        },
        disable: '',
        rowid: '',
      };
    },
    mounted() {
      if (this.$route.params._id) {
        this.getSelectById();
      } else {
        this.userlist = this.$store.getters.userinfo.userid;
        this.form.userid = this.$store.getters.userinfo.userid;
        this.getDepartmentData();
      }
    },
    created() {
      this.disable = this.$route.params.disabled;
      this.status = this.$route.params.viewstatus;
      if (this.disable) {
        this.buttonList = [
          {
            key: 'save',
            name: 'button.save',
            icon: 'el-icon-check',
          },
        ];
      }
// 禅道任务741
      else if(this.status === this.$t('label.node_step4')||this.status === this.$t('button.pause')) {
        this.buttonList = [
          {
            key: 'vResult',
            name: 'button.vResult',
            icon: 'el-icon-thumb',
          },
          {
            key: 'end',
            name: 'button.end',
            icon: 'el-icon-finished',
          },
          {
            key: 'trash',
            name: 'button.trash',
            icon: 'el-icon-close',
          },
          {
            key: 'pause',
            name: 'button.pause',
            icon: 'el-icon-video-pause',
          },
          {
            key: 'start',
            name: 'button.start',
            icon: 'el-icon-video-play',
          },
        ];
      }
      // 禅道任务741
      else {
        this.buttonList = [
          {
            key: 'vResult',
            name: 'button.vResult',
            icon: 'el-icon-thumb',
          },
          {
            key: 'end',
            name: 'button.end',
            icon: 'el-icon-finished',
          },
          {
            key: 'trash',
            name: 'button.trash',
            icon: 'el-icon-close',
          },
        ];
      }

    },
    methods: {
      getDepartmentData() {
        this.loading = true;
        this.$store
          .dispatch('ASSETS1001Store/getDepartment')
          .then(response => {
              this.loading = false;
              // update gbb 20210312 NT_PFANS_20210308_BUG_147 部门下拉绑定 start
              // for (let item of response) {
              //   let i = {};
              //   if (item) {
              //     i.code = item;
              //   }
              //   this.options.push(i);
              // }
              let filters = new Set();
              for (let item of response) {
                  let i = {};
                  if (item) {
                      i.code = item;
                  }
                  filters.add(i);
              }
              let filtersrst = [...new Set(filters)];
              var hash = {};
              filtersrst = filtersrst.reduce(function(item, next) {
                  if (hash[next.code]) {
                      '';
                  } else {
                      hash[next.code] = true && item.push(next);
                  }
                  return item;
              }, []);
              for (let i = 0; i < filtersrst.length; i++) {
                  if (filtersrst[i].code == '' || filtersrst[i].code == null || filtersrst[i].code == undefined) {
                      filtersrst[i].code = '全部';
                  }
              }
              this.options = filtersrst;
              // update gbb 20210312 NT_PFANS_20210308_BUG_147 部门下拉绑定 end
            }
          ).catch(error => {
          this.$message.error({
            message: error,
            type: 'error',
            duration: 5 * 1000,
          });
          this.loading = false;
        });
      },
      changed() {
        if(this.$route.params._id){
          if(this.department && this.department != '全部'){
            this.tableD = this.zichanlist.filter(item => item.usedepartment == this.department)
          }else{
            this.tableD = this.zichanlist;
          }
        }else{
          this.getSelectAll();
        }
      },
      rowClick(row) {
        this.rowid = row.assets_id;
      },
      getSelectById() {
        this.loading = true;
        this.$store
          .dispatch('ASSETS1002Store/selectById', {'inventoryRangeid': this.$route.params._id})
          .then(response => {
            this.form = response.inventoryplan;
            let inventorycycle = response.inventoryplan.inventorycycle;
            let inventory = inventorycycle.slice(0, 10);
            let inventory1 = inventorycycle.slice(inventorycycle.length - 10);
            this.form.inventorycycle = [inventory, inventory1];
            this.userlist = response.inventoryplan.userid;
            if (response.inventoryRange.length > 0) {
              this.zichanlist = response.inventoryRange;
              for (let j = 0; j < response.inventoryRange.length; j++) {
                let user = getUserInfo(response.inventoryRange[j].principal);
                if (user) {
                  response.inventoryRange[j].principal = user.userinfo.customername;
//                  response.inventoryRange[j].usedepartment = user.userinfo.centername;
                }
                if (response.inventoryRange[j].purchasetime !== null && response.inventoryRange[j].purchasetime !== '') {
                  response.inventoryRange[j].purchasetime = moment(response.inventoryRange[j].purchasetime).format('YYYY-MM-DD');
                }
                if (response.inventoryRange[j].typeassets !== null && response.inventoryRange[j].typeassets !== '') {
                  let letErrortype = getDictionaryInfo(response.inventoryRange[j].typeassets);
                  if (letErrortype != null) {
                    response.inventoryRange[j].typeassets = letErrortype.value1;
                  }
                }
                if (response.inventoryRange[j].bartype !== null && response.inventoryRange[j].bartype !== '') {
                  let letBartype = getDictionaryInfo(response.inventoryRange[j].bartype);
                  if (letBartype != null) {
                    response.inventoryRange[j].bartype = letBartype.value1;
                  }
                }
              }
            }
            let filters = new Set()
            for (let item of response.inventoryRange) {
              let i = {};
              if (item) {
                i.code = item.usedepartment;
              }
              filters.add(i);
            }
            let filtersrst = [...new Set(filters)]
            var hash = {}
            filtersrst = filtersrst.reduce(function (item, next) {
              if (hash[next.code]) {
                ''
              } else {
                hash[next.code] = true && item.push(next)
              }
              return item
            }, [])
            for(let i = 0; i < filtersrst.length; i ++){
              if(filtersrst[i].code == ''){
                filtersrst[i].code = '全部'
              }
            }
            this.options = filtersrst
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
      selectionChange(val) {
        this.rowid = '';
        this.multipleSelection = val;
        for (let i = 0; i < this.multipleSelection.length; i++) {
          this.rowid = this.rowid + ';' + this.multipleSelection[i].assets_id;
        }
      },
      getSelectAll() {
        this.loading = true;
        this.$store
        // update gbb 20210312 NT_PFANS_20210308_BUG_147 部门下拉绑定 start
          //.dispatch('ASSETS1001Store/getList', {usedepartment: this.department})
            .dispatch('ASSETS1001Store/getList', {usedepartment: this.department == '全部' ? undefined : this.department})
            // update gbb 20210312 NT_PFANS_20210308_BUG_147 部门下拉绑定 end
          .then(response => {
            // add gbb 210906 PSDCD_PFANS_20210823_XQ_111 【报废】资产不能做异动与设备盘点-去掉报废的资产 start
            response = response.filter(value => (value.assetstatus !== 'PA003002'));
            // add gbb 210906 PSDCD_PFANS_20210823_XQ_111 【报废】资产不能做异动与设备盘点-去掉报废的资产 end
            for (let j = 0; j < response.length; j++) {
              let user = getUserInfo(response[j].principal);
              if (user) {
                response[j].principal = user.userinfo.customername;
//                response[j].usedepartment = user.userinfo.centername;
              }
              if (response[j].purchasetime !== null && response[j].purchasetime !== '') {
                response[j].purchasetime = moment(response[j].purchasetime).format('YYYY-MM-DD');
              }
              if (response[j].typeassets !== null && response[j].typeassets !== '') {
                let letErrortype = getDictionaryInfo(response[j].typeassets);
                if (letErrortype != null) {
                  response[j].typeassets = letErrortype.value1;
                }
              }
              if (response[j].bartype !== null && response[j].bartype !== '') {
                let letBartype = getDictionaryInfo(response[j].bartype);
                if (letBartype != null) {
                  response[j].bartype = letBartype.value1;
                }
              }
            }
            this.tableD = response;
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
      getUserids(val) {
        //update gbb 20210315 NT_PFANS_20210305_BUG_133 负责人项目必填check start
        //this.form.user_id = val;
        this.form.userid = val;
        this.userlist = val;
        //if (!this.form.user_id || this.form.user_id === '' || val === 'undefined') {
        if (!this.form.userid || this.form.userid === '' || val === 'undefined') {
          this.error = this.$t('normal.error_09') + this.$t('label.ASSETS1002VIEW_USERID');
        } else {
          this.error = '';
        }
        //update gbb 20210315 NT_PFANS_20210305_BUG_133 负责人项目必填check end
      },
      getUpdate() {
        this.loading = true;
        this.$store
          .dispatch('ASSETS1002Store/update', this.baseInfo)
          .then(response => {
            this.data = response;
            this.loading = false;
            Message({
              message: this.$t('normal.success_02'),
              type: 'success',
              duration: 5 * 1000,
            });
            if (this.$store.getters.historyUrl) {
              this.$router.push(this.$store.getters.historyUrl);
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
      },
      buttonClick(val) {
        this.$refs['ruleForm'].validate(valid => {
          if (valid) {
            //add gbb 20200807 创建盘点计划时选择资产数据
            if(this.$refs.roletable.selectedList.length === 0){
                Message({
                    message: this.$t('normal.info_01'),
                    type: 'info',
                    duration: 5 * 1000,
                });
                return;
            }
            this.form.inventorycycle = moment(this.form.inventorycycle[0]).format('YYYY-MM-DD') + ' ~ ' + moment(this.form.inventorycycle[1]).format('YYYY-MM-DD');
            this.form.userid = this.userlist;
            this.baseInfo = {};
            if (val === 'save') {
              this.baseInfo.inventoryplan = JSON.parse(JSON.stringify(this.form));
              this.baseInfo.inventoryRange = this.$refs.roletable.selectedList;
              this.baseInfo.inventoryResults = this.$refs.roletable.selectedList;
              this.loading = true;
              this.$store
                .dispatch('ASSETS1002Store/insert', this.baseInfo)
                .then(response => {
                  this.data = response;
                  this.loading = false;
                  Message({
                    message: this.$t('normal.success_01'),
                    type: 'success',
                    duration: 5 * 1000,
                  });
                  if (this.$store.getters.historyUrl) {
                    this.$router.push(this.$store.getters.historyUrl);
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
            }
          }
          if (val === 'vResult') {
            if(this.$refs.roletable.selectedList.length === 0){
              Message({
                message: this.$t('normal.info_01'),
                type: 'info',
                duration: 5 * 1000,
              });
              return;
            }

            for(let i = 0; i < this.$refs.roletable.selectedList.length; i ++){
              let jsonAnt = {};
              jsonAnt.barcode = this.$refs.roletable.selectedList[i].barcode;
              jsonAnt.inventoryplan_id = this.$refs.roletable.selectedList[i].inventoryplan_id;
              this.selectedList.push(jsonAnt)
            }
            this.idBack = this.$refs.roletable.selectedList[0].inventoryplan_id;
            this.$router.push({
              name: 'ASSETS1002ExportFormView',
              params: {
                _id:this.selectedList,
                _idBack:this.idBack,
              },
            });
          }
          if (val === 'trash' || val === 'end') {
            let resultFlg = '';
            if (val === 'end') {
              resultFlg = '2';
            } else {
              resultFlg = '3';
            }
            this.form.status = resultFlg;
            this.baseInfo.inventoryplan = JSON.parse(JSON.stringify(this.form));
            this.baseInfo.inventoryRange = this.$refs.roletable.selectedList;
            this.getUpdate();
          }
            if (val === 'pause' || val === 'start') {
              let resultFlg = '';
              if (val === 'start') {
                resultFlg = '0';
              } else {
                resultFlg = '4';
              }
              this.form.status = resultFlg;
              this.baseInfo.inventoryplan = JSON.parse(JSON.stringify(this.form));
              this.baseInfo.inventoryRange = this.$refs.roletable.selectedList;
              this.getUpdate();
            }
        });
      },
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .assets1002 {
    .row_height {
      height: 30px;
      font-size: 0.8rem;
      padding: 0px;
    }
  }
</style>
