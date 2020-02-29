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
          :data="outdata"
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
  import {getDictionaryInfo, getOrgInfo, getUserInfo} from "../../../../utils/customize";
  import moment from "moment";

  export default {
    name: 'PFANS1037View',
    components: {
      EasyNormalTable,
    },
    data() {
      return {
        data:[],
        outdata:[],
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
            code: "years",
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
      this.loading = true;
      this.$store
        .dispatch("PFANS1038Store/getAll")
        .then(response => {
          this.loading = false;
          let userinfo = "";
          let data = [];
          let outdata = [];
          if(response.length > 0){
            response.forEach(
              res => {
                debugger
                userinfo = getUserInfo(res.createby).userinfo;
                res.createby  = userinfo.customername;
                res.center = userinfo.centername;
                res.department = userinfo.groupname||"";
                res.createon =  moment(res.createon).format("YYYY-MM-DD");
                if(res.type === 0){
                  data.push(res);
                }else{
                  outdata.push(res);
                }
              }
            )
            this.data = data;
            this.outdata = outdata;
          }
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
    methods: {
      rowClick(row) {
        this.id = row.personnelplanid;
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
