<template>
  <EasyNormalTable
    :buttonList="buttonList"
    :columns="columns"
    :data="data"
    :rowid="rowid"
    :title="title"
    @buttonClick="buttonClick"
    @rowClick="rowClick"
    v-loading="loading"
  ></EasyNormalTable>
</template>

<script>
  import EasyNormalTable from "@/components/EasyNormalTable";
  import {getDictionaryInfo, getOrgInfo, getStatus, getUserInfo} from "../../../../utils/customize";
  import {Message} from 'element-ui';

  let moment = require("moment");

  export default {
    name: "PFANS2002View",
    components: {
      EasyNormalTable
    },

    data() {
      return {
        loading: false,
        data: [],
        title: "title.PFANS2002VIEW",
        buttonList: [
          {
            key: "view",
            name: "button.view",
            disabled: false,
            icon: "el-icon-search"
          },
          {
            key: "new",
            name: "button.insert",
            disabled: false,
            icon: "el-icon-plus"
          },
          {
            key: "update",
            name: "button.update",
            disabled: false,
            icon: "el-icon-edit"
          }
        ],

        columns: [
          {
            code: "name",
            label: "label.PFANS2002VIEW_NAME",
            width: 150,
            fix: false,
            filter: true
          },
          {
            code: "education1",
            label: "label.PFANS2002VIEW_EDUCATION",
            width: 150,
            fix: false,
            filter: true
          },
          {
            code: "center",
            label: "label.center",
            width: 200,
            fix: false,
            filter: true
          },
          {
            code: "group",
            label: "label.group",
            width: 200,
            fix: false,
            filter: true
          },
          {
            code: "team",
            label: "label.team",
            width: 200,
            fix: false,
            filter: true
          },
          {
            code: "birthday",
            label: "label.PFANS2002VIEW_BIRTHDAY",
            width: 150,
            fix: false,
            filter: true
          },
          {
            code: "_interview",
            label: "label.PFANS2002VIEW_INTERVIEW",
            width: 150,
            fix: false,
            filter: true
          },
          {
            code: "createon",
            label: "label.PFANS2002VIEW_CREATEON",
            width: 150,
            fix: false,
            filter: true
          },
          {
            code: "status",
            label: "label.PFANS2001VIEW_ADOPTIONDECISION",
            width: 150,
            fix: false,
            filter: true
          }
        ],
        id: "",
        rowid: "recruitjudgement_id"
      };
    },
    mounted() {
      this.loading = true;
      this.$store
        .dispatch("PFANS2002Store/get")
        .then(response => {
          this.data = response;
          for (let j = 0; j < this.data.length; j++) {
            let interview = "";
            if (getOrgInfo(this.data[j].center_id)) this.data[j].center = getOrgInfo(this.data[j].center_id).companyname;
            if (getOrgInfo(this.data[j].group_id)) this.data[j].group = getOrgInfo(this.data[j].group_id).companyname;
            if (getOrgInfo(this.data[j].team_id)) this.data[j].team = getOrgInfo(this.data[j].team_id).departmentname;
              if (response[j].education1 !== null && response[j].education1 !== "") {
                  let letStage = getDictionaryInfo(response[j].education1);
                  if (letStage != null) {
                      response[j].education1 = letStage.value1;
                  }
              }
            for (var val of JSON.parse(this.data[j].interview)) {
              if (val.interviewer) {
                interview += getUserInfo(val.interviewer).userinfo.customername + ",";
              }
            }
            this.data[j]._interview = interview.substring(0, interview.length - 1);
            this.data[j].status = getStatus(this.data[j].status);
            this.data[j].birthday = moment(this.data[j].birthday).format(
              "YYYY-MM-DD"
            );
            this.data[j].createon = moment(this.data[j].createon).format(
              "YYYY-MM-DD"
            );
          }
          this.loading = false;
        })
        .catch(err => {
          Message({
            message: err,
            type: "error",
            duration: 5 * 1000
          });
        });
    },

    methods: {
      rowClick(row) {
        this.id = row.recruitjudgement_id;
      },
      buttonClick(val) {
        this.$store.commit("global/SET_HISTORYURL", this.$route.path);
        if ("update" === val) {
          if (!this.id) {
              Message({
                  message: this.$t("normal.info_01"),
                  type: 'info',
                  duration: 2 * 1000
              });
              return;
          }
          this.$router.push({
            name: "PFANS2002FormView",
            params: {
              _id: this.id,
              disabled: false
            }
          });
        } else if ("view" === val) {
          if (!this.id) {
            Message({
                message: this.$t("normal.info_01"),
                type: 'info',
                duration: 2 * 1000
            });
            return;
          }
          this.$router.push({
            name: "PFANS2002FormView",
            params: {
              _id: this.id,
              disabled: true
            }
          });
        } else if ("new" === val) {
          this.$router.push({
            name: "PFANS2002FormView",
            params: {
              _id: "",
              disabled: false
            }
          });
        }
      }
    }
  };
</script>

<style scoped>
</style>
