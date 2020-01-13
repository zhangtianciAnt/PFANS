<template>
  <div style="min-height: 100%" class="assets1002">
    <EasyNormalContainer :buttonList="buttonList" :title="title" @buttonClick="buttonClick" ref="container"
                         v-loading="loading">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="ruleForm" style="padding: 2vw">
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
            <span>{{$t('label.ASSETS1002FORMVIEW_INVENTORYRANGE')}}</span>
            <el-table :data="tableD" @selection-change="selectionChange" height="400" border
                      header-cell-class-name="sub_bg_color_blue" @row-click="rowClick" cell-class-name = "row_height">
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column :label="$t('label.ASSETS1001VIEW_FILENAME')" align="center" prop="filename">
              </el-table-column>
              <el-table-column :label="$t('label.ASSETS1001VIEW_TYPEASSETS')" align="center" prop="typeassets">
              </el-table-column>
              <el-table-column :label="$t('label.ASSETS1001VIEW_PRICE')" align="center" prop="price">
              </el-table-column>
              <el-table-column :label="$t('label.ASSETS1001VIEW_PURCHASETIME')" align="center" prop="purchasetime">
              </el-table-column>
              <el-table-column :label="$t('label.ASSETS1001VIEW_USEDEPARTMENT')" align="center" prop="usedepartment">
              </el-table-column>
              <el-table-column :label="$t('label.ASSETS1001VIEW_PRINCIPAL')" align="center" prop="principal">
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
          this.$store
            .dispatch('ASSETS1002Store/check', {'inventorycycle':moment(this.form.inventorycycle[0]).format('YYYY-MM-DD') + ' ~ ' + moment(this.form.inventorycycle[1]).format('YYYY-MM-DD'),
            'inventoryplan_id':this.$route.params._id})
            .then(response => {
              this.data = response;
              if(this.data === 1){
                callback(this.$t('normal.error_plandate'));
              }else{
                callback();
              }
            })
            .catch(error => {
              Message({
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
        loading: false,
        error: '',
        userlist: '',
        selectType: 'Single',
        title: 'title.ASSETS1002FORMVIEW',
        buttonList: [],
        form: {
          inventorycycle: [],
          userid: '',
          status: ''
        },
        tableD: [
          {
            filename: '',
            typeassets: '',
            price: '',
            purchasetime: '',
            usedepartment: '',
            principal: '',
          },
        ],
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
        this.getSelectAll();
      }
    },
    created() {
      this.disable = this.$route.params.disabled;
      if (this.disable) {
        this.buttonList = [
          {
            key: 'save',
            name: 'button.save',
            icon: 'el-icon-check',
          },
        ];
      } else {
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
              this.tableD = response.inventoryRange;
              for (let j = 0; j < response.inventoryRange.length; j++) {
                let user = getUserInfo(response.inventoryRange[j].principal);
                if (user) {
                  response.inventoryRange[j].principal = user.userinfo.customername;
                  response.inventoryRange[j].usedepartment = user.userinfo.centername;
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
              }
            }
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
          .dispatch('ASSETS1002Store/selectAll', {})
          .then(response => {
            for (let j = 0; j < response.length; j++) {
              let user = getUserInfo(response[j].principal);
              if (user) {
                response[j].principal = user.userinfo.customername;
                response[j].usedepartment = user.userinfo.centername;
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
            }
            this.tableD = response;
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
      getUserids(val) {
        this.form.user_id = val;
        this.userlist = val;
        if (!this.form.user_id || this.form.user_id === '' || val === 'undefined') {
          this.error = this.$t('normal.error_09') + this.$t('label.ASSETS1002VIEW_USERID');
        } else {
          this.error = '';
        }
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
            Message({
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
            this.form.inventorycycle = moment(this.form.inventorycycle[0]).format('YYYY-MM-DD') + ' ~ ' + moment(this.form.inventorycycle[1]).format('YYYY-MM-DD');
            this.form.userid = this.userlist;
            this.baseInfo = {};
            if (val === 'save') {
              this.baseInfo.inventoryplan = JSON.parse(JSON.stringify(this.form));
              this.baseInfo.inventoryRange = this.multipleSelection;
              this.baseInfo.inventoryResults = this.multipleSelection;
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
                  Message({
                    message: error,
                    type: 'error',
                    duration: 5 * 1000,
                  });
                  this.loading = false;
                });
            }
          }
          if (val === 'vResult') {
            this.$router.push({
              name: 'ASSETS1002ExportFormView',
              params: {
                _id: this.$route.params._id,
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
            this.baseInfo.inventoryRange = this.multipleSelection;
            this.getUpdate();
          }
        });
      },
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  .assets1002{
    .row_height {
      height: 30px;
      font-size: 0.8rem;
      padding: 0px;
    }
  }
</style>
