<template>
  <!--  <el-select :disabled="disabled" :loading="loading" :multiple="multiple" @change="change" filterable refs="project"-->
  <!--             v-model="value">-->
  <!--    <el-option-->
  <!--      :key="item.code"-->
  <!--      :label="item.value1"-->
  <!--      :value="item.code"-->
  <!--      v-for="item in options">-->
  <!--    </el-option>-->
  <!--  </el-select>-->
  <div class="dpOrgIndex">
    <el-container>
      <div class="content bg" :style="error !== ''? 'border-color:red' : 'border-color:#EBEEF5'">
        <el-tag :key="item.companyprojects_id" v-for="item in multipleSelection" type="info" :closable="!disabled"
                @close="handleClose(item)" size="small">
          <el-tooltip class="item" effect="dark" :content=item.project_name placement="top-start">
            <span>{{ item.project_name.length >= 6 ? item.project_name.substr(0,6)+ '...' : item.project_name}}</span>
          </el-tooltip>
        </el-tag>
      </div>
      <el-button :disabled="disabled" @click="openDialog" icon="el-icon-search" size="small"></el-button>
      <el-dialog :visible.sync="dialogVisible" center size="50%" top="8vh" lock-scroll append-to-body destroy-on-close>
        <EasyNormalTable :buttonList="[]" :columns="popcolumns" :data="pjTableData"
                         :formatter="formatter" title="项目" @rowClick="rowClick">
        </EasyNormalTable>
      </el-dialog>
    </el-container>
  </div>
</template>

<script>
  import {Message} from 'element-ui';
  import EasyNormalTable from '@/components/EasyNormalTable';

  export default {
    name: 'project',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        newid: '',
        pjTableData: [],
        // pop画面列属性
        popcolumns: [
          {
            code: 'numbers',
            label: '项目编号',
            width: 100,
            fix: false,
            filter: false,
          },
          {
            code: 'project_name',
            label: '项目名称',
            width: 150,
            fix: false,
            filter: false,
          },
        ],
        defaultProps: {
          label: 'title',
          children: 'orgs',
        },
        dialogVisible: false,
        multipleSelection: [],
        options: [],
        value: [],
        loading: false,
      };
    },
    props: {
      error: {
        type: String,
        default: '',
      },
      user: {
        type: Boolean,
        default: false,
      },
      multiple: {
        type: Boolean,
        default: false,
      },
      date: {
        type: String,
        default: '',
      },
      disabled: {
        type: Boolean,
        default:
          false,
      },
      no: {
        type: Object,
        default: function() {
          return {};
        },
      },
    },
    mounted() {
      this.loading = true;
      this.$store
        .dispatch('PFANS5009Store/getSiteList3', {})
        .then(response => {
          this.pjTableData = response;
          this.getdate(this.newid);
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          Message({
            message: error,
            type: 'error',
            duration: 5 * 1000,
          });
        });
    },
    methods: {
      rowClick(row) {
        this.multipleSelection[0] = row;
        this.$emit('change', row, this.no);
        this.dialogVisible = false;
      },
      // table格式化
      formatter(row, column) {
        // 项目编号
        if (column.property === 'numbers') {
          if (row.numbers) {
            return row.numbers;
          }
        }
        // 项目名称
        if (column.property === 'project_name') {
          if (row.project_name) {
            return row.project_name;
          }
        }
      },
      handleClose(item) {
        this.multipleSelection = [];
        item.companyprojects_id = "";
        this.$emit('change', item, this.no);
      },
      change(val) {
        this.$emit('change', val, this.no);
      },
      openDialog() {
        this.dialogVisible = true;
      },
      getdate(val) {
        this.multipleSelection = this.pjTableData.filter(item => item.companyprojects_id === val);
      },
    },
    watch: {
      date: {
        handler(newVal, oldVal) {
          if (newVal != '') {
            this.newid = newVal;
          }
          this.getdate(newVal);
        },
        deep: true,
        immediate: true,
      },

    },
  };
</script>

<style lang="scss" scoped>
  .dpOrgIndex {
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
