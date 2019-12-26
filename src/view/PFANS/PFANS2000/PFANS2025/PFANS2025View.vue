<template>
  <div>
    <EasyNormalTable
      :title="title"
      :columns="columns"
      :data="data"
      @buttonClick="buttonClick"
      :buttonList="buttonList"
    ></EasyNormalTable>
  </div>
</template>

<script>
import EasyNormalContainer from "@/components/EasyNormalContainer";
import EasyNormalTable from "@/components/EasyNormalTable";
let moment = require("moment");
import { getUserInfo } from "../../../../utils/customize";
export default {
  name: "PFANS2025View",
  components: {
    EasyNormalContainer,
    EasyNormalTable
  },

  data() {
    return {
      loading: false,
      data: [
        {
          center: "123",
          group: "234",
          team: "333",
          name: "121",
          rushe: "121",
          tuiyi: "121",
          jibie: "121",
          xingbie: "121",
          xingbie: "121",
          guoji: "121",
          birthday: "121",
          tuixiuri: "121",
          onstatus: "121"
        }
      ],
      title: "人员信息",
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
          code: "center",
          label: "所属センター",
          width: 150,
          fix: false,
          filter: true
        },
        {
          code: "group",
          label: "所属グループ",
          width: 150,
          fix: false,
          filter: false
        },
        {
          code: "team",
          label: "所属チーム",
          width: 150,
          fix: false,
          filter: false
        },
        {
          code: "name",
          label: "氏名",
          width: 150,
          fix: false,
          filter: false
        },
        {
          code: "rushe",
          label: "入社時間",
          width: 150,
          fix: false,
          filter: false
        },
        {
          code: "tuiyi",
          label: "役職",
          width: 150,
          fix: false,
          filter: false
        },
        {
          code: "jibie",
          label: "ランク",
          width: 150,
          fix: false,
          filter: false
        },
        {
          code: "xingbie",
          label: "性别",
          width: 150,
          fix: false,
          filter: false
        },
        {
          code: "guoji",
          label: "国籍",
          width: 150,
          fix: false,
          filter: false
        },
        {
          code: "birthday",
          label: "生年月日",
          width: 150,
          fix: false,
          filter: false
        },
        {
          code: "tuixiuri",
          label: "退職日",
          width: 150,
          fix: false,
          filter: false
        },
        {
          code: "onstatus",
          label: "在职状态",
          width: 150,
          fix: false,
          filter: false
        }
      ],
      row: ""
    };
  },
  mounted() {
    //this.$store.commit("global/SET_OPERATEID", "");
  },

  methods: {
    buttonClick(val) {
    },
    rowClick(row) {
      console.log(row);
      this.row = row;
    }
  }
};
</script>

<style scoped>
</style>
