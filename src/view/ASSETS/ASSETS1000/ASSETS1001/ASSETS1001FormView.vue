<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" v-loading="loading" :title="title" @buttonClick="buttonClick"
                         ref="container">
      <div slot="customize">
        <el-form :model="form" label-position="top" label-width="8vw" ref="ruleForm"
                 style="padding: 2vw" :rules="rules">
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.ASSETS1001VIEW_TYPEASSETS')" prop="typeassets">
                <dicselect
                  :code="code1"
                  :data="form.typeassets"
                  :multiple="multiple"
                  @change="getTypeassets"
                  style="width:20vw">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.ASSETS1001VIEW_STOCKSTATUS')" prop="stockstatus">
                <dicselect
                  :code="code2"
                  :data="form.stockstatus"
                  :multiple="multiple"
                  @change="getStockstatus"
                  style="width:20vw">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.ASSETS1001VIEW_ASSETSTATUS')" prop="assetstatus">
                <dicselect
                  :code="code3"
                  :data="form.assetstatus"
                  :multiple="multiple"
                  @change="getAssetstatus"
                  style="width:20vw">
                </dicselect>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.ASSETS1001VIEW_FILENAME')" prop="filename">
                <el-input style="width:20vw" v-model="form.filename"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.ASSETS1001VIEW_BARTYPE')" prop="bartype">
                <dicselect
                  :code="code4"
                  :data="form.bartype"
                  :multiple="multiple"
                  @change="getBartype"
                  style="width:20vw">
                </dicselect>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.ASSETS1001VIEW_PURCHASETIME')" prop="purchasetime">
                <el-date-picker style="width:20vw" type="date"
                                v-model="form.purchasetime"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.ASSETS1001VIEW_PRICE')" prop="price">
                <el-input-number :min="0" :precision="2" :max="9999" controls-position="right"
                                 :step="1" style="width:20vw" v-model="form.price"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('label.ASSETS1001VIEW_USEDEPARTMENT')" prop="usedepartment">
                <el-input :disabled="true" style="width:20vw" v-model="form.usedepartment"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :error="error" :label="$t('label.ASSETS1001VIEW_PRINCIPAL')" prop="principal">
                <user :error="error" :selectType="selectType" :userlist="userlist"
                      @getUserids="getUserids" style="width: 20vw"></user>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.ASSETS1001VIEW_BARCODE')" prop="usedepartment">
                <el-input style="width:20vw" v-model="form.barcode"></el-input>
              </el-form-item>
           </el-col>
          </el-row>
          <!--<el-collapse :v-show="form.typeassets">-->
            <!--<el-collapse-item :v-show="form.typeassets === 'PA001002'">-->
              <!--<template slot="title">-->
                <!--<span  class="collapse_Title">{{collapseName}}</span>-->
              <!--</template>-->
            <!--</el-collapse-item>-->
          <!--</el-collapse>-->
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
  import {getOrgInfoByUserId} from '@/utils/customize';
  import {getDictionaryInfo, getUserInfo} from '@/utils/customize';
  export default {
    name: 'ASSETS1001FormView',
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
        selectType: 'Single',
        userlist: '',
        title: 'title.ASSETS1001FORMVIEW',
        buttonList: [],
        form: {
          filename: '',
          typeassets: '',
          price: '',
          purchasetime: moment(new Date()).format('YYYY-MM-DD'),
          usedepartment: '',
          principal: '',
          assetstatus: '',
          stockstatus: '',
          barcode: '',
          bartype: '',
        },
        code1: 'PA001',
        code2: 'PA002',
        code3: 'PA003',
        code4: 'PA004',
        multiple: false,
        rules: {
          filename: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.ASSETS1001VIEW_FILENAME'),
            trigger: 'change',
          }],
          bartype: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.ASSETS1001VIEW_BARTYPE'),
            trigger: 'change',
          }],
          typeassets: [{
            required: true,
            message: this.$t('normal.error_09') + this.$t('label.ASSETS1001VIEW_TYPEASSETS'),
            trigger: 'change',
          }],
        },
        collapseName:'',
      };
    },
    mounted() {
      console.log("11111111111111")
      console.log(this.form.typeassets)
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('ASSETS1001Store/getOneInfo', {'assets_id': this.$route.params._id})
          .then(response => {
            this.form = response;
            this.userlist = this.form.principal;
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
        this.form.principal = this.$store.getters.userinfo.userid;
        if (this.userlist !== null && this.userlist !== '') {
          let lst = getOrgInfoByUserId(this.$store.getters.userinfo.userid);
          this.form.usedepartment = lst.centerNmae;
        }
      }
    },
    created() {
      this.disable = this.$route.params.disabled;
      if (this.disable) {
        if (this.$route.params._id){
          this.buttonList = [
            {
              key: 'save',
              name: 'button.save',
              icon: 'el-icon-check',
            },
            {
              key: 'savePrt',
              name: 'button.savePrt',
              icon: 'el-icon-check',
            },
            {
              key: 'printing',
              name: 'button.printing',
              icon: 'el-icon-printer',
            },
          ];
        }else{
          this.buttonList = [
            {
              key: 'save',
              name: 'button.save',
              icon: 'el-icon-check',
            },
            {
              key: 'savePrt',
              name: 'button.savePrt',
              icon: 'el-icon-check',
            }
          ];
        }

      }
    },
    methods: {
      getUserids(val) {
        this.form.principal = val;
        this.userlist = val;
        if (this.userlist !== null && this.userlist !== '') {
          let lst = getOrgInfoByUserId(val);
          this.form.usedepartment = lst.centerNmae;
        }
        if (!this.form.principal || this.form.principal === '' || val === 'undefined') {
          this.error = this.$t('normal.error_09') + this.$t('label.ASSETS1001VIEW_PRINCIPAL');
        } else {
          this.error = '';
        }
      },
      getStockstatus(val) {
        this.form.stockstatus = val;
      },
      getAssetstatus(val) {
        this.form.assetstatus = val;
      },
      getBartype(val) {
        this.form.bartype = val;
      },
      getTypeassets(val) {
        this.form.typeassets = val;
        let letErrortype = getDictionaryInfo(val);
        if (letErrortype != null) {
          this.collapseName =  letErrortype.value1;
        }

      },
      getSave(){
        if (this.$route.params._id) {
          this.loading = true;
          this.$store
            .dispatch('ASSETS1001Store/getUpdateInfo', this.form)
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
          this.loading = true;
          this.$store
            .dispatch('ASSETS1001Store/getInsertInfo', this.form)
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
      },
      buttonClick(val) {
        this.$refs['ruleForm'].validate(valid => {
          if (valid) {
            if(val === 'save'){
              this.getSave();
            }
            if(val === 'savePrt'){
              this.getSave();
            }
            if(val === 'printing'){
            }
          }
        });
      },
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
