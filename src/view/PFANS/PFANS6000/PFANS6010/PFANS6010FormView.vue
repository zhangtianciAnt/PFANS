<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList" :title="title" @buttonClick="buttonClick" ref="container"
                         v-loading="loading">
      <div slot="customize">
        <el-row>
          <el-col :span="24">
            <el-table
              :data="tableData" :summary-method="getSummaries" border header-cell-class-name="sub_bg_color_blue"
              show-summary
              stripe style="width: 85vw">
              <el-table-column :label="$t('NO')"
                               type="index"
                               width="150"></el-table-column>
              <el-table-column :label="$t('label.PFANS6007VIEW_BPCLUBNAME')"
                               width="150"></el-table-column>
              <el-table-column :label="$t('label.PFANS6010VIEW_COMPANYEN')">
                <el-table-column :label="$t('label.PFANS1027FORMVIEW_APPOINT')"
                                 width="150">
                  <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')"
                                   property="jobnumber"
                                   width="150"></el-table-column>
                  <el-table-column :label="$t('label.PFANS6008VIEW_COST')"
                                   property="cost"
                                   width="150"></el-table-column>
                  <el-table-column :label="$t('label.PFANS1036FORMVIEW_NUMBER')"
                                   property="number"
                                   width="150"></el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1027FORMVIEW_CONTRACT')"
                                 width="150">
                  <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')"
                                   property="jobnumber"
                                   width="150"></el-table-column>
                  <el-table-column :label="$t('label.PFANS6008VIEW_COST')"
                                   property="cost"
                                   width="150"></el-table-column>
                  <el-table-column :label="$t('label.PFANS6010VIEW_PERNUMBER')"
                                   property="pernumber"
                                   width="150"></el-table-column>
                </el-table-column>
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_PROSPECTS')"
                                 width="150">
                  <el-table-column :label="$t('label.PFANS1036FORMVIEW_JOBNUMBER')"
                                   property="jobnumber1"
                                   width="150"></el-table-column>
                  <el-table-column :label="$t('label.PFANS6008VIEW_COST')"
                                   property="cost1"
                                   width="150"></el-table-column>
                </el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.PFANS6010VIEW_FREESUM')"
                               width="150">
                <el-table-column :label="$t('label.PFANS1039FORMVIEW_PROSPECTS')"
                                 property="prospects"
                                 width="150"></el-table-column>
                <el-table-column :label="$t('label.PFANS2006VIEW_ACTUAL')"
                                 property="actual"
                                 width="150"></el-table-column>
              </el-table-column>
              <el-table-column :label="$t('label.operation')" align="center" width="200">
                <template slot-scope="scope">
                  <el-button
                    :disabled="!disable"
                    @click="createprobook()"
                    plain
                    size="small"
                    type="primary"
                  >{{$t('label.PFANS6010VIEW_CREAPROBOOK')}}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
    import EasyNormalContainer from '@/components/EasyNormalContainer';
    import {Message} from 'element-ui';

    export default {
        name: 'PFANS6010FormView',
        components: {
            EasyNormalContainer,
        },
        data() {
            return {
                title: 'title.PFANS6010FORMVIEW',
                loading: false,
                disabled: false,
                buttonList: [],
                tableData: [],
            };
        },
        mounted() {
        },
        created() {
            this.disabled = this.$route.params.disabled;
            if (this.disabled) {
                this.buttonList = [
                    {
                        key: 'save',
                        name: 'button.save',
                        disabled: false,
                        icon: 'el-icon-check',
                    },
                ];
            }
        },
        methods: {
            createprobook() {

            },
            getSummaries(param) {
                const {columns, data} = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = this.$t('label.PFANS1036FORMVIEW_TOTAL');
                        return;
                    }
                    const values = data.map(item => Number(item[column.property]));
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0);
                    } else {
                        sums[index] = '--';
                    }
                });
                return sums;
            },
            buttonClick(val) {
                this.$refs['refform'].validate(valid => {
                    if (valid) {

                    } else {
                        Message({
                            message: this.$t("normal.error_12"),
                            type: 'error',
                            duration: 5 * 1000
                        });
                    }
                });
            },
        }
    };
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
