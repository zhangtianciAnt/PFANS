<template>
  <div style="min-height: 100%">
    <EasyNormalContainer :buttonList="buttonList"
                         @buttonClick="buttonClick"
                         ref="container"
                         v-loading="loading">
      <div slot="customize">
        <el-tabs  type="border-card">
          <el-tab-pane :label="title" name="first">
            <el-row>
              <el-col :span="8">
                <dicselect
                  :code="code14"
                  @change="changeType"
                  style="width: 20vw"
                >
                </dicselect>
              </el-col>
            </el-row>
            <el-row style="padding-top: 20px">
              <EasyNormalTable :buttonShow="buttonShow" :columns="columns" :data="data" :titleShow="titleShow">
              </EasyNormalTable>
            </el-row>
          </el-tab-pane>
          <el-tab-pane :label="title2" name="second">
            <EasyNormalTable :buttonShow="buttonShow" :titleShow="titleShow" :data="data2" :columns="columns2">

            </EasyNormalTable>
          </el-tab-pane>
        </el-tabs>

      </div>
    </EasyNormalContainer>
  </div>
</template>

<script>
  import {getDictionaryInfo, getOrgInfo, getUserInfo} from '@/utils/customize';
  import EasyNormalContainer from '@/components/EasyNormalContainer';
  import dicselect from '../../../components/dicselect';
  import EasyNormalTable from '@/components/EasyNormalTable'
  export default {
    name: "PFANS2027FormView",
    components: {
      dicselect,
      EasyNormalContainer,
      EasyNormalTable
    },
    data() {
      return {
        title: this.$t("title.PFANS2027VIEW_VIEW"),
        title2: this.$t("title.PFANS2027VIEW_VIEW2"),
        loading: false,
        buttonList: [],
        disabled: false,
        code14: 'PJ103',
        buttonShow:false,
        titleShow:false,
        columns:[
          {
            code: 'filename',
            label: 'label.ASSETS1001VIEW_FILENAME',
            width: 120,
            fix: false,
            filter: false,
          },
        ],
        columns2:[
          {
            code: 'title1',
            label: 'label.ASSETS1001VIEW_FILENAME',
            width: 120,
            fix: false,
            filter: false,
          },
        ]
      }
    },
    created() {
      this.disabled = this.$route.params.disabled;
      if (this.disabled) {
        this.buttonList = [
          {
            key: "save",
            name: "button.save",
            disabled: false,
            icon: "el-icon-check"
          }
        ];
      }
    },
    mounted() {

    },
    methods: {}
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .dpSupIndex {
    .content {
      height: 34px;
      min-width: 80%;
      border: 0.1rem solid #ebeef5;
      overflow-y: scroll;
      overflow-x: hidden;
      line-height: 34px;
      padding: 0.1rem 0.5rem 0.2rem 0.5rem;
    }

    .bg {
      background: white;
      border-width: 1px;
    }
  }
</style>
