<template>
  <div style="min-height: 100%">
    <el-form :model="form" :rules="rules" label-position="top" label-width="8vw" ref="form">
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
        <el-tab-pane :label="外住计划" name="second">
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
    </el-form>
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
        activeName:"frist",
        titleIn:"社员计划",
        titleOut:"外驻计划",
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
      }
    },
    mounted() {

    },
    methods: {
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
              type: this.activeName === "frist" ? 0 : 1
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
              type: this.activeName === "frist" ? 0 : 1
            }
          });
        } else if ("new" === val) {
          this.$router.push({
            name: "PFANS1038FormView",
            params: {
              _id: "",
              disabled: false,
              type: this.activeName === "frist" ? 0 : 1
            }
          });
        }
      }
    }
  };
</script>
<style lang="scss">

</style>
