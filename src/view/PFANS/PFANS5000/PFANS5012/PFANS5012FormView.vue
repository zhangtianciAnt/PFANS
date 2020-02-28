<template>
  <div>
    <EasyNormalContainer
      :buttonList="buttonList"
      :title="title"
      :noback="false"
      @buttonClick="buttonClick"
      @rowClick="rowClick"
      v-loading="loading">

      <div slot="customize">
        <el-form label-position="top" label-width="8vw" ref="reff" style="padding: 2vw">
          <el-form-item>
            <el-table
              :data="tableDataA" border stripe style="width: 100%" ref="multipleTable"
              tooltip-effect="dark" @selection-change="handleSelectionChange" :header-cell-style="{background:'#005BAA',color:'white'}">

              <!-- 姓名-->
              <el-table-column
                :label="$t('label.user_name')"
                align="center"
                width="180">
                <template slot-scope="scope">
                  <el-input
                    :no="scope.row"
                    :disabled="!disabled"
                    v-model="scope.row.name"
                    style="width: 100%">
                  </el-input>
                </template>
              </el-table-column>

              <!-- 所属部门-->
              <el-table-column
                :label="$t('label.PFANS1008FORMVIEW_DEPARTMENT')"
                align="center"
                width="180">
                <template slot-scope="scope">
                  <el-input
                    :no="scope.row"
                    :disabled="!disabled"
                    v-model="scope.row.company"
                    style="width: 100%">
                  </el-input>
                </template>
              </el-table-column>

              <!-- 员工类型-->
              <el-table-column
                :label="$t('label.PFANS6001VIEW_EMPLOYEETYPE')"
                align="center"
                width="180">
                <template slot-scope="scope">
                  <el-input
                    :no="scope.row"
                    :disabled="!disabled"
                    v-model="scope.row.employeetype"
                    style="width: 100%">
                  </el-input>
                </template>
              </el-table-column>

            </el-table>
          </el-form-item>
        </el-form>
      </div>
    </EasyNormalContainer>
  </div>
</template>
<script>
  import EasyNormalContainer from "@/components/EasyNormalContainer";
  import {Message} from 'element-ui';
  import {getUserInfo, getDictionaryInfo} from '@/utils/customize';

  export default {
    name: 'PFANS5011FormView',
    components: {
      EasyNormalContainer,
    },
    data() {
      return {
        totaldata: [],
        total: 0,
        message: [{hang: '', error: '',}],
        Message1: true,
        result: false,
        cuowu: '',
        daoru: false,
        checkTableData: [],
        addActionUrl: '',
        resultShow: false,
        file: null,
        successCount: 0,
        errorCount: 0,
        errorList: [],
        downloadLoading: false,
        loading: false,
        title: "title.PFANS5012FormView",
        data: [],
        transferData: [],
        selectedlist: [],
        isShow:true,
        buttonList: [
          //承认
          {'key': 'recognition', 'name': 'button.recognition', 'disabled': false, 'icon': 'el-icon-plus'},
          // 拒绝
          {'key': 'refuse', 'name': 'button.refuse', 'disabled': false, 'icon': 'el-icon-edit'}
        ],
        row: '',
        rowid: '',
      };
    },
    mounted() {
    },
    methods: {
      buttonClick(val) {
      },
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
</style>
