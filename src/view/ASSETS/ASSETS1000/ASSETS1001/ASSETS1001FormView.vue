<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :title="title" @buttonClick="buttonClick" ref="container"
                         v-loading="loading">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="top" label-width="8vw"
                 ref="ruleForm" style="padding: 2vw">
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
              <el-form-item :label="$t('label.ASSETS1001VIEW_STOCKSTATUS')">
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
              <el-form-item :label="$t('label.ASSETS1001VIEW_ASSETSTATUS')">
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
              <el-form-item :error="error" :label="$t('label.ASSETS1001VIEW_PRINCIPAL')">
                <user :error="error" :selectType="selectType" :userlist="userlist"
                      @getUserids="getUserids" style="width: 20vw"></user>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('label.ASSETS1001VIEW_BARCODE')">
                <el-input style="width:20vw" v-model="form.barcode"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-collapse v-show="form.typeassets">
            <el-collapse-item v-show="form.typeassets === 'PA001001'">
              <template slot="title">
                <span class="collapse_Title">{{collapseName}}</span>
              </template>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.ASSETS1001VIEW_PCNO')">
                    <el-input style="width:20vw" v-model="form.pcno"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.ASSETS1001VIEW_REALPRICE')">
                    <el-input-number :max="9999" :min="0" :precision="2" :step="1"
                                     controls-position="right" style="width:20vw" v-model="form.realprice"></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.ASSETS1001VIEW_MODEL')">
                    <el-input style="width:20vw" v-model="form.model"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.ASSETS1001VIEW_PURCHASETIME')">
                    <el-date-picker style="width:20vw" type="date"
                                    v-model="form.purchasetime"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.ASSETS1001VIEW_USEDEPARTMENT')">
                    <el-input style="width:20vw" v-model="form.usedepartment"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.ASSETS1001VIEW_REMARKS')">
                    <el-input style="width:20vw" v-model="form.remarks"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.ASSETS1001VIEW_PRICE')" prop="price">
                    <el-input-number :max="9999" :min="0" :precision="2" :step="1"
                                     controls-position="right" style="width:20vw" v-model="form.price"></el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-collapse-item>
            <el-collapse-item v-show="form.typeassets === 'PA001002' || form.typeassets === 'PA001003' || form.typeassets === 'PA001004'">
              <template slot="title">
                <span class="collapse_Title">{{collapseName}}</span>
              </template>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.ASSETS1001VIEW_REMARKS1')">
                    <el-input style="width:20vw" v-model="form.remarks"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.ASSETS1001VIEW_NO')">
                    <el-input style="width:20vw" v-model="form.no"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.ASSETS1001VIEW_ACTIVITIONDATE')">
                    <el-date-picker style="width:20vw" type="date"
                                    v-model="form.activitiondate"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.ASSETS1001VIEW_ASSETNUMBER')">
                    <el-input style="width:20vw" v-model="form.assetnumber"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.ASSETS1001VIEW_ORIPRICE')" prop="price">
                    <el-input-number :max="9999" :min="0" :precision="2" :step="1"
                                     controls-position="right" style="width:20vw" v-model="form.price"></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.ASSETS1001VIEW_MODEL')">
                    <el-input style="width:20vw" v-model="form.model"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.ASSETS1001VIEW_ADDRESS')">
                    <el-input style="width:20vw" v-model="form.address"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.ASSETS1001VIEW_PSDCDDEBITSITUATION')">
                    <el-input style="width:20vw" v-model="form.psdcddebitsituation"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.ASSETS1001VIEW_PSDCDBRINGOUTREASON')">
                    <el-input style="width:20vw" v-model="form.psdcdbringoutreason"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.ASSETS1001VIEW_PSDCDPERIOD')">
                    <el-input style="width:20vw" v-model="form.psdcdperiod"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.ASSETS1001VIEW_PSDCDCOUNTERPARTY')">
                    <el-input style="width:20vw" v-model="form.psdcdcounterparty"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.ASSETS1001VIEW_PSDCDRESPONSIBLE')">
                    <el-input style="width:20vw" v-model="form.psdcdresponsible"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.ASSETS1001VIEW_PSDCDRETURNCONFIRMATION')">
                    <el-input style="width:20vw" v-model="form.psdcdreturnconfirmation"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-collapse-item>
            <el-collapse-item v-show="form.typeassets === 'PA001005' || form.typeassets === 'PA001006'">
              <template slot="title">
                <span class="collapse_Title">{{collapseName}}</span>
              </template>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.ASSETS1001VIEW_TONGGUANNO')">
                    <el-input style="width:20vw" v-model="form.pcno"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.ASSETS1001VIEW_MODEL')">
                    <el-input style="width:20vw" v-model="form.model"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.ASSETS1001VIEW_PRICE')" prop="price">
                    <el-input-number :max="9999" :min="0" :precision="2" :step="1"
                                     controls-position="right" style="width:20vw" v-model="form.price"></el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.ASSETS1001VIEW_HSCODE')">
                    <el-input style="width:20vw" v-model="form.no"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.ASSETS1001VIEW_INTIME')">
                    <el-date-picker style="width:20vw" type="date"
                                    v-model="form.purchasetime"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item :label="$t('label.ASSETS1001VIEW_YANQIDATE')">
                    <el-date-picker style="width:20vw" type="date"
                                    v-model="form.activitiondate"></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item :label="$t('label.ASSETS1001VIEW_REMARKS')">
                    <el-input style="width:20vw" v-model="form.remarks"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-collapse>
                  <el-collapse-item>
                    <template slot="title">
                      <span class="collapse_Title">入荷確認</span>
                    </template>
                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.ASSETS1001VIEW_PARAM1')">
                          <el-switch style="width:20vw" v-model="form.inparams1"active-value="1"
                                     inactive-value="0"></el-switch>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.ASSETS1001VIEW_PARAM2')">
                          <el-switch style="width:20vw" v-model="form.inparams2"active-value="1"
                                     inactive-value="0"></el-switch>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.ASSETS1001VIEW_PARAM3')">
                          <user :selectType="selectType" :userlist="form.inparams3"
                                @getUserids="getinparams3" style="width: 20vw"></user>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.ASSETS1001VIEW_PARAM4')">
                          <el-date-picker style="width:20vw" type="date"
                                          v-model="form.inparams4"></el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.ASSETS1001VIEW_PARAM5')">
                          <el-switch style="width:20vw" v-model="form.inparams5"active-value="1"
                                     inactive-value="0"></el-switch>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.ASSETS1001VIEW_PARAM6')">
                          <user :selectType="selectType" :userlist="form.inparams6"
                                @getUserids="getinparams6" style="width: 20vw"></user>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.ASSETS1001VIEW_PARAM4')">
                          <el-date-picker style="width:20vw" type="date"
                                          v-model="form.inparams7"></el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.ASSETS1001VIEW_PARAM7')">
                          <el-input style="width:20vw" v-model="form.inparams8"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                    </el-row>
                  </el-collapse-item>
                  <el-collapse-item>
                    <template slot="title">
                      <span class="collapse_Title">出荷確認</span>
                    </template>
                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.ASSETS1001VIEW_PARAM5')">
                          <el-input style="width:20vw" v-model="form.outparams1"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.ASSETS1001VIEW_PARAM8')">
                          <user :selectType="selectType" :userlist="form.outparams2"
                                @getUserids="getoutparams2" style="width: 20vw"></user>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.ASSETS1001VIEW_PARAM4')">
                          <el-date-picker style="width:20vw" type="date"
                                          v-model="form.outparams3"></el-date-picker>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.ASSETS1001VIEW_PARAM9')">
                          <el-switch style="width:20vw" v-model="form.outparams4"active-value="1"
                                     inactive-value="0"></el-switch>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.ASSETS1001VIEW_PARAM10')">
                          <el-switch style="width:20vw" v-model="form.outparams5"active-value="1"
                                     inactive-value="0"></el-switch>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.ASSETS1001VIEW_PARAM11')">
                          <el-switch style="width:20vw" v-model="form.outparams6"active-value="1"
                                     inactive-value="0"></el-switch>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.ASSETS1001VIEW_PARAM6')">
                          <user :selectType="selectType" :userlist="form.outparams7"
                                @getUserids="getoutparams7" style="width: 20vw"></user>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.ASSETS1001VIEW_PARAM3')">
                          <user :selectType="selectType" :userlist="form.outparams8"
                                @getUserids="getoutparams8" style="width: 20vw"></user>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.ASSETS1001VIEW_PARAM4')">
                          <el-date-picker style="width:20vw" type="date"
                                          v-model="form.outparams9"></el-date-picker>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.ASSETS1001VIEW_PARAM12')">
                          <el-switch style="width:20vw" v-model="form.outparams10"active-value="1"
                                     inactive-value="0"></el-switch>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.ASSETS1001VIEW_PARAM13')">
                          <user :selectType="selectType" :userlist="form.outparams11"
                                @getUserids="getoutparams11" style="width: 20vw"></user>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.ASSETS1001VIEW_PARAM14')">
                          <user :selectType="selectType" :userlist="form.outparams12"
                                @getUserids="getoutparams12" style="width: 20vw"></user>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.ASSETS1001VIEW_PARAM4')">
                          <el-date-picker style="width:20vw" type="date"
                                          v-model="form.outparams13"></el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item :label="$t('label.ASSETS1001VIEW_PARAM7')">
                          <el-input style="width:20vw" v-model="form.outparams14"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-collapse-item>
                </el-collapse>
              </el-row>
            </el-collapse-item>
          </el-collapse>
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
  import {getDictionaryInfo, getOrgInfoByUserId, getUserInfo} from '@/utils/customize';

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
          typeassets: '',
          bartype: ''
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
        collapseName: '',
      };
    },
    mounted() {
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('ASSETS1001Store/getOneInfo', {'assets_id': this.$route.params._id})
          .then(response => {
            this.form = response;
            this.userlist = this.form.principal;
            let letErrortype = getDictionaryInfo(this.form.typeassets);
            if (letErrortype != null) {
              this.collapseName = letErrortype.value1;
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
      }
    },
    created() {
      this.disable = this.$route.params.disabled;
      if (this.disable) {
        if (this.$route.params._id) {
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
        } else {
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
      getinparams3(val) {
        this.form.inparams3 = val;
      },
      getinparams6(val) {
        this.form.inparams6 = val;
      },
      getoutparams2(val) {
        this.form.outparams2 = val;
      },
      getoutparams7(val) {
        this.form.outparams7 = val;
      },
      getoutparams8(val) {
        this.form.outparams8 = val;
      },
      getoutparams11(val) {
        this.form.outparams11 = val;
      },
      getoutparams12(val) {
        this.form.outparams12 = val;
      },
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
          this.collapseName = letErrortype.value1;
        }

      },
      getSave() {
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
            if (val === 'save') {
              this.getSave();
            }
            if (val === 'savePrt') {
              this.getSave();
            }
            if (val === 'printing') {
            }
          }
        });
      },
    },
  };
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
