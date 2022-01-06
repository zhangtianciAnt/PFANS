<template>
  <div style="min-height: 100%">
    <EasyNormalContainer
      ref="container"
      v-loading="loading"
      :buttonList="buttonList"
      :title="title"
      @buttonClick="buttonClick"
    >
      <div slot="customize">
        <el-form ref="refform" label-position="top" label-width="8vw"
                 style="padding: 2vw">

          <el-row style="padding-top: 2%;padding-bottom: 2%">
            <el-col :span="6">
              <el-form-item :label="$t('label.PFANS1036FORMVIEW_BUSINESSYEAR')" prop="year">
                <div class="block">
                  <el-date-picker
                    v-model="refform.year"
                    :disabled="true"
                    style="width: 18vw"
                    type="year">
                  </el-date-picker>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="$t('label.department')">
                <org :disabled="true"
                     :orglist="refform.groupid"
                     orgtype="2"
                     style="width: 20vw"
                ></org>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-table :data="tableDataA" border border
                      header-cell-class-name="sub_bg_color_blue" highlight-current-row lazy max-height="400"
                      row-key="rowid"
                      stripe
                      style="width: 100%"
                      tooltip-effect="dark">
              <el-table-column :label="$t('label.PFANS1043FORMVIEW_THEMENAME')"
                               align="center" width="230">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.themename"
                    :disabled="true">
                  </el-input>
                </template>
              </el-table-column>

              <!--分野-->
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_TEAM')" align="center" width="230">
                <template slot-scope="scope">
                  <dicselect
                    :code="code3"
                    :data="scope.row.branch"
                    :disabled="true"
                    :no="scope.row"
                  ></dicselect>
                </template>
              </el-table-column>
              <!--种类-->
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_KIND')" align="center" width="150">
                <template slot-scope="scope">
                  <dicselect
                    :code="code2"
                    :data="scope.row.kind"
                    :disabled="true"
                    :no="scope.row"
                  ></dicselect>
                </template>
              </el-table-column>

              <!--通貨種別-->
              <el-table-column :label="$t('label.PFANS1039FORMVIEW_CURRENCYTYPE')" align="center" width="200">
                <template slot-scope="scope">
                  <monthlyrate :data="scope.row.currencytype"
                               :disabled="true"
                               :month="month"
                               :no="scope.row">
                  </monthlyrate>
                </template>
              </el-table-column>

              <!--本事业年度-->
              <el-table-column :label="$t('label.April')" align="center" width="280">

                <el-table-column :label="$t('label.PFANS1049FORMVIEW_PLANAMOUNT')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.amount4" :disabled="true"
                                     :max="10000000000"
                                     :min="0"
                                     :precision="2" controls-position="right" style="width: 100%">
                    </el-input-number>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1049FORMVIEW_AMOUNT')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number v-if="show4" v-model="scope.row.planamount4"
                                     :disabled="disabled"
                                     :max="10000000000"
                                     :min="0"
                                     :precision="2" controls-position="right" style="width: 100%">
                    </el-input-number>
                    <el-input-number v-else v-model="scope.row.planamount4" :disabled="true"
                                     :max="10000000000"
                                     :min="0"
                                     :precision="2" controls-position="right" style="width: 100%">
                    </el-input-number>
                  </template>
                </el-table-column>

              </el-table-column>
              <el-table-column :label="$t('label.May')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1049FORMVIEW_PLANAMOUNT')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.amount5" :disabled="true"
                                     :max="10000000000"
                                     :min="0"
                                     :precision="2" controls-position="right" style="width: 100%">
                    </el-input-number>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1049FORMVIEW_AMOUNT')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number v-if="show5" v-model="scope.row.planamount5"
                                     :disabled="disabled"
                                     :max="10000000000"
                                     :min="0"
                                     :precision="2" controls-position="right" style="width: 100%">
                    </el-input-number>
                    <el-input-number v-else v-model="scope.row.planamount5" :disabled="true"
                                     :max="10000000000"
                                     :min="0"
                                     :precision="2" controls-position="right" style="width: 100%">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.June')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1049FORMVIEW_PLANAMOUNT')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.amount6" :disabled="true"
                                     :max="10000000000"
                                     :min="0"
                                     :precision="2" controls-position="right" style="width: 100%">
                    </el-input-number>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1049FORMVIEW_AMOUNT')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number v-if="show6" v-model="scope.row.planamount6"
                                     :disabled="disabled"
                                     :max="10000000000"
                                     :min="0"
                                     :precision="2" controls-position="right" style="width: 100%">
                    </el-input-number>
                    <el-input-number v-else v-model="scope.row.planamount6" :disabled="true"
                                     :max="10000000000"
                                     :min="0"
                                     :precision="2" controls-position="right" style="width: 100%">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.July')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1049FORMVIEW_PLANAMOUNT')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.amount7" :disabled="true"
                                     :max="10000000000"
                                     :min="0"
                                     :precision="2" controls-position="right" style="width: 100%">
                    </el-input-number>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1049FORMVIEW_AMOUNT')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number v-if="show7" v-model="scope.row.planamount7"
                                     :disabled="disabled"
                                     :max="10000000000"
                                     :min="0"
                                     :precision="2" controls-position="right" style="width: 100%">
                    </el-input-number>
                    <el-input-number v-else v-model="scope.row.planamount7" :disabled="true"
                                     :max="10000000000"
                                     :min="0"
                                     :precision="2" controls-position="right" style="width: 100%">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.August')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1049FORMVIEW_PLANAMOUNT')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.amount8" :disabled="true"
                                     :max="10000000000"
                                     :min="0"
                                     :precision="2" controls-position="right" style="width: 100%">
                    </el-input-number>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1049FORMVIEW_AMOUNT')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number v-if="show8" v-model="scope.row.planamount8"
                                     :disabled="disabled"
                                     :max="10000000000"
                                     :min="0"
                                     :precision="2" controls-position="right" style="width: 100%">
                    </el-input-number>
                    <el-input-number v-else v-model="scope.row.planamount8" :disabled="true"
                                     :max="10000000000"
                                     :min="0"
                                     :precision="2" controls-position="right" style="width: 100%">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.September')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1049FORMVIEW_PLANAMOUNT')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.amount9" :disabled="true"
                                     :max="10000000000"
                                     :min="0"
                                     :precision="2" controls-position="right" style="width: 100%">
                    </el-input-number>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1049FORMVIEW_AMOUNT')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number v-if="show9" v-model="scope.row.planamount9"
                                     :disabled="disabled"
                                     :max="10000000000"
                                     :min="0"
                                     :precision="2" controls-position="right" style="width: 100%">
                    </el-input-number>
                    <el-input-number v-else v-model="scope.row.planamount9" :disabled="true"
                                     :max="10000000000"
                                     :min="0"
                                     :precision="2" controls-position="right" style="width: 100%">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.October')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1049FORMVIEW_PLANAMOUNT')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.amount10" :disabled="true"
                                     :max="10000000000"
                                     :min="0"
                                     :precision="2" controls-position="right" style="width: 100%">
                    </el-input-number>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1049FORMVIEW_AMOUNT')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number v-if="show10" v-model="scope.row.planamount10"
                                     :disabled="disabled"
                                     :max="10000000000"
                                     :min="0"
                                     :precision="2" controls-position="right" style="width: 100%">
                    </el-input-number>
                    <el-input-number v-else v-model="scope.row.planamount10" :disabled="true"
                                     :max="10000000000"
                                     :min="0"
                                     :precision="2" controls-position="right" style="width: 100%">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.November')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1049FORMVIEW_PLANAMOUNT')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.amount11" :disabled="true"
                                     :max="10000000000"
                                     :min="0"
                                     :precision="2" controls-position="right" style="width: 100%">
                    </el-input-number>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1049FORMVIEW_AMOUNT')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number v-if="show11" v-model="scope.row.planamount11"
                                     :disabled="disabled"
                                     :max="10000000000"
                                     :min="0"
                                     :precision="2" controls-position="right" style="width: 100%">
                    </el-input-number>
                    <el-input-number v-else v-model="scope.row.planamount11" :disabled="true"
                                     :max="10000000000"
                                     :min="0"
                                     :precision="2" controls-position="right" style="width: 100%">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.December')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1049FORMVIEW_PLANAMOUNT')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.amount12" :disabled="true"
                                     :max="10000000000"
                                     :min="0"
                                     :precision="2" controls-position="right" style="width: 100%">
                    </el-input-number>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1049FORMVIEW_AMOUNT')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number v-if="show12" v-model="scope.row.planamount12"
                                     :disabled="disabled"
                                     :max="10000000000"
                                     :min="0"
                                     :precision="2" controls-position="right" style="width: 100%">
                    </el-input-number>
                    <el-input-number v-else v-model="scope.row.planamount12" :disabled="true"
                                     :max="10000000000"
                                     :min="0"
                                     :precision="2" controls-position="right" style="width: 100%">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.January')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1049FORMVIEW_PLANAMOUNT')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.amount1" :disabled="true"
                                     :max="10000000000"
                                     :min="0"
                                     :precision="2" controls-position="right" style="width: 100%">
                    </el-input-number>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1049FORMVIEW_AMOUNT')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number v-if="show1" v-model="scope.row.planamount1"
                                     :disabled="disabled"
                                     :max="10000000000"
                                     :min="0"
                                     :precision="2" controls-position="right" style="width: 100%">
                    </el-input-number>
                    <el-input-number v-else v-model="scope.row.planamount1" :disabled="true"
                                     :max="10000000000"
                                     :min="0"
                                     :precision="2" controls-position="right" style="width: 100%">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.February')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1049FORMVIEW_PLANAMOUNT')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.amount2" :disabled="true"
                                     :max="10000000000"
                                     :min="0"
                                     :precision="2" controls-position="right" style="width: 100%">
                    </el-input-number>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1049FORMVIEW_AMOUNT')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number v-if="show2" v-model="scope.row.planamount2"
                                     :disabled="disabled"
                                     :max="10000000000"
                                     :min="0"
                                     :precision="2" controls-position="right" style="width: 100%">
                    </el-input-number>
                    <el-input-number v-else v-model="scope.row.planamount2" :disabled="true"
                                     :max="10000000000"
                                     :min="0"
                                     :precision="2" controls-position="right" style="width: 100%">
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.March')" align="center" width="150">
                <el-table-column :label="$t('label.PFANS1049FORMVIEW_PLANAMOUNT')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number v-model="scope.row.amount3" :disabled="true"
                                     :max="10000000000"
                                     :min="0"
                                     :precision="2" controls-position="right" style="width: 100%">
                    </el-input-number>
                  </template>
                </el-table-column>

                <el-table-column :label="$t('label.PFANS1049FORMVIEW_AMOUNT')" align="center" width="120">
                  <template slot-scope="scope">
                    <el-input-number v-if="show3" v-model="scope.row.planamount3"
                                     :disabled="disabled"
                                     :max="10000000000"
                                     :min="0"
                                     :precision="2" controls-position="right" style="width: 100%">
                    </el-input-number>
                    <el-input-number v-else v-model="scope.row.planamount3" :disabled="true"
                                     :max="10000000000"
                                     :min="0"
                                     :precision="2" controls-position="right" style="width: 100%">
                    </el-input-number>
                  </template>
                </el-table-column>
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
import EasyWorkFlow from '@/components/EasyWorkFlow';
import {Message} from 'element-ui';
import dicselect from '../../../components/dicselect';
import org from '../../../components/org';
import moment from 'moment';
import monthlyrate from '../../../components/monthlyrate';

