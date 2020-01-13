<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :canStart="canStart" :title="title" :workflowCode="right"
                         @buttonClick="buttonClick"
                         @end="end" @start="start" @workflowState="workflowState" ref="container" v-loading="loading">
      <div slot="customize">
        <el-form :model="form" :rules="rules" label-position="left" label-width="8rem" ref="reff" style="padding: 20px">
          <el-tabs v-model="activeName">
            <div>
              <el-table
                :data="tableData"
                border="false"
                style="width: 100%">
                <el-table-column
                  :label="$t('label.PFANS2026FORMVIEW_ORDERNUMBER')"
                  align="center"
                  prop="ordernumber"
                  width="50">
                  <el-table-column
                    align="center"
                    width="50">
                  </el-table-column>
                </el-table-column>
                <el-table-column
                  :label="$t('label.PFANS2007VIEW_NAME')"
                  align="center"
                  prop="confirmperson"
                  width="60">
                  <el-input>
                  </el-input>
                  <el-table-column
                    align="center"
                    width="60">
                  </el-table-column>
                </el-table-column>
                <el-table-column
                  :label="$t('label.PFANS1036FORMVIEW_CLUBNAME')"
                  align="center"
                  prop="confirmdata"
                  width="150">
                  <el-input>
                  </el-input>
                  <el-table-column
                    align="center"
                    width="150">
                  </el-table-column>
                </el-table-column>

                <el-table-column
                  :label="$t('label.PFANS6005VIEW_CHECKTIME')"
                  align="center"
                  prop="confirmmark"
                  width="150">
                  <el-table-column
                    align="center"
                    width="150">
                  </el-table-column>
                </el-table-column>
                <!--                技術スキル-->
                <el-table-column
                  :label="$t('label.PFANS6005FORMVIEW_TECHNOLOGY')"
                  align="center"
                  prop="technology"
                  width="150">
                  <el-table-column
                    align="center"
                    width="150">
                  </el-table-column>
                </el-table-column>
                <!--                技術価値-->
                <el-table-column
                  :label="$t('label.PFANS6005FORMVIEW_TECHNOLOGYVALUE')"
                  align="center"
                  prop="technologyvalue"
                  width="150">
                  <el-table-column
                    align="center"
                    width="150">
                  </el-table-column>
                </el-table-column>
                <!--                管理スキル-->
                <el-table-column
                  :label="$t('label.PFANS6005FORMVIEW_MANAGEMENTSKILLS')"
                  align="center"
                  prop="managementskills"
                  width="150">
                  <el-table-column
                    align="center"
                    width="150">
                  </el-table-column>
                </el-table-column>
                <!--                管理価値-->
                <el-table-column
                  :label="$t('label.PFANS6005FORMVIEW_MANAGEMENTVALUE')"
                  align="center"
                  prop="managementvalue"
                  width="150">
                  <el-table-column
                    align="center"
                    width="150">
                  </el-table-column>
                </el-table-column>
                <!--                分野スキル-->
                <el-table-column
                  :label="$t('label.PFANS2026FORMVIEW_FIELDSKILLS')"
                  align="center"
                  prop="fieldskills"
                  width="150">
                  <el-table-column
                    align="center"
                    width="150">
                  </el-table-column>
                </el-table-column>
                <!--                分野価値-->
                <el-table-column
                  :label="$t('label.PFANS6005FORMVIEW_FIELDVALUE')"
                  align="center"
                  prop="fieldvalue"
                  width="150">
                  <el-table-column
                    align="center"
                    width="150">
                  </el-table-column>
                </el-table-column>
                <!--                語学スキル-->
                <el-table-column
                  :label="$t('label.PFANS6005FORMVIEW_LANGUAGESKILLS')"
                  align="center"
                  prop="languageskills"
                  width="150">
                  <el-table-column
                    align="center"
                    width="150">
                  </el-table-column>
                </el-table-column>
                <!--                語学価値-->
                <el-table-column
                  :label="$t('label.PFANS2026FORMVIEW_LANGUAGEVALUE')"
                  align="center"
                  prop="languagevalue"
                  width="150">
                  <el-table-column
                    align="center"
                    width="150">
                  </el-table-column>
                </el-table-column>
                <!--                勤務スキル-->
                <el-table-column
                  :label="$t('label.PFANS6005FORMVIEW_JOBSKILLS')"
                  align="center"
                  prop="jobskills"
                  width="150">
                  <el-table-column
                    align="center"
                    width="150">
                  </el-table-column>
                </el-table-column>
                <!--                勤務価値-->
                <el-table-column
                  :label="$t('label.PFANS6005FORMVIEW_WORKVALUE')"
                  align="center"
                  prop="workvalue"
                  width="150">
                  <el-table-column
                    align="center"
                    width="150">
                  </el-table-column>
                </el-table-column>
                <!--                勤続評価-->
                <el-table-column
                  :label="$t('label.PFANS6005FORMVIEW_WORKTIME')"
                  align="center"
                  prop="worktime"
                  width="150">
                  <el-table-column
                    align="center"
                    width="150">
                  </el-table-column>
                </el-table-column>
                <!--                勤続価値-->
                <el-table-column
                  :label="$t('label.PFANS6005FORMVIEW_WORKVALUE1')"
                  align="center"
                  prop="workvalue1"
                  width="150">
                  <el-table-column
                    align="center"
                    width="150">
                  </el-table-column>
                </el-table-column>
                <!--                責任者激励-->
                <el-table-column
                  :label="$t('label.PFANS6005FORMVIEW_INCENTIVELEADER')"
                  align="center"
                  prop="incentiveleader"
                  width="150">
                  <!--                PSDCD駐在規模-->
                  <el-table-column
                    :label="$t('label.PFANS6005FORMVIEW_SERVINGSIZE')"
                    align="center"
                    prop="servingsize"
                    width="150">
                  </el-table-column>
                </el-table-column>
                <!--                規模価値-->
                <el-table-column
                  align="center"
                  width="150">
                  <el-table-column
                    :label="$t('label.PFANS6005FORMVIEW_SIZEVALUE')"
                    align="center"
                    prop="sizevalue"
                    width="150">
                  </el-table-column>
                </el-table-column>
                <!--                貢献評価-->
                <el-table-column
                  align="center"
                  width="150">
                  <el-table-column
                    :label="$t('label.PFANS6005FORMVIEW_CONEVALUATION')"
                    align="center"
                    prop="conevaluation"
                    width="150">
                  </el-table-column>
                </el-table-column>
                <!--                貢献係数-->
                <el-table-column
                  align="center"
                  width="150">
                  <el-table-column
                    :label="$t('label.PFANS6005FORMVIEW_CONCOEFFICIENT')"
                    align="center"
                    prop="concoefficient"
                    width="150">
                  </el-table-column>
                </el-table-column>

                <!--                出向者激励-->
                <el-table-column
                  :label="$t('label.PFANS6005FORMVIEW_OUTBOUNDMOTIVATION')"
                  align="center"
                  prop="outboundmotivation"
                  width="150">
