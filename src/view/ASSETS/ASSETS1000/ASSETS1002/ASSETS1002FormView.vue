<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" v-loading="loading" :title="title" @buttonClick="buttonClick"
                         ref="container">
      <div slot="customize">
        <el-form :model="form" label-position="left" label-width="8rem" ref="ruleForm"
                 style="padding: 2rem">
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('label.ASSETS1001VIEW_STOCKSTATUS')" prop="inventorycycle">
                <el-date-picker
                  v-model="form.inventorycycle"
                  type="daterange"
                  :range-separator="$t('label.PFANSUSERFORMVIEW_TO')"
                  :start-placeholder="$t('label.startdate')"
                  :end-placeholder="$t('label.enddate')">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item :label="$t('label.ASSETS1001VIEW_PRINCIPAL')" prop="userid">
                <user :error="error" :selectType="selectType" :userlist="userlist"
                      @getUserids="getUserids" style="width: 10.1rem"></user>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <span>{{$t('label.ASSETS1002FORMVIEW_INVENTORYRANGE')}}</span>
            <el-table :data="tableD" header-cell-class-name="sub_bg_color_grey height">
              <el-table-column reserve-selection type="selection" width="55"></el-table-column>
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
  import {getUserInfo} from '@/utils/customize';

  export default {
    name: 'ASSETS1002FormView',
    components: {
      EasyNormalContainer,
      ASSETS1001View,
      dicselect,
      user,
    },
    data() {
      return {
        loading: false,
        error: '',
        userlist: '',
        selectType: 'Single',
        title: 'title.ASSETS1002FORMVIEW',
        buttonList: [],
        form: {
          inventorycycle: '',
          userid: '',
        },
        tableD: [
          {
            // assets_id: '',
            // inventoryplan_id: '',
            filename: '',
            typeassets: '',
            price: '',
            purchasetime: '',
            usedepartment: '',
            principal: '',
          },
        ],
        baseInfo: {},
      };
    },
    mounted() {
      this.userlist = this.$store.getters.userinfo.userid;
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
    created() {
      this.disable = this.$route.params.disabled;
      if (this.disable) {
        this.buttonList = [
          {
            key: 'save',
            name: 'button.save',
            icon: 'el-icon-check',
          },
          {
            key: 'result',
            name: '查看结果',
            icon: 'el-icon-check',
          },
        ];
      }
    },
    methods: {
      getUserids(val) {
        this.form.user_id = val;
        if (!this.form.user_id || this.form.user_id === '' || val === 'undefined') {
          this.error = this.$t('normal.error_08') + this.$t('label.applicant');
        } else {
          this.error = '';
        }
      },
      buttonClick(val) {
        this.$refs['ruleForm'].validate(valid => {
          if (valid) {
            this.loading = true;
            if (val === 'save') {
              if (this.$route.params._id) {
                this.$store
                  .dispatch('ASSETS1002Store/update', this.form)
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
              } else {
                this.$store
                  .dispatch('ASSETS1002Store/insert', this.form)
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
            } /*else if (val === 'result') {
          }*/
          }
        });
      },
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