export default {
  name: 'PFANS1049FormView',
  components: {
    monthlyrate,
    EasyNormalContainer,
    EasyWorkFlow,
    dicselect,
    org,
  },
  data() {
    return {
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      show5: false,
      show6: false,
      show7: false,
      show8: false,
      show9: false,
      show10: false,
      show11: false,
      show12: false,
      title: 'title.PFANS1049VIEW',
      disabled: true,
      loading: false,
      buttonList: [
        {
          key: 'save',
          name: 'button.save',
          disabled: false,
          icon: 'el-icon-check',
        },
      ],
      code2: 'PJ064',
      code3: 'PJ063',
      month: moment(new Date()).format('YYYY-MM'),
      tableDataA: [],
      refform: [
        {
          groupid: '',
          year: '',
        },
      ],
    };
  },
  created() {
    this.disabled = this.$route.params.disabled;
    let data = moment(new Date()).format('MM');
    if (data === '01') {
      this.show12 = true;
    } else if (data === '02') {
      this.show1 = true;
    } else if (data === '03') {
      this.show2 = true;
    } else if (data === '04') {
      this.show3 = true;
    } else if (data === '05') {
      this.show4 = true;
    } else if (data === '06') {
      this.show5 = true;
    } else if (data === '07') {
      this.show6 = true;
    } else if (data === '08') {
      this.show7 = true;
    } else if (data === '09') {
      this.show8 = true;
    } else if (data === '10') {
      this.show9 = true;
    } else if (data === '11') {
      this.show10 = true;
    } else if (data === '12') {
      this.show11 = true;
    }
  },
  mounted() {
    this.loading = true;
    let parameters = {
      year: this.$route.params.year,
      group_id: this.$route.params.group_id,
    };
    this.$store
      .dispatch('PFANS1049Store/selectlist', parameters)
      .then(response => {
        this.tableDataA = response;
        this.refform.groupid = this.tableDataA[0].group_id;
        this.refform.year = this.tableDataA[0].year;
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
  methods: {
    buttonClick(val) {
      this.loading = true;

      this.$store
        .dispatch('PFANS1049Store/insert', this.tableDataA).then(response => {
        this.data = response;
        this.loading = false;
        if (val !== 'update') {
          Message({
            message: this.$t('normal.success_03'),
            type: 'success',
            duration: 5 * 1000,
          });
        }
        this.$router.push({
          name: 'PFANS1049View',
        });
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
  },
};
</script>

<style scoped>

</style>
