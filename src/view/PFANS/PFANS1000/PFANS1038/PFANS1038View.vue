<template>
  <div style="min-height: 100%">
      <el-tabs v-model="activeName" type="border-card">
        <el-tab-pane
          label="社员计划"
          name="first"
          style="padding-top:1%"
        >
          <EasyNormalTable
            :buttonList="buttonList"
            :columns="columns"
            :data="data"
            :rowid="rowid"
            :title="titleIn"
            @buttonClick="buttonClick"
            @rowClick="rowClick"
            v-loading="loading"
          ></EasyNormalTable>
        </el-tab-pane>
        <el-tab-pane label="外住计划" name="second" style="padding-top:1%">
          <EasyNormalTable
            :buttonList="buttonList"
            :columns="columns"
            :data="data"
            :rowid="rowid"
            :title="titleOut"
            @buttonClick="buttonClick"
            @rowClick="rowClick"
            v-loading="loading"
          ></EasyNormalTable>
        </el-tab-pane>
      </el-tabs>
  </div>
</template>
<script>
  import EasyNormalTable from '@/components/EasyNormalTable';
  import {Message} from "element-ui";

  export default {
    name: 'PFANS1037View',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        data:[],
        loading:false,
        rowid:"personnelplanid",
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
        activeName:"first",
        titleIn:"社员计划",
        titleOut:"外驻计划",
        columns: [
          {
            code: "year",
            label: "label.PFANS2023VIEW_YEARS",
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
            code: "department",
            label: "label.ASSETS1001VIEW_USEDEPARTMENT",
            width: 150,
            fix: false,
            filter: true
          },
          {
            code: "createby",
            label: "label.PFANS8008VIEW_CREATEBY",
            width: 200,
            fix: false,
            filter: true
          },
          {
            code: "createon",
            label: "label.information_start",
            width: 200,
            fix: false,
            filter: true
          }
        ]
      }
    },
    mounted() {

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
            name: "PFANS1038FormView",
            params: {
              _id: this.id,
              disabled: false,
              type: this.activeName === "first" ? 0 : 1
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
            name: "PFANS1038FormView",
            params: {
              _id: this.id,
              disabled: true,
              type: this.activeName === "first" ? 0 : 1
            }
          });
        } else if ("new" === val) {
          this.$router.push({
            name: "PFANS1038FormView",
            params: {
              _id: "",
              disabled: false,
              type: this.activeName === "first" ? 0 : 1
            }
          });
        }
      }
    }
  };
</script>
<style lang="scss">

</style>
