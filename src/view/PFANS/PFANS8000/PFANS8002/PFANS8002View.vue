<template>
  <div style="min-height: 100%">

    <EasyNormalTable
      :buttonList="buttonList"
      :columns="columns"
      :data="table"
      :title="title"
      @buttonClick="buttonClick"
      @rowClick="rowclick"
      v-loading="loading"
      v-show="showTable1"
    >
      <el-select @change="handleClick" slot="customize" v-model="activeName">
        <el-option :label="$t('label.node_step4')" value="first"></el-option>
        <el-option :label="$t('label.PFANS8002VIEW_JS')" value="second"></el-option>
      </el-select>
    </EasyNormalTable>

    <EasyNormalTable
      :buttonList="buttonList"
      :columns="columns"
      :data="table2"
      :title="title"
      @buttonClick="buttonClick"
      @rowClick="rowclick"
      v-loading="loading"
      v-show="!showTable1"
    >
      <el-select @change="handleClick" slot="customize" v-model="activeName">
        <el-option :label="$t('label.node_step4')" value="first"></el-option>
        <el-option :label="$t('label.PFANS8002VIEW_JS')" value="second"></el-option>
      </el-select>
    </EasyNormalTable>
  </div>
</template>
<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {Message} from 'element-ui';
  import moment from 'moment';

  export default {
    name: "PFANS8002View.vue",
    components: {
      EasyNormalTable
    },
    data() {
      return {
        title: 'label.PFANS8002VIEW_XXYL',
        noback: true,
        activeName: 'first',
        table: [
        ],
        table2: [
        ],
        totaldata: [],
        totaldata2: [],
        listQuery: {
          page: 1,
          limit: 5
        },
        listQuery2: {
          page: 1,
          limit: 5
        },
        status: '',
        total: 0,
        total2: 0,
        dataList: '',
        dataList2: '',
        selectedlist: '',
        loading: false,
        data: [],
        buttonList: [
          {key: "open", name: "button.open", disabled: false, icon: ""}],
        columns: [
          {
            code: 'title',
            label: 'label.information_title',
            width: 150,
            fix: false,
            filter: true
          },
          {
            code: 'content',
            label: 'label.information_content',
            width: 150,
            fix: false,
            filter: true
          },
          {
            code: 'createon',
            label: 'label.information_start',
            width: 150,
            fix: false,
            filter: true
          }
        ],
        showTable1: true
      };
    },
    mounted() {
      this.getStatus('0');
      this.getStatus('1');
    },
    methods: {
      getStatus(val) {
        this.loading = true;
        this.$store
          .dispatch('indexStore/getStatus', {status: val})
          .then(response => {
            for (let j = 0; j < response.length; j++) {
              if (response[j].status === '0') {
                if (response[j].createon !== null && response[j].createon !== '') {
                  response[j].createon = moment(response[j].createon).format('YYYY-MM-DD HH:mm:ss');
                }
                this.table = response;
                this.totaldata = response;
                this.dataList = 1;
                this.getList();

              }
              if (response[j].status === '1') {
                if (response[j].createon !== null && response[j].createon !== '') {
                  response[j].createon = moment(response[j].createon).format('YYYY-MM-DD HH:mm:ss');
                }
                this.table2 = response;
                this.totaldata2 = response;
                this.dataList2 = 2;
                this.getList();
              }
            }
            this.loading = false;
          })
          .catch(err => {
            this.loading = false;
            Message({
              message: err,
              type: "error",
              duration: 5 * 1000
            });
          });
      },
      handleClick() {
        if (this.activeName === '2') {
          this.showTable1 = false;
        } else if (this.activeName === '1') {
          this.showTable1 = true;
        }
      },
      handleSizeChange(val) {
        this.listQuery.limit = val;
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList()
      },
      handleSizeChange2(val) {
        this.listQuery2.limit = val;
        this.getList()
      },
      handleCurrentChange2(val) {
        this.listQuery2.page = val;
        this.getList()
      },
      getList() {
        if (this.dataList === 1 || this.status === '1') {
          this.loading = true;
          let start = (this.listQuery.page - 1) * this.listQuery.limit;
          let end = this.listQuery.page * this.listQuery.limit;
          if (this.totaldata) {
            let pList = this.totaldata.slice(start, end);
            this.table = pList;
            this.total = this.totaldata.length
          }
          this.loading = false
        }
        if (this.dataList2 === 2 || this.status === '0') {
          this.loading = true;
          let start = (this.listQuery2.page - 1) * this.listQuery2.limit;
          let end = this.listQuery2.page * this.listQuery2.limit;
          if (this.totaldata2) {
            let pList = this.totaldata2.slice(start, end);
            this.table2 = pList;
            this.total2 = this.totaldata2.length
          }
          this.loading = false
        }

      },
      rowclick(row) {
        this.row = row;
      },
      buttonClick(val) {
        if (val === "open") {
          if (!this.row || this.row.noticeid === '') {
            Message({
              message: this.$t('normal.info_01'),
              type: 'info',
              duration: 2 * 1000
            });
            return;
          }
          let name = this.row.url.replace("/", "");
          this._id = this.row.noticeid;
          this.$router.push({
            name: name,
            params: {
              _id: this._id,
              disabled: false
            }
          })
        }
      },
    }
  }
</script>
<style scoped>
</style>
