<template>
  <EasyNormalTable
    ref="dataTable"
    :buttonList="buttonList"
    :columns="columns"
    :data="data"
    :rowid="row_id"
    :title="title"
    @buttonClick="buttonClick"
    @rowClick="rowClick"
    v-loading="loading"
    :showSelection="true"
    :selectable="selectInit"
  ></EasyNormalTable>
</template>

<script>
import EasyNormalTable from "@/components/EasyNormalTable";
import { Message } from "element-ui";
import moment from "moment";
import {
  getDictionaryInfo,
  getStatus,
  getUserInfo,
  getOrgInfoByUserId
} from "@/utils/customize";

export default {
  name: "PFANS2016View",
  components: {
    EasyNormalTable
  },
  data() {
    return {
      loading: false,
      title: "title.PFANS2016VIEW",
      data: [],
      selectedlist: [],
      columns: [
        {
          code: "username",
          label: "label.user_name",
          width: 90,
          fix: false,
          filter: true
        },
        {
          code: "centername",
          label: "label.center",
          width: 160,
          fix: false,
          filter: true
        },
        {
          code: "groupname",
          label: "label.group",
          width: 160,
          fix: false,
          filter: true
        },
        {
          code: "teamname",
          label: "label.team",
          width: 160,
          fix: false,
          filter: true
        },
        {
          code: "applicationdate",
          label: "label.application_date",
          width: 130,
          fix: false,
          filter: true
        },
        {
          code: "errortype",
          label: "label.PFANS2016VIEW_ERRORTYPE",
          width: 130,
          fix: false,
          filter: true
        },
        {
          code: "lengthtime",
          label: "label.PFANS2016VIEW_PERIODLENGTH",
          width: 130,
          fix: false,
          filter: true
        },
        // add-ws-考勤异常实际值添加
        {
          code: "relengthtime",
          label: "label.PFANS2016VIEW_REPERIODLENGTH",
          width: 140,
          fix: false,
          filter: true
        },
        // add-ws-考勤异常实际值添加
        {
          code: "occurrencedate",
          label: "label.PFANS2016VIEW_OCCURRENCEDATE",
          width: 100,
          fix: false,
          filter: true
        },
        {
          code: "finisheddate",
          label: "label.PFANS2016VIEW_FINISHEDDATE",
          width: 100,
          fix: false,
          filter: true
        },
        {
          code: "status",
          label: "label.approval_status",
          width: 130,
          fix: false,
          filter: true
        }
      ],
      buttonList: [
        {
          key: "view",
          name: "button.view",
          disabled: false,
          icon: "el-icon-view"
        },
        {
          key: "insert",
          name: "button.insert",
          disabled: false,
          icon: "el-icon-plus"
        },
        {
          key: "edit",
          name: "button.update",
          disabled: false,
          icon: "el-icon-edit"
        },
        {
          key: "export",
          name: "button.export",
          disabled: false,
          icon: "el-icon-download"
        }
      ],
      rowid: "",
      row_id: "abnormalid"
    };
  },
  mounted() {
    this.loading = true;
    this.$store
      .dispatch("PFANS2016Store/getFpans2016List", {})
      .then(response => {
        for (let j = 0; j < response.length; j++) {

          if (
            response[j].errortype != "PR013005" &&
            response[j].errortype != "PR013007"
          ) {
            if (this.$i18n) {
                //UPD_FJL   添加是否有实际时长的判断
                response[j].lengthtime = response[j].lengthtime + this.$t("label.hours");
                if(response[j].status == 7) {
                    response[j].relengthtime = response[j].relengthtime + this.$t("label.hours");
                } else {
                    response[j].relengthtime ='';
                }
                //UPD_FJL
            }
          } else {
            if (this.$i18n) {
                //UPD_FJL   添加是否有实际时长的判断
                response[j].lengthtime = response[j].lengthtime === "4" ? this.$t("label.PFANS2011FROMVIEW_HALFDATE") : this.$t("label.PFANS2016FORMVIEW_QUANTIAN");
                if(response[j].status == 7) {
                    response[j].relengthtime = response[j].relengthtime === "4" ? this.$t("label.PFANS2011FROMVIEW_HALFDATE") : this.$t("label.PFANS2016FORMVIEW_QUANTIAN");
                } else {
                    response[j].relengthtime ='';
                }
                //UPD_FJL
            }
          }

          let user = getUserInfo(response[j].user_id);
          let nameflg = getOrgInfoByUserId(response[j].user_id);
          if (nameflg) {
            response[j].centername = nameflg.centerNmae;
            response[j].groupname = nameflg.groupNmae;
            response[j].teamname = nameflg.teamNmae;
          }
          if (user) {
            response[j].username = user.userinfo.customername;
          }
          // del_fjl
          // add-ws-考勤异常实际值添加
          // if (response[j].status == 7) {
          //   if (this.$i18n) {
          //     response[j].relengthtime =
          //       response[j].relengthtime + this.$t("label.hours");
          //   }
          // }else{
          //   response[j].relengthtime ='';
          // }
          // add-ws-考勤异常实际值添加
          // del_fjl
          if (response[j].status !== null && response[j].status !== "") {
            response[j].status = getStatus(response[j].status);
          }
          if (
            response[j].applicationdate !== null &&
            response[j].applicationdate !== ""
          ) {
            response[j].applicationdate = moment(
              response[j].applicationdate
            ).format("YYYY-MM-DD");
          }
          if (
            response[j].occurrencedate !== null &&
            response[j].occurrencedate !== ""
          ) {
            response[j].occurrencedate = moment(
              response[j].occurrencedate
            ).format("YYYY-MM-DD");
          }
          if (
            response[j].finisheddate !== null &&
            response[j].finisheddate !== ""
          ) {
            response[j].finisheddate = moment(response[j].finisheddate).format(
              "YYYY-MM-DD"
            );
          }
          if (response[j].errortype !== null && response[j].errortype !== "") {
            let letErrortype = getDictionaryInfo(response[j].errortype);
            if (letErrortype != null) {
              response[j].errortype = letErrortype.value1;
            }
          }
        }
        this.data = response;
        this.loading = false;
      })
      .catch(error => {
        Message({
          message: error,
          type: "error",
          duration: 5 * 1000
        });
        this.loading = false;
      });
  },
  methods: {
    selectInit(row, index) {
      return row.status === "正常结束";
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    rowClick(row) {
      this.rowid = row.abnormalid;
    },
    buttonClick(val) {
      this.$store.commit("global/SET_HISTORYURL", this.$route.path);
      if (val === "view") {
        if (this.rowid === "") {
          Message({
            message: this.$t("normal.info_01"),
            type: "info",
            duration: 2 * 1000
          });
          return;
        }
        this.$router.push({
          name: "PFANS2016FormView",
          params: {
            _id: this.rowid,
            disabled: false
          }
        });
      }
      if (val === "insert") {
        this.$router.push({
          name: "PFANS2016FormView",
          params: {
            _id: "",
            disabled: true
          }
        });
      }
      if (val === "edit") {
        if (this.rowid === "") {
          Message({
            message: this.$t("normal.info_01"),
            type: "info",
            duration: 2 * 1000
          });
          return;
        }
        this.$router.push({
          name: "PFANS2016FormView",
          params: {
            _id: this.rowid,
            disabled: true
          }
        });
      }
      if (val === "export") {
        if (this.$refs.dataTable.selectedList.length === 0) {
          Message({
            message: this.$t("normal.info_01"),
            type: "info",
            duration: 2 * 1000
          });
          return;
        }
        this.selectedlist = this.$refs.dataTable.selectedList;
        import("@/vendor/Export2Excel").then(excel => {
          const tHeader = [
            this.$t("label.user_name"), // 名称
            this.$t("label.center"), // center
            this.$t("label.group"), // group
            this.$t("label.team"), // team
            this.$t("label.application_date"), // 申请日期
            this.$t("label.PFANS2016VIEW_ERRORTYPE"), // 异常类别
            this.$t("label.PFANS2016VIEW_PERIODLENGTH"), // 时间长度
            this.$t("label.PFANS2016VIEW_OCCURRENCEDATE"), // 开始日
            this.$t("label.PFANS2016VIEW_FINISHEDDATE"), // 完了日
            this.$t("label.cause") // 事由
          ];
          const filterVal = [
            "username",
            "centername",
            "groupname",
            "teamname",
            "applicationdate",
            "errortype",
            "lengthtime",
            "occurrencedate",
            "finisheddate",
            "cause"
          ];
          const list = this.selectedlist;
          const data = this.formatJson(filterVal, list);
          excel.export_json_to_excel(tHeader, data, this.$t("menu.PFANS2016"));
        });
      }
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
