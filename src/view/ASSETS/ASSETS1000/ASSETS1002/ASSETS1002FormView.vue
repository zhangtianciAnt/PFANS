<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" v-loading="loading" :title="title" @buttonClick="buttonClick"
                         @end="end" @start="start" @workflowState="workflowState" ref="container">
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
  import {getOrgInfoByUserId} from '@/utils/customize';
  import moment from 'moment';
  import {getDictionaryInfo} from '../../../../utils/customize';

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
        title: 'title.ASSETS1002FORMVIEW',
        buttonList: [],
        form: {
          inventorycycle: '',
          userid: '',
        },
        tableD: [
          {
            filename: '',
            typeassets: '',
            price: '',
            purchasetime: '',
            usedepartment: '',
            principal: '',
          }
        ],
      };
    },
    mounted() {
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS2016Store/getPfans2016One', {'abnormalid': this.$route.params._id})
          .then(response => {
            this.form = response;
            this.userlist = this.form.user_id;
            this.relation = this.form.relation;
            if (this.form.status === '2') {
              this.disable = false;
            }
            this.getOvertimelist();
            if (this.form.uploadfile != '') {
              let uploadfile = this.form.uploadfile.split(';');
              for (var i = 0; i < uploadfile.length; i++) {
                if (uploadfile[i].split(',')[0] != '') {
                  let o = {};
                  o.name = uploadfile[i].split(',')[0];
                  o.url = uploadfile[i].split(',')[1];
                  this.fileList.push(o);
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
      } else {
        this.userlist = this.$store.getters.userinfo.userid;
        if (this.userlist !== null && this.userlist !== '') {
          let lst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
          this.form.centerid = lst.centerNmae;
          this.form.groupid = lst.groupNmae;
          this.form.teamid = lst.teamNmae;
          this.form.user_id = this.$store.getters.userinfo.userid;
        }
        this.getOvertimelist();
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
          {
            key: 'save',
            name: '保存并打印',
            icon: 'el-icon-check',
          },
          {
            key: 'printing',
            name: 'button.printing',
            icon: 'el-icon-check',
          },
        ];
      }
    },
    methods: {
      getOvertimelist() {
        this.loading = true;
        this.$store
          .dispatch('PFANS2016Store/getOvertimelist', {userid: this.userlist, actualsubstitutiondate: null})
          .then(response => {
            let letrelation = [];
            for (let j = 0; j < response.length; j++) {
              response[j].reserveovertimedate = moment(response[j].reserveovertimedate).format('YYYY-MM-DD');
              let getOvertimetype = getDictionaryInfo(response[j].overtimetype);
              if (getOvertimetype !== null && getOvertimetype.code === 'PR013002') {
                response[j].overtimetype = getOvertimetype.value1;
              }
              if (this.relation) {
                this.showWeekend = true;
                let a = this.relation.split(',');
                for (let i = 0; i < a.length; i++) {
                  if (a[i] === response[j].overtimeid) {
                    letrelation.push(response[j]);
                  }
                }
              }
            }
            if (letrelation.length > 0) {
              this.options = letrelation;
              this.form.relation = this.options;
            } else {
              this.options = response;
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
      getUserids(val) {
        this.form.user_id = val;
        let lst = getOrgInfoByUserId(val);
        this.form.centerid = lst.centerNmae;
        this.form.groupid = lst.groupNmae;
        this.form.teamid = lst.teamNmae;
        if (!this.form.user_id || this.form.user_id === '' || val === 'undefined') {
          this.error = this.$t('normal.error_08') + this.$t('label.applicant');
        } else {
          this.error = '';
        }
      },
      getErrorType(val) {
        let dictionaryInfo = getDictionaryInfo(val);
        if (dictionaryInfo) {
          this.form.enclosureexplain = dictionaryInfo.value2;
        }
        this.form.errortype = val;
      },
      workflowState(val) {
        if (val.state === '1') {
          this.form.status = '3';
        } else if (val.state === '2') {
          this.form.status = '4';
        }
        this.buttonClick('update');
      },
      start() {
        this.form.status = '2';
        this.buttonClick('update');
      },
      end() {
        this.form.status = '0';
        this.buttonClick('update');
      },
      buttonClick(val) {
        this.$refs['ruleForm'].validate(valid => {
          if (valid) {
            let letrelation = '';
            for (let j = 0; j < this.form.relation.length; j++) {
              letrelation = letrelation + ',' + this.form.relation[j];
            }
            this.form.relation = letrelation.substring(1, letrelation.length);
            if (this.$route.params._id) {
              this.form.abnormalid = this.$route.params._id;
              this.loading = true;
              this.$store
                .dispatch('PFANS2016Store/updatePfans2016', this.form)
                .then(response => {
                  this.data = response;
                  this.loading = false;
                  if (val !== 'update') {
                    Message({
                      message: this.$t('normal.success_02'),
                      type: 'success',
                      duration: 5 * 1000,
                    });
                    if (this.$store.getters.historyUrl) {
                      this.$router.push(this.$store.getters.historyUrl);
                    }
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
              this.loading = true;
              this.$store
                .dispatch('PFANS2016Store/createPfans2016', this.form)
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
        });
      },
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
