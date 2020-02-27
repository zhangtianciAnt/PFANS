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

              <!--checkbox-->
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>

              <!--                姓名-->
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

              <!--                所属部门-->
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

              <!--                员工类型-->
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

              <!--            动态表头-->
            <el-table-column
              :label="item.propName"
              :property="item.prop"
              v-for="item in tableColumnList"
              :key="item.prop"
              align="center">
              <template slot-scope="scope">
                <span>{{scope.row[scope.column.property]}}</span>
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
        loading: false,
        title: 'title.PFANS5011FormView',
        buttonList: [],
        data: [],
        disabled: false,
        tableDataA:[{
          name: '',
          company: '',
          employeetype: '',
        }],
        // tableColumnList: [{prop: 'id', propName: '编号'},
        //   {prop: 'name', propName: '名字'},
        //   {prop: 'age', propName: '保质期'},
        //   {prop: 'remark', propName: '特点'}],
        buttonList: [
          //承认
          {
            'key': 'recognition',
            'name': 'button.recognition',
            'disabled': false,
            'icon': 'el-icon-plus'
          },
          // 拒绝
          {
            'key': 'refuse',
            'name': 'button.refuse',
            'disabled': false,
            'icon': 'el-icon-edit'
          },
        ],
      };
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      buttonClick(val) {
        if(val === 'recognition'){
          //View页面的总工数增加，选择行消失
        }
        if(val === 'refuse'){
          //选择行消失，在仪表盘的改用户收到一条代办事项
        }
      },

    },
    mounted() {
      if (this.$route.params._id) {
        this.loading = true;
        this.$store
          .dispatch('PFANS5001Store/selectById', {companyprojectsid: this.$route.params._id})
          .then(response => {
            this.data = response;
            // for(let i = 0; i < response.length; i++){
            //   if(response[i].type == 0){
            //     response[i].employeetype = this.$t('label.PFANS5001FORMVIEW_INCOMMUNITY')
            //   }else{
            //     response[i].employeetype = this.$t('label.PFANS5004VIEW_ASSIST')
            //   }
            // }
            this.loading = false;
          })
          .catch(error => {
            Message({
              message: error,
              type: 'error',
              duration: 5 * 1000,
            });
          });
      }
    },
  };
</script>

<style scoped>

</style>