<!--                  ランク価値-->
                  <el-table-column
                    :label="$t('label.PFANS6005FORMVIEW_LEVELVALUE')"
                    align="center"
                    prop="conevaluation"
                    width="150">
                  </el-table-column>
                </el-table-column>
                <!--                貢献評価-->
                <el-table-column
                  align="center"
                  width="150">
                  <el-table-column
                    :label="$t('label.PFANS6005FORMVIEW_CONCOEFFICIENT')"
                    align="center"
                    prop="concoefficient"
                    width="150">
                  </el-table-column>
                </el-table-column>
                <!--                貢献係数-->
                <el-table-column
                  align="center"
                  width="150">
                  <el-table-column
                    :label="$t('label.PFANS6005FORMVIEW_SIZEVALUE')"
                    align="center"
                    prop="sizevalue"
                    width="150">
                  </el-table-column>
                </el-table-column>

                <!--                開発単価微調整-->
                <el-table-column
                  :label="$t('label.PFANS6005VIEW_PRICEADJUST')"
                  align="center"
                  prop="priceadjust"
                  width="150">
                  <el-table-column
                    align="center"
                    width="150">
                  </el-table-column>
                </el-table-column>
                <!--                開発総単価-->
                <el-table-column
                  :label="$t('label.PFANS6005VIEW_SUMPRICE')"
                  align="center"
                  prop="sumprice"
                  width="150">
                  <el-table-column
                    align="center"
                    width="150">
                  </el-table-column>
                </el-table-column>
<!--                共通費用-->
                <el-table-column
                  :label="$t('label.PFANS6005FORMVIEW_COMMONCOST')"
                  align="center"
                  prop="commoncost"
                  width="150">
                  <el-table-column
                    align="center"
                    width="150">
                  </el-table-column>
                </el-table-column>
<!--             PSDCD相当ランク-->
                <el-table-column
                  :label="$t('label.PFANS6005VIEW_PSDCDGRADE')"
                  align="center"
                  prop="psdcdgrade"
                  width="150">
                  <el-table-column
                    align="center"
                    width="150">
                  </el-table-column>
                </el-table-column>
<!--                備考-->
                <el-table-column
                  :label="$t('label.PFANS6007VIEW_REMARKS')"
                  align="center"
                  prop="remarks"
                  width="150">
                  <el-table-column
                    align="center"
                    width="150">
                  </el-table-column>
                </el-table-column>
<!--                前年単価-->
                <el-table-column
                  :label="$t('label.PFANS6005VIEW_LASTYEARPRICE')"
                  align="center"
                  prop="lastyearprice"
                  width="150">
                  <el-table-column
                    align="center"
                    width="150">
                  </el-table-column>
                </el-table-column>
              </el-table>
            </div>
          </el-tabs>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
    import EasyNormalContainer from '@/components/EasyNormalContainer';
    import user from '../../../components/user.vue';
    import dicselect from '../../../components/dicselect';

    export default {
        name: "PFANS6005FormView",
        components: {
            dicselect,
            EasyNormalContainer,
            user,
        },
        data() {
            return {
                tableData: [{
                    ordernumber: '1',
                    confirmperson: this.$t('label.center'),
                    confirmdata: this.$t('label.PFANS2026FORMVIEW_DATA1'),
                    confirmmark: '',
                    date: '',
                },
                ],
                title: 'title.PFANS6005VIEW',
                buttonList: [
                    {
                        key: 'save',
                        name: 'button.save',
                        disabled: false,
                        icon: 'el-icon-check',
                    },
                ],

            };
        },
    }
</script>

<style scoped>

</style>
