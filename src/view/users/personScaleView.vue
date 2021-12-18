<template>
  <EasyNormalTable :buttonList="buttonList" :columns="columns" :data="data" :rowid="row" :title="title"
                   @buttonClick="buttonClick" @rowClick="rowClick" v-loading="loading">
    <el-date-picker
      v-model="montvalue"
      type="month"
      @change="changed"
      slot="customize"
      placeholder="选择月">
    </el-date-picker>
  </EasyNormalTable>
</template>

<script>
import EasyNormalTable from '@/components/EasyNormalTable';
import {getDepartmentById, getUserInfo,getDictionaryInfo,getCooperinterviewListByAccount} from '@/utils/customize';
import {Message} from "element-ui";
import moment from "moment";

export default {
  name: "personScaleView",
  components: {
    EasyNormalTable,
  },
  data() {
    return {
      loading: false,
      title: 'title.personScaleView',
      montvalue:moment(new Date()).format("YYYY-MM"),
      data: [],
      columns: [
        {
          //报告对象
          code: 'user_id',
          label: 'label.PFANSPERCALEVIEW_REPORTN',
          width: 100,
          fix: false,
          filter: false,
        },
        {
          //center
          code: 'center_id',
          label: 'label.PFANSPERCALEVIEW_DEPARTC',
          width: 140,
          fix: false,
          filter: false,
        },
        {
          //group
          code: 'group_id',
          label: 'label.PFANSPERCALEVIEW_DEPARTG',
          width: 140,
          fix: false,
          filter: false,
        },
        {
          //RN
          code: 'ranks',
          label: 'label.PFANSPERCALEVIEW_RANKS',
          width: 80,
          fix: false,
          filter: false,
        },
        {
          //伞下管理所有人数
          code: 'mangernumber',
          label: 'label.PFANSPERCALEVIEW_ADMINPEO',
          width: 120,
          fix: false,
          filter: false,
        },
        {
          //项目管理对应分数
          code: 'managesorce',
          label: 'label.PFANSPERCALEVIEW_PROJECTN',
          width: 120,
          fix: false,
          filter: false,
        },
      ],
      buttonList: [
        {
          key: "viewdetails",
          name: this.$t("button.viewdetails"),
          disabled: false,
          icon: "el-icon-view"
        }
      ],
      row_id: '',
      row: 'personscalemee_id',
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    buttonClick(val){
      if(val === 'viewdetails'){
        if (this.rowid === '') {
          Message({
            message: this.$t('normal.info_01'),
            type: 'info',
            duration: 2 * 1000,
          });
          return;
        }
        this.$router.push({
          name: 'personScaleFormView',
          params: {
            _id: this.rowid,
            _yearMonth: this.montvalue,
            disabled: false,
          },
        });
      }
    },
    rowClick(row){
      this.rowid = row.personscalemee_id;
    },
    changed(val){
      this.montvalue = moment(val).format("YYYY-MM");
      this.getList();
    },
    getList(){
      this.loading = true;
      let parameter = {
        yearmonth: this.montvalue,
      };
      this.$store
        .dispatch('scaleStore/getList',parameter)
        .then(response => {
          for (let j = 0; j < response.length; j++) {
            if(response[j].user_id !== null && response[j].user_id !== "") {
              let user = getUserInfo(response[j].user_id);
              if (user) {
                response[j].user_id = user.userinfo.customername;
              }
            }
            if (response[j].center_id !== null && response[j].center_id !== '' && response[j].center_id !== undefined) {
              response[j].center_id = getDepartmentById(response[j].center_id);
            }
            if (response[j].group_id !== null && response[j].group_id !== '' && response[j].group_id !== undefined) {
              response[j].group_id = getDepartmentById(response[j].group_id);
            }
            if (response[j].ranks !== null && response[j].ranks !== "") {
              let letStage = getDictionaryInfo(response[j].ranks);
              if (letStage != null) {
                response[j].ranks = letStage.value1;
              }
            }
          }
          this.data = response;
          this.loading = false;
        })
        .catch(error => {
        this.$message.error({
          message: error,
          type: 'error',
          duration: 5 * 1000
        });
        this.loading = false;
      })
    },

  },
}

</script>

<style scoped>

</style>
